"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[324],{

/***/ 2618:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O3": () => (/* binding */ abstract),
/* harmony export */   "q4": () => (/* binding */ VERSION),
/* harmony export */   "sq": () => (/* binding */ getUid)
/* harmony export */ });
/**
 * @module ol/util
 */

/**
 * @return {?} Any return.
 */
function abstract() {
  return (
    /** @type {?} */
    function () {
      throw new Error('Unimplemented abstract method.');
    }()
  );
}
/**
 * Counter for getUid.
 * @type {number}
 * @private
 */

var uidCounter_ = 0;
/**
 * Gets a unique ID for an object. This mutates the object so that further calls
 * with the same object as a parameter returns the same value. Unique IDs are generated
 * as a strictly increasing sequence. Adapted from goog.getUid.
 *
 * @param {Object} obj The object to get the unique ID for.
 * @return {string} The unique ID for the object.
 * @api
 */

function getUid(obj) {
  return obj.ol_uid || (obj.ol_uid = String(++uidCounter_));
}
/**
 * OpenLayers version.
 * @type {string}
 */

var VERSION = '6.9.0';

/***/ }),

/***/ 5339:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ae": () => (/* binding */ UNSIGNED_SHORT),
/* harmony export */   "F_": () => (/* binding */ STREAM_DRAW),
/* harmony export */   "MB": () => (/* binding */ STATIC_DRAW),
/* harmony export */   "RF": () => (/* binding */ FLOAT),
/* harmony export */   "cX": () => (/* binding */ ELEMENT_ARRAY_BUFFER),
/* harmony export */   "fw": () => (/* binding */ getContext),
/* harmony export */   "kd": () => (/* binding */ DYNAMIC_DRAW),
/* harmony export */   "qO": () => (/* binding */ ARRAY_BUFFER),
/* harmony export */   "r1": () => (/* binding */ UNSIGNED_INT),
/* harmony export */   "wg": () => (/* binding */ UNSIGNED_BYTE)
/* harmony export */ });
/* unused harmony export getSupportedExtensions */
/**
 * @module ol/webgl
 */

/**
 * Constants taken from goog.webgl
 */

/**
 * Used by {@link module:ol/webgl/Helper~WebGLHelper} for buffers containing vertices data, such as
 * position, color, texture coordinate, etc. These vertices are then referenced by an index buffer
 * to be drawn on screen (see {@link module:ol/webgl.ELEMENT_ARRAY_BUFFER}).
 * @const
 * @type {number}
 * @api
 */
var ARRAY_BUFFER = 0x8892;
/**
 * Used by {@link module:ol/webgl/Helper~WebGLHelper} for buffers containing indices data.
 * Index buffers are essentially lists of references to vertices defined in a vertex buffer
 * (see {@link module:ol/webgl.ARRAY_BUFFER}), and define the primitives (triangles) to be drawn.
 * @const
 * @type {number}
 * @api
 */

var ELEMENT_ARRAY_BUFFER = 0x8893;
/**
 * Used by {link module:ol/webgl/Buffer~WebGLArrayBuffer}.
 * @const
 * @type {number}
 * @api
 */

var STREAM_DRAW = 0x88e0;
/**
 * Used by {link module:ol/webgl/Buffer~WebGLArrayBuffer}.
 * @const
 * @type {number}
 * @api
 */

var STATIC_DRAW = 0x88e4;
/**
 * Used by {link module:ol/webgl/Buffer~WebGLArrayBuffer}.
 * @const
 * @type {number}
 * @api
 */

var DYNAMIC_DRAW = 0x88e8;
/**
 * @const
 * @type {number}
 */

var UNSIGNED_BYTE = 0x1401;
/**
 * @const
 * @type {number}
 */

var UNSIGNED_SHORT = 0x1403;
/**
 * @const
 * @type {number}
 */

var UNSIGNED_INT = 0x1405;
/**
 * @const
 * @type {number}
 */

var FLOAT = 0x1406;
/** end of goog.webgl constants
 */

/**
 * @const
 * @type {Array<string>}
 */

var CONTEXT_IDS = ['experimental-webgl', 'webgl', 'webkit-3d', 'moz-webgl'];
/**
 * @param {HTMLCanvasElement} canvas Canvas.
 * @param {Object} [opt_attributes] Attributes.
 * @return {WebGLRenderingContext} WebGL rendering context.
 */

function getContext(canvas, opt_attributes) {
  var ii = CONTEXT_IDS.length;

  for (var i = 0; i < ii; ++i) {
    try {
      var context = canvas.getContext(CONTEXT_IDS[i], opt_attributes);

      if (context) {
        return (
          /** @type {!WebGLRenderingContext} */
          context
        );
      }
    } catch (e) {// pass
    }
  }

  return null;
}
/**
 * @type {Array<string>}
 */

var supportedExtensions;
/**
 * @return {Array<string>} List of supported WebGL extensions.
 */

function getSupportedExtensions() {
  if (!supportedExtensions) {
    var canvas = document.createElement('canvas');
    var gl = getContext(canvas);

    if (gl) {
      supportedExtensions = gl.getSupportedExtensions();
    }
  }

  return supportedExtensions;
}

/***/ }),

/***/ 4393:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports BufferUsage, getArrayClassForType */
/* harmony import */ var _webgl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5339);
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4548);
/**
 * @module ol/webgl/Buffer
 */



/**
 * Used to describe the intended usage for the data: `STATIC_DRAW`, `STREAM_DRAW`
 * or `DYNAMIC_DRAW`.
 * @enum {number}
 */

var BufferUsage = {
  STATIC_DRAW: _webgl_js__WEBPACK_IMPORTED_MODULE_0__/* .STATIC_DRAW */ .MB,
  STREAM_DRAW: _webgl_js__WEBPACK_IMPORTED_MODULE_0__/* .STREAM_DRAW */ .F_,
  DYNAMIC_DRAW: _webgl_js__WEBPACK_IMPORTED_MODULE_0__/* .DYNAMIC_DRAW */ .kd
};
/**
 * @classdesc
 * Object used to store an array of data as well as usage information for that data.
 * Stores typed arrays internally, either Float32Array or Uint16/32Array depending on
 * the buffer type (ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER) and available extensions.
 *
 * To populate the array, you can either use:
 * * A size using `#ofSize(buffer)`
 * * An `ArrayBuffer` object using `#fromArrayBuffer(buffer)`
 * * A plain array using `#fromArray(array)`
 *
 * Note:
 * See the documentation of [WebGLRenderingContext.bufferData](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData)
 * for more info on buffer usage.
 * @api
 */

