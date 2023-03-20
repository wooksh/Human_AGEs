"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[436],{

/***/ 5406:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MY": () => (/* binding */ getCacheKeyForTileKey),
/* harmony export */   "T9": () => (/* binding */ createOrUpdate),
/* harmony export */   "Ul": () => (/* binding */ fromKey),
/* harmony export */   "km": () => (/* binding */ getKey),
/* harmony export */   "lg": () => (/* binding */ getKeyZXY),
/* harmony export */   "tE": () => (/* binding */ withinExtentAndZ),
/* harmony export */   "vp": () => (/* binding */ hash)
/* harmony export */ });
/**
 * @module ol/tilecoord
 */

/**
 * An array of three numbers representing the location of a tile in a tile
 * grid. The order is `z` (zoom level), `x` (column), and `y` (row).
 * @typedef {Array<number>} TileCoord
 * @api
 */

/**
 * @param {number} z Z.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {TileCoord} [opt_tileCoord] Tile coordinate.
 * @return {TileCoord} Tile coordinate.
 */
function createOrUpdate(z, x, y, opt_tileCoord) {
  if (opt_tileCoord !== undefined) {
    opt_tileCoord[0] = z;
    opt_tileCoord[1] = x;
    opt_tileCoord[2] = y;
    return opt_tileCoord;
  } else {
    return [z, x, y];
  }
}
/**
 * @param {number} z Z.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {string} Key.
 */

function getKeyZXY(z, x, y) {
  return z + '/' + x + '/' + y;
}
/**
 * Get the key for a tile coord.
 * @param {TileCoord} tileCoord The tile coord.
 * @return {string} Key.
 */

function getKey(tileCoord) {
  return getKeyZXY(tileCoord[0], tileCoord[1], tileCoord[2]);
}
/**
 * Get the tile cache key for a tile key obtained through `tile.getKey()`.
 * @param {string} tileKey The tile key.
 * @return {string} The cache key.
 */

function getCacheKeyForTileKey(tileKey) {
  var _a = tileKey.substring(tileKey.lastIndexOf('/') + 1, tileKey.length).split(',').map(Number),
      z = _a[0],
      x = _a[1],
      y = _a[2];

  return getKeyZXY(z, x, y);
}
/**
 * Get a tile coord given a key.
 * @param {string} key The tile coord key.
 * @return {TileCoord} The tile coord.
 */

function fromKey(key) {
  return key.split('/').map(Number);
}
/**
 * @param {TileCoord} tileCoord Tile coord.
 * @return {number} Hash.
 */

function hash(tileCoord) {
  return (tileCoord[1] << tileCoord[0]) + tileCoord[2];
}
/**
 * @param {TileCoord} tileCoord Tile coordinate.
 * @param {!import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {boolean} Tile coordinate is within extent and zoom level range.
 */

function withinExtentAndZ(tileCoord, tileGrid) {
  var z = tileCoord[0];
  var x = tileCoord[1];
  var y = tileCoord[2];

  if (tileGrid.getMinZoom() > z || z > tileGrid.getMaxZoom()) {
    return false;
  }

  var tileRange = tileGrid.getFullTileRange(z);

  if (!tileRange) {
    return true;
  } else {
    return tileRange.containsXY(x, y);
  }
}

/***/ }),

/***/ 4958:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "RZ": () => (/* binding */ createForProjection),
  "dl": () => (/* binding */ createXYZ),
  "Tl": () => (/* binding */ extentFromProjection),
  "X$": () => (/* binding */ getForProjection),
  "Cf": () => (/* binding */ wrapX)
});

// UNUSED EXPORTS: createForExtent

// EXTERNAL MODULE: ./node_modules/ol/extent/Corner.js
var Corner = __webpack_require__(4778);
// EXTERNAL MODULE: ./node_modules/ol/TileRange.js
var TileRange = __webpack_require__(3598);
// EXTERNAL MODULE: ./node_modules/ol/tilegrid/common.js
var common = __webpack_require__(3148);
// EXTERNAL MODULE: ./node_modules/ol/asserts.js
var asserts = __webpack_require__(4548);
// EXTERNAL MODULE: ./node_modules/ol/math.js
var math = __webpack_require__(4495);
// EXTERNAL MODULE: ./node_modules/ol/extent.js
var ol_extent = __webpack_require__(1046);
// EXTERNAL MODULE: ./node_modules/ol/tilecoord.js
var tilecoord = __webpack_require__(5406);
// EXTERNAL MODULE: ./node_modules/ol/array.js
var array = __webpack_require__(3620);
// EXTERNAL MODULE: ./node_modules/ol/size.js
var size = __webpack_require__(7218);
;// CONCATENATED MODULE: ./node_modules/ol/tilegrid/TileGrid.js
/**
 * @module ol/tilegrid/TileGrid
 */








/**
 * @private
 * @type {import("../tilecoord.js").TileCoord}
 */

var tmpTileCoord = [0, 0, 0];
/**
 * @typedef {Object} Options
 * @property {import("../extent.js").Extent} [extent] Extent for the tile grid. No tiles outside this
 * extent will be requested by {@link module:ol/source/Tile} sources. When no `origin` or
 * `origins` are configured, the `origin` will be set to the top-left corner of the extent.
 * @property {number} [minZoom=0] Minimum zoom.
 * @property {import("../coordinate.js").Coordinate} [origin] The tile grid origin, i.e. where the `x`
 * and `y` axes meet (`[z, 0, 0]`). Tile coordinates increase left to right and downwards. If not
 * specified, `extent` or `origins` must be provided.
 * @property {Array<import("../coordinate.js").Coordinate>} [origins] Tile grid origins, i.e. where
 * the `x` and `y` axes meet (`[z, 0, 0]`), for each zoom level. If given, the array length
 * should match the length of the `resolutions` array, i.e. each resolution can have a different
 * origin. Tile coordinates increase left to right and downwards. If not specified, `extent` or
 * `origin` must be provided.
 * @property {!Array<number>} resolutions Resolutions. The array index of each resolution needs
 * to match the zoom level. This means that even if a `minZoom` is configured, the resolutions
 * array will have a length of `maxZoom + 1`.
 * @property {Array<import("../size.js").Size>} [sizes] Number of tile rows and columns
 * of the grid for each zoom level. If specified the values
 * define each zoom level's extent together with the `origin` or `origins`.
 * A grid `extent` can be configured in addition, and will further limit the extent
 * for which tile requests are made by sources. If the bottom-left corner of
 * an extent is used as `origin` or `origins`, then the `y` value must be
 * negative because OpenLayers tile coordinates use the top left as the origin.
 * @property {number|import("../size.js").Size} [tileSize] Tile size.
 * Default is `[256, 256]`.
 * @property {Array<import("../size.js").Size>} [tileSizes] Tile sizes. If given, the array length
 * should match the length of the `resolutions` array, i.e. each resolution can have a different
 * tile size.
 */

