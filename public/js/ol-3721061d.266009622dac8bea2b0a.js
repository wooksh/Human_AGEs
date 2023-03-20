"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[557],{

/***/ 3512:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ ol_Map)
});

// EXTERNAL MODULE: ./node_modules/ol/renderer/Composite.js + 1 modules
var Composite = __webpack_require__(4983);
// EXTERNAL MODULE: ./node_modules/ol/Object.js
var ol_Object = __webpack_require__(7182);
// EXTERNAL MODULE: ./node_modules/ol/Collection.js
var Collection = __webpack_require__(1210);
// EXTERNAL MODULE: ./node_modules/ol/CollectionEventType.js
var CollectionEventType = __webpack_require__(9890);
// EXTERNAL MODULE: ./node_modules/ol/events/EventType.js
var EventType = __webpack_require__(2140);
// EXTERNAL MODULE: ./node_modules/ol/layer/Group.js
var Group = __webpack_require__(9511);
// EXTERNAL MODULE: ./node_modules/ol/MapBrowserEvent.js
var MapBrowserEvent = __webpack_require__(1548);
// EXTERNAL MODULE: ./node_modules/ol/MapBrowserEventHandler.js
var MapBrowserEventHandler = __webpack_require__(8326);
// EXTERNAL MODULE: ./node_modules/ol/MapBrowserEventType.js
var MapBrowserEventType = __webpack_require__(3998);
// EXTERNAL MODULE: ./node_modules/ol/MapEvent.js
var MapEvent = __webpack_require__(9105);
// EXTERNAL MODULE: ./node_modules/ol/MapEventType.js
var MapEventType = __webpack_require__(7742);
// EXTERNAL MODULE: ./node_modules/ol/MapProperty.js
var MapProperty = __webpack_require__(8703);
// EXTERNAL MODULE: ./node_modules/ol/ObjectEventType.js
var ObjectEventType = __webpack_require__(4314);
// EXTERNAL MODULE: ./node_modules/ol/pointer/EventType.js
var pointer_EventType = __webpack_require__(6850);
// EXTERNAL MODULE: ./node_modules/ol/render/EventType.js
var render_EventType = __webpack_require__(834);
// EXTERNAL MODULE: ./node_modules/ol/structs/PriorityQueue.js
var PriorityQueue = __webpack_require__(2002);
// EXTERNAL MODULE: ./node_modules/ol/TileState.js
var TileState = __webpack_require__(587);
;// CONCATENATED MODULE: ./node_modules/ol/TileQueue.js
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
 * @module ol/TileQueue
 */





/**
 * @typedef {function(import("./Tile.js").default, string, import("./coordinate.js").Coordinate, number): number} PriorityFunction
 */

var TileQueue =
/** @class */
function (_super) {
  __extends(TileQueue, _super);
  /**
   * @param {PriorityFunction} tilePriorityFunction Tile priority function.
   * @param {function(): ?} tileChangeCallback Function called on each tile change event.
   */


  function TileQueue(tilePriorityFunction, tileChangeCallback) {
    var _this = _super.call(this,
    /**
     * @param {Array} element Element.
     * @return {number} Priority.
     */
    function (element) {
      return tilePriorityFunction.apply(null, element);
    },
    /**
     * @param {Array} element Element.
     * @return {string} Key.
     */
    function (element) {
      return (
        /** @type {import("./Tile.js").default} */
        element[0].getKey()
      );
    }) || this;
    /** @private */


    _this.boundHandleTileChange_ = _this.handleTileChange.bind(_this);
    /**
     * @private
     * @type {function(): ?}
     */

    _this.tileChangeCallback_ = tileChangeCallback;
    /**
     * @private
     * @type {number}
     */

    _this.tilesLoading_ = 0;
    /**
     * @private
     * @type {!Object<string,boolean>}
     */

    _this.tilesLoadingKeys_ = {};
    return _this;
  }
  /**
   * @param {Array} element Element.
   * @return {boolean} The element was added to the queue.
   */


  TileQueue.prototype.enqueue = function (element) {
    var added = _super.prototype.enqueue.call(this, element);

    if (added) {
      var tile = element[0];
      tile.addEventListener(EventType/* default.CHANGE */.Z.CHANGE, this.boundHandleTileChange_);
    }

    return added;
  };
  /**
   * @return {number} Number of tiles loading.
   */


  TileQueue.prototype.getTilesLoading = function () {
    return this.tilesLoading_;
  };
  /**
   * @param {import("./events/Event.js").default} event Event.
   * @protected
   */


  TileQueue.prototype.handleTileChange = function (event) {
    var tile =
    /** @type {import("./Tile.js").default} */
    event.target;
    var state = tile.getState();

    if (state === TileState/* default.LOADED */.Z.LOADED || state === TileState/* default.ERROR */.Z.ERROR || state === TileState/* default.EMPTY */.Z.EMPTY) {
      tile.removeEventListener(EventType/* default.CHANGE */.Z.CHANGE, this.boundHandleTileChange_);
      var tileKey = tile.getKey();

      if (tileKey in this.tilesLoadingKeys_) {
        delete this.tilesLoadingKeys_[tileKey];
        --this.tilesLoading_;
      }

      this.tileChangeCallback_();
    }
  };
  /**
   * @param {number} maxTotalLoading Maximum number tiles to load simultaneously.
   * @param {number} maxNewLoads Maximum number of new tiles to load.
   */


  TileQueue.prototype.loadMoreTiles = function (maxTotalLoading, maxNewLoads) {
    var newLoads = 0;
    var state, tile, tileKey;

    while (this.tilesLoading_ < maxTotalLoading && newLoads < maxNewLoads && this.getCount() > 0) {
      tile =
      /** @type {import("./Tile.js").default} */
      this.dequeue()[0];
      tileKey = tile.getKey();
      state = tile.getState();

      if (state === TileState/* default.IDLE */.Z.IDLE && !(tileKey in this.tilesLoadingKeys_)) {
        this.tilesLoadingKeys_[tileKey] = true;
        ++this.tilesLoading_;
        ++newLoads;
        tile.load();
      }
    }
  };

  return TileQueue;
}(PriorityQueue/* default */.Z);

/* harmony default export */ const ol_TileQueue = (TileQueue);
/**
 * @param {import('./PluggableMap.js').FrameState} frameState Frame state.
 * @param {import("./Tile.js").default} tile Tile.
 * @param {string} tileSourceKey Tile source key.
 * @param {import("./coordinate.js").Coordinate} tileCenter Tile center.
 * @param {number} tileResolution Tile resolution.
 * @return {number} Tile priority.
 */