var WebGLArrayBuffer =
/** @class */
function () {
  /**
   * @param {number} type Buffer type, either ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER.
   * @param {number} [opt_usage] Intended usage, either `STATIC_DRAW`, `STREAM_DRAW` or `DYNAMIC_DRAW`.
   * Default is `DYNAMIC_DRAW`.
   */
  function WebGLArrayBuffer(type, opt_usage) {
    /**
     * @private
     * @type {Float32Array|Uint32Array}
     */
    this.array = null;
    /**
     * @private
     * @type {number}
     */

    this.type = type;
    (0,_asserts_js__WEBPACK_IMPORTED_MODULE_1__/* .assert */ .h)(type === _webgl_js__WEBPACK_IMPORTED_MODULE_0__/* .ARRAY_BUFFER */ .qO || type === _webgl_js__WEBPACK_IMPORTED_MODULE_0__/* .ELEMENT_ARRAY_BUFFER */ .cX, 62);
    /**
     * @private
     * @type {number}
     */

    this.usage = opt_usage !== undefined ? opt_usage : BufferUsage.STATIC_DRAW;
  }
  /**
   * Populates the buffer with an array of the given size (all values will be zeroes).
   * @param {number} size Array size
   */


  WebGLArrayBuffer.prototype.ofSize = function (size) {
    this.array = new (getArrayClassForType(this.type))(size);
  };
  /**
   * Populates the buffer with an array of the given size (all values will be zeroes).
   * @param {Array<number>} array Numerical array
   */


  WebGLArrayBuffer.prototype.fromArray = function (array) {
    var arrayClass = getArrayClassForType(this.type);
    this.array = arrayClass.from ? arrayClass.from(array) : new arrayClass(array);
  };
  /**
   * Populates the buffer with a raw binary array buffer.
   * @param {ArrayBuffer} buffer Raw binary buffer to populate the array with. Note that this buffer must have been
   * initialized for the same typed array class.
   */


  WebGLArrayBuffer.prototype.fromArrayBuffer = function (buffer) {
    this.array = new (getArrayClassForType(this.type))(buffer);
  };
  /**
   * @return {number} Buffer type.
   */


  WebGLArrayBuffer.prototype.getType = function () {
    return this.type;
  };
  /**
   * Will return null if the buffer was not initialized
   * @return {Float32Array|Uint32Array} Array.
   */


  WebGLArrayBuffer.prototype.getArray = function () {
    return this.array;
  };
  /**
   * @return {number} Usage.
   */


  WebGLArrayBuffer.prototype.getUsage = function () {
    return this.usage;
  };
  /**
   * Will return 0 if the buffer is not initialized
   * @return {number} Array size
   */


  WebGLArrayBuffer.prototype.getSize = function () {
    return this.array ? this.array.length : 0;
  };

  return WebGLArrayBuffer;
}();
/**
 * Returns a typed array constructor based on the given buffer type
 * @param {number} type Buffer type, either ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER.
 * @return {Float32ArrayConstructor|Uint32ArrayConstructor} The typed array class to use for this buffer.
 */


function getArrayClassForType(type) {
  switch (type) {
    case _webgl_js__WEBPACK_IMPORTED_MODULE_0__/* .ARRAY_BUFFER */ .qO:
      return Float32Array;

    case _webgl_js__WEBPACK_IMPORTED_MODULE_0__/* .ELEMENT_ARRAY_BUFFER */ .cX:
      return Uint32Array;

    default:
      return Float32Array;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WebGLArrayBuffer);

/***/ }),

/***/ 6463:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "GC": () => (/* binding */ AttributeType),
  "ZC": () => (/* binding */ DefaultUniform),
  "ZP": () => (/* binding */ Helper)
});

// UNUSED EXPORTS: ShaderType, computeAttributesStride

;// CONCATENATED MODULE: ./node_modules/ol/webgl/ContextEventType.js
/**
 * @module ol/webgl/ContextEventType
 */

/**
 * @enum {string}
 */
/* harmony default export */ const ContextEventType = ({
  LOST: 'webglcontextlost',
  RESTORED: 'webglcontextrestored'
});
// EXTERNAL MODULE: ./node_modules/ol/Disposable.js
var Disposable = __webpack_require__(7170);
;// CONCATENATED MODULE: ./node_modules/ol/webgl/PostProcessingPass.js
/**
 * @module ol/webgl/PostProcessingPass
 */
var DEFAULT_VERTEX_SHADER = "\n  precision mediump float;\n  \n  attribute vec2 a_position;\n  varying vec2 v_texCoord;\n  varying vec2 v_screenCoord;\n  \n  uniform vec2 u_screenSize;\n   \n  void main() {\n    v_texCoord = a_position * 0.5 + 0.5;\n    v_screenCoord = v_texCoord * u_screenSize;\n    gl_Position = vec4(a_position, 0.0, 1.0);\n  }\n";
var DEFAULT_FRAGMENT_SHADER = "\n  precision mediump float;\n   \n  uniform sampler2D u_image;\n   \n  varying vec2 v_texCoord;\n   \n  void main() {\n    gl_FragColor = texture2D(u_image, v_texCoord);\n  }\n";
/**
 * @typedef {Object} Options
 * @property {WebGLRenderingContext} webGlContext WebGL context; mandatory.
 * @property {number} [scaleRatio] Scale ratio; if < 1, the post process will render to a texture smaller than
 * the main canvas that will then be sampled up (useful for saving resource on blur steps).
 * @property {string} [vertexShader] Vertex shader source
 * @property {string} [fragmentShader] Fragment shader source
 * @property {Object<string,import("./Helper").UniformValue>} [uniforms] Uniform definitions for the post process step
 */

/**
 * @typedef {Object} UniformInternalDescription
 * @property {import("./Helper").UniformValue} value Value
 * @property {number} location Location
 * @property {WebGLTexture} [texture] Texture
 * @private
 */

/**
 * @classdesc
 * This class is used to define Post Processing passes with custom shaders and uniforms.
 * This is used internally by {@link module:ol/webgl/Helper~WebGLHelper}.
 *
 * Please note that the final output on the DOM canvas is expected to have premultiplied alpha, which means that
 * a pixel which is 100% red with an opacity of 50% must have a color of (r=0.5, g=0, b=0, a=0.5).
 * Failing to provide pixel colors with premultiplied alpha will result in render anomalies.
 *
 * The default post-processing pass does *not* multiply color values with alpha value, it expects color values to be
 * premultiplied.
 *
 * Default shaders are shown hereafter:
 *
 * * Vertex shader:
 *
 *   ```
 *   precision mediump float;
 *
 *   attribute vec2 a_position;
 *   varying vec2 v_texCoord;
 *   varying vec2 v_screenCoord;
 *
 *   uniform vec2 u_screenSize;
 *
 *   void main() {
 *     v_texCoord = a_position * 0.5 + 0.5;
 *     v_screenCoord = v_texCoord * u_screenSize;
 *     gl_Position = vec4(a_position, 0.0, 1.0);
 *   }
 *   ```
 *
 * * Fragment shader:
 *
 *   ```
 *   precision mediump float;
 *
 *   uniform sampler2D u_image;
 *
 *   varying vec2 v_texCoord;
 *
 *   void main() {
 *     gl_FragColor = texture2D(u_image, v_texCoord);
 *   }
 *   ```
 *
 * @api
 */

