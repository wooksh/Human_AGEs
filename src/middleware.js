const basicAuth = require('express-basic-auth');

const allowedMethodsHTTP = ['GET', 'POST', 'HEAD'];

/* Verify credentials on connect */
exports.verifyCredentials = basicAuth({
	users: { 'się': 'jesteśmysuper1410' },
	authorizeAsync: true,
	authorizer: (login, passw, cb) => {
		const userMatches = basicAuth.safeCompare(login, 'się')
		const passwordMatches = basicAuth.safeCompare(passw, 'jesteśmysuper1410')
	 
		return cb(null, userMatches & passwordMatches);
	},
	unauthorizedResponse: (req) => {
		return req.auth 
		? ('Unauthorized access attempt detected. IP ' + req.ip + 'will be reported.')
        : 'No credentials provided'
	},
	challenge: true
});

/* Disable TRACE requests for security purposes and preventing to read httpOnly cookie */
exports.httpMethodsWhitelist = (req, res, next) => {
    if(!allowedMethodsHTTP.includes(req.method))
        return res.end(405, 'Method not allowed'); // Add HTML error page template
    next();
};

/* Verify whether request contain header */
exports.verifyHeader = (req, res, next) => {
    if(!'header' in req || !req.header)
        return res.end(400, 'Request does not contain a header');
    next();
};