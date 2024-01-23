const controller = require('../controllers/productsController');
const { Router } = require('express');
const router = Router();
const {upload} = require("../middlewares/multer");

// GET PRODUCTS
router.get('/', controller.products);

router.get('/national', controller.national);

router.get('/imported', controller.imported);

// DETAIL PRODUCTS
router.get('/detail/:id', controller.detail);

// ADD PRODUCTS
router.get('/add', controller.add);

router.post('/add', upload.single('image'), controller.create);

//EDIT PRODUCTS
router.get('/edit/:id', controller.edit);

router.put('/edit/:id', upload.single('image'), controller.update);

// DELETE PRODUCT
router.delete('/delete/:id', controller.delete);

module.exports = router;