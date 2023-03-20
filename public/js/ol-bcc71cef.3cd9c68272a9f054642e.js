"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[898],{

/***/ 4481:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2618);
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
 * @module ol/AssertionError
 */



/**
 * Error object thrown when an assertion failed. This is an ECMA-262 Error,
 * extended with a `code` property.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error.
 */

var AssertionError =
/** @class */
function (_super) {
  __extends(AssertionError, _super);
  /**
   * @param {number} code Error code.
   */


  function AssertionError(code) {
    var _this = this;

    var path = _util_js__WEBPACK_IMPORTED_MODULE_0__/* .VERSION */ .q4 === 'latest' ? _util_js__WEBPACK_IMPORTED_MODULE_0__/* .VERSION */ .q4 : 'v' + _util_js__WEBPACK_IMPORTED_MODULE_0__/* .VERSION.split */ .q4.split('-')[0];
    var message = 'Assertion failed. See https://openlayers.org/en/' + path + '/doc/errors/#' + code + ' for details.';
    _this = _super.call(this, message) || this;
    /**
     * Error code. The meaning of the code can be found on
     * https://openlayers.org/en/latest/doc/errors/ (replace `latest` with
     * the version found in the OpenLayers script's header comment if a version
     * other than the latest is used).
     * @type {number}
     * @api
     */

    _this.code = code;
    /**
     * @type {string}
     */

    _this.name = 'AssertionError'; // Re-assign message, see https://github.com/Rich-Harris/buble/issues/40

    _this.message = message;
    return _this;
  }

  return AssertionError;
}(Error);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AssertionError);

/***/ }),

/***/ 1210:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export CollectionEvent */
/* harmony import */ var _AssertionError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4481);
/* harmony import */ var _Object_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7182);
/* harmony import */ var _CollectionEventType_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9890);
/* harmony import */ var _events_Event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
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
 * @module ol/Collection
 */






/**
 * @enum {string}
 * @private
 */

var Property = {
  LENGTH: 'length'
};
/**
 * @classdesc
 * Events emitted by {@link module:ol/Collection~Collection} instances are instances of this
 * type.
 */

var CollectionEvent =
/** @class */
function (_super) {
  __extends(CollectionEvent, _super);
  /**
   * @param {import("./CollectionEventType.js").default} type Type.
   * @param {*} [opt_element] Element.
   * @param {number} [opt_index] The index of the added or removed element.
   */


  function CollectionEvent(type, opt_element, opt_index) {
    var _this = _super.call(this, type) || this;
    /**
     * The element that is added to or removed from the collection.
     * @type {*}
     * @api
     */


    _this.element = opt_element;
    /**
     * The index of the added or removed element.
     * @type {number}
     * @api
     */

    _this.index = opt_index;
    return _this;
  }

  return CollectionEvent;
}(_events_Event_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP);


/***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *   import("./Observable").OnSignature<import("./ObjectEventType").Types|'change:length', import("./Object").ObjectEvent, Return> &
 *   import("./Observable").OnSignature<'add'|'remove', CollectionEvent, Return> &
 *   import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|import("./ObjectEventType").Types|
 *     'change:length'|'add'|'remove',Return>} CollectionOnSignature
 */

/**
 * @typedef {Object} Options
 * @property {boolean} [unique=false] Disallow the same item from being added to
 * the collection twice.
 */

/**
 * @classdesc
 * An expanded version of standard JS Array, adding convenience methods for
 * manipulation. Add and remove changes to the Collection trigger a Collection
 * event. Note that this does not cover changes to the objects _within_ the
 * Collection; they trigger events on the appropriate object, not on the
 * Collection as a whole.
 *
 * @fires CollectionEvent
 *
 * @template T
 * @api
 */

var Collection =
/** @class */
function (_super) {
  __extends(Collection, _super);
  /**
   * @param {Array<T>} [opt_array] Array.
   * @param {Options} [opt_options] Collection options.
   */


  function Collection(opt_array, opt_options) {
    var _this = _super.call(this) || this;
    /***
     * @type {CollectionOnSignature<import("./events").EventsKey>}
     */


    _this.on;
    /***
     * @type {CollectionOnSignature<import("./events").EventsKey>}
     */

    _this.once;
    /***
     * @type {CollectionOnSignature<void>}
     */

    _this.un;
    var options = opt_options || {};
    /**
     * @private
     * @type {boolean}
     */

    _this.unique_ = !!options.unique;
    /**
     * @private
     * @type {!Array<T>}
     */

    _this.array_ = opt_array ? opt_array : [];

    if (_this.unique_) {
      for (var i = 0, ii = _this.array_.length; i < ii; ++i) {
        _this.assertUnique_(_this.array_[i], i);
      }
    }

    _this.updateLength_();

    return _this;
  }
  /**
   * Remove all elements from the collection.
   * @api
   */


  Collection.prototype.clear = function () {
    while (this.getLength() > 0) {
      this.pop();
    }
  };
  /**
   * Add elements to the collection.  This pushes each item in the provided array
   * to the end of the collection.
   * @param {!Array<T>} arr Array.
   * @return {Collection<T>} This collection.
   * @api
   */


  Collection.prototype.extend = function (arr) {
    for (var i = 0, ii = arr.length; i < ii; ++i) {
      this.push(arr[i]);
    }

    return this;
  };
  /**
   * Iterate over each element, calling the provided callback.
   * @param {function(T, number, Array<T>): *} f The function to call
   *     for every element. This function takes 3 arguments (the element, the
   *     index and the array). The return value is ignored.
   * @api
   */


  Collection.prototype.forEach = function (f) {
    var array = this.array_;

    for (var i = 0, ii = array.length; i < ii; ++i) {
      f(array[i], i, array);
    }
  };
  /**
   * Get a reference to the underlying Array object. Warning: if the array
   * is mutated, no events will be dispatched by the collection, and the
   * collection's "length" property won't be in sync with the actual length
   * of the array.
   * @return {!Array<T>} Array.
   * @api
   */


  Collection.prototype.getArray = function () {
    return this.array_;
  };
  /**
   * Get the element at the provided index.
   * @param {number} index Index.
   * @return {T} Element.
   * @api
   */


  Collection.prototype.item = function (index) {
    return this.array_[index];
  };
  /**
   * Get the length of this collection.
   * @return {number} The length of the array.
   * @observable
   * @api
   */


  Collection.prototype.getLength = function () {
    return this.get(Property.LENGTH);
  };
  /**
   * Insert an element at the provided index.
   * @param {number} index Index.
   * @param {T} elem Element.
   * @api
   */


  Collection.prototype.insertAt = function (index, elem) {
    if (this.unique_) {
      this.assertUnique_(elem);
    }

    this.array_.splice(index, 0, elem);
    this.updateLength_();
    this.dispatchEvent(new CollectionEvent(_CollectionEventType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].ADD */ .Z.ADD, elem, index));
  };
  /**
   * Remove the last element of the collection and return it.
   * Return `undefined` if the collection is empty.
   * @return {T|undefined} Element.
   * @api
   */


  Collection.prototype.pop = function () {
    return this.removeAt(this.getLength() - 1);
  };
  /**
   * Insert the provided element at the end of the collection.
   * @param {T} elem Element.
   * @return {number} New length of the collection.
   * @api
   */


  Collection.prototype.push = function (elem) {
    if (this.unique_) {
      this.assertUnique_(elem);
    }

    var n = this.getLength();
    this.insertAt(n, elem);
    return this.getLength();
  };
  /**
   * Remove the first occurrence of an element from the collection.
   * @param {T} elem Element.
   * @return {T|undefined} The removed element or undefined if none found.
   * @api
   */


  Collection.prototype.remove = function (elem) {
    var arr = this.array_;

    for (var i = 0, ii = arr.length; i < ii; ++i) {
      if (arr[i] === elem) {
        return this.removeAt(i);
      }
    }

    return undefined;
  };
  /**
   * Remove the element at the provided index and return it.
   * Return `undefined` if the collection does not contain this index.
   * @param {number} index Index.
   * @return {T|undefined} Value.
   * @api
   */


  Collection.prototype.removeAt = function (index) {
    var prev = this.array_[index];
    this.array_.splice(index, 1);
    this.updateLength_();
    this.dispatchEvent(new CollectionEvent(_CollectionEventType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].REMOVE */ .Z.REMOVE, prev, index));
    return prev;
  };
  /**
   * Set the element at the provided index.
   * @param {number} index Index.
   * @param {T} elem Element.
   * @api
   */


  Collection.prototype.setAt = function (index, elem) {
    var n = this.getLength();

    if (index < n) {
      if (this.unique_) {
        this.assertUnique_(elem, index);
      }

      var prev = this.array_[index];
      this.array_[index] = elem;
      this.dispatchEvent(new CollectionEvent(_CollectionEventType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].REMOVE */ .Z.REMOVE, prev, index));
      this.dispatchEvent(new CollectionEvent(_CollectionEventType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].ADD */ .Z.ADD, elem, index));
    } else {
      for (var j = n; j < index; ++j) {
        this.insertAt(j, undefined);
      }

      this.insertAt(index, elem);
    }
  };
  /**
   * @private
   */


  Collection.prototype.updateLength_ = function () {
    this.set(Property.LENGTH, this.array_.length);
  };
  /**
   * @private
   * @param {T} elem Element.
   * @param {number} [opt_except] Optional index to ignore.
   */


  Collection.prototype.assertUnique_ = function (elem, opt_except) {
    for (var i = 0, ii = this.array_.length; i < ii; ++i) {
      if (this.array_[i] === elem && i !== opt_except) {
        throw new _AssertionError_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z(58);
      }
    }
  };

  return Collection;
}(_Object_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Collection);

