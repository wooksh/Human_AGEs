"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[258],{

/***/ 9285:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XV": () => (/* binding */ CLASS_UNSELECTABLE),
/* harmony export */   "Xy": () => (/* binding */ cssOpacity),
/* harmony export */   "hN": () => (/* binding */ CLASS_COLLAPSED),
/* harmony export */   "hg": () => (/* binding */ CLASS_CONTROL),
/* harmony export */   "oj": () => (/* binding */ CLASS_HIDDEN),
/* harmony export */   "p": () => (/* binding */ getFontParameters)
/* harmony export */ });
/* unused harmony exports CLASS_SELECTABLE, CLASS_UNSUPPORTED */
/**
 * @module ol/css
 */

/**
 * @typedef {Object} FontParameters
 * @property {string} style Style.
 * @property {string} variant Variant.
 * @property {string} weight Weight.
 * @property {string} size Size.
 * @property {string} lineHeight LineHeight.
 * @property {string} family Family.
 * @property {Array<string>} families Families.
 */

/**
 * The CSS class for hidden feature.
 *
 * @const
 * @type {string}
 */
var CLASS_HIDDEN = 'ol-hidden';
/**
 * The CSS class that we'll give the DOM elements to have them selectable.
 *
 * @const
 * @type {string}
 */

var CLASS_SELECTABLE = 'ol-selectable';
/**
 * The CSS class that we'll give the DOM elements to have them unselectable.
 *
 * @const
 * @type {string}
 */

var CLASS_UNSELECTABLE = 'ol-unselectable';
/**
 * The CSS class for unsupported feature.
 *
 * @const
 * @type {string}
 */

var CLASS_UNSUPPORTED = 'ol-unsupported';
/**
 * The CSS class for controls.
 *
 * @const
 * @type {string}
 */

var CLASS_CONTROL = 'ol-control';
/**
 * The CSS class that we'll give the DOM elements that are collapsed, i.e.
 * to those elements which usually can be expanded.
 *
 * @const
 * @type {string}
 */

var CLASS_COLLAPSED = 'ol-collapsed';
/**
 * From https://stackoverflow.com/questions/10135697/regex-to-parse-any-css-font
 * @type {RegExp}
 */

var fontRegEx = new RegExp(['^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)', '(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)', '(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)', '(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?', '(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))', '(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))', '?\\s*([-,\\"\\\'\\sa-z]+?)\\s*$'].join(''), 'i');
var fontRegExMatchIndex = ['style', 'variant', 'weight', 'size', 'lineHeight', 'family'];
/**
 * Get the list of font families from a font spec.  Note that this doesn't work
 * for font families that have commas in them.
 * @param {string} fontSpec The CSS font property.
 * @return {FontParameters} The font parameters (or null if the input spec is invalid).
 */

var getFontParameters = function (fontSpec) {
  var match = fontSpec.match(fontRegEx);

  if (!match) {
    return null;
  }

  var style =
  /** @type {FontParameters} */
  {
    lineHeight: 'normal',
    size: '1.2em',
    style: 'normal',
    weight: 'normal',
    variant: 'normal'
  };

  for (var i = 0, ii = fontRegExMatchIndex.length; i < ii; ++i) {
    var value = match[i + 1];

    if (value !== undefined) {
      style[fontRegExMatchIndex[i]] = value;
    }
  }

  style.families = style.family.split(/,\s?/);
  return style;
};
/**
 * @param {number} opacity Opacity (0..1).
 * @return {string} CSS opacity.
 */

function cssOpacity(opacity) {
  return opacity === 1 ? '' : String(Math.round(opacity * 100) / 100);
}

/***/ }),

/***/ 9631:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$H": () => (/* binding */ replaceNode),
/* harmony export */   "E4": () => (/* binding */ createCanvasContext2D),
/* harmony export */   "ZF": () => (/* binding */ removeNode),
/* harmony export */   "ep": () => (/* binding */ removeChildren),
/* harmony export */   "hF": () => (/* binding */ replaceChildren)
/* harmony export */ });
/* unused harmony exports outerWidth, outerHeight */
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4242);

/**
 * @module ol/dom
 */
//FIXME Move this function to the canvas module

/**
 * Create an html canvas element and returns its 2d context.
 * @param {number} [opt_width] Canvas width.
 * @param {number} [opt_height] Canvas height.
 * @param {Array<HTMLCanvasElement>} [opt_canvasPool] Canvas pool to take existing canvas from.
 * @param {CanvasRenderingContext2DSettings} [opt_Context2DSettings] CanvasRenderingContext2DSettings
 * @return {CanvasRenderingContext2D} The context.
 */

function createCanvasContext2D(opt_width, opt_height, opt_canvasPool, opt_Context2DSettings) {
  /** @type {HTMLCanvasElement|OffscreenCanvas} */
  var canvas;

  if (opt_canvasPool && opt_canvasPool.length) {
    canvas = opt_canvasPool.shift();
  } else if (_has_js__WEBPACK_IMPORTED_MODULE_0__/* .WORKER_OFFSCREEN_CANVAS */ .Id) {
    canvas = new OffscreenCanvas(opt_width || 300, opt_height || 300);
  } else {
    canvas = document.createElement('canvas');
    canvas.style.all = 'unset';
  }

  if (opt_width) {
    canvas.width = opt_width;
  }

  if (opt_height) {
    canvas.height = opt_height;
  } //FIXME Allow OffscreenCanvasRenderingContext2D as return type


  return (
    /** @type {CanvasRenderingContext2D} */
    canvas.getContext('2d', opt_Context2DSettings)
  );
}
/**
 * Get the current computed width for the given element including margin,
 * padding and border.
 * Equivalent to jQuery's `$(el).outerWidth(true)`.
 * @param {!HTMLElement} element Element.
 * @return {number} The width.
 */

function outerWidth(element) {
  var width = element.offsetWidth;
  var style = getComputedStyle(element);
  width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
  return width;
}
/**
 * Get the current computed height for the given element including margin,
 * padding and border.
 * Equivalent to jQuery's `$(el).outerHeight(true)`.
 * @param {!HTMLElement} element Element.
 * @return {number} The height.
 */

function outerHeight(element) {
  var height = element.offsetHeight;
  var style = getComputedStyle(element);
  height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
  return height;
}
/**
 * @param {Node} newNode Node to replace old node
 * @param {Node} oldNode The node to be replaced
 */

function replaceNode(newNode, oldNode) {
  var parent = oldNode.parentNode;

  if (parent) {
    parent.replaceChild(newNode, oldNode);
  }
}
/**
 * @param {Node} node The node to remove.
 * @return {Node} The node that was removed or null.
 */

function removeNode(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null;
}
/**
 * @param {Node} node The node to remove the children from.
 */

function removeChildren(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
}
/**
 * Transform the children of a parent node so they match the
 * provided list of children.  This function aims to efficiently
 * remove, add, and reorder child nodes while maintaining a simple
 * implementation (it is not guaranteed to minimize DOM operations).
 * @param {Node} node The parent node whose children need reworking.
 * @param {Array<Node>} children The desired children.
 */

function replaceChildren(node, children) {
  var oldChildren = node.childNodes;

  for (var i = 0; true; ++i) {
    var oldChild = oldChildren[i];
    var newChild = children[i]; // check if our work is done

    if (!oldChild && !newChild) {
      break;
    } // check if children match


    if (oldChild === newChild) {
      continue;
    } // check if a new child needs to be added


    if (!oldChild) {
      node.appendChild(newChild);
      continue;
    } // check if an old child needs to be removed


    if (!newChild) {
      node.removeChild(oldChild);
      --i;
      continue;
    } // reorder


    node.insertBefore(newChild, oldChild);
  }
}

/***/ }),

/***/ 9635:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GE": () => (/* binding */ linear),
/* harmony export */   "Vv": () => (/* binding */ easeOut),
/* harmony export */   "YQ": () => (/* binding */ easeIn),
/* harmony export */   "rd": () => (/* binding */ inAndOut)
/* harmony export */ });
/* unused harmony export upAndDown */
/**
 * @module ol/easing
 */

/**
 * Start slow and speed up.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */
function easeIn(t) {
  return Math.pow(t, 3);
}
/**
 * Start fast and slow down.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */

function easeOut(t) {
  return 1 - easeIn(1 - t);
}
/**
 * Start slow, speed up, and then slow down again.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */

function inAndOut(t) {
  return 3 * t * t - 2 * t * t * t;
}
/**
 * Maintain a constant speed over time.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */

function linear(t) {
  return t;
}
/**
 * Start slow, speed up, and at the very end slow down again.  This has the
 * same general behavior as {@link module:ol/easing.inAndOut}, but the final
 * slowdown is delayed.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */

function upAndDown(t) {
  if (t < 0.5) {
    return inAndOut(2 * t);
  } else {
    return 1 - inAndOut(2 * (t - 0.5));
  }
}

/***/ }),

/***/ 5750:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vx": () => (/* binding */ listenOnce),
/* harmony export */   "bN": () => (/* binding */ unlistenByKey),
/* harmony export */   "oL": () => (/* binding */ listen)
/* harmony export */ });
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9800);
/**
 * @module ol/events
 */

/**
 * Key to use with {@link module:ol/Observable~Observable#unByKey}.
 * @typedef {Object} EventsKey
 * @property {ListenerFunction} listener Listener.
 * @property {import("./events/Target.js").EventTargetLike} target Target.
 * @property {string} type Type.
 * @api
 */

/**
 * Listener function. This function is called with an event object as argument.
 * When the function returns `false`, event propagation will stop.
 *
 * @typedef {function((Event|import("./events/Event.js").default)): (void|boolean)} ListenerFunction
 * @api
 */

/**
 * @typedef {Object} ListenerObject
 * @property {ListenerFunction} handleEvent HandleEvent listener function.
 */

/**
 * @typedef {ListenerFunction|ListenerObject} Listener
 */

/**
 * Registers an event listener on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * This function efficiently binds a `listener` to a `this` object, and returns
 * a key for use with {@link module:ol/events.unlistenByKey}.
 *
 * @param {import("./events/Target.js").EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ListenerFunction} listener Listener.
 * @param {Object} [opt_this] Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @param {boolean} [opt_once] If true, add the listener as one-off listener.
 * @return {EventsKey} Unique key for the listener.
 */

function listen(target, type, listener, opt_this, opt_once) {
  if (opt_this && opt_this !== target) {
    listener = listener.bind(opt_this);
  }

  if (opt_once) {
    var originalListener_1 = listener;

    listener = function () {
      target.removeEventListener(type, listener);
      originalListener_1.apply(this, arguments);
    };
  }

  var eventsKey = {
    target: target,
    type: type,
    listener: listener
  };
  target.addEventListener(type, listener);
  return eventsKey;
}
/**
 * Registers a one-off event listener on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * This function efficiently binds a `listener` as self-unregistering listener
 * to a `this` object, and returns a key for use with
 * {@link module:ol/events.unlistenByKey} in case the listener needs to be
 * unregistered before it is called.
 *
 * When {@link module:ol/events.listen} is called with the same arguments after this
 * function, the self-unregistering listener will be turned into a permanent
 * listener.
 *
 * @param {import("./events/Target.js").EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ListenerFunction} listener Listener.
 * @param {Object} [opt_this] Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @return {EventsKey} Key for unlistenByKey.
 */

function listenOnce(target, type, listener, opt_this) {
  return listen(target, type, listener, opt_this, true);
}
/**
 * Unregisters event listeners on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * The argument passed to this function is the key returned from
 * {@link module:ol/events.listen} or {@link module:ol/events.listenOnce}.
 *
 * @param {EventsKey} key The key.
 */

function unlistenByKey(key) {
  if (key && key.target) {
    key.target.removeEventListener(key.type, key.listener);
    (0,_obj_js__WEBPACK_IMPORTED_MODULE_0__/* .clear */ .ZH)(key);
  }
}

/***/ }),

/***/ 7518:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UW": () => (/* binding */ stopPropagation),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export preventDefault */
/**
 * @module ol/events/Event
 */

/**
 * @classdesc
 * Stripped down implementation of the W3C DOM Level 2 Event interface.
 * See https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-interface.
 *
 * This implementation only provides `type` and `target` properties, and
 * `stopPropagation` and `preventDefault` methods. It is meant as base class
 * for higher level events defined in the library, and works with
 * {@link module:ol/events/Target~Target}.
 */
var BaseEvent =
/** @class */
function () {
  /**
   * @param {string} type Type.
   */
  function BaseEvent(type) {
    /**
     * @type {boolean}
     */
    this.propagationStopped;
    /**
     * @type {boolean}
     */

    this.defaultPrevented;
    /**
     * The event type.
     * @type {string}
     * @api
     */

    this.type = type;
    /**
     * The event target.
     * @type {Object}
     * @api
     */

    this.target = null;
  }
  /**
   * Prevent default. This means that no emulated `click`, `singleclick` or `doubleclick` events
   * will be fired.
   * @api
   */


  BaseEvent.prototype.preventDefault = function () {
    this.defaultPrevented = true;
  };
  /**
   * Stop event propagation.
   * @api
   */


  BaseEvent.prototype.stopPropagation = function () {
    this.propagationStopped = true;
  };

  return BaseEvent;
}();
/**
 * @param {Event|import("./Event.js").default} evt Event
 */


