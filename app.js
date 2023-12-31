const process = require('process');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { addMiddlewares } = require('./routes/index');

// Добавляем переменные окружения из файла .env,
// который должен присутствовать только на физическом сервере, не в репозитории.
dotenv.config();

const { PORT = 3000, DATABASE = 'mongodb://0.0.0.0:27017/bitfilmsdb', ALLOW_LOCALHOST = 'false' } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect(DATABASE, { useNewUrlParser: true });

// подключаем мидлвары, включая роуты и всё остальное...
addMiddlewares(app, ALLOW_LOCALHOST === 'true');

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin}: Произошла необработанная ошибка ${err.name} с текстом "${err.message}". Обратите внимание!`);
});

app.listen(PORT, () => {
  console.log(`Запущен сервер с портом ${PORT}`);
});
