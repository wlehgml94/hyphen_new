//opt
const getCommonOpt = (target, customOpt = {}) => ({
  loop: true,
  speed: 800,
  spaceBetween: 0,
  slidesPerView: 'auto',
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    prevEl: `.${target} .swiper-button-prev`,
    nextEl: `.${target} .swiper-button-next`,
  },
  pagination: {
    el: `.${target} .swiper-pagination`,
    type: 'progressbar',
  },
  ...customOpt,
});
// init
export function initCommonSwiper(customOpt) {
  document.addEventListener('DOMContentLoaded', function() {
    const commonSwiper = document.querySelectorAll('.common-swiper');
    if (!commonSwiper) return;
    commonSwiper.forEach((swiper, i) => {
      let target = `common-swiper_${i + 1}`;
      swiper.classList.add(target);
      const n_swiper = new Swiper(`.${target}`, getCommonOpt(target, customOpt));
    });
  });
}
