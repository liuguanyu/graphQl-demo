import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schema/schema.mjs'

import mysql from 'promise-mysql'
import {
    db
} from './configs'

(async _ => {
    const app = express();

    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true,
        context: {
            database: await mysql.createConnection(db)
        }
    }));

    app.listen(4000, () => {
        console.log('now listening for requests on port 4000');
    });
})();