var accordion = (function (element) {
  var _getItem = function (elements, className) {
    var element = undefined;
    elements.forEach(function (item) {
      if (item.classList.contains(className)) {
        element = item;
      }
    });
    return element;
  };
  return function () {
    var _mainElement = {}, // .accordion
      _items = {}, // .accordion-item
      _contents = {}; // .accordion-item-content
    var _actionClick = function (e) {
        if (!e.target.classList.contains("accordion__item-header")) {
          return;
        }
        e.preventDefault();

        var header = e.target,
          item = header.parentElement,
          itemActive = _getItem(_items, "show");
        if (itemActive === undefined) {
          item.classList.add("show");
        } else {
          itemActive.classList.remove("show");

          if (itemActive !== item) {
            item.classList.add("show");
          }
        }
      },
      _setupListeners = function () {
        _mainElement.addEventListener("click", _actionClick);
      };
    return {
      init: function (element) {
        _mainElement =
          typeof element === "string"
            ? document.querySelector(element)
            : element;
        _items = _mainElement.querySelectorAll(".accordion__item");
        _setupListeners();
      },
    };
  };
})();

var accordion1 = accordion();
accordion1.init("#accordion");
