import express from 'express'
const router = express.Router()
import {
  getCats,
  getCatById,
  deleteCat,
  createCat,
  updateCat,
  createCatReview,
  getTopCats,
} from '../controllers/catController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getCats).post(protect, admin, createCat)
router.route('/:id/reviews').post(protect, createCatReview)
router.get('/top', getTopCats)
router
  .route('/:id')
  .get(getCatById)
  .delete(protect, admin, deleteCat)
  .put(protect, admin, updateCat)

export default router
