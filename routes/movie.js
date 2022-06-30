const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');

router.get('/', getMovies); // возвращает все сохранённые текущим  пользователем фильмы
router.post('/', createMovie); // создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
router.delete('/_id', deleteMovie); // удаляет сохранённый фильм по id
module.exports = router;
