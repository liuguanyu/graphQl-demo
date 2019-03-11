import Sequelize from 'sequelize'
import conf from "../../configs/db"

let instance

export default function () {
    if (!instance) {
        instance = new Sequelize(conf.database, conf.user, conf.password, {
            host: conf.host,
            dialect: 'mysql',

            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },

            // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
            operatorsAliases: false,
            define: {
                timestamps: false
            }
        })
    }

    return instance
}