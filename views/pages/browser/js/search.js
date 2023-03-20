/*function setSearchStatus(isSearching) {
    $("#search")

    material-icons
    .spinner-border(role='status')
}*/



function questionsSearchEvent() {
    window.isSearching = false;

    const searchIndex = FlexSearch.Index({
        preset: "default",
        tokenize: "full"
    });

    $("#faq .header-text").each(function() {
        let questionId = $(this).parents('.question-wrapper').attr('id');
        searchIndex.addAsync(questionId, $( this ).text());
    });

    $("#search").on("input", (event) => {
        let query = $(event.target).val();

        if(ArcheoUtilities.isValidNonEmptyString(query)) {
            window.isSearching = true;
            setTimeout(() => {
                if(window.isSearching)
                    ArcheoUI.setTextboxInputStatus($("#search"), true);
            }, 100);

            searchIndex.searchAsync(query).then(function(results) {
                results = new Set(results);

                $("#faq .question-wrapper").each(function() {
                    let questionId = $(this).attr('id');
                
                    if(! results.has(questionId) ) {
                        $(this).addClass('hidden');
                    }
                    else {
                        $(this).removeClass('hidden');
                    }
                });

                if(results.size === 0)
                    $("#not-found-prompt").removeClass('hidden');
                else
                    $("#not-found-prompt").addClass('hidden');

                window.isSearching = false;
                ArcheoUI.setTextboxInputStatus($("#search"), false);            
            });
        }
        else {
            $("#not-found-prompt").addClass('hidden');
            $("#faq .question-wrapper").removeClass('hidden');
            ArcheoUI.setTextboxInputStatus($("#search"), false);
        }        
    });
}


export {
    questionsSearchEvent
}