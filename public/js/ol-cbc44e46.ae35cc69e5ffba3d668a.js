"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[481],{

/***/ 4983:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Composite)
});

// EXTERNAL MODULE: ./node_modules/ol/Disposable.js
var Disposable = __webpack_require__(7170);
// EXTERNAL MODULE: ./node_modules/ol/functions.js
var functions = __webpack_require__(3658);
// EXTERNAL MODULE: ./node_modules/ol/util.js
var util = __webpack_require__(2618);
// EXTERNAL MODULE: ./node_modules/ol/transform.js
var transform = __webpack_require__(8975);
// EXTERNAL MODULE: ./node_modules/ol/extent.js
var extent = __webpack_require__(1046);
// EXTERNAL MODULE: ./node_modules/ol/style/IconImageCache.js
var IconImageCache = __webpack_require__(2532);
// EXTERNAL MODULE: ./node_modules/ol/layer/Layer.js
var Layer = __webpack_require__(8498);
// EXTERNAL MODULE: ./node_modules/ol/coordinate.js
var ol_coordinate = __webpack_require__(4413);
;// CONCATENATED MODULE: ./node_modules/ol/renderer/Map.js
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
 * @module ol/renderer/Map
 */










/**
 * @typedef HitMatch
 * @property {import("../Feature.js").FeatureLike} feature Feature.
 * @property {import("../layer/Layer.js").default} layer Layer.
 * @property {import("../geom/SimpleGeometry.js").default} geometry Geometry.
 * @property {number} distanceSq Squared distance.
 * @property {import("./vector.js").FeatureCallback<T>} callback Callback.
 * @template T
 */

/**
 * @abstract
 */

var MapRenderer =
/** @class */
function (_super) {
  __extends(MapRenderer, _super);
  /**
   * @param {import("../PluggableMap.js").default} map Map.
   */


  function MapRenderer(map) {
    var _this = _super.call(this) || this;
    /**
     * @private
     * @type {import("../PluggableMap.js").default}
     */


    _this.map_ = map;
    return _this;
  }
  /**
   * @abstract
   * @param {import("../render/EventType.js").default} type Event type.
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   */


  MapRenderer.prototype.dispatchRenderEvent = function (type, frameState) {
    (0,util/* abstract */.O3)();
  };
  /**
   * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
   * @protected
   */


  MapRenderer.prototype.calculateMatrices2D = function (frameState) {
    var viewState = frameState.viewState;
    var coordinateToPixelTransform = frameState.coordinateToPixelTransform;
    var pixelToCoordinateTransform = frameState.pixelToCoordinateTransform;
    (0,transform/* compose */.qC)(coordinateToPixelTransform, frameState.size[0] / 2, frameState.size[1] / 2, 1 / viewState.resolution, -1 / viewState.resolution, -viewState.rotation, -viewState.center[0], -viewState.center[1]);
    (0,transform/* makeInverse */.nb)(pixelToCoordinateTransform, coordinateToPixelTransform);
  };
  /**
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {boolean} checkWrapped Check for wrapped geometries.
   * @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {S} thisArg Value to use as `this` when executing `callback`.
   * @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
   *     function, only layers which are visible and for which this function
   *     returns `true` will be tested for features.  By default, all visible
   *     layers will be tested.
   * @param {U} thisArg2 Value to use as `this` when executing `layerFilter`.
   * @return {T|undefined} Callback result.
   * @template S,T,U
   */


  MapRenderer.prototype.forEachFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, checkWrapped, callback, thisArg, layerFilter, thisArg2) {
    var result;
    var viewState = frameState.viewState;
    /**
     * @param {boolean} managed Managed layer.
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     * @param {import("../layer/Layer.js").default} layer Layer.
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @return {T|undefined} Callback result.
     */

    function forEachFeatureAtCoordinate(managed, feature, layer, geometry) {
      return callback.call(thisArg, feature, managed ? layer : null, geometry);
    }

    var projection = viewState.projection;
    var translatedCoordinate = (0,ol_coordinate/* wrapX */.Cf)(coordinate.slice(), projection);
    var offsets = [[0, 0]];

    if (projection.canWrapX() && checkWrapped) {
      var projectionExtent = projection.getExtent();
      var worldWidth = (0,extent/* getWidth */.dz)(projectionExtent);
      offsets.push([-worldWidth, 0], [worldWidth, 0]);
    }

    var layerStates = frameState.layerStatesArray;
    var numLayers = layerStates.length;
    var matches =
    /** @type {Array<HitMatch<T>>} */
    [];
    var tmpCoord = [];

    for (var i = 0; i < offsets.length; i++) {
      for (var j = numLayers - 1; j >= 0; --j) {
        var layerState = layerStates[j];
        var layer = layerState.layer;

        if (layer.hasRenderer() && (0,Layer/* inView */.j)(layerState, viewState) && layerFilter.call(thisArg2, layer)) {
          var layerRenderer = layer.getRenderer();
          var source = layer.getSource();

          if (layerRenderer && source) {
            var coordinates = source.getWrapX() ? translatedCoordinate : coordinate;
            var callback_1 = forEachFeatureAtCoordinate.bind(null, layerState.managed);
            tmpCoord[0] = coordinates[0] + offsets[i][0];
            tmpCoord[1] = coordinates[1] + offsets[i][1];
            result = layerRenderer.forEachFeatureAtCoordinate(tmpCoord, frameState, hitTolerance, callback_1, matches);
          }

          if (result) {
            return result;
          }
        }
      }
    }

    if (matches.length === 0) {
      return undefined;
    }

    var order = 1 / matches.length;
    matches.forEach(function (m, i) {
      return m.distanceSq += i * order;
    });
    matches.sort(function (a, b) {
      return a.distanceSq - b.distanceSq;
    });
    matches.some(function (m) {
      return result = m.callback(m.feature, m.layer, m.geometry);
    });
    return result;
  };
  /**
   * @abstract
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {function(import("../layer/Layer.js").default<import("../source/Source").default>, (Uint8ClampedArray|Uint8Array)): T} callback Layer
   *     callback.
   * @param {function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean} layerFilter Layer filter
   *     function, only layers which are visible and for which this function
   *     returns `true` will be tested for features.  By default, all visible
   *     layers will be tested.
   * @return {T|undefined} Callback result.
   * @template T
   */


  MapRenderer.prototype.forEachLayerAtPixel = function (pixel, frameState, hitTolerance, callback, layerFilter) {
    return (0,util/* abstract */.O3)();
  };
  /**
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {boolean} checkWrapped Check for wrapped geometries.
   * @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
   *     function, only layers which are visible and for which this function
   *     returns `true` will be tested for features.  By default, all visible
   *     layers will be tested.
   * @param {U} thisArg Value to use as `this` when executing `layerFilter`.
   * @return {boolean} Is there a feature at the given coordinate?
   * @template U
   */


  MapRenderer.prototype.hasFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, checkWrapped, layerFilter, thisArg) {
    var hasFeature = this.forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, checkWrapped, functions/* TRUE */.uX, this, layerFilter, thisArg);
    return hasFeature !== undefined;
  };
  /**
   * @return {import("../PluggableMap.js").default} Map.
   */


  MapRenderer.prototype.getMap = function () {
    return this.map_;
  };
  /**
   * Render.
   * @abstract
   * @param {?import("../PluggableMap.js").FrameState} frameState Frame state.
   */


  MapRenderer.prototype.renderFrame = function (frameState) {
    (0,util/* abstract */.O3)();
  };
  /**
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   * @protected
   */


  MapRenderer.prototype.scheduleExpireIconCache = function (frameState) {
    if (IconImageCache/* shared.canExpireCache */.c.canExpireCache()) {
      frameState.postRenderFunctions.push(expireIconCache);
    }
  };

  return MapRenderer;
}(Disposable/* default */.Z);
/**
 * @param {import("../PluggableMap.js").default} map Map.
 * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
 */


function expireIconCache(map, frameState) {
  IconImageCache/* shared.expire */.c.expire();
}

/* harmony default export */ const Map = (MapRenderer);
// EXTERNAL MODULE: ./node_modules/ol/ObjectEventType.js
var ObjectEventType = __webpack_require__(4314);
// EXTERNAL MODULE: ./node_modules/ol/render/Event.js
var Event = __webpack_require__(8471);
// EXTERNAL MODULE: ./node_modules/ol/render/EventType.js
var EventType = __webpack_require__(834);
// EXTERNAL MODULE: ./node_modules/ol/source/State.js
var State = __webpack_require__(669);
// EXTERNAL MODULE: ./node_modules/ol/css.js
var css = __webpack_require__(9285);
// EXTERNAL MODULE: ./node_modules/ol/render/canvas.js
var canvas = __webpack_require__(1184);
// EXTERNAL MODULE: ./node_modules/ol/events.js
var events = __webpack_require__(5750);
// EXTERNAL MODULE: ./node_modules/ol/dom.js
var dom = __webpack_require__(9631);
;// CONCATENATED MODULE: ./node_modules/ol/renderer/Composite.js
var Composite_extends = undefined && undefined.__extends || function () {
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
 * @module ol/renderer/Composite
 */












/**
 * @classdesc
 * Canvas map renderer.
 * @api
 */

var CompositeMapRenderer =
/** @class */
function (_super) {
  Composite_extends(CompositeMapRenderer, _super);
  /**
   * @param {import("../PluggableMap.js").default} map Map.
   */


  function CompositeMapRenderer(map) {
    var _this = _super.call(this, map) || this;
    /**
     * @type {import("../events.js").EventsKey}
     */


    _this.fontChangeListenerKey_ = (0,events/* listen */.oL)(canvas/* checkedFonts */.sG, ObjectEventType/* default.PROPERTYCHANGE */.Z.PROPERTYCHANGE, map.redrawText.bind(map));
    /**
     * @private
     * @type {HTMLDivElement}
     */

    _this.element_ = document.createElement('div');
    var style = _this.element_.style;
    style.position = 'absolute';
    style.width = '100%';
    style.height = '100%';
    style.zIndex = '0';
    _this.element_.className = css/* CLASS_UNSELECTABLE */.XV + ' ol-layers';
    var container = map.getViewport();
    container.insertBefore(_this.element_, container.firstChild || null);
    /**
     * @private
     * @type {Array<HTMLElement>}
     */

    _this.children_ = [];
    /**
     * @private
     * @type {boolean}
     */

    _this.renderedVisible_ = true;
    return _this;
  }
  /**
   * @param {import("../render/EventType.js").default} type Event type.
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   */


  CompositeMapRenderer.prototype.dispatchRenderEvent = function (type, frameState) {
    var map = this.getMap();

    if (map.hasListener(type)) {
      var event_1 = new Event/* default */.Z(type, undefined, frameState);
      map.dispatchEvent(event_1);
    }
  };

  CompositeMapRenderer.prototype.disposeInternal = function () {
    (0,events/* unlistenByKey */.bN)(this.fontChangeListenerKey_);
    this.element_.parentNode.removeChild(this.element_);

    _super.prototype.disposeInternal.call(this);
  };
  /**
   * Render.
   * @param {?import("../PluggableMap.js").FrameState} frameState Frame state.
   */


  CompositeMapRenderer.prototype.renderFrame = function (frameState) {
    if (!frameState) {
      if (this.renderedVisible_) {
        this.element_.style.display = 'none';
        this.renderedVisible_ = false;
      }

      return;
    }

    this.calculateMatrices2D(frameState);
    this.dispatchRenderEvent(EventType/* default.PRECOMPOSE */.Z.PRECOMPOSE, frameState);
    var layerStatesArray = frameState.layerStatesArray.sort(function (a, b) {
      return a.zIndex - b.zIndex;
    });
    var viewState = frameState.viewState;
    this.children_.length = 0;
    /**
     * @type {Array<import("../layer/BaseVector.js").default>}
     */

    var declutterLayers = [];
    var previousElement = null;

    for (var i = 0, ii = layerStatesArray.length; i < ii; ++i) {
      var layerState = layerStatesArray[i];
      frameState.layerIndex = i;

      if (!(0,Layer/* inView */.j)(layerState, viewState) || layerState.sourceState != State/* default.READY */.Z.READY && layerState.sourceState != State/* default.UNDEFINED */.Z.UNDEFINED) {
        continue;
      }

      var layer = layerState.layer;
      var element = layer.render(frameState, previousElement);

      if (!element) {
        continue;
      }

      if (element !== previousElement) {
        this.children_.push(element);
        previousElement = element;
      }

      if ('getDeclutter' in layer) {
        declutterLayers.push(
        /** @type {import("../layer/BaseVector.js").default} */
        layer);
      }
    }

    for (var i = declutterLayers.length - 1; i >= 0; --i) {
      declutterLayers[i].renderDeclutter(frameState);
    }

    (0,dom/* replaceChildren */.hF)(this.element_, this.children_);
    this.dispatchRenderEvent(EventType/* default.POSTCOMPOSE */.Z.POSTCOMPOSE, frameState);

    if (!this.renderedVisible_) {
      this.element_.style.display = '';
      this.renderedVisible_ = true;
    }

    this.scheduleExpireIconCache(frameState);
  };
  /**
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {function(import("../layer/Layer.js").default<import("../source/Source").default>, (Uint8ClampedArray|Uint8Array)): T} callback Layer
   *     callback.
   * @param {function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean} layerFilter Layer filter
   *     function, only layers which are visible and for which this function
   *     returns `true` will be tested for features.  By default, all visible
   *     layers will be tested.
   * @return {T|undefined} Callback result.
   * @template T
   */


  CompositeMapRenderer.prototype.forEachLayerAtPixel = function (pixel, frameState, hitTolerance, callback, layerFilter) {
    var viewState = frameState.viewState;
    var layerStates = frameState.layerStatesArray;
    var numLayers = layerStates.length;

    for (var i = numLayers - 1; i >= 0; --i) {
      var layerState = layerStates[i];
      var layer = layerState.layer;

      if (layer.hasRenderer() && (0,Layer/* inView */.j)(layerState, viewState) && layerFilter(layer)) {
        var layerRenderer = layer.getRenderer();
        var data = layerRenderer.getDataAtPixel(pixel, frameState, hitTolerance);

        if (data) {
          var result = callback(layer, data);

          if (result) {
            return result;
          }
        }
      }
    }

    return undefined;
  };

  return CompositeMapRenderer;
}(Map);

/* harmony default export */ const Composite = (CompositeMapRenderer);

/***/ }),

