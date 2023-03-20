"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[419],{

/***/ 2295:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Instruction_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9506);
/* harmony import */ var _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5870);
/* harmony import */ var _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8079);
/* harmony import */ var _VectorContext_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8298);
/* harmony import */ var _colorlike_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5739);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1046);
/* harmony import */ var _canvas_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1184);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3620);
/* harmony import */ var _geom_flat_inflate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6301);
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
 * @module ol/render/canvas/Builder
 */












var CanvasBuilder =
/** @class */
function (_super) {
  __extends(CanvasBuilder, _super);
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */


  function CanvasBuilder(tolerance, maxExtent, resolution, pixelRatio) {
    var _this = _super.call(this) || this;
    /**
     * @protected
     * @type {number}
     */


    _this.tolerance = tolerance;
    /**
     * @protected
     * @const
     * @type {import("../../extent.js").Extent}
     */

    _this.maxExtent = maxExtent;
    /**
     * @protected
     * @type {number}
     */

    _this.pixelRatio = pixelRatio;
    /**
     * @protected
     * @type {number}
     */

    _this.maxLineWidth = 0;
    /**
     * @protected
     * @const
     * @type {number}
     */

    _this.resolution = resolution;
    /**
     * @private
     * @type {Array<*>}
     */

    _this.beginGeometryInstruction1_ = null;
    /**
     * @private
     * @type {Array<*>}
     */

    _this.beginGeometryInstruction2_ = null;
    /**
     * @private
     * @type {import("../../extent.js").Extent}
     */

    _this.bufferedMaxExtent_ = null;
    /**
     * @protected
     * @type {Array<*>}
     */

    _this.instructions = [];
    /**
     * @protected
     * @type {Array<number>}
     */

    _this.coordinates = [];
    /**
     * @private
     * @type {import("../../coordinate.js").Coordinate}
     */

    _this.tmpCoordinate_ = [];
    /**
     * @protected
     * @type {Array<*>}
     */

    _this.hitDetectionInstructions = [];
    /**
     * @protected
     * @type {import("../canvas.js").FillStrokeState}
     */

    _this.state =
    /** @type {import("../canvas.js").FillStrokeState} */
    {};
    return _this;
  }
  /**
   * @protected
   * @param {Array<number>} dashArray Dash array.
   * @return {Array<number>} Dash array with pixel ratio applied
   */


  CanvasBuilder.prototype.applyPixelRatio = function (dashArray) {
    var pixelRatio = this.pixelRatio;
    return pixelRatio == 1 ? dashArray : dashArray.map(function (dash) {
      return dash * pixelRatio;
    });
  };
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} stride Stride.
   * @protected
   * @return {number} My end
   */


  CanvasBuilder.prototype.appendFlatPointCoordinates = function (flatCoordinates, stride) {
    var extent = this.getBufferedMaxExtent();
    var tmpCoord = this.tmpCoordinate_;
    var coordinates = this.coordinates;
    var myEnd = coordinates.length;

    for (var i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
      tmpCoord[0] = flatCoordinates[i];
      tmpCoord[1] = flatCoordinates[i + 1];

      if ((0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .containsCoordinate */ .b8)(extent, tmpCoord)) {
        coordinates[myEnd++] = tmpCoord[0];
        coordinates[myEnd++] = tmpCoord[1];
      }
    }

    return myEnd;
  };
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @param {boolean} closed Last input coordinate equals first.
   * @param {boolean} skipFirst Skip first coordinate.
   * @protected
   * @return {number} My end.
   */


  CanvasBuilder.prototype.appendFlatLineCoordinates = function (flatCoordinates, offset, end, stride, closed, skipFirst) {
    var coordinates = this.coordinates;
    var myEnd = coordinates.length;
    var extent = this.getBufferedMaxExtent();

    if (skipFirst) {
      offset += stride;
    }

    var lastXCoord = flatCoordinates[offset];
    var lastYCoord = flatCoordinates[offset + 1];
    var nextCoord = this.tmpCoordinate_;
    var skipped = true;
    var i, lastRel, nextRel;

    for (i = offset + stride; i < end; i += stride) {
      nextCoord[0] = flatCoordinates[i];
      nextCoord[1] = flatCoordinates[i + 1];
      nextRel = (0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .coordinateRelationship */ .pX)(extent, nextCoord);

      if (nextRel !== lastRel) {
        if (skipped) {
          coordinates[myEnd++] = lastXCoord;
          coordinates[myEnd++] = lastYCoord;
          skipped = false;
        }

        coordinates[myEnd++] = nextCoord[0];
        coordinates[myEnd++] = nextCoord[1];
      } else if (nextRel === _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].INTERSECTING */ .Z.INTERSECTING) {
        coordinates[myEnd++] = nextCoord[0];
        coordinates[myEnd++] = nextCoord[1];
        skipped = false;
      } else {
        skipped = true;
      }

      lastXCoord = nextCoord[0];
      lastYCoord = nextCoord[1];
      lastRel = nextRel;
    } // Last coordinate equals first or only one point to append:


    if (closed && skipped || i === offset + stride) {
      coordinates[myEnd++] = lastXCoord;
      coordinates[myEnd++] = lastYCoord;
    }

    return myEnd;
  };
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @param {Array<number>} builderEnds Builder ends.
   * @return {number} Offset.
   */


  CanvasBuilder.prototype.drawCustomCoordinates_ = function (flatCoordinates, offset, ends, stride, builderEnds) {
    for (var i = 0, ii = ends.length; i < ii; ++i) {
      var end = ends[i];
      var builderEnd = this.appendFlatLineCoordinates(flatCoordinates, offset, end, stride, false, false);
      builderEnds.push(builderEnd);
      offset = end;
    }

    return offset;
  };
  /**
   * @param {import("../../geom/SimpleGeometry.js").default} geometry Geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {Function} renderer Renderer.
   * @param {Function} hitDetectionRenderer Renderer.
   */


  CanvasBuilder.prototype.drawCustom = function (geometry, feature, renderer, hitDetectionRenderer) {
    this.beginGeometry(geometry, feature);
    var type = geometry.getType();
    var stride = geometry.getStride();
    var builderBegin = this.coordinates.length;
    var flatCoordinates, builderEnd, builderEnds, builderEndss;
    var offset;

    switch (type) {
      case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].MULTI_POLYGON */ .Z.MULTI_POLYGON:
        flatCoordinates =
        /** @type {import("../../geom/MultiPolygon.js").default} */
        geometry.getOrientedFlatCoordinates();
        builderEndss = [];
        var endss =
        /** @type {import("../../geom/MultiPolygon.js").default} */
        geometry.getEndss();
        offset = 0;

        for (var i = 0, ii = endss.length; i < ii; ++i) {
          var myEnds = [];
          offset = this.drawCustomCoordinates_(flatCoordinates, offset, endss[i], stride, myEnds);
          builderEndss.push(myEnds);
        }

        this.instructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].CUSTOM */ .ZP.CUSTOM, builderBegin, builderEndss, geometry, renderer, _geom_flat_inflate_js__WEBPACK_IMPORTED_MODULE_4__/* .inflateMultiCoordinatesArray */ .ug]);
        this.hitDetectionInstructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].CUSTOM */ .ZP.CUSTOM, builderBegin, builderEndss, geometry, hitDetectionRenderer || renderer, _geom_flat_inflate_js__WEBPACK_IMPORTED_MODULE_4__/* .inflateMultiCoordinatesArray */ .ug]);
        break;

      case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].POLYGON */ .Z.POLYGON:
      case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].MULTI_LINE_STRING */ .Z.MULTI_LINE_STRING:
        builderEnds = [];
        flatCoordinates = type == _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].POLYGON */ .Z.POLYGON ?
        /** @type {import("../../geom/Polygon.js").default} */
        geometry.getOrientedFlatCoordinates() : geometry.getFlatCoordinates();
        offset = this.drawCustomCoordinates_(flatCoordinates, 0,
        /** @type {import("../../geom/Polygon.js").default|import("../../geom/MultiLineString.js").default} */
        geometry.getEnds(), stride, builderEnds);
        this.instructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].CUSTOM */ .ZP.CUSTOM, builderBegin, builderEnds, geometry, renderer, _geom_flat_inflate_js__WEBPACK_IMPORTED_MODULE_4__/* .inflateCoordinatesArray */ .o1]);
        this.hitDetectionInstructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].CUSTOM */ .ZP.CUSTOM, builderBegin, builderEnds, geometry, hitDetectionRenderer || renderer, _geom_flat_inflate_js__WEBPACK_IMPORTED_MODULE_4__/* .inflateCoordinatesArray */ .o1]);
        break;

      case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].LINE_STRING */ .Z.LINE_STRING:
      case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].CIRCLE */ .Z.CIRCLE:
        flatCoordinates = geometry.getFlatCoordinates();
        builderEnd = this.appendFlatLineCoordinates(flatCoordinates, 0, flatCoordinates.length, stride, false, false);
        this.instructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].CUSTOM */ .ZP.CUSTOM, builderBegin, builderEnd, geometry, renderer, _geom_flat_inflate_js__WEBPACK_IMPORTED_MODULE_4__/* .inflateCoordinates */ .Ml]);
        this.hitDetectionInstructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].CUSTOM */ .ZP.CUSTOM, builderBegin, builderEnd, geometry, hitDetectionRenderer || renderer, _geom_flat_inflate_js__WEBPACK_IMPORTED_MODULE_4__/* .inflateCoordinates */ .Ml]);
        break;

      case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].MULTI_POINT */ .Z.MULTI_POINT:
        flatCoordinates = geometry.getFlatCoordinates();
        builderEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);

        if (builderEnd > builderBegin) {
          this.instructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].CUSTOM */ .ZP.CUSTOM, builderBegin, builderEnd, geometry, renderer, _geom_flat_inflate_js__WEBPACK_IMPORTED_MODULE_4__/* .inflateCoordinates */ .Ml]);
          this.hitDetectionInstructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].CUSTOM */ .ZP.CUSTOM, builderBegin, builderEnd, geometry, hitDetectionRenderer || renderer, _geom_flat_inflate_js__WEBPACK_IMPORTED_MODULE_4__/* .inflateCoordinates */ .Ml]);
        }

        break;

      case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].POINT */ .Z.POINT:
        flatCoordinates = geometry.getFlatCoordinates();
        this.coordinates.push(flatCoordinates[0], flatCoordinates[1]);
        builderEnd = this.coordinates.length;
        this.instructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].CUSTOM */ .ZP.CUSTOM, builderBegin, builderEnd, geometry, renderer]);
        this.hitDetectionInstructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].CUSTOM */ .ZP.CUSTOM, builderBegin, builderEnd, geometry, hitDetectionRenderer || renderer]);
        break;

      default:
    }

    this.endGeometry(feature);
  };
  /**
   * @protected
   * @param {import("../../geom/Geometry").default|import("../Feature.js").default} geometry The geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */


  CanvasBuilder.prototype.beginGeometry = function (geometry, feature) {
    this.beginGeometryInstruction1_ = [_Instruction_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].BEGIN_GEOMETRY */ .ZP.BEGIN_GEOMETRY, feature, 0, geometry];
    this.instructions.push(this.beginGeometryInstruction1_);
    this.beginGeometryInstruction2_ = [_Instruction_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].BEGIN_GEOMETRY */ .ZP.BEGIN_GEOMETRY, feature, 0, geometry];
    this.hitDetectionInstructions.push(this.beginGeometryInstruction2_);
  };
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */


  CanvasBuilder.prototype.finish = function () {
    return {
      instructions: this.instructions,
      hitDetectionInstructions: this.hitDetectionInstructions,
      coordinates: this.coordinates
    };
  };
  /**
   * Reverse the hit detection instructions.
   */


  CanvasBuilder.prototype.reverseHitDetectionInstructions = function () {
    var hitDetectionInstructions = this.hitDetectionInstructions; // step 1 - reverse array

    hitDetectionInstructions.reverse(); // step 2 - reverse instructions within geometry blocks

    var i;
    var n = hitDetectionInstructions.length;
    var instruction;
    var type;
    var begin = -1;

    for (i = 0; i < n; ++i) {
      instruction = hitDetectionInstructions[i];
      type =
      /** @type {import("./Instruction.js").default} */
      instruction[0];

      if (type == _Instruction_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].END_GEOMETRY */ .ZP.END_GEOMETRY) {
        begin = i;
      } else if (type == _Instruction_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].BEGIN_GEOMETRY */ .ZP.BEGIN_GEOMETRY) {
        instruction[2] = i;
        (0,_array_js__WEBPACK_IMPORTED_MODULE_5__/* .reverseSubArray */ .FZ)(this.hitDetectionInstructions, begin, i);
        begin = -1;
      }
    }
  };
  /**
   * @param {import("../../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
   */


  CanvasBuilder.prototype.setFillStrokeStyle = function (fillStyle, strokeStyle) {
    var state = this.state;

    if (fillStyle) {
      var fillStyleColor = fillStyle.getColor();
      state.fillStyle = (0,_colorlike_js__WEBPACK_IMPORTED_MODULE_6__/* .asColorLike */ .y)(fillStyleColor ? fillStyleColor : _canvas_js__WEBPACK_IMPORTED_MODULE_7__/* .defaultFillStyle */ .bL);
    } else {
      state.fillStyle = undefined;
    }

    if (strokeStyle) {
      var strokeStyleColor = strokeStyle.getColor();
      state.strokeStyle = (0,_colorlike_js__WEBPACK_IMPORTED_MODULE_6__/* .asColorLike */ .y)(strokeStyleColor ? strokeStyleColor : _canvas_js__WEBPACK_IMPORTED_MODULE_7__/* .defaultStrokeStyle */ .Tx);
      var strokeStyleLineCap = strokeStyle.getLineCap();
      state.lineCap = strokeStyleLineCap !== undefined ? strokeStyleLineCap : _canvas_js__WEBPACK_IMPORTED_MODULE_7__/* .defaultLineCap */ .mb;
      var strokeStyleLineDash = strokeStyle.getLineDash();
      state.lineDash = strokeStyleLineDash ? strokeStyleLineDash.slice() : _canvas_js__WEBPACK_IMPORTED_MODULE_7__/* .defaultLineDash */ .X9;
      var strokeStyleLineDashOffset = strokeStyle.getLineDashOffset();
      state.lineDashOffset = strokeStyleLineDashOffset ? strokeStyleLineDashOffset : _canvas_js__WEBPACK_IMPORTED_MODULE_7__/* .defaultLineDashOffset */ .He;
      var strokeStyleLineJoin = strokeStyle.getLineJoin();
      state.lineJoin = strokeStyleLineJoin !== undefined ? strokeStyleLineJoin : _canvas_js__WEBPACK_IMPORTED_MODULE_7__/* .defaultLineJoin */ .rc;
      var strokeStyleWidth = strokeStyle.getWidth();
      state.lineWidth = strokeStyleWidth !== undefined ? strokeStyleWidth : _canvas_js__WEBPACK_IMPORTED_MODULE_7__/* .defaultLineWidth */ .yC;
      var strokeStyleMiterLimit = strokeStyle.getMiterLimit();
      state.miterLimit = strokeStyleMiterLimit !== undefined ? strokeStyleMiterLimit : _canvas_js__WEBPACK_IMPORTED_MODULE_7__/* .defaultMiterLimit */ .V4;

      if (state.lineWidth > this.maxLineWidth) {
        this.maxLineWidth = state.lineWidth; // invalidate the buffered max extent cache

        this.bufferedMaxExtent_ = null;
      }
    } else {
      state.strokeStyle = undefined;
      state.lineCap = undefined;
      state.lineDash = null;
      state.lineDashOffset = undefined;
      state.lineJoin = undefined;
      state.lineWidth = undefined;
      state.miterLimit = undefined;
    }
  };
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @return {Array<*>} Fill instruction.
   */


  CanvasBuilder.prototype.createFill = function (state) {
    var fillStyle = state.fillStyle;
    /** @type {Array<*>} */

    var fillInstruction = [_Instruction_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].SET_FILL_STYLE */ .ZP.SET_FILL_STYLE, fillStyle];

    if (typeof fillStyle !== 'string') {
      // Fill is a pattern or gradient - align it!
      fillInstruction.push(true);
    }

    return fillInstruction;
  };
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   */


  CanvasBuilder.prototype.applyStroke = function (state) {
    this.instructions.push(this.createStroke(state));
  };
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @return {Array<*>} Stroke instruction.
   */


  CanvasBuilder.prototype.createStroke = function (state) {
    return [_Instruction_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].SET_STROKE_STYLE */ .ZP.SET_STROKE_STYLE, state.strokeStyle, state.lineWidth * this.pixelRatio, state.lineCap, state.lineJoin, state.miterLimit, this.applyPixelRatio(state.lineDash), state.lineDashOffset * this.pixelRatio];
  };
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState):Array<*>} createFill Create fill.
   */


  CanvasBuilder.prototype.updateFillStyle = function (state, createFill) {
    var fillStyle = state.fillStyle;

    if (typeof fillStyle !== 'string' || state.currentFillStyle != fillStyle) {
      if (fillStyle !== undefined) {
        this.instructions.push(createFill.call(this, state));
      }

      state.currentFillStyle = fillStyle;
    }
  };
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState): void} applyStroke Apply stroke.
   */


  CanvasBuilder.prototype.updateStrokeStyle = function (state, applyStroke) {
    var strokeStyle = state.strokeStyle;
    var lineCap = state.lineCap;
    var lineDash = state.lineDash;
    var lineDashOffset = state.lineDashOffset;
    var lineJoin = state.lineJoin;
    var lineWidth = state.lineWidth;
    var miterLimit = state.miterLimit;

    if (state.currentStrokeStyle != strokeStyle || state.currentLineCap != lineCap || lineDash != state.currentLineDash && !(0,_array_js__WEBPACK_IMPORTED_MODULE_5__/* .equals */ .fS)(state.currentLineDash, lineDash) || state.currentLineDashOffset != lineDashOffset || state.currentLineJoin != lineJoin || state.currentLineWidth != lineWidth || state.currentMiterLimit != miterLimit) {
      if (strokeStyle !== undefined) {
        applyStroke.call(this, state);
      }

      state.currentStrokeStyle = strokeStyle;
      state.currentLineCap = lineCap;
      state.currentLineDash = lineDash;
      state.currentLineDashOffset = lineDashOffset;
      state.currentLineJoin = lineJoin;
      state.currentLineWidth = lineWidth;
      state.currentMiterLimit = miterLimit;
    }
  };
  /**
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */


  CanvasBuilder.prototype.endGeometry = function (feature) {
    this.beginGeometryInstruction1_[2] = this.instructions.length;
    this.beginGeometryInstruction1_ = null;
    this.beginGeometryInstruction2_[2] = this.hitDetectionInstructions.length;
    this.beginGeometryInstruction2_ = null;
    var endGeometryInstruction = [_Instruction_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].END_GEOMETRY */ .ZP.END_GEOMETRY, feature];
    this.instructions.push(endGeometryInstruction);
    this.hitDetectionInstructions.push(endGeometryInstruction);
  };
  /**
   * Get the buffered rendering extent.  Rendering will be clipped to the extent
   * provided to the constructor.  To account for symbolizers that may intersect
   * this extent, we calculate a buffered extent (e.g. based on stroke width).
   * @return {import("../../extent.js").Extent} The buffered rendering extent.
   * @protected
   */


  CanvasBuilder.prototype.getBufferedMaxExtent = function () {
    if (!this.bufferedMaxExtent_) {
      this.bufferedMaxExtent_ = (0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .clone */ .d9)(this.maxExtent);

      if (this.maxLineWidth > 0) {
        var width = this.resolution * (this.maxLineWidth + 1) / 2;
        (0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .buffer */ .f3)(this.bufferedMaxExtent_, width, this.bufferedMaxExtent_);
      }
    }

    return this.bufferedMaxExtent_;
  };

  return CanvasBuilder;
}(_VectorContext_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasBuilder);

