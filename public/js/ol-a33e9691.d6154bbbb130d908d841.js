"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[399],{

/***/ 3658:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dv": () => (/* binding */ FALSE),
/* harmony export */   "Zn": () => (/* binding */ VOID),
/* harmony export */   "qe": () => (/* binding */ memoizeOne),
/* harmony export */   "uX": () => (/* binding */ TRUE)
/* harmony export */ });
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3620);
/**
 * @module ol/functions
 */

/**
 * Always returns true.
 * @return {boolean} true.
 */

function TRUE() {
  return true;
}
/**
 * Always returns false.
 * @return {boolean} false.
 */

function FALSE() {
  return false;
}
/**
 * A reusable function, used e.g. as a default for callbacks.
 *
 * @return {void} Nothing.
 */

function VOID() {}
/**
 * Wrap a function in another function that remembers the last return.  If the
 * returned function is called twice in a row with the same arguments and the same
 * this object, it will return the value from the first call in the second call.
 *
 * @param {function(...any): ReturnType} fn The function to memoize.
 * @return {function(...any): ReturnType} The memoized function.
 * @template ReturnType
 */

function memoizeOne(fn) {
  var called = false;
  /** @type {ReturnType} */

  var lastResult;
  /** @type {Array<any>} */

  var lastArgs;
  var lastThis;
  return function () {
    var nextArgs = Array.prototype.slice.call(arguments);

    if (!called || this !== lastThis || !(0,_array_js__WEBPACK_IMPORTED_MODULE_0__/* .equals */ .fS)(nextArgs, lastArgs)) {
      called = true;
      lastThis = this;
      lastArgs = nextArgs;
      lastResult = fn.apply(this, arguments);
    }

    return lastResult;
  };
}

/***/ }),

/***/ 4665:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _GeometryType_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5870);
/* harmony import */ var _SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4285);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1046);
/* harmony import */ var _flat_deflate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6468);
/* harmony import */ var _flat_transform_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6929);
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
 * @module ol/geom/Circle
 */







/**
 * @classdesc
 * Circle geometry.
 *
 * @api
 */

var Circle =
/** @class */
function (_super) {
  __extends(Circle, _super);
  /**
   * @param {!import("../coordinate.js").Coordinate} center Center.
   *     For internal use, flat coordinates in combination with `opt_layout` and no
   *     `opt_radius` are also accepted.
   * @param {number} [opt_radius] Radius.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   */


  function Circle(center, opt_radius, opt_layout) {
    var _this = _super.call(this) || this;

    if (opt_layout !== undefined && opt_radius === undefined) {
      _this.setFlatCoordinates(opt_layout, center);
    } else {
      var radius = opt_radius ? opt_radius : 0;

      _this.setCenterAndRadius(center, radius, opt_layout);
    }

    return _this;
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Circle} Clone.
   * @api
   */


  Circle.prototype.clone = function () {
    var circle = new Circle(this.flatCoordinates.slice(), undefined, this.layout);
    circle.applyProperties(this);
    return circle;
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */


  Circle.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
    var flatCoordinates = this.flatCoordinates;
    var dx = x - flatCoordinates[0];
    var dy = y - flatCoordinates[1];
    var squaredDistance = dx * dx + dy * dy;

    if (squaredDistance < minSquaredDistance) {
      if (squaredDistance === 0) {
        for (var i = 0; i < this.stride; ++i) {
          closestPoint[i] = flatCoordinates[i];
        }
      } else {
        var delta = this.getRadius() / Math.sqrt(squaredDistance);
        closestPoint[0] = flatCoordinates[0] + delta * dx;
        closestPoint[1] = flatCoordinates[1] + delta * dy;

        for (var i = 2; i < this.stride; ++i) {
          closestPoint[i] = flatCoordinates[i];
        }
      }

      closestPoint.length = this.stride;
      return squaredDistance;
    } else {
      return minSquaredDistance;
    }
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */


  Circle.prototype.containsXY = function (x, y) {
    var flatCoordinates = this.flatCoordinates;
    var dx = x - flatCoordinates[0];
    var dy = y - flatCoordinates[1];
    return dx * dx + dy * dy <= this.getRadiusSquared_();
  };
  /**
   * Return the center of the circle as {@link module:ol/coordinate~Coordinate coordinate}.
   * @return {import("../coordinate.js").Coordinate} Center.
   * @api
   */


  Circle.prototype.getCenter = function () {
    return this.flatCoordinates.slice(0, this.stride);
  };
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */


  Circle.prototype.computeExtent = function (extent) {
    var flatCoordinates = this.flatCoordinates;
    var radius = flatCoordinates[this.stride] - flatCoordinates[0];
    return (0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .createOrUpdate */ .T9)(flatCoordinates[0] - radius, flatCoordinates[1] - radius, flatCoordinates[0] + radius, flatCoordinates[1] + radius, extent);
  };
  /**
   * Return the radius of the circle.
   * @return {number} Radius.
   * @api
   */


  Circle.prototype.getRadius = function () {
    return Math.sqrt(this.getRadiusSquared_());
  };
  /**
   * @private
   * @return {number} Radius squared.
   */


  Circle.prototype.getRadiusSquared_ = function () {
    var dx = this.flatCoordinates[this.stride] - this.flatCoordinates[0];
    var dy = this.flatCoordinates[this.stride + 1] - this.flatCoordinates[1];
    return dx * dx + dy * dy;
  };
  /**
   * Get the type of this geometry.
   * @return {import("./GeometryType.js").default} Geometry type.
   * @api
   */


  Circle.prototype.getType = function () {
    return _GeometryType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].CIRCLE */ .Z.CIRCLE;
  };
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */


  Circle.prototype.intersectsExtent = function (extent) {
    var circleExtent = this.getExtent();

    if ((0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .intersects */ .kK)(extent, circleExtent)) {
      var center = this.getCenter();

      if (extent[0] <= center[0] && extent[2] >= center[0]) {
        return true;
      }

      if (extent[1] <= center[1] && extent[3] >= center[1]) {
        return true;
      }

      return (0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .forEachCorner */ .H6)(extent, this.intersectsCoordinate.bind(this));
    }

    return false;
  };
  /**
   * Set the center of the circle as {@link module:ol/coordinate~Coordinate coordinate}.
   * @param {import("../coordinate.js").Coordinate} center Center.
   * @api
   */


  Circle.prototype.setCenter = function (center) {
    var stride = this.stride;
    var radius = this.flatCoordinates[stride] - this.flatCoordinates[0];
    var flatCoordinates = center.slice();
    flatCoordinates[stride] = flatCoordinates[0] + radius;

    for (var i = 1; i < stride; ++i) {
      flatCoordinates[stride + i] = center[i];
    }

    this.setFlatCoordinates(this.layout, flatCoordinates);
    this.changed();
  };
  /**
   * Set the center (as {@link module:ol/coordinate~Coordinate coordinate}) and the radius (as
   * number) of the circle.
   * @param {!import("../coordinate.js").Coordinate} center Center.
   * @param {number} radius Radius.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   * @api
   */


  Circle.prototype.setCenterAndRadius = function (center, radius, opt_layout) {
    this.setLayout(opt_layout, center, 0);

    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    /** @type {Array<number>} */


    var flatCoordinates = this.flatCoordinates;
    var offset = (0,_flat_deflate_js__WEBPACK_IMPORTED_MODULE_2__/* .deflateCoordinate */ .IG)(flatCoordinates, 0, center, this.stride);
    flatCoordinates[offset++] = flatCoordinates[0] + radius;

    for (var i = 1, ii = this.stride; i < ii; ++i) {
      flatCoordinates[offset++] = flatCoordinates[i];
    }

    flatCoordinates.length = offset;
    this.changed();
  };

  Circle.prototype.getCoordinates = function () {
    return null;
  };

  Circle.prototype.setCoordinates = function (coordinates, opt_layout) {};
  /**
   * Set the radius of the circle. The radius is in the units of the projection.
   * @param {number} radius Radius.
   * @api
   */


  Circle.prototype.setRadius = function (radius) {
    this.flatCoordinates[this.stride] = this.flatCoordinates[0] + radius;
    this.changed();
  };
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in counter-clockwise radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */


  Circle.prototype.rotate = function (angle, anchor) {
    var center = this.getCenter();
    var stride = this.getStride();
    this.setCenter((0,_flat_transform_js__WEBPACK_IMPORTED_MODULE_3__/* .rotate */ .U1)(center, 0, center.length, stride, angle, anchor, center));
    this.changed();
  };
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */


  Circle.prototype.translate = function (deltaX, deltaY) {
    var center = this.getCenter();
    var stride = this.getStride();
    this.setCenter((0,_flat_transform_js__WEBPACK_IMPORTED_MODULE_3__/* .translate */ .Iu)(center, 0, center.length, stride, deltaX, deltaY, center));
    this.changed();
  };

  return Circle;
}(_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .ZP);
/**
 * Transform each coordinate of the circle from one coordinate reference system
 * to another. The geometry is modified in place.
 * If you do not want the geometry modified in place, first clone() it and
 * then use this function on the clone.
 *
 * Internally a circle is currently represented by two points: the center of
 * the circle `[cx, cy]`, and the point to the right of the circle
 * `[cx + r, cy]`. This `transform` function just transforms these two points.
 * So the resulting geometry is also a circle, and that circle does not
 * correspond to the shape that would be obtained by transforming every point
 * of the original circle.
 *
 * @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
 *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
 * @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
 *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
 * @return {Circle} This geometry.  Note that original geometry is
 *     modified in place.
 * @function
 * @api
 */


