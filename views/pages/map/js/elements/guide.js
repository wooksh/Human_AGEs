
const guidePromptButton = {
    text: 'Don\'t show again',
    className: 'palette-primary ml-0',
    click: function(anno) {
        localStorage.setItem('mapGuideHide', "true");
        anno.hide();
    }
};

const nextButton = {
    text: 'Next',
    className: 'palette-primary-outline ml-auto',
    click: function(anno) {
        anno.switchToChainNext();
    }
};

const finishButton = {
    text: 'Finish',
    className: 'palette-primary highlit ml-auto big-border',
    click: function(anno) {
        anno.hide();
    }
};

const backButton = {
    text: 'Back',
    className: 'palette-primary-outline',
    click: function(anno, evt){
        anno.switchToChainPrev();
    }
};

const middleButtonsTemplate = [backButton, nextButton];


function toggleAccordions($el = null, toggle = null) {
    let $accordions = $el;

    if($el === null)
        $accordions = $('.accordion-header');

    $accordions.each(function() {
        let isCollapsed = $(this).hasClass('collapsed');

        if( toggle == true && isCollapsed )
            $(this).trigger("click");
        else if( toggle == false && !isCollapsed )
            $(this).trigger("click");
        else if(toggle == null)
            $(this).trigger("click");
    });
}


function toggleSidebar($sidebar, toggle = null) {
    let isSideBarActive = $sidebar.find(".sidebar-trigger > .toggle-arrow").hasClass("active");

    if( toggle == true && isSideBarActive )
        $sidebar.find(".sidebar-trigger").trigger('click');
    else if( toggle == false && ! isSideBarActive )
        $sidebar.find(".sidebar-trigger").trigger('click');
    else if(toggle == null)
        $sidebar.find(".sidebar-trigger").trigger('click');
}


function resetView() {
    toggleSidebar($("#left-sidebar"), false);
    toggleSidebar($("#right-sidebar"), false);
    toggleAccordions(null, false);
}


