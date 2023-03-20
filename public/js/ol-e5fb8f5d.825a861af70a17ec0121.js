"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[131],{

/***/ 6397:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _GeometryType_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5870);
/* harmony import */ var _SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4285);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1046);
/* harmony import */ var _flat_deflate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6468);
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4495);
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
 * @module ol/geom/Point
 */







/**
 * @classdesc
 * Point geometry.
 *
 * @api
 */

var Point =
/** @class */
function (_super) {
  __extends(Point, _super);
  /**
   * @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   */


  function Point(coordinates, opt_layout) {
    var _this = _super.call(this) || this;

    _this.setCoordinates(coordinates, opt_layout);

    return _this;
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Point} Clone.
   * @api
   */


  Point.prototype.clone = function () {
    var point = new Point(this.flatCoordinates.slice(), this.layout);
    point.applyProperties(this);
    return point;
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */


  Point.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
    var flatCoordinates = this.flatCoordinates;
    var squaredDistance = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .squaredDistance */ .bI)(x, y, flatCoordinates[0], flatCoordinates[1]);

    if (squaredDistance < minSquaredDistance) {
      var stride = this.stride;

      for (var i = 0; i < stride; ++i) {
        closestPoint[i] = flatCoordinates[i];
      }

      closestPoint.length = stride;
      return squaredDistance;
    } else {
      return minSquaredDistance;
    }
  };
  /**
   * Return the coordinate of the point.
   * @return {import("../coordinate.js").Coordinate} Coordinates.
   * @api
   */


  Point.prototype.getCoordinates = function () {
    return !this.flatCoordinates ? [] : this.flatCoordinates.slice();
  };
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */


  Point.prototype.computeExtent = function (extent) {
    return (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .createOrUpdateFromCoordinate */ .HK)(this.flatCoordinates, extent);
  };
  /**
   * Get the type of this geometry.
   * @return {import("./GeometryType.js").default} Geometry type.
   * @api
   */


  Point.prototype.getType = function () {
    return _GeometryType_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].POINT */ .Z.POINT;
  };
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */


  Point.prototype.intersectsExtent = function (extent) {
    return (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .containsXY */ .jE)(extent, this.flatCoordinates[0], this.flatCoordinates[1]);
  };
  /**
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   * @api
   */


  Point.prototype.setCoordinates = function (coordinates, opt_layout) {
    this.setLayout(opt_layout, coordinates, 0);

    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }

    this.flatCoordinates.length = (0,_flat_deflate_js__WEBPACK_IMPORTED_MODULE_3__/* .deflateCoordinate */ .IG)(this.flatCoordinates, 0, coordinates, this.stride);
    this.changed();
  };

  return Point;
}(_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .ZP);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Point);

/***/ }),

/***/ 2607:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "oJ": () => (/* binding */ fromExtent)
/* harmony export */ });
/* unused harmony exports circular, fromCircle, makeRegular */
/* harmony import */ var _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2701);
/* harmony import */ var _GeometryType_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(5870);
/* harmony import */ var _LinearRing_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2454);
/* harmony import */ var _Point_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6397);
/* harmony import */ var _SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(4285);
/* harmony import */ var _flat_closest_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1354);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1046);
/* harmony import */ var _flat_deflate_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(6468);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3620);
/* harmony import */ var _flat_interiorpoint_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2130);
/* harmony import */ var _flat_inflate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6301);
/* harmony import */ var _flat_intersectsextent_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7701);
/* harmony import */ var _flat_orient_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3738);
/* harmony import */ var _flat_area_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(285);
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
 * @module ol/geom/Polygon
 */




















/**
 * @classdesc
 * Polygon geometry.
 *
 * @api
 */

var Polygon =
/** @class */
function (_super) {
  __extends(Polygon, _super);
  /**
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>|!Array<number>} coordinates
   *     Array of linear rings that define the polygon. The first linear ring of the
   *     array defines the outer-boundary or surface of the polygon. Each subsequent
   *     linear ring defines a hole in the surface of the polygon. A linear ring is
   *     an array of vertices' coordinates where the first coordinate and the last are
   *     equivalent. (For internal use, flat coordinates in combination with
   *     `opt_layout` and `opt_ends` are also accepted.)
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   * @param {Array<number>} [opt_ends] Ends (for internal use with flat coordinates).
   */


  function Polygon(coordinates, opt_layout, opt_ends) {
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

    _this.flatInteriorPointRevision_ = -1;
    /**
     * @private
     * @type {import("../coordinate.js").Coordinate}
     */

    _this.flatInteriorPoint_ = null;
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

    if (opt_layout !== undefined && opt_ends) {
      _this.setFlatCoordinates(opt_layout,
      /** @type {Array<number>} */
      coordinates);

      _this.ends_ = opt_ends;
    } else {
      _this.setCoordinates(
      /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */
      coordinates, opt_layout);
    }

    return _this;
  }
  /**
   * Append the passed linear ring to this polygon.
   * @param {LinearRing} linearRing Linear ring.
   * @api
   */


  Polygon.prototype.appendLinearRing = function (linearRing) {
    if (!this.flatCoordinates) {
      this.flatCoordinates = linearRing.getFlatCoordinates().slice();
    } else {
      (0,_array_js__WEBPACK_IMPORTED_MODULE_0__/* .extend */ .l7)(this.flatCoordinates, linearRing.getFlatCoordinates());
    }

    this.ends_.push(this.flatCoordinates.length);
    this.changed();
  };
  /**
   * Make a complete copy of the geometry.
   * @return {!Polygon} Clone.
   * @api
   */


  Polygon.prototype.clone = function () {
    var polygon = new Polygon(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
    polygon.applyProperties(this);
    return polygon;
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */


  Polygon.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .closestSquaredDistanceXY */ .qf)(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }

    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt((0,_flat_closest_js__WEBPACK_IMPORTED_MODULE_2__/* .arrayMaxSquaredDelta */ .Af)(this.flatCoordinates, 0, this.ends_, this.stride, 0));
      this.maxDeltaRevision_ = this.getRevision();
    }

    return (0,_flat_closest_js__WEBPACK_IMPORTED_MODULE_2__/* .assignClosestArrayPoint */ .Xl)(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */


  Polygon.prototype.containsXY = function (x, y) {
    return (0,_flat_contains_js__WEBPACK_IMPORTED_MODULE_3__/* .linearRingsContainsXY */ .wY)(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, x, y);
  };
  /**
   * Return the area of the polygon on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */


  Polygon.prototype.getArea = function () {
    return (0,_flat_area_js__WEBPACK_IMPORTED_MODULE_4__/* .linearRings */ .KP)(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride);
  };
  /**
   * Get the coordinate array for this geometry.  This array has the structure
   * of a GeoJSON coordinate array for polygons.
   *
   * @param {boolean} [opt_right] Orient coordinates according to the right-hand
   *     rule (counter-clockwise for exterior and clockwise for interior rings).
   *     If `false`, coordinates will be oriented according to the left-hand rule
   *     (clockwise for exterior and counter-clockwise for interior rings).
   *     By default, coordinate orientation will depend on how the geometry was
   *     constructed.
   * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
   * @api
   */


  Polygon.prototype.getCoordinates = function (opt_right) {
    var flatCoordinates;

    if (opt_right !== undefined) {
      flatCoordinates = this.getOrientedFlatCoordinates().slice();
      (0,_flat_orient_js__WEBPACK_IMPORTED_MODULE_5__/* .orientLinearRings */ .zX)(flatCoordinates, 0, this.ends_, this.stride, opt_right);
    } else {
      flatCoordinates = this.flatCoordinates;
    }

    return (0,_flat_inflate_js__WEBPACK_IMPORTED_MODULE_6__/* .inflateCoordinatesArray */ .o1)(flatCoordinates, 0, this.ends_, this.stride);
  };
  /**
   * @return {Array<number>} Ends.
   */


  Polygon.prototype.getEnds = function () {
    return this.ends_;
  };
  /**
   * @return {Array<number>} Interior point.
   */


  Polygon.prototype.getFlatInteriorPoint = function () {
    if (this.flatInteriorPointRevision_ != this.getRevision()) {
      var flatCenter = (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .getCenter */ .qg)(this.getExtent());
      this.flatInteriorPoint_ = (0,_flat_interiorpoint_js__WEBPACK_IMPORTED_MODULE_7__/* .getInteriorPointOfArray */ .X)(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, flatCenter, 0);
      this.flatInteriorPointRevision_ = this.getRevision();
    }

    return this.flatInteriorPoint_;
  };
  /**
   * Return an interior point of the polygon.
   * @return {Point} Interior point as XYM coordinate, where M is the
   * length of the horizontal intersection that the point belongs to.
   * @api
   */


  Polygon.prototype.getInteriorPoint = function () {
    return new _Point_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z(this.getFlatInteriorPoint(), _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].XYM */ .Z.XYM);
  };
  /**
   * Return the number of rings of the polygon,  this includes the exterior
   * ring and any interior rings.
   *
   * @return {number} Number of rings.
   * @api
   */


  Polygon.prototype.getLinearRingCount = function () {
    return this.ends_.length;
  };
  /**
   * Return the Nth linear ring of the polygon geometry. Return `null` if the
   * given index is out of range.
   * The exterior linear ring is available at index `0` and the interior rings
   * at index `1` and beyond.
   *
   * @param {number} index Index.
   * @return {LinearRing} Linear ring.
   * @api
   */


  Polygon.prototype.getLinearRing = function (index) {
    if (index < 0 || this.ends_.length <= index) {
      return null;
    }

    return new _LinearRing_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z(this.flatCoordinates.slice(index === 0 ? 0 : this.ends_[index - 1], this.ends_[index]), this.layout);
  };
  /**
   * Return the linear rings of the polygon.
   * @return {Array<LinearRing>} Linear rings.
   * @api
   */


  Polygon.prototype.getLinearRings = function () {
    var layout = this.layout;
    var flatCoordinates = this.flatCoordinates;
    var ends = this.ends_;
    var linearRings = [];
    var offset = 0;

    for (var i = 0, ii = ends.length; i < ii; ++i) {
      var end = ends[i];
      var linearRing = new _LinearRing_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z(flatCoordinates.slice(offset, end), layout);
      linearRings.push(linearRing);
      offset = end;
    }

    return linearRings;
  };
  /**
   * @return {Array<number>} Oriented flat coordinates.
   */


  Polygon.prototype.getOrientedFlatCoordinates = function () {
    if (this.orientedRevision_ != this.getRevision()) {
      var flatCoordinates = this.flatCoordinates;

      if ((0,_flat_orient_js__WEBPACK_IMPORTED_MODULE_5__/* .linearRingsAreOriented */ .$v)(flatCoordinates, 0, this.ends_, this.stride)) {
        this.orientedFlatCoordinates_ = flatCoordinates;
      } else {
        this.orientedFlatCoordinates_ = flatCoordinates.slice();
        this.orientedFlatCoordinates_.length = (0,_flat_orient_js__WEBPACK_IMPORTED_MODULE_5__/* .orientLinearRings */ .zX)(this.orientedFlatCoordinates_, 0, this.ends_, this.stride);
      }

      this.orientedRevision_ = this.getRevision();
    }

    return this.orientedFlatCoordinates_;
  };
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Polygon} Simplified Polygon.
   * @protected
   */


  Polygon.prototype.getSimplifiedGeometryInternal = function (squaredTolerance) {
    var simplifiedFlatCoordinates = [];
    var simplifiedEnds = [];
    simplifiedFlatCoordinates.length = (0,_flat_simplify_js__WEBPACK_IMPORTED_MODULE_11__/* .quantizeArray */ .Zh)(this.flatCoordinates, 0, this.ends_, this.stride, Math.sqrt(squaredTolerance), simplifiedFlatCoordinates, 0, simplifiedEnds);
    return new Polygon(simplifiedFlatCoordinates, _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].XY */ .Z.XY, simplifiedEnds);
  };
  /**
   * Get the type of this geometry.
   * @return {import("./GeometryType.js").default} Geometry type.
   * @api
   */


  Polygon.prototype.getType = function () {
    return _GeometryType_js__WEBPACK_IMPORTED_MODULE_12__/* ["default"].POLYGON */ .Z.POLYGON;
  };
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */


  Polygon.prototype.intersectsExtent = function (extent) {
    return (0,_flat_intersectsextent_js__WEBPACK_IMPORTED_MODULE_13__/* .intersectsLinearRingArray */ .ac)(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, extent);
  };
  /**
   * Set the coordinates of the polygon.
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   * @api
   */


  Polygon.prototype.setCoordinates = function (coordinates, opt_layout) {
    this.setLayout(opt_layout, coordinates, 2);

    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }

    var ends = (0,_flat_deflate_js__WEBPACK_IMPORTED_MODULE_14__/* .deflateCoordinatesArray */ ._5)(this.flatCoordinates, 0, coordinates, this.stride, this.ends_);
    this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
    this.changed();
  };

  return Polygon;
}(_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .ZP);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Polygon);
/**
 * Create an approximation of a circle on the surface of a sphere.
 * @param {import("../coordinate.js").Coordinate} center Center (`[lon, lat]` in degrees).
 * @param {number} radius The great-circle distance from the center to
 *     the polygon vertices in meters.
 * @param {number} [opt_n] Optional number of vertices for the resulting
 *     polygon. Default is `32`.
 * @param {number} [opt_sphereRadius] Optional radius for the sphere (defaults to
 *     the Earth's mean radius using the WGS84 ellipsoid).
 * @return {Polygon} The "circular" polygon.
 * @api
 */

