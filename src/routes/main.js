const controller = require('../controllers/mainController');
const { Router } = require('express');
const router = Router();

router.get('/', controller.home);

router.get('/us', controller.about);

router.get('/contact', controller.contact);

router.get('/search', controller.search);

module.exports = router;