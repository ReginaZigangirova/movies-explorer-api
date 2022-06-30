const router = require('express').Router();

const { getCurrentUser, updateUser } = require('../controllers/user');

router.get('/me', getCurrentUser); // возвращает информацию о пользователе (email и имя)
router.patch('/me', updateUser); // обновляет информацию о пользователе (email и имя)
module.exports = router;
