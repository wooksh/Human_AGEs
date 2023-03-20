"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[963],{

/***/ 4956:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BB": () => (/* binding */ toString),
/* harmony export */   "XC": () => (/* binding */ asString),
/* harmony export */   "_2": () => (/* binding */ asArray)
/* harmony export */ });
/* unused harmony exports fromString, normalize, isStringColor */
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4548);
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4495);
/**
 * @module ol/color
 */


/**
 * A color represented as a short array [red, green, blue, alpha].
 * red, green, and blue should be integers in the range 0..255 inclusive.
 * alpha should be a float in the range 0..1 inclusive. If no alpha value is
 * given then `1` will be used.
 * @typedef {Array<number>} Color
 * @api
 */

/**
 * This RegExp matches # followed by 3, 4, 6, or 8 hex digits.
 * @const
 * @type {RegExp}
 * @private
 */

var HEX_COLOR_RE_ = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i;
/**
 * Regular expression for matching potential named color style strings.
 * @const
 * @type {RegExp}
 * @private
 */

var NAMED_COLOR_RE_ = /^([a-z]*)$|^hsla?\(.*\)$/i;
/**
 * Return the color as an rgba string.
 * @param {Color|string} color Color.
 * @return {string} Rgba string.
 * @api
 */

function asString(color) {
  if (typeof color === 'string') {
    return color;
  } else {
    return toString(color);
  }
}
/**
 * Return named color as an rgba string.
 * @param {string} color Named color.
 * @return {string} Rgb string.
 */

function fromNamed(color) {
  var el = document.createElement('div');
  el.style.color = color;

  if (el.style.color !== '') {
    document.body.appendChild(el);
    var rgb = getComputedStyle(el).color;
    document.body.removeChild(el);
    return rgb;
  } else {
    return '';
  }
}
/**
 * @param {string} s String.
 * @return {Color} Color.
 */


var fromString = function () {
  // We maintain a small cache of parsed strings.  To provide cheap LRU-like
  // semantics, whenever the cache grows too large we simply delete an
  // arbitrary 25% of the entries.

  /**
   * @const
   * @type {number}
   */
  var MAX_CACHE_SIZE = 1024;
  /**
   * @type {Object<string, Color>}
   */

  var cache = {};
  /**
   * @type {number}
   */

  var cacheSize = 0;
  return (
    /**
     * @param {string} s String.
     * @return {Color} Color.
     */
    function (s) {
      var color;

      if (cache.hasOwnProperty(s)) {
        color = cache[s];
      } else {
        if (cacheSize >= MAX_CACHE_SIZE) {
          var i = 0;

          for (var key in cache) {
            if ((i++ & 3) === 0) {
              delete cache[key];
              --cacheSize;
            }
          }
        }

        color = fromStringInternal_(s);
        cache[s] = color;
        ++cacheSize;
      }

      return color;
    }
  );
}();
/**
 * Return the color as an array. This function maintains a cache of calculated
 * arrays which means the result should not be modified.
 * @param {Color|string} color Color.
 * @return {Color} Color.
 * @api
 */

function asArray(color) {
  if (Array.isArray(color)) {
    return color;
  } else {
    return fromString(color);
  }
}
/**
 * @param {string} s String.
 * @private
 * @return {Color} Color.
 */

function fromStringInternal_(s) {
  var r, g, b, a, color;

  if (NAMED_COLOR_RE_.exec(s)) {
    s = fromNamed(s);
  }

  if (HEX_COLOR_RE_.exec(s)) {
    // hex
    var n = s.length - 1; // number of hex digits

    var d = // number of digits per channel
    void 0; // number of digits per channel

    if (n <= 4) {
      d = 1;
    } else {
      d = 2;
    }

    var hasAlpha = n === 4 || n === 8;
    r = parseInt(s.substr(1 + 0 * d, d), 16);
    g = parseInt(s.substr(1 + 1 * d, d), 16);
    b = parseInt(s.substr(1 + 2 * d, d), 16);

    if (hasAlpha) {
      a = parseInt(s.substr(1 + 3 * d, d), 16);
    } else {
      a = 255;
    }

    if (d == 1) {
      r = (r << 4) + r;
      g = (g << 4) + g;
      b = (b << 4) + b;

      if (hasAlpha) {
        a = (a << 4) + a;
      }
    }

    color = [r, g, b, a / 255];
  } else if (s.indexOf('rgba(') == 0) {
    // rgba()
    color = s.slice(5, -1).split(',').map(Number);
    normalize(color);
  } else if (s.indexOf('rgb(') == 0) {
    // rgb()
    color = s.slice(4, -1).split(',').map(Number);
    color.push(1);
    normalize(color);
  } else {
    (0,_asserts_js__WEBPACK_IMPORTED_MODULE_0__/* .assert */ .h)(false, 14); // Invalid color
  }

  return color;
}
/**
 * TODO this function is only used in the test, we probably shouldn't export it
 * @param {Color} color Color.
 * @return {Color} Clamped color.
 */


function normalize(color) {
  color[0] = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__/* .clamp */ .uZ)(color[0] + 0.5 | 0, 0, 255);
  color[1] = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__/* .clamp */ .uZ)(color[1] + 0.5 | 0, 0, 255);
  color[2] = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__/* .clamp */ .uZ)(color[2] + 0.5 | 0, 0, 255);
  color[3] = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__/* .clamp */ .uZ)(color[3], 0, 1);
  return color;
}
/**
 * @param {Color} color Color.
 * @return {string} String.
 */

function toString(color) {
  var r = color[0];

  if (r != (r | 0)) {
    r = r + 0.5 | 0;
  }

  var g = color[1];

  if (g != (g | 0)) {
    g = g + 0.5 | 0;
  }

  var b = color[2];

  if (b != (b | 0)) {
    b = b + 0.5 | 0;
  }

  var a = color[3] === undefined ? 1 : color[3];
  return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}
/**
 * @param {string} s String.
 * @return {boolean} Whether the string is actually a valid color
 */

function isStringColor(s) {
  if (NAMED_COLOR_RE_.test(s)) {
    s = fromNamed(s);
  }

  return HEX_COLOR_RE_.test(s) || s.indexOf('rgba(') === 0 || s.indexOf('rgb(') === 0;
}

/***/ }),

/***/ 5739:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ asColorLike)
/* harmony export */ });
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4956);
/**
 * @module ol/colorlike
 */

/**
 * A type accepted by CanvasRenderingContext2D.fillStyle
 * or CanvasRenderingContext2D.strokeStyle.
 * Represents a color, pattern, or gradient. The origin for patterns and
 * gradients as fill style is an increment of 512 css pixels from map coordinate
 * `[0, 0]`. For seamless repeat patterns, width and height of the pattern image
 * must be a factor of two (2, 4, 8, ..., 512).
 *
 * @typedef {string|CanvasPattern|CanvasGradient} ColorLike
 * @api
 */

/**
 * @param {import("./color.js").Color|ColorLike} color Color.
 * @return {ColorLike} The color as an {@link ol/colorlike~ColorLike}.
 * @api
 */

function asColorLike(color) {
  if (Array.isArray(color)) {
    return (0,_color_js__WEBPACK_IMPORTED_MODULE_0__/* .toString */ .BB)(color);
  } else {
    return color;
  }
}

/***/ }),

/***/ 7039:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ce": () => (/* binding */ defaults)
});

// UNUSED EXPORTS: Attribution, Control, FullScreen, MousePosition, OverviewMap, Rotate, ScaleLine, Zoom, ZoomSlider, ZoomToExtent

// EXTERNAL MODULE: ./node_modules/ol/control/Control.js
var Control = __webpack_require__(4224);
// EXTERNAL MODULE: ./node_modules/ol/events/EventType.js
var EventType = __webpack_require__(2140);
// EXTERNAL MODULE: ./node_modules/ol/css.js
var css = __webpack_require__(9285);
// EXTERNAL MODULE: ./node_modules/ol/array.js
var array = __webpack_require__(3620);
// EXTERNAL MODULE: ./node_modules/ol/layer/Layer.js
var Layer = __webpack_require__(8498);
// EXTERNAL MODULE: ./node_modules/ol/dom.js
var dom = __webpack_require__(9631);
;// CONCATENATED MODULE: ./node_modules/ol/control/Attribution.js
var __extends = undefined && undefined.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/control/Attribution
 */








/**
 * @typedef {Object} Options
 * @property {string} [className='ol-attribution'] CSS class name.
 * @property {HTMLElement|string} [target] Specify a target if you
 * want the control to be rendered outside of the map's
 * viewport.
 * @property {boolean} [collapsible] Specify if attributions can
 * be collapsed. If not specified, sources control this behavior with their
 * `attributionsCollapsible` setting.
 * @property {boolean} [collapsed=true] Specify if attributions should
 * be collapsed at startup.
 * @property {string} [tipLabel='Attributions'] Text label to use for the button tip.
 * @property {string|HTMLElement} [label='i'] Text label to use for the
 * collapsed attributions button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [expandClassName=className + '-expand'] CSS class name for the
 * collapsed attributions button.
 * @property {string|HTMLElement} [collapseLabel='›'] Text label to use
 * for the expanded attributions button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [collapseClassName=className + '-collapse'] CSS class name for the
 * expanded attributions button.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when
 * the control should be re-rendered. This is called in a `requestAnimationFrame`
 * callback.
 */

