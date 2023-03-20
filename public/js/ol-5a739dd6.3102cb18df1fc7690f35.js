"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[446],{

/***/ 3936:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _events_EventType_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2140);
/* harmony import */ var _Feature_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5028);
/* harmony import */ var _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5870);
/* harmony import */ var _geom_Point_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6397);
/* harmony import */ var _Vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4787);
/* harmony import */ var _coordinate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4413);
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4548);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1046);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2618);
/**
 * @module ol/source/Cluster
 */









/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [distance=20] Distance in pixels within which features will
 * be clustered together.
 * @property {number} [minDistance=0] Minimum distance in pixels between clusters.
 * Will be capped at the configured distance.
 * By default no minimum distance is guaranteed. This config can be used to avoid
 * overlapping icons. As a tradoff, the cluster feature's position will no longer be
 * the center of all its features.
 * @property {function(Feature):Point} [geometryFunction]
 * Function that takes an {@link module:ol/Feature} as argument and returns an
 * {@link module:ol/geom/Point} as cluster calculation point for the feature. When a
 * feature should not be considered for clustering, the function should return
 * `null`. The default, which works when the underlying source contains point
 * features only, is
 * ```js
 * function(feature) {
 *   return feature.getGeometry();
 * }
 * ```
 * See {@link module:ol/geom/Polygon~Polygon#getInteriorPoint} for a way to get a cluster
 * calculation point for polygons.
 * @property {function(Point, Array<Feature>):Feature} [createCluster]
 * Function that takes the cluster's center {@link module:ol/geom/Point} and an array
 * of {@link module:ol/Feature} included in this cluster. Must return a
 * {@link module:ol/Feature} that will be used to render. Default implementation is:
 * ```js
 * function(point, features) {
 *   return new Feature({
 *     geometry: point,
 *     features: features
 *   });
 * }
 * ```
 * @property {VectorSource} [source] Source.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 */

/**
 * @classdesc
 * Layer source to cluster vector data. Works out of the box with point
 * geometries. For other geometry types, or if not all geometries should be
 * considered for clustering, a custom `geometryFunction` can be defined.
 *
 * If the instance is disposed without also disposing the underlying
 * source `setSource(null)` has to be called to remove the listener reference
 * from the wrapped source.
 * @api
 */

class Cluster extends _Vector_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z {
  /**
   * @param {Options} options Cluster options.
   */
  constructor(options) {
    super({
      attributions: options.attributions,
      wrapX: options.wrapX
    });
    /**
     * @type {number|undefined}
     * @protected
     */

    this.resolution = undefined;
    /**
     * @type {number}
     * @protected
     */

    this.distance = options.distance !== undefined ? options.distance : 20;
    /**
     * @type {number}
     * @protected
     */

    this.minDistance = options.minDistance || 0;
    /**
     * @type {number}
     * @protected
     */

    this.interpolationRatio = 0;
    /**
     * @type {Array<Feature>}
     * @protected
     */

    this.features = [];
    /**
     * @param {Feature} feature Feature.
     * @return {Point} Cluster calculation point.
     * @protected
     */

    this.geometryFunction = options.geometryFunction || function (feature) {
      const geometry = feature.getGeometry();
      (0,_asserts_js__WEBPACK_IMPORTED_MODULE_1__/* .assert */ .h)(geometry.getType() == _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].POINT */ .Z.POINT, 10); // The default `geometryFunction` can only handle `Point` geometries

      return geometry;
    };
    /**
     * @type {function(Point, Array<Feature>):Feature}
     * @private
     */


    this.createCustomCluster_ = options.createCluster;
    /**
     * @type {VectorSource}
     * @protected
     */

    this.source = null;
    this.boundRefresh_ = this.refresh.bind(this);
    this.updateDistance(this.distance, this.minDistance);
    this.setSource(options.source || null);
  }
  /**
   * Remove all features from the source.
   * @param {boolean} [opt_fast] Skip dispatching of {@link module:ol/source/Vector.VectorSourceEvent#removefeature} events.
   * @api
   */


  clear(opt_fast) {
    //this.features.length = 0;
    let data = this.features;
    this.features = [];
    /* Free bounded data */

    new Promise((resolution, rejection) => {
      for (var i = 0; i < data.length; ++i) {
        /* Free convex hull memory */
        let hull = data[i].get("convexHull");
        let source = ArcheoMap.getRegionsLayer().getSource();
        if (ArcheoUtilities.isValid(hull) && source.hasFeature(hull)) source.removeFeature(hull);
        data[i].unset("convexHull");
      }

      resolution(true);
    });
    super.clear(opt_fast);
  }
  /**
   * Get the distance in pixels between clusters.
   * @return {number} Distance.
   * @api
   */


  getDistance() {
    return this.distance;
  }
  /**
   * Get a reference to the wrapped source.
   * @return {VectorSource} Source.
   * @api
   */


  getSource() {
    return this.source;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */


  loadFeatures(extent, resolution, projection) {
    this.source.loadFeatures(extent, resolution, projection);

    if (resolution !== this.resolution) {
      this.resolution = resolution;
      this.refresh();
    }
  }
  /**
   * Set the distance within which features will be clusterd together.
   * @param {number} distance The distance in pixels.
   * @api
   */


  setDistance(distance) {
    this.updateDistance(distance, this.minDistance);
  }
  /**
   * Set the minimum distance between clusters. Will be capped at the
   * configured distance.
   * @param {number} minDistance The minimum distance in pixels.
   * @api
   */


  setMinDistance(minDistance) {
    this.updateDistance(this.distance, minDistance);
  }
  /**
   * The configured minimum distance between clusters.
   * @return {number} The minimum distance in pixels.
   * @api
   */


  getMinDistance() {
    return this.minDistance;
  }
  /**
   * Replace the wrapped source.
   * @param {VectorSource} source The new source for this instance.
   * @api
   */


  setSource(source) {
    if (this.source) {
      this.source.removeEventListener(_events_EventType_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].CHANGE */ .Z.CHANGE, this.boundRefresh_);
    }

    this.source = source;

    if (source) {
      source.addEventListener(_events_EventType_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].CHANGE */ .Z.CHANGE, this.boundRefresh_);
    }

    this.refresh();
  }
  /**
   * Handle the source changing.
   */


  refresh() {
    // settings.layer.getSource().clear();

    /*let labelsLayer = ArcheoMap.getMapSelectDraggableLayer();
     this.features.forEach((f) => {
      let labels = f.get('labels');
      if(ArcheoUtilities.isValid(labels)) {
        labels.forEach((label) => {
          labelsLayer.getSource().removeFeature(label);
        });
      }
    });*/
    this.clear();
    this.cluster();
    this.addFeatures(this.features);
  }
  /**
   * Update the distances and refresh the source if necessary.
   * @param {number} distance The new distance.
   * @param {number} minDistance The new minimum distance.
   */


  updateDistance(distance, minDistance) {
    const ratio = minDistance; //distance === 0 ? 0 : Math.min(minDistance, distance) / distance;

    const changed = distance !== this.distance || this.interpolationRatio !== ratio;
    this.distance = distance;
    this.minDistance = minDistance;
    this.interpolationRatio = ratio;

    if (changed) {
      this.refresh();
    }
  }
  /**
   * @protected
   */


  cluster() {
    if (this.resolution === undefined || !this.source) {
      return;
    }
    /* Cache */


    let geometryCache = {};
    var theCluster = this;
    let regionsDict = ArcheoMap.getMapRegions();
    var strategyConfig = ArcheoSession.get().clustering.features;
    var isHeatmap = this.source.get('isHeatmap');
    var mapDistance = 0;
    var isClusteringByRegion = ArcheoUtilities.isValidNonEmptyString(strategyConfig.method.region);
    var isClusteringByDistance = ArcheoUtilities.isValidNonEmptyString(strategyConfig.method.distance);
    let mapScaleFactor = ArcheoMap.getMapScaleFactor();
    if (strategyConfig.method.distance === 'relative') mapDistance = this.distance * this.resolution * mapScaleFactor;else if (strategyConfig.method.distance === 'absolute') mapDistance = this.distance * 1000;else if (isClusteringByRegion) mapDistance = Infinity; //newLayer.oldcluster

    var features = this.source.getFeatures(); //.filter((feature) => this.geometryFunction(feature) !== false);

    /**
      * @type {!Object<string, boolean>}
      */

    var clustered = {};
    /* Fix for heatmap visualisation without clustering */

    if ((mapDistance === 0 || mapDistance === Infinity) && isHeatmap === true) {
      for (var i = 0; i < features.length; ++i) {
        let featureUid = (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .getUid */ .sq)(f);
        if (!(featureUid in geometryCache)) geometryCache[featureUid] = this.geometryFunction(f);
        if (geometryCache[featureUid]) this.createCluster([f], geometryCache[featureUid].getCoordinates());
      }
    } else {
      for (var i = 0; i < features.length; ++i) {
        var feature = features[i];
        var featureUid = (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .getUid */ .sq)(feature);
        var extent = (0,_extent_js__WEBPACK_IMPORTED_MODULE_5__/* .createEmpty */ .lJ)();

        if (!(featureUid in clustered)) {
          //var geometry = feature.getGeometry();
          if (!(featureUid in geometryCache)) geometryCache[featureUid] = this.geometryFunction(feature);
          var featureRegionId = ArcheoMap.getFeatureRegionId(feature);

          if (geometryCache[featureUid] !== false) {
            var neighbors = [];
            var positionInfo = {
              centroid: [0, 0],
              addedCoordinatesCount: 0
            };
            let coordinates = geometryCache[featureUid].getCoordinates();
            /* Cluster all together */

            if (mapDistance === Infinity) {
              neighbors = features;
              (0,_extent_js__WEBPACK_IMPORTED_MODULE_5__/* .createOrUpdateFromCoordinate */ .HK)(coordinates, extent);

              if (isClusteringByRegion && featureRegionId in regionsDict) {
                let regionExtent = regionsDict[featureRegionId].extent;
                if (ArcheoUtilities.isValid(regionExtent)) extent = regionExtent;else
                  /* Case for 'world' region */
                  (0,_extent_js__WEBPACK_IMPORTED_MODULE_5__/* .buffer */ .f3)(extent, Infinity, extent);
              }
            }
            /* Get candidates for clustering */
            else {
                (0,_extent_js__WEBPACK_IMPORTED_MODULE_5__/* .createOrUpdateFromCoordinate */ .HK)(coordinates, extent);
                (0,_extent_js__WEBPACK_IMPORTED_MODULE_5__/* .buffer */ .f3)(extent, mapDistance, extent); // regionsDict

                if (isClusteringByRegion && featureRegionId in regionsDict) {
                  let regionExtent = regionsDict[featureRegionId].extent;
                  if (ArcheoUtilities.isValid(regionExtent)) (0,_extent_js__WEBPACK_IMPORTED_MODULE_5__/* .getIntersection */ .Ed)(extent, regionExtent, extent);
                }
              }

            neighbors = this.source.getFeaturesInExtentForClustering(extent, clustered, positionInfo, geometryCache, this, featureRegionId, isClusteringByRegion);

            if (neighbors.length > 0) {
              /* Use region centroid aquired from the database */
              if (strategyConfig.useCentroids && isClusteringByRegion && !isClusteringByDistance) {
                //featureRegionId in regionsDict) {
                positionInfo.centroid = regionsDict[featureRegionId].centroid;
              } else {
                (0,_coordinate_js__WEBPACK_IMPORTED_MODULE_6__/* .scale */ .bA)(positionInfo.centroid, 1 / positionInfo.addedCoordinatesCount);
              }

              this.features.push(this.createCluster(neighbors, positionInfo.centroid, extent)); //this.features.push(this.createCluster(neighbors, coordinates, extent));
            }
          }
        }
      }
    }
  }
  /**
   * @param {Array<Feature>} features Features
   * @param {import("../extent.js").Extent} extent The searched extent for these features.
   * @return {Feature} The cluster feature.
   * @protected
   */


  createCluster(features, centroid, extent = null) {
    /* If regions data is available */
    var strategyConfig = ArcheoSession.get().clustering.features;
    var isClusteringByDistance = ArcheoUtilities.isValidNonEmptyString(strategyConfig.method.distance);
    var regionId = ArcheoMap.getFeatureRegionId(features[0]);
    var geometry;
    const searchCenter = (0,_extent_js__WEBPACK_IMPORTED_MODULE_5__/* .getCenter */ .qg)(extent); //else {

    if (isClusteringByDistance) {
      const ratio = this.interpolationRatio;
      geometry = new _geom_Point_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z([centroid[0] * (1 - ratio) + searchCenter[0] * ratio, centroid[1] * (1 - ratio) + searchCenter[1] * ratio]);
    } else {
      geometry = new _geom_Point_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z(centroid);
    } //}


    var cluster;

    if (this.createCustomCluster_) {
      cluster = this.createCustomCluster_(geometry, features);
    } else {
      cluster = new _Feature_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z({
        geometry,
        features
      });
    }

    cluster.set('features', features);
    cluster.set('layerId', this.get('layerId'));
    cluster.set('originalPosition', geometry.getCoordinates());
    cluster.set('regionId', regionId);
    return cluster;
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cluster);

/***/ }),

/***/ 766:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ATTRIBUTION */
/* harmony import */ var _XYZ_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7969);
/**
 * @module ol/source/OSM
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
 * The attribution containing a link to the OpenStreetMap Copyright and License
 * page.
 * @const
 * @type {string}
 * @api
 */

var ATTRIBUTION = '&#169; ' + '<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> ' + 'contributors.';
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin='anonymous'] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [imageSmoothing=true] Enable image smoothing.
 * @property {number} [maxZoom=19] Max zoom.
 * @property {boolean} [opaque=true] Whether the layer is opaque.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [transition=250] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {string} [url='https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'] URL template.
 * Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */

/**
 * @classdesc
 * Layer source for the OpenStreetMap tile server.
 * @api
 */

var OSM =
/** @class */
function (_super) {
  __extends(OSM, _super);
  /**
   * @param {Options} [opt_options] Open Street Map options.
   */


  function OSM(opt_options) {
    var _this = this;

    var options = opt_options || {};
    var attributions;

    if (options.attributions !== undefined) {
      attributions = options.attributions;
    } else {
      attributions = [ATTRIBUTION];
    }

    var crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';
    var url = options.url !== undefined ? options.url : 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    _this = _super.call(this, {
      attributions: attributions,
      attributionsCollapsible: false,
      cacheSize: options.cacheSize,
      crossOrigin: crossOrigin,
      imageSmoothing: options.imageSmoothing,
      maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
      opaque: options.opaque !== undefined ? options.opaque : true,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileLoadFunction: options.tileLoadFunction,
      transition: options.transition,
      url: url,
      wrapX: options.wrapX,
      zDirection: options.zDirection
    }) || this;
    return _this;
  }

  return OSM;
}(_XYZ_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OSM);

/***/ }),

/***/ 2949:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Object_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7182);
/* harmony import */ var _State_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(669);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2618);
/* harmony import */ var _proj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8623);
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
 * @module ol/source/Source
 */






/**
 * A function that takes a {@link module:ol/PluggableMap~FrameState} and returns a string or
 * an array of strings representing source attributions.
 *
 * @typedef {function(import("../PluggableMap.js").FrameState): (string|Array<string>)} Attribution
 */

/**
 * A type that can be used to provide attribution information for data sources.
 *
 * It represents either
 * * a simple string (e.g. `'© Acme Inc.'`)
 * * an array of simple strings (e.g. `['© Acme Inc.', '© Bacme Inc.']`)
 * * a function that returns a string or array of strings ({@link module:ol/source/Source~Attribution})
 *
 * @typedef {string|Array<string>|Attribution} AttributionLike
 */

