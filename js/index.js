document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.querySelector('.burger-btn'),
    burgerMenu = document.querySelector('.mobile-menu');

  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    burgerMenu.classList.toggle('active');
  })

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

});