function circular(center, radius, opt_n, opt_sphereRadius) {
  var n = opt_n ? opt_n : 32;
  /** @type {Array<number>} */

  var flatCoordinates = [];

  for (var i = 0; i < n; ++i) {
    extend(flatCoordinates, sphereOffset(center, radius, 2 * Math.PI * i / n, opt_sphereRadius));
  }

  flatCoordinates.push(flatCoordinates[0], flatCoordinates[1]);
  return new Polygon(flatCoordinates, GeometryLayout.XY, [flatCoordinates.length]);
}
/**
 * Create a polygon from an extent. The layout used is `XY`.
 * @param {import("../extent.js").Extent} extent The extent.
 * @return {Polygon} The polygon.
 * @api
 */

function fromExtent(extent) {
  var minX = extent[0];
  var minY = extent[1];
  var maxX = extent[2];
  var maxY = extent[3];
  var flatCoordinates = [minX, minY, minX, maxY, maxX, maxY, maxX, minY, minX, minY];
  return new Polygon(flatCoordinates, _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].XY */ .Z.XY, [flatCoordinates.length]);
}
/**
 * Create a regular polygon from a circle.
 * @param {import("./Circle.js").default} circle Circle geometry.
 * @param {number} [opt_sides] Number of sides of the polygon. Default is 32.
 * @param {number} [opt_angle] Start angle for the first vertex of the polygon in
 *     counter-clockwise radians. 0 means East. Default is 0.
 * @return {Polygon} Polygon geometry.
 * @api
 */

function fromCircle(circle, opt_sides, opt_angle) {
  var sides = opt_sides ? opt_sides : 32;
  var stride = circle.getStride();
  var layout = circle.getLayout();
  var center = circle.getCenter();
  var arrayLength = stride * (sides + 1);
  var flatCoordinates = new Array(arrayLength);

  for (var i = 0; i < arrayLength; i += stride) {
    flatCoordinates[i] = 0;
    flatCoordinates[i + 1] = 0;

    for (var j = 2; j < stride; j++) {
      flatCoordinates[i + j] = center[j];
    }
  }

  var ends = [flatCoordinates.length];
  var polygon = new Polygon(flatCoordinates, layout, ends);
  makeRegular(polygon, center, circle.getRadius(), opt_angle);
  return polygon;
}
/**
 * Modify the coordinates of a polygon to make it a regular polygon.
 * @param {Polygon} polygon Polygon geometry.
 * @param {import("../coordinate.js").Coordinate} center Center of the regular polygon.
 * @param {number} radius Radius of the regular polygon.
 * @param {number} [opt_angle] Start angle for the first vertex of the polygon in
 *     counter-clockwise radians. 0 means East. Default is 0.
 */

function makeRegular(polygon, center, radius, opt_angle) {
  var flatCoordinates = polygon.getFlatCoordinates();
  var stride = polygon.getStride();
  var sides = flatCoordinates.length / stride - 1;
  var startAngle = opt_angle ? opt_angle : 0;

  for (var i = 0; i <= sides; ++i) {
    var offset = i * stride;
    var angle = startAngle + modulo(i, sides) * 2 * Math.PI / sides;
    flatCoordinates[offset] = center[0] + radius * Math.cos(angle);
    flatCoordinates[offset + 1] = center[1] + radius * Math.sin(angle);
  }

  polygon.changed();
}

/***/ }),

/***/ 4285:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Kr": () => (/* binding */ transformGeom2D),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export getStrideForLayout */
/* harmony import */ var _Geometry_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3724);
/* harmony import */ var _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2701);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2618);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1046);
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
 * @module ol/geom/SimpleGeometry
 */







/**
 * @classdesc
 * Abstract base class; only used for creating subclasses; do not instantiate
 * in apps, as cannot be rendered.
 *
 * @abstract
 * @api
 */

