import {defaults} from 'ol/interaction';

import initializeDragInteraction from './drag';
import initializeHoverInteraction from './hover';
import initializeSelectInteraction from './select';
import initializeDragBoxInteraction from './dragbox';
import initializeShowModalInteraction from './showModal';


const extendedInteractions = (interactionsSettings = {}) => {
	let hover = initializeHoverInteraction( interactionsSettings.hover );
	let drag = initializeDragInteraction( interactionsSettings.translate );
	let select = initializeSelectInteraction( interactionsSettings.select );
	let dragBox = initializeDragBoxInteraction(select, interactionsSettings.dragBox);
	let showModal = initializeShowModalInteraction( select, {
		selectInteraction: select,
		...interactionsSettings.showModal
	});

    let interactions = {
        'hover': hover,
		'translate': drag,
		'select': select,
		'dragBox': dragBox,
		'showModal': showModal
    };

    return interactions;
    //return {};
};


const defaultInteractions = defaults({
	doubleClickZoom: false,
	shiftDragZoom: false
});


export {
	extendedInteractions, 
	defaultInteractions
};