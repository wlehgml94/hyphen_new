<?php
  if (isset($page_title)) {
    $page_set_title = $page_title;
    $_POST['page_set_title'] = $page_set_title;
  }
  if (isset($meta_title)) {
    $meta_set_title = $meta_title;
    $_POST['meta_set_title'] = $meta_set_title;
  }
  if (isset($meta_description)) {
    $meta_set_description = $meta_description;
    $_POST['meta_set_description'] = $meta_set_description;
  }
  if (isset($meta_image)) {
    $meta_set_image = $meta_image;
    $_POST['meta_set_image'] = $meta_set_image;
  }
?>