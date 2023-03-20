"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[169],{

/***/ 2797:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IH": () => (/* binding */ add),
/* harmony export */   "U2": () => (/* binding */ get)
/* harmony export */ });
/* unused harmony export clear */
/**
 * @module ol/proj/projections
 */

/**
 * @type {Object<string, import("./Projection.js").default>}
 */
var cache = {};
/**
 * Clear the projections cache.
 */

function clear() {
  cache = {};
}
/**
 * Get a cached projection by code.
 * @param {string} code The code for the projection.
 * @return {import("./Projection.js").default} The projection (if cached).
 */

function get(code) {
  return cache[code] || cache[code.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, 'EPSG:$3')] || null;
}
/**
 * Add a projection to the cache.
 * @param {string} code The projection code.
 * @param {import("./Projection.js").default} projection The projection to cache.
 */

function add(code, projection) {
  cache[code] = projection;
}

/***/ }),

/***/ 1636:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IH": () => (/* binding */ add),
/* harmony export */   "U2": () => (/* binding */ get)
/* harmony export */ });
/* unused harmony exports clear, remove */
/**
 * @module ol/proj/transforms
 */

/**
 * @private
 * @type {!Object<string, Object<string, import("../proj.js").TransformFunction>>}
 */

var transforms = {};
/**
 * Clear the transform cache.
 */

function clear() {
  transforms = {};
}
/**
 * Registers a conversion function to convert coordinates from the source
 * projection to the destination projection.
 *
 * @param {import("./Projection.js").default} source Source.
 * @param {import("./Projection.js").default} destination Destination.
 * @param {import("../proj.js").TransformFunction} transformFn Transform.
 */

function add(source, destination, transformFn) {
  var sourceCode = source.getCode();
  var destinationCode = destination.getCode();

  if (!(sourceCode in transforms)) {
    transforms[sourceCode] = {};
  }

  transforms[sourceCode][destinationCode] = transformFn;
}
/**
 * Unregisters the conversion function to convert coordinates from the source
 * projection to the destination projection.  This method is used to clean up
 * cached transforms during testing.
 *
 * @param {import("./Projection.js").default} source Source projection.
 * @param {import("./Projection.js").default} destination Destination projection.
 * @return {import("../proj.js").TransformFunction} transformFn The unregistered transform.
 */

function remove(source, destination) {
  var sourceCode = source.getCode();
  var destinationCode = destination.getCode();
  var transform = transforms[sourceCode][destinationCode];
  delete transforms[sourceCode][destinationCode];

  if (isEmpty(transforms[sourceCode])) {
    delete transforms[sourceCode];
  }

  return transform;
}
/**
 * Get a transform given a source code and a destination code.
 * @param {string} sourceCode The code for the source projection.
 * @param {string} destinationCode The code for the destination projection.
 * @return {import("../proj.js").TransformFunction|undefined} The transform function (if found).
 */

function get(sourceCode, destinationCode) {
  var transform;

  if (sourceCode in transforms && destinationCode in transforms[sourceCode]) {
    transform = transforms[sourceCode][destinationCode];
  }

  return transform;
}

/***/ }),

