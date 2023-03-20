"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[566],{

/***/ 1733:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ reproj_Tile)
});

// EXTERNAL MODULE: ./node_modules/ol/reproj/common.js
var common = __webpack_require__(3154);
// EXTERNAL MODULE: ./node_modules/ol/events/EventType.js
var EventType = __webpack_require__(2140);
// EXTERNAL MODULE: ./node_modules/ol/Tile.js
var Tile = __webpack_require__(6791);
// EXTERNAL MODULE: ./node_modules/ol/TileState.js
var TileState = __webpack_require__(587);
// EXTERNAL MODULE: ./node_modules/ol/extent.js
var ol_extent = __webpack_require__(1046);
// EXTERNAL MODULE: ./node_modules/ol/proj.js + 2 modules
var proj = __webpack_require__(8623);
// EXTERNAL MODULE: ./node_modules/ol/math.js
var math = __webpack_require__(4495);
;// CONCATENATED MODULE: ./node_modules/ol/reproj/Triangulation.js
/**
 * @module ol/reproj/Triangulation
 */



/**
 * Single triangle; consists of 3 source points and 3 target points.
 * @typedef {Object} Triangle
 * @property {Array<import("../coordinate.js").Coordinate>} source Source.
 * @property {Array<import("../coordinate.js").Coordinate>} target Target.
 */

/**
 * Maximum number of subdivision steps during raster reprojection triangulation.
 * Prevents high memory usage and large number of proj4 calls (for certain
 * transformations and areas). At most `2*(2^this)` triangles are created for
 * each triangulated extent (tile/image).
 * @type {number}
 */

var MAX_SUBDIVISION = 10;
/**
 * Maximum allowed size of triangle relative to world width. When transforming
 * corners of world extent between certain projections, the resulting
 * triangulation seems to have zero error and no subdivision is performed. If
 * the triangle width is more than this (relative to world width; 0-1),
 * subdivison is forced (up to `MAX_SUBDIVISION`). Default is `0.25`.
 * @type {number}
 */

var MAX_TRIANGLE_WIDTH = 0.25;
/**
 * @classdesc
 * Class containing triangulation of the given target extent.
 * Used for determining source data and the reprojection itself.
 */