function getTilePriority(frameState, tile, tileSourceKey, tileCenter, tileResolution) {
  // Filter out tiles at higher zoom levels than the current zoom level, or that
  // are outside the visible extent.
  if (!frameState || !(tileSourceKey in frameState.wantedTiles)) {
    return PriorityQueue/* DROP */.r;
  }

  if (!frameState.wantedTiles[tileSourceKey][tile.getKey()]) {
    return PriorityQueue/* DROP */.r;
  } // Prioritize the highest zoom level tiles closest to the focus.
  // Tiles at higher zoom levels are prioritized using Math.log(tileResolution).
  // Within a zoom level, tiles are prioritized by the distance in pixels between
  // the center of the tile and the center of the viewport.  The factor of 65536
  // means that the prioritization should behave as desired for tiles up to
  // 65536 * Math.log(2) = 45426 pixels from the focus.


  var center = frameState.viewState.center;
  var deltaX = tileCenter[0] - center[0];
  var deltaY = tileCenter[1] - center[1];
  return 65536 * Math.log(tileResolution) + Math.sqrt(deltaX * deltaX + deltaY * deltaY) / tileResolution;
}
// EXTERNAL MODULE: ./node_modules/ol/View.js + 2 modules
var View = __webpack_require__(6790);
// EXTERNAL MODULE: ./node_modules/ol/ViewHint.js
var ViewHint = __webpack_require__(1840);
// EXTERNAL MODULE: ./node_modules/ol/has.js
var has = __webpack_require__(4242);
// EXTERNAL MODULE: ./node_modules/ol/functions.js
var functions = __webpack_require__(3658);
// EXTERNAL MODULE: ./node_modules/ol/transform.js
var transform = __webpack_require__(8975);
// EXTERNAL MODULE: ./node_modules/ol/asserts.js
var asserts = __webpack_require__(4548);
// EXTERNAL MODULE: ./node_modules/ol/extent.js
var extent = __webpack_require__(1046);
// EXTERNAL MODULE: ./node_modules/ol/proj.js + 2 modules
var proj = __webpack_require__(8623);
// EXTERNAL MODULE: ./node_modules/ol/size.js
var ol_size = __webpack_require__(7218);
// EXTERNAL MODULE: ./node_modules/ol/events.js
var events = __webpack_require__(5750);
// EXTERNAL MODULE: ./node_modules/ol/dom.js
var dom = __webpack_require__(9631);
;// CONCATENATED MODULE: ./node_modules/ol/PluggableMap.js
var PluggableMap_extends = undefined && undefined.__extends || function () {
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
 * @module ol/PluggableMap
 */




























/**
 * State of the current frame. Only `pixelRatio`, `time` and `viewState` should
 * be used in applications.
 * @typedef {Object} FrameState
 * @property {number} pixelRatio The pixel ratio of the frame.
 * @property {number} time The time when rendering of the frame was requested.
 * @property {import("./View.js").State} viewState The state of the current view.
 * @property {boolean} animate Animate.
 * @property {import("./transform.js").Transform} coordinateToPixelTransform CoordinateToPixelTransform.
 * @property {import("rbush").default} declutterTree DeclutterTree.
 * @property {null|import("./extent.js").Extent} extent Extent.
 * @property {import("./extent.js").Extent} [nextExtent] Next extent during an animation series.
 * @property {number} index Index.
 * @property {Array<import("./layer/Layer.js").State>} layerStatesArray LayerStatesArray.
 * @property {number} layerIndex LayerIndex.
 * @property {import("./transform.js").Transform} pixelToCoordinateTransform PixelToCoordinateTransform.
 * @property {Array<PostRenderFunction>} postRenderFunctions PostRenderFunctions.
 * @property {import("./size.js").Size} size Size.
 * @property {TileQueue} tileQueue TileQueue.
 * @property {!Object<string, Object<string, boolean>>} usedTiles UsedTiles.
 * @property {Array<number>} viewHints ViewHints.
 * @property {!Object<string, Object<string, boolean>>} wantedTiles WantedTiles.
 */

/**
 * @typedef {function(PluggableMap, ?FrameState): any} PostRenderFunction
 */

/**
 * @typedef {Object} AtPixelOptions
 * @property {undefined|function(import("./layer/Layer.js").default<import("./source/Source").default>): boolean} [layerFilter] Layer filter
 * function. The filter function will receive one argument, the
 * {@link module:ol/layer/Layer layer-candidate} and it should return a boolean value.
 * Only layers which are visible and for which this function returns `true`
 * will be tested for features. By default, all visible layers will be tested.
 * @property {number} [hitTolerance=0] Hit-detection tolerance in css pixels. Pixels
 * inside the radius around the given position will be checked for features.
 * @property {boolean} [checkWrapped=true] Check-Wrapped Will check for for wrapped geometries inside the range of
 *   +/- 1 world width. Works only if a projection is used that can be wrapped.
 */

/**
 * @typedef {Object} MapOptionsInternal
 * @property {Collection<import("./control/Control.js").default>} [controls] Controls.
 * @property {Collection<import("./interaction/Interaction.js").default>} [interactions] Interactions.
 * @property {HTMLElement|Document} keyboardEventTarget KeyboardEventTarget.
 * @property {Collection<import("./Overlay.js").default>} overlays Overlays.
 * @property {Object<string, *>} values Values.
 */

/**
 * @typedef {import("./ObjectEventType").Types|'change:layergroup'|'change:size'|'change:target'|'change:view'} MapObjectEventTypes
 */

/***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *    import("./Observable").OnSignature<MapObjectEventTypes, import("./Object").ObjectEvent, Return> &
 *    import("./Observable").OnSignature<import("./MapBrowserEventType").Types, import("./MapBrowserEvent").default, Return> &
 *    import("./Observable").OnSignature<import("./MapEventType").Types, import("./MapEvent").default, Return> &
 *    import("./Observable").OnSignature<import("./render/EventType").MapRenderEventTypes, import("./render/Event").default, Return> &
 *    import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|MapObjectEventTypes|
 *      import("./MapBrowserEventType").Types|import("./MapEventType").Types|
 *      import("./render/EventType").MapRenderEventTypes, Return>} PluggableMapOnSignature
 */

/**
 * Object literal with config options for the map.
 * @typedef {Object} MapOptions
 * @property {Collection<import("./control/Control.js").default>|Array<import("./control/Control.js").default>} [controls]
 * Controls initially added to the map. If not specified,
 * {@link module:ol/control.defaults} is used.
 * @property {number} [pixelRatio=window.devicePixelRatio] The ratio between
 * physical pixels and device-independent pixels (dips) on the device.
 * @property {Collection<import("./interaction/Interaction.js").default>|Array<import("./interaction/Interaction.js").default>} [interactions]
 * Interactions that are initially added to the map. If not specified,
 * {@link module:ol/interaction.defaults} is used.
 * @property {HTMLElement|Document|string} [keyboardEventTarget] The element to
 * listen to keyboard events on. This determines when the `KeyboardPan` and
 * `KeyboardZoom` interactions trigger. For example, if this option is set to
 * `document` the keyboard interactions will always trigger. If this option is
 * not specified, the element the library listens to keyboard events on is the
 * map target (i.e. the user-provided div for the map). If this is not
 * `document`, the target element needs to be focused for key events to be
 * emitted, requiring that the target element has a `tabindex` attribute.
 * @property {Array<import("./layer/Base.js").default>|Collection<import("./layer/Base.js").default>|LayerGroup} [layers]
 * Layers. If this is not defined, a map with no layers will be rendered. Note
 * that layers are rendered in the order supplied, so if you want, for example,
 * a vector layer to appear on top of a tile layer, it must come after the tile
 * layer.
 * @property {number} [maxTilesLoading=16] Maximum number tiles to load
 * simultaneously.
 * @property {number} [moveTolerance=1] The minimum distance in pixels the
 * cursor must move to be detected as a map move event instead of a click.
 * Increasing this value can make it easier to click on the map.
 * @property {Collection<import("./Overlay.js").default>|Array<import("./Overlay.js").default>} [overlays]
 * Overlays initially added to the map. By default, no overlays are added.
 * @property {HTMLElement|string} [target] The container for the map, either the
 * element itself or the `id` of the element. If not specified at construction
 * time, {@link module:ol/Map~Map#setTarget} must be called for the map to be
 * rendered. If passed by element, the container can be in a secondary document.
 * @property {View|Promise<import("./View.js").ViewOptions>} [view] The map's view.  No layer sources will be
 * fetched unless this is specified at construction time or through
 * {@link module:ol/Map~Map#setView}.
 */

/**
 * @fires import("./MapBrowserEvent.js").MapBrowserEvent
 * @fires import("./MapEvent.js").MapEvent
 * @fires import("./render/Event.js").default#precompose
 * @fires import("./render/Event.js").default#postcompose
 * @fires import("./render/Event.js").default#rendercomplete
 * @api
 */

var PluggableMap =
/** @class */
function (_super) {
  PluggableMap_extends(PluggableMap, _super);
  /**
   * @param {MapOptions} options Map options.
   */


  function PluggableMap(options) {
    var _this = _super.call(this) || this;
    /***
     * @type {PluggableMapOnSignature<import("./events").EventsKey>}
     */


    _this.on;
    /***
     * @type {PluggableMapOnSignature<import("./events").EventsKey>}
     */

    _this.once;
    /***
     * @type {PluggableMapOnSignature<void>}
     */

    _this.un;
    var optionsInternal = createOptionsInternal(options);
    /** @private */

    _this.boundHandleBrowserEvent_ = _this.handleBrowserEvent.bind(_this);
    /**
     * @type {number}
     * @private
     */

    _this.maxTilesLoading_ = options.maxTilesLoading !== undefined ? options.maxTilesLoading : 16;
    /**
     * @private
     * @type {number}
     */

    _this.pixelRatio_ = options.pixelRatio !== undefined ? options.pixelRatio : has/* DEVICE_PIXEL_RATIO */.MP;
    /**
     * @private
     * @type {*}
     */

    _this.postRenderTimeoutHandle_;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.animationDelayKey_;
    /**
     * @private
     */

    _this.animationDelay_ =
    /** @this {PluggableMap} */
    function () {
      this.animationDelayKey_ = undefined;
      this.renderFrame_(Date.now());
    }.bind(_this);
    /**
     * @private
     * @type {import("./transform.js").Transform}
     */


    _this.coordinateToPixelTransform_ = (0,transform/* create */.Ue)();
    /**
     * @private
     * @type {import("./transform.js").Transform}
     */

    _this.pixelToCoordinateTransform_ = (0,transform/* create */.Ue)();
    /**
     * @private
     * @type {number}
     */

    _this.frameIndex_ = 0;
    /**
     * @private
     * @type {?FrameState}
     */

    _this.frameState_ = null;
    /**
     * The extent at the previous 'moveend' event.
     * @private
     * @type {import("./extent.js").Extent}
     */

    _this.previousExtent_ = null;
    /**
     * @private
     * @type {?import("./events.js").EventsKey}
     */

    _this.viewPropertyListenerKey_ = null;
    /**
     * @private
     * @type {?import("./events.js").EventsKey}
     */

    _this.viewChangeListenerKey_ = null;
    /**
     * @private
     * @type {?Array<import("./events.js").EventsKey>}
     */

    _this.layerGroupPropertyListenerKeys_ = null;
    /**
     * @private
     * @type {!HTMLElement}
     */

    _this.viewport_ = document.createElement('div');
    _this.viewport_.className = 'ol-viewport' + ('ontouchstart' in window ? ' ol-touch' : '');
    _this.viewport_.style.position = 'relative';
    _this.viewport_.style.overflow = 'hidden';
    _this.viewport_.style.width = '100%';
    _this.viewport_.style.height = '100%';
    /**
     * @private
     * @type {!HTMLElement}
     */

    _this.overlayContainer_ = document.createElement('div');
    _this.overlayContainer_.style.position = 'absolute';
    _this.overlayContainer_.style.zIndex = '0';
    _this.overlayContainer_.style.width = '100%';
    _this.overlayContainer_.style.height = '100%';
    _this.overlayContainer_.style.pointerEvents = 'none';
    _this.overlayContainer_.className = 'ol-overlaycontainer';

    _this.viewport_.appendChild(_this.overlayContainer_);
    /**
     * @private
     * @type {!HTMLElement}
     */


    _this.overlayContainerStopEvent_ = document.createElement('div');
    _this.overlayContainerStopEvent_.style.position = 'absolute';
    _this.overlayContainerStopEvent_.style.zIndex = '0';
    _this.overlayContainerStopEvent_.style.width = '100%';
    _this.overlayContainerStopEvent_.style.height = '100%';
    _this.overlayContainerStopEvent_.style.pointerEvents = 'none';
    _this.overlayContainerStopEvent_.className = 'ol-overlaycontainer-stopevent';

    _this.viewport_.appendChild(_this.overlayContainerStopEvent_);
    /**
     * @private
     * @type {MapBrowserEventHandler}
     */


    _this.mapBrowserEventHandler_ = null;
    /**
     * @private
     * @type {number}
     */

    _this.moveTolerance_ = options.moveTolerance;
    /**
     * @private
     * @type {HTMLElement|Document}
     */

    _this.keyboardEventTarget_ = optionsInternal.keyboardEventTarget;
    /**
     * @private
     * @type {?Array<import("./events.js").EventsKey>}
     */

    _this.keyHandlerKeys_ = null;
    /**
     * @type {Collection<import("./control/Control.js").default>}
     * @protected
     */

    _this.controls = optionsInternal.controls || new Collection/* default */.Z();
    /**
     * @type {Collection<import("./interaction/Interaction.js").default>}
     * @protected
     */

    _this.interactions = optionsInternal.interactions || new Collection/* default */.Z();
    /**
     * @type {Collection<import("./Overlay.js").default>}
     * @private
     */

    _this.overlays_ = optionsInternal.overlays;
    /**
     * A lookup of overlays by id.
     * @private
     * @type {Object<string, import("./Overlay.js").default>}
     */

    _this.overlayIdIndex_ = {};
    /**
     * @type {import("./renderer/Map.js").default}
     * @private
     */

    _this.renderer_ = null;
    /**
     * @type {undefined|function(Event): void}
     * @private
     */

    _this.handleResize_;
    /**
     * @private
     * @type {!Array<PostRenderFunction>}
     */

    _this.postRenderFunctions_ = [];
    /**
     * @private
     * @type {TileQueue}
     */

    _this.tileQueue_ = new ol_TileQueue(_this.getTilePriority.bind(_this), _this.handleTileChange_.bind(_this));

    _this.addChangeListener(MapProperty/* default.LAYERGROUP */.Z.LAYERGROUP, _this.handleLayerGroupChanged_);

    _this.addChangeListener(MapProperty/* default.VIEW */.Z.VIEW, _this.handleViewChanged_);

    _this.addChangeListener(MapProperty/* default.SIZE */.Z.SIZE, _this.handleSizeChanged_);

    _this.addChangeListener(MapProperty/* default.TARGET */.Z.TARGET, _this.handleTargetChanged_); // setProperties will trigger the rendering of the map if the map
    // is "defined" already.


    _this.setProperties(optionsInternal.values);

    var map = _this;

    if (options.view && !(options.view instanceof View/* default */.ZP)) {
      options.view.then(function (viewOptions) {
        map.setView(new View/* default */.ZP(viewOptions));
      });
    }

    _this.controls.addEventListener(CollectionEventType/* default.ADD */.Z.ADD,
    /**
     * @param {import("./Collection.js").CollectionEvent} event CollectionEvent.
     */
    function (event) {
      event.element.setMap(this);
    }.bind(_this));

    _this.controls.addEventListener(CollectionEventType/* default.REMOVE */.Z.REMOVE,
    /**
     * @param {import("./Collection.js").CollectionEvent} event CollectionEvent.
     */
    function (event) {
      event.element.setMap(null);
    }.bind(_this));

    _this.interactions.addEventListener(CollectionEventType/* default.ADD */.Z.ADD,
    /**
     * @param {import("./Collection.js").CollectionEvent} event CollectionEvent.
     */
    function (event) {
      event.element.setMap(this);
    }.bind(_this));

    _this.interactions.addEventListener(CollectionEventType/* default.REMOVE */.Z.REMOVE,
    /**
     * @param {import("./Collection.js").CollectionEvent} event CollectionEvent.
     */
    function (event) {
      event.element.setMap(null);
    }.bind(_this));

    _this.overlays_.addEventListener(CollectionEventType/* default.ADD */.Z.ADD,
    /**
     * @param {import("./Collection.js").CollectionEvent} event CollectionEvent.
     */
    function (event) {
      this.addOverlayInternal_(
      /** @type {import("./Overlay.js").default} */
      event.element);
    }.bind(_this));

    _this.overlays_.addEventListener(CollectionEventType/* default.REMOVE */.Z.REMOVE,
    /**
     * @param {import("./Collection.js").CollectionEvent} event CollectionEvent.
     */
    function (event) {
      var overlay =
      /** @type {import("./Overlay.js").default} */
      event.element;
      var id = overlay.getId();

      if (id !== undefined) {
        delete this.overlayIdIndex_[id.toString()];
      }

      event.element.setMap(null);
    }.bind(_this));

    _this.controls.forEach(
    /**
     * @param {import("./control/Control.js").default} control Control.
     * @this {PluggableMap}
     */
    function (control) {
      control.setMap(this);
    }.bind(_this));

    _this.interactions.forEach(
    /**
     * @param {import("./interaction/Interaction.js").default} interaction Interaction.
     * @this {PluggableMap}
     */
    function (interaction) {
      interaction.setMap(this);
    }.bind(_this));

    _this.overlays_.forEach(_this.addOverlayInternal_.bind(_this));

    return _this;
  }
  /**
   * @abstract
   * @return {import("./renderer/Map.js").default} The map renderer
   */


  PluggableMap.prototype.createRenderer = function () {
    throw new Error('Use a map type that has a createRenderer method');
  };
  /**
   * Add the given control to the map.
   * @param {import("./control/Control.js").default} control Control.
   * @api
   */


  PluggableMap.prototype.addControl = function (control) {
    this.getControls().push(control);
  };
  /**
   * Add the given interaction to the map. If you want to add an interaction
   * at another point of the collection use `getInteraction()` and the methods
   * available on {@link module:ol/Collection~Collection}. This can be used to
   * stop the event propagation from the handleEvent function. The interactions
   * get to handle the events in the reverse order of this collection.
   * @param {import("./interaction/Interaction.js").default} interaction Interaction to add.
   * @api
   */


  PluggableMap.prototype.addInteraction = function (interaction) {
    this.getInteractions().push(interaction);
  };
  /**
   * Adds the given layer to the top of this map. If you want to add a layer
   * elsewhere in the stack, use `getLayers()` and the methods available on
   * {@link module:ol/Collection~Collection}.
   * @param {import("./layer/Base.js").default} layer Layer.
   * @api
   */


  PluggableMap.prototype.addLayer = function (layer) {
    var layers = this.getLayerGroup().getLayers();
    layers.push(layer);
  };
  /**
   * Add the given overlay to the map.
   * @param {import("./Overlay.js").default} overlay Overlay.
   * @api
   */


  PluggableMap.prototype.addOverlay = function (overlay) {
    this.getOverlays().push(overlay);
  };
  /**
   * This deals with map's overlay collection changes.
   * @param {import("./Overlay.js").default} overlay Overlay.
   * @private
   */


  PluggableMap.prototype.addOverlayInternal_ = function (overlay) {
    var id = overlay.getId();

    if (id !== undefined) {
      this.overlayIdIndex_[id.toString()] = overlay;
    }

    overlay.setMap(this);
  };
  /**
   *
   * Clean up.
   */


  PluggableMap.prototype.disposeInternal = function () {
    this.setTarget(null);

    _super.prototype.disposeInternal.call(this);
  };
  /**
   * Detect features that intersect a pixel on the viewport, and execute a
   * callback with each intersecting feature. Layers included in the detection can
   * be configured through the `layerFilter` option in `opt_options`.
   * @param {import("./pixel.js").Pixel} pixel Pixel.
   * @param {function(import("./Feature.js").FeatureLike, import("./layer/Layer.js").default<import("./source/Source").default>, import("./geom/SimpleGeometry.js").default): T} callback Feature callback. The callback will be
   *     called with two arguments. The first argument is one
   *     {@link module:ol/Feature feature} or
   *     {@link module:ol/render/Feature render feature} at the pixel, the second is
   *     the {@link module:ol/layer/Layer layer} of the feature and will be null for
   *     unmanaged layers. To stop detection, callback functions can return a
   *     truthy value.
   * @param {AtPixelOptions} [opt_options] Optional options.
   * @return {T|undefined} Callback result, i.e. the return value of last
   * callback execution, or the first truthy callback return value.
   * @template T
   * @api
   */


  PluggableMap.prototype.forEachFeatureAtPixel = function (pixel, callback, opt_options) {
    if (!this.frameState_) {
      return;
    }

    var coordinate = this.getCoordinateFromPixelInternal(pixel);
    opt_options = opt_options !== undefined ? opt_options : {};
    var hitTolerance = opt_options.hitTolerance !== undefined ? opt_options.hitTolerance : 0;
    var layerFilter = opt_options.layerFilter !== undefined ? opt_options.layerFilter : functions/* TRUE */.uX;
    var checkWrapped = opt_options.checkWrapped !== false;
    return this.renderer_.forEachFeatureAtCoordinate(coordinate, this.frameState_, hitTolerance, checkWrapped, callback, null, layerFilter, null);
  };
  /**
   * Get all features that intersect a pixel on the viewport.
   * @param {import("./pixel.js").Pixel} pixel Pixel.
   * @param {AtPixelOptions} [opt_options] Optional options.
   * @return {Array<import("./Feature.js").FeatureLike>} The detected features or
   * an empty array if none were found.
   * @api
   */


  PluggableMap.prototype.getFeaturesAtPixel = function (pixel, opt_options) {
    var features = [];
    this.forEachFeatureAtPixel(pixel, function (feature) {
      features.push(feature);
    }, opt_options);
    return features;
  };
  /**
   * Detect layers that have a color value at a pixel on the viewport, and
   * execute a callback with each matching layer. Layers included in the
   * detection can be configured through `opt_layerFilter`.
   *
   * Note: this may give false positives unless the map layers have had different `className`
   * properties assigned to them.
   *
   * @param {import("./pixel.js").Pixel} pixel Pixel.
   * @param {function(this: S, import("./layer/Layer.js").default, (Uint8ClampedArray|Uint8Array)): T} callback
   *     Layer callback. This callback will receive two arguments: first is the
   *     {@link module:ol/layer/Layer layer}, second argument is an array representing
   *     [R, G, B, A] pixel values (0 - 255) and will be `null` for layer types
   *     that do not currently support this argument. To stop detection, callback
   *     functions can return a truthy value.
   * @param {AtPixelOptions} [opt_options] Configuration options.
   * @return {T|undefined} Callback result, i.e. the return value of last
   * callback execution, or the first truthy callback return value.
   * @template S,T
   * @api
   */


  PluggableMap.prototype.forEachLayerAtPixel = function (pixel, callback, opt_options) {
    if (!this.frameState_) {
      return;
    }

    var options = opt_options || {};
    var hitTolerance = options.hitTolerance !== undefined ? options.hitTolerance : 0;
    var layerFilter = options.layerFilter || functions/* TRUE */.uX;
    return this.renderer_.forEachLayerAtPixel(pixel, this.frameState_, hitTolerance, callback, layerFilter);
  };
  /**
   * Detect if features intersect a pixel on the viewport. Layers included in the
   * detection can be configured through `opt_layerFilter`.
   * @param {import("./pixel.js").Pixel} pixel Pixel.
   * @param {AtPixelOptions} [opt_options] Optional options.
   * @return {boolean} Is there a feature at the given pixel?
   * @api
   */


  PluggableMap.prototype.hasFeatureAtPixel = function (pixel, opt_options) {
    if (!this.frameState_) {
      return false;
    }

    var coordinate = this.getCoordinateFromPixelInternal(pixel);
    opt_options = opt_options !== undefined ? opt_options : {};
    var layerFilter = opt_options.layerFilter !== undefined ? opt_options.layerFilter : functions/* TRUE */.uX;
    var hitTolerance = opt_options.hitTolerance !== undefined ? opt_options.hitTolerance : 0;
    var checkWrapped = opt_options.checkWrapped !== false;
    return this.renderer_.hasFeatureAtCoordinate(coordinate, this.frameState_, hitTolerance, checkWrapped, layerFilter, null);
  };
  /**
   * Returns the coordinate in user projection for a browser event.
   * @param {MouseEvent} event Event.
   * @return {import("./coordinate.js").Coordinate} Coordinate.
   * @api
   */


  PluggableMap.prototype.getEventCoordinate = function (event) {
    return this.getCoordinateFromPixel(this.getEventPixel(event));
  };
  /**
   * Returns the coordinate in view projection for a browser event.
   * @param {MouseEvent} event Event.
   * @return {import("./coordinate.js").Coordinate} Coordinate.
   */


  PluggableMap.prototype.getEventCoordinateInternal = function (event) {
    return this.getCoordinateFromPixelInternal(this.getEventPixel(event));
  };
  /**
   * Returns the map pixel position for a browser event relative to the viewport.
   * @param {UIEvent} event Event.
   * @return {import("./pixel.js").Pixel} Pixel.
   * @api
   */


  PluggableMap.prototype.getEventPixel = function (event) {
    var viewportPosition = this.viewport_.getBoundingClientRect();
    var eventPosition = //FIXME Are we really calling this with a TouchEvent anywhere?
    'changedTouches' in event ?
    /** @type {TouchEvent} */
    event.changedTouches[0] :
    /** @type {MouseEvent} */
    event;
    return [eventPosition.clientX - viewportPosition.left, eventPosition.clientY - viewportPosition.top];
  };
  /**
   * Get the target in which this map is rendered.
   * Note that this returns what is entered as an option or in setTarget:
   * if that was an element, it returns an element; if a string, it returns that.
   * @return {HTMLElement|string|undefined} The Element or id of the Element that the
   *     map is rendered in.
   * @observable
   * @api
   */


  PluggableMap.prototype.getTarget = function () {
    return (
      /** @type {HTMLElement|string|undefined} */
      this.get(MapProperty/* default.TARGET */.Z.TARGET)
    );
  };
  /**
   * Get the DOM element into which this map is rendered. In contrast to
   * `getTarget` this method always return an `Element`, or `null` if the
   * map has no target.
   * @return {HTMLElement} The element that the map is rendered in.
   * @api
   */


  PluggableMap.prototype.getTargetElement = function () {
    var target = this.getTarget();

    if (target !== undefined) {
      return typeof target === 'string' ? document.getElementById(target) : target;
    } else {
      return null;
    }
  };
  /**
   * Get the coordinate for a given pixel.  This returns a coordinate in the
   * user projection.
   * @param {import("./pixel.js").Pixel} pixel Pixel position in the map viewport.
   * @return {import("./coordinate.js").Coordinate} The coordinate for the pixel position.
   * @api
   */


  PluggableMap.prototype.getCoordinateFromPixel = function (pixel) {
    return (0,proj/* toUserCoordinate */.lO)(this.getCoordinateFromPixelInternal(pixel), this.getView().getProjection());
  };
  /**
   * Get the coordinate for a given pixel.  This returns a coordinate in the
   * map view projection.
   * @param {import("./pixel.js").Pixel} pixel Pixel position in the map viewport.
   * @return {import("./coordinate.js").Coordinate} The coordinate for the pixel position.
   */


  PluggableMap.prototype.getCoordinateFromPixelInternal = function (pixel) {
    var frameState = this.frameState_;

    if (!frameState) {
      return null;
    } else {
      return (0,transform/* apply */.nn)(frameState.pixelToCoordinateTransform, pixel.slice());
    }
  };
  /**
   * Get the map controls. Modifying this collection changes the controls
   * associated with the map.
   * @return {Collection<import("./control/Control.js").default>} Controls.
   * @api
   */


  PluggableMap.prototype.getControls = function () {
    return this.controls;
  };
  /**
   * Get the map overlays. Modifying this collection changes the overlays
   * associated with the map.
   * @return {Collection<import("./Overlay.js").default>} Overlays.
   * @api
   */


  PluggableMap.prototype.getOverlays = function () {
    return this.overlays_;
  };
  /**
   * Get an overlay by its identifier (the value returned by overlay.getId()).
   * Note that the index treats string and numeric identifiers as the same. So
   * `map.getOverlayById(2)` will return an overlay with id `'2'` or `2`.
   * @param {string|number} id Overlay identifier.
   * @return {import("./Overlay.js").default} Overlay.
   * @api
   */


  PluggableMap.prototype.getOverlayById = function (id) {
    var overlay = this.overlayIdIndex_[id.toString()];
    return overlay !== undefined ? overlay : null;
  };
  /**
   * Get the map interactions. Modifying this collection changes the interactions
   * associated with the map.
   *
   * Interactions are used for e.g. pan, zoom and rotate.
   * @return {Collection<import("./interaction/Interaction.js").default>} Interactions.
   * @api
   */


  PluggableMap.prototype.getInteractions = function () {
    return this.interactions;
  };
  /**
   * Get the layergroup associated with this map.
   * @return {LayerGroup} A layer group containing the layers in this map.
   * @observable
   * @api
   */


  PluggableMap.prototype.getLayerGroup = function () {
    return (
      /** @type {LayerGroup} */
      this.get(MapProperty/* default.LAYERGROUP */.Z.LAYERGROUP)
    );
  };
  /**
   * Clear any existing layers and add layers to the map.
   * @param {Array<import("./layer/Base.js").default>|Collection<import("./layer/Base.js").default>} layers The layers to be added to the map.
   * @api
   */


  PluggableMap.prototype.setLayers = function (layers) {
    var group = this.getLayerGroup();

    if (layers instanceof Collection/* default */.Z) {
      group.setLayers(layers);
      return;
    }

    var collection = group.getLayers();
    collection.clear();
    collection.extend(layers);
  };
  /**
   * Get the collection of layers associated with this map.
   * @return {!Collection<import("./layer/Base.js").default>} Layers.
   * @api
   */


  PluggableMap.prototype.getLayers = function () {
    var layers = this.getLayerGroup().getLayers();
    return layers;
  };
  /**
   * @return {boolean} Layers have sources that are still loading.
   */


  PluggableMap.prototype.getLoading = function () {
    var layerStatesArray = this.getLayerGroup().getLayerStatesArray();

    for (var i = 0, ii = layerStatesArray.length; i < ii; ++i) {
      var layer = layerStatesArray[i].layer;
      var source =
      /** @type {import("./layer/Layer.js").default} */
      layer.getSource();

      if (source && source.loading) {
        return true;
      }
    }

    return false;
  };
  /**
   * Get the pixel for a coordinate.  This takes a coordinate in the user
   * projection and returns the corresponding pixel.
   * @param {import("./coordinate.js").Coordinate} coordinate A map coordinate.
   * @return {import("./pixel.js").Pixel} A pixel position in the map viewport.
   * @api
   */


  PluggableMap.prototype.getPixelFromCoordinate = function (coordinate) {
    var viewCoordinate = (0,proj/* fromUserCoordinate */.Vs)(coordinate, this.getView().getProjection());
    return this.getPixelFromCoordinateInternal(viewCoordinate);
  };
  /**
   * Get the pixel for a coordinate.  This takes a coordinate in the map view
   * projection and returns the corresponding pixel.
   * @param {import("./coordinate.js").Coordinate} coordinate A map coordinate.
   * @return {import("./pixel.js").Pixel} A pixel position in the map viewport.
   */


  PluggableMap.prototype.getPixelFromCoordinateInternal = function (coordinate) {
    var frameState = this.frameState_;

    if (!frameState) {
      return null;
    } else {
      return (0,transform/* apply */.nn)(frameState.coordinateToPixelTransform, coordinate.slice(0, 2));
    }
  };
  /**
   * Get the map renderer.
   * @return {import("./renderer/Map.js").default} Renderer
   */


  PluggableMap.prototype.getRenderer = function () {
    return this.renderer_;
  };
  /**
   * Get the size of this map.
   * @return {import("./size.js").Size|undefined} The size in pixels of the map in the DOM.
   * @observable
   * @api
   */


  PluggableMap.prototype.getSize = function () {
    return (
      /** @type {import("./size.js").Size|undefined} */
      this.get(MapProperty/* default.SIZE */.Z.SIZE)
    );
  };
  /**
   * Get the view associated with this map. A view manages properties such as
   * center and resolution.
   * @return {View} The view that controls this map.
   * @observable
   * @api
   */


  PluggableMap.prototype.getView = function () {
    return (
      /** @type {View} */
      this.get(MapProperty/* default.VIEW */.Z.VIEW)
    );
  };
  /**
   * Get the element that serves as the map viewport.
   * @return {HTMLElement} Viewport.
   * @api
   */


  PluggableMap.prototype.getViewport = function () {
    return this.viewport_;
  };
  /**
   * Get the element that serves as the container for overlays.  Elements added to
   * this container will let mousedown and touchstart events through to the map,
   * so clicks and gestures on an overlay will trigger {@link module:ol/MapBrowserEvent~MapBrowserEvent}
   * events.
   * @return {!HTMLElement} The map's overlay container.
   */


  PluggableMap.prototype.getOverlayContainer = function () {
    return this.overlayContainer_;
  };
  /**
   * Get the element that serves as a container for overlays that don't allow
   * event propagation. Elements added to this container won't let mousedown and
   * touchstart events through to the map, so clicks and gestures on an overlay
   * don't trigger any {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
   * @return {!HTMLElement} The map's overlay container that stops events.
   */


  PluggableMap.prototype.getOverlayContainerStopEvent = function () {
    return this.overlayContainerStopEvent_;
  };
  /**
   * @return {!Document} The document where the map is displayed.
   */


  PluggableMap.prototype.getOwnerDocument = function () {
    var targetElement = this.getTargetElement();
    return targetElement ? targetElement.ownerDocument : document;
  };
  /**
   * @param {import("./Tile.js").default} tile Tile.
   * @param {string} tileSourceKey Tile source key.
   * @param {import("./coordinate.js").Coordinate} tileCenter Tile center.
   * @param {number} tileResolution Tile resolution.
   * @return {number} Tile priority.
   */


  PluggableMap.prototype.getTilePriority = function (tile, tileSourceKey, tileCenter, tileResolution) {
    return getTilePriority(this.frameState_, tile, tileSourceKey, tileCenter, tileResolution);
  };
  /**
   * @param {UIEvent} browserEvent Browser event.
   * @param {string} [opt_type] Type.
   */


  PluggableMap.prototype.handleBrowserEvent = function (browserEvent, opt_type) {
    var type = opt_type || browserEvent.type;
    var mapBrowserEvent = new MapBrowserEvent/* default */.Z(type, this, browserEvent);
    this.handleMapBrowserEvent(mapBrowserEvent);
  };
  /**
   * @param {MapBrowserEvent} mapBrowserEvent The event to handle.
   */


  PluggableMap.prototype.handleMapBrowserEvent = function (mapBrowserEvent) {
    if (!this.frameState_) {
      // With no view defined, we cannot translate pixels into geographical
      // coordinates so interactions cannot be used.
      return;
    }

    var originalEvent =
    /** @type {PointerEvent} */
    mapBrowserEvent.originalEvent;
    var eventType = originalEvent.type;

    if (eventType === pointer_EventType/* default.POINTERDOWN */.Z.POINTERDOWN || eventType === EventType/* default.WHEEL */.Z.WHEEL || eventType === EventType/* default.KEYDOWN */.Z.KEYDOWN) {
      var doc = this.getOwnerDocument();
      var rootNode = this.viewport_.getRootNode ? this.viewport_.getRootNode() : doc;
      var target =
      /** @type {Node} */
      originalEvent.target;

      if ( // Abort if the target is a child of the container for elements whose events are not meant
      // to be handled by map interactions.
      this.overlayContainerStopEvent_.contains(target) || // Abort if the event target is a child of the container that is no longer in the page.
      // It's possible for the target to no longer be in the page if it has been removed in an
      // event listener, this might happen in a Control that recreates it's content based on
      // user interaction either manually or via a render in something like https://reactjs.org/
      !(rootNode === doc ? doc.documentElement : rootNode).contains(target)) {
        return;
      }
    }

    mapBrowserEvent.frameState = this.frameState_;

    if (this.dispatchEvent(mapBrowserEvent) !== false) {
      var interactionsArray = this.getInteractions().getArray().slice();

      for (var i = interactionsArray.length - 1; i >= 0; i--) {
        var interaction = interactionsArray[i];

        if (interaction.getMap() !== this || !interaction.getActive() || !this.getTargetElement()) {
          continue;
        }

        var cont = interaction.handleEvent(mapBrowserEvent);

        if (!cont || mapBrowserEvent.propagationStopped) {
          break;
        }
      }
    }
  };
  /**
   * @protected
   */


  PluggableMap.prototype.handlePostRender = function () {
    var frameState = this.frameState_; // Manage the tile queue
    // Image loads are expensive and a limited resource, so try to use them
    // efficiently:
    // * When the view is static we allow a large number of parallel tile loads
    //   to complete the frame as quickly as possible.
    // * When animating or interacting, image loads can cause janks, so we reduce
    //   the maximum number of loads per frame and limit the number of parallel
    //   tile loads to remain reactive to view changes and to reduce the chance of
    //   loading tiles that will quickly disappear from view.

    var tileQueue = this.tileQueue_;

    if (!tileQueue.isEmpty()) {
      var maxTotalLoading = this.maxTilesLoading_;
      var maxNewLoads = maxTotalLoading;

      if (frameState) {
        var hints = frameState.viewHints;

        if (hints[ViewHint/* default.ANIMATING */.Z.ANIMATING] || hints[ViewHint/* default.INTERACTING */.Z.INTERACTING]) {
          var lowOnFrameBudget = Date.now() - frameState.time > 8;
          maxTotalLoading = lowOnFrameBudget ? 0 : 8;
          maxNewLoads = lowOnFrameBudget ? 0 : 2;
        }
      }

      if (tileQueue.getTilesLoading() < maxTotalLoading) {
        tileQueue.reprioritize(); // FIXME only call if view has changed

        tileQueue.loadMoreTiles(maxTotalLoading, maxNewLoads);
      }
    }

    if (frameState && this.hasListener(render_EventType/* default.RENDERCOMPLETE */.Z.RENDERCOMPLETE) && !frameState.animate && !this.tileQueue_.getTilesLoading() && !this.getLoading()) {
      this.renderer_.dispatchRenderEvent(render_EventType/* default.RENDERCOMPLETE */.Z.RENDERCOMPLETE, frameState);
    }

    var postRenderFunctions = this.postRenderFunctions_;

    for (var i = 0, ii = postRenderFunctions.length; i < ii; ++i) {
      postRenderFunctions[i](this, frameState);
    }

    postRenderFunctions.length = 0;
  };
  /**
   * @private
   */


  PluggableMap.prototype.handleSizeChanged_ = function () {
    if (this.getView() && !this.getView().getAnimating()) {
      this.getView().resolveConstraints(0);
    }

    this.render();
  };
  /**
   * @private
   */


  PluggableMap.prototype.handleTargetChanged_ = function () {
    // target may be undefined, null, a string or an Element.
    // If it's a string we convert it to an Element before proceeding.
    // If it's not now an Element we remove the viewport from the DOM.
    // If it's an Element we append the viewport element to it.
    var targetElement;

    if (this.getTarget()) {
      targetElement = this.getTargetElement();
    }

    if (this.mapBrowserEventHandler_) {
      for (var i = 0, ii = this.keyHandlerKeys_.length; i < ii; ++i) {
        (0,events/* unlistenByKey */.bN)(this.keyHandlerKeys_[i]);
      }

      this.keyHandlerKeys_ = null;
      this.viewport_.removeEventListener(EventType/* default.CONTEXTMENU */.Z.CONTEXTMENU, this.boundHandleBrowserEvent_);
      this.viewport_.removeEventListener(EventType/* default.WHEEL */.Z.WHEEL, this.boundHandleBrowserEvent_);

      if (this.handleResize_ !== undefined) {
        removeEventListener(EventType/* default.RESIZE */.Z.RESIZE, this.handleResize_, false);
        this.handleResize_ = undefined;
      }

      this.mapBrowserEventHandler_.dispose();
      this.mapBrowserEventHandler_ = null;
      (0,dom/* removeNode */.ZF)(this.viewport_);
    }

    if (!targetElement) {
      if (this.renderer_) {
        clearTimeout(this.postRenderTimeoutHandle_);
        this.postRenderTimeoutHandle_ = undefined;
        this.postRenderFunctions_.length = 0;
        this.renderer_.dispose();
        this.renderer_ = null;
      }

      if (this.animationDelayKey_) {
        cancelAnimationFrame(this.animationDelayKey_);
        this.animationDelayKey_ = undefined;
      }
    } else {
      targetElement.appendChild(this.viewport_);

      if (!this.renderer_) {
        this.renderer_ = this.createRenderer();
      }

      this.mapBrowserEventHandler_ = new MapBrowserEventHandler/* default */.Z(this, this.moveTolerance_);

      for (var key in MapBrowserEventType/* default */.Z) {
        this.mapBrowserEventHandler_.addEventListener(MapBrowserEventType/* default */.Z[key], this.handleMapBrowserEvent.bind(this));
      }

      this.viewport_.addEventListener(EventType/* default.CONTEXTMENU */.Z.CONTEXTMENU, this.boundHandleBrowserEvent_, false);
      this.viewport_.addEventListener(EventType/* default.WHEEL */.Z.WHEEL, this.boundHandleBrowserEvent_, has/* PASSIVE_EVENT_LISTENERS */.bM ? {
        passive: false
      } : false);
      var keyboardEventTarget = !this.keyboardEventTarget_ ? targetElement : this.keyboardEventTarget_;
      this.keyHandlerKeys_ = [(0,events/* listen */.oL)(keyboardEventTarget, EventType/* default.KEYDOWN */.Z.KEYDOWN, this.handleBrowserEvent, this), (0,events/* listen */.oL)(keyboardEventTarget, EventType/* default.KEYPRESS */.Z.KEYPRESS, this.handleBrowserEvent, this)];

      if (!this.handleResize_) {
        this.handleResize_ = this.updateSize.bind(this);
        window.addEventListener(EventType/* default.RESIZE */.Z.RESIZE, this.handleResize_, false);
      }
    }

    this.updateSize(); // updateSize calls setSize, so no need to call this.render
    // ourselves here.
  };
  /**
   * @private
   */


  PluggableMap.prototype.handleTileChange_ = function () {
    this.render();
  };
  /**
   * @private
   */


  PluggableMap.prototype.handleViewPropertyChanged_ = function () {
    this.render();
  };
  /**
   * @private
   */


  PluggableMap.prototype.handleViewChanged_ = function () {
    if (this.viewPropertyListenerKey_) {
      (0,events/* unlistenByKey */.bN)(this.viewPropertyListenerKey_);
      this.viewPropertyListenerKey_ = null;
    }

    if (this.viewChangeListenerKey_) {
      (0,events/* unlistenByKey */.bN)(this.viewChangeListenerKey_);
      this.viewChangeListenerKey_ = null;
    }

    var view = this.getView();

    if (view) {
      this.updateViewportSize_();
      this.viewPropertyListenerKey_ = (0,events/* listen */.oL)(view, ObjectEventType/* default.PROPERTYCHANGE */.Z.PROPERTYCHANGE, this.handleViewPropertyChanged_, this);
      this.viewChangeListenerKey_ = (0,events/* listen */.oL)(view, EventType/* default.CHANGE */.Z.CHANGE, this.handleViewPropertyChanged_, this);
      view.resolveConstraints(0);
    }

    this.render();
  };
  /**
   * @private
   */


  PluggableMap.prototype.handleLayerGroupChanged_ = function () {
    if (this.layerGroupPropertyListenerKeys_) {
      this.layerGroupPropertyListenerKeys_.forEach(events/* unlistenByKey */.bN);
      this.layerGroupPropertyListenerKeys_ = null;
    }

    var layerGroup = this.getLayerGroup();

    if (layerGroup) {
      this.layerGroupPropertyListenerKeys_ = [(0,events/* listen */.oL)(layerGroup, ObjectEventType/* default.PROPERTYCHANGE */.Z.PROPERTYCHANGE, this.render, this), (0,events/* listen */.oL)(layerGroup, EventType/* default.CHANGE */.Z.CHANGE, this.render, this)];
    }

    this.render();
  };
  /**
   * @return {boolean} Is rendered.
   */


  PluggableMap.prototype.isRendered = function () {
    return !!this.frameState_;
  };
  /**
   * Requests an immediate render in a synchronous manner.
   * @api
   */


  PluggableMap.prototype.renderSync = function () {
    if (this.animationDelayKey_) {
      cancelAnimationFrame(this.animationDelayKey_);
    }

    this.animationDelay_();
  };
  /**
   * Redraws all text after new fonts have loaded
   */


  PluggableMap.prototype.redrawText = function () {
    var layerStates = this.getLayerGroup().getLayerStatesArray();

    for (var i = 0, ii = layerStates.length; i < ii; ++i) {
      var layer = layerStates[i].layer;

      if (layer.hasRenderer()) {
        layer.getRenderer().handleFontsChanged();
      }
    }
  };
  /**
   * Request a map rendering (at the next animation frame).
   * @api
   */


  PluggableMap.prototype.render = function () {
    if (this.renderer_ && this.animationDelayKey_ === undefined) {
      this.animationDelayKey_ = requestAnimationFrame(this.animationDelay_);
    }
  };
  /**
   * Remove the given control from the map.
   * @param {import("./control/Control.js").default} control Control.
   * @return {import("./control/Control.js").default|undefined} The removed control (or undefined
   *     if the control was not found).
   * @api
   */


  PluggableMap.prototype.removeControl = function (control) {
    return this.getControls().remove(control);
  };
  /**
   * Remove the given interaction from the map.
   * @param {import("./interaction/Interaction.js").default} interaction Interaction to remove.
   * @return {import("./interaction/Interaction.js").default|undefined} The removed interaction (or
   *     undefined if the interaction was not found).
   * @api
   */


  PluggableMap.prototype.removeInteraction = function (interaction) {
    return this.getInteractions().remove(interaction);
  };
  /**
   * Removes the given layer from the map.
   * @param {import("./layer/Base.js").default} layer Layer.
   * @return {import("./layer/Base.js").default|undefined} The removed layer (or undefined if the
   *     layer was not found).
   * @api
   */


  PluggableMap.prototype.removeLayer = function (layer) {
    var layers = this.getLayerGroup().getLayers();
    return layers.remove(layer);
  };
  /**
   * Remove the given overlay from the map.
   * @param {import("./Overlay.js").default} overlay Overlay.
   * @return {import("./Overlay.js").default|undefined} The removed overlay (or undefined
   *     if the overlay was not found).
   * @api
   */


  PluggableMap.prototype.removeOverlay = function (overlay) {
    return this.getOverlays().remove(overlay);
  };
  /**
   * @param {number} time Time.
   * @private
   */


  PluggableMap.prototype.renderFrame_ = function (time) {
    var _this = this;

    var size = this.getSize();
    var view = this.getView();
    var previousFrameState = this.frameState_;
    /** @type {?FrameState} */

    var frameState = null;

    if (size !== undefined && (0,ol_size/* hasArea */.py)(size) && view && view.isDef()) {
      var viewHints = view.getHints(this.frameState_ ? this.frameState_.viewHints : undefined);
      var viewState = view.getState();
      frameState = {
        animate: false,
        coordinateToPixelTransform: this.coordinateToPixelTransform_,
        declutterTree: null,
        extent: (0,extent/* getForViewAndSize */.p8)(viewState.center, viewState.resolution, viewState.rotation, size),
        index: this.frameIndex_++,
        layerIndex: 0,
        layerStatesArray: this.getLayerGroup().getLayerStatesArray(),
        pixelRatio: this.pixelRatio_,
        pixelToCoordinateTransform: this.pixelToCoordinateTransform_,
        postRenderFunctions: [],
        size: size,
        tileQueue: this.tileQueue_,
        time: time,
        usedTiles: {},
        viewState: viewState,
        viewHints: viewHints,
        wantedTiles: {}
      };

      if (viewState.nextCenter && viewState.nextResolution) {
        var rotation = isNaN(viewState.nextRotation) ? viewState.rotation : viewState.nextRotation;
        frameState.nextExtent = (0,extent/* getForViewAndSize */.p8)(viewState.nextCenter, viewState.nextResolution, rotation, size);
      }
    }

    this.frameState_ = frameState;
    this.renderer_.renderFrame(frameState);

    if (frameState) {
      if (frameState.animate) {
        this.render();
      }

      Array.prototype.push.apply(this.postRenderFunctions_, frameState.postRenderFunctions);

      if (previousFrameState) {
        var moveStart = !this.previousExtent_ || !(0,extent/* isEmpty */.xb)(this.previousExtent_) && !(0,extent/* equals */.fS)(frameState.extent, this.previousExtent_);

        if (moveStart) {
          this.dispatchEvent(new MapEvent/* default */.Z(MapEventType/* default.MOVESTART */.Z.MOVESTART, this, previousFrameState));
          this.previousExtent_ = (0,extent/* createOrUpdateEmpty */.YN)(this.previousExtent_);
        }
      }

      var idle = this.previousExtent_ && !frameState.viewHints[ViewHint/* default.ANIMATING */.Z.ANIMATING] && !frameState.viewHints[ViewHint/* default.INTERACTING */.Z.INTERACTING] && !(0,extent/* equals */.fS)(frameState.extent, this.previousExtent_);

      if (idle) {
        this.dispatchEvent(new MapEvent/* default */.Z(MapEventType/* default.MOVEEND */.Z.MOVEEND, this, frameState));
        (0,extent/* clone */.d9)(frameState.extent, this.previousExtent_);
      }
    }

    this.dispatchEvent(new MapEvent/* default */.Z(MapEventType/* default.POSTRENDER */.Z.POSTRENDER, this, frameState));

    if (!this.postRenderTimeoutHandle_) {
      this.postRenderTimeoutHandle_ = setTimeout(function () {
        _this.postRenderTimeoutHandle_ = undefined;

        _this.handlePostRender();
      }, 0);
    }
  };
  /**
   * Sets the layergroup of this map.
   * @param {LayerGroup} layerGroup A layer group containing the layers in this map.
   * @observable
   * @api
   */


  PluggableMap.prototype.setLayerGroup = function (layerGroup) {
    this.set(MapProperty/* default.LAYERGROUP */.Z.LAYERGROUP, layerGroup);
  };
  /**
   * Set the size of this map.
   * @param {import("./size.js").Size|undefined} size The size in pixels of the map in the DOM.
   * @observable
   * @api
   */


  PluggableMap.prototype.setSize = function (size) {
    this.set(MapProperty/* default.SIZE */.Z.SIZE, size);
  };
  /**
   * Set the target element to render this map into.
   * @param {HTMLElement|string} [target] The Element or id of the Element
   *     that the map is rendered in.
   * @observable
   * @api
   */


  PluggableMap.prototype.setTarget = function (target) {
    this.set(MapProperty/* default.TARGET */.Z.TARGET, target);
  };
  /**
   * Set the view for this map.
   * @param {View|Promise<import("./View.js").ViewOptions>} view The view that controls this map.
   * It is also possible to pass a promise that resolves to options for constructing a view.  This
   * alternative allows view properties to be resolved by sources or other components that load
   * view-related metadata.
   * @observable
   * @api
   */


  PluggableMap.prototype.setView = function (view) {
    if (!view || view instanceof View/* default */.ZP) {
      this.set(MapProperty/* default.VIEW */.Z.VIEW, view);
      return;
    }

    this.set(MapProperty/* default.VIEW */.Z.VIEW, new View/* default */.ZP());
    var map = this;
    view.then(function (viewOptions) {
      map.setView(new View/* default */.ZP(viewOptions));
    });
  };
  /**
   * Force a recalculation of the map viewport size.  This should be called when
   * third-party code changes the size of the map viewport.
   * @api
   */


  PluggableMap.prototype.updateSize = function () {
    var targetElement = this.getTargetElement();
    var size = undefined;

    if (targetElement) {
      var computedStyle = getComputedStyle(targetElement);
      var width = targetElement.offsetWidth - parseFloat(computedStyle['borderLeftWidth']) - parseFloat(computedStyle['paddingLeft']) - parseFloat(computedStyle['paddingRight']) - parseFloat(computedStyle['borderRightWidth']);
      var height = targetElement.offsetHeight - parseFloat(computedStyle['borderTopWidth']) - parseFloat(computedStyle['paddingTop']) - parseFloat(computedStyle['paddingBottom']) - parseFloat(computedStyle['borderBottomWidth']);

      if (!isNaN(width) && !isNaN(height)) {
        size = [width, height];

        if (!(0,ol_size/* hasArea */.py)(size) && !!(targetElement.offsetWidth || targetElement.offsetHeight || targetElement.getClientRects().length)) {
          // eslint-disable-next-line
          console.warn("No map visible because the map container's width or height are 0.");
        }
      }
    }

    this.setSize(size);
    this.updateViewportSize_();
  };
  /**
   * Recomputes the viewport size and save it on the view object (if any)
   * @private
   */


  PluggableMap.prototype.updateViewportSize_ = function () {
    var view = this.getView();

    if (view) {
      var size = undefined;
      var computedStyle = getComputedStyle(this.viewport_);

      if (computedStyle.width && computedStyle.height) {
        size = [parseInt(computedStyle.width, 10), parseInt(computedStyle.height, 10)];
      }

      view.setViewportSize(size);
    }
  };

  return PluggableMap;
}(ol_Object/* default */.Z);
/**
 * @param {MapOptions} options Map options.
 * @return {MapOptionsInternal} Internal map options.
 */


function createOptionsInternal(options) {
  /**
   * @type {HTMLElement|Document}
   */
  var keyboardEventTarget = null;

  if (options.keyboardEventTarget !== undefined) {
    keyboardEventTarget = typeof options.keyboardEventTarget === 'string' ? document.getElementById(options.keyboardEventTarget) : options.keyboardEventTarget;
  }
  /**
   * @type {Object<string, *>}
   */


  var values = {};
  var layerGroup = options.layers && typeof
  /** @type {?} */
  options.layers.getLayers === 'function' ?
  /** @type {LayerGroup} */
  options.layers : new Group/* default */.Z({
    layers:
    /** @type {Collection} */
    options.layers
  });
  values[MapProperty/* default.LAYERGROUP */.Z.LAYERGROUP] = layerGroup;
  values[MapProperty/* default.TARGET */.Z.TARGET] = options.target;
  values[MapProperty/* default.VIEW */.Z.VIEW] = options.view instanceof View/* default */.ZP ? options.view : new View/* default */.ZP();
  var controls;

  if (options.controls !== undefined) {
    if (Array.isArray(options.controls)) {
      controls = new Collection/* default */.Z(options.controls.slice());
    } else {
      (0,asserts/* assert */.h)(typeof
      /** @type {?} */
      options.controls.getArray === 'function', 47); // Expected `controls` to be an array or an `import("./Collection.js").Collection`

      controls =
      /** @type {Collection} */
      options.controls;
    }
  }

  var interactions;

  if (options.interactions !== undefined) {
    if (Array.isArray(options.interactions)) {
      interactions = new Collection/* default */.Z(options.interactions.slice());
    } else {
      (0,asserts/* assert */.h)(typeof
      /** @type {?} */
      options.interactions.getArray === 'function', 48); // Expected `interactions` to be an array or an `import("./Collection.js").Collection`

      interactions =
      /** @type {Collection} */
      options.interactions;
    }
  }

  var overlays;

  if (options.overlays !== undefined) {
    if (Array.isArray(options.overlays)) {
      overlays = new Collection/* default */.Z(options.overlays.slice());
    } else {
      (0,asserts/* assert */.h)(typeof
      /** @type {?} */
      options.overlays.getArray === 'function', 49); // Expected `overlays` to be an array or an `import("./Collection.js").Collection`

      overlays = options.overlays;
    }
  } else {
    overlays = new Collection/* default */.Z();
  }

  return {
    controls: controls,
    interactions: interactions,
    keyboardEventTarget: keyboardEventTarget,
    overlays: overlays,
    values: values
  };
}

/* harmony default export */ const ol_PluggableMap = (PluggableMap);
// EXTERNAL MODULE: ./node_modules/ol/obj.js
var obj = __webpack_require__(9800);
// EXTERNAL MODULE: ./node_modules/ol/control.js + 3 modules
var control = __webpack_require__(7039);
// EXTERNAL MODULE: ./node_modules/ol/interaction.js + 9 modules
var interaction = __webpack_require__(1838);
;// CONCATENATED MODULE: ./node_modules/ol/Map.js
var Map_extends = undefined && undefined.__extends || function () {
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
 * @module ol/Map
 */







/**
 * @classdesc
 * The map is the core component of OpenLayers. For a map to render, a view,
 * one or more layers, and a target container are needed:
 *
 *     import Map from 'ol/Map';
 *     import View from 'ol/View';
 *     import TileLayer from 'ol/layer/Tile';
 *     import OSM from 'ol/source/OSM';
 *
 *     var map = new Map({
 *       view: new View({
 *         center: [0, 0],
 *         zoom: 1
 *       }),
 *       layers: [
 *         new TileLayer({
 *           source: new OSM()
 *         })
 *       ],
 *       target: 'map'
 *     });
 *
 * The above snippet creates a map using a {@link module:ol/layer/Tile} to
 * display {@link module:ol/source/OSM~OSM} OSM data and render it to a DOM
 * element with the id `map`.
 *
 * The constructor places a viewport container (with CSS class name
 * `ol-viewport`) in the target element (see `getViewport()`), and then two
 * further elements within the viewport: one with CSS class name
 * `ol-overlaycontainer-stopevent` for controls and some overlays, and one with
 * CSS class name `ol-overlaycontainer` for other overlays (see the `stopEvent`
 * option of {@link module:ol/Overlay~Overlay} for the difference). The map
 * itself is placed in a further element within the viewport.
 *
 * Layers are stored as a {@link module:ol/Collection~Collection} in
 * layerGroups. A top-level group is provided by the library. This is what is
 * accessed by `getLayerGroup` and `setLayerGroup`. Layers entered in the
 * options are added to this group, and `addLayer` and `removeLayer` change the
 * layer collection in the group. `getLayers` is a convenience function for
 * `getLayerGroup().getLayers()`. Note that {@link module:ol/layer/Group~Group}
 * is a subclass of {@link module:ol/layer/Base}, so layers entered in the
 * options or added with `addLayer` can be groups, which can contain further
 * groups, and so on.
 *
 * @api
 */

var Map =
/** @class */
function (_super) {
  Map_extends(Map, _super);
  /**
   * @param {import("./PluggableMap.js").MapOptions} options Map options.
   */


  function Map(options) {
    var _this = this;

    options = (0,obj/* assign */.f0)({}, options);

    if (!options.controls) {
      options.controls = (0,control/* defaults */.ce)();
    }

    if (!options.interactions) {
      options.interactions = (0,interaction/* defaults */.ce)({
        onFocusOnly: true
      });
    }

    _this = _super.call(this, options) || this;
    return _this;
  }

  Map.prototype.createRenderer = function () {
    return new Composite/* default */.Z(this);
  };

  return Map;
}(ol_PluggableMap);

/* harmony default export */ const ol_Map = (Map);

/***/ }),

