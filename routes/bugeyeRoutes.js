const express = require('express')
const router = express.Router();
const controller = require('../controllers/bugeyeController')
const { ensureAuth, ensureGuest } = require('../middleware/authenticate');

router.get('/', controller.login)
router.get("/dashboardA", ensureAuth, controller.landing_page);

module.exports = router;