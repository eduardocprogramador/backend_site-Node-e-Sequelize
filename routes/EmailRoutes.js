const express = require('express')
const router = express.Router()
const EmailController = require('../controllers/EmailController')
const rateLimit = require('express-rate-limit')

const emailLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 3,               
  standardHeaders: true, 
  legacyHeaders: false,  
  message: {
    message: 'Você atingiu o limite de 2 envios por minuto. Tente novamente em breve.'
  }
})

router.post('/send', emailLimiter, EmailController.send)

module.exports = router