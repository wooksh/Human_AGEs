"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[920],{

/***/ 7887:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6791);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9631);
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
 * @module ol/VectorRenderTile
 */





/**
 * @typedef {Object} ReplayState
 * @property {boolean} dirty Dirty.
 * @property {null|import("./render.js").OrderFunction} renderedRenderOrder RenderedRenderOrder.
 * @property {number} renderedTileRevision RenderedTileRevision.
 * @property {number} renderedResolution RenderedResolution.
 * @property {number} renderedRevision RenderedRevision.
 * @property {number} renderedTileResolution RenderedTileResolution.
 * @property {number} renderedTileZ RenderedTileZ.
 */

/**
 * @type {Array<HTMLCanvasElement>}
 */

var canvasPool = [];

var VectorRenderTile =
/** @class */
function (_super) {
  __extends(VectorRenderTile, _super);
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {import("./tilecoord.js").TileCoord} urlTileCoord Wrapped tile coordinate for source urls.
   * @param {function(VectorRenderTile):Array<import("./VectorTile").default>} getSourceTiles Function
   * to get source tiles for this tile.
   */


  function VectorRenderTile(tileCoord, state, urlTileCoord, getSourceTiles) {
    var _this = _super.call(this, tileCoord, state, {
      transition: 0
    }) || this;
    /**
     * @private
     * @type {!Object<string, CanvasRenderingContext2D>}
     */


    _this.context_ = {};
    /**
     * Executor groups by layer uid. Entries are read/written by the renderer.
     * @type {Object<string, Array<import("./render/canvas/ExecutorGroup.js").default>>}
     */

    _this.executorGroups = {};
    /**
     * Executor groups for decluttering, by layer uid. Entries are read/written by the renderer.
     * @type {Object<string, Array<import("./render/canvas/ExecutorGroup.js").default>>}
     */

    _this.declutterExecutorGroups = {};
    /**
     * Number of loading source tiles. Read/written by the source.
     * @type {number}
     */

    _this.loadingSourceTiles = 0;
    /**
     * @type {Object<number, ImageData>}
     */

    _this.hitDetectionImageData = {};
    /**
     * @private
     * @type {!Object<string, ReplayState>}
     */

    _this.replayState_ = {};
    /**
     * @type {Array<import("./VectorTile.js").default>}
     */

    _this.sourceTiles = [];
    /**
     * @type {Object<string, boolean>}
     */

    _this.errorTileKeys = {};
    /**
     * @type {number}
     */

    _this.wantedResolution;
    /**
     * @type {!function():Array<import("./VectorTile.js").default>}
     */

    _this.getSourceTiles = getSourceTiles.bind(undefined, _this);
    /**
     * @type {import("./tilecoord.js").TileCoord}
     */

    _this.wrappedTileCoord = urlTileCoord;
    return _this;
  }
  /**
   * @param {import("./layer/Layer.js").default} layer Layer.
   * @return {CanvasRenderingContext2D} The rendering context.
   */


  VectorRenderTile.prototype.getContext = function (layer) {
    var key = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .getUid */ .sq)(layer);

    if (!(key in this.context_)) {
      this.context_[key] = (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__/* .createCanvasContext2D */ .E4)(1, 1, canvasPool);
    }

    return this.context_[key];
  };
  /**
   * @param {import("./layer/Layer.js").default} layer Layer.
   * @return {boolean} Tile has a rendering context for the given layer.
   */


  VectorRenderTile.prototype.hasContext = function (layer) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .getUid */ .sq)(layer) in this.context_;
  };
  /**
   * Get the Canvas for this tile.
   * @param {import("./layer/Layer.js").default} layer Layer.
   * @return {HTMLCanvasElement} Canvas.
   */


  VectorRenderTile.prototype.getImage = function (layer) {
    return this.hasContext(layer) ? this.getContext(layer).canvas : null;
  };
  /**
   * @param {import("./layer/Layer.js").default} layer Layer.
   * @return {ReplayState} The replay state.
   */


  VectorRenderTile.prototype.getReplayState = function (layer) {
    var key = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .getUid */ .sq)(layer);

    if (!(key in this.replayState_)) {
      this.replayState_[key] = {
        dirty: false,
        renderedRenderOrder: null,
        renderedResolution: NaN,
        renderedRevision: -1,
        renderedTileResolution: NaN,
        renderedTileRevision: -1,
        renderedTileZ: -1
      };
    }

    return this.replayState_[key];
  };
  /**
   * Load the tile.
   */


  VectorRenderTile.prototype.load = function () {
    this.getSourceTiles();
  };
  /**
   * Remove from the cache due to expiry
   */


  VectorRenderTile.prototype.release = function () {
    for (var key in this.context_) {
      canvasPool.push(this.context_[key].canvas);
      delete this.context_[key];
    }

    _super.prototype.release.call(this);
  };

  return VectorRenderTile;
}(_Tile_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VectorRenderTile);

/***/ }),

/***/ 2696:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tile_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6791);
/* harmony import */ var _TileState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(587);
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
 * @module ol/VectorTile
 */





var VectorTile =
/** @class */
function (_super) {
  __extends(VectorTile, _super);
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {string} src Data source url.
   * @param {import("./format/Feature.js").default} format Feature format.
   * @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @param {import("./Tile.js").Options} [opt_options] Tile options.
   */


  function VectorTile(tileCoord, state, src, format, tileLoadFunction, opt_options) {
    var _this = _super.call(this, tileCoord, state, opt_options) || this;
    /**
     * Extent of this tile; set by the source.
     * @type {import("./extent.js").Extent}
     */


    _this.extent = null;
    /**
     * @private
     * @type {import("./format/Feature.js").default}
     */

    _this.format_ = format;
    /**
     * @private
     * @type {Array<import("./Feature.js").default>}
     */

    _this.features_ = null;
    /**
     * @private
     * @type {import("./featureloader.js").FeatureLoader}
     */

    _this.loader_;
    /**
     * Feature projection of this tile; set by the source.
     * @type {import("./proj/Projection.js").default}
     */

    _this.projection = null;
    /**
     * Resolution of this tile; set by the source.
     * @type {number}
     */

    _this.resolution;
    /**
     * @private
     * @type {import("./Tile.js").LoadFunction}
     */

    _this.tileLoadFunction_ = tileLoadFunction;
    /**
     * @private
     * @type {string}
     */

    _this.url_ = src;
    _this.key = src;
    return _this;
  }
  /**
   * Get the feature format assigned for reading this tile's features.
   * @return {import("./format/Feature.js").default} Feature format.
   * @api
   */


  VectorTile.prototype.getFormat = function () {
    return this.format_;
  };
  /**
   * Get the features for this tile. Geometries will be in the view projection.
   * @return {Array<import("./Feature.js").FeatureLike>} Features.
   * @api
   */


  VectorTile.prototype.getFeatures = function () {
    return this.features_;
  };
  /**
   * Load not yet loaded URI.
   */


  VectorTile.prototype.load = function () {
    if (this.state == _TileState_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].IDLE */ .Z.IDLE) {
      this.setState(_TileState_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].LOADING */ .Z.LOADING);
      this.tileLoadFunction_(this, this.url_);

      if (this.loader_) {
        this.loader_(this.extent, this.resolution, this.projection);
      }
    }
  };
  /**
   * Handler for successful tile load.
   * @param {Array<import("./Feature.js").default>} features The loaded features.
   * @param {import("./proj/Projection.js").default} dataProjection Data projection.
   */


  VectorTile.prototype.onLoad = function (features, dataProjection) {
    this.setFeatures(features);
  };
  /**
   * Handler for tile load errors.
   */


  VectorTile.prototype.onError = function () {
    this.setState(_TileState_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].ERROR */ .Z.ERROR);
  };
  /**
   * Function for use in an {@link module:ol/source/VectorTile~VectorTile}'s `tileLoadFunction`.
   * Sets the features for the tile.
   * @param {Array<import("./Feature.js").default>} features Features.
   * @api
   */


  VectorTile.prototype.setFeatures = function (features) {
    this.features_ = features;
    this.setState(_TileState_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].LOADED */ .Z.LOADED);
  };
  /**
   * Set the feature loader for reading this tile's features.
   * @param {import("./featureloader.js").FeatureLoader} loader Feature loader.
   * @api
   */


  VectorTile.prototype.setLoader = function (loader) {
    this.loader_ = loader;
  };

  return VectorTile;
}(_Tile_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VectorTile);

/***/ }),

/***/ 6790:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ZP": () => (/* binding */ ol_View)
});

// UNUSED EXPORTS: createCenterConstraint, createResolutionConstraint, createRotationConstraint, isNoopAnimation

// EXTERNAL MODULE: ./node_modules/ol/Object.js
var ol_Object = __webpack_require__(7182);
// EXTERNAL MODULE: ./node_modules/ol/geom/GeometryType.js
var GeometryType = __webpack_require__(5870);
// EXTERNAL MODULE: ./node_modules/ol/proj/Units.js
var Units = __webpack_require__(3977);
// EXTERNAL MODULE: ./node_modules/ol/ViewHint.js
var ViewHint = __webpack_require__(1840);
;// CONCATENATED MODULE: ./node_modules/ol/ViewProperty.js
/**
 * @module ol/ViewProperty
 */

/**
 * @enum {string}
 */
/* harmony default export */ const ViewProperty = ({
  CENTER: 'center',
  RESOLUTION: 'resolution',
  ROTATION: 'rotation'
});
// EXTERNAL MODULE: ./node_modules/ol/tilegrid/common.js
var common = __webpack_require__(3148);
// EXTERNAL MODULE: ./node_modules/ol/proj.js + 2 modules
var proj = __webpack_require__(8623);
// EXTERNAL MODULE: ./node_modules/ol/functions.js
var functions = __webpack_require__(3658);
// EXTERNAL MODULE: ./node_modules/ol/coordinate.js
var coordinate = __webpack_require__(4413);
// EXTERNAL MODULE: ./node_modules/ol/asserts.js
var asserts = __webpack_require__(4548);
// EXTERNAL MODULE: ./node_modules/ol/obj.js
var obj = __webpack_require__(9800);
// EXTERNAL MODULE: ./node_modules/ol/math.js
var math = __webpack_require__(4495);
;// CONCATENATED MODULE: ./node_modules/ol/centerconstraint.js
/**
 * @module ol/centerconstraint
 */

/**
 * @typedef {function((import("./coordinate.js").Coordinate|undefined), number, import("./size.js").Size, boolean=, Array<number>=): (import("./coordinate.js").Coordinate|undefined)} Type
 */

/**
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {boolean} onlyCenter If true, the constraint will only apply to the view center.
 * @param {boolean} smooth If true, the view will be able to go slightly out of the given extent
 * (only during interaction and animation).
 * @return {Type} The constraint.
 */

