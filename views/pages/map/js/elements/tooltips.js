function initializeTooltips() {
    $('.archeo-tooltip').each(function() {
        let tooltipId = $(this).attr('tooltip-id');
        let text = window.dictionary.tooltips[tooltipId];

        tippy(this, {
            //placement: $(this).attr('data-placement') || 'top',
            content: text,
            interactive: true,
            appendTo: () => document.body
        });
    });

    /* Disable tooltips for selects */
    let $dropdownButt = $('.dropdown-toggle');
    $dropdownButt.tooltip();
    $dropdownButt.tooltip('disable');
}


export default initializeTooltips;