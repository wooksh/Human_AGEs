"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[967],{

/***/ 2932:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Object_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7182);
/* harmony import */ var _Property_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3722);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2618);
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4548);
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9800);
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4495);
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
 * @module ol/layer/Base
 */








/**
 * @typedef {import("../ObjectEventType").Types|'change:extent'|'change:maxResolution'|'change:maxZoom'|
 *    'change:minResolution'|'change:minZoom'|'change:opacity'|'change:visible'|'change:zIndex'} BaseLayerObjectEventTypes
 */

/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<BaseLayerObjectEventTypes, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|BaseLayerObjectEventTypes, Return>} BaseLayerOnSignature
 */

/**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Note that with {@link module:ol/layer/Base} and all its subclasses, any property set in
 * the options is set as a {@link module:ol/Object} property on the layer object, so
 * is observable, and has get/set accessors.
 *
 * @api
 */

var BaseLayer =
/** @class */
function (_super) {
  __extends(BaseLayer, _super);
  /**
   * @param {Options} options Layer options.
   */


  function BaseLayer(options) {
    var _this = _super.call(this) || this;
    /***
     * @type {BaseLayerOnSignature<import("../events").EventsKey>}
     */


    _this.on;
    /***
     * @type {BaseLayerOnSignature<import("../events").EventsKey>}
     */

    _this.once;
    /***
     * @type {BaseLayerOnSignature<void>}
     */

    _this.un;
    /**
     * @type {Object<string, *>}
     */

    var properties = (0,_obj_js__WEBPACK_IMPORTED_MODULE_0__/* .assign */ .f0)({}, options);

    if (typeof options.properties === 'object') {
      delete properties.properties;
      (0,_obj_js__WEBPACK_IMPORTED_MODULE_0__/* .assign */ .f0)(properties, options.properties);
    }

    properties[_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].OPACITY */ .Z.OPACITY] = options.opacity !== undefined ? options.opacity : 1;
    (0,_asserts_js__WEBPACK_IMPORTED_MODULE_2__/* .assert */ .h)(typeof properties[_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].OPACITY */ .Z.OPACITY] === 'number', 64); // Layer opacity must be a number

    properties[_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].VISIBLE */ .Z.VISIBLE] = options.visible !== undefined ? options.visible : true;
    properties[_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].Z_INDEX */ .Z.Z_INDEX] = options.zIndex;
    properties[_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MAX_RESOLUTION */ .Z.MAX_RESOLUTION] = options.maxResolution !== undefined ? options.maxResolution : Infinity;
    properties[_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MIN_RESOLUTION */ .Z.MIN_RESOLUTION] = options.minResolution !== undefined ? options.minResolution : 0;
    properties[_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MIN_ZOOM */ .Z.MIN_ZOOM] = options.minZoom !== undefined ? options.minZoom : -Infinity;
    properties[_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MAX_ZOOM */ .Z.MAX_ZOOM] = options.maxZoom !== undefined ? options.maxZoom : Infinity;
    /**
     * @type {string}
     * @private
     */

    _this.className_ = properties.className !== undefined ? options.className : 'ol-layer';
    delete properties.className;

    _this.setProperties(properties);
    /**
     * @type {import("./Layer.js").State}
     * @private
     */


    _this.state_ = null;
    return _this;
  }
  /**
   * @return {string} CSS class name.
   */


  BaseLayer.prototype.getClassName = function () {
    return this.className_;
  };
  /**
   * This method is not meant to be called by layers or layer renderers because the state
   * is incorrect if the layer is included in a layer group.
   *
   * @param {boolean} [opt_managed] Layer is managed.
   * @return {import("./Layer.js").State} Layer state.
   */


  BaseLayer.prototype.getLayerState = function (opt_managed) {
    /** @type {import("./Layer.js").State} */
    var state = this.state_ ||
    /** @type {?} */
    {
      layer: this,
      managed: opt_managed === undefined ? true : opt_managed
    };
    var zIndex = this.getZIndex();
    state.opacity = (0,_math_js__WEBPACK_IMPORTED_MODULE_3__/* .clamp */ .uZ)(Math.round(this.getOpacity() * 100) / 100, 0, 1);
    state.sourceState = this.getSourceState();
    state.visible = this.getVisible();
    state.extent = this.getExtent();
    state.zIndex = zIndex === undefined && !state.managed ? Infinity : zIndex;
    state.maxResolution = this.getMaxResolution();
    state.minResolution = Math.max(this.getMinResolution(), 0);
    state.minZoom = this.getMinZoom();
    state.maxZoom = this.getMaxZoom();
    this.state_ = state;
    return state;
  };
  /**
   * @abstract
   * @param {Array<import("./Layer.js").default>} [opt_array] Array of layers (to be
   *     modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   */


  BaseLayer.prototype.getLayersArray = function (opt_array) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .abstract */ .O3)();
  };
  /**
   * @abstract
   * @param {Array<import("./Layer.js").State>} [opt_states] Optional list of layer
   *     states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   */


  BaseLayer.prototype.getLayerStatesArray = function (opt_states) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .abstract */ .O3)();
  };
  /**
   * Return the {@link module:ol/extent~Extent extent} of the layer or `undefined` if it
   * will be visible regardless of extent.
   * @return {import("../extent.js").Extent|undefined} The layer extent.
   * @observable
   * @api
   */


  BaseLayer.prototype.getExtent = function () {
    return (
      /** @type {import("../extent.js").Extent|undefined} */
      this.get(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].EXTENT */ .Z.EXTENT)
    );
  };
  /**
   * Return the maximum resolution of the layer.
   * @return {number} The maximum resolution of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getMaxResolution = function () {
    return (
      /** @type {number} */
      this.get(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MAX_RESOLUTION */ .Z.MAX_RESOLUTION)
    );
  };
  /**
   * Return the minimum resolution of the layer.
   * @return {number} The minimum resolution of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getMinResolution = function () {
    return (
      /** @type {number} */
      this.get(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MIN_RESOLUTION */ .Z.MIN_RESOLUTION)
    );
  };
  /**
   * Return the minimum zoom level of the layer.
   * @return {number} The minimum zoom level of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getMinZoom = function () {
    return (
      /** @type {number} */
      this.get(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MIN_ZOOM */ .Z.MIN_ZOOM)
    );
  };
  /**
   * Return the maximum zoom level of the layer.
   * @return {number} The maximum zoom level of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getMaxZoom = function () {
    return (
      /** @type {number} */
      this.get(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MAX_ZOOM */ .Z.MAX_ZOOM)
    );
  };
  /**
   * Return the opacity of the layer (between 0 and 1).
   * @return {number} The opacity of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getOpacity = function () {
    return (
      /** @type {number} */
      this.get(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].OPACITY */ .Z.OPACITY)
    );
  };
  /**
   * @abstract
   * @return {import("../source/State.js").default} Source state.
   */


  BaseLayer.prototype.getSourceState = function () {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_4__/* .abstract */ .O3)();
  };
  /**
   * Return the visibility of the layer (`true` or `false`).
   * @return {boolean} The visibility of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getVisible = function () {
    return (
      /** @type {boolean} */
      this.get(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].VISIBLE */ .Z.VISIBLE)
    );
  };
  /**
   * Return the Z-index of the layer, which is used to order layers before
   * rendering. The default Z-index is 0.
   * @return {number} The Z-index of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getZIndex = function () {
    return (
      /** @type {number} */
      this.get(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].Z_INDEX */ .Z.Z_INDEX)
    );
  };
  /**
   * Set the extent at which the layer is visible.  If `undefined`, the layer
   * will be visible at all extents.
   * @param {import("../extent.js").Extent|undefined} extent The extent of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setExtent = function (extent) {
    this.set(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].EXTENT */ .Z.EXTENT, extent);
  };
  /**
   * Set the maximum resolution at which the layer is visible.
   * @param {number} maxResolution The maximum resolution of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setMaxResolution = function (maxResolution) {
    this.set(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MAX_RESOLUTION */ .Z.MAX_RESOLUTION, maxResolution);
  };
  /**
   * Set the minimum resolution at which the layer is visible.
   * @param {number} minResolution The minimum resolution of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setMinResolution = function (minResolution) {
    this.set(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MIN_RESOLUTION */ .Z.MIN_RESOLUTION, minResolution);
  };
  /**
   * Set the maximum zoom (exclusive) at which the layer is visible.
   * Note that the zoom levels for layer visibility are based on the
   * view zoom level, which may be different from a tile source zoom level.
   * @param {number} maxZoom The maximum zoom of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setMaxZoom = function (maxZoom) {
    this.set(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MAX_ZOOM */ .Z.MAX_ZOOM, maxZoom);
  };
  /**
   * Set the minimum zoom (inclusive) at which the layer is visible.
   * Note that the zoom levels for layer visibility are based on the
   * view zoom level, which may be different from a tile source zoom level.
   * @param {number} minZoom The minimum zoom of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setMinZoom = function (minZoom) {
    this.set(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].MIN_ZOOM */ .Z.MIN_ZOOM, minZoom);
  };
  /**
   * Set the opacity of the layer, allowed values range from 0 to 1.
   * @param {number} opacity The opacity of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setOpacity = function (opacity) {
    (0,_asserts_js__WEBPACK_IMPORTED_MODULE_2__/* .assert */ .h)(typeof opacity === 'number', 64); // Layer opacity must be a number

    this.set(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].OPACITY */ .Z.OPACITY, opacity);
  };
  /**
   * Set the visibility of the layer (`true` or `false`).
   * @param {boolean} visible The visibility of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setVisible = function (visible) {
    this.set(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].VISIBLE */ .Z.VISIBLE, visible);
  };
  /**
   * Set Z-index of the layer, which is used to order layers before rendering.
   * The default Z-index is 0.
   * @param {number} zindex The z-index of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setZIndex = function (zindex) {
    this.set(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].Z_INDEX */ .Z.Z_INDEX, zindex);
  };
  /**
   * Clean up.
   */


  BaseLayer.prototype.disposeInternal = function () {
    if (this.state_) {
      this.state_.layer = null;
      this.state_ = null;
    }

    _super.prototype.disposeInternal.call(this);
  };

  return BaseLayer;
}(_Object_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseLayer);

