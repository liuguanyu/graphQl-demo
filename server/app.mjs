import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schema/schema.mjs'

// import mysql from 'promise-mysql'

import Sequelize from 'sequelize'

import {
    db
} from './configs'

// const sequelize = new Sequelize(db.database, db.user, db.password, {
//     host: db.host,
//     dialect: 'mysql',

//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     },

//     // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
//     operatorsAliases: false,
//     define: {
//         timestamps: false
//     }
// });

(async _ => {
    const app = express()

    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true,
        context: {
            database: db
        }
    }))

    app.listen(4000, () => {
        console.log('now listening for requests on port 4000');
    })
})();