var Triangulation =
/** @class */
function () {
  /**
   * @param {import("../proj/Projection.js").default} sourceProj Source projection.
   * @param {import("../proj/Projection.js").default} targetProj Target projection.
   * @param {import("../extent.js").Extent} targetExtent Target extent to triangulate.
   * @param {import("../extent.js").Extent} maxSourceExtent Maximal source extent that can be used.
   * @param {number} errorThreshold Acceptable error (in source units).
   * @param {?number} opt_destinationResolution The (optional) resolution of the destination.
   */
  function Triangulation(sourceProj, targetProj, targetExtent, maxSourceExtent, errorThreshold, opt_destinationResolution) {
    /**
     * @type {import("../proj/Projection.js").default}
     * @private
     */
    this.sourceProj_ = sourceProj;
    /**
     * @type {import("../proj/Projection.js").default}
     * @private
     */

    this.targetProj_ = targetProj;
    /** @type {!Object<string, import("../coordinate.js").Coordinate>} */

    var transformInvCache = {};
    var transformInv = (0,proj/* getTransform */.Ck)(this.targetProj_, this.sourceProj_);
    /**
     * @param {import("../coordinate.js").Coordinate} c A coordinate.
     * @return {import("../coordinate.js").Coordinate} Transformed coordinate.
     * @private
     */

    this.transformInv_ = function (c) {
      var key = c[0] + '/' + c[1];

      if (!transformInvCache[key]) {
        transformInvCache[key] = transformInv(c);
      }

      return transformInvCache[key];
    };
    /**
     * @type {import("../extent.js").Extent}
     * @private
     */


    this.maxSourceExtent_ = maxSourceExtent;
    /**
     * @type {number}
     * @private
     */

    this.errorThresholdSquared_ = errorThreshold * errorThreshold;
    /**
     * @type {Array<Triangle>}
     * @private
     */

    this.triangles_ = [];
    /**
     * Indicates that the triangulation crosses edge of the source projection.
     * @type {boolean}
     * @private
     */

    this.wrapsXInSource_ = false;
    /**
     * @type {boolean}
     * @private
     */

    this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!maxSourceExtent && !!this.sourceProj_.getExtent() && (0,ol_extent/* getWidth */.dz)(maxSourceExtent) == (0,ol_extent/* getWidth */.dz)(this.sourceProj_.getExtent());
    /**
     * @type {?number}
     * @private
     */

    this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? (0,ol_extent/* getWidth */.dz)(this.sourceProj_.getExtent()) : null;
    /**
     * @type {?number}
     * @private
     */

    this.targetWorldWidth_ = this.targetProj_.getExtent() ? (0,ol_extent/* getWidth */.dz)(this.targetProj_.getExtent()) : null;
    var destinationTopLeft = (0,ol_extent/* getTopLeft */.rL)(targetExtent);
    var destinationTopRight = (0,ol_extent/* getTopRight */.Xv)(targetExtent);
    var destinationBottomRight = (0,ol_extent/* getBottomRight */.w$)(targetExtent);
    var destinationBottomLeft = (0,ol_extent/* getBottomLeft */.hC)(targetExtent);
    var sourceTopLeft = this.transformInv_(destinationTopLeft);
    var sourceTopRight = this.transformInv_(destinationTopRight);
    var sourceBottomRight = this.transformInv_(destinationBottomRight);
    var sourceBottomLeft = this.transformInv_(destinationBottomLeft);
    /*
     * The maxSubdivision controls how many splittings of the target area can
     * be done. The idea here is to do a linear mapping of the target areas
     * but the actual overal reprojection (can be) extremely non-linear. The
     * default value of MAX_SUBDIVISION was chosen based on mapping a 256x256
     * tile size. However this function is also called to remap canvas rendered
     * layers which can be much larger. This calculation increases the maxSubdivision
     * value by the right factor so that each 256x256 pixel area has
     * MAX_SUBDIVISION divisions.
     */

    var maxSubdivision = MAX_SUBDIVISION + (opt_destinationResolution ? Math.max(0, Math.ceil((0,math/* log2 */.k3)((0,ol_extent/* getArea */.bg)(targetExtent) / (opt_destinationResolution * opt_destinationResolution * 256 * 256)))) : 0);
    this.addQuad_(destinationTopLeft, destinationTopRight, destinationBottomRight, destinationBottomLeft, sourceTopLeft, sourceTopRight, sourceBottomRight, sourceBottomLeft, maxSubdivision);

    if (this.wrapsXInSource_) {
      var leftBound_1 = Infinity;
      this.triangles_.forEach(function (triangle, i, arr) {
        leftBound_1 = Math.min(leftBound_1, triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]);
      }); // Shift triangles to be as close to `leftBound` as possible
      // (if the distance is more than `worldWidth / 2` it can be closer.

      this.triangles_.forEach(function (triangle) {
        if (Math.max(triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]) - leftBound_1 > this.sourceWorldWidth_ / 2) {
          var newTriangle = [[triangle.source[0][0], triangle.source[0][1]], [triangle.source[1][0], triangle.source[1][1]], [triangle.source[2][0], triangle.source[2][1]]];

          if (newTriangle[0][0] - leftBound_1 > this.sourceWorldWidth_ / 2) {
            newTriangle[0][0] -= this.sourceWorldWidth_;
          }

          if (newTriangle[1][0] - leftBound_1 > this.sourceWorldWidth_ / 2) {
            newTriangle[1][0] -= this.sourceWorldWidth_;
          }

          if (newTriangle[2][0] - leftBound_1 > this.sourceWorldWidth_ / 2) {
            newTriangle[2][0] -= this.sourceWorldWidth_;
          } // Rarely (if the extent contains both the dateline and prime meridian)
          // the shift can in turn break some triangles.
          // Detect this here and don't shift in such cases.


          var minX = Math.min(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]);
          var maxX = Math.max(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]);

          if (maxX - minX < this.sourceWorldWidth_ / 2) {
            triangle.source = newTriangle;
          }
        }
      }.bind(this));
    }

    transformInvCache = {};
  }
  /**
   * Adds triangle to the triangulation.
   * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
   * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
   * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
   * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
   * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
   * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
   * @private
   */


  Triangulation.prototype.addTriangle_ = function (a, b, c, aSrc, bSrc, cSrc) {
    this.triangles_.push({
      source: [aSrc, bSrc, cSrc],
      target: [a, b, c]
    });
  };
  /**
   * Adds quad (points in clock-wise order) to the triangulation
   * (and reprojects the vertices) if valid.
   * Performs quad subdivision if needed to increase precision.
   *
   * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
   * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
   * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
   * @param {import("../coordinate.js").Coordinate} d The target d coordinate.
   * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
   * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
   * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
   * @param {import("../coordinate.js").Coordinate} dSrc The source d coordinate.
   * @param {number} maxSubdivision Maximal allowed subdivision of the quad.
   * @private
   */


  Triangulation.prototype.addQuad_ = function (a, b, c, d, aSrc, bSrc, cSrc, dSrc, maxSubdivision) {
    var sourceQuadExtent = (0,ol_extent/* boundingExtent */.hI)([aSrc, bSrc, cSrc, dSrc]);
    var sourceCoverageX = this.sourceWorldWidth_ ? (0,ol_extent/* getWidth */.dz)(sourceQuadExtent) / this.sourceWorldWidth_ : null;
    var sourceWorldWidth =
    /** @type {number} */
    this.sourceWorldWidth_; // when the quad is wrapped in the source projection
    // it covers most of the projection extent, but not fully

    var wrapsX = this.sourceProj_.canWrapX() && sourceCoverageX > 0.5 && sourceCoverageX < 1;
    var needsSubdivision = false;

    if (maxSubdivision > 0) {
      if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
        var targetQuadExtent = (0,ol_extent/* boundingExtent */.hI)([a, b, c, d]);
        var targetCoverageX = (0,ol_extent/* getWidth */.dz)(targetQuadExtent) / this.targetWorldWidth_;
        needsSubdivision = targetCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
      }

      if (!wrapsX && this.sourceProj_.isGlobal() && sourceCoverageX) {
        needsSubdivision = sourceCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
      }
    }

    if (!needsSubdivision && this.maxSourceExtent_) {
      if (isFinite(sourceQuadExtent[0]) && isFinite(sourceQuadExtent[1]) && isFinite(sourceQuadExtent[2]) && isFinite(sourceQuadExtent[3])) {
        if (!(0,ol_extent/* intersects */.kK)(sourceQuadExtent, this.maxSourceExtent_)) {
          // whole quad outside source projection extent -> ignore
          return;
        }
      }
    }

    var isNotFinite = 0;

    if (!needsSubdivision) {
      if (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) || !isFinite(bSrc[0]) || !isFinite(bSrc[1]) || !isFinite(cSrc[0]) || !isFinite(cSrc[1]) || !isFinite(dSrc[0]) || !isFinite(dSrc[1])) {
        if (maxSubdivision > 0) {
          needsSubdivision = true;
        } else {
          // It might be the case that only 1 of the points is infinite. In this case
          // we can draw a single triangle with the other three points
          isNotFinite = (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) ? 8 : 0) + (!isFinite(bSrc[0]) || !isFinite(bSrc[1]) ? 4 : 0) + (!isFinite(cSrc[0]) || !isFinite(cSrc[1]) ? 2 : 0) + (!isFinite(dSrc[0]) || !isFinite(dSrc[1]) ? 1 : 0);

          if (isNotFinite != 1 && isNotFinite != 2 && isNotFinite != 4 && isNotFinite != 8) {
            return;
          }
        }
      }
    }

    if (maxSubdivision > 0) {
      if (!needsSubdivision) {
        var center = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
        var centerSrc = this.transformInv_(center);
        var dx = void 0;

        if (wrapsX) {
          var centerSrcEstimX = ((0,math/* modulo */.$W)(aSrc[0], sourceWorldWidth) + (0,math/* modulo */.$W)(cSrc[0], sourceWorldWidth)) / 2;
          dx = centerSrcEstimX - (0,math/* modulo */.$W)(centerSrc[0], sourceWorldWidth);
        } else {
          dx = (aSrc[0] + cSrc[0]) / 2 - centerSrc[0];
        }

        var dy = (aSrc[1] + cSrc[1]) / 2 - centerSrc[1];
        var centerSrcErrorSquared = dx * dx + dy * dy;
        needsSubdivision = centerSrcErrorSquared > this.errorThresholdSquared_;
      }

      if (needsSubdivision) {
        if (Math.abs(a[0] - c[0]) <= Math.abs(a[1] - c[1])) {
          // split horizontally (top & bottom)
          var bc = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2];
          var bcSrc = this.transformInv_(bc);
          var da = [(d[0] + a[0]) / 2, (d[1] + a[1]) / 2];
          var daSrc = this.transformInv_(da);
          this.addQuad_(a, b, bc, da, aSrc, bSrc, bcSrc, daSrc, maxSubdivision - 1);
          this.addQuad_(da, bc, c, d, daSrc, bcSrc, cSrc, dSrc, maxSubdivision - 1);
        } else {
          // split vertically (left & right)
          var ab = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
          var abSrc = this.transformInv_(ab);
          var cd = [(c[0] + d[0]) / 2, (c[1] + d[1]) / 2];
          var cdSrc = this.transformInv_(cd);
          this.addQuad_(a, ab, cd, d, aSrc, abSrc, cdSrc, dSrc, maxSubdivision - 1);
          this.addQuad_(ab, b, c, cd, abSrc, bSrc, cSrc, cdSrc, maxSubdivision - 1);
        }

        return;
      }
    }

    if (wrapsX) {
      if (!this.canWrapXInSource_) {
        return;
      }

      this.wrapsXInSource_ = true;
    } // Exactly zero or one of *Src is not finite
    // The triangles must have the diagonal line as the first side
    // This is to allow easy code in reproj.s to make it straight for broken
    // browsers that can't handle diagonal clipping


    if ((isNotFinite & 0xb) == 0) {
      this.addTriangle_(a, c, d, aSrc, cSrc, dSrc);
    }

    if ((isNotFinite & 0xe) == 0) {
      this.addTriangle_(a, c, b, aSrc, cSrc, bSrc);
    }

    if (isNotFinite) {
      // Try the other two triangles
      if ((isNotFinite & 0xd) == 0) {
        this.addTriangle_(b, d, a, bSrc, dSrc, aSrc);
      }

      if ((isNotFinite & 0x7) == 0) {
        this.addTriangle_(b, d, c, bSrc, dSrc, cSrc);
      }
    }
  };
  /**
   * Calculates extent of the 'source' coordinates from all the triangles.
   *
   * @return {import("../extent.js").Extent} Calculated extent.
   */


  Triangulation.prototype.calculateSourceExtent = function () {
    var extent = (0,ol_extent/* createEmpty */.lJ)();
    this.triangles_.forEach(function (triangle, i, arr) {
      var src = triangle.source;
      (0,ol_extent/* extendCoordinate */.Wj)(extent, src[0]);
      (0,ol_extent/* extendCoordinate */.Wj)(extent, src[1]);
      (0,ol_extent/* extendCoordinate */.Wj)(extent, src[2]);
    });
    return extent;
  };
  /**
   * @return {Array<Triangle>} Array of the calculated triangles.
   */


  Triangulation.prototype.getTriangles = function () {
    return this.triangles_;
  };

  return Triangulation;
}();

