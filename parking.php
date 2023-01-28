<?php

/**
 * Plugin Name: parking
 * Description: Test plugin to provide support for parking calendar etc.
 * Author: Thomas Madden & Josh Hallinan
 * Author URL:
 * Version: 0.1
 *
 * @package parking
 */
add_action('init', 'parking_add_custom_shortcode');
function parking_add_custom_shortcode()
{
  add_shortcode('parking', 'parking_parking');
}


function parking_parking($atts, $content = "")
{
  return '<div id="root"></div>';
}


add_action('wp_enqueue_scripts', 'parking_enq_react');
function parking_enq_react()
{
  global $post, $wpdb;

  // Check if post has shortcode to determine wether to load the SPA
  // https://wordpress.stackexchange.com/a/207749
  if (has_shortcode($post->post_content, 'parking')) {
    wp_enqueue_script(
      'parking-plugin-react-script',
      plugin_dir_url(__FILE__) . '/js/build/index.js',
      ['wp-element'],
      rand(), // Change this to null for production
      true
    );

    wp_enqueue_style(
      'parking-plugin-react-style',
      plugin_dir_url(__FILE__) . '/js/build/index.css',
      array(),
      false,
    );
  }
}
