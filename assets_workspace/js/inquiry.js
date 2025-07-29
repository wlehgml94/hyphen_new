let $inquiry_step = $('.inquiryStep');
let $inquiry_origin = $('.inquiryStep').find('textarea');
$inquiry_step.find('.contact_item').clone(true).appendTo($('.form-box'));
let nextBtn = $(".common-leadform").find('.bt-base.bt_next');
$('.form-box textarea').on('keypress keyup paste change input', function() {
  $(".hidden-form textarea").val($(this).val());
  $(".hidden-form textarea").attr('readonly', true);
  if ($('.form-box textarea').val().length !== 0) {
    $inquiry_origin.addClass('o_verify');
    nextBtn.addClass('active');
  } else {
    $inquiry_origin.eq(index).removeClass('o_verify');
    nextBtn.removeClass('active');
  }
});
$inquiry_origin.each(function(index) {
  let $inquiry_copy = $('.common-leadform');
  let buttonNext = $inquiry_copy.eq(index).find('.bt_next');
  function nextStep(index) {
    $inquiry_copy.removeClass('active');
    $inquiry_copy.eq(index + 1).addClass('active');
  }
  buttonNext.on('click', function() {
    nextStep(index);
  });
});