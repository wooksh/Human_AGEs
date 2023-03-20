import {ZoomSlider, Zoom, FullScreen, ScaleLine} from 'ol/control';
import Print from 'ol-ext/control/Print';



/* Set controlsNames to 'all' to add all controls */
const extendedControls = () => {
    let controls = {
        /*'zoom': new Zoom({
            //target: $("#zoom-slider").html(),
            target: document.getElementById('zoom')
        }),*/

        'zoomslider': new ZoomSlider(),
        'print': new Print(),
        'scale': new ScaleLine({
            units: 'metric',
        })

        //'scaleline': new ScaleLine(),

        //'mouseposition': new MousePosition(),

        /*'fullscreen': new FullScreen({
            target: document.getElementById('map-options-fullscreen')
        })*/
    }

    controls['zoomslider'].setTarget('zoom-slider');
    controls['print'].setTarget('print-control');
    controls['scale'].setTarget('map-scale');

    return controls;
};

const defaultControls = null; //defaults();


export {extendedControls, defaultControls};