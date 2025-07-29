<?php include_once('includes/config.php'); ?>
<?php get_header(); ?>
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<?php the_content(); ?>
<?php endwhile; else: ?>
<!-- complete-wrapper -->
<section class="complete-wrapper">
  <h1 class="complete_title">원하시는 페이지를 <br class="hidden_pc" />찾을 수 없습니다</h1>
  <p class="complete_desc">
    입력하신 페이지의 주소가 정확한지<br class="hidden_pc" /> 다시 한번 확인해 주세요.
  </p>
</section>
<!-- //END :: complete-wrapper -->
<?php endif; ?>

<?php get_footer(); ?>