/***/ }),

/***/ 9890:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/CollectionEventType
 */

/**
 * @enum {string}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /**
   * Triggered when an item is added to the collection.
   * @event module:ol/Collection.CollectionEvent#add
   * @api
   */
  ADD: 'add',

  /**
   * Triggered when an item is removed from the collection.
   * @event module:ol/Collection.CollectionEvent#remove
   * @api
   */
  REMOVE: 'remove'
});

/***/ }),

/***/ 7170:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/Disposable
 */

/**
 * @classdesc
 * Objects that need to clean up after themselves.
 */
var Disposable =
/** @class */
function () {
  function Disposable() {
    /**
     * The object has already been disposed.
     * @type {boolean}
     * @protected
     */
    this.disposed = false;
  }
  /**
   * Clean up.
   */


  Disposable.prototype.dispose = function () {
    if (!this.disposed) {
      this.disposed = true;
      this.disposeInternal();
    }
  };
  /**
   * Extension point for disposable objects.
   * @protected
   */


  Disposable.prototype.disposeInternal = function () {};

  return Disposable;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Disposable);

/***/ }),

/***/ 5028:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export createStyleFunction */
/* harmony import */ var _Object_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7182);
/* harmony import */ var _events_EventType_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2140);
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4548);
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5750);
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
 * @module ol/Feature
 */






/**
 * @typedef {typeof Feature|typeof import("./render/Feature.js").default} FeatureClass
 */

/**
 * @typedef {Feature<import("./geom/Geometry.js").default>|import("./render/Feature.js").default} FeatureLike
 */

/***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *   import("./Observable").OnSignature<import("./ObjectEventType").Types|'change:geometry', import("./Object").ObjectEvent, Return> &
 *   import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|import("./ObjectEventType").Types
 *     |'change:geometry', Return>} FeatureOnSignature
 */

/***
 * @template Geometry
 * @typedef {Object<string, *> & { geometry?: Geometry }} ObjectWithGeometry
 */

/**
 * @classdesc
 * A vector object for geographic features with a geometry and other
 * attribute properties, similar to the features in vector file formats like
 * GeoJSON.
 *
 * Features can be styled individually with `setStyle`; otherwise they use the
 * style of their vector layer.
 *
 * Note that attribute properties are set as {@link module:ol/Object} properties on
 * the feature object, so they are observable, and have get/set accessors.
 *
 * Typically, a feature has a single geometry property. You can set the
 * geometry using the `setGeometry` method and get it with `getGeometry`.
 * It is possible to store more than one geometry on a feature using attribute
 * properties. By default, the geometry used for rendering is identified by
 * the property name `geometry`. If you want to use another geometry property
 * for rendering, use the `setGeometryName` method to change the attribute
 * property associated with the geometry for the feature.  For example:
 *
 * ```js
 *
 * import Feature from 'ol/Feature';
 * import Polygon from 'ol/geom/Polygon';
 * import Point from 'ol/geom/Point';
 *
 * var feature = new Feature({
 *   geometry: new Polygon(polyCoords),
 *   labelPoint: new Point(labelCoords),
 *   name: 'My Polygon'
 * });
 *
 * // get the polygon geometry
 * var poly = feature.getGeometry();
 *
 * // Render the feature as a point using the coordinates from labelPoint
 * feature.setGeometryName('labelPoint');
 *
 * // get the point geometry
 * var point = feature.getGeometry();
 * ```
 *
 * @api
 * @template {import("./geom/Geometry.js").default} Geometry
 */

