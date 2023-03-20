"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[584],{

/***/ 3533:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Print)
});

// EXTERNAL MODULE: ./node_modules/ol-ext/util/ext.js
var ext = __webpack_require__(7395);
// EXTERNAL MODULE: ./node_modules/ol/control/Control.js
var Control = __webpack_require__(4224);
;// CONCATENATED MODULE: ./node_modules/ol-ext/util/element.js
/** Vanilla JS helper to manipulate DOM without jQuery
 * @see https://github.com/nefe/You-Dont-Need-jQuery
 * @see https://plainjs.com/javascript/
 * @see http://youmightnotneedjquery.com/
 */
var ol_ext_element = {};
/**
 * Create an element
 * @param {string} tagName The element tag, use 'TEXT' to create a text node
 * @param {*} options
 *  @param {string} options.className className The element class name 
 *  @param {Element} options.parent Parent to append the element as child
 *  @param {Element|string} options.html Content of the element
 *  @param {string} options.* Any other attribut to add to the element
 */

ol_ext_element.create = function (tagName, options) {
  options = options || {};
  var elt; // Create text node

  if (tagName === 'TEXT') {
    elt = document.createTextNode(options.html || '');
    if (options.parent) options.parent.appendChild(elt);
  } else {
    // Other element
    elt = document.createElement(tagName);
    if (/button/i.test(tagName)) elt.setAttribute('type', 'button');

    for (var attr in options) {
      switch (attr) {
        case 'className':
          {
            if (options.className && options.className.trim) elt.setAttribute('class', options.className.trim());
            break;
          }

        case 'html':
          {
            if (options.html instanceof Element) elt.appendChild(options.html);else if (options.html !== undefined) elt.innerHTML = options.html;
            break;
          }

        case 'parent':
          {
            if (options.parent) options.parent.appendChild(elt);
            break;
          }

        case 'style':
          {
            this.setStyle(elt, options.style);
            break;
          }

        case 'change':
        case 'click':
          {
            ol_ext_element.addListener(elt, attr, options[attr]);
            break;
          }

        case 'on':
          {
            for (var e in options.on) {
              ol_ext_element.addListener(elt, e, options.on[e]);
            }

            break;
          }

        case 'checked':
          {
            elt.checked = !!options.checked;
            break;
          }

        default:
          {
            elt.setAttribute(attr, options[attr]);
            break;
          }
      }
    }
  }

  return elt;
};
/** Create a toggle switch input
 * @param {*} options
 *  @param {string|Element} options.html
 *  @param {string|Element} options.after
 *  @param {boolean} options.checked
 *  @param {*} [options.on] a list of actions
 *  @param {function} [options.click]
 *  @param {function} [options.change]
 *  @param {Element} options.parent
 */


ol_ext_element.createSwitch = function (options) {
  var label = ol_ext_element.create('LABEL', {
    html: options.html,
    className: 'ol-ext-toggle-switch',
    parent: options.parent
  });
  var input = ol_ext_element.create('INPUT', {
    type: 'checkbox',
    checked: options.checked,
    click: options.click,
    change: options.change,
    on: options.on,
    parent: label
  });
  ol_ext_element.create('SPAN', {
    parent: label
  });

  if (options.after) {
    label.appendChild(document.createTextNode(options.after));
  }

  return input;
};
/** Create a toggle switch input
 * @param {*} options
 *  @param {string|Element} options.html
 *  @param {string|Element} options.after
 *  @param {string} [options.name] input name
 *  @param {string} [options.type=checkbox] input type: radio or checkbox
 *  @param {string} options.value input value
 *  @param {*} [options.on] a list of actions
 *  @param {function} [options.click]
 *  @param {function} [options.change]
 *  @param {Element} options.parent
 */


ol_ext_element.createCheck = function (options) {
  var label = ol_ext_element.create('LABEL', {
    className: 'ol-ext-check ' + (options.type === 'radio' ? 'ol-ext-radio' : 'ol-ext-checkbox'),
    html: options.html,
    parent: options.parent
  });
  var input = ol_ext_element.create('INPUT', {
    name: options.name,
    type: options.type === 'radio' ? 'radio' : 'checkbox',
    value: options.val,
    change: options.change,
    click: options.click,
    on: options.on,
    parent: label
  });
  ol_ext_element.create('SPAN', {
    parent: label
  });

  if (options.after) {
    label.appendChild(document.createTextNode(options.after));
  }

  return input;
};
/** Set inner html or append a child element to an element
 * @param {Element} element
 * @param {Element|string} html Content of the element
 */


ol_ext_element.setHTML = function (element, html) {
  if (html instanceof Element) element.appendChild(html);else if (html !== undefined) element.innerHTML = html;
};
/** Append text into an elemnt
 * @param {Element} element
 * @param {string} text text content
 */


ol_ext_element.appendText = function (element, text) {
  element.appendChild(document.createTextNode(text || ''));
};
/**
 * Add a set of event listener to an element
 * @param {Element} element
 * @param {string|Array<string>} eventType
 * @param {function} fn
 */


ol_ext_element.addListener = function (element, eventType, fn, useCapture) {
  if (typeof eventType === 'string') eventType = eventType.split(' ');
  eventType.forEach(function (e) {
    element.addEventListener(e, fn, useCapture);
  });
};
/**
 * Add a set of event listener to an element
 * @param {Element} element
 * @param {string|Array<string>} eventType
 * @param {function} fn
 */


ol_ext_element.removeListener = function (element, eventType, fn) {
  if (typeof eventType === 'string') eventType = eventType.split(' ');
  eventType.forEach(function (e) {
    element.removeEventListener(e, fn);
  });
};
/**
 * Show an element
 * @param {Element} element
 */


ol_ext_element.show = function (element) {
  element.style.display = '';
};
/**
 * Hide an element
 * @param {Element} element
 */


ol_ext_element.hide = function (element) {
  element.style.display = 'none';
};
/**
 * Test if an element is hihdden
 * @param {Element} element
 * @return {boolean}
 */


ol_ext_element.hidden = function (element) {
  return ol_ext_element.getStyle(element, 'display') === 'none';
};
/**
 * Toggle an element
 * @param {Element} element
 */


ol_ext_element.toggle = function (element) {
  element.style.display = element.style.display === 'none' ? '' : 'none';
};
/** Set style of an element
 * @param {DOMElement} el the element
 * @param {*} st list of style
 */


ol_ext_element.setStyle = function (el, st) {
  for (var s in st) {
    switch (s) {
      case 'top':
      case 'left':
      case 'bottom':
      case 'right':
      case 'minWidth':
      case 'maxWidth':
      case 'width':
      case 'height':
        {
          if (typeof st[s] === 'number') {
            el.style[s] = st[s] + 'px';
          } else {
            el.style[s] = st[s];
          }

          break;
        }

      default:
        {
          el.style[s] = st[s];
        }
    }
  }
};
/**
 * Get style propertie of an element
 * @param {DOMElement} el the element
 * @param {string} styleProp Propertie name
 * @return {*} style value
 */


ol_ext_element.getStyle = function (el, styleProp) {
  var value,
      defaultView = (el.ownerDocument || document).defaultView; // W3C standard way:

  if (defaultView && defaultView.getComputedStyle) {
    // sanitize property name to css notation
    // (hypen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
    value = defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el.currentStyle) {
    // IE
    // sanitize property name to camelCase
    styleProp = styleProp.replace(/-(\w)/g, function (str, letter) {
      return letter.toUpperCase();
    });
    value = el.currentStyle[styleProp]; // convert other units to pixels on IE

    if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
      return function (value) {
        var oldLeft = el.style.left,
            oldRsLeft = el.runtimeStyle.left;
        el.runtimeStyle.left = el.currentStyle.left;
        el.style.left = value || 0;
        value = el.style.pixelLeft + "px";
        el.style.left = oldLeft;
        el.runtimeStyle.left = oldRsLeft;
        return value;
      }(value);
    }
  }

  if (/px$/.test(value)) return parseInt(value);
  return value;
};
/** Get outerHeight of an elemen
 * @param {DOMElement} elt
 * @return {number}
 */


ol_ext_element.outerHeight = function (elt) {
  return elt.offsetHeight + ol_ext_element.getStyle(elt, 'marginBottom');
};
/** Get outerWidth of an elemen
 * @param {DOMElement} elt
 * @return {number}
 */


ol_ext_element.outerWidth = function (elt) {
  return elt.offsetWidth + ol_ext_element.getStyle(elt, 'marginLeft');
};
/** Get element offset rect
 * @param {DOMElement} elt
 * @return {*} 
 */


ol_ext_element.offsetRect = function (elt) {
  var rect = elt.getBoundingClientRect();
  return {
    top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
    left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0),
    height: rect.height || rect.bottom - rect.top,
    width: rect.width || rect.right - rect.left
  };
};
/** Make a div scrollable without scrollbar.
 * On touch devices the default behavior is preserved
 * @param {DOMElement} elt
 * @param {*} options
 *  @param {function} options.onmove a function that takes a boolean indicating that the div is scrolling
 *  @param {boolean} [options.vertical=false] 
 *  @param {boolean} [options.animate=true] add kinetic to scroll
 */


ol_ext_element.scrollDiv = function (elt, options) {
  var pos = false;
  var speed = 0;
  var d,
      dt = 0;
  var onmove = typeof options.onmove === 'function' ? options.onmove : function () {};
  var page = options.vertical ? 'pageY' : 'pageX';
  var scroll = options.vertical ? 'scrollTop' : 'scrollLeft';
  var moving = false; // Prevent image dragging

  elt.querySelectorAll('img').forEach(function (i) {
    i.ondragstart = function () {
      return false;
    };
  });
  elt.style['touch-action'] = 'none'; // Start scrolling

  ol_ext_element.addListener(elt, ['pointerdown'], function (e) {
    moving = false;
    pos = e[page];
    dt = new Date();
    elt.classList.add('ol-move');
  }); // Register scroll

  ol_ext_element.addListener(window, ['pointermove'], function (e) {
    moving = true;

    if (pos !== false) {
      var delta = pos - e[page];
      elt[scroll] += delta;
      d = new Date();

      if (d - dt) {
        speed = (speed + delta / (d - dt)) / 2;
      }

      pos = e[page];
      dt = d; // Tell we are moving

      if (delta) onmove(true);
    }
  }); // Animate scroll

  var animate = function (to) {
    var step = to > 0 ? Math.min(100, to / 2) : Math.max(-100, to / 2);
    to -= step;
    elt[scroll] += step;

    if (-1 < to && to < 1) {
      if (moving) setTimeout(function () {
        elt.classList.remove('ol-move');
      });else elt.classList.remove('ol-move');
      moving = false;
      onmove(false);
    } else {
      setTimeout(function () {
        animate(to);
      }, 40);
    }
  }; // Stop scrolling


  ol_ext_element.addListener(window, ['pointerup', 'pointercancel'], function (e) {
    dt = new Date() - dt;

    if (dt > 100) {
      // User stop: no speed
      speed = 0;
    } else if (dt > 0) {
      // Calculate new speed
      speed = ((speed || 0) + (pos - e[page]) / dt) / 2;
    }

    animate(options.animate === false ? 0 : speed * 200);
    pos = false;
    speed = 0;
    dt = 0;
  }); // Handle mousewheel

  if (options.mousewheel) {
    // && !elt.classList.contains('ol-touch')) {
    ol_ext_element.addListener(elt, ['mousewheel', 'DOMMouseScroll', 'onmousewheel'], function (e) {
      var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      elt.classList.add('ol-move');
      elt[scroll] -= delta * 30;
      elt.classList.remove('ol-move');
      return false;
    });
  }
};
/** Dispatch an event to an Element 
 * @param {string} eventName
 * @param {Element} element
*/


ol_ext_element.dispatchEvent = function (eventName, element) {
  var event;

  try {
    event = new CustomEvent(eventName);
  } catch (e) {
    // Try customevent on IE
    event = document.createEvent("CustomEvent");
    event.initCustomEvent(eventName, true, true, {});
  }

  element.dispatchEvent(event);
};

/* harmony default export */ const util_element = (ol_ext_element);
;// CONCATENATED MODULE: ./node_modules/ol-ext/control/Print.js
/*
  Copyright (c) 2019 Jean-Marc VIGLINO,
  released under the CeCILL-B license (French BSD license)
  (http://www.cecill.info/licences/Licence_CeCILL-B_V1-en.txt).
*/



/** Print control to get an image of the map
 * @constructor
 * @fire print
 * @fire error
 * @fire printing
 * @extends {ol.control.Control}
 * @param {Object=} options Control options.
 *	@param {String} options.className class of the control
 *	@param {string} options.imageType A string indicating the image format, default image/jpeg
 *	@param {number} options.quality Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp
 *	@param {string} options.orientation Page orientation (landscape/portrait), default guest the best one
 *	@param {boolean} options.immediate force print even if render is not complete,  default false
 */

var ol_control_Print = function (options) {
  if (!options) options = {};
  var element = util_element.create('DIV', {
    className: options.className || 'ol-print'
  });

  if (!options.target) {
    element.classList.add('ol-unselectable', 'ol-control');
    util_element.create('BUTTON', {
      type: 'button',
      click: function () {
        this.print();
      }.bind(this),
      parent: element
    });
  }

  Control/* default.call */.Z.call(this, {
    element: element,
    target: options.target
  });
  this.set('immediate', options.immediate);
  this.set('imageType', options.imageType || 'image/jpeg');
  this.set('quality', options.quality || .8);
  this.set('orientation', options.orientation);
};

(0,ext/* default */.Z)(ol_control_Print, Control/* default */.Z);
/** Helper function to copy result to clipboard
 * @param {Event} e print event
 * @return {boolean}
 * @private
 */

ol_control_Print.prototype.toClipboard = function (e, callback) {
  try {
    e.canvas.toBlob(function (blob) {
      try {
        navigator.clipboard.write([new window.ClipboardItem(Object.defineProperty({}, blob.type, {
          value: blob,
          enumerable: true
        }))]);
        if (typeof callback === 'function') callback(true);
      } catch (err) {
        if (typeof callback === 'function') callback(false);
      }
    });
  } catch (err) {
    if (typeof callback === 'function') callback(false);
  }
};
/** Helper function to copy result to clipboard
 * @param {any} options print options
 * @param {function} callback a callback function that takes a boolean if copy
 */


ol_control_Print.prototype.copyMap = function (options, callback) {
  this.once('print', function (e) {
    this.toClipboard(e, callback);
  }.bind(this));
  this.print(options);
};
/** Get map canvas
 * @private
 */


ol_control_Print.prototype._getCanvas = function (event, imageType, canvas) {
  var ctx; // ol <= 5 : get the canvas

  if (event.context) {
    canvas = event.context.canvas;
  } else {
    // Create a canvas if none
    if (!canvas) {
      canvas = document.createElement('canvas');
      var size = this.getMap().getSize();
      canvas.width = size[0];
      canvas.height = size[1];
      ctx = canvas.getContext('2d');

      if (/jp.*g$/.test(imageType)) {
        ctx.fillStyle = this.get('bgColor') || 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    } else {
      ctx = canvas.getContext('2d');
    } // ol6+ : create canvas using layer canvas


    this.getMap().getViewport().querySelectorAll('.ol-layers canvas, canvas.ol-fixedoverlay').forEach(function (c) {
      if (c.width) {
        ctx.save(); // opacity

        if (c.parentNode.style.opacity === '0') return;
        ctx.globalAlpha = parseFloat(c.parentNode.style.opacity) || 1; // Blend mode ?

        if (util_element.getStyle(c.parentNode, 'mix-blend-mode') === 'multiply') {
          ctx.globalCompositeOperation = 'multiply';
        } // transform


        var tr = util_element.getStyle(c, 'transform') || util_element.getStyle(c, '-webkit-transform');

        if (/^matrix/.test(tr)) {
          tr = tr.replace(/^matrix\(|\)$/g, '').split(',');
          tr.forEach(function (t, i) {
            tr[i] = parseFloat(t);
          });
          ctx.transform(tr[0], tr[1], tr[2], tr[3], tr[4], tr[5]);
          ctx.drawImage(c, 0, 0);
        } else {
          ctx.drawImage(c, 0, 0, util_element.getStyle(c, 'width'), util_element.getStyle(c, 'height'));
        }

        ctx.restore();
      }
    }.bind(this));
  }

  return canvas;
};
/** Fast print
 * @param {*} options print options
 *  @param {HTMLCanvasElement|undefined} [options.canvas] if none create one, only for ol@6+
 *  @parama {string} options.imageType
 */


ol_control_Print.prototype.fastPrint = function (options, callback) {
  options = options || {};

  if (this._ol6) {
    requestAnimationFrame(function () {
      callback(this._getCanvas({}, options.imageType, options.canvas));
    }.bind(this));
  } else {
    this.getMap().once('postcompose', function (event) {
      if (!event.context) this._ol6 = true;
      callback(this._getCanvas(event, options.imageType, options.canvas));
    }.bind(this));
    this.getMap().render();
  }
};
/** Print the map
 * @param {function} cback a callback function that take a string containing the requested data URI.
 * @param {Object} options
 *	@param {string} options.imageType A string indicating the image format, default the control one
 *	@param {number} options.quality Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp
 *  @param {boolean} options.immediate true to prevent delay for printing
 *  @param {boolean} [options.size=[210,297]] 
 *  @param {boolean} [options.format=a4]
 *  @param {boolean} [options.orient] default control orientation
 *  @param {boolean} [options.margin=10]
 *  @param {*} options.any any options passed to the print event when fired
 * @api
 */


ol_control_Print.prototype.print = function (options) {
  options = options || {};
  var imageType = options.imageType || this.get('imageType');
  var quality = options.quality || this.get('quality');

  if (this.getMap()) {
    if (options.immediate !== 'silent') {
      this.dispatchEvent(Object.assign({
        type: 'printing'
      }, options));
    } // Start printing after delay to let user show info in the DOM


    if (!options.immediate) {
      setTimeout(function () {
        options = Object.assign({}, options);
        options.immediate = 'silent';
        this.print(options);
      }.bind(this), 200);
      return;
    } // Run printing


    this.getMap().once(this.get('immediate') ? 'postcompose' : 'rendercomplete', function (event) {
      var canvas = this._getCanvas(event, imageType); // Calculate print format


      var size = options.size || [210, 297];
      var format = options.format || 'a4';
      var w, h, position;
      var orient = options.orient || this.get('orientation');
      var margin = typeof options.margin === 'number' ? options.margin : 10;

      if (canvas) {
        // Calculate size
        if (orient !== 'landscape' && orient !== 'portrait') {
          orient = canvas.width > canvas.height ? 'landscape' : 'portrait';
        }

        if (orient === 'landscape') size = [size[1], size[0]];
        var sc = Math.min((size[0] - 2 * margin) / canvas.width, (size[1] - 2 * margin) / canvas.height);
        w = sc * canvas.width;
        h = sc * canvas.height; // Image position

        position = [(size[0] - w) / 2, (size[1] - h) / 2];
      } // get the canvas image


      var image;

      try {
        image = canvas ? canvas.toDataURL(imageType, quality) : null;
      } catch (e) {
        // Fire error event
        this.dispatchEvent({
          type: 'error',
          canvas: canvas
        });
        return;
      } // Fire print event


      var e = Object.assign({
        type: 'print',
        print: {
          format: format,
          orientation: orient,
          unit: 'mm',
          size: size,
          position: position,
          imageWidth: w,
          imageHeight: h
        },
        image: image,
        imageType: imageType,
        quality: quality,
        canvas: canvas
      }, options);
      this.dispatchEvent(e);
    }.bind(this));
    this.getMap().render();
  }
};

/* harmony default export */ const Print = (ol_control_Print);

/***/ }),

