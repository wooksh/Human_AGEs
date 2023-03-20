"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[270],{

/***/ 8907:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Pn": () => (/* binding */ renderFeature),
/* harmony export */   "Qz": () => (/* binding */ getTolerance),
/* harmony export */   "eR": () => (/* binding */ defaultOrder),
/* harmony export */   "se": () => (/* binding */ getSquaredTolerance)
/* harmony export */ });
/* harmony import */ var _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6175);
/* harmony import */ var _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5870);
/* harmony import */ var _ImageState_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4382);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2618);
/**
 * @module ol/renderer/vector
 */




/**
 * Feature callback. The callback will be called with three arguments. The first
 * argument is one {@link module:ol/Feature feature} or {@link module:ol/render/Feature render feature}
 * at the pixel, the second is the {@link module:ol/layer/Layer layer} of the feature and will be null for
 * unmanaged layers. The third is the {@link module:ol/geom/SimpleGeometry} of the feature. For features
 * with a GeometryCollection geometry, it will be the first detected geometry from the collection.
 * @template T
 * @typedef {function(import("../Feature.js").FeatureLike, import("../layer/Layer.js").default<import("../source/Source").default>, import("../geom/SimpleGeometry.js").default): T} FeatureCallback
 */

/**
 * Tolerance for geometry simplification in device pixels.
 * @type {number}
 */

var SIMPLIFY_TOLERANCE = 0.5;
/**
 * @const
 * @type {Object<import("../geom/GeometryType.js").default,
 *                function(import("../render/canvas/BuilderGroup.js").default, import("../geom/Geometry.js").default,
 *                         import("../style/Style.js").default, Object): void>}
 */

var GEOMETRY_RENDERERS = {
  'Point': renderPointGeometry,
  'LineString': renderLineStringGeometry,
  'Polygon': renderPolygonGeometry,
  'MultiPoint': renderMultiPointGeometry,
  'MultiLineString': renderMultiLineStringGeometry,
  'MultiPolygon': renderMultiPolygonGeometry,
  'GeometryCollection': renderGeometryCollectionGeometry,
  'Circle': renderCircleGeometry
};
/**
 * @param {import("../Feature.js").FeatureLike} feature1 Feature 1.
 * @param {import("../Feature.js").FeatureLike} feature2 Feature 2.
 * @return {number} Order.
 */

function defaultOrder(feature1, feature2) {
  return parseInt((0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .getUid */ .sq)(feature1), 10) - parseInt((0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .getUid */ .sq)(feature2), 10);
}
/**
 * @param {number} resolution Resolution.
 * @param {number} pixelRatio Pixel ratio.
 * @return {number} Squared pixel tolerance.
 */

function getSquaredTolerance(resolution, pixelRatio) {
  var tolerance = getTolerance(resolution, pixelRatio);
  return tolerance * tolerance;
}
/**
 * @param {number} resolution Resolution.
 * @param {number} pixelRatio Pixel ratio.
 * @return {number} Pixel tolerance.
 */

function getTolerance(resolution, pixelRatio) {
  return SIMPLIFY_TOLERANCE * resolution / pixelRatio;
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Builder group.
 * @param {import("../geom/Circle.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").default} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 */

function renderCircleGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var fillStyle = style.getFill();
  var strokeStyle = style.getStroke();

  if (fillStyle || strokeStyle) {
    var circleReplay = builderGroup.getBuilder(style.getZIndex(), _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].CIRCLE */ .Z.CIRCLE);
    circleReplay.setFillStrokeStyle(fillStyle, strokeStyle);
    circleReplay.drawCircle(geometry, feature);
  }

  var textStyle = style.getText();

  if (textStyle && textStyle.getText()) {
    var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].TEXT */ .Z.TEXT);
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} replayGroup Replay group.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../style/Style.js").default} style Style.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {function(import("../events/Event.js").default): void} listener Listener function.
 * @param {import("../proj.js").TransformFunction} [opt_transform] Transform from user to view projection.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 * @return {boolean} `true` if style is loading.
 */


function renderFeature(replayGroup, feature, style, squaredTolerance, listener, opt_transform, opt_declutterBuilderGroup) {
  var loading = false;
  var imageStyle = style.getImage();

  if (imageStyle) {
    var imageState = imageStyle.getImageState();

    if (imageState == _ImageState_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].LOADED */ .Z.LOADED || imageState == _ImageState_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].ERROR */ .Z.ERROR) {
      imageStyle.unlistenImageChange(listener);
    } else {
      if (imageState == _ImageState_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].IDLE */ .Z.IDLE) {
        imageStyle.load();
      }

      imageState = imageStyle.getImageState();
      imageStyle.listenImageChange(listener);
      loading = true;
    }
  }

  renderFeatureInternal(replayGroup, feature, style, squaredTolerance, opt_transform, opt_declutterBuilderGroup);
  return loading;
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} replayGroup Replay group.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../style/Style.js").default} style Style.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {import("../proj.js").TransformFunction} [opt_transform] Optional transform function.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 */