/**
 * @typedef {Object} Options
 * @property {AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {import("./State.js").default} [state='ready'] State.
 * @property {boolean} [wrapX=false] WrapX.
 */

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for {@link module:ol/layer/Layer~Layer} sources.
 *
 * A generic `change` event is triggered when the state of the source changes.
 * @abstract
 * @api
 */

var Source =
/** @class */
function (_super) {
  __extends(Source, _super);
  /**
   * @param {Options} options Source options.
   */


  function Source(options) {
    var _this = _super.call(this) || this;
    /**
     * @protected
     * @type {import("../proj/Projection.js").default}
     */


    _this.projection = (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(options.projection);
    /**
     * @private
     * @type {?Attribution}
     */

    _this.attributions_ = adaptAttributions(options.attributions);
    /**
     * @private
     * @type {boolean}
     */

    _this.attributionsCollapsible_ = options.attributionsCollapsible !== undefined ? options.attributionsCollapsible : true;
    /**
     * This source is currently loading data. Sources that defer loading to the
     * map's tile queue never set this to `true`.
     * @type {boolean}
     */

    _this.loading = false;
    /**
     * @private
     * @type {import("./State.js").default}
     */

    _this.state_ = options.state !== undefined ? options.state : _State_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].READY */ .Z.READY;
    /**
     * @private
     * @type {boolean}
     */

    _this.wrapX_ = options.wrapX !== undefined ? options.wrapX : false;
    /**
     * @protected
     * @type {function(import("../View.js").ViewOptions):void}
     */

    _this.viewResolver = null;
    /**
     * @protected
     * @type {function(Error):void}
     */

    _this.viewRejector = null;
    var self = _this;
    /**
     * @private
     * @type {Promise<import("../View.js").ViewOptions>}
     */

    _this.viewPromise_ = new Promise(function (resolve, reject) {
      self.viewResolver = resolve;
      self.viewRejector = reject;
    });
    return _this;
  }
  /**
   * Get the attribution function for the source.
   * @return {?Attribution} Attribution function.
   * @api
   */


  Source.prototype.getAttributions = function () {
    return this.attributions_;
  };
  /**
   * @return {boolean} Attributions are collapsible.
   * @api
   */


  Source.prototype.getAttributionsCollapsible = function () {
    return this.attributionsCollapsible_;
  };
  /**
   * Get the projection of the source.
   * @return {import("../proj/Projection.js").default} Projection.
   * @api
   */


  Source.prototype.getProjection = function () {
    return this.projection;
  };
  /**
   * @abstract
   * @return {Array<number>|undefined} Resolutions.
   */


  Source.prototype.getResolutions = function () {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_2__/* .abstract */ .O3)();
  };
  /**
   * @return {Promise<import("../View.js").ViewOptions>} A promise for view-related properties.
   */


  Source.prototype.getView = function () {
    return this.viewPromise_;
  };
  /**
   * Get the state of the source, see {@link module:ol/source/State~State} for possible states.
   * @return {import("./State.js").default} State.
   * @api
   */


  Source.prototype.getState = function () {
    return this.state_;
  };
  /**
   * @return {boolean|undefined} Wrap X.
   */


  Source.prototype.getWrapX = function () {
    return this.wrapX_;
  };
  /**
   * @return {Object|undefined} Context options.
   */


  Source.prototype.getContextOptions = function () {
    return undefined;
  };
  /**
   * Refreshes the source. The source will be cleared, and data from the server will be reloaded.
   * @api
   */


  Source.prototype.refresh = function () {
    this.changed();
  };
  /**
   * Set the attributions of the source.
   * @param {AttributionLike|undefined} attributions Attributions.
   *     Can be passed as `string`, `Array<string>`, {@link module:ol/source/Source~Attribution},
   *     or `undefined`.
   * @api
   */


  Source.prototype.setAttributions = function (attributions) {
    this.attributions_ = adaptAttributions(attributions);
    this.changed();
  };
  /**
   * Set the state of the source.
   * @param {import("./State.js").default} state State.
   */


  Source.prototype.setState = function (state) {
    this.state_ = state;
    this.changed();
  };

  return Source;
}(_Object_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z);
/**
 * Turns the attributions option into an attributions function.
 * @param {AttributionLike|undefined} attributionLike The attribution option.
 * @return {?Attribution} An attribution function (or null).
 */


function adaptAttributions(attributionLike) {
  if (!attributionLike) {
    return null;
  }

  if (Array.isArray(attributionLike)) {
    return function (frameState) {
      return attributionLike;
    };
  }

  if (typeof attributionLike === 'function') {
    return attributionLike;
  }

  return function (frameState) {
    return [attributionLike];
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Source);

/***/ }),

/***/ 669:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/source/State
 */

/**
 * @enum {string}
 * State of the source, one of 'undefined', 'loading', 'ready' or 'error'.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  UNDEFINED: 'undefined',
  LOADING: 'loading',
  READY: 'ready',
  ERROR: 'error'
});

/***/ }),

/***/ 4925:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ source_UrlTile)
});

;// CONCATENATED MODULE: ./node_modules/ol/source/TileEventType.js
/**
 * @module ol/source/TileEventType
 */

/**
 * @enum {string}
 */
/* harmony default export */ const TileEventType = ({
  /**
   * Triggered when a tile starts loading.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadstart
   * @api
   */
  TILELOADSTART: 'tileloadstart',

  /**
   * Triggered when a tile finishes loading, either when its data is loaded,
   * or when loading was aborted because the tile is no longer needed.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadend
   * @api
   */
  TILELOADEND: 'tileloadend',

  /**
   * Triggered if tile loading results in an error.
   * @event module:ol/source/Tile.TileSourceEvent#tileloaderror
   * @api
   */
  TILELOADERROR: 'tileloaderror'
});
/**
 * @typedef {'tileloadstart'|'tileloadend'|'tileloaderror'} TileSourceEventTypes
 */
// EXTERNAL MODULE: ./node_modules/ol/events/Event.js
var Event = __webpack_require__(7518);
// EXTERNAL MODULE: ./node_modules/ol/source/Source.js
var Source = __webpack_require__(2949);
// EXTERNAL MODULE: ./node_modules/ol/TileCache.js
var TileCache = __webpack_require__(4158);
// EXTERNAL MODULE: ./node_modules/ol/TileState.js
var TileState = __webpack_require__(587);
// EXTERNAL MODULE: ./node_modules/ol/util.js
var util = __webpack_require__(2618);
// EXTERNAL MODULE: ./node_modules/ol/asserts.js
var asserts = __webpack_require__(4548);
// EXTERNAL MODULE: ./node_modules/ol/proj.js + 2 modules
var proj = __webpack_require__(8623);
// EXTERNAL MODULE: ./node_modules/ol/tilecoord.js
var tilecoord = __webpack_require__(5406);
// EXTERNAL MODULE: ./node_modules/ol/tilegrid.js + 1 modules
var tilegrid = __webpack_require__(4958);
// EXTERNAL MODULE: ./node_modules/ol/size.js
var size = __webpack_require__(7218);
;// CONCATENATED MODULE: ./node_modules/ol/source/Tile.js
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
 * @module ol/source/Tile
 */












/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("./TileEventType").TileSourceEventTypes, TileSourceEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     import("./TileEventType").TileSourceEventTypes, Return>} TileSourceOnSignature
 */

/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] CacheSize.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {number} [tilePixelRatio] TilePixelRatio.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection.
 * @property {import("./State.js").default} [state] State.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] TileGrid.
 * @property {boolean} [wrapX=true] WrapX.
 * @property {number} [transition] Transition.
 * @property {string} [key] Key.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0] ZDirection.
 */

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for sources providing images divided into a tile grid.
 * @abstract
 * @api
 */