/***/ 7403:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ol_geom_Geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3724);
/*
	Copyright (c) 2017 Jean-Marc VIGLINO,
	released under the CeCILL-B license (http://www.cecill.info/).

	ol.coordinate.convexHull compute a convex hull using Andrew's Monotone Chain Algorithm.

	@see https://en.wikipedia.org/wiki/Convex_hull_algorithms
*/

var ol_coordinate_convexHull;

(function () {
  /** Tests if a point is left or right of line (a,b).
  * @param {ol.coordinate} a point on the line
  * @param {ol.coordinate} b point on the line
  * @param {ol.coordinate} o
  * @return {bool} true if (a,b,o) turns clockwise
  */
  var clockwise = function (a, b, o) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]) <= 0;
  };
  /** Compute a convex hull using Andrew's Monotone Chain Algorithm
   * @param {Array<ol.geom.Point>} points an array of 2D points
   * @return {Array<ol.geom.Point>} the convex hull vertices
   */


  ol_coordinate_convexHull = function (points) {
    // Sort by increasing x and then y coordinate
    var i;
    points.sort(function (a, b) {
      return a[0] == b[0] ? a[1] - b[1] : a[0] - b[0];
    }); // Compute the lower hull

    var lower = [];

    for (i = 0; i < points.length; i++) {
      while (lower.length >= 2 && clockwise(lower[lower.length - 2], lower[lower.length - 1], points[i])) {
        lower.pop();
      }

      lower.push(points[i]);
    } // Compute the upper hull


    var upper = [];

    for (i = points.length - 1; i >= 0; i--) {
      while (upper.length >= 2 && clockwise(upper[upper.length - 2], upper[upper.length - 1], points[i])) {
        upper.pop();
      }

      upper.push(points[i]);
    }

    upper.pop();
    lower.pop();
    return lower.concat(upper);
  };
  /* Get coordinates of a geometry */


  var getCoordinates = function (geom) {
    var i, p;
    var h = [];

    switch (geom.getType()) {
      case "Point":
        h.push(geom.getCoordinates());
        break;

      case "LineString":
      case "LinearRing":
      case "MultiPoint":
        h = geom.getCoordinates();
        break;

      case "MultiLineString":
        p = geom.getLineStrings();

        for (i = 0; i < p.length; i++) h.concat(getCoordinates(p[i]));

        break;

      case "Polygon":
        h = getCoordinates(geom.getLinearRing(0));
        break;

      case "MultiPolygon":
        p = geom.getPolygons();

        for (i = 0; i < p.length; i++) h.concat(getCoordinates(p[i]));

        break;

      case "GeometryCollection":
        p = geom.getGeometries();

        for (i = 0; i < p.length; i++) h.concat(getCoordinates(p[i]));

        break;

      default:
        break;
    }

    return h;
  };
  /** Compute a convex hull on a geometry using Andrew's Monotone Chain Algorithm
   * @return {Array<ol.geom.Point>} the convex hull vertices
   */


  ol_geom_Geometry__WEBPACK_IMPORTED_MODULE_0__/* ["default"].prototype.convexHull */ .Z.prototype.convexHull = function () {
    return ol_coordinate_convexHull(getCoordinates(this));
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ol_coordinate_convexHull);

/***/ }),

/***/ 2977:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_ext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7395);
/* harmony import */ var ol_interaction_Interaction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3873);


/** Interaction hover do to something when hovering a feature
 * @constructor
 * @extends {ol_interaction_Interaction}
 * @fires hover, enter, leave
 * @param {olx.interaction.HoverOptions} 
 *  @param { string | undefined } options.cursor css cursor propertie or a function that gets a feature, default: none
 *  @param {function | undefined} options.featureFilter filter a function with two arguments, the feature and the layer of the feature. Return true to select the feature 
 *  @param {function | undefined} options.layerFilter filter a function with one argument, the layer to test. Return true to test the layer
 *  @param {Array<ol.layer> | undefined} options.layers a set of layers to test
 *  @param {number | undefined} options.hitTolerance Hit-detection tolerance in pixels.
 *  @param { function | undefined } options.handleEvent Method called by the map to notify the interaction that a browser event was dispatched to the map. The function may return false to prevent the propagation of the event to other interactions in the map's interactions chain.
 */

var ol_interaction_Hover = function (options) {
  if (!options) options = {};
  var self = this;
  ol_interaction_Interaction__WEBPACK_IMPORTED_MODULE_1__/* ["default"].call */ .ZP.call(this, {
    handleEvent: function (e) {
      if (e.type == "pointermove") {
        self.handleMove_(e);
      }

      if (options.handleEvent) return options.handleEvent(e);
      return true;
    }
  });
  this.setLayerFilter(options.layerFilter);

  if (options.layers && options.layers.length) {
    this.setLayerFilter(function (l) {
      return options.layers.indexOf(l) >= 0;
    });
  }

  this.setFeatureFilter(options.featureFilter);
  this.set('hitTolerance', options.hitTolerance);
  this.setCursor(options.cursor);
};

(0,_util_ext__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(ol_interaction_Hover, ol_interaction_Interaction__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP);
/**
 * Remove the interaction from its current map, if any,  and attach it to a new
 * map, if any. Pass `null` to just remove the interaction from the current map.
 * @param {ol.Map} map Map.
 * @api stable
 */

ol_interaction_Hover.prototype.setMap = function (map) {
  if (this.previousCursor_ !== undefined && this.getMap()) {
    this.getMap().getTargetElement().style.cursor = this.previousCursor_;
    this.previousCursor_ = undefined;
  }

  ol_interaction_Interaction__WEBPACK_IMPORTED_MODULE_1__/* ["default"].prototype.setMap.call */ .ZP.prototype.setMap.call(this, map);
};
/** Activate / deactivate interaction
 * @param {boolean} b
 */


ol_interaction_Hover.prototype.setActive = function (b) {
  ol_interaction_Interaction__WEBPACK_IMPORTED_MODULE_1__/* ["default"].prototype.setActive.call */ .ZP.prototype.setActive.call(this, b);

  if (this.cursor_ && this.getMap()) {
    var style = this.getMap().getTargetElement().style;

    if (this.previousCursor_ !== undefined) {
      style.cursor = this.previousCursor_;
      this.previousCursor_ = undefined;
    }
  }
};
/**
 * Set cursor on hover
 * @param { string } cursor css cursor propertie or a function that gets a feature, default: none
 * @api stable
 */


ol_interaction_Hover.prototype.setCursor = function (cursor) {
  if (!cursor && this.previousCursor_ !== undefined && this.getMap()) {
    this.getMap().getTargetElement().style.cursor = this.previousCursor_;
    this.previousCursor_ = undefined;
  }

  this.cursor_ = cursor;
};
/** Feature filter to get only one feature
* @param {function} filter a function with two arguments, the feature and the layer of the feature. Return true to select the feature 
*/


ol_interaction_Hover.prototype.setFeatureFilter = function (filter) {
  if (typeof filter == 'function') this.featureFilter_ = filter;else this.featureFilter_ = function () {
    return true;
  };
};
/** Feature filter to get only one feature
* @param {function} filter a function with one argument, the layer to test. Return true to test the layer
*/


ol_interaction_Hover.prototype.setLayerFilter = function (filter) {
  if (typeof filter == 'function') this.layerFilter_ = filter;else this.layerFilter_ = function () {
    return true;
  };
};
/** Get features whenmove
* @param {ol.event} e "move" event
*/


ol_interaction_Hover.prototype.handleMove_ = function (e) {
  var map = this.getMap();

  if (map) {
    //var b = map.hasFeatureAtPixel(e.pixel);
    var feature, layer;
    var self = this;
    var b = map.forEachFeatureAtPixel(e.pixel, function (f, l) {
      if (self.featureFilter_.call(null, f, l)) {
        feature = f;
        layer = l;
        return true;
      } else {
        feature = layer = null;
        return false;
      }
    }, {
      hitTolerance: this.get('hitTolerance'),
      layerFilter: self.layerFilter_
    });
    if (b) this.dispatchEvent({
      type: 'hover',
      feature: feature,
      layer: layer,
      coordinate: e.coordinate,
      pixel: e.pixel,
      map: e.map,
      originalEvent: e.originalEvent,
      dragging: e.dragging
    });

    if (this.feature_ === feature && this.layer_ === layer) {
      /* ok */
    } else {
      this.feature_ = feature;
      this.layer_ = layer;

      if (feature) {
        this.dispatchEvent({
          type: 'enter',
          feature: feature,
          layer: layer,
          coordinate: e.coordinate,
          pixel: e.pixel,
          map: e.map,
          originalEvent: e.originalEvent,
          dragging: e.dragging
        });
      } else {
        this.dispatchEvent({
          type: 'leave',
          coordinate: e.coordinate,
          pixel: e.pixel,
          map: e.map,
          originalEvent: e.originalEvent,
          dragging: e.dragging
        });
      }
    }

    if (this.cursor_) {
      var style = map.getTargetElement().style;

      if (b) {
        if (style.cursor != this.cursor_) {
          this.previousCursor_ = style.cursor;
          style.cursor = this.cursor_;
        }
      } else if (this.previousCursor_ !== undefined) {
        style.cursor = this.previousCursor_;
        this.previousCursor_ = undefined;
      }
    }
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ol_interaction_Hover);

/***/ }),

/***/ 7390:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ AnimatedCluster)
});

// EXTERNAL MODULE: ./node_modules/ol-ext/util/ext.js
var ext = __webpack_require__(7395);
// EXTERNAL MODULE: ./node_modules/ol/layer/Vector.js
var Vector = __webpack_require__(9074);
// EXTERNAL MODULE: ./node_modules/ol/source/Vector.js
var source_Vector = __webpack_require__(4787);
// EXTERNAL MODULE: ./node_modules/ol/Feature.js
var Feature = __webpack_require__(5028);
// EXTERNAL MODULE: ./node_modules/ol/easing.js
var easing = __webpack_require__(9635);
// EXTERNAL MODULE: ./node_modules/ol/extent.js
var ol_extent = __webpack_require__(1046);
// EXTERNAL MODULE: ./node_modules/ol/geom/Point.js
var Point = __webpack_require__(6397);
// EXTERNAL MODULE: ./node_modules/ol/transform.js
var ol_transform = __webpack_require__(8975);
// EXTERNAL MODULE: ./node_modules/ol/render/canvas/Immediate.js
var Immediate = __webpack_require__(2676);
;// CONCATENATED MODULE: ./node_modules/ol-ext/util/getVectorContext.js
/** Export getVector context for backward compatibility ol5 / ol6
 * Create a brand new function for ol5 copy of ol6 function.
 * Will be ignored using openlayers-ext package or ol5
 */



function getVectorContext(event) {
  const frameState = event.frameState;
  const transform = (0,ol_transform/* multiply */.Jp)(event.inversePixelTransform.slice(), frameState.coordinateToPixelTransform);
  return new Immediate/* default */.Z(event.context, frameState.pixelRatio, frameState.extent, transform, frameState.viewState.rotation);
}

/* harmony default export */ const util_getVectorContext = (getVectorContext);
;// CONCATENATED MODULE: ./node_modules/ol-ext/layer/AnimatedCluster.js
/*
  Copyright (c) 2015 Jean-Marc VIGLINO,
  released under the CeCILL-B license (http://www.cecill.info/).

  ol_layer_AnimatedCluster is a vector layer that animate cluster
*/








/**
 *  A vector layer for animated cluster
 * @constructor 
 * @extends {ol.layer.Vector}
 * @param {olx.layer.AnimatedClusterOptions=} options extend olx.layer.Options
 *  @param {Number} options.animationDuration animation duration in ms, default is 700ms 
 *  @param {ol.easingFunction} animationMethod easing method to use, default ol.easing.easeOut
 */

var ol_layer_AnimatedCluster = function (opt_options) {
  var options = opt_options || {};
  Vector/* default.call */.Z.call(this, options);
  this.oldcluster = new source_Vector/* default */.Z();
  this.clusters = [];
  this.animation = {
    start: false
  };
  this.set('animationDuration', typeof options.animationDuration == 'number' ? options.animationDuration : 700);
  this.set('animationMethod', options.animationMethod || easing/* easeOut */.Vv); // Save cluster before change

  this.getSource().on('change', this.saveCluster.bind(this)); // Animate the cluster

  this.on(['precompose', 'prerender'], this.animate.bind(this));
  this.on(['postcompose', 'postrender'], this.postanimate.bind(this));
};

(0,ext/* default */.Z)(ol_layer_AnimatedCluster, Vector/* default */.Z);
/** save cluster features before change
 * @private
 */

ol_layer_AnimatedCluster.prototype.saveCluster = function () {
  let clusterConfig = this.getSource().get('config');

  if (this.oldcluster) {
    //&& !(ArcheoUtilities.isValid(clusterConfig.region_strategy)) ) {
    this.oldcluster.clear();
    if (!this.get('animationDuration')) return;
    var features = this.getSource().getFeatures();

    if (features.length && features[0].get('features')) {
      this.oldcluster.addFeatures(this.clusters);
      this.clusters = features.slice(0);
      this.sourceChanged = true;
    }
  }
};
/** 
 * Get the cluster that contains a feature
 * @private
*/


ol_layer_AnimatedCluster.prototype.getClusterForFeature = function (f, cluster) {
  for (var j = 0, c; c = cluster[j]; j++) {
    var features = c.get('features');

    if (features && features.length) {
      for (var k = 0, f2; f2 = features[k]; k++) {
        if (f === f2) {
          return c;
        }
      }
    }
  }

  return false;
};
/** 
 * Stop animation 
 * @private 
 */


ol_layer_AnimatedCluster.prototype.stopAnimation = function () {
  this.animation.start = false;
  this.animation.cA = [];
  this.animation.cB = [];
};
/** 
 * animate the cluster
 * @private
 */