Circle.prototype.transform;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Circle);

/***/ }),

/***/ 3724:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Object_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7182);
/* harmony import */ var _proj_Units_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3977);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2618);
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8975);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1046);
/* harmony import */ var _proj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8623);
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3658);
/* harmony import */ var _flat_transform_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6929);
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
 * @module ol/geom/Geometry
 */










/**
 * @type {import("../transform.js").Transform}
 */

var tmpTransform = (0,_transform_js__WEBPACK_IMPORTED_MODULE_1__/* .create */ .Ue)();
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for vector geometries.
 *
 * To get notified of changes to the geometry, register a listener for the
 * generic `change` event on your geometry instance.
 *
 * @abstract
 * @api
 */

var Geometry =
/** @class */
function (_super) {
  __extends(Geometry, _super);

  function Geometry() {
    var _this = _super.call(this) || this;
    /**
     * @private
     * @type {import("../extent.js").Extent}
     */


    _this.extent_ = (0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .createEmpty */ .lJ)();
    /**
     * @private
     * @type {number}
     */

    _this.extentRevision_ = -1;
    /**
     * @protected
     * @type {number}
     */

    _this.simplifiedGeometryMaxMinSquaredTolerance = 0;
    /**
     * @protected
     * @type {number}
     */

    _this.simplifiedGeometryRevision = 0;
    /**
     * Get a transformed and simplified version of the geometry.
     * @abstract
     * @param {number} revision The geometry revision.
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../proj.js").TransformFunction} [opt_transform] Optional transform function.
     * @return {Geometry} Simplified geometry.
     */

    _this.simplifyTransformedInternal = (0,_functions_js__WEBPACK_IMPORTED_MODULE_3__/* .memoizeOne */ .qe)(function (revision, squaredTolerance, opt_transform) {
      if (!opt_transform) {
        return this.getSimplifiedGeometry(squaredTolerance);
      }

      var clone = this.clone();
      clone.applyTransform(opt_transform);
      return clone.getSimplifiedGeometry(squaredTolerance);
    });
    return _this;
  }
  /**
   * Get a transformed and simplified version of the geometry.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../proj.js").TransformFunction} [opt_transform] Optional transform function.
   * @return {Geometry} Simplified geometry.
   */


  Geometry.prototype.simplifyTransformed = function (squaredTolerance, opt_transform) {
    return this.simplifyTransformedInternal(this.getRevision(), squaredTolerance, opt_transform);
  };
  /**
   * Make a complete copy of the geometry.
   * @abstract
   * @return {!Geometry} Clone.
   */


  Geometry.prototype.clone = function () {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .abstract */ .O3)();
  };
  /**
   * @abstract
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */


  Geometry.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .abstract */ .O3)();
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */


  Geometry.prototype.containsXY = function (x, y) {
    var coord = this.getClosestPoint([x, y]);
    return coord[0] === x && coord[1] === y;
  };
  /**
   * Return the closest point of the geometry to the passed point as
   * {@link module:ol/coordinate~Coordinate coordinate}.
   * @param {import("../coordinate.js").Coordinate} point Point.
   * @param {import("../coordinate.js").Coordinate} [opt_closestPoint] Closest point.
   * @return {import("../coordinate.js").Coordinate} Closest point.
   * @api
   */


  Geometry.prototype.getClosestPoint = function (point, opt_closestPoint) {
    var closestPoint = opt_closestPoint ? opt_closestPoint : [NaN, NaN];
    this.closestPointXY(point[0], point[1], closestPoint, Infinity);
    return closestPoint;
  };
  /**
   * Returns true if this geometry includes the specified coordinate. If the
   * coordinate is on the boundary of the geometry, returns false.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {boolean} Contains coordinate.
   * @api
   */


  Geometry.prototype.intersectsCoordinate = function (coordinate) {
    return this.containsXY(coordinate[0], coordinate[1]);
  };
  /**
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */


  Geometry.prototype.computeExtent = function (extent) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .abstract */ .O3)();
  };
  /**
   * Get the extent of the geometry.
   * @param {import("../extent.js").Extent} [opt_extent] Extent.
   * @return {import("../extent.js").Extent} extent Extent.
   * @api
   */


  Geometry.prototype.getExtent = function (opt_extent) {
    if (this.extentRevision_ != this.getRevision()) {
      var extent = this.computeExtent(this.extent_);

      if (isNaN(extent[0]) || isNaN(extent[1])) {
        (0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .createOrUpdateEmpty */ .YN)(extent);
      }

      this.extentRevision_ = this.getRevision();
    }

    return (0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .returnOrUpdate */ .EO)(this.extent_, opt_extent);
  };
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} angle Rotation angle in radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */


  Geometry.prototype.rotate = function (angle, anchor) {
    (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .abstract */ .O3)();
  };
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [opt_sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [opt_anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */


  Geometry.prototype.scale = function (sx, opt_sy, opt_anchor) {
    (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .abstract */ .O3)();
  };
  /**
   * Create a simplified version of this geometry.  For linestrings, this uses
   * the [Douglas Peucker](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm)
   * algorithm.  For polygons, a quantization-based
   * simplification is used to preserve topology.
   * @param {number} tolerance The tolerance distance for simplification.
   * @return {Geometry} A new, simplified version of the original geometry.
   * @api
   */


  Geometry.prototype.simplify = function (tolerance) {
    return this.getSimplifiedGeometry(tolerance * tolerance);
  };
  /**
   * Create a simplified version of this geometry using the Douglas Peucker
   * algorithm.
   * See https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Geometry} Simplified geometry.
   */


  Geometry.prototype.getSimplifiedGeometry = function (squaredTolerance) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .abstract */ .O3)();
  };
  /**
   * Get the type of this geometry.
   * @abstract
   * @return {import("./GeometryType.js").default} Geometry type.
   */


  Geometry.prototype.getType = function () {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .abstract */ .O3)();
  };
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @abstract
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   */


  Geometry.prototype.applyTransform = function (transformFn) {
    (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .abstract */ .O3)();
  };
  /**
   * Test if the geometry and the passed extent intersect.
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   */


  Geometry.prototype.intersectsExtent = function (extent) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .abstract */ .O3)();
  };
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @abstract
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */


  Geometry.prototype.translate = function (deltaX, deltaY) {
    (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .abstract */ .O3)();
  };
  /**
   * Transform each coordinate of the geometry from one coordinate reference
   * system to another. The geometry is modified in place.
   * For example, a line will be transformed to a line and a circle to a circle.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   *
   * @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @return {Geometry} This geometry.  Note that original geometry is
   *     modified in place.
   * @api
   */


  Geometry.prototype.transform = function (source, destination) {
    /** @type {import("../proj/Projection.js").default} */
    var sourceProj = (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .get */ .U2)(source);
    var transformFn = sourceProj.getUnits() == _proj_Units_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].TILE_PIXELS */ .ZP.TILE_PIXELS ? function (inCoordinates, outCoordinates, stride) {
      var pixelExtent = sourceProj.getExtent();
      var projectedExtent = sourceProj.getWorldExtent();
      var scale = (0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .getHeight */ .Cr)(projectedExtent) / (0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .getHeight */ .Cr)(pixelExtent);
      (0,_transform_js__WEBPACK_IMPORTED_MODULE_1__/* .compose */ .qC)(tmpTransform, projectedExtent[0], projectedExtent[3], scale, -scale, 0, 0, 0);
      (0,_flat_transform_js__WEBPACK_IMPORTED_MODULE_6__/* .transform2D */ .vT)(inCoordinates, 0, inCoordinates.length, stride, tmpTransform, outCoordinates);
      return (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .getTransform */ .Ck)(sourceProj, destination)(inCoordinates, outCoordinates, stride);
    } : (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__/* .getTransform */ .Ck)(sourceProj, destination);
    this.applyTransform(transformFn);
    return this;
  };

  return Geometry;
}(_Object_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Geometry);

