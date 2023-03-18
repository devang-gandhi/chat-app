const { register, login, getUsers, acceptRequest } = require('../controllers/userController');
const { auth } = require('../middlewares/auth');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/allusers/:id',auth, getUsers);
router.post('/acceptRequest/:id/:req_user_id', auth, acceptRequest);

module.exports = router;