function renderFeatureInternal(replayGroup, feature, style, squaredTolerance, opt_transform, opt_declutterBuilderGroup) {
  var geometry = style.getGeometryFunction()(feature);

  if (!geometry) {
    return;
  }

  var simplifiedGeometry = geometry.simplifyTransformed(squaredTolerance, opt_transform);
  var renderer = style.getRenderer();

  if (renderer) {
    renderGeometry(replayGroup, simplifiedGeometry, style, feature);
  } else {
    var geometryRenderer = GEOMETRY_RENDERERS[simplifiedGeometry.getType()];
    geometryRenderer(replayGroup, simplifiedGeometry, style, feature, opt_declutterBuilderGroup);
  }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} replayGroup Replay group.
 * @param {import("../geom/Geometry.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 */


function renderGeometry(replayGroup, geometry, style, feature) {
  if (geometry.getType() == _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].GEOMETRY_COLLECTION */ .Z.GEOMETRY_COLLECTION) {
    var geometries =
    /** @type {import("../geom/GeometryCollection.js").default} */
    geometry.getGeometries();

    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      renderGeometry(replayGroup, geometries[i], style, feature);
    }

    return;
  }

  var replay = replayGroup.getBuilder(style.getZIndex(), _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].DEFAULT */ .Z.DEFAULT);
  replay.drawCustom(
  /** @type {import("../geom/SimpleGeometry.js").default} */
  geometry, feature, style.getRenderer(), style.getHitDetectionRenderer());
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} replayGroup Replay group.
 * @param {import("../geom/GeometryCollection.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").default} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 */


function renderGeometryCollectionGeometry(replayGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var geometries = geometry.getGeometriesArray();
  var i, ii;

  for (i = 0, ii = geometries.length; i < ii; ++i) {
    var geometryRenderer = GEOMETRY_RENDERERS[geometries[i].getType()];
    geometryRenderer(replayGroup, geometries[i], style, feature, opt_declutterBuilderGroup);
  }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/LineString.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 */


function renderLineStringGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var strokeStyle = style.getStroke();

  if (strokeStyle) {
    var lineStringReplay = builderGroup.getBuilder(style.getZIndex(), _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].LINE_STRING */ .Z.LINE_STRING);
    lineStringReplay.setFillStrokeStyle(null, strokeStyle);
    lineStringReplay.drawLineString(geometry, feature);
  }

  var textStyle = style.getText();

  if (textStyle && textStyle.getText()) {
    var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].TEXT */ .Z.TEXT);
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/MultiLineString.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 */


function renderMultiLineStringGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var strokeStyle = style.getStroke();

  if (strokeStyle) {
    var lineStringReplay = builderGroup.getBuilder(style.getZIndex(), _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].LINE_STRING */ .Z.LINE_STRING);
    lineStringReplay.setFillStrokeStyle(null, strokeStyle);
    lineStringReplay.drawMultiLineString(geometry, feature);
  }

  var textStyle = style.getText();

  if (textStyle && textStyle.getText()) {
    var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].TEXT */ .Z.TEXT);
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/MultiPolygon.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").default} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 */


function renderMultiPolygonGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var fillStyle = style.getFill();
  var strokeStyle = style.getStroke();

  if (strokeStyle || fillStyle) {
    var polygonReplay = builderGroup.getBuilder(style.getZIndex(), _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].POLYGON */ .Z.POLYGON);
    polygonReplay.setFillStrokeStyle(fillStyle, strokeStyle);
    polygonReplay.drawMultiPolygon(geometry, feature);
  }

  var textStyle = style.getText();

  if (textStyle && textStyle.getText()) {
    var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].TEXT */ .Z.TEXT);
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/Point.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 */


function renderPointGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var imageStyle = style.getImage();
  var textStyle = style.getText();
  /** @type {import("../render/canvas.js").DeclutterImageWithText} */

  var declutterImageWithText;

  if (opt_declutterBuilderGroup) {
    builderGroup = opt_declutterBuilderGroup;
    declutterImageWithText = imageStyle && textStyle && textStyle.getText() ? {} : undefined;
  }

  if (imageStyle) {
    if (imageStyle.getImageState() != _ImageState_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].LOADED */ .Z.LOADED) {
      return;
    }

    var imageReplay = builderGroup.getBuilder(style.getZIndex(), _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].IMAGE */ .Z.IMAGE);
    imageReplay.setImageStyle(imageStyle, declutterImageWithText);
    imageReplay.drawPoint(geometry, feature);
  }

  if (textStyle && textStyle.getText()) {
    var textReplay = builderGroup.getBuilder(style.getZIndex(), _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].TEXT */ .Z.TEXT);
    textReplay.setTextStyle(textStyle, declutterImageWithText);
    textReplay.drawText(geometry, feature);
  }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/MultiPoint.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 */


function renderMultiPointGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var imageStyle = style.getImage();
  var textStyle = style.getText();
  /** @type {import("../render/canvas.js").DeclutterImageWithText} */

  var declutterImageWithText;

  if (opt_declutterBuilderGroup) {
    builderGroup = opt_declutterBuilderGroup;
    declutterImageWithText = imageStyle && textStyle && textStyle.getText() ? {} : undefined;
  }

  if (imageStyle) {
    if (imageStyle.getImageState() != _ImageState_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].LOADED */ .Z.LOADED) {
      return;
    }

    var imageReplay = builderGroup.getBuilder(style.getZIndex(), _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].IMAGE */ .Z.IMAGE);
    imageReplay.setImageStyle(imageStyle, declutterImageWithText);
    imageReplay.drawMultiPoint(geometry, feature);
  }

  if (textStyle && textStyle.getText()) {
    var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].TEXT */ .Z.TEXT);
    textReplay.setTextStyle(textStyle, declutterImageWithText);
    textReplay.drawText(geometry, feature);
  }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/Polygon.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 */


function renderPolygonGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
  var fillStyle = style.getFill();
  var strokeStyle = style.getStroke();

  if (fillStyle || strokeStyle) {
    var polygonReplay = builderGroup.getBuilder(style.getZIndex(), _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].POLYGON */ .Z.POLYGON);
    polygonReplay.setFillStrokeStyle(fillStyle, strokeStyle);
    polygonReplay.drawPolygon(geometry, feature);
  }

  var textStyle = style.getText();

  if (textStyle && textStyle.getText()) {
    var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), _render_canvas_BuilderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].TEXT */ .Z.TEXT);
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}