/* harmony default export */ const reproj_Triangulation = (Triangulation);
// EXTERNAL MODULE: ./node_modules/ol/source/common.js
var source_common = __webpack_require__(5888);
// EXTERNAL MODULE: ./node_modules/ol/obj.js
var obj = __webpack_require__(9800);
// EXTERNAL MODULE: ./node_modules/ol/dom.js
var dom = __webpack_require__(9631);
;// CONCATENATED MODULE: ./node_modules/ol/reproj.js
/**
 * @module ol/reproj
 */






var brokenDiagonalRendering_;
/**
 * This draws a small triangle into a canvas by setting the triangle as the clip region
 * and then drawing a (too large) rectangle
 *
 * @param {CanvasRenderingContext2D} ctx The context in which to draw the triangle
 * @param {number} u1 The x-coordinate of the second point. The first point is 0,0.
 * @param {number} v1 The y-coordinate of the second point.
 * @param {number} u2 The x-coordinate of the third point.
 * @param {number} v2 The y-coordinate of the third point.
 */

function drawTestTriangle(ctx, u1, v1, u2, v2) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(u1, v1);
  ctx.lineTo(u2, v2);
  ctx.closePath();
  ctx.save();
  ctx.clip();
  ctx.fillRect(0, 0, Math.max(u1, u2) + 1, Math.max(v1, v2));
  ctx.restore();
}
/**
 * Given the data from getImageData, see if the right values appear at the provided offset.
 * Returns true if either the color or transparency is off
 *
 * @param {Uint8ClampedArray} data The data returned from getImageData
 * @param {number} offset The pixel offset from the start of data.
 * @return {boolean} true if the diagonal rendering is broken
 */


function verifyBrokenDiagonalRendering(data, offset) {
  // the values ought to be close to the rgba(210, 0, 0, 0.75)
  return Math.abs(data[offset * 4] - 210) > 2 || Math.abs(data[offset * 4 + 3] - 0.75 * 255) > 2;
}
/**
 * Determines if the current browser configuration can render triangular clip regions correctly.
 * This value is cached so the function is only expensive the first time called.
 * Firefox on Windows (as of now) does not if HWA is enabled. See https://bugzilla.mozilla.org/show_bug.cgi?id=1606976
 * IE also doesn't. Chrome works, and everything seems to work on OSX and Android. This function caches the
 * result. I suppose that it is conceivably possible that a browser might flip modes while the app is
 * running, but lets hope not.
 *
 * @return {boolean} true if the Diagonal Rendering is broken.
 */


function isBrokenDiagonalRendering() {
  if (brokenDiagonalRendering_ === undefined) {
    var ctx = document.createElement('canvas').getContext('2d');
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = 'rgba(210, 0, 0, 0.75)';
    drawTestTriangle(ctx, 4, 5, 4, 0);
    drawTestTriangle(ctx, 4, 5, 0, 5);
    var data = ctx.getImageData(0, 0, 3, 3).data;
    brokenDiagonalRendering_ = verifyBrokenDiagonalRendering(data, 0) || verifyBrokenDiagonalRendering(data, 4) || verifyBrokenDiagonalRendering(data, 8);
  }

  return brokenDiagonalRendering_;
}
/**
 * Calculates ideal resolution to use from the source in order to achieve
 * pixel mapping as close as possible to 1:1 during reprojection.
 * The resolution is calculated regardless of what resolutions
 * are actually available in the dataset (TileGrid, Image, ...).
 *
 * @param {import("./proj/Projection.js").default} sourceProj Source projection.
 * @param {import("./proj/Projection.js").default} targetProj Target projection.
 * @param {import("./coordinate.js").Coordinate} targetCenter Target center.
 * @param {number} targetResolution Target resolution.
 * @return {number} The best resolution to use. Can be +-Infinity, NaN or 0.
 */


function calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution) {
  var sourceCenter = (0,proj/* transform */.vs)(targetCenter, targetProj, sourceProj); // calculate the ideal resolution of the source data

  var sourceResolution = (0,proj/* getPointResolution */._Q)(targetProj, targetResolution, targetCenter);
  var targetMetersPerUnit = targetProj.getMetersPerUnit();

  if (targetMetersPerUnit !== undefined) {
    sourceResolution *= targetMetersPerUnit;
  }

  var sourceMetersPerUnit = sourceProj.getMetersPerUnit();

  if (sourceMetersPerUnit !== undefined) {
    sourceResolution /= sourceMetersPerUnit;
  } // Based on the projection properties, the point resolution at the specified
  // coordinates may be slightly different. We need to reverse-compensate this
  // in order to achieve optimal results.


  var sourceExtent = sourceProj.getExtent();

  if (!sourceExtent || (0,ol_extent/* containsCoordinate */.b8)(sourceExtent, sourceCenter)) {
    var compensationFactor = (0,proj/* getPointResolution */._Q)(sourceProj, sourceResolution, sourceCenter) / sourceResolution;

    if (isFinite(compensationFactor) && compensationFactor > 0) {
      sourceResolution /= compensationFactor;
    }
  }

  return sourceResolution;
}
/**
 * Calculates ideal resolution to use from the source in order to achieve
 * pixel mapping as close as possible to 1:1 during reprojection.
 * The resolution is calculated regardless of what resolutions
 * are actually available in the dataset (TileGrid, Image, ...).
 *
 * @param {import("./proj/Projection.js").default} sourceProj Source projection.
 * @param {import("./proj/Projection.js").default} targetProj Target projection.
 * @param {import("./extent.js").Extent} targetExtent Target extent
 * @param {number} targetResolution Target resolution.
 * @return {number} The best resolution to use. Can be +-Infinity, NaN or 0.
 */

function calculateSourceExtentResolution(sourceProj, targetProj, targetExtent, targetResolution) {
  var targetCenter = (0,ol_extent/* getCenter */.qg)(targetExtent);
  var sourceResolution = calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution);

  if (!isFinite(sourceResolution) || sourceResolution <= 0) {
    (0,ol_extent/* forEachCorner */.H6)(targetExtent, function (corner) {
      sourceResolution = calculateSourceResolution(sourceProj, targetProj, corner, targetResolution);
      return isFinite(sourceResolution) && sourceResolution > 0;
    });
  }

  return sourceResolution;
}
/**
 * @typedef {Object} ImageExtent
 * @property {import("./extent.js").Extent} extent Extent.
 * @property {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} image Image.
 */

/**
 * Renders the source data into new canvas based on the triangulation.
 *
 * @param {number} width Width of the canvas.
 * @param {number} height Height of the canvas.
 * @param {number} pixelRatio Pixel ratio.
 * @param {number} sourceResolution Source resolution.
 * @param {import("./extent.js").Extent} sourceExtent Extent of the data source.
 * @param {number} targetResolution Target resolution.
 * @param {import("./extent.js").Extent} targetExtent Target extent.
 * @param {import("./reproj/Triangulation.js").default} triangulation Calculated triangulation.
 * @param {Array<ImageExtent>} sources Array of sources.
 * @param {number} gutter Gutter of the sources.
 * @param {boolean} [opt_renderEdges] Render reprojection edges.
 * @param {object} [opt_contextOptions] Properties to set on the canvas context.
 * @return {HTMLCanvasElement} Canvas with reprojected data.
 */

