const env = process.env;

/*
 lodash useful functions:
 clone, cloneDeep, assign, flatten, get, groupBy
 https://lodash.com/docs/4.17.15
*/

function isObjEmpty(obj) {
    return Object.keys(obj).length === 0 && (obj.constructor === Object || Object.getPrototypeOf(obj) === null);
}

exports.isObjEmpty = isObjEmpty;

function isDict(obj) {
    return obj.constructor === Object || Object.getPrototypeOf(obj) === null;
}

exports.isDict = isDict;

function isArray(obj) {
    return obj instanceof Array;
}

exports.isArray = isArray;

function isSet(obj) {
    return obj instanceof Set;
}

exports.isSet = isSet;


function valueIsInCollection(value, collection) {
    if(isArray(collection))
        return collection.includes(value);
    else if(isSet(collection))
        return collection.has(value);
    else if(isDict(collection))
        return value in collection;

    throw Error(`Provided value of variable \"collection\" (${collection.toString()}) is not a collection.`);
}

exports.In = function(value, collection) {
    if(typeof value === 'undefined' || typeof collection === 'undefined')
        throw Error('Did not provide sufficient number of arguments');

    if( isArray(value) ) {
        let values = value;
        return values.every((singleValue, _, __) => valueIsInCollection(singleValue, collection));
    } else
        return valueIsInCollection(value, collection);
};

exports.notIn = function(value, collection) { 
    !exports.In(value, collection);
};

exports.conditionalIn = function(value, collection, keyToBeChecked) { 
    if(keyToBeChecked in collection)
        return exports.In(value, collection[ keyToBeChecked ]);
    else
        return true;
};

exports.conditionalNotIn = function(value, collection, keyToBeChecked) { 
    if(keyToBeChecked in collection)
        exports.notIn(value, collection[ keyToBeChecked ]);
    else
        return true;
};

// src: https://ourcodeworld.com/articles/read/317/how-to-check-if-a-javascript-promise-has-been-fulfilled-rejected-or-resolved
exports.getPromiseState = function (promise) {
    // Don't modify any promise that has been already modified.
    if (promise.isResolved) return promise;

    // Set initial state
    var isPending = true;
    var isRejected = false;
    var isFulfilled = false;

    // Observe the promise, saving the fulfillment in a closure scope.
    var result = promise.then(
        function(v) {
            isFulfilled = true;
            isPending = false;
            return v; 
        }, 
        function(e) {
            isRejected = true;
            isPending = false;
            throw e; 
        }
    );

    result.isFulfilled = function() { return isFulfilled; };
    result.isPending = function() { return isPending; };
    result.isRejected = function() { return isRejected; };
    return result;
}

const serverURL = env.SERVER_PROTOCOL + "://" + env.SERVER_HOST + ":" + env.SERVER_PORT;
exports.serverURL = serverURL;

exports.newLine = function(string) {
    return string + '\n';
}

exports.valueParser = function(value, type) {
    if(type == 'string')
        return value; 

    var values = value;
    if(! isArray(value) )
        values = [value];
    
    for(var i = 0; i < values.length; i++) {
        switch(type) {
            case 'string':
                break;
            case 'date':
            case 'integer':
                values[i] = parseInt( values[i] );
            case 'point':
            case 'double':
                values[i] = parseFloat( values[i] );
        }   
    }

    return values.length === 1 ? values[0] : values;
}


/* Make possible to interpolate non-template string */
// Warning! Potential security issues! https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!
// But it is used only server-side, so it os not a danger for website users.
// Source: https://stackoverflow.com/a/41015840
exports.interpolateString = function(str, params) {
	const names = Object.keys(params);
	const vals = Object.values(params);
	return new Function(...names, `return \`${str}\`;`)(...vals);
}