var SimpleGeometry =
/** @class */
function (_super) {
  __extends(SimpleGeometry, _super);

  function SimpleGeometry() {
    var _this = _super.call(this) || this;
    /**
     * @protected
     * @type {import("./GeometryLayout.js").default}
     */


    _this.layout = _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].XY */ .Z.XY;
    /**
     * @protected
     * @type {number}
     */

    _this.stride = 2;
    /**
     * @protected
     * @type {Array<number>}
     */

    _this.flatCoordinates = null;
    return _this;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */


  SimpleGeometry.prototype.computeExtent = function (extent) {
    return (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .createOrUpdateFromFlatCoordinates */ .GN)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
  };
  /**
   * @abstract
   * @return {Array<*>} Coordinates.
   */


  SimpleGeometry.prototype.getCoordinates = function () {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_2__/* .abstract */ .O3)();
  };
  /**
   * Return the first coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} First coordinate.
   * @api
   */


  SimpleGeometry.prototype.getFirstCoordinate = function () {
    return this.flatCoordinates.slice(0, this.stride);
  };
  /**
   * @return {Array<number>} Flat coordinates.
   */


  SimpleGeometry.prototype.getFlatCoordinates = function () {
    return this.flatCoordinates;
  };
  /**
   * Return the last coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} Last point.
   * @api
   */


  SimpleGeometry.prototype.getLastCoordinate = function () {
    return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride);
  };
  /**
   * Return the {@link module:ol/geom/GeometryLayout layout} of the geometry.
   * @return {import("./GeometryLayout.js").default} Layout.
   * @api
   */


  SimpleGeometry.prototype.getLayout = function () {
    return this.layout;
  };
  /**
   * Create a simplified version of this geometry using the Douglas Peucker algorithm.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   */


  SimpleGeometry.prototype.getSimplifiedGeometry = function (squaredTolerance) {
    if (this.simplifiedGeometryRevision !== this.getRevision()) {
      this.simplifiedGeometryMaxMinSquaredTolerance = 0;
      this.simplifiedGeometryRevision = this.getRevision();
    } // If squaredTolerance is negative or if we know that simplification will not
    // have any effect then just return this.


    if (squaredTolerance < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && squaredTolerance <= this.simplifiedGeometryMaxMinSquaredTolerance) {
      return this;
    }

    var simplifiedGeometry = this.getSimplifiedGeometryInternal(squaredTolerance);
    var simplifiedFlatCoordinates = simplifiedGeometry.getFlatCoordinates();

    if (simplifiedFlatCoordinates.length < this.flatCoordinates.length) {
      return simplifiedGeometry;
    } else {
      // Simplification did not actually remove any coordinates.  We now know
      // that any calls to getSimplifiedGeometry with a squaredTolerance less
      // than or equal to the current squaredTolerance will also not have any
      // effect.  This allows us to short circuit simplification (saving CPU
      // cycles) and prevents the cache of simplified geometries from filling
      // up with useless identical copies of this geometry (saving memory).
      this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
      return this;
    }
  };
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   * @protected
   */


  SimpleGeometry.prototype.getSimplifiedGeometryInternal = function (squaredTolerance) {
    return this;
  };
  /**
   * @return {number} Stride.
   */


  SimpleGeometry.prototype.getStride = function () {
    return this.stride;
  };
  /**
   * @param {import("./GeometryLayout.js").default} layout Layout.
   * @param {Array<number>} flatCoordinates Flat coordinates.
   */


  SimpleGeometry.prototype.setFlatCoordinates = function (layout, flatCoordinates) {
    this.stride = getStrideForLayout(layout);
    this.layout = layout;
    this.flatCoordinates = flatCoordinates;
  };
  /**
   * @abstract
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   */


  SimpleGeometry.prototype.setCoordinates = function (coordinates, opt_layout) {
    (0,_util_js__WEBPACK_IMPORTED_MODULE_2__/* .abstract */ .O3)();
  };
  /**
   * @param {import("./GeometryLayout.js").default|undefined} layout Layout.
   * @param {Array<*>} coordinates Coordinates.
   * @param {number} nesting Nesting.
   * @protected
   */


  SimpleGeometry.prototype.setLayout = function (layout, coordinates, nesting) {
    /** @type {number} */
    var stride;

    if (layout) {
      stride = getStrideForLayout(layout);
    } else {
      for (var i = 0; i < nesting; ++i) {
        if (coordinates.length === 0) {
          this.layout = _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].XY */ .Z.XY;
          this.stride = 2;
          return;
        } else {
          coordinates =
          /** @type {Array} */
          coordinates[0];
        }
      }

      stride = coordinates.length;
      layout = getLayoutForStride(stride);
    }

    this.layout = layout;
    this.stride = stride;
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


  SimpleGeometry.prototype.applyTransform = function (transformFn) {
    if (this.flatCoordinates) {
      transformFn(this.flatCoordinates, this.flatCoordinates, this.stride);
      this.changed();
    }
  };
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in counter-clockwise radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */


  SimpleGeometry.prototype.rotate = function (angle, anchor) {
    var flatCoordinates = this.getFlatCoordinates();

    if (flatCoordinates) {
      var stride = this.getStride();
      (0,_flat_transform_js__WEBPACK_IMPORTED_MODULE_3__/* .rotate */ .U1)(flatCoordinates, 0, flatCoordinates.length, stride, angle, anchor, flatCoordinates);
      this.changed();
    }
  };
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [opt_sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [opt_anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */


  SimpleGeometry.prototype.scale = function (sx, opt_sy, opt_anchor) {
    var sy = opt_sy;

    if (sy === undefined) {
      sy = sx;
    }

    var anchor = opt_anchor;

    if (!anchor) {
      anchor = (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__/* .getCenter */ .qg)(this.getExtent());
    }

    var flatCoordinates = this.getFlatCoordinates();

    if (flatCoordinates) {
      var stride = this.getStride();
      (0,_flat_transform_js__WEBPACK_IMPORTED_MODULE_3__/* .scale */ .bA)(flatCoordinates, 0, flatCoordinates.length, stride, sx, sy, anchor, flatCoordinates);
      this.changed();
    }
  };
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */


  SimpleGeometry.prototype.translate = function (deltaX, deltaY) {
    var flatCoordinates = this.getFlatCoordinates();

    if (flatCoordinates) {
      var stride = this.getStride();
      (0,_flat_transform_js__WEBPACK_IMPORTED_MODULE_3__/* .translate */ .Iu)(flatCoordinates, 0, flatCoordinates.length, stride, deltaX, deltaY, flatCoordinates);
      this.changed();
    }
  };

  return SimpleGeometry;
}(_Geometry_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z);
/**
 * @param {number} stride Stride.
 * @return {import("./GeometryLayout.js").default} layout Layout.
 */


function getLayoutForStride(stride) {
  var layout;

  if (stride == 2) {
    layout = _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].XY */ .Z.XY;
  } else if (stride == 3) {
    layout = _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].XYZ */ .Z.XYZ;
  } else if (stride == 4) {
    layout = _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].XYZM */ .Z.XYZM;
  }

  return (
    /** @type {import("./GeometryLayout.js").default} */
    layout
  );
}
/**
 * @param {import("./GeometryLayout.js").default} layout Layout.
 * @return {number} Stride.
 */


function getStrideForLayout(layout) {
  var stride;

  if (layout == _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].XY */ .Z.XY) {
    stride = 2;
  } else if (layout == _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].XYZ */ .Z.XYZ || layout == _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].XYM */ .Z.XYM) {
    stride = 3;
  } else if (layout == _GeometryLayout_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].XYZM */ .Z.XYZM) {
    stride = 4;
  }

  return (
    /** @type {number} */
    stride
  );
}
/**
 * @param {SimpleGeometry} simpleGeometry Simple geometry.
 * @param {import("../transform.js").Transform} transform Transform.
 * @param {Array<number>} [opt_dest] Destination.
 * @return {Array<number>} Transformed flat coordinates.
 */

function transformGeom2D(simpleGeometry, transform, opt_dest) {
  var flatCoordinates = simpleGeometry.getFlatCoordinates();

  if (!flatCoordinates) {
    return null;
  } else {
    var stride = simpleGeometry.getStride();
    return (0,_flat_transform_js__WEBPACK_IMPORTED_MODULE_3__/* .transform2D */ .vT)(flatCoordinates, 0, flatCoordinates.length, stride, transform, opt_dest);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SimpleGeometry);

/***/ }),

/***/ 285:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Eu": () => (/* binding */ linearRingss),
/* harmony export */   "KP": () => (/* binding */ linearRings),
/* harmony export */   "QQ": () => (/* binding */ linearRing)
/* harmony export */ });
/**
 * @module ol/geom/flat/area
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {number} Area.
 */
function linearRing(flatCoordinates, offset, end, stride) {
  var twiceArea = 0;
  var x1 = flatCoordinates[end - stride];
  var y1 = flatCoordinates[end - stride + 1];

  for (; offset < end; offset += stride) {
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];
    twiceArea += y1 * x2 - x1 * y2;
    x1 = x2;
    y1 = y2;
  }

  return twiceArea / 2;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @return {number} Area.
 */

function linearRings(flatCoordinates, offset, ends, stride) {
  var area = 0;

  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    area += linearRing(flatCoordinates, offset, end, stride);
    offset = end;
  }

  return area;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @return {number} Area.
 */

function linearRingss(flatCoordinates, offset, endss, stride) {
  var area = 0;

  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    area += linearRings(flatCoordinates, offset, ends, stride);
    offset = ends[ends.length - 1];
  }

  return area;
}

/***/ }),

/***/ 1414:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ linearRingss)
/* harmony export */ });
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1046);
/**
 * @module ol/geom/flat/center
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @return {Array<number>} Flat centers.
 */

function linearRingss(flatCoordinates, offset, endss, stride) {
  var flatCenters = [];
  var extent = (0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .createEmpty */ .lJ)();

  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    extent = (0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .createOrUpdateFromFlatCoordinates */ .GN)(flatCoordinates, offset, ends[0], stride);
    flatCenters.push((extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2);
    offset = ends[ends.length - 1];
  }

  return flatCenters;
}

/***/ }),

/***/ 1354:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Af": () => (/* binding */ arrayMaxSquaredDelta),
/* harmony export */   "Bv": () => (/* binding */ maxSquaredDelta),
/* harmony export */   "H$": () => (/* binding */ assignClosestPoint),
/* harmony export */   "Xl": () => (/* binding */ assignClosestArrayPoint),
/* harmony export */   "gI": () => (/* binding */ assignClosestMultiArrayPoint),
/* harmony export */   "sD": () => (/* binding */ multiArrayMaxSquaredDelta)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4495);
/**
 * @module ol/geom/flat/closest
 */

/**
 * Returns the point on the 2D line segment flatCoordinates[offset1] to
 * flatCoordinates[offset2] that is closest to the point (x, y).  Extra
 * dimensions are linearly interpolated.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset1 Offset 1.
 * @param {number} offset2 Offset 2.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 */

function assignClosest(flatCoordinates, offset1, offset2, stride, x, y, closestPoint) {
  var x1 = flatCoordinates[offset1];
  var y1 = flatCoordinates[offset1 + 1];
  var dx = flatCoordinates[offset2] - x1;
  var dy = flatCoordinates[offset2 + 1] - y1;
  var offset;

  if (dx === 0 && dy === 0) {
    offset = offset1;
  } else {
    var t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);

    if (t > 1) {
      offset = offset2;
    } else if (t > 0) {
      for (var i = 0; i < stride; ++i) {
        closestPoint[i] = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .lerp */ .t7)(flatCoordinates[offset1 + i], flatCoordinates[offset2 + i], t);
      }

      closestPoint.length = stride;
      return;
    } else {
      offset = offset1;
    }
  }

  for (var i = 0; i < stride; ++i) {
    closestPoint[i] = flatCoordinates[offset + i];
  }

  closestPoint.length = stride;
}
/**
 * Return the squared of the largest distance between any pair of consecutive
 * coordinates.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} max Max squared delta.
 * @return {number} Max squared delta.
 */


function maxSquaredDelta(flatCoordinates, offset, end, stride, max) {
  var x1 = flatCoordinates[offset];
  var y1 = flatCoordinates[offset + 1];

  for (offset += stride; offset < end; offset += stride) {
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];
    var squaredDelta = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .squaredDistance */ .bI)(x1, y1, x2, y2);

    if (squaredDelta > max) {
      max = squaredDelta;
    }

    x1 = x2;
    y1 = y2;
  }

  return max;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} max Max squared delta.
 * @return {number} Max squared delta.
 */

