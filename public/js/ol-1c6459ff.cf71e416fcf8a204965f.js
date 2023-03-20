"use strict";
(window["webpackChunkpiast"] = window["webpackChunkpiast"] || []).push([[563],{

/***/ 8372:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4548);
/**
 * @module ol/structs/LRUCache
 */

/**
 * @typedef {Object} Entry
 * @property {string} key_ Key.
 * @property {Object} newer Newer.
 * @property {Object} older Older.
 * @property {*} value_ Value.
 */

/**
 * @classdesc
 * Implements a Least-Recently-Used cache where the keys do not conflict with
 * Object's properties (e.g. 'hasOwnProperty' is not allowed as a key). Expiring
 * items from the cache is the responsibility of the user.
 *
 * @fires import("../events/Event.js").default
 * @template T
 */

var LRUCache =
/** @class */
function () {
  /**
   * @param {number} [opt_highWaterMark] High water mark.
   */
  function LRUCache(opt_highWaterMark) {
    /**
     * Desired max cache size after expireCache(). If set to 0, no cache entries
     * will be pruned at all.
     * @type {number}
     */
    this.highWaterMark = opt_highWaterMark !== undefined ? opt_highWaterMark : 2048;
    /**
     * @private
     * @type {number}
     */

    this.count_ = 0;
    /**
     * @private
     * @type {!Object<string, Entry>}
     */

    this.entries_ = {};
    /**
     * @private
     * @type {?Entry}
     */

    this.oldest_ = null;
    /**
     * @private
     * @type {?Entry}
     */

    this.newest_ = null;
  }
  /**
   * @return {boolean} Can expire cache.
   */


  LRUCache.prototype.canExpireCache = function () {
    return this.highWaterMark > 0 && this.getCount() > this.highWaterMark;
  };
  /**
   * FIXME empty description for jsdoc
   */


  LRUCache.prototype.clear = function () {
    this.count_ = 0;
    this.entries_ = {};
    this.oldest_ = null;
    this.newest_ = null;
  };
  /**
   * @param {string} key Key.
   * @return {boolean} Contains key.
   */


  LRUCache.prototype.containsKey = function (key) {
    return this.entries_.hasOwnProperty(key);
  };
  /**
   * @param {function(T, string, LRUCache<T>): ?} f The function
   *     to call for every entry from the oldest to the newer. This function takes
   *     3 arguments (the entry value, the entry key and the LRUCache object).
   *     The return value is ignored.
   */


  LRUCache.prototype.forEach = function (f) {
    var entry = this.oldest_;

    while (entry) {
      f(entry.value_, entry.key_, this);
      entry = entry.newer;
    }
  };
  /**
   * @param {string} key Key.
   * @param {*} [opt_options] Options (reserved for subclasses).
   * @return {T} Value.
   */


  LRUCache.prototype.get = function (key, opt_options) {
    var entry = this.entries_[key];
    (0,_asserts_js__WEBPACK_IMPORTED_MODULE_0__/* .assert */ .h)(entry !== undefined, 15); // Tried to get a value for a key that does not exist in the cache

    if (entry === this.newest_) {
      return entry.value_;
    } else if (entry === this.oldest_) {
      this.oldest_ =
      /** @type {Entry} */
      this.oldest_.newer;
      this.oldest_.older = null;
    } else {
      entry.newer.older = entry.older;
      entry.older.newer = entry.newer;
    }

    entry.newer = null;
    entry.older = this.newest_;
    this.newest_.newer = entry;
    this.newest_ = entry;
    return entry.value_;
  };
  /**
   * Remove an entry from the cache.
   * @param {string} key The entry key.
   * @return {T} The removed entry.
   */


  LRUCache.prototype.remove = function (key) {
    var entry = this.entries_[key];
    (0,_asserts_js__WEBPACK_IMPORTED_MODULE_0__/* .assert */ .h)(entry !== undefined, 15); // Tried to get a value for a key that does not exist in the cache

    if (entry === this.newest_) {
      this.newest_ =
      /** @type {Entry} */
      entry.older;

      if (this.newest_) {
        this.newest_.newer = null;
      }
    } else if (entry === this.oldest_) {
      this.oldest_ =
      /** @type {Entry} */
      entry.newer;

      if (this.oldest_) {
        this.oldest_.older = null;
      }
    } else {
      entry.newer.older = entry.older;
      entry.older.newer = entry.newer;
    }

    delete this.entries_[key];
    --this.count_;
    return entry.value_;
  };
  /**
   * @return {number} Count.
   */


  LRUCache.prototype.getCount = function () {
    return this.count_;
  };
  /**
   * @return {Array<string>} Keys.
   */


  LRUCache.prototype.getKeys = function () {
    var keys = new Array(this.count_);
    var i = 0;
    var entry;

    for (entry = this.newest_; entry; entry = entry.older) {
      keys[i++] = entry.key_;
    }

    return keys;
  };
  /**
   * @return {Array<T>} Values.
   */


  LRUCache.prototype.getValues = function () {
    var values = new Array(this.count_);
    var i = 0;
    var entry;

    for (entry = this.newest_; entry; entry = entry.older) {
      values[i++] = entry.value_;
    }

    return values;
  };
  /**
   * @return {T} Last value.
   */


  LRUCache.prototype.peekLast = function () {
    return this.oldest_.value_;
  };
  /**
   * @return {string} Last key.
   */


  LRUCache.prototype.peekLastKey = function () {
    return this.oldest_.key_;
  };
  /**
   * Get the key of the newest item in the cache.  Throws if the cache is empty.
   * @return {string} The newest key.
   */


  LRUCache.prototype.peekFirstKey = function () {
    return this.newest_.key_;
  };
  /**
   * @return {T} value Value.
   */


  LRUCache.prototype.pop = function () {
    var entry = this.oldest_;
    delete this.entries_[entry.key_];

    if (entry.newer) {
      entry.newer.older = null;
    }

    this.oldest_ =
    /** @type {Entry} */
    entry.newer;

    if (!this.oldest_) {
      this.newest_ = null;
    }

    --this.count_;
    return entry.value_;
  };
  /**
   * @param {string} key Key.
   * @param {T} value Value.
   */


  LRUCache.prototype.replace = function (key, value) {
    this.get(key); // update `newest_`

    this.entries_[key].value_ = value;
  };
  /**
   * @param {string} key Key.
   * @param {T} value Value.
   */


  LRUCache.prototype.set = function (key, value) {
    (0,_asserts_js__WEBPACK_IMPORTED_MODULE_0__/* .assert */ .h)(!(key in this.entries_), 16); // Tried to set a value for a key that is used already

    var entry = {
      key_: key,
      newer: null,
      older: this.newest_,
      value_: value
    };

    if (!this.newest_) {
      this.oldest_ = entry;
    } else {
      this.newest_.newer = entry;
    }

    this.newest_ = entry;
    this.entries_[key] = entry;
    ++this.count_;
  };
  /**
   * Set a maximum number of entries for the cache.
   * @param {number} size Cache size.
   * @api
   */


  LRUCache.prototype.setSize = function (size) {
    this.highWaterMark = size;
  };

  return LRUCache;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LRUCache);

/***/ }),

/***/ 2002:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "r": () => (/* binding */ DROP)
/* harmony export */ });
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4548);
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9800);
/**
 * @module ol/structs/PriorityQueue
 */


/**
 * @type {number}
 */

var DROP = Infinity;
/**
 * @classdesc
 * Priority queue.
 *
 * The implementation is inspired from the Closure Library's Heap class and
 * Python's heapq module.
 *
 * See https://github.com/google/closure-library/blob/master/closure/goog/structs/heap.js
 * and https://hg.python.org/cpython/file/2.7/Lib/heapq.py.
 *
 * @template T
 */

var PriorityQueue =
/** @class */
function () {
  /**
   * @param {function(T): number} priorityFunction Priority function.
   * @param {function(T): string} keyFunction Key function.
   */
  function PriorityQueue(priorityFunction, keyFunction) {
    /**
     * @type {function(T): number}
     * @private
     */
    this.priorityFunction_ = priorityFunction;
    /**
     * @type {function(T): string}
     * @private
     */

    this.keyFunction_ = keyFunction;
    /**
     * @type {Array<T>}
     * @private
     */

    this.elements_ = [];
    /**
     * @type {Array<number>}
     * @private
     */

    this.priorities_ = [];
    /**
     * @type {!Object<string, boolean>}
     * @private
     */

    this.queuedElements_ = {};
  }
  /**
   * FIXME empty description for jsdoc
   */


  PriorityQueue.prototype.clear = function () {
    this.elements_.length = 0;
    this.priorities_.length = 0;
    (0,_obj_js__WEBPACK_IMPORTED_MODULE_0__/* .clear */ .ZH)(this.queuedElements_);
  };
  /**
   * Remove and return the highest-priority element. O(log N).
   * @return {T} Element.
   */


  PriorityQueue.prototype.dequeue = function () {
    var elements = this.elements_;
    var priorities = this.priorities_;
    var element = elements[0];

    if (elements.length == 1) {
      elements.length = 0;
      priorities.length = 0;
    } else {
      elements[0] = elements.pop();
      priorities[0] = priorities.pop();
      this.siftUp_(0);
    }

    var elementKey = this.keyFunction_(element);
    delete this.queuedElements_[elementKey];
    return element;
  };
  /**
   * Enqueue an element. O(log N).
   * @param {T} element Element.
   * @return {boolean} The element was added to the queue.
   */


  PriorityQueue.prototype.enqueue = function (element) {
    (0,_asserts_js__WEBPACK_IMPORTED_MODULE_1__/* .assert */ .h)(!(this.keyFunction_(element) in this.queuedElements_), 31); // Tried to enqueue an `element` that was already added to the queue

    var priority = this.priorityFunction_(element);

    if (priority != DROP) {
      this.elements_.push(element);
      this.priorities_.push(priority);
      this.queuedElements_[this.keyFunction_(element)] = true;
      this.siftDown_(0, this.elements_.length - 1);
      return true;
    }

    return false;
  };
  /**
   * @return {number} Count.
   */


  PriorityQueue.prototype.getCount = function () {
    return this.elements_.length;
  };
  /**
   * Gets the index of the left child of the node at the given index.
   * @param {number} index The index of the node to get the left child for.
   * @return {number} The index of the left child.
   * @private
   */


  PriorityQueue.prototype.getLeftChildIndex_ = function (index) {
    return index * 2 + 1;
  };
  /**
   * Gets the index of the right child of the node at the given index.
   * @param {number} index The index of the node to get the right child for.
   * @return {number} The index of the right child.
   * @private
   */


  PriorityQueue.prototype.getRightChildIndex_ = function (index) {
    return index * 2 + 2;
  };
  /**
   * Gets the index of the parent of the node at the given index.
   * @param {number} index The index of the node to get the parent for.
   * @return {number} The index of the parent.
   * @private
   */


  PriorityQueue.prototype.getParentIndex_ = function (index) {
    return index - 1 >> 1;
  };
  /**
   * Make this a heap. O(N).
   * @private
   */


  PriorityQueue.prototype.heapify_ = function () {
    var i;

    for (i = (this.elements_.length >> 1) - 1; i >= 0; i--) {
      this.siftUp_(i);
    }
  };
  /**
   * @return {boolean} Is empty.
   */


  PriorityQueue.prototype.isEmpty = function () {
    return this.elements_.length === 0;
  };
  /**
   * @param {string} key Key.
   * @return {boolean} Is key queued.
   */


  PriorityQueue.prototype.isKeyQueued = function (key) {
    return key in this.queuedElements_;
  };
  /**
   * @param {T} element Element.
   * @return {boolean} Is queued.
   */


  PriorityQueue.prototype.isQueued = function (element) {
    return this.isKeyQueued(this.keyFunction_(element));
  };
  /**
   * @param {number} index The index of the node to move down.
   * @private
   */


  PriorityQueue.prototype.siftUp_ = function (index) {
    var elements = this.elements_;
    var priorities = this.priorities_;
    var count = elements.length;
    var element = elements[index];
    var priority = priorities[index];
    var startIndex = index;

    while (index < count >> 1) {
      var lIndex = this.getLeftChildIndex_(index);
      var rIndex = this.getRightChildIndex_(index);
      var smallerChildIndex = rIndex < count && priorities[rIndex] < priorities[lIndex] ? rIndex : lIndex;
      elements[index] = elements[smallerChildIndex];
      priorities[index] = priorities[smallerChildIndex];
      index = smallerChildIndex;
    }

    elements[index] = element;
    priorities[index] = priority;
    this.siftDown_(startIndex, index);
  };
  /**
   * @param {number} startIndex The index of the root.
   * @param {number} index The index of the node to move up.
   * @private
   */


  PriorityQueue.prototype.siftDown_ = function (startIndex, index) {
    var elements = this.elements_;
    var priorities = this.priorities_;
    var element = elements[index];
    var priority = priorities[index];

    while (index > startIndex) {
      var parentIndex = this.getParentIndex_(index);

      if (priorities[parentIndex] > priority) {
        elements[index] = elements[parentIndex];
        priorities[index] = priorities[parentIndex];
        index = parentIndex;
      } else {
        break;
      }
    }

    elements[index] = element;
    priorities[index] = priority;
  };
  /**
   * FIXME empty description for jsdoc
   */


  PriorityQueue.prototype.reprioritize = function () {
    var priorityFunction = this.priorityFunction_;
    var elements = this.elements_;
    var priorities = this.priorities_;
    var index = 0;
    var n = elements.length;
    var element, i, priority;

    for (i = 0; i < n; ++i) {
      element = elements[i];
      priority = priorityFunction(element);

      if (priority == DROP) {
        delete this.queuedElements_[this.keyFunction_(element)];
      } else {
        priorities[index] = priority;
        elements[index++] = element;
      }
    }

    elements.length = index;
    priorities.length = index;
    this.heapify_();
  };

  return PriorityQueue;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PriorityQueue);

/***/ }),

