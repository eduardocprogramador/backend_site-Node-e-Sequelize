const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createUserToken = require('../utils/createUserToken')
const getToken = require('../utils/getToken')

class UserController {
    static async register(req, res) {
        const {name, email, password, confirmPassword} = req.body
        if(password.length < 7){
            res.status(422).json({
                message: 'Senha muito curta'
            })
            return
        }
        if(password != confirmPassword){
            res.status(422).json({
                message: 'A senha e a confirmação de senha precisam ser iguais'
            })
            return
        }
        const userExists = await User.findOne({where: {name}})
        if(userExists){
            res.status(422).json({
                message: 'Usuário já existe'
            })
            return 
        }
        const emailExists = await User.findOne({where: {email}})
        if(emailExists){
            res.status(422).json({
                message: 'Email já em uso'
            })
            return 
        }
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
        try {
            const newUser = await User.create({name, email, password: passwordHash})
            await createUserToken(newUser, 'Usuário criado', req, res)
        } catch (error) {
            res.status(500).json({
                message: 'Tente mais tarde'
            })
        }
    }
    static async login(req, res) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            res.status(422).json({
                message: 'Email não cadastrado'
            })
            return
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            res.status(422).json({
                message: 'Senha inválida'
            })
            return
        }
        try {
            await createUserToken(user, `Olá ${user.name}`, req, res)
        } catch (error) {
            res.status(500).json({
                message: 'Tente mais tarde'
            })
        }
    }
    static async check(req, res) {
        let currentUser
        if (req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, process.env.JWT_SECRET) 
            currentUser = await User.findByPk(decoded.id, {attributes: {exclude: ['password']}})
        } else {
            currentUser = null
        }
        res.status(200).send(currentUser)
    }
    static async getById(req, res){
        const id = req.params.id
        const user = await User.findById(id).select("-password")
        if(!user){
            res.status(422).json({
                message: 'Usuário não existe'
            })
            return
        }
        res.status(200).json({user})
    }
    static async update(req, res){

    }
}

module.exports = UserController