<?php include_once('./wp-content/themes/hyphen_v2/includes/config.php'); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <?php if (preg_match('/(submit_|privacy)/', CHECK_PATH)) { //검색색인 케이스 체크 필요
    $robot_search = 'noindex, nofollow';
  } else {
    $robot_search = 'index,follow';
  } ?>
  <meta name="robots" content="<?= $robot_search; ?>">
  <meta name="Yeti" content="<?= $robot_search; ?>" />
  <meta name="Googlebot" content="<?= $robot_search; ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">

  <?php
  $gtm_id = 'KQRJN5RD';
  $meta_set_title;
  $meta_set_description;
  $meta_set_image;
  //기본 메타 태그 세팅
  $default_meta_title = '사무실 인테리어 전문';
  $default_meta_description = '국내 1위 오피스 회사가 만든 사무실 인테리어 전문 브랜드로 공유오피스 전 지점 설계 및 운영 노하우를 활용해 오피스를 디자인합니다.';
  $default_meta_image = WEB_URL.'/assets/images/meta/common.jpg';
  //각 페이지에 메타 태그 설정이 있을 경우, 해당 태그 설정. 없을 경우 기본 태그 설정
  if (!isset($_POST['meta_set_title'])) {
    $meta_title_text = $default_meta_title;
  } else {
    $meta_title = $_POST['meta_set_title'];
    $meta_title_text = $meta_title;
  }
  if (!isset($_POST['meta_set_description'])) {
    $meta_description_text = $default_meta_description;
  } else {
    $meta_description = $_POST['meta_set_description'];
    $meta_description_text = $meta_description;
  }
  if (!isset($_POST['meta_set_image'])) {
    $check_path = str_replace('/', '', CHECK_PATH);
    if (str_contains($check_path, 'content-')) {
      $meta_image = WEB_URL.'/assets/images/meta/'.$check_path.'.jpg';
      $meta_image_text = $meta_image;
    } else {
      $meta_image_text = $default_meta_image;
    }
  } else {
    $meta_image = WEB_URL.'/assets/images/meta'.$_POST['meta_set_image'];
    $meta_image_text = $meta_image;
  }
  $meta_title_text =  $meta_title_text.' | 오피스 인테리어 하이픈디자인';
