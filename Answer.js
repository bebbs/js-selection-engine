var $ = function (selector) {
  var elements = [];
  var elementWithId, elementsWithTag, elementsWithClass = [];
  var arr = [];
  var selectors = selector.split(/(?=#)|(?=\.)/);

  var addAllElementsFrom = function(array){
    for (var i=0; i < array.length; i++){
      elements.push(array[i]);
    }
  }

  var addElementsWithIdentical = function(id, tag){
    id === tag ? elements.push(id) : elements = []
  }

  var addSameElements = function(tags, classes){
    for (var i=0; i < tags.length; i++){
      addClassElementsFor(tags, classes, i)
    }
  }

  var addClassElementsFor = function(tags, classes, i) {
    for (var n=0; n < classes.length; n++){
      if (tags[i] === classes[n]){
        elements.push(tags[i]);
      }
    }
  }

  var hasId = function(i){
    return (selectors[i].indexOf('#') > -1);
  }

  var hasClass = function(i){
    return (selectors[i].indexOf('.') > -1);
  }

  var getDomElementWithId = function(i){
    idSel = getDomElement(i);
    elementWithId = document.getElementById(idSel);
  }

  var getDomElementsWithClass = function(i){
    classSel = getDomElement(i);
    elementsByClass = document.getElementsByClassName(classSel);
    elementsWithClass = [].slice.call(elementsByClass);
  }

  var getDomElementsWithTag = function(i){
    tagSel = selectors[i];
    elementsByTag = document.getElementsByTagName(tagSel);
    elementsWithTag = [].slice.call(elementsByTag);
  }

  var getDomElement = function(i){
    return selectors[i].slice(1);
  }

  var pushElementWithId = function(){
    if (elementsWithTag){
      for (var i=0; i < elementsWithTag.length; i++){
        addElementsWithIdentical(elementWithId, elementsWithTag[i]);
      }
    } else {
      elements.push(elementWithId);
    }
  }

  var pushElementsWithClass = function(){
    if (elementsWithClass.length > 0){
      elementsWithTag ? addSameElements(elementsWithTag, elementsWithClass) : addAllElementsFrom(elementsWithClass)
    } else {
      addAllElementsFrom(elementsWithTag)
    }
  }

  for(var i=0; i < selectors.length; i++){
    if (hasId(i)){
      getDomElementWithId(i);
    } else if (hasClass(i)){
      getDomElementsWithClass(i);
    } else {
      getDomElementsWithTag(i);
    }
  }

  if (elementWithId){
    pushElementWithId();
  } else {
    pushElementsWithClass();
  }

  return elements;
}