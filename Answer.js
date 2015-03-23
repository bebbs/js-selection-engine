var $ = function (selector) {
  var selectors = selector.split(/(?=#)|(?=\.)/)
  var pageElements = [].slice.call(document.body.children);
  var elementSelector = new ElementSelector(pageElements, selectors);
  return elementSelector.getMatchingElements();
}

function ElementSelector(elements, selectors) {
  this.selector = new Object;
  this.selectorTypes(selectors);
  this.elements = elements;
  this.arr = [];
}

ElementSelector.prototype.hasId = function(selector) {
  return (selector[0] === '#');
};

ElementSelector.prototype.hasClass = function(selector) {
  return (selector[0] === '.');
}

ElementSelector.prototype.selectorTypes = function(selectors) {
  selectors.forEach((function(selector) {
    if (!selector.match(/\W/)) this.selector.elementTag = selector.toUpperCase();
    if (this.hasId(selector)) this.selector.elementId = selector.slice(1);
    if (this.hasClass(selector)) this.selector.elementClass = selector.slice(1);
  }).bind(this));
};

ElementSelector.prototype.pushIfTag = function(element) {
  if (!this.selector.elementId && !this.selector.elementClass) {
    this.arr.push(element);
  }
  this.pushIfClassOrId(element);
};

ElementSelector.prototype.pushIfClassOrId = function(element) {
  if (this.selector.elementId = element.id) this.arr.push(element);
  else if (this.selector.elementClass === element.className.split(' ')[0]) {
    this.arr.push(element);
  };
};

ElementSelector.prototype.getMatchingElements = function() {
  this.elements.forEach((function(element) {
    if (this.selector.elementTag === element.tagName) this.pushIfTag(element);
    else if (!this.selector.elementTag) this.pushIfClassOrId(element);
  }).bind(this));
  return this.arr;
};