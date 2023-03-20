const neo4j = require('neo4j-driver');
const notIn = require('../../utilities').notIn;
var driver = require('../driver');
const { map } = require('rxjs/operators');


const validAccessModes = {
    'read': neo4j.session.READ, 
    'write': neo4j.session.WRITE
};


class RxSession {
    static get validAccessModes() {
        return validAccessModes;
    }

    constructor() {
        this.instance = null;
        this.isClosed = false;
        this.accessMode = null;
    }

    get() {
        return this.instance;
    }

    create(accessModeName = null) {
        if(accessModeName != null) {
            if( notIn(accessModeName, validAccessModes) )
                throw Error(`Provided session access mode (${accessModeName}) mode is wrong. Valid values: ${validAccessModesNames}`);
            
            session = driver.rxSession({
                defaultAccessMode: validAccessModes[ accessModeName ]
            });
        } else
            session = driver.rxSession();
    
        isClosed = false;
        return session;
    }

    close() {
        if( this.instance == null)
            throw Error('To close the session it must be initialized first');
        else if( this.isClosed )
            throw Error('The session is already closed');

        this.instance.close();
        this.isClosed = true;
    }

    run(query, parameters = {}, 
        websocket = null, nodeAlias = null, type = null) {

        if( this.instance == null || this.isClosed )
            throw Error('To run the query a session must be initialized first');

        if(websocket == null && nodeAlias == null && type == null) {
            this.instance.run(query, parameters)
        } else {
            if(websocket == null || nodeAlias == null || type == null)
                throw Error(`Not enough function parameters were provided for websocket query`);
            
            if(this.accessMode == 'read') {
                this.readWs(websocket, query, parameters, nodeAlias, type)
            } else if(this.accessMode == 'write') {
                this.writeWs(websocket, query, parameters, nodeAlias, type)
            }
        }
    }

    readWs(websocket, query, parameters, nodeAlias, type) {
        if( this.instance == null || this.isClosed )
            throw Error('To run the query a session must be initialized first');
    
        this.instance
            .readTransaction(txc =>
                txc
                    .run(query, parameters)
                    .records()
                    .pipe(map(record => record.get(nodeAlias)))
            )
            .subscribe({
                next: data => {
                    var message = {
                        'type': type,
                        'result': data
					};

                    websocket.send( JSON.stringify(message) );
                },
                complete: () => console.log('Reading completed'),
                error: err => console.error(err)
            });
    }
    
    writeWs(websocket, query, parameters, nodeAlias, type) {
        if( this.instance == null || this.isClosed )
            throw Error('To run the query a session must be initialized first');
    
        this.instance
            .readTransaction(txc =>
                txc
                    .run(query, parameters)
                    .records()
                    .pipe(map(record => record.get(nodeAlias)))
            )
            .subscribe({
                next: data => {
                    var message = {
                        'type': type,
                        'result': data
                    };
                    websocket.send( JSON.stringify(message) );
                },
                complete: () => console.log('Writing completed'),
                error: err => console.error(err)
            });
    }
}

module.exports = new RxSession();