const neo4j = require('neo4j-driver');
const notIn = require('../../utilities').notIn;
var driver = require('../driver');


const validAccessModes = {
    'read': neo4j.session.READ
    //'write': neo4j.session.WRITE
};


class Session {
    static get validAccessModes() {
        return validAccessModes;
    }

    constructor(accessModeName = null) {
        this.isClosed = false;
        this.accessMode = accessModeName || 'read';
        this.instance = this.initialize();
        this.transaction = null;
    }

    get() {
        return this.instance;
    }

    initialize() {
        var sessionInstance = null;

        if(! this.isClosed) {
            if(this.accessMode != null) {
                if( notIn(this.accessMode, validAccessModes) )
                    throw Error(`Provided session access mode (${this.accessMode}) mode is wrong. Valid values: ${validAccessModesNames}`);
                
                sessionInstance = driver.session({
                    defaultAccessMode: validAccessModes[ this.accessMode ]
                });
            } else
                sessionInstance = driver.session();
        } else
            throw Error("Can not initialize a closed session");
        
    
        return sessionInstance;
    }

    close() {
        if( this.instance == null)
            throw Error('To close the session it must be initialized first');
        else if( this.isClosed )
            throw Error('The session is already closed');

        this.instance.close();
        this.isClosed = true;
    }

    createTransaction() {
        this.transaction = this.instance.beginTransaction();
    }

    closeTransaction() {
        this.transaction.close();
    }

    commitTransaction() {
        this.transaction.commit();
    }


	/* Transaction queries require manual transaction handling */
    run(query, parameters = {}, // async all functions
        websocket = null, nodeAlias = null, type = null) {

        if( this.transaction == null || !this.transaction.isOpen() )
            throw Error('To run the query a transcation must be initialized first');

        if(websocket == null && nodeAlias == null && type == null) {
            return this.transaction.run(query, parameters); // Promise
        } /*else {
            if(websocket == null || nodeAlias == null || type == null)
                throw Error(`Not enough function parameters were provided for websocket query`);
            
            this.queryWs(websocket, query, prameters, nodeAlias, type);
        }*/
    }


	/* Session queries exhibits auto-commit behaviour */
    runExplicit(query, parameters = {}, 
        websocket = null, nodeAlias = null, type = null) {
		var result = null;
            
        if( this.instance == null )
            throw Error('To run an explicit transation based query a session must be firstly initialized');

        if(websocket == null && nodeAlias == null && type == null) {
			return this.instance.run(query, parameters);
        } /* else {
            if(websocket == null || nodeAlias == null || type == null)
                throw Error(`Not enough function parameters were provided for websocket query`);
            
            this.queryWs(websocket, query, prameters, nodeAlias, type);
		} */
		
		
    }

    queryWs(websocket, query, parameters, nodeAlias, type) {
        this.instance
            .run(query, parameters)
            .then(result => {
                var data = [];
                result.records.forEach(record => {
                    data.push( record.get(nodeAlias) );
                });
                
                var message = {
                    'type': type,
                    'results': data
                };
				websocket.send( JSON.stringify(message) );
            })
            .catch(error => {
                console.log(error)
            })
            .then(() => this.instance.close())
    }
}

module.exports = Session;
    