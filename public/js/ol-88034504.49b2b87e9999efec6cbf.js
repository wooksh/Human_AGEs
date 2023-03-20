"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[300],{

/***/ 1184:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Df": () => (/* binding */ defaultFont),
/* harmony export */   "GK": () => (/* binding */ labelCache),
/* harmony export */   "He": () => (/* binding */ defaultLineDashOffset),
/* harmony export */   "Kd": () => (/* binding */ measureAndCacheTextWidth),
/* harmony export */   "PH": () => (/* binding */ defaultTextAlign),
/* harmony export */   "Qx": () => (/* binding */ registerFont),
/* harmony export */   "Tx": () => (/* binding */ defaultStrokeStyle),
/* harmony export */   "V4": () => (/* binding */ defaultMiterLimit),
/* harmony export */   "X9": () => (/* binding */ defaultLineDash),
/* harmony export */   "_f": () => (/* binding */ drawImageOrLabel),
/* harmony export */   "bL": () => (/* binding */ defaultFillStyle),
/* harmony export */   "fk": () => (/* binding */ measureTextHeight),
/* harmony export */   "gs": () => (/* binding */ measureTextWidths),
/* harmony export */   "mb": () => (/* binding */ defaultLineCap),
/* harmony export */   "oB": () => (/* binding */ defaultPadding),
/* harmony export */   "rc": () => (/* binding */ defaultLineJoin),
/* harmony export */   "ru": () => (/* binding */ defaultTextBaseline),
/* harmony export */   "sG": () => (/* binding */ checkedFonts),
/* harmony export */   "yC": () => (/* binding */ defaultLineWidth)
/* harmony export */ });
/* unused harmony exports textHeights, measureTextWidth, rotateAtOffset */
/* harmony import */ var _Object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7182);
/* harmony import */ var _events_Target_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9699);
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4242);
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9800);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9631);
/* harmony import */ var _css_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9285);
/**
 * @module ol/render/canvas
 */






/**
 * @typedef {Object} FillState
 * @property {import("../colorlike.js").ColorLike} fillStyle FillStyle.
 */

/**
 * @typedef Label
 * @property {number} width Width.
 * @property {number} height Height.
 * @property {Array<string|number>} contextInstructions ContextInstructions.
 */

/**
 * @typedef {Object} FillStrokeState
 * @property {import("../colorlike.js").ColorLike} [currentFillStyle] Current FillStyle.
 * @property {import("../colorlike.js").ColorLike} [currentStrokeStyle] Current StrokeStyle.
 * @property {CanvasLineCap} [currentLineCap] Current LineCap.
 * @property {Array<number>} currentLineDash Current LineDash.
 * @property {number} [currentLineDashOffset] Current LineDashOffset.
 * @property {CanvasLineJoin} [currentLineJoin] Current LineJoin.
 * @property {number} [currentLineWidth] Current LineWidth.
 * @property {number} [currentMiterLimit] Current MiterLimit.
 * @property {number} [lastStroke] Last stroke.
 * @property {import("../colorlike.js").ColorLike} [fillStyle] FillStyle.
 * @property {import("../colorlike.js").ColorLike} [strokeStyle] StrokeStyle.
 * @property {CanvasLineCap} [lineCap] LineCap.
 * @property {Array<number>} lineDash LineDash.
 * @property {number} [lineDashOffset] LineDashOffset.
 * @property {CanvasLineJoin} [lineJoin] LineJoin.
 * @property {number} [lineWidth] LineWidth.
 * @property {number} [miterLimit] MiterLimit.
 */

/**
 * @typedef {Object} StrokeState
 * @property {CanvasLineCap} lineCap LineCap.
 * @property {Array<number>} lineDash LineDash.
 * @property {number} lineDashOffset LineDashOffset.
 * @property {CanvasLineJoin} lineJoin LineJoin.
 * @property {number} lineWidth LineWidth.
 * @property {number} miterLimit MiterLimit.
 * @property {import("../colorlike.js").ColorLike} strokeStyle StrokeStyle.
 */

/**
 * @typedef {Object} TextState
 * @property {string} font Font.
 * @property {string} [textAlign] TextAlign.
 * @property {string} textBaseline TextBaseline.
 * @property {string} [placement] Placement.
 * @property {number} [maxAngle] MaxAngle.
 * @property {boolean} [overflow] Overflow.
 * @property {import("../style/Fill.js").default} [backgroundFill] BackgroundFill.
 * @property {import("../style/Stroke.js").default} [backgroundStroke] BackgroundStroke.
 * @property {import("../size.js").Size} [scale] Scale.
 * @property {Array<number>} [padding] Padding.
 */

/**
 * @typedef {Object} SerializableInstructions
 * @property {Array<*>} instructions The rendering instructions.
 * @property {Array<*>} hitDetectionInstructions The rendering hit detection instructions.
 * @property {Array<number>} coordinates The array of all coordinates.
 * @property {!Object<string, TextState>} [textStates] The text states (decluttering).
 * @property {!Object<string, FillState>} [fillStates] The fill states (decluttering).
 * @property {!Object<string, StrokeState>} [strokeStates] The stroke states (decluttering).
 */

/**
 * @typedef {Object<number, import("./canvas/Executor.js").ReplayImageOrLabelArgs>} DeclutterImageWithText
 */

/**
 * @const
 * @type {string}
 */

var defaultFont = '10px sans-serif';
/**
 * @const
 * @type {import("../colorlike.js").ColorLike}
 */

var defaultFillStyle = '#000';
/**
 * @const
 * @type {CanvasLineCap}
 */

var defaultLineCap = 'round';
/**
 * @const
 * @type {Array<number>}
 */

var defaultLineDash = [];
/**
 * @const
 * @type {number}
 */

var defaultLineDashOffset = 0;
/**
 * @const
 * @type {CanvasLineJoin}
 */

var defaultLineJoin = 'round';
/**
 * @const
 * @type {number}
 */

var defaultMiterLimit = 10;
/**
 * @const
 * @type {import("../colorlike.js").ColorLike}
 */

var defaultStrokeStyle = '#000';
/**
 * @const
 * @type {string}
 */

var defaultTextAlign = 'center';
/**
 * @const
 * @type {string}
 */

var defaultTextBaseline = 'middle';
/**
 * @const
 * @type {Array<number>}
 */

var defaultPadding = [0, 0, 0, 0];
/**
 * @const
 * @type {number}
 */

var defaultLineWidth = 1;
/**
 * @type {BaseObject}
 */

var checkedFonts = new _Object_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z();
/**
 * The label cache for text rendering. To change the default cache size of 2048
 * entries, use {@link module:ol/structs/LRUCache~LRUCache#setSize cache.setSize()}.
 * Deprecated - there is no label cache any more.
 * @type {?}
 * @api
 * @deprecated
 */

var labelCache = new _events_Target_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z();

labelCache.setSize = function () {
  console.warn('labelCache is deprecated.'); //eslint-disable-line
};
/**
 * @type {CanvasRenderingContext2D}
 */


var measureContext = null;
/**
 * @type {string}
 */

var measureFont;
/**
 * @type {!Object<string, number>}
 */

var textHeights = {};
/**
 * Clears the label cache when a font becomes available.
 * @param {string} fontSpec CSS font spec.
 */

var registerFont = function () {
  var retries = 100;
  var size = '32px ';
  var referenceFonts = ['monospace', 'serif'];
  var len = referenceFonts.length;
  var text = 'wmytzilWMYTZIL@#/&?$%10\uF013';
  var interval, referenceWidth;
  /**
   * @param {string} fontStyle Css font-style
   * @param {string} fontWeight Css font-weight
   * @param {*} fontFamily Css font-family
   * @return {boolean} Font with style and weight is available
   */

  function isAvailable(fontStyle, fontWeight, fontFamily) {
    var available = true;

    for (var i = 0; i < len; ++i) {
      var referenceFont = referenceFonts[i];
      referenceWidth = measureTextWidth(fontStyle + ' ' + fontWeight + ' ' + size + referenceFont, text);

      if (fontFamily != referenceFont) {
        var width = measureTextWidth(fontStyle + ' ' + fontWeight + ' ' + size + fontFamily + ',' + referenceFont, text); // If width and referenceWidth are the same, then the fallback was used
        // instead of the font we wanted, so the font is not available.

        available = available && width != referenceWidth;
      }
    }

    if (available) {
      return true;
    }

    return false;
  }

  function check() {
    var done = true;
    var fonts = checkedFonts.getKeys();

    for (var i = 0, ii = fonts.length; i < ii; ++i) {
      var font = fonts[i];

      if (checkedFonts.get(font) < retries) {
        if (isAvailable.apply(this, font.split('\n'))) {
          (0,_obj_js__WEBPACK_IMPORTED_MODULE_2__/* .clear */ .ZH)(textHeights); // Make sure that loaded fonts are picked up by Safari

          measureContext = null;
          measureFont = undefined;
          checkedFonts.set(font, retries);
        } else {
          checkedFonts.set(font, checkedFonts.get(font) + 1, true);
          done = false;
        }
      }
    }

    if (done) {
      clearInterval(interval);
      interval = undefined;
    }
  }

  return function (fontSpec) {
    var font = (0,_css_js__WEBPACK_IMPORTED_MODULE_3__/* .getFontParameters */ .p)(fontSpec);

    if (!font) {
      return;
    }

    var families = font.families;

    for (var i = 0, ii = families.length; i < ii; ++i) {
      var family = families[i];
      var key = font.style + '\n' + font.weight + '\n' + family;

      if (checkedFonts.get(key) === undefined) {
        checkedFonts.set(key, retries, true);

        if (!isAvailable(font.style, font.weight, family)) {
          checkedFonts.set(key, 0, true);

          if (interval === undefined) {
            interval = setInterval(check, 32);
          }
        }
      }
    }
  };
}();
/**
 * @param {string} font Font to use for measuring.
 * @return {import("../size.js").Size} Measurement.
 */

var measureTextHeight = function () {
  /**
   * @type {HTMLDivElement}
   */
  var measureElement;
  return function (fontSpec) {
    var height = textHeights[fontSpec];

    if (height == undefined) {
      if (_has_js__WEBPACK_IMPORTED_MODULE_4__/* .WORKER_OFFSCREEN_CANVAS */ .Id) {
        var font = (0,_css_js__WEBPACK_IMPORTED_MODULE_3__/* .getFontParameters */ .p)(fontSpec);
        var metrics = measureText(fontSpec, 'Žg');
        var lineHeight = isNaN(Number(font.lineHeight)) ? 1.2 : Number(font.lineHeight);
        height = lineHeight * (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
      } else {
        if (!measureElement) {
          measureElement = document.createElement('div');
          measureElement.innerHTML = 'M';
          measureElement.style.minHeight = '0';
          measureElement.style.maxHeight = 'none';
          measureElement.style.height = 'auto';
          measureElement.style.padding = '0';
          measureElement.style.border = 'none';
          measureElement.style.position = 'absolute';
          measureElement.style.display = 'block';
          measureElement.style.left = '-99999px';
        }

        measureElement.style.font = fontSpec;
        document.body.appendChild(measureElement);
        height = measureElement.offsetHeight;
        document.body.removeChild(measureElement);
      }

      textHeights[fontSpec] = height;
    }

    return height;
  };
}();
/**
 * @param {string} font Font.
 * @param {string} text Text.
 * @return {TextMetrics} Text metrics.
 */

function measureText(font, text) {
  if (!measureContext) {
    measureContext = (0,_dom_js__WEBPACK_IMPORTED_MODULE_5__/* .createCanvasContext2D */ .E4)(1, 1);
  }

  if (font != measureFont) {
    measureContext.font = font;
    measureFont = measureContext.font;
  }

  return measureContext.measureText(text);
}
/**
 * @param {string} font Font.
 * @param {string} text Text.
 * @return {number} Width.
 */


function measureTextWidth(font, text) {
  return measureText(font, text).width;
}
/**
 * Measure text width using a cache.
 * @param {string} font The font.
 * @param {string} text The text to measure.
 * @param {Object<string, number>} cache A lookup of cached widths by text.
 * @return {number} The text width.
 */

function measureAndCacheTextWidth(font, text, cache) {
  if (text in cache) {
    return cache[text];
  }

  var width = measureTextWidth(font, text);
  cache[text] = width;
  return width;
}
/**
 * @param {string} font Font to use for measuring.
 * @param {Array<string>} lines Lines to measure.
 * @param {Array<number>} widths Array will be populated with the widths of
 * each line.
 * @return {number} Width of the whole text.
 */

function measureTextWidths(font, lines, widths) {
  var numLines = lines.length;
  var width = 0;

  for (var i = 0; i < numLines; ++i) {
    var currentWidth = measureTextWidth(font, lines[i]);
    width = Math.max(width, currentWidth);
    widths.push(currentWidth);
  }

  return width;
}
/**
 * @param {CanvasRenderingContext2D} context Context.
 * @param {number} rotation Rotation.
 * @param {number} offsetX X offset.
 * @param {number} offsetY Y offset.
 */

function rotateAtOffset(context, rotation, offsetX, offsetY) {
  if (rotation !== 0) {
    context.translate(offsetX, offsetY);
    context.rotate(rotation);
    context.translate(-offsetX, -offsetY);
  }
}
/**
 * @param {CanvasRenderingContext2D} context Context.
 * @param {import("../transform.js").Transform|null} transform Transform.
 * @param {number} opacity Opacity.
 * @param {Label|HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} labelOrImage Label.
 * @param {number} originX Origin X.
 * @param {number} originY Origin Y.
 * @param {number} w Width.
 * @param {number} h Height.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {import("../size.js").Size} scale Scale.
 */

function drawImageOrLabel(context, transform, opacity, labelOrImage, originX, originY, w, h, x, y, scale) {
  context.save();

  if (opacity !== 1) {
    context.globalAlpha *= opacity;
  }

  if (transform) {
    context.setTransform.apply(context, transform);
  }

  if (
  /** @type {*} */
  labelOrImage.contextInstructions) {
    // label
    context.translate(x, y);
    context.scale(scale[0], scale[1]);
    executeLabelInstructions(
    /** @type {Label} */
    labelOrImage, context);
  } else if (scale[0] < 0 || scale[1] < 0) {
    // flipped image
    context.translate(x, y);
    context.scale(scale[0], scale[1]);
    context.drawImage(
    /** @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} */
    labelOrImage, originX, originY, w, h, 0, 0, w, h);
  } else {
    // if image not flipped translate and scale can be avoided
    context.drawImage(
    /** @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} */
    labelOrImage, originX, originY, w, h, x, y, w * scale[0], h * scale[1]);
  }

  context.restore();
}
/**
 * @param {Label} label Label.
 * @param {CanvasRenderingContext2D} context Context.
 */

function executeLabelInstructions(label, context) {
  var contextInstructions = label.contextInstructions;

  for (var i = 0, ii = contextInstructions.length; i < ii; i += 2) {
    if (Array.isArray(contextInstructions[i + 1])) {
      context[contextInstructions[i]].apply(context, contextInstructions[i + 1]);
    } else {
      context[contextInstructions[i]] = contextInstructions[i + 1];
    }
  }
}

/***/ }),

/***/ 1283:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ canvas_ExecutorGroup)
});

// UNUSED EXPORTS: getPixelIndexArray

// EXTERNAL MODULE: ./node_modules/ol/render/canvas/BuilderType.js
var BuilderType = __webpack_require__(6175);
// EXTERNAL MODULE: ./node_modules/ol/render/canvas/Instruction.js
var Instruction = __webpack_require__(9506);
// EXTERNAL MODULE: ./node_modules/ol/render/canvas/TextBuilder.js
var TextBuilder = __webpack_require__(7353);
// EXTERNAL MODULE: ./node_modules/ol/has.js
var has = __webpack_require__(4242);
// EXTERNAL MODULE: ./node_modules/ol/transform.js
var ol_transform = __webpack_require__(8975);
// EXTERNAL MODULE: ./node_modules/ol/extent.js
var extent = __webpack_require__(1046);
// EXTERNAL MODULE: ./node_modules/ol/render/canvas.js
var render_canvas = __webpack_require__(1184);
// EXTERNAL MODULE: ./node_modules/ol/geom/flat/textpath.js
var textpath = __webpack_require__(852);
// EXTERNAL MODULE: ./node_modules/ol/array.js
var array = __webpack_require__(3620);
// EXTERNAL MODULE: ./node_modules/ol/geom/flat/length.js
var flat_length = __webpack_require__(9736);
// EXTERNAL MODULE: ./node_modules/ol/geom/flat/transform.js
var flat_transform = __webpack_require__(6929);
;// CONCATENATED MODULE: ./node_modules/ol/render/canvas/Executor.js
/**
 * @module ol/render/canvas/Executor
 */











/**
 * @typedef {Object} BBox
 * @property {number} minX Minimal x.
 * @property {number} minY Minimal y.
 * @property {number} maxX Maximal x.
 * @property {number} maxY Maximal y
 * @property {*} value Value.
 */

/**
 * @typedef {Object} ImageOrLabelDimensions
 * @property {number} drawImageX DrawImageX.
 * @property {number} drawImageY DrawImageY.
 * @property {number} drawImageW DrawImageW.
 * @property {number} drawImageH DrawImageH.
 * @property {number} originX OriginX.
 * @property {number} originY OriginY.
 * @property {Array<number>} scale Scale.
 * @property {BBox} declutterBox DeclutterBox.
 * @property {import("../../transform.js").Transform} canvasTransform CanvasTransform.
 */

/**
 * @typedef {{0: CanvasRenderingContext2D, 1: number, 2: import("../canvas.js").Label|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement, 3: ImageOrLabelDimensions, 4: number, 5: Array<*>, 6: Array<*>}} ReplayImageOrLabelArgs
 */

/**
 * @template T
 * @typedef {function(import("../../Feature.js").FeatureLike, import("../../geom/SimpleGeometry.js").default): T} FeatureCallback
 */

/**
 * @type {import("../../extent.js").Extent}
 */

var tmpExtent = (0,extent/* createEmpty */.lJ)();
/** @type {import("../../coordinate.js").Coordinate} */