function createExtent(extent, onlyCenter, smooth) {
  return (
    /**
     * @param {import("./coordinate.js").Coordinate|undefined} center Center.
     * @param {number} resolution Resolution.
     * @param {import("./size.js").Size} size Viewport size; unused if `onlyCenter` was specified.
     * @param {boolean} [opt_isMoving] True if an interaction or animation is in progress.
     * @param {Array<number>} [opt_centerShift] Shift between map center and viewport center.
     * @return {import("./coordinate.js").Coordinate|undefined} Center.
     */
    function (center, resolution, size, opt_isMoving, opt_centerShift) {
      if (center) {
        var viewWidth = onlyCenter ? 0 : size[0] * resolution;
        var viewHeight = onlyCenter ? 0 : size[1] * resolution;
        var shiftX = opt_centerShift ? opt_centerShift[0] : 0;
        var shiftY = opt_centerShift ? opt_centerShift[1] : 0;
        var minX = extent[0] + viewWidth / 2 + shiftX;
        var maxX = extent[2] - viewWidth / 2 + shiftX;
        var minY = extent[1] + viewHeight / 2 + shiftY;
        var maxY = extent[3] - viewHeight / 2 + shiftY; // note: when zooming out of bounds, min and max values for x and y may
        // end up inverted (min > max); this has to be accounted for

        if (minX > maxX) {
          minX = (maxX + minX) / 2;
          maxX = minX;
        }

        if (minY > maxY) {
          minY = (maxY + minY) / 2;
          maxY = minY;
        }

        var x = (0,math/* clamp */.uZ)(center[0], minX, maxX);
        var y = (0,math/* clamp */.uZ)(center[1], minY, maxY);
        var ratio = 30 * resolution; // during an interaction, allow some overscroll

        if (opt_isMoving && smooth) {
          x += -ratio * Math.log(1 + Math.max(0, minX - center[0]) / ratio) + ratio * Math.log(1 + Math.max(0, center[0] - maxX) / ratio);
          y += -ratio * Math.log(1 + Math.max(0, minY - center[1]) / ratio) + ratio * Math.log(1 + Math.max(0, center[1] - maxY) / ratio);
        }

        return [x, y];
      } else {
        return undefined;
      }
    }
  );
}
/**
 * @param {import("./coordinate.js").Coordinate} [center] Center.
 * @return {import("./coordinate.js").Coordinate|undefined} Center.
 */

function none(center) {
  return center;
}
// EXTERNAL MODULE: ./node_modules/ol/resolutionconstraint.js
var resolutionconstraint = __webpack_require__(2395);
// EXTERNAL MODULE: ./node_modules/ol/rotationconstraint.js
var rotationconstraint = __webpack_require__(2270);
// EXTERNAL MODULE: ./node_modules/ol/easing.js
var easing = __webpack_require__(9635);
// EXTERNAL MODULE: ./node_modules/ol/extent.js
var ol_extent = __webpack_require__(1046);
// EXTERNAL MODULE: ./node_modules/ol/array.js
var array = __webpack_require__(3620);
// EXTERNAL MODULE: ./node_modules/ol/geom/Polygon.js
var Polygon = __webpack_require__(2607);
;// CONCATENATED MODULE: ./node_modules/ol/View.js
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
 * @module ol/View
 */
























/**
 * An animation configuration
 *
 * @typedef {Object} Animation
 * @property {import("./coordinate.js").Coordinate} [sourceCenter] Source center.
 * @property {import("./coordinate.js").Coordinate} [targetCenter] Target center.
 * @property {number} [sourceResolution] Source resolution.
 * @property {number} [targetResolution] Target resolution.
 * @property {number} [sourceRotation] Source rotation.
 * @property {number} [targetRotation] Target rotation.
 * @property {import("./coordinate.js").Coordinate} [anchor] Anchor.
 * @property {number} start Start.
 * @property {number} duration Duration.
 * @property {boolean} complete Complete.
 * @property {function(number):number} easing Easing.
 * @property {function(boolean):void} callback Callback.
 */

/**
 * @typedef {Object} Constraints
 * @property {import("./centerconstraint.js").Type} center Center.
 * @property {import("./resolutionconstraint.js").Type} resolution Resolution.
 * @property {import("./rotationconstraint.js").Type} rotation Rotation.
 */

/**
 * @typedef {Object} FitOptions
 * @property {import("./size.js").Size} [size] The size in pixels of the box to fit
 * the extent into. Default is the current size of the first map in the DOM that
 * uses this view, or `[100, 100]` if no such map is found.
 * @property {!Array<number>} [padding=[0, 0, 0, 0]] Padding (in pixels) to be
 * cleared inside the view. Values in the array are top, right, bottom and left
 * padding.
 * @property {boolean} [nearest=false] If the view `constrainResolution` option is `true`,
 * get the nearest extent instead of the closest that actually fits the view.
 * @property {number} [minResolution=0] Minimum resolution that we zoom to.
 * @property {number} [maxZoom] Maximum zoom level that we zoom to. If
 * `minResolution` is given, this property is ignored.
 * @property {number} [duration] The duration of the animation in milliseconds.
 * By default, there is no animation to the target extent.
 * @property {function(number):number} [easing] The easing function used during
 * the animation (defaults to {@link module:ol/easing.inAndOut}).
 * The function will be called for each frame with a number representing a
 * fraction of the animation's duration.  The function should return a number
 * between 0 and 1 representing the progress toward the destination state.
 * @property {function(boolean):void} [callback] Function called when the view is in
 * its final position. The callback will be called with `true` if the animation
 * series completed on its own or `false` if it was cancelled.
 */

/**
 * @typedef {Object} ViewOptions
 * @property {import("./coordinate.js").Coordinate} [center] The initial center for
 * the view. If a user projection is not set, the coordinate system for the center is
 * specified with the `projection` option. Layer sources will not be fetched if this
 * is not set, but the center can be set later with {@link #setCenter}.
 * @property {boolean|number} [constrainRotation=true] Rotation constraint.
 * `false` means no constraint. `true` means no constraint, but snap to zero
 * near zero. A number constrains the rotation to that number of values. For
 * example, `4` will constrain the rotation to 0, 90, 180, and 270 degrees.
 * @property {boolean} [enableRotation=true] Enable rotation.
 * If `false`, a rotation constraint that always sets the rotation to zero is
 * used. The `constrainRotation` option has no effect if `enableRotation` is
 * `false`.
 * @property {import("./extent.js").Extent} [extent] The extent that constrains the
 * view, in other words, nothing outside of this extent can be visible on the map.
 * @property {boolean} [constrainOnlyCenter=false] If true, the extent
 * constraint will only apply to the view center and not the whole extent.
 * @property {boolean} [smoothExtentConstraint=true] If true, the extent
 * constraint will be applied smoothly, i.e. allow the view to go slightly outside
 * of the given `extent`.
 * @property {number} [maxResolution] The maximum resolution used to determine
 * the resolution constraint. It is used together with `minResolution` (or
 * `maxZoom`) and `zoomFactor`. If unspecified it is calculated in such a way
 * that the projection's validity extent fits in a 256x256 px tile. If the
 * projection is Spherical Mercator (the default) then `maxResolution` defaults
 * to `40075016.68557849 / 256 = 156543.03392804097`.
 * @property {number} [minResolution] The minimum resolution used to determine
 * the resolution constraint.  It is used together with `maxResolution` (or
 * `minZoom`) and `zoomFactor`.  If unspecified it is calculated assuming 29
 * zoom levels (with a factor of 2). If the projection is Spherical Mercator
 * (the default) then `minResolution` defaults to
 * `40075016.68557849 / 256 / Math.pow(2, 28) = 0.0005831682455839253`.
 * @property {number} [maxZoom=28] The maximum zoom level used to determine the
 * resolution constraint. It is used together with `minZoom` (or
 * `maxResolution`) and `zoomFactor`.  Note that if `minResolution` is also
 * provided, it is given precedence over `maxZoom`.
 * @property {number} [minZoom=0] The minimum zoom level used to determine the
 * resolution constraint. It is used together with `maxZoom` (or
 * `minResolution`) and `zoomFactor`.  Note that if `maxResolution` is also
 * provided, it is given precedence over `minZoom`.
 * @property {boolean} [multiWorld=false] If `false` the view is constrained so
 * only one world is visible, and you cannot pan off the edge.  If `true` the map
 * may show multiple worlds at low zoom levels.  Only used if the `projection` is
 * global.  Note that if `extent` is also provided it is given precedence.
 * @property {boolean} [constrainResolution=false] If true, the view will always
 * animate to the closest zoom level after an interaction; false means
 * intermediary zoom levels are allowed.
 * @property {boolean} [smoothResolutionConstraint=true] If true, the resolution
 * min/max values will be applied smoothly, i. e. allow the view to exceed slightly
 * the given resolution or zoom bounds.
 * @property {boolean} [showFullExtent=false] Allow the view to be zoomed out to
 * show the full configured extent. By default, when a view is configured with an
 * extent, users will not be able to zoom out so the viewport exceeds the extent in
 * either dimension. This means the full extent may not be visible if the viewport
 * is taller or wider than the aspect ratio of the configured extent. If
 * showFullExtent is true, the user will be able to zoom out so that the viewport
 * exceeds the height or width of the configured extent, but not both, allowing the
 * full extent to be shown.
 * @property {import("./proj.js").ProjectionLike} [projection='EPSG:3857'] The
 * projection. The default is Spherical Mercator.
 * @property {number} [resolution] The initial resolution for the view. The
 * units are `projection` units per pixel (e.g. meters per pixel). An
 * alternative to setting this is to set `zoom`. Layer sources will not be
 * fetched if neither this nor `zoom` are defined, but they can be set later
 * with {@link #setZoom} or {@link #setResolution}.
 * @property {Array<number>} [resolutions] Resolutions that determine the
 * zoom levels if specified. The index in the array corresponds to the zoom level,
 * therefore the resolution values have to be in descending order. It also constrains
 * the resolution by the minimum and maximum value. If set the `maxResolution`,
 * `minResolution`, `minZoom`, `maxZoom`, and `zoomFactor` options are ignored.
 * @property {number} [rotation=0] The initial rotation for the view in radians
 * (positive rotation clockwise, 0 means North).
 * @property {number} [zoom] Only used if `resolution` is not defined. Zoom
 * level used to calculate the initial resolution for the view.
 * @property {number} [zoomFactor=2] The zoom factor used to compute the
 * corresponding resolution.
 * @property {!Array<number>} [padding=[0, 0, 0, 0]] Padding (in css pixels).
 * If the map viewport is partially covered with other content (overlays) along
 * its edges, this setting allows to shift the center of the viewport away from
 * that content. The order of the values is top, right, bottom, left.
 */

/**
 * @typedef {Object} AnimationOptions
 * @property {import("./coordinate.js").Coordinate} [center] The center of the view at the end of
 * the animation.
 * @property {number} [zoom] The zoom level of the view at the end of the
 * animation. This takes precedence over `resolution`.
 * @property {number} [resolution] The resolution of the view at the end
 * of the animation.  If `zoom` is also provided, this option will be ignored.
 * @property {number} [rotation] The rotation of the view at the end of
 * the animation.
 * @property {import("./coordinate.js").Coordinate} [anchor] Optional anchor to remain fixed
 * during a rotation or resolution animation.
 * @property {number} [duration=1000] The duration of the animation in milliseconds.
 * @property {function(number):number} [easing] The easing function used
 * during the animation (defaults to {@link module:ol/easing.inAndOut}).
 * The function will be called for each frame with a number representing a
 * fraction of the animation's duration.  The function should return a number
 * between 0 and 1 representing the progress toward the destination state.
 */

