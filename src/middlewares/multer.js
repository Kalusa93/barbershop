const multer = require('multer');
const path = require('path');

function createStorage(direction) {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, direction));
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        },
    });
}

const upload = multer({ storage: createStorage("../../public/images/products") });
const upload2 = multer({ storage: createStorage("../../public/images/users") });

module.exports = {upload, upload2}