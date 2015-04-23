'use strict';

var Indent = require('../model/indent');

var Item = require('../model/item');

var getIndent = function (req, res) {

  var indentId = req.session.currentIndent;

  Indent.findById(indentId)

    .populate('cartItems')
    .exec(function (err, indent) {

      Item.populate(indent, 'cartItems.item', function (err) {

        if (err) {
          throw err;
        }

        var total = indent.getTotal(indent.cartItems);
        res.send({total: total});
      });
    });
};

var createIndent = function(req, res, next) {

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
  createIndent: createIndent,
  getIndent: getIndent
};