/***/ }),

/***/ 1288:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _events_EventType_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2140);
/* harmony import */ var _Geometry_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3724);
/* harmony import */ var _GeometryType_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5870);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1046);
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
 * @module ol/geom/GeometryCollection
 */







/**
 * @classdesc
 * An array of {@link module:ol/geom/Geometry} objects.
 *
 * @api
 */

var GeometryCollection =
/** @class */
function (_super) {
  __extends(GeometryCollection, _super);
  /**
   * @param {Array<Geometry>} [opt_geometries] Geometries.
   */


  function GeometryCollection(opt_geometries) {
    var _this = _super.call(this) || this;
    /**
     * @private
     * @type {Array<Geometry>}
     */


    _this.geometries_ = opt_geometries ? opt_geometries : null;
    /**
     * @type {Array<import("../events.js").EventsKey>}
     */

    _this.changeEventsKeys_ = [];

    _this.listenGeometriesChange_();

    return _this;
  }
  /**
   * @private
   */


  GeometryCollection.prototype.unlistenGeometriesChange_ = function () {
    this.changeEventsKeys_.forEach(_events_js__WEBPACK_IMPORTED_MODULE_0__/* .unlistenByKey */ .bN);
    this.changeEventsKeys_.length = 0;
  };
  /**
   * @private
   */


  GeometryCollection.prototype.listenGeometriesChange_ = function () {
    if (!this.geometries_) {
      return;
    }

    for (var i = 0, ii = this.geometries_.length; i < ii; ++i) {
      this.changeEventsKeys_.push((0,_events_js__WEBPACK_IMPORTED_MODULE_0__/* .listen */ .oL)(this.geometries_[i], _events_EventType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].CHANGE */ .Z.CHANGE, this.changed, this));
    }
  };
  /**
   * Make a complete copy of the geometry.
   * @return {!GeometryCollection} Clone.
   * @api
   */


  GeometryCollection.prototype.clone = function () {
    var geometryCollection = new GeometryCollection(null);
    geometryCollection.setGeometries(this.geometries_);
    geometryCollection.applyProperties(this);
    return geometryCollection;
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */


  GeometryCollection.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < (0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .closestSquaredDistanceXY */ .qf)(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }

    var geometries = this.geometries_;

    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      minSquaredDistance = geometries[i].closestPointXY(x, y, closestPoint, minSquaredDistance);
    }

    return minSquaredDistance;
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */


  GeometryCollection.prototype.containsXY = function (x, y) {
    var geometries = this.geometries_;

    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      if (geometries[i].containsXY(x, y)) {
        return true;
      }
    }

    return false;
  };
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */


  GeometryCollection.prototype.computeExtent = function (extent) {
    (0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .createOrUpdateEmpty */ .YN)(extent);
    var geometries = this.geometries_;

    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      (0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .extend */ .l7)(extent, geometries[i].getExtent());
    }

    return extent;
  };
  /**
   * Return the geometries that make up this geometry collection.
   * @return {Array<Geometry>} Geometries.
   * @api
   */


  GeometryCollection.prototype.getGeometries = function () {
    return cloneGeometries(this.geometries_);
  };
  /**
   * @return {Array<Geometry>} Geometries.
   */


  GeometryCollection.prototype.getGeometriesArray = function () {
    return this.geometries_;
  };
  /**
   * @return {Array<Geometry>} Geometries.
   */


  GeometryCollection.prototype.getGeometriesArrayRecursive = function () {
    /** @type {Array<Geometry>} */
    var geometriesArray = [];
    var geometries = this.geometries_;

    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      if (geometries[i].getType() === this.getType()) {
        geometriesArray = geometriesArray.concat(
        /** @type {GeometryCollection} */
        geometries[i].getGeometriesArrayRecursive());
      } else {
        geometriesArray.push(geometries[i]);
      }
    }

    return geometriesArray;
  };
  /**
   * Create a simplified version of this geometry using the Douglas Peucker algorithm.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {GeometryCollection} Simplified GeometryCollection.
   */


  GeometryCollection.prototype.getSimplifiedGeometry = function (squaredTolerance) {
    if (this.simplifiedGeometryRevision !== this.getRevision()) {
      this.simplifiedGeometryMaxMinSquaredTolerance = 0;
      this.simplifiedGeometryRevision = this.getRevision();
    }

    if (squaredTolerance < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && squaredTolerance < this.simplifiedGeometryMaxMinSquaredTolerance) {
      return this;
    }

    var simplifiedGeometries = [];
    var geometries = this.geometries_;
    var simplified = false;

    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      var geometry = geometries[i];
      var simplifiedGeometry = geometry.getSimplifiedGeometry(squaredTolerance);
      simplifiedGeometries.push(simplifiedGeometry);

      if (simplifiedGeometry !== geometry) {
        simplified = true;
      }
    }

    if (simplified) {
      var simplifiedGeometryCollection = new GeometryCollection(null);
      simplifiedGeometryCollection.setGeometriesArray(simplifiedGeometries);
      return simplifiedGeometryCollection;
    } else {
      this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
      return this;
    }
  };
  /**
   * Get the type of this geometry.
   * @return {import("./GeometryType.js").default} Geometry type.
   * @api
   */


  GeometryCollection.prototype.getType = function () {
    return _GeometryType_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].GEOMETRY_COLLECTION */ .Z.GEOMETRY_COLLECTION;
  };
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */


  GeometryCollection.prototype.intersectsExtent = function (extent) {
    var geometries = this.geometries_;

    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      if (geometries[i].intersectsExtent(extent)) {
        return true;
      }
    }

    return false;
  };
  /**
   * @return {boolean} Is empty.
   */


  GeometryCollection.prototype.isEmpty = function () {
    return this.geometries_.length === 0;
  };
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */


  GeometryCollection.prototype.rotate = function (angle, anchor) {
    var geometries = this.geometries_;

    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      geometries[i].rotate(angle, anchor);
    }

    this.changed();
  };
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [opt_sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [opt_anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */


  GeometryCollection.prototype.scale = function (sx, opt_sy, opt_anchor) {
    var anchor = opt_anchor;

    if (!anchor) {
      anchor = (0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .getCenter */ .qg)(this.getExtent());
    }

    var geometries = this.geometries_;

    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      geometries[i].scale(sx, opt_sy, anchor);
    }

    this.changed();
  };
  /**
   * Set the geometries that make up this geometry collection.
   * @param {Array<Geometry>} geometries Geometries.
   * @api
   */


  GeometryCollection.prototype.setGeometries = function (geometries) {
    this.setGeometriesArray(cloneGeometries(geometries));
  };
  /**
   * @param {Array<Geometry>} geometries Geometries.
   */


  GeometryCollection.prototype.setGeometriesArray = function (geometries) {
    this.unlistenGeometriesChange_();
    this.geometries_ = geometries;
    this.listenGeometriesChange_();
    this.changed();
  };
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   * @api
   */


  GeometryCollection.prototype.applyTransform = function (transformFn) {
    var geometries = this.geometries_;

    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      geometries[i].applyTransform(transformFn);
    }

    this.changed();
  };
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */


  GeometryCollection.prototype.translate = function (deltaX, deltaY) {
    var geometries = this.geometries_;

    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      geometries[i].translate(deltaX, deltaY);
    }

    this.changed();
  };
  /**
   * Clean up.
   */


  GeometryCollection.prototype.disposeInternal = function () {
    this.unlistenGeometriesChange_();

    _super.prototype.disposeInternal.call(this);
  };

  return GeometryCollection;
}(_Geometry_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z);
/**
 * @param {Array<Geometry>} geometries Geometries.
 * @return {Array<Geometry>} Cloned geometries.
 */


