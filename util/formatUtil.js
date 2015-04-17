'use strict';

var parseString = function (name, length) {


  var result = '';
  var nameLength = name.length;
  var charLength = name.replace(/[^\x00-\xff]/g, '**').length;

  if(charLength <= length) {

    return name;
  }

  for(var index = 0, visibleLength = 0; index < nameLength; index++) {

    var char = name.charAt(index);
    visibleLength += (/[\x00-\xff]/.test(char) ? 1 : 2);

    if(visibleLength <= length) {

      result += char;
    } else {
      
      return result + '...';
    }
  }
};

module.exports = {
  parseString: parseString
};