function stopPropagation(evt) {
  evt.stopPropagation();
}
/**
 * @param {Event|import("./Event.js").default} evt Event
 */

function preventDefault(evt) {
  evt.preventDefault();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseEvent);

/***/ }),

/***/ 2140:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/events/EventType
 */

/**
 * @enum {string}
 * @const
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /**
   * Generic change event. Triggered when the revision counter is increased.
   * @event module:ol/events/Event~BaseEvent#change
   * @api
   */
  CHANGE: 'change',

  /**
   * Generic error event. Triggered when an error occurs.
   * @event module:ol/events/Event~BaseEvent#error
   * @api
   */
  ERROR: 'error',
  BLUR: 'blur',
  CLEAR: 'clear',
  CONTEXTMENU: 'contextmenu',
  CLICK: 'click',
  DBLCLICK: 'dblclick',
  DRAGENTER: 'dragenter',
  DRAGOVER: 'dragover',
  DROP: 'drop',
  FOCUS: 'focus',
  KEYDOWN: 'keydown',
  KEYPRESS: 'keypress',
  LOAD: 'load',
  RESIZE: 'resize',
  TOUCHMOVE: 'touchmove',
  WHEEL: 'wheel'
});

/***/ }),

/***/ 5553:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/events/KeyCode
 */

/**
 * @enum {number}
 * @const
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
});

/***/ }),

/***/ 9699:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Disposable_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7170);
/* harmony import */ var _Event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3658);
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9800);
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
 * @module ol/events/Target
 */






/**
 * @typedef {EventTarget|Target} EventTargetLike
 */

/**
 * @classdesc
 * A simplified implementation of the W3C DOM Level 2 EventTarget interface.
 * See https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget.
 *
 * There are two important simplifications compared to the specification:
 *
 * 1. The handling of `useCapture` in `addEventListener` and
 *    `removeEventListener`. There is no real capture model.
 * 2. The handling of `stopPropagation` and `preventDefault` on `dispatchEvent`.
 *    There is no event target hierarchy. When a listener calls
 *    `stopPropagation` or `preventDefault` on an event object, it means that no
 *    more listeners after this one will be called. Same as when the listener
 *    returns false.
 */

var Target =
/** @class */
function (_super) {
  __extends(Target, _super);
  /**
   * @param {*} [opt_target] Default event target for dispatched events.
   */


  function Target(opt_target) {
    var _this = _super.call(this) || this;
    /**
     * @private
     * @type {*}
     */


    _this.eventTarget_ = opt_target;
    /**
     * @private
     * @type {Object<string, number>}
     */

    _this.pendingRemovals_ = null;
    /**
     * @private
     * @type {Object<string, number>}
     */

    _this.dispatching_ = null;
    /**
     * @private
     * @type {Object<string, Array<import("../events.js").Listener>>}
     */

    _this.listeners_ = null;
    return _this;
  }
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */


  Target.prototype.addEventListener = function (type, listener) {
    if (!type || !listener) {
      return;
    }

    var listeners = this.listeners_ || (this.listeners_ = {});
    var listenersForType = listeners[type] || (listeners[type] = []);

    if (listenersForType.indexOf(listener) === -1) {
      listenersForType.push(listener);
    }
  };
  /**
   * Dispatches an event and calls all listeners listening for events
   * of this type. The event parameter can either be a string or an
   * Object with a `type` property.
   *
   * @param {import("./Event.js").default|string} event Event object.
   * @return {boolean|undefined} `false` if anyone called preventDefault on the
   *     event object or if any of the listeners returned false.
   * @api
   */


  Target.prototype.dispatchEvent = function (event) {
    /** @type {import("./Event.js").default|Event} */
    var evt = typeof event === 'string' ? new _Event_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP(event) : event;
    var type = evt.type;

    if (!evt.target) {
      evt.target = this.eventTarget_ || this;
    }

    var listeners = this.listeners_ && this.listeners_[type];
    var propagate;

    if (listeners) {
      var dispatching = this.dispatching_ || (this.dispatching_ = {});
      var pendingRemovals = this.pendingRemovals_ || (this.pendingRemovals_ = {});

      if (!(type in dispatching)) {
        dispatching[type] = 0;
        pendingRemovals[type] = 0;
      }

      ++dispatching[type];

      for (var i = 0, ii = listeners.length; i < ii; ++i) {
        if ('handleEvent' in listeners[i]) {
          propagate =
          /** @type {import("../events.js").ListenerObject} */
          listeners[i].handleEvent(evt);
        } else {
          propagate =
          /** @type {import("../events.js").ListenerFunction} */
          listeners[i].call(this, evt);
        }

        if (propagate === false || evt.propagationStopped) {
          propagate = false;
          break;
        }
      }

      --dispatching[type];

      if (dispatching[type] === 0) {
        var pr = pendingRemovals[type];
        delete pendingRemovals[type];

        while (pr--) {
          this.removeEventListener(type, _functions_js__WEBPACK_IMPORTED_MODULE_1__/* .VOID */ .Zn);
        }

        delete dispatching[type];
      }

      return propagate;
    }
  };
  /**
   * Clean up.
   */


  Target.prototype.disposeInternal = function () {
    this.listeners_ && (0,_obj_js__WEBPACK_IMPORTED_MODULE_2__/* .clear */ .ZH)(this.listeners_);
  };
  /**
   * Get the listeners for a specified event type. Listeners are returned in the
   * order that they will be called in.
   *
   * @param {string} type Type.
   * @return {Array<import("../events.js").Listener>|undefined} Listeners.
   */


  Target.prototype.getListeners = function (type) {
    return this.listeners_ && this.listeners_[type] || undefined;
  };
  /**
   * @param {string} [opt_type] Type. If not provided,
   *     `true` will be returned if this event target has any listeners.
   * @return {boolean} Has listeners.
   */


  Target.prototype.hasListener = function (opt_type) {
    if (!this.listeners_) {
      return false;
    }

    return opt_type ? opt_type in this.listeners_ : Object.keys(this.listeners_).length > 0;
  };
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */


  Target.prototype.removeEventListener = function (type, listener) {
    var listeners = this.listeners_ && this.listeners_[type];

    if (listeners) {
      var index = listeners.indexOf(listener);

      if (index !== -1) {
        if (this.pendingRemovals_ && type in this.pendingRemovals_) {
          // make listener a no-op, and remove later in #dispatchEvent()
          listeners[index] = _functions_js__WEBPACK_IMPORTED_MODULE_1__/* .VOID */ .Zn;
          ++this.pendingRemovals_[type];
        } else {
          listeners.splice(index, 1);

          if (listeners.length === 0) {
            delete this.listeners_[type];
          }
        }
      }
    }
  };

  return Target;
}(_Disposable_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Target);

/***/ }),

/***/ 8970:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$6": () => (/* binding */ all),
/* harmony export */   "Bx": () => (/* binding */ always),
/* harmony export */   "Fi": () => (/* binding */ never),
/* harmony export */   "Kf": () => (/* binding */ singleClick),
/* harmony export */   "OK": () => (/* binding */ doubleClick),
/* harmony export */   "QL": () => (/* binding */ mouseOnly),
/* harmony export */   "TN": () => (/* binding */ targetNotEditable),
/* harmony export */   "Xp": () => (/* binding */ primaryAction),
/* harmony export */   "aj": () => (/* binding */ altShiftKeysOnly),
/* harmony export */   "rM": () => (/* binding */ noModifierKeys),
/* harmony export */   "v8": () => (/* binding */ mouseActionButton),
/* harmony export */   "vY": () => (/* binding */ shiftKeyOnly),
/* harmony export */   "yZ": () => (/* binding */ focusWithTabindex)
/* harmony export */ });
/* unused harmony exports altKeyOnly, focus, click, pointerMove, platformModifierKeyOnly, touchOnly, penOnly */
/* harmony import */ var _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3998);
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3658);
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4242);
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4548);
/**
 * @module ol/events/condition
 */




/**
 * A function that takes an {@link module:ol/MapBrowserEvent} and returns a
 * `{boolean}`. If the condition is met, true should be returned.
 *
 * @typedef {function(this: ?, import("../MapBrowserEvent.js").default): boolean} Condition
 */

/**
 * Creates a condition function that passes when all provided conditions pass.
 * @param {...Condition} var_args Conditions to check.
 * @return {Condition} Condition function.
 */

function all(var_args) {
  var conditions = arguments;
  /**
   * @param {import("../MapBrowserEvent.js").default} event Event.
   * @return {boolean} All conditions passed.
   */

  return function (event) {
    var pass = true;

    for (var i = 0, ii = conditions.length; i < ii; ++i) {
      pass = pass && conditions[i](event);

      if (!pass) {
        break;
      }
    }

    return pass;
  };
}
/**
 * Return `true` if only the alt-key is pressed, `false` otherwise (e.g. when
 * additionally the shift-key is pressed).
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if only the alt key is pressed.
 * @api
 */

var altKeyOnly = function (mapBrowserEvent) {
  var originalEvent =
  /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
  mapBrowserEvent.originalEvent;
  return originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && !originalEvent.shiftKey;
};
/**
 * Return `true` if only the alt-key and shift-key is pressed, `false` otherwise
 * (e.g. when additionally the platform-modifier-key is pressed).
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if only the alt and shift keys are pressed.
 * @api
 */

var altShiftKeysOnly = function (mapBrowserEvent) {
  var originalEvent =
  /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
  mapBrowserEvent.originalEvent;
  return originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && originalEvent.shiftKey;
};
/**
 * Return `true` if the map has the focus. This condition requires a map target
 * element with a `tabindex` attribute, e.g. `<div id="map" tabindex="1">`.
 *
 * @param {import("../MapBrowserEvent.js").default} event Map browser event.
 * @return {boolean} The map has the focus.
 * @api
 */

var focus = function (event) {
  return event.target.getTargetElement().contains(document.activeElement);
};
/**
 * Return `true` if the map has the focus or no 'tabindex' attribute set.
 *
 * @param {import("../MapBrowserEvent.js").default} event Map browser event.
 * @return {boolean} The map container has the focus or no 'tabindex' attribute.
 */

var focusWithTabindex = function (event) {
  return event.map.getTargetElement().hasAttribute('tabindex') ? focus(event) : true;
};
/**
 * Return always true.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True.
 * @api
 */

var always = _functions_js__WEBPACK_IMPORTED_MODULE_0__/* .TRUE */ .uX;
/**
 * Return `true` if the event is a `click` event, `false` otherwise.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if the event is a map `click` event.
 * @api
 */

var click = function (mapBrowserEvent) {
  return mapBrowserEvent.type == MapBrowserEventType.CLICK;
};
/**
 * Return `true` if the event has an "action"-producing mouse button.
 *
 * By definition, this includes left-click on windows/linux, and left-click
 * without the ctrl key on Macs.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} The result.
 */

var mouseActionButton = function (mapBrowserEvent) {
  var originalEvent =
  /** @type {MouseEvent} */
  mapBrowserEvent.originalEvent;
  return originalEvent.button == 0 && !(_has_js__WEBPACK_IMPORTED_MODULE_1__/* .WEBKIT */ .G$ && _has_js__WEBPACK_IMPORTED_MODULE_1__/* .MAC */ .tK && originalEvent.ctrlKey);
};
/**
 * Return always false.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} False.
 * @api
 */

var never = _functions_js__WEBPACK_IMPORTED_MODULE_0__/* .FALSE */ .Dv;
/**
 * Return `true` if the browser event is a `pointermove` event, `false`
 * otherwise.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if the browser event is a `pointermove` event.
 * @api
 */

var pointerMove = function (mapBrowserEvent) {
  return mapBrowserEvent.type == 'pointermove';
};
/**
 * Return `true` if the event is a map `singleclick` event, `false` otherwise.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if the event is a map `singleclick` event.
 * @api
 */

var singleClick = function (mapBrowserEvent) {
  return mapBrowserEvent.type == _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].SINGLECLICK */ .Z.SINGLECLICK;
};
/**
 * Return `true` if the event is a map `dblclick` event, `false` otherwise.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if the event is a map `dblclick` event.
 * @api
 */

var doubleClick = function (mapBrowserEvent) {
  return mapBrowserEvent.type == _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].DBLCLICK */ .Z.DBLCLICK;
};
/**
 * Return `true` if no modifier key (alt-, shift- or platform-modifier-key) is
 * pressed.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True only if there no modifier keys are pressed.
 * @api
 */

var noModifierKeys = function (mapBrowserEvent) {
  var originalEvent =
  /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
  mapBrowserEvent.originalEvent;
  return !originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && !originalEvent.shiftKey;
};
/**
 * Return `true` if only the platform-modifier-key (the meta-key on Mac,
 * ctrl-key otherwise) is pressed, `false` otherwise (e.g. when additionally
 * the shift-key is pressed).
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if only the platform modifier key is pressed.
 * @api
 */

var platformModifierKeyOnly = function (mapBrowserEvent) {
  var originalEvent =
  /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
  mapBrowserEvent.originalEvent;
  return !originalEvent.altKey && (MAC ? originalEvent.metaKey : originalEvent.ctrlKey) && !originalEvent.shiftKey;
};
/**
 * Return `true` if only the shift-key is pressed, `false` otherwise (e.g. when
 * additionally the alt-key is pressed).
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if only the shift key is pressed.
 * @api
 */

