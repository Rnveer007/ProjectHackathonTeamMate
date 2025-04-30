import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(_dirname, "../uploads"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = `${path.extname(file.originalname)}`
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})


export const upload = multer({ storage: storage })