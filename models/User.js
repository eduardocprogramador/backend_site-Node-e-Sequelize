const {DataTypes} = require('sequelize')
const sequelize = require('../db/conn')

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        required: true
    },
    img: {
        type: DataTypes.STRING
    }
}, {timestamps: true, tableName: 'users'})

module.exports = User