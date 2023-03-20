/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 924:
/***/ (() => {

$(document).ready(function () {
  /******** GLOBALS ********/
  var $mutex = false;
  var tile_data = {};
  /******** FUNCTION ********/

  function scrollbarSize() {
    var div = $('<div class="antiscroll-inner" style="width:50px;height:50px;overflow-y:autp;' + 'position:absolute;top:-200px;left:-200px;"><div style="height:100px;width:100%"/>' + '</div>');
    $('body').append(div);
    var w1 = $(div).innerWidth();
    var w2 = $('div', div).innerWidth();
    $(div).remove();
    return w1 - w2;
  }

  ;
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
  /* SORTING */

  var ascendingOrder = true;
  var lastSort = null;
  $('#sort-by-name').click(function () {
    $grid.isotope({
      sortBy: 'name',
      sortAscending: ascendingOrder
    });
    lastSort = '#sort-by-name';
  });
  $('#sort-by-surname').click(function () {
    $grid.isotope({
      sortBy: 'surname',
      sortAscending: ascendingOrder
    });
    lastSort = '#sort-by-surname';
  });
  $('#sort-by-role').click(function () {
    $grid.isotope({
      sortBy: 'role',
      sortAscending: ascendingOrder
    });
    lastSort = '#sort-by-role';
  });
  $('#sort-order').click(function () {
    ascendingOrder = !ascendingOrder;
    if (lastSort != null) $(lastSort).trigger("click");
    $('#sort-order').find("i").toggleClass('fa-sort-up');
    $('#sort-order').find("i").toggleClass('fa-sort-down');
  });

  function isotopeFiltering(selectedRole, selectedAffiliation) {
    $grid.isotope({
      filter: function () {
        var tileRole = $(this).find(".role").text();
        var tileAffiliation = $(this).find(".affiliation").text();
        return (selectedRole == 'Wszystkie' || tileRole == selectedRole) && (selectedAffiliation == 'Wszystkie' || tileAffiliation == selectedAffiliation);
      }
    });
  }

  var selectedRole = "Wszystkie";
  var selectedAffiliation = "Wszystkie";
  /* FILTERING */

  $('#filter-by-role select').on('change', function (e) {
    selectedRole = this.options[this.selectedIndex].text;
    isotopeFiltering(selectedRole, selectedAffiliation);
  });
  $('#filter-by-affiliation select').on('change', function (e) {
    selectedAffiliation = this.options[this.selectedIndex].text;
    isotopeFiltering(selectedRole, selectedAffiliation);
  });
  var $scrollSize = scrollbarSize();
  $(".cancel--button").each(function (index) {
    var $right = parseInt($(this).css("right"));
    $(this).css("right", $right + $scrollSize + "px");
  }); /// Tile open/close events ///

  $grid.on('click', '.grid-item', function () {
    if ($(this).hasClass("grid-item--gigante") == false && $mutex == false) {
      $mutex = true;
      var tile_img_width = $(this).find(".grid-item--image").find("img").width();
      $(this).find(".grid-item--image").find("img").css("min-width", tile_img_width + "px"); /// Opening tile ///

      $(this).addClass('grid-item--pop');
      $(this).addClass('grid-item--gigante');
      tile_data.top = $(this).css("top");
      tile_data.left = $(this).css("left");
      tile_data.width = $(this).css("width");
      tile_data.height = $(this).css("height");
      var $html_pos = $(window).scrollTop() - $(".grid").offset().top;
      var $grid_left = $(".grid").offset().left;
      var widthSize = 800;
      var heightSize = 500;
      var docWidth = $(window).width();
      var docHeight = $(window).height();
      var navbarHeight = 56;
      $(this).addClass('popping-in');
      $(this).animate({
        position: "absolute",
        top: docHeight / 2 - heightSize / 2 + $html_pos + "px",
        left: docWidth / 2 - widthSize / 2 - $(".grid").offset().left + "px",
        height: heightSize,
        width: widthSize
      }, 800, 'easeInOutCubic', function () {
        $(this).removeClass('popping-in');
        $(this).find(".grid-item--content").fadeIn();
        $(this).find(".grid-item--image").find("img").css("min-width", "");
      });
      $(this).find(".cancel--button").fadeIn();
      $(this).find(".grid-item--header").fadeOut();
      $(this).find(".layer").fadeOut();
      $(this).find(".scrollable").css("overflow-y", "auto");
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
      }, 800, 'easeInOutCubic', function () {
        $item.removeClass('popping-out');
        $item.removeClass('grid-item--pop');
        $mutex = false;
        $(this).find(".grid-item--image").find("img").css("max-width", "");
        $item.find(".grid-item--header").fadeIn();
        $item.find(".layer").fadeIn();
      });
      $item.find(".scrollable").css("overflow-y", "hidden");
      $item.find(".grid-item--content").fadeOut();
      $item.find(".cancel--button").fadeOut();
      $('html, body').css({
        overflow: 'auto'
      });
    }
  });
});