var TileSource =
/** @class */
function (_super) {
  __extends(TileSource, _super);
  /**
   * @param {Options} options SourceTile source options.
   */


  function TileSource(options) {
    var _this = _super.call(this, {
      attributions: options.attributions,
      attributionsCollapsible: options.attributionsCollapsible,
      projection: options.projection,
      state: options.state,
      wrapX: options.wrapX
    }) || this;
    /***
     * @type {TileSourceOnSignature<import("../events").EventsKey>}
     */


    _this.on;
    /***
     * @type {TileSourceOnSignature<import("../events").EventsKey>}
     */

    _this.once;
    /***
     * @type {TileSourceOnSignature<void>}
     */

    _this.un;
    /**
     * @private
     * @type {boolean}
     */

    _this.opaque_ = options.opaque !== undefined ? options.opaque : false;
    /**
     * @private
     * @type {number}
     */

    _this.tilePixelRatio_ = options.tilePixelRatio !== undefined ? options.tilePixelRatio : 1;
    /**
     * @protected
     * @type {import("../tilegrid/TileGrid.js").default}
     */

    _this.tileGrid = options.tileGrid !== undefined ? options.tileGrid : null;
    var tileSize = [256, 256];
    var tileGrid = options.tileGrid;

    if (tileGrid) {
      (0,size/* toSize */.Pq)(tileGrid.getTileSize(tileGrid.getMinZoom()), tileSize);
    }
    /**
     * @protected
     * @type {import("../TileCache.js").default}
     */


    _this.tileCache = new TileCache/* default */.Z(options.cacheSize || 0);
    /**
     * @protected
     * @type {import("../size.js").Size}
     */

    _this.tmpSize = [0, 0];
    /**
     * @private
     * @type {string}
     */

    _this.key_ = options.key || '';
    /**
     * @protected
     * @type {import("../Tile.js").Options}
     */

    _this.tileOptions = {
      transition: options.transition
    };
    /**
     * zDirection hint, read by the renderer. Indicates which resolution should be used
     * by a renderer if the views resolution does not match any resolution of the tile source.
     * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
     * will be used. If -1, the nearest higher resolution will be used.
     * @type {number|import("../array.js").NearestDirectionFunction}
     */

    _this.zDirection = options.zDirection ? options.zDirection : 0;
    return _this;
  }
  /**
   * @return {boolean} Can expire cache.
   */


  TileSource.prototype.canExpireCache = function () {
    return this.tileCache.canExpireCache();
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {!Object<string, boolean>} usedTiles Used tiles.
   */


  TileSource.prototype.expireCache = function (projection, usedTiles) {
    var tileCache = this.getTileCacheForProjection(projection);

    if (tileCache) {
      tileCache.expireCache(usedTiles);
    }
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {number} z Zoom level.
   * @param {import("../TileRange.js").default} tileRange Tile range.
   * @param {function(import("../Tile.js").default):(boolean|void)} callback Called with each
   *     loaded tile.  If the callback returns `false`, the tile will not be
   *     considered loaded.
   * @return {boolean} The tile range is fully covered with loaded tiles.
   */


  TileSource.prototype.forEachLoadedTile = function (projection, z, tileRange, callback) {
    var tileCache = this.getTileCacheForProjection(projection);

    if (!tileCache) {
      return false;
    }

    var covered = true;
    var tile, tileCoordKey, loaded;

    for (var x = tileRange.minX; x <= tileRange.maxX; ++x) {
      for (var y = tileRange.minY; y <= tileRange.maxY; ++y) {
        tileCoordKey = (0,tilecoord/* getKeyZXY */.lg)(z, x, y);
        loaded = false;

        if (tileCache.containsKey(tileCoordKey)) {
          tile =
          /** @type {!import("../Tile.js").default} */
          tileCache.get(tileCoordKey);
          loaded = tile.getState() === TileState/* default.LOADED */.Z.LOADED;

          if (loaded) {
            loaded = callback(tile) !== false;
          }
        }

        if (!loaded) {
          covered = false;
        }
      }
    }

    return covered;
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   */


  TileSource.prototype.getGutterForProjection = function (projection) {
    return 0;
  };
  /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   * @protected
   */


  TileSource.prototype.getKey = function () {
    return this.key_;
  };
  /**
   * Set the value to be used as the key for all tiles in the source.
   * @param {string} key The key for tiles.
   * @protected
   */


  TileSource.prototype.setKey = function (key) {
    if (this.key_ !== key) {
      this.key_ = key;
      this.changed();
    }
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {boolean} Opaque.
   */


  TileSource.prototype.getOpaque = function (projection) {
    return this.opaque_;
  };
  /**
   * @return {Array<number>} Resolutions.
   */


  TileSource.prototype.getResolutions = function () {
    return this.tileGrid.getResolutions();
  };
  /**
   * @abstract
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../Tile.js").default} Tile.
   */


  TileSource.prototype.getTile = function (z, x, y, pixelRatio, projection) {
    return (0,util/* abstract */.O3)();
  };
  /**
   * Return the tile grid of the tile source.
   * @return {import("../tilegrid/TileGrid.js").default} Tile grid.
   * @api
   */


  TileSource.prototype.getTileGrid = function () {
    return this.tileGrid;
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   */


  TileSource.prototype.getTileGridForProjection = function (projection) {
    if (!this.tileGrid) {
      return (0,tilegrid/* getForProjection */.X$)(projection);
    } else {
      return this.tileGrid;
    }
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../TileCache.js").default} Tile cache.
   * @protected
   */


  TileSource.prototype.getTileCacheForProjection = function (projection) {
    (0,asserts/* assert */.h)((0,proj/* equivalent */.OP)(this.getProjection(), projection), 68 // A VectorTile source can only be rendered if it has a projection compatible with the view projection.
    );
    return this.tileCache;
  };
  /**
   * Get the tile pixel ratio for this source. Subclasses may override this
   * method, which is meant to return a supported pixel ratio that matches the
   * provided `pixelRatio` as close as possible.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Tile pixel ratio.
   */


  TileSource.prototype.getTilePixelRatio = function (pixelRatio) {
    return this.tilePixelRatio_;
  };
  /**
   * @param {number} z Z.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../size.js").Size} Tile size.
   */


  TileSource.prototype.getTilePixelSize = function (z, pixelRatio, projection) {
    var tileGrid = this.getTileGridForProjection(projection);
    var tilePixelRatio = this.getTilePixelRatio(pixelRatio);
    var tileSize = (0,size/* toSize */.Pq)(tileGrid.getTileSize(z), this.tmpSize);

    if (tilePixelRatio == 1) {
      return tileSize;
    } else {
      return (0,size/* scale */.bA)(tileSize, tilePixelRatio, this.tmpSize);
    }
  };
  /**
   * Returns a tile coordinate wrapped around the x-axis. When the tile coordinate
   * is outside the resolution and extent range of the tile grid, `null` will be
   * returned.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../proj/Projection.js").default} [opt_projection] Projection.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate to be passed to the tileUrlFunction or
   *     null if no tile URL should be created for the passed `tileCoord`.
   */


  TileSource.prototype.getTileCoordForTileUrlFunction = function (tileCoord, opt_projection) {
    var projection = opt_projection !== undefined ? opt_projection : this.getProjection();
    var tileGrid = this.getTileGridForProjection(projection);

    if (this.getWrapX() && projection.isGlobal()) {
      tileCoord = (0,tilegrid/* wrapX */.Cf)(tileGrid, tileCoord, projection);
    }

    return (0,tilecoord/* withinExtentAndZ */.tE)(tileCoord, tileGrid) ? tileCoord : null;
  };
  /**
   * Remove all cached tiles from the source. The next render cycle will fetch new tiles.
   * @api
   */


  TileSource.prototype.clear = function () {
    this.tileCache.clear();
  };

  TileSource.prototype.refresh = function () {
    this.clear();

    _super.prototype.refresh.call(this);
  };
  /**
   * Increases the cache size if needed
   * @param {number} tileCount Minimum number of tiles needed.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */


  TileSource.prototype.updateCacheSize = function (tileCount, projection) {
    var tileCache = this.getTileCacheForProjection(projection);

    if (tileCount > tileCache.highWaterMark) {
      tileCache.highWaterMark = tileCount;
    }
  };
  /**
   * Marks a tile coord as being used, without triggering a load.
   * @abstract
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */


  TileSource.prototype.useTile = function (z, x, y, projection) {};

  return TileSource;
}(Source/* default */.Z);
/**
 * @classdesc
 * Events emitted by {@link module:ol/source/Tile~TileSource} instances are instances of this
 * type.
 */


var TileSourceEvent =
/** @class */
function (_super) {
  __extends(TileSourceEvent, _super);
  /**
   * @param {string} type Type.
   * @param {import("../Tile.js").default} tile The tile.
   */


  function TileSourceEvent(type, tile) {
    var _this = _super.call(this, type) || this;
    /**
     * The tile related to the event.
     * @type {import("../Tile.js").default}
     * @api
     */


    _this.tile = tile;
    return _this;
  }

  return TileSourceEvent;
}(Event/* default */.ZP);


/* harmony default export */ const Tile = (TileSource);
// EXTERNAL MODULE: ./node_modules/ol/tileurlfunction.js
var tileurlfunction = __webpack_require__(3686);
;// CONCATENATED MODULE: ./node_modules/ol/source/UrlTile.js
var UrlTile_extends = undefined && undefined.__extends || function () {
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
 * @module ol/source/UrlTile
 */








/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Cache size.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection.
 * @property {import("./State.js").default} [state] State.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] TileGrid.
 * @property {import("../Tile.js").LoadFunction} tileLoadFunction TileLoadFunction.
 * @property {number} [tilePixelRatio] TilePixelRatio.
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] TileUrlFunction.
 * @property {string} [url] Url.
 * @property {Array<string>} [urls] Urls.
 * @property {boolean} [wrapX=true] WrapX.
 * @property {number} [transition] Transition.
 * @property {string} [key] Key.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0] ZDirection.
 */

/**
 * @classdesc
 * Base class for sources providing tiles divided into a tile grid over http.
 *
 * @fires import("./Tile.js").TileSourceEvent
 */

var UrlTile =
/** @class */
function (_super) {
  UrlTile_extends(UrlTile, _super);
  /**
   * @param {Options} options Image tile options.
   */


  function UrlTile(options) {
    var _this = _super.call(this, {
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      opaque: options.opaque,
      projection: options.projection,
      state: options.state,
      tileGrid: options.tileGrid,
      tilePixelRatio: options.tilePixelRatio,
      wrapX: options.wrapX,
      transition: options.transition,
      key: options.key,
      attributionsCollapsible: options.attributionsCollapsible,
      zDirection: options.zDirection
    }) || this;
    /**
     * @private
     * @type {boolean}
     */


    _this.generateTileUrlFunction_ = _this.tileUrlFunction === UrlTile.prototype.tileUrlFunction;
    /**
     * @protected
     * @type {import("../Tile.js").LoadFunction}
     */

    _this.tileLoadFunction = options.tileLoadFunction;

    if (options.tileUrlFunction) {
      _this.tileUrlFunction = options.tileUrlFunction;
    }
    /**
     * @protected
     * @type {!Array<string>|null}
     */


    _this.urls = null;

    if (options.urls) {
      _this.setUrls(options.urls);
    } else if (options.url) {
      _this.setUrl(options.url);
    }
    /**
     * @private
     * @type {!Object<string, boolean>}
     */


    _this.tileLoadingKeys_ = {};
    return _this;
  }
  /**
   * Return the tile load function of the source.
   * @return {import("../Tile.js").LoadFunction} TileLoadFunction
   * @api
   */


  UrlTile.prototype.getTileLoadFunction = function () {
    return this.tileLoadFunction;
  };
  /**
   * Return the tile URL function of the source.
   * @return {import("../Tile.js").UrlFunction} TileUrlFunction
   * @api
   */


  UrlTile.prototype.getTileUrlFunction = function () {
    return Object.getPrototypeOf(this).tileUrlFunction === this.tileUrlFunction ? this.tileUrlFunction.bind(this) : this.tileUrlFunction;
  };
  /**
   * Return the URLs used for this source.
   * When a tileUrlFunction is used instead of url or urls,
   * null will be returned.
   * @return {!Array<string>|null} URLs.
   * @api
   */


  UrlTile.prototype.getUrls = function () {
    return this.urls;
  };
  /**
   * Handle tile change events.
   * @param {import("../events/Event.js").default} event Event.
   * @protected
   */


  UrlTile.prototype.handleTileChange = function (event) {
    var tile =
    /** @type {import("../Tile.js").default} */
    event.target;
    var uid = (0,util/* getUid */.sq)(tile);
    var tileState = tile.getState();
    var type;

    if (tileState == TileState/* default.LOADING */.Z.LOADING) {
      this.tileLoadingKeys_[uid] = true;
      type = TileEventType.TILELOADSTART;
    } else if (uid in this.tileLoadingKeys_) {
      delete this.tileLoadingKeys_[uid];
      type = tileState == TileState/* default.ERROR */.Z.ERROR ? TileEventType.TILELOADERROR : tileState == TileState/* default.LOADED */.Z.LOADED ? TileEventType.TILELOADEND : undefined;
    }

    if (type != undefined) {
      this.dispatchEvent(new TileSourceEvent(type, tile));
    }
  };
  /**
   * Set the tile load function of the source.
   * @param {import("../Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @api
   */


  UrlTile.prototype.setTileLoadFunction = function (tileLoadFunction) {
    this.tileCache.clear();
    this.tileLoadFunction = tileLoadFunction;
    this.changed();
  };
  /**
   * Set the tile URL function of the source.
   * @param {import("../Tile.js").UrlFunction} tileUrlFunction Tile URL function.
   * @param {string} [key] Optional new tile key for the source.
   * @api
   */


  UrlTile.prototype.setTileUrlFunction = function (tileUrlFunction, key) {
    this.tileUrlFunction = tileUrlFunction;
    this.tileCache.pruneExceptNewestZ();

    if (typeof key !== 'undefined') {
      this.setKey(key);
    } else {
      this.changed();
    }
  };
  /**
   * Set the URL to use for requests.
   * @param {string} url URL.
   * @api
   */


  UrlTile.prototype.setUrl = function (url) {
    var urls = (0,tileurlfunction/* expandUrl */.Gk)(url);
    this.urls = urls;
    this.setUrls(urls);
  };
  /**
   * Set the URLs to use for requests.
   * @param {Array<string>} urls URLs.
   * @api
   */


  UrlTile.prototype.setUrls = function (urls) {
    this.urls = urls;
    var key = urls.join('\n');

    if (this.generateTileUrlFunction_) {
      this.setTileUrlFunction((0,tileurlfunction/* createFromTemplates */.uR)(urls, this.tileGrid), key);
    } else {
      this.setKey(key);
    }
  };
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {string|undefined} Tile URL.
   */


  UrlTile.prototype.tileUrlFunction = function (tileCoord, pixelRatio, projection) {
    return undefined;
  };
  /**
   * Marks a tile coord as being used, without triggering a load.
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   */


  UrlTile.prototype.useTile = function (z, x, y) {
    var tileCoordKey = (0,tilecoord/* getKeyZXY */.lg)(z, x, y);

    if (this.tileCache.containsKey(tileCoordKey)) {
      this.tileCache.get(tileCoordKey);
    }
  };

  return UrlTile;
}(Tile);

/* harmony default export */ const source_UrlTile = (UrlTile);

/***/ }),

/***/ 4787:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export VectorSourceEvent */
/* harmony import */ var _Collection_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1210);
/* harmony import */ var _CollectionEventType_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9890);
/* harmony import */ var _events_Event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/* harmony import */ var _events_EventType_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2140);
/* harmony import */ var _ObjectEventType_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(4314);
/* harmony import */ var _structs_RBush_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2134);
/* harmony import */ var _Source_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(2949);
/* harmony import */ var _State_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(669);
/* harmony import */ var _VectorEventType_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5389);
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3658);
/* harmony import */ var _loadingstrategy_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(543);
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4548);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(1046);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(3620);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2618);
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(9800);
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5750);
/* harmony import */ var _featureloader_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5052);
/**
 * @module ol/source/Vector
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
 * A function that takes an {@link module:ol/extent~Extent} and a resolution as arguments, and
 * returns an array of {@link module:ol/extent~Extent} with the extents to load. Usually this
 * is one of the standard {@link module:ol/loadingstrategy} strategies.
 *
 * @typedef {function(import("../extent.js").Extent, number, import("../proj/Projection.js").default): Array<import("../extent.js").Extent>} LoadingStrategy
 * @api
 */

/**
 * @classdesc
 * Events emitted by {@link module:ol/source/Vector} instances are instances of this
 * type.
 * @template {import("../geom/Geometry.js").default} Geometry
 */

var VectorSourceEvent =
/** @class */
function (_super) {
  __extends(VectorSourceEvent, _super);
  /**
   * @param {string} type Type.
   * @param {import("../Feature.js").default<Geometry>} [opt_feature] Feature.
   * @param {Array<import("../Feature.js").default<Geometry>>} [opt_features] Features.
   */


  function VectorSourceEvent(type, opt_feature, opt_features) {
    var _this = _super.call(this, type) || this;
    /**
     * The added or removed feature for the `ADDFEATURE` and `REMOVEFEATURE` events, `undefined` otherwise.
     * @type {import("../Feature.js").default<Geometry>|undefined}
     * @api
     */


    _this.feature = opt_feature;
    /**
     * The loaded features for the `FEATURESLOADED` event, `undefined` otherwise.
     * @type {Array<import("../Feature.js").default<Geometry>>|undefined}
     * @api
     */

    _this.features = opt_features;
    return _this;
  }

  return VectorSourceEvent;
}(_events_Event_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP);


/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("./VectorEventType").VectorSourceEventTypes, VectorSourceEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     import("./VectorEventType").VectorSourceEventTypes, Return>} VectorSourceOnSignature
 */