/***/ 2134:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var rbush__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(240);
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1046);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2618);
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9800);
/**
 * @module ol/structs/RBush
 */




/**
 * @typedef {Object} Entry
 * @property {number} minX MinX.
 * @property {number} minY MinY.
 * @property {number} maxX MaxX.
 * @property {number} maxY MaxY.
 * @property {Object} [value] Value.
 */

/**
 * @classdesc
 * Wrapper around the RBush by Vladimir Agafonkin.
 * See https://github.com/mourner/rbush.
 *
 * @template T
 */

var RBush =
/** @class */
function () {
  /**
   * @param {number} [opt_maxEntries] Max entries.
   */
  function RBush(opt_maxEntries) {
    /**
     * @private
     */
    this.rbush_ = new rbush__WEBPACK_IMPORTED_MODULE_0__(opt_maxEntries);
    /**
     * A mapping between the objects added to this rbush wrapper
     * and the objects that are actually added to the internal rbush.
     * @private
     * @type {Object<string, Entry>}
     */

    this.items_ = {};
  }
  /**
   * Insert a value into the RBush.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {T} value Value.
   */


  RBush.prototype.insert = function (extent, value) {
    /** @type {Entry} */
    var item = {
      minX: extent[0],
      minY: extent[1],
      maxX: extent[2],
      maxY: extent[3],
      value: value
    };
    this.rbush_.insert(item);
    this.items_[(0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .getUid */ .sq)(value)] = item;
  };
  /**
   * Bulk-insert values into the RBush.
   * @param {Array<import("../extent.js").Extent>} extents Extents.
   * @param {Array<T>} values Values.
   */


  RBush.prototype.load = function (extents, values) {
    var items = new Array(values.length);

    for (var i = 0, l = values.length; i < l; i++) {
      var extent = extents[i];
      var value = values[i];
      /** @type {Entry} */

      var item = {
        minX: extent[0],
        minY: extent[1],
        maxX: extent[2],
        maxY: extent[3],
        value: value
      };
      items[i] = item;
      this.items_[(0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .getUid */ .sq)(value)] = item;
    }

    this.rbush_.load(items);
  };
  /**
   * Remove a value from the RBush.
   * @param {T} value Value.
   * @return {boolean} Removed.
   */


  RBush.prototype.remove = function (value) {
    var uid = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .getUid */ .sq)(value); // get the object in which the value was wrapped when adding to the
    // internal rbush. then use that object to do the removal.

    var item = this.items_[uid];
    delete this.items_[uid];
    return this.rbush_.remove(item) !== null;
  };
  /**
   * Update the extent of a value in the RBush.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {T} value Value.
   */


  RBush.prototype.update = function (extent, value) {
    var item = this.items_[(0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .getUid */ .sq)(value)];
    var bbox = [item.minX, item.minY, item.maxX, item.maxY];

    if (!(0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .equals */ .fS)(bbox, extent)) {
      this.remove(value);
      this.insert(extent, value);
    }
  };
  /**
   * Return all values in the RBush.
   * @return {Array<T>} All.
   */


  RBush.prototype.getAll = function () {
    var items = this.rbush_.all();
    return items.map(function (item) {
      return item.value;
    });
  };
  /**
   * Return all values in the given extent.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {Array<T>} All in extent.
   */


  RBush.prototype.getInExtent = function (extent, featureAvailabilityDict = {}) {
    /** @type {Entry} */
    var bbox = {
      minX: extent[0],
      minY: extent[1],
      maxX: extent[2],
      maxY: extent[3]
    };
    var items = this.rbush_.search(bbox);
    var features = [];

    for (var i = 0; i < items.length; ++i) {
      let feature = items[i].value;
      if (!((0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .getUid */ .sq)(feature) in featureAvailabilityDict)) features.push(feature);
    }

    return features;
    /*return items.map(function (item) {
        return item.value;
    });*/
  };

  RBush.prototype.getInExtentForClustering = function (extent, clustered, positionInfo, geometryCache, theCluster, featureRegionId, isClusteringByRegion) {
    /** @type {Entry} */
    var bbox = {
      minX: extent[0],
      minY: extent[1],
      maxX: extent[2],
      maxY: extent[3]
    };
    var items = this.rbush_.search(bbox);
    var features = [];
    var coordsCache = {};
    var featureRegionName;
    var neighborRegionName;
    let regionsDict = ArcheoMap.getMapRegions();

    for (var i = 0; i < items.length; ++i) {
      var feature = items[i].value;
      var featureUid = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .getUid */ .sq)(feature);

      if (!(featureUid in clustered)) {
        if (!(featureUid in geometryCache)) geometryCache[featureUid] = theCluster.geometryFunction(feature);
        let isNotFiltered = geometryCache[featureUid] !== false;

        if (isNotFiltered) {
          /* Clustering by property */
          if (isClusteringByRegion) {
            let neighborRegionId = ArcheoMap.getFeatureRegionId(feature);
            let isValidNonEmpty = ArcheoUtilities.isValid(featureRegionId);
            let isNeighborValidNonEmpty = ArcheoUtilities.isValid(neighborRegionId);

            if (isValidNonEmpty && isNeighborValidNonEmpty) {
              featureRegionName = regionsDict[featureRegionId].name;
              neighborRegionName = regionsDict[neighborRegionId].name;
              if (featureRegionName !== neighborRegionName) isNotFiltered = false;
            } else {
              isNotFiltered = false;
              if (!isNeighborValidNonEmpty) clustered[featureUid] = true;
            }
          }

          if (isNotFiltered) {
            let featureCoordinates = geometryCache[featureUid].getCoordinates();
            let hash = ArcheoUtilities.cantorsPairFunction(featureCoordinates);

            if (!(hash in coordsCache)) {
              positionInfo.centroid[0] += featureCoordinates[0];
              positionInfo.centroid[1] += featureCoordinates[1];
              positionInfo.addedCoordinatesCount += 1;
              coordsCache[hash] = true;
            }

            clustered[featureUid] = true;
            features.push(feature);
          }
        }
      }
    }

    coordsCache = {};
    return features;
    /*return items.map(function (item) {
        return item.value;
    });*/
  };
  /**
   * Calls a callback function with each value in the tree.
   * If the callback returns a truthy value, this value is returned without
   * checking the rest of the tree.
   * @param {function(T): *} callback Callback.
   * @return {*} Callback return value.
   */


  RBush.prototype.forEach = function (callback) {
    return this.forEach_(this.getAll(), callback);
  };
  /**
   * Calls a callback function with each value in the provided extent.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(T): *} callback Callback.
   * @return {*} Callback return value.
   */


  RBush.prototype.forEachInExtent = function (extent, callback) {
    return this.forEach_(this.getInExtent(extent), callback);
  };
  /**
   * @param {Array<T>} values Values.
   * @param {function(T): *} callback Callback.
   * @private
   * @return {*} Callback return value.
   */


  RBush.prototype.forEach_ = function (values, callback) {
    var result;

    for (var i = 0, l = values.length; i < l; i++) {
      result = callback(values[i]);

      if (result) {
        return result;
      }
    }

    return result;
  };
  /**
   * @return {boolean} Is empty.
   */


  RBush.prototype.isEmpty = function () {
    return (0,_obj_js__WEBPACK_IMPORTED_MODULE_3__/* .isEmpty */ .xb)(this.items_);
  };
  /**
   * Remove all values from the RBush.
   */


  RBush.prototype.clear = function () {
    this.rbush_.clear();
    this.items_ = {};
  };
  /**
   * @param {import("../extent.js").Extent} [opt_extent] Extent.
   * @return {import("../extent.js").Extent} Extent.
   */


  RBush.prototype.getExtent = function (opt_extent) {
    var data = this.rbush_.toJSON();
    return (0,_extent_js__WEBPACK_IMPORTED_MODULE_2__/* .createOrUpdate */ .T9)(data.minX, data.minY, data.maxX, data.maxY, opt_extent);
  };
  /**
   * @param {RBush} rbush R-Tree.
   */


  RBush.prototype.concat = function (rbush) {
    this.rbush_.load(rbush.rbush_.all());

    for (var i in rbush.items_) {
      this.items_[i] = rbush.items_[i];
    }
  };

  return RBush;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RBush);

/***/ }),

/***/ 3917:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RegularShape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9700);
/**
 * @module ol/style/Circle
 */
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
 * @typedef {Object} Options
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {number} radius Circle radius.
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {Array<number>} [displacement=[0,0]] displacement
 * @property {number|import("../size.js").Size} [scale=1] Scale. A two dimensional scale will produce an ellipse.
 * Unless two dimensional scaling is required a better result may be obtained with an appropriate setting for `radius`.
 * @property {number} [rotation=0] Rotation in radians
 * (positive rotation clockwise, meaningful only when used in conjunction with a two dimensional scale).
 * @property {boolean} [rotateWithView=false] Whether to rotate the shape with the view
 * (meaningful only when used in conjunction with a two dimensional scale).
 */

/**
 * @classdesc
 * Set circle style for vector features.
 * @api
 */

var CircleStyle =
/** @class */
function (_super) {
  __extends(CircleStyle, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function CircleStyle(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    _this = _super.call(this, {
      points: Infinity,
      fill: options.fill,
      radius: options.radius,
      stroke: options.stroke,
      scale: options.scale !== undefined ? options.scale : 1,
      rotation: options.rotation !== undefined ? options.rotation : 0,
      rotateWithView: options.rotateWithView !== undefined ? options.rotateWithView : false,
      displacement: options.displacement !== undefined ? options.displacement : [0, 0]
    }) || this;
    return _this;
  }
  /**
   * Clones the style.
   * @return {CircleStyle} The cloned style.
   * @api
   */


  CircleStyle.prototype.clone = function () {
    var scale = this.getScale();
    var style = new CircleStyle({
      fill: this.getFill() ? this.getFill().clone() : undefined,
      stroke: this.getStroke() ? this.getStroke().clone() : undefined,
      radius: this.getRadius(),
      scale: Array.isArray(scale) ? scale.slice() : scale,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice()
    });
    style.setOpacity(this.getOpacity());
    return style;
  };
  /**
   * Set the circle radius.
   *
   * @param {number} radius Circle radius.
   * @api
   */


  CircleStyle.prototype.setRadius = function (radius) {
    this.radius_ = radius;
    this.render();
  };

  return CircleStyle;
}(_RegularShape_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CircleStyle);

/***/ }),

/***/ 6212:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/style/Fill
 */

/**
 * @typedef {Object} Options
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [color=null] A color, gradient or pattern.
 * See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats.
 * Default null; if null, the Canvas/renderer default black will be used.
 */

/**
 * @classdesc
 * Set fill style for vector features.
 * @api
 */
var Fill =
/** @class */
function () {
  /**
   * @param {Options} [opt_options] Options.
   */
  function Fill(opt_options) {
    var options = opt_options || {};
    /**
     * @private
     * @type {import("../color.js").Color|import("../colorlike.js").ColorLike}
     */

    this.color_ = options.color !== undefined ? options.color : null;
  }
  /**
   * Clones the style. The color is not cloned if it is an {@link module:ol/colorlike~ColorLike}.
   * @return {Fill} The cloned style.
   * @api
   */


  Fill.prototype.clone = function () {
    var color = this.getColor();
    return new Fill({
      color: Array.isArray(color) ? color.slice() : color || undefined
    });
  };
  /**
   * Get the fill color.
   * @return {import("../color.js").Color|import("../colorlike.js").ColorLike} Color.
   * @api
   */


  Fill.prototype.getColor = function () {
    return this.color_;
  };
  /**
   * Set the color.
   *
   * @param {import("../color.js").Color|import("../colorlike.js").ColorLike} color Color.
   * @api
   */


  Fill.prototype.setColor = function (color) {
    this.color_ = color;
  };

  return Fill;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Fill);

/***/ }),

/***/ 9676:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ style_Icon)
});

// EXTERNAL MODULE: ./node_modules/ol/events/EventType.js
var EventType = __webpack_require__(2140);
// EXTERNAL MODULE: ./node_modules/ol/style/IconAnchorUnits.js
var IconAnchorUnits = __webpack_require__(3263);
;// CONCATENATED MODULE: ./node_modules/ol/style/IconOrigin.js
/**
 * @module ol/style/IconOrigin
 */

/**
 * Icon origin. One of 'bottom-left', 'bottom-right', 'top-left', 'top-right'.
 * @enum {string}
 */
/* harmony default export */ const IconOrigin = ({
  /**
   * Origin is at bottom left
   * @api
   */
  BOTTOM_LEFT: 'bottom-left',

  /**
   * Origin is at bottom right
   * @api
   */
  BOTTOM_RIGHT: 'bottom-right',

  /**
   * Origin is at top left
   * @api
   */
  TOP_LEFT: 'top-left',

  /**
   * Origin is at top right
   * @api
   */
  TOP_RIGHT: 'top-right'
});
// EXTERNAL MODULE: ./node_modules/ol/ImageState.js
var ImageState = __webpack_require__(4382);
// EXTERNAL MODULE: ./node_modules/ol/style/Image.js
var style_Image = __webpack_require__(3494);
// EXTERNAL MODULE: ./node_modules/ol/color.js
var color = __webpack_require__(4956);
// EXTERNAL MODULE: ./node_modules/ol/asserts.js
var asserts = __webpack_require__(4548);
// EXTERNAL MODULE: ./node_modules/ol/events/Target.js
var Target = __webpack_require__(9699);
// EXTERNAL MODULE: ./node_modules/ol/dom.js
var dom = __webpack_require__(9631);
// EXTERNAL MODULE: ./node_modules/ol/style/IconImageCache.js
var IconImageCache = __webpack_require__(2532);
// EXTERNAL MODULE: ./node_modules/ol/Image.js + 1 modules
var ol_Image = __webpack_require__(7515);
;// CONCATENATED MODULE: ./node_modules/ol/style/IconImage.js
/**
 * @module ol/style/IconImage
 */
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
 * @type {CanvasRenderingContext2D}
 */