/***/ }),

/***/ 248:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Layer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8498);
/* harmony import */ var rbush__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(240);
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9800);
/* harmony import */ var _style_Style_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6054);
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
 * @module ol/layer/BaseVector
 */






/**
 * @template {import("../source/Vector.js").default|import("../source/VectorTile.js").default} VectorSourceType
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {import("../render.js").OrderFunction} [renderOrder] Render order. Function to be used when sorting
 * features before rendering. By default features are drawn in the order that they are created. Use
 * `null` to avoid the sort, but get an undefined draw order.
 * @property {number} [renderBuffer=100] The buffer in pixels around the viewport extent used by the
 * renderer when getting features from the vector source for the rendering or hit-detection.
 * Recommended value: the size of the largest symbol, line width or label.
 * @property {VectorSourceType} [source] Source.
 * @property {import("../PluggableMap.js").default} [map] Sets the layer as overlay on a map. The map will not manage
 * this layer in its layers collection, and the layer will be rendered on top. This is useful for
 * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
 * use {@link import("../PluggableMap.js").default#addLayer map.addLayer()}.
 * @property {boolean} [declutter=false] Declutter images and text. Decluttering is applied to all
 * image and text styles of all Vector and VectorTile layers that have set this to `true`. The priority
 * is defined by the z-index of the layer, the `zIndex` of the style and the render order of features.
 * Higher z-index means higher priority. Within the same z-index, a feature rendered before another has
 * higher priority.
 * @property {import("../style/Style.js").StyleLike|null} [style] Layer style. When set to `null`, only
 * features that have their own style will be rendered. See {@link module:ol/style} for default style
 * which will be used if this is not set.
 * @property {boolean} [updateWhileAnimating=false] When set to `true`, feature batches will
 * be recreated during animations. This means that no vectors will be shown clipped, but the
 * setting will have a performance impact for large amounts of vector data. When set to `false`,
 * batches will be recreated when no animation is active.
 * @property {boolean} [updateWhileInteracting=false] When set to `true`, feature batches will
 * be recreated during interactions. See also `updateWhileAnimating`.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */

/**
 * @enum {string}
 * @private
 */

var Property = {
  RENDER_ORDER: 'renderOrder'
};
/**
 * @classdesc
 * Vector data that is rendered client-side.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Vector.js").default|import("../source/VectorTile.js").default} VectorSourceType
 * @extends {Layer<VectorSourceType>}
 * @api
 */

var BaseVectorLayer =
/** @class */
function (_super) {
  __extends(BaseVectorLayer, _super);
  /**
   * @param {Options<VectorSourceType>} [opt_options] Options.
   */


  function BaseVectorLayer(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    var baseOptions = (0,_obj_js__WEBPACK_IMPORTED_MODULE_1__/* .assign */ .f0)({}, options);
    delete baseOptions.style;
    delete baseOptions.renderBuffer;
    delete baseOptions.updateWhileAnimating;
    delete baseOptions.updateWhileInteracting;
    _this = _super.call(this, baseOptions) || this;
    /**
     * @private
     * @type {boolean}
     */

    _this.declutter_ = options.declutter !== undefined ? options.declutter : false;
    /**
     * @type {number}
     * @private
     */

    _this.renderBuffer_ = options.renderBuffer !== undefined ? options.renderBuffer : 100;
    /**
     * User provided style.
     * @type {import("../style/Style.js").StyleLike}
     * @private
     */

    _this.style_ = null;
    /**
     * Style function for use within the library.
     * @type {import("../style/Style.js").StyleFunction|undefined}
     * @private
     */

    _this.styleFunction_ = undefined;

    _this.setStyle(options.style);
    /**
     * @type {boolean}
     * @private
     */


    _this.updateWhileAnimating_ = options.updateWhileAnimating !== undefined ? options.updateWhileAnimating : false;
    /**
     * @type {boolean}
     * @private
     */

    _this.updateWhileInteracting_ = options.updateWhileInteracting !== undefined ? options.updateWhileInteracting : false;
    return _this;
  }
  /**
   * @return {boolean} Declutter.
   */


  BaseVectorLayer.prototype.getDeclutter = function () {
    return this.declutter_;
  };
  /**
   * Get the topmost feature that intersects the given pixel on the viewport. Returns a promise
   * that resolves with an array of features. The array will either contain the topmost feature
   * when a hit was detected, or it will be empty.
   *
   * The hit detection algorithm used for this method is optimized for performance, but is less
   * accurate than the one used in {@link import("../PluggableMap.js").default#getFeaturesAtPixel}: Text
   * is not considered, and icons are only represented by their bounding box instead of the exact
   * image.
   *
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").default>>} Promise that resolves with an array of features.
   * @api
   */


  BaseVectorLayer.prototype.getFeatures = function (pixel) {
    return _super.prototype.getFeatures.call(this, pixel);
  };
  /**
   * @return {number|undefined} Render buffer.
   */


  BaseVectorLayer.prototype.getRenderBuffer = function () {
    return this.renderBuffer_;
  };
  /**
   * @return {function(import("../Feature.js").default, import("../Feature.js").default): number|null|undefined} Render
   *     order.
   */


  BaseVectorLayer.prototype.getRenderOrder = function () {
    return (
      /** @type {import("../render.js").OrderFunction|null|undefined} */
      this.get(Property.RENDER_ORDER)
    );
  };
  /**
   * Get the style for features.  This returns whatever was passed to the `style`
   * option at construction or to the `setStyle` method.
   * @return {import("../style/Style.js").StyleLike|null|undefined} Layer style.
   * @api
   */


  BaseVectorLayer.prototype.getStyle = function () {
    return this.style_;
  };
  /**
   * Get the style function.
   * @return {import("../style/Style.js").StyleFunction|undefined} Layer style function.
   * @api
   */


  BaseVectorLayer.prototype.getStyleFunction = function () {
    return this.styleFunction_;
  };
  /**
   * @return {boolean} Whether the rendered layer should be updated while
   *     animating.
   */


  BaseVectorLayer.prototype.getUpdateWhileAnimating = function () {
    return this.updateWhileAnimating_;
  };
  /**
   * @return {boolean} Whether the rendered layer should be updated while
   *     interacting.
   */


  BaseVectorLayer.prototype.getUpdateWhileInteracting = function () {
    return this.updateWhileInteracting_;
  };
  /**
   * Render declutter items for this layer
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   */


  BaseVectorLayer.prototype.renderDeclutter = function (frameState) {
    if (!frameState.declutterTree) {
      frameState.declutterTree = new rbush__WEBPACK_IMPORTED_MODULE_0__(9);
    }
    /** @type {*} */


    this.getRenderer().renderDeclutter(frameState);
  };
  /**
   * @param {import("../render.js").OrderFunction|null|undefined} renderOrder
   *     Render order.
   */


  BaseVectorLayer.prototype.setRenderOrder = function (renderOrder) {
    this.set(Property.RENDER_ORDER, renderOrder);
  };
  /**
   * Set the style for features.  This can be a single style object, an array
   * of styles, or a function that takes a feature and resolution and returns
   * an array of styles. If set to `null`, the layer has no style (a `null` style),
   * so only features that have their own styles will be rendered in the layer. Call
   * `setStyle()` without arguments to reset to the default style. See
   * {@link module:ol/style} for information on the default style.
   * @param {import("../style/Style.js").StyleLike|null} [opt_style] Layer style.
   * @api
   */


  BaseVectorLayer.prototype.setStyle = function (opt_style) {
    this.style_ = opt_style !== undefined ? opt_style : _style_Style_js__WEBPACK_IMPORTED_MODULE_2__/* .createDefaultStyle */ .yF;
    this.styleFunction_ = opt_style === null ? undefined : (0,_style_Style_js__WEBPACK_IMPORTED_MODULE_2__/* .toFunction */ .J$)(this.style_);
    this.changed();
  };

  return BaseVectorLayer;
}(_Layer_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseVectorLayer);