/**
 * @classdesc
 * Base class for setting the grid pattern for sources accessing tiled-image
 * servers.
 * @api
 */

var TileGrid =
/** @class */
function () {
  /**
   * @param {Options} options Tile grid options.
   */
  function TileGrid(options) {
    /**
     * @protected
     * @type {number}
     */
    this.minZoom = options.minZoom !== undefined ? options.minZoom : 0;
    /**
     * @private
     * @type {!Array<number>}
     */

    this.resolutions_ = options.resolutions;
    (0,asserts/* assert */.h)((0,array/* isSorted */.pT)(this.resolutions_, function (a, b) {
      return b - a;
    }, true), 17); // `resolutions` must be sorted in descending order
    // check if we've got a consistent zoom factor and origin

    var zoomFactor;

    if (!options.origins) {
      for (var i = 0, ii = this.resolutions_.length - 1; i < ii; ++i) {
        if (!zoomFactor) {
          zoomFactor = this.resolutions_[i] / this.resolutions_[i + 1];
        } else {
          if (this.resolutions_[i] / this.resolutions_[i + 1] !== zoomFactor) {
            zoomFactor = undefined;
            break;
          }
        }
      }
    }
    /**
     * @private
     * @type {number|undefined}
     */


    this.zoomFactor_ = zoomFactor;
    /**
     * @protected
     * @type {number}
     */

    this.maxZoom = this.resolutions_.length - 1;
    /**
     * @private
     * @type {import("../coordinate.js").Coordinate}
     */

    this.origin_ = options.origin !== undefined ? options.origin : null;
    /**
     * @private
     * @type {Array<import("../coordinate.js").Coordinate>}
     */

    this.origins_ = null;

    if (options.origins !== undefined) {
      this.origins_ = options.origins;
      (0,asserts/* assert */.h)(this.origins_.length == this.resolutions_.length, 20); // Number of `origins` and `resolutions` must be equal
    }

    var extent = options.extent;

    if (extent !== undefined && !this.origin_ && !this.origins_) {
      this.origin_ = (0,ol_extent/* getTopLeft */.rL)(extent);
    }

    (0,asserts/* assert */.h)(!this.origin_ && this.origins_ || this.origin_ && !this.origins_, 18); // Either `origin` or `origins` must be configured, never both

    /**
     * @private
     * @type {Array<number|import("../size.js").Size>}
     */

    this.tileSizes_ = null;

    if (options.tileSizes !== undefined) {
      this.tileSizes_ = options.tileSizes;
      (0,asserts/* assert */.h)(this.tileSizes_.length == this.resolutions_.length, 19); // Number of `tileSizes` and `resolutions` must be equal
    }
    /**
     * @private
     * @type {number|import("../size.js").Size}
     */


    this.tileSize_ = options.tileSize !== undefined ? options.tileSize : !this.tileSizes_ ? common/* DEFAULT_TILE_SIZE */.S : null;
    (0,asserts/* assert */.h)(!this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_, 22); // Either `tileSize` or `tileSizes` must be configured, never both

    /**
     * @private
     * @type {import("../extent.js").Extent}
     */

    this.extent_ = extent !== undefined ? extent : null;
    /**
     * @private
     * @type {Array<import("../TileRange.js").default>}
     */

    this.fullTileRanges_ = null;
    /**
     * @private
     * @type {import("../size.js").Size}
     */

    this.tmpSize_ = [0, 0];
    /**
     * @private
     * @type {import("../extent.js").Extent}
     */

    this.tmpExtent_ = [0, 0, 0, 0];

    if (options.sizes !== undefined) {
      this.fullTileRanges_ = options.sizes.map(function (size, z) {
        var tileRange = new TileRange/* default */.Z(Math.min(0, size[0]), Math.max(size[0] - 1, -1), Math.min(0, size[1]), Math.max(size[1] - 1, -1));

        if (extent) {
          var restrictedTileRange = this.getTileRangeForExtentAndZ(extent, z);
          tileRange.minX = Math.max(restrictedTileRange.minX, tileRange.minX);
          tileRange.maxX = Math.min(restrictedTileRange.maxX, tileRange.maxX);
          tileRange.minY = Math.max(restrictedTileRange.minY, tileRange.minY);
          tileRange.maxY = Math.min(restrictedTileRange.maxY, tileRange.maxY);
        }

        return tileRange;
      }, this);
    } else if (extent) {
      this.calculateTileRanges_(extent);
    }
  }
  /**
   * Call a function with each tile coordinate for a given extent and zoom level.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} zoom Integer zoom level.
   * @param {function(import("../tilecoord.js").TileCoord): void} callback Function called with each tile coordinate.
   * @api
   */


  TileGrid.prototype.forEachTileCoord = function (extent, zoom, callback) {
    var tileRange = this.getTileRangeForExtentAndZ(extent, zoom);

    for (var i = tileRange.minX, ii = tileRange.maxX; i <= ii; ++i) {
      for (var j = tileRange.minY, jj = tileRange.maxY; j <= jj; ++j) {
        callback([zoom, i, j]);
      }
    }
  };
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {function(number, import("../TileRange.js").default): boolean} callback Callback.
   * @param {import("../TileRange.js").default} [opt_tileRange] Temporary import("../TileRange.js").default object.
   * @param {import("../extent.js").Extent} [opt_extent] Temporary import("../extent.js").Extent object.
   * @return {boolean} Callback succeeded.
   */


  TileGrid.prototype.forEachTileCoordParentTileRange = function (tileCoord, callback, opt_tileRange, opt_extent) {
    var tileRange, x, y;
    var tileCoordExtent = null;
    var z = tileCoord[0] - 1;

    if (this.zoomFactor_ === 2) {
      x = tileCoord[1];
      y = tileCoord[2];
    } else {
      tileCoordExtent = this.getTileCoordExtent(tileCoord, opt_extent);
    }

    while (z >= this.minZoom) {
      if (this.zoomFactor_ === 2) {
        x = Math.floor(x / 2);
        y = Math.floor(y / 2);
        tileRange = (0,TileRange/* createOrUpdate */.T)(x, x, y, y, opt_tileRange);
      } else {
        tileRange = this.getTileRangeForExtentAndZ(tileCoordExtent, z, opt_tileRange);
      }

      if (callback(z, tileRange)) {
        return true;
      }

      --z;
    }

    return false;
  };
  /**
   * Get the extent for this tile grid, if it was configured.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */


  TileGrid.prototype.getExtent = function () {
    return this.extent_;
  };
  /**
   * Get the maximum zoom level for the grid.
   * @return {number} Max zoom.
   * @api
   */


  TileGrid.prototype.getMaxZoom = function () {
    return this.maxZoom;
  };
  /**
   * Get the minimum zoom level for the grid.
   * @return {number} Min zoom.
   * @api
   */


  TileGrid.prototype.getMinZoom = function () {
    return this.minZoom;
  };
  /**
   * Get the origin for the grid at the given zoom level.
   * @param {number} z Integer zoom level.
   * @return {import("../coordinate.js").Coordinate} Origin.
   * @api
   */


  TileGrid.prototype.getOrigin = function (z) {
    if (this.origin_) {
      return this.origin_;
    } else {
      return this.origins_[z];
    }
  };
  /**
   * Get the resolution for the given zoom level.
   * @param {number} z Integer zoom level.
   * @return {number} Resolution.
   * @api
   */


  TileGrid.prototype.getResolution = function (z) {
    return this.resolutions_[z];
  };
  /**
   * Get the list of resolutions for the tile grid.
   * @return {Array<number>} Resolutions.
   * @api
   */


  TileGrid.prototype.getResolutions = function () {
    return this.resolutions_;
  };
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../TileRange.js").default} [opt_tileRange] Temporary import("../TileRange.js").default object.
   * @param {import("../extent.js").Extent} [opt_extent] Temporary import("../extent.js").Extent object.
   * @return {import("../TileRange.js").default} Tile range.
   */


  TileGrid.prototype.getTileCoordChildTileRange = function (tileCoord, opt_tileRange, opt_extent) {
    if (tileCoord[0] < this.maxZoom) {
      if (this.zoomFactor_ === 2) {
        var minX = tileCoord[1] * 2;
        var minY = tileCoord[2] * 2;
        return (0,TileRange/* createOrUpdate */.T)(minX, minX + 1, minY, minY + 1, opt_tileRange);
      }

      var tileCoordExtent = this.getTileCoordExtent(tileCoord, opt_extent || this.tmpExtent_);
      return this.getTileRangeForExtentAndZ(tileCoordExtent, tileCoord[0] + 1, opt_tileRange);
    }

    return null;
  };
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {number} z Integer zoom level.
   * @param {import("../TileRange.js").default} [opt_tileRange] Temporary import("../TileRange.js").default object.
   * @return {import("../TileRange.js").default} Tile range.
   */


  TileGrid.prototype.getTileRangeForTileCoordAndZ = function (tileCoord, z, opt_tileRange) {
    if (z > this.maxZoom || z < this.minZoom) {
      return null;
    }

    var tileCoordZ = tileCoord[0];
    var tileCoordX = tileCoord[1];
    var tileCoordY = tileCoord[2];

    if (z === tileCoordZ) {
      return (0,TileRange/* createOrUpdate */.T)(tileCoordX, tileCoordY, tileCoordX, tileCoordY, opt_tileRange);
    }

    if (this.zoomFactor_) {
      var factor = Math.pow(this.zoomFactor_, z - tileCoordZ);
      var minX = Math.floor(tileCoordX * factor);
      var minY = Math.floor(tileCoordY * factor);

      if (z < tileCoordZ) {
        return (0,TileRange/* createOrUpdate */.T)(minX, minX, minY, minY, opt_tileRange);
      }

      var maxX = Math.floor(factor * (tileCoordX + 1)) - 1;
      var maxY = Math.floor(factor * (tileCoordY + 1)) - 1;
      return (0,TileRange/* createOrUpdate */.T)(minX, maxX, minY, maxY, opt_tileRange);
    }

    var tileCoordExtent = this.getTileCoordExtent(tileCoord, this.tmpExtent_);
    return this.getTileRangeForExtentAndZ(tileCoordExtent, z, opt_tileRange);
  };
  /**
   * Get the extent for a tile range.
   * @param {number} z Integer zoom level.
   * @param {import("../TileRange.js").default} tileRange Tile range.
   * @param {import("../extent.js").Extent} [opt_extent] Temporary import("../extent.js").Extent object.
   * @return {import("../extent.js").Extent} Extent.
   */


  TileGrid.prototype.getTileRangeExtent = function (z, tileRange, opt_extent) {
    var origin = this.getOrigin(z);
    var resolution = this.getResolution(z);
    var tileSize = (0,size/* toSize */.Pq)(this.getTileSize(z), this.tmpSize_);
    var minX = origin[0] + tileRange.minX * tileSize[0] * resolution;
    var maxX = origin[0] + (tileRange.maxX + 1) * tileSize[0] * resolution;
    var minY = origin[1] + tileRange.minY * tileSize[1] * resolution;
    var maxY = origin[1] + (tileRange.maxY + 1) * tileSize[1] * resolution;
    return (0,ol_extent/* createOrUpdate */.T9)(minX, minY, maxX, maxY, opt_extent);
  };
  /**
   * Get a tile range for the given extent and integer zoom level.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} z Integer zoom level.
   * @param {import("../TileRange.js").default} [opt_tileRange] Temporary tile range object.
   * @return {import("../TileRange.js").default} Tile range.
   */


  TileGrid.prototype.getTileRangeForExtentAndZ = function (extent, z, opt_tileRange) {
    var tileCoord = tmpTileCoord;
    this.getTileCoordForXYAndZ_(extent[0], extent[3], z, false, tileCoord);
    var minX = tileCoord[1];
    var minY = tileCoord[2];
    this.getTileCoordForXYAndZ_(extent[2], extent[1], z, true, tileCoord);
    return (0,TileRange/* createOrUpdate */.T)(minX, tileCoord[1], minY, tileCoord[2], opt_tileRange);
  };
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {import("../coordinate.js").Coordinate} Tile center.
   */


  TileGrid.prototype.getTileCoordCenter = function (tileCoord) {
    var origin = this.getOrigin(tileCoord[0]);
    var resolution = this.getResolution(tileCoord[0]);
    var tileSize = (0,size/* toSize */.Pq)(this.getTileSize(tileCoord[0]), this.tmpSize_);
    return [origin[0] + (tileCoord[1] + 0.5) * tileSize[0] * resolution, origin[1] - (tileCoord[2] + 0.5) * tileSize[1] * resolution];
  };
  /**
   * Get the extent of a tile coordinate.
   *
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../extent.js").Extent} [opt_extent] Temporary extent object.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */


  TileGrid.prototype.getTileCoordExtent = function (tileCoord, opt_extent) {
    var origin = this.getOrigin(tileCoord[0]);
    var resolution = this.getResolution(tileCoord[0]);
    var tileSize = (0,size/* toSize */.Pq)(this.getTileSize(tileCoord[0]), this.tmpSize_);
    var minX = origin[0] + tileCoord[1] * tileSize[0] * resolution;
    var minY = origin[1] - (tileCoord[2] + 1) * tileSize[1] * resolution;
    var maxX = minX + tileSize[0] * resolution;
    var maxY = minY + tileSize[1] * resolution;
    return (0,ol_extent/* createOrUpdate */.T9)(minX, minY, maxX, maxY, opt_extent);
  };
  /**
   * Get the tile coordinate for the given map coordinate and resolution.  This
   * method considers that coordinates that intersect tile boundaries should be
   * assigned the higher tile coordinate.
   *
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @api
   */


  TileGrid.prototype.getTileCoordForCoordAndResolution = function (coordinate, resolution, opt_tileCoord) {
    return this.getTileCoordForXYAndResolution_(coordinate[0], coordinate[1], resolution, false, opt_tileCoord);
  };
  /**
   * Note that this method should not be called for resolutions that correspond
   * to an integer zoom level.  Instead call the `getTileCoordForXYAndZ_` method.
   * @param {number} x X.
   * @param {number} y Y.
   * @param {number} resolution Resolution (for a non-integer zoom level).
   * @param {boolean} reverseIntersectionPolicy Instead of letting edge
   *     intersections go to the higher tile coordinate, let edge intersections
   *     go to the lower tile coordinate.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @private
   */


  TileGrid.prototype.getTileCoordForXYAndResolution_ = function (x, y, resolution, reverseIntersectionPolicy, opt_tileCoord) {
    var z = this.getZForResolution(resolution);
    var scale = resolution / this.getResolution(z);
    var origin = this.getOrigin(z);
    var tileSize = (0,size/* toSize */.Pq)(this.getTileSize(z), this.tmpSize_);
    var adjustX = reverseIntersectionPolicy ? 0.5 : 0;
    var adjustY = reverseIntersectionPolicy ? 0.5 : 0;
    var xFromOrigin = Math.floor((x - origin[0]) / resolution + adjustX);
    var yFromOrigin = Math.floor((origin[1] - y) / resolution + adjustY);
    var tileCoordX = scale * xFromOrigin / tileSize[0];
    var tileCoordY = scale * yFromOrigin / tileSize[1];

    if (reverseIntersectionPolicy) {
      tileCoordX = Math.ceil(tileCoordX) - 1;
      tileCoordY = Math.ceil(tileCoordY) - 1;
    } else {
      tileCoordX = Math.floor(tileCoordX);
      tileCoordY = Math.floor(tileCoordY);
    }

    return (0,tilecoord/* createOrUpdate */.T9)(z, tileCoordX, tileCoordY, opt_tileCoord);
  };
  /**
   * Although there is repetition between this method and `getTileCoordForXYAndResolution_`,
   * they should have separate implementations.  This method is for integer zoom
   * levels.  The other method should only be called for resolutions corresponding
   * to non-integer zoom levels.
   * @param {number} x Map x coordinate.
   * @param {number} y Map y coordinate.
   * @param {number} z Integer zoom level.
   * @param {boolean} reverseIntersectionPolicy Instead of letting edge
   *     intersections go to the higher tile coordinate, let edge intersections
   *     go to the lower tile coordinate.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @private
   */


  TileGrid.prototype.getTileCoordForXYAndZ_ = function (x, y, z, reverseIntersectionPolicy, opt_tileCoord) {
    var origin = this.getOrigin(z);
    var resolution = this.getResolution(z);
    var tileSize = (0,size/* toSize */.Pq)(this.getTileSize(z), this.tmpSize_);
    var adjustX = reverseIntersectionPolicy ? 0.5 : 0;
    var adjustY = reverseIntersectionPolicy ? 0.5 : 0;
    var xFromOrigin = Math.floor((x - origin[0]) / resolution + adjustX);
    var yFromOrigin = Math.floor((origin[1] - y) / resolution + adjustY);
    var tileCoordX = xFromOrigin / tileSize[0];
    var tileCoordY = yFromOrigin / tileSize[1];

    if (reverseIntersectionPolicy) {
      tileCoordX = Math.ceil(tileCoordX) - 1;
      tileCoordY = Math.ceil(tileCoordY) - 1;
    } else {
      tileCoordX = Math.floor(tileCoordX);
      tileCoordY = Math.floor(tileCoordY);
    }

    return (0,tilecoord/* createOrUpdate */.T9)(z, tileCoordX, tileCoordY, opt_tileCoord);
  };
  /**
   * Get a tile coordinate given a map coordinate and zoom level.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} z Zoom level.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @api
   */


  TileGrid.prototype.getTileCoordForCoordAndZ = function (coordinate, z, opt_tileCoord) {
    return this.getTileCoordForXYAndZ_(coordinate[0], coordinate[1], z, false, opt_tileCoord);
  };
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {number} Tile resolution.
   */


  TileGrid.prototype.getTileCoordResolution = function (tileCoord) {
    return this.resolutions_[tileCoord[0]];
  };
  /**
   * Get the tile size for a zoom level. The type of the return value matches the
   * `tileSize` or `tileSizes` that the tile grid was configured with. To always
   * get an `import("../size.js").Size`, run the result through `import("../size.js").Size.toSize()`.
   * @param {number} z Z.
   * @return {number|import("../size.js").Size} Tile size.
   * @api
   */


  TileGrid.prototype.getTileSize = function (z) {
    if (this.tileSize_) {
      return this.tileSize_;
    } else {
      return this.tileSizes_[z];
    }
  };
  /**
   * @param {number} z Zoom level.
   * @return {import("../TileRange.js").default} Extent tile range for the specified zoom level.
   */


  TileGrid.prototype.getFullTileRange = function (z) {
    if (!this.fullTileRanges_) {
      return this.extent_ ? this.getTileRangeForExtentAndZ(this.extent_, z) : null;
    } else {
      return this.fullTileRanges_[z];
    }
  };
  /**
   * @param {number} resolution Resolution.
   * @param {number|import("../array.js").NearestDirectionFunction} [opt_direction]
   *     If 0, the nearest resolution will be used.
   *     If 1, the nearest higher resolution (lower Z) will be used. If -1, the
   *     nearest lower resolution (higher Z) will be used. Default is 0.
   *     Use a {@link module:ol/array~NearestDirectionFunction} for more precise control.
   *
   * For example to change tile Z at the midpoint of zoom levels
   * ```js
   * function(value, high, low) {
   *   return value - low * Math.sqrt(high / low);
   * }
   * ```
   * @return {number} Z.
   * @api
   */


  TileGrid.prototype.getZForResolution = function (resolution, opt_direction) {
    var z = (0,array/* linearFindNearest */.h7)(this.resolutions_, resolution, opt_direction || 0);
    return (0,math/* clamp */.uZ)(z, this.minZoom, this.maxZoom);
  };
  /**
   * @param {!import("../extent.js").Extent} extent Extent for this tile grid.
   * @private
   */


  TileGrid.prototype.calculateTileRanges_ = function (extent) {
    var length = this.resolutions_.length;
    var fullTileRanges = new Array(length);

    for (var z = this.minZoom; z < length; ++z) {
      fullTileRanges[z] = this.getTileRangeForExtentAndZ(extent, z);
    }

    this.fullTileRanges_ = fullTileRanges;
  };

  return TileGrid;
}();

