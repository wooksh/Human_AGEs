function initializeResetCoordinatesButton() {
    let $restoreButt = $('#coordinates-restore');
    let defaultZoom = ArcheoSession.get().map.zoom;

    $restoreButt.on('click', function(event) {
        let coordinates = [
            window.entityFeature.coordinates.longitude,
            window.entityFeature.coordinates.latitude
        ];

        let currentView = ArcheoMap.getMap().getView();

        coordinates = ArcheoMap.getCoordinatesProjectedToMap(coordinates);
        currentView.setCenter(coordinates);
        currentView.setZoom(defaultZoom);
    });
}


function intializeChangeBaseMap() {
    $('#imagery-basemap').on('click', () => {
        ArcheoMap.setBasemap('Imagery');
    });

    $('#osm-basemap').on('click', () => {
        ArcheoMap.setBasemap('OSM');
    });

    $('#light-basemap').on('click', () => {
        ArcheoMap.setBasemap('Light');
    });
}


function initalizeMapOptionsEvents() {
    initializeResetCoordinatesButton();
    intializeChangeBaseMap();
}


export default initalizeMapOptionsEvents;