function render(width, height, pixelRatio, sourceResolution, sourceExtent, targetResolution, targetExtent, triangulation, sources, gutter, opt_renderEdges, opt_contextOptions) {
  var context = (0,dom/* createCanvasContext2D */.E4)(Math.round(pixelRatio * width), Math.round(pixelRatio * height));
  (0,obj/* assign */.f0)(context, opt_contextOptions);

  if (sources.length === 0) {
    return context.canvas;
  }

  context.scale(pixelRatio, pixelRatio);

  function pixelRound(value) {
    return Math.round(value * pixelRatio) / pixelRatio;
  }

  context.globalCompositeOperation = 'lighter';
  var sourceDataExtent = (0,ol_extent/* createEmpty */.lJ)();
  sources.forEach(function (src, i, arr) {
    (0,ol_extent/* extend */.l7)(sourceDataExtent, src.extent);
  });
  var canvasWidthInUnits = (0,ol_extent/* getWidth */.dz)(sourceDataExtent);
  var canvasHeightInUnits = (0,ol_extent/* getHeight */.Cr)(sourceDataExtent);
  var stitchContext = (0,dom/* createCanvasContext2D */.E4)(Math.round(pixelRatio * canvasWidthInUnits / sourceResolution), Math.round(pixelRatio * canvasHeightInUnits / sourceResolution));
  (0,obj/* assign */.f0)(stitchContext, opt_contextOptions);
  var stitchScale = pixelRatio / sourceResolution;
  sources.forEach(function (src, i, arr) {
    var xPos = src.extent[0] - sourceDataExtent[0];
    var yPos = -(src.extent[3] - sourceDataExtent[3]);
    var srcWidth = (0,ol_extent/* getWidth */.dz)(src.extent);
    var srcHeight = (0,ol_extent/* getHeight */.Cr)(src.extent); // This test should never fail -- but it does. Need to find a fix the upstream condition

    if (src.image.width > 0 && src.image.height > 0) {
      stitchContext.drawImage(src.image, gutter, gutter, src.image.width - 2 * gutter, src.image.height - 2 * gutter, xPos * stitchScale, yPos * stitchScale, srcWidth * stitchScale, srcHeight * stitchScale);
    }
  });
  var targetTopLeft = (0,ol_extent/* getTopLeft */.rL)(targetExtent);
  triangulation.getTriangles().forEach(function (triangle, i, arr) {
    /* Calculate affine transform (src -> dst)
     * Resulting matrix can be used to transform coordinate
     * from `sourceProjection` to destination pixels.
     *
     * To optimize number of context calls and increase numerical stability,
     * we also do the following operations:
     * trans(-topLeftExtentCorner), scale(1 / targetResolution), scale(1, -1)
     * here before solving the linear system so [ui, vi] are pixel coordinates.
     *
     * Src points: xi, yi
     * Dst points: ui, vi
     * Affine coefficients: aij
     *
     * | x0 y0 1  0  0 0 |   |a00|   |u0|
     * | x1 y1 1  0  0 0 |   |a01|   |u1|
     * | x2 y2 1  0  0 0 | x |a02| = |u2|
     * |  0  0 0 x0 y0 1 |   |a10|   |v0|
     * |  0  0 0 x1 y1 1 |   |a11|   |v1|
     * |  0  0 0 x2 y2 1 |   |a12|   |v2|
     */
    var source = triangle.source;
    var target = triangle.target;
    var x0 = source[0][0],
        y0 = source[0][1];
    var x1 = source[1][0],
        y1 = source[1][1];
    var x2 = source[2][0],
        y2 = source[2][1]; // Make sure that everything is on pixel boundaries

    var u0 = pixelRound((target[0][0] - targetTopLeft[0]) / targetResolution);
    var v0 = pixelRound(-(target[0][1] - targetTopLeft[1]) / targetResolution);
    var u1 = pixelRound((target[1][0] - targetTopLeft[0]) / targetResolution);
    var v1 = pixelRound(-(target[1][1] - targetTopLeft[1]) / targetResolution);
    var u2 = pixelRound((target[2][0] - targetTopLeft[0]) / targetResolution);
    var v2 = pixelRound(-(target[2][1] - targetTopLeft[1]) / targetResolution); // Shift all the source points to improve numerical stability
    // of all the subsequent calculations. The [x0, y0] is used here.
    // This is also used to simplify the linear system.

    var sourceNumericalShiftX = x0;
    var sourceNumericalShiftY = y0;
    x0 = 0;
    y0 = 0;
    x1 -= sourceNumericalShiftX;
    y1 -= sourceNumericalShiftY;
    x2 -= sourceNumericalShiftX;
    y2 -= sourceNumericalShiftY;
    var augmentedMatrix = [[x1, y1, 0, 0, u1 - u0], [x2, y2, 0, 0, u2 - u0], [0, 0, x1, y1, v1 - v0], [0, 0, x2, y2, v2 - v0]];
    var affineCoefs = (0,math/* solveLinearSystem */.SV)(augmentedMatrix);

    if (!affineCoefs) {
      return;
    }

    context.save();
    context.beginPath();

    if (isBrokenDiagonalRendering() || opt_contextOptions === source_common/* IMAGE_SMOOTHING_DISABLED */.$) {
      // Make sure that all lines are horizontal or vertical
      context.moveTo(u1, v1); // This is the diagonal line. Do it in 4 steps

      var steps = 4;
      var ud = u0 - u1;
      var vd = v0 - v1;

      for (var step = 0; step < steps; step++) {
        // Go horizontally
        context.lineTo(u1 + pixelRound((step + 1) * ud / steps), v1 + pixelRound(step * vd / (steps - 1))); // Go vertically

        if (step != steps - 1) {
          context.lineTo(u1 + pixelRound((step + 1) * ud / steps), v1 + pixelRound((step + 1) * vd / (steps - 1)));
        }
      } // We are almost at u0r, v0r


      context.lineTo(u2, v2);
    } else {
      context.moveTo(u1, v1);
      context.lineTo(u0, v0);
      context.lineTo(u2, v2);
    }

    context.clip();
    context.transform(affineCoefs[0], affineCoefs[2], affineCoefs[1], affineCoefs[3], u0, v0);
    context.translate(sourceDataExtent[0] - sourceNumericalShiftX, sourceDataExtent[3] - sourceNumericalShiftY);
    context.scale(sourceResolution / pixelRatio, -sourceResolution / pixelRatio);
    context.drawImage(stitchContext.canvas, 0, 0);
    context.restore();
  });

  if (opt_renderEdges) {
    context.save();
    context.globalCompositeOperation = 'source-over';
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    triangulation.getTriangles().forEach(function (triangle, i, arr) {
      var target = triangle.target;
      var u0 = (target[0][0] - targetTopLeft[0]) / targetResolution;
      var v0 = -(target[0][1] - targetTopLeft[1]) / targetResolution;
      var u1 = (target[1][0] - targetTopLeft[0]) / targetResolution;
      var v1 = -(target[1][1] - targetTopLeft[1]) / targetResolution;
      var u2 = (target[2][0] - targetTopLeft[0]) / targetResolution;
      var v2 = -(target[2][1] - targetTopLeft[1]) / targetResolution;
      context.beginPath();
      context.moveTo(u1, v1);
      context.lineTo(u0, v0);
      context.lineTo(u2, v2);
      context.closePath();
      context.stroke();
    });
    context.restore();
  }

  return context.canvas;
}
// EXTERNAL MODULE: ./node_modules/ol/events.js
var events = __webpack_require__(5750);
;// CONCATENATED MODULE: ./node_modules/ol/reproj/Tile.js
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
 * @module ol/reproj/Tile
 */











/**
 * @typedef {function(number, number, number, number) : import("../Tile.js").default} FunctionType
 */

/**
 * @classdesc
 * Class encapsulating single reprojected tile.
 * See {@link module:ol/source/TileImage~TileImage}.
 *
 */

