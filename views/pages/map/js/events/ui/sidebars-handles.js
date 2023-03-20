function initializeSidebardsHandlesEvents() {
  $(".sidebar-trigger").click(function() {
    let $sidebarWrapper =  $(this).parent();

    if( $sidebarWrapper.hasClass('left') ) {
      $('#content-wrapper').toggleClass("active-left");
    } 
    else if( $sidebarWrapper.hasClass('right') ) {
      $('#content-wrapper').toggleClass("active-right");
    }

    /* Trigger event for legend positioning fix */
    $sidebarWrapper.one("transitionend webkitTransitionEnd oTransitionEnd", function() {
        ArcheoEvents.broadcast('panel-activated');
    });

    $sidebarWrapper.toggleClass("active");
    $(this).find(".sidebar-arrow").toggleClass("active");
  });
}


export default initializeSidebardsHandlesEvents;