ol_layer_AnimatedCluster.prototype.animate = function (e) {
  var duration = this.get('animationDuration');
  if (!duration) return;
  var resolution = e.frameState.viewState.resolution;
  var i,
      c0,
      a = this.animation;
  var time = e.frameState.time; // Start a new animation, if change resolution and source has changed

  if (a.resolution != resolution && this.sourceChanged) {
    var extent = e.frameState.extent;

    if (a.resolution < resolution) {
      extent = (0,ol_extent/* buffer */.f3)(extent, 100 * resolution);
      a.cA = this.oldcluster.getFeaturesInExtent(extent);
      a.cB = this.getSource().getFeaturesInExtent(extent);
      a.revers = false;
    } else {
      extent = (0,ol_extent/* buffer */.f3)(extent, 100 * resolution);
      a.cA = this.getSource().getFeaturesInExtent(extent);
      a.cB = this.oldcluster.getFeaturesInExtent(extent);
      a.revers = true;
    }

    a.clusters = [];

    for (i = 0, c0; c0 = a.cA[i]; i++) {
      var f = c0.get('features');

      if (f && f.length) {
        var c = this.getClusterForFeature(f[0], a.cB);
        if (c) a.clusters.push({
          f: c0,
          pt: c.getGeometry().getCoordinates()
        });
      }
    } // Save state


    a.resolution = resolution;
    this.sourceChanged = false; // No cluster or too much to animate

    if (!a.clusters.length || a.clusters.length > 1000) {
      this.stopAnimation();
      return;
    } // Start animation from now


    time = a.start = new Date().getTime();
  } // Run animation


  if (a.start) {
    var vectorContext = e.vectorContext || util_getVectorContext(e);
    var d = (time - a.start) / duration; // Animation ends

    if (d > 1.0) {
      this.stopAnimation();
      d = 1;
    }

    d = this.get('animationMethod')(d); // Animate

    var style = this.getStyle();
    var stylefn = typeof style == 'function' ? style : style.length ? function () {
      return style;
    } : function () {
      return [style];
    }; // Layer opacity

    e.context.save();
    e.context.globalAlpha = this.getOpacity();

    for (i = 0, c; c = a.clusters[i]; i++) {
      var pt = c.f.getGeometry().getCoordinates();
      var dx = pt[0] - c.pt[0];
      var dy = pt[1] - c.pt[1];

      if (a.revers) {
        pt[0] = c.pt[0] + d * dx;
        pt[1] = c.pt[1] + d * dy;
      } else {
        pt[0] = pt[0] - d * dx;
        pt[1] = pt[1] - d * dy;
      } // Draw feature


      var st = stylefn(c.f, resolution, true);
      if (!st.length) st = [st]; // If one feature: draw the feature

      if (c.f.get("features").length === 1 && !dx && !dy) {
        f = c.f.get("features")[0];
      } // else draw a point
      else {
          var geo = new Point/* default */.Z(pt);
          f = new Feature/* default */.Z(geo);
        }

      for (var k = 0, s; s = st[k]; k++) {
        // Multi-line text
        if (s.getText() && /\n/.test(s.getText().getText())) {
          var offsetX = s.getText().getOffsetX();
          var offsetY = s.getText().getOffsetY();
          var rot = s.getText().getRotation() || 0;
          var fontSize = Number((s.getText().getFont() || '10px').match(/\d+/)) * 1.2;
          var str = s.getText().getText().split('\n');
          var dl,
              nb = str.length - 1;
          var s2 = s.clone(); // Draw each lines

          str.forEach(function (t, i) {
            if (i == 1) {
              // Allready drawn
              s2.setImage();
              s2.setFill();
              s2.setStroke();
            }

            switch (s.getText().getTextBaseline()) {
              case 'alphabetic':
              case 'ideographic':
              case 'bottom':
                {
                  dl = nb;
                  break;
                }

              case 'hanging':
              case 'top':
                {
                  dl = 0;
                  break;
                }

              default:
                {
                  dl = nb / 2;
                  break;
                }
            }

            s2.getText().setOffsetX(offsetX - Math.sin(rot) * fontSize * (i - dl));
            s2.getText().setOffsetY(offsetY + Math.cos(rot) * fontSize * (i - dl));
            s2.getText().setText(t);
            vectorContext.drawFeature(f, s2);
          });
        } else {
          vectorContext.drawFeature(f, s);
        }
        /* OLD VERSION OL < 4.3
        // Retina device
        var ratio = e.frameState.pixelRatio;
          var sc;
        // OL < v4.3 : setImageStyle doesn't check retina
        var imgs = ol_Map.prototype.getFeaturesAtPixel ? false : s.getImage();
        if (imgs)
        {	sc = imgs.getScale(); 
          imgs.setScale(sc*ratio); 
        }
        // OL3 > v3.14
        if (vectorContext.setStyle)
        {	// If one feature: draw the feature
          if (c.f.get("features").length===1 && !dx && !dy) {
            vectorContext.drawFeature(c.f.get("features")[0], s);
          }
          // else draw a point
          else {
            vectorContext.setStyle(s);
            vectorContext.drawGeometry(geo);
          }
        }
        // older version
        else
        {	vectorContext.setImageStyle(imgs);
          vectorContext.setTextStyle(s.getText());
          vectorContext.drawPointGeometry(geo);
        }
        if (imgs) imgs.setScale(sc);
        */

      }
    }

    e.context.restore(); // tell ol to continue postcompose animation

    e.frameState.animate = true; // Prevent layer drawing (clip with null rect)

    e.context.save();
    e.context.beginPath();
    e.context.rect(0, 0, 0, 0);
    e.context.clip();
    this.clip_ = true;
  }

  return;
};
/**  
 * remove clipping after the layer is drawn
 * @private
 */


ol_layer_AnimatedCluster.prototype.postanimate = function (e) {
  if (this.clip_) {
    e.context.restore();
    this.clip_ = false;
  }
};

/* harmony default export */ const AnimatedCluster = (ol_layer_AnimatedCluster);

/***/ }),

/***/ 8465:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_ext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7395);
/* harmony import */ var ol_style_RegularShape__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9700);
/* harmony import */ var ol_style_Fill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6212);
/* harmony import */ var ol_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4956);
/*	Copyright (c) 2015 Jean-Marc VIGLINO, 
  released under the CeCILL-B license (French BSD license)
  (http://www.cecill.info/licences/Licence_CeCILL-B_V1-en.txt).
*
*  Add a chart style to display charts (pies or bars) on a map 
*/




/**
 * @requires ol.style.Circle
 * @requires ol.structs.IHasChecksum
 */

/**
 * @classdesc
 * Set chart style for vector features.
 *
 * @constructor
 * @param {} options
 *	@param {String} options.type Chart type: pie,pie3D, donut or bar
 *	@param {number} options.radius Chart radius/size, default 20
 *	@param {number} options.rotation Rotation in radians (positive rotation clockwise). Default is 0.
 *	@param {bool} options.snapToPixel use integral numbers of pixels, default true
 *	@param {_ol_style_Stroke_} options.stroke stroke style
 *	@param {String|Array<ol_color>} options.colors predefined color set "classic","dark","pale","pastel","neon" / array of color string, default classic
 *	@param {number} options.offsetX X offset in px
 *	@param {number} options.offsetY Y offset in px
 *	@param {number} options.animation step in an animation sequence [0,1]
 *	@param {number} options.max maximum value for bar chart
 * @see [Statistic charts example](../../examples/style/map.style.chart.html)
 * @extends {ol_style_RegularShape}
 * @implements {ol.structs.IHasChecksum}
 * @api
 */

var ol_style_Chart = function (opt_options) {
  var options = opt_options || {};
  var strokeWidth = 0;
  if (opt_options.stroke) strokeWidth = opt_options.stroke.getWidth();
  ol_style_RegularShape__WEBPACK_IMPORTED_MODULE_1__/* ["default"].call */ .Z.call(this, {
    radius: options.radius + strokeWidth,
    fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z({
      color: [0, 0, 0]
    }),
    rotation: options.rotation,
    snapToPixel: options.snapToPixel
  });
  if (options.scale) this.setScale(options.scale);
  this._stroke = options.stroke;
  this._radius = options.radius || 20;
  this._donutratio = options.donutRatio || 0.5;
  this._type = options.type;
  this._offset = [options.offsetX ? options.offsetX : 0, options.offsetY ? options.offsetY : 0];
  this._animation = typeof options.animation == 'number' ? {
    animate: true,
    step: options.animation
  } : this._animation = {
    animate: false,
    step: 1
  };
  this._max = options.max;
  this._data = options.data;

  if (options.colors instanceof Array) {
    this._colors = options.colors;
  } else {
    this._colors = ol_style_Chart.colors[options.colors];
    if (!this._colors) this._colors = ol_style_Chart.colors.classic;
  }

  this.renderChart_();
};

(0,_util_ext__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(ol_style_Chart, ol_style_RegularShape__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z);
/** Default color set: classic, dark, pale, pastel, neon
*/

ol_style_Chart.colors = {
  "classic": ["#ffa500", "blue", "red", "green", "cyan", "magenta", "yellow", "#0f0"],
  "dark": ["#960", "#003", "#900", "#060", "#099", "#909", "#990", "#090"],
  "pale": ["#fd0", "#369", "#f64", "#3b7", "#880", "#b5d", "#666"],
  "pastel": ["#fb4", "#79c", "#f66", "#7d7", "#acc", "#fdd", "#ff9", "#b9b"],
  "neon": ["#ff0", "#0ff", "#0f0", "#f0f", "#f00", "#00f"]
};
/**
 * Clones the style. 
 * @return {ol_style_Chart}
 */

ol_style_Chart.prototype.clone = function () {
  var s = new ol_style_Chart({
    type: this._type,
    radius: this._radius,
    rotation: this.getRotation(),
    scale: this.getScale(),
    data: this.getData(),
    snapToPixel: this.getSnapToPixel ? this.getSnapToPixel() : false,
    stroke: this._stroke,
    colors: this._colors,
    offsetX: this._offset[0],
    offsetY: this._offset[1],
    animation: this._animation
  });
  s.setScale(this.getScale());
  s.setOpacity(this.getOpacity());
  return s;
};
/** Get data associatied with the chart
*/


ol_style_Chart.prototype.getData = function () {
  return this._data;
};
/** Set data associatied with the chart
*	@param {Array<number>}
*/


ol_style_Chart.prototype.setData = function (data) {
  this._data = data;
  this.renderChart_();
};
/** Get symbol radius
*/


ol_style_Chart.prototype.getRadius = function () {
  return this._radius;
};
/** Set symbol radius
*	@param {number} symbol radius
*	@param {number} donut ratio
*/


ol_style_Chart.prototype.setRadius = function (radius, ratio) {
  this._radius = radius;
  this.donuratio_ = ratio || this.donuratio_;
  this.renderChart_();
};
/** Set animation step 
*	@param {false|number} false to stop animation or the step of the animation [0,1]
*/


ol_style_Chart.prototype.setAnimation = function (step) {
  if (step === false) {
    if (this._animation.animate == false) return;
    this._animation.animate = false;
  } else {
    if (this._animation.step == step) return;
    this._animation.animate = true;
    this._animation.step = step;
  }

  this.renderChart_();
};
/** @private
*/


ol_style_Chart.prototype.renderChart_ = function (pixelratio) {
  if (!pixelratio) {
    if (this.getPixelRatio) {
      pixelratio = window.devicePixelRatio;
      this.renderChart_(pixelratio);
      if (this.getPixelRatio && pixelratio !== 1) this.renderChart_(1);
    } else {
      this.renderChart_(1);
    }

    return;
  }

  var strokeStyle;
  var strokeWidth = 0;

  if (this._stroke) {
    strokeStyle = (0,ol_color__WEBPACK_IMPORTED_MODULE_3__/* .asString */ .XC)(this._stroke.getColor());
    strokeWidth = this._stroke.getWidth();
  } // no atlas manager is used, create a new canvas


  var canvas = this.getImage(pixelratio); // draw the circle on the canvas

  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineJoin = 'round';
  var sum = 0;
  var i, c;

  for (i = 0; i < this._data.length; i++) {
    sum += this._data[i];
  }

  context.save(); // reset transform

  context.setTransform(pixelratio, 0, 0, pixelratio, 0, 0); // then move to (x, y)

  context.translate(0, 0);
  var step = this._animation.animate ? this._animation.step : 1; //console.log(this._animation.step)
  // Draw pie

  switch (this._type) {
    case "donut":
    case "pie3D":
    case "pie":
      {
        var a,
            a0 = Math.PI * (step - 1.5);
        c = canvas.width / 2 / pixelratio;
        context.strokeStyle = strokeStyle;
        context.lineWidth = strokeWidth;
        context.save();

        if (this._type == "pie3D") {
          context.translate(0, c * 0.3);
          context.scale(1, 0.7);
          context.beginPath();
          context.fillStyle = "#369";
          context.arc(c, c * 1.4, this._radius * step, 0, 2 * Math.PI);
          context.fill();
          context.stroke();
        }

        if (this._type == "donut") {
          context.save();
          context.beginPath();
          context.rect(0, 0, 2 * c, 2 * c);
          context.arc(c, c, this._radius * step * this._donutratio, 0, 2 * Math.PI);
          context.clip("evenodd");
        }

        for (i = 0; i < this._data.length; i++) {
          context.beginPath();
          context.moveTo(c, c);
          context.fillStyle = this._colors[i % this._colors.length];
          a = a0 + 2 * Math.PI * this._data[i] / sum * step;
          context.arc(c, c, this._radius * step, a0, a);
          context.closePath();
          context.fill();
          context.stroke();
          a0 = a;
        }

        if (this._type == "donut") {
          context.restore();
          context.beginPath();
          context.strokeStyle = strokeStyle;
          context.lineWidth = strokeWidth;
          context.arc(c, c, this._radius * step * this._donutratio, Math.PI * (step - 1.5), a0);
          context.stroke();
        }

        context.restore();
        break;
      }

    case "bar":
    default:
      {
        var max = 0;

        if (this._max) {
          max = this._max;
        } else {
          for (i = 0; i < this._data.length; i++) {
            if (max < this._data[i]) max = this._data[i];
          }
        }

        var s = Math.min(5, 2 * this._radius / this._data.length);
        c = canvas.width / 2 / pixelratio;
        var b = canvas.width / pixelratio - strokeWidth;
        var x,
            x0 = c - this._data.length * s / 2;
        context.strokeStyle = strokeStyle;
        context.lineWidth = strokeWidth;

        for (i = 0; i < this._data.length; i++) {
          context.beginPath();
          context.fillStyle = this._colors[i % this._colors.length];
          x = x0 + s;
          var h = this._data[i] / max * 2 * this._radius * step;
          context.rect(x0, b - h, s, h); //console.log ( x0+", "+(b-this._data[i]/max*2*this._radius)+", "+x+", "+b);

          context.closePath();
          context.fill();
          context.stroke();
          x0 = x;
        }
      }
  }

  context.restore(); // Set Anchor

  var anchor = this.getAnchor();
  anchor[0] = c - this._offset[0];
  anchor[1] = c - this._offset[1];
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ol_style_Chart);

/***/ }),

/***/ 6046:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_ext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7395);
/* harmony import */ var ol_has__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4242);
/* harmony import */ var ol_style_Fill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6212);
/* harmony import */ var ol_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4956);
/*	Copyright (c) 2016 Jean-Marc VIGLINO, 
	released under the CeCILL-B license (French BSD license)
	(http://www.cecill.info/licences/Licence_CeCILL-B_V1-en.txt).
*/




/**
 * @classdesc
 * Fill style with named pattern
 *
 * @constructor
 * @param {olx.style.FillPatternOption=}  options
 *	@param {ol.style.Image|undefined} options.image an image pattern, image must be preloaded to draw on first call
 *	@param {number|undefined} options.opacity opacity with image pattern, default:1
 *	@param {olx.style.fillPattern} options.pattern pattern name (override by image option)
 *	@param {ol_color} options.color pattern color
 *	@param {ol_style_Fill} options.fill fill color (background)
 *	@param {number} options.offset pattern offset for hash/dot/circle/cross pattern
 *	@param {number} options.size line size for hash/dot/circle/cross pattern
 *	@param {number} options.spacing spacing for hash/dot/circle/cross pattern
 *	@param {number|bool} options.angle angle for hash pattern / true for 45deg dot/circle/cross
 *	@param {number} options.scale pattern scale 
 * @extends {ol_style_Fill}
 * @implements {ol.structs.IHasChecksum}
 * @api
 */