var ReprojTile =
/** @class */
function (_super) {
  __extends(ReprojTile, _super);
  /**
   * @param {import("../proj/Projection.js").default} sourceProj Source projection.
   * @param {import("../tilegrid/TileGrid.js").default} sourceTileGrid Source tile grid.
   * @param {import("../proj/Projection.js").default} targetProj Target projection.
   * @param {import("../tilegrid/TileGrid.js").default} targetTileGrid Target tile grid.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Coordinate of the tile.
   * @param {import("../tilecoord.js").TileCoord} wrappedTileCoord Coordinate of the tile wrapped in X.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} gutter Gutter of the source tiles.
   * @param {FunctionType} getTileFunction
   *     Function returning source tiles (z, x, y, pixelRatio).
   * @param {number} [opt_errorThreshold] Acceptable reprojection error (in px).
   * @param {boolean} [opt_renderEdges] Render reprojection edges.
   * @param {object} [opt_contextOptions] Properties to set on the canvas context.
   */


  function ReprojTile(sourceProj, sourceTileGrid, targetProj, targetTileGrid, tileCoord, wrappedTileCoord, pixelRatio, gutter, getTileFunction, opt_errorThreshold, opt_renderEdges, opt_contextOptions) {
    var _this = _super.call(this, tileCoord, TileState/* default.IDLE */.Z.IDLE) || this;
    /**
     * @private
     * @type {boolean}
     */


    _this.renderEdges_ = opt_renderEdges !== undefined ? opt_renderEdges : false;
    /**
     * @private
     * @type {object}
     */

    _this.contextOptions_ = opt_contextOptions;
    /**
     * @private
     * @type {number}
     */

    _this.pixelRatio_ = pixelRatio;
    /**
     * @private
     * @type {number}
     */

    _this.gutter_ = gutter;
    /**
     * @private
     * @type {HTMLCanvasElement}
     */

    _this.canvas_ = null;
    /**
     * @private
     * @type {import("../tilegrid/TileGrid.js").default}
     */

    _this.sourceTileGrid_ = sourceTileGrid;
    /**
     * @private
     * @type {import("../tilegrid/TileGrid.js").default}
     */

    _this.targetTileGrid_ = targetTileGrid;
    /**
     * @private
     * @type {import("../tilecoord.js").TileCoord}
     */

    _this.wrappedTileCoord_ = wrappedTileCoord ? wrappedTileCoord : tileCoord;
    /**
     * @private
     * @type {!Array<import("../Tile.js").default>}
     */

    _this.sourceTiles_ = [];
    /**
     * @private
     * @type {?Array<import("../events.js").EventsKey>}
     */

    _this.sourcesListenerKeys_ = null;
    /**
     * @private
     * @type {number}
     */

    _this.sourceZ_ = 0;
    var targetExtent = targetTileGrid.getTileCoordExtent(_this.wrappedTileCoord_);

    var maxTargetExtent = _this.targetTileGrid_.getExtent();

    var maxSourceExtent = _this.sourceTileGrid_.getExtent();

    var limitedTargetExtent = maxTargetExtent ? (0,ol_extent/* getIntersection */.Ed)(targetExtent, maxTargetExtent) : targetExtent;

    if ((0,ol_extent/* getArea */.bg)(limitedTargetExtent) === 0) {
      // Tile is completely outside range -> EMPTY
      // TODO: is it actually correct that the source even creates the tile ?
      _this.state = TileState/* default.EMPTY */.Z.EMPTY;
      return _this;
    }

    var sourceProjExtent = sourceProj.getExtent();

    if (sourceProjExtent) {
      if (!maxSourceExtent) {
        maxSourceExtent = sourceProjExtent;
      } else {
        maxSourceExtent = (0,ol_extent/* getIntersection */.Ed)(maxSourceExtent, sourceProjExtent);
      }
    }

    var targetResolution = targetTileGrid.getResolution(_this.wrappedTileCoord_[0]);
    var sourceResolution = calculateSourceExtentResolution(sourceProj, targetProj, limitedTargetExtent, targetResolution);

    if (!isFinite(sourceResolution) || sourceResolution <= 0) {
      // invalid sourceResolution -> EMPTY
      // probably edges of the projections when no extent is defined
      _this.state = TileState/* default.EMPTY */.Z.EMPTY;
      return _this;
    }

    var errorThresholdInPixels = opt_errorThreshold !== undefined ? opt_errorThreshold : common/* ERROR_THRESHOLD */.m;
    /**
     * @private
     * @type {!import("./Triangulation.js").default}
     */

    _this.triangulation_ = new reproj_Triangulation(sourceProj, targetProj, limitedTargetExtent, maxSourceExtent, sourceResolution * errorThresholdInPixels, targetResolution);

    if (_this.triangulation_.getTriangles().length === 0) {
      // no valid triangles -> EMPTY
      _this.state = TileState/* default.EMPTY */.Z.EMPTY;
      return _this;
    }

    _this.sourceZ_ = sourceTileGrid.getZForResolution(sourceResolution);

    var sourceExtent = _this.triangulation_.calculateSourceExtent();

    if (maxSourceExtent) {
      if (sourceProj.canWrapX()) {
        sourceExtent[1] = (0,math/* clamp */.uZ)(sourceExtent[1], maxSourceExtent[1], maxSourceExtent[3]);
        sourceExtent[3] = (0,math/* clamp */.uZ)(sourceExtent[3], maxSourceExtent[1], maxSourceExtent[3]);
      } else {
        sourceExtent = (0,ol_extent/* getIntersection */.Ed)(sourceExtent, maxSourceExtent);
      }
    }

    if (!(0,ol_extent/* getArea */.bg)(sourceExtent)) {
      _this.state = TileState/* default.EMPTY */.Z.EMPTY;
    } else {
      var sourceRange = sourceTileGrid.getTileRangeForExtentAndZ(sourceExtent, _this.sourceZ_);

      for (var srcX = sourceRange.minX; srcX <= sourceRange.maxX; srcX++) {
        for (var srcY = sourceRange.minY; srcY <= sourceRange.maxY; srcY++) {
          var tile = getTileFunction(_this.sourceZ_, srcX, srcY, pixelRatio);

          if (tile) {
            _this.sourceTiles_.push(tile);
          }
        }
      }

      if (_this.sourceTiles_.length === 0) {
        _this.state = TileState/* default.EMPTY */.Z.EMPTY;
      }
    }

    return _this;
  }
  /**
   * Get the HTML Canvas element for this tile.
   * @return {HTMLCanvasElement} Canvas.
   */


  ReprojTile.prototype.getImage = function () {
    return this.canvas_;
  };
  /**
   * @private
   */


  ReprojTile.prototype.reproject_ = function () {
    var sources = [];
    this.sourceTiles_.forEach(function (tile, i, arr) {
      if (tile && tile.getState() == TileState/* default.LOADED */.Z.LOADED) {
        sources.push({
          extent: this.sourceTileGrid_.getTileCoordExtent(tile.tileCoord),
          image: tile.getImage()
        });
      }
    }.bind(this));
    this.sourceTiles_.length = 0;

    if (sources.length === 0) {
      this.state = TileState/* default.ERROR */.Z.ERROR;
    } else {
      var z = this.wrappedTileCoord_[0];
      var size = this.targetTileGrid_.getTileSize(z);
      var width = typeof size === 'number' ? size : size[0];
      var height = typeof size === 'number' ? size : size[1];
      var targetResolution = this.targetTileGrid_.getResolution(z);
      var sourceResolution = this.sourceTileGrid_.getResolution(this.sourceZ_);
      var targetExtent = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
      this.canvas_ = render(width, height, this.pixelRatio_, sourceResolution, this.sourceTileGrid_.getExtent(), targetResolution, targetExtent, this.triangulation_, sources, this.gutter_, this.renderEdges_, this.contextOptions_);
      this.state = TileState/* default.LOADED */.Z.LOADED;
    }

    this.changed();
  };
  /**
   * Load not yet loaded URI.
   */


  ReprojTile.prototype.load = function () {
    if (this.state == TileState/* default.IDLE */.Z.IDLE) {
      this.state = TileState/* default.LOADING */.Z.LOADING;
      this.changed();
      var leftToLoad_1 = 0;
      this.sourcesListenerKeys_ = [];
      this.sourceTiles_.forEach(function (tile, i, arr) {
        var state = tile.getState();

        if (state == TileState/* default.IDLE */.Z.IDLE || state == TileState/* default.LOADING */.Z.LOADING) {
          leftToLoad_1++;
          var sourceListenKey_1 = (0,events/* listen */.oL)(tile, EventType/* default.CHANGE */.Z.CHANGE, function (e) {
            var state = tile.getState();

            if (state == TileState/* default.LOADED */.Z.LOADED || state == TileState/* default.ERROR */.Z.ERROR || state == TileState/* default.EMPTY */.Z.EMPTY) {
              (0,events/* unlistenByKey */.bN)(sourceListenKey_1);
              leftToLoad_1--;

              if (leftToLoad_1 === 0) {
                this.unlistenSources_();
                this.reproject_();
              }
            }
          }, this);
          this.sourcesListenerKeys_.push(sourceListenKey_1);
        }
      }.bind(this));

      if (leftToLoad_1 === 0) {
        setTimeout(this.reproject_.bind(this), 0);
      } else {
        this.sourceTiles_.forEach(function (tile, i, arr) {
          var state = tile.getState();

          if (state == TileState/* default.IDLE */.Z.IDLE) {
            tile.load();
          }
        });
      }
    }
  };
  /**
   * @private
   */


  ReprojTile.prototype.unlistenSources_ = function () {
    this.sourcesListenerKeys_.forEach(events/* unlistenByKey */.bN);
    this.sourcesListenerKeys_ = null;
  };

  return ReprojTile;
}(Tile/* default */.Z);

