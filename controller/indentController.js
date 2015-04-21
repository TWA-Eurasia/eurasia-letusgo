'use strict';

var Indent = require('../model/indent');
var Item = require('../model/item');
var CartItem = require('../model/cartItem');

var getIndent = function (req, res) {

  //Indent.findById('551fd16975cd55ed0cfa5503')
  //  .populate('cartItems')
  //  .exec(function (err, indent) {
  //  console.log(indent);
  //    Item.populate(indent, 'cartItems.item', function (err) {
  //
  //      if (err) {
  //        throw err;
  //      }
  //
  //      var total = indent.getTotal(indent.cartItems);
  //      res.send({indent: indent, total: total});
  //    });
  //  });

  Indent.findById('551fd16975cd55ed0cfa5503', function (err, indent) {
    CartItem.populate(indent, 'cartItems', function (err, result) {
      console.log(result);
      res.send(result);
    });
  });
};

var createIndent = function(req, res) {

  var currentIndent = req.body;

  console.log(currentIndent);
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
    res.send(data);
  });
};

module.exports = {
  getIndent: getIndent,
  createIndent: createIndent
};