function arrayMaxSquaredDelta(flatCoordinates, offset, ends, stride, max) {
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    max = maxSquaredDelta(flatCoordinates, offset, end, stride, max);
    offset = end;
  }

  return max;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} max Max squared delta.
 * @return {number} Max squared delta.
 */

function multiArrayMaxSquaredDelta(flatCoordinates, offset, endss, stride, max) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    max = arrayMaxSquaredDelta(flatCoordinates, offset, ends, stride, max);
    offset = ends[ends.length - 1];
  }

  return max;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} maxDelta Max delta.
 * @param {boolean} isRing Is ring.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 * @param {number} minSquaredDistance Minimum squared distance.
 * @param {Array<number>} [opt_tmpPoint] Temporary point object.
 * @return {number} Minimum squared distance.
 */

function assignClosestPoint(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
  if (offset == end) {
    return minSquaredDistance;
  }

  var i, squaredDistance;

  if (maxDelta === 0) {
    // All points are identical, so just test the first point.
    squaredDistance = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .squaredDistance */ .bI)(x, y, flatCoordinates[offset], flatCoordinates[offset + 1]);

    if (squaredDistance < minSquaredDistance) {
      for (i = 0; i < stride; ++i) {
        closestPoint[i] = flatCoordinates[offset + i];
      }

      closestPoint.length = stride;
      return squaredDistance;
    } else {
      return minSquaredDistance;
    }
  }

  var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];
  var index = offset + stride;

  while (index < end) {
    assignClosest(flatCoordinates, index - stride, index, stride, x, y, tmpPoint);
    squaredDistance = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .squaredDistance */ .bI)(x, y, tmpPoint[0], tmpPoint[1]);

    if (squaredDistance < minSquaredDistance) {
      minSquaredDistance = squaredDistance;

      for (i = 0; i < stride; ++i) {
        closestPoint[i] = tmpPoint[i];
      }

      closestPoint.length = stride;
      index += stride;
    } else {
      // Skip ahead multiple points, because we know that all the skipped
      // points cannot be any closer than the closest point we have found so
      // far.  We know this because we know how close the current point is, how
      // close the closest point we have found so far is, and the maximum
      // distance between consecutive points.  For example, if we're currently
      // at distance 10, the best we've found so far is 3, and that the maximum
      // distance between consecutive points is 2, then we'll need to skip at
      // least (10 - 3) / 2 == 3 (rounded down) points to have any chance of
      // finding a closer point.  We use Math.max(..., 1) to ensure that we
      // always advance at least one point, to avoid an infinite loop.
      index += stride * Math.max((Math.sqrt(squaredDistance) - Math.sqrt(minSquaredDistance)) / maxDelta | 0, 1);
    }
  }

  if (isRing) {
    // Check the closing segment.
    assignClosest(flatCoordinates, end - stride, offset, stride, x, y, tmpPoint);
    squaredDistance = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .squaredDistance */ .bI)(x, y, tmpPoint[0], tmpPoint[1]);

    if (squaredDistance < minSquaredDistance) {
      minSquaredDistance = squaredDistance;

      for (i = 0; i < stride; ++i) {
        closestPoint[i] = tmpPoint[i];
      }

      closestPoint.length = stride;
    }
  }

  return minSquaredDistance;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} maxDelta Max delta.
 * @param {boolean} isRing Is ring.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 * @param {number} minSquaredDistance Minimum squared distance.
 * @param {Array<number>} [opt_tmpPoint] Temporary point object.
 * @return {number} Minimum squared distance.
 */

function assignClosestArrayPoint(flatCoordinates, offset, ends, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
  var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];

  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    minSquaredDistance = assignClosestPoint(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint);
    offset = end;
  }

  return minSquaredDistance;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} maxDelta Max delta.
 * @param {boolean} isRing Is ring.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 * @param {number} minSquaredDistance Minimum squared distance.
 * @param {Array<number>} [opt_tmpPoint] Temporary point object.
 * @return {number} Minimum squared distance.
 */

function assignClosestMultiArrayPoint(flatCoordinates, offset, endss, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
  var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];

  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    minSquaredDistance = assignClosestArrayPoint(flatCoordinates, offset, ends, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint);
    offset = ends[ends.length - 1];
  }

  return minSquaredDistance;
}

/***/ }),

/***/ 1063:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TG": () => (/* binding */ linearRingContainsXY),
/* harmony export */   "Zl": () => (/* binding */ linearRingssContainsXY),
/* harmony export */   "uG": () => (/* binding */ linearRingContainsExtent),
/* harmony export */   "wY": () => (/* binding */ linearRingsContainsXY)
/* harmony export */ });
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1046);
/**
 * @module ol/geom/flat/contains
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} Contains extent.
 */

function linearRingContainsExtent(flatCoordinates, offset, end, stride, extent) {
  var outside = (0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .forEachCorner */ .H6)(extent,
  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {boolean} Contains (x, y).
   */
  function (coordinate) {
    return !linearRingContainsXY(flatCoordinates, offset, end, stride, coordinate[0], coordinate[1]);
  });
  return !outside;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */

function linearRingContainsXY(flatCoordinates, offset, end, stride, x, y) {
  // https://geomalgorithms.com/a03-_inclusion.html
  // Copyright 2000 softSurfer, 2012 Dan Sunday
  // This code may be freely used and modified for any purpose
  // providing that this copyright notice is included with it.
  // SoftSurfer makes no warranty for this code, and cannot be held
  // liable for any real or imagined damage resulting from its use.
  // Users of this code must verify correctness for their application.
  var wn = 0;
  var x1 = flatCoordinates[end - stride];
  var y1 = flatCoordinates[end - stride + 1];

  for (; offset < end; offset += stride) {
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];

    if (y1 <= y) {
      if (y2 > y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) > 0) {
        wn++;
      }
    } else if (y2 <= y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) < 0) {
      wn--;
    }

    x1 = x2;
    y1 = y2;
  }

  return wn !== 0;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */

function linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y) {
  if (ends.length === 0) {
    return false;
  }

  if (!linearRingContainsXY(flatCoordinates, offset, ends[0], stride, x, y)) {
    return false;
  }

  for (var i = 1, ii = ends.length; i < ii; ++i) {
    if (linearRingContainsXY(flatCoordinates, ends[i - 1], ends[i], stride, x, y)) {
      return false;
    }
  }

  return true;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */

function linearRingssContainsXY(flatCoordinates, offset, endss, stride, x, y) {
  if (endss.length === 0) {
    return false;
  }

  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];

    if (linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y)) {
      return true;
    }

    offset = ends[ends.length - 1];
  }

  return false;
}

/***/ }),

/***/ 6468:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IG": () => (/* binding */ deflateCoordinate),
/* harmony export */   "QT": () => (/* binding */ deflateMultiCoordinatesArray),
/* harmony export */   "Sg": () => (/* binding */ deflateCoordinates),
/* harmony export */   "_5": () => (/* binding */ deflateCoordinatesArray)
/* harmony export */ });
/**
 * @module ol/geom/flat/deflate
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
 * @param {number} stride Stride.
 * @return {number} offset Offset.
 */
function deflateCoordinate(flatCoordinates, offset, coordinate, stride) {
  for (var i = 0, ii = coordinate.length; i < ii; ++i) {
    flatCoordinates[offset++] = coordinate[i];
  }

  return offset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<import("../../coordinate.js").Coordinate>} coordinates Coordinates.
 * @param {number} stride Stride.
 * @return {number} offset Offset.
 */

function deflateCoordinates(flatCoordinates, offset, coordinates, stride) {
  for (var i = 0, ii = coordinates.length; i < ii; ++i) {
    var coordinate = coordinates[i];

    for (var j = 0; j < stride; ++j) {
      flatCoordinates[offset++] = coordinate[j];
    }
  }

  return offset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<import("../../coordinate.js").Coordinate>>} coordinatess Coordinatess.
 * @param {number} stride Stride.
 * @param {Array<number>} [opt_ends] Ends.
 * @return {Array<number>} Ends.
 */

function deflateCoordinatesArray(flatCoordinates, offset, coordinatess, stride, opt_ends) {
  var ends = opt_ends ? opt_ends : [];
  var i = 0;

  for (var j = 0, jj = coordinatess.length; j < jj; ++j) {
    var end = deflateCoordinates(flatCoordinates, offset, coordinatess[j], stride);
    ends[i++] = end;
    offset = end;
  }

  ends.length = i;
  return ends;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<Array<import("../../coordinate.js").Coordinate>>>} coordinatesss Coordinatesss.
 * @param {number} stride Stride.
 * @param {Array<Array<number>>} [opt_endss] Endss.
 * @return {Array<Array<number>>} Endss.
 */

function deflateMultiCoordinatesArray(flatCoordinates, offset, coordinatesss, stride, opt_endss) {
  var endss = opt_endss ? opt_endss : [];
  var i = 0;

  for (var j = 0, jj = coordinatesss.length; j < jj; ++j) {
    var ends = deflateCoordinatesArray(flatCoordinates, offset, coordinatesss[j], stride, endss[i]);
    endss[i++] = ends;
    offset = ends[ends.length - 1];
  }

  endss.length = i;
  return endss;
}

/***/ }),

/***/ 6301:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ml": () => (/* binding */ inflateCoordinates),
/* harmony export */   "o1": () => (/* binding */ inflateCoordinatesArray),
/* harmony export */   "ug": () => (/* binding */ inflateMultiCoordinatesArray)
/* harmony export */ });
/**
 * @module ol/geom/flat/inflate
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {Array<import("../../coordinate.js").Coordinate>} [opt_coordinates] Coordinates.
 * @return {Array<import("../../coordinate.js").Coordinate>} Coordinates.
 */