var WebGLPostProcessingPass =
/** @class */
function () {
  /**
   * @param {Options} options Options.
   */
  function WebGLPostProcessingPass(options) {
    this.gl_ = options.webGlContext;
    var gl = this.gl_;
    this.scaleRatio_ = options.scaleRatio || 1;
    this.renderTargetTexture_ = gl.createTexture();
    this.renderTargetTextureSize_ = null;
    this.frameBuffer_ = gl.createFramebuffer(); // compile the program for the frame buffer
    // TODO: make compilation errors show up

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, options.vertexShader || DEFAULT_VERTEX_SHADER);
    gl.compileShader(vertexShader);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, options.fragmentShader || DEFAULT_FRAGMENT_SHADER);
    gl.compileShader(fragmentShader);
    this.renderTargetProgram_ = gl.createProgram();
    gl.attachShader(this.renderTargetProgram_, vertexShader);
    gl.attachShader(this.renderTargetProgram_, fragmentShader);
    gl.linkProgram(this.renderTargetProgram_); // bind the vertices buffer for the frame buffer

    this.renderTargetVerticesBuffer_ = gl.createBuffer();
    var verticesArray = [-1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1];
    gl.bindBuffer(gl.ARRAY_BUFFER, this.renderTargetVerticesBuffer_);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesArray), gl.STATIC_DRAW);
    this.renderTargetAttribLocation_ = gl.getAttribLocation(this.renderTargetProgram_, 'a_position');
    this.renderTargetUniformLocation_ = gl.getUniformLocation(this.renderTargetProgram_, 'u_screenSize');
    this.renderTargetTextureLocation_ = gl.getUniformLocation(this.renderTargetProgram_, 'u_image');
    /**
     * Holds info about custom uniforms used in the post processing pass
     * @type {Array<UniformInternalDescription>}
     * @private
     */

    this.uniforms_ = [];
    options.uniforms && Object.keys(options.uniforms).forEach(function (name) {
      this.uniforms_.push({
        value: options.uniforms[name],
        location: gl.getUniformLocation(this.renderTargetProgram_, name)
      });
    }.bind(this));
  }
  /**
   * Get the WebGL rendering context
   * @return {WebGLRenderingContext} The rendering context.
   * @api
   */


  WebGLPostProcessingPass.prototype.getGL = function () {
    return this.gl_;
  };
  /**
   * Initialize the render target texture of the post process, make sure it is at the
   * right size and bind it as a render target for the next draw calls.
   * The last step to be initialized will be the one where the primitives are rendered.
   * @param {import("../PluggableMap.js").FrameState} frameState current frame state
   * @api
   */


  WebGLPostProcessingPass.prototype.init = function (frameState) {
    var gl = this.getGL();
    var textureSize = [gl.drawingBufferWidth * this.scaleRatio_, gl.drawingBufferHeight * this.scaleRatio_]; // rendering goes to my buffer

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.getFrameBuffer());
    gl.viewport(0, 0, textureSize[0], textureSize[1]); // if size has changed: adjust canvas & render target texture

    if (!this.renderTargetTextureSize_ || this.renderTargetTextureSize_[0] !== textureSize[0] || this.renderTargetTextureSize_[1] !== textureSize[1]) {
      this.renderTargetTextureSize_ = textureSize; // create a new texture

      var level = 0;
      var internalFormat = gl.RGBA;
      var border = 0;
      var format = gl.RGBA;
      var type = gl.UNSIGNED_BYTE;
      var data = null;
      gl.bindTexture(gl.TEXTURE_2D, this.renderTargetTexture_);
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, textureSize[0], textureSize[1], border, format, type, data);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); // bind the texture to the framebuffer

      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.renderTargetTexture_, 0);
    }
  };
  /**
   * Render to the next postprocessing pass (or to the canvas if final pass).
   * @param {import("../PluggableMap.js").FrameState} frameState current frame state
   * @param {WebGLPostProcessingPass} [nextPass] Next pass, optional
   * @api
   */


  WebGLPostProcessingPass.prototype.apply = function (frameState, nextPass) {
    var gl = this.getGL();
    var size = frameState.size;
    gl.bindFramebuffer(gl.FRAMEBUFFER, nextPass ? nextPass.getFrameBuffer() : null);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.renderTargetTexture_); // render the frame buffer to the canvas

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.renderTargetVerticesBuffer_);
    gl.useProgram(this.renderTargetProgram_);
    gl.enableVertexAttribArray(this.renderTargetAttribLocation_);
    gl.vertexAttribPointer(this.renderTargetAttribLocation_, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(this.renderTargetUniformLocation_, size[0], size[1]);
    gl.uniform1i(this.renderTargetTextureLocation_, 0);
    this.applyUniforms(frameState);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };
  /**
   * @return {WebGLFramebuffer} Frame buffer
   * @api
   */


  WebGLPostProcessingPass.prototype.getFrameBuffer = function () {
    return this.frameBuffer_;
  };
  /**
   * Sets the custom uniforms based on what was given in the constructor.
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   * @private
   */


  WebGLPostProcessingPass.prototype.applyUniforms = function (frameState) {
    var gl = this.getGL();
    var value;
    var textureSlot = 1;
    this.uniforms_.forEach(function (uniform) {
      value = typeof uniform.value === 'function' ? uniform.value(frameState) : uniform.value; // apply value based on type

      if (value instanceof HTMLCanvasElement || value instanceof ImageData) {
        // create a texture & put data
        if (!uniform.texture) {
          uniform.texture = gl.createTexture();
        }

        gl.activeTexture(gl["TEXTURE" + textureSlot]);
        gl.bindTexture(gl.TEXTURE_2D, uniform.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        if (value instanceof ImageData) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, value.width, value.height, 0, gl.UNSIGNED_BYTE, new Uint8Array(value.data));
        } else {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, value);
        } // fill texture slots


        gl.uniform1i(uniform.location, textureSlot++);
      } else if (Array.isArray(value)) {
        switch (value.length) {
          case 2:
            gl.uniform2f(uniform.location, value[0], value[1]);
            return;

          case 3:
            gl.uniform3f(uniform.location, value[0], value[1], value[2]);
            return;

          case 4:
            gl.uniform4f(uniform.location, value[0], value[1], value[2], value[3]);
            return;

          default:
            return;
        }
      } else if (typeof value === 'number') {
        gl.uniform1f(uniform.location, value);
      }
    });
  };

  return WebGLPostProcessingPass;
}();

/* harmony default export */ const PostProcessingPass = (WebGLPostProcessingPass);
// EXTERNAL MODULE: ./node_modules/ol/webgl.js
var webgl = __webpack_require__(5339);
// EXTERNAL MODULE: ./node_modules/ol/obj.js
var obj = __webpack_require__(9800);
// EXTERNAL MODULE: ./node_modules/ol/transform.js
var ol_transform = __webpack_require__(8975);
;// CONCATENATED MODULE: ./node_modules/ol/vec/mat4.js
/**
 * @module ol/vec/mat4
 */

/**
 * @return {Array<number>} "4x4 matrix representing a 3D identity transform."
 */
function create() {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}
/**
 * @param {Array<number>} mat4 Flattened 4x4 matrix receiving the result.
 * @param {import("../transform.js").Transform} transform Transformation matrix.
 * @return {Array<number>} "2D transformation matrix as flattened 4x4 matrix."
 */

function fromTransform(mat4, transform) {
  mat4[0] = transform[0];
  mat4[1] = transform[1];
  mat4[4] = transform[2];
  mat4[5] = transform[3];
  mat4[12] = transform[4];
  mat4[13] = transform[5];
  return mat4;
}
// EXTERNAL MODULE: ./node_modules/ol/util.js
var util = __webpack_require__(2618);
;// CONCATENATED MODULE: ./node_modules/ol/webgl/Helper.js
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
 * @module ol/webgl/Helper
 */










/**
 * @typedef {Object} BufferCacheEntry
 * @property {import("./Buffer.js").default} buffer Buffer.
 * @property {WebGLBuffer} webGlBuffer WebGlBuffer.
 */

/**
 * Shader types, either `FRAGMENT_SHADER` or `VERTEX_SHADER`.
 * @enum {number}
 */

var ShaderType = {
  FRAGMENT_SHADER: 0x8b30,
  VERTEX_SHADER: 0x8b31
};
/**
 * Uniform names used in the default shaders: `PROJECTION_MATRIX`, `OFFSET_SCALE_MATRIX`.
 * and `OFFSET_ROTATION_MATRIX`.
 * @enum {string}
 */

