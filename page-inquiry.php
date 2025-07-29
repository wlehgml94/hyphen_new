<?php
/**
 * Template Name: inquiry 히든 리드폼
**/
?>
<?php
  $meta_title = '인테리어 고민 해결';
  $meta_description = '사무실 인테리어 도대체 어떻게 해야 할지 고민인가요? 하이픈디자인이 함께 고민하고, 해결해 드릴게요!';
  $meta_image = '/inquiry.jpg';
  include_once dirname(__FILE__, 1).'/includes/meta.php';
  
  get_header();
?>
<div class="inquiry common-inner">
  <section class="common-leadform step1 active">
    <div class="inquiry-inner">
      <header class="common-box _left">
        <h2 class="common-title">
          <span>하이픈디자인만<br class="hidden_mo" />
          드릴 수 있는</span>
          사무실 인테리어 경험
        </h2>
        <div class="common-text">우리 회사에 <br class="hidden_mo" />딱! 필요한 인테리어가 <br />무엇인지 알려 드릴게요</div>
      </header>
      <div class="common-form">
        <div class="form-box">
        </div>
        <div class="btn-group">
          <a href="javascript:;" class="bt-base bt_next ga4__cta_leadform">고민 제출</a>
        </div>
      </div>
      <ul class="inquiry-talk">
        <li>
          <p>지금은 20명인데 <br class="hidden_mo" />나중에 늘어날 수도 있어서 <br />확장성 고려해야 해요.</p>
        </li>
        <li>
          <p>임원실은 따로 있어야 하는데, <br />너무 분리되면 <br class="hidden_mo" />소통이 안 될 것 같고...</p>
        </li>
        <li>
          <p>연구소 인증 받으려면 <br class="hidden_mo" />공간 요건이 있다던데, <br />어떻게 설계해야 할지 모르겠어요.</p>
        </li>
        <li>
          <p>예산이 빠듯한데 이쁘고, <br />직원들이 만족할 만한 <br class="hidden_mo" />방법 있을까요?</p>
        </li>
      </ul>
    </div>
  </section>
  <section class="common-leadform side-lead-contents step2">
    <div class="inquiry-inner">
      <header class="common-box _left">
        <h2 class="common-title">
          <span>기업 맞춤</span>
          해결책을<br class="hidden_mo" />
          드리겠습니다
        </h2>
        <div class="common-text">72시간 내로 전화를 드리거나 <br class="hidden_mo" />이메일을 보내드립니다</div>
      </header>
      <div class="common-form hidden-form">
        <p class="form_tit">맞춤 해결책을 받을 정보를 입력해 주세요</p>
        <?php echo do_shortcode( '[contact-form-7 id="20c2d93" title="01.고민상담"]' ); ?>
      </div>
    </div>
  </section>
</div>
<?php get_footer(); ?>