/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {Array<import("../Feature.js").default>|Collection<import("../Feature.js").default>} [features]
 * Features. If provided as {@link module:ol/Collection}, the features in the source
 * and the collection will stay in sync.
 * @property {import("../format/Feature.js").default} [format] The feature format used by the XHR
 * feature loader when `url` is set. Required if `url` is set, otherwise ignored.
 * @property {import("../featureloader.js").FeatureLoader} [loader]
 * The loader function used to load features, from a remote source for example.
 * If this is not set and `url` is set, the source will create and use an XHR
 * feature loader. The `'featuresloadend'` and `'featuresloaderror'` events
 * will only fire if the `success` and `failure` callbacks are used.
 *
 * Example:
 *
 * ```js
 * import {Vector} from 'ol/source';
 * import {GeoJSON} from 'ol/format';
 * import {bbox} from 'ol/loadingstrategy';
 *
 * var vectorSource = new Vector({
 *   format: new GeoJSON(),
 *   loader: function(extent, resolution, projection, success, failure) {
 *      var proj = projection.getCode();
 *      var url = 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
 *          'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
 *          'outputFormat=application/json&srsname=' + proj + '&' +
 *          'bbox=' + extent.join(',') + ',' + proj;
 *      var xhr = new XMLHttpRequest();
 *      xhr.open('GET', url);
 *      var onError = function() {
 *        vectorSource.removeLoadedExtent(extent);
 *        failure();
 *      }
 *      xhr.onerror = onError;
 *      xhr.onload = function() {
 *        if (xhr.status == 200) {
 *          var features = vectorSource.getFormat().readFeatures(xhr.responseText);
 *          vectorSource.addFeatures(features);
 *          success(features);
 *        } else {
 *          onError();
 *        }
 *      }
 *      xhr.send();
 *    },
 *    strategy: bbox
 *  });
 * ```
 * @property {boolean} [overlaps=true] This source may have overlapping geometries.
 * Setting this to `false` (e.g. for sources with polygons that represent administrative
 * boundaries or TopoJSON sources) allows the renderer to optimise fill and
 * stroke operations.
 * @property {LoadingStrategy} [strategy] The loading strategy to use.
 * By default an {@link module:ol/loadingstrategy.all}
 * strategy is used, a one-off strategy which loads all features at once.
 * @property {string|import("../featureloader.js").FeatureUrlFunction} [url]
 * Setting this option instructs the source to load features using an XHR loader
 * (see {@link module:ol/featureloader.xhr}). Use a `string` and an
 * {@link module:ol/loadingstrategy.all} for a one-off download of all features from
 * the given URL. Use a {@link module:ol/featureloader~FeatureUrlFunction} to generate the url with
 * other loading strategies.
 * Requires `format` to be set as well.
 * When default XHR feature loader is provided, the features will
 * be transformed from the data projection to the view projection
 * during parsing. If your remote data source does not advertise its projection
 * properly, this transformation will be incorrect. For some formats, the
 * default projection (usually EPSG:4326) can be overridden by setting the
 * dataProjection constructor option on the format.
 * Note that if a source contains non-feature data, such as a GeoJSON geometry
 * or a KML NetworkLink, these will be ignored. Use a custom loader to load these.
 * @property {boolean} [useSpatialIndex=true]
 * By default, an RTree is used as spatial index. When features are removed and
 * added frequently, and the total number of features is low, setting this to
 * `false` may improve performance.
 *
 * Note that
 * {@link module:ol/source/Vector~VectorSource#getFeaturesInExtent},
 * {@link module:ol/source/Vector~VectorSource#getClosestFeatureToCoordinate} and
 * {@link module:ol/source/Vector~VectorSource#getExtent} cannot be used when `useSpatialIndex` is
 * set to `false`, and {@link module:ol/source/Vector~VectorSource#forEachFeatureInExtent} will loop
 * through all features.
 *
 * When set to `false`, the features will be maintained in an
 * {@link module:ol/Collection}, which can be retrieved through
 * {@link module:ol/source/Vector~VectorSource#getFeaturesCollection}.
 * @property {boolean} [wrapX=true] Wrap the world horizontally. For vector editing across the
 * -180° and 180° meridians to work properly, this should be set to `false`. The
 * resulting geometry coordinates will then exceed the world bounds.
 */

/**
 * @classdesc
 * Provides a source of features for vector layers. Vector features provided
 * by this source are suitable for editing. See {@link module:ol/source/VectorTile~VectorTile} for
 * vector data that is optimized for rendering.
 *
 * @fires VectorSourceEvent
 * @api
 * @template {import("../geom/Geometry.js").default} Geometry
 */

var VectorSource =
/** @class */
function (_super) {
  __extends(VectorSource, _super);
  /**
   * @param {Options} [opt_options] Vector source options.
   */


  function VectorSource(opt_options) {
    var _this = this;

    var options = opt_options || {};
    _this = _super.call(this, {
      attributions: options.attributions,
      projection: undefined,
      state: _State_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].READY */ .Z.READY,
      wrapX: options.wrapX !== undefined ? options.wrapX : true
    }) || this;
    /***
     * @type {VectorSourceOnSignature<import("../events").EventsKey>}
     */

    _this.on;
    /***
     * @type {VectorSourceOnSignature<import("../events").EventsKey>}
     */

    _this.once;
    /***
     * @type {VectorSourceOnSignature<void>}
     */

    _this.un;
    /**
     * @private
     * @type {import("../featureloader.js").FeatureLoader}
     */

    _this.loader_ = _functions_js__WEBPACK_IMPORTED_MODULE_2__/* .VOID */ .Zn;
    /**
     * @private
     * @type {import("../format/Feature.js").default|undefined}
     */

    _this.format_ = options.format;
    /**
     * @private
     * @type {boolean}
     */

    _this.overlaps_ = options.overlaps === undefined ? true : options.overlaps;
    /**
     * @private
     * @type {string|import("../featureloader.js").FeatureUrlFunction|undefined}
     */

    _this.url_ = options.url;

    if (options.loader !== undefined) {
      _this.loader_ = options.loader;
    } else if (_this.url_ !== undefined) {
      (0,_asserts_js__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h)(_this.format_, 7); // `format` must be set when `url` is set
      // create a XHR feature loader for "url" and "format"

      _this.loader_ = (0,_featureloader_js__WEBPACK_IMPORTED_MODULE_4__/* .xhr */ .Be)(_this.url_,
      /** @type {import("../format/Feature.js").default} */
      _this.format_);
    }
    /**
     * @private
     * @type {LoadingStrategy}
     */


    _this.strategy_ = options.strategy !== undefined ? options.strategy : _loadingstrategy_js__WEBPACK_IMPORTED_MODULE_5__/* .all */ .$6;
    var useSpatialIndex = options.useSpatialIndex !== undefined ? options.useSpatialIndex : true;
    /**
     * @private
     * @type {RBush<import("../Feature.js").default<Geometry>>}
     */

    _this.featuresRtree_ = useSpatialIndex ? new _structs_RBush_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z() : null;
    /**
     * @private
     * @type {RBush<{extent: import("../extent.js").Extent}>}
     */

    _this.loadedExtentsRtree_ = new _structs_RBush_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z();
    /**
     * @type {number}
     * @private
     */

    _this.loadingExtentsCount_ = 0;
    /**
     * @private
     * @type {!Object<string, import("../Feature.js").default<Geometry>>}
     */

    _this.nullGeometryFeatures_ = {};
    /**
     * A lookup of features by id (the return from feature.getId()).
     * @private
     * @type {!Object<string, import("../Feature.js").default<Geometry>>}
     */

    _this.idIndex_ = {};
    /**
     * A lookup of features by uid (using getUid(feature)).
     * @private
     * @type {!Object<string, import("../Feature.js").default<Geometry>>}
     */

    _this.uidIndex_ = {};
    /**
     * @private
     * @type {Object<string, Array<import("../events.js").EventsKey>>}
     */

    _this.featureChangeKeys_ = {};
    /**
     * @private
     * @type {Collection<import("../Feature.js").default<Geometry>>}
     */

    _this.featuresCollection_ = null;
    var collection, features;

    if (Array.isArray(options.features)) {
      features = options.features;
    } else if (options.features) {
      collection = options.features;
      features = collection.getArray();
    }

    if (!useSpatialIndex && collection === undefined) {
      collection = new _Collection_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z(features);
    }

    if (features !== undefined) {
      _this.addFeaturesInternal(features);
    }

    if (collection !== undefined) {
      _this.bindFeaturesCollection_(collection);
    }

    return _this;
  }
  /**
   * Add a single feature to the source.  If you want to add a batch of features
   * at once, call {@link module:ol/source/Vector~VectorSource#addFeatures #addFeatures()}
   * instead. A feature will not be added to the source if feature with
   * the same id is already there. The reason for this behavior is to avoid
   * feature duplication when using bbox or tile loading strategies.
   * Note: this also applies if an {@link module:ol/Collection} is used for features,
   * meaning that if a feature with a duplicate id is added in the collection, it will
   * be removed from it right away.
   * @param {import("../Feature.js").default<Geometry>} feature Feature to add.
   * @api
   */


  VectorSource.prototype.addFeature = function (feature) {
    this.addFeatureInternal(feature);
    this.changed();
  };
  /**
   * Add a feature without firing a `change` event.
   * @param {import("../Feature.js").default<Geometry>} feature Feature.
   * @protected
   */


  VectorSource.prototype.addFeatureInternal = function (feature) {
    var featureKey = (0,_util_js__WEBPACK_IMPORTED_MODULE_8__/* .getUid */ .sq)(feature);

    if (!this.addToIndex_(featureKey, feature)) {
      if (this.featuresCollection_) {
        this.featuresCollection_.remove(feature);
      }

      return;
    }

    this.setupChangeEvents_(featureKey, feature);
    var geometry = feature.getGeometry();

    if (geometry) {
      var extent = geometry.getExtent();

      if (this.featuresRtree_) {
        this.featuresRtree_.insert(extent, feature);
      }
    } else {
      this.nullGeometryFeatures_[featureKey] = feature;
    }

    this.dispatchEvent(new VectorSourceEvent(_VectorEventType_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].ADDFEATURE */ .Z.ADDFEATURE, feature));
  };
  /**
   * @param {string} featureKey Unique identifier for the feature.
   * @param {import("../Feature.js").default<Geometry>} feature The feature.
   * @private
   */


  VectorSource.prototype.setupChangeEvents_ = function (featureKey, feature) {
    this.featureChangeKeys_[featureKey] = [(0,_events_js__WEBPACK_IMPORTED_MODULE_10__/* .listen */ .oL)(feature, _events_EventType_js__WEBPACK_IMPORTED_MODULE_11__/* ["default"].CHANGE */ .Z.CHANGE, this.handleFeatureChange_, this), (0,_events_js__WEBPACK_IMPORTED_MODULE_10__/* .listen */ .oL)(feature, _ObjectEventType_js__WEBPACK_IMPORTED_MODULE_12__/* ["default"].PROPERTYCHANGE */ .Z.PROPERTYCHANGE, this.handleFeatureChange_, this)];
  };
  /**
   * @param {string} featureKey Unique identifier for the feature.
   * @param {import("../Feature.js").default<Geometry>} feature The feature.
   * @return {boolean} The feature is "valid", in the sense that it is also a
   *     candidate for insertion into the Rtree.
   * @private
   */


  VectorSource.prototype.addToIndex_ = function (featureKey, feature) {
    var valid = true;
    var id = feature.getId();

    if (id !== undefined) {
      if (!(id.toString() in this.idIndex_)) {
        this.idIndex_[id.toString()] = feature;
      } else {
        valid = false;
      }
    }

    if (valid) {
      (0,_asserts_js__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h)(!(featureKey in this.uidIndex_), 30); // The passed `feature` was already added to the source

      this.uidIndex_[featureKey] = feature;
    }

    return valid;
  };
  /**
   * Add a batch of features to the source.
   * @param {Array<import("../Feature.js").default<Geometry>>} features Features to add.
   * @api
   */


  VectorSource.prototype.addFeatures = function (features) {
    this.addFeaturesInternal(features);
    this.changed();
  };
  /**
   * Add features without firing a `change` event.
   * @param {Array<import("../Feature.js").default<Geometry>>} features Features.
   * @protected
   */


  VectorSource.prototype.addFeaturesInternal = function (features) {
    var extents = [];
    var newFeatures = [];
    var geometryFeatures = [];

    for (var i = 0, length_1 = features.length; i < length_1; i++) {
      var feature = features[i];
      var featureKey = (0,_util_js__WEBPACK_IMPORTED_MODULE_8__/* .getUid */ .sq)(feature);

      if (this.addToIndex_(featureKey, feature)) {
        newFeatures.push(feature);
      }
    }

    for (var i = 0, length_2 = newFeatures.length; i < length_2; i++) {
      var feature = newFeatures[i];
      var featureKey = (0,_util_js__WEBPACK_IMPORTED_MODULE_8__/* .getUid */ .sq)(feature);
      this.setupChangeEvents_(featureKey, feature);
      var geometry = feature.getGeometry();

      if (geometry) {
        var extent = geometry.getExtent();
        extents.push(extent);
        geometryFeatures.push(feature);
      } else {
        this.nullGeometryFeatures_[featureKey] = feature;
      }
    }

    if (this.featuresRtree_) {
      this.featuresRtree_.load(extents, geometryFeatures);
    }

    for (var i = 0, length_3 = newFeatures.length; i < length_3; i++) {
      this.dispatchEvent(new VectorSourceEvent(_VectorEventType_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].ADDFEATURE */ .Z.ADDFEATURE, newFeatures[i]));
    }
  };
  /**
   * @param {!Collection<import("../Feature.js").default<Geometry>>} collection Collection.
   * @private
   */


  VectorSource.prototype.bindFeaturesCollection_ = function (collection) {
    var modifyingCollection = false;
    this.addEventListener(_VectorEventType_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].ADDFEATURE */ .Z.ADDFEATURE,
    /**
     * @param {VectorSourceEvent<Geometry>} evt The vector source event
     */
    function (evt) {
      if (!modifyingCollection) {
        modifyingCollection = true;
        collection.push(evt.feature);
        modifyingCollection = false;
      }
    });
    this.addEventListener(_VectorEventType_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].REMOVEFEATURE */ .Z.REMOVEFEATURE,
    /**
     * @param {VectorSourceEvent<Geometry>} evt The vector source event
     */
    function (evt) {
      if (!modifyingCollection) {
        modifyingCollection = true;
        collection.remove(evt.feature);
        modifyingCollection = false;
      }
    });
    collection.addEventListener(_CollectionEventType_js__WEBPACK_IMPORTED_MODULE_13__/* ["default"].ADD */ .Z.ADD,
    /**
     * @param {import("../Collection.js").CollectionEvent} evt The collection event
     */
    function (evt) {
      if (!modifyingCollection) {
        modifyingCollection = true;
        this.addFeature(
        /** @type {import("../Feature.js").default<Geometry>} */
        evt.element);
        modifyingCollection = false;
      }
    }.bind(this));
    collection.addEventListener(_CollectionEventType_js__WEBPACK_IMPORTED_MODULE_13__/* ["default"].REMOVE */ .Z.REMOVE,
    /**
     * @param {import("../Collection.js").CollectionEvent} evt The collection event
     */
    function (evt) {
      if (!modifyingCollection) {
        modifyingCollection = true;
        this.removeFeature(
        /** @type {import("../Feature.js").default<Geometry>} */
        evt.element);
        modifyingCollection = false;
      }
    }.bind(this));
    this.featuresCollection_ = collection;
  };
  /**
   * Remove all features from the source.
   * @param {boolean} [opt_fast] Skip dispatching of {@link module:ol/source/Vector.VectorSourceEvent#event:removefeature removefeature} events.
   * @api
   */


  VectorSource.prototype.clear = function (opt_fast) {
    if (opt_fast) {
      for (var featureId in this.featureChangeKeys_) {
        var keys = this.featureChangeKeys_[featureId];
        keys.forEach(_events_js__WEBPACK_IMPORTED_MODULE_10__/* .unlistenByKey */ .bN);
      }

      if (!this.featuresCollection_) {
        this.featureChangeKeys_ = {};
        this.idIndex_ = {};
        this.uidIndex_ = {};
      }
    } else {
      if (this.featuresRtree_) {
        this.featuresRtree_.forEach(this.removeFeatureInternal.bind(this));

        for (var id in this.nullGeometryFeatures_) {
          this.removeFeatureInternal(this.nullGeometryFeatures_[id]);
        }
      }
    }

    if (this.featuresCollection_) {
      this.featuresCollection_.clear();
    }

    if (this.featuresRtree_) {
      this.featuresRtree_.clear();
    }

    this.nullGeometryFeatures_ = {};
    var clearEvent = new VectorSourceEvent(_VectorEventType_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].CLEAR */ .Z.CLEAR);
    this.dispatchEvent(clearEvent);
    this.changed();
  };
  /**
   * Iterate through all features on the source, calling the provided callback
   * with each one.  If the callback returns any "truthy" value, iteration will
   * stop and the function will return the same value.
   * Note: this function only iterate through the feature that have a defined geometry.
   *
   * @param {function(import("../Feature.js").default<Geometry>): T} callback Called with each feature
   *     on the source.  Return a truthy value to stop iteration.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */


  VectorSource.prototype.forEachFeature = function (callback) {
    if (this.featuresRtree_) {
      return this.featuresRtree_.forEach(callback);
    } else if (this.featuresCollection_) {
      this.featuresCollection_.forEach(callback);
    }
  };
  /**
   * Iterate through all features whose geometries contain the provided
   * coordinate, calling the callback with each feature.  If the callback returns
   * a "truthy" value, iteration will stop and the function will return the same
   * value.
   *
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {function(import("../Feature.js").default<Geometry>): T} callback Called with each feature
   *     whose goemetry contains the provided coordinate.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   */


  VectorSource.prototype.forEachFeatureAtCoordinateDirect = function (coordinate, callback) {
    var extent = [coordinate[0], coordinate[1], coordinate[0], coordinate[1]];
    return this.forEachFeatureInExtent(extent, function (feature) {
      var geometry = feature.getGeometry();

      if (geometry.intersectsCoordinate(coordinate)) {
        return callback(feature);
      } else {
        return undefined;
      }
    });
  };
  /**
   * Iterate through all features whose bounding box intersects the provided
   * extent (note that the feature's geometry may not intersect the extent),
   * calling the callback with each feature.  If the callback returns a "truthy"
   * value, iteration will stop and the function will return the same value.
   *
   * If you are interested in features whose geometry intersects an extent, call
   * the {@link module:ol/source/Vector~VectorSource#forEachFeatureIntersectingExtent #forEachFeatureIntersectingExtent()} method instead.
   *
   * When `useSpatialIndex` is set to false, this method will loop through all
   * features, equivalent to {@link module:ol/source/Vector~VectorSource#forEachFeature #forEachFeature()}.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(import("../Feature.js").default<Geometry>): T} callback Called with each feature
   *     whose bounding box intersects the provided extent.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */


  VectorSource.prototype.forEachFeatureInExtent = function (extent, callback) {
    if (this.featuresRtree_) {
      return this.featuresRtree_.forEachInExtent(extent, callback);
    } else if (this.featuresCollection_) {
      this.featuresCollection_.forEach(callback);
    }
  };
  /**
   * Iterate through all features whose geometry intersects the provided extent,
   * calling the callback with each feature.  If the callback returns a "truthy"
   * value, iteration will stop and the function will return the same value.
   *
   * If you only want to test for bounding box intersection, call the
   * {@link module:ol/source/Vector~VectorSource#forEachFeatureInExtent #forEachFeatureInExtent()} method instead.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(import("../Feature.js").default<Geometry>): T} callback Called with each feature
   *     whose geometry intersects the provided extent.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */


  VectorSource.prototype.forEachFeatureIntersectingExtent = function (extent, callback) {
    return this.forEachFeatureInExtent(extent,
    /**
     * @param {import("../Feature.js").default<Geometry>} feature Feature.
     * @return {T|undefined} The return value from the last call to the callback.
     */
    function (feature) {
      var geometry = feature.getGeometry();

      if (geometry.intersectsExtent(extent)) {
        var result = callback(feature);

        if (result) {
          return result;
        }
      }
    });
  };
  /**
   * Get the features collection associated with this source. Will be `null`
   * unless the source was configured with `useSpatialIndex` set to `false`, or
   * with an {@link module:ol/Collection} as `features`.
   * @return {Collection<import("../Feature.js").default<Geometry>>} The collection of features.
   * @api
   */


  VectorSource.prototype.getFeaturesCollection = function () {
    return this.featuresCollection_;
  };
  /**
   * Get a snapshot of the features currently on the source in random order. The returned array
   * is a copy, the features are references to the features in the source.
   * @return {Array<import("../Feature.js").default<Geometry>>} Features.
   * @api
   */


  VectorSource.prototype.getFeatures = function () {
    var features;

    if (this.featuresCollection_) {
      features = this.featuresCollection_.getArray().slice(0);
    } else if (this.featuresRtree_) {
      features = this.featuresRtree_.getAll();

      if (!(0,_obj_js__WEBPACK_IMPORTED_MODULE_14__/* .isEmpty */ .xb)(this.nullGeometryFeatures_)) {
        (0,_array_js__WEBPACK_IMPORTED_MODULE_15__/* .extend */ .l7)(features, (0,_obj_js__WEBPACK_IMPORTED_MODULE_14__/* .getValues */ .KX)(this.nullGeometryFeatures_));
      }
    }

    return (
      /** @type {Array<import("../Feature.js").default<Geometry>>} */
      features
    );
  };
  /**
   * Get all features whose geometry intersects the provided coordinate.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {Array<import("../Feature.js").default<Geometry>>} Features.
   * @api
   */


  VectorSource.prototype.getFeaturesAtCoordinate = function (coordinate) {
    var features = [];
    this.forEachFeatureAtCoordinateDirect(coordinate, function (feature) {
      features.push(feature);
    });
    return features;
  };
  /**
   * Get all features whose bounding box intersects the provided extent.  Note that this returns an array of
   * all features intersecting the given extent in random order (so it may include
   * features whose geometries do not intersect the extent).
   *
   * When `useSpatialIndex` is set to false, this method will return all
   * features.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {Array<import("../Feature.js").default<Geometry>>} Features.
   * @api
   */


  VectorSource.prototype.getFeaturesInExtent = function (extent, featureAvailabilityDict = {}) {
    if (this.featuresRtree_) {
      return this.featuresRtree_.getInExtent(extent, featureAvailabilityDict);
    } else if (this.featuresCollection_) {
      return this.featuresCollection_.getArray().slice(0);
    } else {
      return [];
    }
  };

  VectorSource.prototype.getFeaturesInExtentForClustering = function (extent, featureAvailabilityDict, positionInfo, geometryCache, theCluster, featureRegionId, isClusteringByRegion) {
    if (this.featuresRtree_) {
      return this.featuresRtree_.getInExtentForClustering(extent, featureAvailabilityDict, positionInfo, geometryCache, theCluster, featureRegionId, isClusteringByRegion);
    } else if (this.featuresCollection_) {
      return this.featuresCollection_.getArray().slice(0);
    } else {
      return [];
    }
  };
  /**
   * Get the closest feature to the provided coordinate.
   *
   * This method is not available when the source is configured with
   * `useSpatialIndex` set to `false`.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {function(import("../Feature.js").default<Geometry>):boolean} [opt_filter] Feature filter function.
   *     The filter function will receive one argument, the {@link module:ol/Feature feature}
   *     and it should return a boolean value. By default, no filtering is made.
   * @return {import("../Feature.js").default<Geometry>} Closest feature.
   * @api
   */


  VectorSource.prototype.getClosestFeatureToCoordinate = function (coordinate, opt_filter) {
    // Find the closest feature using branch and bound.  We start searching an
    // infinite extent, and find the distance from the first feature found.  This
    // becomes the closest feature.  We then compute a smaller extent which any
    // closer feature must intersect.  We continue searching with this smaller
    // extent, trying to find a closer feature.  Every time we find a closer
    // feature, we update the extent being searched so that any even closer
    // feature must intersect it.  We continue until we run out of features.
    var x = coordinate[0];
    var y = coordinate[1];
    var closestFeature = null;
    var closestPoint = [NaN, NaN];
    var minSquaredDistance = Infinity;
    var extent = [-Infinity, -Infinity, Infinity, Infinity];
    var filter = opt_filter ? opt_filter : _functions_js__WEBPACK_IMPORTED_MODULE_2__/* .TRUE */ .uX;
    this.featuresRtree_.forEachInExtent(extent,
    /**
     * @param {import("../Feature.js").default<Geometry>} feature Feature.
     */
    function (feature) {
      if (filter(feature)) {
        var geometry = feature.getGeometry();
        var previousMinSquaredDistance = minSquaredDistance;
        minSquaredDistance = geometry.closestPointXY(x, y, closestPoint, minSquaredDistance);

        if (minSquaredDistance < previousMinSquaredDistance) {
          closestFeature = feature; // This is sneaky.  Reduce the extent that it is currently being
          // searched while the R-Tree traversal using this same extent object
          // is still in progress.  This is safe because the new extent is
          // strictly contained by the old extent.

          var minDistance = Math.sqrt(minSquaredDistance);
          extent[0] = x - minDistance;
          extent[1] = y - minDistance;
          extent[2] = x + minDistance;
          extent[3] = y + minDistance;
        }
      }
    });
    return closestFeature;
  };
  /**
   * Get the extent of the features currently in the source.
   *
   * This method is not available when the source is configured with
   * `useSpatialIndex` set to `false`.
   * @param {import("../extent.js").Extent} [opt_extent] Destination extent. If provided, no new extent
   *     will be created. Instead, that extent's coordinates will be overwritten.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */


  VectorSource.prototype.getExtent = function (opt_extent) {
    return this.featuresRtree_.getExtent(opt_extent);
  };
  /**
   * Get a feature by its identifier (the value returned by feature.getId()).
   * Note that the index treats string and numeric identifiers as the same.  So
   * `source.getFeatureById(2)` will return a feature with id `'2'` or `2`.
   *
   * @param {string|number} id Feature identifier.
   * @return {import("../Feature.js").default<Geometry>} The feature (or `null` if not found).
   * @api
   */


  VectorSource.prototype.getFeatureById = function (id) {
    var feature = this.idIndex_[id.toString()];
    return feature !== undefined ? feature : null;
  };
  /**
   * Get a feature by its internal unique identifier (using `getUid`).
   *
   * @param {string} uid Feature identifier.
   * @return {import("../Feature.js").default<Geometry>} The feature (or `null` if not found).
   */


  VectorSource.prototype.getFeatureByUid = function (uid) {
    var feature = this.uidIndex_[uid];
    return feature !== undefined ? feature : null;
  };
  /**
   * Get the format associated with this source.
   *
   * @return {import("../format/Feature.js").default|undefined} The feature format.
   * @api
   */


  VectorSource.prototype.getFormat = function () {
    return this.format_;
  };
  /**
   * @return {boolean} The source can have overlapping geometries.
   */


  VectorSource.prototype.getOverlaps = function () {
    return this.overlaps_;
  };
  /**
   * Get the url associated with this source.
   *
   * @return {string|import("../featureloader.js").FeatureUrlFunction|undefined} The url.
   * @api
   */


  VectorSource.prototype.getUrl = function () {
    return this.url_;
  };
  /**
   * @param {Event} event Event.
   * @private
   */


  VectorSource.prototype.handleFeatureChange_ = function (event) {
    var feature =
    /** @type {import("../Feature.js").default<Geometry>} */
    event.target;
    var featureKey = (0,_util_js__WEBPACK_IMPORTED_MODULE_8__/* .getUid */ .sq)(feature);
    var geometry = feature.getGeometry();

    if (!geometry) {
      if (!(featureKey in this.nullGeometryFeatures_)) {
        if (this.featuresRtree_) {
          this.featuresRtree_.remove(feature);
        }

        this.nullGeometryFeatures_[featureKey] = feature;
      }
    } else {
      var extent = geometry.getExtent();

      if (featureKey in this.nullGeometryFeatures_) {
        delete this.nullGeometryFeatures_[featureKey];

        if (this.featuresRtree_) {
          this.featuresRtree_.insert(extent, feature);
        }
      } else {
        if (this.featuresRtree_) {
          this.featuresRtree_.update(extent, feature);
        }
      }
    }

    var id = feature.getId();

    if (id !== undefined) {
      var sid = id.toString();

      if (this.idIndex_[sid] !== feature) {
        this.removeFromIdIndex_(feature);
        this.idIndex_[sid] = feature;
      }
    } else {
      this.removeFromIdIndex_(feature);
      this.uidIndex_[featureKey] = feature;
    }

    this.changed();
    this.dispatchEvent(new VectorSourceEvent(_VectorEventType_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].CHANGEFEATURE */ .Z.CHANGEFEATURE, feature));
  };
  /**
   * Returns true if the feature is contained within the source.
   * @param {import("../Feature.js").default<Geometry>} feature Feature.
   * @return {boolean} Has feature.
   * @api
   */


  VectorSource.prototype.hasFeature = function (feature) {
    var id = feature.getId();

    if (id !== undefined) {
      return id in this.idIndex_;
    } else {
      return (0,_util_js__WEBPACK_IMPORTED_MODULE_8__/* .getUid */ .sq)(feature) in this.uidIndex_;
    }
  };
  /**
   * @return {boolean} Is empty.
   */


  VectorSource.prototype.isEmpty = function () {
    return this.featuresRtree_.isEmpty() && (0,_obj_js__WEBPACK_IMPORTED_MODULE_14__/* .isEmpty */ .xb)(this.nullGeometryFeatures_);
  };
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */


  VectorSource.prototype.loadFeatures = function (extent, resolution, projection) {
    var loadedExtentsRtree = this.loadedExtentsRtree_;
    var extentsToLoad = this.strategy_(extent, resolution, projection);

    var _loop_1 = function (i, ii) {
      var extentToLoad = extentsToLoad[i];
      var alreadyLoaded = loadedExtentsRtree.forEachInExtent(extentToLoad,
      /**
       * @param {{extent: import("../extent.js").Extent}} object Object.
       * @return {boolean} Contains.
       */
      function (object) {
        return (0,_extent_js__WEBPACK_IMPORTED_MODULE_16__/* .containsExtent */ .r4)(object.extent, extentToLoad);
      });

      if (!alreadyLoaded) {
        ++this_1.loadingExtentsCount_;
        this_1.dispatchEvent(new VectorSourceEvent(_VectorEventType_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].FEATURESLOADSTART */ .Z.FEATURESLOADSTART));
        this_1.loader_.call(this_1, extentToLoad, resolution, projection, function (features) {
          --this.loadingExtentsCount_;
          this.dispatchEvent(new VectorSourceEvent(_VectorEventType_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].FEATURESLOADEND */ .Z.FEATURESLOADEND, undefined, features));
        }.bind(this_1), function () {
          --this.loadingExtentsCount_;
          this.dispatchEvent(new VectorSourceEvent(_VectorEventType_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].FEATURESLOADERROR */ .Z.FEATURESLOADERROR));
        }.bind(this_1));
        loadedExtentsRtree.insert(extentToLoad, {
          extent: extentToLoad.slice()
        });
      }
    };

    var this_1 = this;

    for (var i = 0, ii = extentsToLoad.length; i < ii; ++i) {
      _loop_1(i, ii);
    }

    this.loading = this.loader_.length < 4 ? false : this.loadingExtentsCount_ > 0;
  };

  VectorSource.prototype.refresh = function () {
    this.clear(true);
    this.loadedExtentsRtree_.clear();

    _super.prototype.refresh.call(this);
  };
  /**
   * Remove an extent from the list of loaded extents.
   * @param {import("../extent.js").Extent} extent Extent.
   * @api
   */


  VectorSource.prototype.removeLoadedExtent = function (extent) {
    var loadedExtentsRtree = this.loadedExtentsRtree_;
    var obj;
    loadedExtentsRtree.forEachInExtent(extent, function (object) {
      if ((0,_extent_js__WEBPACK_IMPORTED_MODULE_16__/* .equals */ .fS)(object.extent, extent)) {
        obj = object;
        return true;
      }
    });

    if (obj) {
      loadedExtentsRtree.remove(obj);
    }
  };
  /**
   * Remove a single feature from the source.  If you want to remove all features
   * at once, use the {@link module:ol/source/Vector~VectorSource#clear #clear()} method
   * instead.
   * @param {import("../Feature.js").default<Geometry>} feature Feature to remove.
   * @api
   */


  VectorSource.prototype.removeFeature = function (feature) {
    var featureKey = (0,_util_js__WEBPACK_IMPORTED_MODULE_8__/* .getUid */ .sq)(feature);

    if (featureKey in this.nullGeometryFeatures_) {
      delete this.nullGeometryFeatures_[featureKey];
    } else {
      if (this.featuresRtree_) {
        this.featuresRtree_.remove(feature);
      }
    }

    this.removeFeatureInternal(feature);
    this.changed();
  };
  /**
   * Remove feature without firing a `change` event.
   * @param {import("../Feature.js").default<Geometry>} feature Feature.
   * @protected
   */


  VectorSource.prototype.removeFeatureInternal = function (feature) {
    var featureKey = (0,_util_js__WEBPACK_IMPORTED_MODULE_8__/* .getUid */ .sq)(feature);
    this.featureChangeKeys_[featureKey].forEach(_events_js__WEBPACK_IMPORTED_MODULE_10__/* .unlistenByKey */ .bN);
    delete this.featureChangeKeys_[featureKey];
    var id = feature.getId();

    if (id !== undefined) {
      delete this.idIndex_[id.toString()];
    }

    delete this.uidIndex_[featureKey];
    this.dispatchEvent(new VectorSourceEvent(_VectorEventType_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].REMOVEFEATURE */ .Z.REMOVEFEATURE, feature));
  };
  /**
   * Remove a feature from the id index.  Called internally when the feature id
   * may have changed.
   * @param {import("../Feature.js").default<Geometry>} feature The feature.
   * @return {boolean} Removed the feature from the index.
   * @private
   */


  VectorSource.prototype.removeFromIdIndex_ = function (feature) {
    var removed = false;

    for (var id in this.idIndex_) {
      if (this.idIndex_[id] === feature) {
        delete this.idIndex_[id];
        removed = true;
        break;
      }
    }

    return removed;
  };
  /**
   * Set the new loader of the source. The next render cycle will use the
   * new loader.
   * @param {import("../featureloader.js").FeatureLoader} loader The loader to set.
   * @api
   */


  VectorSource.prototype.setLoader = function (loader) {
    this.loader_ = loader;
  };
  /**
   * Points the source to a new url. The next render cycle will use the new url.
   * @param {string|import("../featureloader.js").FeatureUrlFunction} url Url.
   * @api
   */


  VectorSource.prototype.setUrl = function (url) {
    (0,_asserts_js__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h)(this.format_, 7); // `format` must be set when `url` is set

    this.url_ = url;
    this.setLoader((0,_featureloader_js__WEBPACK_IMPORTED_MODULE_4__/* .xhr */ .Be)(url, this.format_));
  };

  return VectorSource;
}(_Source_js__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VectorSource);