/**
 * @classdesc
 * Control to show all the attributions associated with the layer sources
 * in the map. This control is one of the default controls included in maps.
 * By default it will show in the bottom right portion of the map, but this can
 * be changed by using a css selector for `.ol-attribution`.
 *
 * @api
 */

var Attribution =
/** @class */
function (_super) {
  __extends(Attribution, _super);
  /**
   * @param {Options} [opt_options] Attribution options.
   */


  function Attribution(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    _this = _super.call(this, {
      element: document.createElement('div'),
      render: options.render,
      target: options.target
    }) || this;
    /**
     * @private
     * @type {HTMLElement}
     */

    _this.ulElement_ = document.createElement('ul');
    /**
     * @private
     * @type {boolean}
     */

    _this.collapsed_ = options.collapsed !== undefined ? options.collapsed : true;
    /**
     * @private
     * @type {boolean}
     */

    _this.userCollapsed_ = _this.collapsed_;
    /**
     * @private
     * @type {boolean}
     */

    _this.overrideCollapsible_ = options.collapsible !== undefined;
    /**
     * @private
     * @type {boolean}
     */

    _this.collapsible_ = options.collapsible !== undefined ? options.collapsible : true;

    if (!_this.collapsible_) {
      _this.collapsed_ = false;
    }

    var className = options.className !== undefined ? options.className : 'ol-attribution';
    var tipLabel = options.tipLabel !== undefined ? options.tipLabel : 'Attributions';
    var expandClassName = options.expandClassName !== undefined ? options.expandClassName : className + '-expand';
    var collapseLabel = options.collapseLabel !== undefined ? options.collapseLabel : '\u203A';
    var collapseClassName = options.collapseClassName !== undefined ? options.collapseClassName : className + '-collpase';

    if (typeof collapseLabel === 'string') {
      /**
       * @private
       * @type {HTMLElement}
       */
      _this.collapseLabel_ = document.createElement('span');
      _this.collapseLabel_.textContent = collapseLabel;
      _this.collapseLabel_.className = collapseClassName;
    } else {
      _this.collapseLabel_ = collapseLabel;
    }

    var label = options.label !== undefined ? options.label : 'i';

    if (typeof label === 'string') {
      /**
       * @private
       * @type {HTMLElement}
       */
      _this.label_ = document.createElement('span');
      _this.label_.textContent = label;
      _this.label_.className = expandClassName;
    } else {
      _this.label_ = label;
    }

    var activeLabel = _this.collapsible_ && !_this.collapsed_ ? _this.collapseLabel_ : _this.label_;
    /**
     * @private
     * @type {HTMLElement}
     */

    _this.toggleButton_ = document.createElement('button');

    _this.toggleButton_.setAttribute('type', 'button');

    _this.toggleButton_.setAttribute('aria-expanded', String(!_this.collapsed_));

    _this.toggleButton_.title = tipLabel;

    _this.toggleButton_.appendChild(activeLabel);

    _this.toggleButton_.addEventListener(EventType/* default.CLICK */.Z.CLICK, _this.handleClick_.bind(_this), false);

    var cssClasses = className + ' ' + css/* CLASS_UNSELECTABLE */.XV + ' ' + css/* CLASS_CONTROL */.hg + (_this.collapsed_ && _this.collapsible_ ? ' ' + css/* CLASS_COLLAPSED */.hN : '') + (_this.collapsible_ ? '' : ' ol-uncollapsible');
    var element = _this.element;
    element.className = cssClasses;
    element.appendChild(_this.toggleButton_);
    element.appendChild(_this.ulElement_);
    /**
     * A list of currently rendered resolutions.
     * @type {Array<string>}
     * @private
     */

    _this.renderedAttributions_ = [];
    /**
     * @private
     * @type {boolean}
     */

    _this.renderedVisible_ = true;
    return _this;
  }
  /**
   * Collect a list of visible attributions and set the collapsible state.
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   * @return {Array<string>} Attributions.
   * @private
   */


  Attribution.prototype.collectSourceAttributions_ = function (frameState) {
    /**
     * Used to determine if an attribution already exists.
     * @type {!Object<string, boolean>}
     */
    var lookup = {};
    /**
     * A list of visible attributions.
     * @type {Array<string>}
     */

    var visibleAttributions = [];
    var collapsible = true;
    var layerStatesArray = frameState.layerStatesArray;

    for (var i = 0, ii = layerStatesArray.length; i < ii; ++i) {
      var layerState = layerStatesArray[i];

      if (!(0,Layer/* inView */.j)(layerState, frameState.viewState)) {
        continue;
      }

      var source =
      /** @type {import("../layer/Layer.js").default} */
      layerState.layer.getSource();

      if (!source) {
        continue;
      }

      var attributionGetter = source.getAttributions();

      if (!attributionGetter) {
        continue;
      }

      var attributions = attributionGetter(frameState);

      if (!attributions) {
        continue;
      }

      collapsible = collapsible && source.getAttributionsCollapsible() !== false;

      if (Array.isArray(attributions)) {
        for (var j = 0, jj = attributions.length; j < jj; ++j) {
          if (!(attributions[j] in lookup)) {
            visibleAttributions.push(attributions[j]);
            lookup[attributions[j]] = true;
          }
        }
      } else {
        if (!(attributions in lookup)) {
          visibleAttributions.push(attributions);
          lookup[attributions] = true;
        }
      }
    }

    if (!this.overrideCollapsible_) {
      this.setCollapsible(collapsible);
    }

    return visibleAttributions;
  };
  /**
   * @private
   * @param {?import("../PluggableMap.js").FrameState} frameState Frame state.
   */


  Attribution.prototype.updateElement_ = function (frameState) {
    if (!frameState) {
      if (this.renderedVisible_) {
        this.element.style.display = 'none';
        this.renderedVisible_ = false;
      }

      return;
    }

    var attributions = this.collectSourceAttributions_(frameState);
    var visible = attributions.length > 0;

    if (this.renderedVisible_ != visible) {
      this.element.style.display = visible ? '' : 'none';
      this.renderedVisible_ = visible;
    }

    if ((0,array/* equals */.fS)(attributions, this.renderedAttributions_)) {
      return;
    }

    (0,dom/* removeChildren */.ep)(this.ulElement_); // append the attributions

    for (var i = 0, ii = attributions.length; i < ii; ++i) {
      var element = document.createElement('li');
      element.innerHTML = attributions[i];
      this.ulElement_.appendChild(element);
    }

    this.renderedAttributions_ = attributions;
  };
  /**
   * @param {MouseEvent} event The event to handle
   * @private
   */


  Attribution.prototype.handleClick_ = function (event) {
    event.preventDefault();
    this.handleToggle_();
    this.userCollapsed_ = this.collapsed_;
  };
  /**
   * @private
   */


  Attribution.prototype.handleToggle_ = function () {
    this.element.classList.toggle(css/* CLASS_COLLAPSED */.hN);

    if (this.collapsed_) {
      (0,dom/* replaceNode */.$H)(this.collapseLabel_, this.label_);
    } else {
      (0,dom/* replaceNode */.$H)(this.label_, this.collapseLabel_);
    }

    this.collapsed_ = !this.collapsed_;
    this.toggleButton_.setAttribute('aria-expanded', String(!this.collapsed_));
  };
  /**
   * Return `true` if the attribution is collapsible, `false` otherwise.
   * @return {boolean} True if the widget is collapsible.
   * @api
   */


  Attribution.prototype.getCollapsible = function () {
    return this.collapsible_;
  };
  /**
   * Set whether the attribution should be collapsible.
   * @param {boolean} collapsible True if the widget is collapsible.
   * @api
   */


  Attribution.prototype.setCollapsible = function (collapsible) {
    if (this.collapsible_ === collapsible) {
      return;
    }

    this.collapsible_ = collapsible;
    this.element.classList.toggle('ol-uncollapsible');

    if (this.userCollapsed_) {
      this.handleToggle_();
    }
  };
  /**
   * Collapse or expand the attribution according to the passed parameter. Will
   * not do anything if the attribution isn't collapsible or if the current
   * collapsed state is already the one requested.
   * @param {boolean} collapsed True if the widget is collapsed.
   * @api
   */


  Attribution.prototype.setCollapsed = function (collapsed) {
    this.userCollapsed_ = collapsed;

    if (!this.collapsible_ || this.collapsed_ === collapsed) {
      return;
    }

    this.handleToggle_();
  };
  /**
   * Return `true` when the attribution is currently collapsed or `false`
   * otherwise.
   * @return {boolean} True if the widget is collapsed.
   * @api
   */


  Attribution.prototype.getCollapsed = function () {
    return this.collapsed_;
  };
  /**
   * Update the attribution element.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @override
   */


  Attribution.prototype.render = function (mapEvent) {
    this.updateElement_(mapEvent.frameState);
  };

  return Attribution;
}(Control/* default */.Z);