/***/ 8706:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Disposable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7170);
/* harmony import */ var _geom_Polygon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2607);
/**
 * @module ol/render/Box
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




var RenderBox =
/** @class */
function (_super) {
  __extends(RenderBox, _super);
  /**
   * @param {string} className CSS class name.
   */


  function RenderBox(className) {
    var _this = _super.call(this) || this;
    /**
     * @type {import("../geom/Polygon.js").default}
     * @private
     */


    _this.geometry_ = null;
    /**
     * @type {HTMLDivElement}
     * @private
     */

    _this.element_ = document.createElement('div');
    _this.element_.style.position = 'absolute';
    _this.element_.style.pointerEvents = 'auto';
    _this.element_.className = 'ol-box ' + className;
    /**
     * @private
     * @type {import("../PluggableMap.js").default}
     */

    _this.map_ = null;
    /**
     * @private
     * @type {import("../pixel.js").Pixel}
     */

    _this.startPixel_ = null;
    /**
     * @private
     * @type {import("../pixel.js").Pixel}
     */

    _this.endPixel_ = null;
    return _this;
  }
  /**
   * Clean up.
   */


  RenderBox.prototype.disposeInternal = function () {
    this.setMap(null);
  };
  /**
   * @private
   */


  RenderBox.prototype.render_ = function () {
    var startPixel = this.startPixel_;
    var endPixel = this.endPixel_;
    var px = 'px';
    var style = this.element_.style;
    style.left = Math.min(startPixel[0], endPixel[0]) + px;
    style.top = Math.min(startPixel[1], endPixel[1]) + px;
    style.width = Math.abs(endPixel[0] - startPixel[0]) + px;
    style.height = Math.abs(endPixel[1] - startPixel[1]) + px;
  };
  /**
   * @param {import("../PluggableMap.js").default} map Map.
   */


  RenderBox.prototype.setMap = function (map) {
    if (this.map_) {
      this.map_.getOverlayContainer().removeChild(this.element_);
      var style = this.element_.style;
      style.left = 'inherit';
      style.top = 'inherit';
      style.width = 'inherit';
      style.height = 'inherit';
    }

    this.map_ = map;

    if (this.map_) {
      this.map_.getOverlayContainer().appendChild(this.element_);
    }
  };
  /**
   * @param {import("../pixel.js").Pixel} startPixel Start pixel.
   * @param {import("../pixel.js").Pixel} endPixel End pixel.
   */


  RenderBox.prototype.setPixels = function (startPixel, endPixel) {
    this.startPixel_ = startPixel;
    this.endPixel_ = endPixel;
    this.createOrUpdateGeometry();
    this.render_();
  };
  /**
   * Creates or updates the cached geometry.
   */


  RenderBox.prototype.createOrUpdateGeometry = function () {
    var startPixel = this.startPixel_;
    var endPixel = this.endPixel_;
    var pixels = [startPixel, [startPixel[0], endPixel[1]], endPixel, [endPixel[0], startPixel[1]]];
    var coordinates = pixels.map(this.map_.getCoordinateFromPixelInternal, this.map_); // close the polygon

    coordinates[4] = coordinates[0].slice();

    if (!this.geometry_) {
      this.geometry_ = new _geom_Polygon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP([coordinates]);
    } else {
      this.geometry_.setCoordinates([coordinates]);
    }
  };
  /**
   * @return {import("../geom/Polygon.js").default} Geometry.
   */


  RenderBox.prototype.getGeometry = function () {
    return this.geometry_;
  };

  return RenderBox;
}(_Disposable_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RenderBox);

/***/ }),

/***/ 8471:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _events_Event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/**
 * @module ol/render/Event
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



var RenderEvent =
/** @class */
function (_super) {
  __extends(RenderEvent, _super);
  /**
   * @param {import("./EventType.js").default} type Type.
   * @param {import("../transform.js").Transform} [opt_inversePixelTransform] Transform for
   *     CSS pixels to rendered pixels.
   * @param {import("../PluggableMap.js").FrameState} [opt_frameState] Frame state.
   * @param {?CanvasRenderingContext2D} [opt_context] Context.
   */


  function RenderEvent(type, opt_inversePixelTransform, opt_frameState, opt_context) {
    var _this = _super.call(this, type) || this;
    /**
     * Transform from CSS pixels (relative to the top-left corner of the map viewport)
     * to rendered pixels on this event's `context`. Only available when a Canvas renderer is used, null otherwise.
     * @type {import("../transform.js").Transform|undefined}
     * @api
     */


    _this.inversePixelTransform = opt_inversePixelTransform;
    /**
     * An object representing the current render frame state.
     * @type {import("../PluggableMap.js").FrameState|undefined}
     * @api
     */

    _this.frameState = opt_frameState;
    /**
     * Canvas context. Not available when the event is dispatched by the map. Only available
     * when a Canvas renderer is used, null otherwise.
     * @type {CanvasRenderingContext2D|null|undefined}
     * @api
     */

    _this.context = opt_context;
    return _this;
  }

  return RenderEvent;
}(_events_Event_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RenderEvent);