function cloneGeometries(geometries) {
  var clonedGeometries = [];

  for (var i = 0, ii = geometries.length; i < ii; ++i) {
    clonedGeometries.push(geometries[i].clone());
  }

  return clonedGeometries;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GeometryCollection);

/***/ }),

/***/ 2701:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/geom/GeometryLayout
 */

/**
 * The coordinate layout for geometries, indicating whether a 3rd or 4th z ('Z')
 * or measure ('M') coordinate is available. Supported values are `'XY'`,
 * `'XYZ'`, `'XYM'`, `'XYZM'`.
 * @enum {string}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  XY: 'XY',
  XYZ: 'XYZ',
  XYM: 'XYM',
  XYZM: 'XYZM'
});

/***/ }),

/***/ 5870:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/geom/GeometryType
 */

/**
 * The geometry type. One of `'Point'`, `'LineString'`, `'LinearRing'`,
 * `'Polygon'`, `'MultiPoint'`, `'MultiLineString'`, `'MultiPolygon'`,
 * `'GeometryCollection'`, `'Circle'`.
 * @enum {string}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  POINT: 'Point',
  LINE_STRING: 'LineString',
  LINEAR_RING: 'LinearRing',
  POLYGON: 'Polygon',
  MULTI_POINT: 'MultiPoint',
  MULTI_LINE_STRING: 'MultiLineString',
  MULTI_POLYGON: 'MultiPolygon',
  GEOMETRY_COLLECTION: 'GeometryCollection',
  CIRCLE: 'Circle'
});

/***/ }),

/***/ 9171:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2701);
/* harmony import */ var _GeometryType_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5870);
/* harmony import */ var _SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(4285);
/* harmony import */ var _flat_closest_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1354);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1046);
/* harmony import */ var _flat_deflate_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6468);
/* harmony import */ var _flat_simplify_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1999);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3620);
/* harmony import */ var _flat_segments_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9617);
/* harmony import */ var _flat_inflate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6301);
/* harmony import */ var _flat_interpolate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3137);
/* harmony import */ var _flat_intersectsextent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7701);
/* harmony import */ var _flat_length_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9736);
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
 * @module ol/geom/LineString
 */















/**
 * @classdesc
 * Linestring geometry.
 *
 * @api
 */

var LineString =
/** @class */
function (_super) {
  __extends(LineString, _super);
  /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `opt_layout` are also accepted.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   */


  function LineString(coordinates, opt_layout) {
    var _this = _super.call(this) || this;
    /**
     * @private
     * @type {import("../coordinate.js").Coordinate}
     */


    _this.flatMidpoint_ = null;
    /**
     * @private
     * @type {number}
     */

    _this.flatMidpointRevision_ = -1;
    /**
     * @private
     * @type {number}
     */

    _this.maxDelta_ = -1;
    /**
     * @private
     * @type {number}
     */

    _this.maxDeltaRevision_ = -1;

    if (opt_layout !== undefined && !Array.isArray(coordinates[0])) {
      _this.setFlatCoordinates(opt_layout,
      /** @type {Array<number>} */
      coordinates);
    } else {
      _this.setCoordinates(
      /** @type {Array<import("../coordinate.js").Coordinate>} */
      coordinates, opt_layout);
    }

    return _this;
  }
  /**
   * Append the passed coordinate to the coordinates of the linestring.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @api
   */


  LineString.prototype.appendCoordinate = function (coordinate) {
    if (!this.flatCoordinates) {
      this.flatCoordinates = coordinate.slice();
    } else {
      (0,_array_js__WEBPACK_IMPORTED_MODULE_0__/* .extend */ .l7)(this.flatCoordinates, coordinate);
    }

    this.changed();
  };
  /**
   * Make a complete copy of the geometry.
   * @return {!LineString} Clone.
   * @api
   */


  LineString.prototype.clone = function () {
    var lineString = new LineString(this.flatCoordinates.slice(), this.layout);
    lineString.applyProperties(this);
    return lineString;
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */


  LineString.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .closestSquaredDistanceXY */ .qf)(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }

    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt((0,_flat_closest_js__WEBPACK_IMPORTED_MODULE_2__/* .maxSquaredDelta */ .Bv)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
      this.maxDeltaRevision_ = this.getRevision();
    }

    return (0,_flat_closest_js__WEBPACK_IMPORTED_MODULE_2__/* .assignClosestPoint */ .H$)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, false, x, y, closestPoint, minSquaredDistance);
  };
  /**
   * Iterate over each segment, calling the provided callback.
   * If the callback returns a truthy value the function returns that
   * value immediately. Otherwise the function returns `false`.
   *
   * @param {function(this: S, import("../coordinate.js").Coordinate, import("../coordinate.js").Coordinate): T} callback Function
   *     called for each segment. The function will receive two arguments, the start and end coordinates of the segment.
   * @return {T|boolean} Value.
   * @template T,S
   * @api
   */


  LineString.prototype.forEachSegment = function (callback) {
    return (0,_flat_segments_js__WEBPACK_IMPORTED_MODULE_3__/* .forEach */ .E)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, callback);
  };
  /**
   * Returns the coordinate at `m` using linear interpolation, or `null` if no
   * such coordinate exists.
   *
   * `opt_extrapolate` controls extrapolation beyond the range of Ms in the
   * MultiLineString. If `opt_extrapolate` is `true` then Ms less than the first
   * M will return the first coordinate and Ms greater than the last M will
   * return the last coordinate.
   *
   * @param {number} m M.
   * @param {boolean} [opt_extrapolate] Extrapolate. Default is `false`.
   * @return {import("../coordinate.js").Coordinate} Coordinate.
   * @api
   */


  LineString.prototype.getCoordinateAtM = function (m, opt_extrapolate) {
    if (this.layout != _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].XYM */ .Z.XYM && this.layout != _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].XYZM */ .Z.XYZM) {
      return null;
    }

    var extrapolate = opt_extrapolate !== undefined ? opt_extrapolate : false;
    return (0,_flat_interpolate_js__WEBPACK_IMPORTED_MODULE_5__/* .lineStringCoordinateAtM */ .iJ)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, m, extrapolate);
  };
  /**
   * Return the coordinates of the linestring.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   */


  LineString.prototype.getCoordinates = function () {
    return (0,_flat_inflate_js__WEBPACK_IMPORTED_MODULE_6__/* .inflateCoordinates */ .Ml)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  };
  /**
   * Return the coordinate at the provided fraction along the linestring.
   * The `fraction` is a number between 0 and 1, where 0 is the start of the
   * linestring and 1 is the end.
   * @param {number} fraction Fraction.
   * @param {import("../coordinate.js").Coordinate} [opt_dest] Optional coordinate whose values will
   *     be modified. If not provided, a new coordinate will be returned.
   * @return {import("../coordinate.js").Coordinate} Coordinate of the interpolated point.
   * @api
   */


  LineString.prototype.getCoordinateAt = function (fraction, opt_dest) {
    return (0,_flat_interpolate_js__WEBPACK_IMPORTED_MODULE_5__/* .interpolatePoint */ .WW)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, fraction, opt_dest, this.stride);
  };
  /**
   * Return the length of the linestring on projected plane.
   * @return {number} Length (on projected plane).
   * @api
   */


  LineString.prototype.getLength = function () {
    return (0,_flat_length_js__WEBPACK_IMPORTED_MODULE_7__/* .lineStringLength */ .W)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  };
  /**
   * @return {Array<number>} Flat midpoint.
   */


  LineString.prototype.getFlatMidpoint = function () {
    if (this.flatMidpointRevision_ != this.getRevision()) {
      this.flatMidpoint_ = this.getCoordinateAt(0.5, this.flatMidpoint_);
      this.flatMidpointRevision_ = this.getRevision();
    }

    return this.flatMidpoint_;
  };
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LineString} Simplified LineString.
   * @protected
   */


  LineString.prototype.getSimplifiedGeometryInternal = function (squaredTolerance) {
    var simplifiedFlatCoordinates = [];
    simplifiedFlatCoordinates.length = (0,_flat_simplify_js__WEBPACK_IMPORTED_MODULE_8__/* .douglasPeucker */ .dt)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0);
    return new LineString(simplifiedFlatCoordinates, _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].XY */ .Z.XY);
  };
  /**
   * Get the type of this geometry.
   * @return {import("./GeometryType.js").default} Geometry type.
   * @api
   */


  LineString.prototype.getType = function () {
    return _GeometryType_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].LINE_STRING */ .Z.LINE_STRING;
  };
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */


  LineString.prototype.intersectsExtent = function (extent) {
    return (0,_flat_intersectsextent_js__WEBPACK_IMPORTED_MODULE_10__/* .intersectsLineString */ .Kz)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
  };
  /**
   * Set the coordinates of the linestring.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   * @api
   */


  LineString.prototype.setCoordinates = function (coordinates, opt_layout) {
    this.setLayout(opt_layout, coordinates, 1);

    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }

    this.flatCoordinates.length = (0,_flat_deflate_js__WEBPACK_IMPORTED_MODULE_11__/* .deflateCoordinates */ .Sg)(this.flatCoordinates, 0, coordinates, this.stride);
    this.changed();
  };

  return LineString;
}(_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .ZP);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LineString);