var p1 = [];
/** @type {import("../../coordinate.js").Coordinate} */

var p2 = [];
/** @type {import("../../coordinate.js").Coordinate} */

var p3 = [];
/** @type {import("../../coordinate.js").Coordinate} */

var p4 = [];
/**
 * @param {ReplayImageOrLabelArgs} replayImageOrLabelArgs Arguments to replayImageOrLabel
 * @return {BBox} Declutter bbox.
 */

function getDeclutterBox(replayImageOrLabelArgs) {
  return replayImageOrLabelArgs[3].declutterBox;
}

var rtlRegEx = new RegExp(
/* eslint-disable prettier/prettier */
'[' + String.fromCharCode(0x00591) + '-' + String.fromCharCode(0x008ff) + String.fromCharCode(0x0fb1d) + '-' + String.fromCharCode(0x0fdff) + String.fromCharCode(0x0fe70) + '-' + String.fromCharCode(0x0fefc) + String.fromCharCode(0x10800) + '-' + String.fromCharCode(0x10fff) + String.fromCharCode(0x1e800) + '-' + String.fromCharCode(0x1efff) + ']'
/* eslint-enable prettier/prettier */
);
/**
 * @param {string} text Text.
 * @param {string} align Alignment.
 * @return {number} Text alignment.
 */

function horizontalTextAlign(text, align) {
  if ((align === 'start' || align === 'end') && !rtlRegEx.test(text)) {
    align = align === 'start' ? 'left' : 'right';
  }

  return TextBuilder/* TEXT_ALIGN */.I[align];
}

var Executor =
/** @class */
function () {
  /**
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {boolean} overlaps The replay can have overlapping geometries.
   * @param {import("../canvas.js").SerializableInstructions} instructions The serializable instructions
   */
  function Executor(resolution, pixelRatio, overlaps, instructions) {
    /**
     * @protected
     * @type {boolean}
     */
    this.overlaps = overlaps;
    /**
     * @protected
     * @type {number}
     */

    this.pixelRatio = pixelRatio;
    /**
     * @protected
     * @const
     * @type {number}
     */

    this.resolution = resolution;
    /**
     * @private
     * @type {boolean}
     */

    this.alignFill_;
    /**
     * @protected
     * @type {Array<*>}
     */

    this.instructions = instructions.instructions;
    /**
     * @protected
     * @type {Array<number>}
     */

    this.coordinates = instructions.coordinates;
    /**
     * @private
     * @type {!Object<number,import("../../coordinate.js").Coordinate|Array<import("../../coordinate.js").Coordinate>|Array<Array<import("../../coordinate.js").Coordinate>>>}
     */

    this.coordinateCache_ = {};
    /**
     * @private
     * @type {!import("../../transform.js").Transform}
     */

    this.renderedTransform_ = (0,ol_transform/* create */.Ue)();
    /**
     * @protected
     * @type {Array<*>}
     */

    this.hitDetectionInstructions = instructions.hitDetectionInstructions;
    /**
     * @private
     * @type {Array<number>}
     */

    this.pixelCoordinates_ = null;
    /**
     * @private
     * @type {number}
     */

    this.viewRotation_ = 0;
    /**
     * @type {!Object<string, import("../canvas.js").FillState>}
     */

    this.fillStates = instructions.fillStates || {};
    /**
     * @type {!Object<string, import("../canvas.js").StrokeState>}
     */

    this.strokeStates = instructions.strokeStates || {};
    /**
     * @type {!Object<string, import("../canvas.js").TextState>}
     */

    this.textStates = instructions.textStates || {};
    /**
     * @private
     * @type {Object<string, Object<string, number>>}
     */

    this.widths_ = {};
    /**
     * @private
     * @type {Object<string, import("../canvas.js").Label>}
     */

    this.labels_ = {};
  }
  /**
   * @param {string} text Text.
   * @param {string} textKey Text style key.
   * @param {string} fillKey Fill style key.
   * @param {string} strokeKey Stroke style key.
   * @return {import("../canvas.js").Label} Label.
   */


  Executor.prototype.createLabel = function (text, textKey, fillKey, strokeKey) {
    var key = text + textKey + fillKey + strokeKey;

    if (this.labels_[key]) {
      return this.labels_[key];
    }

    var strokeState = strokeKey ? this.strokeStates[strokeKey] : null;
    var fillState = fillKey ? this.fillStates[fillKey] : null;
    var textState = this.textStates[textKey];
    var pixelRatio = this.pixelRatio;
    var scale = [textState.scale[0] * pixelRatio, textState.scale[1] * pixelRatio];
    var align = horizontalTextAlign(text, textState.textAlign || render_canvas/* defaultTextAlign */.PH);
    var strokeWidth = strokeKey && strokeState.lineWidth ? strokeState.lineWidth : 0;
    var lines = text.split('\n');
    var numLines = lines.length;
    var widths = [];
    var width = (0,render_canvas/* measureTextWidths */.gs)(textState.font, lines, widths);
    var lineHeight = (0,render_canvas/* measureTextHeight */.fk)(textState.font);
    var height = lineHeight * numLines;
    var renderWidth = width + strokeWidth;
    var contextInstructions = []; // make canvas 2 pixels wider to account for italic text width measurement errors

    var w = (renderWidth + 2) * scale[0];
    var h = (height + strokeWidth) * scale[1];
    /** @type {import("../canvas.js").Label} */

    var label = {
      width: w < 0 ? Math.floor(w) : Math.ceil(w),
      height: h < 0 ? Math.floor(h) : Math.ceil(h),
      contextInstructions: contextInstructions
    };

    if (scale[0] != 1 || scale[1] != 1) {
      contextInstructions.push('scale', scale);
    }

    contextInstructions.push('font', textState.font);

    if (strokeKey) {
      contextInstructions.push('strokeStyle', strokeState.strokeStyle);
      contextInstructions.push('lineWidth', strokeWidth);
      contextInstructions.push('lineCap', strokeState.lineCap);
      contextInstructions.push('lineJoin', strokeState.lineJoin);
      contextInstructions.push('miterLimit', strokeState.miterLimit); // eslint-disable-next-line

      var Context = has/* WORKER_OFFSCREEN_CANVAS */.Id ? OffscreenCanvasRenderingContext2D : CanvasRenderingContext2D;

      if (Context.prototype.setLineDash) {
        contextInstructions.push('setLineDash', [strokeState.lineDash]);
        contextInstructions.push('lineDashOffset', strokeState.lineDashOffset);
      }
    }

    if (fillKey) {
      contextInstructions.push('fillStyle', fillState.fillStyle);
    }

    contextInstructions.push('textBaseline', 'middle');
    contextInstructions.push('textAlign', 'center');
    var leftRight = 0.5 - align;
    var x = align * renderWidth + leftRight * strokeWidth;
    var i;

    if (strokeKey) {
      for (i = 0; i < numLines; ++i) {
        contextInstructions.push('strokeText', [lines[i], x + leftRight * widths[i], 0.5 * (strokeWidth + lineHeight) + i * lineHeight]);
      }
    }

    if (fillKey) {
      for (i = 0; i < numLines; ++i) {
        contextInstructions.push('fillText', [lines[i], x + leftRight * widths[i], 0.5 * (strokeWidth + lineHeight) + i * lineHeight]);
      }
    }

    this.labels_[key] = label;
    return label;
  };
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../coordinate.js").Coordinate} p1 1st point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p2 2nd point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p3 3rd point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p4 4th point of the background box.
   * @param {Array<*>} fillInstruction Fill instruction.
   * @param {Array<*>} strokeInstruction Stroke instruction.
   */


  Executor.prototype.replayTextBackground_ = function (context, p1, p2, p3, p4, fillInstruction, strokeInstruction) {
    context.beginPath();
    context.moveTo.apply(context, p1);
    context.lineTo.apply(context, p2);
    context.lineTo.apply(context, p3);
    context.lineTo.apply(context, p4);
    context.lineTo.apply(context, p1);

    if (fillInstruction) {
      this.alignFill_ =
      /** @type {boolean} */
      fillInstruction[2];
      this.fill_(context);
    }

    if (strokeInstruction) {
      this.setStrokeStyle_(context,
      /** @type {Array<*>} */
      strokeInstruction);
      context.stroke();
    }
  };
  /**
   * @private
   * @param {number} sheetWidth Width of the sprite sheet.
   * @param {number} sheetHeight Height of the sprite sheet.
   * @param {number} centerX X.
   * @param {number} centerY Y.
   * @param {number} width Width.
   * @param {number} height Height.
   * @param {number} anchorX Anchor X.
   * @param {number} anchorY Anchor Y.
   * @param {number} originX Origin X.
   * @param {number} originY Origin Y.
   * @param {number} rotation Rotation.
   * @param {import("../../size.js").Size} scale Scale.
   * @param {boolean} snapToPixel Snap to pixel.
   * @param {Array<number>} padding Padding.
   * @param {boolean} fillStroke Background fill or stroke.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @return {ImageOrLabelDimensions} Dimensions for positioning and decluttering the image or label.
   */


  Executor.prototype.calculateImageOrLabelDimensions_ = function (sheetWidth, sheetHeight, centerX, centerY, width, height, anchorX, anchorY, originX, originY, rotation, scale, snapToPixel, padding, fillStroke, feature) {
    anchorX *= scale[0];
    anchorY *= scale[1];
    var x = centerX - anchorX;
    var y = centerY - anchorY;
    var w = width + originX > sheetWidth ? sheetWidth - originX : width;
    var h = height + originY > sheetHeight ? sheetHeight - originY : height;
    var boxW = padding[3] + w * scale[0] + padding[1];
    var boxH = padding[0] + h * scale[1] + padding[2];
    var boxX = x - padding[3];
    var boxY = y - padding[0];

    if (fillStroke || rotation !== 0) {
      p1[0] = boxX;
      p4[0] = boxX;
      p1[1] = boxY;
      p2[1] = boxY;
      p2[0] = boxX + boxW;
      p3[0] = p2[0];
      p3[1] = boxY + boxH;
      p4[1] = p3[1];
    }

    var transform;

    if (rotation !== 0) {
      transform = (0,ol_transform/* compose */.qC)((0,ol_transform/* create */.Ue)(), centerX, centerY, 1, 1, rotation, -centerX, -centerY);
      (0,ol_transform/* apply */.nn)(transform, p1);
      (0,ol_transform/* apply */.nn)(transform, p2);
      (0,ol_transform/* apply */.nn)(transform, p3);
      (0,ol_transform/* apply */.nn)(transform, p4);
      (0,extent/* createOrUpdate */.T9)(Math.min(p1[0], p2[0], p3[0], p4[0]), Math.min(p1[1], p2[1], p3[1], p4[1]), Math.max(p1[0], p2[0], p3[0], p4[0]), Math.max(p1[1], p2[1], p3[1], p4[1]), tmpExtent);
    } else {
      (0,extent/* createOrUpdate */.T9)(Math.min(boxX, boxX + boxW), Math.min(boxY, boxY + boxH), Math.max(boxX, boxX + boxW), Math.max(boxY, boxY + boxH), tmpExtent);
    }

    if (snapToPixel) {
      x = Math.round(x);
      y = Math.round(y);
    }

    return {
      drawImageX: x,
      drawImageY: y,
      drawImageW: w,
      drawImageH: h,
      originX: originX,
      originY: originY,
      declutterBox: {
        minX: tmpExtent[0],
        minY: tmpExtent[1],
        maxX: tmpExtent[2],
        maxY: tmpExtent[3],
        value: feature
      },
      canvasTransform: transform,
      scale: scale
    };
  };
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} contextScale Scale of the context.
   * @param {import("../canvas.js").Label|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} imageOrLabel Image.
   * @param {ImageOrLabelDimensions} dimensions Dimensions.
   * @param {number} opacity Opacity.
   * @param {Array<*>} fillInstruction Fill instruction.
   * @param {Array<*>} strokeInstruction Stroke instruction.
   * @return {boolean} The image or label was rendered.
   */


  Executor.prototype.replayImageOrLabel_ = function (context, contextScale, imageOrLabel, dimensions, opacity, fillInstruction, strokeInstruction) {
    var fillStroke = !!(fillInstruction || strokeInstruction);
    var box = dimensions.declutterBox;
    var canvas = context.canvas;
    var strokePadding = strokeInstruction ? strokeInstruction[2] * dimensions.scale[0] / 2 : 0;
    var intersects = box.minX - strokePadding <= canvas.width / contextScale && box.maxX + strokePadding >= 0 && box.minY - strokePadding <= canvas.height / contextScale && box.maxY + strokePadding >= 0;

    if (intersects) {
      if (fillStroke) {
        this.replayTextBackground_(context, p1, p2, p3, p4,
        /** @type {Array<*>} */
        fillInstruction,
        /** @type {Array<*>} */
        strokeInstruction);
      }

      (0,render_canvas/* drawImageOrLabel */._f)(context, dimensions.canvasTransform, opacity, imageOrLabel, dimensions.originX, dimensions.originY, dimensions.drawImageW, dimensions.drawImageH, dimensions.drawImageX, dimensions.drawImageY, dimensions.scale);
    }

    return true;
  };
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   */


  Executor.prototype.fill_ = function (context) {
    if (this.alignFill_) {
      var origin_1 = (0,ol_transform/* apply */.nn)(this.renderedTransform_, [0, 0]);
      var repeatSize = 512 * this.pixelRatio;
      context.save();
      context.translate(origin_1[0] % repeatSize, origin_1[1] % repeatSize);
      context.rotate(this.viewRotation_);
    }

    context.fill();

    if (this.alignFill_) {
      context.restore();
    }
  };
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {Array<*>} instruction Instruction.
   */


  Executor.prototype.setStrokeStyle_ = function (context, instruction) {
    context['strokeStyle'] =
    /** @type {import("../../colorlike.js").ColorLike} */
    instruction[1];
    context.lineWidth =
    /** @type {number} */
    instruction[2];
    context.lineCap =
    /** @type {CanvasLineCap} */
    instruction[3];
    context.lineJoin =
    /** @type {CanvasLineJoin} */
    instruction[4];
    context.miterLimit =
    /** @type {number} */
    instruction[5];

    if (context.setLineDash) {
      context.lineDashOffset =
      /** @type {number} */
      instruction[7];
      context.setLineDash(
      /** @type {Array<number>} */
      instruction[6]);
    }
  };
  /**
   * @private
   * @param {string} text The text to draw.
   * @param {string} textKey The key of the text state.
   * @param {string} strokeKey The key for the stroke state.
   * @param {string} fillKey The key for the fill state.
   * @return {{label: import("../canvas.js").Label, anchorX: number, anchorY: number}} The text image and its anchor.
   */


  Executor.prototype.drawLabelWithPointPlacement_ = function (text, textKey, strokeKey, fillKey) {
    var textState = this.textStates[textKey];
    var label = this.createLabel(text, textKey, fillKey, strokeKey);
    var strokeState = this.strokeStates[strokeKey];
    var pixelRatio = this.pixelRatio;
    var align = horizontalTextAlign(text, textState.textAlign || render_canvas/* defaultTextAlign */.PH);
    var baseline = TextBuilder/* TEXT_ALIGN */.I[textState.textBaseline || render_canvas/* defaultTextBaseline */.ru];
    var strokeWidth = strokeState && strokeState.lineWidth ? strokeState.lineWidth : 0; // Remove the 2 pixels we added in createLabel() for the anchor

    var width = label.width / pixelRatio - 2 * textState.scale[0];
    var anchorX = align * width + 2 * (0.5 - align) * strokeWidth;
    var anchorY = baseline * label.height / pixelRatio + 2 * (0.5 - baseline) * strokeWidth;
    return {
      label: label,
      anchorX: anchorX,
      anchorY: anchorY
    };
  };
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} contextScale Scale of the context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {Array<*>} instructions Instructions array.
   * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
   * @param {FeatureCallback<T>} [opt_featureCallback] Feature callback.
   * @param {import("../../extent.js").Extent} [opt_hitExtent] Only check
   *     features that intersect this extent.
   * @param {import("rbush").default} [opt_declutterTree] Declutter tree.
   * @return {T|undefined} Callback result.
   * @template T
   */


  Executor.prototype.execute_ = function (context, contextScale, transform, instructions, snapToPixel, opt_featureCallback, opt_hitExtent, opt_declutterTree) {
    /** @type {Array<number>} */
    var pixelCoordinates;

    if (this.pixelCoordinates_ && (0,array/* equals */.fS)(transform, this.renderedTransform_)) {
      pixelCoordinates = this.pixelCoordinates_;
    } else {
      if (!this.pixelCoordinates_) {
        this.pixelCoordinates_ = [];
      }

      pixelCoordinates = (0,flat_transform/* transform2D */.vT)(this.coordinates, 0, this.coordinates.length, 2, transform, this.pixelCoordinates_);
      (0,ol_transform/* setFromArray */.lk)(this.renderedTransform_, transform);
    }

    var i = 0; // instruction index

    var ii = instructions.length; // end of instructions

    var d = 0; // data index

    var dd; // end of per-instruction data

    var anchorX, anchorY, prevX, prevY, roundX, roundY, image, text, textKey, strokeKey, fillKey;
    var pendingFill = 0;
    var pendingStroke = 0;
    var lastFillInstruction = null;
    var lastStrokeInstruction = null;
    var coordinateCache = this.coordinateCache_;
    var viewRotation = this.viewRotation_;
    var viewRotationFromTransform = Math.round(Math.atan2(-transform[1], transform[0]) * 1e12) / 1e12;
    var state =
    /** @type {import("../../render.js").State} */
    {
      context: context,
      pixelRatio: this.pixelRatio,
      resolution: this.resolution,
      rotation: viewRotation
    }; // When the batch size gets too big, performance decreases. 200 is a good
    // balance between batch size and number of fill/stroke instructions.

    var batchSize = this.instructions != instructions || this.overlaps ? 0 : 200;
    var
    /** @type {import("../../Feature.js").FeatureLike} */
    feature;
    var x, y, currentGeometry;

    while (i < ii) {
      var instruction = instructions[i];
      var type =
      /** @type {import("./Instruction.js").default} */
      instruction[0];

      switch (type) {
        case Instruction/* default.BEGIN_GEOMETRY */.ZP.BEGIN_GEOMETRY:
          feature =
          /** @type {import("../../Feature.js").FeatureLike} */
          instruction[1];
          currentGeometry = instruction[3];

          if (!feature.getGeometry()) {
            i =
            /** @type {number} */
            instruction[2];
          } else if (opt_hitExtent !== undefined && !(0,extent/* intersects */.kK)(opt_hitExtent, currentGeometry.getExtent())) {
            i =
            /** @type {number} */
            instruction[2] + 1;
          } else {
            ++i;
          }

          break;

        case Instruction/* default.BEGIN_PATH */.ZP.BEGIN_PATH:
          if (pendingFill > batchSize) {
            this.fill_(context);
            pendingFill = 0;
          }

          if (pendingStroke > batchSize) {
            context.stroke();
            pendingStroke = 0;
          }

          if (!pendingFill && !pendingStroke) {
            context.beginPath();
            prevX = NaN;
            prevY = NaN;
          }

          ++i;
          break;

        case Instruction/* default.CIRCLE */.ZP.CIRCLE:
          d =
          /** @type {number} */
          instruction[1];
          var x1 = pixelCoordinates[d];
          var y1 = pixelCoordinates[d + 1];
          var x2 = pixelCoordinates[d + 2];
          var y2 = pixelCoordinates[d + 3];
          var dx = x2 - x1;
          var dy = y2 - y1;
          var r = Math.sqrt(dx * dx + dy * dy);
          context.moveTo(x1 + r, y1);
          context.arc(x1, y1, r, 0, 2 * Math.PI, true);
          ++i;
          break;

        case Instruction/* default.CLOSE_PATH */.ZP.CLOSE_PATH:
          context.closePath();
          ++i;
          break;

        case Instruction/* default.CUSTOM */.ZP.CUSTOM:
          d =
          /** @type {number} */
          instruction[1];
          dd = instruction[2];
          var geometry =
          /** @type {import("../../geom/SimpleGeometry.js").default} */
          instruction[3];
          var renderer = instruction[4];
          var fn = instruction.length == 6 ? instruction[5] : undefined;
          state.geometry = geometry;
          state.feature = feature;

          if (!(i in coordinateCache)) {
            coordinateCache[i] = [];
          }

          var coords = coordinateCache[i];

          if (fn) {
            fn(pixelCoordinates, d, dd, 2, coords);
          } else {
            coords[0] = pixelCoordinates[d];
            coords[1] = pixelCoordinates[d + 1];
            coords.length = 2;
          }

          renderer(coords, state);
          ++i;
          break;

        case Instruction/* default.DRAW_IMAGE */.ZP.DRAW_IMAGE:
          d =
          /** @type {number} */
          instruction[1];
          dd =
          /** @type {number} */
          instruction[2];
          image =
          /** @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} */
          instruction[3]; // Remaining arguments in DRAW_IMAGE are in alphabetical order

          anchorX =
          /** @type {number} */
          instruction[4];
          anchorY =
          /** @type {number} */
          instruction[5];
          var height =
          /** @type {number} */
          instruction[6];
          var opacity =
          /** @type {number} */
          instruction[7];
          var originX =
          /** @type {number} */
          instruction[8];
          var originY =
          /** @type {number} */
          instruction[9];
          var rotateWithView =
          /** @type {boolean} */
          instruction[10];
          var rotation =
          /** @type {number} */
          instruction[11];
          var scale =
          /** @type {import("../../size.js").Size} */
          instruction[12];
          var width =
          /** @type {number} */
          instruction[13];
          var declutterImageWithText =
          /** @type {import("../canvas.js").DeclutterImageWithText} */
          instruction[14];

          if (!image && instruction.length >= 19) {
            // create label images
            text =
            /** @type {string} */
            instruction[18];
            textKey =
            /** @type {string} */
            instruction[19];
            strokeKey =
            /** @type {string} */
            instruction[20];
            fillKey =
            /** @type {string} */
            instruction[21];
            var labelWithAnchor = this.drawLabelWithPointPlacement_(text, textKey, strokeKey, fillKey);
            image = labelWithAnchor.label;
            instruction[3] = image;
            var textOffsetX =
            /** @type {number} */
            instruction[22];
            anchorX = (labelWithAnchor.anchorX - textOffsetX) * this.pixelRatio;
            instruction[4] = anchorX;
            var textOffsetY =
            /** @type {number} */
            instruction[23];
            anchorY = (labelWithAnchor.anchorY - textOffsetY) * this.pixelRatio;
            instruction[5] = anchorY;
            height = image.height;
            instruction[6] = height;
            width = image.width;
            instruction[13] = width;
          }

          var geometryWidths = void 0;

          if (instruction.length > 24) {
            geometryWidths =
            /** @type {number} */
            instruction[24];
          }

          var padding = void 0,
              backgroundFill = void 0,
              backgroundStroke = void 0;

          if (instruction.length > 16) {
            padding =
            /** @type {Array<number>} */
            instruction[15];
            backgroundFill =
            /** @type {boolean} */
            instruction[16];
            backgroundStroke =
            /** @type {boolean} */
            instruction[17];
          } else {
            padding = render_canvas/* defaultPadding */.oB;
            backgroundFill = false;
            backgroundStroke = false;
          }

          if (rotateWithView && viewRotationFromTransform) {
            // Canvas is expected to be rotated to reverse view rotation.
            rotation += viewRotation;
          } else if (!rotateWithView && !viewRotationFromTransform) {
            // Canvas is not rotated, images need to be rotated back to be north-up.
            rotation -= viewRotation;
          }

          var widthIndex = 0;

          for (; d < dd; d += 2) {
            if (geometryWidths && geometryWidths[widthIndex++] < width / this.pixelRatio) {
              continue;
            }

            var dimensions = this.calculateImageOrLabelDimensions_(image.width, image.height, pixelCoordinates[d], pixelCoordinates[d + 1], width, height, anchorX, anchorY, originX, originY, rotation, scale, snapToPixel, padding, backgroundFill || backgroundStroke, feature);
            /** @type {ReplayImageOrLabelArgs} */

            var args = [context, contextScale, image, dimensions, opacity, backgroundFill ?
            /** @type {Array<*>} */
            lastFillInstruction : null, backgroundStroke ?
            /** @type {Array<*>} */
            lastStrokeInstruction : null];
            var imageArgs = void 0;
            var imageDeclutterBox = void 0;

            if (opt_declutterTree && declutterImageWithText) {
              var index = dd - d;

              if (!declutterImageWithText[index]) {
                // We now have the image for an image+text combination.
                declutterImageWithText[index] = args; // Don't render anything for now, wait for the text.

                continue;
              }

              imageArgs = declutterImageWithText[index];
              delete declutterImageWithText[index];
              imageDeclutterBox = getDeclutterBox(imageArgs);

              if (opt_declutterTree.collides(imageDeclutterBox)) {
                continue;
              }
            }

            if (opt_declutterTree && opt_declutterTree.collides(dimensions.declutterBox)) {
              continue;
            }

            if (imageArgs) {
              // We now have image and text for an image+text combination.
              if (opt_declutterTree) {
                opt_declutterTree.insert(imageDeclutterBox);
              } // Render the image before we render the text.


              this.replayImageOrLabel_.apply(this, imageArgs);
            }

            if (opt_declutterTree) {
              opt_declutterTree.insert(dimensions.declutterBox);
            }

            this.replayImageOrLabel_.apply(this, args);
          }

          ++i;
          break;

        case Instruction/* default.DRAW_CHARS */.ZP.DRAW_CHARS:
          var begin =
          /** @type {number} */
          instruction[1];
          var end =
          /** @type {number} */
          instruction[2];
          var baseline =
          /** @type {number} */
          instruction[3];
          var overflow =
          /** @type {number} */
          instruction[4];
          fillKey =
          /** @type {string} */
          instruction[5];
          var maxAngle =
          /** @type {number} */
          instruction[6];
          var measurePixelRatio =
          /** @type {number} */
          instruction[7];
          var offsetY =
          /** @type {number} */
          instruction[8];
          strokeKey =
          /** @type {string} */
          instruction[9];
          var strokeWidth =
          /** @type {number} */
          instruction[10];
          text =
          /** @type {string} */
          instruction[11];
          textKey =
          /** @type {string} */
          instruction[12];
          var pixelRatioScale = [
          /** @type {number} */
          instruction[13],
          /** @type {number} */
          instruction[13]];
          var textState = this.textStates[textKey];
          var font = textState.font;
          var textScale = [textState.scale[0] * measurePixelRatio, textState.scale[1] * measurePixelRatio];
          var cachedWidths = void 0;

          if (font in this.widths_) {
            cachedWidths = this.widths_[font];
          } else {
            cachedWidths = {};
            this.widths_[font] = cachedWidths;
          }

          var pathLength = (0,flat_length/* lineStringLength */.W)(pixelCoordinates, begin, end, 2);
          var textLength = Math.abs(textScale[0]) * (0,render_canvas/* measureAndCacheTextWidth */.Kd)(font, text, cachedWidths);

          if (overflow || textLength <= pathLength) {
            var textAlign = this.textStates[textKey].textAlign;
            var startM = (pathLength - textLength) * TextBuilder/* TEXT_ALIGN */.I[textAlign];
            var parts = (0,textpath/* drawTextOnPath */.q)(pixelCoordinates, begin, end, 2, text, startM, maxAngle, Math.abs(textScale[0]), render_canvas/* measureAndCacheTextWidth */.Kd, font, cachedWidths, viewRotationFromTransform ? 0 : this.viewRotation_);

            drawChars: if (parts) {
              /** @type {Array<ReplayImageOrLabelArgs>} */
              var replayImageOrLabelArgs = [];
              var c = void 0,
                  cc = void 0,
                  chars = void 0,
                  label = void 0,
                  part = void 0;

              if (strokeKey) {
                for (c = 0, cc = parts.length; c < cc; ++c) {
                  part = parts[c]; // x, y, anchorX, rotation, chunk

                  chars =
                  /** @type {string} */
                  part[4];
                  label = this.createLabel(chars, textKey, '', strokeKey);
                  anchorX =
                  /** @type {number} */
                  part[2] + (textScale[0] < 0 ? -strokeWidth : strokeWidth);
                  anchorY = baseline * label.height + (0.5 - baseline) * 2 * strokeWidth * textScale[1] / textScale[0] - offsetY;
                  var dimensions = this.calculateImageOrLabelDimensions_(label.width, label.height, part[0], part[1], label.width, label.height, anchorX, anchorY, 0, 0, part[3], pixelRatioScale, false, render_canvas/* defaultPadding */.oB, false, feature);

                  if (opt_declutterTree && opt_declutterTree.collides(dimensions.declutterBox)) {
                    break drawChars;
                  }

                  replayImageOrLabelArgs.push([context, contextScale, label, dimensions, 1, null, null]);
                }
              }

              if (fillKey) {
                for (c = 0, cc = parts.length; c < cc; ++c) {
                  part = parts[c]; // x, y, anchorX, rotation, chunk

                  chars =
                  /** @type {string} */
                  part[4];
                  label = this.createLabel(chars, textKey, fillKey, '');
                  anchorX =
                  /** @type {number} */
                  part[2];
                  anchorY = baseline * label.height - offsetY;
                  var dimensions = this.calculateImageOrLabelDimensions_(label.width, label.height, part[0], part[1], label.width, label.height, anchorX, anchorY, 0, 0, part[3], pixelRatioScale, false, render_canvas/* defaultPadding */.oB, false, feature);

                  if (opt_declutterTree && opt_declutterTree.collides(dimensions.declutterBox)) {
                    break drawChars;
                  }

                  replayImageOrLabelArgs.push([context, contextScale, label, dimensions, 1, null, null]);
                }
              }

              if (opt_declutterTree) {
                opt_declutterTree.load(replayImageOrLabelArgs.map(getDeclutterBox));
              }

              for (var i_1 = 0, ii_1 = replayImageOrLabelArgs.length; i_1 < ii_1; ++i_1) {
                this.replayImageOrLabel_.apply(this, replayImageOrLabelArgs[i_1]);
              }
            }
          }

          ++i;
          break;

        case Instruction/* default.END_GEOMETRY */.ZP.END_GEOMETRY:
          if (opt_featureCallback !== undefined) {
            feature =
            /** @type {import("../../Feature.js").FeatureLike} */
            instruction[1];
            var result = opt_featureCallback(feature, currentGeometry);

            if (result) {
              return result;
            }
          }

          ++i;
          break;

        case Instruction/* default.FILL */.ZP.FILL:
          if (batchSize) {
            pendingFill++;
          } else {
            this.fill_(context);
          }

          ++i;
          break;

        case Instruction/* default.MOVE_TO_LINE_TO */.ZP.MOVE_TO_LINE_TO:
          d =
          /** @type {number} */
          instruction[1];
          dd =
          /** @type {number} */
          instruction[2];
          x = pixelCoordinates[d];
          y = pixelCoordinates[d + 1];
          roundX = x + 0.5 | 0;
          roundY = y + 0.5 | 0;

          if (roundX !== prevX || roundY !== prevY) {
            context.moveTo(x, y);
            prevX = roundX;
            prevY = roundY;
          }

          for (d += 2; d < dd; d += 2) {
            x = pixelCoordinates[d];
            y = pixelCoordinates[d + 1];
            roundX = x + 0.5 | 0;
            roundY = y + 0.5 | 0;

            if (d == dd - 2 || roundX !== prevX || roundY !== prevY) {
              context.lineTo(x, y);
              prevX = roundX;
              prevY = roundY;
            }
          }

          ++i;
          break;

        case Instruction/* default.SET_FILL_STYLE */.ZP.SET_FILL_STYLE:
          lastFillInstruction = instruction;
          this.alignFill_ = instruction[2];

          if (pendingFill) {
            this.fill_(context);
            pendingFill = 0;

            if (pendingStroke) {
              context.stroke();
              pendingStroke = 0;
            }
          }

          context.fillStyle =
          /** @type {import("../../colorlike.js").ColorLike} */
          instruction[1];
          ++i;
          break;

        case Instruction/* default.SET_STROKE_STYLE */.ZP.SET_STROKE_STYLE:
          lastStrokeInstruction = instruction;

          if (pendingStroke) {
            context.stroke();
            pendingStroke = 0;
          }

          this.setStrokeStyle_(context,
          /** @type {Array<*>} */
          instruction);
          ++i;
          break;

        case Instruction/* default.STROKE */.ZP.STROKE:
          if (batchSize) {
            pendingStroke++;
          } else {
            context.stroke();
          }

          ++i;
          break;

        default:
          ++i; // consume the instruction anyway, to avoid an infinite loop

          break;
      }
    }

    if (pendingFill) {
      this.fill_(context);
    }

    if (pendingStroke) {
      context.stroke();
    }

    return undefined;
  };
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} contextScale Scale of the context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
   * @param {import("rbush").default} [opt_declutterTree] Declutter tree.
   */


  Executor.prototype.execute = function (context, contextScale, transform, viewRotation, snapToPixel, opt_declutterTree) {
    this.viewRotation_ = viewRotation;
    this.execute_(context, contextScale, transform, this.instructions, snapToPixel, undefined, undefined, opt_declutterTree);
  };
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {FeatureCallback<T>} [opt_featureCallback] Feature callback.
   * @param {import("../../extent.js").Extent} [opt_hitExtent] Only check
   *     features that intersect this extent.
   * @return {T|undefined} Callback result.
   * @template T
   */


  Executor.prototype.executeHitDetection = function (context, transform, viewRotation, opt_featureCallback, opt_hitExtent) {
    this.viewRotation_ = viewRotation;
    return this.execute_(context, 1, transform, this.hitDetectionInstructions, true, opt_featureCallback, opt_hitExtent);
  };

  return Executor;
}();

