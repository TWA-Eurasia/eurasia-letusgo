var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var date = new Date();

var IndentSchema = new Schema({
  user: {type: Schema.ObjectId, ref: 'User'},

  itemList: [{
    item: {type: Schema.ObjectId, ref: 'Item'},
    number: Number,
    subtotal: Number
  }],
  amount: Number,
  date: {type: Date,default: date.toLocaleDateString("zh-cn")},
  isPaid: {type: Boolean, default: false}
});

module.exports = mongoose.model('Indent',IndentSchema);
