// Global styles
import 'Views/global-styles/_plain-inputs.scss';
import 'Views/global-styles/_colors.scss';

// Styles //
import './css/style.scss';
import './css/footer.scss';

/* Link .pug for assets injetion */
import './index.pug'


$(document).ready( function () {
	/* Calculate browser zoom level */
	$(window).resize(function() { 
		window.browserZoomLevel = window.devicePixelRatio;
	});
	$(window).trigger('resize');

	/* Setup lang property */
	if( ! ArcheoUtilities.exists( document.documentElement.lang ) )
		document.documentElement.lang = 'en';


	/* Global getLang function */
	window.getLang = () => { return document.documentElement.lang };
	
    /* Extend jQuery with exact match selector */
    // e.g. $('p:textEquals("Hello World")');
    //
    // Source: https://stackoverflow.com/questions/15364298/select-element-by-exact-match-of-its-content
    $.expr[':'].textEquals = function(el, i, m) {
        var searchText = m[3];
        var match = $(el).text().trim().match("^" + searchText + "$");
        return match && match.length > 0;
	};

	
	/* Extend String prototype with classical list interpolation  */
	String.prototype.format = function() {
		var interpolated = this;
		for (var i = 0; i < arguments.length; ++i) {
			interpolated = interpolated.replace("{" + i + "}", arguments[i])
		}
		return interpolated
	};


	/*  Extend String prototype with "capitalize" method, that capitalizes first letter */
	String.prototype.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}


	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}
	

	/* Extend Array prototype with "shuffle" method */
	// Durstenfeld shuffle algorithm
	Object.defineProperty(Array.prototype, 'shuffle', {
		value: function() { 
			for (var i = this.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var temp = this[i];
				this[i] = this[j];
				this[j] = temp;
			}

			return this;
		}
	});


	/* Extend Array prototype with "has" method */
	Object.defineProperty(Array.prototype, 'has', {
		value: function(obj) { return this.indexOf(obj) !== -1; }
	});


	/* Extend Array prototype with "sum" method */
	Object.defineProperty(Array.prototype, 'sum', {
		value: function() { return this.reduce((a, b) => a + b, 0); }
	});

	/* Extend Array prototype with "diff" method */
	Object.defineProperty(Array.prototype, 'diff', {
		value: function() { 
			let diff = 0;

			for(let i = 0; i < this.length - 1; ++i)
				diff += this[i] - this[i+1];

			return diff; 
		}
	});

	/* Extend Array prototype with "compNumbers" method */
	Object.defineProperty(Array.prototype, 'compNumbers', {
		value: function(arrayB) { 
			for(let i = 0; i < this.length - 1; ++i)
				if(this[i] != arrayB[i])
					return Math.sign(this[i] - arrayB[i]);

			return 0; 
		}
	});
	
	/* Extend Array prototype with "add" method */
	Object.defineProperty(Array.prototype, 'add', {
		value: function(array2) { return this.map((x, id) => {return x + array2[id]}); }
	});


	/* Extend Array prototype with "mul" method */
	Object.defineProperty(Array.prototype, 'mul', {
		value: function(factor) { return this.map(x => x * factor); }
	});


	/* Extend Array prototype with "div" method */
	Object.defineProperty(Array.prototype, 'div', {
		value: function(factor) { return this.map(x => x / factor); }
	});


	/* Extend Array prototype with "max" method */
	Object.defineProperty(Array.prototype, 'max', {
		value: function() { return Math.max.apply(null, this); }
	});


	/* Extend Array prototype with "min" method */
	Object.defineProperty(Array.prototype, 'min', {
		value: function() { return Math.min.apply(null, this); }
	});


	/* Extend Array prototype with "removeEl" method */
	Object.defineProperty(Array.prototype, 'removeEl', {
		value: function(obj) { 
			let id = this.indexOf(obj);
			if( id !== -1 )
				this.splice(id, 1);  
		}
	});


	/* Extend Array prototype with "removeEl" method */
	Object.defineProperty(Array.prototype, 'remove', {
		value: function(id) { 
			this.splice(id, 1);  
		}
	});


	/* Extend Array prototype with "clone" method */
	Object.defineProperty(Array.prototype, 'clone', {
		value: function() {
			return [...this];  
		}
	});


	/* Extend Array prototype with "getFirst" method */
	Object.defineProperty(Array.prototype, 'getFirst', {
		value: function() {
			return this[0];  
		}
	});


	/* Extend Array prototype with "getLast" method */
	Object.defineProperty(Array.prototype, 'getLast', {
		value: function() {
			return this[this.length - 1];  
		}
	});


	/* Extend Array prototype with "average" method */
	Object.defineProperty(Array.prototype, 'average', {
		value: function() {
			return this.reduce( ( p, c ) => p + c, 0 ) / this.length;
		}
	});


	/* Extend Array prototype with "sortNumbers" method */
	Object.defineProperty(Array.prototype, 'sortNumbers', {
		value: function() {
			return this.sort((a, b) => (a-b));  
		}
	});


	/* Extend Array prototype with "argSortNumbers" method */
	Object.defineProperty(Array.prototype, 'argSortNumbers', {
		value: function() {
			let ids = Array(this.length).fill(0).map((x, y) => x + y);
			let copyArr = this.slice(0);

			let swap = (arr, a, b) => {
				let temp = arr[b];
				arr[b] = arr[a];
				arr[a] = temp;
			}

			var i = 0;
			do {
				for(let k = 0; k < copyArr.length - i; ++k) {
					if(copyArr[k] > copyArr[k+1]) {
						swap(copyArr, k, k+1);
						swap(ids, k, k+1);
					}
				}
				i++;

			} while(i < copyArr.length);

			return ids;
		}
	});

	// [5, 4, 1, 6, 2].argSortNumbers()


	/* Extend Set prototype with "union" method */
	Set.prototype.union = function(setB) {
		var union = new Set(this);
		for (var elem of setB) {
			union.add(elem);
		}
		return union;
	}
	
	/* Extend Set prototype with "difference" method */
	Set.prototype.difference = function(setB) {
		var difference = new Set(this);
		for (var elem of setB) {
			difference.delete(elem);
		}
		return difference;
	}

	/* Extend Set prototype with "equals" method */
	Set.prototype.equals = function(setB) {
		return this.size === setB.size && [...this].every(value => setB.has(value));
	}

	/* Handle LateX refresh on dynamic content */
	$('html').on('show.bs.select changed.bs.select rendered.bs.select', '.bootstrap-select > select', function(e) {
		if(ArcheoUtilities.isValid(window.MathJax))
			window.MathJax.typesetPromise();
	});
	$('html').on('loaded.bs.select', '.bootstrap-select > select', function(e) {
		if(ArcheoUtilities.isValid(window.MathJax))
			window.MathJax.typeset();
	});


	/* Enable selectpicker optgroup html styling */
	$('html').on('shown.bs.select', '.bootstrap-select > select', function(e) {
		/* Apply html to the optgroups labels */
		$('.bootstrap-select .dropdown-header').each(function() {
			if ((this.dataset.unescaped || '1') == '1') {
				let el = $(this);
				el.html(el.text());
				el.attr('data-unescaped', '0');
			}
		});
	});

	/* Enable select button styling */
	$('html').on('changed.bs.select', '.bootstrap-select > select', function(e) {
		/* Find the most inner element of the select's button and apply html */
		$('.bootstrap-select button.dropdown-toggle *:not(:has("*"))').each(function() {
			let el = $(this);
			el.html(el.text());
		});
	});

	/* Enables multilevel dropdown */
	// Source: https://stackoverflow.com/a/61222302
	
	$.fn.dropdown = (function() {
		var $bsDropdown = $.fn.dropdown;
		return function(config) {
			if (typeof config === 'string' && config === 'toggle') { // dropdown toggle trigged
				$('.has-child-dropdown-show').removeClass('has-child-dropdown-show');
				$(this).closest('.dropdown, .dropright').parents('.dropdown, .dropright').addClass('has-child-dropdown-show');
			}
			var ret = $bsDropdown.call($(this), config);

			if( $(this).parent('.dropdown').hasClass('bootstrap-select') === false ) // Fix for bootstrap select module
				$(this).off('click.bs.dropdown'); // Turn off dropdown.js click event, it will call 'this.toggle()' internal
			
			return ret;
		}
	})();
	
	
	$(function() {
		$('html').on('click', '.dropdown [data-toggle="dropdown"]', function(e) {
			$(this).dropdown('toggle');
			e.stopPropagation(); // do not fire dropdown.js click event, it will call 'this.toggle()' internal
		});

		$('html').on('click', '.dropdown .dropdown-item-toggle', function(e) {
			$(this).find('input[type=checkbox]').trigger('click');
			e.stopPropagation(); // do not fire dropdown.js click event, it will call 'this.toggle()' internal
		});

		$('html').on('hide.bs.dropdown', '.dropdown', function(e) {
			if ($(this).is('.has-child-dropdown-show')) {
				$(this).removeClass('has-child-dropdown-show');
				e.preventDefault();
			}
			e.stopPropagation();    // do not need pop in multi level mode
		});

		/*
		$('.dropdown [data-toggle="dropdown"]').on('click', function(e) {
			$(this).dropdown('toggle');
			e.stopPropagation(); // do not fire dropdown.js click event, it will call 'this.toggle()' internal
		});

		$('.dropdown').on('hide.bs.dropdown', function(e) {
			if ($(this).is('.has-child-dropdown-show')) {
				$(this).removeClass('has-child-dropdown-show');
				e.preventDefault();
			}
			e.stopPropagation();    // do not need pop in multi level mode
		});
		*/
	});
});