/***/ 7209:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _events_EventType_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2140);
/* harmony import */ var _ImageState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4382);
/* harmony import */ var _Observable_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9910);
/* harmony import */ var _source_State_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(669);
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
 * @module ol/renderer/Layer
 */







/**
 * @template {import("../layer/Layer.js").default} LayerType
 */

var LayerRenderer =
/** @class */
function (_super) {
  __extends(LayerRenderer, _super);
  /**
   * @param {LayerType} layer Layer.
   */


  function LayerRenderer(layer) {
    var _this = _super.call(this) || this;
    /** @private */


    _this.boundHandleImageChange_ = _this.handleImageChange_.bind(_this);
    /**
     * @protected
     * @type {LayerType}
     */

    _this.layer_ = layer;
    /**
     * @type {import("../render/canvas/ExecutorGroup").default}
     */

    _this.declutterExecutorGroup = null;
    return _this;
  }
  /**
   * Asynchronous layer level hit detection.
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").default>>} Promise that resolves with
   * an array of features.
   */


  LayerRenderer.prototype.getFeatures = function (pixel) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .abstract */ .O3)();
  };
  /**
   * Determine whether render should be called.
   * @abstract
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */


  LayerRenderer.prototype.prepareFrame = function (frameState) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .abstract */ .O3)();
  };
  /**
   * Render the layer.
   * @abstract
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @return {HTMLElement} The rendered element.
   */


  LayerRenderer.prototype.renderFrame = function (frameState, target) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .abstract */ .O3)();
  };
  /**
   * @param {Object<number, Object<string, import("../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
   * @param {number} zoom Zoom level.
   * @param {import("../Tile.js").default} tile Tile.
   * @return {boolean|void} If `false`, the tile will not be considered loaded.
   */


  LayerRenderer.prototype.loadedTileCallback = function (tiles, zoom, tile) {
    if (!tiles[zoom]) {
      tiles[zoom] = {};
    }

    tiles[zoom][tile.tileCoord.toString()] = tile;
    return undefined;
  };
  /**
   * Create a function that adds loaded tiles to the tile lookup.
   * @param {import("../source/Tile.js").default} source Tile source.
   * @param {import("../proj/Projection.js").default} projection Projection of the tiles.
   * @param {Object<number, Object<string, import("../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
   * @return {function(number, import("../TileRange.js").default):boolean} A function that can be
   *     called with a zoom level and a tile range to add loaded tiles to the lookup.
   * @protected
   */


  LayerRenderer.prototype.createLoadedTileFinder = function (source, projection, tiles) {
    return (
      /**
       * @param {number} zoom Zoom level.
       * @param {import("../TileRange.js").default} tileRange Tile range.
       * @return {boolean} The tile range is fully loaded.
       * @this {LayerRenderer}
       */
      function (zoom, tileRange) {
        var callback = this.loadedTileCallback.bind(this, tiles, zoom);
        return source.forEachLoadedTile(projection, zoom, tileRange, callback);
      }.bind(this)
    );
  };
  /**
   * @abstract
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("./Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   */


  LayerRenderer.prototype.forEachFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, callback, matches) {
    return undefined;
  };
  /**
   * @abstract
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @return {Uint8ClampedArray|Uint8Array} The result.  If there is no data at the pixel
   *    location, null will be returned.  If there is data, but pixel values cannot be
   *    returned, and empty array will be returned.
   */


  LayerRenderer.prototype.getDataAtPixel = function (pixel, frameState, hitTolerance) {
    return null;
  };
  /**
   * @return {LayerType} Layer.
   */


  LayerRenderer.prototype.getLayer = function () {
    return this.layer_;
  };
  /**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   * @abstract
   */


  LayerRenderer.prototype.handleFontsChanged = function () {};
  /**
   * Handle changes in image state.
   * @param {import("../events/Event.js").default} event Image change event.
   * @private
   */


  LayerRenderer.prototype.handleImageChange_ = function (event) {
    var image =
    /** @type {import("../Image.js").default} */
    event.target;

    if (image.getState() === _ImageState_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].LOADED */ .Z.LOADED) {
      this.renderIfReadyAndVisible();
    }
  };
  /**
   * Load the image if not already loaded, and register the image change
   * listener if needed.
   * @param {import("../ImageBase.js").default} image Image.
   * @return {boolean} `true` if the image is already loaded, `false` otherwise.
   * @protected
   */


  LayerRenderer.prototype.loadImage = function (image) {
    var imageState = image.getState();

    if (imageState != _ImageState_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].LOADED */ .Z.LOADED && imageState != _ImageState_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].ERROR */ .Z.ERROR) {
      image.addEventListener(_events_EventType_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].CHANGE */ .Z.CHANGE, this.boundHandleImageChange_);
    }

    if (imageState == _ImageState_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].IDLE */ .Z.IDLE) {
      image.load();
      imageState = image.getState();
    }

    return imageState == _ImageState_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].LOADED */ .Z.LOADED;
  };
  /**
   * @protected
   */


  LayerRenderer.prototype.renderIfReadyAndVisible = function () {
    var layer = this.getLayer();

    if (layer.getVisible() && layer.getSourceState() == _source_State_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].READY */ .Z.READY) {
      layer.changed();
    }
  };

  return LayerRenderer;
}(_Observable_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LayerRenderer);

/***/ }),

/***/ 9034:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Layer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7209);
/* harmony import */ var _render_Event_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8471);
/* harmony import */ var _render_EventType_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(834);
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8975);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1046);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9631);
/* harmony import */ var _css_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9285);
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
 * @module ol/renderer/canvas/Layer
 */









/**
 * @abstract
 * @template {import("../../layer/Layer.js").default} LayerType
 * @extends {LayerRenderer<LayerType>}
 */

var CanvasLayerRenderer =
/** @class */
function (_super) {
  __extends(CanvasLayerRenderer, _super);
  /**
   * @param {LayerType} layer Layer.
   */


  function CanvasLayerRenderer(layer) {
    var _this = _super.call(this, layer) || this;
    /**
     * @protected
     * @type {HTMLElement}
     */


    _this.container = null;
    /**
     * @protected
     * @type {number}
     */

    _this.renderedResolution;
    /**
     * A temporary transform.  The values in this transform should only be used in a
     * function that sets the values.
     * @protected
     * @type {import("../../transform.js").Transform}
     */

    _this.tempTransform = (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__/* .create */ .Ue)();
    /**
     * The transform for rendered pixels to viewport CSS pixels.  This transform must
     * be set when rendering a frame and may be used by other functions after rendering.
     * @protected
     * @type {import("../../transform.js").Transform}
     */

    _this.pixelTransform = (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__/* .create */ .Ue)();
    /**
     * The transform for viewport CSS pixels to rendered pixels.  This transform must
     * be set when rendering a frame and may be used by other functions after rendering.
     * @protected
     * @type {import("../../transform.js").Transform}
     */

    _this.inversePixelTransform = (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__/* .create */ .Ue)();
    /**
     * @type {CanvasRenderingContext2D}
     */

    _this.context = null;
    /**
     * @type {boolean}
     */

    _this.containerReused = false;
    return _this;
  }
  /**
   * Get a rendering container from an existing target, if compatible.
   * @param {HTMLElement} target Potential render target.
   * @param {string} transform CSS Transform.
   * @param {number} opacity Opacity.
   */


  CanvasLayerRenderer.prototype.useContainer = function (target, transform, opacity) {
    var layerClassName = this.getLayer().getClassName();
    var container, context;

    if (target && target.style.opacity === (0,_css_js__WEBPACK_IMPORTED_MODULE_1__/* .cssOpacity */ .Xy)(opacity) && target.className === layerClassName) {
      var canvas = target.firstElementChild;

      if (canvas instanceof HTMLCanvasElement) {
        context = canvas.getContext('2d');
      }
    }

    if (context && context.canvas.style.transform === transform) {
      // Container of the previous layer renderer can be used.
      this.container = target;
      this.context = context;
      this.containerReused = true;
    } else if (this.containerReused) {
      // Previously reused container cannot be used any more.
      this.container = null;
      this.context = null;
      this.containerReused = false;
    }

    if (!this.container) {
      container = document.createElement('div');
      container.className = layerClassName;
      var style = container.style;
      style.position = 'absolute';
      style.width = '100%';
      style.height = '100%';
      context = (0,_dom_js__WEBPACK_IMPORTED_MODULE_2__/* .createCanvasContext2D */ .E4)();
      var canvas = context.canvas;
      container.appendChild(canvas);
      style = canvas.style;
      style.position = 'absolute';
      style.left = '0';
      style.transformOrigin = 'top left';
      this.container = container;
      this.context = context;
    }
  };
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @param {import("../../extent.js").Extent} extent Clip extent.
   * @protected
   */


  CanvasLayerRenderer.prototype.clipUnrotated = function (context, frameState, extent) {
    var topLeft = (0,_extent_js__WEBPACK_IMPORTED_MODULE_3__/* .getTopLeft */ .rL)(extent);
    var topRight = (0,_extent_js__WEBPACK_IMPORTED_MODULE_3__/* .getTopRight */ .Xv)(extent);
    var bottomRight = (0,_extent_js__WEBPACK_IMPORTED_MODULE_3__/* .getBottomRight */ .w$)(extent);
    var bottomLeft = (0,_extent_js__WEBPACK_IMPORTED_MODULE_3__/* .getBottomLeft */ .hC)(extent);
    (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__/* .apply */ .nn)(frameState.coordinateToPixelTransform, topLeft);
    (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__/* .apply */ .nn)(frameState.coordinateToPixelTransform, topRight);
    (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__/* .apply */ .nn)(frameState.coordinateToPixelTransform, bottomRight);
    (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__/* .apply */ .nn)(frameState.coordinateToPixelTransform, bottomLeft);
    var inverted = this.inversePixelTransform;
    (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__/* .apply */ .nn)(inverted, topLeft);
    (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__/* .apply */ .nn)(inverted, topRight);
    (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__/* .apply */ .nn)(inverted, bottomRight);
    (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__/* .apply */ .nn)(inverted, bottomLeft);
    context.save();
    context.beginPath();
    context.moveTo(Math.round(topLeft[0]), Math.round(topLeft[1]));
    context.lineTo(Math.round(topRight[0]), Math.round(topRight[1]));
    context.lineTo(Math.round(bottomRight[0]), Math.round(bottomRight[1]));
    context.lineTo(Math.round(bottomLeft[0]), Math.round(bottomLeft[1]));
    context.clip();
  };
  /**
   * @param {import("../../render/EventType.js").default} type Event type.
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @private
   */


  CanvasLayerRenderer.prototype.dispatchRenderEvent_ = function (type, context, frameState) {
    var layer = this.getLayer();

    if (layer.hasListener(type)) {
      var event_1 = new _render_Event_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z(type, this.inversePixelTransform, frameState, context);
      layer.dispatchEvent(event_1);
    }
  };
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @protected
   */


  CanvasLayerRenderer.prototype.preRender = function (context, frameState) {
    this.dispatchRenderEvent_(_render_EventType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].PRERENDER */ .Z.PRERENDER, context, frameState);
  };
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @protected
   */


  CanvasLayerRenderer.prototype.postRender = function (context, frameState) {
    this.dispatchRenderEvent_(_render_EventType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].POSTRENDER */ .Z.POSTRENDER, context, frameState);
  };
  /**
   * Creates a transform for rendering to an element that will be rotated after rendering.
   * @param {import("../../coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} width Width of the rendered element (in pixels).
   * @param {number} height Height of the rendered element (in pixels).
   * @param {number} offsetX Offset on the x-axis in view coordinates.
   * @protected
   * @return {!import("../../transform.js").Transform} Transform.
   */


  CanvasLayerRenderer.prototype.getRenderTransform = function (center, resolution, rotation, pixelRatio, width, height, offsetX) {
    var dx1 = width / 2;
    var dy1 = height / 2;
    var sx = pixelRatio / resolution;
    var sy = -sx;
    var dx2 = -center[0] + offsetX;
    var dy2 = -center[1];
    return (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__/* .compose */ .qC)(this.tempTransform, dx1, dy1, sx, sy, -rotation, dx2, dy2);
  };
  /**
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @param {import("../../PluggableMap.js").FrameState} frameState FrameState.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @return {Uint8ClampedArray|Uint8Array} The result.  If there is no data at the pixel
   *    location, null will be returned.  If there is data, but pixel values cannot be
   *    returned, and empty array will be returned.
   */


  CanvasLayerRenderer.prototype.getDataAtPixel = function (pixel, frameState, hitTolerance) {
    var renderPixel = (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__/* .apply */ .nn)(this.inversePixelTransform, pixel.slice());
    var context = this.context;
    var layer = this.getLayer();
    var layerExtent = layer.getExtent();

    if (layerExtent) {
      var renderCoordinate = (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__/* .apply */ .nn)(frameState.pixelToCoordinateTransform, pixel.slice());
      /** get only data inside of the layer extent */

      if (!(0,_extent_js__WEBPACK_IMPORTED_MODULE_3__/* .containsCoordinate */ .b8)(layerExtent, renderCoordinate)) {
        return null;
      }
    }

    var data;

    try {
      var x = Math.round(renderPixel[0]);
      var y = Math.round(renderPixel[1]);
      var newCanvas = document.createElement('canvas');
      var newContext = newCanvas.getContext('2d');
      newCanvas.width = 1;
      newCanvas.height = 1;
      newContext.clearRect(0, 0, 1, 1);
      newContext.drawImage(context.canvas, x, y, 1, 1, 0, 0, 1, 1);
      data = newContext.getImageData(0, 0, 1, 1).data;
    } catch (err) {
      if (err.name === 'SecurityError') {
        // tainted canvas, we assume there is data at the given pixel (although there might not be)
        return new Uint8Array();
      }

      return data;
    }

    if (data[3] === 0) {
      return null;
    }

    return data;
  };

  return CanvasLayerRenderer;
}(_Layer_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasLayerRenderer);