/* harmony default export */ const tilegrid_TileGrid = (TileGrid);
// EXTERNAL MODULE: ./node_modules/ol/proj/Units.js
var Units = __webpack_require__(3977);
// EXTERNAL MODULE: ./node_modules/ol/proj.js + 2 modules
var proj = __webpack_require__(8623);
;// CONCATENATED MODULE: ./node_modules/ol/tilegrid.js
/**
 * @module ol/tilegrid
 */







/**
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {!TileGrid} Default tile grid for the
 * passed projection.
 */

function getForProjection(projection) {
  var tileGrid = projection.getDefaultTileGrid();

  if (!tileGrid) {
    tileGrid = createForProjection(projection);
    projection.setDefaultTileGrid(tileGrid);
  }

  return tileGrid;
}
/**
 * @param {TileGrid} tileGrid Tile grid.
 * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {import("./tilecoord.js").TileCoord} Tile coordinate.
 */

function wrapX(tileGrid, tileCoord, projection) {
  var z = tileCoord[0];
  var center = tileGrid.getTileCoordCenter(tileCoord);
  var projectionExtent = extentFromProjection(projection);

  if (!(0,ol_extent/* containsCoordinate */.b8)(projectionExtent, center)) {
    var worldWidth = (0,ol_extent/* getWidth */.dz)(projectionExtent);
    var worldsAway = Math.ceil((projectionExtent[0] - center[0]) / worldWidth);
    center[0] += worldWidth * worldsAway;
    return tileGrid.getTileCoordForCoordAndZ(center, z);
  } else {
    return tileCoord;
  }
}
/**
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} [opt_maxZoom] Maximum zoom level (default is
 *     DEFAULT_MAX_ZOOM).
 * @param {number|import("./size.js").Size} [opt_tileSize] Tile size (default uses
 *     DEFAULT_TILE_SIZE).
 * @param {import("./extent/Corner.js").default} [opt_corner] Extent corner (default is `'top-left'`).
 * @return {!TileGrid} TileGrid instance.
 */

