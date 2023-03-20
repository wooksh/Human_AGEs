"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[498],{

/***/ 4242:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G$": () => (/* binding */ WEBKIT),
/* harmony export */   "Id": () => (/* binding */ WORKER_OFFSCREEN_CANVAS),
/* harmony export */   "MP": () => (/* binding */ DEVICE_PIXEL_RATIO),
/* harmony export */   "Tp": () => (/* binding */ IMAGE_DECODE),
/* harmony export */   "V": () => (/* binding */ FIREFOX),
/* harmony export */   "bM": () => (/* binding */ PASSIVE_EVENT_LISTENERS),
/* harmony export */   "tK": () => (/* binding */ MAC)
/* harmony export */ });
/* unused harmony export SAFARI */
/**
 * @module ol/has
 */
var ua = typeof navigator !== 'undefined' && typeof navigator.userAgent !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
/**
 * User agent string says we are dealing with Firefox as browser.
 * @type {boolean}
 */

var FIREFOX = ua.indexOf('firefox') !== -1;
/**
 * User agent string says we are dealing with Safari as browser.
 * @type {boolean}
 */

var SAFARI = ua.indexOf('safari') !== -1 && ua.indexOf('chrom') == -1;
/**
 * User agent string says we are dealing with a WebKit engine.
 * @type {boolean}
 */

var WEBKIT = ua.indexOf('webkit') !== -1 && ua.indexOf('edge') == -1;
/**
 * User agent string says we are dealing with a Mac as platform.
 * @type {boolean}
 */

var MAC = ua.indexOf('macintosh') !== -1;
/**
 * The ratio between physical pixels and device-independent pixels
 * (dips) on the device (`window.devicePixelRatio`).
 * @const
 * @type {number}
 * @api
 */

var DEVICE_PIXEL_RATIO = typeof devicePixelRatio !== 'undefined' ? devicePixelRatio : 1;
/**
 * The execution context is a worker with OffscreenCanvas available.
 * @const
 * @type {boolean}
 */

var WORKER_OFFSCREEN_CANVAS = typeof WorkerGlobalScope !== 'undefined' && typeof OffscreenCanvas !== 'undefined' && self instanceof WorkerGlobalScope; //eslint-disable-line

/**
 * Image.prototype.decode() is supported.
 * @type {boolean}
 */

var IMAGE_DECODE = typeof Image !== 'undefined' && Image.prototype.decode;
/**
 * @type {boolean}
 */

var PASSIVE_EVENT_LISTENERS = function () {
  var passive = false;

  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function () {
        passive = true;
      }
    });
    window.addEventListener('_', null, options);
    window.removeEventListener('_', null, options);
  } catch (error) {// passive not supported
  }

  return passive;
}();

/***/ }),

/***/ 1838:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ce": () => (/* binding */ defaults)
});

// UNUSED EXPORTS: DoubleClickZoom, DragAndDrop, DragBox, DragPan, DragRotate, DragRotateAndZoom, DragZoom, Draw, Extent, Interaction, KeyboardPan, KeyboardZoom, Modify, MouseWheelZoom, PinchRotate, PinchZoom, Pointer, Select, Snap, Translate

// EXTERNAL MODULE: ./node_modules/ol/Collection.js
var Collection = __webpack_require__(1210);
// EXTERNAL MODULE: ./node_modules/ol/interaction/Interaction.js
var Interaction = __webpack_require__(3873);
// EXTERNAL MODULE: ./node_modules/ol/MapBrowserEventType.js
var MapBrowserEventType = __webpack_require__(3998);
;// CONCATENATED MODULE: ./node_modules/ol/interaction/DoubleClickZoom.js
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
 * @module ol/interaction/DoubleClickZoom
 */




/**
 * @typedef {Object} Options
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {number} [delta=1] The zoom delta applied on each double click.
 */

/**
 * @classdesc
 * Allows the user to zoom by double-clicking on the map.
 * @api
 */

