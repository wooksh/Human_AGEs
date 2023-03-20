function initializeGuideEvents() {
    $("#guide-button").on('click', function(event) {
        window.guideObj.show();
        $("#guide-button").attr("disabled", "");
    });
}


export default initializeGuideEvents;