function createForExtent(extent, opt_maxZoom, opt_tileSize, opt_corner) {
  var corner = opt_corner !== undefined ? opt_corner : Corner/* default.TOP_LEFT */.Z.TOP_LEFT;
  var resolutions = resolutionsFromExtent(extent, opt_maxZoom, opt_tileSize);
  return new tilegrid_TileGrid({
    extent: extent,
    origin: (0,ol_extent/* getCorner */.g0)(extent, corner),
    resolutions: resolutions,
    tileSize: opt_tileSize
  });
}
/**
 * @typedef {Object} XYZOptions
 * @property {import("./extent.js").Extent} [extent] Extent for the tile grid. The origin for an XYZ tile grid is the
 * top-left corner of the extent. If `maxResolution` is not provided the zero level of the grid is defined by the resolution
 * at which one tile fits in the provided extent. If not provided, the extent of the EPSG:3857 projection is used.
 * @property {number} [maxResolution] Resolution at level zero.
 * @property {number} [maxZoom] Maximum zoom. The default is `42`. This determines the number of levels
 * in the grid set. For example, a `maxZoom` of 21 means there are 22 levels in the grid set.
 * @property {number} [minZoom=0] Minimum zoom.
 * @property {number|import("./size.js").Size} [tileSize=[256, 256]] Tile size in pixels.
 */