/* harmony default export */ const control_Attribution = (Attribution);
// EXTERNAL MODULE: ./node_modules/ol/Collection.js
var Collection = __webpack_require__(1210);
// EXTERNAL MODULE: ./node_modules/ol/easing.js
var easing = __webpack_require__(9635);
;// CONCATENATED MODULE: ./node_modules/ol/control/Rotate.js
var Rotate_extends = undefined && undefined.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/control/Rotate
 */






/**
 * @typedef {Object} Options
 * @property {string} [className='ol-rotate'] CSS class name.
 * @property {string|HTMLElement} [label='⇧'] Text label to use for the rotate button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [tipLabel='Reset rotation'] Text label to use for the rotate tip.
 * @property {string} [compassClassName='ol-compass'] CSS class name for the compass.
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {boolean} [autoHide=true] Hide the control when rotation is 0.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when the control should
 * be re-rendered. This is called in a `requestAnimationFrame` callback.
 * @property {function():void} [resetNorth] Function called when the control is clicked.
 * This will override the default `resetNorth`.
 * @property {HTMLElement|string} [target] Specify a target if you want the control to be
 * rendered outside of the map's viewport.
 */

/**
 * @classdesc
 * A button control to reset rotation to 0.
 * To style this control use css selector `.ol-rotate`. A `.ol-hidden` css
 * selector is added to the button when the rotation is 0.
 *
 * @api
 */

var Rotate =
/** @class */
function (_super) {
  Rotate_extends(Rotate, _super);
  /**
   * @param {Options} [opt_options] Rotate options.
   */


  function Rotate(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    _this = _super.call(this, {
      element: document.createElement('div'),
      render: options.render,
      target: options.target
    }) || this;
    var className = options.className !== undefined ? options.className : 'ol-rotate';
    var label = options.label !== undefined ? options.label : '\u21E7';
    var compassClassName = options.compassClassName !== undefined ? options.compassClassName : 'ol-compass';
    /**
     * @type {HTMLElement}
     * @private
     */

    _this.label_ = null;

    if (typeof label === 'string') {
      _this.label_ = document.createElement('span');
      _this.label_.className = compassClassName;
      _this.label_.textContent = label;
    } else {
      _this.label_ = label;

      _this.label_.classList.add(compassClassName);
    }

    var tipLabel = options.tipLabel ? options.tipLabel : 'Reset rotation';
    var button = document.createElement('button');
    button.className = className + '-reset';
    button.setAttribute('type', 'button');
    button.title = tipLabel;
    button.appendChild(_this.label_);
    button.addEventListener(EventType/* default.CLICK */.Z.CLICK, _this.handleClick_.bind(_this), false);
    var cssClasses = className + ' ' + css/* CLASS_UNSELECTABLE */.XV + ' ' + css/* CLASS_CONTROL */.hg;
    var element = _this.element;
    element.className = cssClasses;
    element.appendChild(button);
    _this.callResetNorth_ = options.resetNorth ? options.resetNorth : undefined;
    /**
     * @type {number}
     * @private
     */

    _this.duration_ = options.duration !== undefined ? options.duration : 250;
    /**
     * @type {boolean}
     * @private
     */

    _this.autoHide_ = options.autoHide !== undefined ? options.autoHide : true;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.rotation_ = undefined;

    if (_this.autoHide_) {
      _this.element.classList.add(css/* CLASS_HIDDEN */.oj);
    }

    return _this;
  }
  /**
   * @param {MouseEvent} event The event to handle
   * @private
   */


  Rotate.prototype.handleClick_ = function (event) {
    event.preventDefault();

    if (this.callResetNorth_ !== undefined) {
      this.callResetNorth_();
    } else {
      this.resetNorth_();
    }
  };
  /**
   * @private
   */


  Rotate.prototype.resetNorth_ = function () {
    var map = this.getMap();
    var view = map.getView();

    if (!view) {
      // the map does not have a view, so we can't act
      // upon it
      return;
    }

    var rotation = view.getRotation();

    if (rotation !== undefined) {
      if (this.duration_ > 0 && rotation % (2 * Math.PI) !== 0) {
        view.animate({
          rotation: 0,
          duration: this.duration_,
          easing: easing/* easeOut */.Vv
        });
      } else {
        view.setRotation(0);
      }
    }
  };
  /**
   * Update the rotate control element.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @override
   */


  Rotate.prototype.render = function (mapEvent) {
    var frameState = mapEvent.frameState;

    if (!frameState) {
      return;
    }

    var rotation = frameState.viewState.rotation;

    if (rotation != this.rotation_) {
      var transform = 'rotate(' + rotation + 'rad)';

      if (this.autoHide_) {
        var contains = this.element.classList.contains(css/* CLASS_HIDDEN */.oj);

        if (!contains && rotation === 0) {
          this.element.classList.add(css/* CLASS_HIDDEN */.oj);
        } else if (contains && rotation !== 0) {
          this.element.classList.remove(css/* CLASS_HIDDEN */.oj);
        }
      }

      this.label_.style.transform = transform;
    }

    this.rotation_ = rotation;
  };

  return Rotate;
}(Control/* default */.Z);

/* harmony default export */ const control_Rotate = (Rotate);
;// CONCATENATED MODULE: ./node_modules/ol/control/Zoom.js
var Zoom_extends = undefined && undefined.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/control/Zoom
 */






/**
 * @typedef {Object} Options
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {string} [className='ol-zoom'] CSS class name.
 * @property {string} [zoomInClassName=className + '-in'] CSS class name for the zoom-in button.
 * @property {string} [zoomOutClassName=className + '-out'] CSS class name for the zoom-out button.
 * @property {string|HTMLElement} [zoomInLabel='+'] Text label to use for the zoom-in
 * button. Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string|HTMLElement} [zoomOutLabel='–'] Text label to use for the zoom-out button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [zoomInTipLabel='Zoom in'] Text label to use for the button tip.
 * @property {string} [zoomOutTipLabel='Zoom out'] Text label to use for the button tip.
 * @property {number} [delta=1] The zoom delta applied on each click.
 * @property {HTMLElement|string} [target] Specify a target if you want the control to be
 * rendered outside of the map's viewport.
 */

/**
 * @classdesc
 * A control with 2 buttons, one for zoom in and one for zoom out.
 * This control is one of the default controls of a map. To style this control
 * use css selectors `.ol-zoom-in` and `.ol-zoom-out`.
 *
 * @api
 */

var Zoom =
/** @class */
function (_super) {
  Zoom_extends(Zoom, _super);
  /**
   * @param {Options} [opt_options] Zoom options.
   */


  function Zoom(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    _this = _super.call(this, {
      element: document.createElement('div'),
      target: options.target
    }) || this;
    var className = options.className !== undefined ? options.className : 'ol-zoom';
    var delta = options.delta !== undefined ? options.delta : 1;
    var zoomInClassName = options.zoomInClassName !== undefined ? options.zoomInClassName : className + '-in';
    var zoomOutClassName = options.zoomOutClassName !== undefined ? options.zoomOutClassName : className + '-out';
    var zoomInLabel = options.zoomInLabel !== undefined ? options.zoomInLabel : '+';
    var zoomOutLabel = options.zoomOutLabel !== undefined ? options.zoomOutLabel : '\u2013';
    var zoomInTipLabel = options.zoomInTipLabel !== undefined ? options.zoomInTipLabel : 'Zoom in';
    var zoomOutTipLabel = options.zoomOutTipLabel !== undefined ? options.zoomOutTipLabel : 'Zoom out';
    var inElement = document.createElement('button');
    inElement.className = zoomInClassName;
    inElement.setAttribute('type', 'button');
    inElement.title = zoomInTipLabel;
    inElement.appendChild(typeof zoomInLabel === 'string' ? document.createTextNode(zoomInLabel) : zoomInLabel);
    inElement.addEventListener(EventType/* default.CLICK */.Z.CLICK, _this.handleClick_.bind(_this, delta), false);
    var outElement = document.createElement('button');
    outElement.className = zoomOutClassName;
    outElement.setAttribute('type', 'button');
    outElement.title = zoomOutTipLabel;
    outElement.appendChild(typeof zoomOutLabel === 'string' ? document.createTextNode(zoomOutLabel) : zoomOutLabel);
    outElement.addEventListener(EventType/* default.CLICK */.Z.CLICK, _this.handleClick_.bind(_this, -delta), false);
    var cssClasses = className + ' ' + css/* CLASS_UNSELECTABLE */.XV + ' ' + css/* CLASS_CONTROL */.hg;
    var element = _this.element;
    element.className = cssClasses;
    element.appendChild(inElement);
    element.appendChild(outElement);
    /**
     * @type {number}
     * @private
     */

    _this.duration_ = options.duration !== undefined ? options.duration : 250;
    return _this;
  }
  /**
   * @param {number} delta Zoom delta.
   * @param {MouseEvent} event The event to handle
   * @private
   */


  Zoom.prototype.handleClick_ = function (delta, event) {
    event.preventDefault();
    this.zoomByDelta_(delta);
  };
  /**
   * @param {number} delta Zoom delta.
   * @private
   */


  Zoom.prototype.zoomByDelta_ = function (delta) {
    var map = this.getMap();
    var view = map.getView();

    if (!view) {
      // the map does not have a view, so we can't act
      // upon it
      return;
    }

    var currentZoom = view.getZoom();

    if (currentZoom !== undefined) {
      var newZoom = view.getConstrainedZoom(currentZoom + delta);

      if (this.duration_ > 0) {
        if (view.getAnimating()) {
          view.cancelAnimations();
        }

        view.animate({
          zoom: newZoom,
          duration: this.duration_,
          easing: easing/* easeOut */.Vv
        });
      } else {
        view.setZoom(newZoom);
      }
    }
  };

  return Zoom;
}(Control/* default */.Z);