var Feature =
/** @class */
function (_super) {
  __extends(Feature, _super);
  /**
   * @param {Geometry|ObjectWithGeometry<Geometry>} [opt_geometryOrProperties]
   *     You may pass a Geometry object directly, or an object literal containing
   *     properties. If you pass an object literal, you may include a Geometry
   *     associated with a `geometry` key.
   */


  function Feature(opt_geometryOrProperties) {
    var _this = _super.call(this) || this;
    /***
     * @type {FeatureOnSignature<import("./events").EventsKey>}
     */


    _this.on;
    /***
     * @type {FeatureOnSignature<import("./events").EventsKey>}
     */

    _this.once;
    /***
     * @type {FeatureOnSignature<void>}
     */

    _this.un;
    /**
     * @private
     * @type {number|string|undefined}
     */

    _this.id_ = undefined;
    /**
     * @type {string}
     * @private
     */

    _this.geometryName_ = 'geometry';
    /**
     * User provided style.
     * @private
     * @type {import("./style/Style.js").StyleLike}
     */

    _this.style_ = null;
    /**
     * @private
     * @type {import("./style/Style.js").StyleFunction|undefined}
     */

    _this.styleFunction_ = undefined;
    /**
     * @private
     * @type {?import("./events.js").EventsKey}
     */

    _this.geometryChangeKey_ = null;

    _this.addChangeListener(_this.geometryName_, _this.handleGeometryChanged_);

    if (opt_geometryOrProperties) {
      if (typeof
      /** @type {?} */
      opt_geometryOrProperties.getSimplifiedGeometry === 'function') {
        var geometry =
        /** @type {Geometry} */
        opt_geometryOrProperties;

        _this.setGeometry(geometry);
      } else {
        /** @type {Object<string, *>} */
        var properties = opt_geometryOrProperties;

        _this.setProperties(properties);
      }
    }

    return _this;
  }
  /**
   * Clone this feature. If the original feature has a geometry it
   * is also cloned. The feature id is not set in the clone.
   * @return {Feature<Geometry>} The clone.
   * @api
   */


  Feature.prototype.clone = function () {
    var clone =
    /** @type {Feature<Geometry>} */
    new Feature(this.hasProperties() ? this.getProperties() : null);
    clone.setGeometryName(this.getGeometryName());
    var geometry = this.getGeometry();

    if (geometry) {
      clone.setGeometry(
      /** @type {Geometry} */
      geometry.clone());
    }

    var style = this.getStyle();

    if (style) {
      clone.setStyle(style);
    }

    return clone;
  };
  /**
   * Get the feature's default geometry.  A feature may have any number of named
   * geometries.  The "default" geometry (the one that is rendered by default) is
   * set when calling {@link module:ol/Feature~Feature#setGeometry}.
   * @return {Geometry|undefined} The default geometry for the feature.
   * @api
   * @observable
   */


  Feature.prototype.getGeometry = function () {
    return (
      /** @type {Geometry|undefined} */
      this.get(this.geometryName_)
    );
  };
  /**
   * Get the feature identifier.  This is a stable identifier for the feature and
   * is either set when reading data from a remote source or set explicitly by
   * calling {@link module:ol/Feature~Feature#setId}.
   * @return {number|string|undefined} Id.
   * @api
   */


  Feature.prototype.getId = function () {
    return this.id_;
  };
  /**
   * Get the name of the feature's default geometry.  By default, the default
   * geometry is named `geometry`.
   * @return {string} Get the property name associated with the default geometry
   *     for this feature.
   * @api
   */


  Feature.prototype.getGeometryName = function () {
    return this.geometryName_;
  };
  /**
   * Get the feature's style. Will return what was provided to the
   * {@link module:ol/Feature~Feature#setStyle} method.
   * @return {import("./style/Style.js").StyleLike|undefined} The feature style.
   * @api
   */


  Feature.prototype.getStyle = function () {
    return this.style_;
  };
  /**
   * Get the feature's style function.
   * @return {import("./style/Style.js").StyleFunction|undefined} Return a function
   * representing the current style of this feature.
   * @api
   */


  Feature.prototype.getStyleFunction = function () {
    return this.styleFunction_;
  };
  /**
   * @private
   */


  Feature.prototype.handleGeometryChange_ = function () {
    this.changed();
  };
  /**
   * @private
   */


  Feature.prototype.handleGeometryChanged_ = function () {
    if (this.geometryChangeKey_) {
      (0,_events_js__WEBPACK_IMPORTED_MODULE_0__/* .unlistenByKey */ .bN)(this.geometryChangeKey_);
      this.geometryChangeKey_ = null;
    }

    var geometry = this.getGeometry();

    if (geometry) {
      this.geometryChangeKey_ = (0,_events_js__WEBPACK_IMPORTED_MODULE_0__/* .listen */ .oL)(geometry, _events_EventType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].CHANGE */ .Z.CHANGE, this.handleGeometryChange_, this);
    }

    this.changed();
  };
  /**
   * Set the default geometry for the feature.  This will update the property
   * with the name returned by {@link module:ol/Feature~Feature#getGeometryName}.
   * @param {Geometry|undefined} geometry The new geometry.
   * @api
   * @observable
   */


  Feature.prototype.setGeometry = function (geometry) {
    this.set(this.geometryName_, geometry);
  };
  /**
   * Set the style for the feature to override the layer style.  This can be a
   * single style object, an array of styles, or a function that takes a
   * resolution and returns an array of styles. To unset the feature style, call
   * `setStyle()` without arguments or a falsey value.
   * @param {import("./style/Style.js").StyleLike} [opt_style] Style for this feature.
   * @api
   * @fires module:ol/events/Event~BaseEvent#event:change
   */


  Feature.prototype.setStyle = function (opt_style) {
    this.style_ = opt_style;
    this.styleFunction_ = !opt_style ? undefined : createStyleFunction(opt_style);
    this.changed();
  };
  /**
   * Set the feature id.  The feature id is considered stable and may be used when
   * requesting features or comparing identifiers returned from a remote source.
   * The feature id can be used with the
   * {@link module:ol/source/Vector~VectorSource#getFeatureById} method.
   * @param {number|string|undefined} id The feature id.
   * @api
   * @fires module:ol/events/Event~BaseEvent#event:change
   */


  Feature.prototype.setId = function (id) {
    this.id_ = id;
    this.changed();
  };
  /**
   * Set the property name to be used when getting the feature's default geometry.
   * When calling {@link module:ol/Feature~Feature#getGeometry}, the value of the property with
   * this name will be returned.
   * @param {string} name The property name of the default geometry.
   * @api
   */


  Feature.prototype.setGeometryName = function (name) {
    this.removeChangeListener(this.geometryName_, this.handleGeometryChanged_);
    this.geometryName_ = name;
    this.addChangeListener(this.geometryName_, this.handleGeometryChanged_);
    this.handleGeometryChanged_();
  };

  return Feature;
}(_Object_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z);
/**
 * Convert the provided object into a feature style function.  Functions passed
 * through unchanged.  Arrays of Style or single style objects wrapped
 * in a new feature style function.
 * @param {!import("./style/Style.js").StyleFunction|!Array<import("./style/Style.js").default>|!import("./style/Style.js").default} obj
 *     A feature style function, a single style, or an array of styles.
 * @return {import("./style/Style.js").StyleFunction} A style function.
 */


function createStyleFunction(obj) {
  if (typeof obj === 'function') {
    return obj;
  } else {
    /**
     * @type {Array<import("./style/Style.js").default>}
     */
    var styles_1;

    if (Array.isArray(obj)) {
      styles_1 = obj;
    } else {
      (0,_asserts_js__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h)(typeof
      /** @type {?} */
      obj.getZIndex === 'function', 41); // Expected an `import("./style/Style.js").Style` or an array of `import("./style/Style.js").Style`

      var style =
      /** @type {import("./style/Style.js").default} */
      obj;
      styles_1 = [style];
    }

    return function () {
      return styles_1;
    };
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Feature);

/***/ }),

