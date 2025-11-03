const multer = require('multer')
const path = require('path')

const imgStorage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder = ''
        if(req.baseUrl.includes('user')){
            folder = 'user'
        }
        cb(null, `public/img/${folder}`)
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname))
    }
})

const uploadImg = multer({
    storage: imgStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            return cb(new Error('Envie apenas jpg ou png'))
        }
        cb(undefined, true)
    }
})

module.exports = uploadImg