/***/ }),

/***/ 2954:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Layer_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9034);
/* harmony import */ var _TileRange_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3598);
/* harmony import */ var _TileState_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(587);
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8975);
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9800);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1046);
/* harmony import */ var _css_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9285);
/* harmony import */ var _proj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8623);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2618);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3620);
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
 * @module ol/renderer/canvas/TileLayer
 */













/**
 * @classdesc
 * Canvas renderer for tile layers.
 * @api
 */

var CanvasTileLayerRenderer =
/** @class */
function (_super) {
  __extends(CanvasTileLayerRenderer, _super);
  /**
   * @param {import("../../layer/Tile.js").default|import("../../layer/VectorTile.js").default} tileLayer Tile layer.
   */


  function CanvasTileLayerRenderer(tileLayer) {
    var _this = _super.call(this, tileLayer) || this;
    /**
     * Rendered extent has changed since the previous `renderFrame()` call
     * @type {boolean}
     */


    _this.extentChanged = true;
    /**
     * @private
     * @type {?import("../../extent.js").Extent}
     */

    _this.renderedExtent_ = null;
    /**
     * @protected
     * @type {number}
     */

    _this.renderedPixelRatio;
    /**
     * @protected
     * @type {import("../../proj/Projection.js").default}
     */

    _this.renderedProjection = null;
    /**
     * @protected
     * @type {number}
     */

    _this.renderedRevision;
    /**
     * @protected
     * @type {!Array<import("../../Tile.js").default>}
     */

    _this.renderedTiles = [];
    /**
     * @private
     * @type {boolean}
     */

    _this.newTiles_ = false;
    /**
     * @protected
     * @type {import("../../extent.js").Extent}
     */

    _this.tmpExtent = (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .createEmpty */ .lJ)();
    /**
     * @private
     * @type {import("../../TileRange.js").default}
     */

    _this.tmpTileRange_ = new _TileRange_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z(0, 0, 0, 0);
    return _this;
  }
  /**
   * @protected
   * @param {import("../../Tile.js").default} tile Tile.
   * @return {boolean} Tile is drawable.
   */


  CanvasTileLayerRenderer.prototype.isDrawableTile = function (tile) {
    var tileLayer = this.getLayer();
    var tileState = tile.getState();
    var useInterimTilesOnError = tileLayer.getUseInterimTilesOnError();
    return tileState == _TileState_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].LOADED */ .Z.LOADED || tileState == _TileState_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].EMPTY */ .Z.EMPTY || tileState == _TileState_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].ERROR */ .Z.ERROR && !useInterimTilesOnError;
  };
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @return {!import("../../Tile.js").default} Tile.
   */


  CanvasTileLayerRenderer.prototype.getTile = function (z, x, y, frameState) {
    var pixelRatio = frameState.pixelRatio;
    var projection = frameState.viewState.projection;
    var tileLayer = this.getLayer();
    var tileSource = tileLayer.getSource();
    var tile = tileSource.getTile(z, x, y, pixelRatio, projection);

    if (tile.getState() == _TileState_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].ERROR */ .Z.ERROR) {
      if (!tileLayer.getUseInterimTilesOnError()) {
        // When useInterimTilesOnError is false, we consider the error tile as loaded.
        tile.setState(_TileState_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].LOADED */ .Z.LOADED);
      } else if (tileLayer.getPreload() > 0) {
        // Preloaded tiles for lower resolutions might have finished loading.
        this.newTiles_ = true;
      }
    }

    if (!this.isDrawableTile(tile)) {
      tile = tile.getInterimTile();
    }

    return tile;
  };
  /**
   * @param {Object<number, Object<string, import("../../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
   * @param {number} zoom Zoom level.
   * @param {import("../../Tile.js").default} tile Tile.
   * @return {boolean|void} If `false`, the tile will not be considered loaded.
   */


  CanvasTileLayerRenderer.prototype.loadedTileCallback = function (tiles, zoom, tile) {
    if (this.isDrawableTile(tile)) {
      return _super.prototype.loadedTileCallback.call(this, tiles, zoom, tile);
    }

    return false;
  };
  /**
   * Determine whether render should be called.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */


  CanvasTileLayerRenderer.prototype.prepareFrame = function (frameState) {
    return !!this.getLayer().getSource();
  };
  /**
   * Render the layer.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @return {HTMLElement} The rendered element.
   */


  CanvasTileLayerRenderer.prototype.renderFrame = function (frameState, target) {
    var layerState = frameState.layerStatesArray[frameState.layerIndex];
    var viewState = frameState.viewState;
    var projection = viewState.projection;
    var viewResolution = viewState.resolution;
    var viewCenter = viewState.center;
    var rotation = viewState.rotation;
    var pixelRatio = frameState.pixelRatio;
    var tileLayer = this.getLayer();
    var tileSource = tileLayer.getSource();
    var sourceRevision = tileSource.getRevision();
    var tileGrid = tileSource.getTileGridForProjection(projection);
    var z = tileGrid.getZForResolution(viewResolution, tileSource.zDirection);
    var tileResolution = tileGrid.getResolution(z);
    var extent = frameState.extent;
    var layerExtent = layerState.extent && (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .fromUserExtent */ .dY)(layerState.extent, projection);

    if (layerExtent) {
      extent = (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .getIntersection */ .Ed)(extent, (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .fromUserExtent */ .dY)(layerState.extent, projection));
    }

    var tilePixelRatio = tileSource.getTilePixelRatio(pixelRatio); // desired dimensions of the canvas in pixels

    var width = Math.round(frameState.size[0] * tilePixelRatio);
    var height = Math.round(frameState.size[1] * tilePixelRatio);

    if (rotation) {
      var size = Math.round(Math.sqrt(width * width + height * height));
      width = size;
      height = size;
    }

    var dx = tileResolution * width / 2 / tilePixelRatio;
    var dy = tileResolution * height / 2 / tilePixelRatio;
    var canvasExtent = [viewCenter[0] - dx, viewCenter[1] - dy, viewCenter[0] + dx, viewCenter[1] + dy];
    var tileRange = tileGrid.getTileRangeForExtentAndZ(extent, z);
    /**
     * @type {Object<number, Object<string, import("../../Tile.js").default>>}
     */

    var tilesToDrawByZ = {};
    tilesToDrawByZ[z] = {};
    var findLoadedTiles = this.createLoadedTileFinder(tileSource, projection, tilesToDrawByZ);
    var tmpExtent = this.tmpExtent;
    var tmpTileRange = this.tmpTileRange_;
    this.newTiles_ = false;

    for (var x = tileRange.minX; x <= tileRange.maxX; ++x) {
      for (var y = tileRange.minY; y <= tileRange.maxY; ++y) {
        var tile = this.getTile(z, x, y, frameState);

        if (this.isDrawableTile(tile)) {
          var uid = (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .getUid */ .sq)(this);

          if (tile.getState() == _TileState_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].LOADED */ .Z.LOADED) {
            tilesToDrawByZ[z][tile.tileCoord.toString()] = tile;
            var inTransition = tile.inTransition(uid);

            if (!this.newTiles_ && (inTransition || this.renderedTiles.indexOf(tile) === -1)) {
              this.newTiles_ = true;
            }
          }

          if (tile.getAlpha(uid, frameState.time) === 1) {
            // don't look for alt tiles if alpha is 1
            continue;
          }
        }

        var childTileRange = tileGrid.getTileCoordChildTileRange(tile.tileCoord, tmpTileRange, tmpExtent);
        var covered = false;

        if (childTileRange) {
          covered = findLoadedTiles(z + 1, childTileRange);
        }

        if (!covered) {
          tileGrid.forEachTileCoordParentTileRange(tile.tileCoord, findLoadedTiles, tmpTileRange, tmpExtent);
        }
      }
    }

    var canvasScale = tileResolution / viewResolution; // set forward and inverse pixel transforms

    (0,_transform_js__WEBPACK_IMPORTED_MODULE_5__/* .compose */ .qC)(this.pixelTransform, frameState.size[0] / 2, frameState.size[1] / 2, 1 / tilePixelRatio, 1 / tilePixelRatio, rotation, -width / 2, -height / 2);
    var canvasTransform = (0,_transform_js__WEBPACK_IMPORTED_MODULE_5__/* .toString */ .BB)(this.pixelTransform);
    this.useContainer(target, canvasTransform, layerState.opacity);
    var context = this.context;
    var canvas = context.canvas;
    (0,_transform_js__WEBPACK_IMPORTED_MODULE_5__/* .makeInverse */ .nb)(this.inversePixelTransform, this.pixelTransform); // set scale transform for calculating tile positions on the canvas

    (0,_transform_js__WEBPACK_IMPORTED_MODULE_5__/* .compose */ .qC)(this.tempTransform, width / 2, height / 2, canvasScale, canvasScale, 0, -width / 2, -height / 2);

    if (canvas.width != width || canvas.height != height) {
      canvas.width = width;
      canvas.height = height;
    } else if (!this.containerReused) {
      context.clearRect(0, 0, width, height);
    }

    if (layerExtent) {
      this.clipUnrotated(context, frameState, layerExtent);
    }

    (0,_obj_js__WEBPACK_IMPORTED_MODULE_6__/* .assign */ .f0)(context, tileSource.getContextOptions());
    this.preRender(context, frameState);
    this.renderedTiles.length = 0;
    /** @type {Array<number>} */

    var zs = Object.keys(tilesToDrawByZ).map(Number);
    zs.sort(_array_js__WEBPACK_IMPORTED_MODULE_7__/* .numberSafeCompareFunction */ .kK);
    var clips, clipZs, currentClip;

    if (layerState.opacity === 1 && (!this.containerReused || tileSource.getOpaque(frameState.viewState.projection))) {
      zs = zs.reverse();
    } else {
      clips = [];
      clipZs = [];
    }

    for (var i = zs.length - 1; i >= 0; --i) {
      var currentZ = zs[i];
      var currentTilePixelSize = tileSource.getTilePixelSize(currentZ, pixelRatio, projection);
      var currentResolution = tileGrid.getResolution(currentZ);
      var currentScale = currentResolution / tileResolution;
      var dx_1 = currentTilePixelSize[0] * currentScale * canvasScale;
      var dy_1 = currentTilePixelSize[1] * currentScale * canvasScale;
      var originTileCoord = tileGrid.getTileCoordForCoordAndZ((0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .getTopLeft */ .rL)(canvasExtent), currentZ);
      var originTileExtent = tileGrid.getTileCoordExtent(originTileCoord);
      var origin_1 = (0,_transform_js__WEBPACK_IMPORTED_MODULE_5__/* .apply */ .nn)(this.tempTransform, [tilePixelRatio * (originTileExtent[0] - canvasExtent[0]) / tileResolution, tilePixelRatio * (canvasExtent[3] - originTileExtent[3]) / tileResolution]);
      var tileGutter = tilePixelRatio * tileSource.getGutterForProjection(projection);
      var tilesToDraw = tilesToDrawByZ[currentZ];

      for (var tileCoordKey in tilesToDraw) {
        var tile =
        /** @type {import("../../ImageTile.js").default} */
        tilesToDraw[tileCoordKey];
        var tileCoord = tile.tileCoord; // Calculate integer positions and sizes so that tiles align

        var xIndex = originTileCoord[1] - tileCoord[1];
        var nextX = Math.round(origin_1[0] - (xIndex - 1) * dx_1);
        var yIndex = originTileCoord[2] - tileCoord[2];
        var nextY = Math.round(origin_1[1] - (yIndex - 1) * dy_1);
        var x = Math.round(origin_1[0] - xIndex * dx_1);
        var y = Math.round(origin_1[1] - yIndex * dy_1);
        var w = nextX - x;
        var h = nextY - y;
        var transition = z === currentZ;
        var inTransition = transition && tile.getAlpha((0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .getUid */ .sq)(this), frameState.time) !== 1;

        if (!inTransition) {
          if (clips) {
            // Clip mask for regions in this tile that already filled by a higher z tile
            context.save();
            currentClip = [x, y, x + w, y, x + w, y + h, x, y + h];

            for (var i_1 = 0, ii = clips.length; i_1 < ii; ++i_1) {
              if (z !== currentZ && currentZ < clipZs[i_1]) {
                var clip = clips[i_1];
                context.beginPath(); // counter-clockwise (outer ring) for current tile

                context.moveTo(currentClip[0], currentClip[1]);
                context.lineTo(currentClip[2], currentClip[3]);
                context.lineTo(currentClip[4], currentClip[5]);
                context.lineTo(currentClip[6], currentClip[7]); // clockwise (inner ring) for higher z tile

                context.moveTo(clip[6], clip[7]);
                context.lineTo(clip[4], clip[5]);
                context.lineTo(clip[2], clip[3]);
                context.lineTo(clip[0], clip[1]);
                context.clip();
              }
            }

            clips.push(currentClip);
            clipZs.push(currentZ);
          } else {
            context.clearRect(x, y, w, h);
          }
        }

        this.drawTileImage(tile, frameState, x, y, w, h, tileGutter, transition);

        if (clips && !inTransition) {
          context.restore();
          this.renderedTiles.unshift(tile);
        } else {
          this.renderedTiles.push(tile);
        }

        this.updateUsedTiles(frameState.usedTiles, tileSource, tile);
      }
    }

    this.renderedRevision = sourceRevision;
    this.renderedResolution = tileResolution;
    this.extentChanged = !this.renderedExtent_ || !(0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .equals */ .fS)(this.renderedExtent_, canvasExtent);
    this.renderedExtent_ = canvasExtent;
    this.renderedPixelRatio = pixelRatio;
    this.renderedProjection = projection;
    this.manageTilePyramid(frameState, tileSource, tileGrid, pixelRatio, projection, extent, z, tileLayer.getPreload());
    this.scheduleExpireCache(frameState, tileSource);
    this.postRender(context, frameState);

    if (layerState.extent) {
      context.restore();
    }

    if (canvasTransform !== canvas.style.transform) {
      canvas.style.transform = canvasTransform;
    }

    var opacity = (0,_css_js__WEBPACK_IMPORTED_MODULE_8__/* .cssOpacity */ .Xy)(layerState.opacity);
    var container = this.container;

    if (opacity !== container.style.opacity) {
      container.style.opacity = opacity;
    }

    return this.container;
  };
  /**
   * @param {import("../../ImageTile.js").default} tile Tile.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @param {number} x Left of the tile.
   * @param {number} y Top of the tile.
   * @param {number} w Width of the tile.
   * @param {number} h Height of the tile.
   * @param {number} gutter Tile gutter.
   * @param {boolean} transition Apply an alpha transition.
   */


  CanvasTileLayerRenderer.prototype.drawTileImage = function (tile, frameState, x, y, w, h, gutter, transition) {
    var image = this.getTileImage(tile);

    if (!image) {
      return;
    }

    var uid = (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .getUid */ .sq)(this);
    var alpha = transition ? tile.getAlpha(uid, frameState.time) : 1;
    var alphaChanged = alpha !== this.context.globalAlpha;

    if (alphaChanged) {
      this.context.save();
      this.context.globalAlpha = alpha;
    }

    this.context.drawImage(image, gutter, gutter, image.width - 2 * gutter, image.height - 2 * gutter, x, y, w, h);

    if (alphaChanged) {
      this.context.restore();
    }

    if (alpha !== 1) {
      frameState.animate = true;
    } else if (transition) {
      tile.endTransition(uid);
    }
  };
  /**
   * @return {HTMLCanvasElement} Image
   */


  CanvasTileLayerRenderer.prototype.getImage = function () {
    var context = this.context;
    return context ? context.canvas : null;
  };
  /**
   * Get the image from a tile.
   * @param {import("../../ImageTile.js").default} tile Tile.
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @protected
   */


  CanvasTileLayerRenderer.prototype.getTileImage = function (tile) {
    return tile.getImage();
  };
  /**
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @param {import("../../source/Tile.js").default} tileSource Tile source.
   * @protected
   */


  CanvasTileLayerRenderer.prototype.scheduleExpireCache = function (frameState, tileSource) {
    if (tileSource.canExpireCache()) {
      /**
       * @param {import("../../source/Tile.js").default} tileSource Tile source.
       * @param {import("../../PluggableMap.js").default} map Map.
       * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
       */
      var postRenderFunction = function (tileSource, map, frameState) {
        var tileSourceKey = (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .getUid */ .sq)(tileSource);

        if (tileSourceKey in frameState.usedTiles) {
          tileSource.expireCache(frameState.viewState.projection, frameState.usedTiles[tileSourceKey]);
        }
      }.bind(null, tileSource);

      frameState.postRenderFunctions.push(
      /** @type {import("../../PluggableMap.js").PostRenderFunction} */
      postRenderFunction);
    }
  };
  /**
   * @param {!Object<string, !Object<string, boolean>>} usedTiles Used tiles.
   * @param {import("../../source/Tile.js").default} tileSource Tile source.
   * @param {import('../../Tile.js').default} tile Tile.
   * @protected
   */


  CanvasTileLayerRenderer.prototype.updateUsedTiles = function (usedTiles, tileSource, tile) {
    // FIXME should we use tilesToDrawByZ instead?
    var tileSourceKey = (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .getUid */ .sq)(tileSource);

    if (!(tileSourceKey in usedTiles)) {
      usedTiles[tileSourceKey] = {};
    }

    usedTiles[tileSourceKey][tile.getKey()] = true;
  };
  /**
   * Manage tile pyramid.
   * This function performs a number of functions related to the tiles at the
   * current zoom and lower zoom levels:
   * - registers idle tiles in frameState.wantedTiles so that they are not
   *   discarded by the tile queue
   * - enqueues missing tiles
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @param {import("../../source/Tile.js").default} tileSource Tile source.
   * @param {import("../../tilegrid/TileGrid.js").default} tileGrid Tile grid.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../../proj/Projection.js").default} projection Projection.
   * @param {import("../../extent.js").Extent} extent Extent.
   * @param {number} currentZ Current Z.
   * @param {number} preload Load low resolution tiles up to 'preload' levels.
   * @param {function(import("../../Tile.js").default):void} [opt_tileCallback] Tile callback.
   * @protected
   */


  CanvasTileLayerRenderer.prototype.manageTilePyramid = function (frameState, tileSource, tileGrid, pixelRatio, projection, extent, currentZ, preload, opt_tileCallback) {
    var tileSourceKey = (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .getUid */ .sq)(tileSource);

    if (!(tileSourceKey in frameState.wantedTiles)) {
      frameState.wantedTiles[tileSourceKey] = {};
    }

    var wantedTiles = frameState.wantedTiles[tileSourceKey];
    var tileQueue = frameState.tileQueue;
    var minZoom = tileGrid.getMinZoom();
    var tileCount = 0;
    var tile, tileRange, tileResolution, x, y, z;

    for (z = minZoom; z <= currentZ; ++z) {
      tileRange = tileGrid.getTileRangeForExtentAndZ(extent, z, tileRange);
      tileResolution = tileGrid.getResolution(z);

      for (x = tileRange.minX; x <= tileRange.maxX; ++x) {
        for (y = tileRange.minY; y <= tileRange.maxY; ++y) {
          if (currentZ - z <= preload) {
            ++tileCount;
            tile = tileSource.getTile(z, x, y, pixelRatio, projection);

            if (tile.getState() == _TileState_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].IDLE */ .Z.IDLE) {
              wantedTiles[tile.getKey()] = true;

              if (!tileQueue.isKeyQueued(tile.getKey())) {
                tileQueue.enqueue([tile, tileSourceKey, tileGrid.getTileCoordCenter(tile.tileCoord), tileResolution]);
              }
            }

            if (opt_tileCallback !== undefined) {
              opt_tileCallback(tile);
            }
          } else {
            tileSource.useTile(z, x, y, projection);
          }
        }
      }
    }

    tileSource.updateCacheSize(tileCount, projection);
  };

  return CanvasTileLayerRenderer;
}(_Layer_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z);
/**
 * @function
 * @return {import("../../layer/Tile.js").default|import("../../layer/VectorTile.js").default}
 */