/***/ }),

/***/ 9511:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Base_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2932);
/* harmony import */ var _Collection_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1210);
/* harmony import */ var _CollectionEventType_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9890);
/* harmony import */ var _events_EventType_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2140);
/* harmony import */ var _ObjectEventType_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4314);
/* harmony import */ var _source_State_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(669);
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4548);
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9800);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1046);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2618);
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5750);
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
 * @module ol/layer/Group
 */













/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("./Base").BaseLayerObjectEventTypes|
 *     'change:layers', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("./Base").BaseLayerObjectEventTypes|'change:layers', Return>} GroupOnSignature
 */

/**
 * @typedef {Object} Options
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {Array<import("./Base.js").default>|import("../Collection.js").default<import("./Base.js").default>} [layers] Child layers.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */

/**
 * @enum {string}
 * @private
 */

var Property = {
  LAYERS: 'layers'
};
/**
 * @classdesc
 * A {@link module:ol/Collection~Collection} of layers that are handled together.
 *
 * A generic `change` event is triggered when the group/Collection changes.
 *
 * @api
 */

var LayerGroup =
/** @class */
function (_super) {
  __extends(LayerGroup, _super);
  /**
   * @param {Options} [opt_options] Layer options.
   */


  function LayerGroup(opt_options) {
    var _this = this;

    var options = opt_options || {};
    var baseOptions =
    /** @type {Options} */
    (0,_obj_js__WEBPACK_IMPORTED_MODULE_0__/* .assign */ .f0)({}, options);
    delete baseOptions.layers;
    var layers = options.layers;
    _this = _super.call(this, baseOptions) || this;
    /***
     * @type {GroupOnSignature<import("../events").EventsKey>}
     */

    _this.on;
    /***
     * @type {GroupOnSignature<import("../events").EventsKey>}
     */

    _this.once;
    /***
     * @type {GroupOnSignature<void>}
     */

    _this.un;
    /**
     * @private
     * @type {Array<import("../events.js").EventsKey>}
     */

    _this.layersListenerKeys_ = [];
    /**
     * @private
     * @type {Object<string, Array<import("../events.js").EventsKey>>}
     */

    _this.listenerKeys_ = {};

    _this.addChangeListener(Property.LAYERS, _this.handleLayersChanged_);

    if (layers) {
      if (Array.isArray(layers)) {
        layers = new _Collection_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z(layers.slice(), {
          unique: true
        });
      } else {
        (0,_asserts_js__WEBPACK_IMPORTED_MODULE_2__/* .assert */ .h)(typeof
        /** @type {?} */
        layers.getArray === 'function', 43); // Expected `layers` to be an array or a `Collection`
      }
    } else {
      layers = new _Collection_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z(undefined, {
        unique: true
      });
    }

    _this.setLayers(layers);

    return _this;
  }
  /**
   * @private
   */


  LayerGroup.prototype.handleLayerChange_ = function () {
    this.changed();
  };
  /**
   * @private
   */


  LayerGroup.prototype.handleLayersChanged_ = function () {
    this.layersListenerKeys_.forEach(_events_js__WEBPACK_IMPORTED_MODULE_3__/* .unlistenByKey */ .bN);
    this.layersListenerKeys_.length = 0;
    var layers = this.getLayers();
    this.layersListenerKeys_.push((0,_events_js__WEBPACK_IMPORTED_MODULE_3__/* .listen */ .oL)(layers, _CollectionEventType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].ADD */ .Z.ADD, this.handleLayersAdd_, this), (0,_events_js__WEBPACK_IMPORTED_MODULE_3__/* .listen */ .oL)(layers, _CollectionEventType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].REMOVE */ .Z.REMOVE, this.handleLayersRemove_, this));

    for (var id in this.listenerKeys_) {
      this.listenerKeys_[id].forEach(_events_js__WEBPACK_IMPORTED_MODULE_3__/* .unlistenByKey */ .bN);
    }

    (0,_obj_js__WEBPACK_IMPORTED_MODULE_0__/* .clear */ .ZH)(this.listenerKeys_);
    var layersArray = layers.getArray();

    for (var i = 0, ii = layersArray.length; i < ii; i++) {
      var layer = layersArray[i];
      this.listenerKeys_[(0,_util_js__WEBPACK_IMPORTED_MODULE_5__/* .getUid */ .sq)(layer)] = [(0,_events_js__WEBPACK_IMPORTED_MODULE_3__/* .listen */ .oL)(layer, _ObjectEventType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].PROPERTYCHANGE */ .Z.PROPERTYCHANGE, this.handleLayerChange_, this), (0,_events_js__WEBPACK_IMPORTED_MODULE_3__/* .listen */ .oL)(layer, _events_EventType_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"].CHANGE */ .Z.CHANGE, this.handleLayerChange_, this)];
    }

    this.changed();
  };
  /**
   * @param {import("../Collection.js").CollectionEvent} collectionEvent CollectionEvent.
   * @private
   */


  LayerGroup.prototype.handleLayersAdd_ = function (collectionEvent) {
    var layer =
    /** @type {import("./Base.js").default} */
    collectionEvent.element;
    this.listenerKeys_[(0,_util_js__WEBPACK_IMPORTED_MODULE_5__/* .getUid */ .sq)(layer)] = [(0,_events_js__WEBPACK_IMPORTED_MODULE_3__/* .listen */ .oL)(layer, _ObjectEventType_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"].PROPERTYCHANGE */ .Z.PROPERTYCHANGE, this.handleLayerChange_, this), (0,_events_js__WEBPACK_IMPORTED_MODULE_3__/* .listen */ .oL)(layer, _events_EventType_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"].CHANGE */ .Z.CHANGE, this.handleLayerChange_, this)];
    this.changed();
  };
  /**
   * @param {import("../Collection.js").CollectionEvent} collectionEvent CollectionEvent.
   * @private
   */


  LayerGroup.prototype.handleLayersRemove_ = function (collectionEvent) {
    var layer =
    /** @type {import("./Base.js").default} */
    collectionEvent.element;
    var key = (0,_util_js__WEBPACK_IMPORTED_MODULE_5__/* .getUid */ .sq)(layer);
    this.listenerKeys_[key].forEach(_events_js__WEBPACK_IMPORTED_MODULE_3__/* .unlistenByKey */ .bN);
    delete this.listenerKeys_[key];
    this.changed();
  };
  /**
   * Returns the {@link module:ol/Collection collection} of {@link module:ol/layer/Layer~Layer layers}
   * in this group.
   * @return {!import("../Collection.js").default<import("./Base.js").default>} Collection of
   *   {@link module:ol/layer/Base layers} that are part of this group.
   * @observable
   * @api
   */


  LayerGroup.prototype.getLayers = function () {
    return (
      /** @type {!import("../Collection.js").default<import("./Base.js").default>} */
      this.get(Property.LAYERS)
    );
  };
  /**
   * Set the {@link module:ol/Collection collection} of {@link module:ol/layer/Layer~Layer layers}
   * in this group.
   * @param {!import("../Collection.js").default<import("./Base.js").default>} layers Collection of
   *   {@link module:ol/layer/Base layers} that are part of this group.
   * @observable
   * @api
   */


  LayerGroup.prototype.setLayers = function (layers) {
    this.set(Property.LAYERS, layers);
  };
  /**
   * @param {Array<import("./Layer.js").default>} [opt_array] Array of layers (to be modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   */


  LayerGroup.prototype.getLayersArray = function (opt_array) {
    var array = opt_array !== undefined ? opt_array : [];
    this.getLayers().forEach(function (layer) {
      layer.getLayersArray(array);
    });
    return array;
  };
  /**
   * Get the layer states list and use this groups z-index as the default
   * for all layers in this and nested groups, if it is unset at this point.
   * If opt_states is not provided and this group's z-index is undefined
   * 0 is used a the default z-index.
   * @param {Array<import("./Layer.js").State>} [opt_states] Optional list
   * of layer states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   */


  LayerGroup.prototype.getLayerStatesArray = function (opt_states) {
    var states = opt_states !== undefined ? opt_states : [];
    var pos = states.length;
    this.getLayers().forEach(function (layer) {
      layer.getLayerStatesArray(states);
    });
    var ownLayerState = this.getLayerState();
    var defaultZIndex = ownLayerState.zIndex;

    if (!opt_states && ownLayerState.zIndex === undefined) {
      defaultZIndex = 0;
    }

    for (var i = pos, ii = states.length; i < ii; i++) {
      var layerState = states[i];
      layerState.opacity *= ownLayerState.opacity;
      layerState.visible = layerState.visible && ownLayerState.visible;
      layerState.maxResolution = Math.min(layerState.maxResolution, ownLayerState.maxResolution);
      layerState.minResolution = Math.max(layerState.minResolution, ownLayerState.minResolution);
      layerState.minZoom = Math.max(layerState.minZoom, ownLayerState.minZoom);
      layerState.maxZoom = Math.min(layerState.maxZoom, ownLayerState.maxZoom);

      if (ownLayerState.extent !== undefined) {
        if (layerState.extent !== undefined) {
          layerState.extent = (0,_extent_js__WEBPACK_IMPORTED_MODULE_8__/* .getIntersection */ .Ed)(layerState.extent, ownLayerState.extent);
        } else {
          layerState.extent = ownLayerState.extent;
        }
      }

      if (layerState.zIndex === undefined) {
        layerState.zIndex = defaultZIndex;
      }
    }

    return states;
  };
  /**
   * @return {import("../source/State.js").default} Source state.
   */


  LayerGroup.prototype.getSourceState = function () {
    return _source_State_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"].READY */ .Z.READY;
  };

  return LayerGroup;
}(_Base_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LayerGroup);