var taintedTestContext = null;

var IconImage =
/** @class */
function (_super) {
  __extends(IconImage, _super);
  /**
   * @param {HTMLImageElement|HTMLCanvasElement} image Image.
   * @param {string|undefined} src Src.
   * @param {import("../size.js").Size} size Size.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../ImageState.js").default} imageState Image state.
   * @param {import("../color.js").Color} color Color.
   */


  function IconImage(image, src, size, crossOrigin, imageState, color) {
    var _this = _super.call(this) || this;
    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement}
     */


    _this.hitDetectionImage_ = null;
    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement}
     */

    _this.image_ = !image ? new Image() : image;

    if (crossOrigin !== null) {
      /** @type {HTMLImageElement} */
      _this.image_.crossOrigin = crossOrigin;
    }
    /**
     * @private
     * @type {Object<number, HTMLCanvasElement>}
     */


    _this.canvas_ = {};
    /**
     * @private
     * @type {import("../color.js").Color}
     */

    _this.color_ = color;
    /**
     * @private
     * @type {?function():void}
     */

    _this.unlisten_ = null;
    /**
     * @private
     * @type {import("../ImageState.js").default}
     */

    _this.imageState_ = imageState;
    /**
     * @private
     * @type {import("../size.js").Size}
     */

    _this.size_ = size;
    /**
     * @private
     * @type {string|undefined}
     */

    _this.src_ = src;
    /**
     * @private
     */

    _this.tainted_;
    return _this;
  }
  /**
   * @private
   * @return {boolean} The image canvas is tainted.
   */


  IconImage.prototype.isTainted_ = function () {
    if (this.tainted_ === undefined && this.imageState_ === ImageState/* default.LOADED */.Z.LOADED) {
      if (!taintedTestContext) {
        taintedTestContext = (0,dom/* createCanvasContext2D */.E4)(1, 1);
      }

      taintedTestContext.drawImage(this.image_, 0, 0);

      try {
        taintedTestContext.getImageData(0, 0, 1, 1);
        this.tainted_ = false;
      } catch (e) {
        taintedTestContext = null;
        this.tainted_ = true;
      }
    }

    return this.tainted_ === true;
  };
  /**
   * @private
   */


  IconImage.prototype.dispatchChangeEvent_ = function () {
    this.dispatchEvent(EventType/* default.CHANGE */.Z.CHANGE);
  };
  /**
   * @private
   */


  IconImage.prototype.handleImageError_ = function () {
    this.imageState_ = ImageState/* default.ERROR */.Z.ERROR;
    this.unlistenImage_();
    this.dispatchChangeEvent_();
  };
  /**
   * @private
   */


  IconImage.prototype.handleImageLoad_ = function () {
    this.imageState_ = ImageState/* default.LOADED */.Z.LOADED;

    if (this.size_) {
      this.image_.width = this.size_[0];
      this.image_.height = this.size_[1];
    } else {
      this.size_ = [this.image_.width, this.image_.height];
    }

    this.unlistenImage_();
    this.dispatchChangeEvent_();
  };
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement} Image or Canvas element.
   */


  IconImage.prototype.getImage = function (pixelRatio) {
    this.replaceColor_(pixelRatio);
    return this.canvas_[pixelRatio] ? this.canvas_[pixelRatio] : this.image_;
  };
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Image or Canvas element.
   */


  IconImage.prototype.getPixelRatio = function (pixelRatio) {
    this.replaceColor_(pixelRatio);
    return this.canvas_[pixelRatio] ? pixelRatio : 1;
  };
  /**
   * @return {import("../ImageState.js").default} Image state.
   */


  IconImage.prototype.getImageState = function () {
    return this.imageState_;
  };
  /**
   * @return {HTMLImageElement|HTMLCanvasElement} Image element.
   */


  IconImage.prototype.getHitDetectionImage = function () {
    if (!this.hitDetectionImage_) {
      if (this.isTainted_()) {
        var width = this.size_[0];
        var height = this.size_[1];
        var context = (0,dom/* createCanvasContext2D */.E4)(width, height);
        context.fillRect(0, 0, width, height);
        this.hitDetectionImage_ = context.canvas;
      } else {
        this.hitDetectionImage_ = this.image_;
      }
    }

    return this.hitDetectionImage_;
  };
  /**
   * Get the size of the icon (in pixels).
   * @return {import("../size.js").Size} Image size.
   */


  IconImage.prototype.getSize = function () {
    return this.size_;
  };
  /**
   * @return {string|undefined} Image src.
   */


  IconImage.prototype.getSrc = function () {
    return this.src_;
  };
  /**
   * Load not yet loaded URI.
   */


  IconImage.prototype.load = function () {
    if (this.imageState_ == ImageState/* default.IDLE */.Z.IDLE) {
      this.imageState_ = ImageState/* default.LOADING */.Z.LOADING;

      try {
        /** @type {HTMLImageElement} */
        this.image_.src = this.src_;
      } catch (e) {
        this.handleImageError_();
      }

      this.unlisten_ = (0,ol_Image/* listenImage */.K)(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
    }
  };
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @private
   */


  IconImage.prototype.replaceColor_ = function (pixelRatio) {
    if (!this.color_ || this.canvas_[pixelRatio] || this.imageState_ !== ImageState/* default.LOADED */.Z.LOADED) {
      return;
    }

    var canvas = document.createElement('canvas');
    this.canvas_[pixelRatio] = canvas;
    canvas.width = Math.ceil(this.image_.width * pixelRatio);
    canvas.height = Math.ceil(this.image_.height * pixelRatio);
    var ctx = canvas.getContext('2d');
    ctx.scale(pixelRatio, pixelRatio);
    ctx.drawImage(this.image_, 0, 0);
    ctx.globalCompositeOperation = 'multiply'; // Internet Explorer 11 does not support the multiply operation.
    // If the canvas is tainted in Internet Explorer this still produces
    // a solid color image with the shape of the icon.

    if (ctx.globalCompositeOperation === 'multiply' || this.isTainted_()) {
      ctx.fillStyle = (0,color/* asString */.XC)(this.color_);
      ctx.fillRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
      ctx.globalCompositeOperation = 'destination-in';
      ctx.drawImage(this.image_, 0, 0);
    } else {
      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imgData.data;
      var r = this.color_[0] / 255.0;
      var g = this.color_[1] / 255.0;
      var b = this.color_[2] / 255.0;
      var a = this.color_[3];

      for (var i = 0, ii = data.length; i < ii; i += 4) {
        data[i] *= r;
        data[i + 1] *= g;
        data[i + 2] *= b;
        data[i + 3] *= a;
      }

      ctx.putImageData(imgData, 0, 0);
    }
  };
  /**
   * Discards event handlers which listen for load completion or errors.
   *
   * @private
   */


  IconImage.prototype.unlistenImage_ = function () {
    if (this.unlisten_) {
      this.unlisten_();
      this.unlisten_ = null;
    }
  };

  return IconImage;
}(Target/* default */.Z);
/**
 * @param {HTMLImageElement|HTMLCanvasElement} image Image.
 * @param {string} src Src.
 * @param {import("../size.js").Size} size Size.
 * @param {?string} crossOrigin Cross origin.
 * @param {import("../ImageState.js").default} imageState Image state.
 * @param {import("../color.js").Color} color Color.
 * @return {IconImage} Icon image.
 */


