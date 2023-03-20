import { initializeSessionModal } from './../utilities.js';


function setSessionAccordion(newSessionElement, sessionInfo, sessionId) {
	/* Assign meta */
	newSessionElement.find('.session-header > .header-text').html(sessionInfo.name);

	/* Assign correct id to all accordions */
	newSessionElement.find(`[data-target="#session-template-accordion"]`).attr('data-target', `#${sessionId}-accordion`);
	newSessionElement.find('#session-template-accordion').attr('id', `${sessionId}-accordion`);
}


function setNameTextBoxEvents(elementsDict, sessionId, sessionInfo) {
	elementsDict.nameTextbox.on('change', function(event) {
		var $textbox = $(event.target);
		var newSessionName = $textbox.val();

		if( ArcheoUtilities.isValidNonEmptyString(newSessionName) ) {
			//ArcheoSession.get().datasets[ sessionId ].name = newSessionName;
			sessionInfo.name = newSessionName;

			elementsDict.headerText.html( newSessionName );

			$textbox.trigger('blur');

			sessionInfo.editDate = ArcheoUtilities.getCurrentDateString();

			ArcheoEvents.broadcast('update-session', null, {
				sessionId: sessionId,
				sessionInfo: sessionInfo
			});
		} else {
			let oldLayerName = sessionInfo.name;
			$textbox.val(oldLayerName);
		}
	});
}


function initializeNameTextbox(newSessionElement, sessionId, sessionInfo) {
	let $name = newSessionElement.find('#session-name-textbox');
	$name.attr('id', `${sessionId}_session-name-textbox`);
    $name.val( sessionInfo.name );

	let $header = newSessionElement.find('.session-header > .header-text');

	let elements = {
		'newSessionElement': newSessionElement,
		'nameTextbox': $name,
		'headerText': $header
	};

	setNameTextBoxEvents(elements, sessionId, sessionInfo);
}


function setAuthorTextBoxEvents(elementsDict, sessionId, sessionInfo) {
	elementsDict.nameTextbox.on('change', function(event) {
		var $textbox = $(event.target);
		var authorName = $textbox.val();

		if( ArcheoUtilities.isValidNonEmptyString(authorName) ) {
			//ArcheoSession.get().datasets[ sessionId ].name = newSessionName;
			sessionInfo.author = authorName;

			$textbox.trigger('blur');

			sessionInfo.editDate = ArcheoUtilities.getCurrentDateString();

			ArcheoEvents.broadcast('update-session', null, {
				sessionId: sessionId,
				sessionInfo: sessionInfo
			});
		} else {
			let oldAuthorName = sessionInfo.author;
			$textbox.val(oldAuthorName);
		}
	});
}


function initializeAuthorTextbox(newSessionElement, sessionId, sessionInfo) {
	let $name = newSessionElement.find('#session-author-textbox');
	$name.attr('id', `${sessionId}_session-author-textbox`);
    $name.val( sessionInfo.author );

	let elements = {
		'newSessionElement': newSessionElement,
		'nameTextbox': $name
	};

	setAuthorTextBoxEvents(elements, sessionId, sessionInfo);
}


function initializeMetadata(newSessionElement, sessionId, sessionInfo) {
    let $date = newSessionElement.find('.session-date');
	///$date.attr('id', `${sessionId}_session-date`);
    $date.html( ArcheoUtilities.getFormatedDate(sessionInfo.creationDate) );

	let $dateEdit = newSessionElement.find('.session-edit-date');
	//$dateEdit.attr('id', `${sessionId}_session-date`);
    $dateEdit.html( ArcheoUtilities.getFormatedDate(sessionInfo.editDate) );	
}



function setDescriptionTextboxEvents(elementsDict, sessionId, sessionInfo) {
	elementsDict.description.on('change', function(event) {
		var newDescription = elementsDict.description.val();

		if( ArcheoUtilities.isValidNonEmptyString(newDescription) ) {
			//ArcheoSession.get().datasets[ sessionId ].name = newSessionName;
			sessionInfo.description = newDescription;

			elementsDict.description.trigger('blur');

			sessionInfo.editDate = ArcheoUtilities.getCurrentDateString();

			ArcheoEvents.broadcast('update-session', null, {
				sessionId: sessionId,
				sessionInfo: sessionInfo
			});
		} else {
			let oldDescription = sessionInfo.description;
			elementsDict.description.val(oldDescription);
		}
	});
}