/* harmony default export */ const canvas_Executor = (Executor);
// EXTERNAL MODULE: ./node_modules/ol/dom.js
var dom = __webpack_require__(9631);
// EXTERNAL MODULE: ./node_modules/ol/obj.js
var obj = __webpack_require__(9800);
;// CONCATENATED MODULE: ./node_modules/ol/render/canvas/ExecutorGroup.js
/**
 * @module ol/render/canvas/ExecutorGroup
 */








/**
 * @const
 * @type {Array<import("./BuilderType.js").default>}
 */

var ORDER = [BuilderType/* default.POLYGON */.Z.POLYGON, BuilderType/* default.CIRCLE */.Z.CIRCLE, BuilderType/* default.LINE_STRING */.Z.LINE_STRING, BuilderType/* default.IMAGE */.Z.IMAGE, BuilderType/* default.TEXT */.Z.TEXT, BuilderType/* default.DEFAULT */.Z.DEFAULT];

var ExecutorGroup =
/** @class */
function () {
  /**
   * @param {import("../../extent.js").Extent} maxExtent Max extent for clipping. When a
   * `maxExtent` was set on the Builder for this executor group, the same `maxExtent`
   * should be set here, unless the target context does not exceed that extent (which
   * can be the case when rendering to tiles).
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {boolean} overlaps The executor group can have overlapping geometries.
   * @param {!Object<string, !Object<import("./BuilderType.js").default, import("../canvas.js").SerializableInstructions>>} allInstructions
   * The serializable instructions.
   * @param {number} [opt_renderBuffer] Optional rendering buffer.
   */
  function ExecutorGroup(maxExtent, resolution, pixelRatio, overlaps, allInstructions, opt_renderBuffer) {
    /**
     * @private
     * @type {import("../../extent.js").Extent}
     */
    this.maxExtent_ = maxExtent;
    /**
     * @private
     * @type {boolean}
     */

    this.overlaps_ = overlaps;
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
     * @type {number|undefined}
     */

    this.renderBuffer_ = opt_renderBuffer;
    /**
     * @private
     * @type {!Object<string, !Object<import("./BuilderType.js").default, import("./Executor").default>>}
     */

    this.executorsByZIndex_ = {};
    /**
     * @private
     * @type {CanvasRenderingContext2D}
     */

    this.hitDetectionContext_ = null;
    /**
     * @private
     * @type {import("../../transform.js").Transform}
     */

    this.hitDetectionTransform_ = (0,ol_transform/* create */.Ue)();
    this.createExecutors_(allInstructions);
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../transform.js").Transform} transform Transform.
   */


  ExecutorGroup.prototype.clip = function (context, transform) {
    var flatClipCoords = this.getClipCoords(transform);
    context.beginPath();
    context.moveTo(flatClipCoords[0], flatClipCoords[1]);
    context.lineTo(flatClipCoords[2], flatClipCoords[3]);
    context.lineTo(flatClipCoords[4], flatClipCoords[5]);
    context.lineTo(flatClipCoords[6], flatClipCoords[7]);
    context.clip();
  };
  /**
   * Create executors and populate them using the provided instructions.
   * @private
   * @param {!Object<string, !Object<import("./BuilderType.js").default, import("../canvas.js").SerializableInstructions>>} allInstructions The serializable instructions
   */


  ExecutorGroup.prototype.createExecutors_ = function (allInstructions) {
    for (var zIndex in allInstructions) {
      var executors = this.executorsByZIndex_[zIndex];

      if (executors === undefined) {
        executors = {};
        this.executorsByZIndex_[zIndex] = executors;
      }

      var instructionByZindex = allInstructions[zIndex];

      for (var builderType in instructionByZindex) {
        var instructions = instructionByZindex[builderType];
        executors[builderType] = new canvas_Executor(this.resolution_, this.pixelRatio_, this.overlaps_, instructions);
      }
    }
  };
  /**
   * @param {Array<import("./BuilderType.js").default>} executors Executors.
   * @return {boolean} Has executors of the provided types.
   */


  ExecutorGroup.prototype.hasExecutors = function (executors) {
    for (var zIndex in this.executorsByZIndex_) {
      var candidates = this.executorsByZIndex_[zIndex];

      for (var i = 0, ii = executors.length; i < ii; ++i) {
        if (executors[i] in candidates) {
          return true;
        }
      }
    }

    return false;
  };
  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {function(import("../../Feature.js").FeatureLike, import("../../geom/SimpleGeometry.js").default, number): T} callback Feature callback.
   * @param {Array<import("../../Feature.js").FeatureLike>} declutteredFeatures Decluttered features.
   * @return {T|undefined} Callback result.
   * @template T
   */


  ExecutorGroup.prototype.forEachFeatureAtCoordinate = function (coordinate, resolution, rotation, hitTolerance, callback, declutteredFeatures) {
    hitTolerance = Math.round(hitTolerance);
    var contextSize = hitTolerance * 2 + 1;
    var transform = (0,ol_transform/* compose */.qC)(this.hitDetectionTransform_, hitTolerance + 0.5, hitTolerance + 0.5, 1 / resolution, -1 / resolution, -rotation, -coordinate[0], -coordinate[1]);
    var newContext = !this.hitDetectionContext_;

    if (newContext) {
      this.hitDetectionContext_ = (0,dom/* createCanvasContext2D */.E4)(contextSize, contextSize);
    }

    var context = this.hitDetectionContext_;

    if (context.canvas.width !== contextSize || context.canvas.height !== contextSize) {
      context.canvas.width = contextSize;
      context.canvas.height = contextSize;
    } else if (!newContext) {
      context.clearRect(0, 0, contextSize, contextSize);
    }
    /**
     * @type {import("../../extent.js").Extent}
     */


    var hitExtent;

    if (this.renderBuffer_ !== undefined) {
      hitExtent = (0,extent/* createEmpty */.lJ)();
      (0,extent/* extendCoordinate */.Wj)(hitExtent, coordinate);
      (0,extent/* buffer */.f3)(hitExtent, resolution * (this.renderBuffer_ + hitTolerance), hitExtent);
    }

    var indexes = getPixelIndexArray(hitTolerance);
    var builderType;
    /**
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     * @param {import("../../geom/SimpleGeometry.js").default} geometry Geometry.
     * @return {T|undefined} Callback result.
     */

    function featureCallback(feature, geometry) {
      var imageData = context.getImageData(0, 0, contextSize, contextSize).data;

      for (var i_1 = 0, ii = indexes.length; i_1 < ii; i_1++) {
        if (imageData[indexes[i_1]] > 0) {
          if (!declutteredFeatures || builderType !== BuilderType/* default.IMAGE */.Z.IMAGE && builderType !== BuilderType/* default.TEXT */.Z.TEXT || declutteredFeatures.indexOf(feature) !== -1) {
            var idx = (indexes[i_1] - 3) / 4;
            var x = hitTolerance - idx % contextSize;
            var y = hitTolerance - (idx / contextSize | 0);
            var result_1 = callback(feature, geometry, x * x + y * y);

            if (result_1) {
              return result_1;
            }
          }

          context.clearRect(0, 0, contextSize, contextSize);
          break;
        }
      }

      return undefined;
    }
    /** @type {Array<number>} */


    var zs = Object.keys(this.executorsByZIndex_).map(Number);
    zs.sort(array/* numberSafeCompareFunction */.kK);
    var i, j, executors, executor, result;

    for (i = zs.length - 1; i >= 0; --i) {
      var zIndexKey = zs[i].toString();
      executors = this.executorsByZIndex_[zIndexKey];

      for (j = ORDER.length - 1; j >= 0; --j) {
        builderType = ORDER[j];
        executor = executors[builderType];

        if (executor !== undefined) {
          result = executor.executeHitDetection(context, transform, rotation, featureCallback, hitExtent);

          if (result) {
            return result;
          }
        }
      }
    }

    return undefined;
  };
  /**
   * @param {import("../../transform.js").Transform} transform Transform.
   * @return {Array<number>} Clip coordinates.
   */


  ExecutorGroup.prototype.getClipCoords = function (transform) {
    var maxExtent = this.maxExtent_;

    if (!maxExtent) {
      return null;
    }

    var minX = maxExtent[0];
    var minY = maxExtent[1];
    var maxX = maxExtent[2];
    var maxY = maxExtent[3];
    var flatClipCoords = [minX, minY, minX, maxY, maxX, maxY, maxX, minY];
    (0,flat_transform/* transform2D */.vT)(flatClipCoords, 0, 8, 2, transform, flatClipCoords);
    return flatClipCoords;
  };
  /**
   * @return {boolean} Is empty.
   */


  ExecutorGroup.prototype.isEmpty = function () {
    return (0,obj/* isEmpty */.xb)(this.executorsByZIndex_);
  };
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} contextScale Scale of the context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {boolean} snapToPixel Snap point symbols and test to integer pixel.
   * @param {Array<import("./BuilderType.js").default>} [opt_builderTypes] Ordered replay types to replay.
   *     Default is {@link module:ol/render/replay~ORDER}
   * @param {import("rbush").default} [opt_declutterTree] Declutter tree.
   */


  ExecutorGroup.prototype.execute = function (context, contextScale, transform, viewRotation, snapToPixel, opt_builderTypes, opt_declutterTree) {
    /** @type {Array<number>} */
    var zs = Object.keys(this.executorsByZIndex_).map(Number);
    zs.sort(array/* numberSafeCompareFunction */.kK); // setup clipping so that the parts of over-simplified geometries are not
    // visible outside the current extent when panning

    if (this.maxExtent_) {
      context.save();
      this.clip(context, transform);
    }

    var builderTypes = opt_builderTypes ? opt_builderTypes : ORDER;
    var i, ii, j, jj, replays, replay;

    if (opt_declutterTree) {
      zs.reverse();
    }

    for (i = 0, ii = zs.length; i < ii; ++i) {
      var zIndexKey = zs[i].toString();
      replays = this.executorsByZIndex_[zIndexKey];

      for (j = 0, jj = builderTypes.length; j < jj; ++j) {
        var builderType = builderTypes[j];
        replay = replays[builderType];

        if (replay !== undefined) {
          replay.execute(context, contextScale, transform, viewRotation, snapToPixel, opt_declutterTree);
        }
      }
    }

    if (this.maxExtent_) {
      context.restore();
    }
  };

  return ExecutorGroup;
}();
/**
 * This cache is used to store arrays of indexes for calculated pixel circles
 * to increase performance.
 * It is a static property to allow each Replaygroup to access it.
 * @type {Object<number, Array<number>>}
 */