/***/ }),

/***/ 989:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Vector_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9074);
/* harmony import */ var _renderer_webgl_PointsLayer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9429);
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9800);
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4495);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9631);
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
 * @module ol/layer/Heatmap
 */







/**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {Array<string>} [gradient=['#00f', '#0ff', '#0f0', '#ff0', '#f00']] The color gradient
 * of the heatmap, specified as an array of CSS color strings.
 * @property {number} [radius=8] Radius size in pixels.
 * @property {number} [blur=15] Blur size in pixels.
 * @property {string|function(import("../Feature.js").default):number} [weight='weight'] The feature
 * attribute to use for the weight or a function that returns a weight from a feature. Weight values
 * should range from 0 to 1 (and values outside will be clamped to that range).
 * @property {import("../source/Vector.js").default} [source] Source.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */

/**
 * @enum {string}
 * @private
 */

var Property = {
  BLUR: 'blur',
  GRADIENT: 'gradient',
  RADIUS: 'radius'
};
/**
 * @const
 * @type {Array<string>}
 */

var DEFAULT_GRADIENT = ['#00f', '#0ff', '#0f0', '#ff0', '#f00'];
/**
 * @classdesc
 * Layer for rendering vector data as a heatmap.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @fires import("../render/Event.js").RenderEvent
 * @extends {VectorLayer<import("../source/Vector.js").default>}
 * @api
 */

var Heatmap =
/** @class */
function (_super) {
  __extends(Heatmap, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function Heatmap(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    var baseOptions = (0,_obj_js__WEBPACK_IMPORTED_MODULE_0__/* .assign */ .f0)({}, options);
    delete baseOptions.gradient;
    delete baseOptions.radius;
    delete baseOptions.blur;
    delete baseOptions.weight;
    _this = _super.call(this, baseOptions) || this;
    /**
     * @private
     * @type {HTMLCanvasElement}
     */

    _this.gradient_ = null;

    _this.addChangeListener(Property.GRADIENT, _this.handleGradientChanged_);

    _this.setGradient(options.gradient ? options.gradient : DEFAULT_GRADIENT);

    _this.setBlur(options.blur !== undefined ? options.blur : 15);

    _this.setRadius(options.radius !== undefined ? options.radius : 8);

    var weight = options.weight ? options.weight : 'weight';

    if (typeof weight === 'string') {
      _this.weightFunction_ = function (feature) {
        return feature.get(weight);
      };
    } else {
      _this.weightFunction_ = weight;
    } // For performance reasons, don't sort the features before rendering.
    // The render order is not relevant for a heatmap representation.


    _this.setRenderOrder(null);

    return _this;
  }
  /**
   * Return the blur size in pixels.
   * @return {number} Blur size in pixels.
   * @api
   * @observable
   */


  Heatmap.prototype.getBlur = function () {
    return (
      /** @type {number} */
      this.get(Property.BLUR)
    );
  };
  /**
   * Return the gradient colors as array of strings.
   * @return {Array<string>} Colors.
   * @api
   * @observable
   */


  Heatmap.prototype.getGradient = function () {
    return (
      /** @type {Array<string>} */
      this.get(Property.GRADIENT)
    );
  };
  /**
   * Return the size of the radius in pixels.
   * @return {number} Radius size in pixel.
   * @api
   * @observable
   */


  Heatmap.prototype.getRadius = function () {
    return (
      /** @type {number} */
      this.get(Property.RADIUS)
    );
  };
  /**
   * @private
   */


  Heatmap.prototype.handleGradientChanged_ = function () {
    this.gradient_ = createGradient(this.getGradient());
  };
  /**
   * Set the blur size in pixels.
   * @param {number} blur Blur size in pixels.
   * @api
   * @observable
   */


  Heatmap.prototype.setBlur = function (blur) {
    this.set(Property.BLUR, blur);
  };
  /**
   * Set the gradient colors as array of strings.
   * @param {Array<string>} colors Gradient.
   * @api
   * @observable
   */


  Heatmap.prototype.setGradient = function (colors) {
    this.set(Property.GRADIENT, colors);
  };
  /**
   * Set the size of the radius in pixels.
   * @param {number} radius Radius size in pixel.
   * @api
   * @observable
   */


  Heatmap.prototype.setRadius = function (radius) {
    this.set(Property.RADIUS, radius);
  };
  /**
   * Create a renderer for this layer.
   * @return {WebGLPointsLayerRenderer} A layer renderer.
   */


  Heatmap.prototype.createRenderer = function () {
    return new _renderer_webgl_PointsLayer_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z(this, {
      className: this.getClassName(),
      attributes: [{
        name: 'weight',
        callback: function (feature) {
          var weight = this.weightFunction_(feature);
          return weight !== undefined ? (0,_math_js__WEBPACK_IMPORTED_MODULE_2__/* .clamp */ .uZ)(weight, 0, 1) : 1;
        }.bind(this)
      }],
      vertexShader: "\n        precision mediump float;\n        uniform mat4 u_projectionMatrix;\n        uniform mat4 u_offsetScaleMatrix;\n        uniform float u_size;\n        attribute vec2 a_position;\n        attribute float a_index;\n        attribute float a_weight;\n\n        varying vec2 v_texCoord;\n        varying float v_weight;\n\n        void main(void) {\n          mat4 offsetMatrix = u_offsetScaleMatrix;\n          float offsetX = a_index == 0.0 || a_index == 3.0 ? -u_size / 2.0 : u_size / 2.0;\n          float offsetY = a_index == 0.0 || a_index == 1.0 ? -u_size / 2.0 : u_size / 2.0;\n          vec4 offsets = offsetMatrix * vec4(offsetX, offsetY, 0.0, 0.0);\n          gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0) + offsets;\n          float u = a_index == 0.0 || a_index == 3.0 ? 0.0 : 1.0;\n          float v = a_index == 0.0 || a_index == 1.0 ? 0.0 : 1.0;\n          v_texCoord = vec2(u, v);\n          v_weight = a_weight;\n        }",
      fragmentShader: "\n        precision mediump float;\n        uniform float u_blurSlope;\n\n        varying vec2 v_texCoord;\n        varying float v_weight;\n\n        void main(void) {\n          vec2 texCoord = v_texCoord * 2.0 - vec2(1.0, 1.0);\n          float sqRadius = texCoord.x * texCoord.x + texCoord.y * texCoord.y;\n          float value = (1.0 - sqrt(sqRadius)) * u_blurSlope;\n          float alpha = smoothstep(0.0, 1.0, value) * v_weight;\n          gl_FragColor = vec4(alpha, alpha, alpha, alpha);\n        }",
      hitVertexShader: "\n        precision mediump float;\n        uniform mat4 u_projectionMatrix;\n        uniform mat4 u_offsetScaleMatrix;\n        uniform float u_size;\n        attribute vec2 a_position;\n        attribute float a_index;\n        attribute float a_weight;\n        attribute vec4 a_hitColor;\n\n        varying vec2 v_texCoord;\n        varying float v_weight;\n        varying vec4 v_hitColor;\n\n        void main(void) {\n          mat4 offsetMatrix = u_offsetScaleMatrix;\n          float offsetX = a_index == 0.0 || a_index == 3.0 ? -u_size / 2.0 : u_size / 2.0;\n          float offsetY = a_index == 0.0 || a_index == 1.0 ? -u_size / 2.0 : u_size / 2.0;\n          vec4 offsets = offsetMatrix * vec4(offsetX, offsetY, 0.0, 0.0);\n          gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0) + offsets;\n          float u = a_index == 0.0 || a_index == 3.0 ? 0.0 : 1.0;\n          float v = a_index == 0.0 || a_index == 1.0 ? 0.0 : 1.0;\n          v_texCoord = vec2(u, v);\n          v_hitColor = a_hitColor;\n          v_weight = a_weight;\n        }",
      hitFragmentShader: "\n        precision mediump float;\n        uniform float u_blurSlope;\n\n        varying vec2 v_texCoord;\n        varying float v_weight;\n        varying vec4 v_hitColor;\n\n        void main(void) {\n          vec2 texCoord = v_texCoord * 2.0 - vec2(1.0, 1.0);\n          float sqRadius = texCoord.x * texCoord.x + texCoord.y * texCoord.y;\n          float value = (1.0 - sqrt(sqRadius)) * u_blurSlope;\n          float alpha = smoothstep(0.0, 1.0, value) * v_weight;\n          if (alpha < 0.05) {\n            discard;\n          }\n\n          gl_FragColor = v_hitColor;\n        }",
      uniforms: {
        u_size: function () {
          return (this.get(Property.RADIUS) + this.get(Property.BLUR)) * 2;
        }.bind(this),
        u_blurSlope: function () {
          return this.get(Property.RADIUS) / Math.max(1, this.get(Property.BLUR));
        }.bind(this)
      },
      postProcesses: [{
        fragmentShader: "\n            precision mediump float;\n\n            uniform sampler2D u_image;\n            uniform sampler2D u_gradientTexture;\n\n            varying vec2 v_texCoord;\n\n            void main() {\n              vec4 color = texture2D(u_image, v_texCoord);\n              gl_FragColor.a = color.a;\n              gl_FragColor.rgb = texture2D(u_gradientTexture, vec2(0.5, color.a)).rgb;\n              gl_FragColor.rgb *= gl_FragColor.a;\n            }",
        uniforms: {
          u_gradientTexture: function () {
            return this.gradient_;
          }.bind(this)
        }
      }]
    });
  };

  Heatmap.prototype.renderDeclutter = function () {};

  return Heatmap;
}(_Vector_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z);
/**
 * @param {Array<string>} colors A list of colored.
 * @return {HTMLCanvasElement} canvas with gradient texture.
 */


function createGradient(colors) {
  var width = 1;
  var height = 256;
  var context = (0,_dom_js__WEBPACK_IMPORTED_MODULE_4__/* .createCanvasContext2D */ .E4)(width, height);
  var gradient = context.createLinearGradient(0, 0, width, height);
  var step = 1 / (colors.length - 1);

  for (var i = 0, ii = colors.length; i < ii; ++i) {
    gradient.addColorStop(i * step, colors[i]);
  }

  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
  return context.canvas;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Heatmap);

/***/ }),

