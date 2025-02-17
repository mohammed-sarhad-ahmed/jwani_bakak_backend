import express from 'express';
import multer from 'multer';
import {
  deleteUploadedInvoice,
  getUploadedInvoices,
  uploadInvoice,
  getUploadedInvoice,
} from '../handler/uploadedInvoicesHandler.js';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, 'public/uploadedInvoicesImg');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${Date.now()}.${ext}`);
  },
});
const upload = multer({
  storage: multerStorage,
});
const router = express.Router();

router.route('/').post(upload.single('invoice'), uploadInvoice).get(getUploadedInvoices);

router.route('/:id').get(getUploadedInvoice).delete(deleteUploadedInvoice);
export default router;
