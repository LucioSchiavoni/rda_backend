import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const directory = path.join(__dirname, 'upload');

const storage = multer.diskStorage({
    destination: directory,
    filename: (req, file, cb) => {
        
        const originalname = path.extname(file.filename)
        cb(null, originalname)
    }
})

const upload = multer({storage})

export default upload;