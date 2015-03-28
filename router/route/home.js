var express = require('express');
var router = express.Router();
var MainCategory = require('../../model/mainCategory.js');

router.get('/', function (req, res, next) {

  MainCategory.find(function (err, data) {

    if (err) return next(err);
    console.log(data);
    data = [

      {name: '男装/户外运动'},
      {name: '女鞋/男鞋/箱包'},
      {name: '女装/内衣'},
      {name: '化妆品/个人护理'},
      {name: '手机/数码/电脑办公'},
      {name: '母婴玩具'},
      {name: '零食/进口食品/酒'},
      {name: '大家电/生活电器'},
      {name: '家居建材'},
      {name: '汽车/配件/用品'}
    ];
    res.render('home', {mainCategories: data});
  });
});

module.exports = router;