var ol_style_FillPattern = function (options) {
  if (!options) options = {};
  var pattern;
  var canvas = this.canvas_ = document.createElement('canvas');
  var scale = Number(options.scale) > 0 ? Number(options.scale) : 1;
  var ratio = scale * ol_has__WEBPACK_IMPORTED_MODULE_1__/* .DEVICE_PIXEL_RATIO */ .MP || ol_has__WEBPACK_IMPORTED_MODULE_1__/* .DEVICE_PIXEL_RATIO */ .MP;
  var ctx = canvas.getContext('2d');

  if (options.image) {
    options.image.load();
    var i;
    var img = options.image.getImage();

    if (img.width) {
      canvas.width = Math.round(img.width * ratio);
      canvas.height = Math.round(img.height * ratio);
      ctx.globalAlpha = typeof options.opacity == 'number' ? options.opacity : 1;
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
      pattern = ctx.createPattern(canvas, 'repeat');
    } else {
      var self = this;
      pattern = [0, 0, 0, 0];

      img.onload = function () {
        canvas.width = Math.round(img.width * ratio);
        canvas.height = Math.round(img.height * ratio);
        ctx.globalAlpha = typeof options.opacity == 'number' ? options.opacity : 1;
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        pattern = ctx.createPattern(canvas, 'repeat');
        self.setColor(pattern);
      };
    }
  } else {
    var pat = this.getPattern_(options);
    canvas.width = Math.round(pat.width * ratio);
    canvas.height = Math.round(pat.height * ratio);
    ctx.beginPath();

    if (options.fill) {
      ctx.fillStyle = (0,ol_color__WEBPACK_IMPORTED_MODULE_2__/* .asString */ .XC)(options.fill.getColor());
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.scale(ratio, ratio);
    ctx.lineCap = "round";
    ctx.lineWidth = pat.stroke || 1;
    ctx.fillStyle = (0,ol_color__WEBPACK_IMPORTED_MODULE_2__/* .asString */ .XC)(options.color || "#000");
    ctx.strokeStyle = (0,ol_color__WEBPACK_IMPORTED_MODULE_2__/* .asString */ .XC)(options.color || "#000");
    if (pat.circles) for (i = 0; i < pat.circles.length; i++) {
      var ci = pat.circles[i];
      ctx.beginPath();
      ctx.arc(ci[0], ci[1], ci[2], 0, 2 * Math.PI);
      if (pat.fill) ctx.fill();
      if (pat.stroke) ctx.stroke();
    }
    if (!pat.repeat) pat.repeat = [[0, 0]];

    if (pat.char) {
      ctx.font = pat.font || pat.width + "px Arial";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (pat.angle) {
        ctx.fillText(pat.char, pat.width / 4, pat.height / 4);
        ctx.fillText(pat.char, 5 * pat.width / 4, 5 * pat.height / 4);
        ctx.fillText(pat.char, pat.width / 4, 5 * pat.height / 4);
        ctx.fillText(pat.char, 5 * pat.width / 4, pat.height / 4);
        ctx.fillText(pat.char, 3 * pat.width / 4, 3 * pat.height / 4);
        ctx.fillText(pat.char, -pat.width / 4, -pat.height / 4);
        ctx.fillText(pat.char, 3 * pat.width / 4, -pat.height / 4);
        ctx.fillText(pat.char, -pat.width / 4, 3 * pat.height / 4);
      } else ctx.fillText(pat.char, pat.width / 2, pat.height / 2);
    }

    if (pat.lines) for (i = 0; i < pat.lines.length; i++) for (var r = 0; r < pat.repeat.length; r++) {
      var li = pat.lines[i];
      ctx.beginPath();
      ctx.moveTo(li[0] + pat.repeat[r][0], li[1] + pat.repeat[r][1]);

      for (var k = 2; k < li.length; k += 2) {
        ctx.lineTo(li[k] + pat.repeat[r][0], li[k + 1] + pat.repeat[r][1]);
      }

      if (pat.fill) ctx.fill();
      if (pat.stroke) ctx.stroke();
      ctx.save();
      ctx.strokeStyle = 'red';
      ctx.strokeWidth = 0.1; //ctx.strokeRect(0,0,canvas.width,canvas.height);

      ctx.restore();
    }
    pattern = ctx.createPattern(canvas, 'repeat');

    if (options.offset) {
      var offset = options.offset;
      if (typeof offset == "number") offset = [offset, offset];

      if (offset instanceof Array) {
        var dx = Math.round(offset[0] * ratio);
        var dy = Math.round(offset[1] * ratio); // New pattern

        ctx.scale(1 / ratio, 1 / ratio);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(dx, dy);
        ctx.fillStyle = pattern;
        ctx.fillRect(-dx, -dy, canvas.width, canvas.height);
        pattern = ctx.createPattern(canvas, 'repeat');
      }
    }
  }

  ol_style_Fill__WEBPACK_IMPORTED_MODULE_3__/* ["default"].call */ .Z.call(this, {
    color: pattern
  });
};

(0,_util_ext__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(ol_style_FillPattern, ol_style_Fill__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z);
/**
 * Clones the style. 
 * @return {ol_style_FillPattern}
 */

ol_style_FillPattern.prototype.clone = function () {
  var s = ol_style_Fill__WEBPACK_IMPORTED_MODULE_3__/* ["default"].prototype.clone.call */ .Z.prototype.clone.call(this);
  s.canvas_ = this.canvas_;
  return s;
};
/** Get canvas used as pattern
*	@return {canvas}
*/


ol_style_FillPattern.prototype.getImage = function () {
  return this.canvas_;
};
/** Get pattern
*	@param {olx.style.FillPatternOption}
*/


ol_style_FillPattern.prototype.getPattern_ = function (options) {
  var pat = ol_style_FillPattern.prototype.patterns[options.pattern] || ol_style_FillPattern.prototype.patterns.dot;
  var d = Math.round(options.spacing) || 10;
  var size;

  switch (options.pattern) {
    case 'dot':
    case 'circle':
      {
        size = options.size === 0 ? 0 : options.size / 2 || 2;

        if (!options.angle) {
          pat.width = pat.height = d;
          pat.circles = [[d / 2, d / 2, size]];

          if (options.pattern == 'circle') {
            pat.circles = pat.circles.concat([[d / 2 + d, d / 2, size], [d / 2 - d, d / 2, size], [d / 2, d / 2 + d, size], [d / 2, d / 2 - d, size], [d / 2 + d, d / 2 + d, size], [d / 2 + d, d / 2 - d, size], [d / 2 - d, d / 2 + d, size], [d / 2 - d, d / 2 - d, size]]);
          }
        } else {
          d = pat.width = pat.height = Math.round(d * 1.4);
          pat.circles = [[d / 4, d / 4, size], [3 * d / 4, 3 * d / 4, size]];

          if (options.pattern == 'circle') {
            pat.circles = pat.circles.concat([[d / 4 + d, d / 4, size], [d / 4, d / 4 + d, size], [3 * d / 4 - d, 3 * d / 4, size], [3 * d / 4, 3 * d / 4 - d, size], [d / 4 + d, d / 4 + d, size], [3 * d / 4 - d, 3 * d / 4 - d, size]]);
          }
        }

        break;
      }

    case 'tile':
    case 'square':
      {
        size = options.size === 0 ? 0 : options.size / 2 || 2;

        if (!options.angle) {
          pat.width = pat.height = d;
          pat.lines = [[d / 2 - size, d / 2 - size, d / 2 + size, d / 2 - size, d / 2 + size, d / 2 + size, d / 2 - size, d / 2 + size, d / 2 - size, d / 2 - size]];
        } else {
          pat.width = pat.height = d; //size *= Math.sqrt(2);

          pat.lines = [[d / 2 - size, d / 2, d / 2, d / 2 - size, d / 2 + size, d / 2, d / 2, d / 2 + size, d / 2 - size, d / 2]];
        }

        if (options.pattern == 'square') pat.repeat = [[0, 0], [0, d], [d, 0], [0, -d], [-d, 0], [-d, -d], [d, d], [-d, d], [d, -d]];
        break;
      }

    case 'cross':
      {
        // Limit angle to 0 | 45
        if (options.angle) options.angle = 45;
      }
    // fallsthrough

    case 'hatch':
      {
        var a = Math.round(((options.angle || 0) - 90) % 360);
        if (a > 180) a -= 360;
        a *= Math.PI / 180;
        var cos = Math.cos(a);
        var sin = Math.sin(a);

        if (Math.abs(sin) < 0.0001) {
          pat.width = pat.height = d;
          pat.lines = [[0, 0.5, d, 0.5]];
          pat.repeat = [[0, 0], [0, d]];
        } else if (Math.abs(cos) < 0.0001) {
          pat.width = pat.height = d;
          pat.lines = [[0.5, 0, 0.5, d]];
          pat.repeat = [[0, 0], [d, 0]];

          if (options.pattern == 'cross') {
            pat.lines.push([0, 0.5, d, 0.5]);
            pat.repeat.push([0, d]);
          }
        } else {
          var w = pat.width = Math.round(Math.abs(d / sin)) || 1;
          var h = pat.height = Math.round(Math.abs(d / cos)) || 1;

          if (options.pattern == 'cross') {
            pat.lines = [[-w, -h, 2 * w, 2 * h], [2 * w, -h, -w, 2 * h]];
            pat.repeat = [[0, 0]];
          } else if (cos * sin > 0) {
            pat.lines = [[-w, -h, 2 * w, 2 * h]];
            pat.repeat = [[0, 0], [w, 0], [0, h]];
          } else {
            pat.lines = [[2 * w, -h, -w, 2 * h]];
            pat.repeat = [[0, 0], [-w, 0], [0, h]];
          }
        }

        pat.stroke = options.size === 0 ? 0 : options.size || 4;
        break;
      }

    default:
      break;
  }

  return pat;
};
/** Static fuction to add char patterns
*	@param {title} 
*	@param {olx.fillpattern.Option}
*		- size {integer} default 10
*		- width {integer} default 10
*		- height {integer} default 10
*		- circles {Array<circles>}
*		- lines: {Array<pointlist>}
*		- stroke {integer}
*		- fill {bool}
*		- char {char}
*		- font {string} default "10px Arial"
*/


ol_style_FillPattern.addPattern = function (title, options) {
  if (!options) options = {};
  ol_style_FillPattern.prototype.patterns[title || options.char] = {
    width: options.width || options.size || 10,
    height: options.height || options.size || 10,
    font: options.font,
    char: options.char,
    circles: options.circles,
    lines: options.lines,
    repeat: options.repeat,
    stroke: options.stroke,
    angle: options.angle,
    fill: options.fill
  };
};
/** Patterns definitions
	Examples : http://seig.ensg.ign.fr/fichchap.php?NOFICHE=FP31&NOCHEM=CHEMS009&NOLISTE=1&N=8
*/


ol_style_FillPattern.prototype.patterns = {
  "hatch": {
    width: 5,
    height: 5,
    lines: [[0, 2.5, 5, 2.5]],
    stroke: 1
  },
  "cross": {
    width: 7,
    height: 7,
    lines: [[0, 3, 10, 3], [3, 0, 3, 10]],
    stroke: 1
  },
  "dot": {
    width: 8,
    height: 8,
    circles: [[5, 5, 2]],
    stroke: false,
    fill: true
  },
  "circle": {
    width: 10,
    height: 10,
    circles: [[5, 5, 2]],
    stroke: 1,
    fill: false
  },
  "square": {
    width: 10,
    height: 10,
    lines: [[3, 3, 3, 8, 8, 8, 8, 3, 3, 3]],
    stroke: 1,
    fill: false
  },
  "tile": {
    width: 10,
    height: 10,
    lines: [[3, 3, 3, 8, 8, 8, 8, 3, 3, 3]],
    fill: true
  },
  "woven": {
    width: 12,
    height: 12,
    lines: [[3, 3, 9, 9], [0, 12, 3, 9], [9, 3, 12, 0], [-1, 1, 1, -1], [13, 11, 11, 13]],
    stroke: 1
  },
  "crosses": {
    width: 8,
    height: 8,
    lines: [[2, 2, 6, 6], [2, 6, 6, 2]],
    stroke: 1
  },
  "caps": {
    width: 8,
    height: 8,
    lines: [[2, 6, 4, 2, 6, 6]],
    stroke: 1
  },
  "nylon": {
    width: 20,
    height: 20,
    //		lines: [[ 0,5, 0,0, 5,0 ],[ 5,10, 10,10, 10,5 ], [ 10,15, 10,20, 15,20 ],[ 15,10, 20,10, 20,15 ]],
    //		repeat: [[0,0], [20,0], [0,20], [-20,0], [0,-20], [-20,-20]],
    lines: [[1, 6, 1, 1, 6, 1], [6, 11, 11, 11, 11, 6], [11, 16, 11, 21, 16, 21], [16, 11, 21, 11, 21, 16]],
    repeat: [[0, 0], [-20, 0], [0, -20]],
    stroke: 1
  },
  "hexagon": {
    width: 20,
    height: 12,
    lines: [[0, 10, 4, 4, 10, 4, 14, 10, 10, 16, 4, 16, 0, 10]],
    stroke: 1,
    repeat: [[0, 0], [10, 6], [10, -6], [-10, -6]]
  },
  "cemetry": {
    width: 15,
    height: 19,
    lines: [[0, 3.5, 7, 3.5], [3.5, 0, 3.5, 10] //[7,12.5,14,12.5],[10.5,9,10.5,19]
    ],
    stroke: 1,
    repeat: [[0, 0], [7, 9]]
  },
  "sand": {
    width: 20,
    height: 20,
    circles: [[1, 2, 1], [9, 3, 1], [2, 16, 1], [7, 8, 1], [6, 14, 1], [4, 19, 1], [14, 2, 1], [12, 10, 1], [14, 18, 1], [18, 8, 1], [18, 14, 1]],
    fill: 1
  },
  "conglomerate": {
    width: 30,
    height: 20,
    circles: [[2, 4, 1], [17, 3, 1], [26, 18, 1], [12, 17, 1], [5, 17, 2], [28, 11, 2]],
    lines: [[7, 5, 6, 7, 9, 9, 11, 8, 11, 6, 9, 5, 7, 5], [16, 10, 15, 13, 16, 14, 19, 15, 21, 13, 22, 9, 20, 8, 19, 8, 16, 10], [24, 6, 26, 7, 27, 5, 26, 4, 24, 4, 24, 6]],
    stroke: 1
  },
  "gravel": {
    width: 15,
    height: 10,
    circles: [[4, 2, 1], [5, 9, 1], [1, 7, 1]],
    //[9,9,1],,[15,2,1]],
    lines: [[7, 5, 6, 6, 7, 7, 8, 7, 9, 7, 10, 5, 9, 4, 7, 5], [11, 2, 14, 4, 14, 1, 12, 1, 11, 2]],
    stroke: 1
  },
  "brick": {
    width: 18,
    height: 16,
    lines: [[0, 1, 18, 1], [0, 10, 18, 10], [6, 1, 6, 10], [12, 10, 12, 18], [12, 0, 12, 1]],
    stroke: 1
  },
  "dolomite": {
    width: 20,
    height: 16,
    lines: [[0, 1, 20, 1], [0, 9, 20, 9], [1, 9, 6, 1], [11, 9, 14, 16], [14, 0, 14.4, 1]],
    stroke: 1
  },
  "coal": {
    width: 20,
    height: 16,
    lines: [[1, 5, 7, 1, 7, 7], [11, 10, 12, 5, 18, 9], [5, 10, 2, 15, 9, 15], [15, 16, 15, 13, 20, 16], [15, 0, 15, 2, 20, 0]],
    fill: 1
  },
  "breccia": {
    width: 20,
    height: 16,
    lines: [[1, 5, 7, 1, 7, 7, 1, 5], [11, 10, 12, 5, 18, 9, 11, 10], [5, 10, 2, 15, 9, 15, 5, 10], [15, 16, 15, 13, 22, 18], [15, 0, 15, 2, 20, 0]],
    stroke: 1
  },
  "clay": {
    width: 20,
    height: 20,
    lines: [[0, 0, 3, 11, 0, 20], [11, 0, 10, 3, 13, 13, 11, 20], [0, 0, 10, 3, 20, 0], [0, 12, 3, 11, 13, 13, 20, 12]],
    stroke: 1
  },
  "flooded": {
    width: 15,
    height: 10,
    lines: [[0, 1, 10, 1], [0, 6, 5, 6], [10, 6, 15, 6]],
    stroke: 1
  },
  "chaos": {
    width: 40,
    height: 40,
    lines: [[40, 2, 40, 0, 38, 0, 40, 2], [4, 0, 3, 2, 2, 5, 0, 0, 0, 3, 2, 7, 5, 6, 7, 7, 8, 10, 9, 12, 9, 13, 9, 14, 8, 14, 6, 15, 2, 15, 0, 20, 0, 22, 2, 20, 5, 19, 8, 15, 10, 14, 11, 12.25, 10, 12, 10, 10, 12, 9, 13, 7, 12, 6, 13, 4, 16, 7, 17, 4, 20, 0, 18, 0, 15, 3, 14, 2, 14, 0, 12, 1, 11, 0, 10, 1, 11, 4, 10, 7, 9, 8, 8, 5, 6, 4, 5, 3, 5, 1, 5, 0, 4, 0], [7, 1, 7, 3, 8, 3, 8, 2, 7, 1], [4, 3, 5, 5, 4, 5, 4, 3], [34, 5, 33, 7, 38, 10, 38, 8, 36, 5, 34, 5], [27, 0, 23, 2, 21, 8, 30, 0, 27, 0], [25, 8, 26, 12, 26, 16, 22.71875, 15.375, 20, 13, 18, 15, 17, 18, 13, 22, 17, 21, 19, 22, 21, 20, 19, 18, 22, 17, 30, 25, 26, 26, 24, 28, 21.75, 33.34375, 20, 36, 18, 40, 20, 40, 24, 37, 25, 32, 27, 31, 26, 38, 27, 37, 30, 32, 32, 35, 36, 37, 38, 40, 38, 39, 40, 40, 37, 36, 34, 32, 37, 31, 36, 29, 33, 27, 34, 24, 39, 21, 40, 21, 40, 16, 37, 20, 31, 22, 32, 25, 27, 20, 29, 15, 30, 20, 32, 20, 34, 18, 33, 12, 31, 11, 29, 14, 26, 9, 25, 8], [39, 24, 37, 26, 40, 28, 39, 24], [13, 15, 9, 19, 14, 18, 13, 15], [18, 23, 14, 27, 16, 27, 17, 25, 20, 26, 18, 23], [6, 24, 2, 26, 1, 28, 2, 30, 5, 28, 12, 30, 16, 32, 18, 30, 15, 30, 12, 28, 9, 25, 7, 27, 6, 24], [29, 27, 32, 28, 33, 31, 30, 29, 27, 28, 29, 27], [5, 35, 1, 33, 3, 36, 13, 38, 15, 35, 10, 36, 5, 35]],
    fill: 1
  },
  "grass": {
    width: 27,
    height: 22,
    lines: [[0, 10.5, 13, 10.5], [2.5, 10, 1.5, 7], [4.5, 10, 4.5, 5, 3.5, 4], [7, 10, 7.5, 6, 8.5, 3], [10, 10, 11, 6]],
    repeat: [[0, 0], [14, 10]],
    stroke: 1
  },
  "swamp": {
    width: 24,
    height: 23,
    lines: [[0, 10.5, 9.5, 10.5], [2.5, 10, 2.5, 7], [4.5, 10, 4.5, 4], [6.5, 10, 6.5, 6], [3, 12.5, 7, 12.5]],
    repeat: [[0, 0], [14, 10]],
    stroke: 1
  },
  "wave": {
    width: 10,
    height: 8,
    lines: [[0, 0, 5, 4, 10, 0]],
    stroke: 1
  },
  "vine": {
    width: 13,
    height: 13,
    lines: [[3, 0, 3, 6], [9, 7, 9, 13]],
    stroke: 1.0
  },
  "forest": {
    width: 55,
    height: 30,
    circles: [[7, 7, 3.5], [20, 20, 1.5], [42, 22, 3.5], [35, 5, 1.5]],
    stroke: 1
  },
  "scrub": {
    width: 26,
    height: 20,
    lines: [[1, 4, 4, 8, 6, 4]],
    circles: [[20, 13, 1.5]],
    stroke: 1
  },
  "tree": {
    width: 30,
    height: 30,
    lines: [[7.78, 10.61, 4.95, 10.61, 4.95, 7.78, 3.54, 7.78, 2.12, 6.36, 0.71, 6.36, 0, 4.24, 0.71, 2.12, 4.24, 0, 7.78, 0.71, 9.19, 3.54, 7.78, 4.95, 7.07, 7.07, 4.95, 7.78]],
    repeat: [[3, 1], [18, 16]],
    stroke: 1
  },
  "pine": {
    width: 30,
    height: 30,
    lines: [[5.66, 11.31, 2.83, 11.31, 2.83, 8.49, 0, 8.49, 2.83, 0, 5.66, 8.49, 2.83, 8.49]],
    repeat: [[3, 1], [18, 16]],
    stroke: 1
  },
  "pines": {
    width: 22,
    height: 20,
    lines: [[1, 4, 3.5, 1, 6, 4], [1, 8, 3.5, 5, 6, 8], [3.5, 1, 3.5, 11], [12, 14.5, 14.5, 14, 17, 14.5], [12, 18, 17, 18], [14.5, 12, 14.5, 18]],
    repeat: [[2, 1]],
    stroke: 1
  },
  "rock": {
    width: 20,
    height: 20,
    lines: [[1, 0, 1, 9], [4, 0, 4, 9], [7, 0, 7, 9], [10, 1, 19, 1], [10, 4, 19, 4], [10, 7, 19, 7], [0, 11, 9, 11], [0, 14, 9, 14], [0, 17, 9, 17], [12, 10, 12, 19], [15, 10, 15, 19], [18, 10, 18, 19]],
    repeat: [[0.5, 0.5]],
    stroke: 1
  },
  "rocks": {
    width: 20,
    height: 20,
    lines: [[5, 0, 3, 0, 5, 4, 4, 6, 0, 3, 0, 5, 3, 6, 5, 9, 3.75, 10, 2.5, 10, 0, 9, 0, 10, 4, 11, 5, 14, 4, 15, 0, 13, 0, 13, 0, 13, 0, 14, 0, 14, 5, 16, 5, 18, 3, 19, 0, 19, -0.25, 19.9375, 5, 20, 10, 19, 10, 20, 11, 20, 12, 19, 14, 20, 15, 20, 17, 19, 20, 20, 20, 19, 19, 16, 20, 15, 20, 11, 20, 10, 19, 8, 20, 5, 20, 0, 19, 0, 20, 2, 19, 4, 17, 4, 16, 3, 15, 0, 14, 0, 15, 4, 11, 5, 10, 4, 11, 0, 10, 0, 9, 4, 6, 5, 5, 0], [18, 5, 19, 6, 18, 10, 16, 10, 14, 9, 16, 5, 18, 5], [5, 6, 9, 5, 10, 6, 10, 9, 6, 10, 5, 6], [14, 5, 14, 8, 13, 9, 12, 9, 11, 7, 12, 5, 14, 5], [5, 11, 8, 10, 9, 11, 10, 14, 6, 15, 6, 15, 5, 11], [13, 10, 14, 11, 15, 14, 15, 14, 15, 14, 11, 15, 10, 11, 11, 10, 13, 10], [15, 12, 16, 11, 19, 11, 19, 15, 16, 14, 16, 14, 15, 12], [6, 16, 9, 15, 10, 18, 5, 19, 6, 16], [10, 16, 14, 16, 14, 18, 13, 19, 11, 18, 10, 16], [15, 15, 18, 16, 18, 18, 16, 19, 15, 18, 15, 15]],
    stroke: 1
  }
};
/**
 * /
ol_style_FillPattern.prototype.getChecksum = function()
{
	var strokeChecksum = (this.stroke_!==null) ?
		this.stroke_.getChecksum() : '-';
	var fillChecksum = (this.fill_!==null) ?
		this.fill_.getChecksum() : '-';

	var recalculate = (this.checksums_===null) ||
		(strokeChecksum != this.checksums_[1] ||
		fillChecksum != this.checksums_[2] ||
		this.radius_ != this.checksums_[3] ||
		this.form_+"-"+this.glyphs_ != this.checksums_[4]);

	if (recalculate) {
		var checksum = 'c' + strokeChecksum + fillChecksum 
			+ ((this.radius_ !== void 0) ? this.radius_.toString() : '-')
			+ this.form_+"-"+this.glyphs_;
		this.checksums_ = [checksum, strokeChecksum, fillChecksum, this.radius_, this.form_+"-"+this.glyphs_];
	}

	return this.checksums_[0];
};
/**/

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ol_style_FillPattern);

/***/ }),

