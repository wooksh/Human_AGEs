function initialize(
	inputEl, entityName, valueAttribute, queryAttribute, detailsAttribute, lang, 
	selectFunction = null, 
	closeFunction = null) {
		
	/* You search using label attribute, but you receive value attribute */
	inputEl.autocomplete({
        source: function(req,res) {
			var queryTerm = req.term.trim();

			if( ArcheoUtilities.isValidNonEmptyString( queryTerm ) ) {
				let url = `/search/${entityName}/${queryAttribute}/${lang}/${queryTerm}`;

				$.ajax({
					// a nie value attribute?
					url: url,
					dataType: "json",
					type: "GET",
					success: function(data) {
						data = ArcheoUtilities.getValueOfAnOnlyItemInDict(data);

						res($.map(data, function(item) {
							return {
								value: ArcheoUtilities.getLangMetaValue(lang, item, valueAttribute),
								label: ArcheoUtilities.getLangMetaValue(lang, item, queryAttribute), 
								details: ArcheoUtilities.getLangMetaValue(lang, item, detailsAttribute)
							};
						}));
					},
					error: (jqXHR, textStatus, errorThrown) =>
						console.error(`Request error, status: ${textStatus}, msg: ${errorThrown}, jqXHR: ${JSON.stringify(jqXHR)}`)
				});
			}
        },
        minLength: 1,
        select: selectFunction,
		close: closeFunction
	})
	.autocomplete( "instance" )._renderItem = function( ul, item ) {
		let itemElement =  $( "<li>" )
			.attr( "data-value", item.value )
			.append( item.label );

		if( ! ArcheoUtilities.isStringUndefined( item.details ) )
			itemElement.append( " (" + item.details + ")" );

		return itemElement.appendTo( ul );
	};
}

export { initialize };