/***/ 7515:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "K": () => (/* binding */ listenImage)
});

// UNUSED EXPORTS: default

// EXTERNAL MODULE: ./node_modules/ol/events/EventType.js
var EventType = __webpack_require__(2140);
// EXTERNAL MODULE: ./node_modules/ol/events/Target.js
var Target = __webpack_require__(9699);
// EXTERNAL MODULE: ./node_modules/ol/util.js
var util = __webpack_require__(2618);
;// CONCATENATED MODULE: ./node_modules/ol/ImageBase.js
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
 * @module ol/ImageBase
 */





/**
 * @abstract
 */

var ImageBase =
/** @class */
function (_super) {
  __extends(ImageBase, _super);
  /**
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {number|undefined} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("./ImageState.js").default} state State.
   */


  function ImageBase(extent, resolution, pixelRatio, state) {
    var _this = _super.call(this) || this;
    /**
     * @protected
     * @type {import("./extent.js").Extent}
     */


    _this.extent = extent;
    /**
     * @private
     * @type {number}
     */

    _this.pixelRatio_ = pixelRatio;
    /**
     * @protected
     * @type {number|undefined}
     */

    _this.resolution = resolution;
    /**
     * @protected
     * @type {import("./ImageState.js").default}
     */

    _this.state = state;
    return _this;
  }
  /**
   * @protected
   */


  ImageBase.prototype.changed = function () {
    this.dispatchEvent(EventType/* default.CHANGE */.Z.CHANGE);
  };
  /**
   * @return {import("./extent.js").Extent} Extent.
   */


  ImageBase.prototype.getExtent = function () {
    return this.extent;
  };
  /**
   * @abstract
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   */


  ImageBase.prototype.getImage = function () {
    return (0,util/* abstract */.O3)();
  };
  /**
   * @return {number} PixelRatio.
   */


  ImageBase.prototype.getPixelRatio = function () {
    return this.pixelRatio_;
  };
  /**
   * @return {number} Resolution.
   */


  ImageBase.prototype.getResolution = function () {
    return (
      /** @type {number} */
      this.resolution
    );
  };
  /**
   * @return {import("./ImageState.js").default} State.
   */


  ImageBase.prototype.getState = function () {
    return this.state;
  };
  /**
   * Load not yet loaded URI.
   * @abstract
   */


  ImageBase.prototype.load = function () {
    (0,util/* abstract */.O3)();
  };

  return ImageBase;
}(Target/* default */.Z);

/* harmony default export */ const ol_ImageBase = (ImageBase);
// EXTERNAL MODULE: ./node_modules/ol/ImageState.js
var ImageState = __webpack_require__(4382);
// EXTERNAL MODULE: ./node_modules/ol/has.js
var has = __webpack_require__(4242);
// EXTERNAL MODULE: ./node_modules/ol/extent.js
var extent = __webpack_require__(1046);
// EXTERNAL MODULE: ./node_modules/ol/events.js
var events = __webpack_require__(5750);
;// CONCATENATED MODULE: ./node_modules/ol/Image.js
var Image_extends = undefined && undefined.__extends || function () {
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
 * @module ol/Image
 */








/**
 * A function that takes an {@link module:ol/Image~Image} for the image and a
 * `{string}` for the src as arguments. It is supposed to make it so the
 * underlying image {@link module:ol/Image~Image#getImage} is assigned the
 * content specified by the src. If not specified, the default is
 *
 *     function(image, src) {
 *       image.getImage().src = src;
 *     }
 *
 * Providing a custom `imageLoadFunction` can be useful to load images with
 * post requests or - in general - through XHR requests, where the src of the
 * image element would be set to a data URI when the content is loaded.
 *
 * @typedef {function(ImageWrapper, string): void} LoadFunction
 * @api
 */

var ImageWrapper =
/** @class */
function (_super) {
  Image_extends(ImageWrapper, _super);
  /**
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {number|undefined} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {string} src Image source URI.
   * @param {?string} crossOrigin Cross origin.
   * @param {LoadFunction} imageLoadFunction Image load function.
   */


  function ImageWrapper(extent, resolution, pixelRatio, src, crossOrigin, imageLoadFunction) {
    var _this = _super.call(this, extent, resolution, pixelRatio, ImageState/* default.IDLE */.Z.IDLE) || this;
    /**
     * @private
     * @type {string}
     */


    _this.src_ = src;
    /**
     * @private
     * @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement}
     */

    _this.image_ = new Image();

    if (crossOrigin !== null) {
      _this.image_.crossOrigin = crossOrigin;
    }
    /**
     * @private
     * @type {?function():void}
     */


    _this.unlisten_ = null;
    /**
     * @protected
     * @type {import("./ImageState.js").default}
     */

    _this.state = ImageState/* default.IDLE */.Z.IDLE;
    /**
     * @private
     * @type {LoadFunction}
     */

    _this.imageLoadFunction_ = imageLoadFunction;
    return _this;
  }
  /**
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @api
   */


  ImageWrapper.prototype.getImage = function () {
    return this.image_;
  };
  /**
   * Tracks loading or read errors.
   *
   * @private
   */


  ImageWrapper.prototype.handleImageError_ = function () {
    this.state = ImageState/* default.ERROR */.Z.ERROR;
    this.unlistenImage_();
    this.changed();
  };
  /**
   * Tracks successful image load.
   *
   * @private
   */


  ImageWrapper.prototype.handleImageLoad_ = function () {
    if (this.resolution === undefined) {
      this.resolution = (0,extent/* getHeight */.Cr)(this.extent) / this.image_.height;
    }

    this.state = ImageState/* default.LOADED */.Z.LOADED;
    this.unlistenImage_();
    this.changed();
  };
  /**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   * @api
   */


  ImageWrapper.prototype.load = function () {
    if (this.state == ImageState/* default.IDLE */.Z.IDLE || this.state == ImageState/* default.ERROR */.Z.ERROR) {
      this.state = ImageState/* default.LOADING */.Z.LOADING;
      this.changed();
      this.imageLoadFunction_(this, this.src_);
      this.unlisten_ = listenImage(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
    }
  };
  /**
   * @param {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} image Image.
   */


  ImageWrapper.prototype.setImage = function (image) {
    this.image_ = image;
    this.resolution = (0,extent/* getHeight */.Cr)(this.extent) / this.image_.height;
  };
  /**
   * Discards event handlers which listen for load completion or errors.
   *
   * @private
   */


  ImageWrapper.prototype.unlistenImage_ = function () {
    if (this.unlisten_) {
      this.unlisten_();
      this.unlisten_ = null;
    }
  };

  return ImageWrapper;
}(ol_ImageBase);
/**
 * @param {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} image Image element.
 * @param {function():any} loadHandler Load callback function.
 * @param {function():any} errorHandler Error callback function.
 * @return {function():void} Callback to stop listening.
 */


function listenImage(image, loadHandler, errorHandler) {
  var img =
  /** @type {HTMLImageElement} */
  image;

  if (img.src && has/* IMAGE_DECODE */.Tp) {
    var promise = img.decode();
    var listening_1 = true;

    var unlisten = function () {
      listening_1 = false;
    };

    promise.then(function () {
      if (listening_1) {
        loadHandler();
      }
    }).catch(function (error) {
      if (listening_1) {
        // FIXME: Unconditionally call errorHandler() when this bug is fixed upstream:
        //        https://bugs.webkit.org/show_bug.cgi?id=198527
        if (error.name === 'EncodingError' && error.message === 'Invalid image type.') {
          loadHandler();
        } else {
          errorHandler();
        }
      }
    });
    return unlisten;
  }

  var listenerKeys = [(0,events/* listenOnce */.Vx)(img, EventType/* default.LOAD */.Z.LOAD, loadHandler), (0,events/* listenOnce */.Vx)(img, EventType/* default.ERROR */.Z.ERROR, errorHandler)];
  return function unlisten() {
    listenerKeys.forEach(events/* unlistenByKey */.bN);
  };
}
/* harmony default export */ const ol_Image = ((/* unused pure expression or super */ null && (ImageWrapper)));

/***/ }),

