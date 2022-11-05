const multer = require('multer');
const express = require('express');

const router = express.Router();
const {
	createProduct,
	getOneProduct,
	getAllProducts,
	updateProduct,
	deleteProduct,
	createReview
} = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './server/assets');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname.toLowerCase().split(' ').join('-')}`);
	}
});

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype === 'image/png' ||
			file.mimetype === 'image/jpg' ||
			file.mimetype === 'image/jpeg' ||
			file.mimetype === 'image/webp'
		) {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Only .png, .jpg, and .jpeg format allowed!'));
		}
	}
});

router.post('/', protect, upload.single('image'), createProduct);
router.get('/:id', getOneProduct);
router.get('/', getAllProducts);
router.put('/:id', protect, upload.single('image'), updateProduct);
router.delete('/:id', protect, deleteProduct);
router.post('/:id/reviews', protect, createReview); // ! Should this be PUT instead?

// PUT user write review
// PUT user edit review
// PUT user delete review

module.exports = router;