function get(image, src, size, crossOrigin, imageState, color) {
  var iconImage = IconImageCache/* shared.get */.c.get(src, crossOrigin, color);

  if (!iconImage) {
    iconImage = new IconImage(image, src, size, crossOrigin, imageState, color);
    IconImageCache/* shared.set */.c.set(src, crossOrigin, color, iconImage);
  }

  return iconImage;
}
/* harmony default export */ const style_IconImage = ((/* unused pure expression or super */ null && (IconImage)));
// EXTERNAL MODULE: ./node_modules/ol/util.js
var util = __webpack_require__(2618);
;// CONCATENATED MODULE: ./node_modules/ol/style/Icon.js
var Icon_extends = undefined && undefined.__extends || function () {
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
 * @module ol/style/Icon
 */











/**
 * @typedef {Object} Options
 * @property {Array<number>} [anchor=[0.5, 0.5]] Anchor. Default value is the icon center.
 * @property {import("./IconOrigin.js").default} [anchorOrigin='top-left'] Origin of the anchor: `bottom-left`, `bottom-right`,
 * `top-left` or `top-right`.
 * @property {import("./IconAnchorUnits.js").default} [anchorXUnits='fraction'] Units in which the anchor x value is
 * specified. A value of `'fraction'` indicates the x value is a fraction of the icon. A value of `'pixels'` indicates
 * the x value in pixels.
 * @property {import("./IconAnchorUnits.js").default} [anchorYUnits='fraction'] Units in which the anchor y value is
 * specified. A value of `'fraction'` indicates the y value is a fraction of the icon. A value of `'pixels'` indicates
 * the y value in pixels.
 * @property {import("../color.js").Color|string} [color] Color to tint the icon. If not specified,
 * the icon will be left as is.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images. Note that you must provide a
 * `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {HTMLImageElement|HTMLCanvasElement} [img] Image object for the icon. If the `src` option is not provided then the
 * provided image must already be loaded. And in that case, it is required
 * to provide the size of the image, with the `imgSize` option.
 * @property {Array<number>} [offset=[0, 0]] Offset, which, together with the size and the offset origin, define the
 * sub-rectangle to use from the original icon image.
 * @property {Array<number>} [displacement=[0,0]] Displacement the icon
 * @property {import("./IconOrigin.js").default} [offsetOrigin='top-left'] Origin of the offset: `bottom-left`, `bottom-right`,
 * `top-left` or `top-right`.
 * @property {number} [opacity=1] Opacity of the icon.
 * @property {number|import("../size.js").Size} [scale=1] Scale.
 * @property {boolean} [rotateWithView=false] Whether to rotate the icon with the view.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {import("../size.js").Size} [size] Icon size in pixel. Can be used together with `offset` to define the
 * sub-rectangle to use from the origin (sprite) icon image.
 * @property {import("../size.js").Size} [imgSize] Image size in pixels. Only required if `img` is set and `src` is not, and
 * for SVG images in Internet Explorer 11. The provided `imgSize` needs to match the actual size of the image.
 * @property {string} [src] Image source URI.
 */

/**
 * @classdesc
 * Set icon style for vector features.
 * @api
 */

var Icon =
/** @class */
function (_super) {
  Icon_extends(Icon, _super);
  /**
   * @param {Options} [opt_options] Options.
   */


  function Icon(opt_options) {
    var _this = this;

    var options = opt_options || {};
    /**
     * @type {number}
     */

    var opacity = options.opacity !== undefined ? options.opacity : 1;
    /**
     * @type {number}
     */

    var rotation = options.rotation !== undefined ? options.rotation : 0;
    /**
     * @type {number|import("../size.js").Size}
     */

    var scale = options.scale !== undefined ? options.scale : 1;
    /**
     * @type {boolean}
     */

    var rotateWithView = options.rotateWithView !== undefined ? options.rotateWithView : false;
    _this = _super.call(this, {
      opacity: opacity,
      rotation: rotation,
      scale: scale,
      displacement: options.displacement !== undefined ? options.displacement : [0, 0],
      rotateWithView: rotateWithView
    }) || this;
    /**
     * @private
     * @type {Array<number>}
     */

    _this.anchor_ = options.anchor !== undefined ? options.anchor : [0.5, 0.5];
    /**
     * @private
     * @type {Array<number>}
     */

    _this.normalizedAnchor_ = null;
    /**
     * @private
     * @type {import("./IconOrigin.js").default}
     */

    _this.anchorOrigin_ = options.anchorOrigin !== undefined ? options.anchorOrigin : IconOrigin.TOP_LEFT;
    /**
     * @private
     * @type {import("./IconAnchorUnits.js").default}
     */

    _this.anchorXUnits_ = options.anchorXUnits !== undefined ? options.anchorXUnits : IconAnchorUnits/* default.FRACTION */.Z.FRACTION;
    /**
     * @private
     * @type {import("./IconAnchorUnits.js").default}
     */

    _this.anchorYUnits_ = options.anchorYUnits !== undefined ? options.anchorYUnits : IconAnchorUnits/* default.FRACTION */.Z.FRACTION;
    /**
     * @private
     * @type {?string}
     */

    _this.crossOrigin_ = options.crossOrigin !== undefined ? options.crossOrigin : null;
    /**
     * @type {HTMLImageElement|HTMLCanvasElement}
     */

    var image = options.img !== undefined ? options.img : null;
    /**
     * @type {import("../size.js").Size}
     */

    var imgSize = options.imgSize !== undefined ? options.imgSize : null;
    /**
     * @type {string|undefined}
     */

    var src = options.src;
    (0,asserts/* assert */.h)(!(src !== undefined && image), 4); // `image` and `src` cannot be provided at the same time

    (0,asserts/* assert */.h)(!image || image && imgSize, 5); // `imgSize` must be set when `image` is provided

    if ((src === undefined || src.length === 0) && image) {
      src =
      /** @type {HTMLImageElement} */
      image.src || (0,util/* getUid */.sq)(image);
    }

    (0,asserts/* assert */.h)(src !== undefined && src.length > 0, 6); // A defined and non-empty `src` or `image` must be provided

    /**
     * @type {import("../ImageState.js").default}
     */

    var imageState = options.src !== undefined ? ImageState/* default.IDLE */.Z.IDLE : ImageState/* default.LOADED */.Z.LOADED;
    /**
     * @private
     * @type {import("../color.js").Color}
     */

    _this.color_ = options.color !== undefined ? (0,color/* asArray */._2)(options.color) : null;
    /**
     * @private
     * @type {import("./IconImage.js").default}
     */

    _this.iconImage_ = get(image,
    /** @type {string} */
    src, imgSize, _this.crossOrigin_, imageState, _this.color_);
    /**
     * @private
     * @type {Array<number>}
     */

    _this.offset_ = options.offset !== undefined ? options.offset : [0, 0];
    /**
     * @private
     * @type {import("./IconOrigin.js").default}
     */

    _this.offsetOrigin_ = options.offsetOrigin !== undefined ? options.offsetOrigin : IconOrigin.TOP_LEFT;
    /**
     * @private
     * @type {Array<number>}
     */

    _this.origin_ = null;
    /**
     * @private
     * @type {import("../size.js").Size}
     */

    _this.size_ = options.size !== undefined ? options.size : null;
    return _this;
  }
  /**
   * Clones the style. The underlying Image/HTMLCanvasElement is not cloned.
   * @return {Icon} The cloned style.
   * @api
   */


  Icon.prototype.clone = function () {
    var scale = this.getScale();
    return new Icon({
      anchor: this.anchor_.slice(),
      anchorOrigin: this.anchorOrigin_,
      anchorXUnits: this.anchorXUnits_,
      anchorYUnits: this.anchorYUnits_,
      crossOrigin: this.crossOrigin_,
      color: this.color_ && this.color_.slice ? this.color_.slice() : this.color_ || undefined,
      src: this.getSrc(),
      offset: this.offset_.slice(),
      offsetOrigin: this.offsetOrigin_,
      size: this.size_ !== null ? this.size_.slice() : undefined,
      opacity: this.getOpacity(),
      scale: Array.isArray(scale) ? scale.slice() : scale,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView()
    });
  };
  /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @return {Array<number>} Anchor.
   * @api
   */


  Icon.prototype.getAnchor = function () {
    if (this.normalizedAnchor_) {
      return this.normalizedAnchor_;
    }

    var anchor = this.anchor_;
    var size = this.getSize();

    if (this.anchorXUnits_ == IconAnchorUnits/* default.FRACTION */.Z.FRACTION || this.anchorYUnits_ == IconAnchorUnits/* default.FRACTION */.Z.FRACTION) {
      if (!size) {
        return null;
      }

      anchor = this.anchor_.slice();

      if (this.anchorXUnits_ == IconAnchorUnits/* default.FRACTION */.Z.FRACTION) {
        anchor[0] *= size[0];
      }

      if (this.anchorYUnits_ == IconAnchorUnits/* default.FRACTION */.Z.FRACTION) {
        anchor[1] *= size[1];
      }
    }

    if (this.anchorOrigin_ != IconOrigin.TOP_LEFT) {
      if (!size) {
        return null;
      }

      if (anchor === this.anchor_) {
        anchor = this.anchor_.slice();
      }

      if (this.anchorOrigin_ == IconOrigin.TOP_RIGHT || this.anchorOrigin_ == IconOrigin.BOTTOM_RIGHT) {
        anchor[0] = -anchor[0] + size[0];
      }

      if (this.anchorOrigin_ == IconOrigin.BOTTOM_LEFT || this.anchorOrigin_ == IconOrigin.BOTTOM_RIGHT) {
        anchor[1] = -anchor[1] + size[1];
      }
    }

    var displacement = this.getDisplacement();
    anchor[0] -= displacement[0];
    anchor[1] += displacement[1];
    this.normalizedAnchor_ = anchor;
    return this.normalizedAnchor_;
  };
  /**
   * Set the anchor point. The anchor determines the center point for the
   * symbolizer.
   *
   * @param {Array<number>} anchor Anchor.
   * @api
   */


  Icon.prototype.setAnchor = function (anchor) {
    this.anchor_ = anchor;
    this.normalizedAnchor_ = null;
  };
  /**
   * Get the icon color.
   * @return {import("../color.js").Color} Color.
   * @api
   */


  Icon.prototype.getColor = function () {
    return this.color_;
  };
  /**
   * Get the image icon.
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement} Image or Canvas element.
   * @api
   */


  Icon.prototype.getImage = function (pixelRatio) {
    return this.iconImage_.getImage(pixelRatio);
  };
  /**
   * Get the pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} The pixel ratio of the image.
   * @api
   */


  Icon.prototype.getPixelRatio = function (pixelRatio) {
    return this.iconImage_.getPixelRatio(pixelRatio);
  };
  /**
   * @return {import("../size.js").Size} Image size.
   */


  Icon.prototype.getImageSize = function () {
    return this.iconImage_.getSize();
  };
  /**
   * @return {import("../ImageState.js").default} Image state.
   */


  Icon.prototype.getImageState = function () {
    return this.iconImage_.getImageState();
  };
  /**
   * @return {HTMLImageElement|HTMLCanvasElement} Image element.
   */


  Icon.prototype.getHitDetectionImage = function () {
    return this.iconImage_.getHitDetectionImage();
  };
  /**
   * Get the origin of the symbolizer.
   * @return {Array<number>} Origin.
   * @api
   */


  Icon.prototype.getOrigin = function () {
    if (this.origin_) {
      return this.origin_;
    }

    var offset = this.offset_;

    if (this.offsetOrigin_ != IconOrigin.TOP_LEFT) {
      var size = this.getSize();
      var iconImageSize = this.iconImage_.getSize();

      if (!size || !iconImageSize) {
        return null;
      }

      offset = offset.slice();

      if (this.offsetOrigin_ == IconOrigin.TOP_RIGHT || this.offsetOrigin_ == IconOrigin.BOTTOM_RIGHT) {
        offset[0] = iconImageSize[0] - size[0] - offset[0];
      }

      if (this.offsetOrigin_ == IconOrigin.BOTTOM_LEFT || this.offsetOrigin_ == IconOrigin.BOTTOM_RIGHT) {
        offset[1] = iconImageSize[1] - size[1] - offset[1];
      }
    }

    this.origin_ = offset;
    return this.origin_;
  };
  /**
   * Get the image URL.
   * @return {string|undefined} Image src.
   * @api
   */


  Icon.prototype.getSrc = function () {
    return this.iconImage_.getSrc();
  };
  /**
   * Get the size of the icon (in pixels).
   * @return {import("../size.js").Size} Image size.
   * @api
   */


  Icon.prototype.getSize = function () {
    return !this.size_ ? this.iconImage_.getSize() : this.size_;
  };
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */


  Icon.prototype.listenImageChange = function (listener) {
    this.iconImage_.addEventListener(EventType/* default.CHANGE */.Z.CHANGE, listener);
  };
  /**
   * Load not yet loaded URI.
   * When rendering a feature with an icon style, the vector renderer will
   * automatically call this method. However, you might want to call this
   * method yourself for preloading or other purposes.
   * @api
   */


  Icon.prototype.load = function () {
    this.iconImage_.load();
  };
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */


  Icon.prototype.unlistenImageChange = function (listener) {
    this.iconImage_.removeEventListener(EventType/* default.CHANGE */.Z.CHANGE, listener);
  };

  return Icon;
}(style_Image/* default */.Z);

/* harmony default export */ const style_Icon = (Icon);

/***/ }),

/***/ 3263:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/style/IconAnchorUnits
 */

/**
 * Icon anchor units. One of 'fraction', 'pixels'.
 * @enum {string}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /**
   * Anchor is a fraction
   * @api
   */
  FRACTION: 'fraction',

  /**
   * Anchor is in pixels
   * @api
   */
  PIXELS: 'pixels'
});

/***/ }),

/***/ 2532:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ shared)
/* harmony export */ });
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4956);
/**
 * @module ol/style/IconImageCache
 */

/**
 * @classdesc
 * Singleton class. Available through {@link module:ol/style/IconImageCache~shared}.
 */

var IconImageCache =
/** @class */
function () {
  function IconImageCache() {
    /**
     * @type {!Object<string, import("./IconImage.js").default>}
     * @private
     */
    this.cache_ = {};
    /**
     * @type {number}
     * @private
     */

    this.cacheSize_ = 0;
    /**
     * @type {number}
     * @private
     */

    this.maxCacheSize_ = 32;
  }
  /**
   * FIXME empty description for jsdoc
   */


  IconImageCache.prototype.clear = function () {
    this.cache_ = {};
    this.cacheSize_ = 0;
  };
  /**
   * @return {boolean} Can expire cache.
   */


  IconImageCache.prototype.canExpireCache = function () {
    return this.cacheSize_ > this.maxCacheSize_;
  };
  /**
   * FIXME empty description for jsdoc
   */


  IconImageCache.prototype.expire = function () {
    if (this.canExpireCache()) {
      var i = 0;

      for (var key in this.cache_) {
        var iconImage = this.cache_[key];

        if ((i++ & 3) === 0 && !iconImage.hasListener()) {
          delete this.cache_[key];
          --this.cacheSize_;
        }
      }
    }
  };
  /**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color} color Color.
   * @return {import("./IconImage.js").default} Icon image.
   */


  IconImageCache.prototype.get = function (src, crossOrigin, color) {
    var key = getKey(src, crossOrigin, color);
    return key in this.cache_ ? this.cache_[key] : null;
  };
  /**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color} color Color.
   * @param {import("./IconImage.js").default} iconImage Icon image.
   */


  IconImageCache.prototype.set = function (src, crossOrigin, color, iconImage) {
    var key = getKey(src, crossOrigin, color);
    this.cache_[key] = iconImage;
    ++this.cacheSize_;
  };
  /**
   * Set the cache size of the icon cache. Default is `32`. Change this value when
   * your map uses more than 32 different icon images and you are not caching icon
   * styles on the application level.
   * @param {number} maxCacheSize Cache max size.
   * @api
   */


  IconImageCache.prototype.setSize = function (maxCacheSize) {
    this.maxCacheSize_ = maxCacheSize;
    this.expire();
  };

  return IconImageCache;
}();
/**
 * @param {string} src Src.
 * @param {?string} crossOrigin Cross origin.
 * @param {import("../color.js").Color} color Color.
 * @return {string} Cache key.
 */


function getKey(src, crossOrigin, color) {
  var colorString = color ? (0,_color_js__WEBPACK_IMPORTED_MODULE_0__/* .asString */ .XC)(color) : 'null';
  return crossOrigin + ':' + src + ':' + colorString;
}

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (IconImageCache)));
/**
 * The {@link module:ol/style/IconImageCache~IconImageCache} for
 * {@link module:ol/style/Icon~Icon} images.
 * @api
 */

var shared = new IconImageCache();

/***/ }),

/***/ 3494:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2618);
/* harmony import */ var _size_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7218);
/**
 * @module ol/style/Image
 */


/**
 * @typedef {Object} Options
 * @property {number} opacity Opacity.
 * @property {boolean} rotateWithView If the image should get rotated with the view.
 * @property {number} rotation Rotation.
 * @property {number|import("../size.js").Size} scale Scale.
 * @property {Array<number>} displacement Displacement.
 */

/**
 * @classdesc
 * A base class used for creating subclasses and not instantiated in
 * apps. Base class for {@link module:ol/style/Icon~Icon}, {@link module:ol/style/Circle~CircleStyle} and
 * {@link module:ol/style/RegularShape~RegularShape}.
 * @abstract
 * @api
 */

var ImageStyle =
/** @class */
function () {
  /**
   * @param {Options} options Options.
   */
  function ImageStyle(options) {
    /**
     * @private
     * @type {number}
     */
    this.opacity_ = options.opacity;
    /**
     * @private
     * @type {boolean}
     */

    this.rotateWithView_ = options.rotateWithView;
    /**
     * @private
     * @type {number}
     */

    this.rotation_ = options.rotation;
    /**
     * @private
     * @type {number|import("../size.js").Size}
     */

    this.scale_ = options.scale;
    /**
     * @private
     * @type {import("../size.js").Size}
     */

    this.scaleArray_ = (0,_size_js__WEBPACK_IMPORTED_MODULE_0__/* .toSize */ .Pq)(options.scale);
    /**
     * @private
     * @type {Array<number>}
     */

    this.displacement_ = options.displacement;
  }
  /**
   * Clones the style.
   * @return {ImageStyle} The cloned style.
   * @api
   */


  ImageStyle.prototype.clone = function () {
    var scale = this.getScale();
    return new ImageStyle({
      opacity: this.getOpacity(),
      scale: Array.isArray(scale) ? scale.slice() : scale,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice()
    });
  };
  /**
   * Get the symbolizer opacity.
   * @return {number} Opacity.
   * @api
   */


  ImageStyle.prototype.getOpacity = function () {
    return this.opacity_;
  };
  /**
   * Determine whether the symbolizer rotates with the map.
   * @return {boolean} Rotate with map.
   * @api
   */


  ImageStyle.prototype.getRotateWithView = function () {
    return this.rotateWithView_;
  };
  /**
   * Get the symoblizer rotation.
   * @return {number} Rotation.
   * @api
   */


  ImageStyle.prototype.getRotation = function () {
    return this.rotation_;
  };
  /**
   * Get the symbolizer scale.
   * @return {number|import("../size.js").Size} Scale.
   * @api
   */


  ImageStyle.prototype.getScale = function () {
    return this.scale_;
  };
  /**
   * Get the symbolizer scale array.
   * @return {import("../size.js").Size} Scale array.
   */


  ImageStyle.prototype.getScaleArray = function () {
    return this.scaleArray_;
  };
  /**
   * Get the displacement of the shape
   * @return {Array<number>} Shape's center displacement
   * @api
   */


  ImageStyle.prototype.getDisplacement = function () {
    return this.displacement_;
  };
  /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @abstract
   * @return {Array<number>} Anchor.
   */


  ImageStyle.prototype.getAnchor = function () {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .abstract */ .O3)();
  };
  /**
   * Get the image element for the symbolizer.
   * @abstract
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} Image element.
   */


  ImageStyle.prototype.getImage = function (pixelRatio) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .abstract */ .O3)();
  };
  /**
   * @abstract
   * @return {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} Image element.
   */


  ImageStyle.prototype.getHitDetectionImage = function () {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .abstract */ .O3)();
  };
  /**
   * Get the image pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Pixel ratio.
   */


  ImageStyle.prototype.getPixelRatio = function (pixelRatio) {
    return 1;
  };
  /**
   * @abstract
   * @return {import("../ImageState.js").default} Image state.
   */


  ImageStyle.prototype.getImageState = function () {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .abstract */ .O3)();
  };
  /**
   * @abstract
   * @return {import("../size.js").Size} Image size.
   */


  ImageStyle.prototype.getImageSize = function () {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .abstract */ .O3)();
  };
  /**
   * Get the origin of the symbolizer.
   * @abstract
   * @return {Array<number>} Origin.
   */


  ImageStyle.prototype.getOrigin = function () {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .abstract */ .O3)();
  };
  /**
   * Get the size of the symbolizer (in pixels).
   * @abstract
   * @return {import("../size.js").Size} Size.
   */


  ImageStyle.prototype.getSize = function () {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .abstract */ .O3)();
  };
  /**
   * Set the opacity.
   *
   * @param {number} opacity Opacity.
   * @api
   */


  ImageStyle.prototype.setOpacity = function (opacity) {
    this.opacity_ = opacity;
  };
  /**
   * Set whether to rotate the style with the view.
   *
   * @param {boolean} rotateWithView Rotate with map.
   * @api
   */


  ImageStyle.prototype.setRotateWithView = function (rotateWithView) {
    this.rotateWithView_ = rotateWithView;
  };
  /**
   * Set the rotation.
   *
   * @param {number} rotation Rotation.
   * @api
   */


  ImageStyle.prototype.setRotation = function (rotation) {
    this.rotation_ = rotation;
  };
  /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size} scale Scale.
   * @api
   */


  ImageStyle.prototype.setScale = function (scale) {
    this.scale_ = scale;
    this.scaleArray_ = (0,_size_js__WEBPACK_IMPORTED_MODULE_0__/* .toSize */ .Pq)(scale);
  };
  /**
   * @abstract
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */


  ImageStyle.prototype.listenImageChange = function (listener) {
    (0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .abstract */ .O3)();
  };
  /**
   * Load not yet loaded URI.
   * @abstract
   */


  ImageStyle.prototype.load = function () {
    (0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .abstract */ .O3)();
  };
  /**
   * @abstract
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */


  ImageStyle.prototype.unlistenImageChange = function (listener) {
    (0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .abstract */ .O3)();
  };

  return ImageStyle;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageStyle);