var shiftKeyOnly = function (mapBrowserEvent) {
  var originalEvent =
  /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
  mapBrowserEvent.originalEvent;
  return !originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && originalEvent.shiftKey;
};
/**
 * Return `true` if the target element is not editable, i.e. not a `<input>`-,
 * `<select>`- or `<textarea>`-element, `false` otherwise.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True only if the target element is not editable.
 * @api
 */

var targetNotEditable = function (mapBrowserEvent) {
  var originalEvent =
  /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
  mapBrowserEvent.originalEvent;
  var tagName =
  /** @type {Element} */
  originalEvent.target.tagName;
  return tagName !== 'INPUT' && tagName !== 'SELECT' && tagName !== 'TEXTAREA';
};
/**
 * Return `true` if the event originates from a mouse device.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if the event originates from a mouse device.
 * @api
 */

var mouseOnly = function (mapBrowserEvent) {
  var pointerEvent =
  /** @type {import("../MapBrowserEvent").default} */
  mapBrowserEvent.originalEvent;
  (0,_asserts_js__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h)(pointerEvent !== undefined, 56); // mapBrowserEvent must originate from a pointer event
  // see https://www.w3.org/TR/pointerevents/#widl-PointerEvent-pointerType

  return pointerEvent.pointerType == 'mouse';
};
/**
 * Return `true` if the event originates from a touchable device.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if the event originates from a touchable device.
 * @api
 */

var touchOnly = function (mapBrowserEvent) {
  var pointerEvt =
  /** @type {import("../MapBrowserEvent").default} */
  mapBrowserEvent.originalEvent;
  assert(pointerEvt !== undefined, 56); // mapBrowserEvent must originate from a pointer event
  // see https://www.w3.org/TR/pointerevents/#widl-PointerEvent-pointerType

  return pointerEvt.pointerType === 'touch';
};
/**
 * Return `true` if the event originates from a digital pen.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if the event originates from a digital pen.
 * @api
 */

var penOnly = function (mapBrowserEvent) {
  var pointerEvt =
  /** @type {import("../MapBrowserEvent").default} */
  mapBrowserEvent.originalEvent;
  assert(pointerEvt !== undefined, 56); // mapBrowserEvent must originate from a pointer event
  // see https://www.w3.org/TR/pointerevents/#widl-PointerEvent-pointerType

  return pointerEvt.pointerType === 'pen';
};
/**
 * Return `true` if the event originates from a primary pointer in
 * contact with the surface or if the left mouse button is pressed.
 * See https://www.w3.org/TR/pointerevents/#button-states.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if the event originates from a primary pointer.
 * @api
 */

var primaryAction = function (mapBrowserEvent) {
  var pointerEvent =
  /** @type {import("../MapBrowserEvent").default} */
  mapBrowserEvent.originalEvent;
  (0,_asserts_js__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h)(pointerEvent !== undefined, 56); // mapBrowserEvent must originate from a pointer event

  return pointerEvent.isPrimary && pointerEvent.button === 0;
};

/***/ }),

/***/ 1046:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cf": () => (/* binding */ wrapX),
/* harmony export */   "Cr": () => (/* binding */ getHeight),
/* harmony export */   "EO": () => (/* binding */ returnOrUpdate),
/* harmony export */   "Ed": () => (/* binding */ getIntersection),
/* harmony export */   "GN": () => (/* binding */ createOrUpdateFromFlatCoordinates),
/* harmony export */   "H6": () => (/* binding */ forEachCorner),
/* harmony export */   "HK": () => (/* binding */ createOrUpdateFromCoordinate),
/* harmony export */   "I7": () => (/* binding */ intersectsSegment),
/* harmony export */   "Ne": () => (/* binding */ applyTransform),
/* harmony export */   "T9": () => (/* binding */ createOrUpdate),
/* harmony export */   "Wj": () => (/* binding */ extendCoordinate),
/* harmony export */   "Xv": () => (/* binding */ getTopRight),
/* harmony export */   "YN": () => (/* binding */ createOrUpdateEmpty),
/* harmony export */   "b8": () => (/* binding */ containsCoordinate),
/* harmony export */   "bg": () => (/* binding */ getArea),
/* harmony export */   "d9": () => (/* binding */ clone),
/* harmony export */   "dz": () => (/* binding */ getWidth),
/* harmony export */   "f3": () => (/* binding */ buffer),
/* harmony export */   "fS": () => (/* binding */ equals),
/* harmony export */   "g0": () => (/* binding */ getCorner),
/* harmony export */   "hC": () => (/* binding */ getBottomLeft),
/* harmony export */   "hI": () => (/* binding */ boundingExtent),
/* harmony export */   "jE": () => (/* binding */ containsXY),
/* harmony export */   "kK": () => (/* binding */ intersects),
/* harmony export */   "l7": () => (/* binding */ extend),
/* harmony export */   "lJ": () => (/* binding */ createEmpty),
/* harmony export */   "p8": () => (/* binding */ getForViewAndSize),
/* harmony export */   "pX": () => (/* binding */ coordinateRelationship),
/* harmony export */   "qP": () => (/* binding */ extendFlatCoordinates),
/* harmony export */   "qf": () => (/* binding */ closestSquaredDistanceXY),
/* harmony export */   "qg": () => (/* binding */ getCenter),
/* harmony export */   "r4": () => (/* binding */ containsExtent),
/* harmony export */   "rL": () => (/* binding */ getTopLeft),
/* harmony export */   "w$": () => (/* binding */ getBottomRight),
/* harmony export */   "xb": () => (/* binding */ isEmpty)
/* harmony export */ });
/* unused harmony exports createOrUpdateFromCoordinates, createOrUpdateFromRings, approximatelyEquals, extendCoordinates, extendRings, extendXY, getEnlargedArea, getIntersectionArea, getMargin, getSize, scaleFromCenter */
/* harmony import */ var _extent_Corner_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4778);
/* harmony import */ var _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8079);
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4548);
/**
 * @module ol/extent
 */



/**
 * An array of numbers representing an extent: `[minx, miny, maxx, maxy]`.
 * @typedef {Array<number>} Extent
 * @api
 */

/**
 * Build an extent that includes all given coordinates.
 *
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @return {Extent} Bounding extent.
 * @api
 */

function boundingExtent(coordinates) {
  var extent = createEmpty();

  for (var i = 0, ii = coordinates.length; i < ii; ++i) {
    extendCoordinate(extent, coordinates[i]);
  }

  return extent;
}
/**
 * @param {Array<number>} xs Xs.
 * @param {Array<number>} ys Ys.
 * @param {Extent} [opt_extent] Destination extent.
 * @private
 * @return {Extent} Extent.
 */

function _boundingExtentXYs(xs, ys, opt_extent) {
  var minX = Math.min.apply(null, xs);
  var minY = Math.min.apply(null, ys);
  var maxX = Math.max.apply(null, xs);
  var maxY = Math.max.apply(null, ys);
  return createOrUpdate(minX, minY, maxX, maxY, opt_extent);
}
/**
 * Return extent increased by the provided value.
 * @param {Extent} extent Extent.
 * @param {number} value The amount by which the extent should be buffered.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 * @api
 */


function buffer(extent, value, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = extent[0] - value;
    opt_extent[1] = extent[1] - value;
    opt_extent[2] = extent[2] + value;
    opt_extent[3] = extent[3] + value;
    return opt_extent;
  } else {
    return [extent[0] - value, extent[1] - value, extent[2] + value, extent[3] + value];
  }
}
/**
 * Creates a clone of an extent.
 *
 * @param {Extent} extent Extent to clone.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} The clone.
 */

function clone(extent, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = extent[0];
    opt_extent[1] = extent[1];
    opt_extent[2] = extent[2];
    opt_extent[3] = extent[3];
    return opt_extent;
  } else {
    return extent.slice();
  }
}
/**
 * @param {Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {number} Closest squared distance.
 */

function closestSquaredDistanceXY(extent, x, y) {
  var dx, dy;

  if (x < extent[0]) {
    dx = extent[0] - x;
  } else if (extent[2] < x) {
    dx = x - extent[2];
  } else {
    dx = 0;
  }

  if (y < extent[1]) {
    dy = extent[1] - y;
  } else if (extent[3] < y) {
    dy = y - extent[3];
  } else {
    dy = 0;
  }

  return dx * dx + dy * dy;
}
/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {Extent} extent Extent.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @return {boolean} The coordinate is contained in the extent.
 * @api
 */

function containsCoordinate(extent, coordinate) {
  return containsXY(extent, coordinate[0], coordinate[1]);
}
/**
 * Check if one extent contains another.
 *
 * An extent is deemed contained if it lies completely within the other extent,
 * including if they share one or more edges.
 *
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {boolean} The second extent is contained by or on the edge of the
 *     first.
 * @api
 */

function containsExtent(extent1, extent2) {
  return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
}
/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {Extent} extent Extent.
 * @param {number} x X coordinate.
 * @param {number} y Y coordinate.
 * @return {boolean} The x, y values are contained in the extent.
 * @api
 */

function containsXY(extent, x, y) {
  return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
}
/**
 * Get the relationship between a coordinate and extent.
 * @param {Extent} extent The extent.
 * @param {import("./coordinate.js").Coordinate} coordinate The coordinate.
 * @return {import("./extent/Relationship.js").default} The relationship (bitwise compare with
 *     import("./extent/Relationship.js").Relationship).
 */

function coordinateRelationship(extent, coordinate) {
  var minX = extent[0];
  var minY = extent[1];
  var maxX = extent[2];
  var maxY = extent[3];
  var x = coordinate[0];
  var y = coordinate[1];
  var relationship = _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].UNKNOWN */ .Z.UNKNOWN;

  if (x < minX) {
    relationship = relationship | _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].LEFT */ .Z.LEFT;
  } else if (x > maxX) {
    relationship = relationship | _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].RIGHT */ .Z.RIGHT;
  }

  if (y < minY) {
    relationship = relationship | _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].BELOW */ .Z.BELOW;
  } else if (y > maxY) {
    relationship = relationship | _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].ABOVE */ .Z.ABOVE;
  }

  if (relationship === _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].UNKNOWN */ .Z.UNKNOWN) {
    relationship = _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].INTERSECTING */ .Z.INTERSECTING;
  }

  return relationship;
}
/**
 * Create an empty extent.
 * @return {Extent} Empty extent.
 * @api
 */

function createEmpty() {
  return [Infinity, Infinity, -Infinity, -Infinity];
}
/**
 * Create a new extent or update the provided extent.
 * @param {number} minX Minimum X.
 * @param {number} minY Minimum Y.
 * @param {number} maxX Maximum X.
 * @param {number} maxY Maximum Y.
 * @param {Extent} [opt_extent] Destination extent.
 * @return {Extent} Extent.
 */

function createOrUpdate(minX, minY, maxX, maxY, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = minX;
    opt_extent[1] = minY;
    opt_extent[2] = maxX;
    opt_extent[3] = maxY;
    return opt_extent;
  } else {
    return [minX, minY, maxX, maxY];
  }
}
/**
 * Create a new empty extent or make the provided one empty.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 */

function createOrUpdateEmpty(opt_extent) {
  return createOrUpdate(Infinity, Infinity, -Infinity, -Infinity, opt_extent);
}
/**
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 */

function createOrUpdateFromCoordinate(coordinate, opt_extent) {
  var x = coordinate[0];
  var y = coordinate[1];
  return createOrUpdate(x, y, x, y, opt_extent);
}
/**
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 */