/***/ 7182:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ObjectEvent */
/* harmony import */ var _events_Event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/* harmony import */ var _ObjectEventType_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4314);
/* harmony import */ var _Observable_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9910);
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9800);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2618);
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
 * @module ol/Object
 */







/**
 * @classdesc
 * Events emitted by {@link module:ol/Object~BaseObject} instances are instances of this type.
 */

var ObjectEvent =
/** @class */
function (_super) {
  __extends(ObjectEvent, _super);
  /**
   * @param {string} type The event type.
   * @param {string} key The property name.
   * @param {*} oldValue The old value for `key`.
   */


  function ObjectEvent(type, key, oldValue) {
    var _this = _super.call(this, type) || this;
    /**
     * The name of the property whose value is changing.
     * @type {string}
     * @api
     */


    _this.key = key;
    /**
     * The old value. To get the new value use `e.target.get(e.key)` where
     * `e` is the event object.
     * @type {*}
     * @api
     */

    _this.oldValue = oldValue;
    return _this;
  }

  return ObjectEvent;
}(_events_Event_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP);


/***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *    import("./Observable").OnSignature<import("./ObjectEventType").Types, ObjectEvent, Return> &
 *    import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|import("./ObjectEventType").Types, Return>} ObjectOnSignature
 */

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Most non-trivial classes inherit from this.
 *
 * This extends {@link module:ol/Observable} with observable
 * properties, where each property is observable as well as the object as a
 * whole.
 *
 * Classes that inherit from this have pre-defined properties, to which you can
 * add your owns. The pre-defined properties are listed in this documentation as
 * 'Observable Properties', and have their own accessors; for example,
 * {@link module:ol/Map~Map} has a `target` property, accessed with
 * `getTarget()` and changed with `setTarget()`. Not all properties are however
 * settable. There are also general-purpose accessors `get()` and `set()`. For
 * example, `get('target')` is equivalent to `getTarget()`.
 *
 * The `set` accessors trigger a change event, and you can monitor this by
 * registering a listener. For example, {@link module:ol/View~View} has a
 * `center` property, so `view.on('change:center', function(evt) {...});` would
 * call the function whenever the value of the center property changes. Within
 * the function, `evt.target` would be the view, so `evt.target.getCenter()`
 * would return the new center.
 *
 * You can add your own observable properties with
 * `object.set('prop', 'value')`, and retrieve that with `object.get('prop')`.
 * You can listen for changes on that property value with
 * `object.on('change:prop', listener)`. You can get a list of all
 * properties with {@link module:ol/Object~BaseObject#getProperties}.
 *
 * Note that the observable properties are separate from standard JS properties.
 * You can, for example, give your map object a title with
 * `map.title='New title'` and with `map.set('title', 'Another title')`. The
 * first will be a `hasOwnProperty`; the second will appear in
 * `getProperties()`. Only the second is observable.
 *
 * Properties can be deleted by using the unset method. E.g.
 * object.unset('foo').
 *
 * @fires ObjectEvent
 * @api
 */

var BaseObject =
/** @class */
function (_super) {
  __extends(BaseObject, _super);
  /**
   * @param {Object<string, *>} [opt_values] An object with key-value pairs.
   */


  function BaseObject(opt_values) {
    var _this = _super.call(this) || this;
    /***
     * @type {ObjectOnSignature<import("./events").EventsKey>}
     */


    _this.on;
    /***
     * @type {ObjectOnSignature<import("./events").EventsKey>}
     */

    _this.once;
    /***
     * @type {ObjectOnSignature<void>}
     */

    _this.un; // Call {@link module:ol/util.getUid} to ensure that the order of objects' ids is
    // the same as the order in which they were created.  This also helps to
    // ensure that object properties are always added in the same order, which
    // helps many JavaScript engines generate faster code.

    (0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .getUid */ .sq)(_this);
    /**
     * @private
     * @type {Object<string, *>}
     */

    _this.values_ = null;

    if (opt_values !== undefined) {
      _this.setProperties(opt_values);
    }

    return _this;
  }
  /**
   * Gets a value.
   * @param {string} key Key name.
   * @return {*} Value.
   * @api
   */


  BaseObject.prototype.get = function (key) {
    var value;

    if (this.values_ && this.values_.hasOwnProperty(key)) {
      value = this.values_[key];
    }

    return value;
  };
  /**
   * Get a list of object property names.
   * @return {Array<string>} List of property names.
   * @api
   */


  BaseObject.prototype.getKeys = function () {
    return this.values_ && Object.keys(this.values_) || [];
  };
  /**
   * Get an object of all property names and values.
   * @return {Object<string, *>} Object.
   * @api
   */


  BaseObject.prototype.getProperties = function () {
    return this.values_ && (0,_obj_js__WEBPACK_IMPORTED_MODULE_2__/* .assign */ .f0)({}, this.values_) || {};
  };
  /**
   * @return {boolean} The object has properties.
   */


  BaseObject.prototype.hasProperties = function () {
    return !!this.values_;
  };
  /**
   * @param {string} key Key name.
   * @param {*} oldValue Old value.
   */


  BaseObject.prototype.notify = function (key, oldValue) {
    var eventType;
    eventType = "change:" + key;
    this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
    eventType = _ObjectEventType_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].PROPERTYCHANGE */ .Z.PROPERTYCHANGE;
    this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
  };
  /**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */


  BaseObject.prototype.addChangeListener = function (key, listener) {
    this.addEventListener("change:" + key, listener);
  };
  /**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */


  BaseObject.prototype.removeChangeListener = function (key, listener) {
    this.removeEventListener("change:" + key, listener);
  };
  /**
   * Sets a value.
   * @param {string} key Key name.
   * @param {*} value Value.
   * @param {boolean} [opt_silent] Update without triggering an event.
   * @api
   */


  BaseObject.prototype.set = function (key, value, opt_silent) {
    var values = this.values_ || (this.values_ = {});

    if (opt_silent) {
      values[key] = value;
    } else {
      var oldValue = values[key];
      values[key] = value;

      if (oldValue !== value) {
        this.notify(key, oldValue);
      }
    }
  };
  /**
   * Sets a collection of key-value pairs.  Note that this changes any existing
   * properties and adds new ones (it does not remove any existing properties).
   * @param {Object<string, *>} values Values.
   * @param {boolean} [opt_silent] Update without triggering an event.
   * @api
   */


  BaseObject.prototype.setProperties = function (values, opt_silent) {
    for (var key in values) {
      this.set(key, values[key], opt_silent);
    }
  };
  /**
   * Apply any properties from another object without triggering events.
   * @param {BaseObject} source The source object.
   * @protected
   */


  BaseObject.prototype.applyProperties = function (source) {
    if (!source.values_) {
      return;
    }

    (0,_obj_js__WEBPACK_IMPORTED_MODULE_2__/* .assign */ .f0)(this.values_ || (this.values_ = {}), source.values_);
  };
  /**
   * Unsets a property.
   * @param {string} key Key name.
   * @param {boolean} [opt_silent] Unset without triggering an event.
   * @api
   */


  BaseObject.prototype.unset = function (key, opt_silent) {
    if (this.values_ && key in this.values_) {
      var oldValue = this.values_[key];
      delete this.values_[key];

      if ((0,_obj_js__WEBPACK_IMPORTED_MODULE_2__/* .isEmpty */ .xb)(this.values_)) {
        this.values_ = null;
      }

      if (!opt_silent) {
        this.notify(key, oldValue);
      }
    }
  };

  return BaseObject;
}(_Observable_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseObject);

