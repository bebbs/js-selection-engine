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

  for(var i=0; i < selectors.length; i++){
    if (selectors[i].indexOf('#') > -1){
      idSel = selectors[i].slice(1);
      elementWithId = document.getElementById(idSel);
    } else if (selectors[i].indexOf('.') > -1){
      classSel = selectors[i].slice(1);
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
  }

  return elements;
}