CanvasTileLayerRenderer.prototype.getLayer;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasTileLayerRenderer);

/***/ }),

/***/ 8513:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _render_canvas_BuilderGroup_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6280);
/* harmony import */ var _Layer_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9034);
/* harmony import */ var _render_canvas_ExecutorGroup_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1283);
/* harmony import */ var _ViewHint_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1840);
/* harmony import */ var _render_canvas_hitdetect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2005);
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8975);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1046);
/* harmony import */ var _css_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9285);
/* harmony import */ var _vector_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8907);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3620);
/* harmony import */ var _proj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8623);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2618);
/* harmony import */ var _coordinate_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4413);
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
 * @module ol/renderer/canvas/VectorLayer
 */















/**
 * @classdesc
 * Canvas renderer for vector layers.
 * @api
 */

var CanvasVectorLayerRenderer =
/** @class */
function (_super) {
  __extends(CanvasVectorLayerRenderer, _super);
  /**
   * @param {import("../../layer/Vector.js").default} vectorLayer Vector layer.
   */


  function CanvasVectorLayerRenderer(vectorLayer) {
    var _this = _super.call(this, vectorLayer) || this;
    /** @private */


    _this.boundHandleStyleImageChange_ = _this.handleStyleImageChange_.bind(_this);
    /**
     * @type {boolean}
     */

    _this.animatingOrInteracting_;
    /**
     * @private
     * @type {boolean}
     */

    _this.dirty_ = false;
    /**
     * @type {ImageData}
     */

    _this.hitDetectionImageData_ = null;
    /**
     * @type {Array<import("../../Feature.js").default>}
     */

    _this.renderedFeatures_ = null;
    /**
     * @private
     * @type {number}
     */

    _this.renderedRevision_ = -1;
    /**
     * @private
     * @type {number}
     */

    _this.renderedResolution_ = NaN;
    /**
     * @private
     * @type {import("../../extent.js").Extent}
     */

    _this.renderedExtent_ = (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .createEmpty */ .lJ)();
    /**
     * @private
     * @type {import("../../extent.js").Extent}
     */

    _this.wrappedRenderedExtent_ = (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .createEmpty */ .lJ)();
    /**
     * @private
     * @type {number}
     */

    _this.renderedRotation_;
    /**
     * @private
     * @type {import("../../coordinate").Coordinate}
     */

    _this.renderedCenter_ = null;
    /**
     * @private
     * @type {import("../../proj/Projection").default}
     */

    _this.renderedProjection_ = null;
    /**
     * @private
     * @type {function(import("../../Feature.js").default, import("../../Feature.js").default): number|null}
     */

    _this.renderedRenderOrder_ = null;
    /**
     * @private
     * @type {import("../../render/canvas/ExecutorGroup").default}
     */

    _this.replayGroup_ = null;
    /**
     * A new replay group had to be created by `prepareFrame()`
     * @type {boolean}
     */

    _this.replayGroupChanged = true;
    /**
     * @type {import("../../render/canvas/ExecutorGroup").default}
     */

    _this.declutterExecutorGroup = null;
    /**
     * Clipping to be performed by `renderFrame()`
     * @type {boolean}
     */

    _this.clipping = true;
    return _this;
  }
  /**
   * Get a rendering container from an existing target, if compatible.
   * @param {HTMLElement} target Potential render target.
   * @param {string} transform CSS Transform.
   * @param {number} opacity Opacity.
   */


  CanvasVectorLayerRenderer.prototype.useContainer = function (target, transform, opacity) {
    if (opacity < 1) {
      target = null;
    }

    _super.prototype.useContainer.call(this, target, transform, opacity);
  };
  /**
   * @param {ExecutorGroup} executorGroup Executor group.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @param {import("rbush").default} [opt_declutterTree] Declutter tree.
   */


  CanvasVectorLayerRenderer.prototype.renderWorlds = function (executorGroup, frameState, opt_declutterTree) {
    var extent = frameState.extent;
    var viewState = frameState.viewState;
    var center = viewState.center;
    var resolution = viewState.resolution;
    var projection = viewState.projection;
    var rotation = viewState.rotation;
    var projectionExtent = projection.getExtent();
    var vectorSource = this.getLayer().getSource();
    var pixelRatio = frameState.pixelRatio;
    var viewHints = frameState.viewHints;
    var snapToPixel = !(viewHints[_ViewHint_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].ANIMATING */ .Z.ANIMATING] || viewHints[_ViewHint_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].INTERACTING */ .Z.INTERACTING]);
    var context = this.context;
    var width = Math.round(frameState.size[0] * pixelRatio);
    var height = Math.round(frameState.size[1] * pixelRatio);
    var multiWorld = vectorSource.getWrapX() && projection.canWrapX();
    var worldWidth = multiWorld ? (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .getWidth */ .dz)(projectionExtent) : null;
    var endWorld = multiWorld ? Math.ceil((extent[2] - projectionExtent[2]) / worldWidth) + 1 : 1;
    var world = multiWorld ? Math.floor((extent[0] - projectionExtent[0]) / worldWidth) : 0;

    do {
      var transform = this.getRenderTransform(center, resolution, rotation, pixelRatio, width, height, world * worldWidth);
      executorGroup.execute(context, 1, transform, rotation, snapToPixel, undefined, opt_declutterTree);
    } while (++world < endWorld);
  };
  /**
   * Render declutter items for this layer
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   */


  CanvasVectorLayerRenderer.prototype.renderDeclutter = function (frameState) {
    if (this.declutterExecutorGroup) {
      this.renderWorlds(this.declutterExecutorGroup, frameState, frameState.declutterTree);
    }
  };
  /**
   * Render the layer.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @return {HTMLElement} The rendered element.
   */


  CanvasVectorLayerRenderer.prototype.renderFrame = function (frameState, target) {
    var pixelRatio = frameState.pixelRatio;
    var layerState = frameState.layerStatesArray[frameState.layerIndex]; // set forward and inverse pixel transforms

    (0,_transform_js__WEBPACK_IMPORTED_MODULE_3__/* .makeScale */ .n3)(this.pixelTransform, 1 / pixelRatio, 1 / pixelRatio);
    (0,_transform_js__WEBPACK_IMPORTED_MODULE_3__/* .makeInverse */ .nb)(this.inversePixelTransform, this.pixelTransform);
    var canvasTransform = (0,_transform_js__WEBPACK_IMPORTED_MODULE_3__/* .toString */ .BB)(this.pixelTransform);
    this.useContainer(target, canvasTransform, layerState.opacity);
    var context = this.context;
    var canvas = context.canvas;
    var replayGroup = this.replayGroup_;
    var declutterExecutorGroup = this.declutterExecutorGroup;

    if ((!replayGroup || replayGroup.isEmpty()) && (!declutterExecutorGroup || declutterExecutorGroup.isEmpty())) {
      return null;
    } // resize and clear


    var width = Math.round(frameState.size[0] * pixelRatio);
    var height = Math.round(frameState.size[1] * pixelRatio);

    if (canvas.width != width || canvas.height != height) {
      canvas.width = width;
      canvas.height = height;

      if (canvas.style.transform !== canvasTransform) {
        canvas.style.transform = canvasTransform;
      }
    } else if (!this.containerReused) {
      context.clearRect(0, 0, width, height);
    }

    this.preRender(context, frameState);
    var viewState = frameState.viewState;
    var projection = viewState.projection; // clipped rendering if layer extent is set

    var clipped = false;
    var render = true;

    if (layerState.extent && this.clipping) {
      var layerExtent = (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .fromUserExtent */ .dY)(layerState.extent, projection);
      render = (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .intersects */ .kK)(layerExtent, frameState.extent);
      clipped = render && !(0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .containsExtent */ .r4)(layerExtent, frameState.extent);

      if (clipped) {
        this.clipUnrotated(context, frameState, layerExtent);
      }
    }

    if (render) {
      this.renderWorlds(replayGroup, frameState);
    }

    if (clipped) {
      context.restore();
    }

    this.postRender(context, frameState);
    var opacity = (0,_css_js__WEBPACK_IMPORTED_MODULE_4__/* .cssOpacity */ .Xy)(layerState.opacity);
    var container = this.container;

    if (opacity !== container.style.opacity) {
      container.style.opacity = opacity;
    }

    if (this.renderedRotation_ !== viewState.rotation) {
      this.renderedRotation_ = viewState.rotation;
      this.hitDetectionImageData_ = null;
    }

    return this.container;
  };
  /**
   * Asynchronous layer level hit detection.
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../../Feature").default>>} Promise that resolves with an array of features.
   */


  CanvasVectorLayerRenderer.prototype.getFeatures = function (pixel) {
    return new Promise(
    /**
     * @param {function(Array<import("../../Feature").default|import("../../render/Feature").default>): void} resolve Resolver function.
     * @this {CanvasVectorLayerRenderer}
     */
    function (resolve) {
      if (!this.hitDetectionImageData_ && !this.animatingOrInteracting_) {
        var size = [this.context.canvas.width, this.context.canvas.height];
        (0,_transform_js__WEBPACK_IMPORTED_MODULE_3__/* .apply */ .nn)(this.pixelTransform, size);
        var center = this.renderedCenter_;
        var resolution = this.renderedResolution_;
        var rotation = this.renderedRotation_;
        var projection = this.renderedProjection_;
        var extent = this.wrappedRenderedExtent_;
        var layer = this.getLayer();
        var transforms = [];
        var width = size[0] * _render_canvas_hitdetect_js__WEBPACK_IMPORTED_MODULE_5__/* .HIT_DETECT_RESOLUTION */ .UN;
        var height = size[1] * _render_canvas_hitdetect_js__WEBPACK_IMPORTED_MODULE_5__/* .HIT_DETECT_RESOLUTION */ .UN;
        transforms.push(this.getRenderTransform(center, resolution, rotation, _render_canvas_hitdetect_js__WEBPACK_IMPORTED_MODULE_5__/* .HIT_DETECT_RESOLUTION */ .UN, width, height, 0).slice());
        var source = layer.getSource();
        var projectionExtent = projection.getExtent();

        if (source.getWrapX() && projection.canWrapX() && !(0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .containsExtent */ .r4)(projectionExtent, extent)) {
          var startX = extent[0];
          var worldWidth = (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .getWidth */ .dz)(projectionExtent);
          var world = 0;
          var offsetX = void 0;

          while (startX < projectionExtent[0]) {
            --world;
            offsetX = worldWidth * world;
            transforms.push(this.getRenderTransform(center, resolution, rotation, _render_canvas_hitdetect_js__WEBPACK_IMPORTED_MODULE_5__/* .HIT_DETECT_RESOLUTION */ .UN, width, height, offsetX).slice());
            startX += worldWidth;
          }

          world = 0;
          startX = extent[2];

          while (startX > projectionExtent[2]) {
            ++world;
            offsetX = worldWidth * world;
            transforms.push(this.getRenderTransform(center, resolution, rotation, _render_canvas_hitdetect_js__WEBPACK_IMPORTED_MODULE_5__/* .HIT_DETECT_RESOLUTION */ .UN, width, height, offsetX).slice());
            startX -= worldWidth;
          }
        }

        this.hitDetectionImageData_ = (0,_render_canvas_hitdetect_js__WEBPACK_IMPORTED_MODULE_5__/* .createHitDetectionImageData */ .TU)(size, transforms, this.renderedFeatures_, layer.getStyleFunction(), extent, resolution, rotation);
      }

      resolve((0,_render_canvas_hitdetect_js__WEBPACK_IMPORTED_MODULE_5__/* .hitDetect */ .ix)(pixel, this.renderedFeatures_, this.hitDetectionImageData_));
    }.bind(this));
  };
  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("../vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("../Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   */


  CanvasVectorLayerRenderer.prototype.forEachFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, callback, matches) {
    var _this = this;

    if (!this.replayGroup_) {
      return undefined;
    }

    var resolution = frameState.viewState.resolution;
    var rotation = frameState.viewState.rotation;
    var layer = this.getLayer();
    /** @type {!Object<string, import("../Map.js").HitMatch<T>|true>} */

    var features = {};
    /**
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     * @param {import("../../geom/SimpleGeometry.js").default} geometry Geometry.
     * @param {number} distanceSq The squared distance to the click position
     * @return {T|undefined} Callback result.
     */

    var featureCallback = function (feature, geometry, distanceSq) {
      var key = (0,_util_js__WEBPACK_IMPORTED_MODULE_6__/* .getUid */ .sq)(feature);
      var match = features[key];

      if (!match) {
        if (distanceSq === 0) {
          features[key] = true;
          return callback(feature, layer, geometry);
        }

        matches.push(features[key] = {
          feature: feature,
          layer: layer,
          geometry: geometry,
          distanceSq: distanceSq,
          callback: callback
        });
      } else if (match !== true && distanceSq < match.distanceSq) {
        if (distanceSq === 0) {
          features[key] = true;
          matches.splice(matches.lastIndexOf(match), 1);
          return callback(feature, layer, geometry);
        }

        match.geometry = geometry;
        match.distanceSq = distanceSq;
      }

      return undefined;
    };

    var result;
    var executorGroups = [this.replayGroup_];

    if (this.declutterExecutorGroup) {
      executorGroups.push(this.declutterExecutorGroup);
    }

    executorGroups.some(function (executorGroup) {
      return result = executorGroup.forEachFeatureAtCoordinate(coordinate, resolution, rotation, hitTolerance, featureCallback, executorGroup === _this.declutterExecutorGroup ? frameState.declutterTree.all().map(function (item) {
        return item.value;
      }) : null);
    });
    return result;
  };
  /**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   */


  CanvasVectorLayerRenderer.prototype.handleFontsChanged = function () {
    var layer = this.getLayer();

    if (layer.getVisible() && this.replayGroup_) {
      layer.changed();
    }
  };
  /**
   * Handle changes in image style state.
   * @param {import("../../events/Event.js").default} event Image style change event.
   * @private
   */


  CanvasVectorLayerRenderer.prototype.handleStyleImageChange_ = function (event) {
    this.renderIfReadyAndVisible();
  };
  /**
   * Determine whether render should be called.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */


  CanvasVectorLayerRenderer.prototype.prepareFrame = function (frameState) {
    var vectorLayer = this.getLayer();
    var vectorSource = vectorLayer.getSource();

    if (!vectorSource) {
      return false;
    }

    var animating = frameState.viewHints[_ViewHint_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].ANIMATING */ .Z.ANIMATING];
    var interacting = frameState.viewHints[_ViewHint_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].INTERACTING */ .Z.INTERACTING];
    var updateWhileAnimating = vectorLayer.getUpdateWhileAnimating();
    var updateWhileInteracting = vectorLayer.getUpdateWhileInteracting();

    if (!this.dirty_ && !updateWhileAnimating && animating || !updateWhileInteracting && interacting) {
      this.animatingOrInteracting_ = true;
      return true;
    }

    this.animatingOrInteracting_ = false;
    var frameStateExtent = frameState.extent;
    var viewState = frameState.viewState;
    var projection = viewState.projection;
    var resolution = viewState.resolution;
    var pixelRatio = frameState.pixelRatio;
    var vectorLayerRevision = vectorLayer.getRevision();
    var vectorLayerRenderBuffer = vectorLayer.getRenderBuffer();
    var vectorLayerRenderOrder = vectorLayer.getRenderOrder();

    if (vectorLayerRenderOrder === undefined) {
      vectorLayerRenderOrder = _vector_js__WEBPACK_IMPORTED_MODULE_7__/* .defaultOrder */ .eR;
    }

    var center = viewState.center.slice();
    var extent = (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .buffer */ .f3)(frameStateExtent, vectorLayerRenderBuffer * resolution);
    var renderedExtent = extent.slice();
    var loadExtents = [extent.slice()];
    var projectionExtent = projection.getExtent();

    if (vectorSource.getWrapX() && projection.canWrapX() && !(0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .containsExtent */ .r4)(projectionExtent, frameState.extent)) {
      // For the replay group, we need an extent that intersects the real world
      // (-180° to +180°). To support geometries in a coordinate range from -540°
      // to +540°, we add at least 1 world width on each side of the projection
      // extent. If the viewport is wider than the world, we need to add half of
      // the viewport width to make sure we cover the whole viewport.
      var worldWidth = (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .getWidth */ .dz)(projectionExtent);
      var gutter = Math.max((0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .getWidth */ .dz)(extent) / 2, worldWidth);
      extent[0] = projectionExtent[0] - gutter;
      extent[2] = projectionExtent[2] + gutter;
      (0,_coordinate_js__WEBPACK_IMPORTED_MODULE_8__/* .wrapX */ .Cf)(center, projection);
      var loadExtent = (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .wrapX */ .Cf)(loadExtents[0], projection); // If the extent crosses the date line, we load data for both edges of the worlds

      if (loadExtent[0] < projectionExtent[0] && loadExtent[2] < projectionExtent[2]) {
        loadExtents.push([loadExtent[0] + worldWidth, loadExtent[1], loadExtent[2] + worldWidth, loadExtent[3]]);
      } else if (loadExtent[0] > projectionExtent[0] && loadExtent[2] > projectionExtent[2]) {
        loadExtents.push([loadExtent[0] - worldWidth, loadExtent[1], loadExtent[2] - worldWidth, loadExtent[3]]);
      }
    }

    if (!this.dirty_ && this.renderedResolution_ == resolution && this.renderedRevision_ == vectorLayerRevision && this.renderedRenderOrder_ == vectorLayerRenderOrder && (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .containsExtent */ .r4)(this.wrappedRenderedExtent_, extent)) {
      if (!(0,_array_js__WEBPACK_IMPORTED_MODULE_9__/* .equals */ .fS)(this.renderedExtent_, renderedExtent)) {
        this.hitDetectionImageData_ = null;
        this.renderedExtent_ = renderedExtent;
      }

      this.renderedCenter_ = center;
      this.replayGroupChanged = false;
      return true;
    }

    this.replayGroup_ = null;
    this.dirty_ = false;
    var replayGroup = new _render_canvas_BuilderGroup_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z((0,_vector_js__WEBPACK_IMPORTED_MODULE_7__/* .getTolerance */ .Qz)(resolution, pixelRatio), extent, resolution, pixelRatio);
    var declutterBuilderGroup;

    if (this.getLayer().getDeclutter()) {
      declutterBuilderGroup = new _render_canvas_BuilderGroup_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z((0,_vector_js__WEBPACK_IMPORTED_MODULE_7__/* .getTolerance */ .Qz)(resolution, pixelRatio), extent, resolution, pixelRatio);
    }

    var userProjection = (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .getUserProjection */ .Cs)();
    var userTransform;

    if (userProjection) {
      for (var i = 0, ii = loadExtents.length; i < ii; ++i) {
        var extent_1 = loadExtents[i];
        var userExtent_1 = (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .toUserExtent */ .Fj)(extent_1, projection);
        vectorSource.loadFeatures(userExtent_1, (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .toUserResolution */ .on)(resolution, projection), userProjection);
      }

      userTransform = (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .getTransformFromProjections */ .WO)(userProjection, projection);
    } else {
      for (var i = 0, ii = loadExtents.length; i < ii; ++i) {
        vectorSource.loadFeatures(loadExtents[i], resolution, projection);
      }
    }

    var squaredTolerance = (0,_vector_js__WEBPACK_IMPORTED_MODULE_7__/* .getSquaredTolerance */ .se)(resolution, pixelRatio);

    var render =
    /**
     * @param {import("../../Feature.js").default} feature Feature.
     * @this {CanvasVectorLayerRenderer}
     */
    function (feature) {
      var styles;
      var styleFunction = feature.getStyleFunction() || vectorLayer.getStyleFunction();

      if (styleFunction) {
        styles = styleFunction(feature, resolution);
      }

      if (styles) {
        var dirty = this.renderFeature(feature, squaredTolerance, styles, replayGroup, userTransform, declutterBuilderGroup);
        this.dirty_ = this.dirty_ || dirty;
      }
    }.bind(this);

    var userExtent = (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .toUserExtent */ .Fj)(extent, projection);
    /** @type {Array<import("../../Feature.js").default>} */

    var features = vectorSource.getFeaturesInExtent(userExtent);

    if (vectorLayerRenderOrder) {
      features.sort(vectorLayerRenderOrder);
    }

    for (var i = 0, ii = features.length; i < ii; ++i) {
      render(features[i]);
    }

    this.renderedFeatures_ = features;
    var replayGroupInstructions = replayGroup.finish();
    var executorGroup = new _render_canvas_ExecutorGroup_js__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z(extent, resolution, pixelRatio, vectorSource.getOverlaps(), replayGroupInstructions, vectorLayer.getRenderBuffer());

    if (declutterBuilderGroup) {
      this.declutterExecutorGroup = new _render_canvas_ExecutorGroup_js__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z(extent, resolution, pixelRatio, vectorSource.getOverlaps(), declutterBuilderGroup.finish(), vectorLayer.getRenderBuffer());
    }

    this.renderedResolution_ = resolution;
    this.renderedRevision_ = vectorLayerRevision;
    this.renderedRenderOrder_ = vectorLayerRenderOrder;
    this.renderedExtent_ = renderedExtent;
    this.wrappedRenderedExtent_ = extent;
    this.renderedCenter_ = center;
    this.renderedProjection_ = projection;
    this.replayGroup_ = executorGroup;
    this.hitDetectionImageData_ = null;
    this.replayGroupChanged = true;
    return true;
  };
  /**
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {number} squaredTolerance Squared render tolerance.
   * @param {import("../../style/Style.js").default|Array<import("../../style/Style.js").default>} styles The style or array of styles.
   * @param {import("../../render/canvas/BuilderGroup.js").default} builderGroup Builder group.
   * @param {import("../../proj.js").TransformFunction} [opt_transform] Transform from user to view projection.
   * @param {import("../../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
   * @return {boolean} `true` if an image is loading.
   */


  CanvasVectorLayerRenderer.prototype.renderFeature = function (feature, squaredTolerance, styles, builderGroup, opt_transform, opt_declutterBuilderGroup) {
    if (!styles) {
      return false;
    }

    var loading = false;

    if (Array.isArray(styles)) {
      for (var i = 0, ii = styles.length; i < ii; ++i) {
        loading = (0,_vector_js__WEBPACK_IMPORTED_MODULE_7__/* .renderFeature */ .Pn)(builderGroup, feature, styles[i], squaredTolerance, this.boundHandleStyleImageChange_, opt_transform, opt_declutterBuilderGroup) || loading;
      }
    } else {
      loading = (0,_vector_js__WEBPACK_IMPORTED_MODULE_7__/* .renderFeature */ .Pn)(builderGroup, feature, styles, squaredTolerance, this.boundHandleStyleImageChange_, opt_transform, opt_declutterBuilderGroup);
    }

    return loading;
  };

  return CanvasVectorLayerRenderer;
}(_Layer_js__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasVectorLayerRenderer);