var DoubleClickZoom =
/** @class */
function (_super) {
  __extends(DoubleClickZoom, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function DoubleClickZoom(opt_options) {
    var _this = _super.call(this) || this;

    var options = opt_options ? opt_options : {};
    /**
     * @private
     * @type {number}
     */

    _this.delta_ = options.delta ? options.delta : 1;
    /**
     * @private
     * @type {number}
     */

    _this.duration_ = options.duration !== undefined ? options.duration : 250;
    return _this;
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent map browser event} (if it was a
   * doubleclick) and eventually zooms the map.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   */


  DoubleClickZoom.prototype.handleEvent = function (mapBrowserEvent) {
    var stopEvent = false;

    if (mapBrowserEvent.type == MapBrowserEventType/* default.DBLCLICK */.Z.DBLCLICK) {
      var browserEvent =
      /** @type {MouseEvent} */
      mapBrowserEvent.originalEvent;
      var map = mapBrowserEvent.map;
      var anchor = mapBrowserEvent.coordinate;
      var delta = browserEvent.shiftKey ? -this.delta_ : this.delta_;
      var view = map.getView();
      (0,Interaction/* zoomByDelta */.FW)(view, delta, anchor, this.duration_);
      browserEvent.preventDefault();
      stopEvent = true;
    }

    return !stopEvent;
  };

  return DoubleClickZoom;
}(Interaction/* default */.ZP);

/* harmony default export */ const interaction_DoubleClickZoom = (DoubleClickZoom);
// EXTERNAL MODULE: ./node_modules/ol/interaction/Pointer.js
var Pointer = __webpack_require__(6396);
// EXTERNAL MODULE: ./node_modules/ol/functions.js
var functions = __webpack_require__(3658);
// EXTERNAL MODULE: ./node_modules/ol/events/condition.js
var events_condition = __webpack_require__(8970);
// EXTERNAL MODULE: ./node_modules/ol/easing.js
var easing = __webpack_require__(9635);
// EXTERNAL MODULE: ./node_modules/ol/coordinate.js
var coordinate = __webpack_require__(4413);
;// CONCATENATED MODULE: ./node_modules/ol/interaction/DragPan.js
var DragPan_extends = undefined && undefined.__extends || function () {
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
 * @module ol/interaction/DragPan
 */







/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
 * to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition.noModifierKeys} and {@link module:ol/events/condition.primaryAction}.
 * @property {boolean} [onFocusOnly=false] When the map's target has a `tabindex` attribute set,
 * the interaction will only handle events when the map has the focus.
 * @property {import("../Kinetic.js").default} [kinetic] Kinetic inertia to apply to the pan.
 */

/**
 * @classdesc
 * Allows the user to pan the map by dragging the map.
 * @api
 */

var DragPan =
/** @class */
function (_super) {
  DragPan_extends(DragPan, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function DragPan(opt_options) {
    var _this = _super.call(this, {
      stopDown: functions/* FALSE */.Dv
    }) || this;

    var options = opt_options ? opt_options : {};
    /**
     * @private
     * @type {import("../Kinetic.js").default|undefined}
     */

    _this.kinetic_ = options.kinetic;
    /**
     * @type {import("../pixel.js").Pixel}
     */

    _this.lastCentroid = null;
    /**
     * @type {number}
     */

    _this.lastPointersCount_;
    /**
     * @type {boolean}
     */

    _this.panning_ = false;
    var condition = options.condition ? options.condition : (0,events_condition/* all */.$6)(events_condition/* noModifierKeys */.rM, events_condition/* primaryAction */.Xp);
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */

    _this.condition_ = options.onFocusOnly ? (0,events_condition/* all */.$6)(events_condition/* focusWithTabindex */.yZ, condition) : condition;
    /**
     * @private
     * @type {boolean}
     */

    _this.noKinetic_ = false;
    return _this;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   */


  DragPan.prototype.handleDragEvent = function (mapBrowserEvent) {
    if (!this.panning_) {
      this.panning_ = true;
      this.getMap().getView().beginInteraction();
    }

    var targetPointers = this.targetPointers;
    var centroid = (0,Pointer/* centroid */.S)(targetPointers);

    if (targetPointers.length == this.lastPointersCount_) {
      if (this.kinetic_) {
        this.kinetic_.update(centroid[0], centroid[1]);
      }

      if (this.lastCentroid) {
        var delta = [this.lastCentroid[0] - centroid[0], centroid[1] - this.lastCentroid[1]];
        var map = mapBrowserEvent.map;
        var view = map.getView();
        (0,coordinate/* scale */.bA)(delta, view.getResolution());
        (0,coordinate/* rotate */.U1)(delta, view.getRotation());
        view.adjustCenterInternal(delta);
      }
    } else if (this.kinetic_) {
      // reset so we don't overestimate the kinetic energy after
      // after one finger down, tiny drag, second finger down
      this.kinetic_.begin();
    }

    this.lastCentroid = centroid;
    this.lastPointersCount_ = targetPointers.length;
    mapBrowserEvent.originalEvent.preventDefault();
  };
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */


  DragPan.prototype.handleUpEvent = function (mapBrowserEvent) {
    var map = mapBrowserEvent.map;
    var view = map.getView();

    if (this.targetPointers.length === 0) {
      if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
        var distance = this.kinetic_.getDistance();
        var angle = this.kinetic_.getAngle();
        var center = view.getCenterInternal();
        var centerpx = map.getPixelFromCoordinateInternal(center);
        var dest = map.getCoordinateFromPixelInternal([centerpx[0] - distance * Math.cos(angle), centerpx[1] - distance * Math.sin(angle)]);
        view.animateInternal({
          center: view.getConstrainedCenter(dest),
          duration: 500,
          easing: easing/* easeOut */.Vv
        });
      }

      if (this.panning_) {
        this.panning_ = false;
        view.endInteraction();
      }

      return false;
    } else {
      if (this.kinetic_) {
        // reset so we don't overestimate the kinetic energy after
        // after one finger up, tiny drag, second finger up
        this.kinetic_.begin();
      }

      this.lastCentroid = null;
      return true;
    }
  };
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */


  DragPan.prototype.handleDownEvent = function (mapBrowserEvent) {
    if (this.targetPointers.length > 0 && this.condition_(mapBrowserEvent)) {
      var map = mapBrowserEvent.map;
      var view = map.getView();
      this.lastCentroid = null; // stop any current animation

      if (view.getAnimating()) {
        view.cancelAnimations();
      }

      if (this.kinetic_) {
        this.kinetic_.begin();
      } // No kinetic as soon as more than one pointer on the screen is
      // detected. This is to prevent nasty pans after pinch.


      this.noKinetic_ = this.targetPointers.length > 1;
      return true;
    } else {
      return false;
    }
  };

  return DragPan;
}(Pointer/* default */.Z);

/* harmony default export */ const interaction_DragPan = (DragPan);
// EXTERNAL MODULE: ./node_modules/ol/rotationconstraint.js
var rotationconstraint = __webpack_require__(2270);
;// CONCATENATED MODULE: ./node_modules/ol/interaction/DragRotate.js
var DragRotate_extends = undefined && undefined.__extends || function () {
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
 * @module ol/interaction/DragRotate
 */






/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that takes an
 * {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
 * to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition.altShiftKeysOnly}.
 * @property {number} [duration=250] Animation duration in milliseconds.
 */

/**
 * @classdesc
 * Allows the user to rotate the map by clicking and dragging on the map,
 * normally combined with an {@link module:ol/events/condition} that limits
 * it to when the alt and shift keys are held down.
 *
 * This interaction is only supported for mouse devices.
 * @api
 */

var DragRotate =
/** @class */
function (_super) {
  DragRotate_extends(DragRotate, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function DragRotate(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    _this = _super.call(this, {
      stopDown: functions/* FALSE */.Dv
    }) || this;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */

    _this.condition_ = options.condition ? options.condition : events_condition/* altShiftKeysOnly */.aj;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.lastAngle_ = undefined;
    /**
     * @private
     * @type {number}
     */

    _this.duration_ = options.duration !== undefined ? options.duration : 250;
    return _this;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   */


  DragRotate.prototype.handleDragEvent = function (mapBrowserEvent) {
    if (!(0,events_condition/* mouseOnly */.QL)(mapBrowserEvent)) {
      return;
    }

    var map = mapBrowserEvent.map;
    var view = map.getView();

    if (view.getConstraints().rotation === rotationconstraint/* disable */.h$) {
      return;
    }

    var size = map.getSize();
    var offset = mapBrowserEvent.pixel;
    var theta = Math.atan2(size[1] / 2 - offset[1], offset[0] - size[0] / 2);

    if (this.lastAngle_ !== undefined) {
      var delta = theta - this.lastAngle_;
      view.adjustRotationInternal(-delta);
    }

    this.lastAngle_ = theta;
  };
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */


  DragRotate.prototype.handleUpEvent = function (mapBrowserEvent) {
    if (!(0,events_condition/* mouseOnly */.QL)(mapBrowserEvent)) {
      return true;
    }

    var map = mapBrowserEvent.map;
    var view = map.getView();
    view.endInteraction(this.duration_);
    return false;
  };
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */


  DragRotate.prototype.handleDownEvent = function (mapBrowserEvent) {
    if (!(0,events_condition/* mouseOnly */.QL)(mapBrowserEvent)) {
      return false;
    }

    if ((0,events_condition/* mouseActionButton */.v8)(mapBrowserEvent) && this.condition_(mapBrowserEvent)) {
      var map = mapBrowserEvent.map;
      map.getView().beginInteraction();
      this.lastAngle_ = undefined;
      return true;
    } else {
      return false;
    }
  };

  return DragRotate;
}(Pointer/* default */.Z);

/* harmony default export */ const interaction_DragRotate = (DragRotate);
// EXTERNAL MODULE: ./node_modules/ol/interaction/DragBox.js
var DragBox = __webpack_require__(7214);
;// CONCATENATED MODULE: ./node_modules/ol/interaction/DragZoom.js
var DragZoom_extends = undefined && undefined.__extends || function () {
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
 * @module ol/interaction/DragZoom
 */





/**
 * @typedef {Object} Options
 * @property {string} [className='ol-dragzoom'] CSS class name for styling the
 * box.
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition.shiftKeyOnly}.
 * @property {number} [duration=200] Animation duration in milliseconds.
 * @property {boolean} [out=false] Use interaction for zooming out.
 * @property {number} [minArea=64] The minimum area of the box in pixel, this value is used by the parent default
 * `boxEndCondition` function.
 */

/**
 * @classdesc
 * Allows the user to zoom the map by clicking and dragging on the map,
 * normally combined with an {@link module:ol/events/condition} that limits
 * it to when a key, shift by default, is held down.
 *
 * To change the style of the box, use CSS and the `.ol-dragzoom` selector, or
 * your custom one configured with `className`.
 * @api
 */

var DragZoom =
/** @class */
function (_super) {
  DragZoom_extends(DragZoom, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function DragZoom(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    var condition = options.condition ? options.condition : events_condition/* shiftKeyOnly */.vY;
    _this = _super.call(this, {
      condition: condition,
      className: options.className || 'ol-dragzoom',
      minArea: options.minArea
    }) || this;
    /**
     * @private
     * @type {number}
     */

    _this.duration_ = options.duration !== undefined ? options.duration : 200;
    /**
     * @private
     * @type {boolean}
     */

    _this.out_ = options.out !== undefined ? options.out : false;
    return _this;
  }
  /**
   * Function to execute just before `onboxend` is fired
   * @param {import("../MapBrowserEvent.js").default} event Event.
   */


  DragZoom.prototype.onBoxEnd = function (event) {
    var map = this.getMap();
    var view =
    /** @type {!import("../View.js").default} */
    map.getView();
    var geometry = this.getGeometry();

    if (this.out_) {
      var rotatedExtent = view.rotatedExtentForGeometry(geometry);
      var resolution = view.getResolutionForExtentInternal(rotatedExtent);
      var factor = view.getResolution() / resolution;
      geometry = geometry.clone();
      geometry.scale(factor * factor);
    }

    view.fitInternal(geometry, {
      duration: this.duration_,
      easing: easing/* easeOut */.Vv
    });
  };

  return DragZoom;
}(DragBox/* default */.Z);

/* harmony default export */ const interaction_DragZoom = (DragZoom);
// EXTERNAL MODULE: ./node_modules/ol/events/EventType.js
var EventType = __webpack_require__(2140);
// EXTERNAL MODULE: ./node_modules/ol/events/KeyCode.js
var KeyCode = __webpack_require__(5553);
;// CONCATENATED MODULE: ./node_modules/ol/interaction/KeyboardPan.js
var KeyboardPan_extends = undefined && undefined.__extends || function () {
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
 * @module ol/interaction/KeyboardPan
 */







/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. Default is
 * {@link module:ol/events/condition.noModifierKeys} and
 * {@link module:ol/events/condition.targetNotEditable}.
 * @property {number} [duration=100] Animation duration in milliseconds.
 * @property {number} [pixelDelta=128] The amount of pixels to pan on each key
 * press.
 */

/**
 * @classdesc
 * Allows the user to pan the map using keyboard arrows.
 * Note that, although this interaction is by default included in maps,
 * the keys can only be used when browser focus is on the element to which
 * the keyboard events are attached. By default, this is the map div,
 * though you can change this with the `keyboardEventTarget` in
 * {@link module:ol/Map~Map}. `document` never loses focus but, for any other
 * element, focus will have to be on, and returned to, this element if the keys
 * are to function.
 * See also {@link module:ol/interaction/KeyboardZoom~KeyboardZoom}.
 * @api
 */

var KeyboardPan =
/** @class */
function (_super) {
  KeyboardPan_extends(KeyboardPan, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function KeyboardPan(opt_options) {
    var _this = _super.call(this) || this;

    var options = opt_options || {};
    /**
     * @private
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Browser event.
     * @return {boolean} Combined condition result.
     */

    _this.defaultCondition_ = function (mapBrowserEvent) {
      return (0,events_condition/* noModifierKeys */.rM)(mapBrowserEvent) && (0,events_condition/* targetNotEditable */.TN)(mapBrowserEvent);
    };
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */


    _this.condition_ = options.condition !== undefined ? options.condition : _this.defaultCondition_;
    /**
     * @private
     * @type {number}
     */

    _this.duration_ = options.duration !== undefined ? options.duration : 100;
    /**
     * @private
     * @type {number}
     */

    _this.pixelDelta_ = options.pixelDelta !== undefined ? options.pixelDelta : 128;
    return _this;
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent map browser event} if it was a
   * `KeyEvent`, and decides the direction to pan to (if an arrow key was
   * pressed).
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @this {KeyboardPan}
   */


  KeyboardPan.prototype.handleEvent = function (mapBrowserEvent) {
    var stopEvent = false;

    if (mapBrowserEvent.type == EventType/* default.KEYDOWN */.Z.KEYDOWN) {
      var keyEvent =
      /** @type {KeyboardEvent} */
      mapBrowserEvent.originalEvent;
      var keyCode = keyEvent.keyCode;

      if (this.condition_(mapBrowserEvent) && (keyCode == KeyCode/* default.DOWN */.Z.DOWN || keyCode == KeyCode/* default.LEFT */.Z.LEFT || keyCode == KeyCode/* default.RIGHT */.Z.RIGHT || keyCode == KeyCode/* default.UP */.Z.UP)) {
        var map = mapBrowserEvent.map;
        var view = map.getView();
        var mapUnitsDelta = view.getResolution() * this.pixelDelta_;
        var deltaX = 0,
            deltaY = 0;

        if (keyCode == KeyCode/* default.DOWN */.Z.DOWN) {
          deltaY = -mapUnitsDelta;
        } else if (keyCode == KeyCode/* default.LEFT */.Z.LEFT) {
          deltaX = -mapUnitsDelta;
        } else if (keyCode == KeyCode/* default.RIGHT */.Z.RIGHT) {
          deltaX = mapUnitsDelta;
        } else {
          deltaY = mapUnitsDelta;
        }

        var delta = [deltaX, deltaY];
        (0,coordinate/* rotate */.U1)(delta, view.getRotation());
        (0,Interaction/* pan */.Cv)(view, delta, this.duration_);
        keyEvent.preventDefault();
        stopEvent = true;
      }
    }

    return !stopEvent;
  };

  return KeyboardPan;
}(Interaction/* default */.ZP);

/* harmony default export */ const interaction_KeyboardPan = (KeyboardPan);
;// CONCATENATED MODULE: ./node_modules/ol/interaction/KeyboardZoom.js
var KeyboardZoom_extends = undefined && undefined.__extends || function () {
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
 * @module ol/interaction/KeyboardZoom
 */





/**
 * @typedef {Object} Options
 * @property {number} [duration=100] Animation duration in milliseconds.
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. Default is
 * {@link module:ol/events/condition.targetNotEditable}.
 * @property {number} [delta=1] The zoom level delta on each key press.
 */

/**
 * @classdesc
 * Allows the user to zoom the map using keyboard + and -.
 * Note that, although this interaction is by default included in maps,
 * the keys can only be used when browser focus is on the element to which
 * the keyboard events are attached. By default, this is the map div,
 * though you can change this with the `keyboardEventTarget` in
 * {@link module:ol/Map~Map}. `document` never loses focus but, for any other
 * element, focus will have to be on, and returned to, this element if the keys
 * are to function.
 * See also {@link module:ol/interaction/KeyboardPan~KeyboardPan}.
 * @api
 */

var KeyboardZoom =
/** @class */
function (_super) {
  KeyboardZoom_extends(KeyboardZoom, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function KeyboardZoom(opt_options) {
    var _this = _super.call(this) || this;

    var options = opt_options ? opt_options : {};
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */

    _this.condition_ = options.condition ? options.condition : events_condition/* targetNotEditable */.TN;
    /**
     * @private
     * @type {number}
     */

    _this.delta_ = options.delta ? options.delta : 1;
    /**
     * @private
     * @type {number}
     */

    _this.duration_ = options.duration !== undefined ? options.duration : 100;
    return _this;
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent map browser event} if it was a
   * `KeyEvent`, and decides whether to zoom in or out (depending on whether the
   * key pressed was '+' or '-').
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @this {KeyboardZoom}
   */


  KeyboardZoom.prototype.handleEvent = function (mapBrowserEvent) {
    var stopEvent = false;

    if (mapBrowserEvent.type == EventType/* default.KEYDOWN */.Z.KEYDOWN || mapBrowserEvent.type == EventType/* default.KEYPRESS */.Z.KEYPRESS) {
      var keyEvent =
      /** @type {KeyboardEvent} */
      mapBrowserEvent.originalEvent;
      var charCode = keyEvent.charCode;

      if (this.condition_(mapBrowserEvent) && (charCode == '+'.charCodeAt(0) || charCode == '-'.charCodeAt(0))) {
        var map = mapBrowserEvent.map;
        var delta = charCode == '+'.charCodeAt(0) ? this.delta_ : -this.delta_;
        var view = map.getView();
        (0,Interaction/* zoomByDelta */.FW)(view, delta, undefined, this.duration_);
        keyEvent.preventDefault();
        stopEvent = true;
      }
    }

    return !stopEvent;
  };

  return KeyboardZoom;
}(Interaction/* default */.ZP);

/* harmony default export */ const interaction_KeyboardZoom = (KeyboardZoom);
// EXTERNAL MODULE: ./node_modules/ol/Kinetic.js
var Kinetic = __webpack_require__(8221);
// EXTERNAL MODULE: ./node_modules/ol/has.js
var has = __webpack_require__(4242);
// EXTERNAL MODULE: ./node_modules/ol/math.js
var math = __webpack_require__(4495);
;// CONCATENATED MODULE: ./node_modules/ol/interaction/MouseWheelZoom.js
var MouseWheelZoom_extends = undefined && undefined.__extends || function () {
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
 * @module ol/interaction/MouseWheelZoom
 */







/**
 * @enum {string}
 */

var Mode = {
  TRACKPAD: 'trackpad',
  WHEEL: 'wheel'
};
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. Default is
 * {@link module:ol/events/condition.always}.
 * @property {boolean} [onFocusOnly=false] When the map's target has a `tabindex` attribute set,
 * the interaction will only handle events when the map has the focus.
 * @property {number} [maxDelta=1] Maximum mouse wheel delta.
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {number} [timeout=80] Mouse wheel timeout duration in milliseconds.
 * @property {boolean} [useAnchor=true] Enable zooming using the mouse's
 * location as the anchor. When set to `false`, zooming in and out will zoom to
 * the center of the screen instead of zooming on the mouse's location.
 * @property {boolean} [constrainResolution=false] If true, the mouse wheel zoom
 * event will always animate to the closest zoom level after an interaction;
 * false means intermediary zoom levels are allowed.
 */

/**
 * @classdesc
 * Allows the user to zoom the map by scrolling the mouse wheel.
 * @api
 */

var MouseWheelZoom =
/** @class */
function (_super) {
  MouseWheelZoom_extends(MouseWheelZoom, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function MouseWheelZoom(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    _this = _super.call(this,
    /** @type {import("./Interaction.js").InteractionOptions} */
    options) || this;
    /**
     * @private
     * @type {number}
     */

    _this.totalDelta_ = 0;
    /**
     * @private
     * @type {number}
     */

    _this.lastDelta_ = 0;
    /**
     * @private
     * @type {number}
     */

    _this.maxDelta_ = options.maxDelta !== undefined ? options.maxDelta : 1;
    /**
     * @private
     * @type {number}
     */

    _this.duration_ = options.duration !== undefined ? options.duration : 250;
    /**
     * @private
     * @type {number}
     */

    _this.timeout_ = options.timeout !== undefined ? options.timeout : 80;
    /**
     * @private
     * @type {boolean}
     */

    _this.useAnchor_ = options.useAnchor !== undefined ? options.useAnchor : true;
    /**
     * @private
     * @type {boolean}
     */

    _this.constrainResolution_ = options.constrainResolution !== undefined ? options.constrainResolution : false;
    var condition = options.condition ? options.condition : events_condition/* always */.Bx;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */

    _this.condition_ = options.onFocusOnly ? (0,events_condition/* all */.$6)(events_condition/* focusWithTabindex */.yZ, condition) : condition;
    /**
     * @private
     * @type {?import("../coordinate.js").Coordinate}
     */

    _this.lastAnchor_ = null;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.startTime_ = undefined;
    /**
     * @private
     * @type {?}
     */

    _this.timeoutId_;
    /**
     * @private
     * @type {Mode|undefined}
     */

    _this.mode_ = undefined;
    /**
     * Trackpad events separated by this delay will be considered separate
     * interactions.
     * @type {number}
     */

    _this.trackpadEventGap_ = 400;
    /**
     * @type {?}
     */

    _this.trackpadTimeoutId_;
    /**
     * The number of delta values per zoom level
     * @private
     * @type {number}
     */

    _this.deltaPerZoom_ = 300;
    return _this;
  }
  /**
   * @private
   */


  MouseWheelZoom.prototype.endInteraction_ = function () {
    this.trackpadTimeoutId_ = undefined;
    var view = this.getMap().getView();
    view.endInteraction(undefined, this.lastDelta_ ? this.lastDelta_ > 0 ? 1 : -1 : 0, this.lastAnchor_);
  };
  /**
   * Handles the {@link module:ol/MapBrowserEvent map browser event} (if it was a mousewheel-event) and eventually
   * zooms the map.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   */


  MouseWheelZoom.prototype.handleEvent = function (mapBrowserEvent) {
    if (!this.condition_(mapBrowserEvent)) {
      return true;
    }

    var type = mapBrowserEvent.type;

    if (type !== EventType/* default.WHEEL */.Z.WHEEL) {
      return true;
    }

    var map = mapBrowserEvent.map;
    var wheelEvent =
    /** @type {WheelEvent} */
    mapBrowserEvent.originalEvent;
    wheelEvent.preventDefault();

    if (this.useAnchor_) {
      this.lastAnchor_ = mapBrowserEvent.coordinate;
    } // Delta normalisation inspired by
    // https://github.com/mapbox/mapbox-gl-js/blob/001c7b9/js/ui/handler/scroll_zoom.js


    var delta;

    if (mapBrowserEvent.type == EventType/* default.WHEEL */.Z.WHEEL) {
      delta = wheelEvent.deltaY;

      if (has/* FIREFOX */.V && wheelEvent.deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
        delta /= has/* DEVICE_PIXEL_RATIO */.MP;
      }

      if (wheelEvent.deltaMode === WheelEvent.DOM_DELTA_LINE) {
        delta *= 40;
      }
    }

    if (delta === 0) {
      return false;
    } else {
      this.lastDelta_ = delta;
    }

    var now = Date.now();

    if (this.startTime_ === undefined) {
      this.startTime_ = now;
    }

    if (!this.mode_ || now - this.startTime_ > this.trackpadEventGap_) {
      this.mode_ = Math.abs(delta) < 4 ? Mode.TRACKPAD : Mode.WHEEL;
    }

    var view = map.getView();

    if (this.mode_ === Mode.TRACKPAD && !(view.getConstrainResolution() || this.constrainResolution_)) {
      if (this.trackpadTimeoutId_) {
        clearTimeout(this.trackpadTimeoutId_);
      } else {
        if (view.getAnimating()) {
          view.cancelAnimations();
        }

        view.beginInteraction();
      }

      this.trackpadTimeoutId_ = setTimeout(this.endInteraction_.bind(this), this.timeout_);
      view.adjustZoom(-delta / this.deltaPerZoom_, this.lastAnchor_);
      this.startTime_ = now;
      return false;
    }

    this.totalDelta_ += delta;
    var timeLeft = Math.max(this.timeout_ - (now - this.startTime_), 0);
    clearTimeout(this.timeoutId_);
    this.timeoutId_ = setTimeout(this.handleWheelZoom_.bind(this, map), timeLeft);
    return false;
  };
  /**
   * @private
   * @param {import("../PluggableMap.js").default} map Map.
   */


  MouseWheelZoom.prototype.handleWheelZoom_ = function (map) {
    var view = map.getView();

    if (view.getAnimating()) {
      view.cancelAnimations();
    }

    var delta = -(0,math/* clamp */.uZ)(this.totalDelta_, -this.maxDelta_ * this.deltaPerZoom_, this.maxDelta_ * this.deltaPerZoom_) / this.deltaPerZoom_;

    if (view.getConstrainResolution() || this.constrainResolution_) {
      // view has a zoom constraint, zoom by 1
      delta = delta ? delta > 0 ? 1 : -1 : 0;
    }

    (0,Interaction/* zoomByDelta */.FW)(view, delta, this.lastAnchor_, this.duration_);
    this.mode_ = undefined;
    this.totalDelta_ = 0;
    this.lastAnchor_ = null;
    this.startTime_ = undefined;
    this.timeoutId_ = undefined;
  };
  /**
   * Enable or disable using the mouse's location as an anchor when zooming
   * @param {boolean} useAnchor true to zoom to the mouse's location, false
   * to zoom to the center of the map
   * @api
   */


  MouseWheelZoom.prototype.setMouseAnchor = function (useAnchor) {
    this.useAnchor_ = useAnchor;

    if (!useAnchor) {
      this.lastAnchor_ = null;
    }
  };

  return MouseWheelZoom;
}(Interaction/* default */.ZP);

/* harmony default export */ const interaction_MouseWheelZoom = (MouseWheelZoom);
;// CONCATENATED MODULE: ./node_modules/ol/interaction/PinchRotate.js
var PinchRotate_extends = undefined && undefined.__extends || function () {
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
 * @module ol/interaction/PinchRotate
 */





/**
 * @typedef {Object} Options
 * @property {number} [duration=250] The duration of the animation in
 * milliseconds.
 * @property {number} [threshold=0.3] Minimal angle in radians to start a rotation.
 */

/**
 * @classdesc
 * Allows the user to rotate the map by twisting with two fingers
 * on a touch screen.
 * @api
 */

var PinchRotate =
/** @class */
function (_super) {
  PinchRotate_extends(PinchRotate, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function PinchRotate(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    var pointerOptions =
    /** @type {import("./Pointer.js").Options} */
    options;

    if (!pointerOptions.stopDown) {
      pointerOptions.stopDown = functions/* FALSE */.Dv;
    }

    _this = _super.call(this, pointerOptions) || this;
    /**
     * @private
     * @type {import("../coordinate.js").Coordinate}
     */

    _this.anchor_ = null;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.lastAngle_ = undefined;
    /**
     * @private
     * @type {boolean}
     */

    _this.rotating_ = false;
    /**
     * @private
     * @type {number}
     */

    _this.rotationDelta_ = 0.0;
    /**
     * @private
     * @type {number}
     */

    _this.threshold_ = options.threshold !== undefined ? options.threshold : 0.3;
    /**
     * @private
     * @type {number}
     */

    _this.duration_ = options.duration !== undefined ? options.duration : 250;
    return _this;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   */


  PinchRotate.prototype.handleDragEvent = function (mapBrowserEvent) {
    var rotationDelta = 0.0;
    var touch0 = this.targetPointers[0];
    var touch1 = this.targetPointers[1]; // angle between touches

    var angle = Math.atan2(touch1.clientY - touch0.clientY, touch1.clientX - touch0.clientX);

    if (this.lastAngle_ !== undefined) {
      var delta = angle - this.lastAngle_;
      this.rotationDelta_ += delta;

      if (!this.rotating_ && Math.abs(this.rotationDelta_) > this.threshold_) {
        this.rotating_ = true;
      }

      rotationDelta = delta;
    }

    this.lastAngle_ = angle;
    var map = mapBrowserEvent.map;
    var view = map.getView();

    if (view.getConstraints().rotation === rotationconstraint/* disable */.h$) {
      return;
    } // rotate anchor point.
    // FIXME: should be the intersection point between the lines:
    //     touch0,touch1 and previousTouch0,previousTouch1


    var viewportPosition = map.getViewport().getBoundingClientRect();
    var centroid = (0,Pointer/* centroid */.S)(this.targetPointers);
    centroid[0] -= viewportPosition.left;
    centroid[1] -= viewportPosition.top;
    this.anchor_ = map.getCoordinateFromPixelInternal(centroid); // rotate

    if (this.rotating_) {
      map.render();
      view.adjustRotationInternal(rotationDelta, this.anchor_);
    }
  };
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */


  PinchRotate.prototype.handleUpEvent = function (mapBrowserEvent) {
    if (this.targetPointers.length < 2) {
      var map = mapBrowserEvent.map;
      var view = map.getView();
      view.endInteraction(this.duration_);
      return false;
    } else {
      return true;
    }
  };
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */


  PinchRotate.prototype.handleDownEvent = function (mapBrowserEvent) {
    if (this.targetPointers.length >= 2) {
      var map = mapBrowserEvent.map;
      this.anchor_ = null;
      this.lastAngle_ = undefined;
      this.rotating_ = false;
      this.rotationDelta_ = 0.0;

      if (!this.handlingDownUpSequence) {
        map.getView().beginInteraction();
      }

      return true;
    } else {
      return false;
    }
  };

  return PinchRotate;
}(Pointer/* default */.Z);

/* harmony default export */ const interaction_PinchRotate = (PinchRotate);
;// CONCATENATED MODULE: ./node_modules/ol/interaction/PinchZoom.js
var PinchZoom_extends = undefined && undefined.__extends || function () {
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
 * @module ol/interaction/PinchZoom
 */




/**
 * @typedef {Object} Options
 * @property {number} [duration=400] Animation duration in milliseconds.
 */

/**
 * @classdesc
 * Allows the user to zoom the map by pinching with two fingers
 * on a touch screen.
 * @api
 */

var PinchZoom =
/** @class */
function (_super) {
  PinchZoom_extends(PinchZoom, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function PinchZoom(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    var pointerOptions =
    /** @type {import("./Pointer.js").Options} */
    options;

    if (!pointerOptions.stopDown) {
      pointerOptions.stopDown = functions/* FALSE */.Dv;
    }

    _this = _super.call(this, pointerOptions) || this;
    /**
     * @private
     * @type {import("../coordinate.js").Coordinate}
     */

    _this.anchor_ = null;
    /**
     * @private
     * @type {number}
     */

    _this.duration_ = options.duration !== undefined ? options.duration : 400;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.lastDistance_ = undefined;
    /**
     * @private
     * @type {number}
     */

    _this.lastScaleDelta_ = 1;
    return _this;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   */


  PinchZoom.prototype.handleDragEvent = function (mapBrowserEvent) {
    var scaleDelta = 1.0;
    var touch0 = this.targetPointers[0];
    var touch1 = this.targetPointers[1];
    var dx = touch0.clientX - touch1.clientX;
    var dy = touch0.clientY - touch1.clientY; // distance between touches

    var distance = Math.sqrt(dx * dx + dy * dy);

    if (this.lastDistance_ !== undefined) {
      scaleDelta = this.lastDistance_ / distance;
    }

    this.lastDistance_ = distance;
    var map = mapBrowserEvent.map;
    var view = map.getView();

    if (scaleDelta != 1.0) {
      this.lastScaleDelta_ = scaleDelta;
    } // scale anchor point.


    var viewportPosition = map.getViewport().getBoundingClientRect();
    var centroid = (0,Pointer/* centroid */.S)(this.targetPointers);
    centroid[0] -= viewportPosition.left;
    centroid[1] -= viewportPosition.top;
    this.anchor_ = map.getCoordinateFromPixelInternal(centroid); // scale, bypass the resolution constraint

    map.render();
    view.adjustResolutionInternal(scaleDelta, this.anchor_);
  };
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */


  PinchZoom.prototype.handleUpEvent = function (mapBrowserEvent) {
    if (this.targetPointers.length < 2) {
      var map = mapBrowserEvent.map;
      var view = map.getView();
      var direction = this.lastScaleDelta_ > 1 ? 1 : -1;
      view.endInteraction(this.duration_, direction);
      return false;
    } else {
      return true;
    }
  };
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */


  PinchZoom.prototype.handleDownEvent = function (mapBrowserEvent) {
    if (this.targetPointers.length >= 2) {
      var map = mapBrowserEvent.map;
      this.anchor_ = null;
      this.lastDistance_ = undefined;
      this.lastScaleDelta_ = 1;

      if (!this.handlingDownUpSequence) {
        map.getView().beginInteraction();
      }

      return true;
    } else {
      return false;
    }
  };

  return PinchZoom;
}(Pointer/* default */.Z);

/* harmony default export */ const interaction_PinchZoom = (PinchZoom);
;// CONCATENATED MODULE: ./node_modules/ol/interaction.js
/**
 * @module ol/interaction
 */































/**
 * @typedef {Object} DefaultsOptions
 * @property {boolean} [altShiftDragRotate=true] Whether Alt-Shift-drag rotate is
 * desired.
 * @property {boolean} [onFocusOnly=false] Interact only when the map has the
 * focus. This affects the `MouseWheelZoom` and `DragPan` interactions and is
 * useful when page scroll is desired for maps that do not have the browser's
 * focus.
 * @property {boolean} [doubleClickZoom=true] Whether double click zoom is
 * desired.
 * @property {boolean} [keyboard=true] Whether keyboard interaction is desired.
 * @property {boolean} [mouseWheelZoom=true] Whether mousewheel zoom is desired.
 * @property {boolean} [shiftDragZoom=true] Whether Shift-drag zoom is desired.
 * @property {boolean} [dragPan=true] Whether drag pan is desired.
 * @property {boolean} [pinchRotate=true] Whether pinch rotate is desired.
 * @property {boolean} [pinchZoom=true] Whether pinch zoom is desired.
 * @property {number} [zoomDelta] Zoom level delta when using keyboard or double click zoom.
 * @property {number} [zoomDuration] Duration of the zoom animation in
 * milliseconds.
 */

/**
 * Set of interactions included in maps by default. Specific interactions can be
 * excluded by setting the appropriate option to false in the constructor
 * options, but the order of the interactions is fixed.  If you want to specify
 * a different order for interactions, you will need to create your own
 * {@link module:ol/interaction/Interaction} instances and insert
 * them into a {@link module:ol/Collection} in the order you want
 * before creating your {@link module:ol/Map~Map} instance. Changing the order can
 * be of interest if the event propagation needs to be stopped at a point.
 * The default set of interactions, in sequence, is:
 * * {@link module:ol/interaction/DragRotate~DragRotate}
 * * {@link module:ol/interaction/DoubleClickZoom~DoubleClickZoom}
 * * {@link module:ol/interaction/DragPan~DragPan}
 * * {@link module:ol/interaction/PinchRotate~PinchRotate}
 * * {@link module:ol/interaction/PinchZoom~PinchZoom}
 * * {@link module:ol/interaction/KeyboardPan~KeyboardPan}
 * * {@link module:ol/interaction/KeyboardZoom~KeyboardZoom}
 * * {@link module:ol/interaction/MouseWheelZoom~MouseWheelZoom}
 * * {@link module:ol/interaction/DragZoom~DragZoom}
 *
 * @param {DefaultsOptions} [opt_options] Defaults options.
 * @return {import("./Collection.js").default<import("./interaction/Interaction.js").default>}
 * A collection of interactions to be used with the {@link module:ol/Map~Map}
 * constructor's `interactions` option.
 * @api
 */

function defaults(opt_options) {
  var options = opt_options ? opt_options : {};
  var interactions = new Collection/* default */.Z();
  var kinetic = new Kinetic/* default */.Z(-0.005, 0.05, 100);
  var altShiftDragRotate = options.altShiftDragRotate !== undefined ? options.altShiftDragRotate : true;

  if (altShiftDragRotate) {
    interactions.push(new interaction_DragRotate());
  }

  var doubleClickZoom = options.doubleClickZoom !== undefined ? options.doubleClickZoom : true;

  if (doubleClickZoom) {
    interactions.push(new interaction_DoubleClickZoom({
      delta: options.zoomDelta,
      duration: options.zoomDuration
    }));
  }

  var dragPan = options.dragPan !== undefined ? options.dragPan : true;

  if (dragPan) {
    interactions.push(new interaction_DragPan({
      onFocusOnly: options.onFocusOnly,
      kinetic: kinetic
    }));
  }

  var pinchRotate = options.pinchRotate !== undefined ? options.pinchRotate : true;

  if (pinchRotate) {
    interactions.push(new interaction_PinchRotate());
  }

  var pinchZoom = options.pinchZoom !== undefined ? options.pinchZoom : true;

  if (pinchZoom) {
    interactions.push(new interaction_PinchZoom({
      duration: options.zoomDuration
    }));
  }

  var keyboard = options.keyboard !== undefined ? options.keyboard : true;

  if (keyboard) {
    interactions.push(new interaction_KeyboardPan());
    interactions.push(new interaction_KeyboardZoom({
      delta: options.zoomDelta,
      duration: options.zoomDuration
    }));
  }

  var mouseWheelZoom = options.mouseWheelZoom !== undefined ? options.mouseWheelZoom : true;

  if (mouseWheelZoom) {
    interactions.push(new interaction_MouseWheelZoom({
      onFocusOnly: options.onFocusOnly,
      duration: options.zoomDuration
    }));
  }

  var shiftDragZoom = options.shiftDragZoom !== undefined ? options.shiftDragZoom : true;

  if (shiftDragZoom) {
    interactions.push(new interaction_DragZoom({
      duration: options.zoomDuration
    }));
  }

  return interactions;
}

/***/ }),

/***/ 7214:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export DragBoxEvent */
/* harmony import */ var _events_Event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/* harmony import */ var _Pointer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6396);
/* harmony import */ var _render_Box_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8706);
/* harmony import */ var _events_condition_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8970);
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
 * @module ol/interaction/DragBox
 */
// FIXME draw drag box






/**
 * A function that takes a {@link module:ol/MapBrowserEvent} and two
 * {@link module:ol/pixel~Pixel}s and returns a `{boolean}`. If the condition is met,
 * true should be returned.
 * @typedef {function(this: ?, import("../MapBrowserEvent.js").default, import("../pixel.js").Pixel, import("../pixel.js").Pixel):boolean} EndCondition
 */

/**
 * @typedef {Object} Options
 * @property {string} [className='ol-dragbox'] CSS class name for styling the box.
 * @property {import("../events/condition.js").Condition} [condition] A function that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
 * to indicate whether that event should be handled.
 * Default is {@link ol/events/condition~mouseActionButton}.
 * @property {number} [minArea=64] The minimum area of the box in pixel, this value is used by the default
 * `boxEndCondition` function.
 * @property {EndCondition} [boxEndCondition] A function that takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and two
 * {@link module:ol/pixel~Pixel}s to indicate whether a `boxend` event should be fired.
 * Default is `true` if the area of the box is bigger than the `minArea` option.
 * @property {function(this:DragBox, import("../MapBrowserEvent.js").default):void} [onBoxEnd] Code to execute just
 * before `boxend` is fired.
 */

/**
 * @enum {string}
 */

var DragBoxEventType = {
  /**
   * Triggered upon drag box start.
   * @event DragBoxEvent#boxstart
   * @api
   */
  BOXSTART: 'boxstart',

  /**
   * Triggered on drag when box is active.
   * @event DragBoxEvent#boxdrag
   * @api
   */
  BOXDRAG: 'boxdrag',

  /**
   * Triggered upon drag box end.
   * @event DragBoxEvent#boxend
   * @api
   */
  BOXEND: 'boxend',

  /**
   * Triggered upon drag box canceled.
   * @event DragBoxEvent#boxcancel
   * @api
   */
  BOXCANCEL: 'boxcancel'
};
/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/DragBox~DragBox} instances are instances of
 * this type.
 */

var DragBoxEvent =
/** @class */
function (_super) {
  __extends(DragBoxEvent, _super);
  /**
   * @param {string} type The event type.
   * @param {import("../coordinate.js").Coordinate} coordinate The event coordinate.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Originating event.
   */


  function DragBoxEvent(type, coordinate, mapBrowserEvent) {
    var _this = _super.call(this, type) || this;
    /**
     * The coordinate of the drag event.
     * @const
     * @type {import("../coordinate.js").Coordinate}
     * @api
     */


    _this.coordinate = coordinate;
    /**
     * @const
     * @type {import("../MapBrowserEvent.js").default}
     * @api
     */

    _this.mapBrowserEvent = mapBrowserEvent;
    return _this;
  }

  return DragBoxEvent;
}(_events_Event_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP);


/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:active', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<'boxcancel'|'boxdrag'|'boxend'|'boxstart', DragBoxEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:active'|'boxcancel'|'boxdrag'|'boxend', Return>} DragBoxOnSignature
 */

/**
 * @classdesc
 * Allows the user to draw a vector box by clicking and dragging on the map,
 * normally combined with an {@link module:ol/events/condition} that limits
 * it to when the shift or other key is held down. This is used, for example,
 * for zooming to a specific area of the map
 * (see {@link module:ol/interaction/DragZoom~DragZoom} and
 * {@link module:ol/interaction/DragRotateAndZoom}).
 *
 * @fires DragBoxEvent
 * @api
 */

var DragBox =
/** @class */
function (_super) {
  __extends(DragBox, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function DragBox(opt_options) {
    var _this = _super.call(this) || this;
    /***
     * @type {DragBoxOnSignature<import("../events").EventsKey>}
     */


    _this.on;
    /***
     * @type {DragBoxOnSignature<import("../events").EventsKey>}
     */

    _this.once;
    /***
     * @type {DragBoxOnSignature<void>}
     */

    _this.un;
    var options = opt_options ? opt_options : {};
    /**
     * @type {import("../render/Box.js").default}
     * @private
     */

    _this.box_ = new _render_Box_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z(options.className || 'ol-dragbox');
    /**
     * @type {number}
     * @private
     */

    _this.minArea_ = options.minArea !== undefined ? options.minArea : 64;

    if (options.onBoxEnd) {
      _this.onBoxEnd = options.onBoxEnd;
    }
    /**
     * @type {import("../pixel.js").Pixel}
     * @private
     */


    _this.startPixel_ = null;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */

    _this.condition_ = options.condition ? options.condition : _events_condition_js__WEBPACK_IMPORTED_MODULE_2__/* .mouseActionButton */ .v8;
    /**
     * @private
     * @type {EndCondition}
     */

    _this.boxEndCondition_ = options.boxEndCondition ? options.boxEndCondition : _this.defaultBoxEndCondition;
    return _this;
  }
  /**
   * The default condition for determining whether the boxend event
   * should fire.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent The originating MapBrowserEvent
   *     leading to the box end.
   * @param {import("../pixel.js").Pixel} startPixel The starting pixel of the box.
   * @param {import("../pixel.js").Pixel} endPixel The end pixel of the box.
   * @return {boolean} Whether or not the boxend condition should be fired.
   */


  DragBox.prototype.defaultBoxEndCondition = function (mapBrowserEvent, startPixel, endPixel) {
    var width = endPixel[0] - startPixel[0];
    var height = endPixel[1] - startPixel[1];
    return width * width + height * height >= this.minArea_;
  };
  /**
   * Returns geometry of last drawn box.
   * @return {import("../geom/Polygon.js").default} Geometry.
   * @api
   */


  DragBox.prototype.getGeometry = function () {
    return this.box_.getGeometry();
  };
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   */


  DragBox.prototype.handleDragEvent = function (mapBrowserEvent) {
    this.box_.setPixels(this.startPixel_, mapBrowserEvent.pixel);
    this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXDRAG, mapBrowserEvent.coordinate, mapBrowserEvent));
  };
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */


  DragBox.prototype.handleUpEvent = function (mapBrowserEvent) {
    this.box_.setMap(null);
    var completeBox = this.boxEndCondition_(mapBrowserEvent, this.startPixel_, mapBrowserEvent.pixel);

    if (completeBox) {
      this.onBoxEnd(mapBrowserEvent);
    }

    this.dispatchEvent(new DragBoxEvent(completeBox ? DragBoxEventType.BOXEND : DragBoxEventType.BOXCANCEL, mapBrowserEvent.coordinate, mapBrowserEvent));
    return false;
  };
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */


  DragBox.prototype.handleDownEvent = function (mapBrowserEvent) {
    if (this.condition_(mapBrowserEvent)) {
      this.startPixel_ = mapBrowserEvent.pixel;
      this.box_.setMap(mapBrowserEvent.map);
      this.box_.setPixels(this.startPixel_, this.startPixel_);
      this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXSTART, mapBrowserEvent.coordinate, mapBrowserEvent));
      return true;
    } else {
      return false;
    }
  };
  /**
   * Function to execute just before `onboxend` is fired
   * @param {import("../MapBrowserEvent.js").default} event Event.
   */


  DragBox.prototype.onBoxEnd = function (event) {};

  return DragBox;
}(_Pointer_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DragBox);

/***/ }),

/***/ 3873:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cv": () => (/* binding */ pan),
/* harmony export */   "FW": () => (/* binding */ zoomByDelta),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7182);
/* harmony import */ var _Property_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2419);
/* harmony import */ var _easing_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9635);
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
 * @module ol/interaction/Interaction
 */





/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:active', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:active', Return>} InteractionOnSignature
 */

/**
 * Object literal with config options for interactions.
 * @typedef {Object} InteractionOptions
 * @property {function(import("../MapBrowserEvent.js").default):boolean} handleEvent
 * Method called by the map to notify the interaction that a browser event was
 * dispatched to the map. If the function returns a falsy value, propagation of
 * the event to other interactions in the map's interactions chain will be
 * prevented (this includes functions with no explicit return). The interactions
 * are traversed in reverse order of the interactions collection of the map.
 */

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * User actions that change the state of the map. Some are similar to controls,
 * but are not associated with a DOM element.
 * For example, {@link module:ol/interaction/KeyboardZoom~KeyboardZoom} is
 * functionally the same as {@link module:ol/control/Zoom~Zoom}, but triggered
 * by a keyboard event not a button element event.
 * Although interactions do not have a DOM element, some of them do render
 * vectors and so are visible on the screen.
 * @api
 */

var Interaction =
/** @class */
function (_super) {
  __extends(Interaction, _super);
  /**
   * @param {InteractionOptions} [opt_options] Options.
   */


  function Interaction(opt_options) {
    var _this = _super.call(this) || this;
    /***
     * @type {InteractionOnSignature<import("../events").EventsKey>}
     */


    _this.on;
    /***
     * @type {InteractionOnSignature<import("../events").EventsKey>}
     */

    _this.once;
    /***
     * @type {InteractionOnSignature<void>}
     */

    _this.un;

    if (opt_options && opt_options.handleEvent) {
      _this.handleEvent = opt_options.handleEvent;
    }
    /**
     * @private
     * @type {import("../PluggableMap.js").default}
     */


    _this.map_ = null;

    _this.setActive(true);

    return _this;
  }
  /**
   * Return whether the interaction is currently active.
   * @return {boolean} `true` if the interaction is active, `false` otherwise.
   * @observable
   * @api
   */


  Interaction.prototype.getActive = function () {
    return (
      /** @type {boolean} */
      this.get(_Property_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].ACTIVE */ .Z.ACTIVE)
    );
  };
  /**
   * Get the map associated with this interaction.
   * @return {import("../PluggableMap.js").default} Map.
   * @api
   */


  Interaction.prototype.getMap = function () {
    return this.map_;
  };
  /**
   * Handles the {@link module:ol/MapBrowserEvent map browser event}.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @api
   */


  Interaction.prototype.handleEvent = function (mapBrowserEvent) {
    return true;
  };
  /**
   * Activate or deactivate the interaction.
   * @param {boolean} active Active.
   * @observable
   * @api
   */


  Interaction.prototype.setActive = function (active) {
    this.set(_Property_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].ACTIVE */ .Z.ACTIVE, active);
  };
  /**
   * Remove the interaction from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../PluggableMap.js").default} map Map.
   */


  Interaction.prototype.setMap = function (map) {
    this.map_ = map;
  };

  return Interaction;
}(_Object_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z);
/**
 * @param {import("../View.js").default} view View.
 * @param {import("../coordinate.js").Coordinate} delta Delta.
 * @param {number} [opt_duration] Duration.
 */


function pan(view, delta, opt_duration) {
  var currentCenter = view.getCenterInternal();

  if (currentCenter) {
    var center = [currentCenter[0] + delta[0], currentCenter[1] + delta[1]];
    view.animateInternal({
      duration: opt_duration !== undefined ? opt_duration : 250,
      easing: _easing_js__WEBPACK_IMPORTED_MODULE_2__/* .linear */ .GE,
      center: view.getConstrainedCenter(center)
    });
  }
}
/**
 * @param {import("../View.js").default} view View.
 * @param {number} delta Delta from previous zoom level.
 * @param {import("../coordinate.js").Coordinate} [opt_anchor] Anchor coordinate in the user projection.
 * @param {number} [opt_duration] Duration.
 */

function zoomByDelta(view, delta, opt_anchor, opt_duration) {
  var currentZoom = view.getZoom();

  if (currentZoom === undefined) {
    return;
  }

  var newZoom = view.getConstrainedZoom(currentZoom + delta);
  var newResolution = view.getResolutionForZoom(newZoom);

  if (view.getAnimating()) {
    view.cancelAnimations();
  }

  view.animate({
    resolution: newResolution,
    anchor: opt_anchor,
    duration: opt_duration !== undefined ? opt_duration : 250,
    easing: _easing_js__WEBPACK_IMPORTED_MODULE_2__/* .easeOut */ .Vv
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Interaction);

/***/ }),

/***/ 6396:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": () => (/* binding */ centroid),
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Interaction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3873);
/* harmony import */ var _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3998);
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9800);
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
 * @module ol/interaction/Pointer
 */