/***/ }),

/***/ 4314:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/ObjectEventType
 */

/**
 * @enum {string}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /**
   * Triggered when a property is changed.
   * @event module:ol/Object.ObjectEvent#propertychange
   * @api
   */
  PROPERTYCHANGE: 'propertychange'
});
/**
 * @typedef {'propertychange'} Types
 */

/***/ }),

/***/ 9910:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export unByKey */
/* harmony import */ var _events_Target_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9699);
/* harmony import */ var _events_EventType_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2140);
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5750);
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
 * @module ol/Observable
 */





/***
 * @template {string} Type
 * @template {Event|import("./events/Event.js").default} EventClass
 * @template Return
 * @typedef {(type: Type, listener: (event: EventClass) => ?) => Return} OnSignature
 */

/***
 * @template {string} Type
 * @template Return
 * @typedef {(type: Type[], listener: (event: Event|import("./events/Event").default) => ?) => Return extends void ? void : Return[]} CombinedOnSignature
 */

/**
 * @typedef {'change'|'error'} EventTypes
 */

/***
 * @template Return
 * @typedef {OnSignature<EventTypes, import("./events/Event.js").default, Return> & CombinedOnSignature<EventTypes, Return>} ObservableOnSignature
 */

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * An event target providing convenient methods for listener registration
 * and unregistration. A generic `change` event is always available through
 * {@link module:ol/Observable~Observable#changed}.
 *
 * @fires import("./events/Event.js").default
 * @api
 */

var Observable =
/** @class */
function (_super) {
  __extends(Observable, _super);

  function Observable() {
    var _this = _super.call(this) || this;

    _this.on =
    /** @type {ObservableOnSignature<import("./events").EventsKey>} */
    _this.onInternal;
    _this.once =
    /** @type {ObservableOnSignature<import("./events").EventsKey>} */
    _this.onceInternal;
    _this.un =
    /** @type {ObservableOnSignature<void>} */
    _this.unInternal;
    /**
     * @private
     * @type {number}
     */

    _this.revision_ = 0;
    return _this;
  }
  /**
   * Increases the revision counter and dispatches a 'change' event.
   * @api
   */


  Observable.prototype.changed = function () {
    ++this.revision_;
    this.dispatchEvent(_events_EventType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].CHANGE */ .Z.CHANGE);
  };
  /**
   * Get the version number for this object.  Each time the object is modified,
   * its version number will be incremented.
   * @return {number} Revision.
   * @api
   */


  Observable.prototype.getRevision = function () {
    return this.revision_;
  };
  /**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */


  Observable.prototype.onInternal = function (type, listener) {
    if (Array.isArray(type)) {
      var len = type.length;
      var keys = new Array(len);

      for (var i = 0; i < len; ++i) {
        keys[i] = (0,_events_js__WEBPACK_IMPORTED_MODULE_1__/* .listen */ .oL)(this, type[i], listener);
      }

      return keys;
    } else {
      return (0,_events_js__WEBPACK_IMPORTED_MODULE_1__/* .listen */ .oL)(this,
      /** @type {string} */
      type, listener);
    }
  };
  /**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */


  Observable.prototype.onceInternal = function (type, listener) {
    var key;

    if (Array.isArray(type)) {
      var len = type.length;
      key = new Array(len);

      for (var i = 0; i < len; ++i) {
        key[i] = (0,_events_js__WEBPACK_IMPORTED_MODULE_1__/* .listenOnce */ .Vx)(this, type[i], listener);
      }
    } else {
      key = (0,_events_js__WEBPACK_IMPORTED_MODULE_1__/* .listenOnce */ .Vx)(this,
      /** @type {string} */
      type, listener);
    }
    /** @type {Object} */


    listener.ol_key = key;
    return key;
  };
  /**
   * Unlisten for a certain type of event.
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @protected
   */


  Observable.prototype.unInternal = function (type, listener) {
    var key =
    /** @type {Object} */
    listener.ol_key;

    if (key) {
      unByKey(key);
    } else if (Array.isArray(type)) {
      for (var i = 0, ii = type.length; i < ii; ++i) {
        this.removeEventListener(type[i], listener);
      }
    } else {
      this.removeEventListener(type, listener);
    }
  };

  return Observable;
}(_events_Target_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z);
/**
 * Listen for a certain type of event.
 * @function
 * @param {string|Array<string>} type The event type or array of event types.
 * @param {function((Event|import("./events/Event").default)): ?} listener The listener function.
 * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
 *     called with an array of event types as the first argument, the return
 *     will be an array of keys.
 * @api
 */


