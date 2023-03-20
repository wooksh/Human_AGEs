function changeClusterConfigEvent() {
    $('#features-clustering').on('cluster-strategy-change', function(event, data) {
        var $obj = $(event.target);

        let sliderObj = $obj.find('#clustering-slider').data("ionRangeSlider");
        let distanceSliderObj = $obj.find('#distance-slider').data("ionRangeSlider");

        if(ArcheoUtilities.isValid(sliderObj)) {
            var resolution = ArcheoMap.getMap().getView().getResolution();
            var oldDistance = sliderObj.result.from;
            var oldMinInBetweenDistance = distanceSliderObj.result.from;

            if( ! (ArcheoUtilities.isValid(data.config.method.distance)) ) {
                let params = {block: true};

                sliderObj.update(params);
                distanceSliderObj.update(params);
            } else if(data.config.method.distance.endsWith('relative')) {
                let minDistance = 0;
                let maxDistance = 1000;

                if(sliderObj.options.postfix === 'km') {
                    oldDistance = oldDistance * 1000 / resolution; // since distance is in kms and resolution is in meters
                    oldMinInBetweenDistance = oldMinInBetweenDistance * 1000 / resolution;
                }

                let distance = ArcheoUtilities.limit(oldDistance, minDistance, maxDistance);
                let minInBetweenDistance = ArcheoUtilities.limit(oldMinInBetweenDistance, minDistance, distance);

                let params = {
                    min: minDistance,
                    max: maxDistance,
                    block: false,
                    postfix: 'px',
                };
                
                sliderObj.update({...params, from: distance});
                //distanceSliderObj.update({...params, from_max: distance, from: minInBetweenDistance});

            } else if(data.config.method.distance.endsWith('absolute')) {
                let minDistance = 0;
                let maxDistance = 10000;

                if(sliderObj.options.postfix === 'px') {
                    oldDistance = oldDistance * resolution / 1000; // since distance is in kms and resolution is in meters
                    oldMinInBetweenDistance = oldMinInBetweenDistance * resolution / 1000;
                }

                let distance = ArcheoUtilities.limit(oldDistance, minDistance, maxDistance);
                let minInBetweenDistance = ArcheoUtilities.limit(oldMinInBetweenDistance, minDistance, distance);

                let params = {
                    min: minDistance,
                    max: maxDistance,
                    block: false,
                    postfix: 'km'
                };

                sliderObj.update({...params, from: distance});
                //distanceSliderObj.update({...params, from_max: distance, from: minInBetweenDistance});
                // Abs: the range is 5000 (=5km) - 5 000 000 (=5 000 km)
            }
        }
    });
}


/*function changeClusterRangeEvent() {
    $('#features-clustering').on('cluster-range-change', function(event, data) {
        var $obj = $(event.target);
        var range = data.value;
        
        let distanceSliderObj = $obj.find('#distance-slider').data("ionRangeSlider");
        distanceSliderObj.update({ from_max: range });
    });
}*/


function distanceSliderRangeEvents() {
    changeClusterConfigEvent();
    //changeClusterRangeEvent();
}


export default distanceSliderRangeEvents;