/**
 * @typedef {Object} State
 * @property {import("./coordinate.js").Coordinate} center Center.
 * @property {import("./proj/Projection.js").default} projection Projection.
 * @property {number} resolution Resolution.
 * @property {import("./coordinate.js").Coordinate} [nextCenter] The next center during an animation series.
 * @property {number} [nextResolution] The next resolution during an animation series.
 * @property {number} [nextRotation] The next rotation during an animation series.
 * @property {number} rotation Rotation.
 * @property {number} zoom Zoom.
 */

/**
 * Default min zoom level for the map view.
 * @type {number}
 */

var DEFAULT_MIN_ZOOM = 0;
/**
 * @typedef {import("./ObjectEventType").Types|'change:center'|'change:resolution'|'change:rotation'} ViewObjectEventTypes
 */

/***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *   import("./Observable").OnSignature<ViewObjectEventTypes, import("./Object").ObjectEvent, Return> &
 *   import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|ViewObjectEventTypes, Return>} ViewOnSignature
 */

/**
 * @classdesc
 * A View object represents a simple 2D view of the map.
 *
 * This is the object to act upon to change the center, resolution,
 * and rotation of the map.
 *
 * A View has a `projection`. The projection determines the
 * coordinate system of the center, and its units determine the units of the
 * resolution (projection units per pixel). The default projection is
 * Spherical Mercator (EPSG:3857).
 *
 * ### The view states
 *
 * A View is determined by three states: `center`, `resolution`,
 * and `rotation`. Each state has a corresponding getter and setter, e.g.
 * `getCenter` and `setCenter` for the `center` state.
 *
 * The `zoom` state is actually not saved on the view: all computations
 * internally use the `resolution` state. Still, the `setZoom` and `getZoom`
 * methods are available, as well as `getResolutionForZoom` and
 * `getZoomForResolution` to switch from one system to the other.
 *
 * ### The constraints
 *
 * `setCenter`, `setResolution` and `setRotation` can be used to change the
 * states of the view, but any constraint defined in the constructor will
 * be applied along the way.
 *
 * A View object can have a *resolution constraint*, a *rotation constraint*
 * and a *center constraint*.
 *
 * The *resolution constraint* typically restricts min/max values and
 * snaps to specific resolutions. It is determined by the following
 * options: `resolutions`, `maxResolution`, `maxZoom` and `zoomFactor`.
 * If `resolutions` is set, the other three options are ignored. See
 * documentation for each option for more information. By default, the view
 * only has a min/max restriction and allow intermediary zoom levels when
 * pinch-zooming for example.
 *
 * The *rotation constraint* snaps to specific angles. It is determined
 * by the following options: `enableRotation` and `constrainRotation`.
 * By default rotation is allowed and its value is snapped to zero when approaching the
 * horizontal.
 *
 * The *center constraint* is determined by the `extent` option. By
 * default the view center is not constrained at all.
 *
 * ### Changing the view state
 *
 * It is important to note that `setZoom`, `setResolution`, `setCenter` and
 * `setRotation` are subject to the above mentioned constraints. As such, it
 * may sometimes not be possible to know in advance the resulting state of the
 * View. For example, calling `setResolution(10)` does not guarantee that
 * `getResolution()` will return `10`.
 *
 * A consequence of this is that, when applying a delta on the view state, one
 * should use `adjustCenter`, `adjustRotation`, `adjustZoom` and `adjustResolution`
 * rather than the corresponding setters. This will let view do its internal
 * computations. Besides, the `adjust*` methods also take an `opt_anchor`
 * argument which allows specifying an origin for the transformation.
 *
 * ### Interacting with the view
 *
 * View constraints are usually only applied when the view is *at rest*, meaning that
 * no interaction or animation is ongoing. As such, if the user puts the view in a
 * state that is not equivalent to a constrained one (e.g. rotating the view when
 * the snap angle is 0), an animation will be triggered at the interaction end to
 * put back the view to a stable state;
 *
 * @api
 */

