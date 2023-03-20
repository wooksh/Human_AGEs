module.exports = (length) => ({
    requestDidStart(requestContext) {
        const query = requestContext.query || '';
        if (query.length > length)
            throw new Error(`Query exceeded a length limit of ${length}.`);
    }
});