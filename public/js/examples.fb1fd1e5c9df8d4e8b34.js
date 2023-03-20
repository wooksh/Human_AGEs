/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 317:
/***/ (() => {

var activeTagsFilters = {};
$(document).ready(function () {
  /******** GLOBALS ********/
  var $mutex = false;
  var tile_data = {};
  /******** FUNCTION ********/

  var ar = new Array(33, 34, 35, 36, 37, 38, 39, 40);
  $(document).keydown(function (e) {
    var key = e.which;

    if ($.inArray(key, ar) > -1 && $mutex == true) {
      e.preventDefault();
      return false;
    }

    return true;
  });
  /******** TILES ********/

  var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
      columnWidth: '.grid-sizer'
    },
    getSortData: {
      name: '.name',
      surname: '.surname',
      role: '.role'
    }
  });

  function isotopeFiltering() {
    $grid.isotope({
      filter: function () {
        if (ArcheoUtilities.isEmpty(activeTagsFilters)) {
          return true;
        } else {
          let $gridEl = $(this);
          let filteringTags = Object.keys(activeTagsFilters);

          for (var i = 0; i < filteringTags.length; ++i) {
            let filterTag = filteringTags[i];
            let isFound = false;
            $gridEl.find('.example-tag').each(function (index) {
              let tagText = $(this).text();
              if (tagText == filterTag) isFound = true;
            });
            if (isFound == false) return false;
          }

          ;
          return true;
        }
      }
    });
  }
  /* FILTERING */


  $('.example-tag-toggle').on('click', function (e) {
    let $button = $(e.target);
    let tagName = $button.text();

    if (!$button.hasClass('active')) {
      activeTagsFilters[tagName] = true;
    } else {
      delete activeTagsFilters[tagName];
    }

    isotopeFiltering();
  }); /// Tile open/close events ///

  $grid.on('click', '.grid-item', function () {
    let $thisGrid = $(this);

    if ($thisGrid.hasClass("grid-item--gigante") == false && $mutex == false) {
      $mutex = true;
      var tile_img_width = $thisGrid.find(".grid-item--image").find("img").width();
      $thisGrid.find(".grid-item--image").find("img").css("min-width", tile_img_width + "px"); /// Opening tile ///

      $thisGrid.addClass('grid-item--pop');
      $thisGrid.addClass('grid-item--gigante');
      tile_data.top = $thisGrid.css("top");
      tile_data.left = $thisGrid.css("left");
      tile_data.width = $thisGrid.css("width");
      tile_data.height = $thisGrid.css("height");
      var $html_pos = $(window).scrollTop() - $(".grid").offset().top;
      var docWidth = $(window).width();
      var docHeight = $(window).height();
      var widthSize = parseInt(docWidth * 0.8);
      var heightSize = parseInt(docHeight * 0.8);
      $thisGrid.addClass('popping-in');
      $thisGrid.animate({
        position: "absolute",
        top: docHeight / 2 - heightSize / 2 + $html_pos + "px",
        left: docWidth / 2 - widthSize / 2 - $(".grid").offset().left + "px",
        height: heightSize,
        width: widthSize
      }, 800, 'easeInOutCubic');
      $thisGrid.find(".grid-item--image").animate({
        width: "60%"
      }, 800, 'easeInOutCubic', function () {
        $thisGrid.removeClass('popping-in');
        $thisGrid.find(".grid-item--content").fadeIn();
        $thisGrid.find(".grid-item--image").find("img").css("min-width", "");
      });
      $thisGrid.find(".cancel--button").fadeIn();
      $thisGrid.find(".grid-item--header").fadeOut();
      $thisGrid.find(".layer").fadeOut(); //$thisGrid.find(".scrollable").css("overflow-y", "auto");

      $('html, body').css({
        overflow: 'hidden'
      });
    }
  });
  $grid.on('click', '.cancel--button', function () {
    var $item = $(this).parent();

    if ($item.hasClass("grid-item--gigante") == true) {
      var tile_img_width = $item.find(".grid-item--image").find("img").width();
      $item.find(".grid-item--image").find("img").css("max-width", tile_img_width + "px"); /// Closing tile ///

      $item.removeClass('grid-item--gigante');
      $(this).find(".scrollable").removeClass('grid-item--gigante');
      $item.addClass('popping-out');
      $item.animate({
        top: tile_data.top,
        left: tile_data.left,
        width: tile_data.width,
        height: tile_data.height
      }, 800, 'easeInOutCubic');
      $item.find(".grid-item--image").animate({
        width: "100%"
      }, 800, 'easeInOutCubic', function () {
        $item.removeClass('popping-out');
        $item.removeClass('grid-item--pop');
        $mutex = false;
        $(this).find(".grid-item--image").find("img").css("max-width", "");
        $item.find(".grid-item--header").fadeIn();
        $item.find(".layer").fadeIn();
      }); //$item.find(".scrollable").css("overflow-y", "hidden");

      $item.find(".grid-item--content").fadeOut();
      $item.find(".cancel--button").fadeOut();
      $item.find('.step').trigger('reset');
      $('html, body').css({
        overflow: 'auto'
      });
    }
  });
});

/***/ }),