/**
 * Creates a tile grid with a standard XYZ tiling scheme.
 * @param {XYZOptions} [opt_options] Tile grid options.
 * @return {!TileGrid} Tile grid instance.
 * @api
 */

function createXYZ(opt_options) {
  var xyzOptions = opt_options || {};
  var extent = xyzOptions.extent || (0,proj/* get */.U2)('EPSG:3857').getExtent();
  var gridOptions = {
    extent: extent,
    minZoom: xyzOptions.minZoom,
    tileSize: xyzOptions.tileSize,
    resolutions: resolutionsFromExtent(extent, xyzOptions.maxZoom, xyzOptions.tileSize, xyzOptions.maxResolution)
  };
  return new tilegrid_TileGrid(gridOptions);
}
/**
 * Create a resolutions array from an extent.  A zoom factor of 2 is assumed.
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} [opt_maxZoom] Maximum zoom level (default is
 *     DEFAULT_MAX_ZOOM).
 * @param {number|import("./size.js").Size} [opt_tileSize] Tile size (default uses
 *     DEFAULT_TILE_SIZE).
 * @param {number} [opt_maxResolution] Resolution at level zero.
 * @return {!Array<number>} Resolutions array.
 */

function resolutionsFromExtent(extent, opt_maxZoom, opt_tileSize, opt_maxResolution) {
  var maxZoom = opt_maxZoom !== undefined ? opt_maxZoom : common/* DEFAULT_MAX_ZOOM */.e;
  var height = (0,ol_extent/* getHeight */.Cr)(extent);
  var width = (0,ol_extent/* getWidth */.dz)(extent);
  var tileSize = (0,size/* toSize */.Pq)(opt_tileSize !== undefined ? opt_tileSize : common/* DEFAULT_TILE_SIZE */.S);
  var maxResolution = opt_maxResolution > 0 ? opt_maxResolution : Math.max(width / tileSize[0], height / tileSize[1]);
  var length = maxZoom + 1;
  var resolutions = new Array(length);

  for (var z = 0; z < length; ++z) {
    resolutions[z] = maxResolution / Math.pow(2, z);
  }

  return resolutions;
}
/**
 * @param {import("./proj.js").ProjectionLike} projection Projection.
 * @param {number} [opt_maxZoom] Maximum zoom level (default is
 *     DEFAULT_MAX_ZOOM).
 * @param {number|import("./size.js").Size} [opt_tileSize] Tile size (default uses
 *     DEFAULT_TILE_SIZE).
 * @param {import("./extent/Corner.js").default} [opt_corner] Extent corner (default is `'top-left'`).
 * @return {!TileGrid} TileGrid instance.
 */


