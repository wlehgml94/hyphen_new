/* ********************* */
/* contact form 유효성 체크 */
/* ********************* */

/*
o_valid : 유효성 체크 항목
o_verify : 유효성 체크 완료
*/
// 유효성 메시지 : on/off, 한번만 작동
function $ff_validBox($this, item) {
  if ($this.next().hasClass('ff_valid_box') === false) {
    $this.after(item);
  }
}
// 유효성 메시지 : 텍스트
function $ff_validText(name) {
  return `<div class="ff_valid_box"><p class="ff_valid_text">${name} 입력해 주세요</p></div>`;
}
// 유효성 on
function $valid_on($this) {
  $this.closest('.o_valid').addClass('o_verify');
  $this.removeClass('ff_not_valid');
}
// 유효성 off
function $valid_off($this) {
  $this.closest('.o_valid').removeClass('o_verify');
  $this.addClass('ff_not_valid');
}
jQuery.event.special.wheel = {
  setup: function(_, ns, handle) {
    this.addEventListener('wheel', handle, { passive: true });
  },
};
jQuery.event.special.mousewheel = {
  setup: function(_, ns, handle) {
    this.addEventListener('mousewheel', handle, { passive: true });
  },
};
jQuery(document).ready(function() {
  /* ********** ********** ********** ********** ********** ********** ********** */
  // *****
  // 텍스트 필드
  $('.contact_valid input[type=text], .contact_valid textarea').on('keyup propertychange paste input', function() {
    let $this = $(this);
    if ($this.val().length > 0) {
      $valid_on($this);
      $this.next().remove();
    } else {
      $valid_off($this);
    }
  });

  // *****
  // 텍스트 필드 : 이름
  $('.contact_valid .contact_name input[type=text]').on('keyup propertychange paste input', function() {
    let $this = $(this);
    let validText_complete = `<div class="ff_valid_box"><p class="ff_valid_text">이름을 입력해 주세요</p></div>`;

    if ($this.val().length <= 0) {
      $ff_validBox($this, validText_complete);
    }
  });
  // *****
  // 텍스트 필드 : 회사명
  $('.contact_valid .contact_company input[type=text]').on('keyup propertychange paste input', function() {
    let $this = $(this);
    let validText_complete = `<div class="ff_valid_box"><p class="ff_valid_text">회사/성함을 입력해 주세요</p></div>`;

    if ($this.val().length <= 0) {
      $ff_validBox($this, validText_complete);
    }
  });
  // *****
  // 텍스트 필드 : 이름 및 회사명
  $('.contact_valid .contact_text input[type=text]').on('keyup propertychange paste input', function() {
    let $this = $(this);
    let validText_complete = `<div class="ff_valid_box"><p class="ff_valid_text">이름 or 회사명을 입력해 주세요</p></div>`;

    if ($this.val().length <= 0) {
      $ff_validBox($this, validText_complete);
    }
  });
  $('.contact_valid textarea').on('keyup propertychange paste input', function() {
    let $this = $(this);
    let validText_complete = `<div class="ff_valid_box"><p class="ff_valid_text">고민을 입력해 주세요</p></div>`;

    if ($this.val().length <= 0) {
      $ff_validBox($this, validText_complete);
    }
  });

  /* ********** ********** ********** ********** ********** ********** ********** */

  // *****
  // 전화번호 필드
  $('.contact_valid input[type=tel]').on('keyup propertychange paste input', function() {
    let $this = $(this);
    let validText_complete = $ff_validText('연락처를');
    // 전화번호 - 정규표현식 : '-' 자동생성
    $this.val($this.val().replace(/[^0-9]/g, '').replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/, '$1-$2-$3').replace('--', '-'));
    // 전화번호 : 최대 길이 설정
    if ($this.val().length > 13) {
      $this.val($this.val().substring(0, 13));
    }
    // 전화번호 : 길이 체크 및 유효성 메시지
    if ($this.val().length <= 9) {
      $valid_off($this);
      $ff_validBox($this, validText_complete);
    } else {
      $valid_on($this);
      $this.next().remove();
    }
  });

  /* ********** ********** ********** ********** ********** ********** ********** */

  // *****
  // 이메일 필드
  $('.contact_valid input[type=email]').on('keyup propertychange paste input', function() {
    let $this = $(this);
    let validText_complete = $ff_validText('이메일을');

    // RegularExpressions : 변경할 수 없는 정규식
    let regex = /^[\w-\.]+@([a-zA-Z0-9]+\.)+[a-z]{2,4}$/g;

    // 이메일 : 양식 체크
    if (!regex.test($(this).val())) {
      $valid_off($this);
      $ff_validBox($this, validText_complete);
    } else {
      $valid_on($this);
      $this.next().remove();
    }
  });

  /* ********** ********** ********** ********** ********** ********** ********** */

  // *****
  // 드롭다운 박스
  $('.select_ds select').on('change', function(event) {
    let $this = $(this);
    let optionVal = $this.find('option:selected').val();
    if (optionVal.length <= 0) {
      $valid_off($this);
    } else {
      $valid_on($this);
    }
  });

  /* ********** ********** ********** ********** ********** ********** ********** */
  // *****
  // 체크박스 : 일반
  $('.contact_valid .contact_check input[type=checkbox]').on('click', function(event) {
    let $this = $(this);
    let checkbox_input = $this.closest($('.wpcf7-checkbox')).find('input');

    let validTarget = $this.closest('.wpcf7-checkbox');
    let validText_complete = `<div class="ff_valid_box"><p class="ff_valid_text">항목을 선택해주세요</p></div>`;
    if (checkbox_input.hasClass('checked')) {
      $valid_on($this);
      validTarget.next().remove();
    } else {
      $valid_off($this);
      $ff_validBox(validTarget, validText_complete);
    }
  });

  // *****
  // 체크박스 : 개인정보 동의
  let personalInput = $('.contact_valid .contact_personal input');
  if (personalInput.is(':checked')) {
    $valid_on(personalInput);
  }
  $('.contact_valid .contact_personal input').on('click', function(event) {
    let $this = $(this);
    if (event.target.checked) {
      $valid_on($this);
    } else {
      $valid_off($this);
    }
  });

  /* ********** ********** ********** ********** ********** ********** ********** */

  // 숫자 필드
  // 인원수 contact_headcount
  // 사무실 규모 contact_officeSize
  $('.contact_valid .contact_officeSize input[type=number]').on('keyup propertychange paste input', function() {
    let $this = $(this);
    $this.val($this.val().replace(/[^0-9]/gi, '').replace(/^0+/, '')); // 시작 0 삭제

    let conditions, validText;
    /*
		if ($this.attr('name') == 'your-scale-es') {
			conditions = Number($this.val()) < 100;
			validText = `100평 이상부터 의뢰하실 수 있습니다`;
		} else {
			conditions = $this.val().length <= 0;
			validText = `현재 사무실 면적을 입력해주세요`;
		}
		*/
    conditions = $this.val().length <= 0;
    validText = `현재 사무실 면적을 입력해주세요`;
    if (conditions) {
      let valid = `<div class="ff_valid_box"><p class="ff_valid_text">${validText}</p></div>`;
      $valid_off($this);
      $ff_validBox($this, valid);
    } else {
      $valid_on($this);
      $this.next().remove();
    }
  });
  $('form input[type=number]').on('wheel mousewheel', function() {
    $(this).blur();
  });

  // 숫자 필드 : 인원수 (최대자리수)
  $('.contact_valid .contact_headcount input[type=number]').on('keyup propertychange paste input', function() {
    let $this = $(this);
    let validText_complete = $ff_validText('인원수를');
    let maxLength = 3; // 최대
    // max 자리 제한
    if ($this.val().length <= maxLength) {
      $valid_on($this);
      $this.next().remove();
    }
    // 내용을 전부 지웠을 경우
    if ($this.val().length === 0) {
      $valid_off($this);
      $ff_validBox($this, validText_complete);
    }
    // 최대 수 이상 입력되면 9로 변환
    if ($this.val().length >= maxLength + 1) {
      let number = '9';
      let result = number.repeat(maxLength);
      $this.val(result);
    }
  });

  // *****
  // 숫자 필드 : 사무실 규모 - 100평 이상 (최소자리수)
  /*
	$('.contact_valid .contact_officeSize input[type=number]').on('keyup propertychange paste input',function() {
		let $this = $(this);
		let validText_complete = $ff_validText('사무실 규모를');
		//let minLength = projHost.includes('percent') || projHost.includes('tenyears') ? 3 : 1;
		if (Number($this.val()) < 100) {
			let validText_complete_100 = `<div class="ff_valid_box"><p class="ff_valid_text">100평 이상부터 의뢰하실 수 있습니다</p></div>`; 
			$valid_off($this);
			$ff_validBox($this, validText_complete_100);
		} else {
			$valid_on($this);
			$this.next().remove();
		}
	});
	*/

  /* ********** ********** ********** ********** ********** ********** ********** */

  // *****
  // form 유효성 갯수와 검증 갯수 체크
  $('form input, form select').on('click change focus keyup', function() {
    let thisForm = $(this).closest('form');
    let validNum = thisForm.find('.o_valid').length; // 유효성 갯수 체크
    let verifyNum = thisForm.find('.o_verify').length; // 유효성 검증 갯수 체크
    let submitBtn = thisForm.find('input[type=submit]'); // 보내기 버튼

    // 갯수가 동일할때 버튼 활성화
    if (validNum === verifyNum) {
      submitBtn.parents('.bt-base').addClass('active');
    } else {
      submitBtn.parents('.bt-base').removeClass('active');
    }
  });

  // 보내기 버튼 클릭 - 클릭 방지
  $('input[type=submit]').on('click', function() {
    $(this).parents('.bt-base').removeClass('active').addClass('disabled');
  });

  // 엔터 작동 차단
  $('form input').keydown(function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  });

  // 개인정보 활용 동의 버튼
  let $leadAgree = $('.lead_agree_form');
  $leadAgree.each(function(index) {
    let $form = $(this);
    let marketingVal = true;
    $form.find('input[name="your-marketing"]').val(marketingVal);
    $form.find('[name="check-marketing"]').on('change', function() {
      let value = $(this).is(':checked') ? true : false;
      $form.find('input[name="your-marketing"]').val(value);
    });
    let agreeAll = $form.find('.check_round input');
    let agreeCheck = $form.find('.contact_agree input[type="checkbox"]');
    let errorCheck = () => {
      let hasError = $form.find('input[name="your-personal"]').is(':checked');
      if (!hasError) {
        $form.find('.check_round').addClass('has_error');
        if (!$form.find('p.has_error').length) $form.append('<p class="has_error">필수 항목에 동의해 주세요</p>');
        $valid_off($form.find('input[name="your-personal"]'));
      } else {
        $form.find('.check_round').removeClass('has_error');
        $form.find('.has_error').remove();
        $valid_on($form.find('input[name="your-personal"]'));
      }
    };
    agreeAll.on('click', function() {
      let checked = $(this).is(':checked');
      if (checked) {
        agreeCheck.addClass('checked');
      } else {
        agreeCheck.removeClass('checked');
      }
      $form.find('input[name="your-marketing"]').val(checked);
      agreeCheck.prop('checked', checked);
      errorCheck();
    });
    agreeCheck.on('click', function() {
      let agreeChecked = $form.find('.contact_agree input[type="checkbox"]:checked');
      let lengthCheck = agreeCheck.length;
      let lengthChecked = agreeChecked.length;
      let checkedAll = lengthCheck == lengthChecked;
      if (checkedAll) {
        agreeAll.addClass('checked');
      } else {
        agreeAll.removeClass('checked');
      }
      agreeAll.prop('checked', checkedAll);
      errorCheck();
    });
  });
});
