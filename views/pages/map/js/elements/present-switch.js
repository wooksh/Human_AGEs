function initializePresentSwitch() {
    let timelineWrapper = $('#timeline-range').parent();
    let irsLineHeight = timelineWrapper.find('.irs-line').height();
    let irsHeight = timelineWrapper.find('.irs-line').parent().height();

    let switchWrapperSelector = $('#present-switch').parent().parent();
    switchWrapperSelector.css('height', timelineWrapper.height() );

    let switchSelector = switchWrapperSelector.find('.toggle');
    let fixCenteringPosition = 2;

    /* Fix positioning */
    switchSelector.css('top', irsHeight - fixCenteringPosition);
    switchSelector.css('height', irsLineHeight);
}


export default initializePresentSwitch;