const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'upload'),
        filename: (req, file, callback) => {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);
            //first parameter of callback is the error
            callback(null, `${name}-${Date.now()}${ext}`);
        }
    })
}