function createOrUpdateFromCoordinates(coordinates, opt_extent) {
  var extent = createOrUpdateEmpty(opt_extent);
  return extendCoordinates(extent, coordinates);
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 */

function createOrUpdateFromFlatCoordinates(flatCoordinates, offset, end, stride, opt_extent) {
  var extent = createOrUpdateEmpty(opt_extent);
  return extendFlatCoordinates(extent, flatCoordinates, offset, end, stride);
}
/**
 * @param {Array<Array<import("./coordinate.js").Coordinate>>} rings Rings.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 */

function createOrUpdateFromRings(rings, opt_extent) {
  var extent = createOrUpdateEmpty(opt_extent);
  return extendRings(extent, rings);
}
/**
 * Determine if two extents are equivalent.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {boolean} The two extents are equivalent.
 * @api
 */

function equals(extent1, extent2) {
  return extent1[0] == extent2[0] && extent1[2] == extent2[2] && extent1[1] == extent2[1] && extent1[3] == extent2[3];
}
/**
 * Determine if two extents are approximately equivalent.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @param {number} tolerance Tolerance in extent coordinate units.
 * @return {boolean} The two extents differ by less than the tolerance.
 */

function approximatelyEquals(extent1, extent2, tolerance) {
  return Math.abs(extent1[0] - extent2[0]) < tolerance && Math.abs(extent1[2] - extent2[2]) < tolerance && Math.abs(extent1[1] - extent2[1]) < tolerance && Math.abs(extent1[3] - extent2[3]) < tolerance;
}
/**
 * Modify an extent to include another extent.
 * @param {Extent} extent1 The extent to be modified.
 * @param {Extent} extent2 The extent that will be included in the first.
 * @return {Extent} A reference to the first (extended) extent.
 * @api
 */

function extend(extent1, extent2) {
  if (extent2[0] < extent1[0]) {
    extent1[0] = extent2[0];
  }

  if (extent2[2] > extent1[2]) {
    extent1[2] = extent2[2];
  }

  if (extent2[1] < extent1[1]) {
    extent1[1] = extent2[1];
  }

  if (extent2[3] > extent1[3]) {
    extent1[3] = extent2[3];
  }

  return extent1;
}
/**
 * @param {Extent} extent Extent.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 */

function extendCoordinate(extent, coordinate) {
  if (coordinate[0] < extent[0]) {
    extent[0] = coordinate[0];
  }

  if (coordinate[0] > extent[2]) {
    extent[2] = coordinate[0];
  }

  if (coordinate[1] < extent[1]) {
    extent[1] = coordinate[1];
  }

  if (coordinate[1] > extent[3]) {
    extent[3] = coordinate[1];
  }
}
/**
 * @param {Extent} extent Extent.
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @return {Extent} Extent.
 */

function extendCoordinates(extent, coordinates) {
  for (var i = 0, ii = coordinates.length; i < ii; ++i) {
    extendCoordinate(extent, coordinates[i]);
  }

  return extent;
}
/**
 * @param {Extent} extent Extent.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {Extent} Extent.
 */

function extendFlatCoordinates(extent, flatCoordinates, offset, end, stride) {
  for (; offset < end; offset += stride) {
    extendXY(extent, flatCoordinates[offset], flatCoordinates[offset + 1]);
  }

  return extent;
}
/**
 * @param {Extent} extent Extent.
 * @param {Array<Array<import("./coordinate.js").Coordinate>>} rings Rings.
 * @return {Extent} Extent.
 */

function extendRings(extent, rings) {
  for (var i = 0, ii = rings.length; i < ii; ++i) {
    extendCoordinates(extent, rings[i]);
  }

  return extent;
}
/**
 * @param {Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 */

function extendXY(extent, x, y) {
  extent[0] = Math.min(extent[0], x);
  extent[1] = Math.min(extent[1], y);
  extent[2] = Math.max(extent[2], x);
  extent[3] = Math.max(extent[3], y);
}
/**
 * This function calls `callback` for each corner of the extent. If the
 * callback returns a truthy value the function returns that value
 * immediately. Otherwise the function returns `false`.
 * @param {Extent} extent Extent.
 * @param {function(import("./coordinate.js").Coordinate): S} callback Callback.
 * @return {S|boolean} Value.
 * @template S
 */

function forEachCorner(extent, callback) {
  var val;
  val = callback(getBottomLeft(extent));

  if (val) {
    return val;
  }

  val = callback(getBottomRight(extent));

  if (val) {
    return val;
  }

  val = callback(getTopRight(extent));

  if (val) {
    return val;
  }

  val = callback(getTopLeft(extent));

  if (val) {
    return val;
  }

  return false;
}
/**
 * Get the size of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Area.
 * @api
 */

function getArea(extent) {
  var area = 0;

  if (!isEmpty(extent)) {
    area = getWidth(extent) * getHeight(extent);
  }

  return area;
}
/**
 * Get the bottom left coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Bottom left coordinate.
 * @api
 */

function getBottomLeft(extent) {
  return [extent[0], extent[1]];
}
/**
 * Get the bottom right coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Bottom right coordinate.
 * @api
 */

function getBottomRight(extent) {
  return [extent[2], extent[1]];
}
/**
 * Get the center coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Center.
 * @api
 */

function getCenter(extent) {
  return [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
}
/**
 * Get a corner coordinate of an extent.
 * @param {Extent} extent Extent.
 * @param {import("./extent/Corner.js").default} corner Corner.
 * @return {import("./coordinate.js").Coordinate} Corner coordinate.
 */

function getCorner(extent, corner) {
  var coordinate;

  if (corner === _extent_Corner_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].BOTTOM_LEFT */ .Z.BOTTOM_LEFT) {
    coordinate = getBottomLeft(extent);
  } else if (corner === _extent_Corner_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].BOTTOM_RIGHT */ .Z.BOTTOM_RIGHT) {
    coordinate = getBottomRight(extent);
  } else if (corner === _extent_Corner_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].TOP_LEFT */ .Z.TOP_LEFT) {
    coordinate = getTopLeft(extent);
  } else if (corner === _extent_Corner_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].TOP_RIGHT */ .Z.TOP_RIGHT) {
    coordinate = getTopRight(extent);
  } else {
    (0,_asserts_js__WEBPACK_IMPORTED_MODULE_2__/* .assert */ .h)(false, 13); // Invalid corner
  }

  return coordinate;
}
/**
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {number} Enlarged area.
 */

function getEnlargedArea(extent1, extent2) {
  var minX = Math.min(extent1[0], extent2[0]);
  var minY = Math.min(extent1[1], extent2[1]);
  var maxX = Math.max(extent1[2], extent2[2]);
  var maxY = Math.max(extent1[3], extent2[3]);
  return (maxX - minX) * (maxY - minY);
}
/**
 * @param {import("./coordinate.js").Coordinate} center Center.
 * @param {number} resolution Resolution.
 * @param {number} rotation Rotation.
 * @param {import("./size.js").Size} size Size.
 * @param {Extent} [opt_extent] Destination extent.
 * @return {Extent} Extent.
 */

function getForViewAndSize(center, resolution, rotation, size, opt_extent) {
  var dx = resolution * size[0] / 2;
  var dy = resolution * size[1] / 2;
  var cosRotation = Math.cos(rotation);
  var sinRotation = Math.sin(rotation);
  var xCos = dx * cosRotation;
  var xSin = dx * sinRotation;
  var yCos = dy * cosRotation;
  var ySin = dy * sinRotation;
  var x = center[0];
  var y = center[1];
  var x0 = x - xCos + ySin;
  var x1 = x - xCos - ySin;
  var x2 = x + xCos - ySin;
  var x3 = x + xCos + ySin;
  var y0 = y - xSin - yCos;
  var y1 = y - xSin + yCos;
  var y2 = y + xSin + yCos;
  var y3 = y + xSin - yCos;
  return createOrUpdate(Math.min(x0, x1, x2, x3), Math.min(y0, y1, y2, y3), Math.max(x0, x1, x2, x3), Math.max(y0, y1, y2, y3), opt_extent);
}
/**
 * Get the height of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Height.
 * @api
 */

function getHeight(extent) {
  return extent[3] - extent[1];
}
/**
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {number} Intersection area.
 */

function getIntersectionArea(extent1, extent2) {
  var intersection = getIntersection(extent1, extent2);
  return getArea(intersection);
}
/**
 * Get the intersection of two extents.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @param {Extent} [opt_extent] Optional extent to populate with intersection.
 * @return {Extent} Intersecting extent.
 * @api
 */

function getIntersection(extent1, extent2, opt_extent) {
  var intersection = opt_extent ? opt_extent : createEmpty();

  if (intersects(extent1, extent2)) {
    if (extent1[0] > extent2[0]) {
      intersection[0] = extent1[0];
    } else {
      intersection[0] = extent2[0];
    }

    if (extent1[1] > extent2[1]) {
      intersection[1] = extent1[1];
    } else {
      intersection[1] = extent2[1];
    }

    if (extent1[2] < extent2[2]) {
      intersection[2] = extent1[2];
    } else {
      intersection[2] = extent2[2];
    }

    if (extent1[3] < extent2[3]) {
      intersection[3] = extent1[3];
    } else {
      intersection[3] = extent2[3];
    }
  } else {
    createOrUpdateEmpty(intersection);
  }

  return intersection;
}
/**
 * @param {Extent} extent Extent.
 * @return {number} Margin.
 */

function getMargin(extent) {
  return getWidth(extent) + getHeight(extent);
}
/**
 * Get the size (width, height) of an extent.
 * @param {Extent} extent The extent.
 * @return {import("./size.js").Size} The extent size.
 * @api
 */

function getSize(extent) {
  return [extent[2] - extent[0], extent[3] - extent[1]];
}
/**
 * Get the top left coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Top left coordinate.
 * @api
 */

function getTopLeft(extent) {
  return [extent[0], extent[3]];
}
/**
 * Get the top right coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Top right coordinate.
 * @api
 */

function getTopRight(extent) {
  return [extent[2], extent[3]];
}
/**
 * Get the width of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Width.
 * @api
 */

function getWidth(extent) {
  return extent[2] - extent[0];
}
/**
 * Determine if one extent intersects another.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent.
 * @return {boolean} The two extents intersect.
 * @api
 */

function intersects(extent1, extent2) {
  return extent1[0] <= extent2[2] && extent1[2] >= extent2[0] && extent1[1] <= extent2[3] && extent1[3] >= extent2[1];
}
/**
 * Determine if an extent is empty.
 * @param {Extent} extent Extent.
 * @return {boolean} Is empty.
 * @api
 */

function isEmpty(extent) {
  return extent[2] < extent[0] || extent[3] < extent[1];
}
/**
 * @param {Extent} extent Extent.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 */

function returnOrUpdate(extent, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = extent[0];
    opt_extent[1] = extent[1];
    opt_extent[2] = extent[2];
    opt_extent[3] = extent[3];
    return opt_extent;
  } else {
    return extent;
  }
}
/**
 * @param {Extent} extent Extent.
 * @param {number} value Value.
 */

function scaleFromCenter(extent, value) {
  var deltaX = (extent[2] - extent[0]) / 2 * (value - 1);
  var deltaY = (extent[3] - extent[1]) / 2 * (value - 1);
  extent[0] -= deltaX;
  extent[2] += deltaX;
  extent[1] -= deltaY;
  extent[3] += deltaY;
}
/**
 * Determine if the segment between two coordinates intersects (crosses,
 * touches, or is contained by) the provided extent.
 * @param {Extent} extent The extent.
 * @param {import("./coordinate.js").Coordinate} start Segment start coordinate.
 * @param {import("./coordinate.js").Coordinate} end Segment end coordinate.
 * @return {boolean} The segment intersects the extent.
 */

function intersectsSegment(extent, start, end) {
  var intersects = false;
  var startRel = coordinateRelationship(extent, start);
  var endRel = coordinateRelationship(extent, end);

  if (startRel === _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].INTERSECTING */ .Z.INTERSECTING || endRel === _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].INTERSECTING */ .Z.INTERSECTING) {
    intersects = true;
  } else {
    var minX = extent[0];
    var minY = extent[1];
    var maxX = extent[2];
    var maxY = extent[3];
    var startX = start[0];
    var startY = start[1];
    var endX = end[0];
    var endY = end[1];
    var slope = (endY - startY) / (endX - startX);
    var x = void 0,
        y = void 0;

    if (!!(endRel & _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].ABOVE */ .Z.ABOVE) && !(startRel & _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].ABOVE */ .Z.ABOVE)) {
      // potentially intersects top
      x = endX - (endY - maxY) / slope;
      intersects = x >= minX && x <= maxX;
    }

    if (!intersects && !!(endRel & _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].RIGHT */ .Z.RIGHT) && !(startRel & _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].RIGHT */ .Z.RIGHT)) {
      // potentially intersects right
      y = endY - (endX - maxX) * slope;
      intersects = y >= minY && y <= maxY;
    }

    if (!intersects && !!(endRel & _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].BELOW */ .Z.BELOW) && !(startRel & _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].BELOW */ .Z.BELOW)) {
      // potentially intersects bottom
      x = endX - (endY - minY) / slope;
      intersects = x >= minX && x <= maxX;
    }

    if (!intersects && !!(endRel & _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].LEFT */ .Z.LEFT) && !(startRel & _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].LEFT */ .Z.LEFT)) {
      // potentially intersects left
      y = endY - (endX - minX) * slope;
      intersects = y >= minY && y <= maxY;
    }
  }

  return intersects;
}
/**
 * Apply a transform function to the extent.
 * @param {Extent} extent Extent.
 * @param {import("./proj.js").TransformFunction} transformFn Transform function.
 * Called with `[minX, minY, maxX, maxY]` extent coordinates.
 * @param {Extent} [opt_extent] Destination extent.
 * @param {number} [opt_stops] Number of stops per side used for the transform.
 * By default only the corners are used.
 * @return {Extent} Extent.
 * @api
 */

function applyTransform(extent, transformFn, opt_extent, opt_stops) {
  var coordinates = [];

  if (opt_stops > 1) {
    var width = extent[2] - extent[0];
    var height = extent[3] - extent[1];

    for (var i = 0; i < opt_stops; ++i) {
      coordinates.push(extent[0] + width * i / opt_stops, extent[1], extent[2], extent[1] + height * i / opt_stops, extent[2] - width * i / opt_stops, extent[3], extent[0], extent[3] - height * i / opt_stops);
    }
  } else {
    coordinates = [extent[0], extent[1], extent[2], extent[1], extent[2], extent[3], extent[0], extent[3]];
  }

  transformFn(coordinates, coordinates, 2);
  var xs = [];
  var ys = [];

  for (var i = 0, l = coordinates.length; i < l; i += 2) {
    xs.push(coordinates[i]);
    ys.push(coordinates[i + 1]);
  }

  return _boundingExtentXYs(xs, ys, opt_extent);
}
/**
 * Modifies the provided extent in-place to be within the real world
 * extent.
 *
 * @param {Extent} extent Extent.
 * @param {import("./proj/Projection.js").default} projection Projection
 * @return {Extent} The extent within the real world extent.
 */