var View =
/** @class */
function (_super) {
  __extends(View, _super);
  /**
   * @param {ViewOptions} [opt_options] View options.
   */


  function View(opt_options) {
    var _this = _super.call(this) || this;
    /***
     * @type {ViewOnSignature<import("./events").EventsKey>}
     */


    _this.on;
    /***
     * @type {ViewOnSignature<import("./events").EventsKey>}
     */

    _this.once;
    /***
     * @type {ViewOnSignature<void>}
     */

    _this.un;
    var options = (0,obj/* assign */.f0)({}, opt_options);
    /**
     * @private
     * @type {Array<number>}
     */

    _this.hints_ = [0, 0];
    /**
     * @private
     * @type {Array<Array<Animation>>}
     */

    _this.animations_ = [];
    /**
     * @private
     * @type {number|undefined}
     */

    _this.updateAnimationKey_;
    /**
     * @private
     * @const
     * @type {import("./proj/Projection.js").default}
     */

    _this.projection_ = (0,proj/* createProjection */.UQ)(options.projection, 'EPSG:3857');
    /**
     * @private
     * @type {import("./size.js").Size}
     */

    _this.viewportSize_ = [100, 100];
    /**
     * @private
     * @type {import("./coordinate.js").Coordinate|undefined}
     */

    _this.targetCenter_ = null;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.targetResolution_;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.targetRotation_;
    /**
     * @private
     * @type {import("./coordinate.js").Coordinate}
     */

    _this.nextCenter_ = null;
    /**
     * @private
     * @type {number}
     */

    _this.nextResolution_;
    /**
     * @private
     * @type {number}
     */

    _this.nextRotation_;
    /**
     * @private
     * @type {import("./coordinate.js").Coordinate|undefined}
     */

    _this.cancelAnchor_ = undefined;

    if (options.center) {
      options.center = (0,proj/* fromUserCoordinate */.Vs)(options.center, _this.projection_);
    }

    if (options.extent) {
      options.extent = (0,proj/* fromUserExtent */.dY)(options.extent, _this.projection_);
    }

    _this.applyOptions_(options);

    return _this;
  }
  /**
   * Set up the view with the given options.
   * @param {ViewOptions} options View options.
   */


  View.prototype.applyOptions_ = function (options) {
    /**
     * @type {Object<string, *>}
     */
    var properties = {};
    var resolutionConstraintInfo = createResolutionConstraint(options);
    /**
     * @private
     * @type {number}
     */

    this.maxResolution_ = resolutionConstraintInfo.maxResolution;
    /**
     * @private
     * @type {number}
     */

    this.minResolution_ = resolutionConstraintInfo.minResolution;
    /**
     * @private
     * @type {number}
     */

    this.zoomFactor_ = resolutionConstraintInfo.zoomFactor;
    /**
     * @private
     * @type {Array<number>|undefined}
     */

    this.resolutions_ = options.resolutions;
    /**
     * @type {Array<number>|undefined}
     * @private
     */

    this.padding_ = options.padding;
    /**
     * @private
     * @type {number}
     */

    this.minZoom_ = resolutionConstraintInfo.minZoom;
    var centerConstraint = createCenterConstraint(options);
    var resolutionConstraint = resolutionConstraintInfo.constraint;
    var rotationConstraint = createRotationConstraint(options);
    /**
     * @private
     * @type {Constraints}
     */

    this.constraints_ = {
      center: centerConstraint,
      resolution: resolutionConstraint,
      rotation: rotationConstraint
    };
    this.setRotation(options.rotation !== undefined ? options.rotation : 0);
    this.setCenterInternal(options.center !== undefined ? options.center : null);

    if (options.resolution !== undefined) {
      this.setResolution(options.resolution);
    } else if (options.zoom !== undefined) {
      this.setZoom(options.zoom);
    }

    this.setProperties(properties);
    /**
     * @private
     * @type {ViewOptions}
     */

    this.options_ = options;
  };

  Object.defineProperty(View.prototype, "padding", {
    /**
     * Padding (in css pixels).
     * If the map viewport is partially covered with other content (overlays) along
     * its edges, this setting allows to shift the center of the viewport away from that
     * content. The order of the values in the array is top, right, bottom, left.
     * The default is no padding, which is equivalent to `[0, 0, 0, 0]`.
     * @type {Array<number>|undefined}
     * @api
     */
    get: function () {
      return this.padding_;
    },
    set: function (padding) {
      var oldPadding = this.padding_;
      this.padding_ = padding;
      var center = this.getCenter();

      if (center) {
        var newPadding = padding || [0, 0, 0, 0];
        oldPadding = oldPadding || [0, 0, 0, 0];
        var resolution = this.getResolution();
        var offsetX = resolution / 2 * (newPadding[3] - oldPadding[3] + oldPadding[1] - newPadding[1]);
        var offsetY = resolution / 2 * (newPadding[0] - oldPadding[0] + oldPadding[2] - newPadding[2]);
        this.setCenterInternal([center[0] + offsetX, center[1] - offsetY]);
      }
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Get an updated version of the view options used to construct the view.  The
   * current resolution (or zoom), center, and rotation are applied to any stored
   * options.  The provided options can be used to apply new min/max zoom or
   * resolution limits.
   * @param {ViewOptions} newOptions New options to be applied.
   * @return {ViewOptions} New options updated with the current view state.
   */

  View.prototype.getUpdatedOptions_ = function (newOptions) {
    var options = (0,obj/* assign */.f0)({}, this.options_); // preserve resolution (or zoom)

    if (options.resolution !== undefined) {
      options.resolution = this.getResolution();
    } else {
      options.zoom = this.getZoom();
    } // preserve center


    options.center = this.getCenterInternal(); // preserve rotation

    options.rotation = this.getRotation();
    return (0,obj/* assign */.f0)({}, options, newOptions);
  };
  /**
   * Animate the view.  The view's center, zoom (or resolution), and rotation
   * can be animated for smooth transitions between view states.  For example,
   * to animate the view to a new zoom level:
   *
   *     view.animate({zoom: view.getZoom() + 1});
   *
   * By default, the animation lasts one second and uses in-and-out easing.  You
   * can customize this behavior by including `duration` (in milliseconds) and
   * `easing` options (see {@link module:ol/easing}).
   *
   * To chain together multiple animations, call the method with multiple
   * animation objects.  For example, to first zoom and then pan:
   *
   *     view.animate({zoom: 10}, {center: [0, 0]});
   *
   * If you provide a function as the last argument to the animate method, it
   * will get called at the end of an animation series.  The callback will be
   * called with `true` if the animation series completed on its own or `false`
   * if it was cancelled.
   *
   * Animations are cancelled by user interactions (e.g. dragging the map) or by
   * calling `view.setCenter()`, `view.setResolution()`, or `view.setRotation()`
   * (or another method that calls one of these).
   *
   * @param {...(AnimationOptions|function(boolean): void)} var_args Animation
   *     options.  Multiple animations can be run in series by passing multiple
   *     options objects.  To run multiple animations in parallel, call the method
   *     multiple times.  An optional callback can be provided as a final
   *     argument.  The callback will be called with a boolean indicating whether
   *     the animation completed without being cancelled.
   * @api
   */


  View.prototype.animate = function (var_args) {
    if (this.isDef() && !this.getAnimating()) {
      this.resolveConstraints(0);
    }

    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; ++i) {
      var options = arguments[i];

      if (options.center) {
        options = (0,obj/* assign */.f0)({}, options);
        options.center = (0,proj/* fromUserCoordinate */.Vs)(options.center, this.getProjection());
      }

      if (options.anchor) {
        options = (0,obj/* assign */.f0)({}, options);
        options.anchor = (0,proj/* fromUserCoordinate */.Vs)(options.anchor, this.getProjection());
      }

      args[i] = options;
    }

    this.animateInternal.apply(this, args);
  };
  /**
   * @param {...(AnimationOptions|function(boolean): void)} var_args Animation options.
   */


  View.prototype.animateInternal = function (var_args) {
    var animationCount = arguments.length;
    var callback;

    if (animationCount > 1 && typeof arguments[animationCount - 1] === 'function') {
      callback = arguments[animationCount - 1];
      --animationCount;
    }

    var i = 0;

    for (; i < animationCount && !this.isDef(); ++i) {
      // if view properties are not yet set, shortcut to the final state
      var state = arguments[i];

      if (state.center) {
        this.setCenterInternal(state.center);
      }

      if (state.zoom !== undefined) {
        this.setZoom(state.zoom);
      } else if (state.resolution) {
        this.setResolution(state.resolution);
      }

      if (state.rotation !== undefined) {
        this.setRotation(state.rotation);
      }
    }

    if (i === animationCount) {
      if (callback) {
        animationCallback(callback, true);
      }

      return;
    }

    var start = Date.now();
    var center = this.targetCenter_.slice();
    var resolution = this.targetResolution_;
    var rotation = this.targetRotation_;
    var series = [];

    for (; i < animationCount; ++i) {
      var options =
      /** @type {AnimationOptions} */
      arguments[i];
      var animation = {
        start: start,
        complete: false,
        anchor: options.anchor,
        duration: options.duration !== undefined ? options.duration : 1000,
        easing: options.easing || easing/* inAndOut */.rd,
        callback: callback
      };

      if (options.center) {
        animation.sourceCenter = center;
        animation.targetCenter = options.center.slice();
        center = animation.targetCenter;
      }

      if (options.zoom !== undefined) {
        animation.sourceResolution = resolution;
        animation.targetResolution = this.getResolutionForZoom(options.zoom);
        resolution = animation.targetResolution;
      } else if (options.resolution) {
        animation.sourceResolution = resolution;
        animation.targetResolution = options.resolution;
        resolution = animation.targetResolution;
      }

      if (options.rotation !== undefined) {
        animation.sourceRotation = rotation;
        var delta = (0,math/* modulo */.$W)(options.rotation - rotation + Math.PI, 2 * Math.PI) - Math.PI;
        animation.targetRotation = rotation + delta;
        rotation = animation.targetRotation;
      } // check if animation is a no-op


      if (isNoopAnimation(animation)) {
        animation.complete = true; // we still push it onto the series for callback handling
      } else {
        start += animation.duration;
      }

      series.push(animation);
    }

    this.animations_.push(series);
    this.setHint(ViewHint/* default.ANIMATING */.Z.ANIMATING, 1);
    this.updateAnimations_();
  };
  /**
   * Determine if the view is being animated.
   * @return {boolean} The view is being animated.
   * @api
   */


  View.prototype.getAnimating = function () {
    return this.hints_[ViewHint/* default.ANIMATING */.Z.ANIMATING] > 0;
  };
  /**
   * Determine if the user is interacting with the view, such as panning or zooming.
   * @return {boolean} The view is being interacted with.
   * @api
   */


  View.prototype.getInteracting = function () {
    return this.hints_[ViewHint/* default.INTERACTING */.Z.INTERACTING] > 0;
  };
  /**
   * Cancel any ongoing animations.
   * @api
   */


  View.prototype.cancelAnimations = function () {
    this.setHint(ViewHint/* default.ANIMATING */.Z.ANIMATING, -this.hints_[ViewHint/* default.ANIMATING */.Z.ANIMATING]);
    var anchor;

    for (var i = 0, ii = this.animations_.length; i < ii; ++i) {
      var series = this.animations_[i];

      if (series[0].callback) {
        animationCallback(series[0].callback, false);
      }

      if (!anchor) {
        for (var j = 0, jj = series.length; j < jj; ++j) {
          var animation = series[j];

          if (!animation.complete) {
            anchor = animation.anchor;
            break;
          }
        }
      }
    }

    this.animations_.length = 0;
    this.cancelAnchor_ = anchor;
    this.nextCenter_ = null;
    this.nextResolution_ = NaN;
    this.nextRotation_ = NaN;
  };
  /**
   * Update all animations.
   */


  View.prototype.updateAnimations_ = function () {
    if (this.updateAnimationKey_ !== undefined) {
      cancelAnimationFrame(this.updateAnimationKey_);
      this.updateAnimationKey_ = undefined;
    }

    if (!this.getAnimating()) {
      return;
    }

    var now = Date.now();
    var more = false;

    for (var i = this.animations_.length - 1; i >= 0; --i) {
      var series = this.animations_[i];
      var seriesComplete = true;

      for (var j = 0, jj = series.length; j < jj; ++j) {
        var animation = series[j];

        if (animation.complete) {
          continue;
        }

        var elapsed = now - animation.start;
        var fraction = animation.duration > 0 ? elapsed / animation.duration : 1;

        if (fraction >= 1) {
          animation.complete = true;
          fraction = 1;
        } else {
          seriesComplete = false;
        }

        var progress = animation.easing(fraction);

        if (animation.sourceCenter) {
          var x0 = animation.sourceCenter[0];
          var y0 = animation.sourceCenter[1];
          var x1 = animation.targetCenter[0];
          var y1 = animation.targetCenter[1];
          this.nextCenter_ = animation.targetCenter;
          var x = x0 + progress * (x1 - x0);
          var y = y0 + progress * (y1 - y0);
          this.targetCenter_ = [x, y];
        }

        if (animation.sourceResolution && animation.targetResolution) {
          var resolution = progress === 1 ? animation.targetResolution : animation.sourceResolution + progress * (animation.targetResolution - animation.sourceResolution);

          if (animation.anchor) {
            var size = this.getViewportSize_(this.getRotation());
            var constrainedResolution = this.constraints_.resolution(resolution, 0, size, true);
            this.targetCenter_ = this.calculateCenterZoom(constrainedResolution, animation.anchor);
          }

          this.nextResolution_ = animation.targetResolution;
          this.targetResolution_ = resolution;
          this.applyTargetState_(true);
        }

        if (animation.sourceRotation !== undefined && animation.targetRotation !== undefined) {
          var rotation = progress === 1 ? (0,math/* modulo */.$W)(animation.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : animation.sourceRotation + progress * (animation.targetRotation - animation.sourceRotation);

          if (animation.anchor) {
            var constrainedRotation = this.constraints_.rotation(rotation, true);
            this.targetCenter_ = this.calculateCenterRotate(constrainedRotation, animation.anchor);
          }

          this.nextRotation_ = animation.targetRotation;
          this.targetRotation_ = rotation;
        }

        this.applyTargetState_(true);
        more = true;

        if (!animation.complete) {
          break;
        }
      }

      if (seriesComplete) {
        this.animations_[i] = null;
        this.setHint(ViewHint/* default.ANIMATING */.Z.ANIMATING, -1);
        this.nextCenter_ = null;
        this.nextResolution_ = NaN;
        this.nextRotation_ = NaN;
        var callback = series[0].callback;

        if (callback) {
          animationCallback(callback, true);
        }
      }
    } // prune completed series


    this.animations_ = this.animations_.filter(Boolean);

    if (more && this.updateAnimationKey_ === undefined) {
      this.updateAnimationKey_ = requestAnimationFrame(this.updateAnimations_.bind(this));
    }
  };
  /**
   * @param {number} rotation Target rotation.
   * @param {import("./coordinate.js").Coordinate} anchor Rotation anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for rotation and anchor.
   */


  View.prototype.calculateCenterRotate = function (rotation, anchor) {
    var center;
    var currentCenter = this.getCenterInternal();

    if (currentCenter !== undefined) {
      center = [currentCenter[0] - anchor[0], currentCenter[1] - anchor[1]];
      (0,coordinate/* rotate */.U1)(center, rotation - this.getRotation());
      (0,coordinate/* add */.IH)(center, anchor);
    }

    return center;
  };
  /**
   * @param {number} resolution Target resolution.
   * @param {import("./coordinate.js").Coordinate} anchor Zoom anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for resolution and anchor.
   */


  View.prototype.calculateCenterZoom = function (resolution, anchor) {
    var center;
    var currentCenter = this.getCenterInternal();
    var currentResolution = this.getResolution();

    if (currentCenter !== undefined && currentResolution !== undefined) {
      var x = anchor[0] - resolution * (anchor[0] - currentCenter[0]) / currentResolution;
      var y = anchor[1] - resolution * (anchor[1] - currentCenter[1]) / currentResolution;
      center = [x, y];
    }

    return center;
  };
  /**
   * Returns the current viewport size.
   * @private
   * @param {number} [opt_rotation] Take into account the rotation of the viewport when giving the size
   * @return {import("./size.js").Size} Viewport size or `[100, 100]` when no viewport is found.
   */


  View.prototype.getViewportSize_ = function (opt_rotation) {
    var size = this.viewportSize_;

    if (opt_rotation) {
      var w = size[0];
      var h = size[1];
      return [Math.abs(w * Math.cos(opt_rotation)) + Math.abs(h * Math.sin(opt_rotation)), Math.abs(w * Math.sin(opt_rotation)) + Math.abs(h * Math.cos(opt_rotation))];
    } else {
      return size;
    }
  };
  /**
   * Stores the viewport size on the view. The viewport size is not read every time from the DOM
   * to avoid performance hit and layout reflow.
   * This should be done on map size change.
   * Note: the constraints are not resolved during an animation to avoid stopping it
   * @param {import("./size.js").Size} [opt_size] Viewport size; if undefined, [100, 100] is assumed
   */


  View.prototype.setViewportSize = function (opt_size) {
    this.viewportSize_ = Array.isArray(opt_size) ? opt_size.slice() : [100, 100];

    if (!this.getAnimating()) {
      this.resolveConstraints(0);
    }
  };
  /**
   * Get the view center.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   * @observable
   * @api
   */


  View.prototype.getCenter = function () {
    var center = this.getCenterInternal();

    if (!center) {
      return center;
    }

    return (0,proj/* toUserCoordinate */.lO)(center, this.getProjection());
  };
  /**
   * Get the view center without transforming to user projection.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   */


  View.prototype.getCenterInternal = function () {
    return (
      /** @type {import("./coordinate.js").Coordinate|undefined} */
      this.get(ViewProperty.CENTER)
    );
  };
  /**
   * @return {Constraints} Constraints.
   */


  View.prototype.getConstraints = function () {
    return this.constraints_;
  };
  /**
   * @return {boolean} Resolution constraint is set
   */


  View.prototype.getConstrainResolution = function () {
    return this.options_.constrainResolution;
  };
  /**
   * @param {Array<number>} [opt_hints] Destination array.
   * @return {Array<number>} Hint.
   */


  View.prototype.getHints = function (opt_hints) {
    if (opt_hints !== undefined) {
      opt_hints[0] = this.hints_[0];
      opt_hints[1] = this.hints_[1];
      return opt_hints;
    } else {
      return this.hints_.slice();
    }
  };
  /**
   * Calculate the extent for the current view state and the passed size.
   * The size is the pixel dimensions of the box into which the calculated extent
   * should fit. In most cases you want to get the extent of the entire map,
   * that is `map.getSize()`.
   * @param {import("./size.js").Size} [opt_size] Box pixel size. If not provided, the size
   * of the map that uses this view will be used.
   * @return {import("./extent.js").Extent} Extent.
   * @api
   */


  View.prototype.calculateExtent = function (opt_size) {
    var extent = this.calculateExtentInternal(opt_size);
    return (0,proj/* toUserExtent */.Fj)(extent, this.getProjection());
  };
  /**
   * @param {import("./size.js").Size} [opt_size] Box pixel size. If not provided,
   * the map's last known viewport size will be used.
   * @return {import("./extent.js").Extent} Extent.
   */


  View.prototype.calculateExtentInternal = function (opt_size) {
    var size = opt_size || this.getViewportSizeMinusPadding_();
    var center =
    /** @type {!import("./coordinate.js").Coordinate} */
    this.getCenterInternal();
    (0,asserts/* assert */.h)(center, 1); // The view center is not defined

    var resolution =
    /** @type {!number} */
    this.getResolution();
    (0,asserts/* assert */.h)(resolution !== undefined, 2); // The view resolution is not defined

    var rotation =
    /** @type {!number} */
    this.getRotation();
    (0,asserts/* assert */.h)(rotation !== undefined, 3); // The view rotation is not defined

    return (0,ol_extent/* getForViewAndSize */.p8)(center, resolution, rotation, size);
  };
  /**
   * Get the maximum resolution of the view.
   * @return {number} The maximum resolution of the view.
   * @api
   */


  View.prototype.getMaxResolution = function () {
    return this.maxResolution_;
  };
  /**
   * Get the minimum resolution of the view.
   * @return {number} The minimum resolution of the view.
   * @api
   */


  View.prototype.getMinResolution = function () {
    return this.minResolution_;
  };
  /**
   * Get the maximum zoom level for the view.
   * @return {number} The maximum zoom level.
   * @api
   */


  View.prototype.getMaxZoom = function () {
    return (
      /** @type {number} */
      this.getZoomForResolution(this.minResolution_)
    );
  };
  /**
   * Set a new maximum zoom level for the view.
   * @param {number} zoom The maximum zoom level.
   * @api
   */


  View.prototype.setMaxZoom = function (zoom) {
    this.applyOptions_(this.getUpdatedOptions_({
      maxZoom: zoom
    }));
  };
  /**
   * Get the minimum zoom level for the view.
   * @return {number} The minimum zoom level.
   * @api
   */


  View.prototype.getMinZoom = function () {
    return (
      /** @type {number} */
      this.getZoomForResolution(this.maxResolution_)
    );
  };
  /**
   * Set a new minimum zoom level for the view.
   * @param {number} zoom The minimum zoom level.
   * @api
   */


  View.prototype.setMinZoom = function (zoom) {
    this.applyOptions_(this.getUpdatedOptions_({
      minZoom: zoom
    }));
  };
  /**
   * Set whether the view should allow intermediary zoom levels.
   * @param {boolean} enabled Whether the resolution is constrained.
   * @api
   */


  View.prototype.setConstrainResolution = function (enabled) {
    this.applyOptions_(this.getUpdatedOptions_({
      constrainResolution: enabled
    }));
  };
  /**
   * Get the view projection.
   * @return {import("./proj/Projection.js").default} The projection of the view.
   * @api
   */


  View.prototype.getProjection = function () {
    return this.projection_;
  };
  /**
   * Get the view resolution.
   * @return {number|undefined} The resolution of the view.
   * @observable
   * @api
   */


  View.prototype.getResolution = function () {
    return (
      /** @type {number|undefined} */
      this.get(ViewProperty.RESOLUTION)
    );
  };
  /**
   * Get the resolutions for the view. This returns the array of resolutions
   * passed to the constructor of the View, or undefined if none were given.
   * @return {Array<number>|undefined} The resolutions of the view.
   * @api
   */


  View.prototype.getResolutions = function () {
    return this.resolutions_;
  };
  /**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size} [opt_size] Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   * @api
   */


  View.prototype.getResolutionForExtent = function (extent, opt_size) {
    return this.getResolutionForExtentInternal((0,proj/* fromUserExtent */.dY)(extent, this.getProjection()), opt_size);
  };
  /**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size} [opt_size] Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   */


  View.prototype.getResolutionForExtentInternal = function (extent, opt_size) {
    var size = opt_size || this.getViewportSizeMinusPadding_();
    var xResolution = (0,ol_extent/* getWidth */.dz)(extent) / size[0];
    var yResolution = (0,ol_extent/* getHeight */.Cr)(extent) / size[1];
    return Math.max(xResolution, yResolution);
  };
  /**
   * Return a function that returns a value between 0 and 1 for a
   * resolution. Exponential scaling is assumed.
   * @param {number} [opt_power] Power.
   * @return {function(number): number} Resolution for value function.
   */


  View.prototype.getResolutionForValueFunction = function (opt_power) {
    var power = opt_power || 2;
    var maxResolution = this.getConstrainedResolution(this.maxResolution_);
    var minResolution = this.minResolution_;
    var max = Math.log(maxResolution / minResolution) / Math.log(power);
    return (
      /**
       * @param {number} value Value.
       * @return {number} Resolution.
       */
      function (value) {
        var resolution = maxResolution / Math.pow(power, value * max);
        return resolution;
      }
    );
  };
  /**
   * Get the view rotation.
   * @return {number} The rotation of the view in radians.
   * @observable
   * @api
   */


  View.prototype.getRotation = function () {
    return (
      /** @type {number} */
      this.get(ViewProperty.ROTATION)
    );
  };
  /**
   * Return a function that returns a resolution for a value between
   * 0 and 1. Exponential scaling is assumed.
   * @param {number} [opt_power] Power.
   * @return {function(number): number} Value for resolution function.
   */


  View.prototype.getValueForResolutionFunction = function (opt_power) {
    var logPower = Math.log(opt_power || 2);
    var maxResolution = this.getConstrainedResolution(this.maxResolution_);
    var minResolution = this.minResolution_;
    var max = Math.log(maxResolution / minResolution) / logPower;
    return (
      /**
       * @param {number} resolution Resolution.
       * @return {number} Value.
       */
      function (resolution) {
        var value = Math.log(maxResolution / resolution) / logPower / max;
        return value;
      }
    );
  };
  /**
   * Returns the size of the viewport minus padding.
   * @private
   * @param {number} [opt_rotation] Take into account the rotation of the viewport when giving the size
   * @return {import("./size.js").Size} Viewport size reduced by the padding.
   */


  View.prototype.getViewportSizeMinusPadding_ = function (opt_rotation) {
    var size = this.getViewportSize_(opt_rotation);
    var padding = this.padding_;

    if (padding) {
      size = [size[0] - padding[1] - padding[3], size[1] - padding[0] - padding[2]];
    }

    return size;
  };
  /**
   * @return {State} View state.
   */


  View.prototype.getState = function () {
    var projection = this.getProjection();
    var resolution = this.getResolution();
    var rotation = this.getRotation();
    var center =
    /** @type {import("./coordinate.js").Coordinate} */
    this.getCenterInternal();
    var padding = this.padding_;

    if (padding) {
      var reducedSize = this.getViewportSizeMinusPadding_();
      center = calculateCenterOn(center, this.getViewportSize_(), [reducedSize[0] / 2 + padding[3], reducedSize[1] / 2 + padding[0]], resolution, rotation);
    }

    return {
      center: center.slice(0),
      projection: projection !== undefined ? projection : null,
      resolution: resolution,
      nextCenter: this.nextCenter_,
      nextResolution: this.nextResolution_,
      nextRotation: this.nextRotation_,
      rotation: rotation,
      zoom: this.getZoom()
    };
  };
  /**
   * Get the current zoom level. This method may return non-integer zoom levels
   * if the view does not constrain the resolution, or if an interaction or
   * animation is underway.
   * @return {number|undefined} Zoom.
   * @api
   */


  View.prototype.getZoom = function () {
    var zoom;
    var resolution = this.getResolution();

    if (resolution !== undefined) {
      zoom = this.getZoomForResolution(resolution);
    }

    return zoom;
  };
  /**
   * Get the zoom level for a resolution.
   * @param {number} resolution The resolution.
   * @return {number|undefined} The zoom level for the provided resolution.
   * @api
   */


  View.prototype.getZoomForResolution = function (resolution) {
    var offset = this.minZoom_ || 0;
    var max, zoomFactor;

    if (this.resolutions_) {
      var nearest = (0,array/* linearFindNearest */.h7)(this.resolutions_, resolution, 1);
      offset = nearest;
      max = this.resolutions_[nearest];

      if (nearest == this.resolutions_.length - 1) {
        zoomFactor = 2;
      } else {
        zoomFactor = max / this.resolutions_[nearest + 1];
      }
    } else {
      max = this.maxResolution_;
      zoomFactor = this.zoomFactor_;
    }

    return offset + Math.log(max / resolution) / Math.log(zoomFactor);
  };
  /**
   * Get the resolution for a zoom level.
   * @param {number} zoom Zoom level.
   * @return {number} The view resolution for the provided zoom level.
   * @api
   */


  View.prototype.getResolutionForZoom = function (zoom) {
    if (this.resolutions_) {
      if (this.resolutions_.length <= 1) {
        return 0;
      }

      var baseLevel = (0,math/* clamp */.uZ)(Math.floor(zoom), 0, this.resolutions_.length - 2);
      var zoomFactor = this.resolutions_[baseLevel] / this.resolutions_[baseLevel + 1];
      return this.resolutions_[baseLevel] / Math.pow(zoomFactor, (0,math/* clamp */.uZ)(zoom - baseLevel, 0, 1));
    } else {
      return this.maxResolution_ / Math.pow(this.zoomFactor_, zoom - this.minZoom_);
    }
  };
  /**
   * Fit the given geometry or extent based on the given map size and border.
   * The size is pixel dimensions of the box to fit the extent into.
   * In most cases you will want to use the map size, that is `map.getSize()`.
   * Takes care of the map angle.
   * @param {import("./geom/SimpleGeometry.js").default|import("./extent.js").Extent} geometryOrExtent The geometry or
   *     extent to fit the view to.
   * @param {FitOptions} [opt_options] Options.
   * @api
   */


  View.prototype.fit = function (geometryOrExtent, opt_options) {
    /** @type {import("./geom/SimpleGeometry.js").default} */
    var geometry;
    (0,asserts/* assert */.h)(Array.isArray(geometryOrExtent) || typeof
    /** @type {?} */
    geometryOrExtent.getSimplifiedGeometry === 'function', 24); // Invalid extent or geometry provided as `geometry`

    if (Array.isArray(geometryOrExtent)) {
      (0,asserts/* assert */.h)(!(0,ol_extent/* isEmpty */.xb)(geometryOrExtent), 25); // Cannot fit empty extent provided as `geometry`

      var extent = (0,proj/* fromUserExtent */.dY)(geometryOrExtent, this.getProjection());
      geometry = (0,Polygon/* fromExtent */.oJ)(extent);
    } else if (geometryOrExtent.getType() === GeometryType/* default.CIRCLE */.Z.CIRCLE) {
      var extent = (0,proj/* fromUserExtent */.dY)(geometryOrExtent.getExtent(), this.getProjection());
      geometry = (0,Polygon/* fromExtent */.oJ)(extent);
      geometry.rotate(this.getRotation(), (0,ol_extent/* getCenter */.qg)(extent));
    } else {
      var userProjection = (0,proj/* getUserProjection */.Cs)();

      if (userProjection) {
        geometry =
        /** @type {import("./geom/SimpleGeometry.js").default} */
        geometryOrExtent.clone().transform(userProjection, this.getProjection());
      } else {
        geometry = geometryOrExtent;
      }
    }

    this.fitInternal(geometry, opt_options);
  };
  /**
   * Calculate rotated extent
   * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
   * @return {import("./extent").Extent} The rotated extent for the geometry.
   */


  View.prototype.rotatedExtentForGeometry = function (geometry) {
    var rotation = this.getRotation();
    var cosAngle = Math.cos(rotation);
    var sinAngle = Math.sin(-rotation);
    var coords = geometry.getFlatCoordinates();
    var stride = geometry.getStride();
    var minRotX = +Infinity;
    var minRotY = +Infinity;
    var maxRotX = -Infinity;
    var maxRotY = -Infinity;

    for (var i = 0, ii = coords.length; i < ii; i += stride) {
      var rotX = coords[i] * cosAngle - coords[i + 1] * sinAngle;
      var rotY = coords[i] * sinAngle + coords[i + 1] * cosAngle;
      minRotX = Math.min(minRotX, rotX);
      minRotY = Math.min(minRotY, rotY);
      maxRotX = Math.max(maxRotX, rotX);
      maxRotY = Math.max(maxRotY, rotY);
    }

    return [minRotX, minRotY, maxRotX, maxRotY];
  };
  /**
   * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
   * @param {FitOptions} [opt_options] Options.
   */


  View.prototype.fitInternal = function (geometry, opt_options) {
    var options = opt_options || {};
    var size = options.size;

    if (!size) {
      size = this.getViewportSizeMinusPadding_();
    }

    var padding = options.padding !== undefined ? options.padding : [0, 0, 0, 0];
    var nearest = options.nearest !== undefined ? options.nearest : false;
    var minResolution;

    if (options.minResolution !== undefined) {
      minResolution = options.minResolution;
    } else if (options.maxZoom !== undefined) {
      minResolution = this.getResolutionForZoom(options.maxZoom);
    } else {
      minResolution = 0;
    }

    var rotatedExtent = this.rotatedExtentForGeometry(geometry); // calculate resolution

    var resolution = this.getResolutionForExtentInternal(rotatedExtent, [size[0] - padding[1] - padding[3], size[1] - padding[0] - padding[2]]);
    resolution = isNaN(resolution) ? minResolution : Math.max(resolution, minResolution);
    resolution = this.getConstrainedResolution(resolution, nearest ? 0 : 1); // calculate center

    var rotation = this.getRotation();
    var sinAngle = Math.sin(rotation);
    var cosAngle = Math.cos(rotation);
    var centerRot = (0,ol_extent/* getCenter */.qg)(rotatedExtent);
    centerRot[0] += (padding[1] - padding[3]) / 2 * resolution;
    centerRot[1] += (padding[0] - padding[2]) / 2 * resolution;
    var centerX = centerRot[0] * cosAngle - centerRot[1] * sinAngle;
    var centerY = centerRot[1] * cosAngle + centerRot[0] * sinAngle;
    var center = this.getConstrainedCenter([centerX, centerY], resolution);
    var callback = options.callback ? options.callback : functions/* VOID */.Zn;

    if (options.duration !== undefined) {
      this.animateInternal({
        resolution: resolution,
        center: center,
        duration: options.duration,
        easing: options.easing
      }, callback);
    } else {
      this.targetResolution_ = resolution;
      this.targetCenter_ = center;
      this.applyTargetState_(false, true);
      animationCallback(callback, true);
    }
  };
  /**
   * Center on coordinate and view position.
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   * @api
   */


  View.prototype.centerOn = function (coordinate, size, position) {
    this.centerOnInternal((0,proj/* fromUserCoordinate */.Vs)(coordinate, this.getProjection()), size, position);
  };
  /**
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   */


  View.prototype.centerOnInternal = function (coordinate, size, position) {
    this.setCenterInternal(calculateCenterOn(coordinate, size, position, this.getResolution(), this.getRotation()));
  };
  /**
   * Calculates the shift between map and viewport center.
   * @param {import("./coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {import("./size.js").Size} size Size.
   * @return {Array<number>|undefined} Center shift.
   */


  View.prototype.calculateCenterShift = function (center, resolution, rotation, size) {
    var centerShift;
    var padding = this.padding_;

    if (padding && center) {
      var reducedSize = this.getViewportSizeMinusPadding_(-rotation);
      var shiftedCenter = calculateCenterOn(center, size, [reducedSize[0] / 2 + padding[3], reducedSize[1] / 2 + padding[0]], resolution, rotation);
      centerShift = [center[0] - shiftedCenter[0], center[1] - shiftedCenter[1]];
    }

    return centerShift;
  };
  /**
   * @return {boolean} Is defined.
   */


  View.prototype.isDef = function () {
    return !!this.getCenterInternal() && this.getResolution() !== undefined;
  };
  /**
   * Adds relative coordinates to the center of the view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
   * @api
   */


  View.prototype.adjustCenter = function (deltaCoordinates) {
    var center = (0,proj/* toUserCoordinate */.lO)(this.targetCenter_, this.getProjection());
    this.setCenter([center[0] + deltaCoordinates[0], center[1] + deltaCoordinates[1]]);
  };
  /**
   * Adds relative coordinates to the center of the view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
   */


  View.prototype.adjustCenterInternal = function (deltaCoordinates) {
    var center = this.targetCenter_;
    this.setCenterInternal([center[0] + deltaCoordinates[0], center[1] + deltaCoordinates[1]]);
  };
  /**
   * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} ratio The ratio to apply on the view resolution.
   * @param {import("./coordinate.js").Coordinate} [opt_anchor] The origin of the transformation.
   * @api
   */


  View.prototype.adjustResolution = function (ratio, opt_anchor) {
    var anchor = opt_anchor && (0,proj/* fromUserCoordinate */.Vs)(opt_anchor, this.getProjection());
    this.adjustResolutionInternal(ratio, anchor);
  };
  /**
   * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} ratio The ratio to apply on the view resolution.
   * @param {import("./coordinate.js").Coordinate} [opt_anchor] The origin of the transformation.
   */


  View.prototype.adjustResolutionInternal = function (ratio, opt_anchor) {
    var isMoving = this.getAnimating() || this.getInteracting();
    var size = this.getViewportSize_(this.getRotation());
    var newResolution = this.constraints_.resolution(this.targetResolution_ * ratio, 0, size, isMoving);

    if (opt_anchor) {
      this.targetCenter_ = this.calculateCenterZoom(newResolution, opt_anchor);
    }

    this.targetResolution_ *= ratio;
    this.applyTargetState_();
  };
  /**
   * Adds a value to the view zoom level, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} delta Relative value to add to the zoom level.
   * @param {import("./coordinate.js").Coordinate} [opt_anchor] The origin of the transformation.
   * @api
   */


  View.prototype.adjustZoom = function (delta, opt_anchor) {
    this.adjustResolution(Math.pow(this.zoomFactor_, -delta), opt_anchor);
  };
  /**
   * Adds a value to the view rotation, optionally using an anchor. Any rotation
   * constraint will apply.
   * @param {number} delta Relative value to add to the zoom rotation, in radians.
   * @param {import("./coordinate.js").Coordinate} [opt_anchor] The rotation center.
   * @api
   */


  View.prototype.adjustRotation = function (delta, opt_anchor) {
    if (opt_anchor) {
      opt_anchor = (0,proj/* fromUserCoordinate */.Vs)(opt_anchor, this.getProjection());
    }

    this.adjustRotationInternal(delta, opt_anchor);
  };
  /**
   * @param {number} delta Relative value to add to the zoom rotation, in radians.
   * @param {import("./coordinate.js").Coordinate} [opt_anchor] The rotation center.
   */


  View.prototype.adjustRotationInternal = function (delta, opt_anchor) {
    var isMoving = this.getAnimating() || this.getInteracting();
    var newRotation = this.constraints_.rotation(this.targetRotation_ + delta, isMoving);

    if (opt_anchor) {
      this.targetCenter_ = this.calculateCenterRotate(newRotation, opt_anchor);
    }

    this.targetRotation_ += delta;
    this.applyTargetState_();
  };
  /**
   * Set the center of the current view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   * @observable
   * @api
   */


  View.prototype.setCenter = function (center) {
    this.setCenterInternal((0,proj/* fromUserCoordinate */.Vs)(center, this.getProjection()));
  };
  /**
   * Set the center using the view projection (not the user projection).
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   */


  View.prototype.setCenterInternal = function (center) {
    this.targetCenter_ = center;
    this.applyTargetState_();
  };
  /**
   * @param {import("./ViewHint.js").default} hint Hint.
   * @param {number} delta Delta.
   * @return {number} New value.
   */


  View.prototype.setHint = function (hint, delta) {
    this.hints_[hint] += delta;
    this.changed();
    return this.hints_[hint];
  };
  /**
   * Set the resolution for this view. Any resolution constraint will apply.
   * @param {number|undefined} resolution The resolution of the view.
   * @observable
   * @api
   */


  View.prototype.setResolution = function (resolution) {
    this.targetResolution_ = resolution;
    this.applyTargetState_();
  };
  /**
   * Set the rotation for this view. Any rotation constraint will apply.
   * @param {number} rotation The rotation of the view in radians.
   * @observable
   * @api
   */


  View.prototype.setRotation = function (rotation) {
    this.targetRotation_ = rotation;
    this.applyTargetState_();
  };
  /**
   * Zoom to a specific zoom level. Any resolution constrain will apply.
   * @param {number} zoom Zoom level.
   * @api
   */


  View.prototype.setZoom = function (zoom) {
    this.setResolution(this.getResolutionForZoom(zoom));
  };
  /**
   * Recompute rotation/resolution/center based on target values.
   * Note: we have to compute rotation first, then resolution and center considering that
   * parameters can influence one another in case a view extent constraint is present.
   * @param {boolean} [opt_doNotCancelAnims] Do not cancel animations.
   * @param {boolean} [opt_forceMoving] Apply constraints as if the view is moving.
   * @private
   */


  View.prototype.applyTargetState_ = function (opt_doNotCancelAnims, opt_forceMoving) {
    var isMoving = this.getAnimating() || this.getInteracting() || opt_forceMoving; // compute rotation

    var newRotation = this.constraints_.rotation(this.targetRotation_, isMoving);
    var size = this.getViewportSize_(newRotation);
    var newResolution = this.constraints_.resolution(this.targetResolution_, 0, size, isMoving);
    var newCenter = this.constraints_.center(this.targetCenter_, newResolution, size, isMoving, this.calculateCenterShift(this.targetCenter_, newResolution, newRotation, size));

    if (this.get(ViewProperty.ROTATION) !== newRotation) {
      this.set(ViewProperty.ROTATION, newRotation);
    }

    if (this.get(ViewProperty.RESOLUTION) !== newResolution) {
      this.set(ViewProperty.RESOLUTION, newResolution);
    }

    if (!this.get(ViewProperty.CENTER) || !(0,coordinate/* equals */.fS)(this.get(ViewProperty.CENTER), newCenter)) {
      this.set(ViewProperty.CENTER, newCenter);
    }

    if (this.getAnimating() && !opt_doNotCancelAnims) {
      this.cancelAnimations();
    }

    this.cancelAnchor_ = undefined;
  };
  /**
   * If any constraints need to be applied, an animation will be triggered.
   * This is typically done on interaction end.
   * Note: calling this with a duration of 0 will apply the constrained values straight away,
   * without animation.
   * @param {number} [opt_duration] The animation duration in ms.
   * @param {number} [opt_resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [opt_anchor] The origin of the transformation.
   */


  View.prototype.resolveConstraints = function (opt_duration, opt_resolutionDirection, opt_anchor) {
    var duration = opt_duration !== undefined ? opt_duration : 200;
    var direction = opt_resolutionDirection || 0;
    var newRotation = this.constraints_.rotation(this.targetRotation_);
    var size = this.getViewportSize_(newRotation);
    var newResolution = this.constraints_.resolution(this.targetResolution_, direction, size);
    var newCenter = this.constraints_.center(this.targetCenter_, newResolution, size, false, this.calculateCenterShift(this.targetCenter_, newResolution, newRotation, size));

    if (duration === 0 && !this.cancelAnchor_) {
      this.targetResolution_ = newResolution;
      this.targetRotation_ = newRotation;
      this.targetCenter_ = newCenter;
      this.applyTargetState_();
      return;
    }

    var anchor = opt_anchor || (duration === 0 ? this.cancelAnchor_ : undefined);
    this.cancelAnchor_ = undefined;

    if (this.getResolution() !== newResolution || this.getRotation() !== newRotation || !this.getCenterInternal() || !(0,coordinate/* equals */.fS)(this.getCenterInternal(), newCenter)) {
      if (this.getAnimating()) {
        this.cancelAnimations();
      }

      this.animateInternal({
        rotation: newRotation,
        center: newCenter,
        resolution: newResolution,
        duration: duration,
        easing: easing/* easeOut */.Vv,
        anchor: anchor
      });
    }
  };
  /**
   * Notify the View that an interaction has started.
   * The view state will be resolved to a stable one if needed
   * (depending on its constraints).
   * @api
   */


  View.prototype.beginInteraction = function () {
    this.resolveConstraints(0);
    this.setHint(ViewHint/* default.INTERACTING */.Z.INTERACTING, 1);
  };
  /**
   * Notify the View that an interaction has ended. The view state will be resolved
   * to a stable one if needed (depending on its constraints).
   * @param {number} [opt_duration] Animation duration in ms.
   * @param {number} [opt_resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [opt_anchor] The origin of the transformation.
   * @api
   */


  View.prototype.endInteraction = function (opt_duration, opt_resolutionDirection, opt_anchor) {
    var anchor = opt_anchor && (0,proj/* fromUserCoordinate */.Vs)(opt_anchor, this.getProjection());
    this.endInteractionInternal(opt_duration, opt_resolutionDirection, anchor);
  };
  /**
   * Notify the View that an interaction has ended. The view state will be resolved
   * to a stable one if needed (depending on its constraints).
   * @param {number} [opt_duration] Animation duration in ms.
   * @param {number} [opt_resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [opt_anchor] The origin of the transformation.
   */


  View.prototype.endInteractionInternal = function (opt_duration, opt_resolutionDirection, opt_anchor) {
    this.setHint(ViewHint/* default.INTERACTING */.Z.INTERACTING, -1);
    this.resolveConstraints(opt_duration, opt_resolutionDirection, opt_anchor);
  };
  /**
   * Get a valid position for the view center according to the current constraints.
   * @param {import("./coordinate.js").Coordinate|undefined} targetCenter Target center position.
   * @param {number} [opt_targetResolution] Target resolution. If not supplied, the current one will be used.
   * This is useful to guess a valid center position at a different zoom level.
   * @return {import("./coordinate.js").Coordinate|undefined} Valid center position.
   */


  View.prototype.getConstrainedCenter = function (targetCenter, opt_targetResolution) {
    var size = this.getViewportSize_(this.getRotation());
    return this.constraints_.center(targetCenter, opt_targetResolution || this.getResolution(), size);
  };
  /**
   * Get a valid zoom level according to the current view constraints.
   * @param {number|undefined} targetZoom Target zoom.
   * @param {number} [opt_direction=0] Indicate which resolution should be used
   * by a renderer if the view resolution does not match any resolution of the tile source.
   * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
   * will be used. If -1, the nearest higher resolution will be used.
   * @return {number|undefined} Valid zoom level.
   */


  View.prototype.getConstrainedZoom = function (targetZoom, opt_direction) {
    var targetRes = this.getResolutionForZoom(targetZoom);
    return this.getZoomForResolution(this.getConstrainedResolution(targetRes, opt_direction));
  };
  /**
   * Get a valid resolution according to the current view constraints.
   * @param {number|undefined} targetResolution Target resolution.
   * @param {number} [opt_direction=0] Indicate which resolution should be used
   * by a renderer if the view resolution does not match any resolution of the tile source.
   * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
   * will be used. If -1, the nearest higher resolution will be used.
   * @return {number|undefined} Valid resolution.
   */


  View.prototype.getConstrainedResolution = function (targetResolution, opt_direction) {
    var direction = opt_direction || 0;
    var size = this.getViewportSize_(this.getRotation());
    return this.constraints_.resolution(targetResolution, direction, size);
  };

  return View;
}(ol_Object/* default */.Z);
/**
 * @param {Function} callback Callback.
 * @param {*} returnValue Return value.
 */


function animationCallback(callback, returnValue) {
  setTimeout(function () {
    callback(returnValue);
  }, 0);
}
/**
 * @param {ViewOptions} options View options.
 * @return {import("./centerconstraint.js").Type} The constraint.
 */


function createCenterConstraint(options) {
  if (options.extent !== undefined) {
    var smooth = options.smoothExtentConstraint !== undefined ? options.smoothExtentConstraint : true;
    return createExtent(options.extent, options.constrainOnlyCenter, smooth);
  }

  var projection = (0,proj/* createProjection */.UQ)(options.projection, 'EPSG:3857');

  if (options.multiWorld !== true && projection.isGlobal()) {
    var extent = projection.getExtent().slice();
    extent[0] = -Infinity;
    extent[2] = Infinity;
    return createExtent(extent, false, false);
  }

  return none;
}
/**
 * @param {ViewOptions} options View options.
 * @return {{constraint: import("./resolutionconstraint.js").Type, maxResolution: number,
 *     minResolution: number, minZoom: number, zoomFactor: number}} The constraint.
 */

function createResolutionConstraint(options) {
  var resolutionConstraint;
  var maxResolution;
  var minResolution; // TODO: move these to be ol constants
  // see https://github.com/openlayers/openlayers/issues/2076

  var defaultMaxZoom = 28;
  var defaultZoomFactor = 2;
  var minZoom = options.minZoom !== undefined ? options.minZoom : DEFAULT_MIN_ZOOM;
  var maxZoom = options.maxZoom !== undefined ? options.maxZoom : defaultMaxZoom;
  var zoomFactor = options.zoomFactor !== undefined ? options.zoomFactor : defaultZoomFactor;
  var multiWorld = options.multiWorld !== undefined ? options.multiWorld : false;
  var smooth = options.smoothResolutionConstraint !== undefined ? options.smoothResolutionConstraint : true;
  var showFullExtent = options.showFullExtent !== undefined ? options.showFullExtent : false;
  var projection = (0,proj/* createProjection */.UQ)(options.projection, 'EPSG:3857');
  var projExtent = projection.getExtent();
  var constrainOnlyCenter = options.constrainOnlyCenter;
  var extent = options.extent;

  if (!multiWorld && !extent && projection.isGlobal()) {
    constrainOnlyCenter = false;
    extent = projExtent;
  }

  if (options.resolutions !== undefined) {
    var resolutions = options.resolutions;
    maxResolution = resolutions[minZoom];
    minResolution = resolutions[maxZoom] !== undefined ? resolutions[maxZoom] : resolutions[resolutions.length - 1];

    if (options.constrainResolution) {
      resolutionConstraint = (0,resolutionconstraint/* createSnapToResolutions */.gn)(resolutions, smooth, !constrainOnlyCenter && extent, showFullExtent);
    } else {
      resolutionConstraint = (0,resolutionconstraint/* createMinMaxResolution */.Is)(maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
    }
  } else {
    // calculate the default min and max resolution
    var size = !projExtent ? // use an extent that can fit the whole world if need be
    360 * proj/* METERS_PER_UNIT */.Wm[Units/* default.DEGREES */.ZP.DEGREES] / projection.getMetersPerUnit() : Math.max((0,ol_extent/* getWidth */.dz)(projExtent), (0,ol_extent/* getHeight */.Cr)(projExtent));
    var defaultMaxResolution = size / common/* DEFAULT_TILE_SIZE */.S / Math.pow(defaultZoomFactor, DEFAULT_MIN_ZOOM);
    var defaultMinResolution = defaultMaxResolution / Math.pow(defaultZoomFactor, defaultMaxZoom - DEFAULT_MIN_ZOOM); // user provided maxResolution takes precedence

    maxResolution = options.maxResolution;

    if (maxResolution !== undefined) {
      minZoom = 0;
    } else {
      maxResolution = defaultMaxResolution / Math.pow(zoomFactor, minZoom);
    } // user provided minResolution takes precedence


    minResolution = options.minResolution;

    if (minResolution === undefined) {
      if (options.maxZoom !== undefined) {
        if (options.maxResolution !== undefined) {
          minResolution = maxResolution / Math.pow(zoomFactor, maxZoom);
        } else {
          minResolution = defaultMaxResolution / Math.pow(zoomFactor, maxZoom);
        }
      } else {
        minResolution = defaultMinResolution;
      }
    } // given discrete zoom levels, minResolution may be different than provided


    maxZoom = minZoom + Math.floor(Math.log(maxResolution / minResolution) / Math.log(zoomFactor));
    minResolution = maxResolution / Math.pow(zoomFactor, maxZoom - minZoom);

    if (options.constrainResolution) {
      resolutionConstraint = (0,resolutionconstraint/* createSnapToPower */.cA)(zoomFactor, maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
    } else {
      resolutionConstraint = (0,resolutionconstraint/* createMinMaxResolution */.Is)(maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
    }
  }

  return {
    constraint: resolutionConstraint,
    maxResolution: maxResolution,
    minResolution: minResolution,
    minZoom: minZoom,
    zoomFactor: zoomFactor
  };
}
/**
 * @param {ViewOptions} options View options.
 * @return {import("./rotationconstraint.js").Type} Rotation constraint.
 */

function createRotationConstraint(options) {
  var enableRotation = options.enableRotation !== undefined ? options.enableRotation : true;

  if (enableRotation) {
    var constrainRotation = options.constrainRotation;

    if (constrainRotation === undefined || constrainRotation === true) {
      return (0,rotationconstraint/* createSnapToZero */.Gw)();
    } else if (constrainRotation === false) {
      return rotationconstraint/* none */.YP;
    } else if (typeof constrainRotation === 'number') {
      return (0,rotationconstraint/* createSnapToN */.gE)(constrainRotation);
    } else {
      return rotationconstraint/* none */.YP;
    }
  } else {
    return rotationconstraint/* disable */.h$;
  }
}
/**
 * Determine if an animation involves no view change.
 * @param {Animation} animation The animation.
 * @return {boolean} The animation involves no view change.
 */

function isNoopAnimation(animation) {
  if (animation.sourceCenter && animation.targetCenter) {
    if (!(0,coordinate/* equals */.fS)(animation.sourceCenter, animation.targetCenter)) {
      return false;
    }
  }

  if (animation.sourceResolution !== animation.targetResolution) {
    return false;
  }

  if (animation.sourceRotation !== animation.targetRotation) {
    return false;
  }

  return true;
}
/**
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @param {import("./size.js").Size} size Box pixel size.
 * @param {import("./pixel.js").Pixel} position Position on the view to center on.
 * @param {number} resolution Resolution.
 * @param {number} rotation Rotation.
 * @return {import("./coordinate.js").Coordinate} Shifted center.
 */

function calculateCenterOn(coordinate, size, position, resolution, rotation) {
  // calculate rotated position
  var cosAngle = Math.cos(-rotation);
  var sinAngle = Math.sin(-rotation);
  var rotX = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
  var rotY = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
  rotX += (size[0] / 2 - position[0]) * resolution;
  rotY += (position[1] - size[1] / 2) * resolution; // go back to original angle

  sinAngle = -sinAngle; // go back to original rotation

  var centerX = rotX * cosAngle - rotY * sinAngle;
  var centerY = rotY * cosAngle + rotX * sinAngle;
  return [centerX, centerY];
}

/* harmony default export */ const ol_View = (View);

/***/ }),

/***/ 1840:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/ViewHint
 */

/**
 * @enum {number}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  ANIMATING: 0,
  INTERACTING: 1
});

/***/ }),

/***/ 3620:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FZ": () => (/* binding */ reverseSubArray),
/* harmony export */   "fS": () => (/* binding */ equals),
/* harmony export */   "h7": () => (/* binding */ linearFindNearest),
/* harmony export */   "kK": () => (/* binding */ numberSafeCompareFunction),
/* harmony export */   "l7": () => (/* binding */ extend),
/* harmony export */   "pT": () => (/* binding */ isSorted),
/* harmony export */   "q9": () => (/* binding */ includes),
/* harmony export */   "ry": () => (/* binding */ binarySearch)
/* harmony export */ });
/* unused harmony exports remove, find, stableSort, findIndex */
/**
 * @module ol/array
 */

