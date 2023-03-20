function set(sessionObj) {
    window.pageSession = ArcheoUtilities.deepCloneObject(sessionObj);
}


function get() {
   return window.pageSession || {}; 
}


export {
    set,
    get
}