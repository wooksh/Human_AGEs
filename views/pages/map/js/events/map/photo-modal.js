function setDPI(canvas, dpi, doAlterMap = true) {
    // Set up CSS size.

    if(canvas.style.width === 'unset') {
        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';
    }

    // Get size information.
    var scaleFactor = dpi / 96;
    var width = parseFloat(canvas.style.width);
    var height = parseFloat(canvas.style.height);

    // Backup the canvas contents.
    //var oldScale = canvas.width / width;
    //var backupScale = scaleFactor / oldScale;
    var backup = canvas.cloneNode(false);
    backup.getContext('2d').drawImage(canvas, 0, 0);

    // Resize the canvas.
    var ctx = canvas.getContext('2d');

    let newWidth = Math.ceil(width * scaleFactor);
    let newHeight = Math.ceil(height * scaleFactor);

    ArcheoMap.setMapScaleFactor(scaleFactor);

    /* Fix for heatmap */
    let classes = $(canvas).prop("classList");
    let layerId = classes[1] === 'ol-layer' ? classes[0] : null;

    if(ArcheoUtilities.isValid(layerId)) {
        let layerConfig = ArcheoSession.get().layers[layerId];

        let layerType = layerConfig.type;
        let layer = ArcheoMap.getMapLayers()[layerId];

        /*if(layerType === 'heatmap') {
            //layer.setRadius(layerConfig.settings.blur * scaleFactor);
            //layer.setBlur(layerConfig.settings.radius * scaleFactor);

            let matrix;
            const transform = canvas.style.transform;
            if (transform) {
                // Get the transform parameters from the style's transform matrix
                matrix = transform
                .match(/^matrix\(([^\(]*)\)$/)[1]
                .split(',')
                .map(Number);
            } else {
                matrix = [
                parseFloat(canvas.style.width) / canvas.width,
                0,
                0,
                parseFloat(canvas.style.height) / canvas.height,
                0,
                0,
                ];
            }


            // Apply the transform to the export map context
            CanvasRenderingContext2D.prototype.setTransform.apply(
                $('.heatmap-image canvas')[0].getContext('2d'),
                matrix
            );

            $('.heatmap-image canvas')[0].getContext('2d').drawImage(canvas, 0, 0);
            //ctx.drawImage(canvas, 0, 0);

        }*/
    }

    if(doAlterMap) {
        let getCurrentResolution = ArcheoMap.getMap().getView().getResolution();

        //ArcheoMap.getMap().setSize([newWidth, newHeight]);
        //ArcheoMap.getMap().getView().setResolution(getCurrentResolution / scaleFactor);
    }


    // Redraw the canvas image and scale future draws.
    //ctx.setTransform(backupScale, 0, 0, backupScale, 0, 0);
    //ctx.drawImage(backup, 0, 0);
    //ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0);
}


function resetDPI(canvas, currentScaleFactor, doAlterMap = true) {
    if(doAlterMap) {
        let getCurrentResolution = ArcheoMap.getMap().getView().getResolution();

        //ArcheoMap.getMap().setSize([newWidth, newHeight]);
        ArcheoMap.getMap().getView().setResolution(getCurrentResolution * currentScaleFactor);
    }
}


function initializePhotoModalEvents() {
    $('#map-options-screenshot').on('click', function() {
        $('#photo-modal').modal({'backdrop': false, 'focus': true});
        $('#photo-modal').modal('show');
    });

    $('#photo-modal-button-confirm').on('click', function(event) {
        let imageType = $('#photo-modal #photo-image-type input:checked').val();
        imageType = imageType === 'pdf' ? 'jpeg' : imageType;

        let dpi = parseInt($('#photo-modal #photo-dpi').val());

        let promises = [];
        let canvases = $('#map').find('canvas');

        canvases.each((i, canvas) => {
            promises.add(
                new Promise((resolution, rejection) => {
                    setTimeout(() => {
                        //$('#map').one('rendercomplete', () => {resolution(true)});
                        resolution(true)
                            //setDPI(canvas, dpi, i === 0);
                    }, 500);
                })
            )
        });

        Promise.all(promises).then(() => {
            var map = ArcheoMap.getMap();
            let printControl = ArcheoMap.getMapControls().print;

            map.once('rendercomplete', function () {
                printControl.print({
                    imageType: `image/${imageType}`,
                    quality: 1,
                    immediate: false
                });
            });

            map.renderSync();

            /* Revert DPI change after saving the image */
            setTimeout(() => {
                /*let currentScaleFactor = ArcheoMap.getMapScaleFactor();
                ArcheoMap.getMap().updateSize();

                canvases.each((i, canvas) => {
                    setTimeout(() => {
                        resetDPI(canvas, currentScaleFactor, i === 0)
                    }, 200);
                });

                ArcheoMap.setMapScaleFactor(1);*/
            }, 10000);
        });
    });
}


export default initializePhotoModalEvents;