/***/ }),

/***/ 6280:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Builder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2295);
/* harmony import */ var _ImageBuilder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1953);
/* harmony import */ var _LineStringBuilder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4398);
/* harmony import */ var _PolygonBuilder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1382);
/* harmony import */ var _TextBuilder_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7353);
/**
 * @module ol/render/canvas/BuilderGroup
 */





/**
 * @type {Object<import("./BuilderType").default, typeof Builder>}
 */

var BATCH_CONSTRUCTORS = {
  'Circle': _PolygonBuilder_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z,
  'Default': _Builder_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z,
  'Image': _ImageBuilder_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z,
  'LineString': _LineStringBuilder_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z,
  'Polygon': _PolygonBuilder_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z,
  'Text': _TextBuilder_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z
};

var BuilderGroup =
/** @class */
function () {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Max extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  function BuilderGroup(tolerance, maxExtent, resolution, pixelRatio) {
    /**
     * @private
     * @type {number}
     */
    this.tolerance_ = tolerance;
    /**
     * @private
     * @type {import("../../extent.js").Extent}
     */

    this.maxExtent_ = maxExtent;
    /**
     * @private
     * @type {number}
     */

    this.pixelRatio_ = pixelRatio;
    /**
     * @private
     * @type {number}
     */

    this.resolution_ = resolution;
    /**
     * @private
     * @type {!Object<string, !Object<import("./BuilderType").default, Builder>>}
     */

    this.buildersByZIndex_ = {};
  }
  /**
   * @return {!Object<string, !Object<import("./BuilderType").default, import("./Builder.js").SerializableInstructions>>} The serializable instructions
   */


  BuilderGroup.prototype.finish = function () {
    var builderInstructions = {};

    for (var zKey in this.buildersByZIndex_) {
      builderInstructions[zKey] = builderInstructions[zKey] || {};
      var builders = this.buildersByZIndex_[zKey];

      for (var builderKey in builders) {
        var builderInstruction = builders[builderKey].finish();
        builderInstructions[zKey][builderKey] = builderInstruction;
      }
    }

    return builderInstructions;
  };
  /**
   * @param {number|undefined} zIndex Z index.
   * @param {import("./BuilderType.js").default} builderType Replay type.
   * @return {import("../VectorContext.js").default} Replay.
   */


  BuilderGroup.prototype.getBuilder = function (zIndex, builderType) {
    var zIndexKey = zIndex !== undefined ? zIndex.toString() : '0';
    var replays = this.buildersByZIndex_[zIndexKey];

    if (replays === undefined) {
      replays = {};
      this.buildersByZIndex_[zIndexKey] = replays;
    }

    var replay = replays[builderType];

    if (replay === undefined) {
      var Constructor = BATCH_CONSTRUCTORS[builderType];
      replay = new Constructor(this.tolerance_, this.maxExtent_, this.resolution_, this.pixelRatio_);
      replays[builderType] = replay;
    }

    return replay;
  };

  return BuilderGroup;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BuilderGroup);

/***/ }),

/***/ 6175:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/render/canvas/BuilderType
 */

/**
 * @enum {string}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  CIRCLE: 'Circle',
  DEFAULT: 'Default',
  IMAGE: 'Image',
  LINE_STRING: 'LineString',
  POLYGON: 'Polygon',
  TEXT: 'Text'
});

/***/ })

}]);