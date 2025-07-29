$(document).ready(function() {
  document.querySelectorAll('.drag_image').forEach(container => {
    const drag_slider = container.querySelector('.drag_slider');
    if (drag_slider) {
      drag_slider.addEventListener('input', e => {
        container.style.setProperty('--leftVal', `${e.target.value}%`);
      });
    }
  });
});