Observable.prototype.on;
/**
 * Listen once for a certain type of event.
 * @function
 * @param {string|Array<string>} type The event type or array of event types.
 * @param {function((Event|import("./events/Event").default)): ?} listener The listener function.
 * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
 *     called with an array of event types as the first argument, the return
 *     will be an array of keys.
 * @api
 */

Observable.prototype.once;
/**
 * Unlisten for a certain type of event.
 * @function
 * @param {string|Array<string>} type The event type or array of event types.
 * @param {function((Event|import("./events/Event").default)): ?} listener The listener function.
 * @api
 */

Observable.prototype.un;
/**
 * Removes an event listener using the key returned by `on()` or `once()`.
 * @param {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} key The key returned by `on()`
 *     or `once()` (or an array of keys).
 * @api
 */

function unByKey(key) {
  if (Array.isArray(key)) {
    for (var i = 0, ii = key.length; i < ii; ++i) {
      (0,_events_js__WEBPACK_IMPORTED_MODULE_1__/* .unlistenByKey */ .bN)(key[i]);
    }
  } else {
    (0,_events_js__WEBPACK_IMPORTED_MODULE_1__/* .unlistenByKey */ .bN)(
    /** @type {import("./events.js").EventsKey} */
    key);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Observable);

/***/ }),