/***/ 802:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cscript defer type=\"text\u002Fjavascript\" src=\"\u002Fjs\u002Farcheo_cache.bfc303040cee293a669d.js\"\u003E\u003C\u002Fscript\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 1087:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cscript defer type=\"text\u002Fjavascript\" src=\"\u002Fjs\u002Farcheo_events.60c0eb2f0a6a8095526b.js\"\u003E\u003C\u002Fscript\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 8785:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cscript defer type=\"text\u002Fjavascript\" src=\"\u002Fjs\u002Farcheo_requests.83b8a08e76a8c1bf870c.js\"\u003E\u003C\u002Fscript\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 3678:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cscript defer type=\"text\u002Fjavascript\" src=\"\u002Fjs\u002Farcheo_session.5586379f38ef0b8a0948.js\"\u003E\u003C\u002Fscript\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 6603:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cscript defer type=\"text\u002Fjavascript\" src=\"\u002Fjs\u002Farcheo_utilities.45915d87ae1effb41b41.js\"\u003E\u003C\u002Fscript\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 5544:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cscript defer type=\"text\u002Fjavascript\" src=\"\u002Fjs\u002Fexamples.9a97f2d9e0ab7fe14c15.js\"\u003E\u003C\u002Fscript\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 8263:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Clink defer rel=\"stylesheet\" href=\"\u002Fcss\u002Fexamples.8f1b7e93f17aa104d84c.css\"\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 4161:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Clink defer rel=\"stylesheet\" href=\"\u002Fcss\u002Fmodules.eff6e00d71d50300030c.css\"\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 8635:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cscript defer type=\"text\u002Fjavascript\" src=\"\u002Fjs\u002Ftemplate_basic.bfc201e53652c13ee649.js\"\u003E\u003C\u002Fscript\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 7520:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Clink defer rel=\"stylesheet\" href=\"\u002Fcss\u002Ftemplate_basic.922bf98eeee618b42944.css\"\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 1053:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var tilesData = [{
    "id": "R1a_R1b_heatmap", "image": "/img/examples/R1a_R1b_heatmap/bg.png", "sessionLink": "R1a_R1b_heatmap", 
    "title": "R1a & R1b distribution - heatmap",
    "description": "Here we show an example use-case for heatmap layer type visualization. We have showed a well known distribution of R1a and R1b Y-DNA haplogroups, that divides Europe to the Western and Eastern parts.",
    "content": {
        "tags": ["heatmap", "points", "region clustering", "haplogroups"], "steps": [{
            "image": "/img/examples/R1a_R1b_heatmap/1.jpg", "id": "R1a_R1b_heatmap_1",
            "text": "1. Load blank session to start from scratch."
        },{
            "image": "/img/examples/R1a_R1b_heatmap/2.jpg", "id": "R1a_R1b_heatmap_2",
            "text": "2. We are going to work on Allen Ancient DNA Resource v54.1.p1 data source, so please select it."
        },{
            "image": "/img/examples/R1a_R1b_heatmap/3.jpg", "id": "R1a_R1b_heatmap_3",
            "text": "3. Fetch a dataset with determined R1a Y-DNA haplogroup and with location in the Europe. To do that, use query builder."
        },{
            "image": "/img/examples/R1a_R1b_heatmap/4.jpg", "id": "R1a_R1b_heatmap_4",
            "text": "4. Do the same for R1b haplogroup. You may want to change names of the datasets for convenience."
        },{
            "image": "/img/examples/R1a_R1b_heatmap/5.jpg", "id": "R1a_R1b_heatmap_5",
            "text": "5. Because the datasets differ in the samples count and we want would like only to compare the spatial distributions, one quick way to solve this is to use sampling option. To even both datasets we have sampled 36.6% of the R1b dataset. Another way would be using \"Data weight\" settings of the map layer."
        },{
            "image": "/img/examples/R1a_R1b_heatmap/6.jpg", "id": "R1a_R1b_heatmap_6",
            "text": "6. Create a new map layer. Set it to use the R1a haplogroup dataset and set it to appear as a heatmap. You may also change the name of the layer correspondingly, as well as play with the appearance settings to make the layer more appealing. We have changed the color and the radius and blur of heatmap.<br>You can investigate all the applied changes and values later on while manually exploring this session's settings."
        },{
            "image": "/img/examples/R1a_R1b_heatmap/7.jpg", "id": "R1a_R1b_heatmap_7",
            "text": "7. Next use the clone button to create another heatmap. For the new layer, change the dataset to R1b one and apply different color for the heatmap. Don't forget to change the layer name."
        },{
            "image": "/img/examples/R1a_R1b_heatmap/8.jpg", "id": "R1a_R1b_heatmap_8",
            "text": "8. To create labels we have cloned both layers and changed their type to points. We have also hid the body of points leaving only samples counts and we position R1b dataset labels layer to the bottom to declutter data."
        },{
            "image": "/img/examples/R1a_R1b_heatmap/9.jpg", "id": "R1a_R1b_heatmap_9",
            "text": "9. In the end, we have changed clustering settings to regional and distance clustering. We have adjusted the clustering distance to properly declutter the samples without big reduction of data location resolution."
        },
        {
            "image": "/img/examples/R1a_R1b_heatmap/10.jpg", "id": "R1a_R1b_heatmap_10",
            "text": "10. For readability, we have also filtered out all regions except Europe. This leaves us with thick border drawn on the map that clearly indicates, that this is the only region we are focusing on in our visual analysis."
        }]
    }
},{
    "id": "period", "image": "/img/examples/Periods/bg.png", "sessionLink": "periods", 
    "title": "Comparsion of periods",
    "description": "Here we show that is is possible to visualize changes of spatio-temporal distribution and composition of the samples attributes on a single map view, so without manipulating the timeline position. We have prepared an example presenting comparsion of three arbitrary chosen time periods.",
    "content": {
        "tags": ["piecharts", "multiple periods", "region clustering", "haplogroups"], "steps": [{
            "image": "/img/examples/Periods/1.jpg", "id": "Periods_1",
            "text": "1. Load blank session to start from scratch."
        },{
            "image": "/img/examples/Periods/2.jpg", "id": "Periods_2",
            "text": "2. We are going to work on Allen Ancient DNA Resource v54.1.p1 data source, so please select it."
        },{
            "image": "/img/examples/Periods/3.jpg", "id": "Periods_3",
            "text": "3. Fetch a dataset of archeogenomic samples dated to originate from 6000&nbsp;BC&nbsp;&#8211;&nbsp;3500&nbsp;BC time period. Do the same for the 3500&nbsp;BC&nbsp;&#8211;&nbsp;0 and 0&nbsp;&#8211;&nbsp;1000&nbsp;AD periods. You may want to change names of the datasets for convenience."
        },{
            "image": "/img/examples/Periods/4.jpg", "id": "Periods_4",
            "text": "4. Create a new map layer and set it to use the 6000&nbsp;BC&nbsp;&#8211;&nbsp;3500&nbsp;BC dataset. Also change the layer type to piecharts, attribute to haplogroup Y and name the layer properly."
        },{
            "image": "/img/examples/Periods/5.jpg", "id": "Periods_5",
            "text": "5. This time, we want the layer to indicate which dataset it presents by using labels, not colors. To achieve that, head on to the layer appearance settings. Then, turn on the \"show layer name\" option and turn off the \"show layer color\"."
        },{
            "image": "/img/examples/Periods/6.jpg", "id": "Periods_6",
            "text": "6. To make comparsion of periods more readable, we have limited the data presentation resolution to the whole regions by using clustering with UN subregions collection and turning off the distance clustering."
        },{
            "image": "/img/examples/Periods/7.jpg", "id": "Periods_7",
            "text": "7. Time to add data of the remaing periods to the map. To quickly do that, you can clone twice the created map layer and change the dataset option of the newly created clones."
        },{
            "image": "/img/examples/Periods/8.jpg", "id": "Periods_8",
            "text": "8. Since the layers' data points share the same position of the region centroid, you can declutter them by setting different rotation angle around their position. For readability, you can remove the cluster pointers for the extreme periods in the layer appearance options."
        },{
            "image": "/img/examples/Periods/9.jpg", "id": "Periods_9",
            "text": "9. Even after taking all these steps, it is hard to analyse the haplogroup data as a whole. We recommend you to always limit the visual analysis to a samller subset of attribute values. Here, for example we have performed automatic clustering of the Y-DNA haplogroups by grouping them to the name of their parent haplogroup positioned at a given tree level. You can also perform manual clustering and further filtering of the haplogroups if you want."
        }]
    }
},{
    "id": "admixtures", "image": "/img/examples/admixtures/bg.png", "sessionLink": "admixtures", 
    "title": "Distribution of admixtures",
    "description": "Here we wanted to investigate, whether is it possible to correlate given admixture analysis components to any distinct geographical location or human population. To do that, we have visualized spatial distribution of the samples with high genomic affinity to any of the admixture components. We created this example for admixture k=7 analysis.",
    "content": {
        "tags": ["piecharts", "distance clustering", "admixture"], "steps": [{
            "image": "/img/examples/admixtures/1.jpg", "id": "admixtures_1",
            "text": "1. Load blank session to start from scratch."
        },{
            "image": "/img/examples/admixtures/2.jpg", "id": "admixtures_2",
            "text": "2. We are going to work on Allen Ancient DNA Resource v54.1.p1 data source, so please select it."
        },{
            "image": "/img/examples/admixtures/3.jpg", "id": "admixtures_3",
            "text": "3. To obtain samples with highly homogenic admixture composition we have queried for samples with affinity higher than 80% (with exception for component #6, as there are no such samples) to any of the admixture components. That was done in relation to the results of admixture k=7 analysis. To prepare the query, we have created a list of statements for every component and we joined them with OR operation."
        },{
            "image": "/img/examples/admixtures/4.jpg", "id": "admixtures_4",
            "text": "4. Next we have created a map layer and set it to display the newly created dataset samples in a form of piecharts."
        },{
            "image": "/img/examples/admixtures/5.jpg", "id": "admixtures_5",
            "text": "5. For readability, we have removed the boundary color by using corresponding option in a layer appearance section."
        },{
            "image": "/img/examples/admixtures/6.jpg", "id": "admixtures_6",
            "text": "6. We have also disabled grouping attributes of low frequency to the OTHER special group. Moreover, we have adjusted features size range and data weight options to distinguish clusters with higher samples count by making them bigger."
        },{
            "image": "/img/examples/admixtures/7.jpg", "id": "admixtures_7",
            "text": "7. At the end, we have changed the basemap appearance setting, to make manually picked colors of the admixture components more visible."
        }]
    }
},{
    "id": "tags", "image": "/img/examples/tags/bg.png", "sessionLink": "tags", 
    "title": "Males with Y-DNA and mt-DNA haplogroups determined",
    "description": "Analysing samples' haplogroups on a map can be difficult, as there are many unique values to present at the same time. To make it easier, you can use tags cloud layer type, which enables to analyse both haplogroup composition of the samples cluster as well as their counts proportions. We have also showed here an example of presenting several attributes of the same samples at once. We have visualized Y-DNA and mt-DNA haplogroups of the males that have had determined both of them.",
    "content": {
        "tags": ["tags", "points", "distance clustering", "haplogroups", "multiple attributes"], "steps": [{
            "image": "/img/examples/tags/1.jpg", "id": "tags_1",
            "text": "1. Load blank session to start from scratch."
        },{
            "image": "/img/examples/tags/2.jpg", "id": "tags_2",
            "text": "2. We are going to work on Allen Ancient DNA Resource v54.1.p1 data source, so please select it."
        },{
            "image": "/img/examples/tags/3.jpg", "id": "tags_3",
            "text": "3. Create a query for samples which have had determined both Y-DNA and mt-DNA haplogroups."
        },{
            "image": "/img/examples/tags/4.jpg", "id": "tags_4",
            "text": "4. Then create a new map layer and set it's dataset to the one previously fetched from Human AGEs database. Also, set it's layer type to tags and choose haplogroup Y as an attribute to present."
        },{
            "image": "/img/examples/tags/5.jpg", "id": "tags_5",
            "text": "5. You may play a bit with features size, layer appearance and tags appearance settings until you are satisfied with the results. Don't forget to name you layer."
        },{
            "image": "/img/examples/tags/6.jpg", "id": "tags_6",
            "text": "6. Next, clone the layer and change the presented attribute to mt-DNA haplogroup. Also, change the color, layer name and try to reposition both layers, so the tag clouds are close to each other, but they do not overlap much."
        },{
            "image": "/img/examples/tags/7.jpg", "id": "tags_7",
            "text": "7. Because both tag clouds present information on the same samples, the data weight normalization and scaling options won't be necessary, so we disabled it."
        },{
            "image": "/img/examples/tags/8.jpg", "id": "tags_8",
            "text": "8. At the end we have created a third layer to present common information for both tag clouds about samples count. To do that, we have cloned one of the layers, changed it's type to points, we have enabled showing weight as a value and we have adjusted the layer appearance as position, to make it appear simplistic and next to the both tag clouds."
        },{
            "image": "/img/examples/tags/9.jpg", "id": "tags_9",
            "text": "9. Additionally, you can adjust a distance of the clustering, to declutter the map."
        }]
    }
},{
    "id": "cultures", "image": "/img/examples/cultures/bg.png", "sessionLink": "cultures", 
    "title": "Admixture values for samples laying in the range of Epigravettian culture",
    "description": "Here we show an example of visualization and clustering by archeological cultures. For simplicity, we have limited the visual analysis to Epigravettian culture and we have showed the distribution of samples among it and their genomic admixture composition. You can manipulate the timeline to see how the genomic composition changed in time for the region of Epigravettian culture occurence.",
    "content": {
        "tags": ["cultures", "piecharts", "admixture", "distance clustering", "region clustering"], "steps": [{
            "image": "/img/examples/cultures/1.jpg", "id": "cultures_1",
            "text": "1. Load blank session to start from scratch."
        },{
            "image": "/img/examples/cultures/2.jpg", "id": "cultures_2",
            "text": "2. We are going to work on Allen Ancient DNA Resource v54.1.p1 data source, so please select it."
        },{
            "image": "/img/examples/cultures/3.jpg", "id": "cultures_3",
            "text": "3. Fetch the samples that are localized in the region of Epigravettian or Late Epigravettian culture occurence."
        },{
            "image": "/img/examples/cultures/4.jpg", "id": "cultures_4",
            "text": "4. Create a new map layer and set it for the loaded dataset, piechart layer type and admixture k=7 attributes."
        },{
            "image": "/img/examples/cultures/5.jpg", "id": "cultures_5",
            "text": "5. Apart from distance clustering, set on clustering by archeological cultures regions."
        },{
            "image": "/img/examples/cultures/6.jpg", "id": "cultures_6",
            "text": "6. Filter out all cultures except for Epigravettian and Late Epigravettian."
        },{
            "image": "/img/examples/cultures/7.jpg", "id": "cultures_7",
            "text": "7. You may now adjust appearance of the culture regions (by clicking their symbols on the map legend) and the map layer to you liking."
        },{
            "image": "/img/examples/cultures/8.jpg", "id": "cultures_8",
            "text": "8. To better visualize physiogeographical context of the culture spatial occurence, we have changed the basemap to Imagery."
        }]
    }
},{
    "id": "past_present", "image": "/img/examples/past_present/bg.png", "sessionLink": "past_present", 
    "description": "Here we show an example of presenting data from multiple data sources at the same time. For this purpose we have used archeogenomic data from Allen Ancient DNA Resource v54.1.p1 data source and contemporary genomic data from the EMPOP mt-DNA v4/R13 data source. You can use the timeline to explore how the regional distribution of the mt-DNA haplogroups changed to meet the state that we see today.",
    "title": "Comparsion of past and contemporary times data of mt-DNA haplogroup distribution",
    "content": {
        "tags": ["piecharts", "region clustering", "multiple periods"], "steps": [{
            "image": "/img/examples/past_present/1.jpg", "id": "past_present_1",
            "text": "1. Load blank session to start from scratch."
        },{
            "image": "/img/examples/past_present/2.jpg", "id": "past_present_2",
            "text": "2. First, we are going to fetch data from Allen Ancient DNA Resource v54.1.p1 data source, so please select it."
        },{
            "image": "/img/examples/past_present/3.jpg", "id": "past_present_3",
            "text": "3. Query for a dataset that consists of samples with determined mt-DNA haplogroup."
        },{
            "image": "/img/examples/past_present/4.jpg", "id": "past_present_4",
            "text": "4. Second, switch to the EMPOP mt-DNA v4/R13 data source."
        },{
            "image": "/img/examples/past_present/5.jpg", "id": "past_present_5",
            "text": "5. Fetch whole data source. After a dataset is loaded, sample it down to 25%. It is a big data source, thus without sampling it would take a lot of time to show up on the map. When you are done working on the map and layers appearance, you can switch back sampling to 100%."
        },{
            "image": "/img/examples/past_present/6.jpg", "id": "past_present_6",
            "text": "6. Before we create map layers, please change the clustering options to region clustring by UN subregions and disable distance clustering. This way we can normalize the spatial distributuon of the different data sources clusters, as they will show up at the region centroid."
        },{
            "image": "/img/examples/past_present/7.jpg", "id": "past_present_7",
            "text": "7. Create a new piechart layer and set it for Allen Ancient DNA Resource and mt-DNA haplogroup."
        },{
            "image": "/img/examples/past_present/8.jpg", "id": "past_present_8",
            "text": "8. Do the same for the EMPOP data source. Please be patient, as it may take some time."
        },{
            "image": "/img/examples/past_present/9.jpg", "id": "past_present_9",
            "text": "9. Next, you may want to adjust both layers appearance, to make them distinguishable from each other and to make them appear next to each other."
        },{
             "image": "/img/examples/past_present/10.jpg", "id": "past_present_10",
            "text": "10. For the last thing, may want to limit the number of visualized haplogroups for easier analysis. We have permormed manual clustering to U, J, Y and X parental haplogroups by grouping together samples that contain any descendant mt-DNA haplogroup."
        }]
    }
}];;return pug_html;};
module.exports = template;

