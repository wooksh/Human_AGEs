$(document).ready(function(){
	
	/******** GLOBALS ********/
	
	var $mutex = false;
	var tile_data = {};
	
	/******** FUNCTION ********/

	function scrollbarSize () {
	  var div = $(
		  '<div class="antiscroll-inner" style="width:50px;height:50px;overflow-y:autp;'
		+ 'position:absolute;top:-200px;left:-200px;"><div style="height:100px;width:100%"/>'
		+ '</div>'
	  );

	  $('body').append(div);
	  var w1 = $(div).innerWidth();
	  var w2 = $('div', div).innerWidth();
	  $(div).remove();

	  return w1 - w2;
	};
	
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

	/* SORTING */
	var ascendingOrder = true;
	var lastSort = null;

	$('#sort-by-name').click( function() {
		$grid.isotope({ 
			sortBy : 'name',
			sortAscending: ascendingOrder,
		});
		lastSort = '#sort-by-name';
	});

	$('#sort-by-surname').click( function() {
		$grid.isotope({ 
			sortBy : 'surname',
			sortAscending: ascendingOrder,
		});
		lastSort = '#sort-by-surname';

	});

	$('#sort-by-role').click( function() {
		$grid.isotope({ 
			sortBy : 'role',
			sortAscending: ascendingOrder,
		});
		lastSort = '#sort-by-role';

	});

	$('#sort-order').click( function() {
		ascendingOrder = !ascendingOrder;
		if(lastSort != null)
			$( lastSort ).trigger( "click" );

		$('#sort-order').find("i").toggleClass('fa-sort-up');
		$('#sort-order').find("i").toggleClass('fa-sort-down');
	});

	function isotopeFiltering(selectedRole, selectedAffiliation) {
		$grid.isotope({ 
			filter: function() {
				var tileRole = $(this).find(".role").text();
				var tileAffiliation = $(this).find(".affiliation").text();
				return (selectedRole == 'Wszystkie' || tileRole == selectedRole) &&
						(selectedAffiliation == 'Wszystkie' || tileAffiliation == selectedAffiliation);
			}
		});
	}

	var selectedRole = "Wszystkie";
	var selectedAffiliation = "Wszystkie";
	
	/* FILTERING */
	$('#filter-by-role select').on('change', function(e) {
		selectedRole = this.options[this.selectedIndex].text;
		isotopeFiltering(selectedRole, selectedAffiliation);
	});

	$('#filter-by-affiliation select').on('change', function(e) {
		selectedAffiliation = this.options[this.selectedIndex].text;
		isotopeFiltering(selectedRole, selectedAffiliation);
	});

	
	var $scrollSize = scrollbarSize();
	$( ".cancel--button" ).each(function(index) {
		var $right = parseInt($( this ).css("right"));
		$( this ).css("right", $right + $scrollSize + "px");
	});

	/// Tile open/close events ///
	$grid.on( 'click', '.grid-item', function() {
		if( $( this ).hasClass( "grid-item--gigante" ) == false && $mutex == false ) {
			$mutex = true;			

			var tile_img_width = $( this ).find(".grid-item--image").find("img").width();
			$( this ).find(".grid-item--image").find("img").css("min-width", tile_img_width + "px");

			/// Opening tile ///
			$( this ).addClass('grid-item--pop');
			$( this ).addClass('grid-item--gigante');

			tile_data.top = $( this ).css("top");
			tile_data.left = $( this ).css("left");
			tile_data.width = $( this ).css("width");
			tile_data.height = $( this ).css("height");
			
			var $html_pos = $(window).scrollTop() - $(".grid").offset().top;
			var $grid_left = $(".grid").offset().left;

			var widthSize = 800;
			var heightSize = 500;
			var docWidth = $(window).width();
			var docHeight = $(window).height();
			var navbarHeight = 56;
			
			$( this ).addClass('popping-in');
			$( this ).animate({
				position: "absolute",
				top: (docHeight / 2) - (heightSize / 2) + $html_pos + "px",
				left: (docWidth / 2) - (widthSize / 2) - $(".grid").offset().left + "px",
				height: heightSize,
				width: widthSize,
			}, 800, 'easeInOutCubic', function() {
				$( this ).removeClass('popping-in');
				$( this ).find(".grid-item--content").fadeIn();
				$( this ).find(".grid-item--image").find("img").css("min-width", "");
			});
			
			$( this ).find(".cancel--button").fadeIn();
			$( this ).find(".grid-item--header").fadeOut();
			$( this ).find(".layer").fadeOut();

			$( this ).find(".scrollable").css("overflow-y", "auto");
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
			}, 800, 'easeInOutCubic', function() {
				$item.removeClass('popping-out');
				$item.removeClass('grid-item--pop');
				$mutex = false;
				$( this ).find(".grid-item--image").find("img").css("max-width", "");

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
