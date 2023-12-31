# Movies-explorer-api. Поиск и сохранение карточек любимых фильмов. Серверная часть.
[ Домашняя страница (демо)](https://lifemovie.nomoreparties.co "https://lifemovie.nomoreparties.co")  
[API сервера](https://api.lifemovie.nomoreparties.co)

## Описание
Данный проект выполнялся в рамках дипломной работы на курсе "Веб-разработчик" от Я.Практикум. 
В проекте можно зарегистрироваться и воспользоваться поиском по имеющейся базе карточек кинофильмов, сохранять понравившиеся\любимые фильмы в списке избранных.

Более подробное описание смотрите на странице [фронт-енд части проекта](https://github.com/losbojos/movies-explorer-frontend)

## Ссылки

+ [Репозиторий серверной части (backend)](https://github.com/losbojos/movies-explorer-api)
+ [Деплой серверной части (API)](https://api.lifemovie.nomoreparties.co)
+ [Проект клиентской части (frontend)](https://github.com/losbojos/movies-explorer-frontend)

## Инструкции

### Развертывание сервера

1. Установите необходимые пакеты Git и MongoDB.
2. Склонируйте или скачайте архив и распакуйте [исходный код бэк-енда](https://github.com/losbojos/movies-explorer-api.git)
3. Откройте папку с исходным кодом в Visual Studio Code.
4. Откройте окно терминала и запустите в корневой папке проекта команду установки зависимостей.
```bash
$ npm install
```
5. Если будете разворачивать и клиентскую часть, создайте файл .env в корневой папке репозитория с содержимым:
```bash
ALLOW_LOCALHOST=true # Разрешить доступ к серверу с локального адреса
PORT=3003 # Порт запуска сервера
```
6. Запустите локально сервер командой 
```bash
$ npm start
```

## Используемые техники и технологии

* Node.js
* Express.js
* MongoDB
* REST API
* Nginx

## Статус
Проект завершен