/***/ }),

/***/ 9700:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ImageState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4382);
/* harmony import */ var _Image_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3494);
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4956);
/* harmony import */ var _colorlike_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5739);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9631);
/* harmony import */ var _render_canvas_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1184);
/**
 * @module ol/style/RegularShape
 */
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
 * Specify radius for regular polygons, or radius1 and radius2 for stars.
 * @typedef {Object} Options
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {number} points Number of points for stars and regular polygons. In case of a polygon, the number of points
 * is the number of sides.
 * @property {number} [radius] Radius of a regular polygon.
 * @property {number} [radius1] First radius of a star. Ignored if radius is set.
 * @property {number} [radius2] Second radius of a star.
 * @property {number} [angle=0] Shape's angle in radians. A value of 0 will have one of the shape's point facing up.
 * @property {Array<number>} [displacement=[0,0]] Displacement of the shape
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {boolean} [rotateWithView=false] Whether to rotate the shape with the view.
 * @property {number|import("../size.js").Size} [scale=1] Scale. Unless two dimensional scaling is required a better
 * result may be obtained with appropriate settings for `radius`, `radius1` and `radius2`.
 */

/**
 * @typedef {Object} RenderOptions
 * @property {import("../colorlike.js").ColorLike} [strokeStyle] StrokeStyle.
 * @property {number} strokeWidth StrokeWidth.
 * @property {number} size Size.
 * @property {Array<number>} lineDash LineDash.
 * @property {number} lineDashOffset LineDashOffset.
 * @property {CanvasLineJoin} lineJoin LineJoin.
 * @property {number} miterLimit MiterLimit.
 */

/**
 * @classdesc
 * Set regular shape style for vector features. The resulting shape will be
 * a regular polygon when `radius` is provided, or a star when `radius1` and
 * `radius2` are provided.
 * @api
 */

var RegularShape =
/** @class */
function (_super) {
  __extends(RegularShape, _super);
  /**
   * @param {Options} options Options.
   */


  function RegularShape(options) {
    var _this = this;
    /**
     * @type {boolean}
     */


    var rotateWithView = options.rotateWithView !== undefined ? options.rotateWithView : false;
    _this = _super.call(this, {
      opacity: 1,
      rotateWithView: rotateWithView,
      rotation: options.rotation !== undefined ? options.rotation : 0,
      scale: options.scale !== undefined ? options.scale : 1,
      displacement: options.displacement !== undefined ? options.displacement : [0, 0]
    }) || this;
    /**
     * @private
     * @type {Object<number, HTMLCanvasElement>}
     */

    _this.canvas_ = undefined;
    /**
     * @private
     * @type {HTMLCanvasElement}
     */

    _this.hitDetectionCanvas_ = null;
    /**
     * @private
     * @type {import("./Fill.js").default}
     */

    _this.fill_ = options.fill !== undefined ? options.fill : null;
    /**
     * @private
     * @type {Array<number>}
     */

    _this.origin_ = [0, 0];
    /**
     * @private
     * @type {number}
     */

    _this.points_ = options.points;
    /**
     * @protected
     * @type {number}
     */

    _this.radius_ = options.radius !== undefined ? options.radius : options.radius1;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.radius2_ = options.radius2;
    /**
     * @private
     * @type {number}
     */

    _this.angle_ = options.angle !== undefined ? options.angle : 0;
    /**
     * @private
     * @type {import("./Stroke.js").default}
     */

    _this.stroke_ = options.stroke !== undefined ? options.stroke : null;
    /**
     * @private
     * @type {Array<number>}
     */

    _this.anchor_ = null;
    /**
     * @private
     * @type {import("../size.js").Size}
     */

    _this.size_ = null;
    /**
     * @private
     * @type {RenderOptions}
     */

    _this.renderOptions_ = null;

    _this.render();

    return _this;
  }
  /**
   * Clones the style.
   * @return {RegularShape} The cloned style.
   * @api
   */


  RegularShape.prototype.clone = function () {
    var scale = this.getScale();
    var style = new RegularShape({
      fill: this.getFill() ? this.getFill().clone() : undefined,
      points: this.getPoints(),
      radius: this.getRadius(),
      radius2: this.getRadius2(),
      angle: this.getAngle(),
      stroke: this.getStroke() ? this.getStroke().clone() : undefined,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      scale: Array.isArray(scale) ? scale.slice() : scale,
      displacement: this.getDisplacement().slice()
    });
    style.setOpacity(this.getOpacity());
    return style;
  };
  /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @return {Array<number>} Anchor.
   * @api
   */


  RegularShape.prototype.getAnchor = function () {
    return this.anchor_;
  };
  /**
   * Get the angle used in generating the shape.
   * @return {number} Shape's rotation in radians.
   * @api
   */


  RegularShape.prototype.getAngle = function () {
    return this.angle_;
  };
  /**
   * Get the fill style for the shape.
   * @return {import("./Fill.js").default} Fill style.
   * @api
   */


  RegularShape.prototype.getFill = function () {
    return this.fill_;
  };
  /**
   * @return {HTMLCanvasElement} Image element.
   */


  RegularShape.prototype.getHitDetectionImage = function () {
    if (!this.hitDetectionCanvas_) {
      this.createHitDetectionCanvas_(this.renderOptions_);
    }

    return this.hitDetectionCanvas_;
  };
  /**
   * Get the image icon.
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLCanvasElement} Image or Canvas element.
   * @api
   */


  RegularShape.prototype.getImage = function (pixelRatio) {
    var image = this.canvas_[pixelRatio];

    if (!image) {
      var renderOptions = this.renderOptions_;
      var context = (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__/* .createCanvasContext2D */ .E4)(renderOptions.size * pixelRatio, renderOptions.size * pixelRatio);
      this.draw_(renderOptions, context, pixelRatio);
      image = context.canvas;
      this.canvas_[pixelRatio] = image;
    }

    return image;
  };
  /**
   * Get the image pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Pixel ratio.
   */


  RegularShape.prototype.getPixelRatio = function (pixelRatio) {
    return pixelRatio;
  };
  /**
   * @return {import("../size.js").Size} Image size.
   */


  RegularShape.prototype.getImageSize = function () {
    return this.size_;
  };
  /**
   * @return {import("../ImageState.js").default} Image state.
   */


  RegularShape.prototype.getImageState = function () {
    return _ImageState_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].LOADED */ .Z.LOADED;
  };
  /**
   * Get the origin of the symbolizer.
   * @return {Array<number>} Origin.
   * @api
   */


  RegularShape.prototype.getOrigin = function () {
    return this.origin_;
  };
  /**
   * Get the number of points for generating the shape.
   * @return {number} Number of points for stars and regular polygons.
   * @api
   */


  RegularShape.prototype.getPoints = function () {
    return this.points_;
  };
  /**
   * Get the (primary) radius for the shape.
   * @return {number} Radius.
   * @api
   */


  RegularShape.prototype.getRadius = function () {
    return this.radius_;
  };
  /**
   * Get the secondary radius for the shape.
   * @return {number|undefined} Radius2.
   * @api
   */


  RegularShape.prototype.getRadius2 = function () {
    return this.radius2_;
  };
  /**
   * Get the size of the symbolizer (in pixels).
   * @return {import("../size.js").Size} Size.
   * @api
   */


  RegularShape.prototype.getSize = function () {
    return this.size_;
  };
  /**
   * Get the stroke style for the shape.
   * @return {import("./Stroke.js").default} Stroke style.
   * @api
   */


  RegularShape.prototype.getStroke = function () {
    return this.stroke_;
  };
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */


  RegularShape.prototype.listenImageChange = function (listener) {};
  /**
   * Load not yet loaded URI.
   */


  RegularShape.prototype.load = function () {};
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */


  RegularShape.prototype.unlistenImageChange = function (listener) {};
  /**
   * Calculate additional canvas size needed for the miter.
   * @param {string} lineJoin Line join
   * @param {number} strokeWidth Stroke width
   * @param {number} miterLimit Miter limit
   * @return {number} Additional canvas size needed
   * @private
   */


  RegularShape.prototype.calculateLineJoinSize_ = function (lineJoin, strokeWidth, miterLimit) {
    if (strokeWidth === 0 || this.points_ === Infinity || lineJoin !== 'bevel' && lineJoin !== 'miter') {
      return strokeWidth;
    } // m  | ^
    // i  | |\                  .
    // t >|  #\
    // e  | |\ \              .
    // r      \s\
    //      |  \t\          .                 .
    //          \r\                      .   .
    //      |    \o\      .          .  . . .
    //          e \k\            .  .    . .
    //      |      \e\  .    .  .       . .
    //       d      \ \  .  .          . .
    //      | _ _a_ _\#  .            . .
    //   r1          / `             . .
    //      |                       . .
    //       b     /               . .
    //      |                     . .
    //           / r2            . .
    //      |                        .   .
    //         /                           .   .
    //      |α                                   .   .
    //       /                                         .   .
    //      ° center


    var r1 = this.radius_;
    var r2 = this.radius2_ === undefined ? r1 : this.radius2_;

    if (r1 < r2) {
      var tmp = r1;
      r1 = r2;
      r2 = tmp;
    }

    var points = this.radius2_ === undefined ? this.points_ : this.points_ * 2;
    var alpha = 2 * Math.PI / points;
    var a = r2 * Math.sin(alpha);
    var b = Math.sqrt(r2 * r2 - a * a);
    var d = r1 - b;
    var e = Math.sqrt(a * a + d * d);
    var miterRatio = e / a;

    if (lineJoin === 'miter' && miterRatio <= miterLimit) {
      return miterRatio * strokeWidth;
    } // Calculate the distnce from center to the stroke corner where
    // it was cut short because of the miter limit.
    //              l
    //        ----+---- <= distance from center to here is maxr
    //       /####|k ##\
    //      /#####^#####\
    //     /#### /+\# s #\
    //    /### h/+++\# t #\
    //   /### t/+++++\# r #\
    //  /### a/+++++++\# o #\
    // /### p/++ fill +\# k #\
    ///#### /+++++^+++++\# e #\
    //#####/+++++/+\+++++\#####\


    var k = strokeWidth / 2 / miterRatio;
    var l = strokeWidth / 2 * (d / e);
    var maxr = Math.sqrt((r1 + k) * (r1 + k) + l * l);
    var bevelAdd = maxr - r1;

    if (this.radius2_ === undefined || lineJoin === 'bevel') {
      return bevelAdd * 2;
    } // If outer miter is over the miter limit the inner miter may reach through the
    // center and be longer than the bevel, same calculation as above but swap r1 / r2.


    var aa = r1 * Math.sin(alpha);
    var bb = Math.sqrt(r1 * r1 - aa * aa);
    var dd = r2 - bb;
    var ee = Math.sqrt(aa * aa + dd * dd);
    var innerMiterRatio = ee / aa;

    if (innerMiterRatio <= miterLimit) {
      var innerLength = innerMiterRatio * strokeWidth / 2 - r2 - r1;
      return 2 * Math.max(bevelAdd, innerLength);
    }

    return bevelAdd * 2;
  };
  /**
   * @return {RenderOptions}  The render options
   * @protected
   */


  RegularShape.prototype.createRenderOptions = function () {
    var lineJoin = _render_canvas_js__WEBPACK_IMPORTED_MODULE_2__/* .defaultLineJoin */ .rc;
    var miterLimit = 0;
    var lineDash = null;
    var lineDashOffset = 0;
    var strokeStyle;
    var strokeWidth = 0;

    if (this.stroke_) {
      strokeStyle = this.stroke_.getColor();

      if (strokeStyle === null) {
        strokeStyle = _render_canvas_js__WEBPACK_IMPORTED_MODULE_2__/* .defaultStrokeStyle */ .Tx;
      }

      strokeStyle = (0,_colorlike_js__WEBPACK_IMPORTED_MODULE_3__/* .asColorLike */ .y)(strokeStyle);
      strokeWidth = this.stroke_.getWidth();

      if (strokeWidth === undefined) {
        strokeWidth = _render_canvas_js__WEBPACK_IMPORTED_MODULE_2__/* .defaultLineWidth */ .yC;
      }

      lineDash = this.stroke_.getLineDash();
      lineDashOffset = this.stroke_.getLineDashOffset();
      lineJoin = this.stroke_.getLineJoin();

      if (lineJoin === undefined) {
        lineJoin = _render_canvas_js__WEBPACK_IMPORTED_MODULE_2__/* .defaultLineJoin */ .rc;
      }

      miterLimit = this.stroke_.getMiterLimit();

      if (miterLimit === undefined) {
        miterLimit = _render_canvas_js__WEBPACK_IMPORTED_MODULE_2__/* .defaultMiterLimit */ .V4;
      }
    }

    var add = this.calculateLineJoinSize_(lineJoin, strokeWidth, miterLimit);
    var maxRadius = Math.max(this.radius_, this.radius2_ || 0);
    var size = Math.ceil(2 * maxRadius + add);
    return {
      strokeStyle: strokeStyle,
      strokeWidth: strokeWidth,
      size: size,
      lineDash: lineDash,
      lineDashOffset: lineDashOffset,
      lineJoin: lineJoin,
      miterLimit: miterLimit
    };
  };
  /**
   * @protected
   */


  RegularShape.prototype.render = function () {
    this.renderOptions_ = this.createRenderOptions();
    var size = this.renderOptions_.size;
    var displacement = this.getDisplacement();
    this.canvas_ = {};
    this.anchor_ = [size / 2 - displacement[0], size / 2 + displacement[1]];
    this.size_ = [size, size];
  };
  /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @param {CanvasRenderingContext2D} context The rendering context.
   * @param {number} pixelRatio The pixel ratio.
   */


  RegularShape.prototype.draw_ = function (renderOptions, context, pixelRatio) {
    context.scale(pixelRatio, pixelRatio); // set origin to canvas center

    context.translate(renderOptions.size / 2, renderOptions.size / 2);
    this.createPath_(context);

    if (this.fill_) {
      var color = this.fill_.getColor();

      if (color === null) {
        color = _render_canvas_js__WEBPACK_IMPORTED_MODULE_2__/* .defaultFillStyle */ .bL;
      }

      context.fillStyle = (0,_colorlike_js__WEBPACK_IMPORTED_MODULE_3__/* .asColorLike */ .y)(color);
      context.fill();
    }

    if (this.stroke_) {
      context.strokeStyle = renderOptions.strokeStyle;
      context.lineWidth = renderOptions.strokeWidth;

      if (context.setLineDash && renderOptions.lineDash) {
        context.setLineDash(renderOptions.lineDash);
        context.lineDashOffset = renderOptions.lineDashOffset;
      }

      context.lineJoin = renderOptions.lineJoin;
      context.miterLimit = renderOptions.miterLimit;
      context.stroke();
    }
  };
  /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   */


  RegularShape.prototype.createHitDetectionCanvas_ = function (renderOptions) {
    if (this.fill_) {
      var color = this.fill_.getColor(); // determine if fill is transparent (or pattern or gradient)

      var opacity = 0;

      if (typeof color === 'string') {
        color = (0,_color_js__WEBPACK_IMPORTED_MODULE_4__/* .asArray */ ._2)(color);
      }

      if (color === null) {
        opacity = 1;
      } else if (Array.isArray(color)) {
        opacity = color.length === 4 ? color[3] : 1;
      }

      if (opacity === 0) {
        // if a transparent fill style is set, create an extra hit-detection image
        // with a default fill style
        var context = (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__/* .createCanvasContext2D */ .E4)(renderOptions.size, renderOptions.size);
        this.hitDetectionCanvas_ = context.canvas;
        this.drawHitDetectionCanvas_(renderOptions, context);
      }
    }

    if (!this.hitDetectionCanvas_) {
      this.hitDetectionCanvas_ = this.getImage(1);
    }
  };
  /**
   * @private
   * @param {CanvasRenderingContext2D} context The context to draw in.
   */


  RegularShape.prototype.createPath_ = function (context) {
    var points = this.points_;
    var radius = this.radius_;

    if (points === Infinity) {
      context.arc(0, 0, radius, 0, 2 * Math.PI);
    } else {
      var radius2 = this.radius2_ === undefined ? radius : this.radius2_;

      if (this.radius2_ !== undefined) {
        points *= 2;
      }

      var startAngle = this.angle_ - Math.PI / 2;
      var step = 2 * Math.PI / points;

      for (var i = 0; i < points; i++) {
        var angle0 = startAngle + i * step;
        var radiusC = i % 2 === 0 ? radius : radius2;
        context.lineTo(radiusC * Math.cos(angle0), radiusC * Math.sin(angle0));
      }

      context.closePath();
    }
  };
  /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @param {CanvasRenderingContext2D} context The context.
   */


  RegularShape.prototype.drawHitDetectionCanvas_ = function (renderOptions, context) {
    // set origin to canvas center
    context.translate(renderOptions.size / 2, renderOptions.size / 2);
    this.createPath_(context);
    context.fillStyle = _render_canvas_js__WEBPACK_IMPORTED_MODULE_2__/* .defaultFillStyle */ .bL;
    context.fill();

    if (this.stroke_) {
      context.strokeStyle = renderOptions.strokeStyle;
      context.lineWidth = renderOptions.strokeWidth;

      if (renderOptions.lineDash) {
        context.setLineDash(renderOptions.lineDash);
        context.lineDashOffset = renderOptions.lineDashOffset;
      }

      context.lineJoin = renderOptions.lineJoin;
      context.miterLimit = renderOptions.miterLimit;
      context.stroke();
    }
  };

  return RegularShape;
}(_Image_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RegularShape);