/**
 * @typedef {Object} Options
 * @property {function(import("../MapBrowserEvent.js").default):boolean} [handleDownEvent]
 * Function handling "down" events. If the function returns `true` then a drag
 * sequence is started.
 * @property {function(import("../MapBrowserEvent.js").default):void} [handleDragEvent]
 * Function handling "drag" events. This function is called on "move" events
 * during a drag sequence.
 * @property {function(import("../MapBrowserEvent.js").default):boolean} [handleEvent]
 * Method called by the map to notify the interaction that a browser event was
 * dispatched to the map. The function may return `false` to prevent the
 * propagation of the event to other interactions in the map's interactions
 * chain.
 * @property {function(import("../MapBrowserEvent.js").default):void} [handleMoveEvent]
 * Function handling "move" events. This function is called on "move" events.
 * This functions is also called during a drag sequence, so during a drag
 * sequence both the `handleDragEvent` function and this function are called.
 * If `handleDownEvent` is defined and it returns true this function will not
 * be called during a drag sequence.
 * @property {function(import("../MapBrowserEvent.js").default):boolean} [handleUpEvent]
 *  Function handling "up" events. If the function returns `false` then the
 * current drag sequence is stopped.
 * @property {function(boolean):boolean} [stopDown]
 * Should the down event be propagated to other interactions, or should be
 * stopped?
 */