var circlePixelIndexArrayCache = {};
/**
 * This methods creates an array with indexes of all pixels within a circle,
 * ordered by how close they are to the center.
 * A cache is used to increase performance.
 * @param {number} radius Radius.
 * @return {Array<number>} An array with indexes within a circle.
 */

function getPixelIndexArray(radius) {
  if (circlePixelIndexArrayCache[radius] !== undefined) {
    return circlePixelIndexArrayCache[radius];
  }

  var size = radius * 2 + 1;
  var maxDistanceSq = radius * radius;
  var distances = new Array(maxDistanceSq + 1);

  for (var i = 0; i <= radius; ++i) {
    for (var j = 0; j <= radius; ++j) {
      var distanceSq = i * i + j * j;

      if (distanceSq > maxDistanceSq) {
        break;
      }

      var distance = distances[distanceSq];

      if (!distance) {
        distance = [];
        distances[distanceSq] = distance;
      }

      distance.push(((radius + i) * size + (radius + j)) * 4 + 3);

      if (i > 0) {
        distance.push(((radius - i) * size + (radius + j)) * 4 + 3);
      }

      if (j > 0) {
        distance.push(((radius + i) * size + (radius - j)) * 4 + 3);

        if (i > 0) {
          distance.push(((radius - i) * size + (radius - j)) * 4 + 3);
        }
      }
    }
  }

  var pixelIndex = [];

  for (var i = 0, ii = distances.length; i < ii; ++i) {
    if (distances[i]) {
      pixelIndex.push.apply(pixelIndex, distances[i]);
    }
  }

  circlePixelIndexArrayCache[radius] = pixelIndex;
  return pixelIndex;
}
/* harmony default export */ const canvas_ExecutorGroup = (ExecutorGroup);

/***/ }),

/***/ 1953:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Builder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2295);
/* harmony import */ var _Instruction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9506);
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
 * @module ol/render/canvas/ImageBuilder
 */





var CanvasImageBuilder =
/** @class */
function (_super) {
  __extends(CanvasImageBuilder, _super);
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */


  function CanvasImageBuilder(tolerance, maxExtent, resolution, pixelRatio) {
    var _this = _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
    /**
     * @private
     * @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement}
     */


    _this.hitDetectionImage_ = null;
    /**
     * @private
     * @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement}
     */

    _this.image_ = null;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.imagePixelRatio_ = undefined;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.anchorX_ = undefined;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.anchorY_ = undefined;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.height_ = undefined;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.opacity_ = undefined;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.originX_ = undefined;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.originY_ = undefined;
    /**
     * @private
     * @type {boolean|undefined}
     */

    _this.rotateWithView_ = undefined;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.rotation_ = undefined;
    /**
     * @private
     * @type {import("../../size.js").Size|undefined}
     */

    _this.scale_ = undefined;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.width_ = undefined;
    /**
     * Data shared with a text builder for combined decluttering.
     * @private
     * @type {import("../canvas.js").DeclutterImageWithText}
     */

    _this.declutterImageWithText_ = undefined;
    return _this;
  }
  /**
   * @param {import("../../geom/Point.js").default|import("../Feature.js").default} pointGeometry Point geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */


  CanvasImageBuilder.prototype.drawPoint = function (pointGeometry, feature) {
    if (!this.image_) {
      return;
    }

    this.beginGeometry(pointGeometry, feature);
    var flatCoordinates = pointGeometry.getFlatCoordinates();
    var stride = pointGeometry.getStride();
    var myBegin = this.coordinates.length;
    var myEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);
    this.instructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].DRAW_IMAGE */ .ZP.DRAW_IMAGE, myBegin, myEnd, this.image_, // Remaining arguments to DRAW_IMAGE are in alphabetical order
    this.anchorX_ * this.imagePixelRatio_, this.anchorY_ * this.imagePixelRatio_, Math.ceil(this.height_ * this.imagePixelRatio_), this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, [this.scale_[0] * this.pixelRatio / this.imagePixelRatio_, this.scale_[1] * this.pixelRatio / this.imagePixelRatio_], Math.ceil(this.width_ * this.imagePixelRatio_), this.declutterImageWithText_]);
    this.hitDetectionInstructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].DRAW_IMAGE */ .ZP.DRAW_IMAGE, myBegin, myEnd, this.hitDetectionImage_, // Remaining arguments to DRAW_IMAGE are in alphabetical order
    this.anchorX_, this.anchorY_, this.height_, this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, this.scale_, this.width_, this.declutterImageWithText_]);
    this.endGeometry(feature);
  };
  /**
   * @param {import("../../geom/MultiPoint.js").default|import("../Feature.js").default} multiPointGeometry MultiPoint geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */


  CanvasImageBuilder.prototype.drawMultiPoint = function (multiPointGeometry, feature) {
    if (!this.image_) {
      return;
    }

    this.beginGeometry(multiPointGeometry, feature);
    var flatCoordinates = multiPointGeometry.getFlatCoordinates();
    var stride = multiPointGeometry.getStride();
    var myBegin = this.coordinates.length;
    var myEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);
    this.instructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].DRAW_IMAGE */ .ZP.DRAW_IMAGE, myBegin, myEnd, this.image_, // Remaining arguments to DRAW_IMAGE are in alphabetical order
    this.anchorX_ * this.imagePixelRatio_, this.anchorY_ * this.imagePixelRatio_, Math.ceil(this.height_ * this.imagePixelRatio_), this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, [this.scale_[0] * this.pixelRatio / this.imagePixelRatio_, this.scale_[1] * this.pixelRatio / this.imagePixelRatio_], Math.ceil(this.width_ * this.imagePixelRatio_), this.declutterImageWithText_]);
    this.hitDetectionInstructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].DRAW_IMAGE */ .ZP.DRAW_IMAGE, myBegin, myEnd, this.hitDetectionImage_, // Remaining arguments to DRAW_IMAGE are in alphabetical order
    this.anchorX_, this.anchorY_, this.height_, this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, this.scale_, this.width_, this.declutterImageWithText_]);
    this.endGeometry(feature);
  };
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */


  CanvasImageBuilder.prototype.finish = function () {
    this.reverseHitDetectionInstructions(); // FIXME this doesn't really protect us against further calls to draw*Geometry

    this.anchorX_ = undefined;
    this.anchorY_ = undefined;
    this.hitDetectionImage_ = null;
    this.image_ = null;
    this.imagePixelRatio_ = undefined;
    this.height_ = undefined;
    this.scale_ = undefined;
    this.opacity_ = undefined;
    this.originX_ = undefined;
    this.originY_ = undefined;
    this.rotateWithView_ = undefined;
    this.rotation_ = undefined;
    this.width_ = undefined;
    return _super.prototype.finish.call(this);
  };
  /**
   * @param {import("../../style/Image.js").default} imageStyle Image style.
   * @param {Object} [opt_sharedData] Shared data.
   */


  CanvasImageBuilder.prototype.setImageStyle = function (imageStyle, opt_sharedData) {
    var anchor = imageStyle.getAnchor();
    var size = imageStyle.getSize();
    var hitDetectionImage = imageStyle.getHitDetectionImage();
    var image = imageStyle.getImage(this.pixelRatio);
    var origin = imageStyle.getOrigin();
    this.imagePixelRatio_ = imageStyle.getPixelRatio(this.pixelRatio);
    this.anchorX_ = anchor[0];
    this.anchorY_ = anchor[1];
    this.hitDetectionImage_ = hitDetectionImage;
    this.image_ = image;
    this.height_ = size[1];
    this.opacity_ = imageStyle.getOpacity();
    this.originX_ = origin[0] * this.imagePixelRatio_;
    this.originY_ = origin[1] * this.imagePixelRatio_;
    this.rotateWithView_ = imageStyle.getRotateWithView();
    this.rotation_ = imageStyle.getRotation();
    this.scale_ = imageStyle.getScaleArray();
    this.width_ = size[0];
    this.declutterImageWithText_ = opt_sharedData;
  };

  return CanvasImageBuilder;
}(_Builder_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasImageBuilder);

/***/ }),

/***/ 2676:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5870);
/* harmony import */ var _VectorContext_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8298);
/* harmony import */ var _colorlike_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5739);
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8975);
/* harmony import */ var _canvas_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1184);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3620);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1046);
/* harmony import */ var _geom_flat_transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6929);
/* harmony import */ var _geom_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4285);
/**
 * @module ol/render/canvas/Immediate
 */
// FIXME test, especially polygons with holes and multipolygons
// FIXME need to handle large thick features (where pixel size matters)
// FIXME add offset and end to ol/geom/flat/transform~transform2D?
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
 * @classdesc
 * A concrete subclass of {@link module:ol/render/VectorContext VectorContext} that implements
 * direct rendering of features and geometries to an HTML5 Canvas context.
 * Instances of this class are created internally by the library and
 * provided to application code as vectorContext member of the
 * {@link module:ol/render/Event~RenderEvent RenderEvent} object associated with postcompose, precompose and
 * render events emitted by layers and maps.
 */