function inflateCoordinates(flatCoordinates, offset, end, stride, opt_coordinates) {
  var coordinates = opt_coordinates !== undefined ? opt_coordinates : [];
  var i = 0;

  for (var j = offset; j < end; j += stride) {
    coordinates[i++] = flatCoordinates.slice(j, j + stride);
  }

  coordinates.length = i;
  return coordinates;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {Array<Array<import("../../coordinate.js").Coordinate>>} [opt_coordinatess] Coordinatess.
 * @return {Array<Array<import("../../coordinate.js").Coordinate>>} Coordinatess.
 */

function inflateCoordinatesArray(flatCoordinates, offset, ends, stride, opt_coordinatess) {
  var coordinatess = opt_coordinatess !== undefined ? opt_coordinatess : [];
  var i = 0;

  for (var j = 0, jj = ends.length; j < jj; ++j) {
    var end = ends[j];
    coordinatess[i++] = inflateCoordinates(flatCoordinates, offset, end, stride, coordinatess[i]);
    offset = end;
  }

  coordinatess.length = i;
  return coordinatess;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {Array<Array<Array<import("../../coordinate.js").Coordinate>>>} [opt_coordinatesss]
 *     Coordinatesss.
 * @return {Array<Array<Array<import("../../coordinate.js").Coordinate>>>} Coordinatesss.
 */

function inflateMultiCoordinatesArray(flatCoordinates, offset, endss, stride, opt_coordinatesss) {
  var coordinatesss = opt_coordinatesss !== undefined ? opt_coordinatesss : [];
  var i = 0;

  for (var j = 0, jj = endss.length; j < jj; ++j) {
    var ends = endss[j];
    coordinatesss[i++] = inflateCoordinatesArray(flatCoordinates, offset, ends, stride, coordinatesss[i]);
    offset = ends[ends.length - 1];
  }

  coordinatesss.length = i;
  return coordinatesss;
}

/***/ }),

/***/ 2130:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "U": () => (/* binding */ getInteriorPointsOfMultiArray),
/* harmony export */   "X": () => (/* binding */ getInteriorPointOfArray)
/* harmony export */ });
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1063);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3620);
/**
 * @module ol/geom/flat/interiorpoint
 */


/**
 * Calculates a point that is likely to lie in the interior of the linear rings.
 * Inspired by JTS's com.vividsolutions.jts.geom.Geometry#getInteriorPoint.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {Array<number>} flatCenters Flat centers.
 * @param {number} flatCentersOffset Flat center offset.
 * @param {Array<number>} [opt_dest] Destination.
 * @return {Array<number>} Destination point as XYM coordinate, where M is the
 * length of the horizontal intersection that the point belongs to.
 */

function getInteriorPointOfArray(flatCoordinates, offset, ends, stride, flatCenters, flatCentersOffset, opt_dest) {
  var i, ii, x, x1, x2, y1, y2;
  var y = flatCenters[flatCentersOffset + 1];
  /** @type {Array<number>} */

  var intersections = []; // Calculate intersections with the horizontal line

  for (var r = 0, rr = ends.length; r < rr; ++r) {
    var end = ends[r];
    x1 = flatCoordinates[end - stride];
    y1 = flatCoordinates[end - stride + 1];

    for (i = offset; i < end; i += stride) {
      x2 = flatCoordinates[i];
      y2 = flatCoordinates[i + 1];

      if (y <= y1 && y2 <= y || y1 <= y && y <= y2) {
        x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
        intersections.push(x);
      }

      x1 = x2;
      y1 = y2;
    }
  } // Find the longest segment of the horizontal line that has its center point
  // inside the linear ring.


  var pointX = NaN;
  var maxSegmentLength = -Infinity;
  intersections.sort(_array_js__WEBPACK_IMPORTED_MODULE_0__/* .numberSafeCompareFunction */ .kK);
  x1 = intersections[0];

  for (i = 1, ii = intersections.length; i < ii; ++i) {
    x2 = intersections[i];
    var segmentLength = Math.abs(x2 - x1);

    if (segmentLength > maxSegmentLength) {
      x = (x1 + x2) / 2;

      if ((0,_contains_js__WEBPACK_IMPORTED_MODULE_1__/* .linearRingsContainsXY */ .wY)(flatCoordinates, offset, ends, stride, x, y)) {
        pointX = x;
        maxSegmentLength = segmentLength;
      }
    }

    x1 = x2;
  }

  if (isNaN(pointX)) {
    // There is no horizontal line that has its center point inside the linear
    // ring.  Use the center of the the linear ring's extent.
    pointX = flatCenters[flatCentersOffset];
  }

  if (opt_dest) {
    opt_dest.push(pointX, y, maxSegmentLength);
    return opt_dest;
  } else {
    return [pointX, y, maxSegmentLength];
  }
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {Array<number>} flatCenters Flat centers.
 * @return {Array<number>} Interior points as XYM coordinates, where M is the
 * length of the horizontal intersection that the point belongs to.
 */

function getInteriorPointsOfMultiArray(flatCoordinates, offset, endss, stride, flatCenters) {
  var interiorPoints = [];

  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    interiorPoints = getInteriorPointOfArray(flatCoordinates, offset, ends, stride, flatCenters, 2 * i, interiorPoints);
    offset = ends[ends.length - 1];
  }

  return interiorPoints;
}

/***/ }),

/***/ 3137:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WW": () => (/* binding */ interpolatePoint),
/* harmony export */   "dG": () => (/* binding */ lineStringsCoordinateAtM),
/* harmony export */   "iJ": () => (/* binding */ lineStringCoordinateAtM)
/* harmony export */ });
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3620);
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4495);
/**
 * @module ol/geom/flat/interpolate
 */


/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} fraction Fraction.
 * @param {Array<number>} [opt_dest] Destination.
 * @param {number} [opt_dimension] Destination dimension (default is `2`)
 * @return {Array<number>} Destination.
 */

function interpolatePoint(flatCoordinates, offset, end, stride, fraction, opt_dest, opt_dimension) {
  var o, t;
  var n = (end - offset) / stride;

  if (n === 1) {
    o = offset;
  } else if (n === 2) {
    o = offset;
    t = fraction;
  } else if (n !== 0) {
    var x1 = flatCoordinates[offset];
    var y1 = flatCoordinates[offset + 1];
    var length_1 = 0;
    var cumulativeLengths = [0];

    for (var i = offset + stride; i < end; i += stride) {
      var x2 = flatCoordinates[i];
      var y2 = flatCoordinates[i + 1];
      length_1 += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      cumulativeLengths.push(length_1);
      x1 = x2;
      y1 = y2;
    }

    var target = fraction * length_1;
    var index = (0,_array_js__WEBPACK_IMPORTED_MODULE_0__/* .binarySearch */ .ry)(cumulativeLengths, target);

    if (index < 0) {
      t = (target - cumulativeLengths[-index - 2]) / (cumulativeLengths[-index - 1] - cumulativeLengths[-index - 2]);
      o = offset + (-index - 2) * stride;
    } else {
      o = offset + index * stride;
    }
  }

  var dimension = opt_dimension > 1 ? opt_dimension : 2;
  var dest = opt_dest ? opt_dest : new Array(dimension);

  for (var i = 0; i < dimension; ++i) {
    dest[i] = o === undefined ? NaN : t === undefined ? flatCoordinates[o + i] : (0,_math_js__WEBPACK_IMPORTED_MODULE_1__/* .lerp */ .t7)(flatCoordinates[o + i], flatCoordinates[o + stride + i], t);
  }

  return dest;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} m M.
 * @param {boolean} extrapolate Extrapolate.
 * @return {import("../../coordinate.js").Coordinate} Coordinate.
 */

function lineStringCoordinateAtM(flatCoordinates, offset, end, stride, m, extrapolate) {
  if (end == offset) {
    return null;
  }

  var coordinate;

  if (m < flatCoordinates[offset + stride - 1]) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(offset, offset + stride);
      coordinate[stride - 1] = m;
      return coordinate;
    } else {
      return null;
    }
  } else if (flatCoordinates[end - 1] < m) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(end - stride, end);
      coordinate[stride - 1] = m;
      return coordinate;
    } else {
      return null;
    }
  } // FIXME use O(1) search


  if (m == flatCoordinates[offset + stride - 1]) {
    return flatCoordinates.slice(offset, offset + stride);
  }

  var lo = offset / stride;
  var hi = end / stride;

  while (lo < hi) {
    var mid = lo + hi >> 1;

    if (m < flatCoordinates[(mid + 1) * stride - 1]) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }

  var m0 = flatCoordinates[lo * stride - 1];

  if (m == m0) {
    return flatCoordinates.slice((lo - 1) * stride, (lo - 1) * stride + stride);
  }

  var m1 = flatCoordinates[(lo + 1) * stride - 1];
  var t = (m - m0) / (m1 - m0);
  coordinate = [];

  for (var i = 0; i < stride - 1; ++i) {
    coordinate.push((0,_math_js__WEBPACK_IMPORTED_MODULE_1__/* .lerp */ .t7)(flatCoordinates[(lo - 1) * stride + i], flatCoordinates[lo * stride + i], t));
  }

  coordinate.push(m);
  return coordinate;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} m M.
 * @param {boolean} extrapolate Extrapolate.
 * @param {boolean} interpolate Interpolate.
 * @return {import("../../coordinate.js").Coordinate} Coordinate.
 */

function lineStringsCoordinateAtM(flatCoordinates, offset, ends, stride, m, extrapolate, interpolate) {
  if (interpolate) {
    return lineStringCoordinateAtM(flatCoordinates, offset, ends[ends.length - 1], stride, m, extrapolate);
  }

  var coordinate;

  if (m < flatCoordinates[stride - 1]) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(0, stride);
      coordinate[stride - 1] = m;
      return coordinate;
    } else {
      return null;
    }
  }

  if (flatCoordinates[flatCoordinates.length - 1] < m) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(flatCoordinates.length - stride);
      coordinate[stride - 1] = m;
      return coordinate;
    } else {
      return null;
    }
  }

  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];

    if (offset == end) {
      continue;
    }

    if (m < flatCoordinates[offset + stride - 1]) {
      return null;
    } else if (m <= flatCoordinates[end - 1]) {
      return lineStringCoordinateAtM(flatCoordinates, offset, end, stride, m, false);
    }

    offset = end;
  }

  return null;
}

/***/ }),