/***/ 8498:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "j": () => (/* binding */ inView)
/* harmony export */ });
/* harmony import */ var _Base_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2932);
/* harmony import */ var _events_EventType_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2140);
/* harmony import */ var _Property_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3722);
/* harmony import */ var _render_EventType_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(834);
/* harmony import */ var _source_State_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(669);
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4548);
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9800);
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5750);
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
 * @module ol/layer/Layer
 */










/**
 * @typedef {function(import("../PluggableMap.js").FrameState):HTMLElement} RenderFunction
 */

/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("./Base").BaseLayerObjectEventTypes|
 *     'change:source', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("../render/EventType").LayerRenderEventTypes, import("../render/Event").default, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("./Base").BaseLayerObjectEventTypes|'change:source'|
 *     import("../render/EventType").LayerRenderEventTypes, Return>} LayerOnSignature
 */

/**
 * @template {import("../source/Source.js").default} SourceType
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {SourceType} [source] Source for this layer.  If not provided to the constructor,
 * the source can be set by calling {@link module:ol/layer/Layer~Layer#setSource layer.setSource(source)} after
 * construction.
 * @property {import("../PluggableMap.js").default} [map] Map.
 * @property {RenderFunction} [render] Render function. Takes the frame state as input and is expected to return an
 * HTML element. Will overwrite the default rendering for the layer.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */

/**
 * @typedef {Object} State
 * @property {import("./Layer.js").default} layer Layer.
 * @property {number} opacity Opacity, the value is rounded to two digits to appear after the decimal point.
 * @property {import("../source/State.js").default} sourceState SourceState.
 * @property {boolean} visible Visible.
 * @property {boolean} managed Managed.
 * @property {import("../extent.js").Extent} [extent] Extent.
 * @property {number} zIndex ZIndex.
 * @property {number} maxResolution Maximum resolution.
 * @property {number} minResolution Minimum resolution.
 * @property {number} minZoom Minimum zoom.
 * @property {number} maxZoom Maximum zoom.
 */

/**
 * @classdesc
 * Base class from which all layer types are derived. This should only be instantiated
 * in the case where a custom layer is be added to the map with a custom `render` function.
 * Such a function can be specified in the `options` object, and is expected to return an HTML element.
 *
 * A visual representation of raster or vector map data.
 * Layers group together those properties that pertain to how the data is to be
 * displayed, irrespective of the source of that data.
 *
 * Layers are usually added to a map with {@link import("../PluggableMap.js").default#addLayer map.addLayer()}. Components
 * like {@link module:ol/interaction/Draw~Draw} use unmanaged layers
 * internally. These unmanaged layers are associated with the map using
 * {@link module:ol/layer/Layer~Layer#setMap} instead.
 *
 * A generic `change` event is fired when the state of the source changes.
 *
 * Please note that for performance reasons several layers might get rendered to
 * the same HTML element, which will cause {@link import("../PluggableMap.js").default#forEachLayerAtPixel map.forEachLayerAtPixel()} to
 * give false positives. To avoid this, apply different `className` properties to the
 * layers at creation time.
 *
 * @fires import("../render/Event.js").RenderEvent#prerender
 * @fires import("../render/Event.js").RenderEvent#postrender
 *
 * @template {import("../source/Source.js").default} SourceType
 * @api
 */