var CanvasImmediateRenderer =
/** @class */
function (_super) {
  __extends(CanvasImmediateRenderer, _super);
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../../extent.js").Extent} extent Extent.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {number} [opt_squaredTolerance] Optional squared tolerance for simplification.
   * @param {import("../../proj.js").TransformFunction} [opt_userTransform] Transform from user to view projection.
   */


  function CanvasImmediateRenderer(context, pixelRatio, extent, transform, viewRotation, opt_squaredTolerance, opt_userTransform) {
    var _this = _super.call(this) || this;
    /**
     * @private
     * @type {CanvasRenderingContext2D}
     */


    _this.context_ = context;
    /**
     * @private
     * @type {number}
     */

    _this.pixelRatio_ = pixelRatio;
    /**
     * @private
     * @type {import("../../extent.js").Extent}
     */

    _this.extent_ = extent;
    /**
     * @private
     * @type {import("../../transform.js").Transform}
     */

    _this.transform_ = transform;
    /**
     * @private
     * @type {number}
     */

    _this.viewRotation_ = viewRotation;
    /**
     * @private
     * @type {number}
     */

    _this.squaredTolerance_ = opt_squaredTolerance;
    /**
     * @private
     * @type {import("../../proj.js").TransformFunction}
     */

    _this.userTransform_ = opt_userTransform;
    /**
     * @private
     * @type {?import("../canvas.js").FillState}
     */

    _this.contextFillState_ = null;
    /**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */

    _this.contextStrokeState_ = null;
    /**
     * @private
     * @type {?import("../canvas.js").TextState}
     */

    _this.contextTextState_ = null;
    /**
     * @private
     * @type {?import("../canvas.js").FillState}
     */

    _this.fillState_ = null;
    /**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */

    _this.strokeState_ = null;
    /**
     * @private
     * @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement}
     */

    _this.image_ = null;
    /**
     * @private
     * @type {number}
     */

    _this.imageAnchorX_ = 0;
    /**
     * @private
     * @type {number}
     */

    _this.imageAnchorY_ = 0;
    /**
     * @private
     * @type {number}
     */

    _this.imageHeight_ = 0;
    /**
     * @private
     * @type {number}
     */

    _this.imageOpacity_ = 0;
    /**
     * @private
     * @type {number}
     */

    _this.imageOriginX_ = 0;
    /**
     * @private
     * @type {number}
     */

    _this.imageOriginY_ = 0;
    /**
     * @private
     * @type {boolean}
     */

    _this.imageRotateWithView_ = false;
    /**
     * @private
     * @type {number}
     */

    _this.imageRotation_ = 0;
    /**
     * @private
     * @type {import("../../size.js").Size}
     */

    _this.imageScale_ = [0, 0];
    /**
     * @private
     * @type {number}
     */

    _this.imageWidth_ = 0;
    /**
     * @private
     * @type {string}
     */

    _this.text_ = '';
    /**
     * @private
     * @type {number}
     */

    _this.textOffsetX_ = 0;
    /**
     * @private
     * @type {number}
     */

    _this.textOffsetY_ = 0;
    /**
     * @private
     * @type {boolean}
     */

    _this.textRotateWithView_ = false;
    /**
     * @private
     * @type {number}
     */

    _this.textRotation_ = 0;
    /**
     * @private
     * @type {import("../../size.js").Size}
     */

    _this.textScale_ = [0, 0];
    /**
     * @private
     * @type {?import("../canvas.js").FillState}
     */

    _this.textFillState_ = null;
    /**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */

    _this.textStrokeState_ = null;
    /**
     * @private
     * @type {?import("../canvas.js").TextState}
     */

    _this.textState_ = null;
    /**
     * @private
     * @type {Array<number>}
     */

    _this.pixelCoordinates_ = [];
    /**
     * @private
     * @type {import("../../transform.js").Transform}
     */

    _this.tmpLocalTransform_ = (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__/* .create */ .Ue)();
    return _this;
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   */


  CanvasImmediateRenderer.prototype.drawImages_ = function (flatCoordinates, offset, end, stride) {
    if (!this.image_) {
      return;
    }

    var pixelCoordinates = (0,_geom_flat_transform_js__WEBPACK_IMPORTED_MODULE_1__/* .transform2D */ .vT)(flatCoordinates, offset, end, stride, this.transform_, this.pixelCoordinates_);
    var context = this.context_;
    var localTransform = this.tmpLocalTransform_;
    var alpha = context.globalAlpha;

    if (this.imageOpacity_ != 1) {
      context.globalAlpha = alpha * this.imageOpacity_;
    }

    var rotation = this.imageRotation_;

    if (this.imageRotateWithView_) {
      rotation += this.viewRotation_;
    }

    for (var i = 0, ii = pixelCoordinates.length; i < ii; i += 2) {
      var x = pixelCoordinates[i] - this.imageAnchorX_;
      var y = pixelCoordinates[i + 1] - this.imageAnchorY_;

      if (rotation !== 0 || this.imageScale_[0] != 1 || this.imageScale_[1] != 1) {
        var centerX = x + this.imageAnchorX_;
        var centerY = y + this.imageAnchorY_;
        (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__/* .compose */ .qC)(localTransform, centerX, centerY, 1, 1, rotation, -centerX, -centerY);
        context.setTransform.apply(context, localTransform);
        context.translate(centerX, centerY);
        context.scale(this.imageScale_[0], this.imageScale_[1]);
        context.drawImage(this.image_, this.imageOriginX_, this.imageOriginY_, this.imageWidth_, this.imageHeight_, -this.imageAnchorX_, -this.imageAnchorY_, this.imageWidth_, this.imageHeight_);
        context.setTransform(1, 0, 0, 1, 0, 0);
      } else {
        context.drawImage(this.image_, this.imageOriginX_, this.imageOriginY_, this.imageWidth_, this.imageHeight_, x, y, this.imageWidth_, this.imageHeight_);
      }
    }

    if (this.imageOpacity_ != 1) {
      context.globalAlpha = alpha;
    }
  };
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   */


  CanvasImmediateRenderer.prototype.drawText_ = function (flatCoordinates, offset, end, stride) {
    if (!this.textState_ || this.text_ === '') {
      return;
    }

    if (this.textFillState_) {
      this.setContextFillState_(this.textFillState_);
    }

    if (this.textStrokeState_) {
      this.setContextStrokeState_(this.textStrokeState_);
    }

    this.setContextTextState_(this.textState_);
    var pixelCoordinates = (0,_geom_flat_transform_js__WEBPACK_IMPORTED_MODULE_1__/* .transform2D */ .vT)(flatCoordinates, offset, end, stride, this.transform_, this.pixelCoordinates_);
    var context = this.context_;
    var rotation = this.textRotation_;

    if (this.textRotateWithView_) {
      rotation += this.viewRotation_;
    }

    for (; offset < end; offset += stride) {
      var x = pixelCoordinates[offset] + this.textOffsetX_;
      var y = pixelCoordinates[offset + 1] + this.textOffsetY_;

      if (rotation !== 0 || this.textScale_[0] != 1 || this.textScale_[1] != 1) {
        var localTransform = (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__/* .compose */ .qC)(this.tmpLocalTransform_, x, y, 1, 1, rotation, -x, -y);
        context.setTransform.apply(context, localTransform);
        context.translate(x, y);
        context.scale(this.textScale_[0], this.textScale_[1]);

        if (this.textStrokeState_) {
          context.strokeText(this.text_, 0, 0);
        }

        if (this.textFillState_) {
          context.fillText(this.text_, 0, 0);
        }

        context.setTransform(1, 0, 0, 1, 0, 0);
      } else {
        if (this.textStrokeState_) {
          context.strokeText(this.text_, x, y);
        }

        if (this.textFillState_) {
          context.fillText(this.text_, x, y);
        }
      }
    }
  };
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @param {boolean} close Close.
   * @private
   * @return {number} end End.
   */


  CanvasImmediateRenderer.prototype.moveToLineTo_ = function (flatCoordinates, offset, end, stride, close) {
    var context = this.context_;
    var pixelCoordinates = (0,_geom_flat_transform_js__WEBPACK_IMPORTED_MODULE_1__/* .transform2D */ .vT)(flatCoordinates, offset, end, stride, this.transform_, this.pixelCoordinates_);
    context.moveTo(pixelCoordinates[0], pixelCoordinates[1]);
    var length = pixelCoordinates.length;

    if (close) {
      length -= 2;
    }

    for (var i = 2; i < length; i += 2) {
      context.lineTo(pixelCoordinates[i], pixelCoordinates[i + 1]);
    }

    if (close) {
      context.closePath();
    }

    return end;
  };
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @private
   * @return {number} End.
   */


  CanvasImmediateRenderer.prototype.drawRings_ = function (flatCoordinates, offset, ends, stride) {
    for (var i = 0, ii = ends.length; i < ii; ++i) {
      offset = this.moveToLineTo_(flatCoordinates, offset, ends[i], stride, true);
    }

    return offset;
  };
  /**
   * Render a circle geometry into the canvas.  Rendering is immediate and uses
   * the current fill and stroke styles.
   *
   * @param {import("../../geom/Circle.js").default} geometry Circle geometry.
   * @api
   */


  CanvasImmediateRenderer.prototype.drawCircle = function (geometry) {
    if (!(0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .intersects */ .kK)(this.extent_, geometry.getExtent())) {
      return;
    }

    if (this.fillState_ || this.strokeState_) {
      if (this.fillState_) {
        this.setContextFillState_(this.fillState_);
      }

      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
      }

      var pixelCoordinates = (0,_geom_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_3__/* .transformGeom2D */ .Kr)(geometry, this.transform_, this.pixelCoordinates_);
      var dx = pixelCoordinates[2] - pixelCoordinates[0];
      var dy = pixelCoordinates[3] - pixelCoordinates[1];
      var radius = Math.sqrt(dx * dx + dy * dy);
      var context = this.context_;
      context.beginPath();
      context.arc(pixelCoordinates[0], pixelCoordinates[1], radius, 0, 2 * Math.PI);

      if (this.fillState_) {
        context.fill();
      }

      if (this.strokeState_) {
        context.stroke();
      }
    }

    if (this.text_ !== '') {
      this.drawText_(geometry.getCenter(), 0, 2, 2);
    }
  };
  /**
   * Set the rendering style.  Note that since this is an immediate rendering API,
   * any `zIndex` on the provided style will be ignored.
   *
   * @param {import("../../style/Style.js").default} style The rendering style.
   * @api
   */


  CanvasImmediateRenderer.prototype.setStyle = function (style) {
    this.setFillStrokeStyle(style.getFill(), style.getStroke());
    this.setImageStyle(style.getImage());
    this.setTextStyle(style.getText());
  };
  /**
   * @param {import("../../transform.js").Transform} transform Transform.
   */


  CanvasImmediateRenderer.prototype.setTransform = function (transform) {
    this.transform_ = transform;
  };
  /**
   * Render a geometry into the canvas.  Call
   * {@link module:ol/render/canvas/Immediate~CanvasImmediateRenderer#setStyle renderer.setStyle()} first to set the rendering style.
   *
   * @param {import("../../geom/Geometry.js").default|import("../Feature.js").default} geometry The geometry to render.
   * @api
   */


  CanvasImmediateRenderer.prototype.drawGeometry = function (geometry) {
    var type = geometry.getType();

    switch (type) {
      case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].POINT */ .Z.POINT:
        this.drawPoint(
        /** @type {import("../../geom/Point.js").default} */
        geometry);
        break;

      case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].LINE_STRING */ .Z.LINE_STRING:
        this.drawLineString(
        /** @type {import("../../geom/LineString.js").default} */
        geometry);
        break;

      case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].POLYGON */ .Z.POLYGON:
        this.drawPolygon(
        /** @type {import("../../geom/Polygon.js").default} */
        geometry);
        break;

      case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].MULTI_POINT */ .Z.MULTI_POINT:
        this.drawMultiPoint(
        /** @type {import("../../geom/MultiPoint.js").default} */
        geometry);
        break;

      case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].MULTI_LINE_STRING */ .Z.MULTI_LINE_STRING:
        this.drawMultiLineString(
        /** @type {import("../../geom/MultiLineString.js").default} */
        geometry);
        break;

      case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].MULTI_POLYGON */ .Z.MULTI_POLYGON:
        this.drawMultiPolygon(
        /** @type {import("../../geom/MultiPolygon.js").default} */
        geometry);
        break;

      case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].GEOMETRY_COLLECTION */ .Z.GEOMETRY_COLLECTION:
        this.drawGeometryCollection(
        /** @type {import("../../geom/GeometryCollection.js").default} */
        geometry);
        break;

      case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].CIRCLE */ .Z.CIRCLE:
        this.drawCircle(
        /** @type {import("../../geom/Circle.js").default} */
        geometry);
        break;

      default:
    }
  };
  /**
   * Render a feature into the canvas.  Note that any `zIndex` on the provided
   * style will be ignored - features are rendered immediately in the order that
   * this method is called.  If you need `zIndex` support, you should be using an
   * {@link module:ol/layer/Vector~VectorLayer VectorLayer} instead.
   *
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {import("../../style/Style.js").default} style Style.
   * @api
   */


  CanvasImmediateRenderer.prototype.drawFeature = function (feature, style) {
    var geometry = style.getGeometryFunction()(feature);

    if (!geometry || !(0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .intersects */ .kK)(this.extent_, geometry.getExtent())) {
      return;
    }

    this.setStyle(style);
    this.drawGeometry(geometry);
  };
  /**
   * Render a GeometryCollection to the canvas.  Rendering is immediate and
   * uses the current styles appropriate for each geometry in the collection.
   *
   * @param {import("../../geom/GeometryCollection.js").default} geometry Geometry collection.
   */


  CanvasImmediateRenderer.prototype.drawGeometryCollection = function (geometry) {
    var geometries = geometry.getGeometriesArray();

    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      this.drawGeometry(geometries[i]);
    }
  };
  /**
   * Render a Point geometry into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/Point.js").default|import("../Feature.js").default} geometry Point geometry.
   */


  CanvasImmediateRenderer.prototype.drawPoint = function (geometry) {
    if (this.squaredTolerance_) {
      geometry =
      /** @type {import("../../geom/Point.js").default} */
      geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
    }

    var flatCoordinates = geometry.getFlatCoordinates();
    var stride = geometry.getStride();

    if (this.image_) {
      this.drawImages_(flatCoordinates, 0, flatCoordinates.length, stride);
    }

    if (this.text_ !== '') {
      this.drawText_(flatCoordinates, 0, flatCoordinates.length, stride);
    }
  };
  /**
   * Render a MultiPoint geometry  into the canvas.  Rendering is immediate and
   * uses the current style.
   *
   * @param {import("../../geom/MultiPoint.js").default|import("../Feature.js").default} geometry MultiPoint geometry.
   */


  CanvasImmediateRenderer.prototype.drawMultiPoint = function (geometry) {
    if (this.squaredTolerance_) {
      geometry =
      /** @type {import("../../geom/MultiPoint.js").default} */
      geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
    }

    var flatCoordinates = geometry.getFlatCoordinates();
    var stride = geometry.getStride();

    if (this.image_) {
      this.drawImages_(flatCoordinates, 0, flatCoordinates.length, stride);
    }

    if (this.text_ !== '') {
      this.drawText_(flatCoordinates, 0, flatCoordinates.length, stride);
    }
  };
  /**
   * Render a LineString into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/LineString.js").default|import("../Feature.js").default} geometry LineString geometry.
   */


  CanvasImmediateRenderer.prototype.drawLineString = function (geometry) {
    if (this.squaredTolerance_) {
      geometry =
      /** @type {import("../../geom/LineString.js").default} */
      geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
    }

    if (!(0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .intersects */ .kK)(this.extent_, geometry.getExtent())) {
      return;
    }

    if (this.strokeState_) {
      this.setContextStrokeState_(this.strokeState_);
      var context = this.context_;
      var flatCoordinates = geometry.getFlatCoordinates();
      context.beginPath();
      this.moveToLineTo_(flatCoordinates, 0, flatCoordinates.length, geometry.getStride(), false);
      context.stroke();
    }

    if (this.text_ !== '') {
      var flatMidpoint = geometry.getFlatMidpoint();
      this.drawText_(flatMidpoint, 0, 2, 2);
    }
  };
  /**
   * Render a MultiLineString geometry into the canvas.  Rendering is immediate
   * and uses the current style.
   *
   * @param {import("../../geom/MultiLineString.js").default|import("../Feature.js").default} geometry MultiLineString geometry.
   */


  CanvasImmediateRenderer.prototype.drawMultiLineString = function (geometry) {
    if (this.squaredTolerance_) {
      geometry =
      /** @type {import("../../geom/MultiLineString.js").default} */
      geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
    }

    var geometryExtent = geometry.getExtent();

    if (!(0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .intersects */ .kK)(this.extent_, geometryExtent)) {
      return;
    }

    if (this.strokeState_) {
      this.setContextStrokeState_(this.strokeState_);
      var context = this.context_;
      var flatCoordinates = geometry.getFlatCoordinates();
      var offset = 0;
      var ends =
      /** @type {Array<number>} */
      geometry.getEnds();
      var stride = geometry.getStride();
      context.beginPath();

      for (var i = 0, ii = ends.length; i < ii; ++i) {
        offset = this.moveToLineTo_(flatCoordinates, offset, ends[i], stride, false);
      }

      context.stroke();
    }

    if (this.text_ !== '') {
      var flatMidpoints = geometry.getFlatMidpoints();
      this.drawText_(flatMidpoints, 0, flatMidpoints.length, 2);
    }
  };
  /**
   * Render a Polygon geometry into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/Polygon.js").default|import("../Feature.js").default} geometry Polygon geometry.
   */


  CanvasImmediateRenderer.prototype.drawPolygon = function (geometry) {
    if (this.squaredTolerance_) {
      geometry =
      /** @type {import("../../geom/Polygon.js").default} */
      geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
    }

    if (!(0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .intersects */ .kK)(this.extent_, geometry.getExtent())) {
      return;
    }

    if (this.strokeState_ || this.fillState_) {
      if (this.fillState_) {
        this.setContextFillState_(this.fillState_);
      }

      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
      }

      var context = this.context_;
      context.beginPath();
      this.drawRings_(geometry.getOrientedFlatCoordinates(), 0,
      /** @type {Array<number>} */
      geometry.getEnds(), geometry.getStride());

      if (this.fillState_) {
        context.fill();
      }

      if (this.strokeState_) {
        context.stroke();
      }
    }

    if (this.text_ !== '') {
      var flatInteriorPoint = geometry.getFlatInteriorPoint();
      this.drawText_(flatInteriorPoint, 0, 2, 2);
    }
  };
  /**
   * Render MultiPolygon geometry into the canvas.  Rendering is immediate and
   * uses the current style.
   * @param {import("../../geom/MultiPolygon.js").default} geometry MultiPolygon geometry.
   */


  CanvasImmediateRenderer.prototype.drawMultiPolygon = function (geometry) {
    if (this.squaredTolerance_) {
      geometry =
      /** @type {import("../../geom/MultiPolygon.js").default} */
      geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
    }

    if (!(0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .intersects */ .kK)(this.extent_, geometry.getExtent())) {
      return;
    }

    if (this.strokeState_ || this.fillState_) {
      if (this.fillState_) {
        this.setContextFillState_(this.fillState_);
      }

      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
      }

      var context = this.context_;
      var flatCoordinates = geometry.getOrientedFlatCoordinates();
      var offset = 0;
      var endss = geometry.getEndss();
      var stride = geometry.getStride();
      context.beginPath();

      for (var i = 0, ii = endss.length; i < ii; ++i) {
        var ends = endss[i];
        offset = this.drawRings_(flatCoordinates, offset, ends, stride);
      }

      if (this.fillState_) {
        context.fill();
      }

      if (this.strokeState_) {
        context.stroke();
      }
    }

    if (this.text_ !== '') {
      var flatInteriorPoints = geometry.getFlatInteriorPoints();
      this.drawText_(flatInteriorPoints, 0, flatInteriorPoints.length, 2);
    }
  };
  /**
   * @param {import("../canvas.js").FillState} fillState Fill state.
   * @private
   */


  CanvasImmediateRenderer.prototype.setContextFillState_ = function (fillState) {
    var context = this.context_;
    var contextFillState = this.contextFillState_;

    if (!contextFillState) {
      context.fillStyle = fillState.fillStyle;
      this.contextFillState_ = {
        fillStyle: fillState.fillStyle
      };
    } else {
      if (contextFillState.fillStyle != fillState.fillStyle) {
        contextFillState.fillStyle = fillState.fillStyle;
        context.fillStyle = fillState.fillStyle;
      }
    }
  };
  /**
   * @param {import("../canvas.js").StrokeState} strokeState Stroke state.
   * @private
   */


  CanvasImmediateRenderer.prototype.setContextStrokeState_ = function (strokeState) {
    var context = this.context_;
    var contextStrokeState = this.contextStrokeState_;

    if (!contextStrokeState) {
      context.lineCap = strokeState.lineCap;

      if (context.setLineDash) {
        context.setLineDash(strokeState.lineDash);
        context.lineDashOffset = strokeState.lineDashOffset;
      }

      context.lineJoin = strokeState.lineJoin;
      context.lineWidth = strokeState.lineWidth;
      context.miterLimit = strokeState.miterLimit;
      context.strokeStyle = strokeState.strokeStyle;
      this.contextStrokeState_ = {
        lineCap: strokeState.lineCap,
        lineDash: strokeState.lineDash,
        lineDashOffset: strokeState.lineDashOffset,
        lineJoin: strokeState.lineJoin,
        lineWidth: strokeState.lineWidth,
        miterLimit: strokeState.miterLimit,
        strokeStyle: strokeState.strokeStyle
      };
    } else {
      if (contextStrokeState.lineCap != strokeState.lineCap) {
        contextStrokeState.lineCap = strokeState.lineCap;
        context.lineCap = strokeState.lineCap;
      }

      if (context.setLineDash) {
        if (!(0,_array_js__WEBPACK_IMPORTED_MODULE_5__/* .equals */ .fS)(contextStrokeState.lineDash, strokeState.lineDash)) {
          context.setLineDash(contextStrokeState.lineDash = strokeState.lineDash);
        }

        if (contextStrokeState.lineDashOffset != strokeState.lineDashOffset) {
          contextStrokeState.lineDashOffset = strokeState.lineDashOffset;
          context.lineDashOffset = strokeState.lineDashOffset;
        }
      }

      if (contextStrokeState.lineJoin != strokeState.lineJoin) {
        contextStrokeState.lineJoin = strokeState.lineJoin;
        context.lineJoin = strokeState.lineJoin;
      }

      if (contextStrokeState.lineWidth != strokeState.lineWidth) {
        contextStrokeState.lineWidth = strokeState.lineWidth;
        context.lineWidth = strokeState.lineWidth;
      }

      if (contextStrokeState.miterLimit != strokeState.miterLimit) {
        contextStrokeState.miterLimit = strokeState.miterLimit;
        context.miterLimit = strokeState.miterLimit;
      }

      if (contextStrokeState.strokeStyle != strokeState.strokeStyle) {
        contextStrokeState.strokeStyle = strokeState.strokeStyle;
        context.strokeStyle = strokeState.strokeStyle;
      }
    }
  };
  /**
   * @param {import("../canvas.js").TextState} textState Text state.
   * @private
   */


  CanvasImmediateRenderer.prototype.setContextTextState_ = function (textState) {
    var context = this.context_;
    var contextTextState = this.contextTextState_;
    var textAlign = textState.textAlign ? textState.textAlign : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultTextAlign */ .PH;

    if (!contextTextState) {
      context.font = textState.font;
      context.textAlign =
      /** @type {CanvasTextAlign} */
      textAlign;
      context.textBaseline =
      /** @type {CanvasTextBaseline} */
      textState.textBaseline;
      this.contextTextState_ = {
        font: textState.font,
        textAlign: textAlign,
        textBaseline: textState.textBaseline
      };
    } else {
      if (contextTextState.font != textState.font) {
        contextTextState.font = textState.font;
        context.font = textState.font;
      }

      if (contextTextState.textAlign != textAlign) {
        contextTextState.textAlign =
        /** @type {CanvasTextAlign} */
        textAlign;
        context.textAlign =
        /** @type {CanvasTextAlign} */
        textAlign;
      }

      if (contextTextState.textBaseline != textState.textBaseline) {
        contextTextState.textBaseline =
        /** @type {CanvasTextBaseline} */
        textState.textBaseline;
        context.textBaseline =
        /** @type {CanvasTextBaseline} */
        textState.textBaseline;
      }
    }
  };
  /**
   * Set the fill and stroke style for subsequent draw operations.  To clear
   * either fill or stroke styles, pass null for the appropriate parameter.
   *
   * @param {import("../../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
   */


  CanvasImmediateRenderer.prototype.setFillStrokeStyle = function (fillStyle, strokeStyle) {
    var _this = this;

    if (!fillStyle) {
      this.fillState_ = null;
    } else {
      var fillStyleColor = fillStyle.getColor();
      this.fillState_ = {
        fillStyle: (0,_colorlike_js__WEBPACK_IMPORTED_MODULE_7__/* .asColorLike */ .y)(fillStyleColor ? fillStyleColor : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultFillStyle */ .bL)
      };
    }

    if (!strokeStyle) {
      this.strokeState_ = null;
    } else {
      var strokeStyleColor = strokeStyle.getColor();
      var strokeStyleLineCap = strokeStyle.getLineCap();
      var strokeStyleLineDash = strokeStyle.getLineDash();
      var strokeStyleLineDashOffset = strokeStyle.getLineDashOffset();
      var strokeStyleLineJoin = strokeStyle.getLineJoin();
      var strokeStyleWidth = strokeStyle.getWidth();
      var strokeStyleMiterLimit = strokeStyle.getMiterLimit();
      var lineDash = strokeStyleLineDash ? strokeStyleLineDash : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultLineDash */ .X9;
      this.strokeState_ = {
        lineCap: strokeStyleLineCap !== undefined ? strokeStyleLineCap : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultLineCap */ .mb,
        lineDash: this.pixelRatio_ === 1 ? lineDash : lineDash.map(function (n) {
          return n * _this.pixelRatio_;
        }),
        lineDashOffset: (strokeStyleLineDashOffset ? strokeStyleLineDashOffset : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultLineDashOffset */ .He) * this.pixelRatio_,
        lineJoin: strokeStyleLineJoin !== undefined ? strokeStyleLineJoin : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultLineJoin */ .rc,
        lineWidth: (strokeStyleWidth !== undefined ? strokeStyleWidth : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultLineWidth */ .yC) * this.pixelRatio_,
        miterLimit: strokeStyleMiterLimit !== undefined ? strokeStyleMiterLimit : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultMiterLimit */ .V4,
        strokeStyle: (0,_colorlike_js__WEBPACK_IMPORTED_MODULE_7__/* .asColorLike */ .y)(strokeStyleColor ? strokeStyleColor : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultStrokeStyle */ .Tx)
      };
    }
  };
  /**
   * Set the image style for subsequent draw operations.  Pass null to remove
   * the image style.
   *
   * @param {import("../../style/Image.js").default} imageStyle Image style.
   */


  CanvasImmediateRenderer.prototype.setImageStyle = function (imageStyle) {
    var imageSize;

    if (!imageStyle || !(imageSize = imageStyle.getSize())) {
      this.image_ = null;
      return;
    }

    var imageAnchor = imageStyle.getAnchor();
    var imageOrigin = imageStyle.getOrigin();
    this.image_ = imageStyle.getImage(this.pixelRatio_);
    this.imageAnchorX_ = imageAnchor[0] * this.pixelRatio_;
    this.imageAnchorY_ = imageAnchor[1] * this.pixelRatio_;
    this.imageHeight_ = imageSize[1] * this.pixelRatio_;
    this.imageOpacity_ = imageStyle.getOpacity();
    this.imageOriginX_ = imageOrigin[0];
    this.imageOriginY_ = imageOrigin[1];
    this.imageRotateWithView_ = imageStyle.getRotateWithView();
    this.imageRotation_ = imageStyle.getRotation();
    this.imageScale_ = imageStyle.getScaleArray();
    this.imageWidth_ = imageSize[0] * this.pixelRatio_;
  };
  /**
   * Set the text style for subsequent draw operations.  Pass null to
   * remove the text style.
   *
   * @param {import("../../style/Text.js").default} textStyle Text style.
   */


  CanvasImmediateRenderer.prototype.setTextStyle = function (textStyle) {
    if (!textStyle) {
      this.text_ = '';
    } else {
      var textFillStyle = textStyle.getFill();

      if (!textFillStyle) {
        this.textFillState_ = null;
      } else {
        var textFillStyleColor = textFillStyle.getColor();
        this.textFillState_ = {
          fillStyle: (0,_colorlike_js__WEBPACK_IMPORTED_MODULE_7__/* .asColorLike */ .y)(textFillStyleColor ? textFillStyleColor : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultFillStyle */ .bL)
        };
      }

      var textStrokeStyle = textStyle.getStroke();

      if (!textStrokeStyle) {
        this.textStrokeState_ = null;
      } else {
        var textStrokeStyleColor = textStrokeStyle.getColor();
        var textStrokeStyleLineCap = textStrokeStyle.getLineCap();
        var textStrokeStyleLineDash = textStrokeStyle.getLineDash();
        var textStrokeStyleLineDashOffset = textStrokeStyle.getLineDashOffset();
        var textStrokeStyleLineJoin = textStrokeStyle.getLineJoin();
        var textStrokeStyleWidth = textStrokeStyle.getWidth();
        var textStrokeStyleMiterLimit = textStrokeStyle.getMiterLimit();
        this.textStrokeState_ = {
          lineCap: textStrokeStyleLineCap !== undefined ? textStrokeStyleLineCap : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultLineCap */ .mb,
          lineDash: textStrokeStyleLineDash ? textStrokeStyleLineDash : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultLineDash */ .X9,
          lineDashOffset: textStrokeStyleLineDashOffset ? textStrokeStyleLineDashOffset : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultLineDashOffset */ .He,
          lineJoin: textStrokeStyleLineJoin !== undefined ? textStrokeStyleLineJoin : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultLineJoin */ .rc,
          lineWidth: textStrokeStyleWidth !== undefined ? textStrokeStyleWidth : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultLineWidth */ .yC,
          miterLimit: textStrokeStyleMiterLimit !== undefined ? textStrokeStyleMiterLimit : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultMiterLimit */ .V4,
          strokeStyle: (0,_colorlike_js__WEBPACK_IMPORTED_MODULE_7__/* .asColorLike */ .y)(textStrokeStyleColor ? textStrokeStyleColor : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultStrokeStyle */ .Tx)
        };
      }

      var textFont = textStyle.getFont();
      var textOffsetX = textStyle.getOffsetX();
      var textOffsetY = textStyle.getOffsetY();
      var textRotateWithView = textStyle.getRotateWithView();
      var textRotation = textStyle.getRotation();
      var textScale = textStyle.getScaleArray();
      var textText = textStyle.getText();
      var textTextAlign = textStyle.getTextAlign();
      var textTextBaseline = textStyle.getTextBaseline();
      this.textState_ = {
        font: textFont !== undefined ? textFont : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultFont */ .Df,
        textAlign: textTextAlign !== undefined ? textTextAlign : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultTextAlign */ .PH,
        textBaseline: textTextBaseline !== undefined ? textTextBaseline : _canvas_js__WEBPACK_IMPORTED_MODULE_6__/* .defaultTextBaseline */ .ru
      };
      this.text_ = textText !== undefined ? textText : '';
      this.textOffsetX_ = textOffsetX !== undefined ? this.pixelRatio_ * textOffsetX : 0;
      this.textOffsetY_ = textOffsetY !== undefined ? this.pixelRatio_ * textOffsetY : 0;
      this.textRotateWithView_ = textRotateWithView !== undefined ? textRotateWithView : false;
      this.textRotation_ = textRotation !== undefined ? textRotation : 0;
      this.textScale_ = [this.pixelRatio_ * textScale[0], this.pixelRatio_ * textScale[1]];
    }
  };

  return CanvasImmediateRenderer;
}(_VectorContext_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasImmediateRenderer);

