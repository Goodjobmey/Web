// Валидация для Y
//document.getElementById('y').addEventListener('input', function() {
//
//    const input = this.value;
//    const form_y = document.getElementById('form_y');
//
//    const isValid = /^-?\d*\.?\d*$/.test(input) && input.lt >= -3 && input.lt <= 5;
//
//    if (isValid) {
//        this.style.borderBottom = '';
//        form_y.textContent = input;
//    } else {
//        this.style.borderBottom = '2px solid red';
//        form_y.textContent = '';
//    }
//});

document.getElementById('y').addEventListener('input', function() {

    const input = this.value;
    const form_y = document.getElementById('form_y');

    // Проверка, является ли введенное значение числом
    const isNumber = /^-?\d*\.?\d*$/.test(input);

    if (isNumber) {
        const yValue = new Big(input);

        // Проверка диапазона с использованием gte и lte
        const isValid = yValue.gte(-3) && yValue.lte(5);

        if (isValid) {
            this.style.borderBottom = '';
            form_y.textContent = input;
        } else {
            this.style.borderBottom = '2px solid red';
            form_y.textContent = '';
        }
    } else {
        this.style.borderBottom = '2px solid red';
        form_y.textContent = '';
    }
});


// Валидация для R
//document.getElementById('r').addEventListener('input', function() {
//
//    const input = this.value;
//    const form_r = document.getElementById('form_r');
//
//    const isValid = /^-?\d*\.?\d*$/.test(input) && input.lt >= 1 && input.lt <= 4;
//
//    if (isValid) {
//        this.style.borderBottom = '';
//        form_r.textContent = input;
//    } else {
//        this.style.borderBottom = '2px solid red';
//        form_r.textContent = '';
//    }
//});

document.getElementById('r').addEventListener('input', function() {

    const input = this.value;
    const form_r = document.getElementById('form_r');

    // Проверка, является ли введенное значение числом
    const isNumber = /^-?\d*\.?\d*$/.test(input);

    if (isNumber) {
        const rValue = new Big(input);

        // Проверка диапазона с использованием gte и lte
        const isValid = rValue.gte(1) && rValue.lte(4);

        if (isValid) {
            this.style.borderBottom = '';
            form_r.textContent = input;
        } else {
            this.style.borderBottom = '2px solid red';
            form_r.textContent = '';
        }
    } else {
        this.style.borderBottom = '2px solid red';
        form_r.textContent = '';
    }
});


// Валидация для X

const radioButtons = document.querySelectorAll('.buttonX');

radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.checked) {
            const label = this.value;
            const form_x = document.getElementById('form_x');

            form_x.textContent = label;
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

        // Формируем параметры для GET-запроса
        const queryParams = new URLSearchParams({ x, y, r });


        fetch(`/fcgi-bin/labWeb1.jar?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/html'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('resultTable').innerHTML = data;
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    });



function changeColor() {
    const input = document.getElementById('resultStatus');
    const value = input.value;

    if (value === 'Попал') {
        input.classList.add('green');
    } else if (value === 'Не попал') {
        input.classList.add('red');
    }
}