var activeTagsFilters = {};


$(document).ready(function(){
	
	/******** GLOBALS ********/
	
	var $mutex = false;
	var tile_data = {};
	
	/******** FUNCTION ********/
	
	var ar = new Array(33,34,35,36,37,38,39,40);

	$(document).keydown(function(e) {
		var key = e.which;
			if($.inArray(key,ar) > -1 && $mutex == true) {
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
			role: '.role',
		},
	});

	function isotopeFiltering() {
		$grid.isotope({ 
			filter: function() {
				if( ArcheoUtilities.isEmpty(activeTagsFilters) ) {
					return true;
				}
				else {
					let $gridEl = $(this);
					let filteringTags = Object.keys(activeTagsFilters);				

					for(var i = 0; i < filteringTags.length; ++i) {
						let filterTag = filteringTags[i];
						let isFound = false;
						$gridEl.find('.example-tag').each(function(index) {
							let tagText = $(this).text();

							if(tagText == filterTag)
								isFound = true;
						})

						if(isFound == false)
							return false;
					};

					return true;
				}
			}
		});
	}

	/* FILTERING */
	$('.example-tag-toggle').on('click', function(e) {
		let $button = $(e.target);
		let tagName = $button.text();

		if( ! $button.hasClass('active') ) {
			activeTagsFilters[tagName] = true;
		}
		else {
			delete activeTagsFilters[tagName];
		}

		isotopeFiltering();
	});

	/// Tile open/close events ///
	$grid.on( 'click', '.grid-item', function() {
		let $thisGrid = $(this);
		if( $thisGrid.hasClass( "grid-item--gigante" ) == false && $mutex == false ) {
			$mutex = true;			

			var tile_img_width = $thisGrid.find(".grid-item--image").find("img").width();
			$thisGrid.find(".grid-item--image").find("img").css("min-width", tile_img_width + "px");

			/// Opening tile ///
			$thisGrid.addClass('grid-item--pop');
			$thisGrid.addClass('grid-item--gigante');

			tile_data.top = $thisGrid.css("top");
			tile_data.left = $thisGrid.css("left");
			tile_data.width = $thisGrid.css("width");
			tile_data.height = $thisGrid.css("height");
			
			var $html_pos = $(window).scrollTop() - $(".grid").offset().top;

			var docWidth = $(window).width();
			var docHeight = $(window).height();
			var widthSize = parseInt(docWidth*0.8);
			var heightSize = parseInt(docHeight*0.8);
			
			$thisGrid.addClass('popping-in');
			$thisGrid.animate({
				position: "absolute",
				top: (docHeight / 2) - (heightSize / 2) + $html_pos + "px",
				left: (docWidth / 2) - (widthSize / 2) - $(".grid").offset().left + "px",
				height: heightSize,
				width: widthSize,
			}, 800, 'easeInOutCubic');

			$thisGrid.find(".grid-item--image").animate({
				width: "60%"
			}, 800, 'easeInOutCubic', function() {
				$thisGrid.removeClass('popping-in');
				$thisGrid.find(".grid-item--content").fadeIn();
				$thisGrid.find(".grid-item--image").find("img").css("min-width", "");
			});
			
			$thisGrid.find(".cancel--button").fadeIn();
			$thisGrid.find(".grid-item--header").fadeOut();
			$thisGrid.find(".layer").fadeOut();

			//$thisGrid.find(".scrollable").css("overflow-y", "auto");
			$('html, body').css({
				overflow: 'hidden'
			});			
		}
	});
	
	$grid.on( 'click', '.cancel--button', function() {
		var $item = $( this ).parent();
		if( $item.hasClass( "grid-item--gigante" ) == true ) {

			var tile_img_width = $item.find(".grid-item--image").find("img").width();
			$item.find(".grid-item--image").find("img").css("max-width", tile_img_width + "px");

			/// Closing tile ///
			$item.removeClass('grid-item--gigante');
			$( this ).find(".scrollable").removeClass('grid-item--gigante');
			
			$item.addClass('popping-out');
			$item.animate({
				top: tile_data.top,
				left: tile_data.left,
				width: tile_data.width,
				height: tile_data.height
			}, 800, 'easeInOutCubic');

			$item.find(".grid-item--image").animate({
				width: "100%"
			}, 800, 'easeInOutCubic', function() {
				$item.removeClass('popping-out');
				$item.removeClass('grid-item--pop');
				$mutex = false;
				$( this ).find(".grid-item--image").find("img").css("max-width", "");

				$item.find(".grid-item--header").fadeIn();
				$item.find(".layer").fadeIn();
			});
			
			//$item.find(".scrollable").css("overflow-y", "hidden");
			$item.find(".grid-item--content").fadeOut();
			$item.find(".cancel--button").fadeOut();

			$item.find('.step').trigger('reset');
			
			$('html, body').css({
				overflow: 'auto'
			});	
		}
	});
	
});
