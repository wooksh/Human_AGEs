exports.isArray = function(obj) {
    return obj instanceof Array;
}


exports.isValid = function(obj) {
	return obj !== undefined && obj !== null;
}


exports.isValidNonEmptyString = function(str) {
	return exports.isValid(str) && str !== '';
}


exports.isObj = function(obj) {
	return obj !== undefined && obj !== null && obj.constructor === Object; //&& Object.getPrototypeOf(obj) === null;
}


exports.isEmpty = function(obj) {
    return (exports.isObj(obj) && Object.keys(obj).length === 0) || (exports.isArray(obj) && obj.length === 0);
}