/**
 * @classdesc
 * Base class that calls user-defined functions on `down`, `move` and `up`
 * events. This class also manages "drag sequences".
 *
 * When the `handleDownEvent` user function returns `true` a drag sequence is
 * started. During a drag sequence the `handleDragEvent` user function is
 * called on `move` events. The drag sequence ends when the `handleUpEvent`
 * user function is called and returns `false`.
 * @api
 */

var PointerInteraction =
/** @class */
function (_super) {
  __extends(PointerInteraction, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function PointerInteraction(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    _this = _super.call(this,
    /** @type {import("./Interaction.js").InteractionOptions} */
    options) || this;

    if (options.handleDownEvent) {
      _this.handleDownEvent = options.handleDownEvent;
    }

    if (options.handleDragEvent) {
      _this.handleDragEvent = options.handleDragEvent;
    }

    if (options.handleMoveEvent) {
      _this.handleMoveEvent = options.handleMoveEvent;
    }

    if (options.handleUpEvent) {
      _this.handleUpEvent = options.handleUpEvent;
    }

    if (options.stopDown) {
      _this.stopDown = options.stopDown;
    }
    /**
     * @type {boolean}
     * @protected
     */


    _this.handlingDownUpSequence = false;
    /**
     * @type {!Object<string, PointerEvent>}
     * @private
     */

    _this.trackedPointers_ = {};
    /**
     * @type {Array<PointerEvent>}
     * @protected
     */

    _this.targetPointers = [];
    return _this;
  }
  /**
   * Returns the current number of pointers involved in the interaction,
   * e.g. `2` when two fingers are used.
   * @return {number} The number of pointers.
   * @api
   */


  PointerInteraction.prototype.getPointerCount = function () {
    return this.targetPointers.length;
  };
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @protected
   */


  PointerInteraction.prototype.handleDownEvent = function (mapBrowserEvent) {
    return false;
  };
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @protected
   */


  PointerInteraction.prototype.handleDragEvent = function (mapBrowserEvent) {};
  /**
   * Handles the {@link module:ol/MapBrowserEvent map browser event} and may call into
   * other functions, if event sequences like e.g. 'drag' or 'down-up' etc. are
   * detected.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @api
   */


  PointerInteraction.prototype.handleEvent = function (mapBrowserEvent) {
    if (!mapBrowserEvent.originalEvent) {
      return true;
    }

    var stopEvent = false;
    this.updateTrackedPointers_(mapBrowserEvent);

    if (this.handlingDownUpSequence) {
      if (mapBrowserEvent.type == _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].POINTERDRAG */ .Z.POINTERDRAG) {
        this.handleDragEvent(mapBrowserEvent); // prevent page scrolling during dragging

        mapBrowserEvent.originalEvent.preventDefault();
      } else if (mapBrowserEvent.type == _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].POINTERUP */ .Z.POINTERUP) {
        var handledUp = this.handleUpEvent(mapBrowserEvent);
        this.handlingDownUpSequence = handledUp && this.targetPointers.length > 0;
      }
    } else {
      if (mapBrowserEvent.type == _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].POINTERDOWN */ .Z.POINTERDOWN) {
        var handled = this.handleDownEvent(mapBrowserEvent);
        this.handlingDownUpSequence = handled;
        stopEvent = this.stopDown(handled);
      } else if (mapBrowserEvent.type == _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].POINTERMOVE */ .Z.POINTERMOVE) {
        this.handleMoveEvent(mapBrowserEvent);
      }
    }

    return !stopEvent;
  };
  /**
   * Handle pointer move events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @protected
   */


  PointerInteraction.prototype.handleMoveEvent = function (mapBrowserEvent) {};
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @protected
   */


  PointerInteraction.prototype.handleUpEvent = function (mapBrowserEvent) {
    return false;
  };
  /**
   * This function is used to determine if "down" events should be propagated
   * to other interactions or should be stopped.
   * @param {boolean} handled Was the event handled by the interaction?
   * @return {boolean} Should the `down` event be stopped?
   */


  PointerInteraction.prototype.stopDown = function (handled) {
    return handled;
  };
  /**
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @private
   */


  PointerInteraction.prototype.updateTrackedPointers_ = function (mapBrowserEvent) {
    if (isPointerDraggingEvent(mapBrowserEvent)) {
      var event_1 = mapBrowserEvent.originalEvent;
      var id = event_1.pointerId.toString();

      if (mapBrowserEvent.type == _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].POINTERUP */ .Z.POINTERUP) {
        delete this.trackedPointers_[id];
      } else if (mapBrowserEvent.type == _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].POINTERDOWN */ .Z.POINTERDOWN) {
        this.trackedPointers_[id] = event_1;
      } else if (id in this.trackedPointers_) {
        // update only when there was a pointerdown event for this pointer
        this.trackedPointers_[id] = event_1;
      }

      this.targetPointers = (0,_obj_js__WEBPACK_IMPORTED_MODULE_1__/* .getValues */ .KX)(this.trackedPointers_);
    }
  };

  return PointerInteraction;
}(_Interaction_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP);
/**
 * @param {Array<PointerEvent>} pointerEvents List of events.
 * @return {import("../pixel.js").Pixel} Centroid pixel.
 */