/***/ }),

/***/ 9506:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$O": () => (/* binding */ beginPathInstruction),
/* harmony export */   "Yc": () => (/* binding */ strokeInstruction),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "gO": () => (/* binding */ fillInstruction),
/* harmony export */   "s3": () => (/* binding */ closePathInstruction)
/* harmony export */ });
/**
 * @module ol/render/canvas/Instruction
 */

/**
 * @enum {number}
 */
var Instruction = {
  BEGIN_GEOMETRY: 0,
  BEGIN_PATH: 1,
  CIRCLE: 2,
  CLOSE_PATH: 3,
  CUSTOM: 4,
  DRAW_CHARS: 5,
  DRAW_IMAGE: 6,
  END_GEOMETRY: 7,
  FILL: 8,
  MOVE_TO_LINE_TO: 9,
  SET_FILL_STYLE: 10,
  SET_STROKE_STYLE: 11,
  STROKE: 12
};
/**
 * @type {Array<Instruction>}
 */

var fillInstruction = [Instruction.FILL];
/**
 * @type {Array<Instruction>}
 */

var strokeInstruction = [Instruction.STROKE];
/**
 * @type {Array<Instruction>}
 */

var beginPathInstruction = [Instruction.BEGIN_PATH];
/**
 * @type {Array<Instruction>}
 */

var closePathInstruction = [Instruction.CLOSE_PATH];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Instruction);

/***/ }),

/***/ 4398:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Builder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2295);
/* harmony import */ var _Instruction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9506);
/* harmony import */ var _canvas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1184);
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
 * @module ol/render/canvas/LineStringBuilder
 */






var CanvasLineStringBuilder =
/** @class */
function (_super) {
  __extends(CanvasLineStringBuilder, _super);
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */


  function CanvasLineStringBuilder(tolerance, maxExtent, resolution, pixelRatio) {
    return _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   * @return {number} end.
   */


  CanvasLineStringBuilder.prototype.drawFlatCoordinates_ = function (flatCoordinates, offset, end, stride) {
    var myBegin = this.coordinates.length;
    var myEnd = this.appendFlatLineCoordinates(flatCoordinates, offset, end, stride, false, false);
    var moveToLineToInstruction = [_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].MOVE_TO_LINE_TO */ .ZP.MOVE_TO_LINE_TO, myBegin, myEnd];
    this.instructions.push(moveToLineToInstruction);
    this.hitDetectionInstructions.push(moveToLineToInstruction);
    return end;
  };
  /**
   * @param {import("../../geom/LineString.js").default|import("../Feature.js").default} lineStringGeometry Line string geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */


  CanvasLineStringBuilder.prototype.drawLineString = function (lineStringGeometry, feature) {
    var state = this.state;
    var strokeStyle = state.strokeStyle;
    var lineWidth = state.lineWidth;

    if (strokeStyle === undefined || lineWidth === undefined) {
      return;
    }

    this.updateStrokeStyle(state, this.applyStroke);
    this.beginGeometry(lineStringGeometry, feature);
    this.hitDetectionInstructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].SET_STROKE_STYLE */ .ZP.SET_STROKE_STYLE, state.strokeStyle, state.lineWidth, state.lineCap, state.lineJoin, state.miterLimit, _canvas_js__WEBPACK_IMPORTED_MODULE_1__/* .defaultLineDash */ .X9, _canvas_js__WEBPACK_IMPORTED_MODULE_1__/* .defaultLineDashOffset */ .He], _Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .beginPathInstruction */ .$O);
    var flatCoordinates = lineStringGeometry.getFlatCoordinates();
    var stride = lineStringGeometry.getStride();
    this.drawFlatCoordinates_(flatCoordinates, 0, flatCoordinates.length, stride);
    this.hitDetectionInstructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .strokeInstruction */ .Yc);
    this.endGeometry(feature);
  };
  /**
   * @param {import("../../geom/MultiLineString.js").default|import("../Feature.js").default} multiLineStringGeometry MultiLineString geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */


  CanvasLineStringBuilder.prototype.drawMultiLineString = function (multiLineStringGeometry, feature) {
    var state = this.state;
    var strokeStyle = state.strokeStyle;
    var lineWidth = state.lineWidth;

    if (strokeStyle === undefined || lineWidth === undefined) {
      return;
    }

    this.updateStrokeStyle(state, this.applyStroke);
    this.beginGeometry(multiLineStringGeometry, feature);
    this.hitDetectionInstructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].SET_STROKE_STYLE */ .ZP.SET_STROKE_STYLE, state.strokeStyle, state.lineWidth, state.lineCap, state.lineJoin, state.miterLimit, state.lineDash, state.lineDashOffset], _Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .beginPathInstruction */ .$O);
    var ends = multiLineStringGeometry.getEnds();
    var flatCoordinates = multiLineStringGeometry.getFlatCoordinates();
    var stride = multiLineStringGeometry.getStride();
    var offset = 0;

    for (var i = 0, ii = ends.length; i < ii; ++i) {
      offset = this.drawFlatCoordinates_(flatCoordinates, offset,
      /** @type {number} */
      ends[i], stride);
    }

    this.hitDetectionInstructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .strokeInstruction */ .Yc);
    this.endGeometry(feature);
  };
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */


  CanvasLineStringBuilder.prototype.finish = function () {
    var state = this.state;

    if (state.lastStroke != undefined && state.lastStroke != this.coordinates.length) {
      this.instructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .strokeInstruction */ .Yc);
    }

    this.reverseHitDetectionInstructions();
    this.state = null;
    return _super.prototype.finish.call(this);
  };
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   */


  CanvasLineStringBuilder.prototype.applyStroke = function (state) {
    if (state.lastStroke != undefined && state.lastStroke != this.coordinates.length) {
      this.instructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .strokeInstruction */ .Yc);
      state.lastStroke = this.coordinates.length;
    }

    state.lastStroke = 0;

    _super.prototype.applyStroke.call(this, state);

    this.instructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .beginPathInstruction */ .$O);
  };

  return CanvasLineStringBuilder;
}(_Builder_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasLineStringBuilder);

