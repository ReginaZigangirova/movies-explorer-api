const errorMessages = {
  validationErrorMessage: 'некорректные данные',
  notFoundUserErrorMessage: 'пользователь с таким _id не найден',
  emailConflictErrorMessage: 'такой email уже занят',
  forbiddenErrorMessage: 'нельзя удалить фильм другого пользователя',
  movieNotFoundErrorMessage: 'фильм с указанным _id не найден',
  authorizationErrorMessageJWT: 'необходима авторизация',
  badRequestErrorMessage: 'некорректный адрес URL',
  authorizationErrorMessageLogin: 'неправильный e-mail или пароль',
  notFoundOnSiteErrorMessage: 'страница с таким url не найдена',
  serverErrorMessage: 'ошибка по умолчанию',
};

module.exports = { errorMessages };