/***/ 2579:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ FlowLine)
});

// EXTERNAL MODULE: ./node_modules/ol-ext/util/ext.js
var ext = __webpack_require__(7395);
// EXTERNAL MODULE: ./node_modules/ol/style/Style.js
var Style = __webpack_require__(6054);
// EXTERNAL MODULE: ./node_modules/ol/color.js
var ol_color = __webpack_require__(4956);
// EXTERNAL MODULE: ./node_modules/ol/geom/MultiPolygon.js
var MultiPolygon = __webpack_require__(9232);
// EXTERNAL MODULE: ./node_modules/ol/geom/Polygon.js
var Polygon = __webpack_require__(2607);
// EXTERNAL MODULE: ./node_modules/ol/geom/Circle.js
var Circle = __webpack_require__(4665);
// EXTERNAL MODULE: ./node_modules/ol/extent.js
var extent = __webpack_require__(1046);
;// CONCATENATED MODULE: ./node_modules/ol-ext/geom/GeomUtils.js
/*	Copyright (c) 2016 Jean-Marc VIGLINO, 
  released under the CeCILL-B license (French BSD license)
  (http://www.cecill.info/licences/Licence_CeCILL-B_V1-en.txt).

  Usefull function to handle geometric operations
*/










/** Distance beetween 2 points
 *	Usefull geometric functions
 * @param {ol.Coordinate} p1 first point
 * @param {ol.Coordinate} p2 second point
 * @return {number} distance
 */

var ol_coordinate_dist2d = function (p1, p2) {
  var dx = p1[0] - p2[0];
  var dy = p1[1] - p2[1];
  return Math.sqrt(dx * dx + dy * dy);
};
/** 2 points are equal
 *	Usefull geometric functions
 * @param {ol.Coordinate} p1 first point
 * @param {ol.Coordinate} p2 second point
 * @return {boolean}
 */


var ol_coordinate_equal = function (p1, p2) {
  return p1[0] == p2[0] && p1[1] == p2[1];
};
/** Get center coordinate of a feature
 * @param {ol.Feature} f
 * @return {ol.coordinate} the center
 */


var ol_coordinate_getFeatureCenter = function (f) {
  return ol_coordinate_getGeomCenter(f.getGeometry());
};
/** Get center coordinate of a geometry
* @param {ol.geom.Geometry} geom
* @return {ol.Coordinate} the center
*/


var ol_coordinate_getGeomCenter = function (geom) {
  switch (geom.getType()) {
    case 'Point':
      return geom.getCoordinates();

    case "MultiPolygon":
      geom = geom.getPolygon(0);
    // fallthrough

    case "Polygon":
      return geom.getInteriorPoint().getCoordinates();

    default:
      return geom.getClosestPoint(ol_extent_getCenter(geom.getExtent()));
  }
};
/** Offset a polyline
 * @param {Array<ol.Coordinate>} coords
 * @param {number} offset
 * @return {Array<ol.Coordinate>} resulting coord
 * @see http://stackoverflow.com/a/11970006/796832
 * @see https://drive.google.com/viewerng/viewer?a=v&pid=sites&srcid=ZGVmYXVsdGRvbWFpbnxqa2dhZGdldHN0b3JlfGd4OjQ4MzI5M2Y0MjNmNzI2MjY
 */


var ol_coordinate_offsetCoords = function (coords, offset) {
  var path = [];
  var N = coords.length - 1;
  var max = N;
  var mi, mi1, li, li1, ri, ri1, si, si1, Xi1, Yi1;
  var p0, p1, p2;
  var isClosed = ol_coordinate_equal(coords[0], coords[N]);

  if (!isClosed) {
    p0 = coords[0];
    p1 = coords[1];
    p2 = [p0[0] + (p1[1] - p0[1]) / ol_coordinate_dist2d(p0, p1) * offset, p0[1] - (p1[0] - p0[0]) / ol_coordinate_dist2d(p0, p1) * offset];
    path.push(p2);
    coords.push(coords[N]);
    N++;
    max--;
  }

  for (var i = 0; i < max; i++) {
    p0 = coords[i];
    p1 = coords[(i + 1) % N];
    p2 = coords[(i + 2) % N];
    mi = (p1[1] - p0[1]) / (p1[0] - p0[0]);
    mi1 = (p2[1] - p1[1]) / (p2[0] - p1[0]); // Prevent alignements

    if (Math.abs(mi - mi1) > 1e-10) {
      li = Math.sqrt((p1[0] - p0[0]) * (p1[0] - p0[0]) + (p1[1] - p0[1]) * (p1[1] - p0[1]));
      li1 = Math.sqrt((p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1]));
      ri = p0[0] + offset * (p1[1] - p0[1]) / li;
      ri1 = p1[0] + offset * (p2[1] - p1[1]) / li1;
      si = p0[1] - offset * (p1[0] - p0[0]) / li;
      si1 = p1[1] - offset * (p2[0] - p1[0]) / li1;
      Xi1 = (mi1 * ri1 - mi * ri + si - si1) / (mi1 - mi);
      Yi1 = (mi * mi1 * (ri1 - ri) + mi1 * si - mi * si1) / (mi1 - mi); // Correction for vertical lines

      if (p1[0] - p0[0] == 0) {
        Xi1 = p1[0] + offset * (p1[1] - p0[1]) / Math.abs(p1[1] - p0[1]);
        Yi1 = mi1 * Xi1 - mi1 * ri1 + si1;
      }

      if (p2[0] - p1[0] == 0) {
        Xi1 = p2[0] + offset * (p2[1] - p1[1]) / Math.abs(p2[1] - p1[1]);
        Yi1 = mi * Xi1 - mi * ri + si;
      }

      path.push([Xi1, Yi1]);
    }
  }

  if (isClosed) {
    path.push(path[0]);
  } else {
    coords.pop();
    p0 = coords[coords.length - 1];
    p1 = coords[coords.length - 2];
    p2 = [p0[0] - (p1[1] - p0[1]) / ol_coordinate_dist2d(p0, p1) * offset, p0[1] + (p1[0] - p0[0]) / ol_coordinate_dist2d(p0, p1) * offset];
    path.push(p2);
  }

  return path;
};
/** Find the segment a point belongs to
 * @param {ol.Coordinate} pt
 * @param {Array<ol.Coordinate>} coords
 * @return {} the index (-1 if not found) and the segment
 */


var ol_coordinate_findSegment = function (pt, coords) {
  for (var i = 0; i < coords.length - 1; i++) {
    var p0 = coords[i];
    var p1 = coords[i + 1];

    if (ol_coordinate_equal(pt, p0) || ol_coordinate_equal(pt, p1)) {
      return {
        index: 1,
        segment: [p0, p1]
      };
    } else {
      var d0 = ol_coordinate_dist2d(p0, p1);
      var v0 = [(p1[0] - p0[0]) / d0, (p1[1] - p0[1]) / d0];
      var d1 = ol_coordinate_dist2d(p0, pt);
      var v1 = [(pt[0] - p0[0]) / d1, (pt[1] - p0[1]) / d1];

      if (Math.abs(v0[0] * v1[1] - v0[1] * v1[0]) < 1e-10) {
        return {
          index: 1,
          segment: [p0, p1]
        };
      }
    }
  }

  return {
    index: -1
  };
};
/**
 * Split a Polygon geom with horizontal lines
 * @param {Array<ol.Coordinate>} geom
 * @param {number} y the y to split
 * @param {number} n contour index
 * @return {Array<Array<ol.Coordinate>>}
 */


var ol_coordinate_splitH = function (geom, y, n) {
  var x, abs;
  var list = [];

  for (var i = 0; i < geom.length - 1; i++) {
    // Hole separator?
    if (!geom[i].length || !geom[i + 1].length) continue; // Intersect

    if (geom[i][1] <= y && geom[i + 1][1] > y || geom[i][1] >= y && geom[i + 1][1] < y) {
      abs = (y - geom[i][1]) / (geom[i + 1][1] - geom[i][1]);
      x = abs * (geom[i + 1][0] - geom[i][0]) + geom[i][0];
      list.push({
        contour: n,
        index: i,
        pt: [x, y],
        abs: abs
      });
    }
  } // Sort x


  list.sort(function (a, b) {
    return a.pt[0] - b.pt[0];
  }); // Horizontal segment

  var result = [];

  for (var j = 0; j < list.length - 1; j += 2) {
    result.push([list[j], list[j + 1]]);
  }

  return result;
};
/** Create a geometry given a type and coordinates */


var ol_geom_createFromType = function (type, coordinates) {
  switch (type) {
    case 'LineString':
      return new ol_geom_LineString(coordinates);

    case 'LinearRing':
      return new ol_geom_LinearRing(coordinates);

    case 'MultiLineString':
      return new ol_geom_MultiLineString(coordinates);

    case 'MultiPoint':
      return new ol_geom_MultiPoint(coordinates);

    case 'MultiPolygon':
      return new ol_geom_MultiPolygon(coordinates);

    case 'Point':
      return new ol_geom_Point(coordinates);

    case 'Polygon':
      return new ol_geom_Polygon(coordinates);

    default:
      console.error('[createFromType] Unsupported type: ' + type);
      return null;
  }
};



/** Intersect 2 lines
 * @param {Arrar<ol.coordinate>} d1
 * @param {Arrar<ol.coordinate>} d2
 */

var ol_coordinate_getIntersectionPoint = function (d1, d2) {
  var d1x = d1[1][0] - d1[0][0];
  var d1y = d1[1][1] - d1[0][1];
  var d2x = d2[1][0] - d2[0][0];
  var d2y = d2[1][1] - d2[0][1];
  var det = d1x * d2y - d1y * d2x;

  if (det != 0) {
    var k = (d1x * d1[0][1] - d1x * d2[0][1] - d1y * d1[0][0] + d1y * d2[0][0]) / det;
    return [d2[0][0] + k * d2x, d2[0][1] + k * d2y];
  } else {
    return false;
  }
};


var ol_extent_intersection;

(function () {
  // Split at x
  function splitX(pts, x) {
    var pt;

    for (let i = pts.length - 1; i > 0; i--) {
      if (pts[i][0] > x && pts[i - 1][0] < x || pts[i][0] < x && pts[i - 1][0] > x) {
        pt = [x, (x - pts[i][0]) / (pts[i - 1][0] - pts[i][0]) * (pts[i - 1][1] - pts[i][1]) + pts[i][1]];
        pts.splice(i, 0, pt);
      }
    }
  } // Split at y


  function splitY(pts, y) {
    var pt;

    for (let i = pts.length - 1; i > 0; i--) {
      if (pts[i][1] > y && pts[i - 1][1] < y || pts[i][1] < y && pts[i - 1][1] > y) {
        pt = [(y - pts[i][1]) / (pts[i - 1][1] - pts[i][1]) * (pts[i - 1][0] - pts[i][0]) + pts[i][0], y];
        pts.splice(i, 0, pt);
      }
    }
  }
  /** Fast polygon intersection with an extent (used for area calculation)
   * @param {ol_extent_Extent} extent
   * @param {ol_geom_Polygon|ol_geom_MultiPolygon} polygon
   * @returns {ol_geom_Polygon|ol_geom_MultiPolygon|null} return null if not a polygon geometry
   */


  ol_extent_intersection = function (extent, polygon) {
    var poly = polygon.getType() === 'Polygon';
    if (!poly && polygon.getType() !== 'MultiPolygon') return null;
    var geom = polygon.getCoordinates();
    if (poly) geom = [geom];
    geom.forEach(function (g) {
      g.forEach(function (c) {
        splitX(c, extent[0]);
        splitX(c, extent[2]);
        splitY(c, extent[1]);
        splitY(c, extent[3]);
      });
    }); // Snap geom to the extent 

    geom.forEach(function (g) {
      g.forEach(function (c) {
        c.forEach(function (p) {
          if (p[0] < extent[0]) p[0] = extent[0];else if (p[0] > extent[2]) p[0] = extent[2];
          if (p[1] < extent[1]) p[1] = extent[1];else if (p[1] > extent[3]) p[1] = extent[3];
        });
      });
    });

    if (poly) {
      return new Polygon/* default */.ZP(geom[0]);
    } else {
      return new MultiPolygon/* default */.Z(geom);
    }
  };
})();


/** Add points along a segment
 * @param {ol_Coordinate} p1 
 * @param {ol_Coordinate} p2 
 * @param {number} d 
 * @param {boolean} start include starting point, default true
 * @returns {Array<ol_Coordinate>}
 */

var ol_coordinate_sampleAt = function (p1, p2, d, start) {
  var pts = [];
  if (start !== false) pts.push(p1);
  var dl = ol_coordinate_dist2d(p1, p2);

  if (dl) {
    var nb = Math.round(dl / d);

    if (nb > 1) {
      var dx = (p2[0] - p1[0]) / nb;
      var dy = (p2[1] - p1[1]) / nb;

      for (var i = 1; i < nb; i++) {
        pts.push([p1[0] + dx * i, p1[1] + dy * i]);
      }
    }
  }

  pts.push(p2);
  return pts;
};


/** Sample a Polygon at a distance
 * @param {number} d
 * @returns {ol_geom_Polygon}
 */

Polygon/* default.prototype.sampleAt */.ZP.prototype.sampleAt = function (res) {
  var poly = this.getCoordinates();
  var result = [];
  poly.forEach(function (p) {
    var l = [];

    for (var i = 1; i < p.length; i++) {
      l = l.concat(ol_coordinate_sampleAt(p[i - 1], p[i], res, i === 1));
    }

    result.push(l);
  });
  return new Polygon/* default */.ZP(result);
};
/** Sample a MultiPolygon at a distance
 * @param {number} res
 * @returns {ol_geom_MultiPolygon}
 */


MultiPolygon/* default.prototype.sampleAt */.Z.prototype.sampleAt = function (res) {
  var mpoly = this.getCoordinates();
  var result = [];
  mpoly.forEach(function (poly) {
    var a = [];
    result.push(a);
    poly.forEach(function (p) {
      var l = [];

      for (var i = 1; i < p.length; i++) {
        l = l.concat(ol_coordinate_sampleAt(p[i - 1], p[i], res, i === 1));
      }

      a.push(l);
    });
  });
  return new MultiPolygon/* default */.Z(result);
};
/** Intersect a geometry using a circle
 * @param {ol_geom_Geometry} geom
 * @param {number} resolution circle resolution to sample the polygon on the circle, default 1
 * @returns {ol_geom_Geometry}
 */


Circle/* default.prototype.intersection */.Z.prototype.intersection = function (geom, resolution) {
  if (geom.sampleAt) {
    var ext = (0,extent/* buffer */.f3)(this.getCenter().concat(this.getCenter()), this.getRadius());
    geom = ol_extent_intersection(ext, geom);
    geom = geom.simplify(resolution);
    var c = this.getCenter();
    var r = this.getRadius(); //var res = (resolution||1) * r / 100;

    var g = geom.sampleAt(resolution).getCoordinates();

    switch (geom.getType()) {
      case 'Polygon':
        g = [g];
      // fallthrough

      case 'MultiPolygon':
        {
          var hasout = false; // var hasin = false;

          var result = [];
          g.forEach(function (poly) {
            var a = [];
            result.push(a);
            poly.forEach(function (ring) {
              var l = [];
              a.push(l);
              ring.forEach(function (p) {
                var d = ol_coordinate_dist2d(c, p);

                if (d > r) {
                  hasout = true;
                  l.push([c[0] + r / d * (p[0] - c[0]), c[1] + r / d * (p[1] - c[1])]);
                } else {
                  // hasin = true;
                  l.push(p);
                }
              });
            });
          });
          if (!hasout) return geom;

          if (geom.getType() === 'Polygon') {
            return new Polygon/* default */.ZP(result[0]);
          } else {
            return new MultiPolygon/* default */.Z(result);
          }
        }
    }
  } else {
    console.warn('[ol/geom/Circle~intersection] Unsupported geometry type: ' + geom.getType());
  }

  return geom;
};
// EXTERNAL MODULE: ./node_modules/ol/geom/LineString.js
var LineString = __webpack_require__(9171);
;// CONCATENATED MODULE: ./node_modules/ol-ext/geom/LineStringSplitAt.js