/***/ }),

/***/ 9429:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ PointsLayer)
});

// EXTERNAL MODULE: ./node_modules/ol/layer/BaseVector.js
var BaseVector = __webpack_require__(248);
// EXTERNAL MODULE: ./node_modules/ol/geom/GeometryType.js
var GeometryType = __webpack_require__(5870);
// EXTERNAL MODULE: ./node_modules/ol/source/VectorEventType.js
var VectorEventType = __webpack_require__(5389);
// EXTERNAL MODULE: ./node_modules/ol/ViewHint.js
var ViewHint = __webpack_require__(1840);
// EXTERNAL MODULE: ./node_modules/ol/webgl/Buffer.js
var Buffer = __webpack_require__(4393);
// EXTERNAL MODULE: ./node_modules/ol/renderer/Layer.js
var Layer = __webpack_require__(7209);
// EXTERNAL MODULE: ./node_modules/ol/render/Event.js
var Event = __webpack_require__(8471);
// EXTERNAL MODULE: ./node_modules/ol/render/EventType.js
var EventType = __webpack_require__(834);
// EXTERNAL MODULE: ./node_modules/ol/webgl/Helper.js + 3 modules
var Helper = __webpack_require__(6463);
;// CONCATENATED MODULE: ./node_modules/ol/renderer/webgl/Layer.js
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
 * @module ol/renderer/webgl/Layer
 */






/**
 * @enum {string}
 */

var WebGLWorkerMessageType = {
  GENERATE_BUFFERS: 'GENERATE_BUFFERS'
};
/**
 * @typedef {Object} WebGLWorkerGenerateBuffersMessage
 * This message will trigger the generation of a vertex and an index buffer based on the given render instructions.
 * When the buffers are generated, the worked will send a message of the same type to the main thread, with
 * the generated buffers in it.
 * Note that any addition properties present in the message *will* be sent back to the main thread.
 * @property {WebGLWorkerMessageType} type Message type
 * @property {ArrayBuffer} renderInstructions Render instructions raw binary buffer.
 * @property {ArrayBuffer} [vertexBuffer] Vertices array raw binary buffer (sent by the worker).
 * @property {ArrayBuffer} [indexBuffer] Indices array raw binary buffer (sent by the worker).
 * @property {number} [customAttributesCount] Amount of custom attributes count in the render instructions.
 */

/**
 * @typedef {Object} PostProcessesOptions
 * @property {number} [scaleRatio] Scale ratio; if < 1, the post process will render to a texture smaller than
 * the main canvas that will then be sampled up (useful for saving resource on blur steps).
 * @property {string} [vertexShader] Vertex shader source
 * @property {string} [fragmentShader] Fragment shader source
 * @property {Object<string,import("../../webgl/Helper").UniformValue>} [uniforms] Uniform definitions for the post process step
 */

/**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the canvas element.
 * @property {Object<string,import("../../webgl/Helper").UniformValue>} [uniforms] Uniform definitions for the post process steps
 * @property {Array<PostProcessesOptions>} [postProcesses] Post-processes definitions
 */

/**
 * @classdesc
 * Base WebGL renderer class.
 * Holds all logic related to data manipulation & some common rendering logic
 * @template {import("../../layer/Layer.js").default} LayerType
 */

var WebGLLayerRenderer =
/** @class */
function (_super) {
  __extends(WebGLLayerRenderer, _super);
  /**
   * @param {LayerType} layer Layer.
   * @param {Options} [opt_options] Options.
   */


  function WebGLLayerRenderer(layer, opt_options) {
    var _this = _super.call(this, layer) || this;

    var options = opt_options || {};
    /**
     * @type {WebGLHelper}
     * @protected
     */

    _this.helper = new Helper/* default */.ZP({
      postProcesses: options.postProcesses,
      uniforms: options.uniforms
    });

    if (options.className !== undefined) {
      _this.helper.getCanvas().className = options.className;
    }

    return _this;
  }
  /**
   * Clean up.
   */


  WebGLLayerRenderer.prototype.disposeInternal = function () {
    this.helper.dispose();
    delete this.helper;

    _super.prototype.disposeInternal.call(this);
  };
  /**
   * @param {import("../../render/EventType.js").default} type Event type.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @private
   */


  WebGLLayerRenderer.prototype.dispatchRenderEvent_ = function (type, frameState) {
    var layer = this.getLayer();

    if (layer.hasListener(type)) {
      // RenderEvent does not get a context or an inversePixelTransform, because WebGL allows much less direct editing than Canvas2d does.
      var event_1 = new Event/* default */.Z(type, null, frameState, null);
      layer.dispatchEvent(event_1);
    }
  };
  /**
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @protected
   */


  WebGLLayerRenderer.prototype.preRender = function (frameState) {
    this.dispatchRenderEvent_(EventType/* default.PRERENDER */.Z.PRERENDER, frameState);
  };
  /**
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @protected
   */


  WebGLLayerRenderer.prototype.postRender = function (frameState) {
    this.dispatchRenderEvent_(EventType/* default.POSTRENDER */.Z.POSTRENDER, frameState);
  };

  return WebGLLayerRenderer;
}(Layer/* default */.Z);

var tmpArray_ = (/* unused pure expression or super */ null && ([]));
var bufferPositions_ = {
  vertexPosition: 0,
  indexPosition: 0
};