/***/ }),

/***/ 5389:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/source/VectorEventType
 */

/**
 * @enum {string}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /**
   * Triggered when a feature is added to the source.
   * @event module:ol/source/Vector.VectorSourceEvent#addfeature
   * @api
   */
  ADDFEATURE: 'addfeature',

  /**
   * Triggered when a feature is updated.
   * @event module:ol/source/Vector.VectorSourceEvent#changefeature
   * @api
   */
  CHANGEFEATURE: 'changefeature',

  /**
   * Triggered when the clear method is called on the source.
   * @event module:ol/source/Vector.VectorSourceEvent#clear
   * @api
   */
  CLEAR: 'clear',

  /**
   * Triggered when a feature is removed from the source.
   * See {@link module:ol/source/Vector~VectorSource#clear source.clear()} for exceptions.
   * @event module:ol/source/Vector.VectorSourceEvent#removefeature
   * @api
   */
  REMOVEFEATURE: 'removefeature',

  /**
   * Triggered when features starts loading.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloadstart
   * @api
   */
  FEATURESLOADSTART: 'featuresloadstart',

  /**
   * Triggered when features finishes loading.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloadend
   * @api
   */
  FEATURESLOADEND: 'featuresloadend',

  /**
   * Triggered if feature loading results in an error.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloaderror
   * @api
   */
  FEATURESLOADERROR: 'featuresloaderror'
});
/**
 * @typedef {'addfeature'|'changefeature'|'clear'|'removefeature'|'featuresloadstart'|'featuresloadend'|'featuresloaderror'} VectorSourceEventTypes
 */