/***/ }),

/***/ 9403:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/style/Stroke
 */

/**
 * @typedef {Object} Options
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [color] A color, gradient or pattern.
 * See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats.
 * Default null; if null, the Canvas/renderer default black will be used.
 * @property {CanvasLineCap} [lineCap='round'] Line cap style: `butt`, `round`, or `square`.
 * @property {CanvasLineJoin} [lineJoin='round'] Line join style: `bevel`, `round`, or `miter`.
 * @property {Array<number>} [lineDash] Line dash pattern. Default is `null` (no dash).
 * Please note that Internet Explorer 10 and lower do not support the `setLineDash` method on
 * the `CanvasRenderingContext2D` and therefore this option will have no visual effect in these browsers.
 * @property {number} [lineDashOffset=0] Line dash offset.
 * @property {number} [miterLimit=10] Miter limit.
 * @property {number} [width] Width.
 */

/**
 * @classdesc
 * Set stroke style for vector features.
 * Note that the defaults given are the Canvas defaults, which will be used if
 * option is not defined. The `get` functions return whatever was entered in
 * the options; they will not return the default.
 * @api
 */
var Stroke =
/** @class */
function () {
  /**
   * @param {Options} [opt_options] Options.
   */
  function Stroke(opt_options) {
    var options = opt_options || {};
    /**
     * @private
     * @type {import("../color.js").Color|import("../colorlike.js").ColorLike}
     */

    this.color_ = options.color !== undefined ? options.color : null;
    /**
     * @private
     * @type {CanvasLineCap|undefined}
     */

    this.lineCap_ = options.lineCap;
    /**
     * @private
     * @type {Array<number>}
     */

    this.lineDash_ = options.lineDash !== undefined ? options.lineDash : null;
    /**
     * @private
     * @type {number|undefined}
     */

    this.lineDashOffset_ = options.lineDashOffset;
    /**
     * @private
     * @type {CanvasLineJoin|undefined}
     */

    this.lineJoin_ = options.lineJoin;
    /**
     * @private
     * @type {number|undefined}
     */

    this.miterLimit_ = options.miterLimit;
    /**
     * @private
     * @type {number|undefined}
     */

    this.width_ = options.width;
  }
  /**
   * Clones the style.
   * @return {Stroke} The cloned style.
   * @api
   */


  Stroke.prototype.clone = function () {
    var color = this.getColor();
    return new Stroke({
      color: Array.isArray(color) ? color.slice() : color || undefined,
      lineCap: this.getLineCap(),
      lineDash: this.getLineDash() ? this.getLineDash().slice() : undefined,
      lineDashOffset: this.getLineDashOffset(),
      lineJoin: this.getLineJoin(),
      miterLimit: this.getMiterLimit(),
      width: this.getWidth()
    });
  };
  /**
   * Get the stroke color.
   * @return {import("../color.js").Color|import("../colorlike.js").ColorLike} Color.
   * @api
   */


  Stroke.prototype.getColor = function () {
    return this.color_;
  };
  /**
   * Get the line cap type for the stroke.
   * @return {CanvasLineCap|undefined} Line cap.
   * @api
   */


  Stroke.prototype.getLineCap = function () {
    return this.lineCap_;
  };
  /**
   * Get the line dash style for the stroke.
   * @return {Array<number>} Line dash.
   * @api
   */


  Stroke.prototype.getLineDash = function () {
    return this.lineDash_;
  };
  /**
   * Get the line dash offset for the stroke.
   * @return {number|undefined} Line dash offset.
   * @api
   */


  Stroke.prototype.getLineDashOffset = function () {
    return this.lineDashOffset_;
  };
  /**
   * Get the line join type for the stroke.
   * @return {CanvasLineJoin|undefined} Line join.
   * @api
   */


  Stroke.prototype.getLineJoin = function () {
    return this.lineJoin_;
  };
  /**
   * Get the miter limit for the stroke.
   * @return {number|undefined} Miter limit.
   * @api
   */


  Stroke.prototype.getMiterLimit = function () {
    return this.miterLimit_;
  };
  /**
   * Get the stroke width.
   * @return {number|undefined} Width.
   * @api
   */


  Stroke.prototype.getWidth = function () {
    return this.width_;
  };
  /**
   * Set the color.
   *
   * @param {import("../color.js").Color|import("../colorlike.js").ColorLike} color Color.
   * @api
   */


  Stroke.prototype.setColor = function (color) {
    this.color_ = color;
  };
  /**
   * Set the line cap.
   *
   * @param {CanvasLineCap|undefined} lineCap Line cap.
   * @api
   */


  Stroke.prototype.setLineCap = function (lineCap) {
    this.lineCap_ = lineCap;
  };
  /**
   * Set the line dash.
   *
   * Please note that Internet Explorer 10 and lower [do not support][mdn] the
   * `setLineDash` method on the `CanvasRenderingContext2D` and therefore this
   * property will have no visual effect in these browsers.
   *
   * [mdn]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility
   *
   * @param {Array<number>} lineDash Line dash.
   * @api
   */


  Stroke.prototype.setLineDash = function (lineDash) {
    this.lineDash_ = lineDash;
  };
  /**
   * Set the line dash offset.
   *
   * @param {number|undefined} lineDashOffset Line dash offset.
   * @api
   */


  Stroke.prototype.setLineDashOffset = function (lineDashOffset) {
    this.lineDashOffset_ = lineDashOffset;
  };
  /**
   * Set the line join.
   *
   * @param {CanvasLineJoin|undefined} lineJoin Line join.
   * @api
   */


  Stroke.prototype.setLineJoin = function (lineJoin) {
    this.lineJoin_ = lineJoin;
  };
  /**
   * Set the miter limit.
   *
   * @param {number|undefined} miterLimit Miter limit.
   * @api
   */


  Stroke.prototype.setMiterLimit = function (miterLimit) {
    this.miterLimit_ = miterLimit;
  };
  /**
   * Set the width.
   *
   * @param {number|undefined} width Width.
   * @api
   */


  Stroke.prototype.setWidth = function (width) {
    this.width_ = width;
  };

  return Stroke;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Stroke);

/***/ }),

/***/ 6054:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J$": () => (/* binding */ toFunction),
/* harmony export */   "Ly": () => (/* binding */ createEditingStyle),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "yF": () => (/* binding */ createDefaultStyle)
/* harmony export */ });
/* harmony import */ var _Circle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3917);
/* harmony import */ var _Fill_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6212);
/* harmony import */ var _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5870);
/* harmony import */ var _Stroke_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9403);
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4548);
/**
 * @module ol/style/Style
 */





/**
 * A function that takes an {@link module:ol/Feature} and a `{number}`
 * representing the view's resolution. The function should return a
 * {@link module:ol/style/Style} or an array of them. This way e.g. a
 * vector layer can be styled. If the function returns `undefined`, the
 * feature will not be rendered.
 *
 * @typedef {function(import("../Feature.js").FeatureLike, number):(Style|Array<Style>|void)} StyleFunction
 */

/**
 * A {@link Style}, an array of {@link Style}, or a {@link StyleFunction}.
 * @typedef {Style|Array<Style>|StyleFunction} StyleLike
 */

/**
 * A function that takes an {@link module:ol/Feature} as argument and returns an
 * {@link module:ol/geom/Geometry} that will be rendered and styled for the feature.
 *
 * @typedef {function(import("../Feature.js").FeatureLike):
 *     (import("../geom/Geometry.js").default|import("../render/Feature.js").default|undefined)} GeometryFunction
 */

/**
 * Custom renderer function. Takes two arguments:
 *
 * 1. The pixel coordinates of the geometry in GeoJSON notation.
 * 2. The {@link module:ol/render~State} of the layer renderer.
 *
 * @typedef {function((import("../coordinate.js").Coordinate|Array<import("../coordinate.js").Coordinate>|Array<Array<import("../coordinate.js").Coordinate>>),import("../render.js").State): void}
 * RenderFunction
 */