/***/ }),

/***/ 834:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/render/EventType
 */

/**
 * @enum {string}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /**
   * Triggered before a layer is rendered.
   * @event module:ol/render/Event~RenderEvent#prerender
   * @api
   */
  PRERENDER: 'prerender',

  /**
   * Triggered after a layer is rendered.
   * @event module:ol/render/Event~RenderEvent#postrender
   * @api
   */
  POSTRENDER: 'postrender',

  /**
   * Triggered before layers are rendered.
   * The event object will not have a `context` set.
   * @event module:ol/render/Event~RenderEvent#precompose
   * @api
   */
  PRECOMPOSE: 'precompose',

  /**
   * Triggered after all layers are rendered.
   * The event object will not have a `context` set.
   * @event module:ol/render/Event~RenderEvent#postcompose
   * @api
   */
  POSTCOMPOSE: 'postcompose',

  /**
   * Triggered when rendering is complete, i.e. all sources and tiles have
   * finished loading for the current viewport, and all tiles are faded in.
   * The event object will not have a `context` set.
   * @event module:ol/render/Event~RenderEvent#rendercomplete
   * @api
   */
  RENDERCOMPLETE: 'rendercomplete'
});
/**
 * @typedef {'postrender'|'precompose'|'postcompose'|'rendercomplete'} MapRenderEventTypes
 */

/**
 * @typedef {'postrender'|'prerender'} LayerRenderEventTypes
 */

/***/ }),

/***/ 1971:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5870);
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8975);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1046);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3620);
/* harmony import */ var _geom_flat_interiorpoint_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2130);
/* harmony import */ var _proj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8623);
/* harmony import */ var _geom_flat_interpolate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3137);
/* harmony import */ var _geom_flat_center_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1414);
/* harmony import */ var _geom_flat_transform_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6929);
/**
 * @module ol/render/Feature
 */









/**
 * @type {import("../transform.js").Transform}
 */

var tmpTransform = (0,_transform_js__WEBPACK_IMPORTED_MODULE_1__/* .create */ .Ue)();
/**
 * Lightweight, read-only, {@link module:ol/Feature~Feature} and {@link module:ol/geom/Geometry~Geometry} like
 * structure, optimized for vector tile rendering and styling. Geometry access
 * through the API is limited to getting the type and extent of the geometry.
 */

