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
      for (var n=0; n < classes.length; n++){
        if (tags[i] === classes[n]){
          elements.push(tags[i]);
        }
      }
    }
  }

  var hasId = function(i){
    return (selectors[i].indexOf('#') > -1);
  }

  var hasClass = function(i){
    return (selectors[i].indexOf('.') > -1);
  }

  var getDomElement = function(i){
    return selectors[i].slice(1);
  }

  for(var i=0; i < selectors.length; i++){
    if (hasId(i)){
      idSel = getDomElement(i);
      elementWithId = document.getElementById(idSel);
    } else if (hasClass(i)){
      classSel = getDomElement(i);
      elementsByClass = document.getElementsByClassName(classSel)
      elementsWithClass = [].slice.call(elementsByClass)
    } else {
      tagSel = selectors[i];
      elementsByTag = document.getElementsByTagName(tagSel);
      elementsWithTag = [].slice.call(elementsByTag);
    }
  }

  if (elementWithId){
    if (elementsWithTag){
      for (var i=0; i < elementsWithTag.length; i++){
        addElementsWithIdentical(elementWithId, elementsWithTag[i]);
      }
    } else {
      elements.push(elementWithId);
    }
  } else {
    if (elementsWithClass.length > 0){
      elementsWithTag ? addSameElements(elementsWithTag, elementsWithClass) : addAllElementsFrom(elementsWithClass)
    } else {
      addAllElementsFrom(elementsWithTag)
    }
  }

  return elements;
}