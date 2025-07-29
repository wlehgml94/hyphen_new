<?php
/**
 * Template Name: ABOUT
**/
  $meta_title = '브랜드 소개';
  $meta_description = '사무 공간만 구축해 온 전문가들이 시안보다 더 높은 퀄리티 인테리어 디자인을 합리적인 평당 비용으로 제안하는 사무실 인테리어 업체입니다.';
  $meta_image = '/about.jpg';
  include_once dirname(__FILE__, 1).'/includes/meta.php';
?>
<?php get_header(); ?>
<!-- ABOUT -->
<div class="about-wrapper common-inner">
  <div class="about_intro">
    <h2>
      하이픈디자인은
      <span class="deco_line"></span>
    </h2>
    <p>
      국내 1위 오피스 회사가 만든<br />
      오피스 인테리어만 전문으로 하는 회사입니다<br /><br />
      평균 연차 10.5년인 22명의 프로가<br />
      시안보다 더 높은 퀄리티의 결과물을 만듭니다<br /><br />
      <?= HD_TOTAL_OFFICE; ?>개 이상의 사무 공간을 구축했고<br />
      프로젝트에서 확인할 수 있는 것뿐만 아니라<br />
      고객이 상상하는 무엇이든 가능합니다<br /><br />
      건물 외관 리뉴얼 / 건물 통공사 / <br />루프탑 공사 / 반지하 공사<br />
      압도적인 실력으로 희귀한 프로젝트를 진행했고<br />
      서버 구축 / 보안 설비까지 올인원 구축이 가능하여<br />
      늘 최상의 결과물을 제안하고 만듭니다
    </p>
  </div>
  <section class="drag-container">
    <h3>
      하이픈디자인의 실력을 화살표를 움직여 직접 확인해 보세요<br />
      좌측이 시안, 우측이 실제 완성된 공간 사진입니다
    </h3>
    <!-- drag_content -->
    <?php
      $drag_content_num = 5;
      for ($i = 1; $i <= $drag_content_num; $i++) {
    ?>
    <div class="drag_content">
      <div class="drag_image">
        <img src="<?= WEB_URL; ?>/assets/images/about/pc/img_0<?= $i; ?>_before.jpg" alt="" class="img_resize img_before" />
        <img src="<?= WEB_URL; ?>/assets/images/about/pc/img_0<?= $i; ?>_after.jpg" alt="" class="img_resize img_after" />
        <input type="range" class="drag_slider" min="0" max="100" value="50" />
        <div class="drag_slider_button"></div>
      </div>
    </div>
    <?php }?>
  </section>
</div>
<!-- //END :: ABOUT -->
<?php get_footer(); ?>