var DefaultUniform = {
  PROJECTION_MATRIX: 'u_projectionMatrix',
  OFFSET_SCALE_MATRIX: 'u_offsetScaleMatrix',
  OFFSET_ROTATION_MATRIX: 'u_offsetRotateMatrix',
  TIME: 'u_time',
  ZOOM: 'u_zoom',
  RESOLUTION: 'u_resolution'
};
/**
 * Attribute types, either `UNSIGNED_BYTE`, `UNSIGNED_SHORT`, `UNSIGNED_INT` or `FLOAT`
 * Note: an attribute stored in a `Float32Array` should be of type `FLOAT`.
 * @enum {number}
 */

var AttributeType = {
  UNSIGNED_BYTE: webgl/* UNSIGNED_BYTE */.wg,
  UNSIGNED_SHORT: webgl/* UNSIGNED_SHORT */.Ae,
  UNSIGNED_INT: webgl/* UNSIGNED_INT */.r1,
  FLOAT: webgl/* FLOAT */.RF
};
/**
 * Description of an attribute in a buffer
 * @typedef {Object} AttributeDescription
 * @property {string} name Attribute name to use in shaders
 * @property {number} size Number of components per attributes
 * @property {AttributeType} [type] Attribute type, i.e. number of bytes used to store the value. This is
 * determined by the class of typed array which the buffer uses (eg. `Float32Array` for a `FLOAT` attribute).
 * Default is `FLOAT`.
 */

/**
 * @typedef {number|Array<number>|HTMLCanvasElement|HTMLImageElement|ImageData|import("../transform").Transform} UniformLiteralValue
 */

/**
 * Uniform value can be a number, array of numbers (2 to 4), canvas element or a callback returning
 * one of the previous types.
 * @typedef {UniformLiteralValue|function(import("../PluggableMap.js").FrameState):UniformLiteralValue} UniformValue
 */

/**
 * @typedef {Object} PostProcessesOptions
 * @property {number} [scaleRatio] Scale ratio; if < 1, the post process will render to a texture smaller than
 * the main canvas which will then be sampled up (useful for saving resource on blur steps).
 * @property {string} [vertexShader] Vertex shader source
 * @property {string} [fragmentShader] Fragment shader source
 * @property {Object<string,UniformValue>} [uniforms] Uniform definitions for the post process step
 */

/**
 * @typedef {Object} Options
 * @property {Object<string,UniformValue>} [uniforms] Uniform definitions; property names must match the uniform
 * names in the provided or default shaders.
 * @property {Array<PostProcessesOptions>} [postProcesses] Post-processes definitions
 */

/**
 * @typedef {Object} UniformInternalDescription
 * @property {string} name Name
 * @property {UniformValue} [value] Value
 * @property {WebGLTexture} [texture] Texture
 * @private
 */

/**
 * @classdesc
 * This class is intended to provide low-level functions related to WebGL rendering, so that accessing
 * directly the WebGL API should not be required anymore.
 *
 * Several operations are handled by the `WebGLHelper` class:
 *
 * ### Define custom shaders and uniforms
 *
 *   *Shaders* are low-level programs executed on the GPU and written in GLSL. There are two types of shaders:
 *
 *   Vertex shaders are used to manipulate the position and attribute of *vertices* of rendered primitives (ie. corners of a square).
 *   Outputs are:
 *
 *   * `gl_Position`: position of the vertex in screen space
 *
 *   * Varyings usually prefixed with `v_` are passed on to the fragment shader
 *
 *   Fragment shaders are used to control the actual color of the pixels drawn on screen. Their only output is `gl_FragColor`.
 *
 *   Both shaders can take *uniforms* or *attributes* as input. Attributes are explained later. Uniforms are common, read-only values that
 *   can be changed at every frame and can be of type float, arrays of float or images.
 *
 *   Shaders must be compiled and assembled into a program like so:
 *   ```js
 *   // here we simply create two shaders and assemble them in a program which is then used
 *   // for subsequent rendering calls
 *   const vertexShader = new WebGLVertex(VERTEX_SHADER);
 *   const fragmentShader = new WebGLFragment(FRAGMENT_SHADER);
 *   const program = this.context.getProgram(fragmentShader, vertexShader);
 *   helper.useProgram(this.program);
 *   ```
 *
 *   Uniforms are defined using the `uniforms` option and can either be explicit values or callbacks taking the frame state as argument.
 *   You can also change their value along the way like so:
 *   ```js
 *   helper.setUniformFloatValue('u_value', valueAsNumber);
 *   ```
 *
 * ### Defining post processing passes
 *
 *   *Post processing* describes the act of rendering primitives to a texture, and then rendering this texture to the final canvas
 *   while applying special effects in screen space.
 *   Typical uses are: blurring, color manipulation, depth of field, filtering...
 *
 *   The `WebGLHelper` class offers the possibility to define post processes at creation time using the `postProcesses` option.
 *   A post process step accepts the following options:
 *
 *   * `fragmentShader` and `vertexShader`: text literals in GLSL language that will be compiled and used in the post processing step.
 *   * `uniforms`: uniforms can be defined for the post processing steps just like for the main render.
 *   * `scaleRatio`: allows using an intermediate texture smaller or higher than the final canvas in the post processing step.
 *     This is typically used in blur steps to reduce the performance overhead by using an already downsampled texture as input.
 *
 *   The {@link module:ol/webgl/PostProcessingPass~WebGLPostProcessingPass} class is used internally, refer to its documentation for more info.
 *
 * ### Binding WebGL buffers and flushing data into them
 *
 *   Data that must be passed to the GPU has to be transferred using {@link module:ol/webgl/Buffer~WebGLArrayBuffer} objects.
 *   A buffer has to be created only once, but must be bound every time the buffer content will be used for rendering.
 *   This is done using {@link bindBuffer}.
 *   When the buffer's array content has changed, the new data has to be flushed to the GPU memory; this is done using
 *   {@link flushBufferData}. Note: this operation is expensive and should be done as infrequently as possible.
 *
 *   When binding an array buffer, a `target` parameter must be given: it should be either {@link module:ol/webgl.ARRAY_BUFFER}
 *   (if the buffer contains vertices data) or {@link module:ol/webgl.ELEMENT_ARRAY_BUFFER} (if the buffer contains indices data).
 *
 *   Examples below:
 *   ```js
 *   // at initialization phase
 *   const verticesBuffer = new WebGLArrayBuffer([], DYNAMIC_DRAW);
 *   const indicesBuffer = new WebGLArrayBuffer([], DYNAMIC_DRAW);
 *
 *   // when array values have changed
 *   helper.flushBufferData(ARRAY_BUFFER, this.verticesBuffer);
 *   helper.flushBufferData(ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
 *
 *   // at rendering phase
 *   helper.bindBuffer(ARRAY_BUFFER, this.verticesBuffer);
 *   helper.bindBuffer(ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
 *   ```
 *
 * ### Specifying attributes
 *
 *   The GPU only receives the data as arrays of numbers. These numbers must be handled differently depending on what it describes (position, texture coordinate...).
 *   Attributes are used to specify these uses. Use {@link enableAttributeArray_} and either
 *   the default attribute names in {@link module:ol/webgl/Helper.DefaultAttrib} or custom ones.
 *
 *   Please note that you will have to specify the type and offset of the attributes in the data array. You can refer to the documentation of [WebGLRenderingContext.vertexAttribPointer](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer) for more explanation.
 *   ```js
 *   // here we indicate that the data array has the following structure:
 *   // [posX, posY, offsetX, offsetY, texCoordU, texCoordV, posX, posY, ...]
 *   helper.enableAttributes([
 *     {
 *        name: 'a_position',
 *        size: 2
 *     },
 *     {
 *       name: 'a_offset',
 *       size: 2
 *     },
 *     {
 *       name: 'a_texCoord',
 *       size: 2
 *     }
 *   ])
 *   ```
 *
 * ### Rendering primitives
 *
 *   Once all the steps above have been achieved, rendering primitives to the screen is done using {@link prepareDraw}, {@link drawElements} and {@link finalizeDraw}.
 *   ```js
 *   // frame preparation step
 *   helper.prepareDraw(frameState);
 *
 *   // call this for every data array that has to be rendered on screen
 *   helper.drawElements(0, this.indicesBuffer.getArray().length);
 *
 *   // finalize the rendering by applying post processes
 *   helper.finalizeDraw(frameState);
 *   ```
 *
 * For an example usage of this class, refer to {@link module:ol/renderer/webgl/PointsLayer~WebGLPointsLayerRenderer}.
 *
 *
 * @api
 */