/* harmony default export */ const control_Zoom = (Zoom);
;// CONCATENATED MODULE: ./node_modules/ol/control.js
/**
 * @module ol/control
 */














/**
 * @typedef {Object} DefaultsOptions
 * @property {boolean} [attribution=true] Include
 * {@link module:ol/control/Attribution~Attribution}.
 * @property {import("./control/Attribution.js").Options} [attributionOptions]
 * Options for {@link module:ol/control/Attribution~Attribution}.
 * @property {boolean} [rotate=true] Include
 * {@link module:ol/control/Rotate~Rotate}.
 * @property {import("./control/Rotate.js").Options} [rotateOptions] Options
 * for {@link module:ol/control/Rotate~Rotate}.
 * @property {boolean} [zoom] Include {@link module:ol/control/Zoom~Zoom}.
 * @property {import("./control/Zoom.js").Options} [zoomOptions] Options for
 * {@link module:ol/control/Zoom~Zoom}.
 * @api
 */

/**
 * Set of controls included in maps by default. Unless configured otherwise,
 * this returns a collection containing an instance of each of the following
 * controls:
 * * {@link module:ol/control/Zoom~Zoom}
 * * {@link module:ol/control/Rotate~Rotate}
 * * {@link module:ol/control/Attribution~Attribution}
 *
 * @param {DefaultsOptions} [opt_options]
 * Defaults options.
 * @return {Collection<import("./control/Control.js").default>}
 * Controls.
 * @api
 */

function defaults(opt_options) {
  var options = opt_options ? opt_options : {};
  var controls = new Collection/* default */.Z();
  var zoomControl = options.zoom !== undefined ? options.zoom : true;

  if (zoomControl) {
    controls.push(new control_Zoom(options.zoomOptions));
  }

  var rotateControl = options.rotate !== undefined ? options.rotate : true;

  if (rotateControl) {
    controls.push(new control_Rotate(options.rotateOptions));
  }

  var attributionControl = options.attribution !== undefined ? options.attribution : true;

  if (attributionControl) {
    controls.push(new control_Attribution(options.attributionOptions));
  }

  return controls;
}

/***/ }),

/***/ 4224:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Object_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7182);
/* harmony import */ var _MapEventType_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7742);
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3658);
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5750);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9631);
var __extends = undefined && undefined.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/control/Control
 */







/**
 * @typedef {Object} Options
 * @property {HTMLElement} [element] The element is the control's
 * container element. This only needs to be specified if you're developing
 * a custom control.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when
 * the control should be re-rendered. This is called in a `requestAnimationFrame`
 * callback.
 * @property {HTMLElement|string} [target] Specify a target if you want
 * the control to be rendered outside of the map's viewport.
 */

/**
 * @classdesc
 * A control is a visible widget with a DOM element in a fixed position on the
 * screen. They can involve user input (buttons), or be informational only;
 * the position is determined using CSS. By default these are placed in the
 * container with CSS class name `ol-overlaycontainer-stopevent`, but can use
 * any outside DOM element.
 *
 * This is the base class for controls. You can use it for simple custom
 * controls by creating the element with listeners, creating an instance:
 * ```js
 * var myControl = new Control({element: myElement});
 * ```
 * and then adding this to the map.
 *
 * The main advantage of having this as a control rather than a simple separate
 * DOM element is that preventing propagation is handled for you. Controls
 * will also be objects in a {@link module:ol/Collection~Collection}, so you can use their methods.
 *
 * You can also extend this base for your own control class. See
 * examples/custom-controls for an example of how to do this.
 *
 * @api
 */

var Control =
/** @class */
function (_super) {
  __extends(Control, _super);
  /**
   * @param {Options} options Control options.
   */


  function Control(options) {
    var _this = _super.call(this) || this;

    var element = options.element;

    if (element && !options.target && !element.style.pointerEvents) {
      element.style.pointerEvents = 'auto';
    }
    /**
     * @protected
     * @type {HTMLElement}
     */


    _this.element = element ? element : null;
    /**
     * @private
     * @type {HTMLElement}
     */

    _this.target_ = null;
    /**
     * @private
     * @type {import("../PluggableMap.js").default}
     */

    _this.map_ = null;
    /**
     * @protected
     * @type {!Array<import("../events.js").EventsKey>}
     */

    _this.listenerKeys = [];

    if (options.render) {
      _this.render = options.render;
    }

    if (options.target) {
      _this.setTarget(options.target);
    }

    return _this;
  }
  /**
   * Clean up.
   */


  Control.prototype.disposeInternal = function () {
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__/* .removeNode */ .ZF)(this.element);

    _super.prototype.disposeInternal.call(this);
  };
  /**
   * Get the map associated with this control.
   * @return {import("../PluggableMap.js").default|undefined} Map.
   * @api
   */


  Control.prototype.getMap = function () {
    return this.map_;
  };
  /**
   * Remove the control from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../PluggableMap.js").default} [map] Map.
   * @api
   */


  Control.prototype.setMap = function (map) {
    if (this.map_) {
      (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__/* .removeNode */ .ZF)(this.element);
    }

    for (var i = 0, ii = this.listenerKeys.length; i < ii; ++i) {
      (0,_events_js__WEBPACK_IMPORTED_MODULE_1__/* .unlistenByKey */ .bN)(this.listenerKeys[i]);
    }

    this.listenerKeys.length = 0;
    this.map_ = map;

    if (this.map_) {
      var target = this.target_ ? this.target_ : map.getOverlayContainerStopEvent();
      target.appendChild(this.element);

      if (this.render !== _functions_js__WEBPACK_IMPORTED_MODULE_2__/* .VOID */ .Zn) {
        this.listenerKeys.push((0,_events_js__WEBPACK_IMPORTED_MODULE_1__/* .listen */ .oL)(map, _MapEventType_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].POSTRENDER */ .Z.POSTRENDER, this.render, this));
      }

      map.render();
    }
  };
  /**
   * Renders the control.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @api
   */


  Control.prototype.render = function (mapEvent) {};
  /**
   * This function is used to set a target element for the control. It has no
   * effect if it is called after the control has been added to the map (i.e.
   * after `setMap` is called on the control). If no `target` is set in the
   * options passed to the control constructor and if `setTarget` is not called
   * then the control is added to the map's overlay container.
   * @param {HTMLElement|string} target Target.
   * @api
   */


  Control.prototype.setTarget = function (target) {
    this.target_ = typeof target === 'string' ? document.getElementById(target) : target;
  };

  return Control;
}(_Object_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Control);

/***/ }),

/***/ 8397:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export Units */
/* harmony import */ var _Control_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4224);
/* harmony import */ var _proj_Units_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3977);
/* harmony import */ var _css_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9285);
/* harmony import */ var _proj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8623);
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4548);
var __extends = undefined && undefined.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/control/ScaleLine
 */







/**
 * @type {string}
 */

var UNITS_PROP = 'units';
/**
 * Units for the scale line. Supported values are `'degrees'`, `'imperial'`,
 * `'nautical'`, `'metric'`, `'us'`.
 * @enum {string}
 */

var Units = {
  DEGREES: 'degrees',
  IMPERIAL: 'imperial',
  NAUTICAL: 'nautical',
  METRIC: 'metric',
  US: 'us'
};
/**
 * @const
 * @type {Array<number>}
 */

var LEADING_DIGITS = [1, 2, 5];
/**
 * @const
 * @type {number}
 */

var DEFAULT_DPI = 25.4 / 0.28;
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:units', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types
 *     |'change:units', Return>} ScaleLineOnSignature
 */

/**
 * @typedef {Object} Options
 * @property {string} [className='ol-scale-line'] CSS Class name.
 * @property {number} [minWidth=64] Minimum width in pixels at the OGC default dpi. The width will be
 * adjusted to match the dpi used.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when the control
 * should be re-rendered. This is called in a `requestAnimationFrame` callback.
 * @property {HTMLElement|string} [target] Specify a target if you want the control
 * to be rendered outside of the map's viewport.
 * @property {import("./ScaleLine.js").Units|string} [units='metric'] Units.
 * @property {boolean} [bar=false] Render scalebars instead of a line.
 * @property {number} [steps=4] Number of steps the scalebar should use. Use even numbers
 * for best results. Only applies when `bar` is `true`.
 * @property {boolean} [text=false] Render the text scale above of the scalebar. Only applies
 * when `bar` is `true`.
 * @property {number|undefined} [dpi=undefined] dpi of output device such as printer. Only applies
 * when `bar` is `true`. If undefined the OGC default screen pixel size of 0.28mm will be assumed.
 */

