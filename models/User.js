const {DataTypes} = require('sequelize')
const sequelize = require('../db/conn')

const User = sequelize.define('User', {
    name:{
        type: DataTypes.STRING,
        required: true
    },
    password:{
        type: DataTypes.STRING,
        required: true
    },
},{timestamps: true, tableName: 'users'})

module.exports = User