document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.querySelector('.burger-btn'),
    burgerMenu = document.querySelector('.mobile-menu');

  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    burgerMenu.classList.toggle('active');
  })

  function closeMenu() {
    burgerBtn.classList.remove('active');

    burgerMenu.classList.remove('active');
  }

  // Swiper init ==================

  // const swiper = new Swiper('.advantages-swiper', {
  //   // Optional parameters
  //   direction: 'horizontal',
  //   slidesPerView: 2,
  //   // Navigation arrows
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },

  // });

  const slider = document.querySelector('.swiper')

  let mySwiper;

  function mobileSlider() {
    if (window.innerWidth <= 768 && slider.dataset.mobile == 'false') {
      mySwiper = new Swiper('.advantages-swiper', {
        // Optional parameters
        direction: 'horizontal',
        slidesPerView: 1,
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          // when window width is >= 320px
          577: {
            slidesPerView: 2,
          },

        }

      });

      slider.dataset.mobile = 'true';
    }

    if (window.innerWidth > 768) {
      slider.dataset.mobile = 'false';
      if (slider.classList.contains('swiper-initialized')) {
        mySwiper.destroy();
      }
    }
  }

  mobileSlider()

  window.addEventListener('resize', () => {
    mobileSlider();
  });


  // Swiper init ==================


  // Scroll to Anchors init ==================


  function scrollToAnchors() {
    const anchors = document.querySelectorAll('a[href*="#"]')

    anchors.forEach(el => {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        const targetID = el.getAttribute('href').substr(1);
        const targetPosition = document.getElementById(targetID).offsetTop; /* положение блока от верха документа */
        const currentPosition = window.pageYOffset; /* текущее положение окна */
        const distance = targetPosition - currentPosition;
        const duration = 1000; /* 1 секунда */
        let start = null;


        window.requestAnimationFrame(step);

        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          window.scrollTo(0, distance * (progress / duration) + currentPosition);
          if (progress < duration) window.requestAnimationFrame(step);
        }

        closeMenu()
      })
    })


  }

  scrollToAnchors()

  // Scroll to Anchors init ==================

});

$(function () {
  function countup(className) { //className - имя класса, в котором есть число
    var countBlockTop = $(className).offset().top; //смещение блока с числом относительно верхнего края	
    var windowHeight = window.innerHeight;//высота окна браузера
    var show = true;// отвечает, что если один раз счетчик сработает, больше не срабатывал

    $(window).scroll(function () {
      if (show && (countBlockTop < $(window).scrollTop() + windowHeight)) {
        show = false; //если мы видим число, то больше его не надо показывать

        $(className).spincrement({ //вызов плагина с параметрами 
          from: 1,               //начинать с 1
          duration: 4000,        //задержка счетчика
        });
      }
    })
  }






  countup("#count1");
  countup("#count2");
  countup("#count3");
  countup("#count4");

});