/**
 * @classdesc
 * A control displaying rough y-axis distances, calculated for the center of the
 * viewport. For conformal projections (e.g. EPSG:3857, the default view
 * projection in OpenLayers), the scale is valid for all directions.
 * No scale line will be shown when the y-axis distance of a pixel at the
 * viewport center cannot be calculated in the view projection.
 * By default the scale line will show in the bottom left portion of the map,
 * but this can be changed by using the css selector `.ol-scale-line`.
 * When specifying `bar` as `true`, a scalebar will be rendered instead
 * of a scaleline.
 *
 * @api
 */

var ScaleLine =
/** @class */
function (_super) {
  __extends(ScaleLine, _super);
  /**
   * @param {Options} [opt_options] Scale line options.
   */


  function ScaleLine(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    var className = options.className !== undefined ? options.className : options.bar ? 'ol-scale-bar' : 'ol-scale-line';
    _this = _super.call(this, {
      element: document.createElement('div'),
      render: options.render,
      target: options.target
    }) || this;
    /***
     * @type {ScaleLineOnSignature<import("../events").EventsKey>}
     */

    _this.on;
    /***
     * @type {ScaleLineOnSignature<import("../events").EventsKey>}
     */

    _this.once;
    /***
     * @type {ScaleLineOnSignature<void>}
     */

    _this.un;
    /**
     * @private
     * @type {HTMLElement}
     */

    _this.innerElement_ = document.createElement('div');
    _this.innerElement_.className = className + '-inner';
    _this.element.className = className + ' ' + _css_js__WEBPACK_IMPORTED_MODULE_1__/* .CLASS_UNSELECTABLE */ .XV;

    _this.element.appendChild(_this.innerElement_);
    /**
     * @private
     * @type {?import("../View.js").State}
     */


    _this.viewState_ = null;
    /**
     * @private
     * @type {number}
     */

    _this.minWidth_ = options.minWidth !== undefined ? options.minWidth : 64;
    /**
     * @private
     * @type {boolean}
     */

    _this.renderedVisible_ = false;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.renderedWidth_ = undefined;
    /**
     * @private
     * @type {string}
     */

    _this.renderedHTML_ = '';

    _this.addChangeListener(UNITS_PROP, _this.handleUnitsChanged_);

    _this.setUnits(options.units || Units.METRIC);
    /**
     * @private
     * @type {boolean}
     */


    _this.scaleBar_ = options.bar || false;
    /**
     * @private
     * @type {number}
     */

    _this.scaleBarSteps_ = options.steps || 4;
    /**
     * @private
     * @type {boolean}
     */

    _this.scaleBarText_ = options.text || false;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.dpi_ = options.dpi || undefined;
    return _this;
  }
  /**
   * Return the units to use in the scale line.
   * @return {import("./ScaleLine.js").Units} The units
   * to use in the scale line.
   * @observable
   * @api
   */


  ScaleLine.prototype.getUnits = function () {
    return this.get(UNITS_PROP);
  };
  /**
   * @private
   */


  ScaleLine.prototype.handleUnitsChanged_ = function () {
    this.updateElement_();
  };
  /**
   * Set the units to use in the scale line.
   * @param {import("./ScaleLine.js").Units} units The units to use in the scale line.
   * @observable
   * @api
   */


  ScaleLine.prototype.setUnits = function (units) {
    this.set(UNITS_PROP, units);
  };
  /**
   * Specify the dpi of output device such as printer.
   * @param {number|undefined} dpi The dpi of output device.
   * @api
   */


  ScaleLine.prototype.setDpi = function (dpi) {
    this.dpi_ = dpi;
  };
  /**
   * @private
   */


  ScaleLine.prototype.updateElement_ = function () {
    var viewState = this.viewState_;

    if (!viewState) {
      if (this.renderedVisible_) {
        this.element.style.display = 'none';
        this.renderedVisible_ = false;
      }

      return;
    }

    var center = viewState.center;
    var projection = viewState.projection;
    var units = this.getUnits();
    var pointResolutionUnits = units == Units.DEGREES ? _proj_Units_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].DEGREES */ .ZP.DEGREES : _proj_Units_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].METERS */ .ZP.METERS;
    var pointResolution = (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .getPointResolution */ ._Q)(projection, viewState.resolution, center, pointResolutionUnits);
    var minWidth = this.minWidth_ * (this.dpi_ || DEFAULT_DPI) / DEFAULT_DPI;
    var nominalCount = minWidth * pointResolution;
    var suffix = '';

    if (units == Units.DEGREES) {
      var metersPerDegree = _proj_js__WEBPACK_IMPORTED_MODULE_0__/* .METERS_PER_UNIT */ .Wm[_proj_Units_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].DEGREES */ .ZP.DEGREES];
      nominalCount *= metersPerDegree;

      if (nominalCount < metersPerDegree / 60) {
        suffix = '\u2033'; // seconds

        pointResolution *= 3600;
      } else if (nominalCount < metersPerDegree) {
        suffix = '\u2032'; // minutes

        pointResolution *= 60;
      } else {
        suffix = '\u00b0'; // degrees
      }
    } else if (units == Units.IMPERIAL) {
      if (nominalCount < 0.9144) {
        suffix = 'in';
        pointResolution /= 0.0254;
      } else if (nominalCount < 1609.344) {
        suffix = 'ft';
        pointResolution /= 0.3048;
      } else {
        suffix = 'mi';
        pointResolution /= 1609.344;
      }
    } else if (units == Units.NAUTICAL) {
      pointResolution /= 1852;
      suffix = 'nm';
    } else if (units == Units.METRIC) {
      if (nominalCount < 0.001) {
        suffix = 'μm';
        pointResolution *= 1000000;
      } else if (nominalCount < 1) {
        suffix = 'mm';
        pointResolution *= 1000;
      } else if (nominalCount < 1000) {
        suffix = 'm';
      } else {
        suffix = 'km';
        pointResolution /= 1000;
      }
    } else if (units == Units.US) {
      if (nominalCount < 0.9144) {
        suffix = 'in';
        pointResolution *= 39.37;
      } else if (nominalCount < 1609.344) {
        suffix = 'ft';
        pointResolution /= 0.30480061;
      } else {
        suffix = 'mi';
        pointResolution /= 1609.3472;
      }
    } else {
      (0,_asserts_js__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h)(false, 33); // Invalid units
    }

    var i = 3 * Math.floor(Math.log(minWidth * pointResolution) / Math.log(10));
    var count, width, decimalCount;

    while (true) {
      decimalCount = Math.floor(i / 3);
      var decimal = Math.pow(10, decimalCount);
      count = LEADING_DIGITS[(i % 3 + 3) % 3] * decimal;
      width = Math.round(count / pointResolution);

      if (isNaN(width)) {
        this.element.style.display = 'none';
        this.renderedVisible_ = false;
        return;
      } else if (width >= minWidth) {
        break;
      }

      ++i;
    }

    var html;

    if (this.scaleBar_) {
      html = this.createScaleBar(width, count, suffix);
    } else {
      html = count.toFixed(decimalCount < 0 ? -decimalCount : 0) + ' ' + suffix;
    }

    if (this.renderedHTML_ != html) {
      this.innerElement_.innerHTML = html;
      this.renderedHTML_ = html;
    }

    if (this.renderedWidth_ != width) {
      this.innerElement_.style.width = width + 'px';
      this.renderedWidth_ = width;
    }

    if (!this.renderedVisible_) {
      this.element.style.display = '';
      this.renderedVisible_ = true;
    }
  };
  /**
   * @private
   * @param {number} width The current width of the scalebar.
   * @param {number} scale The current scale.
   * @param {string} suffix The suffix to append to the scale text.
   * @return {string} The stringified HTML of the scalebar.
   */


  ScaleLine.prototype.createScaleBar = function (width, scale, suffix) {
    var mapScale = '1 : ' + Math.round(this.getScaleForResolution()).toLocaleString();
    var scaleSteps = [];
    var stepWidth = width / this.scaleBarSteps_;
    var backgroundColor = '#ffffff';

    for (var i = 0; i < this.scaleBarSteps_; i++) {
      if (i === 0) {
        // create the first marker at position 0
        scaleSteps.push(this.createMarker('absolute', i));
      }

      scaleSteps.push('<div>' + '<div ' + 'class="ol-scale-singlebar" ' + 'style=' + '"width: ' + stepWidth + 'px;' + 'background-color: ' + backgroundColor + ';"' + '>' + '</div>' + this.createMarker('relative', i) + (
      /*render text every second step, except when only 2 steps */
      i % 2 === 0 || this.scaleBarSteps_ === 2 ? this.createStepText(i, width, false, scale, suffix) : '') + '</div>');

      if (i === this.scaleBarSteps_ - 1) {
        {
          /*render text at the end */
        }
        scaleSteps.push(this.createStepText(i + 1, width, true, scale, suffix));
      } // switch colors of steps between black and white


      if (backgroundColor === '#ffffff') {
        backgroundColor = '#000000';
      } else {
        backgroundColor = '#ffffff';
      }
    }

    var scaleBarText;

    if (this.scaleBarText_) {
      scaleBarText = '<div ' + 'class="ol-scale-text" ' + 'style="width: ' + width + 'px;">' + mapScale + '</div>';
    } else {
      scaleBarText = '';
    }

    var container = '<div ' + 'style="display: flex;">' + scaleBarText + scaleSteps.join('') + '</div>';
    return container;
  };
  /**
   * Creates a marker at given position
   * @param {string} position The position, absolute or relative
   * @param {number} i The iterator
   * @return {string} The stringified div containing the marker
   */


  ScaleLine.prototype.createMarker = function (position, i) {
    var top = position === 'absolute' ? 3 : -10;
    return '<div ' + 'class="ol-scale-step-marker" ' + 'style="position: ' + position + ';' + 'top: ' + top + 'px;"' + '></div>';
  };
  /**
   * Creates the label for a marker marker at given position
   * @param {number} i The iterator
   * @param {number} width The width the scalebar will currently use
   * @param {boolean} isLast Flag indicating if we add the last step text
   * @param {number} scale The current scale for the whole scalebar
   * @param {string} suffix The suffix for the scale
   * @return {string} The stringified div containing the step text
   */


  ScaleLine.prototype.createStepText = function (i, width, isLast, scale, suffix) {
    var length = i === 0 ? 0 : Math.round(scale / this.scaleBarSteps_ * i * 100) / 100;
    var lengthString = length + (i === 0 ? '' : ' ' + suffix);
    var margin = i === 0 ? -3 : width / this.scaleBarSteps_ * -1;
    var minWidth = i === 0 ? 0 : width / this.scaleBarSteps_ * 2;
    return '<div ' + 'class="ol-scale-step-text" ' + 'style="' + 'margin-left: ' + margin + 'px;' + 'text-align: ' + (i === 0 ? 'left' : 'center') + '; ' + 'min-width: ' + minWidth + 'px;' + 'left: ' + (isLast ? width + 'px' : 'unset') + ';"' + '>' + lengthString + '</div>';
  };
  /**
   * Returns the appropriate scale for the given resolution and units.
   * @return {number} The appropriate scale.
   */


  ScaleLine.prototype.getScaleForResolution = function () {
    var resolution = (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .getPointResolution */ ._Q)(this.viewState_.projection, this.viewState_.resolution, this.viewState_.center);
    var dpi = this.dpi_ || DEFAULT_DPI;
    var mpu = this.viewState_.projection.getMetersPerUnit();
    var inchesPerMeter = 1000 / 25.4;
    return parseFloat(resolution.toString()) * mpu * inchesPerMeter * dpi;
  };
  /**
   * Update the scale line element.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @override
   */


  ScaleLine.prototype.render = function (mapEvent) {
    var frameState = mapEvent.frameState;

    if (!frameState) {
      this.viewState_ = null;
    } else {
      this.viewState_ = frameState.viewState;
    }

    this.updateElement_();
  };

  return ScaleLine;
}(_Control_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScaleLine);