/***/ 7701:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AW": () => (/* binding */ intersectsLineStringArray),
/* harmony export */   "Kz": () => (/* binding */ intersectsLineString),
/* harmony export */   "ac": () => (/* binding */ intersectsLinearRingArray),
/* harmony export */   "oW": () => (/* binding */ intersectsLinearRingMultiArray)
/* harmony export */ });
/* unused harmony export intersectsLinearRing */
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1046);
/* harmony import */ var _segments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9617);
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1063);
/**
 * @module ol/geom/flat/intersectsextent
 */



/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */

function intersectsLineString(flatCoordinates, offset, end, stride, extent) {
  var coordinatesExtent = (0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .extendFlatCoordinates */ .qP)((0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .createEmpty */ .lJ)(), flatCoordinates, offset, end, stride);

  if (!(0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .intersects */ .kK)(extent, coordinatesExtent)) {
    return false;
  }

  if ((0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .containsExtent */ .r4)(extent, coordinatesExtent)) {
    return true;
  }

  if (coordinatesExtent[0] >= extent[0] && coordinatesExtent[2] <= extent[2]) {
    return true;
  }

  if (coordinatesExtent[1] >= extent[1] && coordinatesExtent[3] <= extent[3]) {
    return true;
  }

  return (0,_segments_js__WEBPACK_IMPORTED_MODULE_1__/* .forEach */ .E)(flatCoordinates, offset, end, stride,
  /**
   * @param {import("../../coordinate.js").Coordinate} point1 Start point.
   * @param {import("../../coordinate.js").Coordinate} point2 End point.
   * @return {boolean} `true` if the segment and the extent intersect,
   *     `false` otherwise.
   */
  function (point1, point2) {
    return (0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .intersectsSegment */ .I7)(extent, point1, point2);
  });
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */

function intersectsLineStringArray(flatCoordinates, offset, ends, stride, extent) {
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    if (intersectsLineString(flatCoordinates, offset, ends[i], stride, extent)) {
      return true;
    }

    offset = ends[i];
  }

  return false;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */

function intersectsLinearRing(flatCoordinates, offset, end, stride, extent) {
  if (intersectsLineString(flatCoordinates, offset, end, stride, extent)) {
    return true;
  }

  if ((0,_contains_js__WEBPACK_IMPORTED_MODULE_2__/* .linearRingContainsXY */ .TG)(flatCoordinates, offset, end, stride, extent[0], extent[1])) {
    return true;
  }

  if ((0,_contains_js__WEBPACK_IMPORTED_MODULE_2__/* .linearRingContainsXY */ .TG)(flatCoordinates, offset, end, stride, extent[0], extent[3])) {
    return true;
  }

  if ((0,_contains_js__WEBPACK_IMPORTED_MODULE_2__/* .linearRingContainsXY */ .TG)(flatCoordinates, offset, end, stride, extent[2], extent[1])) {
    return true;
  }

  if ((0,_contains_js__WEBPACK_IMPORTED_MODULE_2__/* .linearRingContainsXY */ .TG)(flatCoordinates, offset, end, stride, extent[2], extent[3])) {
    return true;
  }

  return false;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */

function intersectsLinearRingArray(flatCoordinates, offset, ends, stride, extent) {
  if (!intersectsLinearRing(flatCoordinates, offset, ends[0], stride, extent)) {
    return false;
  }

  if (ends.length === 1) {
    return true;
  }

  for (var i = 1, ii = ends.length; i < ii; ++i) {
    if ((0,_contains_js__WEBPACK_IMPORTED_MODULE_2__/* .linearRingContainsExtent */ .uG)(flatCoordinates, ends[i - 1], ends[i], stride, extent)) {
      if (!intersectsLineString(flatCoordinates, ends[i - 1], ends[i], stride, extent)) {
        return false;
      }
    }
  }

  return true;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */

function intersectsLinearRingMultiArray(flatCoordinates, offset, endss, stride, extent) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];

    if (intersectsLinearRingArray(flatCoordinates, offset, ends, stride, extent)) {
      return true;
    }

    offset = ends[ends.length - 1];
  }

  return false;
}

/***/ }),

/***/ 9736:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "W": () => (/* binding */ lineStringLength)
/* harmony export */ });
/* unused harmony export linearRingLength */
/**
 * @module ol/geom/flat/length
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {number} Length.
 */
function lineStringLength(flatCoordinates, offset, end, stride) {
  var x1 = flatCoordinates[offset];
  var y1 = flatCoordinates[offset + 1];
  var length = 0;

  for (var i = offset + stride; i < end; i += stride) {
    var x2 = flatCoordinates[i];
    var y2 = flatCoordinates[i + 1];
    length += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    x1 = x2;
    y1 = y2;
  }

  return length;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {number} Perimeter.
 */

function linearRingLength(flatCoordinates, offset, end, stride) {
  var perimeter = lineStringLength(flatCoordinates, offset, end, stride);
  var dx = flatCoordinates[end - stride] - flatCoordinates[offset];
  var dy = flatCoordinates[end - stride + 1] - flatCoordinates[offset + 1];
  perimeter += Math.sqrt(dx * dx + dy * dy);
  return perimeter;
}

/***/ }),

/***/ 3738:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "bt": () => (/* binding */ linearRingIsClockwise),
  "$v": () => (/* binding */ linearRingsAreOriented),
  "Oj": () => (/* binding */ linearRingssAreOriented),
  "zX": () => (/* binding */ orientLinearRings),
  "dL": () => (/* binding */ orientLinearRingsArray)
});

;// CONCATENATED MODULE: ./node_modules/ol/geom/flat/reverse.js
/**
 * @module ol/geom/flat/reverse
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 */
function coordinates(flatCoordinates, offset, end, stride) {
  while (offset < end - stride) {
    for (var i = 0; i < stride; ++i) {
      var tmp = flatCoordinates[offset + i];
      flatCoordinates[offset + i] = flatCoordinates[end - stride + i];
      flatCoordinates[end - stride + i] = tmp;
    }

    offset += stride;
    end -= stride;
  }
}
;// CONCATENATED MODULE: ./node_modules/ol/geom/flat/orient.js
/**
 * @module ol/geom/flat/orient
 */

/**
 * Is the linear ring oriented clockwise in a coordinate system with a bottom-left
 * coordinate origin? For a coordinate system with a top-left coordinate origin,
 * the ring's orientation is clockwise when this function returns false.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {boolean} Is clockwise.
 */

function linearRingIsClockwise(flatCoordinates, offset, end, stride) {
  // https://stackoverflow.com/q/1165647/clockwise-method#1165943
  // https://github.com/OSGeo/gdal/blob/master/gdal/ogr/ogrlinearring.cpp
  var edge = 0;
  var x1 = flatCoordinates[end - stride];
  var y1 = flatCoordinates[end - stride + 1];

  for (; offset < end; offset += stride) {
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];
    edge += (x2 - x1) * (y2 + y1);
    x1 = x2;
    y1 = y2;
  }

  return edge === 0 ? undefined : edge > 0;
}
/**
 * Determines if linear rings are oriented.  By default, left-hand orientation
 * is tested (first ring must be clockwise, remaining rings counter-clockwise).
 * To test for right-hand orientation, use the `opt_right` argument.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Array of end indexes.
 * @param {number} stride Stride.
 * @param {boolean} [opt_right] Test for right-hand orientation
 *     (counter-clockwise exterior ring and clockwise interior rings).
 * @return {boolean} Rings are correctly oriented.
 */

function linearRingsAreOriented(flatCoordinates, offset, ends, stride, opt_right) {
  var right = opt_right !== undefined ? opt_right : false;

  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    var isClockwise = linearRingIsClockwise(flatCoordinates, offset, end, stride);

    if (i === 0) {
      if (right && isClockwise || !right && !isClockwise) {
        return false;
      }
    } else {
      if (right && !isClockwise || !right && isClockwise) {
        return false;
      }
    }

    offset = end;
  }

  return true;
}
/**
 * Determines if linear rings are oriented.  By default, left-hand orientation
 * is tested (first ring must be clockwise, remaining rings counter-clockwise).
 * To test for right-hand orientation, use the `opt_right` argument.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Array of array of end indexes.
 * @param {number} stride Stride.
 * @param {boolean} [opt_right] Test for right-hand orientation
 *     (counter-clockwise exterior ring and clockwise interior rings).
 * @return {boolean} Rings are correctly oriented.
 */

function linearRingssAreOriented(flatCoordinates, offset, endss, stride, opt_right) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];

    if (!linearRingsAreOriented(flatCoordinates, offset, ends, stride, opt_right)) {
      return false;
    }

    if (ends.length) {
      offset = ends[ends.length - 1];
    }
  }

  return true;
}
/**
 * Orient coordinates in a flat array of linear rings.  By default, rings
 * are oriented following the left-hand rule (clockwise for exterior and
 * counter-clockwise for interior rings).  To orient according to the
 * right-hand rule, use the `opt_right` argument.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {boolean} [opt_right] Follow the right-hand rule for orientation.
 * @return {number} End.
 */

function orientLinearRings(flatCoordinates, offset, ends, stride, opt_right) {
  var right = opt_right !== undefined ? opt_right : false;

  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    var isClockwise = linearRingIsClockwise(flatCoordinates, offset, end, stride);
    var reverse = i === 0 ? right && isClockwise || !right && !isClockwise : right && !isClockwise || !right && isClockwise;

    if (reverse) {
      coordinates(flatCoordinates, offset, end, stride);
    }

    offset = end;
  }

  return offset;
}
/**
 * Orient coordinates in a flat array of linear rings.  By default, rings
 * are oriented following the left-hand rule (clockwise for exterior and
 * counter-clockwise for interior rings).  To orient according to the
 * right-hand rule, use the `opt_right` argument.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Array of array of end indexes.
 * @param {number} stride Stride.
 * @param {boolean} [opt_right] Follow the right-hand rule for orientation.
 * @return {number} End.
 */

function orientLinearRingsArray(flatCoordinates, offset, endss, stride, opt_right) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    offset = orientLinearRings(flatCoordinates, offset, endss[i], stride, opt_right);
  }

  return offset;
}

/***/ }),