/***/ }),

/***/ 1382:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Builder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2295);
/* harmony import */ var _Instruction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9506);
/* harmony import */ var _canvas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1184);
/* harmony import */ var _geom_flat_simplify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1999);
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
 * @module ol/render/canvas/PolygonBuilder
 */







var CanvasPolygonBuilder =
/** @class */
function (_super) {
  __extends(CanvasPolygonBuilder, _super);
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */


  function CanvasPolygonBuilder(tolerance, maxExtent, resolution, pixelRatio) {
    return _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @private
   * @return {number} End.
   */


  CanvasPolygonBuilder.prototype.drawFlatCoordinatess_ = function (flatCoordinates, offset, ends, stride) {
    var state = this.state;
    var fill = state.fillStyle !== undefined;
    var stroke = state.strokeStyle !== undefined;
    var numEnds = ends.length;
    this.instructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .beginPathInstruction */ .$O);
    this.hitDetectionInstructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .beginPathInstruction */ .$O);

    for (var i = 0; i < numEnds; ++i) {
      var end = ends[i];
      var myBegin = this.coordinates.length;
      var myEnd = this.appendFlatLineCoordinates(flatCoordinates, offset, end, stride, true, !stroke);
      var moveToLineToInstruction = [_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].MOVE_TO_LINE_TO */ .ZP.MOVE_TO_LINE_TO, myBegin, myEnd];
      this.instructions.push(moveToLineToInstruction);
      this.hitDetectionInstructions.push(moveToLineToInstruction);

      if (stroke) {
        // Performance optimization: only call closePath() when we have a stroke.
        // Otherwise the ring is closed already (see appendFlatLineCoordinates above).
        this.instructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .closePathInstruction */ .s3);
        this.hitDetectionInstructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .closePathInstruction */ .s3);
      }

      offset = end;
    }

    if (fill) {
      this.instructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .fillInstruction */ .gO);
      this.hitDetectionInstructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .fillInstruction */ .gO);
    }

    if (stroke) {
      this.instructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .strokeInstruction */ .Yc);
      this.hitDetectionInstructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .strokeInstruction */ .Yc);
    }

    return offset;
  };
  /**
   * @param {import("../../geom/Circle.js").default} circleGeometry Circle geometry.
   * @param {import("../../Feature.js").default} feature Feature.
   */


  CanvasPolygonBuilder.prototype.drawCircle = function (circleGeometry, feature) {
    var state = this.state;
    var fillStyle = state.fillStyle;
    var strokeStyle = state.strokeStyle;

    if (fillStyle === undefined && strokeStyle === undefined) {
      return;
    }

    this.setFillStrokeStyles_();
    this.beginGeometry(circleGeometry, feature);

    if (state.fillStyle !== undefined) {
      this.hitDetectionInstructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].SET_FILL_STYLE */ .ZP.SET_FILL_STYLE, _canvas_js__WEBPACK_IMPORTED_MODULE_1__/* .defaultFillStyle */ .bL]);
    }

    if (state.strokeStyle !== undefined) {
      this.hitDetectionInstructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].SET_STROKE_STYLE */ .ZP.SET_STROKE_STYLE, state.strokeStyle, state.lineWidth, state.lineCap, state.lineJoin, state.miterLimit, state.lineDash, state.lineDashOffset]);
    }

    var flatCoordinates = circleGeometry.getFlatCoordinates();
    var stride = circleGeometry.getStride();
    var myBegin = this.coordinates.length;
    this.appendFlatLineCoordinates(flatCoordinates, 0, flatCoordinates.length, stride, false, false);
    var circleInstruction = [_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].CIRCLE */ .ZP.CIRCLE, myBegin];
    this.instructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .beginPathInstruction */ .$O, circleInstruction);
    this.hitDetectionInstructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .beginPathInstruction */ .$O, circleInstruction);

    if (state.fillStyle !== undefined) {
      this.instructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .fillInstruction */ .gO);
      this.hitDetectionInstructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .fillInstruction */ .gO);
    }

    if (state.strokeStyle !== undefined) {
      this.instructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .strokeInstruction */ .Yc);
      this.hitDetectionInstructions.push(_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* .strokeInstruction */ .Yc);
    }

    this.endGeometry(feature);
  };
  /**
   * @param {import("../../geom/Polygon.js").default|import("../Feature.js").default} polygonGeometry Polygon geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */


  CanvasPolygonBuilder.prototype.drawPolygon = function (polygonGeometry, feature) {
    var state = this.state;
    var fillStyle = state.fillStyle;
    var strokeStyle = state.strokeStyle;

    if (fillStyle === undefined && strokeStyle === undefined) {
      return;
    }

    this.setFillStrokeStyles_();
    this.beginGeometry(polygonGeometry, feature);

    if (state.fillStyle !== undefined) {
      this.hitDetectionInstructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].SET_FILL_STYLE */ .ZP.SET_FILL_STYLE, _canvas_js__WEBPACK_IMPORTED_MODULE_1__/* .defaultFillStyle */ .bL]);
    }

    if (state.strokeStyle !== undefined) {
      this.hitDetectionInstructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].SET_STROKE_STYLE */ .ZP.SET_STROKE_STYLE, state.strokeStyle, state.lineWidth, state.lineCap, state.lineJoin, state.miterLimit, state.lineDash, state.lineDashOffset]);
    }

    var ends = polygonGeometry.getEnds();
    var flatCoordinates = polygonGeometry.getOrientedFlatCoordinates();
    var stride = polygonGeometry.getStride();
    this.drawFlatCoordinatess_(flatCoordinates, 0,
    /** @type {Array<number>} */
    ends, stride);
    this.endGeometry(feature);
  };
  /**
   * @param {import("../../geom/MultiPolygon.js").default} multiPolygonGeometry MultiPolygon geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */


  CanvasPolygonBuilder.prototype.drawMultiPolygon = function (multiPolygonGeometry, feature) {
    var state = this.state;
    var fillStyle = state.fillStyle;
    var strokeStyle = state.strokeStyle;

    if (fillStyle === undefined && strokeStyle === undefined) {
      return;
    }

    this.setFillStrokeStyles_();
    this.beginGeometry(multiPolygonGeometry, feature);

    if (state.fillStyle !== undefined) {
      this.hitDetectionInstructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].SET_FILL_STYLE */ .ZP.SET_FILL_STYLE, _canvas_js__WEBPACK_IMPORTED_MODULE_1__/* .defaultFillStyle */ .bL]);
    }

    if (state.strokeStyle !== undefined) {
      this.hitDetectionInstructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].SET_STROKE_STYLE */ .ZP.SET_STROKE_STYLE, state.strokeStyle, state.lineWidth, state.lineCap, state.lineJoin, state.miterLimit, state.lineDash, state.lineDashOffset]);
    }

    var endss = multiPolygonGeometry.getEndss();
    var flatCoordinates = multiPolygonGeometry.getOrientedFlatCoordinates();
    var stride = multiPolygonGeometry.getStride();
    var offset = 0;

    for (var i = 0, ii = endss.length; i < ii; ++i) {
      offset = this.drawFlatCoordinatess_(flatCoordinates, offset, endss[i], stride);
    }

    this.endGeometry(feature);
  };
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */


  CanvasPolygonBuilder.prototype.finish = function () {
    this.reverseHitDetectionInstructions();
    this.state = null; // We want to preserve topology when drawing polygons.  Polygons are
    // simplified using quantization and point elimination. However, we might
    // have received a mix of quantized and non-quantized geometries, so ensure
    // that all are quantized by quantizing all coordinates in the batch.

    var tolerance = this.tolerance;

    if (tolerance !== 0) {
      var coordinates = this.coordinates;

      for (var i = 0, ii = coordinates.length; i < ii; ++i) {
        coordinates[i] = (0,_geom_flat_simplify_js__WEBPACK_IMPORTED_MODULE_2__/* .snap */ .uZ)(coordinates[i], tolerance);
      }
    }

    return _super.prototype.finish.call(this);
  };
  /**
   * @private
   */


  CanvasPolygonBuilder.prototype.setFillStrokeStyles_ = function () {
    var state = this.state;
    var fillStyle = state.fillStyle;

    if (fillStyle !== undefined) {
      this.updateFillStyle(state, this.createFill);
    }

    if (state.strokeStyle !== undefined) {
      this.updateStrokeStyle(state, this.applyStroke);
    }
  };

  return CanvasPolygonBuilder;
}(_Builder_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasPolygonBuilder);

/***/ }),

/***/ 7353:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ TEXT_ALIGN),
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Builder_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2295);
/* harmony import */ var _Instruction_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9506);
/* harmony import */ var _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5870);
/* harmony import */ var _style_TextPlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1722);
/* harmony import */ var _colorlike_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5739);
/* harmony import */ var _canvas_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1184);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2618);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1046);
/* harmony import */ var _geom_flat_straightchunk_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5091);
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
 * @module ol/render/canvas/TextBuilder
 */











/**
 * @const
 * @enum {number}
 */

var TEXT_ALIGN = {
  'left': 0,
  'end': 0,
  'center': 0.5,
  'right': 1,
  'start': 1,
  'top': 0,
  'middle': 0.5,
  'hanging': 0.2,
  'alphabetic': 0.8,
  'ideographic': 0.8,
  'bottom': 1
};