var Layer =
/** @class */
function (_super) {
  __extends(Layer, _super);
  /**
   * @param {Options<SourceType>} options Layer options.
   */


  function Layer(options) {
    var _this = this;

    var baseOptions = (0,_obj_js__WEBPACK_IMPORTED_MODULE_0__/* .assign */ .f0)({}, options);
    delete baseOptions.source;
    _this = _super.call(this, baseOptions) || this;
    /***
     * @type {LayerOnSignature<import("../events").EventsKey>}
     */

    _this.on;
    /***
     * @type {LayerOnSignature<import("../events").EventsKey>}
     */

    _this.once;
    /***
     * @type {LayerOnSignature<void>}
     */

    _this.un;
    /**
     * @private
     * @type {?import("../events.js").EventsKey}
     */

    _this.mapPrecomposeKey_ = null;
    /**
     * @private
     * @type {?import("../events.js").EventsKey}
     */

    _this.mapRenderKey_ = null;
    /**
     * @private
     * @type {?import("../events.js").EventsKey}
     */

    _this.sourceChangeKey_ = null;
    /**
     * @private
     * @type {import("../renderer/Layer.js").default}
     */

    _this.renderer_ = null; // Overwrite default render method with a custom one

    if (options.render) {
      _this.render = options.render;
    }

    if (options.map) {
      _this.setMap(options.map);
    }

    _this.addChangeListener(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].SOURCE */ .Z.SOURCE, _this.handleSourcePropertyChange_);

    var source = options.source ?
    /** @type {SourceType} */
    options.source : null;

    _this.setSource(source);

    return _this;
  }
  /**
   * @param {Array<import("./Layer.js").default>} [opt_array] Array of layers (to be modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   */


  Layer.prototype.getLayersArray = function (opt_array) {
    var array = opt_array ? opt_array : [];
    array.push(this);
    return array;
  };
  /**
   * @param {Array<import("./Layer.js").State>} [opt_states] Optional list of layer states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   */


  Layer.prototype.getLayerStatesArray = function (opt_states) {
    var states = opt_states ? opt_states : [];
    states.push(this.getLayerState());
    return states;
  };
  /**
   * Get the layer source.
   * @return {SourceType} The layer source (or `null` if not yet set).
   * @observable
   * @api
   */


  Layer.prototype.getSource = function () {
    return (
      /** @type {SourceType} */
      this.get(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].SOURCE */ .Z.SOURCE) || null
    );
  };
  /**
   * @return {import("../source/State.js").default} Source state.
   */


  Layer.prototype.getSourceState = function () {
    var source = this.getSource();
    return !source ? _source_State_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].UNDEFINED */ .Z.UNDEFINED : source.getState();
  };
  /**
   * @private
   */


  Layer.prototype.handleSourceChange_ = function () {
    this.changed();
  };
  /**
   * @private
   */


  Layer.prototype.handleSourcePropertyChange_ = function () {
    if (this.sourceChangeKey_) {
      (0,_events_js__WEBPACK_IMPORTED_MODULE_3__/* .unlistenByKey */ .bN)(this.sourceChangeKey_);
      this.sourceChangeKey_ = null;
    }

    var source = this.getSource();

    if (source) {
      this.sourceChangeKey_ = (0,_events_js__WEBPACK_IMPORTED_MODULE_3__/* .listen */ .oL)(source, _events_EventType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].CHANGE */ .Z.CHANGE, this.handleSourceChange_, this);
    }

    this.changed();
  };
  /**
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").default>>} Promise that resolves with
   * an array of features.
   */


  Layer.prototype.getFeatures = function (pixel) {
    if (!this.renderer_) {
      return new Promise(function (resolve) {
        return resolve([]);
      });
    }

    return this.renderer_.getFeatures(pixel);
  };
  /**
   * In charge to manage the rendering of the layer. One layer type is
   * bounded with one layer renderer.
   * @param {?import("../PluggableMap.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target which the renderer may (but need not) use
   * for rendering its content.
   * @return {HTMLElement} The rendered element.
   */


  Layer.prototype.render = function (frameState, target) {
    var layerRenderer = this.getRenderer();

    if (layerRenderer.prepareFrame(frameState)) {
      return layerRenderer.renderFrame(frameState, target);
    }
  };
  /**
   * Sets the layer to be rendered on top of other layers on a map. The map will
   * not manage this layer in its layers collection, and the callback in
   * {@link module:ol/Map~Map#forEachLayerAtPixel} will receive `null` as layer. This
   * is useful for temporary layers. To remove an unmanaged layer from the map,
   * use `#setMap(null)`.
   *
   * To add the layer to a map and have it managed by the map, use
   * {@link module:ol/Map~Map#addLayer} instead.
   * @param {import("../PluggableMap.js").default} map Map.
   * @api
   */


  Layer.prototype.setMap = function (map) {
    if (this.mapPrecomposeKey_) {
      (0,_events_js__WEBPACK_IMPORTED_MODULE_3__/* .unlistenByKey */ .bN)(this.mapPrecomposeKey_);
      this.mapPrecomposeKey_ = null;
    }

    if (!map) {
      this.changed();
    }

    if (this.mapRenderKey_) {
      (0,_events_js__WEBPACK_IMPORTED_MODULE_3__/* .unlistenByKey */ .bN)(this.mapRenderKey_);
      this.mapRenderKey_ = null;
    }

    if (map) {
      this.mapPrecomposeKey_ = (0,_events_js__WEBPACK_IMPORTED_MODULE_3__/* .listen */ .oL)(map, _render_EventType_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"].PRECOMPOSE */ .Z.PRECOMPOSE, function (evt) {
        var renderEvent =
        /** @type {import("../render/Event.js").default} */
        evt;
        var layerStatesArray = renderEvent.frameState.layerStatesArray;
        var layerState = this.getLayerState(false); // A layer can only be added to the map once. Use either `layer.setMap()` or `map.addLayer()`, not both.

        (0,_asserts_js__WEBPACK_IMPORTED_MODULE_6__/* .assert */ .h)(!layerStatesArray.some(function (arrayLayerState) {
          return arrayLayerState.layer === layerState.layer;
        }), 67);
        layerStatesArray.push(layerState);
      }, this);
      this.mapRenderKey_ = (0,_events_js__WEBPACK_IMPORTED_MODULE_3__/* .listen */ .oL)(this, _events_EventType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].CHANGE */ .Z.CHANGE, map.render, map);
      this.changed();
    }
  };
  /**
   * Set the layer source.
   * @param {SourceType} source The layer source.
   * @observable
   * @api
   */


  Layer.prototype.setSource = function (source) {
    this.set(_Property_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].SOURCE */ .Z.SOURCE, source);
  };
  /**
   * Get the renderer for this layer.
   * @return {import("../renderer/Layer.js").default} The layer renderer.
   */


  Layer.prototype.getRenderer = function () {
    if (!this.renderer_) {
      this.renderer_ = this.createRenderer();
    }

    return this.renderer_;
  };
  /**
   * @return {boolean} The layer has a renderer.
   */


  Layer.prototype.hasRenderer = function () {
    return !!this.renderer_;
  };
  /**
   * Create a renderer for this layer.
   * @return {import("../renderer/Layer.js").default} A layer renderer.
   * @protected
   */


  Layer.prototype.createRenderer = function () {
    return null;
  };
  /**
   * Clean up.
   */


  Layer.prototype.disposeInternal = function () {
    if (this.renderer_) {
      this.renderer_.dispose();
      delete this.renderer_;
    }

    this.setSource(null);

    _super.prototype.disposeInternal.call(this);
  };

  return Layer;
}(_Base_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z);
/**
 * Return `true` if the layer is visible and if the provided view state
 * has resolution and zoom levels that are in range of the layer's min/max.
 * @param {State} layerState Layer state.
 * @param {import("../View.js").State} viewState View state.
 * @return {boolean} The layer is visible at the given view state.
 */


function inView(layerState, viewState) {
  if (!layerState.visible) {
    return false;
  }

  var resolution = viewState.resolution;

  if (resolution < layerState.minResolution || resolution >= layerState.maxResolution) {
    return false;
  }

  var zoom = viewState.zoom;
  return zoom > layerState.minZoom && zoom <= layerState.maxZoom;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layer);

/***/ }),

/***/ 3722:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/layer/Property
 */

/**
 * @enum {string}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  OPACITY: 'opacity',
  VISIBLE: 'visible',
  EXTENT: 'extent',
  Z_INDEX: 'zIndex',
  MAX_RESOLUTION: 'maxResolution',
  MIN_RESOLUTION: 'minResolution',
  MAX_ZOOM: 'maxZoom',
  MIN_ZOOM: 'minZoom',
  SOURCE: 'source'
});

/***/ }),

/***/ 7147:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Tile)
});

// EXTERNAL MODULE: ./node_modules/ol/layer/Layer.js
var Layer = __webpack_require__(8498);
// EXTERNAL MODULE: ./node_modules/ol/layer/TileProperty.js
var TileProperty = __webpack_require__(3067);
// EXTERNAL MODULE: ./node_modules/ol/obj.js
var obj = __webpack_require__(9800);
;// CONCATENATED MODULE: ./node_modules/ol/layer/BaseTile.js
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
 * @module ol/layer/BaseTile
 */





/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("./Base").BaseLayerObjectEventTypes|
 *     'change:source'|'change:preload'|'change:useInterimTilesOnError', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("../render/EventType").LayerRenderEventTypes, import("../render/Event").default, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("./Base").BaseLayerObjectEventTypes|
 *   'change:source'|'change:preload'|'change:useInterimTilesOnError'|import("../render/EventType").LayerRenderEventTypes, Return>} BaseTileLayerOnSignature
 */

