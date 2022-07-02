const router = require('express').Router();
const { validationGetUser, validationUpdateUser } = require('../middlewares/validators');

const { getCurrentUser, updateUser } = require('../controllers/user');

router.get('/me', validationGetUser, getCurrentUser); // возвращает информацию о пользователе (email и имя)
router.patch('/me', validationUpdateUser, updateUser); // обновляет информацию о пользователе (email и имя)
module.exports = router;