function writePointVertex(buffer, pos, x, y, index) {
  buffer[pos + 0] = x;
  buffer[pos + 1] = y;
  buffer[pos + 2] = index;
}
/**
 * An object holding positions both in an index and a vertex buffer.
 * @typedef {Object} BufferPositions
 * @property {number} vertexPosition Position in the vertex buffer
 * @property {number} indexPosition Position in the index buffer
 */

/**
 * Pushes a quad (two triangles) based on a point geometry
 * @param {Float32Array} instructions Array of render instructions for points.
 * @param {number} elementIndex Index from which render instructions will be read.
 * @param {Float32Array} vertexBuffer Buffer in the form of a typed array.
 * @param {Uint32Array} indexBuffer Buffer in the form of a typed array.
 * @param {number} customAttributesCount Amount of custom attributes for each element.
 * @param {BufferPositions} [bufferPositions] Buffer write positions; if not specified, positions will be set at 0.
 * @return {BufferPositions} New buffer positions where to write next
 * @property {number} vertexPosition New position in the vertex buffer where future writes should start.
 * @property {number} indexPosition New position in the index buffer where future writes should start.
 * @private
 */


function writePointFeatureToBuffers(instructions, elementIndex, vertexBuffer, indexBuffer, customAttributesCount, bufferPositions) {
  // This is for x, y and index
  var baseVertexAttrsCount = 3;
  var baseInstructionsCount = 2;
  var stride = baseVertexAttrsCount + customAttributesCount;
  var x = instructions[elementIndex + 0];
  var y = instructions[elementIndex + 1]; // read custom numerical attributes on the feature

  var customAttrs = tmpArray_;
  customAttrs.length = customAttributesCount;

  for (var i = 0; i < customAttrs.length; i++) {
    customAttrs[i] = instructions[elementIndex + baseInstructionsCount + i];
  }

  var vPos = bufferPositions ? bufferPositions.vertexPosition : 0;
  var iPos = bufferPositions ? bufferPositions.indexPosition : 0;
  var baseIndex = vPos / stride; // push vertices for each of the four quad corners (first standard then custom attributes)

  writePointVertex(vertexBuffer, vPos, x, y, 0);
  customAttrs.length && vertexBuffer.set(customAttrs, vPos + baseVertexAttrsCount);
  vPos += stride;
  writePointVertex(vertexBuffer, vPos, x, y, 1);
  customAttrs.length && vertexBuffer.set(customAttrs, vPos + baseVertexAttrsCount);
  vPos += stride;
  writePointVertex(vertexBuffer, vPos, x, y, 2);
  customAttrs.length && vertexBuffer.set(customAttrs, vPos + baseVertexAttrsCount);
  vPos += stride;
  writePointVertex(vertexBuffer, vPos, x, y, 3);
  customAttrs.length && vertexBuffer.set(customAttrs, vPos + baseVertexAttrsCount);
  vPos += stride;
  indexBuffer[iPos++] = baseIndex;
  indexBuffer[iPos++] = baseIndex + 1;
  indexBuffer[iPos++] = baseIndex + 3;
  indexBuffer[iPos++] = baseIndex + 1;
  indexBuffer[iPos++] = baseIndex + 2;
  indexBuffer[iPos++] = baseIndex + 3;
  bufferPositions_.vertexPosition = vPos;
  bufferPositions_.indexPosition = iPos;
  return bufferPositions_;
}
/**
 * Returns a texture of 1x1 pixel, white
 * @private
 * @return {ImageData} Image data.
 */

function getBlankImageData() {
  var canvas = document.createElement('canvas');
  var image = canvas.getContext('2d').createImageData(1, 1);
  image.data[0] = 255;
  image.data[1] = 255;
  image.data[2] = 255;
  image.data[3] = 255;
  return image;
}
/**
 * Generates a color array based on a numerical id
 * Note: the range for each component is 0 to 1 with 256 steps
 * @param {number} id Id
 * @param {Array<number>} [opt_array] Reusable array
 * @return {Array<number>} Color array containing the encoded id
 */

function colorEncodeId(id, opt_array) {
  var array = opt_array || [];
  var radix = 256;
  var divide = radix - 1;
  array[0] = Math.floor(id / radix / radix / radix) / divide;
  array[1] = Math.floor(id / radix / radix) % radix / divide;
  array[2] = Math.floor(id / radix) % radix / divide;
  array[3] = id % radix / divide;
  return array;
}
/**
 * Reads an id from a color-encoded array
 * Note: the expected range for each component is 0 to 1 with 256 steps.
 * @param {Array<number>} color Color array containing the encoded id
 * @return {number} Decoded id
 */