/***/ }),

/***/ 5570:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cscript defer type=\"text\u002Fjavascript\" src=\"\u002Fjs\u002Fabout.367f7c6d229ae6fc6765.js\"\u003E\u003C\u002Fscript\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 6653:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Clink defer rel=\"stylesheet\" href=\"\u002Fcss\u002Fabout.1cb750f6df2a89a34e3a.css\"\u003E";;return pug_html;};
module.exports = template;

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

/***/ 994:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"mb-5 container-fluid\" id=\"acknowledgments-section\"\u003E\u003Ch1 class=\"mb-4\"\u003EPodziękowania\u003C\u002Fh1\u003E\u003Cp\u003ELorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum odit dolor velit animi ab nemo, minima dolore laborum voluptates nulla optio ut magnam assumenda nisi dignissimos voluptate voluptas distinctio architecto.\u003C\u002Fp\u003E\u003Ch1 class=\"mb-5\"\u003E\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 3047:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"mb-5 mt-5 container-fluid\" id=\"project-section\"\u003E\u003Ch1 class=\"mb-4\"\u003EO projekcie\u003C\u002Fh1\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-md-6\"\u003E\u003Cp\u003ELorem ipsum, dolor sit amet consectetur adipisicing elit. Ea reprehenderit labore deserunt, non perferendis quam impedit corporis vel veniam tempore at perspiciatis? Perspiciatis tempora debitis in saepe quisquam, dolorum veritatis.\u003C\u002Fp\u003E\u003Cp\u003ELorem ipsum, dolor sit amet consectetur adipisicing elit. Ea reprehenderit labore deserunt, non perferendis quam impedit corporis vel veniam tempore at perspiciatis? Perspiciatis tempora debitis in saepe quisquam, dolorum veritatis.\u003C\u002Fp\u003E\u003Cp\u003ELorem ipsum, dolor sit amet consectetur adipisicing elit. Ea reprehenderit labore deserunt, non perferendis quam impedit corporis vel veniam tempore at perspiciatis? Perspiciatis tempora debitis in saepe quisquam, dolorum veritatis.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-md-6\"\u003E\u003Cpicture\u003E\u003Csource srcset=\"https:\u002F\u002Fvia.placeholder.com\u002F400x600\" type=\"image\u002Fpng\"\u003E\u003Cimg class=\"img-fluid\" src=\"https:\u002F\u002Fvia.placeholder.com\u002F400x600\" alt=\"ph\"\u003E\u003C\u002Fpicture\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 7033:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (JSON, descr, dictionary, lang, metadata, pageName) {
      pug_mixins["tile"] = pug_interp = function(size, imgSrc, name, surname, affiliation, degree, role, profession, descr, email, phone){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var fullName = name + " " + surname;
pug_html = pug_html + "\u003Cdiv class=\"grid-sizer\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv" + (pug.attr("class", pug.classes(["grid-item grid-item--width" + size.width + " grid-item--height" + size.height + " " + role], [true]), false, true)) + "\u003E\u003Cdiv class=\"cancel--button\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"layer\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"grid-item--header\"\u003E\u003Ch5\u003E\u003Cspan class=\"name\"\u003E" + (pug.escape(null == (pug_interp = name + " ") ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan class=\"surname\"\u003E" + (pug.escape(null == (pug_interp = surname) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fh5\u003E\u003Ch6 class=\"role\"\u003E" + (pug.escape(null == (pug_interp = role) ? "" : pug_interp)) + "\u003C\u002Fh6\u003E\u003Chr\u003E\u003Ch6 class=\"affiliation\"\u003E" + (pug.escape(null == (pug_interp = affiliation) ? "" : pug_interp)) + "\u003C\u002Fh6\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"scrollable\"\u003E\u003Cdiv class=\"grid-item--image float-left\"\u003E\u003Cimg" + (pug.attr("src", imgSrc, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"grid-item--content float-right\"\u003E\u003Ch4 class=\"content--header\"\u003E" + (pug.escape(null == (pug_interp = fullName) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\u003Ch5 class=\"profession font-italic font-weight-normal\"\u003E" + (pug.escape(null == (pug_interp = profession) ? "" : pug_interp)) + "\u003C\u002Fh5\u003E\u003Chr\u003E\u003Cp class=\"content--text\"\u003E" + (pug.escape(null == (pug_interp = descr) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Chr\u003E\u003Cdiv class=\"contact\"\u003E\u003Cdiv class=\"mail-text\"\u003E\u003Ci class=\"fa fa-envelope\" aria-hidden=\"true\"\u003E\u003C\u002Fi\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = email) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"phone-text\"\u003E\u003Ci class=\"fa fa-phone\" aria-hidden=\"true\"\u003E\u003C\u002Fi\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = phone) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\u003Chtml" + (pug.attr("lang", lang, true, true)) + "\u003E\u003Chead\u003E\u003Cmeta charset=\"utf-8\"\u003E\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"\u003E\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"text\u002Fhtml; charset=utf-8\"\u003E\u003Cmeta name=\"robots\" content=\"noindex\"\u003E\u003Clink rel=\"shortcut icon\" href=\"#\"\u003E\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Ffonts.googleapis.com\u002Ficon?family=Material+Icons\"\u003E\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fbootstrap@4.5.3\u002Fdist\u002Fcss\u002Fbootstrap.min.css\" integrity=\"sha384-TX8t27EcRE3e\u002FihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2\" crossorigin=\"anonymous\"\u003E\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fmalihu-custom-scrollbar-plugin\u002F3.1.5\u002Fjquery.mCustomScrollbar.min.css\" integrity=\"sha256-JHGEmB629pipTkMag9aMaw32I8zle24p3FpsEeI6oZU=\" crossorigin=\"anonymous\"\u003E\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjqueryui\u002F1.12.1\u002Fjquery-ui.min.css\" integrity=\"sha256-rByPlHULObEjJ6XQxW\u002FflG2r+22R5dKiAoef+aXWfik=\" crossorigin=\"anonymous\"\u003E\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fbootstrap-select@1.13.17\u002Fdist\u002Fcss\u002Fbootstrap-select.min.css\" integrity=\"sha256-VMPhaMmJn7coDSbzwqB0jflvb+CDnoAlfStC5RogOQo=\" crossorigin=\"anonymous\"\u003E" + (null == (pug_interp = (__webpack_require__(7520).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(4161).call)(this, locals)) ? "" : pug_interp) + "\u003Cscript\u003Ewindow.metadata = JSON.parse( " + (null == (pug_interp = JSON.stringify(metadata).replace(/<\//g, '<\\/')) ? "" : pug_interp) + " );\nwindow.name = \"" + (null == (pug_interp = pageName.replace(/<\//g, '<\\/')) ? "" : pug_interp) + "\";\nwindow.lang = \"" + (null == (pug_interp = lang.replace(/<\//g, '<\\/')) ? "" : pug_interp) + "\";\nwindow.dictionary = JSON.parse( " + (null == (pug_interp = JSON.stringify(dictionary).replace(/<\//g, '<\\/')) ? "" : pug_interp) + " );\n\u003C\u002Fscript\u003E\u003Clink href=\"css\u002Fabout.css\" rel=\"stylesheet\"\u003E" + (null == (pug_interp = (__webpack_require__(6653).call)(this, locals)) ? "" : pug_interp) + "\u003Ctitle\u003EHuman Archeogenomics\u003C\u002Ftitle\u003E\u003C\u002Fhead\u003E\u003Cbody class=\"loading\"\u003E";
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
pug_html = pug_html + "\u003C\u002Ful\u003E\u003Cul class=\"navbar-nav ml-auto\"\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fnav\u003E\u003Cdiv id=\"loading-page-wrapper\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv id=\"site-wrapper\"\u003E\u003Cmain role=\"main\"\u003E\u003Cdiv id=\"content-wrapper\"\u003E\u003Cdiv id=\"content\"\u003E\u003Cdiv class=\"mb-5 container-fluid\" id=\"team-section\"\u003E\u003Ch1 class=\"mb-4\"\u003ENasz zespół \u003C\u002Fh1\u003E\u003Cdiv class=\"mb-4\"\u003E\u003Ch5 class=\"d-inline font-weight-normal mr-3\"\u003ESortuj\u003C\u002Fh5\u003E\u003Cbutton class=\"btn btn-secondary mr-2\" id=\"sort-order\" type=\"button\"\u003E\u003Ci class=\"fas fa-sort-up\"\u003E\u003C\u002Fi\u003E\u003C\u002Fbutton\u003E\u003Cbutton class=\"btn btn-primary mr-2\" id=\"sort-by-name\" type=\"button\"\u003EImię\u003C\u002Fbutton\u003E\u003Cbutton class=\"btn btn-primary mr-2\" id=\"sort-by-surname\" type=\"button\"\u003ENazwisko\u003C\u002Fbutton\u003E\u003Cbutton class=\"btn btn-primary\" id=\"sort-by-role\" type=\"button\"\u003ERola w zespole\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"row mb-4\"\u003E\u003Ch5 class=\"d-inline font-weight-normal mr-1\"\u003EFiltruj\u003C\u002Fh5\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"content-fluid mb-4\"\u003E\u003Cdiv class=\"grid\"\u003E";
var descr = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi delectus facilis dolorum officiis nemo tempora ad non, aliquid sed similique cupiditate inventore impedit quae odio dolore soluta explicabo nisi laborum?'
pug_mixins["tile"]({width: 1, height: 1}, 'img/adas.png', 'Adam', 'Mickiewicz', 'Rzeczpospolita Polska', 'doktor poezji', 'specjalista', 'poeta', descr, 'adam.mickiewicz@nowogrodek.pl', "+48 017 981 855");
pug_mixins["tile"]({width: 1, height: 1}, 'img/adas.png', 'Adam', 'Mickiewicz', 'Rzeczpospolita Polska', 'doktor poezji', 'specjalista', 'poeta', descr, 'adam.mickiewicz@nowogrodek.pl', "+48 017 981 855");
pug_mixins["tile"]({width: 1, height: 1}, 'img/słowacki.jpg', 'Juliusz', 'Słowacki', 'Rzeczpospolita Polska', 'magister poezji', 'wykonawca', 'poeta', descr, 'juliusz.slowacki@krzemieniec.pl', '+48 018 091 849');
pug_mixins["tile"]({width: 1, height: 1}, 'img/słowacki.jpg', 'Juliusz', 'Słowacki', 'Rzeczpospolita Polska', 'magister poezji', 'wykonawca', 'poeta', descr, 'juliusz.slowacki@krzemieniec.pl', '+48 018 091 849');
pug_mixins["tile"]({width: 1, height: 1}, 'img/adas.png', 'Adam', 'Mickiewicz', 'Rzeczpospolita Polska', 'doktor poezji', 'specjalista', 'poeta', descr, 'adam.mickiewicz@nowogrodek.pl', "+48 017 981 855");
pug_mixins["tile"]({width: 1, height: 1}, 'img/słowacki.jpg', 'Juliusz', 'Słowacki', 'Rzeczpospolita Polska', 'magister poezji', 'wykonawca', 'poeta', descr, 'juliusz.slowacki@krzemieniec.pl', '+48 018 091 849');
pug_mixins["tile"]({width: 1, height: 1}, 'img/chrobry.jpg', 'Bolesław', 'Chrobry', "Królestwo Polskie", 'profesor nauk humanistycznych', 'szef zespołu', 'król', descr, 'boleslaw.chrobry@malopolska.pl', '+48 009 921 025');
pug_mixins["tile"]({width: 1, height: 1}, 'img/chrobry.jpg', 'Bolesław', 'Chrobry', "Królestwo Polskie", 'profesor nauk humanistycznych', 'szef zespołu', 'król', descr, 'boleslaw.chrobry@malopolska.pl', '+48 009 921 025');
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E" + (null == (pug_interp = (__webpack_require__(3047).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(994).call)(this, locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fmain\u003E\u003C\u002Fdiv\u003E" + (null == (pug_interp = (__webpack_require__(539).call)(this, locals)) ? "" : pug_interp) + "\u003Cscript src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjquery\u002F3.3.1\u002Fjquery.min.js\" integrity=\"sha256-FgpCb\u002FKJQlLNfOu91ta32o\u002FNMZxltwRo8QtmkMRdAu8=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript defer src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjquery-easing\u002F1.4.1\u002Fjquery.easing.min.js\" integrity=\"sha256-H3cjtrm\u002FztDeuhCN9I4yh4iN2Ybx\u002Fy1RM7rMmAesA0k=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript defer src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjquery-mousewheel\u002F3.1.13\u002Fjquery.mousewheel.min.js\" integrity=\"sha256-jnOjDTXIPqall8M0MyTSt98JetJuZ7Yu+1Jm7hLTF7U=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript defer src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fmalihu-custom-scrollbar-plugin\u002F3.1.5\u002Fjquery.mCustomScrollbar.min.js\" integrity=\"sha256-AKEjDiK2rz+d8TSPLNVNydvgJvOkG5veMAnc79FkiuE=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript src=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fpopper.js@1.16.1\u002Fdist\u002Fumd\u002Fpopper.min.js\" integrity=\"sha384-9\u002FreFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript src=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fbootstrap@4.5.3\u002Fdist\u002Fjs\u002Fbootstrap.min.js\" integrity=\"sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr\u002FaWKhXdBNmNb5D92v7s\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript defer src=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fjson5@2.1.3\u002Fdist\u002Findex.min.js\" integrity=\"sha256-b6dyH0K\u002FnE4K1\u002Fd36PNAa96t19du7JXpzpcS9K3o4Sg=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript defer src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjqueryui\u002F1.12.1\u002Fjquery-ui.min.js\" integrity=\"sha256-KM512VNnjElC30ehFwehXjx1YCHPiQkOPmqnrWtpccM=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript src=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fbootstrap-select@1.13.17\u002Fdist\u002Fjs\u002Fbootstrap-select.min.js\" integrity=\"sha256-QOE02Glo1C1gHzP96JOaxyIMt4XSFv\u002FexZaYLY4dwO0=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E";
if (lang === 'pl') {
pug_html = pug_html + "\u003Cscript src=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fbootstrap-select@1.13.17\u002Fjs\u002Fi18n\u002Fdefaults-pl_PL.js\" integrity=\"sha256-aWaZCaqYgueDr4CzKzw7FlKCuaoJEwOOM9LJ79aSmlk=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E";
}
pug_html = pug_html + (null == (pug_interp = (__webpack_require__(8785).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(6603).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(3678).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(802).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(1087).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(8635).call)(this, locals)) ? "" : pug_interp) + "\u003Cscript src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjquery.isotope\u002F3.0.6\u002Fisotope.pkgd.min.js\" integrity=\"sha256-CBrpuqrMhXwcLLUd5tvQ4euBHCdh7wGlDfNz8vbu\u002FiI=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E" + (null == (pug_interp = (__webpack_require__(5570).call)(this, locals)) ? "" : pug_interp) + "\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
    }.call(this, "JSON" in locals_for_with ?
        locals_for_with.JSON :
        typeof JSON !== 'undefined' ? JSON : undefined, "descr" in locals_for_with ?
        locals_for_with.descr :
        typeof descr !== 'undefined' ? descr : undefined, "dictionary" in locals_for_with ?
        locals_for_with.dictionary :
        typeof dictionary !== 'undefined' ? dictionary : undefined, "lang" in locals_for_with ?
        locals_for_with.lang :
        typeof lang !== 'undefined' ? lang : undefined, "metadata" in locals_for_with ?
        locals_for_with.metadata :
        typeof metadata !== 'undefined' ? metadata : undefined, "pageName" in locals_for_with ?
        locals_for_with.pageName :
        typeof pageName !== 'undefined' ? pageName : undefined));
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _js_masonrySetup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(924);
/* harmony import */ var _js_masonrySetup_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_masonrySetup_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_pug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7033);
/* harmony import */ var _index_pug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_pug__WEBPACK_IMPORTED_MODULE_1__);
// Styles //
 // Scripts //



/* Link .pug for assets injetion */


})();

/******/ })()
;