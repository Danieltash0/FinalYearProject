const express = require('express');
const router = express.Router();
const cattleController = require('../controllers/cattleController');
const { authenticateToken, requireRole } = require('../middleware/auth');

router.use(authenticateToken);

// Every signed-in role can view; admin, manager and worker can register cattle
router.get('/', cattleController.getAllCattle);
router.get('/:id', cattleController.getCattleById);
router.post('/', requireRole(['admin', 'manager', 'worker']), cattleController.createCattle);

// Editing and removing records is restricted to admin and manager
router.put('/:id', requireRole(['admin', 'manager']), cattleController.updateCattle);
router.delete('/:id', requireRole(['admin', 'manager']), cattleController.deleteCattle);

module.exports = router;
