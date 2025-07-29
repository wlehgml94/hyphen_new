let winW = $(window).outerWidth();
let winH = $(window).outerHeight();
let winScroll = $(window).scrollTop();
let $wrapper = $('.hyphen-wrapper');
let checkMo = 960;
let url = location.href;
let $_hash = location.hash;
const body = document.querySelector('body');
const dim = document.querySelector('.dim');
const contact = document.querySelector('.contact');
const sideLeadForm = document.querySelector('.side-lead-wrapper');
const leadHeader = document.querySelector('.side-lead__header');
const btnPopupBack = sideLeadForm.querySelector('.bt_back');
const btnPopupClose = sideLeadForm.querySelector('.bt_close');
const headerNavLinks = document.querySelectorAll('.header-nav li a');
const commonAgreeModal = document.querySelectorAll('.common-agree');
const btnMenu = document.querySelector('.bt-menu');
const btnCall = document.querySelector('.bt-call');
const headerContent = document.querySelector('.header-content');
const btnCta = document.querySelectorAll('.bt_cta');
const layerPop = document.querySelector('.side-lead-contents');
let mbMenuToggle = false;
let screenW = getScreenType();
let previousActiveLink;

if (url.includes('?')) {
  $path = url.split('?')[0];
} else {
  $path = url;
}

function imageResize() {
  let images = $('img.img_resize');
  images.each(function() {
    if (winW <= checkMo) {
      $(this).attr('src', $(this).attr('src').replace('/pc/', '/mo/'));
    } else {
      $(this).attr('src', $(this).attr('src').replace('/mo/', '/pc/'));
    }
  });
  let checked;
  $(window).on('load, resize', function() {
    if (!checked) {
      checked = setTimeout(function() {
        winW = $(window).outerWidth();
        checkScroll = null;
        imageResize();
      }, 10);
    }
  });
}

function popupShow(name) {
  let $popup = $(name);
  //open
  $popup.addClass('_show');

  //close
  let close = $popup.find('.bt_close');
  close.on('click', function(e) {
    e.preventDefault();
    popupHide(name);
    popupHide('.common-agree');
  });
}
function popupHide(name) {
  let $popup = $(name);
  $popup.removeClass('_show');
}
function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
function clipboard() {
  let url = '';
  let textarea = document.createElement('textarea');
  document.body.appendChild(textarea);
  url = window.document.location.href;
  textarea.value = url;
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert('URL 주소가 복사 되었습니다. 이제 지인에게 공유하세요!');
}
function isEmptyArr(arr) {
  if (Array.isArray(arr) && arr.length === 0) {
    return true;
  }
  return false;
}
function scrollDisabled() {
  $('body').addClass('hidden_scroll');
  document.querySelector('body').addEventListener('scroll touchmove mousewheel', function(e) {
    e.preventDefault();
  }, { passive: true });
}
function scrollAble() {
  $('body').removeClass('hidden_scroll').off('scroll touchmove mousewheel');
}

let productQuide = () => {
  let $guide = $('.guide_box');
  $guide.each(function() {
    let $_this = $(this);
    let question = $_this.find('._question');
    let activeClass = '_active';
    question.on('click', function() {
      let parents = $(this).parents('.guide_box');
      if (parents.hasClass(activeClass)) {
        parents.removeClass(activeClass);
        question.attr('ga4-toggle', false);
      } else {
        $guide.removeClass(activeClass);
        parents.addClass(activeClass);
        $guide.find('._question').attr('ga4-toggle', false);
        question.attr('ga4-toggle', true);
      }
    });
  });
};

const bodyLock = status => {
  status ? body.classList.add('hidden_scroll') : body.classList.remove('hidden_scroll');
};

const closeCommonAgreeModal = () => {
  commonAgreeModal.forEach(modal => {
    modal.classList.contains('_show') && modal.classList.remove('_show');
  });
};

const activePreviousLink = status => {
  if (previousActiveLink) {
    status ? previousActiveLink.classList.add('_active') : previousActiveLink.classList.remove('_active');
  }
};

function getScreenType() {
  return window.innerWidth > 960 ? 'PC' : 'MB';
}

const openLeadForm = hiddenBack => {
  activePreviousLink(false);
  contact.classList.toggle('_active');
  sideLeadForm.classList.toggle('_show');
  let contactToggle = contact.classList.contains('_active');
  contactToggle ? dim.classList.add('_active') : dim.classList.remove('_active');
  !contactToggle && closeCommonAgreeModal();
  layerPop.scrollTo({ top: 0, behavior: 'smooth' });
  bodyLock(contactToggle);
  if (hiddenBack) {
    // 상담신청 바로 클릭
    leadHeader.classList.add('hidden_back');
  } else {
    leadHeader.classList.remove('hidden_back');
  }
};

const closeLeadForm = () => {
  sideLeadForm.classList.remove('_show');
  headerContent.classList.remove('_active');
  dim.classList.remove('_active');
  btnMenu.classList.remove('_active');
  btnCall.classList.remove('_active');
  closeCommonAgreeModal();
  bodyLock(false);
  leadHeader.classList.remove('hidden_back');
  // gnb title
  contact.classList.remove('_active');
  activePreviousLink(true);
};

headerNavLinks.forEach(link => {
  if (link.classList.contains('_active')) {
    previousActiveLink = link;
  }
});

// contact -> lead_open
contact.addEventListener('click', () => {
  openLeadForm();
});

// cta -> lead_open
btnCta.forEach(cta => {
  cta.addEventListener('click', () => {
    let hiddenBack = window.innerWidth < 961 ? true : undefined;
    openLeadForm(hiddenBack);
  });
});

// dim
dim.addEventListener('click', () => {
  closeLeadForm();
});

// mb menu
btnMenu.addEventListener('click', () => {
  headerContent.classList.toggle('_active');
  dim.classList.toggle('_active');
  btnMenu.classList.toggle('_active');
  btnCall.classList.toggle('_active');
  mbMenuToggle = headerContent.classList.contains('_active');
  bodyLock(mbMenuToggle);
});

// leadform popup - back
btnPopupBack.addEventListener('click', () => {
  sideLeadForm.classList.remove('_show');
  contact.classList.remove('_active');
  activePreviousLink(true);
});

// leadform popup - close
btnPopupClose.addEventListener('click', () => {
  closeLeadForm();
});
// init fn
$(document).ready(function() {
  imageResize();
  productQuide();
});
// resize fn
window.addEventListener('resize', () => {
  screenW = getScreenType();
  if (screenW === 'PC') {
    if (!contact.classList.contains('_active')) {
      closeLeadForm();
    }
  } else {
    if (contact.classList.contains('_active')) {
      // mb -> pc resize후 ,
      headerContent.classList.add('_active');
      btnMenu.classList.add('_active');
      btnCall.classList.add('_active');
      dim.classList.add('_active');
    }
  }
});
