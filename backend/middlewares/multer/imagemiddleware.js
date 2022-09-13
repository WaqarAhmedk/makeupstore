const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, "/home/anonymous-kashmiri/internship/makeupstore/src/images");
    },
    filename: (req, file, cb) => {
     

        cb(null, Date.now() + file.originalname);

    }

});


const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {

        if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/webp") {
            cb(null, true);

        } else {
            cb(null, false);
            return cb(new Error("only jpg,jpeg and webp files are accepted"));
        }
    }
})

module.exports=upload;