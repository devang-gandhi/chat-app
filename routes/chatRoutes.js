const { addmsg, getmsg } = require('../controllers/chatController');
const { auth } = require('../middlewares/auth');

const router = require('express').Router();

router.post('/savemsg', auth, addmsg);
router.post('/getmsg', auth, getmsg);

module.exports = router;