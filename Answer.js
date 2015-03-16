var $ = function (selector) {
  var elements = [];

  var all = document.body.getElementsByTagName('*');

  for(var i=0; i <= all.length; i++) {
    if (matchesSelector(selector, all[i]) === true) {
      elements.push(all[i])
    }
  }

  return elements;
}

var matchesSelector = function(selector, element) {

  var expected = 88888;

  element.addRule(selector, 'z-index:' + expected + ';', -1);

  var match = element.currentStyle.zIndex == expected;

  element.removeRule(rules.length-1);

  return match;
}