var express = require('express');
var router = express.Router();

var User = require('../../model/user');

router.post('/:id', function(req, res){

  var userId = req.params.id;
  var indentId = req.body.indentId;

//  User.update({_id: userId}, {$set:{indents : [indentId]}}, function(err, user){
//console.log(user.indents);
//    res.send('add indent to user is successful');
//  });
//  551cbc22ff9c98ae4e3d38fa
console.log('user: ' + userId);

  User.update(userId,  {$set: {indents: ['551cbc22ff9c98ae4e3d38fa']}}, function(err, user){
console.log(user+ '================');
    res.send('add indent to user is successful');
  });
});

module.exports = router;
