function accordions() {
  const accordions = document.querySelectorAll('.accordion');
  accordions.forEach(accordion => {
    const accordionItems = accordion.querySelectorAll('.accordion__item');
    accordionItems.forEach(el => {
      const subAccordion = el.querySelector('.sub-accordion');
      el.addEventListener('click', (e) => {

        const self = e.currentTarget;
        const control = self.querySelector('.accordion__control');
        const title = self.querySelector('.accordion__title');
        const content = self.querySelector('.accordion__content');

        if (e.target.closest('.accordion__control')) {
          self.classList.toggle('open');

          if (self.classList.contains('open')) {
            control.setAttribute('aria-expanded', true);
            content.setAttribute('aria-hidden', false);
            content.style.maxHeight = content.scrollHeight + 'px';
          } else {
            control.setAttribute('aria-expanded', false);
            content.setAttribute('aria-hidden', true);
            content.style.maxHeight = null;
          }
        }

      })
      if (subAccordion) {
        const accordionItems = subAccordion.querySelectorAll('.sub-accordion__item');
        accordionItems.forEach(el => {
          const parent = el.parentNode;

          const control = el.querySelector('.sub-accordion__control');
          const content = el.querySelector('.sub-accordion__content');



          el.addEventListener('click', (e) => {

            if (content) {
              const self = e.currentTarget;
              const control = self.querySelector('.sub-accordion__control');
              const title = self.querySelector('.sub-accordion__title');
              const content = self.querySelector('.sub-accordion__content');


              if (e.target.closest('.sub-accordion__control')) {

                self.classList.toggle('open');

                if (self.classList.contains('open')) {
                  control.setAttribute('aria-expanded', true);
                  content.setAttribute('aria-hidden', false);
                  content.style.maxHeight = content.scrollHeight + 'px';
                  parent.style.maxHeight = parseInt(parent.offsetHeight) + parseInt(content.style.maxHeight) + 'px';
                  console.log(parent.style.maxHeight);

                } else {
                  control.setAttribute('aria-expanded', false);
                  content.setAttribute('aria-hidden', true);
                  parent.style.maxHeight = parseInt(parent.style.maxHeight) - parseInt(content.offsetHeight) + 'px';
                  content.style.maxHeight = null;
                }


              }

            }

          })

        })
      }
    })
  })
}