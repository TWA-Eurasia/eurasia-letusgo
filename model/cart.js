var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CartSchema = new Schema({
    user:{type: Schema.ObjectId, ref: 'User'},
    cartItems: [{
      item : {type : Schema.ObjectId, ref: 'Item'},
      number: Number,
      indented: {type:Boolean,default:false}
    }]
  });
module.exports = mongoose.model('Cart',CartSchema);