/***/ }),

/***/ 2370:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export defaultLoadFunction */
/* harmony import */ var _events_EventType_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2140);
/* harmony import */ var _VectorTile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2696);
/* harmony import */ var _TileCache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4158);
/* harmony import */ var _TileState_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(587);
/* harmony import */ var _UrlTile_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4925);
/* harmony import */ var _VectorRenderTile_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7887);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1046);
/* harmony import */ var _tilegrid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4958);
/* harmony import */ var _tilecoord_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5406);
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9800);
/* harmony import */ var _featureloader_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5052);
/* harmony import */ var _size_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7218);
/**
 * @module ol/source/VectorTile
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
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least twice the number of tiles in the viewport.
 * @property {import("../extent.js").Extent} [extent] Extent.
 * @property {import("../format/Feature.js").default} [format] Feature format for tiles. Used and required by the default.
 * @property {boolean} [overlaps=true] This source may have overlapping geometries. Setting this
 * to `false` (e.g. for sources with polygons that represent administrative
 * boundaries or TopoJSON sources) allows the renderer to optimise fill and
 * stroke operations.
 * @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Projection of the tile grid.
 * @property {import("./State.js").default} [state] Source state.
 * @property {typeof import("../VectorTile.js").default} [tileClass] Class used to instantiate image tiles.
 * Default is {@link module:ol/VectorTile}.
 * @property {number} [maxZoom=22] Optional max zoom level. Not used if `tileGrid` is provided.
 * @property {number} [minZoom] Optional min zoom level. Not used if `tileGrid` is provided.
 * @property {number|import("../size.js").Size} [tileSize=512] Optional tile size. Not used if `tileGrid` is provided.
 * @property {number} [maxResolution] Optional tile grid resolution at level zero. Not used if `tileGrid` is provided.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction]
 * Optional function to load a tile given a URL. Could look like this for pbf tiles:
 * ```js
 * function(tile, url) {
 *   tile.setLoader(function(extent, resolution, projection) {
 *     fetch(url).then(function(response) {
 *       response.arrayBuffer().then(function(data) {
 *         const format = tile.getFormat() // ol/format/MVT configured as source format
 *         const features = format.readFeatures(data, {
 *           extent: extent,
 *           featureProjection: projection
 *         });
 *         tile.setFeatures(features);
 *       });
 *     });
 *   });
 * }
 * ```
 * If you do not need extent, resolution and projection to get the features for a tile (e.g.
 * for GeoJSON tiles), your `tileLoadFunction` does not need a `setLoader()` call. Only make sure
 * to call `setFeatures()` on the tile:
 * ```js
 * const format = new GeoJSON({featureProjection: map.getView().getProjection()});
 * async function tileLoadFunction(tile, url) {
 *   const response = await fetch(url);
 *   const data = await response.json();
 *   tile.setFeatures(format.readFeatures(data));
 * }
 * ```
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Optional function to get tile URL given a tile coordinate and the projection.
 * @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 * A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`, may be
 * used instead of defining each one separately in the `urls` option.
 * @property {number} [transition] A duration for tile opacity
 * transitions in milliseconds. A duration of 0 disables the opacity transition.
 * @property {Array<string>} [urls] An array of URL templates.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * When set to `false`, only one world
 * will be rendered. When set to `true`, tiles will be wrapped horizontally to
 * render multiple worlds.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=1]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */

/**
 * @classdesc
 * Class for layer sources providing vector data divided into a tile grid, to be
 * used with {@link module:ol/layer/VectorTile~VectorTile}. Although this source receives tiles
 * with vector features from the server, it is not meant for feature editing.
 * Features are optimized for rendering, their geometries are clipped at or near
 * tile boundaries and simplified for a view resolution. See
 * {@link module:ol/source/Vector} for vector sources that are suitable for feature
 * editing.
 *
 * @fires import("./Tile.js").TileSourceEvent
 * @api
 */

var VectorTile =
/** @class */
function (_super) {
  __extends(VectorTile, _super);
  /**
   * @param {!Options} options Vector tile options.
   */


  function VectorTile(options) {
    var _this = this;

    var projection = options.projection || 'EPSG:3857';
    var extent = options.extent || (0,_tilegrid_js__WEBPACK_IMPORTED_MODULE_0__/* .extentFromProjection */ .Tl)(projection);
    var tileGrid = options.tileGrid || (0,_tilegrid_js__WEBPACK_IMPORTED_MODULE_0__/* .createXYZ */ .dl)({
      extent: extent,
      maxResolution: options.maxResolution,
      maxZoom: options.maxZoom !== undefined ? options.maxZoom : 22,
      minZoom: options.minZoom,
      tileSize: options.tileSize || 512
    });
    _this = _super.call(this, {
      attributions: options.attributions,
      attributionsCollapsible: options.attributionsCollapsible,
      cacheSize: options.cacheSize,
      opaque: false,
      projection: projection,
      state: options.state,
      tileGrid: tileGrid,
      tileLoadFunction: options.tileLoadFunction ? options.tileLoadFunction : defaultLoadFunction,
      tileUrlFunction: options.tileUrlFunction,
      url: options.url,
      urls: options.urls,
      wrapX: options.wrapX === undefined ? true : options.wrapX,
      transition: options.transition,
      zDirection: options.zDirection === undefined ? 1 : options.zDirection
    }) || this;
    /**
     * @private
     * @type {import("../format/Feature.js").default}
     */

    _this.format_ = options.format ? options.format : null;
    /**
     * @private
     * @type {TileCache}
     */

    _this.sourceTileCache = new _TileCache_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z(_this.tileCache.highWaterMark);
    /**
     * @private
     * @type {boolean}
     */

    _this.overlaps_ = options.overlaps == undefined ? true : options.overlaps;
    /**
     * @protected
     * @type {typeof import("../VectorTile.js").default}
     */

    _this.tileClass = options.tileClass ? options.tileClass : _VectorTile_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z;
    /**
     * @private
     * @type {Object<string, import("../tilegrid/TileGrid.js").default>}
     */

    _this.tileGrids_ = {};
    return _this;
  }
  /**
   * Get features whose bounding box intersects the provided extent. Only features for cached
   * tiles for the last rendered zoom level are available in the source. So this method is only
   * suitable for requesting tiles for extents that are currently rendered.
   *
   * Features are returned in random tile order and as they are included in the tiles. This means
   * they can be clipped, duplicated across tiles, and simplified to the render resolution.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {Array<import("../Feature.js").FeatureLike>} Features.
   * @api
   */


  VectorTile.prototype.getFeaturesInExtent = function (extent) {
    var features = [];
    var tileCache = this.tileCache;

    if (tileCache.getCount() === 0) {
      return features;
    }

    var z = (0,_tilecoord_js__WEBPACK_IMPORTED_MODULE_3__/* .fromKey */ .Ul)(tileCache.peekFirstKey())[0];
    var tileGrid = this.tileGrid;
    tileCache.forEach(function (tile) {
      if (tile.tileCoord[0] !== z || tile.getState() !== _TileState_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].LOADED */ .Z.LOADED) {
        return;
      }

      var sourceTiles = tile.getSourceTiles();

      for (var i = 0, ii = sourceTiles.length; i < ii; ++i) {
        var sourceTile = sourceTiles[i];
        var tileCoord = sourceTile.tileCoord;

        if ((0,_extent_js__WEBPACK_IMPORTED_MODULE_5__/* .intersects */ .kK)(extent, tileGrid.getTileCoordExtent(tileCoord))) {
          var tileFeatures = sourceTile.getFeatures();

          if (tileFeatures) {
            for (var j = 0, jj = tileFeatures.length; j < jj; ++j) {
              var candidate = tileFeatures[j];
              var geometry = candidate.getGeometry();

              if ((0,_extent_js__WEBPACK_IMPORTED_MODULE_5__/* .intersects */ .kK)(extent, geometry.getExtent())) {
                features.push(candidate);
              }
            }
          }
        }
      }
    });
    return features;
  };
  /**
   * @return {boolean} The source can have overlapping geometries.
   */


  VectorTile.prototype.getOverlaps = function () {
    return this.overlaps_;
  };
  /**
   * clear {@link module:ol/TileCache~TileCache} and delete all source tiles
   * @api
   */


  VectorTile.prototype.clear = function () {
    this.tileCache.clear();
    this.sourceTileCache.clear();
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {!Object<string, boolean>} usedTiles Used tiles.
   */


  VectorTile.prototype.expireCache = function (projection, usedTiles) {
    var tileCache = this.getTileCacheForProjection(projection);
    var usedSourceTiles = Object.keys(usedTiles).reduce(function (acc, key) {
      var cacheKey = (0,_tilecoord_js__WEBPACK_IMPORTED_MODULE_3__/* .getCacheKeyForTileKey */ .MY)(key);

      if (tileCache.containsKey(cacheKey)) {
        var sourceTiles = tileCache.get(cacheKey).sourceTiles;

        for (var i = 0, ii = sourceTiles.length; i < ii; ++i) {
          acc[sourceTiles[i].getKey()] = true;
        }
      }

      return acc;
    }, {});

    _super.prototype.expireCache.call(this, projection, usedTiles);

    this.sourceTileCache.expireCache(usedSourceTiles);
  };
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection").default} projection Projection.
   * @param {VectorRenderTile} tile Vector image tile.
   * @return {Array<import("../VectorTile").default>} Tile keys.
   */


  VectorTile.prototype.getSourceTiles = function (pixelRatio, projection, tile) {
    var _this = this;

    if (tile.getState() === _TileState_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].IDLE */ .Z.IDLE) {
      tile.setState(_TileState_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].LOADING */ .Z.LOADING);
      var urlTileCoord = tile.wrappedTileCoord;
      var tileGrid = this.getTileGridForProjection(projection);
      var extent = tileGrid.getTileCoordExtent(urlTileCoord);
      var z = urlTileCoord[0];
      var resolution = tileGrid.getResolution(z); // make extent 1 pixel smaller so we don't load tiles for < 0.5 pixel render space

      (0,_extent_js__WEBPACK_IMPORTED_MODULE_5__/* .buffer */ .f3)(extent, -resolution, extent);
      var sourceTileGrid_1 = this.tileGrid;
      var sourceExtent = sourceTileGrid_1.getExtent();

      if (sourceExtent) {
        (0,_extent_js__WEBPACK_IMPORTED_MODULE_5__/* .getIntersection */ .Ed)(extent, sourceExtent, extent);
      }

      var sourceZ = sourceTileGrid_1.getZForResolution(resolution, 1);
      sourceTileGrid_1.forEachTileCoord(extent, sourceZ, function (sourceTileCoord) {
        var tileUrl = _this.tileUrlFunction(sourceTileCoord, pixelRatio, projection);

        var sourceTile = _this.sourceTileCache.containsKey(tileUrl) ? _this.sourceTileCache.get(tileUrl) : new _this.tileClass(sourceTileCoord, tileUrl ? _TileState_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].IDLE */ .Z.IDLE : _TileState_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].EMPTY */ .Z.EMPTY, tileUrl, _this.format_, _this.tileLoadFunction);
        tile.sourceTiles.push(sourceTile);
        var sourceTileState = sourceTile.getState();

        if (sourceTileState < _TileState_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].LOADED */ .Z.LOADED) {
          var listenChange_1 = function (event) {
            _this.handleTileChange(event);

            var state = sourceTile.getState();

            if (state === _TileState_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].LOADED */ .Z.LOADED || state === _TileState_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].ERROR */ .Z.ERROR) {
              var sourceTileKey = sourceTile.getKey();

              if (sourceTileKey in tile.errorTileKeys) {
                if (sourceTile.getState() === _TileState_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].LOADED */ .Z.LOADED) {
                  delete tile.errorTileKeys[sourceTileKey];
                }
              } else {
                tile.loadingSourceTiles--;
              }

              if (state === _TileState_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].ERROR */ .Z.ERROR) {
                tile.errorTileKeys[sourceTileKey] = true;
              } else {
                sourceTile.removeEventListener(_events_EventType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].CHANGE */ .Z.CHANGE, listenChange_1);
              }

              if (tile.loadingSourceTiles === 0) {
                tile.setState((0,_obj_js__WEBPACK_IMPORTED_MODULE_7__/* .isEmpty */ .xb)(tile.errorTileKeys) ? _TileState_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].LOADED */ .Z.LOADED : _TileState_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].ERROR */ .Z.ERROR);
              }
            }
          };

          sourceTile.addEventListener(_events_EventType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].CHANGE */ .Z.CHANGE, listenChange_1);
          tile.loadingSourceTiles++;
        }

        if (sourceTileState === _TileState_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].IDLE */ .Z.IDLE) {
          sourceTile.extent = sourceTileGrid_1.getTileCoordExtent(sourceTileCoord);
          sourceTile.projection = projection;
          sourceTile.resolution = sourceTileGrid_1.getResolution(sourceTileCoord[0]);

          _this.sourceTileCache.set(tileUrl, sourceTile);

          sourceTile.load();
        }
      });

      if (!tile.loadingSourceTiles) {
        tile.setState(tile.sourceTiles.some(function (sourceTile) {
          return sourceTile.getState() === _TileState_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].ERROR */ .Z.ERROR;
        }) ? _TileState_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].ERROR */ .Z.ERROR : _TileState_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].LOADED */ .Z.LOADED);
      }
    }

    return tile.sourceTiles;
  };
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!VectorRenderTile} Tile.
   */


  VectorTile.prototype.getTile = function (z, x, y, pixelRatio, projection) {
    var coordKey = (0,_tilecoord_js__WEBPACK_IMPORTED_MODULE_3__/* .getKeyZXY */ .lg)(z, x, y);
    var key = this.getKey();
    var tile;

    if (this.tileCache.containsKey(coordKey)) {
      tile = this.tileCache.get(coordKey);

      if (tile.key === key) {
        return tile;
      }
    }

    var tileCoord = [z, x, y];
    var urlTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
    var sourceExtent = this.getTileGrid().getExtent();
    var tileGrid = this.getTileGridForProjection(projection);

    if (urlTileCoord && sourceExtent) {
      var tileExtent = tileGrid.getTileCoordExtent(urlTileCoord); // make extent 1 pixel smaller so we don't load tiles for < 0.5 pixel render space

      (0,_extent_js__WEBPACK_IMPORTED_MODULE_5__/* .buffer */ .f3)(tileExtent, -tileGrid.getResolution(z), tileExtent);

      if (!(0,_extent_js__WEBPACK_IMPORTED_MODULE_5__/* .intersects */ .kK)(sourceExtent, tileExtent)) {
        urlTileCoord = null;
      }
    }

    var empty = true;

    if (urlTileCoord !== null) {
      var sourceTileGrid = this.tileGrid;
      var resolution = tileGrid.getResolution(z);
      var sourceZ = sourceTileGrid.getZForResolution(resolution, 1); // make extent 1 pixel smaller so we don't load tiles for < 0.5 pixel render space

      var extent = tileGrid.getTileCoordExtent(urlTileCoord);
      (0,_extent_js__WEBPACK_IMPORTED_MODULE_5__/* .buffer */ .f3)(extent, -resolution, extent);
      sourceTileGrid.forEachTileCoord(extent, sourceZ, function (sourceTileCoord) {
        empty = empty && !this.tileUrlFunction(sourceTileCoord, pixelRatio, projection);
      }.bind(this));
    }

    var newTile = new _VectorRenderTile_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z(tileCoord, empty ? _TileState_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].EMPTY */ .Z.EMPTY : _TileState_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].IDLE */ .Z.IDLE, urlTileCoord, this.getSourceTiles.bind(this, pixelRatio, projection));
    newTile.key = key;

    if (tile) {
      newTile.interimTile = tile;
      newTile.refreshInterimChain();
      this.tileCache.replace(coordKey, newTile);
    } else {
      this.tileCache.set(coordKey, newTile);
    }

    return newTile;
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   */


  VectorTile.prototype.getTileGridForProjection = function (projection) {
    var code = projection.getCode();
    var tileGrid = this.tileGrids_[code];

    if (!tileGrid) {
      // A tile grid that matches the tile size of the source tile grid is more
      // likely to have 1:1 relationships between source tiles and rendered tiles.
      var sourceTileGrid = this.tileGrid;
      tileGrid = (0,_tilegrid_js__WEBPACK_IMPORTED_MODULE_0__/* .createForProjection */ .RZ)(projection, undefined, sourceTileGrid ? sourceTileGrid.getTileSize(sourceTileGrid.getMinZoom()) : undefined);
      this.tileGrids_[code] = tileGrid;
    }

    return tileGrid;
  };
  /**
   * Get the tile pixel ratio for this source.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Tile pixel ratio.
   */


  VectorTile.prototype.getTilePixelRatio = function (pixelRatio) {
    return pixelRatio;
  };
  /**
   * @param {number} z Z.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../size.js").Size} Tile size.
   */


  VectorTile.prototype.getTilePixelSize = function (z, pixelRatio, projection) {
    var tileGrid = this.getTileGridForProjection(projection);
    var tileSize = (0,_size_js__WEBPACK_IMPORTED_MODULE_9__/* .toSize */ .Pq)(tileGrid.getTileSize(z), this.tmpSize);
    return [Math.round(tileSize[0] * pixelRatio), Math.round(tileSize[1] * pixelRatio)];
  };
  /**
   * Increases the cache size if needed
   * @param {number} tileCount Minimum number of tiles needed.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */


  VectorTile.prototype.updateCacheSize = function (tileCount, projection) {
    _super.prototype.updateCacheSize.call(this, tileCount * 2, projection);

    this.sourceTileCache.highWaterMark = this.getTileCacheForProjection(projection).highWaterMark;
  };

  return VectorTile;
}(_UrlTile_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VectorTile);
/**
 * Sets the loader for a tile.
 * @param {import("../VectorTile.js").default} tile Vector tile.
 * @param {string} url URL.
 */

