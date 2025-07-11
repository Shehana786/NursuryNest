const express = require('express');
const router = express.Router();
const upload = require('../Middleware/uploads');
const plantController = require('../Controller/plantController');

// These routes are now relative to /api/admin/products

router.post('/', upload.single('image'), plantController.addPlant);
router.get('/', plantController.getAllPlants);
router.delete('/:id', plantController.deletePlant);
router.put('/:id', upload.single('image'), plantController.updatePlant);
router.get('/categories', plantController.getCategories);
router.get('/featured', plantController.getFeatured);






module.exports = router;