/***/ }),

/***/ 2454:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2701);
/* harmony import */ var _GeometryType_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5870);
/* harmony import */ var _SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4285);
/* harmony import */ var _flat_closest_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1354);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1046);
/* harmony import */ var _flat_deflate_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6468);
/* harmony import */ var _flat_simplify_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1999);
/* harmony import */ var _flat_inflate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6301);
/* harmony import */ var _flat_area_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(285);
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
 * @module ol/geom/LinearRing
 */











/**
 * @classdesc
 * Linear ring geometry. Only used as part of polygon; cannot be rendered
 * on its own.
 *
 * @api
 */

var LinearRing =
/** @class */
function (_super) {
  __extends(LinearRing, _super);
  /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `opt_layout` are also accepted.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   */


  function LinearRing(coordinates, opt_layout) {
    var _this = _super.call(this) || this;
    /**
     * @private
     * @type {number}
     */


    _this.maxDelta_ = -1;
    /**
     * @private
     * @type {number}
     */

    _this.maxDeltaRevision_ = -1;

    if (opt_layout !== undefined && !Array.isArray(coordinates[0])) {
      _this.setFlatCoordinates(opt_layout,
      /** @type {Array<number>} */
      coordinates);
    } else {
      _this.setCoordinates(
      /** @type {Array<import("../coordinate.js").Coordinate>} */
      coordinates, opt_layout);
    }

    return _this;
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!LinearRing} Clone.
   * @api
   */


  LinearRing.prototype.clone = function () {
    return new LinearRing(this.flatCoordinates.slice(), this.layout);
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */


  LinearRing.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < (0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .closestSquaredDistanceXY */ .qf)(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }

    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt((0,_flat_closest_js__WEBPACK_IMPORTED_MODULE_1__/* .maxSquaredDelta */ .Bv)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
      this.maxDeltaRevision_ = this.getRevision();
    }

    return (0,_flat_closest_js__WEBPACK_IMPORTED_MODULE_1__/* .assignClosestPoint */ .H$)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
  };
  /**
   * Return the area of the linear ring on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */


  LinearRing.prototype.getArea = function () {
    return (0,_flat_area_js__WEBPACK_IMPORTED_MODULE_2__/* .linearRing */ .QQ)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  };
  /**
   * Return the coordinates of the linear ring.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   */


  LinearRing.prototype.getCoordinates = function () {
    return (0,_flat_inflate_js__WEBPACK_IMPORTED_MODULE_3__/* .inflateCoordinates */ .Ml)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  };
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LinearRing} Simplified LinearRing.
   * @protected
   */


  LinearRing.prototype.getSimplifiedGeometryInternal = function (squaredTolerance) {
    var simplifiedFlatCoordinates = [];
    simplifiedFlatCoordinates.length = (0,_flat_simplify_js__WEBPACK_IMPORTED_MODULE_4__/* .douglasPeucker */ .dt)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0);
    return new LinearRing(simplifiedFlatCoordinates, _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].XY */ .Z.XY);
  };
  /**
   * Get the type of this geometry.
   * @return {import("./GeometryType.js").default} Geometry type.
   * @api
   */


  LinearRing.prototype.getType = function () {
    return _GeometryType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].LINEAR_RING */ .Z.LINEAR_RING;
  };
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */


  LinearRing.prototype.intersectsExtent = function (extent) {
    return false;
  };
  /**
   * Set the coordinates of the linear ring.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   * @api
   */


  LinearRing.prototype.setCoordinates = function (coordinates, opt_layout) {
    this.setLayout(opt_layout, coordinates, 1);

    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }

    this.flatCoordinates.length = (0,_flat_deflate_js__WEBPACK_IMPORTED_MODULE_7__/* .deflateCoordinates */ .Sg)(this.flatCoordinates, 0, coordinates, this.stride);
    this.changed();
  };

  return LinearRing;
}(_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .ZP);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinearRing);

/***/ }),

/***/ 4963:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2701);
/* harmony import */ var _GeometryType_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5870);
/* harmony import */ var _LineString_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9171);
/* harmony import */ var _SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(4285);
/* harmony import */ var _flat_closest_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1354);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1046);
/* harmony import */ var _flat_deflate_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6468);
/* harmony import */ var _flat_simplify_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1999);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3620);
/* harmony import */ var _flat_inflate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6301);
/* harmony import */ var _flat_interpolate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3137);
/* harmony import */ var _flat_intersectsextent_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7701);
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
 * @module ol/geom/MultiLineString
 */














/**
 * @classdesc
 * Multi-linestring geometry.
 *
 * @api
 */