function wrapX(extent, projection) {
  var projectionExtent = projection.getExtent();
  var center = getCenter(extent);

  if (projection.canWrapX() && (center[0] < projectionExtent[0] || center[0] >= projectionExtent[2])) {
    var worldWidth = getWidth(projectionExtent);
    var worldsAway = Math.floor((center[0] - projectionExtent[0]) / worldWidth);
    var offset = worldsAway * worldWidth;
    extent[0] -= offset;
    extent[2] -= offset;
  }

  return extent;
}

/***/ }),

/***/ 4778:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/extent/Corner
 */

/**
 * Extent corner.
 * @enum {string}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right'
});

/***/ }),

/***/ 8079:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/extent/Relationship
 */

/**
 * Relationship to an extent.
 * @enum {number}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16
});

/***/ }),

/***/ 5052:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Be": () => (/* binding */ xhr),
/* harmony export */   "ov": () => (/* binding */ loadFeaturesXhr)
/* harmony export */ });
/* unused harmony export setWithCredentials */
/* harmony import */ var _format_FormatType_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8324);
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3658);
/**
 * @module ol/featureloader
 */


/**
 *
 * @type {boolean}
 * @private
 */

var withCredentials = false;
/**
 * {@link module:ol/source/Vector} sources use a function of this type to
 * load features.
 *
 * This function takes up to 5 arguments. These are an {@link module:ol/extent~Extent} representing
 * the area to be loaded, a `{number}` representing the resolution (map units per pixel), an
 * {@link module:ol/proj/Projection} for the projection, an optional success callback that should get
 * the loaded features passed as an argument and an optional failure callback with no arguments. If
 * the callbacks are not used, the corresponding vector source will not fire `'featuresloadend'` and
 * `'featuresloaderror'` events. `this` within the function is bound to the
 * {@link module:ol/source/Vector} it's called from.
 *
 * The function is responsible for loading the features and adding them to the
 * source.
 * @typedef {function(this:(import("./source/Vector").default|import("./VectorTile.js").default),
 *           import("./extent.js").Extent,
 *           number,
 *           import("./proj/Projection.js").default,
 *           function(Array<import("./Feature.js").default>): void=,
 *           function(): void=): void} FeatureLoader
 * @api
 */

/**
 * {@link module:ol/source/Vector} sources use a function of this type to
 * get the url to load features from.
 *
 * This function takes an {@link module:ol/extent~Extent} representing the area
 * to be loaded, a `{number}` representing the resolution (map units per pixel)
 * and an {@link module:ol/proj/Projection} for the projection  as
 * arguments and returns a `{string}` representing the URL.
 * @typedef {function(import("./extent.js").Extent, number, import("./proj/Projection.js").default): string} FeatureUrlFunction
 * @api
 */

/**
 * @param {string|FeatureUrlFunction} url Feature URL service.
 * @param {import("./format/Feature.js").default} format Feature format.
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} resolution Resolution.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @param {function(Array<import("./Feature.js").default>, import("./proj/Projection.js").default): void} success Success
 *      Function called with the loaded features and optionally with the data projection.
 * @param {function(): void} failure Failure
 *      Function called when loading failed.
 */

function loadFeaturesXhr(url, format, extent, resolution, projection, success, failure) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', typeof url === 'function' ? url(extent, resolution, projection) : url, true);

  if (format.getType() == _format_FormatType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].ARRAY_BUFFER */ .Z.ARRAY_BUFFER) {
    xhr.responseType = 'arraybuffer';
  }

  xhr.withCredentials = withCredentials;
  /**
   * @param {Event} event Event.
   * @private
   */

  xhr.onload = function (event) {
    // status will be 0 for file:// urls
    if (!xhr.status || xhr.status >= 200 && xhr.status < 300) {
      var type = format.getType();
      /** @type {Document|Node|Object|string|undefined} */

      var source = void 0;

      if (type == _format_FormatType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].JSON */ .Z.JSON || type == _format_FormatType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].TEXT */ .Z.TEXT) {
        source = xhr.responseText;
      } else if (type == _format_FormatType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].XML */ .Z.XML) {
        source = xhr.responseXML;

        if (!source) {
          source = new DOMParser().parseFromString(xhr.responseText, 'application/xml');
        }
      } else if (type == _format_FormatType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].ARRAY_BUFFER */ .Z.ARRAY_BUFFER) {
        source =
        /** @type {ArrayBuffer} */
        xhr.response;
      }

      if (source) {
        success(
        /** @type {Array<import("./Feature.js").default>} */
        format.readFeatures(source, {
          extent: extent,
          featureProjection: projection
        }), format.readProjection(source));
      } else {
        failure();
      }
    } else {
      failure();
    }
  };
  /**
   * @private
   */


  xhr.onerror = failure;
  xhr.send();
}
/**
 * Create an XHR feature loader for a `url` and `format`. The feature loader
 * loads features (with XHR), parses the features, and adds them to the
 * vector source.
 * @param {string|FeatureUrlFunction} url Feature URL service.
 * @param {import("./format/Feature.js").default} format Feature format.
 * @return {FeatureLoader} The feature loader.
 * @api
 */

function xhr(url, format) {
  /**
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {import("./proj/Projection.js").default} projection Projection.
   * @param {function(Array<import("./Feature.js").default>): void} [success] Success
   *      Function called when loading succeeded.
   * @param {function(): void} [failure] Failure
   *      Function called when loading failed.
   * @this {import("./source/Vector").default}
   */
  return function (extent, resolution, projection, success, failure) {
    var source =
    /** @type {import("./source/Vector").default} */
    this;
    loadFeaturesXhr(url, format, extent, resolution, projection,
    /**
     * @param {Array<import("./Feature.js").default>} features The loaded features.
     * @param {import("./proj/Projection.js").default} dataProjection Data
     * projection.
     */
    function (features, dataProjection) {
      source.addFeatures(features);

      if (success !== undefined) {
        success(features);
      }
    },
    /* FIXME handle error */
    failure ? failure : _functions_js__WEBPACK_IMPORTED_MODULE_1__/* .VOID */ .Zn);
  };
}
/**
 * Setter for the withCredentials configuration for the XHR.
 *
 * @param {boolean} xhrWithCredentials The value of withCredentials to set.
 * Compare https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/
 * @api
 */

function setWithCredentials(xhrWithCredentials) {
  withCredentials = xhrWithCredentials;
}

/***/ }),

/***/ 3176:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "fI": () => (/* binding */ transformGeometryWithOptions)
/* harmony export */ });
/* unused harmony export transformExtentWithOptions */
/* harmony import */ var _proj_Units_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3977);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2618);
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9800);
/* harmony import */ var _proj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8623);
/**
 * @module ol/format/Feature
 */




/**
 * @typedef {Object} ReadOptions
 * @property {import("../proj.js").ProjectionLike} [dataProjection] Projection of the data we are reading.
 * If not provided, the projection will be derived from the data (where possible) or
 * the `dataProjection` of the format is assigned (where set). If the projection
 * can not be derived from the data and if no `dataProjection` is set for a format,
 * the features will not be reprojected.
 * @property {import("../extent.js").Extent} [extent] Tile extent in map units of the tile being read.
 * This is only required when reading data with tile pixels as geometry units. When configured,
 * a `dataProjection` with `TILE_PIXELS` as `units` and the tile's pixel extent as `extent` needs to be
 * provided.
 * @property {import("../proj.js").ProjectionLike} [featureProjection] Projection of the feature geometries
 * created by the format reader. If not provided, features will be returned in the
 * `dataProjection`.
 */

/**
 * @typedef {Object} WriteOptions
 * @property {import("../proj.js").ProjectionLike} [dataProjection] Projection of the data we are writing.
 * If not provided, the `dataProjection` of the format is assigned (where set).
 * If no `dataProjection` is set for a format, the features will be returned
 * in the `featureProjection`.
 * @property {import("../proj.js").ProjectionLike} [featureProjection] Projection of the feature geometries
 * that will be serialized by the format writer. If not provided, geometries are assumed
 * to be in the `dataProjection` if that is set; in other words, they are not transformed.
 * @property {boolean} [rightHanded] When writing geometries, follow the right-hand
 * rule for linear ring orientation.  This means that polygons will have counter-clockwise
 * exterior rings and clockwise interior rings.  By default, coordinates are serialized
 * as they are provided at construction.  If `true`, the right-hand rule will
 * be applied.  If `false`, the left-hand rule will be applied (clockwise for
 * exterior and counter-clockwise for interior rings).  Note that not all
 * formats support this.  The GeoJSON format does use this property when writing
 * geometries.
 * @property {number} [decimals] Maximum number of decimal places for coordinates.
 * Coordinates are stored internally as floats, but floating-point arithmetic can create
 * coordinates with a large number of decimal places, not generally wanted on output.
 * Set a number here to round coordinates. Can also be used to ensure that
 * coordinates read in can be written back out with the same number of decimals.
 * Default is no rounding.
 */

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for feature formats.
 * {@link module:ol/format/Feature~FeatureFormat} subclasses provide the ability to decode and encode
 * {@link module:ol/Feature~Feature} objects from a variety of commonly used geospatial
 * file formats.  See the documentation for each format for more details.
 *
 * @abstract
 * @api
 */

var FeatureFormat =
/** @class */
function () {
  function FeatureFormat() {
    /**
     * @protected
     * @type {import("../proj/Projection.js").default|undefined}
     */
    this.dataProjection = undefined;
    /**
     * @protected
     * @type {import("../proj/Projection.js").default|undefined}
     */

    this.defaultFeatureProjection = undefined;
    /**
     * A list media types supported by the format in descending order of preference.
     * @type {Array<string>}
     */

    this.supportedMediaTypes = null;
  }
  /**
   * Adds the data projection to the read options.
   * @param {Document|Element|Object|string} source Source.
   * @param {ReadOptions} [opt_options] Options.
   * @return {ReadOptions|undefined} Options.
   * @protected
   */


  FeatureFormat.prototype.getReadOptions = function (source, opt_options) {
    var options;

    if (opt_options) {
      var dataProjection = opt_options.dataProjection ? (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(opt_options.dataProjection) : this.readProjection(source);

      if (opt_options.extent && dataProjection && dataProjection.getUnits() === _proj_Units_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].TILE_PIXELS */ .ZP.TILE_PIXELS) {
        dataProjection = (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(dataProjection);
        dataProjection.setWorldExtent(opt_options.extent);
      }

      options = {
        dataProjection: dataProjection,
        featureProjection: opt_options.featureProjection
      };
    }

    return this.adaptOptions(options);
  };
  /**
   * Sets the `dataProjection` on the options, if no `dataProjection`
   * is set.
   * @param {WriteOptions|ReadOptions|undefined} options
   *     Options.
   * @protected
   * @return {WriteOptions|ReadOptions|undefined}
   *     Updated options.
   */


  FeatureFormat.prototype.adaptOptions = function (options) {
    return (0,_obj_js__WEBPACK_IMPORTED_MODULE_2__/* .assign */ .f0)({
      dataProjection: this.dataProjection,
      featureProjection: this.defaultFeatureProjection
    }, options);
  };
  /**
   * @abstract
   * @return {import("./FormatType.js").default} Format.
   */


  FeatureFormat.prototype.getType = function () {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_3__/* .abstract */ .O3)();
  };
  /**
   * Read a single feature from a source.
   *
   * @abstract
   * @param {Document|Element|Object|string} source Source.
   * @param {ReadOptions} [opt_options] Read options.
   * @return {import("../Feature.js").FeatureLike} Feature.
   */


  FeatureFormat.prototype.readFeature = function (source, opt_options) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_3__/* .abstract */ .O3)();
  };
  /**
   * Read all features from a source.
   *
   * @abstract
   * @param {Document|Element|ArrayBuffer|Object|string} source Source.
   * @param {ReadOptions} [opt_options] Read options.
   * @return {Array<import("../Feature.js").FeatureLike>} Features.
   */


  FeatureFormat.prototype.readFeatures = function (source, opt_options) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_3__/* .abstract */ .O3)();
  };
  /**
   * Read a single geometry from a source.
   *
   * @abstract
   * @param {Document|Element|Object|string} source Source.
   * @param {ReadOptions} [opt_options] Read options.
   * @return {import("../geom/Geometry.js").default} Geometry.
   */


  FeatureFormat.prototype.readGeometry = function (source, opt_options) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_3__/* .abstract */ .O3)();
  };
  /**
   * Read the projection from a source.
   *
   * @abstract
   * @param {Document|Element|Object|string} source Source.
   * @return {import("../proj/Projection.js").default|undefined} Projection.
   */


  FeatureFormat.prototype.readProjection = function (source) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_3__/* .abstract */ .O3)();
  };
  /**
   * Encode a feature in this format.
   *
   * @abstract
   * @param {import("../Feature.js").default} feature Feature.
   * @param {WriteOptions} [opt_options] Write options.
   * @return {string|ArrayBuffer} Result.
   */


  FeatureFormat.prototype.writeFeature = function (feature, opt_options) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_3__/* .abstract */ .O3)();
  };
  /**
   * Encode an array of features in this format.
   *
   * @abstract
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {WriteOptions} [opt_options] Write options.
   * @return {string|ArrayBuffer} Result.
   */


  FeatureFormat.prototype.writeFeatures = function (features, opt_options) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_3__/* .abstract */ .O3)();
  };
  /**
   * Write a single geometry in this format.
   *
   * @abstract
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {WriteOptions} [opt_options] Write options.
   * @return {string|ArrayBuffer} Result.
   */


  FeatureFormat.prototype.writeGeometry = function (geometry, opt_options) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_3__/* .abstract */ .O3)();
  };

  return FeatureFormat;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeatureFormat);