/***/ }),

/***/ 9261:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Control_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4224);
/* harmony import */ var _events_EventType_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2140);
/* harmony import */ var _pointer_EventType_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6850);
/* harmony import */ var _css_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9285);
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4495);
/* harmony import */ var _easing_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9635);
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5750);
/* harmony import */ var _events_Event_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7518);
/**
 * @module ol/control/ZoomSlider
 */
var __extends = undefined && undefined.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();









/**
 * The enum for available directions.
 *
 * @enum {number}
 */

var Direction = {
  VERTICAL: 0,
  HORIZONTAL: 1
};
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-zoomslider'] CSS class name.
 * @property {number} [duration=200] Animation duration in milliseconds.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when the control
 * should be re-rendered. This is called in a `requestAnimationFrame` callback.
 */

/**
 * @classdesc
 * A slider type of control for zooming.
 *
 * Example:
 *
 *     map.addControl(new ZoomSlider());
 *
 * @api
 */

var ZoomSlider =
/** @class */
function (_super) {
  __extends(ZoomSlider, _super);
  /**
   * @param {Options} [opt_options] Zoom slider options.
   */


  function ZoomSlider(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    _this = _super.call(this, {
      element: document.createElement('div'),
      render: options.render
    }) || this;
    /**
     * @type {!Array<import("../events.js").EventsKey>}
     * @private
     */

    _this.dragListenerKeys_ = [];
    /**
     * Will hold the current resolution of the view.
     *
     * @type {number|undefined}
     * @private
     */

    _this.currentResolution_ = undefined;
    /**
     * The direction of the slider. Will be determined from actual display of the
     * container and defaults to Direction.VERTICAL.
     *
     * @type {Direction}
     * @private
     */

    _this.direction_ = Direction.VERTICAL;
    /**
     * @type {boolean}
     * @private
     */

    _this.dragging_;
    /**
     * @type {number}
     * @private
     */

    _this.heightLimit_ = 0;
    /**
     * @type {number}
     * @private
     */

    _this.widthLimit_ = 0;
    /**
     * @type {number|undefined}
     * @private
     */

    _this.startX_;
    /**
     * @type {number|undefined}
     * @private
     */

    _this.startY_;
    /**
     * The calculated thumb size (border box plus margins).  Set when initSlider_
     * is called.
     * @type {import("../size.js").Size}
     * @private
     */

    _this.thumbSize_ = null;
    /**
     * Whether the slider is initialized.
     * @type {boolean}
     * @private
     */

    _this.sliderInitialized_ = false;
    /**
     * @type {number}
     * @private
     */

    _this.duration_ = options.duration !== undefined ? options.duration : 200;
    var className = options.className !== undefined ? options.className : 'ol-zoomslider';
    var thumbElement = document.createElement('button');
    thumbElement.setAttribute('type', 'button');
    thumbElement.className = className + '-thumb ' + _css_js__WEBPACK_IMPORTED_MODULE_0__/* .CLASS_UNSELECTABLE */ .XV;
    var containerElement = _this.element;
    containerElement.className = className + ' ' + _css_js__WEBPACK_IMPORTED_MODULE_0__/* .CLASS_UNSELECTABLE */ .XV + ' ' + _css_js__WEBPACK_IMPORTED_MODULE_0__/* .CLASS_CONTROL */ .hg;
    containerElement.appendChild(thumbElement);
    containerElement.addEventListener(_pointer_EventType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].POINTERDOWN */ .Z.POINTERDOWN, _this.handleDraggerStart_.bind(_this), false);
    containerElement.addEventListener(_pointer_EventType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].POINTERMOVE */ .Z.POINTERMOVE, _this.handleDraggerDrag_.bind(_this), false);
    containerElement.addEventListener(_pointer_EventType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].POINTERUP */ .Z.POINTERUP, _this.handleDraggerEnd_.bind(_this), false);
    containerElement.addEventListener(_events_EventType_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].CLICK */ .Z.CLICK, _this.handleContainerClick_.bind(_this), false);
    thumbElement.addEventListener(_events_EventType_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].CLICK */ .Z.CLICK, _events_Event_js__WEBPACK_IMPORTED_MODULE_3__/* .stopPropagation */ .UW, false);
    return _this;
  }
  /**
   * Remove the control from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../PluggableMap.js").default} map Map.
   * @api
   */


  ZoomSlider.prototype.setMap = function (map) {
    _super.prototype.setMap.call(this, map);

    if (map) {
      map.render();
    }
  };
  /**
   * Initializes the slider element. This will determine and set this controls
   * direction_ and also constrain the dragging of the thumb to always be within
   * the bounds of the container.
   *
   * @return {boolean} Initialization successful
   * @private
   */


  ZoomSlider.prototype.initSlider_ = function () {
    var container = this.element;
    var containerWidth = container.offsetWidth;
    var containerHeight = container.offsetHeight;

    if (containerWidth === 0 && containerHeight === 0) {
      return this.sliderInitialized_ = false;
    }

    var containerStyle = getComputedStyle(container);
    containerWidth -= parseFloat(containerStyle['paddingRight']) + parseFloat(containerStyle['paddingLeft']);
    containerHeight -= parseFloat(containerStyle['paddingTop']) + parseFloat(containerStyle['paddingBottom']);
    var thumb =
    /** @type {HTMLElement} */
    container.firstElementChild;
    var thumbStyle = getComputedStyle(thumb);
    var thumbWidth = thumb.offsetWidth + parseFloat(thumbStyle['marginRight']) + parseFloat(thumbStyle['marginLeft']);
    var thumbHeight = thumb.offsetHeight + parseFloat(thumbStyle['marginTop']) + parseFloat(thumbStyle['marginBottom']);
    this.thumbSize_ = [thumbWidth, thumbHeight];

    if (containerWidth > containerHeight) {
      this.direction_ = Direction.HORIZONTAL;
      this.widthLimit_ = containerWidth - thumbWidth;
    } else {
      this.direction_ = Direction.VERTICAL;
      this.heightLimit_ = containerHeight - thumbHeight;
    }

    return this.sliderInitialized_ = true;
  };
  /**
   * @param {PointerEvent} event The browser event to handle.
   * @private
   */


  ZoomSlider.prototype.handleContainerClick_ = function (event) {
    var view = this.getMap().getView();
    var relativePosition = this.getRelativePosition_(event.offsetX - this.thumbSize_[0] / 2, event.offsetY - this.thumbSize_[1] / 2);
    var resolution = this.getResolutionForPosition_(relativePosition);
    var zoom = view.getConstrainedZoom(view.getZoomForResolution(resolution));
    view.animateInternal({
      zoom: zoom,
      duration: this.duration_,
      easing: _easing_js__WEBPACK_IMPORTED_MODULE_4__/* .easeOut */ .Vv
    });
  };
  /**
   * Handle dragger start events.
   * @param {PointerEvent} event The drag event.
   * @private
   */


  ZoomSlider.prototype.handleDraggerStart_ = function (event) {
    if (!this.dragging_ && event.target === this.element.firstElementChild) {
      var element =
      /** @type {HTMLElement} */
      this.element.firstElementChild;
      this.getMap().getView().beginInteraction();
      this.startX_ = event.clientX - parseFloat(element.style.left);
      this.startY_ = event.clientY - parseFloat(element.style.top);
      this.dragging_ = true;

      if (this.dragListenerKeys_.length === 0) {
        var drag = this.handleDraggerDrag_;
        var end = this.handleDraggerEnd_;
        var doc = this.getMap().getOwnerDocument();
        this.dragListenerKeys_.push((0,_events_js__WEBPACK_IMPORTED_MODULE_5__/* .listen */ .oL)(doc, _pointer_EventType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].POINTERMOVE */ .Z.POINTERMOVE, drag, this), (0,_events_js__WEBPACK_IMPORTED_MODULE_5__/* .listen */ .oL)(doc, _pointer_EventType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].POINTERUP */ .Z.POINTERUP, end, this));
      }
    }
  };
  /**
   * Handle dragger drag events.
   *
   * @param {PointerEvent} event The drag event.
   * @private
   */


  ZoomSlider.prototype.handleDraggerDrag_ = function (event) {
    if (this.dragging_) {
      var deltaX = event.clientX - this.startX_;
      var deltaY = event.clientY - this.startY_;
      var relativePosition = this.getRelativePosition_(deltaX, deltaY);
      this.currentResolution_ = this.getResolutionForPosition_(relativePosition);
      this.getMap().getView().setResolution(this.currentResolution_);
    }
  };
  /**
   * Handle dragger end events.
   * @param {PointerEvent} event The drag event.
   * @private
   */


  ZoomSlider.prototype.handleDraggerEnd_ = function (event) {
    if (this.dragging_) {
      var view = this.getMap().getView();
      view.endInteraction();
      this.dragging_ = false;
      this.startX_ = undefined;
      this.startY_ = undefined;
      this.dragListenerKeys_.forEach(_events_js__WEBPACK_IMPORTED_MODULE_5__/* .unlistenByKey */ .bN);
      this.dragListenerKeys_.length = 0;
    }
  };
  /**
   * Positions the thumb inside its container according to the given resolution.
   *
   * @param {number} res The res.
   * @private
   */


  ZoomSlider.prototype.setThumbPosition_ = function (res) {
    var position = this.getPositionForResolution_(res);
    var thumb =
    /** @type {HTMLElement} */
    this.element.firstElementChild;

    if (this.direction_ == Direction.HORIZONTAL) {
      thumb.style.left = this.widthLimit_ * position + 'px';
    } else {
      thumb.style.top = this.heightLimit_ * position + 'px';
    }
  };
  /**
   * Calculates the relative position of the thumb given x and y offsets.  The
   * relative position scales from 0 to 1.  The x and y offsets are assumed to be
   * in pixel units within the dragger limits.
   *
   * @param {number} x Pixel position relative to the left of the slider.
   * @param {number} y Pixel position relative to the top of the slider.
   * @return {number} The relative position of the thumb.
   * @private
   */


  ZoomSlider.prototype.getRelativePosition_ = function (x, y) {
    var amount;

    if (this.direction_ === Direction.HORIZONTAL) {
      amount = x / this.widthLimit_;
    } else {
      amount = y / this.heightLimit_;
    }

    return (0,_math_js__WEBPACK_IMPORTED_MODULE_6__/* .clamp */ .uZ)(amount, 0, 1);
  };
  /**
   * Calculates the corresponding resolution of the thumb given its relative
   * position (where 0 is the minimum and 1 is the maximum).
   *
   * @param {number} position The relative position of the thumb.
   * @return {number} The corresponding resolution.
   * @private
   */


  ZoomSlider.prototype.getResolutionForPosition_ = function (position) {
    var fn = this.getMap().getView().getResolutionForValueFunction();
    return fn(1 - position);
  };
  /**
   * Determines the relative position of the slider for the given resolution.  A
   * relative position of 0 corresponds to the minimum view resolution.  A
   * relative position of 1 corresponds to the maximum view resolution.
   *
   * @param {number} res The resolution.
   * @return {number} The relative position value (between 0 and 1).
   * @private
   */


  ZoomSlider.prototype.getPositionForResolution_ = function (res) {
    var fn = this.getMap().getView().getValueForResolutionFunction();
    return (0,_math_js__WEBPACK_IMPORTED_MODULE_6__/* .clamp */ .uZ)(1 - fn(res), 0, 1);
  };
  /**
   * Update the zoomslider element.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @override
   */


  ZoomSlider.prototype.render = function (mapEvent) {
    if (!mapEvent.frameState) {
      return;
    }

    if (!this.sliderInitialized_ && !this.initSlider_()) {
      return;
    }

    var res = mapEvent.frameState.viewState.resolution;
    this.currentResolution_ = res;
    this.setThumbPosition_(res);
  };

  return ZoomSlider;
}(_Control_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ZoomSlider);