var WebGLHelper =
/** @class */
function (_super) {
  __extends(WebGLHelper, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function WebGLHelper(opt_options) {
    var _this = _super.call(this) || this;

    var options = opt_options || {};
    /** @private */

    _this.boundHandleWebGLContextLost_ = _this.handleWebGLContextLost.bind(_this);
    /** @private */

    _this.boundHandleWebGLContextRestored_ = _this.handleWebGLContextRestored.bind(_this);
    /**
     * @private
     * @type {HTMLCanvasElement}
     */

    _this.canvas_ = document.createElement('canvas');
    _this.canvas_.style.position = 'absolute';
    _this.canvas_.style.left = '0';
    /**
     * @private
     * @type {WebGLRenderingContext}
     */

    _this.gl_ = (0,webgl/* getContext */.fw)(_this.canvas_);

    var gl = _this.getGL();
    /**
     * @private
     * @type {!Object<string, BufferCacheEntry>}
     */


    _this.bufferCache_ = {};
    /**
     * @private
     * @type {Object<string, Object>}
     */

    _this.extensionCache_ = {};
    /**
     * @private
     * @type {WebGLProgram}
     */

    _this.currentProgram_ = null;

    _this.canvas_.addEventListener(ContextEventType.LOST, _this.boundHandleWebGLContextLost_);

    _this.canvas_.addEventListener(ContextEventType.RESTORED, _this.boundHandleWebGLContextRestored_);
    /**
     * @private
     * @type {import("../transform.js").Transform}
     */


    _this.offsetRotateMatrix_ = (0,ol_transform/* create */.Ue)();
    /**
     * @private
     * @type {import("../transform.js").Transform}
     */

    _this.offsetScaleMatrix_ = (0,ol_transform/* create */.Ue)();
    /**
     * @private
     * @type {Array<number>}
     */

    _this.tmpMat4_ = create();
    /**
     * @private
     * @type {Object<string, WebGLUniformLocation>}
     */

    _this.uniformLocations_ = {};
    /**
     * @private
     * @type {Object<string, number>}
     */

    _this.attribLocations_ = {};
    /**
     * Holds info about custom uniforms used in the post processing pass.
     * If the uniform is a texture, the WebGL Texture object will be stored here.
     * @type {Array<UniformInternalDescription>}
     * @private
     */

    _this.uniforms_ = [];

    if (options.uniforms) {
      for (var name_1 in options.uniforms) {
        _this.uniforms_.push({
          name: name_1,
          value: options.uniforms[name_1]
        });
      }
    }
    /**
     * An array of PostProcessingPass objects is kept in this variable, built from the steps provided in the
     * options. If no post process was given, a default one is used (so as not to have to make an exception to
     * the frame buffer logic).
     * @type {Array<WebGLPostProcessingPass>}
     * @private
     */


    _this.postProcessPasses_ = options.postProcesses ? options.postProcesses.map(function (options) {
      return new PostProcessingPass({
        webGlContext: gl,
        scaleRatio: options.scaleRatio,
        vertexShader: options.vertexShader,
        fragmentShader: options.fragmentShader,
        uniforms: options.uniforms
      });
    }) : [new PostProcessingPass({
      webGlContext: gl
    })];
    /**
     * @type {string|null}
     * @private
     */

    _this.shaderCompileErrors_ = null;
    /**
     * @type {number}
     * @private
     */

    _this.startTime_ = Date.now();
    return _this;
  }
  /**
   * Get a WebGL extension.  If the extension is not supported, null is returned.
   * Extensions are cached after they are enabled for the first time.
   * @param {string} name The extension name.
   * @return {Object} The extension or null if not supported.
   */


  WebGLHelper.prototype.getExtension = function (name) {
    if (name in this.extensionCache_) {
      return this.extensionCache_[name];
    }

    var extension = this.gl_.getExtension(name);
    this.extensionCache_[name] = extension;
    return extension;
  };
  /**
   * Just bind the buffer if it's in the cache. Otherwise create
   * the WebGL buffer, bind it, populate it, and add an entry to
   * the cache.
   * @param {import("./Buffer").default} buffer Buffer.
   * @api
   */


  WebGLHelper.prototype.bindBuffer = function (buffer) {
    var gl = this.getGL();
    var bufferKey = (0,util/* getUid */.sq)(buffer);
    var bufferCache = this.bufferCache_[bufferKey];

    if (!bufferCache) {
      var webGlBuffer = gl.createBuffer();
      bufferCache = {
        buffer: buffer,
        webGlBuffer: webGlBuffer
      };
      this.bufferCache_[bufferKey] = bufferCache;
    }

    gl.bindBuffer(buffer.getType(), bufferCache.webGlBuffer);
  };
  /**
   * Update the data contained in the buffer array; this is required for the
   * new data to be rendered
   * @param {import("./Buffer").default} buffer Buffer.
   * @api
   */


  WebGLHelper.prototype.flushBufferData = function (buffer) {
    var gl = this.getGL();
    this.bindBuffer(buffer);
    gl.bufferData(buffer.getType(), buffer.getArray(), buffer.getUsage());
  };
  /**
   * @param {import("./Buffer.js").default} buf Buffer.
   */


  WebGLHelper.prototype.deleteBuffer = function (buf) {
    var gl = this.getGL();
    var bufferKey = (0,util/* getUid */.sq)(buf);
    var bufferCacheEntry = this.bufferCache_[bufferKey];

    if (bufferCacheEntry && !gl.isContextLost()) {
      gl.deleteBuffer(bufferCacheEntry.webGlBuffer);
    }

    delete this.bufferCache_[bufferKey];
  };
  /**
   * Clean up.
   */


  WebGLHelper.prototype.disposeInternal = function () {
    this.canvas_.removeEventListener(ContextEventType.LOST, this.boundHandleWebGLContextLost_);
    this.canvas_.removeEventListener(ContextEventType.RESTORED, this.boundHandleWebGLContextRestored_);
    var extension = this.gl_.getExtension('WEBGL_lose_context');

    if (extension) {
      extension.loseContext();
    }

    delete this.gl_;
    delete this.canvas_;
  };
  /**
   * Clear the buffer & set the viewport to draw.
   * Post process passes will be initialized here, the first one being bound as a render target for
   * subsequent draw calls.
   * @param {import("../PluggableMap.js").FrameState} frameState current frame state
   * @param {boolean} [opt_disableAlphaBlend] If true, no alpha blending will happen.
   * @api
   */


  WebGLHelper.prototype.prepareDraw = function (frameState, opt_disableAlphaBlend) {
    var gl = this.getGL();
    var canvas = this.getCanvas();
    var size = frameState.size;
    var pixelRatio = frameState.pixelRatio;
    canvas.width = size[0] * pixelRatio;
    canvas.height = size[1] * pixelRatio;
    canvas.style.width = size[0] + 'px';
    canvas.style.height = size[1] + 'px';
    gl.useProgram(this.currentProgram_); // loop backwards in post processes list

    for (var i = this.postProcessPasses_.length - 1; i >= 0; i--) {
      this.postProcessPasses_[i].init(frameState);
    }

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, opt_disableAlphaBlend ? gl.ZERO : gl.ONE_MINUS_SRC_ALPHA);
    gl.useProgram(this.currentProgram_);
    this.applyFrameState(frameState);
    this.applyUniforms(frameState);
  };
  /**
   * Clear the render target & bind it for future draw operations.
   * This is similar to `prepareDraw`, only post processes will not be applied.
   * Note: the whole viewport will be drawn to the render target, regardless of its size.
   * @param {import("../PluggableMap.js").FrameState} frameState current frame state
   * @param {import("./RenderTarget.js").default} renderTarget Render target to draw to
   * @param {boolean} [opt_disableAlphaBlend] If true, no alpha blending will happen.
   */


  WebGLHelper.prototype.prepareDrawToRenderTarget = function (frameState, renderTarget, opt_disableAlphaBlend) {
    var gl = this.getGL();
    var size = renderTarget.getSize();
    gl.bindFramebuffer(gl.FRAMEBUFFER, renderTarget.getFramebuffer());
    gl.viewport(0, 0, size[0], size[1]);
    gl.bindTexture(gl.TEXTURE_2D, renderTarget.getTexture());
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, opt_disableAlphaBlend ? gl.ZERO : gl.ONE_MINUS_SRC_ALPHA);
    gl.useProgram(this.currentProgram_);
    this.applyFrameState(frameState);
    this.applyUniforms(frameState);
  };
  /**
   * Execute a draw call based on the currently bound program, texture, buffers, attributes.
   * @param {number} start Start index.
   * @param {number} end End index.
   * @api
   */


  WebGLHelper.prototype.drawElements = function (start, end) {
    var gl = this.getGL();
    this.getExtension('OES_element_index_uint');
    var elementType = gl.UNSIGNED_INT;
    var elementSize = 4;
    var numItems = end - start;
    var offsetInBytes = start * elementSize;
    gl.drawElements(gl.TRIANGLES, numItems, elementType, offsetInBytes);
  };
  /**
   * Apply the successive post process passes which will eventually render to the actual canvas.
   * @param {import("../PluggableMap.js").FrameState} frameState current frame state
   * @api
   */


  WebGLHelper.prototype.finalizeDraw = function (frameState) {
    // apply post processes using the next one as target
    for (var i = 0; i < this.postProcessPasses_.length; i++) {
      this.postProcessPasses_[i].apply(frameState, this.postProcessPasses_[i + 1] || null);
    }
  };
  /**
   * @return {HTMLCanvasElement} Canvas.
   * @api
   */


  WebGLHelper.prototype.getCanvas = function () {
    return this.canvas_;
  };
  /**
   * Get the WebGL rendering context
   * @return {WebGLRenderingContext} The rendering context.
   * @api
   */


  WebGLHelper.prototype.getGL = function () {
    return this.gl_;
  };
  /**
   * Sets the default matrix uniforms for a given frame state. This is called internally in `prepareDraw`.
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   * @private
   */


  WebGLHelper.prototype.applyFrameState = function (frameState) {
    var size = frameState.size;
    var rotation = frameState.viewState.rotation;
    var offsetScaleMatrix = (0,ol_transform/* reset */.mc)(this.offsetScaleMatrix_);
    (0,ol_transform/* scale */.bA)(offsetScaleMatrix, 2 / size[0], 2 / size[1]);
    var offsetRotateMatrix = (0,ol_transform/* reset */.mc)(this.offsetRotateMatrix_);

    if (rotation !== 0) {
      (0,ol_transform/* rotate */.U1)(offsetRotateMatrix, -rotation);
    }

    this.setUniformMatrixValue(DefaultUniform.OFFSET_SCALE_MATRIX, fromTransform(this.tmpMat4_, offsetScaleMatrix));
    this.setUniformMatrixValue(DefaultUniform.OFFSET_ROTATION_MATRIX, fromTransform(this.tmpMat4_, offsetRotateMatrix));
    this.setUniformFloatValue(DefaultUniform.TIME, (Date.now() - this.startTime_) * 0.001);
    this.setUniformFloatValue(DefaultUniform.ZOOM, frameState.viewState.zoom);
    this.setUniformFloatValue(DefaultUniform.RESOLUTION, frameState.viewState.resolution);
  };
  /**
   * Sets the custom uniforms based on what was given in the constructor. This is called internally in `prepareDraw`.
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   * @private
   */


  WebGLHelper.prototype.applyUniforms = function (frameState) {
    var gl = this.getGL();
    var value;
    var textureSlot = 0;
    this.uniforms_.forEach(function (uniform) {
      value = typeof uniform.value === 'function' ? uniform.value(frameState) : uniform.value; // apply value based on type

      if (value instanceof HTMLCanvasElement || value instanceof HTMLImageElement || value instanceof ImageData) {
        // create a texture & put data
        if (!uniform.texture) {
          uniform.prevValue = undefined;
          uniform.texture = gl.createTexture();
        }

        gl.activeTexture(gl["TEXTURE" + textureSlot]);
        gl.bindTexture(gl.TEXTURE_2D, uniform.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        var imageReady = !(value instanceof HTMLImageElement) ||
        /** @type {HTMLImageElement} */
        value.complete;

        if (imageReady && uniform.prevValue !== value) {
          uniform.prevValue = value;
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, value);
        } // fill texture slots by increasing index


        gl.uniform1i(this.getUniformLocation(uniform.name), textureSlot++);
      } else if (Array.isArray(value) && value.length === 6) {
        this.setUniformMatrixValue(uniform.name, fromTransform(this.tmpMat4_, value));
      } else if (Array.isArray(value) && value.length <= 4) {
        switch (value.length) {
          case 2:
            gl.uniform2f(this.getUniformLocation(uniform.name), value[0], value[1]);
            return;

          case 3:
            gl.uniform3f(this.getUniformLocation(uniform.name), value[0], value[1], value[2]);
            return;

          case 4:
            gl.uniform4f(this.getUniformLocation(uniform.name), value[0], value[1], value[2], value[3]);
            return;

          default:
            return;
        }
      } else if (typeof value === 'number') {
        gl.uniform1f(this.getUniformLocation(uniform.name), value);
      }
    }.bind(this));
  };
  /**
   * Use a program.  If the program is already in use, this will return `false`.
   * @param {WebGLProgram} program Program.
   * @return {boolean} Changed.
   * @api
   */


  WebGLHelper.prototype.useProgram = function (program) {
    if (program == this.currentProgram_) {
      return false;
    } else {
      var gl = this.getGL();
      gl.useProgram(program);
      this.currentProgram_ = program;
      this.uniformLocations_ = {};
      this.attribLocations_ = {};
      return true;
    }
  };
  /**
   * Will attempt to compile a vertex or fragment shader based on source
   * On error, the shader will be returned but
   * `gl.getShaderParameter(shader, gl.COMPILE_STATUS)` will return `true`
   * Use `gl.getShaderInfoLog(shader)` to have details
   * @param {string} source Shader source
   * @param {ShaderType} type VERTEX_SHADER or FRAGMENT_SHADER
   * @return {WebGLShader} Shader object
   */


  WebGLHelper.prototype.compileShader = function (source, type) {
    var gl = this.getGL();
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  };
  /**
   * Create a program for a vertex and fragment shader.  Throws if shader compilation fails.
   * @param {string} fragmentShaderSource Fragment shader source.
   * @param {string} vertexShaderSource Vertex shader source.
   * @return {WebGLProgram} Program
   * @api
   */


  WebGLHelper.prototype.getProgram = function (fragmentShaderSource, vertexShaderSource) {
    var gl = this.getGL();
    var fragmentShader = this.compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    var vertexShader = this.compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    var program = gl.createProgram();
    gl.attachShader(program, fragmentShader);
    gl.attachShader(program, vertexShader);
    gl.linkProgram(program);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      var message = "Fragment shader compliation failed: " + gl.getShaderInfoLog(fragmentShader);
      throw new Error(message);
    }

    gl.deleteShader(fragmentShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      var message = "Vertex shader compilation failed: " + gl.getShaderInfoLog(vertexShader);
      throw new Error(message);
    }

    gl.deleteShader(vertexShader);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      var message = "GL program linking failed: " + gl.getShaderInfoLog(vertexShader);
      throw new Error(message);
    }

    return program;
  };
  /**
   * Will get the location from the shader or the cache
   * @param {string} name Uniform name
   * @return {WebGLUniformLocation} uniformLocation
   * @api
   */


  WebGLHelper.prototype.getUniformLocation = function (name) {
    if (this.uniformLocations_[name] === undefined) {
      this.uniformLocations_[name] = this.getGL().getUniformLocation(this.currentProgram_, name);
    }

    return this.uniformLocations_[name];
  };
  /**
   * Will get the location from the shader or the cache
   * @param {string} name Attribute name
   * @return {number} attribLocation
   * @api
   */


  WebGLHelper.prototype.getAttributeLocation = function (name) {
    if (this.attribLocations_[name] === undefined) {
      this.attribLocations_[name] = this.getGL().getAttribLocation(this.currentProgram_, name);
    }

    return this.attribLocations_[name];
  };
  /**
   * Modifies the given transform to apply the rotation/translation/scaling of the given frame state.
   * The resulting transform can be used to convert world space coordinates to view coordinates.
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   * @param {import("../transform").Transform} transform Transform to update.
   * @return {import("../transform").Transform} The updated transform object.
   * @api
   */


  WebGLHelper.prototype.makeProjectionTransform = function (frameState, transform) {
    var size = frameState.size;
    var rotation = frameState.viewState.rotation;
    var resolution = frameState.viewState.resolution;
    var center = frameState.viewState.center;
    (0,ol_transform/* reset */.mc)(transform);
    (0,ol_transform/* compose */.qC)(transform, 0, 0, 2 / (resolution * size[0]), 2 / (resolution * size[1]), -rotation, -center[0], -center[1]);
    return transform;
  };
  /**
   * Give a value for a standard float uniform
   * @param {string} uniform Uniform name
   * @param {number} value Value
   * @api
   */


  WebGLHelper.prototype.setUniformFloatValue = function (uniform, value) {
    this.getGL().uniform1f(this.getUniformLocation(uniform), value);
  };
  /**
   * Give a value for a standard matrix4 uniform
   * @param {string} uniform Uniform name
   * @param {Array<number>} value Matrix value
   * @api
   */


  WebGLHelper.prototype.setUniformMatrixValue = function (uniform, value) {
    this.getGL().uniformMatrix4fv(this.getUniformLocation(uniform), false, value);
  };
  /**
   * Will set the currently bound buffer to an attribute of the shader program. Used by `#enableAttributes`
   * internally.
   * @param {string} attribName Attribute name
   * @param {number} size Number of components per attributes
   * @param {number} type UNSIGNED_INT, UNSIGNED_BYTE, UNSIGNED_SHORT or FLOAT
   * @param {number} stride Stride in bytes (0 means attribs are packed)
   * @param {number} offset Offset in bytes
   * @private
   */


  WebGLHelper.prototype.enableAttributeArray_ = function (attribName, size, type, stride, offset) {
    var location = this.getAttributeLocation(attribName); // the attribute has not been found in the shaders; do not enable it

    if (location < 0) {
      return;
    }

    this.getGL().enableVertexAttribArray(location);
    this.getGL().vertexAttribPointer(location, size, type, false, stride, offset);
  };
  /**
   * Will enable the following attributes to be read from the currently bound buffer,
   * i.e. tell the GPU where to read the different attributes in the buffer. An error in the
   * size/type/order of attributes will most likely break the rendering and throw a WebGL exception.
   * @param {Array<AttributeDescription>} attributes Ordered list of attributes to read from the buffer
   * @api
   */


  WebGLHelper.prototype.enableAttributes = function (attributes) {
    var stride = computeAttributesStride(attributes);
    var offset = 0;

    for (var i = 0; i < attributes.length; i++) {
      var attr = attributes[i];
      this.enableAttributeArray_(attr.name, attr.size, attr.type || webgl/* FLOAT */.RF, stride, offset);
      offset += attr.size * getByteSizeFromType(attr.type);
    }
  };
  /**
   * WebGL context was lost
   * @private
   */


  WebGLHelper.prototype.handleWebGLContextLost = function () {
    (0,obj/* clear */.ZH)(this.bufferCache_);
    this.currentProgram_ = null;
  };
  /**
   * WebGL context was restored
   * @private
   */


  WebGLHelper.prototype.handleWebGLContextRestored = function () {};
  /**
   * Will create or reuse a given webgl texture and apply the given size. If no image data
   * specified, the texture will be empty, otherwise image data will be used and the `size`
   * parameter will be ignored.
   * Note: wrap parameters are set to clamp to edge, min filter is set to linear.
   * @param {Array<number>} size Expected size of the texture
   * @param {ImageData|HTMLImageElement|HTMLCanvasElement} [opt_data] Image data/object to bind to the texture
   * @param {WebGLTexture} [opt_texture] Existing texture to reuse
   * @return {WebGLTexture} The generated texture
   * @api
   */


  WebGLHelper.prototype.createTexture = function (size, opt_data, opt_texture) {
    var gl = this.getGL();
    var texture = opt_texture || gl.createTexture(); // set params & size

    var level = 0;
    var internalFormat = gl.RGBA;
    var border = 0;
    var format = gl.RGBA;
    var type = gl.UNSIGNED_BYTE;
    gl.bindTexture(gl.TEXTURE_2D, texture);

    if (opt_data) {
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, format, type, opt_data);
    } else {
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, size[0], size[1], border, format, type, null);
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return texture;
  };

  return WebGLHelper;
}(Disposable/* default */.Z);
/**
 * Compute a stride in bytes based on a list of attributes
 * @param {Array<AttributeDescription>} attributes Ordered list of attributes
 * @return {number} Stride, ie amount of values for each vertex in the vertex buffer
 * @api
 */