/***/ 4382:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/ImageState
 */

/**
 * @enum {number}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
});

/***/ }),

/***/ 5561:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6791);
/* harmony import */ var _TileState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(587);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9631);
/* harmony import */ var _Image_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7515);
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
 * @module ol/ImageTile
 */







var ImageTile =
/** @class */
function (_super) {
  __extends(ImageTile, _super);
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {string} src Image source URI.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @param {import("./Tile.js").Options} [opt_options] Tile options.
   */


  function ImageTile(tileCoord, state, src, crossOrigin, tileLoadFunction, opt_options) {
    var _this = _super.call(this, tileCoord, state, opt_options) || this;
    /**
     * @private
     * @type {?string}
     */


    _this.crossOrigin_ = crossOrigin;
    /**
     * Image URI
     *
     * @private
     * @type {string}
     */

    _this.src_ = src;
    _this.key = src;
    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement}
     */

    _this.image_ = new Image();

    if (crossOrigin !== null) {
      _this.image_.crossOrigin = crossOrigin;
    }
    /**
     * @private
     * @type {?function():void}
     */


    _this.unlisten_ = null;
    /**
     * @private
     * @type {import("./Tile.js").LoadFunction}
     */

    _this.tileLoadFunction_ = tileLoadFunction;
    return _this;
  }
  /**
   * Get the HTML image element for this tile (may be a Canvas, Image, or Video).
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @api
   */


  ImageTile.prototype.getImage = function () {
    return this.image_;
  };
  /**
   * Sets an HTML image element for this tile (may be a Canvas or preloaded Image).
   * @param {HTMLCanvasElement|HTMLImageElement} element Element.
   */


  ImageTile.prototype.setImage = function (element) {
    this.image_ = element;
    this.state = _TileState_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].LOADED */ .Z.LOADED;
    this.unlistenImage_();
    this.changed();
  };
  /**
   * Tracks loading or read errors.
   *
   * @private
   */


  ImageTile.prototype.handleImageError_ = function () {
    this.state = _TileState_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].ERROR */ .Z.ERROR;
    this.unlistenImage_();
    this.image_ = getBlankImage();
    this.changed();
  };
  /**
   * Tracks successful image load.
   *
   * @private
   */


  ImageTile.prototype.handleImageLoad_ = function () {
    var image =
    /** @type {HTMLImageElement} */
    this.image_;

    if (image.naturalWidth && image.naturalHeight) {
      this.state = _TileState_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].LOADED */ .Z.LOADED;
    } else {
      this.state = _TileState_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].EMPTY */ .Z.EMPTY;
    }

    this.unlistenImage_();
    this.changed();
  };
  /**
   * Load not yet loaded URI.
   * @api
   */


  ImageTile.prototype.load = function () {
    if (this.state == _TileState_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].ERROR */ .Z.ERROR) {
      this.state = _TileState_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].IDLE */ .Z.IDLE;
      this.image_ = new Image();

      if (this.crossOrigin_ !== null) {
        this.image_.crossOrigin = this.crossOrigin_;
      }
    }

    if (this.state == _TileState_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].IDLE */ .Z.IDLE) {
      this.state = _TileState_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].LOADING */ .Z.LOADING;
      this.changed();
      this.tileLoadFunction_(this, this.src_);
      this.unlisten_ = (0,_Image_js__WEBPACK_IMPORTED_MODULE_1__/* .listenImage */ .K)(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
    }
  };
  /**
   * Discards event handlers which listen for load completion or errors.
   *
   * @private
   */


  ImageTile.prototype.unlistenImage_ = function () {
    if (this.unlisten_) {
      this.unlisten_();
      this.unlisten_ = null;
    }
  };

  return ImageTile;
}(_Tile_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z);
/**
 * Get a 1-pixel blank image.
 * @return {HTMLCanvasElement} Blank image.
 */


function getBlankImage() {
  var ctx = (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__/* .createCanvasContext2D */ .E4)(1, 1);
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, 1, 1);
  return ctx.canvas;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageTile);

/***/ }),

/***/ 8221:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/Kinetic
 */

/**
 * @classdesc
 * Implementation of inertial deceleration for map movement.
 *
 * @api
 */
var Kinetic =
/** @class */
function () {
  /**
   * @param {number} decay Rate of decay (must be negative).
   * @param {number} minVelocity Minimum velocity (pixels/millisecond).
   * @param {number} delay Delay to consider to calculate the kinetic
   *     initial values (milliseconds).
   */
  function Kinetic(decay, minVelocity, delay) {
    /**
     * @private
     * @type {number}
     */
    this.decay_ = decay;
    /**
     * @private
     * @type {number}
     */

    this.minVelocity_ = minVelocity;
    /**
     * @private
     * @type {number}
     */

    this.delay_ = delay;
    /**
     * @private
     * @type {Array<number>}
     */

    this.points_ = [];
    /**
     * @private
     * @type {number}
     */

    this.angle_ = 0;
    /**
     * @private
     * @type {number}
     */

    this.initialVelocity_ = 0;
  }
  /**
   * FIXME empty description for jsdoc
   */


  Kinetic.prototype.begin = function () {
    this.points_.length = 0;
    this.angle_ = 0;
    this.initialVelocity_ = 0;
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   */


  Kinetic.prototype.update = function (x, y) {
    this.points_.push(x, y, Date.now());
  };
  /**
   * @return {boolean} Whether we should do kinetic animation.
   */


  Kinetic.prototype.end = function () {
    if (this.points_.length < 6) {
      // at least 2 points are required (i.e. there must be at least 6 elements
      // in the array)
      return false;
    }

    var delay = Date.now() - this.delay_;
    var lastIndex = this.points_.length - 3;

    if (this.points_[lastIndex + 2] < delay) {
      // the last tracked point is too old, which means that the user stopped
      // panning before releasing the map
      return false;
    } // get the first point which still falls into the delay time


    var firstIndex = lastIndex - 3;

    while (firstIndex > 0 && this.points_[firstIndex + 2] > delay) {
      firstIndex -= 3;
    }

    var duration = this.points_[lastIndex + 2] - this.points_[firstIndex + 2]; // we don't want a duration of 0 (divide by zero)
    // we also make sure the user panned for a duration of at least one frame
    // (1/60s) to compute sane displacement values

    if (duration < 1000 / 60) {
      return false;
    }

    var dx = this.points_[lastIndex] - this.points_[firstIndex];
    var dy = this.points_[lastIndex + 1] - this.points_[firstIndex + 1];
    this.angle_ = Math.atan2(dy, dx);
    this.initialVelocity_ = Math.sqrt(dx * dx + dy * dy) / duration;
    return this.initialVelocity_ > this.minVelocity_;
  };
  /**
   * @return {number} Total distance travelled (pixels).
   */


  Kinetic.prototype.getDistance = function () {
    return (this.minVelocity_ - this.initialVelocity_) / this.decay_;
  };
  /**
   * @return {number} Angle of the kinetic panning animation (radians).
   */


  Kinetic.prototype.getAngle = function () {
    return this.angle_;
  };

  return Kinetic;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Kinetic);

/***/ }),

