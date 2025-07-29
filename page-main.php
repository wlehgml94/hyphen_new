<?php
/**
 * Template Name: 메인
**/

  // main images
  $json_string = file_get_contents(dirname(__FILE__, 1).'/assets/data/main_data.json');
  $data = json_decode($json_string, true); 
?>
<?php get_header(); ?>
<!-- main-contents  -->
<div class="main-contents">
  <h2 class="brand_title hidden_pc">
    오피스 인테리어 전문<br /> '하이픈디자인' 입니다
  </h2>
  <ul class="work_list">
    <?php foreach ($data['main_images'] as $index => $item): 
      $item['clean_href'] = htmlspecialchars(trim($item['href'] ?? '', '/'), ENT_QUOTES, 'UTF-8');
      $item['href'] = htmlspecialchars($item['href'] ?? '', ENT_QUOTES, 'UTF-8');
      $has_href = !empty($item['href']); 
    ?>
    <li class="<?= !empty($item['half']) ? 'half' : ''; ?>">
      <a href="<?= $has_href ? $item['href'] : 'javascript:;'; ?>" class="ga4__cta_btn_outlink <?= $has_href ? '' : 'event_none'; ?>" ga4-text="image_<?= $index + 1; ?>" target="<?= $has_href ? '_blank' : ''; ?>">
        <img src="<?= WEB_URL; ?>/assets/images/main/pc/<?= $item['img']; ?>" alt="" class="img_resize" />
      </a>
    </li>
    <?php endforeach; ?>

  </ul>
  <div class="bt-wrapper bt-wrapper-main">
    <a href="/project" class="ga4__cta_btn_link bt-base bt-main">더 많은 포트폴리오 보기</a>
  </div>
</div>
<?php get_footer(); ?>
<!-- //END :: main-contents -->