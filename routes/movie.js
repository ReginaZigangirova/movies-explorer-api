const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const { validationCreateMovie, validationDeleteMovie } = require('../middlewares/validators');

router.get('/', getMovies); // возвращает все сохранённые текущим  пользователем фильмы
router.post('/', validationCreateMovie, createMovie); // создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
router.delete('/:movieId', validationDeleteMovie, deleteMovie); // удаляет сохранённый фильм по id
module.exports = router;