function centroid(pointerEvents) {
  var length = pointerEvents.length;
  var clientX = 0;
  var clientY = 0;

  for (var i = 0; i < length; i++) {
    clientX += pointerEvents[i].clientX;
    clientY += pointerEvents[i].clientY;
  }

  return [clientX / length, clientY / length];
}
/**
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
 * @return {boolean} Whether the event is a pointerdown, pointerdrag
 *     or pointerup event.
 */

function isPointerDraggingEvent(mapBrowserEvent) {
  var type = mapBrowserEvent.type;
  return type === _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].POINTERDOWN */ .Z.POINTERDOWN || type === _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].POINTERDRAG */ .Z.POINTERDRAG || type === _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].POINTERUP */ .Z.POINTERUP;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PointerInteraction);

/***/ }),

/***/ 2419:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/interaction/Property
 */

/**
 * @enum {string}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  ACTIVE: 'active'
});

/***/ }),

/***/ 8896:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export SelectEvent */
/* harmony import */ var _Collection_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1210);
/* harmony import */ var _CollectionEventType_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9890);
/* harmony import */ var _events_Event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/* harmony import */ var _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5870);
/* harmony import */ var _Interaction_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3873);
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3658);
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9800);
/* harmony import */ var _style_Style_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6054);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3620);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2618);
/* harmony import */ var _events_condition_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8970);
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
 * @module ol/interaction/Select
 */