/***/ 9617:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ forEach)
/* harmony export */ });
/**
 * @module ol/geom/flat/segments
 */

/**
 * This function calls `callback` for each segment of the flat coordinates
 * array. If the callback returns a truthy value the function returns that
 * value immediately. Otherwise the function returns `false`.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {function(import("../../coordinate.js").Coordinate, import("../../coordinate.js").Coordinate): T} callback Function
 *     called for each segment.
 * @return {T|boolean} Value.
 * @template T
 */
function forEach(flatCoordinates, offset, end, stride, callback) {
  var ret;
  offset += stride;

  for (; offset < end; offset += stride) {
    ret = callback(flatCoordinates.slice(offset - stride, offset), flatCoordinates.slice(offset, offset + stride));

    if (ret) {
      return ret;
    }
  }

  return false;
}

/***/ }),

/***/ 1999:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Pp": () => (/* binding */ quantizeMultiArray),
/* harmony export */   "UJ": () => (/* binding */ douglasPeuckerArray),
/* harmony export */   "Zh": () => (/* binding */ quantizeArray),
/* harmony export */   "dt": () => (/* binding */ douglasPeucker),
/* harmony export */   "uZ": () => (/* binding */ snap)
/* harmony export */ });
/* unused harmony exports simplifyLineString, douglasPeuckerMultiArray, radialDistance, quantize */
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4495);
/**
 * @module ol/geom/flat/simplify
 */
// Based on simplify-js https://github.com/mourner/simplify-js
// Copyright (c) 2012, Vladimir Agafonkin
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//    1. Redistributions of source code must retain the above copyright notice,
//       this list of conditions and the following disclaimer.
//
//    2. Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {boolean} highQuality Highest quality.
 * @param {Array<number>} [opt_simplifiedFlatCoordinates] Simplified flat
 *     coordinates.
 * @return {Array<number>} Simplified line string.
 */

function simplifyLineString(flatCoordinates, offset, end, stride, squaredTolerance, highQuality, opt_simplifiedFlatCoordinates) {
  var simplifiedFlatCoordinates = opt_simplifiedFlatCoordinates !== undefined ? opt_simplifiedFlatCoordinates : [];

  if (!highQuality) {
    end = radialDistance(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, 0);
    flatCoordinates = simplifiedFlatCoordinates;
    offset = 0;
    stride = 2;
  }

  simplifiedFlatCoordinates.length = douglasPeucker(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, 0);
  return simplifiedFlatCoordinates;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @return {number} Simplified offset.
 */

function douglasPeucker(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset) {
  var n = (end - offset) / stride;

  if (n < 3) {
    for (; offset < end; offset += stride) {
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset];
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + 1];
    }

    return simplifiedOffset;
  }
  /** @type {Array<number>} */


  var markers = new Array(n);
  markers[0] = 1;
  markers[n - 1] = 1;
  /** @type {Array<number>} */

  var stack = [offset, end - stride];
  var index = 0;

  while (stack.length > 0) {
    var last = stack.pop();
    var first = stack.pop();
    var maxSquaredDistance = 0;
    var x1 = flatCoordinates[first];
    var y1 = flatCoordinates[first + 1];
    var x2 = flatCoordinates[last];
    var y2 = flatCoordinates[last + 1];

    for (var i = first + stride; i < last; i += stride) {
      var x = flatCoordinates[i];
      var y = flatCoordinates[i + 1];
      var squaredDistance_1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .squaredSegmentDistance */ .rU)(x, y, x1, y1, x2, y2);

      if (squaredDistance_1 > maxSquaredDistance) {
        index = i;
        maxSquaredDistance = squaredDistance_1;
      }
    }

    if (maxSquaredDistance > squaredTolerance) {
      markers[(index - offset) / stride] = 1;

      if (first + stride < index) {
        stack.push(first, index);
      }

      if (index + stride < last) {
        stack.push(index, last);
      }
    }
  }

  for (var i = 0; i < n; ++i) {
    if (markers[i]) {
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + i * stride];
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + i * stride + 1];
    }
  }

  return simplifiedOffset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @param {Array<number>} simplifiedEnds Simplified ends.
 * @return {number} Simplified offset.
 */

function douglasPeuckerArray(flatCoordinates, offset, ends, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds) {
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    simplifiedOffset = douglasPeucker(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset);
    simplifiedEnds.push(simplifiedOffset);
    offset = end;
  }

  return simplifiedOffset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @param {Array<Array<number>>} simplifiedEndss Simplified endss.
 * @return {number} Simplified offset.
 */

function douglasPeuckerMultiArray(flatCoordinates, offset, endss, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEndss) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    var simplifiedEnds = [];
    simplifiedOffset = douglasPeuckerArray(flatCoordinates, offset, ends, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds);
    simplifiedEndss.push(simplifiedEnds);
    offset = ends[ends.length - 1];
  }

  return simplifiedOffset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @return {number} Simplified offset.
 */

function radialDistance(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset) {
  if (end <= offset + stride) {
    // zero or one point, no simplification possible, so copy and return
    for (; offset < end; offset += stride) {
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset];
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + 1];
    }

    return simplifiedOffset;
  }

  var x1 = flatCoordinates[offset];
  var y1 = flatCoordinates[offset + 1]; // copy first point

  simplifiedFlatCoordinates[simplifiedOffset++] = x1;
  simplifiedFlatCoordinates[simplifiedOffset++] = y1;
  var x2 = x1;
  var y2 = y1;

  for (offset += stride; offset < end; offset += stride) {
    x2 = flatCoordinates[offset];
    y2 = flatCoordinates[offset + 1];

    if (squaredDistance(x1, y1, x2, y2) > squaredTolerance) {
      // copy point at offset
      simplifiedFlatCoordinates[simplifiedOffset++] = x2;
      simplifiedFlatCoordinates[simplifiedOffset++] = y2;
      x1 = x2;
      y1 = y2;
    }
  }

  if (x2 != x1 || y2 != y1) {
    // copy last point
    simplifiedFlatCoordinates[simplifiedOffset++] = x2;
    simplifiedFlatCoordinates[simplifiedOffset++] = y2;
  }

  return simplifiedOffset;
}
/**
 * @param {number} value Value.
 * @param {number} tolerance Tolerance.
 * @return {number} Rounded value.
 */

function snap(value, tolerance) {
  return tolerance * Math.round(value / tolerance);
}
/**
 * Simplifies a line string using an algorithm designed by Tim Schaub.
 * Coordinates are snapped to the nearest value in a virtual grid and
 * consecutive duplicate coordinates are discarded.  This effectively preserves
 * topology as the simplification of any subsection of a line string is
 * independent of the rest of the line string.  This means that, for examples,
 * the common edge between two polygons will be simplified to the same line
 * string independently in both polygons.  This implementation uses a single
 * pass over the coordinates and eliminates intermediate collinear points.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} tolerance Tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @return {number} Simplified offset.
 */

function quantize(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset) {
  // do nothing if the line is empty
  if (offset == end) {
    return simplifiedOffset;
  } // snap the first coordinate (P1)


  var x1 = snap(flatCoordinates[offset], tolerance);
  var y1 = snap(flatCoordinates[offset + 1], tolerance);
  offset += stride; // add the first coordinate to the output

  simplifiedFlatCoordinates[simplifiedOffset++] = x1;
  simplifiedFlatCoordinates[simplifiedOffset++] = y1; // find the next coordinate that does not snap to the same value as the first
  // coordinate (P2)

  var x2, y2;

  do {
    x2 = snap(flatCoordinates[offset], tolerance);
    y2 = snap(flatCoordinates[offset + 1], tolerance);
    offset += stride;

    if (offset == end) {
      // all coordinates snap to the same value, the line collapses to a point
      // push the last snapped value anyway to ensure that the output contains
      // at least two points
      // FIXME should we really return at least two points anyway?
      simplifiedFlatCoordinates[simplifiedOffset++] = x2;
      simplifiedFlatCoordinates[simplifiedOffset++] = y2;
      return simplifiedOffset;
    }
  } while (x2 == x1 && y2 == y1);

  while (offset < end) {
    // snap the next coordinate (P3)
    var x3 = snap(flatCoordinates[offset], tolerance);
    var y3 = snap(flatCoordinates[offset + 1], tolerance);
    offset += stride; // skip P3 if it is equal to P2

    if (x3 == x2 && y3 == y2) {
      continue;
    } // calculate the delta between P1 and P2


    var dx1 = x2 - x1;
    var dy1 = y2 - y1; // calculate the delta between P3 and P1

    var dx2 = x3 - x1;
    var dy2 = y3 - y1; // if P1, P2, and P3 are colinear and P3 is further from P1 than P2 is from
    // P1 in the same direction then P2 is on the straight line between P1 and
    // P3

    if (dx1 * dy2 == dy1 * dx2 && (dx1 < 0 && dx2 < dx1 || dx1 == dx2 || dx1 > 0 && dx2 > dx1) && (dy1 < 0 && dy2 < dy1 || dy1 == dy2 || dy1 > 0 && dy2 > dy1)) {
      // discard P2 and set P2 = P3
      x2 = x3;
      y2 = y3;
      continue;
    } // either P1, P2, and P3 are not colinear, or they are colinear but P3 is
    // between P3 and P1 or on the opposite half of the line to P2.  add P2,
    // and continue with P1 = P2 and P2 = P3


    simplifiedFlatCoordinates[simplifiedOffset++] = x2;
    simplifiedFlatCoordinates[simplifiedOffset++] = y2;
    x1 = x2;
    y1 = y2;
    x2 = x3;
    y2 = y3;
  } // add the last point (P2)


  simplifiedFlatCoordinates[simplifiedOffset++] = x2;
  simplifiedFlatCoordinates[simplifiedOffset++] = y2;
  return simplifiedOffset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} tolerance Tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @param {Array<number>} simplifiedEnds Simplified ends.
 * @return {number} Simplified offset.
 */

function quantizeArray(flatCoordinates, offset, ends, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds) {
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    simplifiedOffset = quantize(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset);
    simplifiedEnds.push(simplifiedOffset);
    offset = end;
  }

  return simplifiedOffset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} tolerance Tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @param {Array<Array<number>>} simplifiedEndss Simplified endss.
 * @return {number} Simplified offset.
 */

