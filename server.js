const envResult = require('dotenv').config();
const env = process.env;
const http = require('http');
const fs = require('fs');

const { ApolloServer } = require('apollo-server-express');
const driver = require('./src/db/driver');

if (envResult.error) {
	throw envResult.error
}

const app = require('./src/app');
app.set('port', env.PORT || env.SERVER_PORT);
app.set('server_address', env.SERVER_PROTOCOL + "://" + env.SERVER_HOST, + "/");

const schema = require('./src/db/props/schema').schema;
const { delegateToSchema } = require('graphql-tools');
const { neo4jgraphql } = require('neo4j-graphql-js'); 

var Session = require('./src/db/classes/session');
var { getDBMetadata } = require('./src/metadata');


const apollo = new ApolloServer({
	schema,
	context: (integrationContext) => {
		var request = integrationContext.req;
		
		return {
			driver,
			delegateToSchema,
			headers: request.headers,
			//graphql,
			neo4jgraphql,
			//schema,
			locale: 'en', // get Locale from request ; for now i will make it en only
			cypherParams: {
				locale: 'en' // get Locale from request ; It global bro. it will be the same for everybody
			}
		};
	},
	validationRules: [
		require('graphql-depth-limit')(
			10, // maxDepth 10
			depths => console.log(depths) // callback
		)//,
		//require('graphql-disable-introspection') // Turn on on production
	],
	plugins: [
		require('./src/apollo-plugins/queryComplexity')(
			schema, // schema
			20 // threshold 20
		),
		require('./src/apollo-plugins/queryLength')(2000) // 2000
	],
	debug: true,
	playground: true,
	introspection:true // Turn off on production !
});


apollo.applyMiddleware({ 
	app, 
	path: env.API_URI
});


var server = http.createServer(app);

server.listen( 
	app.get('port'), 
	env.SERVER_HOST, 
	async () => {
		console.log(`Listening on ${ app.get('port') }`);

		//var session = new Session('read');
		const warmupCacheQuery = require('./src/db/props/warmupCacheQuery');

		/* Warm up database cache memory */
		let cacheSession = new Session('read');
		await cacheSession.runExplicit(warmupCacheQuery).then( 
		() => {
			console.log('Database cache warmed successfully');
		}).catch( (error) => {
			console.error(error.message);
		}).finally( () => {
			cacheSession.close();
			cacheSession = null;
		});

		/* Get database metadata */
		app.set('metadata', await getDBMetadata(new Session('read')) );
	}
);

process.on('exit', function() {
	driver.close();
});