/***/ 1548:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MapEvent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9105);
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
 * @module ol/MapBrowserEvent
 */



/**
 * @classdesc
 * Events emitted as map browser events are instances of this type.
 * See {@link module:ol/PluggableMap~PluggableMap} for which events trigger a map browser event.
 * @template {UIEvent} EVENT
 */

var MapBrowserEvent =
/** @class */
function (_super) {
  __extends(MapBrowserEvent, _super);
  /**
   * @param {string} type Event type.
   * @param {import("./PluggableMap.js").default} map Map.
   * @param {EVENT} originalEvent Original event.
   * @param {boolean} [opt_dragging] Is the map currently being dragged?
   * @param {?import("./PluggableMap.js").FrameState} [opt_frameState] Frame state.
   */


  function MapBrowserEvent(type, map, originalEvent, opt_dragging, opt_frameState) {
    var _this = _super.call(this, type, map, opt_frameState) || this;
    /**
     * The original browser event.
     * @const
     * @type {EVENT}
     * @api
     */


    _this.originalEvent = originalEvent;
    /**
     * The map pixel relative to the viewport corresponding to the original browser event.
     * @type {?import("./pixel.js").Pixel}
     */

    _this.pixel_ = null;
    /**
     * The coordinate in the user projection corresponding to the original browser event.
     * @type {?import("./coordinate.js").Coordinate}
     */

    _this.coordinate_ = null;
    /**
     * Indicates if the map is currently being dragged. Only set for
     * `POINTERDRAG` and `POINTERMOVE` events. Default is `false`.
     *
     * @type {boolean}
     * @api
     */

    _this.dragging = opt_dragging !== undefined ? opt_dragging : false;
    return _this;
  }

  Object.defineProperty(MapBrowserEvent.prototype, "pixel", {
    /**
     * The map pixel relative to the viewport corresponding to the original event.
     * @type {import("./pixel.js").Pixel}
     * @api
     */
    get: function () {
      if (!this.pixel_) {
        this.pixel_ = this.map.getEventPixel(this.originalEvent);
      }

      return this.pixel_;
    },
    set: function (pixel) {
      this.pixel_ = pixel;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MapBrowserEvent.prototype, "coordinate", {
    /**
     * The coordinate corresponding to the original browser event.  This will be in the user
     * projection if one is set.  Otherwise it will be in the view projection.
     * @type {import("./coordinate.js").Coordinate}
     * @api
     */
    get: function () {
      if (!this.coordinate_) {
        this.coordinate_ = this.map.getCoordinateFromPixel(this.pixel);
      }

      return this.coordinate_;
    },
    set: function (coordinate) {
      this.coordinate_ = coordinate;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Prevents the default browser action.
   * See https://developer.mozilla.org/en-US/docs/Web/API/event.preventDefault.
   * @api
   */

  MapBrowserEvent.prototype.preventDefault = function () {
    _super.prototype.preventDefault.call(this);

    if ('preventDefault' in this.originalEvent) {
      /** @type {UIEvent} */
      this.originalEvent.preventDefault();
    }
  };
  /**
   * Prevents further propagation of the current event.
   * See https://developer.mozilla.org/en-US/docs/Web/API/event.stopPropagation.
   * @api
   */


  MapBrowserEvent.prototype.stopPropagation = function () {
    _super.prototype.stopPropagation.call(this);

    if ('stopPropagation' in this.originalEvent) {
      /** @type {UIEvent} */
      this.originalEvent.stopPropagation();
    }
  };

  return MapBrowserEvent;
}(_MapEvent_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MapBrowserEvent);

/***/ }),

/***/ 8326:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _events_EventType_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2140);
/* harmony import */ var _MapBrowserEvent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1548);
/* harmony import */ var _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3998);
/* harmony import */ var _pointer_EventType_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6850);
/* harmony import */ var _events_Target_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9699);
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4242);
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3658);
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5750);
/**
 * @module ol/MapBrowserEventHandler
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










var MapBrowserEventHandler =
/** @class */
function (_super) {
  __extends(MapBrowserEventHandler, _super);
  /**
   * @param {import("./PluggableMap.js").default} map The map with the viewport to listen to events on.
   * @param {number} [moveTolerance] The minimal distance the pointer must travel to trigger a move.
   */


  function MapBrowserEventHandler(map, moveTolerance) {
    var _this = _super.call(this, map) || this;
    /**
     * This is the element that we will listen to the real events on.
     * @type {import("./PluggableMap.js").default}
     * @private
     */


    _this.map_ = map;
    /**
     * @type {any}
     * @private
     */

    _this.clickTimeoutId_;
    /**
     * Emulate dblclick and singleclick. Will be true when only one pointer is active.
     * @type {boolean}
     */

    _this.emulateClicks_ = false;
    /**
     * @type {boolean}
     * @private
     */

    _this.dragging_ = false;
    /**
     * @type {!Array<import("./events.js").EventsKey>}
     * @private
     */

    _this.dragListenerKeys_ = [];
    /**
     * @type {number}
     * @private
     */

    _this.moveTolerance_ = moveTolerance === undefined ? 1 : moveTolerance;
    /**
     * The most recent "down" type event (or null if none have occurred).
     * Set on pointerdown.
     * @type {PointerEvent}
     * @private
     */

    _this.down_ = null;

    var element = _this.map_.getViewport();
    /**
     * @type {number}
     * @private
     */


    _this.activePointers_ = 0;
    /**
     * @type {!Object<number, boolean>}
     * @private
     */

    _this.trackedTouches_ = {};
    _this.element_ = element;
    /**
     * @type {?import("./events.js").EventsKey}
     * @private
     */

    _this.pointerdownListenerKey_ = (0,_events_js__WEBPACK_IMPORTED_MODULE_0__/* .listen */ .oL)(element, _pointer_EventType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].POINTERDOWN */ .Z.POINTERDOWN, _this.handlePointerDown_, _this);
    /**
     * @type {PointerEvent}
     * @private
     */

    _this.originalPointerMoveEvent_;
    /**
     * @type {?import("./events.js").EventsKey}
     * @private
     */

    _this.relayedListenerKey_ = (0,_events_js__WEBPACK_IMPORTED_MODULE_0__/* .listen */ .oL)(element, _pointer_EventType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].POINTERMOVE */ .Z.POINTERMOVE, _this.relayEvent_, _this);
    /**
     * @private
     */

    _this.boundHandleTouchMove_ = _this.handleTouchMove_.bind(_this);

    _this.element_.addEventListener(_events_EventType_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].TOUCHMOVE */ .Z.TOUCHMOVE, _this.boundHandleTouchMove_, _has_js__WEBPACK_IMPORTED_MODULE_3__/* .PASSIVE_EVENT_LISTENERS */ .bM ? {
      passive: false
    } : false);

    return _this;
  }
  /**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */


  MapBrowserEventHandler.prototype.emulateClick_ = function (pointerEvent) {
    var newEvent = new _MapBrowserEvent_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z(_MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].CLICK */ .Z.CLICK, this.map_, pointerEvent);
    this.dispatchEvent(newEvent);

    if (this.clickTimeoutId_ !== undefined) {
      // double-click
      clearTimeout(this.clickTimeoutId_);
      this.clickTimeoutId_ = undefined;
      newEvent = new _MapBrowserEvent_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z(_MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].DBLCLICK */ .Z.DBLCLICK, this.map_, pointerEvent);
      this.dispatchEvent(newEvent);
    } else {
      // click
      this.clickTimeoutId_ = setTimeout(
      /** @this {MapBrowserEventHandler} */
      function () {
        this.clickTimeoutId_ = undefined;
        var newEvent = new _MapBrowserEvent_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z(_MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].SINGLECLICK */ .Z.SINGLECLICK, this.map_, pointerEvent);
        this.dispatchEvent(newEvent);
      }.bind(this), 250);
    }
  };
  /**
   * Keeps track on how many pointers are currently active.
   *
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */


  MapBrowserEventHandler.prototype.updateActivePointers_ = function (pointerEvent) {
    var event = pointerEvent;

    if (event.type == _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].POINTERUP */ .Z.POINTERUP || event.type == _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].POINTERCANCEL */ .Z.POINTERCANCEL) {
      delete this.trackedTouches_[event.pointerId];
    } else if (event.type == _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].POINTERDOWN */ .Z.POINTERDOWN) {
      this.trackedTouches_[event.pointerId] = true;
    }

    this.activePointers_ = Object.keys(this.trackedTouches_).length;
  };
  /**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */


  MapBrowserEventHandler.prototype.handlePointerUp_ = function (pointerEvent) {
    this.updateActivePointers_(pointerEvent);
    var newEvent = new _MapBrowserEvent_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z(_MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].POINTERUP */ .Z.POINTERUP, this.map_, pointerEvent);
    this.dispatchEvent(newEvent); // We emulate click events on left mouse button click, touch contact, and pen
    // contact. isMouseActionButton returns true in these cases (evt.button is set
    // to 0).
    // See http://www.w3.org/TR/pointerevents/#button-states
    // We only fire click, singleclick, and doubleclick if nobody has called
    // event.preventDefault().

    if (this.emulateClicks_ && !newEvent.defaultPrevented && !this.dragging_ && this.isMouseActionButton_(pointerEvent)) {
      this.emulateClick_(this.down_);
    }

    if (this.activePointers_ === 0) {
      this.dragListenerKeys_.forEach(_events_js__WEBPACK_IMPORTED_MODULE_0__/* .unlistenByKey */ .bN);
      this.dragListenerKeys_.length = 0;
      this.dragging_ = false;
      this.down_ = null;
    }
  };
  /**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @return {boolean} If the left mouse button was pressed.
   * @private
   */


  MapBrowserEventHandler.prototype.isMouseActionButton_ = function (pointerEvent) {
    return pointerEvent.button === 0;
  };
  /**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */


  MapBrowserEventHandler.prototype.handlePointerDown_ = function (pointerEvent) {
    this.emulateClicks_ = this.activePointers_ === 0;
    this.updateActivePointers_(pointerEvent);
    var newEvent = new _MapBrowserEvent_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z(_MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].POINTERDOWN */ .Z.POINTERDOWN, this.map_, pointerEvent);
    this.dispatchEvent(newEvent); // Store a copy of the down event

    this.down_ =
    /** @type {PointerEvent} */
    {};

    for (var property in pointerEvent) {
      var value = pointerEvent[property];
      this.down_[property] = typeof value === 'function' ? _functions_js__WEBPACK_IMPORTED_MODULE_6__/* .VOID */ .Zn : value;
    }

    if (this.dragListenerKeys_.length === 0) {
      var doc = this.map_.getOwnerDocument();
      this.dragListenerKeys_.push((0,_events_js__WEBPACK_IMPORTED_MODULE_0__/* .listen */ .oL)(doc, _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].POINTERMOVE */ .Z.POINTERMOVE, this.handlePointerMove_, this), (0,_events_js__WEBPACK_IMPORTED_MODULE_0__/* .listen */ .oL)(doc, _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].POINTERUP */ .Z.POINTERUP, this.handlePointerUp_, this),
      /* Note that the listener for `pointercancel is set up on
       * `pointerEventHandler_` and not `documentPointerEventHandler_` like
       * the `pointerup` and `pointermove` listeners.
       *
       * The reason for this is the following: `TouchSource.vacuumTouches_()`
       * issues `pointercancel` events, when there was no `touchend` for a
       * `touchstart`. Now, let's say a first `touchstart` is registered on
       * `pointerEventHandler_`. The `documentPointerEventHandler_` is set up.
       * But `documentPointerEventHandler_` doesn't know about the first
       * `touchstart`. If there is no `touchend` for the `touchstart`, we can
       * only receive a `touchcancel` from `pointerEventHandler_`, because it is
       * only registered there.
       */
      (0,_events_js__WEBPACK_IMPORTED_MODULE_0__/* .listen */ .oL)(this.element_, _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].POINTERCANCEL */ .Z.POINTERCANCEL, this.handlePointerUp_, this));

      if (this.element_.getRootNode && this.element_.getRootNode() !== doc) {
        this.dragListenerKeys_.push((0,_events_js__WEBPACK_IMPORTED_MODULE_0__/* .listen */ .oL)(this.element_.getRootNode(), _MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].POINTERUP */ .Z.POINTERUP, this.handlePointerUp_, this));
      }
    }
  };
  /**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */


  MapBrowserEventHandler.prototype.handlePointerMove_ = function (pointerEvent) {
    // Between pointerdown and pointerup, pointermove events are triggered.
    // To avoid a 'false' touchmove event to be dispatched, we test if the pointer
    // moved a significant distance.
    if (this.isMoving_(pointerEvent)) {
      this.dragging_ = true;
      var newEvent = new _MapBrowserEvent_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z(_MapBrowserEventType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].POINTERDRAG */ .Z.POINTERDRAG, this.map_, pointerEvent, this.dragging_);
      this.dispatchEvent(newEvent);
    }
  };
  /**
   * Wrap and relay a pointer event.  Note that this requires that the type
   * string for the MapBrowserEvent matches the PointerEvent type.
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */


  MapBrowserEventHandler.prototype.relayEvent_ = function (pointerEvent) {
    this.originalPointerMoveEvent_ = pointerEvent;
    var dragging = !!(this.down_ && this.isMoving_(pointerEvent));
    this.dispatchEvent(new _MapBrowserEvent_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z(pointerEvent.type, this.map_, pointerEvent, dragging));
  };
  /**
   * Flexible handling of a `touch-action: none` css equivalent: because calling
   * `preventDefault()` on a `pointermove` event does not stop native page scrolling
   * and zooming, we also listen for `touchmove` and call `preventDefault()` on it
   * when an interaction (currently `DragPan` handles the event.
   * @param {TouchEvent} event Event.
   * @private
   */


  MapBrowserEventHandler.prototype.handleTouchMove_ = function (event) {
    // Due to https://github.com/mpizenberg/elm-pep/issues/2, `this.originalPointerMoveEvent_`
    // may not be initialized yet when we get here on a platform without native pointer events.
    var originalEvent = this.originalPointerMoveEvent_;

    if ((!originalEvent || originalEvent.defaultPrevented) && (typeof event.cancelable !== 'boolean' || event.cancelable === true)) {
      event.preventDefault();
    }
  };
  /**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @return {boolean} Is moving.
   * @private
   */


  MapBrowserEventHandler.prototype.isMoving_ = function (pointerEvent) {
    return this.dragging_ || Math.abs(pointerEvent.clientX - this.down_.clientX) > this.moveTolerance_ || Math.abs(pointerEvent.clientY - this.down_.clientY) > this.moveTolerance_;
  };
  /**
   * Clean up.
   */


  MapBrowserEventHandler.prototype.disposeInternal = function () {
    if (this.relayedListenerKey_) {
      (0,_events_js__WEBPACK_IMPORTED_MODULE_0__/* .unlistenByKey */ .bN)(this.relayedListenerKey_);
      this.relayedListenerKey_ = null;
    }

    this.element_.removeEventListener(_events_EventType_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].TOUCHMOVE */ .Z.TOUCHMOVE, this.boundHandleTouchMove_);

    if (this.pointerdownListenerKey_) {
      (0,_events_js__WEBPACK_IMPORTED_MODULE_0__/* .unlistenByKey */ .bN)(this.pointerdownListenerKey_);
      this.pointerdownListenerKey_ = null;
    }

    this.dragListenerKeys_.forEach(_events_js__WEBPACK_IMPORTED_MODULE_0__/* .unlistenByKey */ .bN);
    this.dragListenerKeys_.length = 0;
    this.element_ = null;

    _super.prototype.disposeInternal.call(this);
  };

  return MapBrowserEventHandler;
}(_events_Target_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MapBrowserEventHandler);

