function Slider(sldrId) {
  let id = document.getElementById(sldrId);
  if (id) {
    this.sldrRoot = id;
  } else {
    this.sldrRoot = document.querySelector(".slider");
  }
  this.sldrList = this.sldrRoot.querySelector(".slider__content");
  this.sldrElements = this.sldrList.querySelectorAll(".slider__content-item");
  this.sldrElemFirst = this.sldrList.querySelector(".slider__content-item");
  this.indicatorDots = this.sldrRoot.querySelector("div.slider__dots");
  this.options = Slider.defaults;
  Slider.initialize(this);
}

Slider.defaults = {
  loop: true,
  auto: true,
  interval: 2000,
  dots: true,
};

Slider.prototype.elemPrev = function (num) {
  num = num || 1;

  let prevElement = this.currentElement;
  this.currentElement -= num;
  if (this.currentElement < 0) this.currentElement = this.elemCount - 1;

  this.sldrElements[this.currentElement].style.opacity = "1";
  this.sldrElements[prevElement].style.opacity = "0";

  if (this.options.dots) {
    this.dotOn(prevElement);
    this.dotOff(this.currentElement);
  }
};

Slider.prototype.elemNext = function (num) {
  num = num || 1;

  let prevElement = this.currentElement;
  this.currentElement += num;
  if (this.currentElement >= this.elemCount) this.currentElement = 0;

  this.sldrElements[this.currentElement].style.opacity = "1";
  this.sldrElements[prevElement].style.opacity = "0";

  if (this.options.dots) {
    this.dotOn(prevElement);
    this.dotOff(this.currentElement);
  }
};

Slider.prototype.dotOn = function (num) {
  this.indicatorDotsAll[num].style.cssText =
    "background-color:#1f1a17; cursor:pointer;";
};

Slider.prototype.dotOff = function (num) {
  this.indicatorDotsAll[num].style.cssText =
    "background-color:#e32d34; cursor:default;";
};

Slider.initialize = function (that) {
  that.elemCount = that.sldrElements.length;

  that.currentElement = 0;
  let bgTime = getTime();

  function getTime() {
    return new Date().getTime();
  }
  function setAutoScroll() {
    that.autoScroll = setInterval(function () {
      let fnTime = getTime();
      if (fnTime - bgTime + 10 > that.options.interval) {
        bgTime = fnTime;
        that.elemNext();
      }
    }, that.options.interval);
  }

  if (that.elemCount <= 1) {
    that.options.auto = false;
    that.options.dots = false;
  }
  if (that.elemCount >= 1) {
    that.sldrElemFirst.style.opacity = "1";
  }

  if (!that.options.loop) {
    that.options.auto = false;
  } else if (that.options.auto) {
    setAutoScroll();

    that.sldrList.addEventListener(
      "mouseenter",
      function () {
        clearInterval(that.autoScroll);
      },
      false
    );
    that.sldrList.addEventListener("mouseleave", setAutoScroll, false);
  }

  if (that.options.dots) {
    let sum = "",
      diffNum;
    for (let i = 0; i < that.elemCount; i++) {
      sum += '<span class="slider-dot"></span>';
    }
    that.indicatorDots.innerHTML = sum;
    that.indicatorDotsAll = that.sldrRoot.querySelectorAll("span.slider-dot");

    for (let n = 0; n < that.elemCount; n++) {
      that.indicatorDotsAll[n].addEventListener(
        "click",
        function () {
          diffNum = Math.abs(n - that.currentElement);
          if (n < that.currentElement) {
            bgTime = getTime();
            that.elemPrev(diffNum);
          } else if (n > that.currentElement) {
            bgTime = getTime();
            that.elemNext(diffNum);
          }
        },
        false
      );
    }
    that.dotOff(0);
    for (let i = 1; i < that.elemCount; i++) {
      that.dotOn(i);
    }
  }
};

new Slider();

$(document).ready(function(){
  $('.achievement__slider').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 360,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }  
      ]
  });
});