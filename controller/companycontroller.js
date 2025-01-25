import express from 'express';
import multer from 'multer';
import {
  addCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
} from './../handler/companyhandler.js';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, 'public/img');
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
router.route('/').post(upload.single('logo'), addCompany).get(getCompanies);
router
  .route('/:id')
  .get(getCompany)
  .patch(upload.single('logo'), updateCompany)
  .delete(deleteCompany);

export default router;
