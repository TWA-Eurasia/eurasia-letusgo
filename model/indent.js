var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var IndentSchema = new Schema({
  user: {type: Schema.ObjectId, ref: 'User'},

  items: [{
    item: {type: Schema.ObjectId, ref: 'Item'},
    number: Number
  }],
  date: Date,
  isPaid: {type: Boolean, default: false}
});

module.exports = mongoose.model('Indent',IndentSchema);
