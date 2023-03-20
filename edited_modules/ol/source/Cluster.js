/**
 * @module ol/source/Cluster
 */

import EventType from '../events/EventType.js';
import Feature from '../Feature.js';
import GeometryType from '../geom/GeometryType.js';
import Point from '../geom/Point.js';
import VectorSource from './Vector.js';
import {add as addCoordinate, scale as scaleCoordinate} from '../coordinate.js';
import {assert} from '../asserts.js';
import {
  buffer,
  createEmpty,
  createOrUpdateFromCoordinate,
  getCenter,
  getIntersection
} from '../extent.js';
import {getUid} from '../util.js';

/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [distance=20] Distance in pixels within which features will
 * be clustered together.
 * @property {number} [minDistance=0] Minimum distance in pixels between clusters.
 * Will be capped at the configured distance.
 * By default no minimum distance is guaranteed. This config can be used to avoid
 * overlapping icons. As a tradoff, the cluster feature's position will no longer be
 * the center of all its features.
 * @property {function(Feature):Point} [geometryFunction]
 * Function that takes an {@link module:ol/Feature} as argument and returns an
 * {@link module:ol/geom/Point} as cluster calculation point for the feature. When a
 * feature should not be considered for clustering, the function should return
 * `null`. The default, which works when the underlying source contains point
 * features only, is
 * ```js
 * function(feature) {
 *   return feature.getGeometry();
 * }
 * ```
 * See {@link module:ol/geom/Polygon~Polygon#getInteriorPoint} for a way to get a cluster
 * calculation point for polygons.
 * @property {function(Point, Array<Feature>):Feature} [createCluster]
 * Function that takes the cluster's center {@link module:ol/geom/Point} and an array
 * of {@link module:ol/Feature} included in this cluster. Must return a
 * {@link module:ol/Feature} that will be used to render. Default implementation is:
 * ```js
 * function(point, features) {
 *   return new Feature({
 *     geometry: point,
 *     features: features
 *   });
 * }
 * ```
 * @property {VectorSource} [source] Source.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 */

/**
 * @classdesc
 * Layer source to cluster vector data. Works out of the box with point
 * geometries. For other geometry types, or if not all geometries should be
 * considered for clustering, a custom `geometryFunction` can be defined.
 *
 * If the instance is disposed without also disposing the underlying
 * source `setSource(null)` has to be called to remove the listener reference
 * from the wrapped source.
 * @api
 */
class Cluster extends VectorSource {
  /**
   * @param {Options} options Cluster options.
   */
  constructor(options) {
    super({
      attributions: options.attributions,
      wrapX: options.wrapX,
    });

    /**
     * @type {number|undefined}
     * @protected
     */
    this.resolution = undefined;

    /**
     * @type {number}
     * @protected
     */
    this.distance = options.distance !== undefined ? options.distance : 20;

    /**
     * @type {number}
     * @protected
     */
    this.minDistance = options.minDistance || 0;

    /**
     * @type {number}
     * @protected
     */
    this.interpolationRatio = 0;

    /**
     * @type {Array<Feature>}
     * @protected
     */
    this.features = [];

    /**
     * @param {Feature} feature Feature.
     * @return {Point} Cluster calculation point.
     * @protected
     */
    this.geometryFunction =
      options.geometryFunction ||
      function (feature) {
        const geometry = feature.getGeometry();
        assert(geometry.getType() == GeometryType.POINT, 10); // The default `geometryFunction` can only handle `Point` geometries
        return geometry;
      };

    /**
     * @type {function(Point, Array<Feature>):Feature}
     * @private
     */
    this.createCustomCluster_ = options.createCluster;

    /**
     * @type {VectorSource}
     * @protected
     */
    this.source = null;

    this.boundRefresh_ = this.refresh.bind(this);

    this.updateDistance(this.distance, this.minDistance);
    this.setSource(options.source || null);
  }

  /**
   * Remove all features from the source.
   * @param {boolean} [opt_fast] Skip dispatching of {@link module:ol/source/Vector.VectorSourceEvent#removefeature} events.
   * @api
   */
  clear(opt_fast) {
    //this.features.length = 0;
    let data = this.features;
    this.features = [];

    /* Free bounded data */
    new Promise((resolution, rejection) => {
      for(var i = 0; i < data.length; ++i) { 
        /* Free convex hull memory */   
        let hull = data[i].get("convexHull");
        let source = ArcheoMap.getRegionsLayer().getSource();
        if(ArcheoUtilities.isValid(hull) && source.hasFeature(hull))
          source.removeFeature(hull);
        data[i].unset("convexHull");
      }

      resolution(true);
    });
    
    super.clear(opt_fast);
  }

  /**
   * Get the distance in pixels between clusters.
   * @return {number} Distance.
   * @api
   */
  getDistance() {
    return this.distance;
  }

  /**
   * Get a reference to the wrapped source.
   * @return {VectorSource} Source.
   * @api
   */
  getSource() {
    return this.source;
  }

  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */
  loadFeatures(extent, resolution, projection) {
    this.source.loadFeatures(extent, resolution, projection);
    if (resolution !== this.resolution) {
      this.resolution = resolution;
      this.refresh();
    }
  }

  /**
   * Set the distance within which features will be clusterd together.
   * @param {number} distance The distance in pixels.
   * @api
   */
  setDistance(distance) {
    this.updateDistance(distance, this.minDistance);
  }

  /**
   * Set the minimum distance between clusters. Will be capped at the
   * configured distance.
   * @param {number} minDistance The minimum distance in pixels.
   * @api
   */
  setMinDistance(minDistance) {
    this.updateDistance(this.distance, minDistance);
  }

  /**
   * The configured minimum distance between clusters.
   * @return {number} The minimum distance in pixels.
   * @api
   */
  getMinDistance() {
    return this.minDistance;
  }

  /**
   * Replace the wrapped source.
   * @param {VectorSource} source The new source for this instance.
   * @api
   */
  setSource(source) {
    if (this.source) {
      this.source.removeEventListener(EventType.CHANGE, this.boundRefresh_);
    }
    this.source = source;
    if (source) {
      source.addEventListener(EventType.CHANGE, this.boundRefresh_);
    }
    this.refresh();
  }

  /**
   * Handle the source changing.
   */
  refresh() {
    // settings.layer.getSource().clear();
    /*let labelsLayer = ArcheoMap.getMapSelectDraggableLayer();

    this.features.forEach((f) => {
      let labels = f.get('labels');
      if(ArcheoUtilities.isValid(labels)) {
        labels.forEach((label) => {
          labelsLayer.getSource().removeFeature(label);
        });
      }
    });*/

    this.clear();
    this.cluster();
    this.addFeatures(this.features);
  }

  /**
   * Update the distances and refresh the source if necessary.
   * @param {number} distance The new distance.
   * @param {number} minDistance The new minimum distance.
   */
  updateDistance(distance, minDistance) {
    const ratio = minDistance;
      //distance === 0 ? 0 : Math.min(minDistance, distance) / distance;
    const changed =
      distance !== this.distance || this.interpolationRatio !== ratio;
    this.distance = distance;
    this.minDistance = minDistance;
    this.interpolationRatio = ratio;
    if (changed) {
      this.refresh();
    }
  }

  /**
   * @protected
   */


  cluster() {
    if (this.resolution === undefined || !this.source) {
        return;
    }

    /* Cache */
    let geometryCache = {};

    var theCluster = this;

    let regionsDict = ArcheoMap.getMapRegions();

    var strategyConfig = ArcheoSession.get().clustering.features; 

    var isHeatmap = this.source.get('isHeatmap');

    var mapDistance = 0;
    var isClusteringByRegion = ArcheoUtilities.isValidNonEmptyString( strategyConfig.method.region );
    var isClusteringByDistance = ArcheoUtilities.isValidNonEmptyString(strategyConfig.method.distance);

    let mapScaleFactor = ArcheoMap.getMapScaleFactor();

    if( strategyConfig.method.distance === 'relative' )
        mapDistance = this.distance * this.resolution * mapScaleFactor;
    else if( strategyConfig.method.distance === 'absolute' )
        mapDistance = this.distance * 1000;
    else if( isClusteringByRegion )
        mapDistance = Infinity;

    //newLayer.oldcluster

    var features = this.source.getFeatures();//.filter((feature) => this.geometryFunction(feature) !== false);
    /**
      * @type {!Object<string, boolean>}
      */
    var clustered = {};


    /* Fix for heatmap visualisation without clustering */
    if((mapDistance === 0 || mapDistance === Infinity) && isHeatmap === true) {
      for(var i = 0; i < features.length; ++i) {
        let featureUid = getUid(f);
        if(!(featureUid in geometryCache))
          geometryCache[featureUid] = this.geometryFunction(f);

        if( geometryCache[featureUid] )
          this.createCluster([f],  geometryCache[featureUid].getCoordinates());
      } 
    } else {
      for (var i = 0; i < features.length; ++i) {
          var feature = features[i];
          var featureUid = getUid(feature);
          var extent = createEmpty();

          if(!(featureUid in clustered)) {
              //var geometry = feature.getGeometry();
              if(!(featureUid in geometryCache))
                geometryCache[featureUid] = this.geometryFunction(feature);

              var featureRegionId = ArcheoMap.getFeatureRegionId(feature);

              if(geometryCache[featureUid] !== false) {
                  var neighbors = [];

                  var positionInfo = {
                    centroid: [0,0],
                    addedCoordinatesCount: 0
                  };

                  let coordinates = geometryCache[featureUid].getCoordinates();

                  /* Cluster all together */  
                  if(mapDistance === Infinity) {
                      neighbors = features;
                      createOrUpdateFromCoordinate(coordinates, extent);

                      if(isClusteringByRegion && featureRegionId in regionsDict) {
                        let regionExtent = regionsDict[featureRegionId].extent;

                        if( ArcheoUtilities.isValid(regionExtent))
                          extent = regionExtent;
                        else /* Case for 'world' region */
                          buffer(extent, Infinity, extent);
                      }
                  } 
                  /* Get candidates for clustering */
                  else {
                      createOrUpdateFromCoordinate(coordinates, extent);
                      buffer(extent, mapDistance, extent);

                      // regionsDict
                      if(isClusteringByRegion && featureRegionId in regionsDict) {
                        let regionExtent = regionsDict[featureRegionId].extent;
                        if( ArcheoUtilities.isValid(regionExtent))
                          getIntersection(extent, regionExtent, extent);
                      }
                  }

                  neighbors = this.source.getFeaturesInExtentForClustering(extent, 
                    clustered, positionInfo, geometryCache, this, featureRegionId, isClusteringByRegion);
                  
                  if(neighbors.length > 0) {

                    /* Use region centroid aquired from the database */
                    if(strategyConfig.useCentroids && isClusteringByRegion && !isClusteringByDistance) { //featureRegionId in regionsDict) {
                      positionInfo.centroid = regionsDict[featureRegionId].centroid;
                    } else {
                      scaleCoordinate(positionInfo.centroid, 1 / positionInfo.addedCoordinatesCount);
                    }

                    this.features.push(this.createCluster(neighbors, positionInfo.centroid, extent));
                    //this.features.push(this.createCluster(neighbors, coordinates, extent));
                  }
              }
          }
      }
    }
  }

  /**
   * @param {Array<Feature>} features Features
   * @param {import("../extent.js").Extent} extent The searched extent for these features.
   * @return {Feature} The cluster feature.
   * @protected
   */

    createCluster(features, centroid, extent = null) {
      /* If regions data is available */
      var strategyConfig = ArcheoSession.get().clustering.features;
      var isClusteringByDistance = ArcheoUtilities.isValidNonEmptyString(strategyConfig.method.distance);
      var regionId = ArcheoMap.getFeatureRegionId(features[0]);
      var geometry;
      const searchCenter = getCenter(extent);

      //else {
        if( isClusteringByDistance ) {
          
          const ratio = this.interpolationRatio;
          geometry = new Point([
            centroid[0] * (1 - ratio) + searchCenter[0] * ratio,
            centroid[1] * (1 - ratio) + searchCenter[1] * ratio
          ]);
        } else {
          geometry = new Point(centroid);
        }
      //}

      var cluster;

      if (this.createCustomCluster_) {
        cluster = this.createCustomCluster_(geometry, features);
      } else {
        cluster = new Feature({
          geometry,
          features,
        });
      }

      cluster.set('features', features);
      cluster.set('layerId', this.get('layerId'));
      cluster.set('originalPosition', geometry.getCoordinates());
      cluster.set('regionId', regionId);

      return cluster;
  };
}

export default Cluster;