/**
 * @enum {string}
 */

var SelectEventType = {
  /**
   * Triggered when feature(s) has been (de)selected.
   * @event SelectEvent#select
   * @api
   */
  SELECT: 'select'
};
/**
 * A function that takes an {@link module:ol/Feature} or
 * {@link module:ol/render/Feature} and an
 * {@link module:ol/layer/Layer} and returns `true` if the feature may be
 * selected or `false` otherwise.
 * @typedef {function(import("../Feature.js").FeatureLike, import("../layer/Layer.js").default<import("../source/Source").default>):boolean} FilterFunction
 */

/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [addCondition] A function
 * that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled.
 * By default, this is {@link module:ol/events/condition.never}. Use this if you
 * want to use different events for add and remove instead of `toggle`.
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. This is the event
 * for the selected features as a whole. By default, this is
 * {@link module:ol/events/condition.singleClick}. Clicking on a feature selects that
 * feature and removes any that were in the selection. Clicking outside any
 * feature removes all from the selection.
 * See `toggle`, `add`, `remove` options for adding/removing extra features to/
 * from the selection.
 * @property {Array<import("../layer/Layer.js").default>|function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean} [layers]
 * A list of layers from which features should be selected. Alternatively, a
 * filter function can be provided. The function will be called for each layer
 * in the map and should return `true` for layers that you want to be
 * selectable. If the option is absent, all visible layers will be considered
 * selectable.
 * @property {import("../style/Style.js").StyleLike|null} [style]
 * Style for the selected features. By default the default edit style is used
 * (see {@link module:ol/style}). Set to `null` if this interaction should not apply
 * any style changes for selected features.
 * If set to a falsey value, the selected feature's style will not change.
 * @property {import("../events/condition.js").Condition} [removeCondition] A function
 * that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled.
 * By default, this is {@link module:ol/events/condition.never}. Use this if you
 * want to use different events for add and remove instead of `toggle`.
 * @property {import("../events/condition.js").Condition} [toggleCondition] A function
 * that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. This is in addition
 * to the `condition` event. By default,
 * {@link module:ol/events/condition.shiftKeyOnly}, i.e. pressing `shift` as
 * well as the `condition` event, adds that feature to the current selection if
 * it is not currently selected, and removes it if it is. See `add` and `remove`
 * if you want to use different events instead of a toggle.
 * @property {boolean} [multi=false] A boolean that determines if the default
 * behaviour should select only single features or all (overlapping) features at
 * the clicked map position. The default of `false` means single select.
 * @property {import("../Collection.js").default<import("../Feature.js").default>} [features]
 * Collection where the interaction will place selected features. Optional. If
 * not set the interaction will create a collection. In any case the collection
 * used by the interaction is returned by
 * {@link module:ol/interaction/Select~Select#getFeatures}.
 * @property {FilterFunction} [filter] A function
 * that takes an {@link module:ol/Feature} and an
 * {@link module:ol/layer/Layer} and returns `true` if the feature may be
 * selected or `false` otherwise.
 * @property {number} [hitTolerance=0] Hit-detection tolerance. Pixels inside
 * the radius around the given position will be checked for features.
 */

/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/Select~Select} instances are instances of
 * this type.
 */

var SelectEvent =
/** @class */
function (_super) {
  __extends(SelectEvent, _super);
  /**
   * @param {SelectEventType} type The event type.
   * @param {Array<import("../Feature.js").default>} selected Selected features.
   * @param {Array<import("../Feature.js").default>} deselected Deselected features.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Associated
   *     {@link module:ol/MapBrowserEvent}.
   */


  function SelectEvent(type, selected, deselected, mapBrowserEvent) {
    var _this = _super.call(this, type) || this;
    /**
     * Selected features array.
     * @type {Array<import("../Feature.js").default>}
     * @api
     */


    _this.selected = selected;
    /**
     * Deselected features array.
     * @type {Array<import("../Feature.js").default>}
     * @api
     */

    _this.deselected = deselected;
    /**
     * Associated {@link module:ol/MapBrowserEvent}.
     * @type {import("../MapBrowserEvent.js").default}
     * @api
     */

    _this.mapBrowserEvent = mapBrowserEvent;
    return _this;
  }

  return SelectEvent;
}(_events_Event_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP);


/**
 * Original feature styles to reset to when features are no longer selected.
 * @type {Object<number, import("../style/Style.js").default|Array<import("../style/Style.js").default>|import("../style/Style.js").StyleFunction>}
 */

var originalFeatureStyles = {};
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:active', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<'select', SelectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:active'|'select', Return>} SelectOnSignature
 */

/**
 * @classdesc
 * Interaction for selecting vector features. By default, selected features are
 * styled differently, so this interaction can be used for visual highlighting,
 * as well as selecting features for other actions, such as modification or
 * output. There are three ways of controlling which features are selected:
 * using the browser event as defined by the `condition` and optionally the
 * `toggle`, `add`/`remove`, and `multi` options; a `layers` filter; and a
 * further feature filter using the `filter` option.
 *
 * @fires SelectEvent
 * @api
 */