/**
 * @typedef {Object} Options
 * @property {string|import("../geom/Geometry.js").default|GeometryFunction} [geometry] Feature property or geometry
 * or function returning a geometry to render for this style.
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {import("./Image.js").default} [image] Image style.
 * @property {RenderFunction} [renderer] Custom renderer. When configured, `fill`, `stroke` and `image` will be
 * ignored, and the provided function will be called with each render frame for each geometry.
 * @property {RenderFunction} [hitDetectionRenderer] Custom renderer for hit detection. If provided will be used
 * in hit detection rendering.
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {import("./Text.js").default} [text] Text style.
 * @property {number} [zIndex] Z index.
 */

/**
 * @classdesc
 * Container for vector feature rendering styles. Any changes made to the style
 * or its children through `set*()` methods will not take effect until the
 * feature or layer that uses the style is re-rendered.
 *
 * ## Feature styles
 *
 * If no style is defined, the following default style is used:
 * ```js
 *  import {Fill, Stroke, Circle, Style} from 'ol/style';
 *
 *  var fill = new Fill({
 *    color: 'rgba(255,255,255,0.4)'
 *  });
 *  var stroke = new Stroke({
 *    color: '#3399CC',
 *    width: 1.25
 *  });
 *  var styles = [
 *    new Style({
 *      image: new Circle({
 *        fill: fill,
 *        stroke: stroke,
 *        radius: 5
 *      }),
 *      fill: fill,
 *      stroke: stroke
 *    })
 *  ];
 * ```
 *
 * A separate editing style has the following defaults:
 * ```js
 *  import {Fill, Stroke, Circle, Style} from 'ol/style';
 *  import GeometryType from 'ol/geom/GeometryType';
 *
 *  var white = [255, 255, 255, 1];
 *  var blue = [0, 153, 255, 1];
 *  var width = 3;
 *  styles[GeometryType.POLYGON] = [
 *    new Style({
 *      fill: new Fill({
 *        color: [255, 255, 255, 0.5]
 *      })
 *    })
 *  ];
 *  styles[GeometryType.MULTI_POLYGON] =
 *      styles[GeometryType.POLYGON];
 *  styles[GeometryType.LINE_STRING] = [
 *    new Style({
 *      stroke: new Stroke({
 *        color: white,
 *        width: width + 2
 *      })
 *    }),
 *    new Style({
 *      stroke: new Stroke({
 *        color: blue,
 *        width: width
 *      })
 *    })
 *  ];
 *  styles[GeometryType.MULTI_LINE_STRING] =
 *      styles[GeometryType.LINE_STRING];
 *  styles[GeometryType.POINT] = [
 *    new Style({
 *      image: new Circle({
 *        radius: width * 2,
 *        fill: new Fill({
 *          color: blue
 *        }),
 *        stroke: new Stroke({
 *          color: white,
 *          width: width / 2
 *        })
 *      }),
 *      zIndex: Infinity
 *    })
 *  ];
 *  styles[GeometryType.MULTI_POINT] =
 *      styles[GeometryType.POINT];
 *  styles[GeometryType.GEOMETRY_COLLECTION] =
 *      styles[GeometryType.POLYGON].concat(
 *          styles[GeometryType.LINE_STRING],
 *          styles[GeometryType.POINT]
 *      );
 * ```
 *
 * @api
 */

var Style =
/** @class */
function () {
  /**
   * @param {Options} [opt_options] Style options.
   */
  function Style(opt_options) {
    var options = opt_options || {};
    /**
     * @private
     * @type {string|import("../geom/Geometry.js").default|GeometryFunction}
     */

    this.geometry_ = null;
    /**
     * @private
     * @type {!GeometryFunction}
     */

    this.geometryFunction_ = defaultGeometryFunction;

    if (options.geometry !== undefined) {
      this.setGeometry(options.geometry);
    }
    /**
     * @private
     * @type {import("./Fill.js").default}
     */


    this.fill_ = options.fill !== undefined ? options.fill : null;
    /**
     * @private
     * @type {import("./Image.js").default}
     */

    this.image_ = options.image !== undefined ? options.image : null;
    /**
     * @private
     * @type {RenderFunction|null}
     */

    this.renderer_ = options.renderer !== undefined ? options.renderer : null;
    /**
     * @private
     * @type {RenderFunction|null}
     */

    this.hitDetectionRenderer_ = options.hitDetectionRenderer !== undefined ? options.hitDetectionRenderer : null;
    /**
     * @private
     * @type {import("./Stroke.js").default}
     */

    this.stroke_ = options.stroke !== undefined ? options.stroke : null;
    /**
     * @private
     * @type {import("./Text.js").default}
     */

    this.text_ = options.text !== undefined ? options.text : null;
    /**
     * @private
     * @type {number|undefined}
     */

    this.zIndex_ = options.zIndex;
  }
  /**
   * Clones the style.
   * @return {Style} The cloned style.
   * @api
   */


  Style.prototype.clone = function () {
    var geometry = this.getGeometry();

    if (geometry && typeof geometry === 'object') {
      geometry =
      /** @type {import("../geom/Geometry.js").default} */
      geometry.clone();
    }

    return new Style({
      geometry: geometry,
      fill: this.getFill() ? this.getFill().clone() : undefined,
      image: this.getImage() ? this.getImage().clone() : undefined,
      renderer: this.getRenderer(),
      stroke: this.getStroke() ? this.getStroke().clone() : undefined,
      text: this.getText() ? this.getText().clone() : undefined,
      zIndex: this.getZIndex()
    });
  };
  /**
   * Get the custom renderer function that was configured with
   * {@link #setRenderer} or the `renderer` constructor option.
   * @return {RenderFunction|null} Custom renderer function.
   * @api
   */


  Style.prototype.getRenderer = function () {
    return this.renderer_;
  };
  /**
   * Sets a custom renderer function for this style. When set, `fill`, `stroke`
   * and `image` options of the style will be ignored.
   * @param {RenderFunction|null} renderer Custom renderer function.
   * @api
   */


  Style.prototype.setRenderer = function (renderer) {
    this.renderer_ = renderer;
  };
  /**
   * Sets a custom renderer function for this style used
   * in hit detection.
   * @param {RenderFunction|null} renderer Custom renderer function.
   * @api
   */


  Style.prototype.setHitDetectionRenderer = function (renderer) {
    this.hitDetectionRenderer_ = renderer;
  };
  /**
   * Get the custom renderer function that was configured with
   * {@link #setHitDetectionRenderer} or the `hitDetectionRenderer` constructor option.
   * @return {RenderFunction|null} Custom renderer function.
   * @api
   */


  Style.prototype.getHitDetectionRenderer = function () {
    return this.hitDetectionRenderer_;
  };
  /**
   * Get the geometry to be rendered.
   * @return {string|import("../geom/Geometry.js").default|GeometryFunction}
   * Feature property or geometry or function that returns the geometry that will
   * be rendered with this style.
   * @api
   */


  Style.prototype.getGeometry = function () {
    return this.geometry_;
  };
  /**
   * Get the function used to generate a geometry for rendering.
   * @return {!GeometryFunction} Function that is called with a feature
   * and returns the geometry to render instead of the feature's geometry.
   * @api
   */


  Style.prototype.getGeometryFunction = function () {
    return this.geometryFunction_;
  };
  /**
   * Get the fill style.
   * @return {import("./Fill.js").default} Fill style.
   * @api
   */


  Style.prototype.getFill = function () {
    return this.fill_;
  };
  /**
   * Set the fill style.
   * @param {import("./Fill.js").default} fill Fill style.
   * @api
   */


  Style.prototype.setFill = function (fill) {
    this.fill_ = fill;
  };
  /**
   * Get the image style.
   * @return {import("./Image.js").default} Image style.
   * @api
   */


  Style.prototype.getImage = function () {
    return this.image_;
  };
  /**
   * Set the image style.
   * @param {import("./Image.js").default} image Image style.
   * @api
   */


  Style.prototype.setImage = function (image) {
    this.image_ = image;
  };
  /**
   * Get the stroke style.
   * @return {import("./Stroke.js").default} Stroke style.
   * @api
   */


  Style.prototype.getStroke = function () {
    return this.stroke_;
  };
  /**
   * Set the stroke style.
   * @param {import("./Stroke.js").default} stroke Stroke style.
   * @api
   */


  Style.prototype.setStroke = function (stroke) {
    this.stroke_ = stroke;
  };
  /**
   * Get the text style.
   * @return {import("./Text.js").default} Text style.
   * @api
   */


  Style.prototype.getText = function () {
    return this.text_;
  };
  /**
   * Set the text style.
   * @param {import("./Text.js").default} text Text style.
   * @api
   */


  Style.prototype.setText = function (text) {
    this.text_ = text;
  };
  /**
   * Get the z-index for the style.
   * @return {number|undefined} ZIndex.
   * @api
   */


  Style.prototype.getZIndex = function () {
    return this.zIndex_;
  };
  /**
   * Set a geometry that is rendered instead of the feature's geometry.
   *
   * @param {string|import("../geom/Geometry.js").default|GeometryFunction} geometry
   *     Feature property or geometry or function returning a geometry to render
   *     for this style.
   * @api
   */


  Style.prototype.setGeometry = function (geometry) {
    if (typeof geometry === 'function') {
      this.geometryFunction_ = geometry;
    } else if (typeof geometry === 'string') {
      this.geometryFunction_ = function (feature) {
        return (
          /** @type {import("../geom/Geometry.js").default} */
          feature.get(geometry)
        );
      };
    } else if (!geometry) {
      this.geometryFunction_ = defaultGeometryFunction;
    } else if (geometry !== undefined) {
      this.geometryFunction_ = function () {
        return (
          /** @type {import("../geom/Geometry.js").default} */
          geometry
        );
      };
    }

    this.geometry_ = geometry;
  };
  /**
   * Set the z-index.
   *
   * @param {number|undefined} zIndex ZIndex.
   * @api
   */


  Style.prototype.setZIndex = function (zIndex) {
    this.zIndex_ = zIndex;
  };

  return Style;
}();
/**
 * Convert the provided object into a style function.  Functions passed through
 * unchanged.  Arrays of Style or single style objects wrapped in a
 * new style function.
 * @param {StyleFunction|Array<Style>|Style} obj
 *     A style function, a single style, or an array of styles.
 * @return {StyleFunction} A style function.
 */


function toFunction(obj) {
  var styleFunction;

  if (typeof obj === 'function') {
    styleFunction = obj;
  } else {
    /**
     * @type {Array<Style>}
     */
    var styles_1;

    if (Array.isArray(obj)) {
      styles_1 = obj;
    } else {
      (0,_asserts_js__WEBPACK_IMPORTED_MODULE_0__/* .assert */ .h)(typeof
      /** @type {?} */
      obj.getZIndex === 'function', 41); // Expected an `Style` or an array of `Style`

      var style =
      /** @type {Style} */
      obj;
      styles_1 = [style];
    }

    styleFunction = function () {
      return styles_1;
    };
  }

  return styleFunction;
}
/**
 * @type {Array<Style>}
 */

var defaultStyles = null;
/**
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {number} resolution Resolution.
 * @return {Array<Style>} Style.
 */

function createDefaultStyle(feature, resolution) {
  // We don't use an immediately-invoked function
  // and a closure so we don't get an error at script evaluation time in
  // browsers that do not support Canvas. (import("./Circle.js").CircleStyle does
  // canvas.getContext('2d') at construction time, which will cause an.error
  // in such browsers.)
  if (!defaultStyles) {
    var fill = new _Fill_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z({
      color: 'rgba(255,255,255,0.4)'
    });
    var stroke = new _Stroke_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z({
      color: '#3399CC',
      width: 1.25
    });
    defaultStyles = [new Style({
      image: new _Circle_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z({
        fill: fill,
        stroke: stroke,
        radius: 5
      }),
      fill: fill,
      stroke: stroke
    })];
  }

  return defaultStyles;
}
/**
 * Default styles for editing features.
 * @return {Object<import("../geom/GeometryType.js").default, Array<Style>>} Styles
 */

function createEditingStyle() {
  /** @type {Object<import("../geom/GeometryType.js").default, Array<Style>>} */
  var styles = {};
  var white = [255, 255, 255, 1];
  var blue = [0, 153, 255, 1];
  var width = 3;
  styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].POLYGON */ .Z.POLYGON] = [new Style({
    fill: new _Fill_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z({
      color: [255, 255, 255, 0.5]
    })
  })];
  styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].MULTI_POLYGON */ .Z.MULTI_POLYGON] = styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].POLYGON */ .Z.POLYGON];
  styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].LINE_STRING */ .Z.LINE_STRING] = [new Style({
    stroke: new _Stroke_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z({
      color: white,
      width: width + 2
    })
  }), new Style({
    stroke: new _Stroke_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z({
      color: blue,
      width: width
    })
  })];
  styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].MULTI_LINE_STRING */ .Z.MULTI_LINE_STRING] = styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].LINE_STRING */ .Z.LINE_STRING];
  styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].CIRCLE */ .Z.CIRCLE] = styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].POLYGON */ .Z.POLYGON].concat(styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].LINE_STRING */ .Z.LINE_STRING]);
  styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].POINT */ .Z.POINT] = [new Style({
    image: new _Circle_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z({
      radius: width * 2,
      fill: new _Fill_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z({
        color: blue
      }),
      stroke: new _Stroke_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z({
        color: white,
        width: width / 2
      })
    }),
    zIndex: Infinity
  })];
  styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].MULTI_POINT */ .Z.MULTI_POINT] = styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].POINT */ .Z.POINT];
  styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].GEOMETRY_COLLECTION */ .Z.GEOMETRY_COLLECTION] = styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].POLYGON */ .Z.POLYGON].concat(styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].LINE_STRING */ .Z.LINE_STRING], styles[_geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].POINT */ .Z.POINT]);
  return styles;
}
/**
 * Function that is called with a feature and returns its default geometry.
 * @param {import("../Feature.js").FeatureLike} feature Feature to get the geometry for.
 * @return {import("../geom/Geometry.js").default|import("../render/Feature.js").default|undefined} Geometry to render.
 */

