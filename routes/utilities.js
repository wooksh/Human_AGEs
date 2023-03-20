const availableLangs = new Set(['en', 'pl']);
const dictionaries = require('./data/dictionaries.json');


function interactiveApplicationResponse(pageName) {
	return (req, res) => {
		let metadata = req.app.get('metadata');
		let lang = req.params.languageTag;
		let exampleName = req.query.example || null;
  
		let langMetadata = {...metadata[lang] };
		let metadataString = langMetadata ? 
		  JSON.stringify(langMetadata) : 
		  JSON.stringify(metadata['en']);
  
		let dictionaryString = dictionaries[lang] ? 
			JSON.stringify(dictionaries[lang][pageName]) : 
			JSON.stringify(dictionaries['en'][pageName]);
	
		res.render(pageName + '/index', {
		   pageName: pageName,
		   metadata: metadataString, // Should send only certain language
		   lang: req.params.languageTag,
		   minYear: langMetadata.TimePeriod.minYear,
		   maxYear: langMetadata.TimePeriod.maxYear,
		   dictionary: dictionaryString,
		   example: exampleName
		});
  	}
}


module.exports = {
    interactiveApplicationResponse: interactiveApplicationResponse
};