/** Split a lineString by a point or a list of points
 *	NB: points must be on the line, use getClosestPoint() to get one
* @param {ol.Coordinate | Array<ol.Coordinate>} pt points to split the line
* @param {Number} tol distance tolerance for 2 points to be equal
*/

LineString/* default.prototype.splitAt */.Z.prototype.splitAt = function (pt, tol) {
  var i;
  if (!pt) return [this];
  if (!tol) tol = 1e-10; // Test if list of points

  if (pt.length && pt[0].length) {
    var result = [this];

    for (i = 0; i < pt.length; i++) {
      var r = [];

      for (var k = 0; k < result.length; k++) {
        var ri = result[k].splitAt(pt[i], tol);
        r = r.concat(ri);
      }

      result = r;
    }

    return result;
  } // Nothing to do


  if (ol_coordinate_equal(pt, this.getFirstCoordinate()) || ol_coordinate_equal(pt, this.getLastCoordinate())) {
    return [this];
  } // Get


  var c0 = this.getCoordinates();
  var ci = [c0[0]];
  var c = [];

  for (i = 0; i < c0.length - 1; i++) {
    // Filter equal points
    if (ol_coordinate_equal(c0[i], c0[i + 1])) continue; // Extremity found

    if (ol_coordinate_equal(pt, c0[i + 1])) {
      ci.push(c0[i + 1]);
      c.push(new LineString/* default */.Z(ci));
      ci = [];
    } // Test alignement
    else if (!ol_coordinate_equal(pt, c0[i])) {
        var d1,
            d2,
            split = false;

        if (c0[i][0] == c0[i + 1][0]) {
          d1 = (c0[i][1] - pt[1]) / (c0[i][1] - c0[i + 1][1]);
          split = c0[i][0] == pt[0] && 0 < d1 && d1 <= 1;
        } else if (c0[i][1] == c0[i + 1][1]) {
          d1 = (c0[i][0] - pt[0]) / (c0[i][0] - c0[i + 1][0]);
          split = c0[i][1] == pt[1] && 0 < d1 && d1 <= 1;
        } else {
          d1 = (c0[i][0] - pt[0]) / (c0[i][0] - c0[i + 1][0]);
          d2 = (c0[i][1] - pt[1]) / (c0[i][1] - c0[i + 1][1]);
          split = Math.abs(d1 - d2) <= tol && 0 < d1 && d1 <= 1;
        } // pt is inside the segment > split


        if (split) {
          ci.push(pt);
          c.push(new LineString/* default */.Z(ci));
          ci = [pt];
        }
      }

    ci.push(c0[i + 1]);
  }

  if (ci.length > 1) c.push(new LineString/* default */.Z(ci));
  if (c.length) return c;else return [this];
}; // import('ol-ext/geom/LineStringSplitAt')
;// CONCATENATED MODULE: ./node_modules/ol-ext/style/FlowLine.js
/*	Copyright (c) 2019 Jean-Marc VIGLINO, 
  released under the CeCILL-B license (French BSD license)
  (http://www.cecill.info/licences/Licence_CeCILL-B_V1-en.txt).
*/






/** Flow line style
 * Draw LineString with a variable color / width
 * NB: the FlowLine style doesn't impress the hit-detection.
 * If you want your lines to be sectionable you have to add your own style to handle this.
 * (with transparent line: stroke color opacity to .1 or zero width)
 * @extends {ol_style_Style}
 * @constructor
 * @param {Object} options
 *  @param {boolean} options.visible draw only the visible part of the line, default true
 *  @param {number|function} options.width Stroke width or a function that gets a feature and the position (beetween [0,1]) and returns current width
 *  @param {number} options.width2 Final stroke width (if width is not a function)
 *  @param {number} options.arrow Arrow at start (-1), at end (1), at both (2), none (0), default geta
 *  @param {ol.colorLike|function} options.color Stroke color or a function that gets a feature and the position (beetween [0,1]) and returns current color
 *  @param {ol.colorLike} options.color2 Final sroke color if color is nor a function
 *  @param {ol.colorLike} options.arrowColor Color of arrows, if not defined used color or color2
 *  @param {string} options.lineCap CanvasRenderingContext2D.lineCap 'butt' | 'round' | 'square', default 'butt'
 *  @param {number|ol.size} options.arrowSize height and width of the arrow, default 16
 *  @param {number} options.offset0 offset at line start
 *  @param {number} options.offset1 offset at line end
 */

var ol_style_FlowLine = function (options) {
  if (!options) options = {};
  Style/* default.call */.ZP.call(this, {
    renderer: this._render.bind(this),
    stroke: options.stroke,
    text: options.text,
    zIndex: options.zIndex,
    geometry: options.geometry
  }); // Draw only visible

  this._visible = options.visible !== false; // Width

  if (typeof options.width === 'function') {
    this._widthFn = options.width;
  } else {
    this.setWidth(options.width);
  }

  this.setWidth2(options.width2); // Color

  if (typeof options.color === 'function') {
    this._colorFn = options.color;
  } else {
    this.setColor(options.color);
  }

  this.setColor2(options.color2); // LineCap

  this.setLineCap(options.lineCap); // Arrow

  this.setArrow(options.arrow);
  this.setArrowSize(options.arrowSize);
  this.setArrowColor(options.arrowColor); // Offset

  this._offset = [0, 0];
  this.setOffset(options.offset0, 0);
  this.setOffset(options.offset1, 1);
};

(0,ext/* default */.Z)(ol_style_FlowLine, Style/* default */.ZP);
/** Set the initial width
 * @param {number} width width, default 0
 */

ol_style_FlowLine.prototype.setWidth = function (width) {
  this._width = width || 0;
};
/** Set the final width
 * @param {number} width width, default 0
 */


ol_style_FlowLine.prototype.setWidth2 = function (width) {
  this._width2 = width;
};
/** Get offset at start or end
 * @param {number} where 0=start, 1=end
 * @return {number} width
 */


ol_style_FlowLine.prototype.getOffset = function (where) {
  return this._offset[where];
};
/** Add an offset at start or end
 * @param {number} width
 * @param {number} where 0=start, 1=end
 */


ol_style_FlowLine.prototype.setOffset = function (width, where) {
  width = Math.max(0, parseFloat(width));

  switch (where) {
    case 0:
      {
        this._offset[0] = width;
        break;
      }

    case 1:
      {
        this._offset[1] = width;
        break;
      }
  }
};
/** Set the LineCap
 * @param {steing} cap LineCap (round or butt), default butt
 */


ol_style_FlowLine.prototype.setLineCap = function (cap) {
  this._lineCap = cap === 'round' ? 'round' : 'butt';
};
/** Get the current width at step
 * @param {ol.feature} feature
 * @param {number} step current drawing step beetween [0,1] 
 * @return {number} 
 */


ol_style_FlowLine.prototype.getWidth = function (feature, step) {
  if (this._widthFn) return this._widthFn(feature, step);
  var w2 = typeof this._width2 === 'number' ? this._width2 : this._width;
  return this._width + (w2 - this._width) * step;
};
/** Set the initial color
 * @param {ol.colorLike} color
 */


ol_style_FlowLine.prototype.setColor = function (color) {
  try {
    this._color = (0,ol_color/* asArray */._2)(color);
  } catch (e) {
    this._color = [0, 0, 0, 1];
  }
};
/** Set the final color
 * @param {ol.colorLike} color
 */


ol_style_FlowLine.prototype.setColor2 = function (color) {
  try {
    this._color2 = (0,ol_color/* asArray */._2)(color);
  } catch (e) {
    this._color2 = null;
  }
};
/** Set the arrow color
 * @param {ol.colorLike} color
 */


ol_style_FlowLine.prototype.setArrowColor = function (color) {
  try {
    this._acolor = (0,ol_color/* asString */.XC)(color);
  } catch (e) {
    this._acolor = null;
  }
};
/** Get the current color at step
 * @param {ol.feature} feature
 * @param {number} step current drawing step beetween [0,1] 
 * @return {string} 
 */


ol_style_FlowLine.prototype.getColor = function (feature, step) {
  if (this._colorFn) return (0,ol_color/* asString */.XC)(this._colorFn(feature, step));
  var color = this._color;
  var color2 = this._color2 || this._color;
  return 'rgba(' + +Math.round(color[0] + (color2[0] - color[0]) * step) + ',' + Math.round(color[1] + (color2[1] - color[1]) * step) + ',' + Math.round(color[2] + (color2[2] - color[2]) * step) + ',' + (color[3] + (color2[3] - color[3]) * step) + ')';
};
/** Get arrow
 */


ol_style_FlowLine.prototype.getArrow = function () {
  return this._arrow;
};
/** Set arrow
 * @param {number} n -1 | 0 | 1 | 2, default: 0
 */


ol_style_FlowLine.prototype.setArrow = function (n) {
  this._arrow = parseInt(n);
  if (this._arrow < -1 || this._arrow > 2) this._arrow = 0;
};
/** getArrowSize
 * @return {ol.size}
 */


ol_style_FlowLine.prototype.getArrowSize = function () {
  return this._arrowSize || [16, 16];
};
/** setArrowSize
 * @param {number|ol.size} size
 */


ol_style_FlowLine.prototype.setArrowSize = function (size) {
  if (Array.isArray(size)) this._arrowSize = size;else if (typeof size === 'number') this._arrowSize = [size, size];
};
/** drawArrow
 * @param {CanvasRenderingContext2D} ctx 
 * @param {ol.coordinate} p0 
 * @param ol.coordinate} p1 
 * @param {number} width 
 * @param {number} ratio pixelratio
 * @private
 */


ol_style_FlowLine.prototype.drawArrow = function (ctx, p0, p1, width, ratio) {
  var asize = this.getArrowSize()[0] * ratio;
  var l = ol_coordinate_dist2d(p0, p1);
  var dx = (p0[0] - p1[0]) / l;
  var dy = (p0[1] - p1[1]) / l;
  width = Math.max(this.getArrowSize()[1] / 2, width / 2) * ratio;
  ctx.beginPath();
  ctx.moveTo(p0[0], p0[1]);
  ctx.lineTo(p0[0] - asize * dx + width * dy, p0[1] - asize * dy - width * dx);
  ctx.lineTo(p0[0] - asize * dx - width * dy, p0[1] - asize * dy + width * dx);
  ctx.lineTo(p0[0], p0[1]);
  ctx.fill();
};
/** Renderer function
 * @param {Array<ol.coordinate>} geom The pixel coordinates of the geometry in GeoJSON notation
 * @param {ol.render.State} e The olx.render.State of the layer renderer
 */


ol_style_FlowLine.prototype._render = function (geom, e) {
  if (e.geometry.getType() === 'LineString') {
    var i,
        g,
        p,
        ctx = e.context; // Get geometry used at drawing

    if (!this._visible) {
      var a = e.pixelRatio / e.resolution;
      var cos = Math.cos(e.rotation);
      var sin = Math.sin(e.rotation);
      g = e.geometry.getCoordinates();
      var dx = geom[0][0] - g[0][0] * a * cos - g[0][1] * a * sin;
      var dy = geom[0][1] - g[0][0] * a * sin + g[0][1] * a * cos;
      geom = [];

      for (i = 0; p = g[i]; i++) {
        geom[i] = [dx + p[0] * a * cos + p[1] * a * sin, dy + p[0] * a * sin - p[1] * a * cos, p[2]];
      }
    }

    var asize = this.getArrowSize()[0] * e.pixelRatio;
    ctx.save(); // Offsets

    if (this.getOffset(0)) this._splitAsize(geom, this.getOffset(0) * e.pixelRatio);
    if (this.getOffset(1)) this._splitAsize(geom, this.getOffset(1) * e.pixelRatio, true); // Arrow 1

    if (geom.length > 1 && (this.getArrow() === -1 || this.getArrow() === 2)) {
      p = this._splitAsize(geom, asize);
      if (this._acolor) ctx.fillStyle = this._acolor;else ctx.fillStyle = this.getColor(e.feature, 0);
      this.drawArrow(ctx, p[0], p[1], this.getWidth(e.feature, 0), e.pixelRatio);
    } // Arrow 2 


    if (geom.length > 1 && this.getArrow() > 0) {
      p = this._splitAsize(geom, asize, true);
      if (this._acolor) ctx.fillStyle = this._acolor;else ctx.fillStyle = this.getColor(e.feature, 1);
      this.drawArrow(ctx, p[0], p[1], this.getWidth(e.feature, 1), e.pixelRatio);
    } // Split into


    var geoms = this._splitInto(geom, 255, 2);

    var k = 0;
    var nb = geoms.length; // Draw

    ctx.lineJoin = 'round';
    ctx.lineCap = this._lineCap || 'butt';

    if (geoms.length > 1) {
      for (k = 0; k < geoms.length; k++) {
        var step = k / nb;
        g = geoms[k];
        ctx.lineWidth = this.getWidth(e.feature, step) * e.pixelRatio;
        ctx.strokeStyle = this.getColor(e.feature, step);
        ctx.beginPath();
        ctx.moveTo(g[0][0], g[0][1]);

        for (i = 1; p = g[i]; i++) {
          ctx.lineTo(p[0], p[1]);
        }

        ctx.stroke();
      }
    }

    ctx.restore();
  }
};
/** Split extremity at
 * @param {ol.geom.LineString} geom
 * @param {number} asize
 * @param {boolean} end start=false or end=true, default false (start)
 */


ol_style_FlowLine.prototype._splitAsize = function (geom, asize, end) {
  var p, p1, p0;
  var dl,
      d = 0;
  if (end) p0 = geom.pop();else p0 = geom.shift();
  p = p0;

  while (geom.length) {
    if (end) p1 = geom.pop();else p1 = geom.shift();
    dl = ol_coordinate_dist2d(p, p1);

    if (d + dl > asize) {
      p = [p[0] + (p1[0] - p[0]) * (asize - d) / dl, p[1] + (p1[1] - p[1]) * (asize - d) / dl];
      dl = ol_coordinate_dist2d(p, p0);

      if (end) {
        geom.push(p1);
        geom.push(p);
        geom.push([p[0] + (p0[0] - p[0]) / dl, p[1] + (p0[1] - p[1]) / dl]);
      } else {
        geom.unshift(p1);
        geom.unshift(p);
        geom.unshift([p[0] + (p0[0] - p[0]) / dl, p[1] + (p0[1] - p[1]) / dl]);
      }

      break;
    }

    d += dl;
    p = p1;
  }

  return [p0, p];
};
/** Split line geometry into equal length geometries
 * @param {Array<ol.coordinate>} geom
 * @param {number} nb number of resulting geometries, default 255
 * @param {number} nim minimum length of the resulting geometries, default 1
 */


ol_style_FlowLine.prototype._splitInto = function (geom, nb, min) {
  var i, p; // Split geom into equal length geoms

  var geoms = [];
  var dl,
      l = 0;

  for (i = 1; p = geom[i]; i++) {
    l += ol_coordinate_dist2d(geom[i - 1], p);
  }

  var length = Math.max(min || 2, l / (nb || 255));
  var p0 = geom[0];
  l = 0;
  var g = [p0];
  i = 1;
  p = geom[1];

  while (i < geom.length) {
    var dx = p[0] - p0[0];
    var dy = p[1] - p0[1];
    dl = Math.sqrt(dx * dx + dy * dy);

    if (l + dl > length) {
      var d = (length - l) / dl;
      g.push([p0[0] + dx * d, p0[1] + dy * d]);
      geoms.push(g);
      p0 = [p0[0] + dx * d * .9, p0[1] + dy * d * .9];
      g = [p0];
      l = 0;
    } else {
      l += dl;
      p0 = p;
      g.push(p0);
      i++;
      p = geom[i];
    }
  }

  geoms.push(g);
  return geoms;
};

/* harmony default export */ const FlowLine = (ol_style_FlowLine);

/***/ }),

/***/ 7395:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ol_ext_inherits */
/** @namespace  ol.ext
 */

/*global ol*/
if (window.ol && !ol.ext) {
  ol.ext = {};
}
/** Inherit the prototype methods from one constructor into another.
 * replace deprecated ol method
 *
 * @param {!Function} childCtor Child constructor.
 * @param {!Function} parentCtor Parent constructor.
 * @function module:ol.inherits
 * @api
 */


var ol_ext_inherits = function (child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}; // Compatibilty with ol > 5 to be removed when v6 is out


if (window.ol) {
  if (!ol.inherits) ol.inherits = ol_ext_inherits;
}
/* IE Polyfill */
// NodeList.forEach


if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
} // Element.remove


if (window.Element && !Element.prototype.remove) {
  Element.prototype.remove = function () {
    if (this.parentNode) this.parentNode.removeChild(this);
  };
}
/* End Polyfill */



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ol_ext_inherits);

/***/ }),

/***/ 4539:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ZP": () => (/* binding */ stylefunction)
});

// UNUSED EXPORTS: _colorWithOpacity, _evaluateFilter, _filterCache, _fromTemplate, _functionCache, _getValue, getValue, recordStyleLayer

