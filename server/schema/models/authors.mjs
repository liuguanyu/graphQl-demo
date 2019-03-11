import Sequelize from 'sequelize'
import conn from '../util/conn'

export default conn().define("authors", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
    create_time: Sequelize.DATE
})