// Валидация для X
const radioButtonsX = document.querySelectorAll('.buttonX');

radioButtonsX.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.checked) {
            const label = this.value;
            const form_x = document.getElementById('form_x');

            form_x.textContent = label;
        }
    });
});

// Валидация для Y
document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById("y");
    if (!inputField) return;

    inputField.addEventListener('input', function() {
        const input = parseFloat(this.value);
        const form_y = document.getElementById('form_y');

        const isValid = !isNaN(input) && input >= -5 && input <= 3;

        if (isValid) {
            this.style.borderBottom = '';
            if (form_y) form_y.textContent = input;
        } else {
            this.style.borderBottom = '2px solid red';
            if (form_y) form_y.textContent = '';
        }
    });
});

// Валидация для R
const radioButtonsR = document.querySelectorAll('.buttonR');

radioButtonsR.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.checked) {
            const label = this.value;
            const form_r = document.getElementById('form_r');

            form_r.textContent = label;
        }
    });
});



document.getElementById('main_button').addEventListener('click', function() {
    const x = document.getElementById('form_x').textContent;
    const y = document.getElementById('form_y').textContent;
    const r = document.getElementById('form_r').textContent;
    const messageDiv = document.getElementById('message');

    messageDiv.style.display = 'none';
    messageDiv.textContent = '';

    // Проверка данных на наличие значений
    if (r === 'Значение R') {
        messageDiv.textContent = "Выберите значение для числа R";
        messageDiv.style.display = 'block';
        return;
    }

    if (y === 'Значение Y') {
        messageDiv.textContent = "Выберите значение для числа Y";
        messageDiv.style.display = 'block';
        return;
    }

    if (x === 'Значение X' || x === "") {
        messageDiv.textContent = "Выберите значение для числа X";
        messageDiv.style.display = 'block';
        return;
    }

    // Формируем параметры для POST-запроса
    const params = new URLSearchParams();
    params.append('x', x);
    params.append('y', y);
    params.append('r', r);

    // Отправка POST-запроса
    fetch('/web2-1.0-SNAPSHOT/controller', {
        method: 'POST',  // Используем метод POST
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'  // Это формат, в котором отправляются данные в теле запроса
        },
        body: params.toString()  // Данные отправляются как строка запроса в теле POST-запроса
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.text();  // Ответ сервера в виде текста
        })
        .then(data => {
            document.getElementById('resultTable').innerHTML = data;  // Вставляем ответ в таблицу
        })
        .catch(error => {
            console.error('Fetch error:', error);  // Логируем ошибку
        });
});