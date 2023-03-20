import regions from 'Pages/map/data/regions.json';


function initializeRegionSelect() {
    let $selectRegion = $('#select-filter-region');

    delete regions['region__world'];

    ArcheoUI.setSelectpicker( $selectRegion, regions, true, true );
}


function initializeRegionFilter() {
    initializeRegionSelect();
}


export default initializeRegionFilter;