function initializeGuide() {
    let guidePages = [
        {
            target : '#top-controls-wrapper',
            content: 'Welcome to our interactive map application guide.<br><br>Here you will be briefly introduced to the structure of the interface and main functionalities of the map application.',
            position: 'center',
            buttons: [guidePromptButton, nextButton],
            onShow: function (anno, $target, $annoElem) {
                resetView();
            }
        },
        {
            target : '#top-controls-wrapper',
            content: 'The interactive map application is divided into several parts. It\'s main feature is the map itself.</br>It\'s fully interactable: apart from panning and zooming you can move around objects within it such as charts presenting attributes of the samples and pop-up modals showing more detailed information. <br>You can also double-click or shift-select and double-click the charts to view details about the presented samples.',
            //position: 'center',
            position: {
                bottom: '20%',
                left: '5%'
            },
            buttons: [backButton, nextButton],
            showOverlay: function(){},
            onShow: function (anno, $target, $annoElem) {
                resetView();
            }
        }, 
        {
            showOverlay: function(){},
            target : '#time-controls-wrapper',
            content: 'One of the application\'s key features is the filtering of samples by their dating time. Use the "filter" timeline slider to adjust filtered time interval. Use the "range" slider to limit the filter to specific time period for better filtering precision. Use "Present <i class="material-icons">hourglass_empty</i>" button to show or hide contemporary samples on the map.',
            position: 'center-top',
            buttons: middleButtonsTemplate,
            onShow: function (anno, $target, $annoElem) {
                toggleAccordions($("#legend-header"), false);
            }
        },
        {

            target : '#legend-wrapper',
            content: 'The dynamic map legend shows list of currently visible map layers, data attributes and regions with their style symbols. You can change the styling of a given attribute, layer or region by clicking it\'s style symbol and adjusting settings in the popped up editor.',
            position: 'left',
            buttons: middleButtonsTemplate,
            onShow: function (anno, $target, $annoElem) {
                toggleAccordions($("#legend-header"), true);
            },
            onHide: function (anno, $target, $annoElem) {
                
            }
        },
        {
            target : '#map-options-menu-wrapper',
            content: 'This drop-down menu is a quick toolbox of handful map utilities.<br>Here you can change a type of the map and adjust it\'s appearance, you can show or hide map\'s features to improve it\'s readability or finally you can toggle fullscreen to prepare it for a presentation or export current map view to an image.',
            position: 'right',
            buttons: middleButtonsTemplate,
            onShow: function (anno, $target, $annoElem) {
                toggleAccordions($("#legend-header"), false);
                toggleSidebar($("#left-sidebar"), false);
            }
        },
        {
            target : '#left-sidebar',
            content: 'This is a data management side panel. It contains options regarding input data to the Human AGEs web server including session files, user datasets and queries to our archeogenomic graph database.',
            position: 'center-right',
            buttons: middleButtonsTemplate,
            onShow: function (anno, $target, $annoElem) {
                toggleSidebar($("#left-sidebar"), true);
                toggleAccordions($("#session-section > .accordion-header"), false);
            }
        },
        {
            target : '#left-sidebar',
            content: 'The session contains information about current state of the application including imported datasets, created layers, map view and data appearance. Simply said, it is a snapshot of your work. You can create your own sessions and download them to get a backup of your progress, which you can later restore. You can also share it with others.',
            position: 'center-right',
            buttons: middleButtonsTemplate,
            onShow: function (anno, $target, $annoElem) {
                toggleSidebar($("#left-sidebar"), true);

                $("#left-sidebar").removeClass("anno-target-decoration");
                $("#left-sidebar .sidebar").mCustomScrollbar("scrollTo", "#session-section");
                $("#session-section").addClass("anno-target-decoration");

                setTimeout(() => {
                    toggleAccordions($("#session-section > .accordion-header"), true);
                }, 200);
                toggleAccordions($("#user-data-section > .accordion-header"), false);
            },
            onHide: function (anno, $target, $annoElem) {
                $("#session-section").removeClass("anno-target-decoration");
            }
        },
        {
            target : '#left-sidebar',
            content: 'This section provides a possibility to load user-created archeogenomic dataset formatted as either JSON or CSV file. Details concerning the file\'s content were described <a href="http://localhost:8000/en/faq?id=question0#question0">here</a>.',
            position: 'center-right',
            buttons: middleButtonsTemplate,
            onShow: function (anno, $target, $annoElem) {
                toggleSidebar($("#left-sidebar"), true);

                $("#left-sidebar").removeClass("anno-target-decoration");
                $("#user-data-section").addClass("anno-target-decoration");

                $("#left-sidebar .sidebar").mCustomScrollbar("scrollTo", "#user-data-section");

                toggleAccordions($("#session-section > .accordion-header"), false);
                toggleAccordions($("#queries-section > .accordion-header"), false);
                setTimeout(() => {
                    toggleAccordions($("#user-data-section > .accordion-header"), true);
                }, 200);
                
            },
            onHide: function (anno, $target, $annoElem) {
                $("#user-data-section").removeClass("anno-target-decoration");
            }
        },
        {
            target : '#left-sidebar',
            content: 'Here you can import a dataset from one of genomic data sources that are integrated into our database. You can limit the dataset content by providing a set of filters. In the end a query is generated - you can use it to import the desired data. You can also share the query with others or place it in a publication.',
            position: 'center-right',
            buttons: middleButtonsTemplate,
            onShow: function (anno, $target, $annoElem) {
                toggleSidebar($("#left-sidebar"), true);

                $("#left-sidebar").removeClass("anno-target-decoration");
                $("#queries-section").addClass("anno-target-decoration");

                $("#left-sidebar .sidebar").mCustomScrollbar("scrollTo", "#queries-section");

                toggleAccordions($("#user-data-section > .accordion-header"), false);
                toggleAccordions($("#datasets-section > .accordion-header"), false);
                setTimeout(() => {
                    toggleAccordions($("#queries-section > .accordion-header"), true);
                }, 200);
                
            },
            onHide: function (anno, $target, $annoElem) {
                $("#queries-section").removeClass("anno-target-decoration");
            }
        },
        {
            target : '#left-sidebar',
            content: 'This is a list of all imported datasets. By clicking on a dataset\'s name you can view it\'s details and additional sampling options. Click an icon <i class="material-icons">file_download</i> to download the dataset.<br><br><b>Because many map functionalities operates on datasets content, before using them make sure you have first imported all datasets you want to work on.</b> Otherwise, some changes you have already made may not apply to the newly imported datasets.',
            position: 'center-right',
            buttons: middleButtonsTemplate,
            onShow: function (anno, $target, $annoElem) {                
                toggleSidebar($("#left-sidebar"), true);
                toggleSidebar($("#right-sidebar"), false);

                $("#left-sidebar").removeClass("anno-target-decoration");
                $("#left-sidebar .sidebar").mCustomScrollbar("scrollTo", "#datasets-section");
                $("#datasets-section").addClass("anno-target-decoration");

                setTimeout(() => {
                    toggleAccordions($("#datasets-section > .accordion-header"), true);
                }, 200);
                toggleAccordions($("#queries-section > .accordion-header"), false);
            },
            onHide: function (anno, $target, $annoElem) {
                $("#datasets-section").removeClass("anno-target-decoration");
                toggleSidebar($("#left-sidebar"), false);
            }
        },

        {
            target : '#right-sidebar',
            content: 'This is map management panel. It contains options regarding appearance of the map and objects within it.',
            position: 'center-left',
            buttons: middleButtonsTemplate,
            onShow: function (anno, $target, $annoElem) {
                toggleSidebar($("#right-sidebar"), true);

                toggleAccordions($("#queries-section > .accordion-header"), false);
                toggleAccordions($("#grouping-section > .accordion-header"), false);
            }
        },
        {
            target : '#right-sidebar',
            content: 'Grouping helps to capture general regional changes happening over longer periods of time. You can perform grouping by samples\' position on the map and samples\' values of presented attribute at the same time. <br><b>Grouping is applied to all currently imported datasets and must be repeated on new ones.</b>',
            position: 'center-left',
            buttons: middleButtonsTemplate,
            onShow: function (anno, $target, $annoElem) {
                toggleSidebar($("#right-sidebar"), true);

                $("#right-sidebar").removeClass("anno-target-decoration");
                $("#right-sidebar .sidebar").mCustomScrollbar("scrollTo", "#grouping-section");
                $("#grouping-section").addClass("anno-target-decoration");

                setTimeout(() => {
                    toggleAccordions($("#grouping-section > .accordion-header"), true);
                }, 200);
                toggleAccordions($("#filtering-section > .accordion-header"), false);

            },
            onHide: function (anno, $target, $annoElem) {
                $("#grouping-section").removeClass("anno-target-decoration");
            }
        },
        {
            target : '#right-sidebar',
            content: 'Filtering helps to focus on particular aspect of a large dataset. You can filter samples by time, values of their attributes or by a region if they are grouped in any. Effects of all active filters are combined - for example you can filter samples by many of their attributes simultaneously. To toggle certain filter type, click on <i class="material-icons">check_box</i> icon. <br><b>Filtering is applied to all currently imported datasets and must be repeated on new ones.</b>',
            position: 'center-left',
            buttons: middleButtonsTemplate,
            onShow: function (anno, $target, $annoElem) {
                toggleSidebar($("#right-sidebar"), true);

                $("#right-sidebar").removeClass("anno-target-decoration");
                $("#right-sidebar .sidebar").mCustomScrollbar("scrollTo", "#filtering-section");
                $("#filtering-section").addClass("anno-target-decoration");

                toggleAccordions($("#grouping-section > .accordion-header"), false);
                toggleAccordions($("#layers-section > .accordion-header"), false);
                setTimeout(() => {
                    toggleAccordions($("#filtering-section > .accordion-header"), true);
                }, 200);
            },
            onHide: function (anno, $target, $annoElem) {
                $("#filtering-section").removeClass("anno-target-decoration");
            }
        },
        {
            target : '#right-sidebar',
            content: 'This is a list of all created layers. By clicking on a layer\'s name you can view and change it\'s appearance options. To present several sample attributes using the same styling, you can use the "Clone layer <i class="material-icons">layers</i>" feature and change the displayed attribute for each of cloned layers. You can also click an icon <i class="material-icons">visibility</i> to toggle layer\'s visibility.',
            position: 'center-left',
            buttons: middleButtonsTemplate,
            onShow: function (anno, $target, $annoElem) {
                toggleSidebar($("#right-sidebar"), true);

                $("#right-sidebar").removeClass("anno-target-decoration");
                $("#right-sidebar .sidebar").mCustomScrollbar("scrollTo", "#layers-section");
                $("#layers-section").addClass("anno-target-decoration");

                toggleAccordions($("#filtering-section > .accordion-header"), false);
                setTimeout(() => {
                    toggleAccordions($("#layers-section > .accordion-header"), true);
                }, 200);
            },
            onHide: function (anno, $target, $annoElem) {
                $("#layers-section").removeClass("anno-target-decoration");
            }
        },
        {
            target : '#top-controls-wrapper',
            content: 'That\'s the end of our short course.<br>As a next step, we advise you to visit our <a href="">examples gallery</a> to explore different use cases and potential of the interactive map application.<br><br>Finally, we would like to thank you for your visit and we hope you\'ll enjoy your stay!<br><i class="mt-3 d-block text-right">&mdash;Human AGEs Team</i>',
            position: 'center',
            buttons: [backButton, finishButton],
            onShow: function (anno, $target, $annoElem) {
                $("#guide-prompt").addClass('hidden');
                localStorage.setItem('mapGuidePromptHide', "true");
                resetView();
            }
        }
    ];

    guidePages.forEach((el, index) => {
        el.paging = `${index+1}/${guidePages.length}`;
    });
    
    window.guideObj = new Anno(guidePages);
}


export { 
    initializeGuide,
    guidePromptButton,
    nextButton,
    finishButton,
    backButton,
    middleButtonsTemplate,
    toggleAccordions,
    toggleSidebar,
    resetView
};