function computeAttributesStride(attributes) {
  var stride = 0;

  for (var i = 0; i < attributes.length; i++) {
    var attr = attributes[i];
    stride += attr.size * getByteSizeFromType(attr.type);
  }

  return stride;
}
/**
 * Computes the size in byte of an attribute type.
 * @param {AttributeType} type Attribute type
 * @return {number} The size in bytes
 */

function getByteSizeFromType(type) {
  switch (type) {
    case AttributeType.UNSIGNED_BYTE:
      return Uint8Array.BYTES_PER_ELEMENT;

    case AttributeType.UNSIGNED_SHORT:
      return Uint16Array.BYTES_PER_ELEMENT;

    case AttributeType.UNSIGNED_INT:
      return Uint32Array.BYTES_PER_ELEMENT;

    case AttributeType.FLOAT:
    default:
      return Float32Array.BYTES_PER_ELEMENT;
  }
}

/* harmony default export */ const Helper = (WebGLHelper);

/***/ }),

/***/ 1758:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3620);
/**
 * A wrapper class to simplify rendering to a texture instead of the final canvas
 * @module ol/webgl/RenderTarget
 */
 // for pixel color reading

var tmpArray4 = new Uint8Array(4);
/**
 * @classdesc
 * This class is a wrapper around the association of both a `WebGLTexture` and a `WebGLFramebuffer` instances,
 * simplifying initialization and binding for rendering.
 * @api
 */

