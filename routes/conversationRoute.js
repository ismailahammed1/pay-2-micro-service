const express = require('express');
const {verifyToken} = require('../middlewares/jwt');
const { getConversations, createconversation, getSingleConversation, updateConversation } = require('../controllers/conversationController');

const router = express.Router();


router.get('/',verifyToken,getConversations );
router.post('/',verifyToken,createconversation );
router.get('/single/:id',verifyToken,getSingleConversation );
router.put('/:id',verifyToken,updateConversation );
module.exports = router;