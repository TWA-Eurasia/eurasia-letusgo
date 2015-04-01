var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
  user: {type: Schema.ObjectId, ref: 'User'},
  cartItems: [{type: Schema.ObjectId, ref: 'CartItem'}
  ]
});
module.exports = mongoose.model('Cart', CartSchema);