function createForProjection(projection, opt_maxZoom, opt_tileSize, opt_corner) {
  var extent = extentFromProjection(projection);
  return createForExtent(extent, opt_maxZoom, opt_tileSize, opt_corner);
}
/**
 * Generate a tile grid extent from a projection.  If the projection has an
 * extent, it is used.  If not, a global extent is assumed.
 * @param {import("./proj.js").ProjectionLike} projection Projection.
 * @return {import("./extent.js").Extent} Extent.
 */

function extentFromProjection(projection) {
  projection = (0,proj/* get */.U2)(projection);
  var extent = projection.getExtent();

  if (!extent) {
    var half = 180 * proj/* METERS_PER_UNIT */.Wm[Units/* default.DEGREES */.ZP.DEGREES] / projection.getMetersPerUnit();
    extent = (0,ol_extent/* createOrUpdate */.T9)(-half, -half, half, half);
  }

  return extent;
}

/***/ }),

/***/ 3148:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": () => (/* binding */ DEFAULT_TILE_SIZE),
/* harmony export */   "e": () => (/* binding */ DEFAULT_MAX_ZOOM)
/* harmony export */ });
/**
 * @module ol/tilegrid/common
 */

/**
 * Default maximum zoom for default tile grids.
 * @type {number}
 */
var DEFAULT_MAX_ZOOM = 42;
/**
 * Default tile size.
 * @type {number}
 */

var DEFAULT_TILE_SIZE = 256;

/***/ }),

/***/ 3686:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gk": () => (/* binding */ expandUrl),
/* harmony export */   "uR": () => (/* binding */ createFromTemplates)
/* harmony export */ });
/* unused harmony exports createFromTemplate, createFromTileUrlFunctions, nullTileUrlFunction */
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4548);
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4495);
/* harmony import */ var _tilecoord_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5406);
/**
 * @module ol/tileurlfunction
 */



/**
 * @param {string} template Template.
 * @param {import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {import("./Tile.js").UrlFunction} Tile URL function.
 */

function createFromTemplate(template, tileGrid) {
  var zRegEx = /\{z\}/g;
  var xRegEx = /\{x\}/g;
  var yRegEx = /\{y\}/g;
  var dashYRegEx = /\{-y\}/g;
  return (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function (tileCoord, pixelRatio, projection) {
      if (!tileCoord) {
        return undefined;
      } else {
        return template.replace(zRegEx, tileCoord[0].toString()).replace(xRegEx, tileCoord[1].toString()).replace(yRegEx, tileCoord[2].toString()).replace(dashYRegEx, function () {
          var z = tileCoord[0];
          var range = tileGrid.getFullTileRange(z);
          (0,_asserts_js__WEBPACK_IMPORTED_MODULE_0__/* .assert */ .h)(range, 55); // The {-y} placeholder requires a tile grid with extent

          var y = range.getHeight() - tileCoord[2] - 1;
          return y.toString();
        });
      }
    }
  );
}
/**
 * @param {Array<string>} templates Templates.
 * @param {import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {import("./Tile.js").UrlFunction} Tile URL function.
 */

