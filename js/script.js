"use strict";

// Выбираем элементы ввода для рублей и долларов.
const inputRub = document.querySelector('#rub'), // Поле ввода рублей.
      inputUsd = document.querySelector('#usd'); // Поле ввода долларов.

// Добавляем обработчик события 'input' на поле ввода рублей.
inputRub.addEventListener('input', () => {
      const request = new XMLHttpRequest();// Создаем новый объект XMLHttpRequest для выполнения HTTP-запроса.

    // Настраиваем запрос:
    // 1. Метод: GET (получение данных).
    // 2. URL: 'js/current.json' — файл с данными.
    request.open('GET', 'js/current.json');

    // Устанавливаем заголовок, указывая, что данные передаются в формате JSON.
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); // Исправлено 'aplication' на 'application'.

    // Отправляем запрос на сервер.
    request.send();

    // Обработчик события 'load', который срабатывает, когда запрос завершен.
    request.addEventListener('load', () => {
        // Проверяем статус ответа. Если статус 200 (успешно):
        if (request.status === 200) {
            // Парсим полученные данные из строки JSON в объект.
            const data = JSON.parse(request.response);

            // Вычисляем значение в долларах, деля введенные рубли на курс (data.current.usd).
            // Результат округляем до 2 знаков после запятой.
            inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);
        } else {
            // Если статус не 200, выводим сообщение об ошибке.
            inputUsd.value = "Что-то пошло не так";
        }
    });

    // Свойства объекта XMLHttpRequest:
    // request.status — код состояния HTTP (например, 200, 404).
    // request.statusText — текстовое описание статуса (например, 'OK' или 'Not Found').
    // request.response — ответ от сервера (например, данные JSON).
    // request.readyState — текущее состояние запроса (0-4, где 4 означает завершенный запрос).
});
