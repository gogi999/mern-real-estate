import express from 'express';

import {
  createProperty,
  deleteProperty,
  getAllFromSpecificType,
  getAllProperties,
  getCountOfTypes,
  getFeatured,
  getProperty,
  updateProperty,
} from '../controllers/property.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/getAll', getAllProperties);
router.get('/find/featured', getFeatured);
router.get('/find', getAllFromSpecificType);
router.get('/find/types', getCountOfTypes);
router.get('/find/:id', getProperty);
router.post('/', verifyToken, createProperty);
router.put('/:id', verifyToken, updateProperty);
router.delete('/:id', verifyToken, deleteProperty);

export default router;
