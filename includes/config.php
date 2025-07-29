<?php
  $host = $_SERVER['HTTP_HOST'];
  $path = $_SERVER['REQUEST_URI'];
  $path = strpos($path, '?type') ? strtok($path, '&') : strtok($path, '?');
  //$path = strtok($path, '?');
  //echo $path;

	$base_URL = (@$_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://';
	$base_URL .= $_SERVER['HTTP_HOST'];
	$relative_path = preg_replace('`\/[^/]*\.php$`i', '', $_SERVER['PHP_SELF']);
	$web_path = $base_URL.'/wp-content/themes/hyphen_v2'.$relative_path;

  $submit = "/(submit)/";
  $check_submit = preg_match($submit, $path);
  $check_others = $check_submit || is_404() || is_page('privacy');

  // info
  $contact_number = '02-2138-0590';
  $contact_email = 'hyphen@fastfive.co.kr';

  
  
  define('THIS_DOMAIN', $base_URL);
  define('CHECK_PATH', $path);
  define('WEB_URL', $web_path);
  //기타 페이지 체크
  define('CHECK_SUBMIT', $check_submit);
  define('CHECK_OTHERS', $check_others);
  // 홈페이지 정보
  define('CONTACT_NUMBER', $contact_number);
  define('CONTACT_EMAIL', $contact_email);
  define('FF_TOTAL', 56); //총 지점수
  define('HD_TOTAL_OFFICE', 150); //총 건축수
?>