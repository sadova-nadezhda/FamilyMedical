window.addEventListener("load", function () {
  let link = document.querySelector(".header__burger");
  let menu = document.querySelector(".header__nav");
  if (menu) {
    link.addEventListener(
      "click",
      function () {
        link.classList.toggle("active");
        menu.classList.toggle("open");
      },
      false
    );
    window.addEventListener("scroll", () => {
      if (menu.classList.contains("open")) {
        link.classList.remove("active");
        menu.classList.remove("open");
      }
    });
    document.addEventListener("click", (e) => {
      let target = e.target;
      if (
        !target.classList.contains("header__nav") &&
        !target.classList.contains("header__burger") &&
        !target.classList.contains("dropdown__link")
      ) {
        link.classList.remove("active");
        menu.classList.remove("open");
      }
    });
  }

  const animSvg = document.querySelectorAll('.anim-svg');

  const handleScroll = () => {
    animSvg.forEach((svg) => {
      const rect = svg.getBoundingClientRect();
      const offset = window.innerHeight * 0.4;
      if (rect.top <= offset && !svg.classList.contains('animate')) {
        svg.classList.add('animate');
        let color = svg.classList.contains('teams__card') ? '#3EEBB6' : '#33B577';

        const paths = svg.querySelectorAll('path');
        paths.forEach((path) => {
          const length = path.getTotalLength();
          path.style.strokeDasharray = length;
          path.style.strokeDashoffset = length;

          // Анимация
          setTimeout(() => {
            path.style.stroke = color
            path.style.transition = 'stroke-dashoffset 2s ease-in-out';
            path.style.strokeDashoffset = '0';
          }, 200);
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  const mobileSwiper = document.querySelectorAll('.mobileSwiper');
  const sliders = new Map(); // Используем Map для хранения экземпляров слайдеров

  const sliderInit = (swiperElement) => {
    const slider = new Swiper(swiperElement, {
      autoHeight: true,
      navigation: {
        nextEl: swiperElement.closest('.swiper-box').querySelector('.button-next'),
        prevEl: swiperElement.closest('.swiper-box').querySelector('.button-prev'),
      },
    });
    sliders.set(swiperElement, slider); 
  };

  const sliderDestroy = (swiperElement) => {
    const slider = sliders.get(swiperElement);
    if (slider) {
      slider.destroy();
      sliders.delete(swiperElement); 
    }
  };

  const resizeHandlerSlider = () => {
    const isMobile = document.body.clientWidth <= 768; 

    mobileSwiper.forEach((swiperElement) => {
      if (isMobile && !sliders.has(swiperElement)) {
        sliderInit(swiperElement);
      } else if (!isMobile && sliders.has(swiperElement)) {
        sliderDestroy(swiperElement);
      }
    });
  };

  resizeHandlerSlider();
  window.addEventListener('resize', resizeHandlerSlider);

  var certificateSwiper = new Swiper(".certificateSwiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
    navigation: {
      nextEl: '.about-button-next',
      prevEl: '.about-button-prev',
    },
  });

  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });

  // Popup

  function hidePopup(popup) {
    popup.addEventListener('click', function(e) {
      const target = e.target;
      if (
        target.classList.contains("popup__close") ||
        target.classList.contains("popup")
      ) {
        popup.style.transition = "opacity 0.4s";
        popup.style.opacity = "0";
        setTimeout(() => {
          popup.style.display = "none";
        }, 400);
      }
    });
  }

  function showPopup(popup) {
    popup.style.display = "flex";
    setTimeout(() => {
      popup.style.transition = "opacity 0.4s";
      popup.style.opacity = "1";
    }, 10);
  } 

  //popup
  let popup = document.querySelector('.popup')
  let popupBtns = document.querySelectorAll(".popup-btn");
  if(popup && popupBtns){
    hidePopup(popup);
    popupBtns.forEach( btn => {
      btn.addEventListener('click', () => {
        showPopup(popup);
      })
    })
  }

  // mask phone
  $.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  };
  $('input[type="tel"]')
    .click(function () {
      $(this).setCursorPosition(3);
    })
    .mask("+7 (999) 999-99-99");

    // hide-show
    const btnHide = document.querySelector(".difference .btn-hide");
    const btnDisplay = document.querySelector(".difference .btn-display");
    const hiddenElements = document.querySelectorAll(".difference__table .hidden");
  
    btnHide.addEventListener("click", function () {
      hiddenElements.forEach(element => element.style.display = "none");
      btnHide.style.display = "none";
      btnDisplay.style.display = "block";
    });
  
    btnDisplay.addEventListener("click", function () {
      hiddenElements.forEach(element => element.style.display = "table-row");
      btnHide.style.display = "block";
      btnDisplay.style.display = "none";
    });

});

