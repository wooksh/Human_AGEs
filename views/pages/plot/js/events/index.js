import initializeUIEvents from './ui.js';


function plotTypeSelect() {
    $('#select-pca').change(function() {
        AnalysisUtilities.queryAndDisplayResults('plot-pca', ...AnalysisUtilities.getSelectedResultsInfo());
    });
}


function datasetTypeSelect() {
    $('#select-dataset').change(function() {
        AnalysisUtilities.queryAndDisplayResults('plot-pca', ...AnalysisUtilities.getSelectedResultsInfo());
    });
}


function initializePageEvents() {
    plotTypeSelect();
    datasetTypeSelect();
    initializeUIEvents();
}


export default initializePageEvents;