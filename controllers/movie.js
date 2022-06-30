const Movie = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFound = require('../errors/NotFound');
const InvalidRequest = require('../errors/InvalidRequest');
// возвращает все сохранённые текущим  пользователем фильмы
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      next(err);
    });
};

// создаёт фильм
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      next(err);
    });
};

// удаляет сохранённый фильм по id
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFound('фильм не найден');
      }
      if (req.user._id === movie.owner.toString()) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then(() => {
            res.send(movie);
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new InvalidRequest('некорректный id'));
              return;
            }
            next(err);
          });
        return;
      }
      throw new ForbiddenError('невозможно удалить фильм других пользователей');
    })
    .catch((err) => next(err));
};
module.exports = { getMovies, createMovie, deleteMovie };