/***/ }),

/***/ 3998:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _events_EventType_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2140);
/**
 * @module ol/MapBrowserEventType
 */

/**
 * Constants for event names.
 * @enum {string}
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /**
   * A true single click with no dragging and no double click. Note that this
   * event is delayed by 250 ms to ensure that it is not a double click.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#singleclick
   * @api
   */
  SINGLECLICK: 'singleclick',

  /**
   * A click with no dragging. A double click will fire two of this.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#click
   * @api
   */
  CLICK: _events_EventType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].CLICK */ .Z.CLICK,

  /**
   * A true double click, with no dragging.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#dblclick
   * @api
   */
  DBLCLICK: _events_EventType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].DBLCLICK */ .Z.DBLCLICK,

  /**
   * Triggered when a pointer is dragged.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#pointerdrag
   * @api
   */
  POINTERDRAG: 'pointerdrag',

  /**
   * Triggered when a pointer is moved. Note that on touch devices this is
   * triggered when the map is panned, so is not the same as mousemove.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#pointermove
   * @api
   */
  POINTERMOVE: 'pointermove',
  POINTERDOWN: 'pointerdown',
  POINTERUP: 'pointerup',
  POINTEROVER: 'pointerover',
  POINTEROUT: 'pointerout',
  POINTERENTER: 'pointerenter',
  POINTERLEAVE: 'pointerleave',
  POINTERCANCEL: 'pointercancel'
});
/***
 * @typedef {'singleclick'|'click'|'dblclick'|'pointerdrag'|'pointermove'} Types
 */

