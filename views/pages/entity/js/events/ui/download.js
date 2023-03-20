function initializeDownloadEvents() {

    // `/:dbName/entity/:entityType/:entityId`

    $('#download-button').on('click', (event) => {
        $('#download-button .label').text("Downloading...");
        new Promise((resolution, rejection) => {
            let query = ArcheoRequests.createGraphqlQuery(
                window.entityDbName, 
                ['download(lang: $lang)'],
                {'id': window.entityFeature.id},
                {'$lang': 'String'}
            );

            ArcheoRequests.queryGraphQL(query, (response) => {	
                let results = response.data[ window.entityDbName ][0];

                resolution(true);
            });
        }).then(() => {
            $('#download-button .label').text("Download");
            $("#download-modal").modal("hide");
        });

    });
}


export default initializeDownloadEvents;