/***/ 6791:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _events_Target_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9699);
/* harmony import */ var _events_EventType_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2140);
/* harmony import */ var _TileState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(587);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2618);
/* harmony import */ var _easing_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9635);
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
 * @module ol/Tile
 */







/**
 * A function that takes an {@link module:ol/Tile} for the tile and a
 * `{string}` for the url as arguments. The default is
 * ```js
 * source.setTileLoadFunction(function(tile, src) {
 *   tile.getImage().src = src;
 * });
 * ```
 * For more fine grained control, the load function can use fetch or XMLHttpRequest and involve
 * error handling:
 *
 * ```js
 * import TileState from 'ol/TileState';
 *
 * source.setTileLoadFunction(function(tile, src) {
 *   var xhr = new XMLHttpRequest();
 *   xhr.responseType = 'blob';
 *   xhr.addEventListener('loadend', function (evt) {
 *     var data = this.response;
 *     if (data !== undefined) {
 *       tile.getImage().src = URL.createObjectURL(data);
 *     } else {
 *       tile.setState(TileState.ERROR);
 *     }
 *   });
 *   xhr.addEventListener('error', function () {
 *     tile.setState(TileState.ERROR);
 *   });
 *   xhr.open('GET', src);
 *   xhr.send();
 * });
 * ```
 *
 * @typedef {function(Tile, string): void} LoadFunction
 * @api
 */

