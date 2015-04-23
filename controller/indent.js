'use strict';

var Indent = require('../model/indent');

var CREATE_INDENT_SUCCESS = '订单生成成功';

var createIndent = function(req, res, next) {

  var currentIndent = req.body;
  var currentUserId = req.session.currentUserId;

  currentIndent.cartItems = currentIndent['cartItems[]'];
  currentIndent.user = currentUserId;

  Indent.create(currentIndent)
    .then(function(indent) {

      req.session.currentIndent = indent._id;
      res.send({state: 200, data: indent, message: CREATE_INDENT_SUCCESS});
    })
    .onReject(function(err) {

      next(err);
    });
};

module.exports = {
  createIndent: createIndent
};