function colorDecodeId(color) {
  var id = 0;
  var radix = 256;
  var mult = radix - 1;
  id += Math.round(color[0] * radix * radix * radix * mult);
  id += Math.round(color[1] * radix * radix * mult);
  id += Math.round(color[2] * radix * mult);
  id += Math.round(color[3] * mult);
  return id;
}
/* harmony default export */ const webgl_Layer = (WebGLLayerRenderer);
// EXTERNAL MODULE: ./node_modules/ol/webgl/RenderTarget.js
var RenderTarget = __webpack_require__(1758);
// EXTERNAL MODULE: ./node_modules/ol/webgl.js
var webgl = __webpack_require__(5339);
// EXTERNAL MODULE: ./node_modules/ol/transform.js
var transform = __webpack_require__(8975);
// EXTERNAL MODULE: ./node_modules/ol/asserts.js
var asserts = __webpack_require__(4548);
// EXTERNAL MODULE: ./node_modules/ol/extent.js
var ol_extent = __webpack_require__(1046);
// EXTERNAL MODULE: ./node_modules/ol/worker/webgl.js
var worker_webgl = __webpack_require__(2253);
// EXTERNAL MODULE: ./node_modules/ol/util.js
var util = __webpack_require__(2618);
// EXTERNAL MODULE: ./node_modules/ol/events.js
var events = __webpack_require__(5750);
;// CONCATENATED MODULE: ./node_modules/ol/renderer/webgl/PointsLayer.js
var PointsLayer_extends = undefined && undefined.__extends || function () {
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
 * @module ol/renderer/webgl/PointsLayer
 */

















/**
 * @typedef {Object} CustomAttribute A description of a custom attribute to be passed on to the GPU, with a value different
 * for each feature.
 * @property {string} name Attribute name.
 * @property {function(import("../../Feature").default, Object<string, *>):number} callback This callback computes the numerical value of the
 * attribute for a given feature (properties are available as 2nd arg for quicker access).
 */

/**
 * @typedef {Object} FeatureCacheItem Object that holds a reference to a feature, its geometry and properties. Used to optimize
 * rebuildBuffers by accessing these objects quicker.
 * @property {import("../../Feature").default} feature Feature
 * @property {Object<string, *>} properties Feature properties
 * @property {import("../../geom").Geometry} geometry Feature geometry
 */

/**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the canvas element.
 * @property {Array<CustomAttribute>} [attributes] These attributes will be read from the features in the source and then
 * passed to the GPU. The `name` property of each attribute will serve as its identifier:
 *  * In the vertex shader as an `attribute` by prefixing it with `a_`
 *  * In the fragment shader as a `varying` by prefixing it with `v_`
 * Please note that these can only be numerical values.
 * @property {string} vertexShader Vertex shader source, mandatory.
 * @property {string} fragmentShader Fragment shader source, mandatory.
 * @property {string} [hitVertexShader] Vertex shader source for hit detection rendering.
 * @property {string} [hitFragmentShader] Fragment shader source for hit detection rendering.
 * @property {Object<string,import("../../webgl/Helper").UniformValue>} [uniforms] Uniform definitions for the post process steps
 * Please note that `u_texture` is reserved for the main texture slot.
 * @property {Array<import("./Layer").PostProcessesOptions>} [postProcesses] Post-processes definitions
 */

/**
 * @classdesc
 * WebGL vector renderer optimized for points.
 * All features will be rendered as quads (two triangles forming a square). New data will be flushed to the GPU
 * every time the vector source changes.
 *
 * You need to provide vertex and fragment shaders for rendering. This can be done using
 * {@link module:ol/webgl/ShaderBuilder} utilities. These shaders shall expect a `a_position` attribute
 * containing the screen-space projected center of the quad, as well as a `a_index` attribute
 * whose value (0, 1, 2 or 3) indicates which quad vertex is currently getting processed (see structure below).
 *
 * To include variable attributes in the shaders, you need to declare them using the `attributes` property of
 * the options object like so:
 * ```js
 * new WebGLPointsLayerRenderer(layer, {
 *   attributes: [
 *     {
 *       name: 'size',
 *       callback: function(feature) {
 *         // compute something with the feature
 *       }
 *     },
 *     {
 *       name: 'weight',
 *       callback: function(feature) {
 *         // compute something with the feature
 *       }
 *     },
 *   ],
 *   vertexShader:
 *     // shader using attribute a_weight and a_size
 *   fragmentShader:
 *     // shader using varying v_weight and v_size
 * ```
 *
 * To enable hit detection, you must as well provide dedicated shaders using the `hitVertexShader`
 * and `hitFragmentShader` properties. These shall expect the `a_hitColor` attribute to contain
 * the final color that will have to be output for hit detection to work.
 *
 * The following uniform is used for the main texture: `u_texture`.
 *
 * Please note that the main shader output should have premultiplied alpha, otherwise visual anomalies may occur.
 *
 * Points are rendered as quads with the following structure:
 *
 * ```
 *   (u0, v1)      (u1, v1)
 *  [3]----------[2]
 *   |`           |
 *   |  `         |
 *   |    `       |
 *   |      `     |
 *   |        `   |
 *   |          ` |
 *  [0]----------[1]
 *   (u0, v0)      (u1, v0)
 *  ```
 *
 * This uses {@link module:ol/webgl/Helper~WebGLHelper} internally.
 *
 * @api
 */

var WebGLPointsLayerRenderer =
/** @class */
function (_super) {
  PointsLayer_extends(WebGLPointsLayerRenderer, _super);
  /**
   * @param {import("../../layer/Layer.js").default} layer Layer.
   * @param {Options} options Options.
   */


  function WebGLPointsLayerRenderer(layer, options) {
    var _this = this;

    var uniforms = options.uniforms || {};
    var projectionMatrixTransform = (0,transform/* create */.Ue)();
    uniforms[Helper/* DefaultUniform.PROJECTION_MATRIX */.ZC.PROJECTION_MATRIX] = projectionMatrixTransform;
    _this = _super.call(this, layer, {
      className: options.className,
      uniforms: uniforms,
      postProcesses: options.postProcesses
    }) || this;
    _this.sourceRevision_ = -1;
    _this.verticesBuffer_ = new Buffer/* default */.ZP(webgl/* ARRAY_BUFFER */.qO, webgl/* DYNAMIC_DRAW */.kd);
    _this.hitVerticesBuffer_ = new Buffer/* default */.ZP(webgl/* ARRAY_BUFFER */.qO, webgl/* DYNAMIC_DRAW */.kd);
    _this.indicesBuffer_ = new Buffer/* default */.ZP(webgl/* ELEMENT_ARRAY_BUFFER */.cX, webgl/* DYNAMIC_DRAW */.kd);
    _this.program_ = _this.helper.getProgram(options.fragmentShader, options.vertexShader);
    /**
     * @type {boolean}
     * @private
     */

    _this.hitDetectionEnabled_ = options.hitFragmentShader && options.hitVertexShader ? true : false;
    _this.hitProgram_ = _this.hitDetectionEnabled_ && _this.helper.getProgram(options.hitFragmentShader, options.hitVertexShader);
    var customAttributes = options.attributes ? options.attributes.map(function (attribute) {
      return {
        name: 'a_' + attribute.name,
        size: 1,
        type: Helper/* AttributeType.FLOAT */.GC.FLOAT
      };
    }) : [];
    /**
     * A list of attributes used by the renderer. By default only the position and
     * index of the vertex (0 to 3) are required.
     * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
     */

    _this.attributes = [{
      name: 'a_position',
      size: 2,
      type: Helper/* AttributeType.FLOAT */.GC.FLOAT
    }, {
      name: 'a_index',
      size: 1,
      type: Helper/* AttributeType.FLOAT */.GC.FLOAT
    }].concat(customAttributes);
    /**
     * A list of attributes used for hit detection.
     * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
     */

    _this.hitDetectionAttributes = [{
      name: 'a_position',
      size: 2,
      type: Helper/* AttributeType.FLOAT */.GC.FLOAT
    }, {
      name: 'a_index',
      size: 1,
      type: Helper/* AttributeType.FLOAT */.GC.FLOAT
    }, {
      name: 'a_hitColor',
      size: 4,
      type: Helper/* AttributeType.FLOAT */.GC.FLOAT
    }, {
      name: 'a_featureUid',
      size: 1,
      type: Helper/* AttributeType.FLOAT */.GC.FLOAT
    }].concat(customAttributes);
    _this.customAttributes = options.attributes ? options.attributes : [];
    _this.previousExtent_ = (0,ol_extent/* createEmpty */.lJ)();
    /**
     * This transform is updated on every frame and is the composition of:
     * - invert of the world->screen transform that was used when rebuilding buffers (see `this.renderTransform_`)
     * - current world->screen transform
     * @type {import("../../transform.js").Transform}
     * @private
     */

    _this.currentTransform_ = projectionMatrixTransform;
    /**
     * This transform is updated when buffers are rebuilt and converts world space coordinates to screen space
     * @type {import("../../transform.js").Transform}
     * @private
     */

    _this.renderTransform_ = (0,transform/* create */.Ue)();
    /**
     * @type {import("../../transform.js").Transform}
     * @private
     */

    _this.invertRenderTransform_ = (0,transform/* create */.Ue)();
    /**
     * @type {Float32Array}
     * @private
     */

    _this.renderInstructions_ = new Float32Array(0);
    /**
     * These instructions are used for hit detection
     * @type {Float32Array}
     * @private
     */

    _this.hitRenderInstructions_ = new Float32Array(0);
    /**
     * @type {WebGLRenderTarget}
     * @private
     */

    _this.hitRenderTarget_ = _this.hitDetectionEnabled_ && new RenderTarget/* default */.Z(_this.helper);
    _this.worker_ = (0,worker_webgl/* create */.U)();

    _this.worker_.addEventListener('message',
    /**
     * @param {*} event Event.
     * @this {WebGLPointsLayerRenderer}
     */
    function (event) {
      var received = event.data;

      if (received.type === WebGLWorkerMessageType.GENERATE_BUFFERS) {
        var projectionTransform = received.projectionTransform;

        if (received.hitDetection) {
          this.hitVerticesBuffer_.fromArrayBuffer(received.vertexBuffer);
          this.helper.flushBufferData(this.hitVerticesBuffer_);
        } else {
          this.verticesBuffer_.fromArrayBuffer(received.vertexBuffer);
          this.helper.flushBufferData(this.verticesBuffer_);
        }

        this.indicesBuffer_.fromArrayBuffer(received.indexBuffer);
        this.helper.flushBufferData(this.indicesBuffer_);
        this.renderTransform_ = projectionTransform;
        (0,transform/* makeInverse */.nb)(this.invertRenderTransform_, this.renderTransform_);

        if (received.hitDetection) {
          this.hitRenderInstructions_ = new Float32Array(event.data.renderInstructions);
        } else {
          this.renderInstructions_ = new Float32Array(event.data.renderInstructions);
        }

        this.getLayer().changed();
      }
    }.bind(_this));
    /**
     * This object will be updated when the source changes. Key is uid.
     * @type {Object<string, FeatureCacheItem>}
     * @private
     */


    _this.featureCache_ = {};
    /**
     * Amount of features in the cache.
     * @type {number}
     * @private
     */

    _this.featureCount_ = 0;

    var source = _this.getLayer().getSource();

    _this.sourceListenKeys_ = [(0,events/* listen */.oL)(source, VectorEventType/* default.ADDFEATURE */.Z.ADDFEATURE, _this.handleSourceFeatureAdded_, _this), (0,events/* listen */.oL)(source, VectorEventType/* default.CHANGEFEATURE */.Z.CHANGEFEATURE, _this.handleSourceFeatureChanged_, _this), (0,events/* listen */.oL)(source, VectorEventType/* default.REMOVEFEATURE */.Z.REMOVEFEATURE, _this.handleSourceFeatureDelete_, _this), (0,events/* listen */.oL)(source, VectorEventType/* default.CLEAR */.Z.CLEAR, _this.handleSourceFeatureClear_, _this)];
    source.forEachFeature(function (feature) {
      this.featureCache_[(0,util/* getUid */.sq)(feature)] = {
        feature: feature,
        properties: feature.getProperties(),
        geometry: feature.getGeometry()
      };
      this.featureCount_++;
    }.bind(_this));
    return _this;
  }
  /**
   * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
   * @private
   */


  WebGLPointsLayerRenderer.prototype.handleSourceFeatureAdded_ = function (event) {
    var feature = event.feature;
    this.featureCache_[(0,util/* getUid */.sq)(feature)] = {
      feature: feature,
      properties: feature.getProperties(),
      geometry: feature.getGeometry()
    };
    this.featureCount_++;
  };
  /**
   * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
   * @private
   */


  WebGLPointsLayerRenderer.prototype.handleSourceFeatureChanged_ = function (event) {
    var feature = event.feature;
    this.featureCache_[(0,util/* getUid */.sq)(feature)] = {
      feature: feature,
      properties: feature.getProperties(),
      geometry: feature.getGeometry()
    };
  };
  /**
   * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
   * @private
   */


  WebGLPointsLayerRenderer.prototype.handleSourceFeatureDelete_ = function (event) {
    var feature = event.feature;
    delete this.featureCache_[(0,util/* getUid */.sq)(feature)];
    this.featureCount_--;
  };
  /**
   * @private
   */


  WebGLPointsLayerRenderer.prototype.handleSourceFeatureClear_ = function () {
    this.featureCache_ = {};
    this.featureCount_ = 0;
  };
  /**
   * Render the layer.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @return {HTMLElement} The rendered element.
   */


  WebGLPointsLayerRenderer.prototype.renderFrame = function (frameState) {
    this.preRender(frameState);
    var renderCount = this.indicesBuffer_.getSize();
    this.helper.drawElements(0, renderCount);
    this.helper.finalizeDraw(frameState);
    var canvas = this.helper.getCanvas();
    var layerState = frameState.layerStatesArray[frameState.layerIndex];
    var opacity = layerState.opacity;

    if (opacity !== parseFloat(canvas.style.opacity)) {
      canvas.style.opacity = String(opacity);
    }

    if (this.hitDetectionEnabled_) {
      this.renderHitDetection(frameState);
      this.hitRenderTarget_.clearCachedData();
    }

    this.postRender(frameState);
    return canvas;
  };
  /**
   * Determine whether render should be called.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */


  WebGLPointsLayerRenderer.prototype.prepareFrame = function (frameState) {
    var layer = this.getLayer();
    var vectorSource = layer.getSource();
    var viewState = frameState.viewState;
    var viewNotMoving = !frameState.viewHints[ViewHint/* default.ANIMATING */.Z.ANIMATING] && !frameState.viewHints[ViewHint/* default.INTERACTING */.Z.INTERACTING];
    var extentChanged = !(0,ol_extent/* equals */.fS)(this.previousExtent_, frameState.extent);
    var sourceChanged = this.sourceRevision_ < vectorSource.getRevision();

    if (sourceChanged) {
      this.sourceRevision_ = vectorSource.getRevision();
    }

    if (viewNotMoving && (extentChanged || sourceChanged)) {
      var projection = viewState.projection;
      var resolution = viewState.resolution;
      var renderBuffer = layer instanceof BaseVector/* default */.Z ? layer.getRenderBuffer() : 0;
      var extent = (0,ol_extent/* buffer */.f3)(frameState.extent, renderBuffer * resolution);
      vectorSource.loadFeatures(extent, resolution, projection);
      this.rebuildBuffers_(frameState);
      this.previousExtent_ = frameState.extent.slice();
    } // apply the current projection transform with the invert of the one used to fill buffers


    this.helper.makeProjectionTransform(frameState, this.currentTransform_);
    (0,transform/* multiply */.Jp)(this.currentTransform_, this.invertRenderTransform_);
    this.helper.useProgram(this.program_);
    this.helper.prepareDraw(frameState); // write new data

    this.helper.bindBuffer(this.verticesBuffer_);
    this.helper.bindBuffer(this.indicesBuffer_);
    this.helper.enableAttributes(this.attributes);
    return true;
  };
  /**
   * Rebuild internal webgl buffers based on current view extent; costly, should not be called too much
   * @param {import("../../PluggableMap").FrameState} frameState Frame state.
   * @private
   */


  WebGLPointsLayerRenderer.prototype.rebuildBuffers_ = function (frameState) {
    // saves the projection transform for the current frame state
    var projectionTransform = (0,transform/* create */.Ue)();
    this.helper.makeProjectionTransform(frameState, projectionTransform); // here we anticipate the amount of render instructions that we well generate
    // this can be done since we know that for normal render we only have x, y as base instructions,
    // and x, y, r, g, b, a and featureUid for hit render instructions
    // and we also know the amount of custom attributes to append to these

    var totalInstructionsCount = (2 + this.customAttributes.length) * this.featureCount_;

    if (!this.renderInstructions_ || this.renderInstructions_.length !== totalInstructionsCount) {
      this.renderInstructions_ = new Float32Array(totalInstructionsCount);
    }

    if (this.hitDetectionEnabled_) {
      var totalHitInstructionsCount = (7 + this.customAttributes.length) * this.featureCount_;

      if (!this.hitRenderInstructions_ || this.hitRenderInstructions_.length !== totalHitInstructionsCount) {
        this.hitRenderInstructions_ = new Float32Array(totalHitInstructionsCount);
      }
    } // loop on features to fill the buffer


    var featureCache, geometry;
    var tmpCoords = [];
    var tmpColor = [];
    var renderIndex = 0;
    var hitIndex = 0;
    var hitColor;

    for (var featureUid in this.featureCache_) {
      featureCache = this.featureCache_[featureUid];
      geometry =
      /** @type {import("../../geom").Point} */
      featureCache.geometry;

      if (!geometry || geometry.getType() !== GeometryType/* default.POINT */.Z.POINT) {
        continue;
      }

      tmpCoords[0] = geometry.getFlatCoordinates()[0];
      tmpCoords[1] = geometry.getFlatCoordinates()[1];
      (0,transform/* apply */.nn)(projectionTransform, tmpCoords);
      hitColor = colorEncodeId(hitIndex + 6, tmpColor);
      this.renderInstructions_[renderIndex++] = tmpCoords[0];
      this.renderInstructions_[renderIndex++] = tmpCoords[1]; // for hit detection, the feature uid is saved in the opacity value
      // and the index of the opacity value is encoded in the color values

      if (this.hitDetectionEnabled_) {
        this.hitRenderInstructions_[hitIndex++] = tmpCoords[0];
        this.hitRenderInstructions_[hitIndex++] = tmpCoords[1];
        this.hitRenderInstructions_[hitIndex++] = hitColor[0];
        this.hitRenderInstructions_[hitIndex++] = hitColor[1];
        this.hitRenderInstructions_[hitIndex++] = hitColor[2];
        this.hitRenderInstructions_[hitIndex++] = hitColor[3];
        this.hitRenderInstructions_[hitIndex++] = Number(featureUid);
      } // pushing custom attributes


      var value = void 0;

      for (var j = 0; j < this.customAttributes.length; j++) {
        value = this.customAttributes[j].callback(featureCache.feature, featureCache.properties);
        this.renderInstructions_[renderIndex++] = value;

        if (this.hitDetectionEnabled_) {
          this.hitRenderInstructions_[hitIndex++] = value;
        }
      }
    }
    /** @type {import('./Layer').WebGLWorkerGenerateBuffersMessage} */


    var message = {
      type: WebGLWorkerMessageType.GENERATE_BUFFERS,
      renderInstructions: this.renderInstructions_.buffer,
      customAttributesCount: this.customAttributes.length
    }; // additional properties will be sent back as-is by the worker

    message['projectionTransform'] = projectionTransform;
    this.worker_.postMessage(message, [this.renderInstructions_.buffer]);
    this.renderInstructions_ = null;
    /** @type {import('./Layer').WebGLWorkerGenerateBuffersMessage} */

    if (this.hitDetectionEnabled_) {
      var hitMessage = {
        type: WebGLWorkerMessageType.GENERATE_BUFFERS,
        renderInstructions: this.hitRenderInstructions_.buffer,
        customAttributesCount: 5 + this.customAttributes.length
      };
      hitMessage['projectionTransform'] = projectionTransform;
      hitMessage['hitDetection'] = true;
      this.worker_.postMessage(hitMessage, [this.hitRenderInstructions_.buffer]);
      this.hitRenderInstructions_ = null;
    }
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


  WebGLPointsLayerRenderer.prototype.forEachFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, callback, matches) {
    (0,asserts/* assert */.h)(this.hitDetectionEnabled_, 66);

    if (!this.hitRenderInstructions_) {
      return undefined;
    }

    var pixel = (0,transform/* apply */.nn)(frameState.coordinateToPixelTransform, coordinate.slice());
    var data = this.hitRenderTarget_.readPixel(pixel[0] / 2, pixel[1] / 2);
    var color = [data[0] / 255, data[1] / 255, data[2] / 255, data[3] / 255];
    var index = colorDecodeId(color);
    var opacity = this.hitRenderInstructions_[index];
    var uid = Math.floor(opacity).toString();
    var source = this.getLayer().getSource();
    var feature = source.getFeatureByUid(uid);

    if (feature) {
      return callback(feature, this.getLayer(), null);
    }

    return undefined;
  };
  /**
   * Render the hit detection data to the corresponding render target
   * @param {import("../../PluggableMap.js").FrameState} frameState current frame state
   */


  WebGLPointsLayerRenderer.prototype.renderHitDetection = function (frameState) {
    // skip render entirely if vertex buffers not ready/generated yet
    if (!this.hitVerticesBuffer_.getSize()) {
      return;
    }

    this.hitRenderTarget_.setSize([Math.floor(frameState.size[0] / 2), Math.floor(frameState.size[1] / 2)]);
    this.helper.useProgram(this.hitProgram_);
    this.helper.prepareDrawToRenderTarget(frameState, this.hitRenderTarget_, true);
    this.helper.bindBuffer(this.hitVerticesBuffer_);
    this.helper.bindBuffer(this.indicesBuffer_);
    this.helper.enableAttributes(this.hitDetectionAttributes);
    var renderCount = this.indicesBuffer_.getSize();
    this.helper.drawElements(0, renderCount);
  };
  /**
   * Clean up.
   */


  WebGLPointsLayerRenderer.prototype.disposeInternal = function () {
    this.worker_.terminate();
    this.layer_ = null;
    this.sourceListenKeys_.forEach(function (key) {
      (0,events/* unlistenByKey */.bN)(key);
    });
    this.sourceListenKeys_ = null;

    _super.prototype.disposeInternal.call(this);
  };

  return WebGLPointsLayerRenderer;
}(webgl_Layer);

/* harmony default export */ const PointsLayer = (WebGLPointsLayerRenderer);

/***/ })

}]);