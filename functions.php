<?php
/**
 * Functions - Child theme custom functions
 */


/************************************************************************************************
***************** CAUTION: do not remove or edit anything within this section ******************/

/**
 * Makes the Divi Children Engine available for the child theme.
 * Do not remove this, your child theme will not work.
 */

add_filter ( 'wp_get_attachment_url', 'make_url_relative');
function make_url_relative ($url) {
    $relativeURL = wp_make_link_relative($url);
    return $relativeURL;
}

//br delete
add_filter('tiny_mce_before_init','change_mce_options', 10, 1);
function change_mce_options($init){
	$init["forced_root_block"] = false;
	$init["force_br_newlines"] = false;
	$init["force_p_newlines"] = false;
	$init["convert_newlines_to_brs"] = false;
	$init["apply_source_formatting"] = false;
	$init["remove_redundant_brs"] = false;
	$init["remove_linebreaks"] = false;
	return $init;
}

//include
function cn_include_content($pid) {
	$thepageinquestion = get_post($pid);
	$content = $thepageinquestion->post_content;
	$content = apply_filters('the_content', $content);
	$content = str_replace(']]>', ']]>', $content);
	echo $content;
}
function cn_include_page( $atts, $content = null ) {
	extract(shortcode_atts(array('id' => ''), $atts));
	cn_include_content($id);
}
add_shortcode('includepage', 'cn_include_page');
//[includepage id=”42″]

// ip 주소 가져오기
add_filter('wpcf7_form_hidden_fields','add_hidden_ip_field');
function add_hidden_ip_field($fields) {
  $fields['_wpcf7_ip'] = get_ip_address(); //get the remote IP
  return $fields;
}

function get_ip_address() {
	foreach (array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR') as $key){
		if (array_key_exists($key, $_SERVER) === true){
			foreach (explode(',', $_SERVER[$key]) as $ip){
				$ip = trim($ip); // just to be safe
				
				if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false){
					return $ip;
				}
			}
		}
	}
}
/***********************************************************************************************/
/*- You can include any custom code for your child theme below this line -*/

function replace_content( $content = null ){
	$base_URL = (@$_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://';
	$base_URL .= ($_SERVER['SERVER_PORT'] != '88') ? $_SERVER['HTTP_HOST'].':'.$_SERVER['SERVER_PORT'] : $_SERVER['HTTP_HOST'];
	$relative_path = preg_replace('`\/[^/]*\.php$`i', '', $_SERVER['PHP_SELF']);
	$web_path = $base_URL.'/wp-content/themes/hyphen_v2/'.$relative_path;
	$content = str_replace('@@webRoot', $web_path, $content);
	return $content;
}
add_filter('the_content', 'replace_content');

// disable specific page
function shapeSpace_disable_sitemap_specific_page($args, $post_type) {
	if ('page' !== $post_type) return $args;
	$args['post__not_in'] = isset($args['post__not_in']) ? $args['post__not_in'] : array();
	$args['post__not_in'][] = 18;
	$args['post__not_in'][] = 85;
	$args['post__not_in'][] = 15;
	return $args;
}
add_filter('wp_sitemaps_posts_query_args', 'shapeSpace_disable_sitemap_specific_page', 10, 2);

?>
