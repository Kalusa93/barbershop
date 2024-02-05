const controller = require('../controllers/productsController');
const { Router } = require('express');
const router = Router();
const {upload} = require("../middlewares/multer");
const authMiddleware = require('../middlewares/authMiddleware')

// GET PRODUCTS
router.get('/', controller.products);

router.get('/national', controller.national);

router.get('/imported', controller.imported);

// DETAIL PRODUCTS
router.get('/detail/:id', controller.detail);

// ADD PRODUCTS
router.get('/add', authMiddleware, controller.add);

router.post('/add', upload.array('images', 5), controller.create);

//EDIT PRODUCTS
router.get('/edit/:id', authMiddleware, controller.edit);

router.put('/edit/:id', upload.array('images', 5), controller.update);

// DELETE PRODUCT
router.delete('/delete/:id', authMiddleware, controller.delete);

module.exports = router;