function defaultLoadFunction(tile, url) {
  tile.setLoader(
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */
  function (extent, resolution, projection) {
    (0,_featureloader_js__WEBPACK_IMPORTED_MODULE_11__/* .loadFeaturesXhr */ .ov)(url, tile.getFormat(), extent, resolution, projection, tile.onLoad.bind(tile), tile.onError.bind(tile));
  });
}

/***/ }),

/***/ 7969:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ source_XYZ)
});

// EXTERNAL MODULE: ./node_modules/ol/events/EventType.js
var EventType = __webpack_require__(2140);
// EXTERNAL MODULE: ./node_modules/ol/ImageTile.js
var ImageTile = __webpack_require__(5561);
// EXTERNAL MODULE: ./node_modules/ol/reproj/Tile.js + 2 modules
var Tile = __webpack_require__(1733);
// EXTERNAL MODULE: ./node_modules/ol/TileCache.js
var TileCache = __webpack_require__(4158);
// EXTERNAL MODULE: ./node_modules/ol/TileState.js
var TileState = __webpack_require__(587);
// EXTERNAL MODULE: ./node_modules/ol/source/UrlTile.js + 2 modules
var UrlTile = __webpack_require__(4925);
// EXTERNAL MODULE: ./node_modules/ol/reproj/common.js
var common = __webpack_require__(3154);
// EXTERNAL MODULE: ./node_modules/ol/source/common.js
var source_common = __webpack_require__(5888);
// EXTERNAL MODULE: ./node_modules/ol/proj.js + 2 modules
var ol_proj = __webpack_require__(8623);
// EXTERNAL MODULE: ./node_modules/ol/tilecoord.js
var tilecoord = __webpack_require__(5406);
// EXTERNAL MODULE: ./node_modules/ol/tilegrid.js + 1 modules
var tilegrid = __webpack_require__(4958);
// EXTERNAL MODULE: ./node_modules/ol/util.js
var util = __webpack_require__(2618);
;// CONCATENATED MODULE: ./node_modules/ol/source/TileImage.js
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
 * @module ol/source/TileImage
 */














