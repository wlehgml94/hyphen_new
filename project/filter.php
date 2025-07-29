<nav class="project_tabs _filter">
  <ul>
    <li><a href="javascript:;" data-name="프로젝트" class="ga4__tap_btn <?php startActive('프로젝트'); ?>">프로젝트</a></li>
    <li><a href="javascript:;" data-name="공간" class="ga4__tap_btn <?php startActive('공간'); ?>">공간</a></li>
  </ul>
</nav>
<div class="filter_list_wrap">
  <h2 class="filter_title">검색 필터</h2>
  <?php 
    foreach ($is_project as $name) {
      $customer_list = $customer_data[$name];
      //필터 항목 합치기
      foreach ($customer_list as $index => $customer) {
        $list_keys = $customer;
        $space = isset($customer['공간']) ? $customer['공간'] : null;
        $sectors = isset($customer['업종']) ? $customer['업종'] : null;
        array_push($list_space, $space);
        array_push($list_sectors, $sectors);
      }
      $list_space = array_values(array_unique($list_space));
      $list_area = [500, 1000, 2000, 3000, 4000];
      $list_sectors = array_values(array_unique($list_sectors));
      $customer_total = count($customer_list); 
  ?>
  <?php if ($name == '프로젝트') : ?>
  <div class="filter_list <?php startActive('프로젝트'); ?>" data-name="<?= $name; ?>">
    <section class="filter_box">
      <h2>면적</h2>
      <ul class="check_box">
        <?php foreach ($list_area as $index => $area) {
            $area_text;
            switch ($area) {
              case 500:
                $area_text = '500㎡ 이하';
                break;
              case 1000:
                $area_text = '501~1,000㎡';
                break;
              case 2000:
                $area_text = '1,001~2,000㎡';
                break;
              case 3000:
                $area_text = '2,001~3,000㎡';
                break;
              default:
              $area_text = '3,001㎡ 이상';
            }
          ?>
        <li>
          <input type="checkbox" id="area<?= $index; ?>" value="area<?= $index; ?>" name="area" />
          <label for="area<?= $index; ?>"><?= $area_text; ?></label>
        </li>
        <?php }; ?>
      </ul>
    </section>
    <section class="filter_box">
      <h2>업종</h2>
      <ul class="check_box">
        <?php 
          $etc_check = TRUE;
          $etc_index;
          $etc_text;
          foreach ($list_sectors as $index => $sectors) { 
            $etc_check = ($sectors == '기타') ? TRUE : FALSE;
            if (!$etc_check) {
              echo '<li><input type="checkbox" id="sector'.$index.'" value="sector'.$index.'" name="sector" /><label for="sector'.$index.'">'.$sectors.'</label></li>';
              continue;
            } else {
              $etc_index = $index;
              $etc_text = $sectors;
            }
          }
          echo '<li><input type="checkbox" id="sector'.$etc_index.'" value="sector'.$etc_index.'" name="sector" /><label for="sector'.$etc_index.'">'.$etc_text.'</label></li>';
          ?>
      </ul>
    </section>
    <div class="btn-group">
      <button class="bt_reload" disabled>초기화</button>
    </div>
  </div>
  <?php else : ?>
  <div class="filter_list <?php startActive('공간'); ?>" data-name="<?= $name; ?>">
    <section class="filter_box">
      <h2>공간</h2>
      <ul class="check_box">
        <?php foreach ($list_space as $index => $space) { 
            $etc_check = ($space == '기타') ? TRUE : FALSE;
            if (!$etc_check) { 
              echo '<li><input type="checkbox" id="space'.$index.'" value="space'.$index.'" name="space" /><label for="space'.$index.'">'.$space.'</label></li>';
              continue;
            } else {
              $etc_index = $index;
              $etc_text = $space;
            }
          }; 
          echo '<li><input type="checkbox" id="space'.$etc_index.'" value="space'.$etc_index.'" name="space" /><label for="space'.$etc_index.'">'.$etc_text.'</label></li>';
          ?>
      </ul>
    </section>
    <div class="btn-group">
      <button class="bt_reload" disabled>초기화</button>
    </div>
  </div>
  <?php endif; ?>
  <?php }; ?>
  <a href="javascript:;" class="bt_confirm">확인</a>
</div>
<a href="javascript:;" class="bt_close">닫기</a>