/***/ }),

/***/ 4559:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _render_canvas_BuilderGroup_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6280);
/* harmony import */ var _render_canvas_ExecutorGroup_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1283);
/* harmony import */ var _TileLayer_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(2954);
/* harmony import */ var _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6175);
/* harmony import */ var _TileState_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(587);
/* harmony import */ var _layer_VectorTileRenderType_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9842);
/* harmony import */ var _ViewHint_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1840);
/* harmony import */ var _render_canvas_hitdetect_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(2005);
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8975);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1046);
/* harmony import */ var _vector_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8907);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2618);
/* harmony import */ var _size_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7218);
/* harmony import */ var _coordinate_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4413);
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
 * @module ol/renderer/canvas/VectorTileLayer
 */
















/**
 * @type {!Object<string, Array<import("../../render/canvas/BuilderType.js").default>>}
 */

var IMAGE_REPLAYS = {
  'image': [_render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].POLYGON */ .Z.POLYGON, _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].CIRCLE */ .Z.CIRCLE, _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].LINE_STRING */ .Z.LINE_STRING, _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].IMAGE */ .Z.IMAGE, _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].TEXT */ .Z.TEXT],
  'hybrid': [_render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].POLYGON */ .Z.POLYGON, _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].LINE_STRING */ .Z.LINE_STRING],
  'vector': []
};
/**
 * @type {!Object<string, Array<import("../../render/canvas/BuilderType.js").default>>}
 */