var RenderFeature =
/** @class */
function () {
  /**
   * @param {import("../geom/GeometryType.js").default} type Geometry type.
   * @param {Array<number>} flatCoordinates Flat coordinates. These always need
   *     to be right-handed for polygons.
   * @param {Array<number>|Array<Array<number>>} ends Ends or Endss.
   * @param {Object<string, *>} properties Properties.
   * @param {number|string|undefined} id Feature id.
   */
  function RenderFeature(type, flatCoordinates, ends, properties, id) {
    /**
     * @private
     * @type {import("../extent.js").Extent|undefined}
     */
    this.extent_;
    /**
     * @private
     * @type {number|string|undefined}
     */

    this.id_ = id;
    /**
     * @private
     * @type {import("../geom/GeometryType.js").default}
     */

    this.type_ = type;
    /**
     * @private
     * @type {Array<number>}
     */

    this.flatCoordinates_ = flatCoordinates;
    /**
     * @private
     * @type {Array<number>}
     */

    this.flatInteriorPoints_ = null;
    /**
     * @private
     * @type {Array<number>}
     */

    this.flatMidpoints_ = null;
    /**
     * @private
     * @type {Array<number>|Array<Array<number>>}
     */

    this.ends_ = ends;
    /**
     * @private
     * @type {Object<string, *>}
     */

    this.properties_ = properties;
  }
  /**
   * Get a feature property by its key.
   * @param {string} key Key
   * @return {*} Value for the requested key.
   * @api
   */


  RenderFeature.prototype.get = function (key) {
    return this.properties_[key];
  };
  /**
   * Get the extent of this feature's geometry.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */


  RenderFeature.prototype.getExtent = function () {
    if (!this.extent_) {
      this.extent_ = this.type_ === _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].POINT */ .Z.POINT ? (0,_extent_js__WEBPACK_IMPORTED_MODULE_3__/* .createOrUpdateFromCoordinate */ .HK)(this.flatCoordinates_) : (0,_extent_js__WEBPACK_IMPORTED_MODULE_3__/* .createOrUpdateFromFlatCoordinates */ .GN)(this.flatCoordinates_, 0, this.flatCoordinates_.length, 2);
    }

    return this.extent_;
  };
  /**
   * @return {Array<number>} Flat interior points.
   */


  RenderFeature.prototype.getFlatInteriorPoint = function () {
    if (!this.flatInteriorPoints_) {
      var flatCenter = (0,_extent_js__WEBPACK_IMPORTED_MODULE_3__/* .getCenter */ .qg)(this.getExtent());
      this.flatInteriorPoints_ = (0,_geom_flat_interiorpoint_js__WEBPACK_IMPORTED_MODULE_4__/* .getInteriorPointOfArray */ .X)(this.flatCoordinates_, 0,
      /** @type {Array<number>} */
      this.ends_, 2, flatCenter, 0);
    }

    return this.flatInteriorPoints_;
  };
  /**
   * @return {Array<number>} Flat interior points.
   */


  RenderFeature.prototype.getFlatInteriorPoints = function () {
    if (!this.flatInteriorPoints_) {
      var flatCenters = (0,_geom_flat_center_js__WEBPACK_IMPORTED_MODULE_5__/* .linearRingss */ .E)(this.flatCoordinates_, 0,
      /** @type {Array<Array<number>>} */
      this.ends_, 2);
      this.flatInteriorPoints_ = (0,_geom_flat_interiorpoint_js__WEBPACK_IMPORTED_MODULE_4__/* .getInteriorPointsOfMultiArray */ .U)(this.flatCoordinates_, 0,
      /** @type {Array<Array<number>>} */
      this.ends_, 2, flatCenters);
    }

    return this.flatInteriorPoints_;
  };
  /**
   * @return {Array<number>} Flat midpoint.
   */


  RenderFeature.prototype.getFlatMidpoint = function () {
    if (!this.flatMidpoints_) {
      this.flatMidpoints_ = (0,_geom_flat_interpolate_js__WEBPACK_IMPORTED_MODULE_6__/* .interpolatePoint */ .WW)(this.flatCoordinates_, 0, this.flatCoordinates_.length, 2, 0.5);
    }

    return this.flatMidpoints_;
  };
  /**
   * @return {Array<number>} Flat midpoints.
   */


  RenderFeature.prototype.getFlatMidpoints = function () {
    if (!this.flatMidpoints_) {
      this.flatMidpoints_ = [];
      var flatCoordinates = this.flatCoordinates_;
      var offset = 0;
      var ends =
      /** @type {Array<number>} */
      this.ends_;

      for (var i = 0, ii = ends.length; i < ii; ++i) {
        var end = ends[i];
        var midpoint = (0,_geom_flat_interpolate_js__WEBPACK_IMPORTED_MODULE_6__/* .interpolatePoint */ .WW)(flatCoordinates, offset, end, 2, 0.5);
        (0,_array_js__WEBPACK_IMPORTED_MODULE_7__/* .extend */ .l7)(this.flatMidpoints_, midpoint);
        offset = end;
      }
    }

    return this.flatMidpoints_;
  };
  /**
   * Get the feature identifier.  This is a stable identifier for the feature and
   * is set when reading data from a remote source.
   * @return {number|string|undefined} Id.
   * @api
   */


  RenderFeature.prototype.getId = function () {
    return this.id_;
  };
  /**
   * @return {Array<number>} Flat coordinates.
   */


  RenderFeature.prototype.getOrientedFlatCoordinates = function () {
    return this.flatCoordinates_;
  };
  /**
   * For API compatibility with {@link module:ol/Feature~Feature}, this method is useful when
   * determining the geometry type in style function (see {@link #getType}).
   * @return {RenderFeature} Feature.
   * @api
   */


  RenderFeature.prototype.getGeometry = function () {
    return this;
  };
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {RenderFeature} Simplified geometry.
   */


  RenderFeature.prototype.getSimplifiedGeometry = function (squaredTolerance) {
    return this;
  };
  /**
   * Get a transformed and simplified version of the geometry.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../proj.js").TransformFunction} [opt_transform] Optional transform function.
   * @return {RenderFeature} Simplified geometry.
   */


  RenderFeature.prototype.simplifyTransformed = function (squaredTolerance, opt_transform) {
    return this;
  };
  /**
   * Get the feature properties.
   * @return {Object<string, *>} Feature properties.
   * @api
   */


  RenderFeature.prototype.getProperties = function () {
    return this.properties_;
  };
  /**
   * @return {number} Stride.
   */


  RenderFeature.prototype.getStride = function () {
    return 2;
  };
  /**
   * @return {undefined}
   */


  RenderFeature.prototype.getStyleFunction = function () {
    return undefined;
  };
  /**
   * Get the type of this feature's geometry.
   * @return {import("../geom/GeometryType.js").default} Geometry type.
   * @api
   */


  RenderFeature.prototype.getType = function () {
    return this.type_;
  };
  /**
   * Transform geometry coordinates from tile pixel space to projected.
   *
   * @param {import("../proj.js").ProjectionLike} projection The data projection
   */


  RenderFeature.prototype.transform = function (projection) {
    projection = (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(projection);
    var pixelExtent = projection.getExtent();
    var projectedExtent = projection.getWorldExtent();

    if (pixelExtent && projectedExtent) {
      var scale = (0,_extent_js__WEBPACK_IMPORTED_MODULE_3__/* .getHeight */ .Cr)(projectedExtent) / (0,_extent_js__WEBPACK_IMPORTED_MODULE_3__/* .getHeight */ .Cr)(pixelExtent);
      (0,_transform_js__WEBPACK_IMPORTED_MODULE_1__/* .compose */ .qC)(tmpTransform, projectedExtent[0], projectedExtent[3], scale, -scale, 0, 0, 0);
      (0,_geom_flat_transform_js__WEBPACK_IMPORTED_MODULE_8__/* .transform2D */ .vT)(this.flatCoordinates_, 0, this.flatCoordinates_.length, 2, tmpTransform, this.flatCoordinates_);
    }
  };
  /**
   * @return {Array<number>|Array<Array<number>>} Ends or endss.
   */


  RenderFeature.prototype.getEnds = function () {
    return this.ends_;
  };

  return RenderFeature;
}();