/***/ }),

/***/ 9105:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _events_Event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
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
 * @module ol/MapEvent
 */



/**
 * @classdesc
 * Events emitted as map events are instances of this type.
 * See {@link module:ol/PluggableMap~PluggableMap} for which events trigger a map event.
 */

var MapEvent =
/** @class */
function (_super) {
  __extends(MapEvent, _super);
  /**
   * @param {string} type Event type.
   * @param {import("./PluggableMap.js").default} map Map.
   * @param {?import("./PluggableMap.js").FrameState} [opt_frameState] Frame state.
   */


  function MapEvent(type, map, opt_frameState) {
    var _this = _super.call(this, type) || this;
    /**
     * The map where the event occurred.
     * @type {import("./PluggableMap.js").default}
     * @api
     */


    _this.map = map;
    /**
     * The frame state at the time of the event.
     * @type {?import("./PluggableMap.js").FrameState}
     * @api
     */

    _this.frameState = opt_frameState !== undefined ? opt_frameState : null;
    return _this;
  }

  return MapEvent;
}(_events_Event_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MapEvent);

/***/ }),

/***/ 7742:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/MapEventType
 */

/**
 * @enum {string}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /**
   * Triggered after a map frame is rendered.
   * @event module:ol/MapEvent~MapEvent#postrender
   * @api
   */
  POSTRENDER: 'postrender',

  /**
   * Triggered when the map starts moving.
   * @event module:ol/MapEvent~MapEvent#movestart
   * @api
   */
  MOVESTART: 'movestart',

  /**
   * Triggered after the map is moved.
   * @event module:ol/MapEvent~MapEvent#moveend
   * @api
   */
  MOVEEND: 'moveend'
});
/***
 * @typedef {'postrender'|'movestart'|'moveend'} Types
 */

/***/ }),

/***/ 8703:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/MapProperty
 */

/**
 * @enum {string}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  LAYERGROUP: 'layergroup',
  SIZE: 'size',
  TARGET: 'target',
  VIEW: 'view'
});

/***/ })

}]);