/**
 * @param {import("../geom/Geometry.js").default} geometry Geometry.
 * @param {boolean} write Set to true for writing, false for reading.
 * @param {WriteOptions|ReadOptions} [opt_options] Options.
 * @return {import("../geom/Geometry.js").default} Transformed geometry.
 */

function transformGeometryWithOptions(geometry, write, opt_options) {
  var featureProjection = opt_options ? (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(opt_options.featureProjection) : null;
  var dataProjection = opt_options ? (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(opt_options.dataProjection) : null;
  var transformed;

  if (featureProjection && dataProjection && !(0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .equivalent */ .OP)(featureProjection, dataProjection)) {
    transformed = (write ? geometry.clone() : geometry).transform(write ? featureProjection : dataProjection, write ? dataProjection : featureProjection);
  } else {
    transformed = geometry;
  }

  if (write && opt_options &&
  /** @type {WriteOptions} */
  opt_options.decimals !== undefined) {
    var power_1 = Math.pow(10,
    /** @type {WriteOptions} */
    opt_options.decimals); // if decimals option on write, round each coordinate appropriately

    /**
     * @param {Array<number>} coordinates Coordinates.
     * @return {Array<number>} Transformed coordinates.
     */

    var transform = function (coordinates) {
      for (var i = 0, ii = coordinates.length; i < ii; ++i) {
        coordinates[i] = Math.round(coordinates[i] * power_1) / power_1;
      }

      return coordinates;
    };

    if (transformed === geometry) {
      transformed = geometry.clone();
    }

    transformed.applyTransform(transform);
  }

  return transformed;
}
/**
 * @param {import("../extent.js").Extent} extent Extent.
 * @param {ReadOptions} [opt_options] Read options.
 * @return {import("../extent.js").Extent} Transformed extent.
 */

function transformExtentWithOptions(extent, opt_options) {
  var featureProjection = opt_options ? getProjection(opt_options.featureProjection) : null;
  var dataProjection = opt_options ? getProjection(opt_options.dataProjection) : null;

  if (featureProjection && dataProjection && !equivalentProjection(featureProjection, dataProjection)) {
    return transformExtent(extent, dataProjection, featureProjection);
  } else {
    return extent;
  }
}

/***/ }),

/***/ 8324:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/format/FormatType
 */

/**
 * @enum {string}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  ARRAY_BUFFER: 'arraybuffer',
  JSON: 'json',
  TEXT: 'text',
  XML: 'xml'
});

/***/ }),

/***/ 3741:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ format_GeoJSON)
});

// EXTERNAL MODULE: ./node_modules/ol/Feature.js
var Feature = __webpack_require__(5028);
// EXTERNAL MODULE: ./node_modules/ol/geom/GeometryCollection.js
var GeometryCollection = __webpack_require__(1288);
// EXTERNAL MODULE: ./node_modules/ol/geom/GeometryType.js
var GeometryType = __webpack_require__(5870);
// EXTERNAL MODULE: ./node_modules/ol/format/Feature.js
var format_Feature = __webpack_require__(3176);
// EXTERNAL MODULE: ./node_modules/ol/format/FormatType.js
var FormatType = __webpack_require__(8324);
// EXTERNAL MODULE: ./node_modules/ol/util.js
var util = __webpack_require__(2618);
;// CONCATENATED MODULE: ./node_modules/ol/format/JSONFeature.js
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
 * @module ol/format/JSONFeature
 */





/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for JSON feature formats.
 *
 * @abstract
 */

var JSONFeature =
/** @class */
function (_super) {
  __extends(JSONFeature, _super);

  function JSONFeature() {
    return _super.call(this) || this;
  }
  /**
   * @return {import("./FormatType.js").default} Format.
   */


  JSONFeature.prototype.getType = function () {
    return FormatType/* default.JSON */.Z.JSON;
  };
  /**
   * Read a feature.  Only works for a single feature. Use `readFeatures` to
   * read a feature collection.
   *
   * @param {ArrayBuffer|Document|Element|Object|string} source Source.
   * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
   * @return {import("../Feature.js").default} Feature.
   * @api
   */


  JSONFeature.prototype.readFeature = function (source, opt_options) {
    return this.readFeatureFromObject(getObject(source), this.getReadOptions(source, opt_options));
  };
  /**
   * Read all features.  Works with both a single feature and a feature
   * collection.
   *
   * @param {ArrayBuffer|Document|Element|Object|string} source Source.
   * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
   * @return {Array<import("../Feature.js").default>} Features.
   * @api
   */


  JSONFeature.prototype.readFeatures = function (source, opt_options) {
    return this.readFeaturesFromObject(getObject(source), this.getReadOptions(source, opt_options));
  };
  /**
   * @abstract
   * @param {Object} object Object.
   * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
   * @protected
   * @return {import("../Feature.js").default} Feature.
   */


  JSONFeature.prototype.readFeatureFromObject = function (object, opt_options) {
    return (0,util/* abstract */.O3)();
  };
  /**
   * @abstract
   * @param {Object} object Object.
   * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
   * @protected
   * @return {Array<import("../Feature.js").default>} Features.
   */


  JSONFeature.prototype.readFeaturesFromObject = function (object, opt_options) {
    return (0,util/* abstract */.O3)();
  };
  /**
   * Read a geometry.
   *
   * @param {ArrayBuffer|Document|Element|Object|string} source Source.
   * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
   * @return {import("../geom/Geometry.js").default} Geometry.
   * @api
   */


  JSONFeature.prototype.readGeometry = function (source, opt_options) {
    return this.readGeometryFromObject(getObject(source), this.getReadOptions(source, opt_options));
  };
  /**
   * @abstract
   * @param {Object} object Object.
   * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
   * @protected
   * @return {import("../geom/Geometry.js").default} Geometry.
   */


  JSONFeature.prototype.readGeometryFromObject = function (object, opt_options) {
    return (0,util/* abstract */.O3)();
  };
  /**
   * Read the projection.
   *
   * @param {ArrayBuffer|Document|Element|Object|string} source Source.
   * @return {import("../proj/Projection.js").default} Projection.
   * @api
   */


  JSONFeature.prototype.readProjection = function (source) {
    return this.readProjectionFromObject(getObject(source));
  };
  /**
   * @abstract
   * @param {Object} object Object.
   * @protected
   * @return {import("../proj/Projection.js").default} Projection.
   */


  JSONFeature.prototype.readProjectionFromObject = function (object) {
    return (0,util/* abstract */.O3)();
  };
  /**
   * Encode a feature as string.
   *
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
   * @return {string} Encoded feature.
   * @api
   */


  JSONFeature.prototype.writeFeature = function (feature, opt_options) {
    return JSON.stringify(this.writeFeatureObject(feature, opt_options));
  };
  /**
   * @abstract
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
   * @return {Object} Object.
   */


  JSONFeature.prototype.writeFeatureObject = function (feature, opt_options) {
    return (0,util/* abstract */.O3)();
  };
  /**
   * Encode an array of features as string.
   *
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
   * @return {string} Encoded features.
   * @api
   */


  JSONFeature.prototype.writeFeatures = function (features, opt_options) {
    return JSON.stringify(this.writeFeaturesObject(features, opt_options));
  };
  /**
   * @abstract
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
   * @return {Object} Object.
   */


  JSONFeature.prototype.writeFeaturesObject = function (features, opt_options) {
    return (0,util/* abstract */.O3)();
  };
  /**
   * Encode a geometry as string.
   *
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
   * @return {string} Encoded geometry.
   * @api
   */


  JSONFeature.prototype.writeGeometry = function (geometry, opt_options) {
    return JSON.stringify(this.writeGeometryObject(geometry, opt_options));
  };
  /**
   * @abstract
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
   * @return {Object} Object.
   */


  JSONFeature.prototype.writeGeometryObject = function (geometry, opt_options) {
    return (0,util/* abstract */.O3)();
  };

  return JSONFeature;
}(format_Feature/* default */.ZP);
/**
 * @param {Document|Element|Object|string} source Source.
 * @return {Object} Object.
 */


function getObject(source) {
  if (typeof source === 'string') {
    var object = JSON.parse(source);
    return object ?
    /** @type {Object} */
    object : null;
  } else if (source !== null) {
    return source;
  } else {
    return null;
  }
}

/* harmony default export */ const format_JSONFeature = (JSONFeature);
// EXTERNAL MODULE: ./node_modules/ol/geom/LineString.js
var LineString = __webpack_require__(9171);
// EXTERNAL MODULE: ./node_modules/ol/geom/MultiLineString.js
var MultiLineString = __webpack_require__(4963);
// EXTERNAL MODULE: ./node_modules/ol/geom/MultiPoint.js
var MultiPoint = __webpack_require__(6733);
// EXTERNAL MODULE: ./node_modules/ol/geom/MultiPolygon.js
var MultiPolygon = __webpack_require__(9232);
// EXTERNAL MODULE: ./node_modules/ol/geom/Point.js
var Point = __webpack_require__(6397);
// EXTERNAL MODULE: ./node_modules/ol/geom/Polygon.js
var Polygon = __webpack_require__(2607);
// EXTERNAL MODULE: ./node_modules/ol/asserts.js
var asserts = __webpack_require__(4548);
// EXTERNAL MODULE: ./node_modules/ol/obj.js
var obj = __webpack_require__(9800);
// EXTERNAL MODULE: ./node_modules/ol/proj.js + 2 modules
var proj = __webpack_require__(8623);
;// CONCATENATED MODULE: ./node_modules/ol/format/GeoJSON.js
/**
 * @module ol/format/GeoJSON
 */