var MultiLineString =
/** @class */
function (_super) {
  __extends(MultiLineString, _super);
  /**
   * @param {Array<Array<import("../coordinate.js").Coordinate>|LineString>|Array<number>} coordinates
   *     Coordinates or LineString geometries. (For internal use, flat coordinates in
   *     combination with `opt_layout` and `opt_ends` are also accepted.)
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   * @param {Array<number>} [opt_ends] Flat coordinate ends for internal use.
   */


  function MultiLineString(coordinates, opt_layout, opt_ends) {
    var _this = _super.call(this) || this;
    /**
     * @type {Array<number>}
     * @private
     */


    _this.ends_ = [];
    /**
     * @private
     * @type {number}
     */

    _this.maxDelta_ = -1;
    /**
     * @private
     * @type {number}
     */

    _this.maxDeltaRevision_ = -1;

    if (Array.isArray(coordinates[0])) {
      _this.setCoordinates(
      /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */
      coordinates, opt_layout);
    } else if (opt_layout !== undefined && opt_ends) {
      _this.setFlatCoordinates(opt_layout,
      /** @type {Array<number>} */
      coordinates);

      _this.ends_ = opt_ends;
    } else {
      var layout = _this.getLayout();

      var lineStrings =
      /** @type {Array<LineString>} */
      coordinates;
      var flatCoordinates = [];
      var ends = [];

      for (var i = 0, ii = lineStrings.length; i < ii; ++i) {
        var lineString = lineStrings[i];

        if (i === 0) {
          layout = lineString.getLayout();
        }

        (0,_array_js__WEBPACK_IMPORTED_MODULE_0__/* .extend */ .l7)(flatCoordinates, lineString.getFlatCoordinates());
        ends.push(flatCoordinates.length);
      }

      _this.setFlatCoordinates(layout, flatCoordinates);

      _this.ends_ = ends;
    }

    return _this;
  }
  /**
   * Append the passed linestring to the multilinestring.
   * @param {LineString} lineString LineString.
   * @api
   */


  MultiLineString.prototype.appendLineString = function (lineString) {
    if (!this.flatCoordinates) {
      this.flatCoordinates = lineString.getFlatCoordinates().slice();
    } else {
      (0,_array_js__WEBPACK_IMPORTED_MODULE_0__/* .extend */ .l7)(this.flatCoordinates, lineString.getFlatCoordinates().slice());
    }

    this.ends_.push(this.flatCoordinates.length);
    this.changed();
  };
  /**
   * Make a complete copy of the geometry.
   * @return {!MultiLineString} Clone.
   * @api
   */


  MultiLineString.prototype.clone = function () {
    var multiLineString = new MultiLineString(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
    multiLineString.applyProperties(this);
    return multiLineString;
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */


  MultiLineString.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .closestSquaredDistanceXY */ .qf)(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }

    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt((0,_flat_closest_js__WEBPACK_IMPORTED_MODULE_2__/* .arrayMaxSquaredDelta */ .Af)(this.flatCoordinates, 0, this.ends_, this.stride, 0));
      this.maxDeltaRevision_ = this.getRevision();
    }

    return (0,_flat_closest_js__WEBPACK_IMPORTED_MODULE_2__/* .assignClosestArrayPoint */ .Xl)(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, false, x, y, closestPoint, minSquaredDistance);
  };
  /**
   * Returns the coordinate at `m` using linear interpolation, or `null` if no
   * such coordinate exists.
   *
   * `opt_extrapolate` controls extrapolation beyond the range of Ms in the
   * MultiLineString. If `opt_extrapolate` is `true` then Ms less than the first
   * M will return the first coordinate and Ms greater than the last M will
   * return the last coordinate.
   *
   * `opt_interpolate` controls interpolation between consecutive LineStrings
   * within the MultiLineString. If `opt_interpolate` is `true` the coordinates
   * will be linearly interpolated between the last coordinate of one LineString
   * and the first coordinate of the next LineString.  If `opt_interpolate` is
   * `false` then the function will return `null` for Ms falling between
   * LineStrings.
   *
   * @param {number} m M.
   * @param {boolean} [opt_extrapolate] Extrapolate. Default is `false`.
   * @param {boolean} [opt_interpolate] Interpolate. Default is `false`.
   * @return {import("../coordinate.js").Coordinate} Coordinate.
   * @api
   */


  MultiLineString.prototype.getCoordinateAtM = function (m, opt_extrapolate, opt_interpolate) {
    if (this.layout != _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].XYM */ .Z.XYM && this.layout != _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].XYZM */ .Z.XYZM || this.flatCoordinates.length === 0) {
      return null;
    }

    var extrapolate = opt_extrapolate !== undefined ? opt_extrapolate : false;
    var interpolate = opt_interpolate !== undefined ? opt_interpolate : false;
    return (0,_flat_interpolate_js__WEBPACK_IMPORTED_MODULE_4__/* .lineStringsCoordinateAtM */ .dG)(this.flatCoordinates, 0, this.ends_, this.stride, m, extrapolate, interpolate);
  };
  /**
   * Return the coordinates of the multilinestring.
   * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
   * @api
   */


  MultiLineString.prototype.getCoordinates = function () {
    return (0,_flat_inflate_js__WEBPACK_IMPORTED_MODULE_5__/* .inflateCoordinatesArray */ .o1)(this.flatCoordinates, 0, this.ends_, this.stride);
  };
  /**
   * @return {Array<number>} Ends.
   */


  MultiLineString.prototype.getEnds = function () {
    return this.ends_;
  };
  /**
   * Return the linestring at the specified index.
   * @param {number} index Index.
   * @return {LineString} LineString.
   * @api
   */


  MultiLineString.prototype.getLineString = function (index) {
    if (index < 0 || this.ends_.length <= index) {
      return null;
    }

    return new _LineString_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z(this.flatCoordinates.slice(index === 0 ? 0 : this.ends_[index - 1], this.ends_[index]), this.layout);
  };
  /**
   * Return the linestrings of this multilinestring.
   * @return {Array<LineString>} LineStrings.
   * @api
   */


  MultiLineString.prototype.getLineStrings = function () {
    var flatCoordinates = this.flatCoordinates;
    var ends = this.ends_;
    var layout = this.layout;
    /** @type {Array<LineString>} */

    var lineStrings = [];
    var offset = 0;

    for (var i = 0, ii = ends.length; i < ii; ++i) {
      var end = ends[i];
      var lineString = new _LineString_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z(flatCoordinates.slice(offset, end), layout);
      lineStrings.push(lineString);
      offset = end;
    }

    return lineStrings;
  };
  /**
   * @return {Array<number>} Flat midpoints.
   */


  MultiLineString.prototype.getFlatMidpoints = function () {
    var midpoints = [];
    var flatCoordinates = this.flatCoordinates;
    var offset = 0;
    var ends = this.ends_;
    var stride = this.stride;

    for (var i = 0, ii = ends.length; i < ii; ++i) {
      var end = ends[i];
      var midpoint = (0,_flat_interpolate_js__WEBPACK_IMPORTED_MODULE_4__/* .interpolatePoint */ .WW)(flatCoordinates, offset, end, stride, 0.5);
      (0,_array_js__WEBPACK_IMPORTED_MODULE_0__/* .extend */ .l7)(midpoints, midpoint);
      offset = end;
    }

    return midpoints;
  };
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {MultiLineString} Simplified MultiLineString.
   * @protected
   */


  MultiLineString.prototype.getSimplifiedGeometryInternal = function (squaredTolerance) {
    var simplifiedFlatCoordinates = [];
    var simplifiedEnds = [];
    simplifiedFlatCoordinates.length = (0,_flat_simplify_js__WEBPACK_IMPORTED_MODULE_7__/* .douglasPeuckerArray */ .UJ)(this.flatCoordinates, 0, this.ends_, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0, simplifiedEnds);
    return new MultiLineString(simplifiedFlatCoordinates, _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].XY */ .Z.XY, simplifiedEnds);
  };
  /**
   * Get the type of this geometry.
   * @return {import("./GeometryType.js").default} Geometry type.
   * @api
   */


  MultiLineString.prototype.getType = function () {
    return _GeometryType_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"].MULTI_LINE_STRING */ .Z.MULTI_LINE_STRING;
  };
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */


  MultiLineString.prototype.intersectsExtent = function (extent) {
    return (0,_flat_intersectsextent_js__WEBPACK_IMPORTED_MODULE_9__/* .intersectsLineStringArray */ .AW)(this.flatCoordinates, 0, this.ends_, this.stride, extent);
  };
  /**
   * Set the coordinates of the multilinestring.
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
   * @param {GeometryLayout} [opt_layout] Layout.
   * @api
   */


  MultiLineString.prototype.setCoordinates = function (coordinates, opt_layout) {
    this.setLayout(opt_layout, coordinates, 2);

    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }

    var ends = (0,_flat_deflate_js__WEBPACK_IMPORTED_MODULE_10__/* .deflateCoordinatesArray */ ._5)(this.flatCoordinates, 0, coordinates, this.stride, this.ends_);
    this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
    this.changed();
  };

  return MultiLineString;
}(_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .ZP);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MultiLineString);

/***/ }),

/***/ 6733:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _GeometryType_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5870);
/* harmony import */ var _Point_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6397);
/* harmony import */ var _SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4285);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1046);
/* harmony import */ var _flat_deflate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6468);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3620);
/* harmony import */ var _flat_inflate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6301);
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4495);
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
 * @module ol/geom/MultiPoint
 */










/**
 * @classdesc
 * Multi-point geometry.
 *
 * @api
 */

