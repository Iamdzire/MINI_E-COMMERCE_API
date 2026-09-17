import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'Uploads'),
    filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
})

const upload = multer({storage: storage})

export default upload