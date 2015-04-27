'use strict';

var Item = require('../model/item');
var Indent = require('../model/indent');
var FormatUtil = require('../util/formatUtil.js');

var NAME_LENGTH = 16;
var CREATE_INDENT_SUCCESS = '订单生成成功';

function getShortedCartItemName(cartItems) {

  var shortedCartItemName = '';

  cartItems.forEach(function (cartItem) {
    if (cartItem.number > cartItem.item.inventory) {
      shortedCartItemName += cartItem.item.name + '、';
    }
  });

  return shortedCartItemName.substring(0, shortedCartItemName.length - 1);
}

var getIndentInfo = function(req, res, next) {

  var currentIndent = req.session.currentIndent;

  Indent.findById(currentIndent)
    .populate('cartItems')
    .exec()
    .then(function(indent) {

      return Item.populate(indent, 'cartItems.item');
    })
    .then(function(indent) {

      indent.cartItems.forEach(function(cartItem) {

        cartItem.item.shortName = FormatUtil.parseString(cartItem.item.name, NAME_LENGTH);
      });

      var total = indent.getTotal(indent.cartItems);
      var shortedCartItemName = getShortedCartItemName(indent.cartItems);

      res.render('indent', {
        currentUserName: req.session.currentUserName,
        cartItems: indent.cartItems,
        total: total,
        indent: indent,
        shortedCartItemName: shortedCartItemName
      });
    })
    .onReject(function(err) {
      next(err);
    });
};
var getSuccessInfo = function(req, res, next) {

  var currentIndent = req.session.currentIndent;

  Indent.findById(currentIndent)
    .populate('cartItems')
    .exec()
    .then(function(indent) {

      return Item.populate(indent, 'cartItems.item');
    })
    .then(function(indent) {

      var total = indent.getTotal(indent.cartItems);

      res.render('success', {
        currentUserName: req.session.currentUserName,
        total: total
      });
    })
    .onReject(function(err) {
      next(err);
    });
};

var createIndent = function(req, res, next) {

  var currentIndent = req.body;
  var currentUserId = req.session.currentUserId;

  currentIndent.cartItems = currentIndent['cartItems[]'];
  currentIndent.user = currentUserId;
  var data = {};
  Indent.create(currentIndent)
    .then(function(indent) {
      data = {
        status: 200,
        data: indent,
        message: '订单生成成功！'};
      req.session.currentIndent = indent._id;
      res.send(data);
    })
    .onReject(function(err) {
      next(err);
    });
};

module.exports = {

  getIndentInfo: getIndentInfo,
  getSuccessInfo: getSuccessInfo,
  createIndent: createIndent
};