?>
  <title><?= $meta_title_text; ?></title>
  <meta name="author" content="FASTFIVE">
  <meta name="description" content="<?= $meta_description_text; ?>">
  <!-- 필수는 og 태그 -->
  <meta property="og:site_name" content="하이픈디자인">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="ko_KR">
  <meta property="og:url" content="<?= $base_URL; ?>">
  <meta property="og:title" content="<?= $meta_title_text; ?>">
  <meta property="og:description" content="<?= $meta_description_text; ?>">
  <meta property="og:image" content="<?= $meta_image_text; ?>">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="700">
  <!-- marketing tag -->
  <meta name="facebook-domain-verification" content="yei3586lhdtswj85sebj8cuvampss0" />
  <?php wp_head(); ?>
  <link rel="icon" href="<?= WEB_URL; ?>/assets/images/favicon.png" />
  <link rel="stylesheet" href="<?= WEB_URL; ?>/assets/lib/jquery-ui.css" type="text/css" />
  <link rel="stylesheet" href="<?= WEB_URL; ?>/assets/css/common.css" rel="prerender" />

  <!-- Start VWO Async SmartCode -->
  <link rel="preconnect" href="https://dev.visualwebsiteoptimizer.com" />
  <script type='text/javascript' id='vwoCode'>
  window._vwo_code || (function() {
    var account_id = 1042699,
      version = 2.1,
      settings_tolerance = 2000,
      hide_element = 'body',
      hide_element_style = 'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;transition:none !important;',
      /* DO NOT EDIT BELOW THIS LINE */
      f = false,
      w = window,
      d = document,
      v = d.querySelector('#vwoCode'),
      cK = '_vwo_' + account_id + '_settings',
      cc = {};
    try {
      var c = JSON.parse(localStorage.getItem('_vwo_' + account_id + '_config'));
      cc = c && typeof c === 'object' ? c : {}
    } catch (e) {}
    var stT = cc.stT === 'session' ? w.sessionStorage : w.localStorage;
    code = {
      nonce: v && v.nonce,
      use_existing_jquery: function() {
        return typeof use_existing_jquery !== 'undefined' ? use_existing_jquery : undefined
      },
      library_tolerance: function() {
        return typeof library_tolerance !== 'undefined' ? library_tolerance : undefined
      },
      settings_tolerance: function() {
        return cc.sT || settings_tolerance
      },
      hide_element_style: function() {
        return '{' + (cc.hES || hide_element_style) + '}'
      },
      hide_element: function() {
        if (performance.getEntriesByName('first-contentful-paint')[0]) {
          return ''
        }
        return typeof cc.hE === 'string' ? cc.hE : hide_element
      },
      getVersion: function() {
        return version
      },
      finish: function(e) {
        if (!f) {
          f = true;
          var t = d.getElementById('_vis_opt_path_hides');
          if (t) t.parentNode.removeChild(t);
          if (e)(new Image).src = 'https://dev.visualwebsiteoptimizer.com/ee.gif?a=' + account_id + e
        }
      },
      finished: function() {
        return f
      },
      addScript: function(e) {
        var t = d.createElement('script');
        t.type = 'text/javascript';
        if (e.src) {
          t.src = e.src
        } else {
          t.text = e.text
        }
        v && t.setAttribute('nonce', v.nonce);
        d.getElementsByTagName('head')[0].appendChild(t)
      },
      load: function(e, t) {
        var n = this.getSettings(),
          i = d.createElement('script'),
          r = this;
        t = t || {};
        if (n) {
          i.textContent = n;
          d.getElementsByTagName('head')[0].appendChild(i);
          if (!w.VWO || VWO.caE) {
            stT.removeItem(cK);
            r.load(e)
          }
        } else {
          var o = new XMLHttpRequest;
          o.open('GET', e, true);
          o.withCredentials = !t.dSC;
          o.responseType = t.responseType || 'text';
          o.onload = function() {
            if (t.onloadCb) {
              return t.onloadCb(o, e)
            }
            if (o.status === 200 || o.status === 304) {
              _vwo_code.addScript({
                text: o.responseText
              })
            } else {
              _vwo_code.finish('&e=loading_failure:' + e)
            }
          };
          o.onerror = function() {
            if (t.onerrorCb) {
              return t.onerrorCb(e)
            }
            _vwo_code.finish('&e=loading_failure:' + e)
          };
          o.send()
        }
      },
      getSettings: function() {
        try {
          var e = stT.getItem(cK);
          if (!e) {
            return
          }
          e = JSON.parse(e);
          if (Date.now() > e.e) {
            stT.removeItem(cK);
            return
          }
          return e.s
        } catch (e) {
          return
        }
      },
      init: function() {
        if (d.URL.indexOf('__vwo_disable__') > -1) return;
        var e = this.settings_tolerance();
        w._vwo_settings_timer = setTimeout(function() {
          _vwo_code.finish();
          stT.removeItem(cK)
        }, e);
        var t;
        if (this.hide_element() !== 'body') {
          t = d.createElement('style');
          var n = this.hide_element(),
            i = n ? n + this.hide_element_style() : '',
            r = d.getElementsByTagName('head')[0];
          t.setAttribute('id', '_vis_opt_path_hides');
          v && t.setAttribute('nonce', v.nonce);
          t.setAttribute('type', 'text/css');
          if (t.styleSheet) t.styleSheet.cssText = i;
          else t.appendChild(d.createTextNode(i));
          r.appendChild(t)
        } else {
          t = d.getElementsByTagName('head')[0];
          var i = d.createElement('div');
          i.style.cssText = 'z-index: 2147483647 !important;position: fixed !important;left: 0 !important;top: 0 !important;width: 100% !important;height: 100% !important;background: white !important;display: block !important;';
          i.setAttribute('id', '_vis_opt_path_hides');
          i.classList.add('_vis_hide_layer');
          t.parentNode.insertBefore(i, t.nextSibling)
        }
        var o = window._vis_opt_url || d.URL,
          s = 'https://dev.visualwebsiteoptimizer.com/j.php?a=' + account_id + '&u=' + encodeURIComponent(o) + '&vn=' + version;
        if (w.location.search.indexOf('_vwo_xhr') !== -1) {
          this.addScript({
            src: s
          })
        } else {
          this.load(s + '&x=true')
        }
      }
    };
    w._vwo_code = code;
    code.init();
  })();
  </script>
  <!-- End VWO Async SmartCode -->
  <!-- Google Tag Manager -->
  <script>
  (function(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src =
      'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', 'GTM-<?= $gtm_id ?>');
  </script>
  <!-- End Google Tag Manager -->
</head>

<body <?php body_class(); ?>>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-<?= $gtm_id ?>" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  <?php 
  $host = $_SERVER['REQUEST_URI'];
  $page_path = strpos($host, '&') ? strtok($host, '&') : strtok($host, '?');
  if (is_home() || is_front_page()) {
    $page_name = 'n_main';
  } else {
    $page_name = str_replace('/', '', 'n_'.$page_path);
    //신규 페이지 생성 시 확인 필요
    $page_name = strtok($page_name, '?');
  } 
  // menu active check
  function path_check($path) {
    if (CHECK_PATH == '/'.$path.'/') {
      echo '_active';
    }elseif(CHECK_PATH == '/'.'project'.'/'){
      if($path == 'portfolio'){
        echo '_active';
      }
    }elseif(CHECK_PATH == '/'.'about'.'/'){
      if($path == 'hyphen design'){
        echo '_active';
      }
    }
  }; 
  // formatted_contact_number
  $formatted_contact_number = str_replace('-', '.', CONTACT_NUMBER);
?>
  <h2 class="d_hidden" id="pageName"><?= $page_name; ?></h2>

  <main class="hyphen-visual-wrapper">
    <header class="header-wrapper">
      <div class="header-inner">
        <div class="inner_content">
          <h1 class="logo">
            <a href="/" class="ga4__GNB" ga4-text="logo_hd">
              <img src="<?= WEB_URL; ?>/assets/images/common/pc/logo_hyphen.png" alt="" class="img_resize img_logo" />
              <span class="hidden">HYPHEN DESIGN</span>
            </a>
          </h1>
          <!-- mb btns -->
          <div class="header-btns">
            <a href="javascript:;" class="bt-call bt_cta ga4__GNB">
              상담 신청
            </a>
            <a href="javascript:;" class="bt-menu">
              <span class="lines">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <span class="hidden">메뉴</span>
            </a>
          </div>
        </div>
        <div class="header-content">
          <p class="brand_title hidden_mo">
            오피스 인테리어 전문<br /> '하이픈디자인' 입니다
          </p>
          <nav>
            <?php
              $nav_items = [
                  [
                    "path" => "/project", 
                    "label" => "Portfolio"
                  ],
                  [
                    "path" => "/about", 
                    "label" => "Hyphen design"
                  ],
                  [
                    "path" => "/cost", 
                    "label" => "Cost", 
                  ],
                  [
                    "path" => "/benefit", 
                    "label" => "Benefit", 
                  ],
                  [
                    "label" => "Contact",
                    "class" => "contact"
                  ]
              ];
            ?>
            <ul class="header-nav">
              <?php foreach ($nav_items as $item): ?>
              <li>
                <a href="<?= isset($item['path']) ? $item['path'] : 'javascript:;'; ?>" class="ga4__GNB <?= isset($item['class']) ? $item['class'] : ''; ?> <?php path_check(strtolower($item['label'])); ?>" <?= isset($item['target']) ? 'target="_blank"' : ''; ?>>
                  <?= $item['label']; ?>
                </a>
              </li>
              <?php endforeach; ?>
            </ul>
          </nav>
          <!-- contact -->
          <address class="header-contact">
            <ul>
              <li>
                <span class="contact-title">Tel.</span>
                <a href="tel:<?php echo CONTACT_NUMBER; ?>" class="contact-info ga4__GNB">
                  <?php echo $formatted_contact_number; ?>
                </a>
              </li>
              <li>
                <span class="contact-title">Email.</span>
                <a href="mailto:<?php echo CONTACT_EMAIL; ?>" class="contact-info ga4__GNB">
                  <?php echo CONTACT_EMAIL; ?>
                </a>
              </li>
            </ul>
          </address>
        </div>
      </div>
    </header>
    <!-- leadForm -->
    <div class="side-lead-wrapper">
      <div class="side-lead-container">
        <div class="side-lead__header">
          <button type="button" class="bt_back">
            <span class="hidden">뒤로가기</span>
          </button>
          <button type="button" class="bt_close">
            <span class="hidden">팝업 닫기</span>
          </button>
        </div>
        <div class="side-lead-contents" ga4-text="contact_popup">
          <h2 class="contact_title">부담 없이 <br class="hidden_pc" /><strong>오피스 인테리어 전문가</strong>에게 <br />상담을 받으세요.</h2>
          <p class="desc">아래 정보를 남겨주시면 <br />우리 회사에 꼭 맞는 오피스 공간을 설계해 드립니다.</p>
          <?php echo do_shortcode( '[contact-form-7 id="ed17555" title="01.contact"]' ); ?>
        </div>
      </div>
    </div>
    <!-- dim -->
    <div class="dim"></div>