/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [imageSmoothing=true] Enable image smoothing.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("./State.js").default} [state] Source state.
 * @property {typeof import("../ImageTile.js").default} [tileClass] Class used to instantiate image tiles.
 * Default is {@link module:ol/ImageTile~ImageTile}.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [tilePixelRatio=1] The pixel ratio used by the tile service. For example, if the tile
 * service advertizes 256px by 256px tiles but actually sends 512px
 * by 512px images (for retina/hidpi devices) then `tilePixelRatio`
 * should be set to `2`.
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Optional function to get tile URL given a tile coordinate and the projection.
 * @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 * A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`, may be
 * used instead of defining each one separately in the `urls` option.
 * @property {Array<string>} [urls] An array of URL templates.
 * @property {boolean} [wrapX] Whether to wrap the world horizontally. The default, is to
 * request out-of-bounds tiles from the server. When set to `false`, only one
 * world will be rendered. When set to `true`, tiles will be requested for one
 * world only, but they will be wrapped horizontally to render multiple worlds.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {string} [key] Optional tile key for proper cache fetching
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */

/**
 * @classdesc
 * Base class for sources providing images divided into a tile grid.
 *
 * @fires import("./Tile.js").TileSourceEvent
 * @api
 */

var TileImage =
/** @class */
function (_super) {
  __extends(TileImage, _super);
  /**
   * @param {!Options} options Image tile options.
   */


  function TileImage(options) {
    var _this = _super.call(this, {
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      opaque: options.opaque,
      projection: options.projection,
      state: options.state,
      tileGrid: options.tileGrid,
      tileLoadFunction: options.tileLoadFunction ? options.tileLoadFunction : defaultTileLoadFunction,
      tilePixelRatio: options.tilePixelRatio,
      tileUrlFunction: options.tileUrlFunction,
      url: options.url,
      urls: options.urls,
      wrapX: options.wrapX,
      transition: options.transition,
      key: options.key,
      attributionsCollapsible: options.attributionsCollapsible,
      zDirection: options.zDirection
    }) || this;
    /**
     * @protected
     * @type {?string}
     */


    _this.crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : null;
    /**
     * @protected
     * @type {typeof ImageTile}
     */

    _this.tileClass = options.tileClass !== undefined ? options.tileClass : ImageTile/* default */.Z;
    /**
     * @protected
     * @type {!Object<string, TileCache>}
     */

    _this.tileCacheForProjection = {};
    /**
     * @protected
     * @type {!Object<string, import("../tilegrid/TileGrid.js").default>}
     */

    _this.tileGridForProjection = {};
    /**
     * @private
     * @type {number|undefined}
     */

    _this.reprojectionErrorThreshold_ = options.reprojectionErrorThreshold;
    /**
     * @private
     * @type {object|undefined}
     */

    _this.contextOptions_ = options.imageSmoothing === false ? source_common/* IMAGE_SMOOTHING_DISABLED */.$ : undefined;
    /**
     * @private
     * @type {boolean}
     */

    _this.renderReprojectionEdges_ = false;
    return _this;
  }
  /**
   * @return {boolean} Can expire cache.
   */


  TileImage.prototype.canExpireCache = function () {
    if (!common/* ENABLE_RASTER_REPROJECTION */.j) {
      return _super.prototype.canExpireCache.call(this);
    }

    if (this.tileCache.canExpireCache()) {
      return true;
    } else {
      for (var key in this.tileCacheForProjection) {
        if (this.tileCacheForProjection[key].canExpireCache()) {
          return true;
        }
      }
    }

    return false;
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {!Object<string, boolean>} usedTiles Used tiles.
   */


  TileImage.prototype.expireCache = function (projection, usedTiles) {
    if (!common/* ENABLE_RASTER_REPROJECTION */.j) {
      _super.prototype.expireCache.call(this, projection, usedTiles);

      return;
    }

    var usedTileCache = this.getTileCacheForProjection(projection);
    this.tileCache.expireCache(this.tileCache == usedTileCache ? usedTiles : {});

    for (var id in this.tileCacheForProjection) {
      var tileCache = this.tileCacheForProjection[id];
      tileCache.expireCache(tileCache == usedTileCache ? usedTiles : {});
    }
  };
  /**
   * @return {Object|undefined} Context options.
   */


  TileImage.prototype.getContextOptions = function () {
    return this.contextOptions_;
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   */


  TileImage.prototype.getGutterForProjection = function (projection) {
    if (common/* ENABLE_RASTER_REPROJECTION */.j && this.getProjection() && projection && !(0,ol_proj/* equivalent */.OP)(this.getProjection(), projection)) {
      return 0;
    } else {
      return this.getGutter();
    }
  };
  /**
   * @return {number} Gutter.
   */


  TileImage.prototype.getGutter = function () {
    return 0;
  };
  /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   * @protected
   */


  TileImage.prototype.getKey = function () {
    return _super.prototype.getKey.call(this) + (this.contextOptions_ ? '\n' + JSON.stringify(this.contextOptions_) : '');
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {boolean} Opaque.
   */


  TileImage.prototype.getOpaque = function (projection) {
    if (common/* ENABLE_RASTER_REPROJECTION */.j && this.getProjection() && projection && !(0,ol_proj/* equivalent */.OP)(this.getProjection(), projection)) {
      return false;
    } else {
      return _super.prototype.getOpaque.call(this, projection);
    }
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   */


  TileImage.prototype.getTileGridForProjection = function (projection) {
    if (!common/* ENABLE_RASTER_REPROJECTION */.j) {
      return _super.prototype.getTileGridForProjection.call(this, projection);
    }

    var thisProj = this.getProjection();

    if (this.tileGrid && (!thisProj || (0,ol_proj/* equivalent */.OP)(thisProj, projection))) {
      return this.tileGrid;
    } else {
      var projKey = (0,util/* getUid */.sq)(projection);

      if (!(projKey in this.tileGridForProjection)) {
        this.tileGridForProjection[projKey] = (0,tilegrid/* getForProjection */.X$)(projection);
      }

      return this.tileGridForProjection[projKey];
    }
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../TileCache.js").default} Tile cache.
   */


  TileImage.prototype.getTileCacheForProjection = function (projection) {
    if (!common/* ENABLE_RASTER_REPROJECTION */.j) {
      return _super.prototype.getTileCacheForProjection.call(this, projection);
    }

    var thisProj = this.getProjection();

    if (!thisProj || (0,ol_proj/* equivalent */.OP)(thisProj, projection)) {
      return this.tileCache;
    } else {
      var projKey = (0,util/* getUid */.sq)(projection);

      if (!(projKey in this.tileCacheForProjection)) {
        this.tileCacheForProjection[projKey] = new TileCache/* default */.Z(this.tileCache.highWaterMark);
      }

      return this.tileCacheForProjection[projKey];
    }
  };
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {string} key The key set on the tile.
   * @return {!import("../Tile.js").default} Tile.
   * @private
   */


  TileImage.prototype.createTile_ = function (z, x, y, pixelRatio, projection, key) {
    var tileCoord = [z, x, y];
    var urlTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
    var tileUrl = urlTileCoord ? this.tileUrlFunction(urlTileCoord, pixelRatio, projection) : undefined;
    var tile = new this.tileClass(tileCoord, tileUrl !== undefined ? TileState/* default.IDLE */.Z.IDLE : TileState/* default.EMPTY */.Z.EMPTY, tileUrl !== undefined ? tileUrl : '', this.crossOrigin, this.tileLoadFunction, this.tileOptions);
    tile.key = key;
    tile.addEventListener(EventType/* default.CHANGE */.Z.CHANGE, this.handleTileChange.bind(this));
    return tile;
  };
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../Tile.js").default} Tile.
   */


  TileImage.prototype.getTile = function (z, x, y, pixelRatio, projection) {
    var sourceProjection = this.getProjection();

    if (!common/* ENABLE_RASTER_REPROJECTION */.j || !sourceProjection || !projection || (0,ol_proj/* equivalent */.OP)(sourceProjection, projection)) {
      return this.getTileInternal(z, x, y, pixelRatio, sourceProjection || projection);
    } else {
      var cache = this.getTileCacheForProjection(projection);
      var tileCoord = [z, x, y];
      var tile = void 0;
      var tileCoordKey = (0,tilecoord/* getKey */.km)(tileCoord);

      if (cache.containsKey(tileCoordKey)) {
        tile = cache.get(tileCoordKey);
      }

      var key = this.getKey();

      if (tile && tile.key == key) {
        return tile;
      } else {
        var sourceTileGrid = this.getTileGridForProjection(sourceProjection);
        var targetTileGrid = this.getTileGridForProjection(projection);
        var wrappedTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
        var newTile = new Tile/* default */.Z(sourceProjection, sourceTileGrid, projection, targetTileGrid, tileCoord, wrappedTileCoord, this.getTilePixelRatio(pixelRatio), this.getGutter(), function (z, x, y, pixelRatio) {
          return this.getTileInternal(z, x, y, pixelRatio, sourceProjection);
        }.bind(this), this.reprojectionErrorThreshold_, this.renderReprojectionEdges_, this.contextOptions_);
        newTile.key = key;

        if (tile) {
          newTile.interimTile = tile;
          newTile.refreshInterimChain();
          cache.replace(tileCoordKey, newTile);
        } else {
          cache.set(tileCoordKey, newTile);
        }

        return newTile;
      }
    }
  };
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {!import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../Tile.js").default} Tile.
   * @protected
   */


  TileImage.prototype.getTileInternal = function (z, x, y, pixelRatio, projection) {
    var tile = null;
    var tileCoordKey = (0,tilecoord/* getKeyZXY */.lg)(z, x, y);
    var key = this.getKey();

    if (!this.tileCache.containsKey(tileCoordKey)) {
      tile = this.createTile_(z, x, y, pixelRatio, projection, key);
      this.tileCache.set(tileCoordKey, tile);
    } else {
      tile = this.tileCache.get(tileCoordKey);

      if (tile.key != key) {
        // The source's params changed. If the tile has an interim tile and if we
        // can use it then we use it. Otherwise we create a new tile.  In both
        // cases we attempt to assign an interim tile to the new tile.
        var interimTile = tile;
        tile = this.createTile_(z, x, y, pixelRatio, projection, key); //make the new tile the head of the list,

        if (interimTile.getState() == TileState/* default.IDLE */.Z.IDLE) {
          //the old tile hasn't begun loading yet, and is now outdated, so we can simply discard it
          tile.interimTile = interimTile.interimTile;
        } else {
          tile.interimTile = interimTile;
        }

        tile.refreshInterimChain();
        this.tileCache.replace(tileCoordKey, tile);
      }
    }

    return tile;
  };
  /**
   * Sets whether to render reprojection edges or not (usually for debugging).
   * @param {boolean} render Render the edges.
   * @api
   */


  TileImage.prototype.setRenderReprojectionEdges = function (render) {
    if (!common/* ENABLE_RASTER_REPROJECTION */.j || this.renderReprojectionEdges_ == render) {
      return;
    }

    this.renderReprojectionEdges_ = render;

    for (var id in this.tileCacheForProjection) {
      this.tileCacheForProjection[id].clear();
    }

    this.changed();
  };
  /**
   * Sets the tile grid to use when reprojecting the tiles to the given
   * projection instead of the default tile grid for the projection.
   *
   * This can be useful when the default tile grid cannot be created
   * (e.g. projection has no extent defined) or
   * for optimization reasons (custom tile size, resolutions, ...).
   *
   * @param {import("../proj.js").ProjectionLike} projection Projection.
   * @param {import("../tilegrid/TileGrid.js").default} tilegrid Tile grid to use for the projection.
   * @api
   */


  TileImage.prototype.setTileGridForProjection = function (projection, tilegrid) {
    if (common/* ENABLE_RASTER_REPROJECTION */.j) {
      var proj = (0,ol_proj/* get */.U2)(projection);

      if (proj) {
        var projKey = (0,util/* getUid */.sq)(proj);

        if (!(projKey in this.tileGridForProjection)) {
          this.tileGridForProjection[projKey] = tilegrid;
        }
      }
    }
  };

  return TileImage;
}(UrlTile/* default */.Z);
/**
 * @param {ImageTile} imageTile Image tile.
 * @param {string} src Source.
 */


function defaultTileLoadFunction(imageTile, src) {
  /** @type {HTMLImageElement|HTMLVideoElement} */
  imageTile.getImage().src = src;
}

/* harmony default export */ const source_TileImage = (TileImage);
;// CONCATENATED MODULE: ./node_modules/ol/source/XYZ.js
/**
 * @module ol/source/XYZ
 */
var XYZ_extends = undefined && undefined.__extends || function () {
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
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [imageSmoothing=true] Enable image smoothing.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Projection.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {number} [maxZoom=42] Optional max zoom level. Not used if `tileGrid` is provided.
 * @property {number} [minZoom=0] Optional min zoom level. Not used if `tileGrid` is provided.
 * @property {number} [maxResolution] Optional tile grid resolution at level zero. Not used if `tileGrid` is provided.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [tilePixelRatio=1] The pixel ratio used by the tile service.
 * For example, if the tile service advertizes 256px by 256px tiles but actually sends 512px
 * by 512px images (for retina/hidpi devices) then `tilePixelRatio`
 * should be set to `2`.
 * @property {number|import("../size.js").Size} [tileSize=[256, 256]] The tile size used by the tile service.
 * Not used if `tileGrid` is provided.
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Optional function to get
 * tile URL given a tile coordinate and the projection.
 * Required if `url` or `urls` are not provided.
 * @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`,
 * and `{z}` placeholders. A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`,
 * may be used instead of defining each one separately in the `urls` option.
 * @property {Array<string>} [urls] An array of URL templates.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number} [transition=250] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */

/**
 * @classdesc
 * Layer source for tile data with URLs in a set XYZ format that are
 * defined in a URL template. By default, this follows the widely-used
 * Google grid where `x` 0 and `y` 0 are in the top left. Grids like
 * TMS where `x` 0 and `y` 0 are in the bottom left can be used by
 * using the `{-y}` placeholder in the URL template, so long as the
 * source does not have a custom tile grid. In this case
 * a `tileUrlFunction` can be used, such as:
 * ```js
 *  tileUrlFunction: function(coordinate) {
 *    return 'http://mapserver.com/' + coordinate[0] + '/' +
 *      coordinate[1] + '/' + (-coordinate[2] - 1) + '.png';
 *  }
 * ```
 * @api
 */

var XYZ =
/** @class */
function (_super) {
  XYZ_extends(XYZ, _super);
  /**
   * @param {Options} [opt_options] XYZ options.
   */


  function XYZ(opt_options) {
    var _this = this;

    var options = opt_options || {};
    var projection = options.projection !== undefined ? options.projection : 'EPSG:3857';
    var tileGrid = options.tileGrid !== undefined ? options.tileGrid : (0,tilegrid/* createXYZ */.dl)({
      extent: (0,tilegrid/* extentFromProjection */.Tl)(projection),
      maxResolution: options.maxResolution,
      maxZoom: options.maxZoom,
      minZoom: options.minZoom,
      tileSize: options.tileSize
    });
    _this = _super.call(this, {
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      imageSmoothing: options.imageSmoothing,
      opaque: options.opaque,
      projection: projection,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileGrid: tileGrid,
      tileLoadFunction: options.tileLoadFunction,
      tilePixelRatio: options.tilePixelRatio,
      tileUrlFunction: options.tileUrlFunction,
      url: options.url,
      urls: options.urls,
      wrapX: options.wrapX !== undefined ? options.wrapX : true,
      transition: options.transition,
      attributionsCollapsible: options.attributionsCollapsible,
      zDirection: options.zDirection
    }) || this;
    return _this;
  }

  return XYZ;
}(source_TileImage);

/* harmony default export */ const source_XYZ = (XYZ);

/***/ }),

/***/ 5888:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ IMAGE_SMOOTHING_DISABLED)
/* harmony export */ });
/* unused harmony export DEFAULT_WMS_VERSION */
/**
 * @module ol/source/common
 */

/**
 * Default WMS version.
 * @type {string}
 */
var DEFAULT_WMS_VERSION = '1.3.0';
/**
 * Context options to disable image smoothing.
 * @type {Object}
 */

var IMAGE_SMOOTHING_DISABLED = {
  imageSmoothingEnabled: false,
  msImageSmoothingEnabled: false
};

/***/ }),

/***/ 2674:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sp": () => (/* binding */ getDistance)
/* harmony export */ });
/* unused harmony exports DEFAULT_RADIUS, getLength, getArea, offset */
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4495);
/**
 * @module ol/sphere
 */


/**
 * Object literal with options for the {@link getLength} or {@link getArea}
 * functions.
 * @typedef {Object} SphereMetricOptions
 * @property {import("./proj.js").ProjectionLike} [projection='EPSG:3857']
 * Projection of the  geometry.  By default, the geometry is assumed to be in
 * Web Mercator.
 * @property {number} [radius=6371008.8] Sphere radius.  By default, the
 * [mean Earth radius](https://en.wikipedia.org/wiki/Earth_radius#Mean_radius)
 * for the WGS84 ellipsoid is used.
 */

/**
 * The mean Earth radius (1/3 * (2a + b)) for the WGS84 ellipsoid.
 * https://en.wikipedia.org/wiki/Earth_radius#Mean_radius
 * @type {number}
 */

var DEFAULT_RADIUS = 6371008.8;
/**
 * Get the great circle distance (in meters) between two geographic coordinates.
 * @param {Array} c1 Starting coordinate.
 * @param {Array} c2 Ending coordinate.
 * @param {number} [opt_radius] The sphere radius to use.  Defaults to the Earth's
 *     mean radius using the WGS84 ellipsoid.
 * @return {number} The great circle distance between the points (in meters).
 * @api
 */

function getDistance(c1, c2, opt_radius) {
  var radius = opt_radius || DEFAULT_RADIUS;
  var lat1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .toRadians */ .Yr)(c1[1]);
  var lat2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .toRadians */ .Yr)(c2[1]);
  var deltaLatBy2 = (lat2 - lat1) / 2;
  var deltaLonBy2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .toRadians */ .Yr)(c2[0] - c1[0]) / 2;
  var a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) + Math.sin(deltaLonBy2) * Math.sin(deltaLonBy2) * Math.cos(lat1) * Math.cos(lat2);
  return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
/**
 * Get the cumulative great circle length of linestring coordinates (geographic).
 * @param {Array} coordinates Linestring coordinates.
 * @param {number} radius The sphere radius to use.
 * @return {number} The length (in meters).
 */

function getLengthInternal(coordinates, radius) {
  var length = 0;

  for (var i = 0, ii = coordinates.length; i < ii - 1; ++i) {
    length += getDistance(coordinates[i], coordinates[i + 1], radius);
  }

  return length;
}
/**
 * Get the spherical length of a geometry.  This length is the sum of the
 * great circle distances between coordinates.  For polygons, the length is
 * the sum of all rings.  For points, the length is zero.  For multi-part
 * geometries, the length is the sum of the length of each part.
 * @param {import("./geom/Geometry.js").default} geometry A geometry.
 * @param {SphereMetricOptions} [opt_options] Options for the
 * length calculation.  By default, geometries are assumed to be in 'EPSG:3857'.
 * You can change this by providing a `projection` option.
 * @return {number} The spherical length (in meters).
 * @api
 */


function getLength(geometry, opt_options) {
  var options = opt_options || {};
  var radius = options.radius || DEFAULT_RADIUS;
  var projection = options.projection || 'EPSG:3857';
  var type = geometry.getType();

  if (type !== GeometryType.GEOMETRY_COLLECTION) {
    geometry = geometry.clone().transform(projection, 'EPSG:4326');
  }

  var length = 0;
  var coordinates, coords, i, ii, j, jj;

  switch (type) {
    case GeometryType.POINT:
    case GeometryType.MULTI_POINT:
      {
        break;
      }

    case GeometryType.LINE_STRING:
    case GeometryType.LINEAR_RING:
      {
        coordinates =
        /** @type {import("./geom/SimpleGeometry.js").default} */
        geometry.getCoordinates();
        length = getLengthInternal(coordinates, radius);
        break;
      }

    case GeometryType.MULTI_LINE_STRING:
    case GeometryType.POLYGON:
      {
        coordinates =
        /** @type {import("./geom/SimpleGeometry.js").default} */
        geometry.getCoordinates();

        for (i = 0, ii = coordinates.length; i < ii; ++i) {
          length += getLengthInternal(coordinates[i], radius);
        }

        break;
      }

    case GeometryType.MULTI_POLYGON:
      {
        coordinates =
        /** @type {import("./geom/SimpleGeometry.js").default} */
        geometry.getCoordinates();

        for (i = 0, ii = coordinates.length; i < ii; ++i) {
          coords = coordinates[i];

          for (j = 0, jj = coords.length; j < jj; ++j) {
            length += getLengthInternal(coords[j], radius);
          }
        }

        break;
      }

    case GeometryType.GEOMETRY_COLLECTION:
      {
        var geometries =
        /** @type {import("./geom/GeometryCollection.js").default} */
        geometry.getGeometries();

        for (i = 0, ii = geometries.length; i < ii; ++i) {
          length += getLength(geometries[i], opt_options);
        }

        break;
      }

    default:
      {
        throw new Error('Unsupported geometry type: ' + type);
      }
  }

  return length;
}
/**
 * Returns the spherical area for a list of coordinates.
 *
 * [Reference](https://trs.jpl.nasa.gov/handle/2014/40409)
 * Robert. G. Chamberlain and William H. Duquette, "Some Algorithms for
 * Polygons on a Sphere", JPL Publication 07-03, Jet Propulsion
 * Laboratory, Pasadena, CA, June 2007
 *
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates List of coordinates of a linear
 * ring. If the ring is oriented clockwise, the area will be positive,
 * otherwise it will be negative.
 * @param {number} radius The sphere radius.
 * @return {number} Area (in square meters).
 */

function getAreaInternal(coordinates, radius) {
  var area = 0;
  var len = coordinates.length;
  var x1 = coordinates[len - 1][0];
  var y1 = coordinates[len - 1][1];

  for (var i = 0; i < len; i++) {
    var x2 = coordinates[i][0];
    var y2 = coordinates[i][1];
    area += toRadians(x2 - x1) * (2 + Math.sin(toRadians(y1)) + Math.sin(toRadians(y2)));
    x1 = x2;
    y1 = y2;
  }

  return area * radius * radius / 2.0;
}
/**
 * Get the spherical area of a geometry.  This is the area (in meters) assuming
 * that polygon edges are segments of great circles on a sphere.
 * @param {import("./geom/Geometry.js").default} geometry A geometry.
 * @param {SphereMetricOptions} [opt_options] Options for the area
 *     calculation.  By default, geometries are assumed to be in 'EPSG:3857'.
 *     You can change this by providing a `projection` option.
 * @return {number} The spherical area (in square meters).
 * @api
 */


function getArea(geometry, opt_options) {
  var options = opt_options || {};
  var radius = options.radius || DEFAULT_RADIUS;
  var projection = options.projection || 'EPSG:3857';
  var type = geometry.getType();

  if (type !== GeometryType.GEOMETRY_COLLECTION) {
    geometry = geometry.clone().transform(projection, 'EPSG:4326');
  }

  var area = 0;
  var coordinates, coords, i, ii, j, jj;

  switch (type) {
    case GeometryType.POINT:
    case GeometryType.MULTI_POINT:
    case GeometryType.LINE_STRING:
    case GeometryType.MULTI_LINE_STRING:
    case GeometryType.LINEAR_RING:
      {
        break;
      }

    case GeometryType.POLYGON:
      {
        coordinates =
        /** @type {import("./geom/Polygon.js").default} */
        geometry.getCoordinates();
        area = Math.abs(getAreaInternal(coordinates[0], radius));

        for (i = 1, ii = coordinates.length; i < ii; ++i) {
          area -= Math.abs(getAreaInternal(coordinates[i], radius));
        }

        break;
      }

    case GeometryType.MULTI_POLYGON:
      {
        coordinates =
        /** @type {import("./geom/SimpleGeometry.js").default} */
        geometry.getCoordinates();

        for (i = 0, ii = coordinates.length; i < ii; ++i) {
          coords = coordinates[i];
          area += Math.abs(getAreaInternal(coords[0], radius));

          for (j = 1, jj = coords.length; j < jj; ++j) {
            area -= Math.abs(getAreaInternal(coords[j], radius));
          }
        }

        break;
      }

    case GeometryType.GEOMETRY_COLLECTION:
      {
        var geometries =
        /** @type {import("./geom/GeometryCollection.js").default} */
        geometry.getGeometries();

        for (i = 0, ii = geometries.length; i < ii; ++i) {
          area += getArea(geometries[i], opt_options);
        }

        break;
      }

    default:
      {
        throw new Error('Unsupported geometry type: ' + type);
      }
  }

  return area;
}
/**
 * Returns the coordinate at the given distance and bearing from `c1`.
 *
 * @param {import("./coordinate.js").Coordinate} c1 The origin point (`[lon, lat]` in degrees).
 * @param {number} distance The great-circle distance between the origin
 *     point and the target point.
 * @param {number} bearing The bearing (in radians).
 * @param {number} [opt_radius] The sphere radius to use.  Defaults to the Earth's
 *     mean radius using the WGS84 ellipsoid.
 * @return {import("./coordinate.js").Coordinate} The target point.
 */

function offset(c1, distance, bearing, opt_radius) {
  var radius = opt_radius || DEFAULT_RADIUS;
  var lat1 = toRadians(c1[1]);
  var lon1 = toRadians(c1[0]);
  var dByR = distance / radius;
  var lat = Math.asin(Math.sin(lat1) * Math.cos(dByR) + Math.cos(lat1) * Math.sin(dByR) * Math.cos(bearing));
  var lon = lon1 + Math.atan2(Math.sin(bearing) * Math.sin(dByR) * Math.cos(lat1), Math.cos(dByR) - Math.sin(lat1) * Math.sin(lat));
  return [toDegrees(lon), toDegrees(lat)];
}

/***/ })

}]);