function quantizeMultiArray(flatCoordinates, offset, endss, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEndss) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    var simplifiedEnds = [];
    simplifiedOffset = quantizeArray(flatCoordinates, offset, ends, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds);
    simplifiedEndss.push(simplifiedEnds);
    offset = ends[ends.length - 1];
  }

  return simplifiedOffset;
}

/***/ }),

/***/ 5091:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* binding */ matchingChunk)
/* harmony export */ });
/**
 * @module ol/geom/flat/straightchunk
 */

/**
 * @param {number} maxAngle Maximum acceptable angle delta between segments.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {Array<number>} Start and end of the first suitable chunk of the
 * given `flatCoordinates`.
 */
function matchingChunk(maxAngle, flatCoordinates, offset, end, stride) {
  var chunkStart = offset;
  var chunkEnd = offset;
  var chunkM = 0;
  var m = 0;
  var start = offset;
  var acos, i, m12, m23, x1, y1, x12, y12, x23, y23;

  for (i = offset; i < end; i += stride) {
    var x2 = flatCoordinates[i];
    var y2 = flatCoordinates[i + 1];

    if (x1 !== undefined) {
      x23 = x2 - x1;
      y23 = y2 - y1;
      m23 = Math.sqrt(x23 * x23 + y23 * y23);

      if (x12 !== undefined) {
        m += m12;
        acos = Math.acos((x12 * x23 + y12 * y23) / (m12 * m23));

        if (acos > maxAngle) {
          if (m > chunkM) {
            chunkM = m;
            chunkStart = start;
            chunkEnd = i;
          }

          m = 0;
          start = i - stride;
        }
      }

      m12 = m23;
      x12 = x23;
      y12 = y23;
    }

    x1 = x2;
    y1 = y2;
  }

  m += m23;
  return m > chunkM ? [start, i] : [chunkStart, chunkEnd];
}

/***/ }),

/***/ 852:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ drawTextOnPath)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4495);
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6929);
/**
 * @module ol/geom/flat/textpath
 */


/**
 * @param {Array<number>} flatCoordinates Path to put text on.
 * @param {number} offset Start offset of the `flatCoordinates`.
 * @param {number} end End offset of the `flatCoordinates`.
 * @param {number} stride Stride.
 * @param {string} text Text to place on the path.
 * @param {number} startM m along the path where the text starts.
 * @param {number} maxAngle Max angle between adjacent chars in radians.
 * @param {number} scale The product of the text scale and the device pixel ratio.
 * @param {function(string, string, Object<string, number>):number} measureAndCacheTextWidth Measure and cache text width.
 * @param {string} font The font.
 * @param {Object<string, number>} cache A cache of measured widths.
 * @param {number} rotation Rotation to apply to the flatCoordinates to determine whether text needs to be reversed.
 * @return {Array<Array<*>>} The result array (or null if `maxAngle` was
 * exceeded). Entries of the array are x, y, anchorX, angle, chunk.
 */

function drawTextOnPath(flatCoordinates, offset, end, stride, text, startM, maxAngle, scale, measureAndCacheTextWidth, font, cache, rotation) {
  var x2 = flatCoordinates[offset];
  var y2 = flatCoordinates[offset + 1];
  var x1 = 0;
  var y1 = 0;
  var segmentLength = 0;
  var segmentM = 0;

  function advance() {
    x1 = x2;
    y1 = y2;
    offset += stride;
    x2 = flatCoordinates[offset];
    y2 = flatCoordinates[offset + 1];
    segmentM += segmentLength;
    segmentLength = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }

  do {
    advance();
  } while (offset < end - stride && segmentM + segmentLength < startM);

  var interpolate = segmentLength === 0 ? 0 : (startM - segmentM) / segmentLength;
  var beginX = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .lerp */ .t7)(x1, x2, interpolate);
  var beginY = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .lerp */ .t7)(y1, y2, interpolate);
  var startOffset = offset - stride;
  var startLength = segmentM;
  var endM = startM + scale * measureAndCacheTextWidth(font, text, cache);

  while (offset < end - stride && segmentM + segmentLength < endM) {
    advance();
  }

  interpolate = segmentLength === 0 ? 0 : (endM - segmentM) / segmentLength;
  var endX = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .lerp */ .t7)(x1, x2, interpolate);
  var endY = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .lerp */ .t7)(y1, y2, interpolate); // Keep text upright

  var reverse;

  if (rotation) {
    var flat = [beginX, beginY, endX, endY];
    (0,_transform_js__WEBPACK_IMPORTED_MODULE_1__/* .rotate */ .U1)(flat, 0, 4, 2, rotation, flat, flat);
    reverse = flat[0] > flat[2];
  } else {
    reverse = beginX > endX;
  }

  var PI = Math.PI;
  var result = [];
  var singleSegment = startOffset + stride === offset;
  offset = startOffset;
  segmentLength = 0;
  segmentM = startLength;
  x2 = flatCoordinates[offset];
  y2 = flatCoordinates[offset + 1];
  var previousAngle; // All on the same segment

  if (singleSegment) {
    advance();
    previousAngle = Math.atan2(y2 - y1, x2 - x1);

    if (reverse) {
      previousAngle += previousAngle > 0 ? -PI : PI;
    }

    var x = (endX + beginX) / 2;
    var y = (endY + beginY) / 2;
    result[0] = [x, y, (endM - startM) / 2, previousAngle, text];
    return result;
  }

  for (var i = 0, ii = text.length; i < ii;) {
    advance();
    var angle = Math.atan2(y2 - y1, x2 - x1);

    if (reverse) {
      angle += angle > 0 ? -PI : PI;
    }

    if (previousAngle !== undefined) {
      var delta = angle - previousAngle;
      delta += delta > PI ? -2 * PI : delta < -PI ? 2 * PI : 0;

      if (Math.abs(delta) > maxAngle) {
        return null;
      }
    }

    previousAngle = angle;
    var iStart = i;
    var charLength = 0;

    for (; i < ii; ++i) {
      var index = reverse ? ii - i - 1 : i;
      var len = scale * measureAndCacheTextWidth(font, text[index], cache);

      if (offset + stride < end && segmentM + segmentLength < startM + charLength + len / 2) {
        break;
      }

      charLength += len;
    }

    if (i === iStart) {
      continue;
    }

    var chars = reverse ? text.substring(ii - iStart, ii - i) : text.substring(iStart, i);
    interpolate = segmentLength === 0 ? 0 : (startM + charLength / 2 - segmentM) / segmentLength;
    var x = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .lerp */ .t7)(x1, x2, interpolate);
    var y = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .lerp */ .t7)(y1, y2, interpolate);
    result.push([x, y, charLength / 2, angle, chars]);
    startM += charLength;
  }

  return result;
}

/***/ }),

/***/ 6929:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Iu": () => (/* binding */ translate),
/* harmony export */   "U1": () => (/* binding */ rotate),
/* harmony export */   "bA": () => (/* binding */ scale),
/* harmony export */   "vT": () => (/* binding */ transform2D)
/* harmony export */ });
/**
 * @module ol/geom/flat/transform
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../transform.js").Transform} transform Transform.
 * @param {Array<number>} [opt_dest] Destination.
 * @return {Array<number>} Transformed coordinates.
 */
function transform2D(flatCoordinates, offset, end, stride, transform, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var i = 0;

  for (var j = offset; j < end; j += stride) {
    var x = flatCoordinates[j];
    var y = flatCoordinates[j + 1];
    dest[i++] = transform[0] * x + transform[2] * y + transform[4];
    dest[i++] = transform[1] * x + transform[3] * y + transform[5];
  }

  if (opt_dest && dest.length != i) {
    dest.length = i;
  }

  return dest;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} angle Angle.
 * @param {Array<number>} anchor Rotation anchor point.
 * @param {Array<number>} [opt_dest] Destination.
 * @return {Array<number>} Transformed coordinates.
 */

function rotate(flatCoordinates, offset, end, stride, angle, anchor, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  var anchorX = anchor[0];
  var anchorY = anchor[1];
  var i = 0;

  for (var j = offset; j < end; j += stride) {
    var deltaX = flatCoordinates[j] - anchorX;
    var deltaY = flatCoordinates[j + 1] - anchorY;
    dest[i++] = anchorX + deltaX * cos - deltaY * sin;
    dest[i++] = anchorY + deltaX * sin + deltaY * cos;

    for (var k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }

  if (opt_dest && dest.length != i) {
    dest.length = i;
  }

  return dest;
}
/**
 * Scale the coordinates.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} sx Scale factor in the x-direction.
 * @param {number} sy Scale factor in the y-direction.
 * @param {Array<number>} anchor Scale anchor point.
 * @param {Array<number>} [opt_dest] Destination.
 * @return {Array<number>} Transformed coordinates.
 */

function scale(flatCoordinates, offset, end, stride, sx, sy, anchor, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var anchorX = anchor[0];
  var anchorY = anchor[1];
  var i = 0;

  for (var j = offset; j < end; j += stride) {
    var deltaX = flatCoordinates[j] - anchorX;
    var deltaY = flatCoordinates[j + 1] - anchorY;
    dest[i++] = anchorX + sx * deltaX;
    dest[i++] = anchorY + sy * deltaY;

    for (var k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }

  if (opt_dest && dest.length != i) {
    dest.length = i;
  }

  return dest;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} deltaX Delta X.
 * @param {number} deltaY Delta Y.
 * @param {Array<number>} [opt_dest] Destination.
 * @return {Array<number>} Transformed coordinates.
 */

function translate(flatCoordinates, offset, end, stride, deltaX, deltaY, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var i = 0;

  for (var j = offset; j < end; j += stride) {
    dest[i++] = flatCoordinates[j] + deltaX;
    dest[i++] = flatCoordinates[j + 1] + deltaY;

    for (var k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }

  if (opt_dest && dest.length != i) {
    dest.length = i;
  }

  return dest;
}

/***/ })

}]);