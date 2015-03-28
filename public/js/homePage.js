'use strict';
require.config({
  baseUrl: './',
  paths: {
    'jquery': './jquery/dist/jquery',
    'semantic': './semantic-ui/dist/semantic',
  }
});

require(['semantic', 'jquery'], function (semantic, $) {

  $(document).ready(function () {

    console.log($('.top')[0].addClass('dropdown'));

    $('.top')[0].append(
      '<div class="menu">'+
      '<a class="item">Edit Profile</a>'+
      '<a class="item"><i class="globe icon"></i> Choose Language</a>'+
      '<a class="item"><i class="settings icon"></i> Account Settings</a>'+
      '</div> '
    );
  });

});
