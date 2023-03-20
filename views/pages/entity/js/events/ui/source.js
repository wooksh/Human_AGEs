import {getBibtexString} from './utilities';


//+custom-button-image('/img/icons/bibtex.png')(source-id=index class='bibtex-button


function initializeBibtexButton() {
    $('.bibtex-button').on('click', (event) => {
        let $el = $(event.target);
        let sourceId = $el.parents('.source').attr('source-id');

        let source = window.entityFeature.sources[ parseInt(sourceId) ];

        let bibtexString = getBibtexString(source);
        ArcheoUI.copyStringToClipboard(bibtexString);
    });
}


function initializeSourceEvents() {
    initializeBibtexButton()
}


export default initializeSourceEvents;