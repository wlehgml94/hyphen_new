<section class="project_list">
  <?php foreach ($is_project as $name) { 
    $customer_list = $customer_data[$name];
    $customer_total = count($customer_list);
    $active_class = ($name == $name_project) ? ' _active' : '';
  ?>
  <div class="customer_list <?= startActive($name); ?>" data-name="<?= $name; ?>">
    <header class="customer_header">
      <ul>
        <li>고객사명</li>
        <li>상세 업종</li>
        <li>평수</li>
      </ul>
    </header>
    <?php
        //목록 출력 영역
        foreach ($customer_list as $index => $list) {
          //배열 값 유무 체크
          $is_thumbs = isset($list['이미지 파일명']) ? $list['이미지 파일명'] : null;
          $is_customer = isset($list['회사명']) ? $list['회사명'] : null ;
          $is_area = isset($list['면적']) ? $list['면적'] : null;
          $is_space = isset($list['공간']) ? $list['공간'] : null;
          $is_sectors = isset($list['업종']) ? $list['업종'] : null;
          $is_detail = isset($list['상세 업종']) ? $list['상세 업종'] : null;
          $is_link = isset($list['인블로그 랜딩 주소']) ? $list['인블로그 랜딩 주소'] : null;
          $is_new = isset($list['추천(new)']) ? $list['추천(new)'] : null;

          $thumbs_src = preg_replace('/\r\n|\r|\t|\n/','',$is_thumbs);
          $thumbs_src = str_replace(' ', '_', $thumbs_src);
          $thumbs_src = WEB_URL.'/assets/images/project/'.$thumbs_src;
          if ($is_thumbs && !strrpos($thumbs_src, '.jpg')) {
            $thumbs_src = $thumbs_src.'.jpg';
          }
        ?>
    <figure class="customer_box active">
      <a href="<?= $is_link; ?>" class="ga4__cta_btn_outlink" ga4-text="<?= $is_customer; ?>" target="_blank">
        <div class="thumbs">
          <img data-size="auto" srcset="<?= $thumbs_src; ?> 600w, <?= $thumbs_src; ?> 1200w" class="lazyload" alt="<?= $list['상세 업종']; ?>" onerror="imageError(this)" />
        </div>
        <dl>
          <dt><span><?= $is_customer; ?></span><?php if ($is_new) echo '<i class="icon_new">NEW</i>'; ?></dt>
          <dd><?= $is_detail; ?></dd>
          <dd><?= $is_area; ?></dd>
        </dl>
      </a>
    </figure>
    <?php }; ?>
  </div>
  <?php }; ?>
</section>