RenderFeature.prototype.getEndss = RenderFeature.prototype.getEnds;
/**
 * @return {Array<number>} Flat coordinates.
 */

RenderFeature.prototype.getFlatCoordinates = RenderFeature.prototype.getOrientedFlatCoordinates;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RenderFeature);

/***/ }),

/***/ 8298:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/render/VectorContext
 */

/**
 * @classdesc
 * Context for drawing geometries.  A vector context is available on render
 * events and does not need to be constructed directly.
 * @api
 */
var VectorContext =
/** @class */
function () {
  function VectorContext() {}
  /**
   * Render a geometry with a custom renderer.
   *
   * @param {import("../geom/SimpleGeometry.js").default} geometry Geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {Function} renderer Renderer.
   * @param {Function} hitDetectionRenderer Renderer.
   */


  VectorContext.prototype.drawCustom = function (geometry, feature, renderer, hitDetectionRenderer) {};
  /**
   * Render a geometry.
   *
   * @param {import("../geom/Geometry.js").default} geometry The geometry to render.
   */


  VectorContext.prototype.drawGeometry = function (geometry) {};
  /**
   * Set the rendering style.
   *
   * @param {import("../style/Style.js").default} style The rendering style.
   */


  VectorContext.prototype.setStyle = function (style) {};
  /**
   * @param {import("../geom/Circle.js").default} circleGeometry Circle geometry.
   * @param {import("../Feature.js").default} feature Feature.
   */


  VectorContext.prototype.drawCircle = function (circleGeometry, feature) {};
  /**
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("../style/Style.js").default} style Style.
   */


  VectorContext.prototype.drawFeature = function (feature, style) {};
  /**
   * @param {import("../geom/GeometryCollection.js").default} geometryCollectionGeometry Geometry collection.
   * @param {import("../Feature.js").default} feature Feature.
   */


  VectorContext.prototype.drawGeometryCollection = function (geometryCollectionGeometry, feature) {};
  /**
   * @param {import("../geom/LineString.js").default|import("./Feature.js").default} lineStringGeometry Line string geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */


  VectorContext.prototype.drawLineString = function (lineStringGeometry, feature) {};
  /**
   * @param {import("../geom/MultiLineString.js").default|import("./Feature.js").default} multiLineStringGeometry MultiLineString geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */


  VectorContext.prototype.drawMultiLineString = function (multiLineStringGeometry, feature) {};
  /**
   * @param {import("../geom/MultiPoint.js").default|import("./Feature.js").default} multiPointGeometry MultiPoint geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */


  VectorContext.prototype.drawMultiPoint = function (multiPointGeometry, feature) {};
  /**
   * @param {import("../geom/MultiPolygon.js").default} multiPolygonGeometry MultiPolygon geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */


  VectorContext.prototype.drawMultiPolygon = function (multiPolygonGeometry, feature) {};
  /**
   * @param {import("../geom/Point.js").default|import("./Feature.js").default} pointGeometry Point geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */


  VectorContext.prototype.drawPoint = function (pointGeometry, feature) {};
  /**
   * @param {import("../geom/Polygon.js").default|import("./Feature.js").default} polygonGeometry Polygon geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */


  VectorContext.prototype.drawPolygon = function (polygonGeometry, feature) {};
  /**
   * @param {import("../geom/SimpleGeometry.js").default|import("./Feature.js").default} geometry Geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */


  VectorContext.prototype.drawText = function (geometry, feature) {};
  /**
   * @param {import("../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../style/Stroke.js").default} strokeStyle Stroke style.
   */


  VectorContext.prototype.setFillStrokeStyle = function (fillStyle, strokeStyle) {};
  /**
   * @param {import("../style/Image.js").default} imageStyle Image style.
   * @param {import("../render/canvas.js").DeclutterImageWithText} [opt_declutterImageWithText] Shared data for combined decluttering with a text style.
   */


  VectorContext.prototype.setImageStyle = function (imageStyle, opt_declutterImageWithText) {};
  /**
   * @param {import("../style/Text.js").default} textStyle Text style.
   * @param {import("../render/canvas.js").DeclutterImageWithText} [opt_declutterImageWithText] Shared data for combined decluttering with an image style.
   */


  VectorContext.prototype.setTextStyle = function (textStyle, opt_declutterImageWithText) {};

  return VectorContext;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VectorContext);

/***/ })

}]);