var VECTOR_REPLAYS = {
  'hybrid': [_render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].IMAGE */ .Z.IMAGE, _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].TEXT */ .Z.TEXT, _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].DEFAULT */ .Z.DEFAULT],
  'vector': [_render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].POLYGON */ .Z.POLYGON, _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].CIRCLE */ .Z.CIRCLE, _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].LINE_STRING */ .Z.LINE_STRING, _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].IMAGE */ .Z.IMAGE, _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].TEXT */ .Z.TEXT, _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].DEFAULT */ .Z.DEFAULT]
};
/**
 * @classdesc
 * Canvas renderer for vector tile layers.
 * @api
 */

var CanvasVectorTileLayerRenderer =
/** @class */
function (_super) {
  __extends(CanvasVectorTileLayerRenderer, _super);
  /**
   * @param {import("../../layer/VectorTile.js").default} layer VectorTile layer.
   */


  function CanvasVectorTileLayerRenderer(layer) {
    var _this = _super.call(this, layer) || this;
    /** @private */


    _this.boundHandleStyleImageChange_ = _this.handleStyleImageChange_.bind(_this);
    /**
     * @private
     * @type {boolean}
     */

    _this.dirty_ = false;
    /**
     * @private
     * @type {number}
     */

    _this.renderedLayerRevision_;
    /**
     * @private
     * @type {import("../../transform").Transform}
     */

    _this.renderedPixelToCoordinateTransform_ = null;
    /**
     * @private
     * @type {number}
     */

    _this.renderedRotation_;
    /**
     * @private
     * @type {import("../../transform.js").Transform}
     */

    _this.tmpTransform_ = (0,_transform_js__WEBPACK_IMPORTED_MODULE_1__/* .create */ .Ue)();
    return _this;
  }
  /**
   * @param {import("../../VectorRenderTile.js").default} tile Tile.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../../proj/Projection").default} projection Projection.
   * @return {boolean|undefined} Tile needs to be rendered.
   */


  CanvasVectorTileLayerRenderer.prototype.prepareTile = function (tile, pixelRatio, projection) {
    var render;
    var state = tile.getState();

    if (state === _TileState_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].LOADED */ .Z.LOADED || state === _TileState_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].ERROR */ .Z.ERROR) {
      this.updateExecutorGroup_(tile, pixelRatio, projection);

      if (this.tileImageNeedsRender_(tile)) {
        render = true;
      }
    }

    return render;
  };
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @return {!import("../../Tile.js").default} Tile.
   */


  CanvasVectorTileLayerRenderer.prototype.getTile = function (z, x, y, frameState) {
    var pixelRatio = frameState.pixelRatio;
    var viewState = frameState.viewState;
    var resolution = viewState.resolution;
    var projection = viewState.projection;
    var layer = this.getLayer();
    var tile = layer.getSource().getTile(z, x, y, pixelRatio, projection);
    var viewHints = frameState.viewHints;
    var hifi = !(viewHints[_ViewHint_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].ANIMATING */ .Z.ANIMATING] || viewHints[_ViewHint_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].INTERACTING */ .Z.INTERACTING]);

    if (hifi || !tile.wantedResolution) {
      tile.wantedResolution = resolution;
    }

    var render = this.prepareTile(tile, pixelRatio, projection);

    if (render && (hifi || Date.now() - frameState.time < 8) && layer.getRenderMode() !== _layer_VectorTileRenderType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].VECTOR */ .Z.VECTOR) {
      this.renderTileImage_(tile, frameState);
    }

    return _super.prototype.getTile.call(this, z, x, y, frameState);
  };
  /**
   * @param {import("../../VectorRenderTile.js").default} tile Tile.
   * @return {boolean} Tile is drawable.
   */


  CanvasVectorTileLayerRenderer.prototype.isDrawableTile = function (tile) {
    var layer = this.getLayer();
    return _super.prototype.isDrawableTile.call(this, tile) && (layer.getRenderMode() === _layer_VectorTileRenderType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].VECTOR */ .Z.VECTOR ? (0,_util_js__WEBPACK_IMPORTED_MODULE_5__/* .getUid */ .sq)(layer) in tile.executorGroups : tile.hasContext(layer));
  };
  /**
   * @inheritDoc
   */


  CanvasVectorTileLayerRenderer.prototype.getTileImage = function (tile) {
    return tile.getImage(this.getLayer());
  };
  /**
   * Determine whether render should be called.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */


  CanvasVectorTileLayerRenderer.prototype.prepareFrame = function (frameState) {
    var layerRevision = this.getLayer().getRevision();

    if (this.renderedLayerRevision_ != layerRevision) {
      this.renderedTiles.length = 0;
    }

    this.renderedLayerRevision_ = layerRevision;
    return _super.prototype.prepareFrame.call(this, frameState);
  };
  /**
   * @param {import("../../VectorRenderTile.js").default} tile Tile.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../../proj/Projection.js").default} projection Projection.
   * @private
   */


  CanvasVectorTileLayerRenderer.prototype.updateExecutorGroup_ = function (tile, pixelRatio, projection) {
    var layer =
    /** @type {import("../../layer/VectorTile.js").default} */
    this.getLayer();
    var revision = layer.getRevision();
    var renderOrder = layer.getRenderOrder() || null;
    var resolution = tile.wantedResolution;
    var builderState = tile.getReplayState(layer);

    if (!builderState.dirty && builderState.renderedResolution === resolution && builderState.renderedRevision == revision && builderState.renderedRenderOrder == renderOrder) {
      return;
    }

    var source = layer.getSource();
    var declutter = layer.getDeclutter();
    var sourceTileGrid = source.getTileGrid();
    var tileGrid = source.getTileGridForProjection(projection);
    var tileExtent = tileGrid.getTileCoordExtent(tile.wrappedTileCoord);
    var sourceTiles = source.getSourceTiles(pixelRatio, projection, tile);
    var layerUid = (0,_util_js__WEBPACK_IMPORTED_MODULE_5__/* .getUid */ .sq)(layer);
    delete tile.hitDetectionImageData[layerUid];
    tile.executorGroups[layerUid] = [];

    if (declutter) {
      tile.declutterExecutorGroups[layerUid] = [];
    }

    var _loop_1 = function (t, tt) {
      var sourceTile = sourceTiles[t];

      if (sourceTile.getState() != _TileState_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].LOADED */ .Z.LOADED) {
        return "continue";
      }

      var sourceTileCoord = sourceTile.tileCoord;
      var sourceTileExtent = sourceTileGrid.getTileCoordExtent(sourceTileCoord);
      var sharedExtent = (0,_extent_js__WEBPACK_IMPORTED_MODULE_6__/* .getIntersection */ .Ed)(tileExtent, sourceTileExtent);
      var builderExtent = (0,_extent_js__WEBPACK_IMPORTED_MODULE_6__/* .buffer */ .f3)(sharedExtent, layer.getRenderBuffer() * resolution, this_1.tmpExtent);
      var bufferedExtent = (0,_extent_js__WEBPACK_IMPORTED_MODULE_6__/* .equals */ .fS)(sourceTileExtent, sharedExtent) ? null : builderExtent;
      builderState.dirty = false;
      var builderGroup = new _render_canvas_BuilderGroup_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z(0, builderExtent, resolution, pixelRatio);
      var declutterBuilderGroup = declutter ? new _render_canvas_BuilderGroup_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z(0, sharedExtent, resolution, pixelRatio) : undefined;
      var squaredTolerance = (0,_vector_js__WEBPACK_IMPORTED_MODULE_8__/* .getSquaredTolerance */ .se)(resolution, pixelRatio);
      /**
       * @param {import("../../Feature.js").FeatureLike} feature Feature.
       * @this {CanvasVectorTileLayerRenderer}
       */

      var render = function (feature) {
        var styles;
        var styleFunction = feature.getStyleFunction() || layer.getStyleFunction();

        if (styleFunction) {
          styles = styleFunction(feature, resolution);
        }

        if (styles) {
          var dirty = this.renderFeature(feature, squaredTolerance, styles, builderGroup, declutterBuilderGroup);
          this.dirty_ = this.dirty_ || dirty;
          builderState.dirty = builderState.dirty || dirty;
        }
      };

      var features = sourceTile.getFeatures();

      if (renderOrder && renderOrder !== builderState.renderedRenderOrder) {
        features.sort(renderOrder);
      }

      for (var i = 0, ii = features.length; i < ii; ++i) {
        var feature = features[i];

        if (!bufferedExtent || (0,_extent_js__WEBPACK_IMPORTED_MODULE_6__/* .intersects */ .kK)(bufferedExtent, feature.getGeometry().getExtent())) {
          render.call(this_1, feature);
        }
      }

      var executorGroupInstructions = builderGroup.finish(); // no need to clip when the render tile is covered by a single source tile

      var replayExtent = layer.getRenderMode() !== _layer_VectorTileRenderType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].VECTOR */ .Z.VECTOR && declutter && sourceTiles.length === 1 ? null : sharedExtent;
      var renderingReplayGroup = new _render_canvas_ExecutorGroup_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z(replayExtent, resolution, pixelRatio, source.getOverlaps(), executorGroupInstructions, layer.getRenderBuffer());
      tile.executorGroups[layerUid].push(renderingReplayGroup);

      if (declutterBuilderGroup) {
        var declutterExecutorGroup = new _render_canvas_ExecutorGroup_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z(null, resolution, pixelRatio, source.getOverlaps(), declutterBuilderGroup.finish(), layer.getRenderBuffer());
        tile.declutterExecutorGroups[layerUid].push(declutterExecutorGroup);
      }
    };

    var this_1 = this;

    for (var t = 0, tt = sourceTiles.length; t < tt; ++t) {
      _loop_1(t, tt);
    }

    builderState.renderedRevision = revision;
    builderState.renderedRenderOrder = renderOrder;
    builderState.renderedResolution = resolution;
  };
  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("../vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("../Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   */


  CanvasVectorTileLayerRenderer.prototype.forEachFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, callback, matches) {
    var resolution = frameState.viewState.resolution;
    var rotation = frameState.viewState.rotation;
    hitTolerance = hitTolerance == undefined ? 0 : hitTolerance;
    var layer = this.getLayer();
    var source = layer.getSource();
    var tileGrid = source.getTileGridForProjection(frameState.viewState.projection);
    var hitExtent = (0,_extent_js__WEBPACK_IMPORTED_MODULE_6__/* .boundingExtent */ .hI)([coordinate]);
    (0,_extent_js__WEBPACK_IMPORTED_MODULE_6__/* .buffer */ .f3)(hitExtent, resolution * hitTolerance, hitExtent);
    /** @type {!Object<string, import("../Map.js").HitMatch<T>|true>} */

    var features = {};
    /**
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     * @param {import("../../geom/SimpleGeometry.js").default} geometry Geometry.
     * @param {number} distanceSq The squared distance to the click position.
     * @return {T|undefined} Callback result.
     */

    var featureCallback = function (feature, geometry, distanceSq) {
      var key = feature.getId();

      if (key === undefined) {
        key = (0,_util_js__WEBPACK_IMPORTED_MODULE_5__/* .getUid */ .sq)(feature);
      }

      var match = features[key];

      if (!match) {
        if (distanceSq === 0) {
          features[key] = true;
          return callback(feature, layer, geometry);
        }

        matches.push(features[key] = {
          feature: feature,
          layer: layer,
          geometry: geometry,
          distanceSq: distanceSq,
          callback: callback
        });
      } else if (match !== true && distanceSq < match.distanceSq) {
        if (distanceSq === 0) {
          features[key] = true;
          matches.splice(matches.lastIndexOf(match), 1);
          return callback(feature, layer, geometry);
        }

        match.geometry = geometry;
        match.distanceSq = distanceSq;
      }

      return undefined;
    };

    var renderedTiles =
    /** @type {Array<import("../../VectorRenderTile.js").default>} */
    this.renderedTiles;
    var found;

    var _loop_2 = function (i, ii) {
      var tile = renderedTiles[i];
      var tileExtent = tileGrid.getTileCoordExtent(tile.wrappedTileCoord);

      if (!(0,_extent_js__WEBPACK_IMPORTED_MODULE_6__/* .intersects */ .kK)(tileExtent, hitExtent)) {
        return "continue";
      }

      var layerUid = (0,_util_js__WEBPACK_IMPORTED_MODULE_5__/* .getUid */ .sq)(layer);
      var executorGroups = [tile.executorGroups[layerUid]];
      var declutterExecutorGroups = tile.declutterExecutorGroups[layerUid];

      if (declutterExecutorGroups) {
        executorGroups.push(declutterExecutorGroups);
      }

      executorGroups.some(function (executorGroups) {
        var declutteredFeatures = executorGroups === declutterExecutorGroups ? frameState.declutterTree.all().map(function (item) {
          return item.value;
        }) : null;

        for (var t = 0, tt = executorGroups.length; t < tt; ++t) {
          var executorGroup = executorGroups[t];
          found = executorGroup.forEachFeatureAtCoordinate(coordinate, resolution, rotation, hitTolerance, featureCallback, declutteredFeatures);

          if (found) {
            return true;
          }
        }
      });
    };

    for (var i = 0, ii = renderedTiles.length; !found && i < ii; ++i) {
      _loop_2(i, ii);
    }

    return found;
  };
  /**
   * Asynchronous layer level hit detection.
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../../Feature").default>>} Promise that resolves with an array of features.
   */


  CanvasVectorTileLayerRenderer.prototype.getFeatures = function (pixel) {
    return new Promise(function (resolve, reject) {
      var layer =
      /** @type {import("../../layer/VectorTile.js").default} */
      this.getLayer();
      var layerUid = (0,_util_js__WEBPACK_IMPORTED_MODULE_5__/* .getUid */ .sq)(layer);
      var source = layer.getSource();
      var projection = this.renderedProjection;
      var projectionExtent = projection.getExtent();
      var resolution = this.renderedResolution;
      var tileGrid = source.getTileGridForProjection(projection);
      var coordinate = (0,_transform_js__WEBPACK_IMPORTED_MODULE_1__/* .apply */ .nn)(this.renderedPixelToCoordinateTransform_, pixel.slice());
      var tileCoord = tileGrid.getTileCoordForCoordAndResolution(coordinate, resolution);
      var tile;

      for (var i = 0, ii = this.renderedTiles.length; i < ii; ++i) {
        if (tileCoord.toString() === this.renderedTiles[i].tileCoord.toString()) {
          tile = this.renderedTiles[i];

          if (tile.getState() === _TileState_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].LOADED */ .Z.LOADED) {
            var extent_1 = tileGrid.getTileCoordExtent(tile.tileCoord);

            if (source.getWrapX() && projection.canWrapX() && !(0,_extent_js__WEBPACK_IMPORTED_MODULE_6__/* .containsExtent */ .r4)(projectionExtent, extent_1)) {
              (0,_coordinate_js__WEBPACK_IMPORTED_MODULE_10__/* .wrapX */ .Cf)(coordinate, projection);
            }

            break;
          }

          tile = undefined;
        }
      }

      if (!tile || tile.loadingSourceTiles > 0) {
        resolve([]);
        return;
      }

      var extent = tileGrid.getTileCoordExtent(tile.wrappedTileCoord);
      var corner = (0,_extent_js__WEBPACK_IMPORTED_MODULE_6__/* .getTopLeft */ .rL)(extent);
      var tilePixel = [(coordinate[0] - corner[0]) / resolution, (corner[1] - coordinate[1]) / resolution];
      var features = tile.getSourceTiles().reduce(function (accumulator, sourceTile) {
        return accumulator.concat(sourceTile.getFeatures());
      }, []);
      var hitDetectionImageData = tile.hitDetectionImageData[layerUid];

      if (!hitDetectionImageData && !this.animatingOrInteracting_) {
        var tileSize = (0,_size_js__WEBPACK_IMPORTED_MODULE_11__/* .toSize */ .Pq)(tileGrid.getTileSize(tileGrid.getZForResolution(resolution)));
        var rotation = this.renderedRotation_;
        var transforms = [this.getRenderTransform(tileGrid.getTileCoordCenter(tile.wrappedTileCoord), resolution, 0, _render_canvas_hitdetect_js__WEBPACK_IMPORTED_MODULE_12__/* .HIT_DETECT_RESOLUTION */ .UN, tileSize[0] * _render_canvas_hitdetect_js__WEBPACK_IMPORTED_MODULE_12__/* .HIT_DETECT_RESOLUTION */ .UN, tileSize[1] * _render_canvas_hitdetect_js__WEBPACK_IMPORTED_MODULE_12__/* .HIT_DETECT_RESOLUTION */ .UN, 0)];
        hitDetectionImageData = (0,_render_canvas_hitdetect_js__WEBPACK_IMPORTED_MODULE_12__/* .createHitDetectionImageData */ .TU)(tileSize, transforms, features, layer.getStyleFunction(), tileGrid.getTileCoordExtent(tile.wrappedTileCoord), tile.getReplayState(layer).renderedResolution, rotation);
        tile.hitDetectionImageData[layerUid] = hitDetectionImageData;
      }

      resolve((0,_render_canvas_hitdetect_js__WEBPACK_IMPORTED_MODULE_12__/* .hitDetect */ .ix)(tilePixel, features, hitDetectionImageData));
    }.bind(this));
  };
  /**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   */


  CanvasVectorTileLayerRenderer.prototype.handleFontsChanged = function () {
    var layer = this.getLayer();

    if (layer.getVisible() && this.renderedLayerRevision_ !== undefined) {
      layer.changed();
    }
  };
  /**
   * Handle changes in image style state.
   * @param {import("../../events/Event.js").default} event Image style change event.
   * @private
   */


  CanvasVectorTileLayerRenderer.prototype.handleStyleImageChange_ = function (event) {
    this.renderIfReadyAndVisible();
  };
  /**
   * Render declutter items for this layer
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   */


  CanvasVectorTileLayerRenderer.prototype.renderDeclutter = function (frameState) {
    var context = this.context;
    var alpha = context.globalAlpha;
    context.globalAlpha = this.getLayer().getOpacity();
    var viewHints = frameState.viewHints;
    var hifi = !(viewHints[_ViewHint_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].ANIMATING */ .Z.ANIMATING] || viewHints[_ViewHint_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].INTERACTING */ .Z.INTERACTING]);
    var tiles =
    /** @type {Array<import("../../VectorRenderTile.js").default>} */
    this.renderedTiles;

    for (var i = 0, ii = tiles.length; i < ii; ++i) {
      var tile = tiles[i];
      var declutterExecutorGroups = tile.declutterExecutorGroups[(0,_util_js__WEBPACK_IMPORTED_MODULE_5__/* .getUid */ .sq)(this.getLayer())];

      if (declutterExecutorGroups) {
        for (var j = declutterExecutorGroups.length - 1; j >= 0; --j) {
          declutterExecutorGroups[j].execute(this.context, 1, this.getTileRenderTransform(tile, frameState), frameState.viewState.rotation, hifi, undefined, frameState.declutterTree);
        }
      }
    }

    context.globalAlpha = alpha;
  };

  CanvasVectorTileLayerRenderer.prototype.getTileRenderTransform = function (tile, frameState) {
    var pixelRatio = frameState.pixelRatio;
    var viewState = frameState.viewState;
    var center = viewState.center;
    var resolution = viewState.resolution;
    var rotation = viewState.rotation;
    var size = frameState.size;
    var width = Math.round(size[0] * pixelRatio);
    var height = Math.round(size[1] * pixelRatio);
    var source = this.getLayer().getSource();
    var tileGrid = source.getTileGridForProjection(frameState.viewState.projection);
    var tileCoord = tile.tileCoord;
    var tileExtent = tileGrid.getTileCoordExtent(tile.wrappedTileCoord);
    var worldOffset = tileGrid.getTileCoordExtent(tileCoord, this.tmpExtent)[0] - tileExtent[0];
    var transform = (0,_transform_js__WEBPACK_IMPORTED_MODULE_1__/* .multiply */ .Jp)((0,_transform_js__WEBPACK_IMPORTED_MODULE_1__/* .scale */ .bA)(this.inversePixelTransform.slice(), 1 / pixelRatio, 1 / pixelRatio), this.getRenderTransform(center, resolution, rotation, pixelRatio, width, height, worldOffset));
    return transform;
  };
  /**
   * Render the layer.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @return {HTMLElement} The rendered element.
   */


  CanvasVectorTileLayerRenderer.prototype.renderFrame = function (frameState, target) {
    var viewHints = frameState.viewHints;
    var hifi = !(viewHints[_ViewHint_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].ANIMATING */ .Z.ANIMATING] || viewHints[_ViewHint_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].INTERACTING */ .Z.INTERACTING]);

    _super.prototype.renderFrame.call(this, frameState, target);

    this.renderedPixelToCoordinateTransform_ = frameState.pixelToCoordinateTransform.slice();
    this.renderedRotation_ = frameState.viewState.rotation;
    var layer =
    /** @type {import("../../layer/VectorTile.js").default} */
    this.getLayer();
    var renderMode = layer.getRenderMode();
    var context = this.context;
    var alpha = context.globalAlpha;
    context.globalAlpha = layer.getOpacity();
    var replayTypes = VECTOR_REPLAYS[renderMode];
    var viewState = frameState.viewState;
    var rotation = viewState.rotation;
    var tiles = this.renderedTiles;
    var clips = [];
    var clipZs = [];

    for (var i = tiles.length - 1; i >= 0; --i) {
      var tile =
      /** @type {import("../../VectorRenderTile.js").default} */
      tiles[i];
      var transform = this.getTileRenderTransform(tile, frameState);
      var executorGroups = tile.executorGroups[(0,_util_js__WEBPACK_IMPORTED_MODULE_5__/* .getUid */ .sq)(layer)];
      var clipped = false;

      for (var t = 0, tt = executorGroups.length; t < tt; ++t) {
        var executorGroup = executorGroups[t];

        if (!executorGroup.hasExecutors(replayTypes)) {
          // sourceTile has no instructions of the types we want to render
          continue;
        }

        var currentZ = tile.tileCoord[0];
        var currentClip = void 0;

        if (!clipped) {
          currentClip = executorGroup.getClipCoords(transform);

          if (currentClip) {
            context.save(); // Create a clip mask for regions in this low resolution tile that are
            // already filled by a higher resolution tile

            for (var j = 0, jj = clips.length; j < jj; ++j) {
              var clip = clips[j];

              if (currentZ < clipZs[j]) {
                context.beginPath(); // counter-clockwise (outer ring) for current tile

                context.moveTo(currentClip[0], currentClip[1]);
                context.lineTo(currentClip[2], currentClip[3]);
                context.lineTo(currentClip[4], currentClip[5]);
                context.lineTo(currentClip[6], currentClip[7]); // clockwise (inner ring) for higher resolution tile

                context.moveTo(clip[6], clip[7]);
                context.lineTo(clip[4], clip[5]);
                context.lineTo(clip[2], clip[3]);
                context.lineTo(clip[0], clip[1]);
                context.clip();
              }
            }
          }
        }

        executorGroup.execute(context, 1, transform, rotation, hifi, replayTypes);

        if (!clipped && currentClip) {
          context.restore();
          clips.push(currentClip);
          clipZs.push(currentZ);
          clipped = true;
        }
      }
    }

    context.globalAlpha = alpha;
    return this.container;
  };
  /**
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../../style/Style.js").default|Array<import("../../style/Style.js").default>} styles The style or array of styles.
   * @param {import("../../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
   * @param {import("../../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder group for decluttering.
   * @return {boolean} `true` if an image is loading.
   */


  CanvasVectorTileLayerRenderer.prototype.renderFeature = function (feature, squaredTolerance, styles, builderGroup, opt_declutterBuilderGroup) {
    if (!styles) {
      return false;
    }

    var loading = false;

    if (Array.isArray(styles)) {
      for (var i = 0, ii = styles.length; i < ii; ++i) {
        loading = (0,_vector_js__WEBPACK_IMPORTED_MODULE_8__/* .renderFeature */ .Pn)(builderGroup, feature, styles[i], squaredTolerance, this.boundHandleStyleImageChange_, undefined, opt_declutterBuilderGroup) || loading;
      }
    } else {
      loading = (0,_vector_js__WEBPACK_IMPORTED_MODULE_8__/* .renderFeature */ .Pn)(builderGroup, feature, styles, squaredTolerance, this.boundHandleStyleImageChange_, undefined, opt_declutterBuilderGroup);
    }

    return loading;
  };
  /**
   * @param {import("../../VectorRenderTile.js").default} tile Tile.
   * @return {boolean} A new tile image was rendered.
   * @private
   */


  CanvasVectorTileLayerRenderer.prototype.tileImageNeedsRender_ = function (tile) {
    var layer =
    /** @type {import("../../layer/VectorTile.js").default} */
    this.getLayer();

    if (layer.getRenderMode() === _layer_VectorTileRenderType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].VECTOR */ .Z.VECTOR) {
      return false;
    }

    var replayState = tile.getReplayState(layer);
    var revision = layer.getRevision();
    var resolution = tile.wantedResolution;
    return replayState.renderedTileResolution !== resolution || replayState.renderedTileRevision !== revision;
  };
  /**
   * @param {import("../../VectorRenderTile.js").default} tile Tile.
   * @param {import("../../PluggableMap").FrameState} frameState Frame state.
   * @private
   */


  CanvasVectorTileLayerRenderer.prototype.renderTileImage_ = function (tile, frameState) {
    var layer =
    /** @type {import("../../layer/VectorTile.js").default} */
    this.getLayer();
    var replayState = tile.getReplayState(layer);
    var revision = layer.getRevision();
    var executorGroups = tile.executorGroups[(0,_util_js__WEBPACK_IMPORTED_MODULE_5__/* .getUid */ .sq)(layer)];
    replayState.renderedTileRevision = revision;
    var tileCoord = tile.wrappedTileCoord;
    var z = tileCoord[0];
    var source = layer.getSource();
    var pixelRatio = frameState.pixelRatio;
    var viewState = frameState.viewState;
    var projection = viewState.projection;
    var tileGrid = source.getTileGridForProjection(projection);
    var tileResolution = tileGrid.getResolution(tile.tileCoord[0]);
    var renderPixelRatio = frameState.pixelRatio / tile.wantedResolution * tileResolution;
    var resolution = tileGrid.getResolution(z);
    var context = tile.getContext(layer); // Increase tile size when overzooming for low pixel ratio, to avoid blurry tiles

    pixelRatio = Math.round(Math.max(pixelRatio, renderPixelRatio / pixelRatio));
    var size = source.getTilePixelSize(z, pixelRatio, projection);
    context.canvas.width = size[0];
    context.canvas.height = size[1];
    var renderScale = pixelRatio / renderPixelRatio;

    if (renderScale !== 1) {
      var canvasTransform = (0,_transform_js__WEBPACK_IMPORTED_MODULE_1__/* .reset */ .mc)(this.tmpTransform_);
      (0,_transform_js__WEBPACK_IMPORTED_MODULE_1__/* .scale */ .bA)(canvasTransform, renderScale, renderScale);
      context.setTransform.apply(context, canvasTransform);
    }

    var tileExtent = tileGrid.getTileCoordExtent(tileCoord, this.tmpExtent);
    var pixelScale = renderPixelRatio / resolution;
    var transform = (0,_transform_js__WEBPACK_IMPORTED_MODULE_1__/* .reset */ .mc)(this.tmpTransform_);
    (0,_transform_js__WEBPACK_IMPORTED_MODULE_1__/* .scale */ .bA)(transform, pixelScale, -pixelScale);
    (0,_transform_js__WEBPACK_IMPORTED_MODULE_1__/* .translate */ .Iu)(transform, -tileExtent[0], -tileExtent[3]);

    for (var i = 0, ii = executorGroups.length; i < ii; ++i) {
      var executorGroup = executorGroups[i];
      executorGroup.execute(context, renderScale, transform, 0, true, IMAGE_REPLAYS[layer.getRenderMode()]);
    }

    replayState.renderedTileResolution = tile.wantedResolution;
  };

  return CanvasVectorTileLayerRenderer;
}(_TileLayer_js__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasVectorTileLayerRenderer);

/***/ })

}]);