var GeoJSON_extends = undefined && undefined.__extends || function () {
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
 * @typedef {import("geojson").GeoJSON} GeoJSONObject
 * @typedef {import("geojson").Feature} GeoJSONFeature
 * @typedef {import("geojson").FeatureCollection} GeoJSONFeatureCollection
 * @typedef {import("geojson").Geometry} GeoJSONGeometry
 * @typedef {import("geojson").Point} GeoJSONPoint
 * @typedef {import("geojson").LineString} GeoJSONLineString
 * @typedef {import("geojson").Polygon} GeoJSONPolygon
 * @typedef {import("geojson").MultiPoint} GeoJSONMultiPoint
 * @typedef {import("geojson").MultiLineString} GeoJSONMultiLineString
 * @typedef {import("geojson").MultiPolygon} GeoJSONMultiPolygon
 * @typedef {import("geojson").GeometryCollection} GeoJSONGeometryCollection
 */

/**
 * @typedef {Object} Options
 * @property {import("../proj.js").ProjectionLike} [dataProjection='EPSG:4326'] Default data projection.
 * @property {import("../proj.js").ProjectionLike} [featureProjection] Projection for features read or
 * written by the format.  Options passed to read or write methods will take precedence.
 * @property {string} [geometryName] Geometry name to use when creating features.
 * @property {boolean} [extractGeometryName=false] Certain GeoJSON providers include
 * the geometry_name field in the feature GeoJSON. If set to `true` the GeoJSON reader
 * will look for that field to set the geometry name. If both this field is set to `true`
 * and a `geometryName` is provided, the `geometryName` will take precedence.
 */

/**
 * @classdesc
 * Feature format for reading and writing data in the GeoJSON format.
 *
 * @api
 */

var GeoJSON =
/** @class */
function (_super) {
  GeoJSON_extends(GeoJSON, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function GeoJSON(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    _this = _super.call(this) || this;
    /**
     * @type {import("../proj/Projection.js").default}
     */

    _this.dataProjection = (0,proj/* get */.U2)(options.dataProjection ? options.dataProjection : 'EPSG:4326');

    if (options.featureProjection) {
      _this.defaultFeatureProjection = (0,proj/* get */.U2)(options.featureProjection);
    }
    /**
     * Name of the geometry attribute for features.
     * @type {string|undefined}
     * @private
     */


    _this.geometryName_ = options.geometryName;
    /**
     * Look for the geometry name in the feature GeoJSON
     * @type {boolean|undefined}
     * @private
     */

    _this.extractGeometryName_ = options.extractGeometryName;
    _this.supportedMediaTypes = ['application/geo+json', 'application/vnd.geo+json'];
    return _this;
  }
  /**
   * @param {Object} object Object.
   * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
   * @protected
   * @return {import("../Feature.js").default} Feature.
   */


  GeoJSON.prototype.readFeatureFromObject = function (object, opt_options) {
    /**
     * @type {GeoJSONFeature}
     */
    var geoJSONFeature = null;

    if (object['type'] === 'Feature') {
      geoJSONFeature =
      /** @type {GeoJSONFeature} */
      object;
    } else {
      geoJSONFeature = {
        'type': 'Feature',
        'geometry':
        /** @type {GeoJSONGeometry} */
        object,
        'properties': null
      };
    }

    var geometry = readGeometry(geoJSONFeature['geometry'], opt_options);
    var feature = new Feature/* default */.Z();

    if (this.geometryName_) {
      feature.setGeometryName(this.geometryName_);
    } else if (this.extractGeometryName_ && 'geometry_name' in geoJSONFeature !== undefined) {
      feature.setGeometryName(geoJSONFeature['geometry_name']);
    }

    feature.setGeometry(geometry);

    if ('id' in geoJSONFeature) {
      feature.setId(geoJSONFeature['id']);
    }

    if (geoJSONFeature['properties']) {
      feature.setProperties(geoJSONFeature['properties'], true);
    }

    return feature;
  };
  /**
   * @param {Object} object Object.
   * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
   * @protected
   * @return {Array<Feature>} Features.
   */


  GeoJSON.prototype.readFeaturesFromObject = function (object, opt_options) {
    var geoJSONObject =
    /** @type {GeoJSONObject} */
    object;
    /** @type {Array<import("../Feature.js").default>} */

    var features = null;

    if (geoJSONObject['type'] === 'FeatureCollection') {
      var geoJSONFeatureCollection =
      /** @type {GeoJSONFeatureCollection} */
      object;
      features = [];
      var geoJSONFeatures = geoJSONFeatureCollection['features'];

      for (var i = 0, ii = geoJSONFeatures.length; i < ii; ++i) {
        features.push(this.readFeatureFromObject(geoJSONFeatures[i], opt_options));
      }
    } else {
      features = [this.readFeatureFromObject(object, opt_options)];
    }

    return features;
  };
  /**
   * @param {GeoJSONGeometry} object Object.
   * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
   * @protected
   * @return {import("../geom/Geometry.js").default} Geometry.
   */


  GeoJSON.prototype.readGeometryFromObject = function (object, opt_options) {
    return readGeometry(object, opt_options);
  };
  /**
   * @param {Object} object Object.
   * @protected
   * @return {import("../proj/Projection.js").default} Projection.
   */


  GeoJSON.prototype.readProjectionFromObject = function (object) {
    var crs = object['crs'];
    var projection;

    if (crs) {
      if (crs['type'] == 'name') {
        projection = (0,proj/* get */.U2)(crs['properties']['name']);
      } else if (crs['type'] === 'EPSG') {
        projection = (0,proj/* get */.U2)('EPSG:' + crs['properties']['code']);
      } else {
        (0,asserts/* assert */.h)(false, 36); // Unknown SRS type
      }
    } else {
      projection = this.dataProjection;
    }

    return (
      /** @type {import("../proj/Projection.js").default} */
      projection
    );
  };
  /**
   * Encode a feature as a GeoJSON Feature object.
   *
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
   * @return {GeoJSONFeature} Object.
   * @api
   */


  GeoJSON.prototype.writeFeatureObject = function (feature, opt_options) {
    opt_options = this.adaptOptions(opt_options);
    /** @type {GeoJSONFeature} */

    var object = {
      'type': 'Feature',
      geometry: null,
      properties: null
    };
    var id = feature.getId();

    if (id !== undefined) {
      object.id = id;
    }

    if (!feature.hasProperties()) {
      return object;
    }

    var properties = feature.getProperties();
    var geometry = feature.getGeometry();

    if (geometry) {
      object.geometry = writeGeometry(geometry, opt_options);
      delete properties[feature.getGeometryName()];
    }

    if (!(0,obj/* isEmpty */.xb)(properties)) {
      object.properties = properties;
    }

    return object;
  };
  /**
   * Encode an array of features as a GeoJSON object.
   *
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
   * @return {GeoJSONFeatureCollection} GeoJSON Object.
   * @api
   */


  GeoJSON.prototype.writeFeaturesObject = function (features, opt_options) {
    opt_options = this.adaptOptions(opt_options);
    var objects = [];

    for (var i = 0, ii = features.length; i < ii; ++i) {
      objects.push(this.writeFeatureObject(features[i], opt_options));
    }

    return {
      type: 'FeatureCollection',
      features: objects
    };
  };
  /**
   * Encode a geometry as a GeoJSON object.
   *
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
   * @return {GeoJSONGeometry|GeoJSONGeometryCollection} Object.
   * @api
   */


  GeoJSON.prototype.writeGeometryObject = function (geometry, opt_options) {
    return writeGeometry(geometry, this.adaptOptions(opt_options));
  };

  return GeoJSON;
}(format_JSONFeature);
/**
 * @param {GeoJSONGeometry|GeoJSONGeometryCollection} object Object.
 * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
 * @return {import("../geom/Geometry.js").default} Geometry.
 */


function readGeometry(object, opt_options) {
  if (!object) {
    return null;
  }
  /**
   * @type {import("../geom/Geometry.js").default}
   */


  var geometry;

  switch (object['type']) {
    case GeometryType/* default.POINT */.Z.POINT:
      {
        geometry = readPointGeometry(
        /** @type {GeoJSONPoint} */
        object);
        break;
      }

    case GeometryType/* default.LINE_STRING */.Z.LINE_STRING:
      {
        geometry = readLineStringGeometry(
        /** @type {GeoJSONLineString} */
        object);
        break;
      }

    case GeometryType/* default.POLYGON */.Z.POLYGON:
      {
        geometry = readPolygonGeometry(
        /** @type {GeoJSONPolygon} */
        object);
        break;
      }

    case GeometryType/* default.MULTI_POINT */.Z.MULTI_POINT:
      {
        geometry = readMultiPointGeometry(
        /** @type {GeoJSONMultiPoint} */
        object);
        break;
      }

    case GeometryType/* default.MULTI_LINE_STRING */.Z.MULTI_LINE_STRING:
      {
        geometry = readMultiLineStringGeometry(
        /** @type {GeoJSONMultiLineString} */
        object);
        break;
      }

    case GeometryType/* default.MULTI_POLYGON */.Z.MULTI_POLYGON:
      {
        geometry = readMultiPolygonGeometry(
        /** @type {GeoJSONMultiPolygon} */
        object);
        break;
      }

    case GeometryType/* default.GEOMETRY_COLLECTION */.Z.GEOMETRY_COLLECTION:
      {
        geometry = readGeometryCollectionGeometry(
        /** @type {GeoJSONGeometryCollection} */
        object);
        break;
      }

    default:
      {
        throw new Error('Unsupported GeoJSON type: ' + object.type);
      }
  }

  return (0,format_Feature/* transformGeometryWithOptions */.fI)(geometry, false, opt_options);
}
/**
 * @param {GeoJSONGeometryCollection} object Object.
 * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
 * @return {GeometryCollection} Geometry collection.
 */


function readGeometryCollectionGeometry(object, opt_options) {
  var geometries = object['geometries'].map(
  /**
   * @param {GeoJSONGeometry} geometry Geometry.
   * @return {import("../geom/Geometry.js").default} geometry Geometry.
   */
  function (geometry) {
    return readGeometry(geometry, opt_options);
  });
  return new GeometryCollection/* default */.Z(geometries);
}
/**
 * @param {GeoJSONPoint} object Object.
 * @return {Point} Point.
 */


function readPointGeometry(object) {
  return new Point/* default */.Z(object['coordinates']);
}
/**
 * @param {GeoJSONLineString} object Object.
 * @return {LineString} LineString.
 */


function readLineStringGeometry(object) {
  return new LineString/* default */.Z(object['coordinates']);
}
/**
 * @param {GeoJSONMultiLineString} object Object.
 * @return {MultiLineString} MultiLineString.
 */


function readMultiLineStringGeometry(object) {
  return new MultiLineString/* default */.Z(object['coordinates']);
}
/**
 * @param {GeoJSONMultiPoint} object Object.
 * @return {MultiPoint} MultiPoint.
 */


function readMultiPointGeometry(object) {
  return new MultiPoint/* default */.Z(object['coordinates']);
}
/**
 * @param {GeoJSONMultiPolygon} object Object.
 * @return {MultiPolygon} MultiPolygon.
 */


function readMultiPolygonGeometry(object) {
  return new MultiPolygon/* default */.Z(object['coordinates']);
}
/**
 * @param {GeoJSONPolygon} object Object.
 * @return {Polygon} Polygon.
 */


function readPolygonGeometry(object) {
  return new Polygon/* default */.ZP(object['coordinates']);
}
/**
 * @param {import("../geom/Geometry.js").default} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */


function writeGeometry(geometry, opt_options) {
  geometry = (0,format_Feature/* transformGeometryWithOptions */.fI)(geometry, true, opt_options);
  var type = geometry.getType();
  /** @type {GeoJSONGeometry} */

  var geoJSON;

  switch (type) {
    case GeometryType/* default.POINT */.Z.POINT:
      {
        geoJSON = writePointGeometry(
        /** @type {Point} */
        geometry, opt_options);
        break;
      }

    case GeometryType/* default.LINE_STRING */.Z.LINE_STRING:
      {
        geoJSON = writeLineStringGeometry(
        /** @type {LineString} */
        geometry, opt_options);
        break;
      }

    case GeometryType/* default.POLYGON */.Z.POLYGON:
      {
        geoJSON = writePolygonGeometry(
        /** @type {Polygon} */
        geometry, opt_options);
        break;
      }

    case GeometryType/* default.MULTI_POINT */.Z.MULTI_POINT:
      {
        geoJSON = writeMultiPointGeometry(
        /** @type {MultiPoint} */
        geometry, opt_options);
        break;
      }

    case GeometryType/* default.MULTI_LINE_STRING */.Z.MULTI_LINE_STRING:
      {
        geoJSON = writeMultiLineStringGeometry(
        /** @type {MultiLineString} */
        geometry, opt_options);
        break;
      }

    case GeometryType/* default.MULTI_POLYGON */.Z.MULTI_POLYGON:
      {
        geoJSON = writeMultiPolygonGeometry(
        /** @type {MultiPolygon} */
        geometry, opt_options);
        break;
      }

    case GeometryType/* default.GEOMETRY_COLLECTION */.Z.GEOMETRY_COLLECTION:
      {
        geoJSON = writeGeometryCollectionGeometry(
        /** @type {GeometryCollection} */
        geometry, opt_options);
        break;
      }

    case GeometryType/* default.CIRCLE */.Z.CIRCLE:
      {
        geoJSON = {
          type: 'GeometryCollection',
          geometries: []
        };
        break;
      }

    default:
      {
        throw new Error('Unsupported geometry type: ' + type);
      }
  }

  return geoJSON;
}
/**
 * @param {GeometryCollection} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
 * @return {GeoJSONGeometryCollection} GeoJSON geometry collection.
 */


function writeGeometryCollectionGeometry(geometry, opt_options) {
  var geometries = geometry.getGeometriesArray().map(function (geometry) {
    var options = (0,obj/* assign */.f0)({}, opt_options);
    delete options.featureProjection;
    return writeGeometry(geometry, options);
  });
  return {
    type: 'GeometryCollection',
    geometries: geometries
  };
}
/**
 * @param {LineString} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */


function writeLineStringGeometry(geometry, opt_options) {
  return {
    type: 'LineString',
    coordinates: geometry.getCoordinates()
  };
}
/**
 * @param {MultiLineString} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */


function writeMultiLineStringGeometry(geometry, opt_options) {
  return {
    type: 'MultiLineString',
    coordinates: geometry.getCoordinates()
  };
}
/**
 * @param {MultiPoint} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */


function writeMultiPointGeometry(geometry, opt_options) {
  return {
    type: 'MultiPoint',
    coordinates: geometry.getCoordinates()
  };
}
/**
 * @param {MultiPolygon} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */


function writeMultiPolygonGeometry(geometry, opt_options) {
  var right;

  if (opt_options) {
    right = opt_options.rightHanded;
  }

  return {
    type: 'MultiPolygon',
    coordinates: geometry.getCoordinates(right)
  };
}
/**
 * @param {Point} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */


function writePointGeometry(geometry, opt_options) {
  return {
    type: 'Point',
    coordinates: geometry.getCoordinates()
  };
}
/**
 * @param {Polygon} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */


function writePolygonGeometry(geometry, opt_options) {
  var right;

  if (opt_options) {
    right = opt_options.rightHanded;
  }

  return {
    type: 'Polygon',
    coordinates: geometry.getCoordinates(right)
  };
}

/* harmony default export */ const format_GeoJSON = (GeoJSON);

/***/ }),

/***/ 7526:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Feature_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(3176);
/* harmony import */ var _FormatType_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(8324);
/* harmony import */ var _geom_GeometryLayout_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2701);
/* harmony import */ var _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5870);
/* harmony import */ var _geom_LineString_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9171);
/* harmony import */ var _geom_MultiLineString_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(4963);
/* harmony import */ var _geom_MultiPoint_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(6733);
/* harmony import */ var _geom_MultiPolygon_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9232);
/* harmony import */ var pbf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5011);
/* harmony import */ var _geom_Point_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6397);
/* harmony import */ var _geom_Polygon_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2607);
/* harmony import */ var _proj_Projection_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6491);
/* harmony import */ var _render_Feature_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1971);
/* harmony import */ var _proj_Units_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3977);
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4548);
/* harmony import */ var _proj_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8623);
/* harmony import */ var _geom_flat_orient_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3738);
/**
 * @module ol/format/MVT
 */