/* harmony default export */ const reproj_Tile = (ReprojTile);

/***/ }),

/***/ 3154:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": () => (/* binding */ ENABLE_RASTER_REPROJECTION),
/* harmony export */   "m": () => (/* binding */ ERROR_THRESHOLD)
/* harmony export */ });
/**
 * @module ol/reproj/common
 */

/**
 * Default maximum allowed threshold  (in pixels) for reprojection
 * triangulation.
 * @type {number}
 */
var ERROR_THRESHOLD = 0.5;
/**
 * Enable automatic reprojection of raster sources. Default is `true`.
 * TODO: decide if we want to expose this as a build flag or remove it
 * @type {boolean}
 */

var ENABLE_RASTER_REPROJECTION = true;

/***/ }),

/***/ 2395:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Is": () => (/* binding */ createMinMaxResolution),
/* harmony export */   "cA": () => (/* binding */ createSnapToPower),
/* harmony export */   "gn": () => (/* binding */ createSnapToResolutions)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4495);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1046);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3620);
/**
 * @module ol/resolutionconstraint
 */



/**
 * @typedef {function((number|undefined), number, import("./size.js").Size, boolean=): (number|undefined)} Type
 */

/**
 * Returns a modified resolution taking into account the viewport size and maximum
 * allowed extent.
 * @param {number} resolution Resolution
 * @param {import("./extent.js").Extent} maxExtent Maximum allowed extent.
 * @param {import("./size.js").Size} viewportSize Viewport size.
 * @param {boolean} showFullExtent Whether to show the full extent.
 * @return {number} Capped resolution.
 */

function getViewportClampedResolution(resolution, maxExtent, viewportSize, showFullExtent) {
  var xResolution = (0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .getWidth */ .dz)(maxExtent) / viewportSize[0];
  var yResolution = (0,_extent_js__WEBPACK_IMPORTED_MODULE_0__/* .getHeight */ .Cr)(maxExtent) / viewportSize[1];

  if (showFullExtent) {
    return Math.min(resolution, Math.max(xResolution, yResolution));
  }

  return Math.min(resolution, Math.min(xResolution, yResolution));
}
/**
 * Returns a modified resolution to be between maxResolution and minResolution while
 * still allowing the value to be slightly out of bounds.
 * Note: the computation is based on the logarithm function (ln):
 *  - at 1, ln(x) is 0
 *  - above 1, ln(x) keeps increasing but at a much slower pace than x
 * The final result is clamped to prevent getting too far away from bounds.
 * @param {number} resolution Resolution.
 * @param {number} maxResolution Max resolution.
 * @param {number} minResolution Min resolution.
 * @return {number} Smoothed resolution.
 */


function getSmoothClampedResolution(resolution, maxResolution, minResolution) {
  var result = Math.min(resolution, maxResolution);
  var ratio = 50;
  result *= Math.log(1 + ratio * Math.max(0, resolution / maxResolution - 1)) / ratio + 1;

  if (minResolution) {
    result = Math.max(result, minResolution);
    result /= Math.log(1 + ratio * Math.max(0, minResolution / resolution - 1)) / ratio + 1;
  }

  return (0,_math_js__WEBPACK_IMPORTED_MODULE_1__/* .clamp */ .uZ)(result, minResolution / 2, maxResolution * 2);
}
/**
 * @param {Array<number>} resolutions Resolutions.
 * @param {boolean} [opt_smooth] If true, the view will be able to slightly exceed resolution limits. Default: true.
 * @param {import("./extent.js").Extent} [opt_maxExtent] Maximum allowed extent.
 * @param {boolean} [opt_showFullExtent] If true, allows us to show the full extent. Default: false.
 * @return {Type} Zoom function.
 */


function createSnapToResolutions(resolutions, opt_smooth, opt_maxExtent, opt_showFullExtent) {
  return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean} [opt_isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */
    function (resolution, direction, size, opt_isMoving) {
      if (resolution !== undefined) {
        var maxResolution = resolutions[0];
        var minResolution = resolutions[resolutions.length - 1];
        var cappedMaxRes = opt_maxExtent ? getViewportClampedResolution(maxResolution, opt_maxExtent, size, opt_showFullExtent) : maxResolution; // during interacting or animating, allow intermediary values

        if (opt_isMoving) {
          var smooth = opt_smooth !== undefined ? opt_smooth : true;

          if (!smooth) {
            return (0,_math_js__WEBPACK_IMPORTED_MODULE_1__/* .clamp */ .uZ)(resolution, minResolution, cappedMaxRes);
          }

          return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
        }

        var capped = Math.min(cappedMaxRes, resolution);
        var z = Math.floor((0,_array_js__WEBPACK_IMPORTED_MODULE_2__/* .linearFindNearest */ .h7)(resolutions, capped, direction));

        if (resolutions[z] > cappedMaxRes && z < resolutions.length - 1) {
          return resolutions[z + 1];
        }

        return resolutions[z];
      } else {
        return undefined;
      }
    }
  );
}
/**
 * @param {number} power Power.
 * @param {number} maxResolution Maximum resolution.
 * @param {number} [opt_minResolution] Minimum resolution.
 * @param {boolean} [opt_smooth] If true, the view will be able to slightly exceed resolution limits. Default: true.
 * @param {import("./extent.js").Extent} [opt_maxExtent] Maximum allowed extent.
 * @param {boolean} [opt_showFullExtent] If true, allows us to show the full extent. Default: false.
 * @return {Type} Zoom function.
 */

