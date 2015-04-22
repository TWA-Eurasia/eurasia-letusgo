'use strict';
var moment = require('moment');

var createDate = moment().format('YYYY-MM-DD HH:mm:ss');
var users = [
  {
    _id: '5523cea79294d58a8e06c3bf',
    name: 'pppppppp',
    password: '瓶',
    address: '',
    email: '',
    phoneNumber: '',
    create: createDate,
    active: true
  }
];

module.exports = users;