var MultiPoint =
/** @class */
function (_super) {
  __extends(MultiPoint, _super);
  /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `opt_layout` are also accepted.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   */


  function MultiPoint(coordinates, opt_layout) {
    var _this = _super.call(this) || this;

    if (opt_layout && !Array.isArray(coordinates[0])) {
      _this.setFlatCoordinates(opt_layout,
      /** @type {Array<number>} */
      coordinates);
    } else {
      _this.setCoordinates(
      /** @type {Array<import("../coordinate.js").Coordinate>} */
      coordinates, opt_layout);
    }

    return _this;
  }
  /**
   * Append the passed point to this multipoint.
   * @param {Point} point Point.
   * @api
   */


  MultiPoint.prototype.appendPoint = function (point) {
    if (!this.flatCoordinates) {
      this.flatCoordinates = point.getFlatCoordinates().slice();
    } else {
      (0,_array_js__WEBPACK_IMPORTED_MODULE_0__/* .extend */ .l7)(this.flatCoordinates, point.getFlatCoordinates());
    }

    this.changed();
  };
  /**
   * Make a complete copy of the geometry.
   * @return {!MultiPoint} Clone.
   * @api
   */


  MultiPoint.prototype.clone = function () {
    var multiPoint = new MultiPoint(this.flatCoordinates.slice(), this.layout);
    multiPoint.applyProperties(this);
    return multiPoint;
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */


  MultiPoint.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .closestSquaredDistanceXY */ .qf)(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }

    var flatCoordinates = this.flatCoordinates;
    var stride = this.stride;

    for (var i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
      var squaredDistance = (0,_math_js__WEBPACK_IMPORTED_MODULE_2__/* .squaredDistance */ .bI)(x, y, flatCoordinates[i], flatCoordinates[i + 1]);

      if (squaredDistance < minSquaredDistance) {
        minSquaredDistance = squaredDistance;

        for (var j = 0; j < stride; ++j) {
          closestPoint[j] = flatCoordinates[i + j];
        }

        closestPoint.length = stride;
      }
    }

    return minSquaredDistance;
  };
  /**
   * Return the coordinates of the multipoint.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   */


  MultiPoint.prototype.getCoordinates = function () {
    return (0,_flat_inflate_js__WEBPACK_IMPORTED_MODULE_3__/* .inflateCoordinates */ .Ml)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  };
  /**
   * Return the point at the specified index.
   * @param {number} index Index.
   * @return {Point} Point.
   * @api
   */


  MultiPoint.prototype.getPoint = function (index) {
    var n = !this.flatCoordinates ? 0 : this.flatCoordinates.length / this.stride;

    if (index < 0 || n <= index) {
      return null;
    }

    return new _Point_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z(this.flatCoordinates.slice(index * this.stride, (index + 1) * this.stride), this.layout);
  };
  /**
   * Return the points of this multipoint.
   * @return {Array<Point>} Points.
   * @api
   */


  MultiPoint.prototype.getPoints = function () {
    var flatCoordinates = this.flatCoordinates;
    var layout = this.layout;
    var stride = this.stride;
    /** @type {Array<Point>} */

    var points = [];

    for (var i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
      var point = new _Point_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z(flatCoordinates.slice(i, i + stride), layout);
      points.push(point);
    }

    return points;
  };
  /**
   * Get the type of this geometry.
   * @return {import("./GeometryType.js").default} Geometry type.
   * @api
   */


  MultiPoint.prototype.getType = function () {
    return _GeometryType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].MULTI_POINT */ .Z.MULTI_POINT;
  };
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */


  MultiPoint.prototype.intersectsExtent = function (extent) {
    var flatCoordinates = this.flatCoordinates;
    var stride = this.stride;

    for (var i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
      var x = flatCoordinates[i];
      var y = flatCoordinates[i + 1];

      if ((0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .containsXY */ .jE)(extent, x, y)) {
        return true;
      }
    }

    return false;
  };
  /**
   * Set the coordinates of the multipoint.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   * @api
   */


  MultiPoint.prototype.setCoordinates = function (coordinates, opt_layout) {
    this.setLayout(opt_layout, coordinates, 1);

    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }

    this.flatCoordinates.length = (0,_flat_deflate_js__WEBPACK_IMPORTED_MODULE_6__/* .deflateCoordinates */ .Sg)(this.flatCoordinates, 0, coordinates, this.stride);
    this.changed();
  };

  return MultiPoint;
}(_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .ZP);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MultiPoint);

/***/ }),

/***/ 9232:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2701);
/* harmony import */ var _GeometryType_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(5870);
/* harmony import */ var _MultiPoint_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6733);
/* harmony import */ var _Polygon_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(2607);
/* harmony import */ var _SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(4285);
/* harmony import */ var _flat_closest_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1354);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1046);
/* harmony import */ var _flat_deflate_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(6468);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3620);
/* harmony import */ var _flat_interiorpoint_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2130);
/* harmony import */ var _flat_inflate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6301);
/* harmony import */ var _flat_intersectsextent_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(7701);
/* harmony import */ var _flat_orient_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3738);
/* harmony import */ var _flat_area_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(285);
/* harmony import */ var _flat_center_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1414);
/* harmony import */ var _flat_contains_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1063);
/* harmony import */ var _flat_simplify_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1999);
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
 * @module ol/geom/MultiPolygon
 */



















/**
 * @classdesc
 * Multi-polygon geometry.
 *
 * @api
 */