/***/ }),

/***/ 4413:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cf": () => (/* binding */ wrapX),
/* harmony export */   "IH": () => (/* binding */ add),
/* harmony export */   "U1": () => (/* binding */ rotate),
/* harmony export */   "bA": () => (/* binding */ scale),
/* harmony export */   "fS": () => (/* binding */ equals)
/* harmony export */ });
/* unused harmony exports closestOnCircle, closestOnSegment, createStringXY, degreesToStringHDMS, format, squaredDistance, distance, squaredDistanceToSegment, toStringHDMS, toStringXY, getWorldsAway */
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1046);
/**
 * @module ol/coordinate
 */



/**
 * An array of numbers representing an xy coordinate. Example: `[16, 48]`.
 * @typedef {Array<number>} Coordinate
 * @api
 */

/**
 * A function that takes a {@link module:ol/coordinate~Coordinate} and
 * transforms it into a `{string}`.
 *
 * @typedef {function((Coordinate|undefined)): string} CoordinateFormat
 * @api
 */

/**
 * Add `delta` to `coordinate`. `coordinate` is modified in place and returned
 * by the function.
 *
 * Example:
 *
 *     import {add} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     add(coord, [-2, 4]);
 *     // coord is now [5.85, 51.983333]
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {Coordinate} delta Delta.
 * @return {Coordinate} The input coordinate adjusted by
 * the given delta.
 * @api
 */

function add(coordinate, delta) {
  coordinate[0] += +delta[0];
  coordinate[1] += +delta[1];
  return coordinate;
}
/**
 * Calculates the point closest to the passed coordinate on the passed circle.
 *
 * @param {Coordinate} coordinate The coordinate.
 * @param {import("./geom/Circle.js").default} circle The circle.
 * @return {Coordinate} Closest point on the circumference.
 */

function closestOnCircle(coordinate, circle) {
  var r = circle.getRadius();
  var center = circle.getCenter();
  var x0 = center[0];
  var y0 = center[1];
  var x1 = coordinate[0];
  var y1 = coordinate[1];
  var dx = x1 - x0;
  var dy = y1 - y0;

  if (dx === 0 && dy === 0) {
    dx = 1;
  }

  var d = Math.sqrt(dx * dx + dy * dy);
  var x = x0 + r * dx / d;
  var y = y0 + r * dy / d;
  return [x, y];
}
/**
 * Calculates the point closest to the passed coordinate on the passed segment.
 * This is the foot of the perpendicular of the coordinate to the segment when
 * the foot is on the segment, or the closest segment coordinate when the foot
 * is outside the segment.
 *
 * @param {Coordinate} coordinate The coordinate.
 * @param {Array<Coordinate>} segment The two coordinates
 * of the segment.
 * @return {Coordinate} The foot of the perpendicular of
 * the coordinate to the segment.
 */