function createFromTemplates(templates, tileGrid) {
  var len = templates.length;
  var tileUrlFunctions = new Array(len);

  for (var i = 0; i < len; ++i) {
    tileUrlFunctions[i] = createFromTemplate(templates[i], tileGrid);
  }

  return createFromTileUrlFunctions(tileUrlFunctions);
}
/**
 * @param {Array<import("./Tile.js").UrlFunction>} tileUrlFunctions Tile URL Functions.
 * @return {import("./Tile.js").UrlFunction} Tile URL function.
 */

function createFromTileUrlFunctions(tileUrlFunctions) {
  if (tileUrlFunctions.length === 1) {
    return tileUrlFunctions[0];
  }

  return (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function (tileCoord, pixelRatio, projection) {
      if (!tileCoord) {
        return undefined;
      } else {
        var h = (0,_tilecoord_js__WEBPACK_IMPORTED_MODULE_1__/* .hash */ .vp)(tileCoord);
        var index = (0,_math_js__WEBPACK_IMPORTED_MODULE_2__/* .modulo */ .$W)(h, tileUrlFunctions.length);
        return tileUrlFunctions[index](tileCoord, pixelRatio, projection);
      }
    }
  );
}
/**
 * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @param {number} pixelRatio Pixel ratio.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {string|undefined} Tile URL.
 */

function nullTileUrlFunction(tileCoord, pixelRatio, projection) {
  return undefined;
}
/**
 * @param {string} url URL.
 * @return {Array<string>} Array of urls.
 */

function expandUrl(url) {
  var urls = [];
  var match = /\{([a-z])-([a-z])\}/.exec(url);

  if (match) {
    // char range
    var startCharCode = match[1].charCodeAt(0);
    var stopCharCode = match[2].charCodeAt(0);
    var charCode = void 0;

    for (charCode = startCharCode; charCode <= stopCharCode; ++charCode) {
      urls.push(url.replace(match[0], String.fromCharCode(charCode)));
    }

    return urls;
  }

  match = /\{(\d+)-(\d+)\}/.exec(url);

  if (match) {
    // number range
    var stop_1 = parseInt(match[2], 10);

    for (var i = parseInt(match[1], 10); i <= stop_1; i++) {
      urls.push(url.replace(match[0], i.toString()));
    }

    return urls;
  }

  urls.push(url);
  return urls;
}

/***/ }),

/***/ 8975:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BB": () => (/* binding */ toString),
/* harmony export */   "Iu": () => (/* binding */ translate),
/* harmony export */   "Jp": () => (/* binding */ multiply),
/* harmony export */   "U1": () => (/* binding */ rotate),
/* harmony export */   "Ue": () => (/* binding */ create),
/* harmony export */   "bA": () => (/* binding */ scale),
/* harmony export */   "lk": () => (/* binding */ setFromArray),
/* harmony export */   "mc": () => (/* binding */ reset),
/* harmony export */   "n3": () => (/* binding */ makeScale),
/* harmony export */   "nb": () => (/* binding */ makeInverse),
/* harmony export */   "nn": () => (/* binding */ apply),
/* harmony export */   "qC": () => (/* binding */ compose)
/* harmony export */ });
/* unused harmony exports set, composeCssTransform, invert, determinant */
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4242);
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4548);
/**
 * @module ol/transform
 */


/**
 * An array representing an affine 2d transformation for use with
 * {@link module:ol/transform} functions. The array has 6 elements.
 * @typedef {!Array<number>} Transform
 * @api
 */

/**
 * Collection of affine 2d transformation functions. The functions work on an
 * array of 6 elements. The element order is compatible with the [SVGMatrix
 * interface](https://developer.mozilla.org/en-US/docs/Web/API/SVGMatrix) and is
 * a subset (elements a to f) of a 3×3 matrix:
 * ```
 * [ a c e ]
 * [ b d f ]
 * [ 0 0 1 ]
 * ```
 */

/**
 * @private
 * @type {Transform}
 */

var tmp_ = new Array(6);
/**
 * Create an identity transform.
 * @return {!Transform} Identity transform.
 */

function create() {
  return [1, 0, 0, 1, 0, 0];
}
/**
 * Resets the given transform to an identity transform.
 * @param {!Transform} transform Transform.
 * @return {!Transform} Transform.
 */

function reset(transform) {
  return set(transform, 1, 0, 0, 1, 0, 0);
}
/**
 * Multiply the underlying matrices of two transforms and return the result in
 * the first transform.
 * @param {!Transform} transform1 Transform parameters of matrix 1.
 * @param {!Transform} transform2 Transform parameters of matrix 2.
 * @return {!Transform} transform1 multiplied with transform2.
 */

function multiply(transform1, transform2) {
  var a1 = transform1[0];
  var b1 = transform1[1];
  var c1 = transform1[2];
  var d1 = transform1[3];
  var e1 = transform1[4];
  var f1 = transform1[5];
  var a2 = transform2[0];
  var b2 = transform2[1];
  var c2 = transform2[2];
  var d2 = transform2[3];
  var e2 = transform2[4];
  var f2 = transform2[5];
  transform1[0] = a1 * a2 + c1 * b2;
  transform1[1] = b1 * a2 + d1 * b2;
  transform1[2] = a1 * c2 + c1 * d2;
  transform1[3] = b1 * c2 + d1 * d2;
  transform1[4] = a1 * e2 + c1 * f2 + e1;
  transform1[5] = b1 * e2 + d1 * f2 + f1;
  return transform1;
}
/**
 * Set the transform components a-f on a given transform.
 * @param {!Transform} transform Transform.
 * @param {number} a The a component of the transform.
 * @param {number} b The b component of the transform.
 * @param {number} c The c component of the transform.
 * @param {number} d The d component of the transform.
 * @param {number} e The e component of the transform.
 * @param {number} f The f component of the transform.
 * @return {!Transform} Matrix with transform applied.
 */

function set(transform, a, b, c, d, e, f) {
  transform[0] = a;
  transform[1] = b;
  transform[2] = c;
  transform[3] = d;
  transform[4] = e;
  transform[5] = f;
  return transform;
}
/**
 * Set transform on one matrix from another matrix.
 * @param {!Transform} transform1 Matrix to set transform to.
 * @param {!Transform} transform2 Matrix to set transform from.
 * @return {!Transform} transform1 with transform from transform2 applied.
 */