function defaultGeometryFunction(feature) {
  return feature.getGeometry();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Style);

/***/ }),

/***/ 4333:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Fill_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6212);
/* harmony import */ var _TextPlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1722);
/* harmony import */ var _size_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7218);
/**
 * @module ol/style/Text
 */



/**
 * The default fill color to use if no fill was set at construction time; a
 * blackish `#333`.
 *
 * @const {string}
 */

var DEFAULT_FILL_COLOR = '#333';
/**
 * @typedef {Object} Options
 * @property {string} [font] Font style as CSS 'font' value, see:
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font. Default is '10px sans-serif'
 * @property {number} [maxAngle=Math.PI/4] When `placement` is set to `'line'`, allow a maximum angle between adjacent characters.
 * The expected value is in radians, and the default is 45° (`Math.PI / 4`).
 * @property {number} [offsetX=0] Horizontal text offset in pixels. A positive will shift the text right.
 * @property {number} [offsetY=0] Vertical text offset in pixels. A positive will shift the text down.
 * @property {boolean} [overflow=false] For polygon labels or when `placement` is set to `'line'`, allow text to exceed
 * the width of the polygon at the label position or the length of the path that it follows.
 * @property {import("./TextPlacement.js").default|string} [placement='point'] Text placement.
 * @property {number|import("../size.js").Size} [scale] Scale.
 * @property {boolean} [rotateWithView=false] Whether to rotate the text with the view.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {string} [text] Text content.
 * @property {string} [textAlign] Text alignment. Possible values: 'left', 'right', 'center', 'end' or 'start'.
 * Default is 'center' for `placement: 'point'`. For `placement: 'line'`, the default is to let the renderer choose a
 * placement where `maxAngle` is not exceeded.
 * @property {string} [textBaseline='middle'] Text base line. Possible values: 'bottom', 'top', 'middle', 'alphabetic',
 * 'hanging', 'ideographic'.
 * @property {import("./Fill.js").default} [fill] Fill style. If none is provided, we'll use a dark fill-style (#333).
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {import("./Fill.js").default} [backgroundFill] Fill style for the text background when `placement` is
 * `'point'`. Default is no fill.
 * @property {import("./Stroke.js").default} [backgroundStroke] Stroke style for the text background  when `placement`
 * is `'point'`. Default is no stroke.
 * @property {Array<number>} [padding=[0, 0, 0, 0]] Padding in pixels around the text for decluttering and background. The order of
 * values in the array is `[top, right, bottom, left]`.
 */

/**
 * @classdesc
 * Set text style for vector features.
 * @api
 */

var Text =
/** @class */
function () {
  /**
   * @param {Options} [opt_options] Options.
   */
  function Text(opt_options) {
    var options = opt_options || {};
    /**
     * @private
     * @type {string|undefined}
     */

    this.font_ = options.font;
    /**
     * @private
     * @type {number|undefined}
     */

    this.rotation_ = options.rotation;
    /**
     * @private
     * @type {boolean|undefined}
     */

    this.rotateWithView_ = options.rotateWithView;
    /**
     * @private
     * @type {number|import("../size.js").Size|undefined}
     */

    this.scale_ = options.scale;
    /**
     * @private
     * @type {import("../size.js").Size}
     */

    this.scaleArray_ = (0,_size_js__WEBPACK_IMPORTED_MODULE_0__/* .toSize */ .Pq)(options.scale !== undefined ? options.scale : 1);
    /**
     * @private
     * @type {string|undefined}
     */

    this.text_ = options.text;
    /**
     * @private
     * @type {string|undefined}
     */

    this.textAlign_ = options.textAlign;
    /**
     * @private
     * @type {string|undefined}
     */

    this.textBaseline_ = options.textBaseline;
    /**
     * @private
     * @type {import("./Fill.js").default}
     */

    this.fill_ = options.fill !== undefined ? options.fill : new _Fill_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z({
      color: DEFAULT_FILL_COLOR
    });
    /**
     * @private
     * @type {number}
     */

    this.maxAngle_ = options.maxAngle !== undefined ? options.maxAngle : Math.PI / 4;
    /**
     * @private
     * @type {import("./TextPlacement.js").default|string}
     */

    this.placement_ = options.placement !== undefined ? options.placement : _TextPlacement_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].POINT */ .Z.POINT;
    /**
     * @private
     * @type {boolean}
     */

    this.overflow_ = !!options.overflow;
    /**
     * @private
     * @type {import("./Stroke.js").default}
     */

    this.stroke_ = options.stroke !== undefined ? options.stroke : null;
    /**
     * @private
     * @type {number}
     */

    this.offsetX_ = options.offsetX !== undefined ? options.offsetX : 0;
    /**
     * @private
     * @type {number}
     */

    this.offsetY_ = options.offsetY !== undefined ? options.offsetY : 0;
    /**
     * @private
     * @type {import("./Fill.js").default}
     */

    this.backgroundFill_ = options.backgroundFill ? options.backgroundFill : null;
    /**
     * @private
     * @type {import("./Stroke.js").default}
     */

    this.backgroundStroke_ = options.backgroundStroke ? options.backgroundStroke : null;
    /**
     * @private
     * @type {Array<number>}
     */

    this.padding_ = options.padding === undefined ? null : options.padding;
  }
  /**
   * Clones the style.
   * @return {Text} The cloned style.
   * @api
   */


  Text.prototype.clone = function () {
    var scale = this.getScale();
    return new Text({
      font: this.getFont(),
      placement: this.getPlacement(),
      maxAngle: this.getMaxAngle(),
      overflow: this.getOverflow(),
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      scale: Array.isArray(scale) ? scale.slice() : scale,
      text: this.getText(),
      textAlign: this.getTextAlign(),
      textBaseline: this.getTextBaseline(),
      fill: this.getFill() ? this.getFill().clone() : undefined,
      stroke: this.getStroke() ? this.getStroke().clone() : undefined,
      offsetX: this.getOffsetX(),
      offsetY: this.getOffsetY(),
      backgroundFill: this.getBackgroundFill() ? this.getBackgroundFill().clone() : undefined,
      backgroundStroke: this.getBackgroundStroke() ? this.getBackgroundStroke().clone() : undefined,
      padding: this.getPadding()
    });
  };
  /**
   * Get the `overflow` configuration.
   * @return {boolean} Let text overflow the length of the path they follow.
   * @api
   */


  Text.prototype.getOverflow = function () {
    return this.overflow_;
  };
  /**
   * Get the font name.
   * @return {string|undefined} Font.
   * @api
   */


  Text.prototype.getFont = function () {
    return this.font_;
  };
  /**
   * Get the maximum angle between adjacent characters.
   * @return {number} Angle in radians.
   * @api
   */


  Text.prototype.getMaxAngle = function () {
    return this.maxAngle_;
  };
  /**
   * Get the label placement.
   * @return {import("./TextPlacement.js").default|string} Text placement.
   * @api
   */


  Text.prototype.getPlacement = function () {
    return this.placement_;
  };
  /**
   * Get the x-offset for the text.
   * @return {number} Horizontal text offset.
   * @api
   */


  Text.prototype.getOffsetX = function () {
    return this.offsetX_;
  };
  /**
   * Get the y-offset for the text.
   * @return {number} Vertical text offset.
   * @api
   */


  Text.prototype.getOffsetY = function () {
    return this.offsetY_;
  };
  /**
   * Get the fill style for the text.
   * @return {import("./Fill.js").default} Fill style.
   * @api
   */


  Text.prototype.getFill = function () {
    return this.fill_;
  };
  /**
   * Determine whether the text rotates with the map.
   * @return {boolean|undefined} Rotate with map.
   * @api
   */


  Text.prototype.getRotateWithView = function () {
    return this.rotateWithView_;
  };
  /**
   * Get the text rotation.
   * @return {number|undefined} Rotation.
   * @api
   */


  Text.prototype.getRotation = function () {
    return this.rotation_;
  };
  /**
   * Get the text scale.
   * @return {number|import("../size.js").Size|undefined} Scale.
   * @api
   */


  Text.prototype.getScale = function () {
    return this.scale_;
  };
  /**
   * Get the symbolizer scale array.
   * @return {import("../size.js").Size} Scale array.
   */


  Text.prototype.getScaleArray = function () {
    return this.scaleArray_;
  };
  /**
   * Get the stroke style for the text.
   * @return {import("./Stroke.js").default} Stroke style.
   * @api
   */


  Text.prototype.getStroke = function () {
    return this.stroke_;
  };
  /**
   * Get the text to be rendered.
   * @return {string|undefined} Text.
   * @api
   */


  Text.prototype.getText = function () {
    return this.text_;
  };
  /**
   * Get the text alignment.
   * @return {string|undefined} Text align.
   * @api
   */


  Text.prototype.getTextAlign = function () {
    return this.textAlign_;
  };
  /**
   * Get the text baseline.
   * @return {string|undefined} Text baseline.
   * @api
   */


  Text.prototype.getTextBaseline = function () {
    return this.textBaseline_;
  };
  /**
   * Get the background fill style for the text.
   * @return {import("./Fill.js").default} Fill style.
   * @api
   */


  Text.prototype.getBackgroundFill = function () {
    return this.backgroundFill_;
  };
  /**
   * Get the background stroke style for the text.
   * @return {import("./Stroke.js").default} Stroke style.
   * @api
   */


  Text.prototype.getBackgroundStroke = function () {
    return this.backgroundStroke_;
  };
  /**
   * Get the padding for the text.
   * @return {Array<number>} Padding.
   * @api
   */


  Text.prototype.getPadding = function () {
    return this.padding_;
  };
  /**
   * Set the `overflow` property.
   *
   * @param {boolean} overflow Let text overflow the path that it follows.
   * @api
   */


  Text.prototype.setOverflow = function (overflow) {
    this.overflow_ = overflow;
  };
  /**
   * Set the font.
   *
   * @param {string|undefined} font Font.
   * @api
   */


  Text.prototype.setFont = function (font) {
    this.font_ = font;
  };
  /**
   * Set the maximum angle between adjacent characters.
   *
   * @param {number} maxAngle Angle in radians.
   * @api
   */


  Text.prototype.setMaxAngle = function (maxAngle) {
    this.maxAngle_ = maxAngle;
  };
  /**
   * Set the x offset.
   *
   * @param {number} offsetX Horizontal text offset.
   * @api
   */


  Text.prototype.setOffsetX = function (offsetX) {
    this.offsetX_ = offsetX;
  };
  /**
   * Set the y offset.
   *
   * @param {number} offsetY Vertical text offset.
   * @api
   */


  Text.prototype.setOffsetY = function (offsetY) {
    this.offsetY_ = offsetY;
  };
  /**
   * Set the text placement.
   *
   * @param {import("./TextPlacement.js").default|string} placement Placement.
   * @api
   */


  Text.prototype.setPlacement = function (placement) {
    this.placement_ = placement;
  };
  /**
   * Set whether to rotate the text with the view.
   *
   * @param {boolean} rotateWithView Rotate with map.
   * @api
   */


  Text.prototype.setRotateWithView = function (rotateWithView) {
    this.rotateWithView_ = rotateWithView;
  };
  /**
   * Set the fill.
   *
   * @param {import("./Fill.js").default} fill Fill style.
   * @api
   */


  Text.prototype.setFill = function (fill) {
    this.fill_ = fill;
  };
  /**
   * Set the rotation.
   *
   * @param {number|undefined} rotation Rotation.
   * @api
   */


  Text.prototype.setRotation = function (rotation) {
    this.rotation_ = rotation;
  };
  /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size|undefined} scale Scale.
   * @api
   */


  Text.prototype.setScale = function (scale) {
    this.scale_ = scale;
    this.scaleArray_ = (0,_size_js__WEBPACK_IMPORTED_MODULE_0__/* .toSize */ .Pq)(scale !== undefined ? scale : 1);
  };
  /**
   * Set the stroke.
   *
   * @param {import("./Stroke.js").default} stroke Stroke style.
   * @api
   */


  Text.prototype.setStroke = function (stroke) {
    this.stroke_ = stroke;
  };
  /**
   * Set the text.
   *
   * @param {string|undefined} text Text.
   * @api
   */


  Text.prototype.setText = function (text) {
    this.text_ = text;
  };
  /**
   * Set the text alignment.
   *
   * @param {string|undefined} textAlign Text align.
   * @api
   */


  Text.prototype.setTextAlign = function (textAlign) {
    this.textAlign_ = textAlign;
  };
  /**
   * Set the text baseline.
   *
   * @param {string|undefined} textBaseline Text baseline.
   * @api
   */


  Text.prototype.setTextBaseline = function (textBaseline) {
    this.textBaseline_ = textBaseline;
  };
  /**
   * Set the background fill.
   *
   * @param {import("./Fill.js").default} fill Fill style.
   * @api
   */


  Text.prototype.setBackgroundFill = function (fill) {
    this.backgroundFill_ = fill;
  };
  /**
   * Set the background stroke.
   *
   * @param {import("./Stroke.js").default} stroke Stroke style.
   * @api
   */


  Text.prototype.setBackgroundStroke = function (stroke) {
    this.backgroundStroke_ = stroke;
  };
  /**
   * Set the padding (`[top, right, bottom, left]`).
   *
   * @param {!Array<number>} padding Padding.
   * @api
   */


  Text.prototype.setPadding = function (padding) {
    this.padding_ = padding;
  };

  return Text;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Text);

/***/ }),

/***/ 1722:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/style/TextPlacement
 */

/**
 * Text placement. One of `'point'`, `'line'`. Default is `'point'`. Note that
 * `'line'` requires the underlying geometry to be a {@link module:ol/geom/LineString~LineString},
 * {@link module:ol/geom/Polygon~Polygon}, {@link module:ol/geom/MultiLineString~MultiLineString} or
 * {@link module:ol/geom/MultiPolygon~MultiPolygon}.
 * @enum {string}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  POINT: 'point',
  LINE: 'line'
});

/***/ })

}]);