/**
 * Performs a binary search on the provided sorted list and returns the index of the item if found. If it can't be found it'll return -1.
 * https://github.com/darkskyapp/binary-search
 *
 * @param {Array<*>} haystack Items to search through.
 * @param {*} needle The item to look for.
 * @param {Function} [opt_comparator] Comparator function.
 * @return {number} The index of the item if found, -1 if not.
 */
function binarySearch(haystack, needle, opt_comparator) {
  var mid, cmp;
  var comparator = opt_comparator || numberSafeCompareFunction;
  var low = 0;
  var high = haystack.length;
  var found = false;

  while (low < high) {
    /* Note that "(low + high) >>> 1" may overflow, and results in a typecast
     * to double (which gives the wrong results). */
    mid = low + (high - low >> 1);
    cmp = +comparator(haystack[mid], needle);

    if (cmp < 0.0) {
      /* Too low. */
      low = mid + 1;
    } else {
      /* Key found or too high */
      high = mid;
      found = !cmp;
    }
  }
  /* Key not found. */


  return found ? low : ~low;
}
/**
 * Compare function for array sort that is safe for numbers.
 * @param {*} a The first object to be compared.
 * @param {*} b The second object to be compared.
 * @return {number} A negative number, zero, or a positive number as the first
 *     argument is less than, equal to, or greater than the second.
 */