var Select =
/** @class */
function (_super) {
  __extends(Select, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function Select(opt_options) {
    var _this = _super.call(this) || this;
    /***
     * @type {SelectOnSignature<import("../events").EventsKey>}
     */


    _this.on;
    /***
     * @type {SelectOnSignature<import("../events").EventsKey>}
     */

    _this.once;
    /***
     * @type {SelectOnSignature<void>}
     */

    _this.un;
    var options = opt_options ? opt_options : {};
    /**
     * @private
     */

    _this.boundAddFeature_ = _this.addFeature_.bind(_this);
    /**
     * @private
     */

    _this.boundRemoveFeature_ = _this.removeFeature_.bind(_this);
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */

    _this.condition_ = options.condition ? options.condition : _events_condition_js__WEBPACK_IMPORTED_MODULE_1__/* .singleClick */ .Kf;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */

    _this.addCondition_ = options.addCondition ? options.addCondition : _events_condition_js__WEBPACK_IMPORTED_MODULE_1__/* .never */ .Fi;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */

    _this.removeCondition_ = options.removeCondition ? options.removeCondition : _events_condition_js__WEBPACK_IMPORTED_MODULE_1__/* .never */ .Fi;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */

    _this.toggleCondition_ = options.toggleCondition ? options.toggleCondition : _events_condition_js__WEBPACK_IMPORTED_MODULE_1__/* .shiftKeyOnly */ .vY;
    /**
     * @private
     * @type {boolean}
     */

    _this.multi_ = options.multi ? options.multi : false;
    /**
     * @private
     * @type {FilterFunction}
     */

    _this.filter_ = options.filter ? options.filter : _functions_js__WEBPACK_IMPORTED_MODULE_2__/* .TRUE */ .uX;
    /**
     * @private
     * @type {number}
     */

    _this.hitTolerance_ = options.hitTolerance ? options.hitTolerance : 0;
    /**
     * @private
     * @type {import("../style/Style.js").default|Array<import("../style/Style.js").default>|import("../style/Style.js").StyleFunction|null}
     */

    _this.style_ = options.style !== undefined ? options.style : getDefaultStyleFunction();
    /**
     * @private
     * @type {import("../Collection.js").default}
     */

    _this.features_ = options.features || new _Collection_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z();
    /** @type {function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean} */

    var layerFilter;

    if (options.layers) {
      if (typeof options.layers === 'function') {
        layerFilter = options.layers;
      } else {
        var layers_1 = options.layers;

        layerFilter = function (layer) {
          return (0,_array_js__WEBPACK_IMPORTED_MODULE_4__/* .includes */ .q9)(layers_1, layer);
        };
      }
    } else {
      layerFilter = _functions_js__WEBPACK_IMPORTED_MODULE_2__/* .TRUE */ .uX;
    }
    /**
     * @private
     * @type {function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean}
     */


    _this.layerFilter_ = layerFilter;
    /**
     * An association between selected feature (key)
     * and layer (value)
     * @private
     * @type {Object<string, import("../layer/Layer.js").default>}
     */

    _this.featureLayerAssociation_ = {};
    return _this;
  }
  /**
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {import("../layer/Layer.js").default} layer Layer.
   * @private
   */


  Select.prototype.addFeatureLayerAssociation_ = function (feature, layer) {
    this.featureLayerAssociation_[(0,_util_js__WEBPACK_IMPORTED_MODULE_5__/* .getUid */ .sq)(feature)] = layer;
  };
  /**
   * Get the selected features.
   * @return {import("../Collection.js").default<import("../Feature.js").default>} Features collection.
   * @api
   */


  Select.prototype.getFeatures = function () {
    return this.features_;
  };
  /**
   * Returns the Hit-detection tolerance.
   * @return {number} Hit tolerance in pixels.
   * @api
   */


  Select.prototype.getHitTolerance = function () {
    return this.hitTolerance_;
  };
  /**
   * Returns the associated {@link module:ol/layer/Vector~Vector vectorlayer} of
   * the (last) selected feature. Note that this will not work with any
   * programmatic method like pushing features to
   * {@link module:ol/interaction/Select~Select#getFeatures collection}.
   * @param {import("../Feature.js").FeatureLike} feature Feature
   * @return {import('../layer/Vector.js').default} Layer.
   * @api
   */


  Select.prototype.getLayer = function (feature) {
    return (
      /** @type {import('../layer/Vector.js').default} */
      this.featureLayerAssociation_[(0,_util_js__WEBPACK_IMPORTED_MODULE_5__/* .getUid */ .sq)(feature)]
    );
  };
  /**
   * Hit-detection tolerance. Pixels inside the radius around the given position
   * will be checked for features.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @api
   */


  Select.prototype.setHitTolerance = function (hitTolerance) {
    this.hitTolerance_ = hitTolerance;
  };
  /**
   * Remove the interaction from its current map, if any,  and attach it to a new
   * map, if any. Pass `null` to just remove the interaction from the current map.
   * @param {import("../PluggableMap.js").default} map Map.
   * @api
   */


  Select.prototype.setMap = function (map) {
    var currentMap = this.getMap();

    if (currentMap && this.style_) {
      this.features_.forEach(this.restorePreviousStyle_.bind(this));
    }

    _super.prototype.setMap.call(this, map);

    if (map) {
      this.features_.addEventListener(_CollectionEventType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].ADD */ .Z.ADD, this.boundAddFeature_);
      this.features_.addEventListener(_CollectionEventType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].REMOVE */ .Z.REMOVE, this.boundRemoveFeature_);

      if (this.style_) {
        this.features_.forEach(this.applySelectedStyle_.bind(this));
      }
    } else {
      this.features_.removeEventListener(_CollectionEventType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].ADD */ .Z.ADD, this.boundAddFeature_);
      this.features_.removeEventListener(_CollectionEventType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].REMOVE */ .Z.REMOVE, this.boundRemoveFeature_);
    }
  };
  /**
   * @param {import("../Collection.js").CollectionEvent} evt Event.
   * @private
   */


  Select.prototype.addFeature_ = function (evt) {
    var feature = evt.element;

    if (this.style_) {
      this.applySelectedStyle_(feature);
    }
  };
  /**
   * @param {import("../Collection.js").CollectionEvent} evt Event.
   * @private
   */


  Select.prototype.removeFeature_ = function (evt) {
    var feature = evt.element;

    if (this.style_) {
      this.restorePreviousStyle_(feature);
    }
  };
  /**
   * @return {import("../style/Style.js").StyleLike|null} Select style.
   */


  Select.prototype.getStyle = function () {
    return this.style_;
  };
  /**
   * @param {import("../Feature.js").default} feature Feature
   * @private
   */


  Select.prototype.applySelectedStyle_ = function (feature) {
    var key = (0,_util_js__WEBPACK_IMPORTED_MODULE_5__/* .getUid */ .sq)(feature);

    if (!(key in originalFeatureStyles)) {
      originalFeatureStyles[key] = feature.getStyle();
    }

    feature.setStyle(this.style_);
  };
  /**
   * @param {import("../Feature.js").default} feature Feature
   * @private
   */


  Select.prototype.restorePreviousStyle_ = function (feature) {
    var interactions = this.getMap().getInteractions().getArray();

    for (var i = interactions.length - 1; i >= 0; --i) {
      var interaction = interactions[i];

      if (interaction !== this && interaction instanceof Select && interaction.getStyle() && interaction.getFeatures().getArray().lastIndexOf(feature) !== -1) {
        feature.setStyle(interaction.getStyle());
        return;
      }
    }

    var key = (0,_util_js__WEBPACK_IMPORTED_MODULE_5__/* .getUid */ .sq)(feature);
    feature.setStyle(originalFeatureStyles[key]);
    delete originalFeatureStyles[key];
  };
  /**
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @private
   */


  Select.prototype.removeFeatureLayerAssociation_ = function (feature) {
    delete this.featureLayerAssociation_[(0,_util_js__WEBPACK_IMPORTED_MODULE_5__/* .getUid */ .sq)(feature)];
  };
  /**
   * Handles the {@link module:ol/MapBrowserEvent map browser event} and may change the
   * selected state of features.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @this {Select}
   */


  Select.prototype.handleEvent = function (mapBrowserEvent) {
    if (!this.condition_(mapBrowserEvent)) {
      return true;
    }

    var add = this.addCondition_(mapBrowserEvent);
    var remove = this.removeCondition_(mapBrowserEvent);
    var toggle = this.toggleCondition_(mapBrowserEvent);
    var set = !add && !remove && !toggle;
    var map = mapBrowserEvent.map;
    var features = this.getFeatures();
    var deselected = [];
    var selected = [];

    if (set) {
      // Replace the currently selected feature(s) with the feature(s) at the
      // pixel, or clear the selected feature(s) if there is no feature at
      // the pixel.
      (0,_obj_js__WEBPACK_IMPORTED_MODULE_7__/* .clear */ .ZH)(this.featureLayerAssociation_);
      map.forEachFeatureAtPixel(mapBrowserEvent.pixel,
      /**
       * @param {import("../Feature.js").FeatureLike} feature Feature.
       * @param {import("../layer/Layer.js").default} layer Layer.
       * @return {boolean|undefined} Continue to iterate over the features.
       */
      function (feature, layer) {
        if (this.filter_(feature, layer)) {
          selected.push(feature);
          this.addFeatureLayerAssociation_(feature, layer);
          return !this.multi_;
        }
      }.bind(this), {
        layerFilter: this.layerFilter_,
        hitTolerance: this.hitTolerance_
      });

      for (var i = features.getLength() - 1; i >= 0; --i) {
        var feature = features.item(i);
        var index = selected.indexOf(feature);

        if (index > -1) {
          // feature is already selected
          selected.splice(index, 1);
        } else {
          features.remove(feature);
          deselected.push(feature);
        }
      }

      if (selected.length !== 0) {
        features.extend(selected);
      }
    } else {
      // Modify the currently selected feature(s).
      map.forEachFeatureAtPixel(mapBrowserEvent.pixel,
      /**
       * @param {import("../Feature.js").FeatureLike} feature Feature.
       * @param {import("../layer/Layer.js").default} layer Layer.
       * @return {boolean|undefined} Continue to iterate over the features.
       */
      function (feature, layer) {
        if (this.filter_(feature, layer)) {
          if ((add || toggle) && !(0,_array_js__WEBPACK_IMPORTED_MODULE_4__/* .includes */ .q9)(features.getArray(), feature)) {
            selected.push(feature);
            this.addFeatureLayerAssociation_(feature, layer);
          } else if ((remove || toggle) && (0,_array_js__WEBPACK_IMPORTED_MODULE_4__/* .includes */ .q9)(features.getArray(), feature)) {
            deselected.push(feature);
            this.removeFeatureLayerAssociation_(feature);
          }

          return !this.multi_;
        }
      }.bind(this), {
        layerFilter: this.layerFilter_,
        hitTolerance: this.hitTolerance_
      });

      for (var j = deselected.length - 1; j >= 0; --j) {
        features.remove(deselected[j]);
      }

      features.extend(selected);
    }

    if (selected.length > 0 || deselected.length > 0) {
      this.dispatchEvent(new SelectEvent(SelectEventType.SELECT, selected, deselected, mapBrowserEvent));
    }

    return true;
  };

  return Select;
}(_Interaction_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .ZP);
/**
 * @return {import("../style/Style.js").StyleFunction} Styles.
 */


function getDefaultStyleFunction() {
  var styles = (0,_style_Style_js__WEBPACK_IMPORTED_MODULE_9__/* .createEditingStyle */ .Ly)();
  (0,_array_js__WEBPACK_IMPORTED_MODULE_4__/* .extend */ .l7)(styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"].POLYGON */ .Z.POLYGON], styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"].LINE_STRING */ .Z.LINE_STRING]);
  (0,_array_js__WEBPACK_IMPORTED_MODULE_4__/* .extend */ .l7)(styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"].GEOMETRY_COLLECTION */ .Z.GEOMETRY_COLLECTION], styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"].LINE_STRING */ .Z.LINE_STRING]);
  return function (feature) {
    if (!feature.getGeometry()) {
      return null;
    }

    return styles[feature.getGeometry().getType()];
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Select);

