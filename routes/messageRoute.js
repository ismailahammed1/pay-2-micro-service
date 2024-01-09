const express = require('express');

const {verifyToken} = require('../middlewares/jwt');
const { createMessage, getMessage } = require('../controllers/messageController');

const router = express.Router();

router.post('/',verifyToken, createMessage);
router.get('/:id',verifyToken, getMessage);

module.exports = router;