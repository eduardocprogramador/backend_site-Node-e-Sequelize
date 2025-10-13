const jwt = require('jsonwebtoken')

const createUserToken = async(user, message, req, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.JWT_SECRET)
    res.status(200).json({
        message,
        token,
        userId: user._id
    })
}

module.exports = createUserToken