//FIXME Implement projection handling
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
 * @typedef {Object} Options
 * @property {import("../Feature.js").FeatureClass} [featureClass] Class for features returned by
 * {@link module:ol/format/MVT~MVT#readFeatures}. Set to {@link module:ol/Feature~Feature} to get full editing and geometry
 * support at the cost of decreased rendering performance. The default is
 * {@link module:ol/render/Feature~RenderFeature}, which is optimized for rendering and hit detection.
 * @property {string} [geometryName='geometry'] Geometry name to use when creating features.
 * @property {string} [layerName='layer'] Name of the feature attribute that holds the layer name.
 * @property {Array<string>} [layers] Layers to read features from. If not provided, features will be read from all
 * @property {string} [idProperty] Optional property that will be assigned as the feature id and removed from the properties.
 * layers.
 */

/**
 * @classdesc
 * Feature format for reading data in the Mapbox MVT format.
 *
 * @param {Options} [opt_options] Options.
 * @api
 */

var MVT =
/** @class */
function (_super) {
  __extends(MVT, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function MVT(opt_options) {
    var _this = _super.call(this) || this;

    var options = opt_options ? opt_options : {};
    /**
     * @type {Projection}
     */

    _this.dataProjection = new _proj_Projection_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z({
      code: '',
      units: _proj_Units_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].TILE_PIXELS */ .ZP.TILE_PIXELS
    });
    /**
     * @private
     * @type {import("../Feature.js").FeatureClass}
     */

    _this.featureClass_ = options.featureClass ? options.featureClass : _render_Feature_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z;
    /**
     * @private
     * @type {string|undefined}
     */

    _this.geometryName_ = options.geometryName;
    /**
     * @private
     * @type {string}
     */

    _this.layerName_ = options.layerName ? options.layerName : 'layer';
    /**
     * @private
     * @type {Array<string>}
     */

    _this.layers_ = options.layers ? options.layers : null;
    /**
     * @private
     * @type {string}
     */

    _this.idProperty_ = options.idProperty;
    _this.supportedMediaTypes = ['application/vnd.mapbox-vector-tile', 'application/x-protobuf'];
    return _this;
  }
  /**
   * Read the raw geometry from the pbf offset stored in a raw feature's geometry
   * property.
   * @param {PBF} pbf PBF.
   * @param {Object} feature Raw feature.
   * @param {Array<number>} flatCoordinates Array to store flat coordinates in.
   * @param {Array<number>} ends Array to store ends in.
   * @private
   */


  MVT.prototype.readRawGeometry_ = function (pbf, feature, flatCoordinates, ends) {
    pbf.pos = feature.geometry;
    var end = pbf.readVarint() + pbf.pos;
    var cmd = 1;
    var length = 0;
    var x = 0;
    var y = 0;
    var coordsLen = 0;
    var currentEnd = 0;

    while (pbf.pos < end) {
      if (!length) {
        var cmdLen = pbf.readVarint();
        cmd = cmdLen & 0x7;
        length = cmdLen >> 3;
      }

      length--;

      if (cmd === 1 || cmd === 2) {
        x += pbf.readSVarint();
        y += pbf.readSVarint();

        if (cmd === 1) {
          // moveTo
          if (coordsLen > currentEnd) {
            ends.push(coordsLen);
            currentEnd = coordsLen;
          }
        }

        flatCoordinates.push(x, y);
        coordsLen += 2;
      } else if (cmd === 7) {
        if (coordsLen > currentEnd) {
          // close polygon
          flatCoordinates.push(flatCoordinates[currentEnd], flatCoordinates[currentEnd + 1]);
          coordsLen += 2;
        }
      } else {
        (0,_asserts_js__WEBPACK_IMPORTED_MODULE_5__/* .assert */ .h)(false, 59); // Invalid command found in the PBF
      }
    }

    if (coordsLen > currentEnd) {
      ends.push(coordsLen);
      currentEnd = coordsLen;
    }
  };
  /**
   * @private
   * @param {PBF} pbf PBF
   * @param {Object} rawFeature Raw Mapbox feature.
   * @param {import("./Feature.js").ReadOptions} options Read options.
   * @return {import("../Feature.js").FeatureLike} Feature.
   */


  MVT.prototype.createFeature_ = function (pbf, rawFeature, options) {
    var type = rawFeature.type;

    if (type === 0) {
      return null;
    }

    var feature;
    var values = rawFeature.properties;
    var id;

    if (!this.idProperty_) {
      id = rawFeature.id;
    } else {
      id = values[this.idProperty_];
      delete values[this.idProperty_];
    }

    values[this.layerName_] = rawFeature.layer.name;
    var flatCoordinates = [];
    var ends = [];
    this.readRawGeometry_(pbf, rawFeature, flatCoordinates, ends);
    var geometryType = getGeometryType(type, ends.length);

    if (this.featureClass_ === _render_Feature_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z) {
      feature = new this.featureClass_(geometryType, flatCoordinates, ends, values, id);
      feature.transform(options.dataProjection);
    } else {
      var geom = void 0;

      if (geometryType == _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].POLYGON */ .Z.POLYGON) {
        var endss = [];
        var offset = 0;
        var prevEndIndex = 0;

        for (var i = 0, ii = ends.length; i < ii; ++i) {
          var end = ends[i]; // classifies an array of rings into polygons with outer rings and holes

          if (!(0,_geom_flat_orient_js__WEBPACK_IMPORTED_MODULE_7__/* .linearRingIsClockwise */ .bt)(flatCoordinates, offset, end, 2)) {
            endss.push(ends.slice(prevEndIndex, i + 1));
          } else {
            if (endss.length === 0) {
              continue;
            }

            endss[endss.length - 1].push(ends[prevEndIndex]);
          }

          prevEndIndex = i + 1;
          offset = end;
        }

        if (endss.length > 1) {
          geom = new _geom_MultiPolygon_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z(flatCoordinates, _geom_GeometryLayout_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].XY */ .Z.XY, endss);
        } else {
          geom = new _geom_Polygon_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .ZP(flatCoordinates, _geom_GeometryLayout_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].XY */ .Z.XY, ends);
        }
      } else {
        geom = geometryType === _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].POINT */ .Z.POINT ? new _geom_Point_js__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z(flatCoordinates, _geom_GeometryLayout_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].XY */ .Z.XY) : geometryType === _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].LINE_STRING */ .Z.LINE_STRING ? new _geom_LineString_js__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z(flatCoordinates, _geom_GeometryLayout_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].XY */ .Z.XY) : geometryType === _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].POLYGON */ .Z.POLYGON ? new _geom_Polygon_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .ZP(flatCoordinates, _geom_GeometryLayout_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].XY */ .Z.XY, ends) : geometryType === _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].MULTI_POINT */ .Z.MULTI_POINT ? new _geom_MultiPoint_js__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z(flatCoordinates, _geom_GeometryLayout_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].XY */ .Z.XY) : geometryType === _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].MULTI_LINE_STRING */ .Z.MULTI_LINE_STRING ? new _geom_MultiLineString_js__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z(flatCoordinates, _geom_GeometryLayout_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].XY */ .Z.XY, ends) : null;
      }

      var ctor =
      /** @type {typeof import("../Feature.js").default} */
      this.featureClass_;
      feature = new ctor();

      if (this.geometryName_) {
        feature.setGeometryName(this.geometryName_);
      }

      var geometry = (0,_Feature_js__WEBPACK_IMPORTED_MODULE_15__/* .transformGeometryWithOptions */ .fI)(geom, false, options);
      feature.setGeometry(geometry);
      feature.setId(id);
      feature.setProperties(values, true);
    }

    return feature;
  };
  /**
   * @return {import("./FormatType.js").default} Format.
   */


  MVT.prototype.getType = function () {
    return _FormatType_js__WEBPACK_IMPORTED_MODULE_16__/* ["default"].ARRAY_BUFFER */ .Z.ARRAY_BUFFER;
  };
  /**
   * Read all features.
   *
   * @param {ArrayBuffer} source Source.
   * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
   * @return {Array<import("../Feature.js").FeatureLike>} Features.
   * @api
   */


  MVT.prototype.readFeatures = function (source, opt_options) {
    var layers = this.layers_;
    var options =
    /** @type {import("./Feature.js").ReadOptions} */
    this.adaptOptions(opt_options);
    var dataProjection = (0,_proj_js__WEBPACK_IMPORTED_MODULE_1__/* .get */ .U2)(options.dataProjection);
    dataProjection.setWorldExtent(options.extent);
    options.dataProjection = dataProjection;
    var pbf = new pbf__WEBPACK_IMPORTED_MODULE_0__(
    /** @type {ArrayBuffer} */
    source);
    var pbfLayers = pbf.readFields(layersPBFReader, {});
    var features = [];

    for (var name_1 in pbfLayers) {
      if (layers && layers.indexOf(name_1) == -1) {
        continue;
      }

      var pbfLayer = pbfLayers[name_1];
      var extent = pbfLayer ? [0, 0, pbfLayer.extent, pbfLayer.extent] : null;
      dataProjection.setExtent(extent);

      for (var i = 0, ii = pbfLayer.length; i < ii; ++i) {
        var rawFeature = readRawFeature(pbf, pbfLayer, i);
        features.push(this.createFeature_(pbf, rawFeature, options));
      }
    }

    return features;
  };
  /**
   * Read the projection from the source.
   *
   * @param {Document|Element|Object|string} source Source.
   * @return {import("../proj/Projection.js").default} Projection.
   * @api
   */


  MVT.prototype.readProjection = function (source) {
    return this.dataProjection;
  };
  /**
   * Sets the layers that features will be read from.
   * @param {Array<string>} layers Layers.
   * @api
   */


  MVT.prototype.setLayers = function (layers) {
    this.layers_ = layers;
  };

  return MVT;
}(_Feature_js__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .ZP);
/**
 * Reader callback for parsing layers.
 * @param {number} tag The tag.
 * @param {Object} layers The layers object.
 * @param {PBF} pbf The PBF.
 */


function layersPBFReader(tag, layers, pbf) {
  if (tag === 3) {
    var layer = {
      keys: [],
      values: [],
      features: []
    };
    var end = pbf.readVarint() + pbf.pos;
    pbf.readFields(layerPBFReader, layer, end);
    layer.length = layer.features.length;

    if (layer.length) {
      layers[layer.name] = layer;
    }
  }
}
/**
 * Reader callback for parsing layer.
 * @param {number} tag The tag.
 * @param {Object} layer The layer object.
 * @param {PBF} pbf The PBF.
 */


function layerPBFReader(tag, layer, pbf) {
  if (tag === 15) {
    layer.version = pbf.readVarint();
  } else if (tag === 1) {
    layer.name = pbf.readString();
  } else if (tag === 5) {
    layer.extent = pbf.readVarint();
  } else if (tag === 2) {
    layer.features.push(pbf.pos);
  } else if (tag === 3) {
    layer.keys.push(pbf.readString());
  } else if (tag === 4) {
    var value = null;
    var end = pbf.readVarint() + pbf.pos;

    while (pbf.pos < end) {
      tag = pbf.readVarint() >> 3;
      value = tag === 1 ? pbf.readString() : tag === 2 ? pbf.readFloat() : tag === 3 ? pbf.readDouble() : tag === 4 ? pbf.readVarint64() : tag === 5 ? pbf.readVarint() : tag === 6 ? pbf.readSVarint() : tag === 7 ? pbf.readBoolean() : null;
    }

    layer.values.push(value);
  }
}
/**
 * Reader callback for parsing feature.
 * @param {number} tag The tag.
 * @param {Object} feature The feature object.
 * @param {PBF} pbf The PBF.
 */


function featurePBFReader(tag, feature, pbf) {
  if (tag == 1) {
    feature.id = pbf.readVarint();
  } else if (tag == 2) {
    var end = pbf.readVarint() + pbf.pos;

    while (pbf.pos < end) {
      var key = feature.layer.keys[pbf.readVarint()];
      var value = feature.layer.values[pbf.readVarint()];
      feature.properties[key] = value;
    }
  } else if (tag == 3) {
    feature.type = pbf.readVarint();
  } else if (tag == 4) {
    feature.geometry = pbf.pos;
  }
}
/**
 * Read a raw feature from the pbf offset stored at index `i` in the raw layer.
 * @param {PBF} pbf PBF.
 * @param {Object} layer Raw layer.
 * @param {number} i Index of the feature in the raw layer's `features` array.
 * @return {Object} Raw feature.
 */


function readRawFeature(pbf, layer, i) {
  pbf.pos = layer.features[i];
  var end = pbf.readVarint() + pbf.pos;
  var feature = {
    layer: layer,
    type: 0,
    properties: {}
  };
  pbf.readFields(featurePBFReader, feature, end);
  return feature;
}
/**
 * @param {number} type The raw feature's geometry type
 * @param {number} numEnds Number of ends of the flat coordinates of the
 * geometry.
 * @return {import("../geom/GeometryType.js").default} The geometry type.
 */


function getGeometryType(type, numEnds) {
  /** @type {import("../geom/GeometryType.js").default} */
  var geometryType;

  if (type === 1) {
    geometryType = numEnds === 1 ? _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].POINT */ .Z.POINT : _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].MULTI_POINT */ .Z.MULTI_POINT;
  } else if (type === 2) {
    geometryType = numEnds === 1 ? _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].LINE_STRING */ .Z.LINE_STRING : _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].MULTI_LINE_STRING */ .Z.MULTI_LINE_STRING;
  } else if (type === 3) {
    geometryType = _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].POLYGON */ .Z.POLYGON; // MultiPolygon not relevant for rendering - winding order determines
    // outer rings of polygons.
  }

  return geometryType;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MVT);

/***/ })

}]);