function initializeDescriptionTextbox(newSessionElement, sessionId, sessionInfo) {
	let $description = newSessionElement.find('#session-description');
	$description.attr('id', `${sessionId}_session-description`);
    $description.val( sessionInfo.description );

	//let $editButt = newSessionElement.find('#session-description-edit-butt');
	//$editButt.attr('id', `${sessionId}_session-description-edit-butt`);

	let elements = {
		'newSessionElement': newSessionElement,
		'description': $description,
		//'editButt': $editButt
	};

	setDescriptionTextboxEvents(elements, sessionId, sessionInfo);
}


function setSwitchButtEvents(elements, sessionId, sessionInfo) {
	elements.switchButt.on('click', function(event) {
		ArcheoUtilities.setContentLoading('#loading-session-wrapper').then(() => {		
			$("#loading-session-wrapper").on('session-load', () => {
				ArcheoUtilities.setContentLoaded('#loading-session-wrapper');
			})
				
			$('#sessions-container button.session-activate').removeClass('active');
			elements.switchButt.addClass('active');
	
			ArcheoSession.load(sessionId);
		});

		return false;
	});	
}


function initializeSwitchButton(newSessionElement, sessionId, sessionInfo) {
	let $switchButt = newSessionElement.find('button#session-activate');
	$switchButt.attr('id', `${sessionId}_session-activate`);

	let elements = {
		'newSessionElement': newSessionElement,
		'switchButt': $switchButt
	};

	setSwitchButtEvents(elements, sessionId, sessionInfo);
}


function setSaveStateButtEvents(elements, sessionId, sessionInfo) {
	elements.saveButt.on('click', function(event) {
		$("#session-modal").modal('show');

		let updatedSession = ArcheoCache.updateSession(sessionId);
		let sessionInfo = updatedSession._meta;

		initializeSessionModal('update-session', sessionId);
	});	
}


function initializeSaveStateButton(newSessionElement, sessionId, sessionInfo) {
	let $saveButt = newSessionElement.find('#session-save');
	$saveButt.attr('id', `${sessionId}_session-save`);

	let $message = newSessionElement.find('.save-state-message-text');

	let elements = {
		'newSessionElement': newSessionElement,
		'message': $message,
		'saveButt': $saveButt
	};

	setSaveStateButtEvents(elements, sessionId, sessionInfo);
}


function setDownloadButtEvents(elements, sessionId, sessionInfo) {
	elements.downloadButt.on('click', function(event) {
		let fileName = elements.nameTextbox.val();
	
		if( ArcheoUtilities.isValidNonEmptyString(fileName) ) {
			elements.errorMessage.html('');

			initializeSessionModal('export-session', sessionId, {fileName: fileName});
		} else
			elements.errorMessage.html('No filename has been provided');
	});	
}


function initializeDownloadButton(newSessionElement, sessionId, sessionInfo) {
	let $nameTextbox = newSessionElement.find('#session-download');
	$nameTextbox.attr('id', `${sessionId}_session-download`);

	let $downloadButt = newSessionElement.find('#session-download-button');
	$downloadButt.attr('id', `${sessionId}_session-download-button`);

	let $errorMessage = newSessionElement.find('.save-session-error-text');

	let elements = {
		'newSessionElement': newSessionElement,
		'errorMessage': $errorMessage,
		'nameTextbox': $nameTextbox,
		'downloadButt': $downloadButt
	};

	setDownloadButtEvents(elements, sessionId, sessionInfo);
}


function createSessionElement(sessionId, sessionDict) { // session dict?
	return new Promise((resolution, rejection) => {
		let sessionInfo = sessionDict._meta;
		let newSessionElement = $(`#session-template`).clone();
	
		/* Initialize elements */
		initializeNameTextbox(newSessionElement, sessionId, sessionInfo);
		initializeAuthorTextbox(newSessionElement, sessionId, sessionInfo);
	
		initializeMetadata(newSessionElement, sessionId, sessionInfo);
		initializeDescriptionTextbox(newSessionElement, sessionId, sessionInfo);
		initializeSwitchButton(newSessionElement, sessionId, sessionInfo);
		initializeSaveStateButton(newSessionElement, sessionId, sessionInfo);
		initializeDownloadButton(newSessionElement, sessionId, sessionInfo);
	
		setSessionAccordion(newSessionElement, sessionInfo, sessionId);
	
		/* Assign new dataset id */
		newSessionElement.attr('id', sessionId);
		newSessionElement.find('.accordion-header').attr('data-target', `#${sessionId}-accordion`);
		newSessionElement.find('.collapse').attr('id', `${sessionId}-accordion`);
	
		newSessionElement.appendTo('#sessions-container');
		newSessionElement.css('display', 'block');
	
		resolution(newSessionElement);
	});
}


export {
	createSessionElement,
	initializeMetadata
}