function setFromArray(transform1, transform2) {
  transform1[0] = transform2[0];
  transform1[1] = transform2[1];
  transform1[2] = transform2[2];
  transform1[3] = transform2[3];
  transform1[4] = transform2[4];
  transform1[5] = transform2[5];
  return transform1;
}
/**
 * Transforms the given coordinate with the given transform returning the
 * resulting, transformed coordinate. The coordinate will be modified in-place.
 *
 * @param {Transform} transform The transformation.
 * @param {import("./coordinate.js").Coordinate|import("./pixel.js").Pixel} coordinate The coordinate to transform.
 * @return {import("./coordinate.js").Coordinate|import("./pixel.js").Pixel} return coordinate so that operations can be
 *     chained together.
 */

function apply(transform, coordinate) {
  var x = coordinate[0];
  var y = coordinate[1];
  coordinate[0] = transform[0] * x + transform[2] * y + transform[4];
  coordinate[1] = transform[1] * x + transform[3] * y + transform[5];
  return coordinate;
}
/**
 * Applies rotation to the given transform.
 * @param {!Transform} transform Transform.
 * @param {number} angle Angle in radians.
 * @return {!Transform} The rotated transform.
 */

function rotate(transform, angle) {
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  return multiply(transform, set(tmp_, cos, sin, -sin, cos, 0, 0));
}
/**
 * Applies scale to a given transform.
 * @param {!Transform} transform Transform.
 * @param {number} x Scale factor x.
 * @param {number} y Scale factor y.
 * @return {!Transform} The scaled transform.
 */

function scale(transform, x, y) {
  return multiply(transform, set(tmp_, x, 0, 0, y, 0, 0));
}
/**
 * Creates a scale transform.
 * @param {!Transform} target Transform to overwrite.
 * @param {number} x Scale factor x.
 * @param {number} y Scale factor y.
 * @return {!Transform} The scale transform.
 */

function makeScale(target, x, y) {
  return set(target, x, 0, 0, y, 0, 0);
}
/**
 * Applies translation to the given transform.
 * @param {!Transform} transform Transform.
 * @param {number} dx Translation x.
 * @param {number} dy Translation y.
 * @return {!Transform} The translated transform.
 */

function translate(transform, dx, dy) {
  return multiply(transform, set(tmp_, 1, 0, 0, 1, dx, dy));
}
/**
 * Creates a composite transform given an initial translation, scale, rotation, and
 * final translation (in that order only, not commutative).
 * @param {!Transform} transform The transform (will be modified in place).
 * @param {number} dx1 Initial translation x.
 * @param {number} dy1 Initial translation y.
 * @param {number} sx Scale factor x.
 * @param {number} sy Scale factor y.
 * @param {number} angle Rotation (in counter-clockwise radians).
 * @param {number} dx2 Final translation x.
 * @param {number} dy2 Final translation y.
 * @return {!Transform} The composite transform.
 */

function compose(transform, dx1, dy1, sx, sy, angle, dx2, dy2) {
  var sin = Math.sin(angle);
  var cos = Math.cos(angle);
  transform[0] = sx * cos;
  transform[1] = sy * sin;
  transform[2] = -sx * sin;
  transform[3] = sy * cos;
  transform[4] = dx2 * sx * cos - dy2 * sx * sin + dx1;
  transform[5] = dx2 * sy * sin + dy2 * sy * cos + dy1;
  return transform;
}
/**
 * Creates a composite transform given an initial translation, scale, rotation, and
 * final translation (in that order only, not commutative). The resulting transform
 * string can be applied as `transform` property of an HTMLElement's style.
 * @param {number} dx1 Initial translation x.
 * @param {number} dy1 Initial translation y.
 * @param {number} sx Scale factor x.
 * @param {number} sy Scale factor y.
 * @param {number} angle Rotation (in counter-clockwise radians).
 * @param {number} dx2 Final translation x.
 * @param {number} dy2 Final translation y.
 * @return {string} The composite css transform.
 * @api
 */

function composeCssTransform(dx1, dy1, sx, sy, angle, dx2, dy2) {
  return toString(compose(create(), dx1, dy1, sx, sy, angle, dx2, dy2));
}
/**
 * Invert the given transform.
 * @param {!Transform} source The source transform to invert.
 * @return {!Transform} The inverted (source) transform.
 */

function invert(source) {
  return makeInverse(source, source);
}
/**
 * Invert the given transform.
 * @param {!Transform} target Transform to be set as the inverse of
 *     the source transform.
 * @param {!Transform} source The source transform to invert.
 * @return {!Transform} The inverted (target) transform.
 */

function makeInverse(target, source) {
  var det = determinant(source);
  (0,_asserts_js__WEBPACK_IMPORTED_MODULE_0__/* .assert */ .h)(det !== 0, 32); // Transformation matrix cannot be inverted

  var a = source[0];
  var b = source[1];
  var c = source[2];
  var d = source[3];
  var e = source[4];
  var f = source[5];
  target[0] = d / det;
  target[1] = -b / det;
  target[2] = -c / det;
  target[3] = a / det;
  target[4] = (c * f - d * e) / det;
  target[5] = -(a * f - b * e) / det;
  return target;
}
/**
 * Returns the determinant of the given matrix.
 * @param {!Transform} mat Matrix.
 * @return {number} Determinant.
 */

function determinant(mat) {
  return mat[0] * mat[3] - mat[1] * mat[2];
}
/**
 * @type {HTMLElement}
 * @private
 */

var transformStringDiv;
/**
 * A rounded string version of the transform.  This can be used
 * for CSS transforms.
 * @param {!Transform} mat Matrix.
 * @return {string} The transform as a string.
 */

function toString(mat) {
  var transformString = 'matrix(' + mat.join(', ') + ')';

  if (_has_js__WEBPACK_IMPORTED_MODULE_1__/* .WORKER_OFFSCREEN_CANVAS */ .Id) {
    return transformString;
  }

  var node = transformStringDiv || (transformStringDiv = document.createElement('div'));
  node.style.transform = transformString;
  return node.style.transform;
}

/***/ })

}]);