function numberSafeCompareFunction(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}
/**
 * Whether the array contains the given object.
 * @param {Array<*>} arr The array to test for the presence of the element.
 * @param {*} obj The object for which to test.
 * @return {boolean} The object is in the array.
 */

function includes(arr, obj) {
  return arr.indexOf(obj) >= 0;
}
/**
 * {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution} can use a function
 * of this type to determine which nearest resolution to use.
 *
 * This function takes a `{number}` representing a value between two array entries,
 * a `{number}` representing the value of the nearest higher entry and
 * a `{number}` representing the value of the nearest lower entry
 * as arguments and returns a `{number}`. If a negative number or zero is returned
 * the lower value will be used, if a positive number is returned the higher value
 * will be used.
 * @typedef {function(number, number, number): number} NearestDirectionFunction
 * @api
 */

/**
 * @param {Array<number>} arr Array in descending order.
 * @param {number} target Target.
 * @param {number|NearestDirectionFunction} direction
 *    0 means return the nearest,
 *    > 0 means return the largest nearest,
 *    < 0 means return the smallest nearest.
 * @return {number} Index.
 */

function linearFindNearest(arr, target, direction) {
  var n = arr.length;

  if (arr[0] <= target) {
    return 0;
  } else if (target <= arr[n - 1]) {
    return n - 1;
  } else {
    var i = void 0;

    if (direction > 0) {
      for (i = 1; i < n; ++i) {
        if (arr[i] < target) {
          return i - 1;
        }
      }
    } else if (direction < 0) {
      for (i = 1; i < n; ++i) {
        if (arr[i] <= target) {
          return i;
        }
      }
    } else {
      for (i = 1; i < n; ++i) {
        if (arr[i] == target) {
          return i;
        } else if (arr[i] < target) {
          if (typeof direction === 'function') {
            if (direction(target, arr[i - 1], arr[i]) > 0) {
              return i - 1;
            } else {
              return i;
            }
          } else if (arr[i - 1] - target < target - arr[i]) {
            return i - 1;
          } else {
            return i;
          }
        }
      }
    }

    return n - 1;
  }
}
/**
 * @param {Array<*>} arr Array.
 * @param {number} begin Begin index.
 * @param {number} end End index.
 */