/***/ }),

/***/ 4056:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export TranslateEvent */
/* harmony import */ var _Collection_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1210);
/* harmony import */ var _events_Event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/* harmony import */ var _Property_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2419);
/* harmony import */ var _Pointer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6396);
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3658);
/* harmony import */ var _events_condition_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8970);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3620);
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
 * @module ol/interaction/Translate
 */









/**
 * @enum {string}
 */

var TranslateEventType = {
  /**
   * Triggered upon feature translation start.
   * @event TranslateEvent#translatestart
   * @api
   */
  TRANSLATESTART: 'translatestart',

  /**
   * Triggered upon feature translation.
   * @event TranslateEvent#translating
   * @api
   */
  TRANSLATING: 'translating',

  /**
   * Triggered upon feature translation end.
   * @event TranslateEvent#translateend
   * @api
   */
  TRANSLATEEND: 'translateend'
};
/**
 * A function that takes an {@link module:ol/Feature} or
 * {@link module:ol/render/Feature} and an
 * {@link module:ol/layer/Layer} and returns `true` if the feature may be
 * translated or `false` otherwise.
 * @typedef {function(import("../Feature.js").FeatureLike, import("../layer/Layer.js").default<import("../source/Source").default>):boolean} FilterFunction
 */

/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition.always}.
 * @property {Collection<import("../Feature.js").default>} [features] Features contained in this collection will be able to be translated together.
 * @property {Array<import("../layer/Layer.js").default>|function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean} [layers] A list of layers from which features should be
 * translated. Alternatively, a filter function can be provided. The
 * function will be called for each layer in the map and should return
 * `true` for layers that you want to be translatable. If the option is
 * absent, all visible layers will be considered translatable.
 * Not used if `features` is provided.
 * @property {FilterFunction} [filter] A function
 * that takes an {@link module:ol/Feature} and an
 * {@link module:ol/layer/Layer} and returns `true` if the feature may be
 * translated or `false` otherwise. Not used if `features` is provided.
 * @property {number} [hitTolerance=0] Hit-detection tolerance. Pixels inside the radius around the given position
 * will be checked for features.
 */

/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/Translate~Translate} instances
 * are instances of this type.
 */

var TranslateEvent =
/** @class */
function (_super) {
  __extends(TranslateEvent, _super);
  /**
   * @param {TranslateEventType} type Type.
   * @param {Collection<import("../Feature.js").default>} features The features translated.
   * @param {import("../coordinate.js").Coordinate} coordinate The event coordinate.
   * @param {import("../coordinate.js").Coordinate} startCoordinate The original coordinates before.translation started
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   */


  function TranslateEvent(type, features, coordinate, startCoordinate, mapBrowserEvent) {
    var _this = _super.call(this, type) || this;
    /**
     * The features being translated.
     * @type {Collection<import("../Feature.js").default>}
     * @api
     */


    _this.features = features;
    /**
     * The coordinate of the drag event.
     * @const
     * @type {import("../coordinate.js").Coordinate}
     * @api
     */

    _this.coordinate = coordinate;
    /**
     * The coordinate of the start position before translation started.
     * @const
     * @type {import("../coordinate.js").Coordinate}
     * @api
     */

    _this.startCoordinate = startCoordinate;
    /**
     * Associated {@link module:ol/MapBrowserEvent}.
     * @type {import("../MapBrowserEvent.js").default}
     * @api
     */

    _this.mapBrowserEvent = mapBrowserEvent;
    return _this;
  }

  return TranslateEvent;
}(_events_Event_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP);


/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:active', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<'translateend'|'translatestart'|'translating', TranslateEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:active'|'translateend'|'translatestart'|'translating', Return>} TranslateOnSignature
 */

/**
 * @classdesc
 * Interaction for translating (moving) features.
 * If you want to translate multiple features in a single action (for example,
 * the collection used by a select interaction), construct the interaction with
 * the `features` option.
 *
 * @fires TranslateEvent
 * @api
 */

var Translate =
/** @class */
function (_super) {
  __extends(Translate, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function Translate(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    _this = _super.call(this,
    /** @type {import("./Pointer.js").Options} */
    options) || this;
    /***
     * @type {TranslateOnSignature<import("../events").EventsKey>}
     */

    _this.on;
    /***
     * @type {TranslateOnSignature<import("../events").EventsKey>}
     */

    _this.once;
    /***
     * @type {TranslateOnSignature<void>}
     */

    _this.un;
    /**
     * The last position we translated to.
     * @type {import("../coordinate.js").Coordinate}
     * @private
     */

    _this.lastCoordinate_ = null;
    /**
     * The start position before translation started.
     * @type {import("../coordinate.js").Coordinate}
     * @private
     */

    _this.startCoordinate_ = null;
    /**
     * @type {Collection<import("../Feature.js").default>}
     * @private
     */

    _this.features_ = options.features !== undefined ? options.features : null;
    /** @type {function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean} */

    var layerFilter;

    if (options.layers && !_this.features_) {
      if (typeof options.layers === 'function') {
        layerFilter = options.layers;
      } else {
        var layers_1 = options.layers;

        layerFilter = function (layer) {
          return (0,_array_js__WEBPACK_IMPORTED_MODULE_1__/* .includes */ .q9)(layers_1, layer);
        };
      }
    } else {
      layerFilter = _functions_js__WEBPACK_IMPORTED_MODULE_2__/* .TRUE */ .uX;
    }
    /**
     * @private
     * @type {function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean}
     */


    _this.layerFilter_ = layerFilter;
    /**
     * @private
     * @type {FilterFunction}
     */

    _this.filter_ = options.filter && !_this.features_ ? options.filter : _functions_js__WEBPACK_IMPORTED_MODULE_2__/* .TRUE */ .uX;
    /**
     * @private
     * @type {number}
     */

    _this.hitTolerance_ = options.hitTolerance ? options.hitTolerance : 0;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */

    _this.condition_ = options.condition ? options.condition : _events_condition_js__WEBPACK_IMPORTED_MODULE_3__/* .always */ .Bx;
    /**
     * @type {import("../Feature.js").default}
     * @private
     */

    _this.lastFeature_ = null;

    _this.addChangeListener(_Property_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].ACTIVE */ .Z.ACTIVE, _this.handleActiveChanged_);

    return _this;
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} event Event.
   * @return {boolean} If the event was consumed.
   */


  Translate.prototype.handleDownEvent = function (event) {
    if (!event.originalEvent || !this.condition_(event)) {
      return false;
    }

    this.lastFeature_ = this.featuresAtPixel_(event.pixel, event.map);

    if (!this.lastCoordinate_ && this.lastFeature_) {
      this.startCoordinate_ = event.coordinate;
      this.lastCoordinate_ = event.coordinate;
      this.handleMoveEvent(event);
      var features = this.features_ || new _Collection_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z([this.lastFeature_]);
      this.dispatchEvent(new TranslateEvent(TranslateEventType.TRANSLATESTART, features, event.coordinate, this.startCoordinate_, event));
      return true;
    }

    return false;
  };
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} event Event.
   * @return {boolean} If the event was consumed.
   */


  Translate.prototype.handleUpEvent = function (event) {
    if (this.lastCoordinate_) {
      this.lastCoordinate_ = null;
      this.handleMoveEvent(event);
      var features = this.features_ || new _Collection_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z([this.lastFeature_]);
      this.dispatchEvent(new TranslateEvent(TranslateEventType.TRANSLATEEND, features, event.coordinate, this.startCoordinate_, event)); // cleanup

      this.startCoordinate_ = null;
      return true;
    }

    return false;
  };
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} event Event.
   */


  Translate.prototype.handleDragEvent = function (event) {
    if (this.lastCoordinate_) {
      var newCoordinate = event.coordinate;
      var deltaX_1 = newCoordinate[0] - this.lastCoordinate_[0];
      var deltaY_1 = newCoordinate[1] - this.lastCoordinate_[1];
      var features = this.features_ || new _Collection_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z([this.lastFeature_]);
      features.forEach(function (feature) {
        var geom = feature.getGeometry();
        geom.translate(deltaX_1, deltaY_1);
        feature.setGeometry(geom);
      });
      this.lastCoordinate_ = newCoordinate;
      this.dispatchEvent(new TranslateEvent(TranslateEventType.TRANSLATING, features, newCoordinate, this.startCoordinate_, event));
    }
  };
  /**
   * Handle pointer move events.
   * @param {import("../MapBrowserEvent.js").default} event Event.
   */


  Translate.prototype.handleMoveEvent = function (event) {
    var elem = event.map.getViewport(); // Change the cursor to grab/grabbing if hovering any of the features managed
    // by the interaction

    if (this.featuresAtPixel_(event.pixel, event.map)) {
      elem.classList.remove(this.lastCoordinate_ ? 'ol-grab' : 'ol-grabbing');
      elem.classList.add(this.lastCoordinate_ ? 'ol-grabbing' : 'ol-grab');
    } else {
      elem.classList.remove('ol-grab', 'ol-grabbing');
    }
  };
  /**
   * Tests to see if the given coordinates intersects any of our selected
   * features.
   * @param {import("../pixel.js").Pixel} pixel Pixel coordinate to test for intersection.
   * @param {import("../PluggableMap.js").default} map Map to test the intersection on.
   * @return {import("../Feature.js").default} Returns the feature found at the specified pixel
   * coordinates.
   * @private
   */


  Translate.prototype.featuresAtPixel_ = function (pixel, map) {
    return map.forEachFeatureAtPixel(pixel, function (feature, layer) {
      if (this.filter_(feature, layer)) {
        if (!this.features_ || (0,_array_js__WEBPACK_IMPORTED_MODULE_1__/* .includes */ .q9)(this.features_.getArray(), feature)) {
          return feature;
        }
      }
    }.bind(this), {
      layerFilter: this.layerFilter_,
      hitTolerance: this.hitTolerance_
    });
  };
  /**
   * Returns the Hit-detection tolerance.
   * @return {number} Hit tolerance in pixels.
   * @api
   */


  Translate.prototype.getHitTolerance = function () {
    return this.hitTolerance_;
  };
  /**
   * Hit-detection tolerance. Pixels inside the radius around the given position
   * will be checked for features.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @api
   */


  Translate.prototype.setHitTolerance = function (hitTolerance) {
    this.hitTolerance_ = hitTolerance;
  };
  /**
   * Remove the interaction from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../PluggableMap.js").default} map Map.
   */


  Translate.prototype.setMap = function (map) {
    var oldMap = this.getMap();

    _super.prototype.setMap.call(this, map);

    this.updateState_(oldMap);
  };
  /**
   * @private
   */


  Translate.prototype.handleActiveChanged_ = function () {
    this.updateState_(null);
  };
  /**
   * @param {import("../PluggableMap.js").default} oldMap Old map.
   * @private
   */


  Translate.prototype.updateState_ = function (oldMap) {
    var map = this.getMap();
    var active = this.getActive();

    if (!map || !active) {
      map = map || oldMap;

      if (map) {
        var elem = map.getViewport();
        elem.classList.remove('ol-grab', 'ol-grabbing');
      }
    }
  };

  return Translate;
}(_Pointer_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Translate);

/***/ })

}]);