var MultiPolygon =
/** @class */
function (_super) {
  __extends(MultiPolygon, _super);
  /**
   * @param {Array<Array<Array<import("../coordinate.js").Coordinate>>|Polygon>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `opt_layout` and `opt_endss` are also accepted.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   * @param {Array<Array<number>>} [opt_endss] Array of ends for internal use with flat coordinates.
   */


  function MultiPolygon(coordinates, opt_layout, opt_endss) {
    var _this = _super.call(this) || this;
    /**
     * @type {Array<Array<number>>}
     * @private
     */


    _this.endss_ = [];
    /**
     * @private
     * @type {number}
     */

    _this.flatInteriorPointsRevision_ = -1;
    /**
     * @private
     * @type {Array<number>}
     */

    _this.flatInteriorPoints_ = null;
    /**
     * @private
     * @type {number}
     */

    _this.maxDelta_ = -1;
    /**
     * @private
     * @type {number}
     */

    _this.maxDeltaRevision_ = -1;
    /**
     * @private
     * @type {number}
     */

    _this.orientedRevision_ = -1;
    /**
     * @private
     * @type {Array<number>}
     */

    _this.orientedFlatCoordinates_ = null;

    if (!opt_endss && !Array.isArray(coordinates[0])) {
      var layout = _this.getLayout();

      var polygons =
      /** @type {Array<Polygon>} */
      coordinates;
      var flatCoordinates = [];
      var endss = [];

      for (var i = 0, ii = polygons.length; i < ii; ++i) {
        var polygon = polygons[i];

        if (i === 0) {
          layout = polygon.getLayout();
        }

        var offset = flatCoordinates.length;
        var ends = polygon.getEnds();

        for (var j = 0, jj = ends.length; j < jj; ++j) {
          ends[j] += offset;
        }

        (0,_array_js__WEBPACK_IMPORTED_MODULE_0__/* .extend */ .l7)(flatCoordinates, polygon.getFlatCoordinates());
        endss.push(ends);
      }

      opt_layout = layout;
      coordinates = flatCoordinates;
      opt_endss = endss;
    }

    if (opt_layout !== undefined && opt_endss) {
      _this.setFlatCoordinates(opt_layout,
      /** @type {Array<number>} */
      coordinates);

      _this.endss_ = opt_endss;
    } else {
      _this.setCoordinates(
      /** @type {Array<Array<Array<import("../coordinate.js").Coordinate>>>} */
      coordinates, opt_layout);
    }

    return _this;
  }
  /**
   * Append the passed polygon to this multipolygon.
   * @param {Polygon} polygon Polygon.
   * @api
   */


  MultiPolygon.prototype.appendPolygon = function (polygon) {
    /** @type {Array<number>} */
    var ends;

    if (!this.flatCoordinates) {
      this.flatCoordinates = polygon.getFlatCoordinates().slice();
      ends = polygon.getEnds().slice();
      this.endss_.push();
    } else {
      var offset = this.flatCoordinates.length;
      (0,_array_js__WEBPACK_IMPORTED_MODULE_0__/* .extend */ .l7)(this.flatCoordinates, polygon.getFlatCoordinates());
      ends = polygon.getEnds().slice();

      for (var i = 0, ii = ends.length; i < ii; ++i) {
        ends[i] += offset;
      }
    }

    this.endss_.push(ends);
    this.changed();
  };
  /**
   * Make a complete copy of the geometry.
   * @return {!MultiPolygon} Clone.
   * @api
   */


  MultiPolygon.prototype.clone = function () {
    var len = this.endss_.length;
    var newEndss = new Array(len);

    for (var i = 0; i < len; ++i) {
      newEndss[i] = this.endss_[i].slice();
    }

    var multiPolygon = new MultiPolygon(this.flatCoordinates.slice(), this.layout, newEndss);
    multiPolygon.applyProperties(this);
    return multiPolygon;
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */


  MultiPolygon.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .closestSquaredDistanceXY */ .qf)(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }

    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt((0,_flat_closest_js__WEBPACK_IMPORTED_MODULE_2__/* .multiArrayMaxSquaredDelta */ .sD)(this.flatCoordinates, 0, this.endss_, this.stride, 0));
      this.maxDeltaRevision_ = this.getRevision();
    }

    return (0,_flat_closest_js__WEBPACK_IMPORTED_MODULE_2__/* .assignClosestMultiArrayPoint */ .gI)(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */


  MultiPolygon.prototype.containsXY = function (x, y) {
    return (0,_flat_contains_js__WEBPACK_IMPORTED_MODULE_3__/* .linearRingssContainsXY */ .Zl)(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, x, y);
  };
  /**
   * Return the area of the multipolygon on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */


  MultiPolygon.prototype.getArea = function () {
    return (0,_flat_area_js__WEBPACK_IMPORTED_MODULE_4__/* .linearRingss */ .Eu)(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride);
  };
  /**
   * Get the coordinate array for this geometry.  This array has the structure
   * of a GeoJSON coordinate array for multi-polygons.
   *
   * @param {boolean} [opt_right] Orient coordinates according to the right-hand
   *     rule (counter-clockwise for exterior and clockwise for interior rings).
   *     If `false`, coordinates will be oriented according to the left-hand rule
   *     (clockwise for exterior and counter-clockwise for interior rings).
   *     By default, coordinate orientation will depend on how the geometry was
   *     constructed.
   * @return {Array<Array<Array<import("../coordinate.js").Coordinate>>>} Coordinates.
   * @api
   */


  MultiPolygon.prototype.getCoordinates = function (opt_right) {
    var flatCoordinates;

    if (opt_right !== undefined) {
      flatCoordinates = this.getOrientedFlatCoordinates().slice();
      (0,_flat_orient_js__WEBPACK_IMPORTED_MODULE_5__/* .orientLinearRingsArray */ .dL)(flatCoordinates, 0, this.endss_, this.stride, opt_right);
    } else {
      flatCoordinates = this.flatCoordinates;
    }

    return (0,_flat_inflate_js__WEBPACK_IMPORTED_MODULE_6__/* .inflateMultiCoordinatesArray */ .ug)(flatCoordinates, 0, this.endss_, this.stride);
  };
  /**
   * @return {Array<Array<number>>} Endss.
   */


  MultiPolygon.prototype.getEndss = function () {
    return this.endss_;
  };
  /**
   * @return {Array<number>} Flat interior points.
   */


  MultiPolygon.prototype.getFlatInteriorPoints = function () {
    if (this.flatInteriorPointsRevision_ != this.getRevision()) {
      var flatCenters = (0,_flat_center_js__WEBPACK_IMPORTED_MODULE_7__/* .linearRingss */ .E)(this.flatCoordinates, 0, this.endss_, this.stride);
      this.flatInteriorPoints_ = (0,_flat_interiorpoint_js__WEBPACK_IMPORTED_MODULE_8__/* .getInteriorPointsOfMultiArray */ .U)(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, flatCenters);
      this.flatInteriorPointsRevision_ = this.getRevision();
    }

    return this.flatInteriorPoints_;
  };
  /**
   * Return the interior points as {@link module:ol/geom/MultiPoint multipoint}.
   * @return {MultiPoint} Interior points as XYM coordinates, where M is
   * the length of the horizontal intersection that the point belongs to.
   * @api
   */


  MultiPolygon.prototype.getInteriorPoints = function () {
    return new _MultiPoint_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z(this.getFlatInteriorPoints().slice(), _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"].XYM */ .Z.XYM);
  };
  /**
   * @return {Array<number>} Oriented flat coordinates.
   */


  MultiPolygon.prototype.getOrientedFlatCoordinates = function () {
    if (this.orientedRevision_ != this.getRevision()) {
      var flatCoordinates = this.flatCoordinates;

      if ((0,_flat_orient_js__WEBPACK_IMPORTED_MODULE_5__/* .linearRingssAreOriented */ .Oj)(flatCoordinates, 0, this.endss_, this.stride)) {
        this.orientedFlatCoordinates_ = flatCoordinates;
      } else {
        this.orientedFlatCoordinates_ = flatCoordinates.slice();
        this.orientedFlatCoordinates_.length = (0,_flat_orient_js__WEBPACK_IMPORTED_MODULE_5__/* .orientLinearRingsArray */ .dL)(this.orientedFlatCoordinates_, 0, this.endss_, this.stride);
      }

      this.orientedRevision_ = this.getRevision();
    }

    return this.orientedFlatCoordinates_;
  };
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {MultiPolygon} Simplified MultiPolygon.
   * @protected
   */


  MultiPolygon.prototype.getSimplifiedGeometryInternal = function (squaredTolerance) {
    var simplifiedFlatCoordinates = [];
    var simplifiedEndss = [];
    simplifiedFlatCoordinates.length = (0,_flat_simplify_js__WEBPACK_IMPORTED_MODULE_11__/* .quantizeMultiArray */ .Pp)(this.flatCoordinates, 0, this.endss_, this.stride, Math.sqrt(squaredTolerance), simplifiedFlatCoordinates, 0, simplifiedEndss);
    return new MultiPolygon(simplifiedFlatCoordinates, _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"].XY */ .Z.XY, simplifiedEndss);
  };
  /**
   * Return the polygon at the specified index.
   * @param {number} index Index.
   * @return {Polygon} Polygon.
   * @api
   */


  MultiPolygon.prototype.getPolygon = function (index) {
    if (index < 0 || this.endss_.length <= index) {
      return null;
    }

    var offset;

    if (index === 0) {
      offset = 0;
    } else {
      var prevEnds = this.endss_[index - 1];
      offset = prevEnds[prevEnds.length - 1];
    }

    var ends = this.endss_[index].slice();
    var end = ends[ends.length - 1];

    if (offset !== 0) {
      for (var i = 0, ii = ends.length; i < ii; ++i) {
        ends[i] -= offset;
      }
    }

    return new _Polygon_js__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .ZP(this.flatCoordinates.slice(offset, end), this.layout, ends);
  };
  /**
   * Return the polygons of this multipolygon.
   * @return {Array<Polygon>} Polygons.
   * @api
   */


  MultiPolygon.prototype.getPolygons = function () {
    var layout = this.layout;
    var flatCoordinates = this.flatCoordinates;
    var endss = this.endss_;
    var polygons = [];
    var offset = 0;

    for (var i = 0, ii = endss.length; i < ii; ++i) {
      var ends = endss[i].slice();
      var end = ends[ends.length - 1];

      if (offset !== 0) {
        for (var j = 0, jj = ends.length; j < jj; ++j) {
          ends[j] -= offset;
        }
      }

      var polygon = new _Polygon_js__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .ZP(flatCoordinates.slice(offset, end), layout, ends);
      polygons.push(polygon);
      offset = end;
    }

    return polygons;
  };
  /**
   * Get the type of this geometry.
   * @return {import("./GeometryType.js").default} Geometry type.
   * @api
   */


  MultiPolygon.prototype.getType = function () {
    return _GeometryType_js__WEBPACK_IMPORTED_MODULE_13__/* ["default"].MULTI_POLYGON */ .Z.MULTI_POLYGON;
  };
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */


  MultiPolygon.prototype.intersectsExtent = function (extent) {
    return (0,_flat_intersectsextent_js__WEBPACK_IMPORTED_MODULE_14__/* .intersectsLinearRingMultiArray */ .oW)(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, extent);
  };
  /**
   * Set the coordinates of the multipolygon.
   * @param {!Array<Array<Array<import("../coordinate.js").Coordinate>>>} coordinates Coordinates.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   * @api
   */


  MultiPolygon.prototype.setCoordinates = function (coordinates, opt_layout) {
    this.setLayout(opt_layout, coordinates, 3);

    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }

    var endss = (0,_flat_deflate_js__WEBPACK_IMPORTED_MODULE_15__/* .deflateMultiCoordinatesArray */ .QT)(this.flatCoordinates, 0, coordinates, this.stride, this.endss_);

    if (endss.length === 0) {
      this.flatCoordinates.length = 0;
    } else {
      var lastEnds = endss[endss.length - 1];
      this.flatCoordinates.length = lastEnds.length === 0 ? 0 : lastEnds[lastEnds.length - 1];
    }

    this.changed();
  };

  return MultiPolygon;
}(_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .ZP);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MultiPolygon);

/***/ })

}]);