function createSnapToPower(power, maxResolution, opt_minResolution, opt_smooth, opt_maxExtent, opt_showFullExtent) {
  return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean} [opt_isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */
    function (resolution, direction, size, opt_isMoving) {
      if (resolution !== undefined) {
        var cappedMaxRes = opt_maxExtent ? getViewportClampedResolution(maxResolution, opt_maxExtent, size, opt_showFullExtent) : maxResolution;
        var minResolution = opt_minResolution !== undefined ? opt_minResolution : 0; // during interacting or animating, allow intermediary values

        if (opt_isMoving) {
          var smooth = opt_smooth !== undefined ? opt_smooth : true;

          if (!smooth) {
            return (0,_math_js__WEBPACK_IMPORTED_MODULE_1__/* .clamp */ .uZ)(resolution, minResolution, cappedMaxRes);
          }

          return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
        }

        var tolerance = 1e-9;
        var minZoomLevel = Math.ceil(Math.log(maxResolution / cappedMaxRes) / Math.log(power) - tolerance);
        var offset = -direction * (0.5 - tolerance) + 0.5;
        var capped = Math.min(cappedMaxRes, resolution);
        var cappedZoomLevel = Math.floor(Math.log(maxResolution / capped) / Math.log(power) + offset);
        var zoomLevel = Math.max(minZoomLevel, cappedZoomLevel);
        var newResolution = maxResolution / Math.pow(power, zoomLevel);
        return (0,_math_js__WEBPACK_IMPORTED_MODULE_1__/* .clamp */ .uZ)(newResolution, minResolution, cappedMaxRes);
      } else {
        return undefined;
      }
    }
  );
}
/**
 * @param {number} maxResolution Max resolution.
 * @param {number} minResolution Min resolution.
 * @param {boolean} [opt_smooth] If true, the view will be able to slightly exceed resolution limits. Default: true.
 * @param {import("./extent.js").Extent} [opt_maxExtent] Maximum allowed extent.
 * @param {boolean} [opt_showFullExtent] If true, allows us to show the full extent. Default: false.
 * @return {Type} Zoom function.
 */

function createMinMaxResolution(maxResolution, minResolution, opt_smooth, opt_maxExtent, opt_showFullExtent) {
  return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean} [opt_isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */
    function (resolution, direction, size, opt_isMoving) {
      if (resolution !== undefined) {
        var cappedMaxRes = opt_maxExtent ? getViewportClampedResolution(maxResolution, opt_maxExtent, size, opt_showFullExtent) : maxResolution;
        var smooth = opt_smooth !== undefined ? opt_smooth : true;

        if (!smooth || !opt_isMoving) {
          return (0,_math_js__WEBPACK_IMPORTED_MODULE_1__/* .clamp */ .uZ)(resolution, minResolution, cappedMaxRes);
        }

        return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
      } else {
        return undefined;
      }
    }
  );
}

/***/ }),

/***/ 2270:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gw": () => (/* binding */ createSnapToZero),
/* harmony export */   "YP": () => (/* binding */ none),
/* harmony export */   "gE": () => (/* binding */ createSnapToN),
/* harmony export */   "h$": () => (/* binding */ disable)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4495);
/**
 * @module ol/rotationconstraint
 */

/**
 * @typedef {function((number|undefined), boolean=): (number|undefined)} Type
 */

/**
 * @param {number|undefined} rotation Rotation.
 * @return {number|undefined} Rotation.
 */

function disable(rotation) {
  if (rotation !== undefined) {
    return 0;
  } else {
    return undefined;
  }
}
/**
 * @param {number|undefined} rotation Rotation.
 * @return {number|undefined} Rotation.
 */

function none(rotation) {
  if (rotation !== undefined) {
    return rotation;
  } else {
    return undefined;
  }
}
/**
 * @param {number} n N.
 * @return {Type} Rotation constraint.
 */

function createSnapToN(n) {
  var theta = 2 * Math.PI / n;
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [opt_isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function (rotation, opt_isMoving) {
      if (opt_isMoving) {
        return rotation;
      }

      if (rotation !== undefined) {
        rotation = Math.floor(rotation / theta + 0.5) * theta;
        return rotation;
      } else {
        return undefined;
      }
    }
  );
}
/**
 * @param {number} [opt_tolerance] Tolerance.
 * @return {Type} Rotation constraint.
 */

function createSnapToZero(opt_tolerance) {
  var tolerance = opt_tolerance || (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .toRadians */ .Yr)(5);
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [opt_isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function (rotation, opt_isMoving) {
      if (opt_isMoving) {
        return rotation;
      }

      if (rotation !== undefined) {
        if (Math.abs(rotation) <= tolerance) {
          return 0;
        } else {
          return rotation;
        }
      } else {
        return undefined;
      }
    }
  );
}

/***/ }),

/***/ 7218:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Pq": () => (/* binding */ toSize),
/* harmony export */   "bA": () => (/* binding */ scale),
/* harmony export */   "py": () => (/* binding */ hasArea)
/* harmony export */ });
/* unused harmony export buffer */
/**
 * @module ol/size
 */

/**
 * An array of numbers representing a size: `[width, height]`.
 * @typedef {Array<number>} Size
 * @api
 */

/**
 * Returns a buffered size.
 * @param {Size} size Size.
 * @param {number} num The amount by which to buffer.
 * @param {Size} [opt_size] Optional reusable size array.
 * @return {Size} The buffered size.
 */
function buffer(size, num, opt_size) {
  if (opt_size === undefined) {
    opt_size = [0, 0];
  }

  opt_size[0] = size[0] + 2 * num;
  opt_size[1] = size[1] + 2 * num;
  return opt_size;
}
/**
 * Determines if a size has a positive area.
 * @param {Size} size The size to test.
 * @return {boolean} The size has a positive area.
 */

function hasArea(size) {
  return size[0] > 0 && size[1] > 0;
}
/**
 * Returns a size scaled by a ratio. The result will be an array of integers.
 * @param {Size} size Size.
 * @param {number} ratio Ratio.
 * @param {Size} [opt_size] Optional reusable size array.
 * @return {Size} The scaled size.
 */

function scale(size, ratio, opt_size) {
  if (opt_size === undefined) {
    opt_size = [0, 0];
  }

  opt_size[0] = size[0] * ratio + 0.5 | 0;
  opt_size[1] = size[1] * ratio + 0.5 | 0;
  return opt_size;
}
/**
 * Returns an `Size` array for the passed in number (meaning: square) or
 * `Size` array.
 * (meaning: non-square),
 * @param {number|Size} size Width and height.
 * @param {Size} [opt_size] Optional reusable size array.
 * @return {Size} Size.
 * @api
 */

function toSize(size, opt_size) {
  if (Array.isArray(size)) {
    return size;
  } else {
    if (opt_size === undefined) {
      opt_size = [size, size];
    } else {
      opt_size[0] = size;
      opt_size[1] = size;
    }

    return opt_size;
  }
}

/***/ })

}]);