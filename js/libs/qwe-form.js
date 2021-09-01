// postal code input mask
let postalCodeInput = document.getElementById('input_2_1'),
  postalNumberInput = document.getElementById('input_2_2'),
  postalAdition = document.getElementById('input_2_3'),
  phone = document.getElementById('input_2_9'),
  email = document.getElementById('input_2_8');
// date = document.getElementById('input_2_22');

Inputmask({
  regex: String.raw`^(?:NL-)?(\d{4})\s*([A-Z,a-z]{2})$`
}).mask(postalCodeInput);
Inputmask({
  regex: String.raw`^\d+$`
}).mask(postalNumberInput);
Inputmask({
  regex: String.raw`^\d+$`
}).mask(postalAdition);
Inputmask({
  regex: String.raw`^0[6]{1}(\-)?[^0\D]{1}\d{7}$`
}).mask(phone);
Inputmask({
  regex: String.raw`^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`
}).mask(email);
// Inputmask({
//   regex: String.raw`^(\d{1,2})-(\d{1,2})-(\d{4})$`
// }).mask(date);

// form shit/ not empty validate and steps flow
let steps = $("#gform_page_2_1, #gform_page_2_2, #gform_page_2_3"),
  form = $("#gform_2"),
  stepOneButton = $("#gform_next_button_2_6"),
  stepTwoButton = $("#gform_next_button_2_10"),
  stepIndex = 0,
  currentStep = steps[stepIndex],
  prevStep = steps[stepIndex - 1],
  nextStep = steps[stepIndex + 1],
  qusetionSwitch = $("input[name='input_13']"),
  invlaidPostalCode = true,
  stepDone = $("#gform_page_2_4");
backButton = $(".dw-prev-btn");
!stepIndex ? backButton.fadeOut() : backButton.fadeIn();
let validateCheck = function (fieldset) {
  let fields = document.querySelectorAll("#" + fieldset.id + " input[aria-required='true']");
  let err = 0;
  fields.forEach(field => {
    if (field.value.trim().length === 0) {
      $(field).addClass("invalid")
      err++;
    } else {
      $(field).removeClass("invalid")
    }
  });
  if (err > 0) {
    document.querySelector("#" + fieldset.id + " input.invalid").focus()
  }
  return !err
};
let stepForward = function () {
  if (validateCheck(currentStep) && !invlaidPostalCode) {
    $(currentStep).fadeOut(() => {
      $(nextStep).fadeIn();
      stepIndex++;
      currentStep = steps[stepIndex];
      nextStep = steps[stepIndex + 1];
      prevStep = steps[stepIndex - 1];
      !stepIndex ? backButton.fadeOut() : backButton.fadeIn()
    })
  }
};
let stepBack = function () {
  if (stepIndex > 0) {
    $(currentStep).fadeOut(() => {
      $(prevStep).fadeIn();
      stepIndex--;
      currentStep = steps[stepIndex];
      nextStep = steps[stepIndex + 1]
      prevStep = steps[stepIndex - 1];
      !stepIndex ? backButton.fadeOut() : backButton.fadeIn()
    })
  } else {
    return false
  }
};
qusetionSwitch.on("input", () => {
  newQuestions = $("#field_2_19, #field_2_20")
  if (qusetionSwitch[0].checked) {
    newQuestions.fadeIn()
  } else {
    newQuestions.fadeOut()
  }
})
stepOneButton.on("click", (e) => {
  e.preventDefault();
  stepForward()
})
stepTwoButton.on("click", (e) => {
  e.preventDefault();
  stepForward()
})
form.on("submit", (e) => {
  e.preventDefault();

  jQuery.ajax({
    url: "/ajax",
    data: $('#gform_2').serialize() + '&action=save',
    type: "POST",
    success: function () {
      fbq('track', 'Lead');
    }
  });

  $(form.selector + " input:not([type='button']), " + form.selector + " textarea").attr("disabled", "disabled")
  $(currentStep).fadeOut();
  backButton.fadeOut()
  stepDone.fadeIn(() => {
    stepDone[0].scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  })

})

$(".dw-prev-btn").on("click", (e) => {
  e.preventDefault();
  stepBack()
})


// get street and city by postal code
let postalInputs = $("#input_2_1, #input_2_2");
postalInputs.on("input", () => {
  postalCode = postalCodeInput.value,
    postalNumber = postalNumberInput.value,
    postalStreet = document.getElementById("input_2_4").value,
    postalCity = document.getElementById("input_2_5").value;
  $.getJSON("https://api.pro6pp.nl/v1/autocomplete?auth_key=4xGPpdLUhkz6dvJi&nl_sixpp=" + postalCode + "&streetnumber=" + postalNumber, function (data) {
    // console.log(data.status);
    if (data.status == 'ok') {
      postalInputs.removeClass("invalid");
      document.getElementById("input_2_4").value = data.results[0].street;
      document.getElementById("input_2_5").value = data.results[0].city;
      document.getElementById("street-hidden").value = data.results[0].street;
      document.getElementById("city-hidden").value = data.results[0].city;
      $("#input_2_4").removeAttr("disabled");
      $("#input_2_5").removeAttr("disabled");
      invlaidPostalCode = false;
    } else {
      postalInputs.addClass("invalid");
      $("#input_2_4").attr("disabled", "disabled");
      $("#input_2_5").attr("disabled", "disabled");
      invlaidPostalCode = true;
    }
  });
})