var CanvasTextBuilder =
/** @class */
function (_super) {
  __extends(CanvasTextBuilder, _super);
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */


  function CanvasTextBuilder(tolerance, maxExtent, resolution, pixelRatio) {
    var _this = _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
    /**
     * @private
     * @type {Array<HTMLCanvasElement>}
     */


    _this.labels_ = null;
    /**
     * @private
     * @type {string}
     */

    _this.text_ = '';
    /**
     * @private
     * @type {number}
     */

    _this.textOffsetX_ = 0;
    /**
     * @private
     * @type {number}
     */

    _this.textOffsetY_ = 0;
    /**
     * @private
     * @type {boolean|undefined}
     */

    _this.textRotateWithView_ = undefined;
    /**
     * @private
     * @type {number}
     */

    _this.textRotation_ = 0;
    /**
     * @private
     * @type {?import("../canvas.js").FillState}
     */

    _this.textFillState_ = null;
    /**
     * @type {!Object<string, import("../canvas.js").FillState>}
     */

    _this.fillStates = {};
    /**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */

    _this.textStrokeState_ = null;
    /**
     * @type {!Object<string, import("../canvas.js").StrokeState>}
     */

    _this.strokeStates = {};
    /**
     * @private
     * @type {import("../canvas.js").TextState}
     */

    _this.textState_ =
    /** @type {import("../canvas.js").TextState} */
    {};
    /**
     * @type {!Object<string, import("../canvas.js").TextState>}
     */

    _this.textStates = {};
    /**
     * @private
     * @type {string}
     */

    _this.textKey_ = '';
    /**
     * @private
     * @type {string}
     */

    _this.fillKey_ = '';
    /**
     * @private
     * @type {string}
     */

    _this.strokeKey_ = '';
    /**
     * Data shared with an image builder for combined decluttering.
     * @private
     * @type {import("../canvas.js").DeclutterImageWithText}
     */

    _this.declutterImageWithText_ = undefined;
    return _this;
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */


  CanvasTextBuilder.prototype.finish = function () {
    var instructions = _super.prototype.finish.call(this);

    instructions.textStates = this.textStates;
    instructions.fillStates = this.fillStates;
    instructions.strokeStates = this.strokeStates;
    return instructions;
  };
  /**
   * @param {import("../../geom/SimpleGeometry.js").default|import("../Feature.js").default} geometry Geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */


  CanvasTextBuilder.prototype.drawText = function (geometry, feature) {
    var fillState = this.textFillState_;
    var strokeState = this.textStrokeState_;
    var textState = this.textState_;

    if (this.text_ === '' || !textState || !fillState && !strokeState) {
      return;
    }

    var coordinates = this.coordinates;
    var begin = coordinates.length;
    var geometryType = geometry.getType();
    var flatCoordinates = null;
    var stride = geometry.getStride();

    if (textState.placement === _style_TextPlacement_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].LINE */ .Z.LINE && (geometryType == _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].LINE_STRING */ .Z.LINE_STRING || geometryType == _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MULTI_LINE_STRING */ .Z.MULTI_LINE_STRING || geometryType == _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].POLYGON */ .Z.POLYGON || geometryType == _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MULTI_POLYGON */ .Z.MULTI_POLYGON)) {
      if (!(0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .intersects */ .kK)(this.getBufferedMaxExtent(), geometry.getExtent())) {
        return;
      }

      var ends = void 0;
      flatCoordinates = geometry.getFlatCoordinates();

      if (geometryType == _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].LINE_STRING */ .Z.LINE_STRING) {
        ends = [flatCoordinates.length];
      } else if (geometryType == _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MULTI_LINE_STRING */ .Z.MULTI_LINE_STRING) {
        ends =
        /** @type {import("../../geom/MultiLineString.js").default} */
        geometry.getEnds();
      } else if (geometryType == _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].POLYGON */ .Z.POLYGON) {
        ends =
        /** @type {import("../../geom/Polygon.js").default} */
        geometry.getEnds().slice(0, 1);
      } else if (geometryType == _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MULTI_POLYGON */ .Z.MULTI_POLYGON) {
        var endss =
        /** @type {import("../../geom/MultiPolygon.js").default} */
        geometry.getEndss();
        ends = [];

        for (var i = 0, ii = endss.length; i < ii; ++i) {
          ends.push(endss[i][0]);
        }
      }

      this.beginGeometry(geometry, feature);
      var textAlign = textState.textAlign;
      var flatOffset = 0;
      var flatEnd = void 0;

      for (var o = 0, oo = ends.length; o < oo; ++o) {
        if (textAlign == undefined) {
          var range = (0,_geom_flat_straightchunk_js__WEBPACK_IMPORTED_MODULE_3__/* .matchingChunk */ ._)(textState.maxAngle, flatCoordinates, flatOffset, ends[o], stride);
          flatOffset = range[0];
          flatEnd = range[1];
        } else {
          flatEnd = ends[o];
        }

        for (var i = flatOffset; i < flatEnd; i += stride) {
          coordinates.push(flatCoordinates[i], flatCoordinates[i + 1]);
        }

        var end = coordinates.length;
        flatOffset = ends[o];
        this.drawChars_(begin, end);
        begin = end;
      }

      this.endGeometry(feature);
    } else {
      var geometryWidths = textState.overflow ? null : [];

      switch (geometryType) {
        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].POINT */ .Z.POINT:
        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MULTI_POINT */ .Z.MULTI_POINT:
          flatCoordinates =
          /** @type {import("../../geom/MultiPoint.js").default} */
          geometry.getFlatCoordinates();
          break;

        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].LINE_STRING */ .Z.LINE_STRING:
          flatCoordinates =
          /** @type {import("../../geom/LineString.js").default} */
          geometry.getFlatMidpoint();
          break;

        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].CIRCLE */ .Z.CIRCLE:
          flatCoordinates =
          /** @type {import("../../geom/Circle.js").default} */
          geometry.getCenter();
          break;

        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MULTI_LINE_STRING */ .Z.MULTI_LINE_STRING:
          flatCoordinates =
          /** @type {import("../../geom/MultiLineString.js").default} */
          geometry.getFlatMidpoints();
          stride = 2;
          break;

        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].POLYGON */ .Z.POLYGON:
          flatCoordinates =
          /** @type {import("../../geom/Polygon.js").default} */
          geometry.getFlatInteriorPoint();

          if (!textState.overflow) {
            geometryWidths.push(flatCoordinates[2] / this.resolution);
          }

          stride = 3;
          break;

        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MULTI_POLYGON */ .Z.MULTI_POLYGON:
          var interiorPoints =
          /** @type {import("../../geom/MultiPolygon.js").default} */
          geometry.getFlatInteriorPoints();
          flatCoordinates = [];

          for (var i = 0, ii = interiorPoints.length; i < ii; i += 3) {
            if (!textState.overflow) {
              geometryWidths.push(interiorPoints[i + 2] / this.resolution);
            }

            flatCoordinates.push(interiorPoints[i], interiorPoints[i + 1]);
          }

          if (flatCoordinates.length === 0) {
            return;
          }

          stride = 2;
          break;

        default:
      }

      var end = this.appendFlatPointCoordinates(flatCoordinates, stride);

      if (end === begin) {
        return;
      }

      if (geometryWidths && (end - begin) / 2 !== flatCoordinates.length / stride) {
        var beg_1 = begin / 2;
        geometryWidths = geometryWidths.filter(function (w, i) {
          var keep = coordinates[(beg_1 + i) * 2] === flatCoordinates[i * stride] && coordinates[(beg_1 + i) * 2 + 1] === flatCoordinates[i * stride + 1];

          if (!keep) {
            --beg_1;
          }

          return keep;
        });
      }

      this.saveTextStates_();

      if (textState.backgroundFill || textState.backgroundStroke) {
        this.setFillStrokeStyle(textState.backgroundFill, textState.backgroundStroke);

        if (textState.backgroundFill) {
          this.updateFillStyle(this.state, this.createFill);
          this.hitDetectionInstructions.push(this.createFill(this.state));
        }

        if (textState.backgroundStroke) {
          this.updateStrokeStyle(this.state, this.applyStroke);
          this.hitDetectionInstructions.push(this.createStroke(this.state));
        }
      }

      this.beginGeometry(geometry, feature); // adjust padding for negative scale

      var padding = textState.padding;

      if (padding != _canvas_js__WEBPACK_IMPORTED_MODULE_4__/* .defaultPadding */ .oB && (textState.scale[0] < 0 || textState.scale[1] < 0)) {
        var p0 = textState.padding[0];
        var p1 = textState.padding[1];
        var p2 = textState.padding[2];
        var p3 = textState.padding[3];

        if (textState.scale[0] < 0) {
          p1 = -p1;
          p3 = -p3;
        }

        if (textState.scale[1] < 0) {
          p0 = -p0;
          p2 = -p2;
        }

        padding = [p0, p1, p2, p3];
      } // The image is unknown at this stage so we pass null; it will be computed at render time.
      // For clarity, we pass NaN for offsetX, offsetY, width and height, which will be computed at
      // render time.


      var pixelRatio_1 = this.pixelRatio;
      this.instructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].DRAW_IMAGE */ .ZP.DRAW_IMAGE, begin, end, null, NaN, NaN, NaN, 1, 0, 0, this.textRotateWithView_, this.textRotation_, [1, 1], NaN, this.declutterImageWithText_, padding == _canvas_js__WEBPACK_IMPORTED_MODULE_4__/* .defaultPadding */ .oB ? _canvas_js__WEBPACK_IMPORTED_MODULE_4__/* .defaultPadding */ .oB : padding.map(function (p) {
        return p * pixelRatio_1;
      }), !!textState.backgroundFill, !!textState.backgroundStroke, this.text_, this.textKey_, this.strokeKey_, this.fillKey_, this.textOffsetX_, this.textOffsetY_, geometryWidths]);
      var scale = 1 / pixelRatio_1;
      this.hitDetectionInstructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].DRAW_IMAGE */ .ZP.DRAW_IMAGE, begin, end, null, NaN, NaN, NaN, 1, 0, 0, this.textRotateWithView_, this.textRotation_, [scale, scale], NaN, this.declutterImageWithText_, padding, !!textState.backgroundFill, !!textState.backgroundStroke, this.text_, this.textKey_, this.strokeKey_, this.fillKey_, this.textOffsetX_, this.textOffsetY_, geometryWidths]);
      this.endGeometry(feature);
    }
  };
  /**
   * @private
   */


  CanvasTextBuilder.prototype.saveTextStates_ = function () {
    var strokeState = this.textStrokeState_;
    var textState = this.textState_;
    var fillState = this.textFillState_;
    var strokeKey = this.strokeKey_;

    if (strokeState) {
      if (!(strokeKey in this.strokeStates)) {
        this.strokeStates[strokeKey] = {
          strokeStyle: strokeState.strokeStyle,
          lineCap: strokeState.lineCap,
          lineDashOffset: strokeState.lineDashOffset,
          lineWidth: strokeState.lineWidth,
          lineJoin: strokeState.lineJoin,
          miterLimit: strokeState.miterLimit,
          lineDash: strokeState.lineDash
        };
      }
    }

    var textKey = this.textKey_;

    if (!(textKey in this.textStates)) {
      this.textStates[textKey] = {
        font: textState.font,
        textAlign: textState.textAlign || _canvas_js__WEBPACK_IMPORTED_MODULE_4__/* .defaultTextAlign */ .PH,
        textBaseline: textState.textBaseline || _canvas_js__WEBPACK_IMPORTED_MODULE_4__/* .defaultTextBaseline */ .ru,
        scale: textState.scale
      };
    }

    var fillKey = this.fillKey_;

    if (fillState) {
      if (!(fillKey in this.fillStates)) {
        this.fillStates[fillKey] = {
          fillStyle: fillState.fillStyle
        };
      }
    }
  };
  /**
   * @private
   * @param {number} begin Begin.
   * @param {number} end End.
   */


  CanvasTextBuilder.prototype.drawChars_ = function (begin, end) {
    var strokeState = this.textStrokeState_;
    var textState = this.textState_;
    var strokeKey = this.strokeKey_;
    var textKey = this.textKey_;
    var fillKey = this.fillKey_;
    this.saveTextStates_();
    var pixelRatio = this.pixelRatio;
    var baseline = TEXT_ALIGN[textState.textBaseline];
    var offsetY = this.textOffsetY_ * pixelRatio;
    var text = this.text_;
    var strokeWidth = strokeState ? strokeState.lineWidth * Math.abs(textState.scale[0]) / 2 : 0;
    this.instructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].DRAW_CHARS */ .ZP.DRAW_CHARS, begin, end, baseline, textState.overflow, fillKey, textState.maxAngle, pixelRatio, offsetY, strokeKey, strokeWidth * pixelRatio, text, textKey, 1]);
    this.hitDetectionInstructions.push([_Instruction_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].DRAW_CHARS */ .ZP.DRAW_CHARS, begin, end, baseline, textState.overflow, fillKey, textState.maxAngle, 1, offsetY, strokeKey, strokeWidth, text, textKey, 1 / pixelRatio]);
  };
  /**
   * @param {import("../../style/Text.js").default} textStyle Text style.
   * @param {Object} [opt_sharedData] Shared data.
   */


  CanvasTextBuilder.prototype.setTextStyle = function (textStyle, opt_sharedData) {
    var textState, fillState, strokeState;

    if (!textStyle) {
      this.text_ = '';
    } else {
      var textFillStyle = textStyle.getFill();

      if (!textFillStyle) {
        fillState = null;
        this.textFillState_ = fillState;
      } else {
        fillState = this.textFillState_;

        if (!fillState) {
          fillState =
          /** @type {import("../canvas.js").FillState} */
          {};
          this.textFillState_ = fillState;
        }

        fillState.fillStyle = (0,_colorlike_js__WEBPACK_IMPORTED_MODULE_6__/* .asColorLike */ .y)(textFillStyle.getColor() || _canvas_js__WEBPACK_IMPORTED_MODULE_4__/* .defaultFillStyle */ .bL);
      }

      var textStrokeStyle = textStyle.getStroke();

      if (!textStrokeStyle) {
        strokeState = null;
        this.textStrokeState_ = strokeState;
      } else {
        strokeState = this.textStrokeState_;

        if (!strokeState) {
          strokeState =
          /** @type {import("../canvas.js").StrokeState} */
          {};
          this.textStrokeState_ = strokeState;
        }

        var lineDash = textStrokeStyle.getLineDash();
        var lineDashOffset = textStrokeStyle.getLineDashOffset();
        var lineWidth = textStrokeStyle.getWidth();
        var miterLimit = textStrokeStyle.getMiterLimit();
        strokeState.lineCap = textStrokeStyle.getLineCap() || _canvas_js__WEBPACK_IMPORTED_MODULE_4__/* .defaultLineCap */ .mb;
        strokeState.lineDash = lineDash ? lineDash.slice() : _canvas_js__WEBPACK_IMPORTED_MODULE_4__/* .defaultLineDash */ .X9;
        strokeState.lineDashOffset = lineDashOffset === undefined ? _canvas_js__WEBPACK_IMPORTED_MODULE_4__/* .defaultLineDashOffset */ .He : lineDashOffset;
        strokeState.lineJoin = textStrokeStyle.getLineJoin() || _canvas_js__WEBPACK_IMPORTED_MODULE_4__/* .defaultLineJoin */ .rc;
        strokeState.lineWidth = lineWidth === undefined ? _canvas_js__WEBPACK_IMPORTED_MODULE_4__/* .defaultLineWidth */ .yC : lineWidth;
        strokeState.miterLimit = miterLimit === undefined ? _canvas_js__WEBPACK_IMPORTED_MODULE_4__/* .defaultMiterLimit */ .V4 : miterLimit;
        strokeState.strokeStyle = (0,_colorlike_js__WEBPACK_IMPORTED_MODULE_6__/* .asColorLike */ .y)(textStrokeStyle.getColor() || _canvas_js__WEBPACK_IMPORTED_MODULE_4__/* .defaultStrokeStyle */ .Tx);
      }

      textState = this.textState_;
      var font = textStyle.getFont() || _canvas_js__WEBPACK_IMPORTED_MODULE_4__/* .defaultFont */ .Df;
      (0,_canvas_js__WEBPACK_IMPORTED_MODULE_4__/* .registerFont */ .Qx)(font);
      var textScale = textStyle.getScaleArray();
      textState.overflow = textStyle.getOverflow();
      textState.font = font;
      textState.maxAngle = textStyle.getMaxAngle();
      textState.placement = textStyle.getPlacement();
      textState.textAlign = textStyle.getTextAlign();
      textState.textBaseline = textStyle.getTextBaseline() || _canvas_js__WEBPACK_IMPORTED_MODULE_4__/* .defaultTextBaseline */ .ru;
      textState.backgroundFill = textStyle.getBackgroundFill();
      textState.backgroundStroke = textStyle.getBackgroundStroke();
      textState.padding = textStyle.getPadding() || _canvas_js__WEBPACK_IMPORTED_MODULE_4__/* .defaultPadding */ .oB;
      textState.scale = textScale === undefined ? [1, 1] : textScale;
      var textOffsetX = textStyle.getOffsetX();
      var textOffsetY = textStyle.getOffsetY();
      var textRotateWithView = textStyle.getRotateWithView();
      var textRotation = textStyle.getRotation();
      this.text_ = textStyle.getText() || '';
      this.textOffsetX_ = textOffsetX === undefined ? 0 : textOffsetX;
      this.textOffsetY_ = textOffsetY === undefined ? 0 : textOffsetY;
      this.textRotateWithView_ = textRotateWithView === undefined ? false : textRotateWithView;
      this.textRotation_ = textRotation === undefined ? 0 : textRotation;
      this.strokeKey_ = strokeState ? (typeof strokeState.strokeStyle == 'string' ? strokeState.strokeStyle : (0,_util_js__WEBPACK_IMPORTED_MODULE_7__/* .getUid */ .sq)(strokeState.strokeStyle)) + strokeState.lineCap + strokeState.lineDashOffset + '|' + strokeState.lineWidth + strokeState.lineJoin + strokeState.miterLimit + '[' + strokeState.lineDash.join() + ']' : '';
      this.textKey_ = textState.font + textState.scale + (textState.textAlign || '?') + (textState.textBaseline || '?');
      this.fillKey_ = fillState ? typeof fillState.fillStyle == 'string' ? fillState.fillStyle : '|' + (0,_util_js__WEBPACK_IMPORTED_MODULE_7__/* .getUid */ .sq)(fillState.fillStyle) : '';
    }

    this.declutterImageWithText_ = opt_sharedData;
  };

  return CanvasTextBuilder;
}(_Builder_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasTextBuilder);

/***/ }),

/***/ 2005:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TU": () => (/* binding */ createHitDetectionImageData),
/* harmony export */   "UN": () => (/* binding */ HIT_DETECT_RESOLUTION),
/* harmony export */   "ix": () => (/* binding */ hitDetect)
/* harmony export */ });
/* harmony import */ var _Immediate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2676);
/* harmony import */ var _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5870);
/* harmony import */ var _style_IconAnchorUnits_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3263);
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9676);
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4495);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9631);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1046);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3620);
/**
 * @module ol/render/canvas/hitdetect
 */








var HIT_DETECT_RESOLUTION = 0.5;
/**
 * @param {import("../../size.js").Size} size Canvas size in css pixels.
 * @param {Array<import("../../transform.js").Transform>} transforms Transforms
 * for rendering features to all worlds of the viewport, from coordinates to css
 * pixels.
 * @param {Array<import("../../Feature.js").FeatureLike>} features
 * Features to consider for hit detection.
 * @param {import("../../style/Style.js").StyleFunction|undefined} styleFunction
 * Layer style function.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @param {number} resolution Resolution.
 * @param {number} rotation Rotation.
 * @return {ImageData} Hit detection image data.
 */

function createHitDetectionImageData(size, transforms, features, styleFunction, extent, resolution, rotation) {
  var width = size[0] * HIT_DETECT_RESOLUTION;
  var height = size[1] * HIT_DETECT_RESOLUTION;
  var context = (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__/* .createCanvasContext2D */ .E4)(width, height);
  context.imageSmoothingEnabled = false;
  var canvas = context.canvas;
  var renderer = new _Immediate_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z(context, HIT_DETECT_RESOLUTION, extent, null, rotation);
  var featureCount = features.length; // Stretch hit detection index to use the whole available color range

  var indexFactor = Math.floor((256 * 256 * 256 - 1) / featureCount);
  var featuresByZIndex = {};

  for (var i = 1; i <= featureCount; ++i) {
    var feature = features[i - 1];
    var featureStyleFunction = feature.getStyleFunction() || styleFunction;

    if (!styleFunction) {
      continue;
    }

    var styles = featureStyleFunction(feature, resolution);

    if (!styles) {
      continue;
    }

    if (!Array.isArray(styles)) {
      styles = [styles];
    }

    var index = i * indexFactor;
    var color = '#' + ('000000' + index.toString(16)).slice(-6);

    for (var j = 0, jj = styles.length; j < jj; ++j) {
      var originalStyle = styles[j];
      var geometry = originalStyle.getGeometryFunction()(feature);

      if (!geometry || !(0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .intersects */ .kK)(extent, geometry.getExtent())) {
        continue;
      }

      var style = originalStyle.clone();
      var fill = style.getFill();

      if (fill) {
        fill.setColor(color);
      }

      var stroke = style.getStroke();

      if (stroke) {
        stroke.setColor(color);
        stroke.setLineDash(null);
      }

      style.setText(undefined);
      var image = originalStyle.getImage();

      if (image && image.getOpacity() !== 0) {
        var imgSize = image.getImageSize();

        if (!imgSize) {
          continue;
        }

        var imgContext = (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__/* .createCanvasContext2D */ .E4)(imgSize[0], imgSize[1], undefined, {
          alpha: false
        });
        var img = imgContext.canvas;
        imgContext.fillStyle = color;
        imgContext.fillRect(0, 0, img.width, img.height);
        style.setImage(new _style_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z({
          img: img,
          imgSize: imgSize,
          anchor: image.getAnchor(),
          anchorXUnits: _style_IconAnchorUnits_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].PIXELS */ .Z.PIXELS,
          anchorYUnits: _style_IconAnchorUnits_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].PIXELS */ .Z.PIXELS,
          offset: image.getOrigin(),
          opacity: 1,
          size: image.getSize(),
          scale: image.getScale(),
          rotation: image.getRotation(),
          rotateWithView: image.getRotateWithView()
        }));
      }

      var zIndex = style.getZIndex() || 0;
      var byGeometryType = featuresByZIndex[zIndex];

      if (!byGeometryType) {
        byGeometryType = {};
        featuresByZIndex[zIndex] = byGeometryType;
        byGeometryType[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].POLYGON */ .Z.POLYGON] = [];
        byGeometryType[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].CIRCLE */ .Z.CIRCLE] = [];
        byGeometryType[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].LINE_STRING */ .Z.LINE_STRING] = [];
        byGeometryType[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].POINT */ .Z.POINT] = [];
      }

      byGeometryType[geometry.getType().replace('Multi', '')].push(geometry, style);
    }
  }

  var zIndexKeys = Object.keys(featuresByZIndex).map(Number).sort(_array_js__WEBPACK_IMPORTED_MODULE_6__/* .numberSafeCompareFunction */ .kK);

  for (var i = 0, ii = zIndexKeys.length; i < ii; ++i) {
    var byGeometryType = featuresByZIndex[zIndexKeys[i]];

    for (var type in byGeometryType) {
      var geomAndStyle = byGeometryType[type];

      for (var j = 0, jj = geomAndStyle.length; j < jj; j += 2) {
        renderer.setStyle(geomAndStyle[j + 1]);

        for (var k = 0, kk = transforms.length; k < kk; ++k) {
          renderer.setTransform(transforms[k]);
          renderer.drawGeometry(geomAndStyle[j]);
        }
      }
    }
  }

  return context.getImageData(0, 0, canvas.width, canvas.height);
}
/**
 * @param {import("../../pixel").Pixel} pixel Pixel coordinate on the hit
 * detection canvas in css pixels.
 * @param {Array<import("../../Feature").FeatureLike>} features Features. Has to
 * match the `features` array that was passed to `createHitDetectionImageData()`.
 * @param {ImageData} imageData Hit detection image data generated by
 * `createHitDetectionImageData()`.
 * @return {Array<import("../../Feature").FeatureLike>} features Features.
 */

function hitDetect(pixel, features, imageData) {
  var resultFeatures = [];

  if (imageData) {
    var x = Math.floor(Math.round(pixel[0]) * HIT_DETECT_RESOLUTION);
    var y = Math.floor(Math.round(pixel[1]) * HIT_DETECT_RESOLUTION); // The pixel coordinate is clamped down to the hit-detect canvas' size to account
    // for browsers returning coordinates slightly larger than the actual canvas size
    // due to a non-integer pixel ratio.

    var index = ((0,_math_js__WEBPACK_IMPORTED_MODULE_7__/* .clamp */ .uZ)(x, 0, imageData.width - 1) + (0,_math_js__WEBPACK_IMPORTED_MODULE_7__/* .clamp */ .uZ)(y, 0, imageData.height - 1) * imageData.width) * 4;
    var r = imageData.data[index];
    var g = imageData.data[index + 1];
    var b = imageData.data[index + 2];
    var i = b + 256 * (g + 256 * r);
    var indexFactor = Math.floor((256 * 256 * 256 - 1) / features.length);

    if (i && i % indexFactor === 0) {
      resultFeatures.push(features[i / indexFactor - 1]);
    }
  }

  return resultFeatures;
}

/***/ })

}]);