/**
 * {@link module:ol/source/Tile~Tile} sources use a function of this type to get
 * the url that provides a tile for a given tile coordinate.
 *
 * This function takes an {@link module:ol/tilecoord~TileCoord} for the tile
 * coordinate, a `{number}` representing the pixel ratio and a
 * {@link module:ol/proj/Projection} for the projection  as arguments
 * and returns a `{string}` representing the tile URL, or undefined if no tile
 * should be requested for the passed tile coordinate.
 *
 * @typedef {function(import("./tilecoord.js").TileCoord, number,
 *           import("./proj/Projection.js").default): (string|undefined)} UrlFunction
 * @api
 */

/**
 * @typedef {Object} Options
 * @property {number} [transition=250] A duration for tile opacity
 * transitions in milliseconds. A duration of 0 disables the opacity transition.
 * @api
 */

/**
 * @classdesc
 * Base class for tiles.
 *
 * @abstract
 */

var Tile =
/** @class */
function (_super) {
  __extends(Tile, _super);
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {Options} [opt_options] Tile options.
   */


  function Tile(tileCoord, state, opt_options) {
    var _this = _super.call(this) || this;

    var options = opt_options ? opt_options : {};
    /**
     * @type {import("./tilecoord.js").TileCoord}
     */

    _this.tileCoord = tileCoord;
    /**
     * @protected
     * @type {import("./TileState.js").default}
     */

    _this.state = state;
    /**
     * An "interim" tile for this tile. The interim tile may be used while this
     * one is loading, for "smooth" transitions when changing params/dimensions
     * on the source.
     * @type {Tile}
     */

    _this.interimTile = null;
    /**
     * A key assigned to the tile. This is used by the tile source to determine
     * if this tile can effectively be used, or if a new tile should be created
     * and this one be used as an interim tile for this new tile.
     * @type {string}
     */

    _this.key = '';
    /**
     * The duration for the opacity transition.
     * @type {number}
     */

    _this.transition_ = options.transition === undefined ? 250 : options.transition;
    /**
     * Lookup of start times for rendering transitions.  If the start time is
     * equal to -1, the transition is complete.
     * @type {Object<string, number>}
     */

    _this.transitionStarts_ = {};
    return _this;
  }
  /**
   * @protected
   */


  Tile.prototype.changed = function () {
    this.dispatchEvent(_events_EventType_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"].CHANGE */ .Z.CHANGE);
  };
  /**
   * Called by the tile cache when the tile is removed from the cache due to expiry
   */


  Tile.prototype.release = function () {};
  /**
   * @return {string} Key.
   */


  Tile.prototype.getKey = function () {
    return this.key + '/' + this.tileCoord;
  };
  /**
   * Get the interim tile most suitable for rendering using the chain of interim
   * tiles. This corresponds to the  most recent tile that has been loaded, if no
   * such tile exists, the original tile is returned.
   * @return {!Tile} Best tile for rendering.
   */


  Tile.prototype.getInterimTile = function () {
    if (!this.interimTile) {
      //empty chain
      return this;
    }

    var tile = this.interimTile; // find the first loaded tile and return it. Since the chain is sorted in
    // decreasing order of creation time, there is no need to search the remainder
    // of the list (all those tiles correspond to older requests and will be
    // cleaned up by refreshInterimChain)

    do {
      if (tile.getState() == _TileState_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].LOADED */ .Z.LOADED) {
        // Show tile immediately instead of fading it in after loading, because
        // the interim tile is in place already
        this.transition_ = 0;
        return tile;
      }

      tile = tile.interimTile;
    } while (tile); // we can not find a better tile


    return this;
  };
  /**
   * Goes through the chain of interim tiles and discards sections of the chain
   * that are no longer relevant.
   */


  Tile.prototype.refreshInterimChain = function () {
    if (!this.interimTile) {
      return;
    }

    var tile = this.interimTile;
    var prev =
    /** @type {Tile} */
    this;

    do {
      if (tile.getState() == _TileState_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].LOADED */ .Z.LOADED) {
        //we have a loaded tile, we can discard the rest of the list
        //we would could abort any LOADING tile request
        //older than this tile (i.e. any LOADING tile following this entry in the chain)
        tile.interimTile = null;
        break;
      } else if (tile.getState() == _TileState_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].LOADING */ .Z.LOADING) {
        //keep this LOADING tile any loaded tiles later in the chain are
        //older than this tile, so we're still interested in the request
        prev = tile;
      } else if (tile.getState() == _TileState_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].IDLE */ .Z.IDLE) {
        //the head of the list is the most current tile, we don't need
        //to start any other requests for this chain
        prev.interimTile = tile.interimTile;
      } else {
        prev = tile;
      }

      tile = prev.interimTile;
    } while (tile);
  };
  /**
   * Get the tile coordinate for this tile.
   * @return {import("./tilecoord.js").TileCoord} The tile coordinate.
   * @api
   */


  Tile.prototype.getTileCoord = function () {
    return this.tileCoord;
  };
  /**
   * @return {import("./TileState.js").default} State.
   */


  Tile.prototype.getState = function () {
    return this.state;
  };
  /**
   * Sets the state of this tile. If you write your own {@link module:ol/Tile~LoadFunction tileLoadFunction} ,
   * it is important to set the state correctly to {@link module:ol/TileState~ERROR}
   * when the tile cannot be loaded. Otherwise the tile cannot be removed from
   * the tile queue and will block other requests.
   * @param {import("./TileState.js").default} state State.
   * @api
   */


  Tile.prototype.setState = function (state) {
    if (this.state !== _TileState_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].ERROR */ .Z.ERROR && this.state > state) {
      throw new Error('Tile load sequence violation');
    }

    this.state = state;
    this.changed();
  };
  /**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   * @abstract
   * @api
   */


  Tile.prototype.load = function () {
    (0,_util_js__WEBPACK_IMPORTED_MODULE_2__/* .abstract */ .O3)();
  };
  /**
   * Get the alpha value for rendering.
   * @param {string} id An id for the renderer.
   * @param {number} time The render frame time.
   * @return {number} A number between 0 and 1.
   */


  Tile.prototype.getAlpha = function (id, time) {
    if (!this.transition_) {
      return 1;
    }

    var start = this.transitionStarts_[id];

    if (!start) {
      start = time;
      this.transitionStarts_[id] = start;
    } else if (start === -1) {
      return 1;
    }

    var delta = time - start + 1000 / 60; // avoid rendering at 0

    if (delta >= this.transition_) {
      return 1;
    }

    return (0,_easing_js__WEBPACK_IMPORTED_MODULE_3__/* .easeIn */ .YQ)(delta / this.transition_);
  };
  /**
   * Determine if a tile is in an alpha transition.  A tile is considered in
   * transition if tile.getAlpha() has not yet been called or has been called
   * and returned 1.
   * @param {string} id An id for the renderer.
   * @return {boolean} The tile is in transition.
   */


  Tile.prototype.inTransition = function (id) {
    if (!this.transition_) {
      return false;
    }

    return this.transitionStarts_[id] !== -1;
  };
  /**
   * Mark a transition as complete.
   * @param {string} id An id for the renderer.
   */


  Tile.prototype.endTransition = function (id) {
    if (this.transition_) {
      this.transitionStarts_[id] = -1;
    }
  };

  return Tile;
}(_events_Target_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tile);