var WebGLRenderTarget =
/** @class */
function () {
  /**
   * @param {import("./Helper.js").default} helper WebGL helper; mandatory.
   * @param {Array<number>} [opt_size] Expected size of the render target texture; note: this can be changed later on.
   */
  function WebGLRenderTarget(helper, opt_size) {
    /**
     * @private
     * @type {import("./Helper.js").default}
     */
    this.helper_ = helper;
    var gl = helper.getGL();
    /**
     * @private
     * @type {WebGLTexture}
     */

    this.texture_ = gl.createTexture();
    /**
     * @private
     * @type {WebGLFramebuffer}
     */

    this.framebuffer_ = gl.createFramebuffer();
    /**
     * @type {Array<number>}
     * @private
     */

    this.size_ = opt_size || [1, 1];
    /**
     * @type {Uint8Array}
     * @private
     */

    this.data_ = new Uint8Array(0);
    /**
     * @type {boolean}
     * @private
     */

    this.dataCacheDirty_ = true;
    this.updateSize_();
  }
  /**
   * Changes the size of the render target texture. Note: will do nothing if the size
   * is already the same.
   * @param {Array<number>} size Expected size of the render target texture
   * @api
   */


  WebGLRenderTarget.prototype.setSize = function (size) {
    if ((0,_array_js__WEBPACK_IMPORTED_MODULE_0__/* .equals */ .fS)(size, this.size_)) {
      return;
    }

    this.size_[0] = size[0];
    this.size_[1] = size[1];
    this.updateSize_();
  };
  /**
   * Returns the size of the render target texture
   * @return {Array<number>} Size of the render target texture
   * @api
   */


  WebGLRenderTarget.prototype.getSize = function () {
    return this.size_;
  };
  /**
   * This will cause following calls to `#readAll` or `#readPixel` to download the content of the
   * render target into memory, which is an expensive operation.
   * This content will be kept in cache but should be cleared after each new render.
   * @api
   */


  WebGLRenderTarget.prototype.clearCachedData = function () {
    this.dataCacheDirty_ = true;
  };
  /**
   * Returns the full content of the frame buffer as a series of r, g, b, a components
   * in the 0-255 range (unsigned byte).
   * @return {Uint8Array} Integer array of color values
   * @api
   */


  WebGLRenderTarget.prototype.readAll = function () {
    if (this.dataCacheDirty_) {
      var size = this.size_;
      var gl = this.helper_.getGL();
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer_);
      gl.readPixels(0, 0, size[0], size[1], gl.RGBA, gl.UNSIGNED_BYTE, this.data_);
      this.dataCacheDirty_ = false;
    }

    return this.data_;
  };
  /**
   * Reads one pixel of the frame buffer as an array of r, g, b, a components
   * in the 0-255 range (unsigned byte).
   * If x and/or y are outside of existing data, an array filled with 0 is returned.
   * @param {number} x Pixel coordinate
   * @param {number} y Pixel coordinate
   * @return {Uint8Array} Integer array with one color value (4 components)
   * @api
   */


  WebGLRenderTarget.prototype.readPixel = function (x, y) {
    if (x < 0 || y < 0 || x > this.size_[0] || y >= this.size_[1]) {
      tmpArray4[0] = 0;
      tmpArray4[1] = 0;
      tmpArray4[2] = 0;
      tmpArray4[3] = 0;
      return tmpArray4;
    }

    this.readAll();
    var index = Math.floor(x) + (this.size_[1] - Math.floor(y) - 1) * this.size_[0];
    tmpArray4[0] = this.data_[index * 4];
    tmpArray4[1] = this.data_[index * 4 + 1];
    tmpArray4[2] = this.data_[index * 4 + 2];
    tmpArray4[3] = this.data_[index * 4 + 3];
    return tmpArray4;
  };
  /**
   * @return {WebGLTexture} Texture to render to
   */


  WebGLRenderTarget.prototype.getTexture = function () {
    return this.texture_;
  };
  /**
   * @return {WebGLFramebuffer} Frame buffer of the render target
   */


  WebGLRenderTarget.prototype.getFramebuffer = function () {
    return this.framebuffer_;
  };
  /**
   * @private
   */


  WebGLRenderTarget.prototype.updateSize_ = function () {
    var size = this.size_;
    var gl = this.helper_.getGL();
    this.texture_ = this.helper_.createTexture(size, null, this.texture_);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer_);
    gl.viewport(0, 0, size[0], size[1]);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture_, 0);
    this.data_ = new Uint8Array(size[0] * size[1] * 4);
  };

  return WebGLRenderTarget;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WebGLRenderTarget);

