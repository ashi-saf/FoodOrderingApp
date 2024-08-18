const express = require('express');
const {
  addFood,
  listFood,
  removeFood,
  updateFood,
  getFood,
} = require('../controllers/foodController.js');
const multer = require('multer');
const router = express.Router();

//image storage engine
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, callback) => {
    return callback(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post('/add', upload.single('image'), addFood);

router.get('/list', listFood);
router.post('/remove', removeFood);
// Route for updating a food item
router.get('/:id', getFood);
router.put('/update/:id', upload.single('image'), updateFood);
module.exports = router;