/***/ }),

/***/ 4158:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _structs_LRUCache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8372);
/* harmony import */ var _tilecoord_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5406);
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
 * @module ol/TileCache
 */





var TileCache =
/** @class */
function (_super) {
  __extends(TileCache, _super);

  function TileCache() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * @param {!Object<string, boolean>} usedTiles Used tiles.
   */


  TileCache.prototype.expireCache = function (usedTiles) {
    while (this.canExpireCache()) {
      var tile = this.peekLast();

      if (tile.getKey() in usedTiles) {
        break;
      } else {
        this.pop().release();
      }
    }
  };
  /**
   * Prune all tiles from the cache that don't have the same z as the newest tile.
   */


  TileCache.prototype.pruneExceptNewestZ = function () {
    if (this.getCount() === 0) {
      return;
    }

    var key = this.peekFirstKey();
    var tileCoord = (0,_tilecoord_js__WEBPACK_IMPORTED_MODULE_0__/* .fromKey */ .Ul)(key);
    var z = tileCoord[0];
    this.forEach(function (tile) {
      if (tile.tileCoord[0] !== z) {
        this.remove((0,_tilecoord_js__WEBPACK_IMPORTED_MODULE_0__/* .getKey */ .km)(tile.tileCoord));
        tile.release();
      }
    }.bind(this));
  };

  return TileCache;
}(_structs_LRUCache_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TileCache);

/***/ }),

/***/ 3598:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ createOrUpdate),
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/TileRange
 */

/**
 * A representation of a contiguous block of tiles.  A tile range is specified
 * by its min/max tile coordinates and is inclusive of coordinates.
 */
var TileRange =
/** @class */
function () {
  /**
   * @param {number} minX Minimum X.
   * @param {number} maxX Maximum X.
   * @param {number} minY Minimum Y.
   * @param {number} maxY Maximum Y.
   */
  function TileRange(minX, maxX, minY, maxY) {
    /**
     * @type {number}
     */
    this.minX = minX;
    /**
     * @type {number}
     */

    this.maxX = maxX;
    /**
     * @type {number}
     */

    this.minY = minY;
    /**
     * @type {number}
     */

    this.maxY = maxY;
  }
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {boolean} Contains tile coordinate.
   */


  TileRange.prototype.contains = function (tileCoord) {
    return this.containsXY(tileCoord[1], tileCoord[2]);
  };
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Contains.
   */


  TileRange.prototype.containsTileRange = function (tileRange) {
    return this.minX <= tileRange.minX && tileRange.maxX <= this.maxX && this.minY <= tileRange.minY && tileRange.maxY <= this.maxY;
  };
  /**
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @return {boolean} Contains coordinate.
   */


  TileRange.prototype.containsXY = function (x, y) {
    return this.minX <= x && x <= this.maxX && this.minY <= y && y <= this.maxY;
  };
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Equals.
   */


  TileRange.prototype.equals = function (tileRange) {
    return this.minX == tileRange.minX && this.minY == tileRange.minY && this.maxX == tileRange.maxX && this.maxY == tileRange.maxY;
  };
  /**
   * @param {TileRange} tileRange Tile range.
   */


  TileRange.prototype.extend = function (tileRange) {
    if (tileRange.minX < this.minX) {
      this.minX = tileRange.minX;
    }

    if (tileRange.maxX > this.maxX) {
      this.maxX = tileRange.maxX;
    }

    if (tileRange.minY < this.minY) {
      this.minY = tileRange.minY;
    }

    if (tileRange.maxY > this.maxY) {
      this.maxY = tileRange.maxY;
    }
  };
  /**
   * @return {number} Height.
   */


  TileRange.prototype.getHeight = function () {
    return this.maxY - this.minY + 1;
  };
  /**
   * @return {import("./size.js").Size} Size.
   */


  TileRange.prototype.getSize = function () {
    return [this.getWidth(), this.getHeight()];
  };
  /**
   * @return {number} Width.
   */


  TileRange.prototype.getWidth = function () {
    return this.maxX - this.minX + 1;
  };
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Intersects.
   */


  TileRange.prototype.intersects = function (tileRange) {
    return this.minX <= tileRange.maxX && this.maxX >= tileRange.minX && this.minY <= tileRange.maxY && this.maxY >= tileRange.minY;
  };

  return TileRange;
}();
/**
 * @param {number} minX Minimum X.
 * @param {number} maxX Maximum X.
 * @param {number} minY Minimum Y.
 * @param {number} maxY Maximum Y.
 * @param {TileRange} [tileRange] TileRange.
 * @return {TileRange} Tile range.
 */


function createOrUpdate(minX, maxX, minY, maxY, tileRange) {
  if (tileRange !== undefined) {
    tileRange.minX = minX;
    tileRange.maxX = maxX;
    tileRange.minY = minY;
    tileRange.maxY = maxY;
    return tileRange;
  } else {
    return new TileRange(minX, maxX, minY, maxY);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TileRange);

/***/ }),

/***/ 587:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/TileState
 */

/**
 * @enum {number}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,

  /**
   * Indicates that tile loading failed
   * @type {number}
   */
  ERROR: 3,
  EMPTY: 4
});

/***/ })

}]);