/***/ }),

/***/ 2253:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "U": () => (/* binding */ create)
/* harmony export */ });
var source = "var e=\"function\"==typeof Object.assign?Object.assign:function(e,n){if(null==e)throw new TypeError(\"Cannot convert undefined or null to object\");for(var t=Object(e),r=1,o=arguments.length;r<o;++r){var i=arguments[r];if(null!=i)for(var f in i)i.hasOwnProperty(f)&&(t[f]=i[f])}return t},n=\"GENERATE_BUFFERS\",t=[],r={vertexPosition:0,indexPosition:0};function o(e,n,t,r,o){e[n+0]=t,e[n+1]=r,e[n+2]=o}function i(e,n,i,f,s,u){var a=3+s,l=e[n+0],v=e[n+1],c=t;c.length=s;for(var g=0;g<c.length;g++)c[g]=e[n+2+g];var b=u?u.vertexPosition:0,h=u?u.indexPosition:0,d=b/a;return o(i,b,l,v,0),c.length&&i.set(c,b+3),o(i,b+=a,l,v,1),c.length&&i.set(c,b+3),o(i,b+=a,l,v,2),c.length&&i.set(c,b+3),o(i,b+=a,l,v,3),c.length&&i.set(c,b+3),b+=a,f[h++]=d,f[h++]=d+1,f[h++]=d+3,f[h++]=d+1,f[h++]=d+2,f[h++]=d+3,r.vertexPosition=b,r.indexPosition=h,r}var f=self;f.onmessage=function(t){var r=t.data;if(r.type===n){for(var o=r.customAttributesCount,s=2+o,u=new Float32Array(r.renderInstructions),a=u.length/s,l=4*a*(o+3),v=new Uint32Array(6*a),c=new Float32Array(l),g=null,b=0;b<u.length;b+=s)g=i(u,b,c,v,o,g);var h=e({vertexBuffer:c.buffer,indexBuffer:v.buffer,renderInstructions:u.buffer},r);f.postMessage(h,[c.buffer,v.buffer,u.buffer])}};";
var blob = new Blob([source], {
  type: 'application/javascript'
});
var url = URL.createObjectURL(blob);
function create() {
  return new Worker(url);
}

/***/ })

}]);