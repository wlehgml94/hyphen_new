<?php
/**
 * Template Name: 프로젝트
**/
?>
<?php 
  $meta_title = '프로젝트';
  $meta_description = '다양한 사무실 인테리어 평형대 사례를 통해 사무실 인테리어 컨셉, 트렌드, 디자인을 확인해 보세요!';
  $meta_image = '/project.jpg';
  include_once dirname(__FILE__, 1).'/includes/meta.php';
  get_header(); 
?>
<?php
  $json_string = file_get_contents(dirname(__FILE__, 1).'/assets/data/customer_data.json');
  $customer_data = json_decode($json_string, true);
  $list_space = [];
  $list_sectors = [];
  function sector_index($check) {
    if (is_array($check)) {
      $min = min(array_keys($check));
      foreach ($check as $index => $sec) {
        $space = '';
        if ($index !== $min) {
          $space = ' ';
        }
        return $space.'sector'.$index;
      }
    } else {
      return 'sector'.$check;
    }
  }
  $is_project = array_keys($customer_data);
  $name_project = '프로젝트';
  $filter_etc = '기타';

  //PC, MO 탭 별도로 있음
  function startActive($name) {
    global $name_project;
    if ($name_project == $name) echo '_active';
  }
?>
<!-- project_wrapper -->
<div class="project_wrapper">
  <div class="project_header">
    <nav class="project_tabs _contents">
      <ul>
        <li><a href="javascript:;" data-name="프로젝트" class="ga4__tap_btn <?php startActive('프로젝트'); ?>">프로젝트</a></li>
        <li><a href="javascript:;" data-name="공간" class="ga4__tap_btn <?php startActive('공간'); ?>">공간</a></li>
      </ul>
    </nav>
    <div class="select_view">
      <ul>
        <li class="_view_2" data-num="2">
          <a href="javascript:;">
            <span class="hidden">2단으로 보기</span>
          </a>
        </li>
        <li class="_view_4" data-num="4">
          <a href="javascript:;">
            <span class="hidden">4단으로 보기</span>
          </a>
        </li>
        <li class="_view_1" data-num="1">
          <a href="javascript:;">
            <span class="hidden">줄글로 보기</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="project_content">
    <?php include 'project/list.php'; ?>
  </div>
</div>
<!-- //END :: project_wrapper -->
<?php get_footer(); ?>