function reverseSubArray(arr, begin, end) {
  while (begin < end) {
    var tmp = arr[begin];
    arr[begin] = arr[end];
    arr[end] = tmp;
    ++begin;
    --end;
  }
}
/**
 * @param {Array<VALUE>} arr The array to modify.
 * @param {!Array<VALUE>|VALUE} data The elements or arrays of elements to add to arr.
 * @template VALUE
 */

function extend(arr, data) {
  var extension = Array.isArray(data) ? data : [data];
  var length = extension.length;

  for (var i = 0; i < length; i++) {
    arr[arr.length] = extension[i];
  }
}
/**
 * @param {Array<VALUE>} arr The array to modify.
 * @param {VALUE} obj The element to remove.
 * @template VALUE
 * @return {boolean} If the element was removed.
 */

function remove(arr, obj) {
  var i = arr.indexOf(obj);
  var found = i > -1;

  if (found) {
    arr.splice(i, 1);
  }

  return found;
}
/**
 * @param {Array<VALUE>} arr The array to search in.
 * @param {function(VALUE, number, ?) : boolean} func The function to compare.
 * @template VALUE
 * @return {VALUE|null} The element found or null.
 */

function find(arr, func) {
  var length = arr.length >>> 0;
  var value;

  for (var i = 0; i < length; i++) {
    value = arr[i];

    if (func(value, i, arr)) {
      return value;
    }
  }

  return null;
}
/**
 * @param {Array|Uint8ClampedArray} arr1 The first array to compare.
 * @param {Array|Uint8ClampedArray} arr2 The second array to compare.
 * @return {boolean} Whether the two arrays are equal.
 */