// EXTERNAL MODULE: ./node_modules/ol/style/Style.js
var Style = __webpack_require__(6054);
// EXTERNAL MODULE: ./node_modules/ol/style/Fill.js
var Fill = __webpack_require__(6212);
// EXTERNAL MODULE: ./node_modules/ol/style/Stroke.js
var Stroke = __webpack_require__(9403);
// EXTERNAL MODULE: ./node_modules/ol/style/Icon.js + 2 modules
var Icon = __webpack_require__(9676);
// EXTERNAL MODULE: ./node_modules/ol/style/Text.js
var Text = __webpack_require__(4333);
// EXTERNAL MODULE: ./node_modules/ol/style/Circle.js
var Circle = __webpack_require__(3917);
// EXTERNAL MODULE: ./node_modules/ol/render/Feature.js
var Feature = __webpack_require__(1971);
// EXTERNAL MODULE: ./node_modules/@mapbox/mapbox-gl-style-spec/dist/index.es.js
var index_es = __webpack_require__(4617);
// EXTERNAL MODULE: ./node_modules/mapbox-to-css-font/index.js
var mapbox_to_css_font = __webpack_require__(7356);
var mapbox_to_css_font_default = /*#__PURE__*/__webpack_require__.n(mapbox_to_css_font);
// EXTERNAL MODULE: ./node_modules/ol/events.js
var events = __webpack_require__(5750);
// EXTERNAL MODULE: ./node_modules/ol/events/EventType.js
var EventType = __webpack_require__(2140);
// EXTERNAL MODULE: ./node_modules/ol/render/canvas.js
var canvas = __webpack_require__(1184);
;// CONCATENATED MODULE: ./node_modules/ol-mapbox-style/dist/util.js



/**
 * Polyfill for Object.assign().  Assigns enumerable and own properties from
 * one or more source objects to a target object.
 * See https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign.
 *
 * @param {!Object} target The target object.
 * @param {...Object} var_sources The source object(s).
 * @return {!Object} The modified target object.
 */

var util_assign = typeof Object.assign === 'function' ? Object.assign : function (target, var_sources) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);

  for (var i = 1, ii = arguments.length; i < ii; ++i) {
    var source = arguments[i];

    if (source !== undefined && source !== null) {
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          output[key] = source[key];
        }
      }
    }
  }

  return output;
};
function deg2rad(degrees) {
  return degrees * Math.PI / 180;
}
var defaultResolutions = function () {
  var resolutions = [];

  for (var res = 78271.51696402048; resolutions.length <= 24; res /= 2) {
    resolutions.push(res);
  }

  return resolutions;
}();
/**
 * @param {number} width Width of the canvas.
 * @param {number} height Height of the canvas.
 * @return {HTMLCanvasElement} Canvas.
 */

function createCanvas(width, height) {
  if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && typeof OffscreenCanvas !== 'undefined') {
    // eslint-disable-line
    return (
      /** @type {?} */
      new OffscreenCanvas(width, height)
    );
  } else {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }
}
function getZoomForResolution(resolution, resolutions) {
  var i = 0;
  var ii = resolutions.length;

  for (; i < ii; ++i) {
    var candidate = resolutions[i];

    if (candidate < resolution && i + 1 < ii) {
      var zoomFactor = resolutions[i] / resolutions[i + 1];
      return i + Math.log(resolutions[i] / resolution) / Math.log(zoomFactor);
    }
  }

  return ii - 1;
}
var hairSpacePool = Array(256).join('\u200A');
function applyLetterSpacing(text, letterSpacing) {
  if (letterSpacing >= 0.05) {
    var textWithLetterSpacing = '';
    var lines = text.split('\n');
    var joinSpaceString = hairSpacePool.slice(0, Math.round(letterSpacing / 0.1));

    for (var l = 0, ll = lines.length; l < ll; ++l) {
      if (l > 0) {
        textWithLetterSpacing += '\n';
      }

      textWithLetterSpacing += lines[l].split('').join(joinSpaceString);
    }

    return textWithLetterSpacing;
  }

  return text;
}
var measureContext;

function getMeasureContext() {
  if (!measureContext) {
    measureContext = createCanvas(1, 1).getContext('2d');
  }

  return measureContext;
}

function measureText(text, letterSpacing) {
  return getMeasureContext().measureText(text).width + (text.length - 1) * letterSpacing;
}

var measureCache = {};

if (canvas/* labelCache */.GK) {
  // Only available when using ES modules
  (0,events/* listen */.oL)(canvas/* labelCache */.GK, EventType/* default.CLEAR */.Z.CLEAR, function () {
    measureCache = {};
  });
}

function wrapText(text, font, em, letterSpacing) {
  if (text.indexOf('\n') !== -1) {
    var hardLines = text.split('\n');
    var lines = [];

    for (var i = 0, ii = hardLines.length; i < ii; ++i) {
      lines.push(wrapText(hardLines[i], font, em, letterSpacing));
    }

    return lines.join('\n');
  }

  var key = em + ',' + font + ',' + text + ',' + letterSpacing;
  var wrappedText = measureCache[key];

  if (!wrappedText) {
    var words = text.split(' ');

    if (words.length > 1) {
      var ctx = getMeasureContext();
      ctx.font = font;
      var oneEm = ctx.measureText('M').width;
      var maxWidth = oneEm * em;
      var line = '';
      var lines = []; // Pass 1 - wrap lines to not exceed maxWidth

      for (var i = 0, ii = words.length; i < ii; ++i) {
        var word = words[i];
        var testLine = line + (line ? ' ' : '') + word;

        if (measureText(testLine, letterSpacing) <= maxWidth) {
          line = testLine;
        } else {
          if (line) {
            lines.push(line);
          }

          line = word;
        }
      }

      if (line) {
        lines.push(line);
      } // Pass 2 - add lines with a width of less than 30% of maxWidth to the previous or next line


      for (var i = 0, ii = lines.length; i < ii && ii > 1; ++i) {
        var line_1 = lines[i];

        if (measureText(line_1, letterSpacing) < maxWidth * 0.35) {
          var prevWidth = i > 0 ? measureText(lines[i - 1], letterSpacing) : Infinity;
          var nextWidth = i < ii - 1 ? measureText(lines[i + 1], letterSpacing) : Infinity;
          lines.splice(i, 1);
          ii -= 1;

          if (prevWidth < nextWidth) {
            lines[i - 1] += ' ' + line_1;
            i -= 1;
          } else {
            lines[i] = line_1 + ' ' + lines[i];
          }
        }
      } // Pass 3 - try to fill 80% of maxWidth for each line


      for (var i = 0, ii = lines.length - 1; i < ii; ++i) {
        var line_2 = lines[i];
        var next = lines[i + 1];

        if (measureText(line_2, letterSpacing) > maxWidth * 0.7 && measureText(next, letterSpacing) < maxWidth * 0.6) {
          var lineWords = line_2.split(' ');
          var lastWord = lineWords.pop();

          if (measureText(lastWord, letterSpacing) < maxWidth * 0.2) {
            lines[i] = lineWords.join(' ');
            lines[i + 1] = lastWord + ' ' + next;
          }

          ii -= 1;
        }
      }

      wrappedText = lines.join('\n');
    } else {
      wrappedText = text;
    }

    wrappedText = applyLetterSpacing(wrappedText, letterSpacing);
    measureCache[key] = wrappedText;
  }

  return wrappedText;
}
;// CONCATENATED MODULE: ./node_modules/ol-mapbox-style/dist/stylefunction.js
/*
ol-mapbox-style - Use Mapbox Style objects with OpenLayers
Copyright 2016-present ol-mapbox-style contributors
License: https://raw.githubusercontent.com/openlayers/ol-mapbox-style/master/LICENSE
*/











/**
 * @typedef {import("ol/layer/Vector").default} VectorLayer
 * @typedef {import("ol/layer/VectorTile").default} VectorTileLayer
 * @typedef {import("ol/style/Style").StyleFunction} StyleFunction
 */

var isFunction = index_es/* function.isFunction */.ZI.isFunction;
var convertFunction = index_es/* function.convertFunction */.ZI.convertFunction;
var isExpression = index_es/* expression.isExpression */.th.isExpression;
var createPropertyExpression = index_es/* expression.createPropertyExpression */.th.createPropertyExpression;
var types = {
  'Point': 1,
  'MultiPoint': 1,
  'LineString': 2,
  'MultiLineString': 2,
  'Polygon': 3,
  'MultiPolygon': 3
};
var stylefunction_anchor = {
  'center': [0.5, 0.5],
  'left': [0, 0.5],
  'right': [1, 0.5],
  'top': [0.5, 0],
  'bottom': [0.5, 1],
  'top-left': [0, 0],
  'top-right': [1, 0],
  'bottom-left': [0, 1],
  'bottom-right': [1, 1]
};

var expressionData = function (rawExpression, propertySpec) {
  var compiledExpression = createPropertyExpression(rawExpression, propertySpec);

  if (compiledExpression.result === 'error') {
    throw new Error(compiledExpression.value.map(function (err) {
      return err.key + ": " + err.message;
    }).join(', '));
  }

  return compiledExpression.value;
};

var emptyObj = {};
var zoomObj = {
  zoom: 0
};
/** @private */

var functionCache = {};
var renderFeatureCoordinates, renderFeature;
/**
 * @private
 * @param {Object} layer Gl object layer.
 * @param {string} layoutOrPaint 'layout' or 'paint'.
 * @param {string} property Feature property.
 * @param {number} zoom Zoom.
 * @param {Object} feature Gl feature.
 * @return {?} Value.
 */

function getValue(layer, layoutOrPaint, property, zoom, feature) {
  var layerId = layer.id;

  if (!functionCache[layerId]) {
    functionCache[layerId] = {};
  }

  var functions = functionCache[layerId];

  if (!functions[property]) {
    var value_1 = (layer[layoutOrPaint] || emptyObj)[property];
    var propertySpec = index_es/* latest */.pA[layoutOrPaint + "_" + layer.type][property];

    if (value_1 === undefined) {
      value_1 = propertySpec.default;
    }

    var isExpr = isExpression(value_1);

    if (!isExpr && isFunction(value_1)) {
      value_1 = convertFunction(value_1, propertySpec);
      isExpr = true;
    }

    if (isExpr) {
      var compiledExpression = expressionData(value_1, propertySpec);
      functions[property] = compiledExpression.evaluate.bind(compiledExpression);
    } else {
      if (propertySpec.type == 'color') {
        value_1 = index_es/* Color.parse */.Il.parse(value_1);
      }

      functions[property] = function () {
        return value_1;
      };
    }
  }

  zoomObj.zoom = zoom;
  return functions[property](zoomObj, feature);
}
/** @private */

var filterCache = {};
/**
 * @private
 * @param {string} layerId Layer id.
 * @param {?} filter Filter.
 * @param {Object} feature Feature.
 * @param {number} zoom Zoom.
 * @return {boolean} Filter result.
 */

function evaluateFilter(layerId, filter, feature, zoom) {
  if (!(layerId in filterCache)) {
    filterCache[layerId] = (0,index_es/* featureFilter */.TE)(filter).filter;
  }

  zoomObj.zoom = zoom;
  return filterCache[layerId](zoomObj, feature);
}
/**
 * @private
 * @param {?} color Color.
 * @param {number} opacity Opacity.
 * @return {string} Color.
 */


function colorWithOpacity(color, opacity) {
  if (color) {
    if (color.a === 0 || opacity === 0) {
      return undefined;
    }

    var a = color.a;
    opacity = opacity === undefined ? 1 : opacity;
    return 'rgba(' + Math.round(color.r * 255 / a) + ',' + Math.round(color.g * 255 / a) + ',' + Math.round(color.b * 255 / a) + ',' + a * opacity + ')';
  }

  return color;
}

var templateRegEx = /^([^]*)\{(.*)\}([^]*)$/;
/**
 * @private
 * @param {string} text Text.
 * @param {Object} properties Properties.
 * @return {string} Text.
 */

function fromTemplate(text, properties) {
  var parts;

  do {
    parts = text.match(templateRegEx);

    if (parts) {
      var value = properties[parts[2]] || '';
      text = parts[1] + value + parts[3];
    }
  } while (parts);

  return text;
}

var recordLayer = false;
/**
 * ```js
 * import {recordStyleLayer} from 'ol-mapbox-style/dist/stylefunction';
 * ```
 * Turns recording of the Mapbox Style's `layer` on and off. When turned on,
 * the layer that a rendered feature belongs to will be set as the feature's
 * `mapbox-layer` property.
 * @param {boolean} [record=false] Recording of the style layer is on.
 */

function recordStyleLayer(record) {
  recordLayer = record;
}
/**
 * ```js
 * import stylefunction from 'ol-mapbox-style/dist/stylefunction';
 * ```
 * Creates a style function from the `glStyle` object for all layers that use
 * the specified `source`, which needs to be a `"type": "vector"` or
 * `"type": "geojson"` source and applies it to the specified OpenLayers layer.
 *
 * Two additional properties will be set on the provided layer:
 *
 *  * `mapbox-source`: The `id` of the Mapbox Style document's source that the
 *    OpenLayers layer was created from. Usually `apply()` creates one
 *    OpenLayers layer per Mapbox Style source, unless the layer stack has
 *    layers from different sources in between.
 *  * `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
 *    included in the OpenLayers layer.
 *
 * This function also works in a web worker. In worker mode, the main thread needs
 * to listen to messages from the worker and respond with another message to make
 * sure that sprite image loading works:
 *
 * ```js
 *  worker.addEventListener('message', event => {
 *   if (event.data.action === 'loadImage') {
 *     const image = new Image();
 *     image.crossOrigin = 'anonymous';
 *     image.addEventListener('load', function() {
 *       createImageBitmap(image, 0, 0, image.width, image.height).then(imageBitmap => {
 *         worker.postMessage({
 *           action: 'imageLoaded',
 *           image: imageBitmap,
 *           src: event.data.src
 *         }, [imageBitmap]);
 *       });
 *     });
 *     image.src = event.data.src;
 *   }
 * });
 * ```
 *
 * @param {VectorLayer|VectorTileLayer} olLayer OpenLayers layer to
 * apply the style to. In addition to the style, the layer will get two
 * properties: `mapbox-source` will be the `id` of the `glStyle`'s source used
 * for the layer, and `mapbox-layers` will be an array of the `id`s of the
 * `glStyle`'s layers.
 * @param {string|Object} glStyle Mapbox Style object.
 * @param {string|Array<string>} source `source` key or an array of layer `id`s
 * from the Mapbox Style object. When a `source` key is provided, all layers for
 * the specified source will be included in the style function. When layer `id`s
 * are provided, they must be from layers that use the same source.
 * @param {Array<number>} [resolutions=[78271.51696402048, 39135.75848201024,
   19567.87924100512, 9783.93962050256, 4891.96981025128, 2445.98490512564,
   1222.99245256282, 611.49622628141, 305.748113140705, 152.8740565703525,
   76.43702828517625, 38.21851414258813, 19.109257071294063, 9.554628535647032,
   4.777314267823516, 2.388657133911758, 1.194328566955879, 0.5971642834779395,
   0.29858214173896974, 0.14929107086948487, 0.07464553543474244]]
 * Resolutions for mapping resolution to zoom level.
 * @param {Object} [spriteData=undefined] Sprite data from the url specified in
 * the Mapbox Style object's `sprite` property. Only required if a `sprite`
 * property is specified in the Mapbox Style object.
 * @param {Object} [spriteImageUrl=undefined] Sprite image url for the sprite
 * specified in the Mapbox Style object's `sprite` property. Only required if a
 * `sprite` property is specified in the Mapbox Style object.
 * @param {function(Array<string>):Array<string>} [getFonts=undefined] Function that
 * receives a font stack as arguments, and returns a (modified) font stack that
 * is available. Font names are the names used in the Mapbox Style object. If
 * not provided, the font stack will be used as-is. This function can also be
 * used for loading web fonts.
 * @return {StyleFunction} Style function for use in
 * `ol.layer.Vector` or `ol.layer.VectorTile`.
 */

