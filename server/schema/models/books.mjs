import Sequelize from 'sequelize'
import conn from '../util/conn'

export default conn().define("Book", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: Sequelize.INTEGER,
    name: Sequelize.STRING,
    create_time: Sequelize.DATE
})