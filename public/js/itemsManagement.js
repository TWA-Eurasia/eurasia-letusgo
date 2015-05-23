'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$('.itemName').popup({
  content: $(this).prop('data-content')
});
