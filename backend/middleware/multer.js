const multer = require("multer");
const path = require('path');
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('uploads'));
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-")
    cb(null, `${uuidv4()}-${fileName}`)
  },
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/gif"
    ) {
        cb(null, true)
    } else {
        cb(null, false)
        cb(new Error("Available image format: .png, .jpg, .jpeg and .gif"))
        
            
            // return cb(res.status(401).json({
            //     message: 
            // }))
        }
    }
})

module.exports = {
  upload
}