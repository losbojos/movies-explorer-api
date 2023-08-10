const STATUS_OK = 200; // ОК\успешно
const STATUS_CREATED = 201; // успешно создан ресурс\объект

const INVALID_DATA_ERROR_CODE = 400; // Ошибка в данных
const AUTH_ERROR_CODE = 401; // когда что-то не так при аутентификации или авторизации
const FORBIDDEN_ERROR_CODE = 403; // Запрещен доступ
const NOT_FOUND_ERROR_CODE = 404; // Объект не найден
const CONFLICT_ERROR_CODE = 409; // конфликт в текущем состоянии ресурса
const DEFAULT_ERROR_CODE = 500; // Ошибка на сервере по умолчанию

const INVALID_DATA_ERROR_NAME = 'InvalidDataError';
const AUTH_ERROR_NAME = 'AuthError';
const FORBIDDEN_ERROR_NAME = 'ForbiddenError';
const NOT_FOUND_ERROR_NAME = 'NotFoundError';
const CONFLICT_ERROR_NAME = 'ConflictError';
const DEFAULT_ERROR_NAME = 'DefaultError';

const INVALID_DATA_ERROR_MSG = 'Переданы некорректные данные';
const AUTH_ERROR_MSG = 'Ошибка авторизации';
const FORBIDDEN_ERROR_MSG = 'Доступ запрещен';
const NOT_FOUND_ERROR_MSG = 'Объект не найден';
const CONFLICT_ERROR_MSG = 'Конфликт в состоянии объекта';
const DEFAULT_ERROR_MSG = 'Ошибка на сервере';

module.exports = {
  STATUS_OK,
  STATUS_CREATED,

  INVALID_DATA_ERROR_CODE,
  AUTH_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  DEFAULT_ERROR_CODE,

  INVALID_DATA_ERROR_NAME,
  AUTH_ERROR_NAME,
  FORBIDDEN_ERROR_NAME,
  NOT_FOUND_ERROR_NAME,
  CONFLICT_ERROR_NAME,
  DEFAULT_ERROR_NAME,

  INVALID_DATA_ERROR_MSG,
  AUTH_ERROR_MSG,
  FORBIDDEN_ERROR_MSG,
  NOT_FOUND_ERROR_MSG,
  CONFLICT_ERROR_MSG,
  DEFAULT_ERROR_MSG,
};