/**
 * @template {import("../source/Tile.js").default} TileSourceType
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {number} [preload=0] Preload. Load low-resolution tiles up to `preload` levels. `0`
 * means no preloading.
 * @property {TileSourceType} [source] Source for this layer.
 * @property {import("../PluggableMap.js").default} [map] Sets the layer as overlay on a map. The map will not manage
 * this layer in its layers collection, and the layer will be rendered on top. This is useful for
 * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
 * use {@link import("../PluggableMap.js").default#addLayer map.addLayer()}.
 * @property {boolean} [useInterimTilesOnError=true] Use interim tiles on error.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */

/**
 * @classdesc
 * For layer sources that provide pre-rendered, tiled images in grids that are
 * organized by zoom levels for specific resolutions.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Tile.js").default} TileSourceType
 * @extends {Layer<TileSourceType>}
 * @api
 */

var BaseTileLayer =
/** @class */
function (_super) {
  __extends(BaseTileLayer, _super);
  /**
   * @param {Options<TileSourceType>} [opt_options] Tile layer options.
   */


  function BaseTileLayer(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    var baseOptions = (0,obj/* assign */.f0)({}, options);
    delete baseOptions.preload;
    delete baseOptions.useInterimTilesOnError;
    _this = _super.call(this, baseOptions) || this;
    /***
     * @type {BaseTileLayerOnSignature<import("../events").EventsKey>}
     */

    _this.on;
    /***
     * @type {BaseTileLayerOnSignature<import("../events").EventsKey>}
     */

    _this.once;
    /***
     * @type {BaseTileLayerOnSignature<void>}
     */

    _this.un;

    _this.setPreload(options.preload !== undefined ? options.preload : 0);

    _this.setUseInterimTilesOnError(options.useInterimTilesOnError !== undefined ? options.useInterimTilesOnError : true);

    return _this;
  }
  /**
   * Return the level as number to which we will preload tiles up to.
   * @return {number} The level to preload tiles up to.
   * @observable
   * @api
   */


  BaseTileLayer.prototype.getPreload = function () {
    return (
      /** @type {number} */
      this.get(TileProperty/* default.PRELOAD */.Z.PRELOAD)
    );
  };
  /**
   * Set the level as number to which we will preload tiles up to.
   * @param {number} preload The level to preload tiles up to.
   * @observable
   * @api
   */


  BaseTileLayer.prototype.setPreload = function (preload) {
    this.set(TileProperty/* default.PRELOAD */.Z.PRELOAD, preload);
  };
  /**
   * Whether we use interim tiles on error.
   * @return {boolean} Use interim tiles on error.
   * @observable
   * @api
   */


  BaseTileLayer.prototype.getUseInterimTilesOnError = function () {
    return (
      /** @type {boolean} */
      this.get(TileProperty/* default.USE_INTERIM_TILES_ON_ERROR */.Z.USE_INTERIM_TILES_ON_ERROR)
    );
  };
  /**
   * Set whether we use interim tiles on error.
   * @param {boolean} useInterimTilesOnError Use interim tiles on error.
   * @observable
   * @api
   */


  BaseTileLayer.prototype.setUseInterimTilesOnError = function (useInterimTilesOnError) {
    this.set(TileProperty/* default.USE_INTERIM_TILES_ON_ERROR */.Z.USE_INTERIM_TILES_ON_ERROR, useInterimTilesOnError);
  };

  return BaseTileLayer;
}(Layer/* default */.Z);

/* harmony default export */ const BaseTile = (BaseTileLayer);
// EXTERNAL MODULE: ./node_modules/ol/renderer/canvas/TileLayer.js
var canvas_TileLayer = __webpack_require__(2954);
;// CONCATENATED MODULE: ./node_modules/ol/layer/Tile.js
var Tile_extends = undefined && undefined.__extends || function () {
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
 * @module ol/layer/Tile
 */




/**
 * @classdesc
 * For layer sources that provide pre-rendered, tiled images in grids that are
 * organized by zoom levels for specific resolutions.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Tile.js").default} TileSourceType
 * @extends {BaseTileLayer<TileSourceType>}
 * @api
 */

var TileLayer =
/** @class */
function (_super) {
  Tile_extends(TileLayer, _super);
  /**
   * @param {import("./BaseTile.js").Options<TileSourceType>} [opt_options] Tile layer options.
   */


  function TileLayer(opt_options) {
    return _super.call(this, opt_options) || this;
  }
  /**
   * Create a renderer for this layer.
   * @return {import("../renderer/Layer.js").default} A layer renderer.
   * @protected
   */


  TileLayer.prototype.createRenderer = function () {
    return new canvas_TileLayer/* default */.Z(this);
  };

  return TileLayer;
}(BaseTile);

/* harmony default export */ const Tile = (TileLayer);

/***/ }),

/***/ 3067:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/layer/TileProperty
 */

/**
 * @enum {string}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  PRELOAD: 'preload',
  USE_INTERIM_TILES_ON_ERROR: 'useInterimTilesOnError'
});

/***/ }),

/***/ 9074:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseVector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(248);
/* harmony import */ var _renderer_canvas_VectorLayer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8513);
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
 * @module ol/layer/Vector
 */




/**
 * @classdesc
 * Vector data that is rendered client-side.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Vector.js").default} VectorSourceType
 * @extends {BaseVectorLayer<VectorSourceType>}
 * @api
 */

var VectorLayer =
/** @class */
function (_super) {
  __extends(VectorLayer, _super);
  /**
   * @param {import("./BaseVector.js").Options<VectorSourceType>} [opt_options] Options.
   */


  function VectorLayer(opt_options) {
    return _super.call(this, opt_options) || this;
  }
  /**
   * Create a renderer for this layer.
   * @return {import("../renderer/Layer.js").default} A layer renderer.
   */


  VectorLayer.prototype.createRenderer = function () {
    return new _renderer_canvas_VectorLayer_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z(this);
  };

  return VectorLayer;
}(_BaseVector_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VectorLayer);

/***/ }),

/***/ 7298:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseVector_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(248);
/* harmony import */ var _renderer_canvas_VectorTileLayer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4559);
/* harmony import */ var _TileProperty_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3067);
/* harmony import */ var _VectorTileRenderType_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9842);
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4548);
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9800);
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
 * @module ol/layer/VectorTile
 */








/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("./Base").BaseLayerObjectEventTypes|
 *     'change:source'|'change:preload'|'change:useInterimTilesOnError', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("../render/EventType").LayerRenderEventTypes, import("../render/Event").default, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("./Base").BaseLayerObjectEventTypes|
 *     'change:source'|'change:preload'|'change:useInterimTilesOnError'|import("../render/EventType").LayerRenderEventTypes, Return>} VectorTileLayerOnSignature
 */

/**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {import("../render.js").OrderFunction} [renderOrder] Render order. Function to be used when sorting
 * features before rendering. By default features are drawn in the order that they are created. Use
 * `null` to avoid the sort, but get an undefined draw order.
 * @property {number} [renderBuffer=100] The buffer in pixels around the tile extent used by the
 * renderer when getting features from the vector tile for the rendering or hit-detection.
 * Recommended value: Vector tiles are usually generated with a buffer, so this value should match
 * the largest possible buffer of the used tiles. It should be at least the size of the largest
 * point symbol or line width.
 * @property {import("./VectorTileRenderType.js").default|string} [renderMode='hybrid'] Render mode for vector tiles:
 *  * `'hybrid'`: Polygon and line elements are rendered as images, so pixels are scaled during zoom
 *    animations. Point symbols and texts are accurately rendered as vectors and can stay upright on
 *    rotated views.
 *  * `'vector'`: Everything is rendered as vectors. Use this mode for improved performance on vector
 *    tile layers with only a few rendered features (e.g. for highlighting a subset of features of
 *    another layer with the same source).
 * @property {import("../source/VectorTile.js").default} [source] Source.
 * @property {import("../PluggableMap.js").default} [map] Sets the layer as overlay on a map. The map will not manage
 * this layer in its layers collection, and the layer will be rendered on top. This is useful for
 * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
 * use {@link import("../PluggableMap.js").default#addLayer map.addLayer()}.
 * @property {boolean} [declutter=false] Declutter images and text. Decluttering is applied to all
 * image and text styles of all Vector and VectorTile layers that have set this to `true`. The priority
 * is defined by the z-index of the layer, the `zIndex` of the style and the render order of features.
 * Higher z-index means higher priority. Within the same z-index, a feature rendered before another has
 * higher priority.
 * @property {import("../style/Style.js").StyleLike} [style] Layer style. See
 * {@link import("../style/Style.js").default the style docs} for the default style that will be used if
 * this is not defined.
 * @property {boolean} [updateWhileAnimating=false] When set to `true`, feature batches will be
 * recreated during animations. This means that no vectors will be shown clipped, but the setting
 * will have a performance impact for large amounts of vector data. When set to `false`, batches
 * will be recreated when no animation is active.
 * @property {boolean} [updateWhileInteracting=false] When set to `true`, feature batches will be
 * recreated during interactions. See also `updateWhileAnimating`.
 * @property {number} [preload=0] Preload. Load low-resolution tiles up to `preload` levels. `0`
 * means no preloading.
 * @property {boolean} [useInterimTilesOnError=true] Use interim tiles on error.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */

/**
 * @classdesc
 * Layer for vector tile data that is rendered client-side.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @param {Options} [opt_options] Options.
 * @extends {BaseVectorLayer<import("../source/VectorTile.js").default>}
 * @api
 */

var VectorTileLayer =
/** @class */
function (_super) {
  __extends(VectorTileLayer, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function VectorTileLayer(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    var baseOptions =
    /** @type {Object} */
    (0,_obj_js__WEBPACK_IMPORTED_MODULE_0__/* .assign */ .f0)({}, options);
    delete baseOptions.preload;
    delete baseOptions.useInterimTilesOnError;
    _this = _super.call(this,
    /** @type {import("./BaseVector.js").Options<import("../source/VectorTile.js").default>} */
    baseOptions) || this;
    /***
     * @type {VectorTileLayerOnSignature<import("../events").EventsKey>}
     */

    _this.on;
    /***
     * @type {VectorTileLayerOnSignature<import("../events").EventsKey>}
     */

    _this.once;
    /***
     * @type {VectorTileLayerOnSignature<void>}
     */

    _this.un;

    if (options.renderMode === _VectorTileRenderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].IMAGE */ .Z.IMAGE) {
      //FIXME deprecated - remove this check in v7.
      //eslint-disable-next-line
      console.warn('renderMode: "image" is deprecated. Option ignored.');
      options.renderMode = undefined;
    }

    var renderMode = options.renderMode || _VectorTileRenderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].HYBRID */ .Z.HYBRID;
    (0,_asserts_js__WEBPACK_IMPORTED_MODULE_2__/* .assert */ .h)(renderMode == _VectorTileRenderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].HYBRID */ .Z.HYBRID || renderMode == _VectorTileRenderType_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].VECTOR */ .Z.VECTOR, 28); // `renderMode` must be `'hybrid'` or `'vector'`.

    /**
     * @private
     * @type {import("./VectorTileRenderType.js").default}
     */

    _this.renderMode_ = renderMode;

    _this.setPreload(options.preload ? options.preload : 0);

    _this.setUseInterimTilesOnError(options.useInterimTilesOnError !== undefined ? options.useInterimTilesOnError : true);

    return _this;
  }
  /**
   * Create a renderer for this layer.
   * @return {import("../renderer/Layer.js").default} A layer renderer.
   * @protected
   */


  VectorTileLayer.prototype.createRenderer = function () {
    return new _renderer_canvas_VectorTileLayer_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z(this);
  };
  /**
   * Get the topmost feature that intersects the given pixel on the viewport. Returns a promise
   * that resolves with an array of features. The array will either contain the topmost feature
   * when a hit was detected, or it will be empty.
   *
   * The hit detection algorithm used for this method is optimized for performance, but is less
   * accurate than the one used in {@link import("../PluggableMap.js").default#getFeaturesAtPixel map.getFeaturesAtPixel()}: Text
   * is not considered, and icons are only represented by their bounding box instead of the exact
   * image.
   *
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").default>>} Promise that resolves with an array of features.
   * @api
   */


  VectorTileLayer.prototype.getFeatures = function (pixel) {
    return _super.prototype.getFeatures.call(this, pixel);
  };
  /**
   * @return {import("./VectorTileRenderType.js").default} The render mode.
   */


  VectorTileLayer.prototype.getRenderMode = function () {
    return this.renderMode_;
  };
  /**
   * Return the level as number to which we will preload tiles up to.
   * @return {number} The level to preload tiles up to.
   * @observable
   * @api
   */


  VectorTileLayer.prototype.getPreload = function () {
    return (
      /** @type {number} */
      this.get(_TileProperty_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].PRELOAD */ .Z.PRELOAD)
    );
  };
  /**
   * Whether we use interim tiles on error.
   * @return {boolean} Use interim tiles on error.
   * @observable
   * @api
   */


  VectorTileLayer.prototype.getUseInterimTilesOnError = function () {
    return (
      /** @type {boolean} */
      this.get(_TileProperty_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].USE_INTERIM_TILES_ON_ERROR */ .Z.USE_INTERIM_TILES_ON_ERROR)
    );
  };
  /**
   * Set the level as number to which we will preload tiles up to.
   * @param {number} preload The level to preload tiles up to.
   * @observable
   * @api
   */


  VectorTileLayer.prototype.setPreload = function (preload) {
    this.set(_TileProperty_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].PRELOAD */ .Z.PRELOAD, preload);
  };
  /**
   * Set whether we use interim tiles on error.
   * @param {boolean} useInterimTilesOnError Use interim tiles on error.
   * @observable
   * @api
   */


  VectorTileLayer.prototype.setUseInterimTilesOnError = function (useInterimTilesOnError) {
    this.set(_TileProperty_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].USE_INTERIM_TILES_ON_ERROR */ .Z.USE_INTERIM_TILES_ON_ERROR, useInterimTilesOnError);
  };

  return VectorTileLayer;
}(_BaseVector_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VectorTileLayer);

/***/ }),

/***/ 9842:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/layer/VectorTileRenderType
 */

/**
 * @enum {string}
 * Render mode for vector tiles:
 * @api
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /**
   * Vector tiles are rendered as images. Great performance, but
   * point symbols and texts are always rotated with the view and pixels are
   * scaled during zoom animations
   * @api
   * @deprecated
   */
  IMAGE: 'image',

  /**
   * Polygon and line elements are rendered as images, so pixels
   * are scaled during zoom animations. Point symbols and texts are accurately
   * rendered as vectors and can stay upright on rotated views.
   * @api
   */
  HYBRID: 'hybrid',

  /**
   * Everything is rendered as vectors. Use this mode for improved
   * performance on vector tile layers with only a few rendered features (e.g.
   * for highlighting a subset of features of another layer with the same
   * source).
   * @api
   */
  VECTOR: 'vector'
});

/***/ }),

/***/ 543:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$6": () => (/* binding */ all),
/* harmony export */   "VW": () => (/* binding */ bbox)
/* harmony export */ });
/* unused harmony export tile */
/* harmony import */ var _proj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8623);
/**
 * @module ol/loadingstrategy
 */

/**
 * Strategy function for loading all features with a single request.
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} resolution Resolution.
 * @return {Array<import("./extent.js").Extent>} Extents.
 * @api
 */

function all(extent, resolution) {
  return [[-Infinity, -Infinity, Infinity, Infinity]];
}
/**
 * Strategy function for loading features based on the view's extent and
 * resolution.
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} resolution Resolution.
 * @return {Array<import("./extent.js").Extent>} Extents.
 * @api
 */

function bbox(extent, resolution) {
  return [extent];
}
/**
 * Creates a strategy function for loading features based on a tile grid.
 * @param {import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {function(import("./extent.js").Extent, number, import("./proj.js").Projection): Array<import("./extent.js").Extent>} Loading strategy.
 * @api
 */

function tile(tileGrid) {
  return (
    /**
     * @param {import("./extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {import("./proj.js").Projection} projection Projection.
     * @return {Array<import("./extent.js").Extent>} Extents.
     */
    function (extent, resolution, projection) {
      var z = tileGrid.getZForResolution(fromUserResolution(resolution, projection));
      var tileRange = tileGrid.getTileRangeForExtentAndZ(fromUserExtent(extent, projection), z);
      /** @type {Array<import("./extent.js").Extent>} */

      var extents = [];
      /** @type {import("./tilecoord.js").TileCoord} */

      var tileCoord = [z, 0, 0];

      for (tileCoord[1] = tileRange.minX; tileCoord[1] <= tileRange.maxX; ++tileCoord[1]) {
        for (tileCoord[2] = tileRange.minY; tileCoord[2] <= tileRange.maxY; ++tileCoord[2]) {
          extents.push(toUserExtent(tileGrid.getTileCoordExtent(tileCoord), projection));
        }
      }

      return extents;
    }
  );
}

/***/ })

}]);