function equals(arr1, arr2) {
  var len1 = arr1.length;

  if (len1 !== arr2.length) {
    return false;
  }

  for (var i = 0; i < len1; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}
/**
 * Sort the passed array such that the relative order of equal elements is preserved.
 * See https://en.wikipedia.org/wiki/Sorting_algorithm#Stability for details.
 * @param {Array<*>} arr The array to sort (modifies original).
 * @param {!function(*, *): number} compareFnc Comparison function.
 * @api
 */

function stableSort(arr, compareFnc) {
  var length = arr.length;
  var tmp = Array(arr.length);
  var i;

  for (i = 0; i < length; i++) {
    tmp[i] = {
      index: i,
      value: arr[i]
    };
  }

  tmp.sort(function (a, b) {
    return compareFnc(a.value, b.value) || a.index - b.index;
  });

  for (i = 0; i < arr.length; i++) {
    arr[i] = tmp[i].value;
  }
}
/**
 * @param {Array<*>} arr The array to search in.
 * @param {Function} func Comparison function.
 * @return {number} Return index.
 */

function findIndex(arr, func) {
  var index;
  var found = !arr.every(function (el, idx) {
    index = idx;
    return !func(el, idx, arr);
  });
  return found ? index : -1;
}
/**
 * @param {Array<*>} arr The array to test.
 * @param {Function} [opt_func] Comparison function.
 * @param {boolean} [opt_strict] Strictly sorted (default false).
 * @return {boolean} Return index.
 */

function isSorted(arr, opt_func, opt_strict) {
  var compare = opt_func || numberSafeCompareFunction;
  return arr.every(function (currentVal, index) {
    if (index === 0) {
      return true;
    }

    var res = compare(arr[index - 1], currentVal);
    return !(res > 0 || opt_strict && res === 0);
  });
}

/***/ }),

/***/ 4548:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ assert)
/* harmony export */ });
/* harmony import */ var _AssertionError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4481);
/**
 * @module ol/asserts
 */

/**
 * @param {*} assertion Assertion we expected to be truthy.
 * @param {number} errorCode Error code.
 */

function assert(assertion, errorCode) {
  if (!assertion) {
    throw new _AssertionError_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z(errorCode);
  }
}

/***/ })

}]);