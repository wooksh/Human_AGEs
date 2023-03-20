function initializeStepsEvents() {
    $('.step').on('mouseenter', function(event) { // mouseover
        let $step = $(event.target);
        let imageUrl = $step.attr('img-url');

        let $tile = $step.parents(".grid-item");
        let $tileImage = $tile.find(".tile-image");
        let $stepImage = $tile.find(".step-image");

        $tileImage.addClass('blur');
        $stepImage.css('background-image', `url(${imageUrl})`);
    });

    $('.step').on('reset', function(event) { // mouseover
        let $step = $(event.target);

        let $tile = $step.parents(".grid-item");
        let $tileImage = $tile.find(".tile-image");
        let $stepImage = $tile.find(".step-image");

        $tileImage.removeClass('blur');
        $stepImage.css('background-image', 'none');
    });
}


export default initializeStepsEvents;