function closestOnSegment(coordinate, segment) {
  var x0 = coordinate[0];
  var y0 = coordinate[1];
  var start = segment[0];
  var end = segment[1];
  var x1 = start[0];
  var y1 = start[1];
  var x2 = end[0];
  var y2 = end[1];
  var dx = x2 - x1;
  var dy = y2 - y1;
  var along = dx === 0 && dy === 0 ? 0 : (dx * (x0 - x1) + dy * (y0 - y1)) / (dx * dx + dy * dy || 0);
  var x, y;

  if (along <= 0) {
    x = x1;
    y = y1;
  } else if (along >= 1) {
    x = x2;
    y = y2;
  } else {
    x = x1 + along * dx;
    y = y1 + along * dy;
  }

  return [x, y];
}
/**
 * Returns a {@link module:ol/coordinate~CoordinateFormat} function that can be
 * used to format
 * a {Coordinate} to a string.
 *
 * Example without specifying the fractional digits:
 *
 *     import {createStringXY} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var stringifyFunc = createStringXY();
 *     var out = stringifyFunc(coord);
 *     // out is now '8, 48'
 *
 * Example with explicitly specifying 2 fractional digits:
 *
 *     import {createStringXY} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var stringifyFunc = createStringXY(2);
 *     var out = stringifyFunc(coord);
 *     // out is now '7.85, 47.98'
 *
 * @param {number} [opt_fractionDigits] The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {CoordinateFormat} Coordinate format.
 * @api
 */

function createStringXY(opt_fractionDigits) {
  return (
    /**
     * @param {Coordinate} coordinate Coordinate.
     * @return {string} String XY.
     */
    function (coordinate) {
      return toStringXY(coordinate, opt_fractionDigits);
    }
  );
}
/**
 * @param {string} hemispheres Hemispheres.
 * @param {number} degrees Degrees.
 * @param {number} [opt_fractionDigits] The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {string} String.
 */

function degreesToStringHDMS(hemispheres, degrees, opt_fractionDigits) {
  var normalizedDegrees = modulo(degrees + 180, 360) - 180;
  var x = Math.abs(3600 * normalizedDegrees);
  var dflPrecision = opt_fractionDigits || 0;
  var precision = Math.pow(10, dflPrecision);
  var deg = Math.floor(x / 3600);
  var min = Math.floor((x - deg * 3600) / 60);
  var sec = x - deg * 3600 - min * 60;
  sec = Math.ceil(sec * precision) / precision;

  if (sec >= 60) {
    sec = 0;
    min += 1;
  }

  if (min >= 60) {
    min = 0;
    deg += 1;
  }

  return deg + '\u00b0 ' + padNumber(min, 2) + '\u2032 ' + padNumber(sec, 2, dflPrecision) + '\u2033' + (normalizedDegrees == 0 ? '' : ' ' + hemispheres.charAt(normalizedDegrees < 0 ? 1 : 0));
}
/**
 * Transforms the given {@link module:ol/coordinate~Coordinate} to a string
 * using the given string template. The strings `{x}` and `{y}` in the template
 * will be replaced with the first and second coordinate values respectively.
 *
 * Example without specifying the fractional digits:
 *
 *     import {format} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var template = 'Coordinate is ({x}|{y}).';
 *     var out = format(coord, template);
 *     // out is now 'Coordinate is (8|48).'
 *
 * Example explicitly specifying the fractional digits:
 *
 *     import {format} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var template = 'Coordinate is ({x}|{y}).';
 *     var out = format(coord, template, 2);
 *     // out is now 'Coordinate is (7.85|47.98).'
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {string} template A template string with `{x}` and `{y}` placeholders
 *     that will be replaced by first and second coordinate values.
 * @param {number} [opt_fractionDigits] The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {string} Formatted coordinate.
 * @api
 */

function format(coordinate, template, opt_fractionDigits) {
  if (coordinate) {
    return template.replace('{x}', coordinate[0].toFixed(opt_fractionDigits)).replace('{y}', coordinate[1].toFixed(opt_fractionDigits));
  } else {
    return '';
  }
}
/**
 * @param {Coordinate} coordinate1 First coordinate.
 * @param {Coordinate} coordinate2 Second coordinate.
 * @return {boolean} The two coordinates are equal.
 */

function equals(coordinate1, coordinate2) {
  var equals = true;

  for (var i = coordinate1.length - 1; i >= 0; --i) {
    if (coordinate1[i] != coordinate2[i]) {
      equals = false;
      break;
    }
  }

  return equals;
}
/**
 * Rotate `coordinate` by `angle`. `coordinate` is modified in place and
 * returned by the function.
 *
 * Example:
 *
 *     import {rotate} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var rotateRadians = Math.PI / 2; // 90 degrees
 *     rotate(coord, rotateRadians);
 *     // coord is now [-47.983333, 7.85]
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {number} angle Angle in radian.
 * @return {Coordinate} Coordinate.
 * @api
 */

function rotate(coordinate, angle) {
  var cosAngle = Math.cos(angle);
  var sinAngle = Math.sin(angle);
  var x = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
  var y = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
  coordinate[0] = x;
  coordinate[1] = y;
  return coordinate;
}
/**
 * Scale `coordinate` by `scale`. `coordinate` is modified in place and returned
 * by the function.
 *
 * Example:
 *
 *     import {scale as scaleCoordinate} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var scale = 1.2;
 *     scaleCoordinate(coord, scale);
 *     // coord is now [9.42, 57.5799996]
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {number} scale Scale factor.
 * @return {Coordinate} Coordinate.
 */

function scale(coordinate, scale) {
  coordinate[0] *= scale;
  coordinate[1] *= scale;
  return coordinate;
}
/**
 * @param {Coordinate} coord1 First coordinate.
 * @param {Coordinate} coord2 Second coordinate.
 * @return {number} Squared distance between coord1 and coord2.
 */

function squaredDistance(coord1, coord2) {
  var dx = coord1[0] - coord2[0];
  var dy = coord1[1] - coord2[1];
  return dx * dx + dy * dy;
}
/**
 * @param {Coordinate} coord1 First coordinate.
 * @param {Coordinate} coord2 Second coordinate.
 * @return {number} Distance between coord1 and coord2.
 */

function distance(coord1, coord2) {
  return Math.sqrt(squaredDistance(coord1, coord2));
}
/**
 * Calculate the squared distance from a coordinate to a line segment.
 *
 * @param {Coordinate} coordinate Coordinate of the point.
 * @param {Array<Coordinate>} segment Line segment (2
 * coordinates).
 * @return {number} Squared distance from the point to the line segment.
 */

function squaredDistanceToSegment(coordinate, segment) {
  return squaredDistance(coordinate, closestOnSegment(coordinate, segment));
}
/**
 * Format a geographic coordinate with the hemisphere, degrees, minutes, and
 * seconds.
 *
 * Example without specifying fractional digits:
 *
 *     import {toStringHDMS} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var out = toStringHDMS(coord);
 *     // out is now '47° 58′ 60″ N 7° 50′ 60″ E'
 *
 * Example explicitly specifying 1 fractional digit:
 *
 *     import {toStringHDMS} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var out = toStringHDMS(coord, 1);
 *     // out is now '47° 58′ 60.0″ N 7° 50′ 60.0″ E'
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {number} [opt_fractionDigits] The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {string} Hemisphere, degrees, minutes and seconds.
 * @api
 */

function toStringHDMS(coordinate, opt_fractionDigits) {
  if (coordinate) {
    return degreesToStringHDMS('NS', coordinate[1], opt_fractionDigits) + ' ' + degreesToStringHDMS('EW', coordinate[0], opt_fractionDigits);
  } else {
    return '';
  }
}
/**
 * Format a coordinate as a comma delimited string.
 *
 * Example without specifying fractional digits:
 *
 *     import {toStringXY} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var out = toStringXY(coord);
 *     // out is now '8, 48'
 *
 * Example explicitly specifying 1 fractional digit:
 *
 *     import {toStringXY} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var out = toStringXY(coord, 1);
 *     // out is now '7.8, 48.0'
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {number} [opt_fractionDigits] The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {string} XY.
 * @api
 */

function toStringXY(coordinate, opt_fractionDigits) {
  return format(coordinate, '{x}, {y}', opt_fractionDigits);
}
/**
 * Modifies the provided coordinate in-place to be within the real world
 * extent. The lower projection extent boundary is inclusive, the upper one
 * exclusive.
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {Coordinate} The coordinate within the real world extent.
 */

function wrapX(coordinate, projection) {
  if (projection.canWrapX()) {
    var worldWidth = (0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .getWidth */ .dz)(projection.getExtent());
    var worldsAway = getWorldsAway(coordinate, projection, worldWidth);

    if (worldsAway) {
      coordinate[0] -= worldsAway * worldWidth;
    }
  }

  return coordinate;
}
/**
 * @param {Coordinate} coordinate Coordinate.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @param {number} [opt_sourceExtentWidth] Width of the source extent.
 * @return {number} Offset in world widths.
 */

function getWorldsAway(coordinate, projection, opt_sourceExtentWidth) {
  var projectionExtent = projection.getExtent();
  var worldsAway = 0;

  if (projection.canWrapX() && (coordinate[0] < projectionExtent[0] || coordinate[0] > projectionExtent[2])) {
    var sourceExtentWidth = opt_sourceExtentWidth || (0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .getWidth */ .dz)(projectionExtent);
    worldsAway = Math.floor((coordinate[0] - projectionExtent[0]) / sourceExtentWidth);
  }

  return worldsAway;
}

/***/ })

}]);