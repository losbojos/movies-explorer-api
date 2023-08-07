const process = require('process');
const express = require('express');
const dotenv = require('dotenv');

const { PORT = 3000 } = process.env;
const app = express();

// Добавляем переменные окружения из файла .env,
// который должен присутствовать только на физическом сервере, не в репозитории.
dotenv.config();

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin}: Произошла необработанная ошибка ${err.name} с текстом "${err.message}". Обратите внимание!`);
});

app.listen(PORT, () => {
  console.log(`Запущен сервер с портом ${PORT}`);
});
