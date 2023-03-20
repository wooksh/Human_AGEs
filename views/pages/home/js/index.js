$(document).ready(function(){
	$('.carousel').carousel({
    interval: 7000
  });
  /*
	$("#flipbook").turn({
		autoCenter: true,	
		display: 'double',
		inclination: 50,
		when: {
			turning: function(event, page, pageObject) {
				if(page == 2 || page == 3) { // History
					$('#disciplines-wrapper').removeClass();
					$('#disciplines-wrapper').addClass('studies-historical');
				} else if(page == 4 || page == 5) { // History
					$('#disciplines-wrapper').removeClass();
					$('#disciplines-wrapper').addClass('studies-archeological');
				} else if(page == 6 || page == 7) { // History
					$('#disciplines-wrapper').removeClass();
					$('#disciplines-wrapper').addClass('studies-antropological');
				} else if(page == 8 || page == 9) { // History
					$('#disciplines-wrapper').removeClass();
					$('#disciplines-wrapper').addClass('studies-genetical');
				} else if(page == 10 || page == 11) { // History
					$('#disciplines-wrapper').removeClass();
					$('#disciplines-wrapper').addClass('studies-genomical');
				} else {
					$('#disciplines-wrapper').removeClass();
				}
			}
		}
	});
	*/
});