/* harmony default export */ function stylefunction(olLayer, glStyle, source, resolutions, spriteData, spriteImageUrl, getFonts) {
  if (resolutions === void 0) {
    resolutions = defaultResolutions;
  }

  if (typeof glStyle == 'string') {
    glStyle = JSON.parse(glStyle);
  }

  if (glStyle.version != 8) {
    throw new Error('glStyle version 8 required.');
  }

  var spriteImage, spriteImgSize;

  if (spriteImageUrl) {
    if (typeof Image !== 'undefined') {
      var img_1 = new Image();
      img_1.crossOrigin = 'anonymous';

      img_1.onload = function () {
        spriteImage = img_1;
        spriteImgSize = [img_1.width, img_1.height];
        olLayer.changed();
        img_1.onload = null;
      };

      img_1.src = spriteImageUrl;
    } else if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
      //eslint-disable-line
      var worker =
      /** @type {*} */
      self; // Main thread needs to handle 'loadImage' and dispatch 'imageLoaded'

      worker.postMessage({
        action: 'loadImage',
        src: spriteImageUrl
      });
      worker.addEventListener('message', function handler(event) {
        if (event.data.action === 'imageLoaded' && event.data.src === spriteImageUrl) {
          spriteImage = event.data.image;
          spriteImgSize = [spriteImage.width, spriteImage.height];
        }
      });
    }
  }

  var allLayers = (0,index_es/* derefLayers */.eG)(glStyle.layers);
  var layersBySourceLayer = {};
  var mapboxLayers = [];
  var mapboxSource;

  for (var i = 0, ii = allLayers.length; i < ii; ++i) {
    var layer = allLayers[i];
    var layerId = layer.id;

    if (typeof source == 'string' && layer.source == source || source.indexOf(layerId) !== -1) {
      var sourceLayer = layer['source-layer'];

      if (!mapboxSource) {
        mapboxSource = layer.source;
        var source_1 = glStyle.sources[mapboxSource];

        if (!source_1) {
          throw new Error("Source \"" + mapboxSource + "\" is not defined");
        }

        var type = source_1.type;

        if (type !== 'vector' && type !== 'geojson') {
          throw new Error("Source \"" + mapboxSource + "\" is not of type \"vector\" or \"geojson\", but \"" + type + "\"");
        }
      }

      var layers = layersBySourceLayer[sourceLayer];

      if (!layers) {
        layers = layersBySourceLayer[sourceLayer] = [];
      }

      layers.push({
        layer: layer,
        index: i
      });
      mapboxLayers.push(layerId);
    } // TODO revisit when diffing gets added


    delete functionCache[layerId];
    delete filterCache[layerId];
  }

  var textHalo = new Stroke/* default */.Z();
  var textColor = new Fill/* default */.Z();
  var iconImageCache = {};
  var patternCache = {};
  var styles = [];

  var styleFunction = function (feature, resolution) {
    var properties = feature.getProperties();
    var layers = layersBySourceLayer[properties.layer];

    if (!layers) {
      return;
    }

    var zoom = resolutions.indexOf(resolution);

    if (zoom == -1) {
      zoom = getZoomForResolution(resolution, resolutions);
    }

    var type = types[feature.getGeometry().getType()];
    var f = {
      properties: properties,
      type: type
    };
    var stylesLength = -1;
    var featureBelongsToLayer;

    var _loop_1 = function (i, ii) {
      var layerData = layers[i];
      var layer = layerData.layer;
      var layerId = layer.id;
      var layout = layer.layout || emptyObj;
      var paint = layer.paint || emptyObj;

      if (layout.visibility === 'none' || 'minzoom' in layer && zoom < layer.minzoom || 'maxzoom' in layer && zoom >= layer.maxzoom) {
        return "continue";
      }

      var filter = layer.filter;

      if (!filter || evaluateFilter(layerId, filter, f, zoom)) {
        featureBelongsToLayer = layer;
        var color = void 0,
            opacity = void 0,
            fill = void 0,
            stroke = void 0,
            strokeColor = void 0,
            style = void 0;
        var index = layerData.index;

        if (type == 3 && (layer.type == 'fill' || layer.type == 'fill-extrusion')) {
          opacity = getValue(layer, 'paint', layer.type + '-opacity', zoom, f);

          if (layer.type + '-pattern' in paint) {
            var fillIcon = getValue(layer, 'paint', layer.type + '-pattern', zoom, f);

            if (fillIcon) {
              var icon_1 = typeof fillIcon === 'string' ? fromTemplate(fillIcon, properties) : fillIcon.toString();

              if (spriteImage && spriteData && spriteData[icon_1]) {
                ++stylesLength;
                style = styles[stylesLength];

                if (!style || !style.getFill() || style.getStroke() || style.getText()) {
                  style = styles[stylesLength] = new Style/* default */.ZP({
                    fill: new Fill/* default */.Z()
                  });
                }

                fill = style.getFill();
                style.setZIndex(index);
                var icon_cache_key = icon_1 + '.' + opacity;
                var pattern = patternCache[icon_cache_key];

                if (!pattern) {
                  var spriteImageData = spriteData[icon_1];
                  var canvas = createCanvas(spriteImageData.width, spriteImageData.height);
                  var ctx =
                  /** @type {CanvasRenderingContext2D} */
                  canvas.getContext('2d');
                  ctx.globalAlpha = opacity;
                  ctx.drawImage(spriteImage, spriteImageData.x, spriteImageData.y, spriteImageData.width, spriteImageData.height, 0, 0, spriteImageData.width, spriteImageData.height);
                  pattern = ctx.createPattern(canvas, 'repeat');
                  patternCache[icon_cache_key] = pattern;
                }

                fill.setColor(pattern);
              }
            }
          } else {
            color = colorWithOpacity(getValue(layer, 'paint', layer.type + '-color', zoom, f), opacity);

            if (color) {
              if (layer.type + '-outline-color' in paint) {
                strokeColor = colorWithOpacity(getValue(layer, 'paint', layer.type + '-outline-color', zoom, f), opacity);
              }

              if (!strokeColor) {
                strokeColor = color;
              }

              ++stylesLength;
              style = styles[stylesLength];

              if (!style || !(style.getFill() && style.getStroke()) || style.getText()) {
                style = styles[stylesLength] = new Style/* default */.ZP({
                  fill: new Fill/* default */.Z(),
                  stroke: new Stroke/* default */.Z()
                });
              }

              fill = style.getFill();
              fill.setColor(color);
              stroke = style.getStroke();
              stroke.setColor(strokeColor);
              stroke.setWidth(1);
              style.setZIndex(index);
            }
          }
        }

        if (type != 1 && layer.type == 'line') {
          color = !('line-pattern' in paint) && 'line-color' in paint ? colorWithOpacity(getValue(layer, 'paint', 'line-color', zoom, f), getValue(layer, 'paint', 'line-opacity', zoom, f)) : undefined;
          var width_1 = getValue(layer, 'paint', 'line-width', zoom, f);

          if (color && width_1 > 0) {
            ++stylesLength;
            style = styles[stylesLength];

            if (!style || !style.getStroke() || style.getFill() || style.getText()) {
              style = styles[stylesLength] = new Style/* default */.ZP({
                stroke: new Stroke/* default */.Z()
              });
            }

            stroke = style.getStroke();
            stroke.setLineCap(getValue(layer, 'layout', 'line-cap', zoom, f));
            stroke.setLineJoin(getValue(layer, 'layout', 'line-join', zoom, f));
            stroke.setMiterLimit(getValue(layer, 'layout', 'line-miter-limit', zoom, f));
            stroke.setColor(color);
            stroke.setWidth(width_1);
            stroke.setLineDash(paint['line-dasharray'] ? getValue(layer, 'paint', 'line-dasharray', zoom, f).map(function (x) {
              return x * width_1;
            }) : null);
            style.setZIndex(index);
          }
        }

        var hasImage = false;
        var text = null;
        var placementAngle = 0;
        var icon = void 0,
            iconImg = void 0,
            skipLabel = void 0;

        if ((type == 1 || type == 2) && 'icon-image' in layout) {
          var iconImage = getValue(layer, 'layout', 'icon-image', zoom, f);

          if (iconImage) {
            icon = typeof iconImage === 'string' ? fromTemplate(iconImage, properties) : iconImage.toString();
            var styleGeom = undefined;

            if (spriteImage && spriteData && spriteData[icon]) {
              var iconRotationAlignment = getValue(layer, 'layout', 'icon-rotation-alignment', zoom, f);

              if (type == 2) {
                var geom = feature.getGeometry(); // ol package and ol-debug.js only

                if (geom.getFlatMidpoint || geom.getFlatMidpoints) {
                  var extent = geom.getExtent();
                  var size = Math.sqrt(Math.max(Math.pow((extent[2] - extent[0]) / resolution, 2), Math.pow((extent[3] - extent[1]) / resolution, 2)));

                  if (size > 150) {
                    //FIXME Do not hard-code a size of 150
                    var midpoint = geom.getType() === 'MultiLineString' ? geom.getFlatMidpoints() : geom.getFlatMidpoint();

                    if (!renderFeature) {
                      renderFeatureCoordinates = [NaN, NaN];
                      renderFeature = new Feature/* default */.Z('Point', renderFeatureCoordinates, [], {}, null);
                    }

                    styleGeom = renderFeature;
                    renderFeatureCoordinates[0] = midpoint[0];
                    renderFeatureCoordinates[1] = midpoint[1];
                    var placement = getValue(layer, 'layout', 'symbol-placement', zoom, f);

                    if (placement === 'line' && iconRotationAlignment === 'map') {
                      var stride = geom.getStride();
                      var coordinates = geom.getFlatCoordinates();

                      for (var i_1 = 0, ii_1 = coordinates.length - stride; i_1 < ii_1; i_1 += stride) {
                        var x1 = coordinates[i_1];
                        var y1 = coordinates[i_1 + 1];
                        var x2 = coordinates[i_1 + stride];
                        var y2 = coordinates[i_1 + stride + 1];
                        var minX = Math.min(x1, x2);
                        var minY = Math.min(y1, y2);
                        var maxX = Math.max(x1, x2);
                        var maxY = Math.max(y1, y2);

                        if (midpoint[0] >= minX && midpoint[0] <= maxX && midpoint[1] >= minY && midpoint[1] <= maxY) {
                          placementAngle = Math.atan2(y1 - y2, x2 - x1);
                          break;
                        }
                      }
                    }
                  }
                }
              }

              if (type !== 2 || styleGeom) {
                var iconSize = getValue(layer, 'layout', 'icon-size', zoom, f);
                var iconColor = paint['icon-color'] !== undefined ? getValue(layer, 'paint', 'icon-color', zoom, f) : null;

                if (!iconColor || iconColor.a !== 0) {
                  var icon_cache_key = icon + '.' + iconSize;

                  if (iconColor !== null) {
                    icon_cache_key += '.' + iconColor;
                  }

                  iconImg = iconImageCache[icon_cache_key];

                  if (!iconImg) {
                    var spriteImageData = spriteData[icon];

                    if (iconColor !== null) {
                      // cut out the sprite and color it
                      var canvas = createCanvas(spriteImageData.width, spriteImageData.height);
                      var ctx =
                      /** @type {CanvasRenderingContext2D} */
                      canvas.getContext('2d');
                      ctx.drawImage(spriteImage, spriteImageData.x, spriteImageData.y, spriteImageData.width, spriteImageData.height, 0, 0, spriteImageData.width, spriteImageData.height);
                      var data = ctx.getImageData(0, 0, canvas.width, canvas.height);

                      for (var c = 0, cc = data.data.length; c < cc; c += 4) {
                        var a = iconColor.a;

                        if (a !== 0) {
                          data.data[c] = iconColor.r * 255 / a;
                          data.data[c + 1] = iconColor.g * 255 / a;
                          data.data[c + 2] = iconColor.b * 255 / a;
                        }

                        data.data[c + 3] = a;
                      }

                      ctx.putImageData(data, 0, 0);
                      iconImg = iconImageCache[icon_cache_key] = new Icon/* default */.Z({
                        img: canvas,
                        imgSize: [canvas.width, canvas.height],
                        scale: iconSize / spriteImageData.pixelRatio
                      });
                    } else {
                      iconImg = iconImageCache[icon_cache_key] = new Icon/* default */.Z({
                        img: spriteImage,
                        imgSize: spriteImgSize,
                        size: [spriteImageData.width, spriteImageData.height],
                        offset: [spriteImageData.x, spriteImageData.y],
                        rotateWithView: iconRotationAlignment === 'map',
                        scale: iconSize / spriteImageData.pixelRatio
                      });
                    }
                  }
                }

                if (iconImg) {
                  ++stylesLength;
                  style = styles[stylesLength];

                  if (!style || !style.getImage() || style.getFill() || style.getStroke()) {
                    style = styles[stylesLength] = new Style/* default */.ZP();
                  }

                  style.setGeometry(styleGeom);
                  iconImg.setRotation(placementAngle + deg2rad(getValue(layer, 'layout', 'icon-rotate', zoom, f)));
                  iconImg.setOpacity(getValue(layer, 'paint', 'icon-opacity', zoom, f));
                  iconImg.setAnchor(stylefunction_anchor[getValue(layer, 'layout', 'icon-anchor', zoom, f)]);
                  style.setImage(iconImg);
                  text = style.getText();
                  style.setText(undefined);
                  style.setZIndex(index);
                  hasImage = true;
                  skipLabel = false;
                }
              } else {
                skipLabel = true;
              }
            }
          }
        }

        if (type == 1 && 'circle-radius' in paint) {
          ++stylesLength;
          style = styles[stylesLength];

          if (!style || !style.getImage() || style.getFill() || style.getStroke()) {
            style = styles[stylesLength] = new Style/* default */.ZP();
          }

          var circleRadius = getValue(layer, 'paint', 'circle-radius', zoom, f);
          var circleStrokeColor = colorWithOpacity(getValue(layer, 'paint', 'circle-stroke-color', zoom, f), getValue(layer, 'paint', 'circle-stroke-opacity', zoom, f));
          var circleColor = colorWithOpacity(getValue(layer, 'paint', 'circle-color', zoom, f), getValue(layer, 'paint', 'circle-opacity', zoom, f));
          var circleStrokeWidth = getValue(layer, 'paint', 'circle-stroke-width', zoom, f);
          var cache_key = circleRadius + '.' + circleStrokeColor + '.' + circleColor + '.' + circleStrokeWidth;
          iconImg = iconImageCache[cache_key];

          if (!iconImg) {
            iconImg = iconImageCache[cache_key] = new Circle/* default */.Z({
              radius: circleRadius,
              stroke: circleStrokeColor && circleStrokeWidth > 0 ? new Stroke/* default */.Z({
                width: circleStrokeWidth,
                color: circleStrokeColor
              }) : undefined,
              fill: circleColor ? new Fill/* default */.Z({
                color: circleColor
              }) : undefined
            });
          }

          style.setImage(iconImg);
          text = style.getText();
          style.setText(undefined);
          style.setGeometry(undefined);
          style.setZIndex(index);
          hasImage = true;
        }

        var label = void 0;

        if ('text-field' in layout) {
          var textField = getValue(layer, 'layout', 'text-field', zoom, f).toString();
          label = fromTemplate(textField, properties).trim();
          opacity = getValue(layer, 'paint', 'text-opacity', zoom, f);
        }

        if (label && opacity && !skipLabel) {
          if (!hasImage) {
            ++stylesLength;
            style = styles[stylesLength];

            if (!style || !style.getText() || style.getFill() || style.getStroke()) {
              style = styles[stylesLength] = new Style/* default */.ZP();
            }

            style.setImage(undefined);
            style.setGeometry(undefined);
          }

          if (!style.getText()) {
            style.setText(text || new Text/* default */.Z({
              padding: [2, 2, 2, 2]
            }));
          }

          text = style.getText();
          var textSize = Math.round(getValue(layer, 'layout', 'text-size', zoom, f));
          var fontArray = getValue(layer, 'layout', 'text-font', zoom, f);
          var textLineHeight = getValue(layer, 'layout', 'text-line-height', zoom, f);
          var font = mapbox_to_css_font_default()(getFonts ? getFonts(fontArray) : fontArray, textSize, textLineHeight);
          var textTransform = layout['text-transform'];

          if (textTransform == 'uppercase') {
            label = label.toUpperCase();
          } else if (textTransform == 'lowercase') {
            label = label.toLowerCase();
          }

          var maxTextWidth = getValue(layer, 'layout', 'text-max-width', zoom, f);
          var letterSpacing = getValue(layer, 'layout', 'text-letter-spacing', zoom, f);
          var wrappedLabel = type == 2 ? applyLetterSpacing(label, letterSpacing) : wrapText(label, font, maxTextWidth, letterSpacing);
          text.setText(wrappedLabel);
          text.setFont(font);
          text.setRotation(deg2rad(getValue(layer, 'layout', 'text-rotate', zoom, f)));
          var textAnchor = getValue(layer, 'layout', 'text-anchor', zoom, f);
          var placement = hasImage || type == 1 ? 'point' : getValue(layer, 'layout', 'symbol-placement', zoom, f);
          text.setPlacement(placement);
          var textHaloWidth = getValue(layer, 'paint', 'text-halo-width', zoom, f);
          var textOffset = getValue(layer, 'layout', 'text-offset', zoom, f);
          var textTranslate = getValue(layer, 'paint', 'text-translate', zoom, f); // Text offset has to take halo width and line height into account

          var vOffset = 0;
          var hOffset = 0;

          if (placement == 'point') {
            var textAlign = 'center';

            if (textAnchor.indexOf('left') !== -1) {
              textAlign = 'left';
              hOffset = textHaloWidth;
            } else if (textAnchor.indexOf('right') !== -1) {
              textAlign = 'right';
              hOffset = -textHaloWidth;
            }

            text.setTextAlign(textAlign);
            var textRotationAlignment = getValue(layer, 'layout', 'text-rotation-alignment', zoom, f);
            text.setRotateWithView(textRotationAlignment == 'map');
          } else {
            text.setMaxAngle(deg2rad(getValue(layer, 'layout', 'text-max-angle', zoom, f)) * label.length / wrappedLabel.length);
            text.setTextAlign();
            text.setRotateWithView(false);
          }

          var textBaseline = 'middle';

          if (textAnchor.indexOf('bottom') == 0) {
            textBaseline = 'bottom';
            vOffset = -textHaloWidth - 0.5 * (textLineHeight - 1) * textSize;
          } else if (textAnchor.indexOf('top') == 0) {
            textBaseline = 'top';
            vOffset = textHaloWidth + 0.5 * (textLineHeight - 1) * textSize;
          }

          text.setTextBaseline(textBaseline);
          text.setOffsetX(textOffset[0] * textSize + hOffset + textTranslate[0]);
          text.setOffsetY(textOffset[1] * textSize + vOffset + textTranslate[1]);
          textColor.setColor(colorWithOpacity(getValue(layer, 'paint', 'text-color', zoom, f), opacity));
          text.setFill(textColor);
          var haloColor = colorWithOpacity(getValue(layer, 'paint', 'text-halo-color', zoom, f), opacity);

          if (haloColor) {
            textHalo.setColor(haloColor); // spec here : https://docs.mapbox.com/mapbox-gl-js/style-spec/#paint-symbol-text-halo-width
            // Halo width must be doubled because it is applied around the center of the text outline

            textHaloWidth *= 2; // 1/4 of text size (spec) x 2

            var halfTextSize = 0.5 * textSize;
            textHalo.setWidth(textHaloWidth <= halfTextSize ? textHaloWidth : halfTextSize);
            text.setStroke(textHalo);
          } else {
            text.setStroke(undefined);
          }

          var textPadding = getValue(layer, 'layout', 'text-padding', zoom, f);
          var padding = text.getPadding();

          if (textPadding !== padding[0]) {
            padding[0] = padding[1] = padding[2] = padding[3] = textPadding;
          }

          style.setZIndex(index);
        }
      }
    };

    for (var i = 0, ii = layers.length; i < ii; ++i) {
      _loop_1(i, ii);
    }

    if (stylesLength > -1) {
      styles.length = stylesLength + 1;

      if (recordLayer) {
        if (typeof feature.set === 'function') {
          // ol/Feature
          feature.set('mapbox-layer', featureBelongsToLayer);
        } else {
          // ol/render/Feature
          feature.getProperties()['mapbox-layer'] = featureBelongsToLayer;
        }
      }

      return styles;
    }
  };

  olLayer.setStyle(styleFunction);
  olLayer.set('mapbox-source', mapboxSource);
  olLayer.set('mapbox-layers', mapboxLayers);
  return styleFunction;
}


/***/ })

}]);