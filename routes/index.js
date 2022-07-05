const router = require('express').Router();
const routerUser = require('./user');
const routerMovie = require('./movie');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/user');
const NotFound = require('../errors/NotFound');
const { validationLogin, validationCreateUser } = require('../middlewares/validators');
const { errorMessages } = require('../utils/constants');

router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, login);
router.use(auth);
router.use('/users', routerUser);
router.use('/movies', routerMovie);

router.use('*', auth, (req, res, next) => {
  next(new NotFound(errorMessages.notFoundOnSiteErrorMessage));
});

module.exports = router;
