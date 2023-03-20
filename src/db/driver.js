const neo4j = require('neo4j-driver');
const env = process.env;

const driver = neo4j.driver(
    `${env.NEO4J_PROTOCOL}://${env.NEO4J_HOST}:${env.NEO4J_PORT}`,
    neo4j.auth.basic(env.NEO4J_USERNAME, env.NEO4J_PASSWORD), 
    { 
        disableLosslessIntegers: true,
        encrypted: false
	},
	/*{
		maxTransactionRetryTime: 30000 * 10000, // def
		connectionAcquisitionTimeout: 10000000000000, // def
		fetchSize: 1000 * 10000, // def 1000
		maxConnectionPoolSize: 10000000000000 // def
	}*/
);

module.exports = driver;