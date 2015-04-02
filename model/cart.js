var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CartSchema = new Schema({
  user: {type: Schema.ObjectId, ref: 'User'},
  cartItems: [{type: Schema.ObjectId, ref: 'CartItem'}
  ]
});

CartSchema.methods = {

  getTotal: function (cartItems) {
    var totalAmount = 0;
    cartItems.forEach(function (cartItem) {
      console.log(cartItem.getSubtotal());
      totalAmount += cartItem.getSubtotal();
    });
    return totalAmount;
  }
};

module.exports = mongoose.model('Cart', CartSchema);
