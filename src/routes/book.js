const express = require('express');
const router = express.Router();

const bookController = require('../app/controllers/bookController');

router.get('/search', bookController.search);
router.get('/create', bookController.create);
router.get('/store', bookController.store);
router.get('/trash', bookController.trash);

router.put('/:id', bookController.update);
router.patch('/:id/restore', bookController.restore);

router.get('/:id/edit', bookController.edit);
router.post('/addbook', bookController.addbook);

router.delete('/:id', bookController.delete);
router.delete('/:id/force', bookController.forcedelete);





module.exports = router;
