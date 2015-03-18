# js-selector-engine
###### Given a CSS selector, return an array of matching DOM elements

A simple JavaScript selection engine, implemented without the use of any libraries, or the built in document.querySelector / document.querySelectorAll JavaScript functions.

The key to this problem was first to split the selector passed as an argument to the function down into its component pieces. I evaluated each component against a regular expression to check whether it was a class or an id. Otherwise, I made the assumption that it would be an HTML tag:

```
var selectors = selector.split(/(?=#)|(?=\.)/);
```

Another interesting technique used in this project was to retrieve the `slice` method of an instantiated array, and then call it on a function passed in as an argument. This allowed me to 'borrow' the slice function and apply it to the result of another function:

```
elementsByClass = document.getElementsByClassName(classSel);
elementsWithClass = [].slice.call(elementsByClass);
``` 

## To run
First, clone this repository and change into the directory

```shell
git clone git@github.com:bebbs/js-selector-engine.git
cd js-selection-engine
```

To run the tests, open `Test.html` in a web browser and check the JavaScript console.