/***/ }),

/***/ 2276:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (JSON, Object, addSpinner, dictionary, exampleId, lang, metadata, newPage, pageName, spinnerText, tilesData, toString) {
      































pug_mixins["custom-button-link"] = pug_interp = function(link, text, iconName = null, newPage=false){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cbutton" + (pug.attrs(pug.merge([{"class": "btn custom-button","type": "button"},attributes]), true)) + "\u003E";
if (addSpinner === true) {
pug_html = pug_html + "\u003Cspan class=\"loading-button-wrapper\"\u003E\u003Cspan class=\"label\"\u003E" + (pug.escape(null == (pug_interp = spinnerText) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan class=\"spinner-grow\" role=\"status\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003Cspan class=\"button-content\"\u003E";
if (newPage) {
pug_html = pug_html + "\u003Ca" + (" class=\"label\""+pug.attr("href", link, true, true)+" target=\"_blank\"") + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"label\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
if (iconName !== null) {
pug_html = pug_html + "\u003Ci class=\"material-icons\"\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fi\u003E";
}
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
};








pug_mixins["dropdown-element"] = pug_interp = function(elId, val){
var block = (this && this.block), attributes = (this && this.attributes) || {};
if (val.constructor === Object) {
if (val.isHeader) {
pug_html = pug_html + "\u003Ch6 class=\"dropdown-header\"\u003E" + (pug.escape(null == (pug_interp = val.name) ? "" : pug_interp)) + "\u003C\u002Fh6\u003E";
}
else
if (val.isDivider) {
pug_html = pug_html + "\u003Cdiv class=\"dropdown-divider\"\u003E\u003C\u002Fdiv\u003E";
}
else
if (val.isSubmenu) {
pug_html = pug_html + "\u003Cdiv class=\"dropright dropdown-item\"\u003E\u003Cdiv class=\"dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"\u003E" + (pug.escape(null == (pug_interp = val.name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv" + (" class=\"dropdown-menu\""+pug.attr("id", elId, true, true)+" aria-labelledby=\"dropdown-submenu\"") + "\u003E";
// iterate val.options
;(function(){
  var $$obj = val.options;
  if ('number' == typeof $$obj.length) {
      for (var subKey = 0, $$l = $$obj.length; subKey < $$l; subKey++) {
        var subVal = $$obj[subKey];
if (subVal.constructor === Object) {
if (subVal.isHeader) {
pug_html = pug_html + "\u003Ch6 class=\"dropdown-header\"\u003E" + (pug.escape(null == (pug_interp = subVal.name) ? "" : pug_interp)) + "\u003C\u002Fh6\u003E";
}
else
if (subVal.isDivider) {
pug_html = pug_html + "\u003Cdiv class=\"dropdown-divider\"\u003E\u003C\u002Fdiv\u003E";
}
else
if (subVal.isToggle) {
pug_html = pug_html + "\u003Cdiv class=\"icon-checkbox-wrapper dropdown-item-toggle\"\u003E\u003Cbutton" + (pug.attr("class", pug.classes(["form-check-input","btn","icon-checkbox",`${subVal.class}`], [false,false,false,true]), false, true)+pug.attr("id", subKey, true, true)+" data-toggle=\"button\""+pug.attr("aria-pressed", toString(subVal.isActive), true, true)+" autocomplete=\"off\" title=\"\""+pug.attr("toggle-target", subVal["toggle-target"], true, true)+pug.attr("option-name", subVal["option-name"], true, true)) + "\u003E\u003Ci class=\"material-icons\"\u003E\u003C\u002Fi\u003E\u003C\u002Fbutton\u003E\u003Clabel" + (pug.attr("class", pug.classes(["form-check-label",subVal.class], [false,true]), false, true)+pug.attr("for", subKey, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subVal.name) ? "" : pug_interp)) + "\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes(["dropdown-item",subVal.class], [false,true]), false, true)+pug.attr("id", subKey, true, true)+" type=\"button\"") + "\u003E" + (pug.escape(null == (pug_interp = subVal.name) ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E";
}
}
else {
pug_html = pug_html + "\u003Cbutton" + (" class=\"dropdown-item\""+pug.attr("id", subKey, true, true)+" type=\"button\"") + "\u003E" + (pug.escape(null == (pug_interp = subVal) ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E";
}
      }
  } else {
    var $$l = 0;
    for (var subKey in $$obj) {
      $$l++;
      var subVal = $$obj[subKey];
if (subVal.constructor === Object) {
if (subVal.isHeader) {
pug_html = pug_html + "\u003Ch6 class=\"dropdown-header\"\u003E" + (pug.escape(null == (pug_interp = subVal.name) ? "" : pug_interp)) + "\u003C\u002Fh6\u003E";
}
else
if (subVal.isDivider) {
pug_html = pug_html + "\u003Cdiv class=\"dropdown-divider\"\u003E\u003C\u002Fdiv\u003E";
}
else
if (subVal.isToggle) {
pug_html = pug_html + "\u003Cdiv class=\"icon-checkbox-wrapper dropdown-item-toggle\"\u003E\u003Cbutton" + (pug.attr("class", pug.classes(["form-check-input","btn","icon-checkbox",`${subVal.class}`], [false,false,false,true]), false, true)+pug.attr("id", subKey, true, true)+" data-toggle=\"button\""+pug.attr("aria-pressed", toString(subVal.isActive), true, true)+" autocomplete=\"off\" title=\"\""+pug.attr("toggle-target", subVal["toggle-target"], true, true)+pug.attr("option-name", subVal["option-name"], true, true)) + "\u003E\u003Ci class=\"material-icons\"\u003E\u003C\u002Fi\u003E\u003C\u002Fbutton\u003E\u003Clabel" + (pug.attr("class", pug.classes(["form-check-label",subVal.class], [false,true]), false, true)+pug.attr("for", subKey, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subVal.name) ? "" : pug_interp)) + "\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes(["dropdown-item",subVal.class], [false,true]), false, true)+pug.attr("id", subKey, true, true)+" type=\"button\"") + "\u003E" + (pug.escape(null == (pug_interp = subVal.name) ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E";
}
}
else {
pug_html = pug_html + "\u003Cbutton" + (" class=\"dropdown-item\""+pug.attr("id", subKey, true, true)+" type=\"button\"") + "\u003E" + (pug.escape(null == (pug_interp = subVal) ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E";
}
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes(["dropdown-item",val.class], [false,true]), false, true)+pug.attr("id", elId, true, true)+" type=\"button\"") + "\u003E" + (pug.escape(null == (pug_interp = val.name) ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E";
}
}
else {
pug_html = pug_html + "\u003Cbutton" + (" class=\"dropdown-item\""+pug.attr("id", elId, true, true)+" type=\"button\"") + "\u003E" + (pug.escape(null == (pug_interp = val) ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E";
}
};


































pug_mixins["tile"] = pug_interp = function(id, imgSrc, sessionLink, title, description, content = {steps: [], tags: []}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cdiv class=\"grid-sizer\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv" + (" class=\"grid-item\""+pug.attr("id", id, true, true)) + "\u003E\u003Cdiv class=\"cancel--button\"\u003E\u003Ci class=\"material-icons\"\u003Eclose\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"layer\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"grid-item--header\"\u003E\u003Ch5\u003E\u003Cspan class=\"title\"\u003E" + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fh5\u003E\u003Chr\u003E\u003Ch6 class=\"tags\"\u003E";
// iterate content.tags
;(function(){
  var $$obj = content.tags;
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var tag = $$obj[pug_index3];
pug_html = pug_html + "\u003Cspan class=\"example-tag badge badge-primary mr-2\"\u003E" + (pug.escape(null == (pug_interp = tag) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var tag = $$obj[pug_index3];
pug_html = pug_html + "\u003Cspan class=\"example-tag badge badge-primary mr-2\"\u003E" + (pug.escape(null == (pug_interp = tag) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fh6\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"grid-item--image d-inline-block\"\u003E\u003Cdiv" + (" class=\"position-absolute top-0 start-0 tile-image\""+pug.attr("img-url", imgSrc, true, true)+pug.attr("style", pug.style("background-image: url(" + imgSrc + ")"), true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"position-absolute top-0 start-0 w-100 h-100\" style=\"padding: 8%;\"\u003E\u003Cdiv class=\"step-image\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cspan class=\"grid-item--content\"\u003E\u003Cdiv class=\"header\"\u003E\u003Ch4 class=\"content--header\"\u003E" + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\u003Cdiv class=\"mt-2\"\u003E";
// iterate content.tags
;(function(){
  var $$obj = content.tags;
  if ('number' == typeof $$obj.length) {
      for (var pug_index4 = 0, $$l = $$obj.length; pug_index4 < $$l; pug_index4++) {
        var tag = $$obj[pug_index4];
pug_html = pug_html + "\u003Cspan class=\"badge badge-primary mr-2\"\u003E" + (pug.escape(null == (pug_interp = tag) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index4 in $$obj) {
      $$l++;
      var tag = $$obj[pug_index4];
pug_html = pug_html + "\u003Cspan class=\"badge badge-primary mr-2\"\u003E" + (pug.escape(null == (pug_interp = tag) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"content\"\u003E\u003Ci class=\"text-color-dark-faded mb-1\"\u003EHover over a step to see an instruction image.\u003C\u002Fi\u003E\u003Chr\u003E\u003Cdiv class=\"scrollable\"\u003E\u003Cp class=\"description\"\u003E" + (pug.escape(null == (pug_interp = description) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
// iterate content.steps 
;(function(){
  var $$obj = content.steps ;
  if ('number' == typeof $$obj.length) {
      for (var pug_index5 = 0, $$l = $$obj.length; pug_index5 < $$l; pug_index5++) {
        var step = $$obj[pug_index5];
pug_html = pug_html + "\u003Cp" + (" class=\"step content--text\""+pug.attr("id", step.id, true, true)+pug.attr("img-url", step.image, true, true)) + "\u003E" + (null == (pug_interp = step.text) ? "" : pug_interp) + "\u003C\u002Fp\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index5 in $$obj) {
      $$l++;
      var step = $$obj[pug_index5];
pug_html = pug_html + "\u003Cp" + (" class=\"step content--text\""+pug.attr("id", step.id, true, true)+pug.attr("img-url", step.image, true, true)) + "\u003E" + (null == (pug_interp = step.text) ? "" : pug_interp) + "\u003C\u002Fp\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"options\"\u003E";
pug_mixins["custom-button-link"].call({
attributes: {"class": "palette-tertiary no-focus mb-0"}
}, "/en/map?example=" + sessionLink, 'Open example', 'map', newPage=true);
pug_mixins["custom-button-link"].call({
attributes: {"class": "palette-tertiary no-focus mb-0"}
}, "/en/examples?id=" + sessionLink, '</Link>', null);
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
};
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\u003Chtml" + (pug.attr("lang", lang, true, true)) + "\u003E\u003Chead\u003E\u003Cmeta charset=\"utf-8\"\u003E\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"\u003E\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"text\u002Fhtml; charset=utf-8\"\u003E\u003Cmeta name=\"robots\" content=\"noindex\"\u003E\u003Clink rel=\"shortcut icon\" href=\"#\"\u003E\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Ffonts.googleapis.com\u002Ficon?family=Material+Icons\"\u003E\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fbootstrap@4.5.3\u002Fdist\u002Fcss\u002Fbootstrap.min.css\" integrity=\"sha384-TX8t27EcRE3e\u002FihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2\" crossorigin=\"anonymous\"\u003E\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fmalihu-custom-scrollbar-plugin\u002F3.1.5\u002Fjquery.mCustomScrollbar.min.css\" integrity=\"sha256-JHGEmB629pipTkMag9aMaw32I8zle24p3FpsEeI6oZU=\" crossorigin=\"anonymous\"\u003E\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjqueryui\u002F1.12.1\u002Fjquery-ui.min.css\" integrity=\"sha256-rByPlHULObEjJ6XQxW\u002FflG2r+22R5dKiAoef+aXWfik=\" crossorigin=\"anonymous\"\u003E\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fbootstrap-select@1.13.17\u002Fdist\u002Fcss\u002Fbootstrap-select.min.css\" integrity=\"sha256-VMPhaMmJn7coDSbzwqB0jflvb+CDnoAlfStC5RogOQo=\" crossorigin=\"anonymous\"\u003E" + (null == (pug_interp = (__webpack_require__(7520).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(4161).call)(this, locals)) ? "" : pug_interp) + "\u003Cscript\u003Ewindow.metadata = JSON.parse( " + (null == (pug_interp = JSON.stringify(metadata).replace(/<\//g, '<\\/')) ? "" : pug_interp) + " );\nwindow.name = \"" + (null == (pug_interp = pageName.replace(/<\//g, '<\\/')) ? "" : pug_interp) + "\";\nwindow.lang = \"" + (null == (pug_interp = lang.replace(/<\//g, '<\\/')) ? "" : pug_interp) + "\";\nwindow.dictionary = JSON.parse( " + (null == (pug_interp = JSON.stringify(dictionary).replace(/<\//g, '<\\/')) ? "" : pug_interp) + " );\n\u003C\u002Fscript\u003E" + (null == (pug_interp = (__webpack_require__(8263).call)(this, locals)) ? "" : pug_interp) + "\u003Cscript\u003Ewindow.exampleId = \"" + (null == (pug_interp = exampleId) ? "" : pug_interp) + "\";\n\n\u003C\u002Fscript\u003E\u003Ctitle\u003EHuman Archeogenomics\u003C\u002Ftitle\u003E\u003C\u002Fhead\u003E\u003Cbody class=\"loading\"\u003E";
pug_mixins["nav-item"] = pug_interp = function(lang, ref, name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
if (ref === pageName) {
pug_html = pug_html + "\u003Cli" + (pug.attrs(pug.merge([{"class": "nav-item active"},attributes]), true)) + "\u003E\u003Ca" + (" class=\"nav-link\""+pug.attr("href", "/" + lang + "/" + ref, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003Cspan class=\"sr-only\"\u003E(current)\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
else {
pug_html = pug_html + "\u003Cli" + (pug.attrs(pug.merge([{"class": "nav-item"},attributes]), true)) + "\u003E\u003Ca" + (" class=\"nav-link\""+pug.attr("href", "/" + lang + "/" + ref, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
};
pug_mixins["nav-dropdown-item"] = pug_interp = function(lang, ref, name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
if (ref === pageName) {
pug_html = pug_html + "\u003Ca" + (" class=\"dropdown-item\""+pug.attr("href", "/" + lang + "/" + ref, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"dropdown-item\""+pug.attr("href", "/" + lang + "/" + ref, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
};
pug_html = pug_html + "\u003Cnav class=\"navbar navbar-expand-md navbar-dark bg-dark fixed-top px-3\"\u003E\u003Ca" + (" class=\"navbar-brand\""+pug.attr("href", `/${lang}/home`, true, true)) + "\u003EArcheogenomics.eu&nbsp;&nbsp;|&nbsp;&nbsp;Human AGEs\u003C\u002Fa\u003E\u003Cbutton class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbar-wrapper\" aria-controls=\"#navbar-wrapper\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"\u003E\u003Cspan class=\"navbar-toggler-icon\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003Cdiv class=\"collapse navbar-collapse\" id=\"navbar-wrapper\"\u003E\u003Cul class=\"navbar-nav mr-auto\"\u003E";
pug_mixins["nav-item"].call({
attributes: {"class": "mx-2"}
}, lang, `home`, "Main page");
pug_html = pug_html + "\u003Cli class=\"nav-item dropdown\"\u003E\u003Cdiv class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"\u003EApplications\u003C\u002Fdiv\u003E\u003Cdiv class=\"dropdown-menu bg-dark\" aria-labelledby=\"navbar-browse\"\u003E";
pug_mixins["nav-dropdown-item"](lang, `map`, "Interactive map");
pug_mixins["nav-dropdown-item"](lang, `plot`, "Interactive plot");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E\u003Cli class=\"nav-item dropdown\"\u003E\u003Cdiv class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"\u003EHelp\u003C\u002Fdiv\u003E\u003Cdiv class=\"dropdown-menu bg-dark\" aria-labelledby=\"navbar-browse\"\u003E";
pug_mixins["nav-dropdown-item"](lang, "examples", "Examples");
pug_mixins["nav-dropdown-item"](lang, "faq", "FAQ");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
pug_mixins["nav-item"].call({
attributes: {"class": "mx-2"}
}, lang, `contact`, "Contact");
pug_html = pug_html + "\u003C\u002Ful\u003E\u003Cul class=\"navbar-nav ml-auto\"\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fnav\u003E\u003Cdiv id=\"loading-page-wrapper\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv id=\"site-wrapper\"\u003E\u003Cmain role=\"main\"\u003E" + (null == (pug_interp = (__webpack_require__(1053).call)(this, locals)) ? "" : pug_interp) + "\u003Cdiv id=\"content-wrapper\"\u003E\u003Cdiv id=\"content\"\u003E\u003Cdiv class=\"mb-5 container-fluid\" id=\"team-section\"\u003E\u003Ch1 class=\"mb-4\"\u003EExamples\u003C\u002Fh1\u003E\u003Cdiv class=\"mb-4\"\u003E\u003Ch5 class=\"d-inline font-weight-normal mr-3\"\u003EFilter by\u003C\u002Fh5\u003E\u003Cdiv class=\"examples-filters\"\u003E\u003Cspan class=\"tags\"\u003E";
// iterate ["heatmap", "points", "piecharts", "tags", "distance clustering", "region clustering", "cultures", "haplogroups", "admixture", "multiple periods", "multiple attributes"]
;(function(){
  var $$obj = ["heatmap", "points", "piecharts", "tags", "distance clustering", "region clustering", "cultures", "haplogroups", "admixture", "multiple periods", "multiple attributes"];
  if ('number' == typeof $$obj.length) {
      for (var pug_index6 = 0, $$l = $$obj.length; pug_index6 < $$l; pug_index6++) {
        var tag = $$obj[pug_index6];
pug_html = pug_html + "\u003Cbutton class=\"example-tag-toggle btn btn-primary mr-2\" type=\"button\" data-toggle=\"button\" aria-pressed=\"false\" autocomplete=\"off\"\u003E" + (pug.escape(null == (pug_interp = tag) ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index6 in $$obj) {
      $$l++;
      var tag = $$obj[pug_index6];
pug_html = pug_html + "\u003Cbutton class=\"example-tag-toggle btn btn-primary mr-2\" type=\"button\" data-toggle=\"button\" aria-pressed=\"false\" autocomplete=\"off\"\u003E" + (pug.escape(null == (pug_interp = tag) ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"content-fluid mb-4\"\u003E\u003Cdiv class=\"grid\"\u003E";
var descr = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi delectus facilis dolorum officiis nemo tempora ad non, aliquid sed similique cupiditate inventore impedit quae odio dolore soluta explicabo nisi laborum?'
// iterate tilesData
;(function(){
  var $$obj = tilesData;
  if ('number' == typeof $$obj.length) {
      for (var pug_index7 = 0, $$l = $$obj.length; pug_index7 < $$l; pug_index7++) {
        var tileData = $$obj[pug_index7];
pug_mixins["tile"](tileData.id, tileData.image, tileData.sessionLink, tileData.title, tileData.description, tileData.content);
      }
  } else {
    var $$l = 0;
    for (var pug_index7 in $$obj) {
      $$l++;
      var tileData = $$obj[pug_index7];
pug_mixins["tile"](tileData.id, tileData.image, tileData.sessionLink, tileData.title, tileData.description, tileData.content);
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fmain\u003E\u003C\u002Fdiv\u003E" + (null == (pug_interp = (__webpack_require__(539).call)(this, locals)) ? "" : pug_interp) + "\u003Cscript src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjquery\u002F3.3.1\u002Fjquery.min.js\" integrity=\"sha256-FgpCb\u002FKJQlLNfOu91ta32o\u002FNMZxltwRo8QtmkMRdAu8=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript defer src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjquery-easing\u002F1.4.1\u002Fjquery.easing.min.js\" integrity=\"sha256-H3cjtrm\u002FztDeuhCN9I4yh4iN2Ybx\u002Fy1RM7rMmAesA0k=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript defer src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjquery-mousewheel\u002F3.1.13\u002Fjquery.mousewheel.min.js\" integrity=\"sha256-jnOjDTXIPqall8M0MyTSt98JetJuZ7Yu+1Jm7hLTF7U=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript defer src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fmalihu-custom-scrollbar-plugin\u002F3.1.5\u002Fjquery.mCustomScrollbar.min.js\" integrity=\"sha256-AKEjDiK2rz+d8TSPLNVNydvgJvOkG5veMAnc79FkiuE=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript src=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fpopper.js@1.16.1\u002Fdist\u002Fumd\u002Fpopper.min.js\" integrity=\"sha384-9\u002FreFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript src=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fbootstrap@4.5.3\u002Fdist\u002Fjs\u002Fbootstrap.min.js\" integrity=\"sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr\u002FaWKhXdBNmNb5D92v7s\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript defer src=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fjson5@2.1.3\u002Fdist\u002Findex.min.js\" integrity=\"sha256-b6dyH0K\u002FnE4K1\u002Fd36PNAa96t19du7JXpzpcS9K3o4Sg=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript defer src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjqueryui\u002F1.12.1\u002Fjquery-ui.min.js\" integrity=\"sha256-KM512VNnjElC30ehFwehXjx1YCHPiQkOPmqnrWtpccM=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript src=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fbootstrap-select@1.13.17\u002Fdist\u002Fjs\u002Fbootstrap-select.min.js\" integrity=\"sha256-QOE02Glo1C1gHzP96JOaxyIMt4XSFv\u002FexZaYLY4dwO0=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E";
if (lang === 'pl') {
pug_html = pug_html + "\u003Cscript src=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fbootstrap-select@1.13.17\u002Fjs\u002Fi18n\u002Fdefaults-pl_PL.js\" integrity=\"sha256-aWaZCaqYgueDr4CzKzw7FlKCuaoJEwOOM9LJ79aSmlk=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E";
}
pug_html = pug_html + (null == (pug_interp = (__webpack_require__(8785).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(6603).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(3678).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(802).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(1087).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(8635).call)(this, locals)) ? "" : pug_interp) + "\u003Cscript src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjquery.isotope\u002F3.0.6\u002Fisotope.pkgd.min.js\" integrity=\"sha256-CBrpuqrMhXwcLLUd5tvQ4euBHCdh7wGlDfNz8vbu\u002FiI=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E" + (null == (pug_interp = (__webpack_require__(5544).call)(this, locals)) ? "" : pug_interp) + "\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
    }.call(this, "JSON" in locals_for_with ?
        locals_for_with.JSON :
        typeof JSON !== 'undefined' ? JSON : undefined, "Object" in locals_for_with ?
        locals_for_with.Object :
        typeof Object !== 'undefined' ? Object : undefined, "addSpinner" in locals_for_with ?
        locals_for_with.addSpinner :
        typeof addSpinner !== 'undefined' ? addSpinner : undefined, "dictionary" in locals_for_with ?
        locals_for_with.dictionary :
        typeof dictionary !== 'undefined' ? dictionary : undefined, "exampleId" in locals_for_with ?
        locals_for_with.exampleId :
        typeof exampleId !== 'undefined' ? exampleId : undefined, "lang" in locals_for_with ?
        locals_for_with.lang :
        typeof lang !== 'undefined' ? lang : undefined, "metadata" in locals_for_with ?
        locals_for_with.metadata :
        typeof metadata !== 'undefined' ? metadata : undefined, "newPage" in locals_for_with ?
        locals_for_with.newPage :
        typeof newPage !== 'undefined' ? newPage : undefined, "pageName" in locals_for_with ?
        locals_for_with.pageName :
        typeof pageName !== 'undefined' ? pageName : undefined, "spinnerText" in locals_for_with ?
        locals_for_with.spinnerText :
        typeof spinnerText !== 'undefined' ? spinnerText : undefined, "tilesData" in locals_for_with ?
        locals_for_with.tilesData :
        typeof tilesData !== 'undefined' ? tilesData : undefined, "toString" in locals_for_with ?
        locals_for_with.toString :
        typeof toString !== 'undefined' ? toString : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),

/***/ 539:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (Date) {
      pug_html = pug_html + "\u003Cfooter\u003E\u003Cp\u003EInstitute of Bioorganic Chemistry Polish Academy of Sciences, " + (pug.escape(null == (pug_interp = new Date().getFullYear()) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Ffooter\u003E";
    }.call(this, "Date" in locals_for_with ?
        locals_for_with.Date :
        typeof Date !== 'undefined' ? Date : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),

/***/ 7055:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      valA = valA && valA[valA.length - 1] !== ';' ? valA + ';' : valA;
      var valB = pug_style(b[key]);
      valB = valB && valB[valB.length - 1] !== ';' ? valB + ';' : valB;
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
}

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '',
    className,
    padding = '',
    escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '',
    padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    return val + '';
  }
}

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (
    val === false ||
    val == null ||
    (!val && (key === 'class' || key === 'style'))
  ) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  var type = typeof val;
  if (
    (type === 'object' || type === 'function') &&
    typeof val.toJSON === 'function'
  ) {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + "='" + val.replace(/'/g, '&#39;') + "'";
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse) {
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
}

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html) {
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34:
        escape = '&quot;';
        break;
      case 38:
        escape = '&amp;';
        break;
      case 60:
        escape = '&lt;';
        break;
      case 62:
        escape = '&gt;';
        break;
      default:
        continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
}

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str) {
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  var context, lines, start, end;
  try {
    str = str || (__webpack_require__(7835).readFileSync)(filename, {encoding: 'utf8'});
    context = 3;
    lines = str.split('\n');
    start = Math.max(lineno - context, 0);
    end = Math.min(lines.length, lineno + context);
  } catch (ex) {
    err.message +=
      ' - could not read from ' + filename + ' (' + ex.message + ')';
    pug_rethrow(err, null, lineno);
    return;
  }

  // Error context
  context = lines
    .slice(start, end)
    .map(function(line, i) {
      var curr = i + start + 1;
      return (curr == lineno ? '  > ' : '    ') + curr + '| ' + line;
    })
    .join('\n');

  // Alter exception message
  err.path = filename;
  try {
    err.message =
      (filename || 'Pug') +
      ':' +
      lineno +
      '\n' +
      context +
      '\n\n' +
      err.message;
  } catch (e) {}
  throw err;
}


/***/ }),

/***/ 7835:
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./views/pages/examples/css/style.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const style = ({"palette_primary_color":"#13446f","palette_primary_color_light":"#26537a","palette_primary_color_lightest":"#c5d1dc","palette_primary_color_dark":"#113d64","palette_primary_color_darkest":"#0d304e","palette_secondary_color":"#ffad42","palette_secondary_color_darker":"#d4861f","palette_tertiary_color_light":"#afafaf","palette_tertiary_color_lightest":"#ddd","palette_tertiary_color_lighter":"#cecece","palette_tertiary_color":"#474747","palette_tertiary_color_dark":"#2c2c2c","palette_tertiary_color_darker":"#222","palette_tertiary_color_darkest":"#141414","text_color_light":"#e6e6e6","text_color_dark":"#222","text_color_dark_faded":"#646464","background_color_light":"#eee","background_color_lightest":"#f7f7f7","present_time_color_array_string":"119,0,255,1","text_color_light_faded":"#d2d2d2"});
;// CONCATENATED MODULE: ./views/mixins-pug/custom-button/style.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const custom_button_style = ({"palette_primary_color":"#13446f","palette_primary_color_light":"#26537a","palette_primary_color_lightest":"#c5d1dc","palette_primary_color_dark":"#113d64","palette_primary_color_darkest":"#0d304e","palette_secondary_color":"#ffad42","palette_secondary_color_darker":"#d4861f","palette_tertiary_color_light":"#afafaf","palette_tertiary_color_lightest":"#ddd","palette_tertiary_color_lighter":"#cecece","palette_tertiary_color":"#474747","palette_tertiary_color_dark":"#2c2c2c","palette_tertiary_color_darker":"#222","palette_tertiary_color_darkest":"#141414","text_color_light":"#e6e6e6","text_color_dark":"#222","text_color_dark_faded":"#646464","background_color_light":"#eee","background_color_lightest":"#f7f7f7","present_time_color_array_string":"119,0,255,1","text_color_light_faded":"#d2d2d2"});
// EXTERNAL MODULE: ./views/pages/examples/js/masonrySetup.js
var masonrySetup = __webpack_require__(317);
;// CONCATENATED MODULE: ./views/pages/examples/js/step.js
function initializeStepsEvents() {
  $('.step').on('mouseenter', function (event) {
    // mouseover
    let $step = $(event.target);
    let imageUrl = $step.attr('img-url');
    let $tile = $step.parents(".grid-item");
    let $tileImage = $tile.find(".tile-image");
    let $stepImage = $tile.find(".step-image");
    $tileImage.addClass('blur');
    $stepImage.css('background-image', `url(${imageUrl})`);
  });
  $('.step').on('reset', function (event) {
    // mouseover
    let $step = $(event.target);
    let $tile = $step.parents(".grid-item");
    let $tileImage = $tile.find(".tile-image");
    let $stepImage = $tile.find(".step-image");
    $tileImage.removeClass('blur');
    $stepImage.css('background-image', 'none');
  });
}

/* harmony default export */ const step = (initializeStepsEvents);
// EXTERNAL MODULE: ./views/pages/examples/index.pug
var examples = __webpack_require__(2276);
;// CONCATENATED MODULE: ./views/pages/examples/app.js
// Styles //

 // Scripts //




/* Link .pug for assets injetion */


$(document).ready(function () {
  if (ArcheoUtilities.isValidNonEmptyString(exampleId)) {
    $(`#${exampleId}`).trigger('click');
  }

  ArcheoUtilities.setContentLoaded('#loading-page-wrapper', 'body');
  step();
});
})();

/******/ })()
;