'use strict';

var parseString = function (name, length) {


  var result = '';
  var nameLength = name.length;
  var charLength = name.replace(/[^\x00-\xff]/g, '**').length;

  if(charLength <= length) {

    return name;
  }

  for(var i = 0, j = 0; i < nameLength; i++) {

    var char = name.charAt(i);
    j += (/[\x00-\xff]/.test(char) ? 1 : 2);

    if(j <= length) {
      result += char;
    } else {
      return result + '...';
    }
  }
};

module.exports = {
  parseString: parseString
};
