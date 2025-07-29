/* ********** ********** ********** */
/*     Contact Form Common JS       */
/* ********** ********** ********** */

// 메인
jQuery(document).ready(function($) {
  const inputCheck = $('input[type=checkbox]');
  let pageName = $('#pageName').text();

  $('.common-leadform .bt-base input[type=submit]').on('click', function() {
    localStorage.setItem('sendType', 'contact');
  });

  $('.contact_agree').each(function() {
    let $_this = $(this);
    $_this.find('a').on('click', function() {
      if ($_this.hasClass('contact_personal')) {
        popupShow('.common-agree._privacy');
      } else {
        popupShow('.common-agree._marketing');
      }
    });
  });

  // 공통 함수
  // 스크롤 off
  function scrollOff() {
    //$('html, body, #page-container').css('overflow', 'hidden');
    $('html, body').css('overflow', 'hidden');
  }

  // 스크롤 on
  function scrollOn() {
    $('html, body').css('overflow', '');
  }

  // 페이지 이름 인식
  function inputPageName() {
    $('input[name=location]').val(pageName);
  }

  /* ********** ********** ********** */
  // 체크박스 클래스 넣기
  function checkbox() {
    inputCheck.on('click', function() {
      $(this).toggleClass('checked');
    });
  }

  // ip 주소 매핑하기
  function remoteIP() {
    let wpcf7_ip = $('input[name=_wpcf7_ip]').val();
    let remote_ip = $('input[name=remote_ip]');
    remote_ip.val(wpcf7_ip);
  }

  $('input[name="your-company"]').on('input', function() {
    // "your-name" 필드에 "your-company" 필드의 값을 동기화
    $('input[name="your-name"]').val($(this).val());
  });

  // ********** ********** **********
  // 실행
  function init() {
    checkbox();
    inputPageName();
    remoteIP();
    //pageNameUrl();
  }
  init();

  // wpcf7mailsent / wpcf7submit
  $('form.wpcf7-form').on('wpcf7submit', function(e) {
    location.replace('/submit_hyphen');
  });
});
