const sendEmail = require('../utils/sendEmail')

class EmailController {
    static async send(req, res) {
        const {name, phone, msg, website, startedAt} = req.body
        if (website) {
            return res.status(400).json({ 
                message: 'Requisição inválida' 
            })
        }
        const minMs = 2000
        if (!startedAt || Date.now() - Number(startedAt) < minMs) {
            return res.status(400).json({ 
                message: 'Form enviado rápido demais' 
            })
        }
        try {
            await sendEmail({name, phone, msg})
            res.status(200).json({ 
                message: "E-mail enviado!" 
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({ 
                message: 'Erro ao enviar o email' 
            })
        }
    }
}

module.exports = EmailController