const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, require('path').dirname('/backend/uploads'))
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
            
            return cb(res.status(401).json({
                message: "Available image format: .png, .jpg, .jpeg and .gif"
            }))
        }
    }
})

module.exports = {
  upload
}