'use strict';

var Indent = require('../model/indent');
var Item = require('../model/item');
var CartItem = require('../model/cartItem');

var createIndent = function(req, res) {

  var currentIndent = req.body;
  var currentUserId = req.session.currentUserId;

  currentIndent.cartItems = currentIndent['cartItems[]'];
  currentIndent.user = currentUserId;

  Indent.create(currentIndent, function (err, indent) {

    var data = {};
    if(err) {

      data = {
        status: 500,
        data: indent,
        message: '订单生成失败！'
      };
    }else {

        data = {
          status: 200,
          data: indent,
          message: '订单生成成功！'
        };
      }

    req.session.currentIndent = indent._id;
    res.send(data);
  });
};

module.exports = {
  createIndent: createIndent
};
