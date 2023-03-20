function parseEntryValue(entry, type) {
    if( entry === null )
		return null;

	switch(type) {
		case 'object': return JSON.parse(entry);
		case 'number': return parseFloat(entry) || null;
		case 'boolean': return entry.toLowerCase() === "true";
		default: return entry === "null" ? null : entry; // It's string
	}
}


function getSessionEntry(entryName, type = null) {
    let entry = 'archeocache_' + entryName;

	var entryValue = window.sessionStorage.getItem(entry);
    return parseEntryValue(entryValue, type);
}


function setSessionEntry(entryName, value, type = null) {
    let entry = 'archeocache_' + entryName;

    if( ! ArcheoUtilities.isValid(value) )
		return window.sessionStorage.removeItem(entry); // because setting null as a value causes it to be converted to the string, which is boolean-true

    switch(type) {
		case 'object': return window.sessionStorage.setItem( entry, JSON.stringify(value) );
		default: return window.sessionStorage.setItem( entry, value );
	}
}


function getLocalEntry(entryName, type = null) {
    let entry = 'archeocache_' + entryName;

	var entryValue = window.localStorage.getItem(entry);
    return parseEntryValue(entryValue, type);
}


function setLocalEntry(entryName, value, type = null) {
     let entry = 'archeocache_' + entryName;

    if( ! ArcheoUtilities.isValid(value) )
		return window.localStorage.removeItem(entry); // because setting null as a value causes it to be converted to the string, which is boolean-true

    switch(type) {
		case 'object': return window.localStorage.setItem( entry, JSON.stringify(value) );
		default: return window.localStorage.setItem( entry, value );
	}
}


function getTemporaryEntry(entryName) {
    let entry = 'archeocache_' + entryName;
    return ArcheoCache[entry];
}


function setTemporaryEntry(entryName, value) {
    let entry = 'archeocache_' + entryName;
    ArcheoCache[entry] = value;
}


function incrementTemporaryEntry(entryName, incrementationValue) {
    let entry = 'archeocache_' + entryName;
    ArcheoCache[entry] += incrementationValue;
}


export {
    getSessionEntry,
    setSessionEntry,
    getLocalEntry,
    setLocalEntry,
    getTemporaryEntry,
    setTemporaryEntry,
    incrementTemporaryEntry
};