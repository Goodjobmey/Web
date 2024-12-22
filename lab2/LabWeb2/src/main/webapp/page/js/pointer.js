const svgGraph = document.getElementById('graph'); // Находим график
const staticLayer = document.getElementById('static-layer'); // Статический слой
const dynamicLayer = document.getElementById('dynamic-layer'); // Динамический слой
const rValueElement = document.getElementById('form_r'); // Элемент для значения R
const radioButtons = document.querySelectorAll('input[name="r"]'); // Радиокнопки R

// Инициализация статического слоя
function initializeStaticLayer() {
    const staticContent = `
        <!-- Оси -->
        <line x1="0" y1="300" x2="800" y2="300" stroke="black" />
        <line x1="300" y1="0" x2="300" y2="600" stroke="black" />
        <!-- Деления -->
        <!-- X -->
        <line x1="400" y1="295" x2="400" y2="305" stroke="black" />
        <text x="395" y="290" font-size="12">R</text>
        <line x1="350" y1="295" x2="350" y2="305" stroke="black" />
        <text x="345" y="290" font-size="12">R/2</text>
        <line x1="250" y1="295" x2="250" y2="305" stroke="black" />
        <text x="235" y="290" font-size="12">-R/2</text>
        <line x1="200" y1="295" x2="200" y2="305" stroke="black" />
        <text x="195" y="290" font-size="12">-R</text>
        <!-- Y -->
        <line x1="295" y1="200" x2="305" y2="200" stroke="black" />
        <text x="310" y="205" font-size="12">R</text>
        <line x1="295" y1="250" x2="305" y2="250" stroke="black" />
        <text x="310" y="255" font-size="12">R/2</text>
        <line x1="295" y1="350" x2="305" y2="350" stroke="black" />
        <text x="310" y="355" font-size="12">-R/2</text>
        <line x1="295" y1="400" x2="305" y2="400" stroke="black" />
        <text x="310" y="405" font-size="12">-R</text>
    `;
    staticLayer.innerHTML = staticContent; // Добавляем статический контент
}

// Обновление динамического слоя
function updateDynamicLayer(rValue) {
    const dynamicContent = `
        <!-- Фигуры -->
        <polygon points="${300},${300} ${300},${300 + 100 * rValue / 2} ${300 - 100 * rValue},${300}" fill="#333" fill-opacity="0.5" stroke="#333" />
        <polygon points="${300},${300} ${300},${300 - 100 * rValue / 2} ${300 + 100 * rValue},${300 - 100 * rValue / 2} ${300 + 100 * rValue},${300}" fill="#333" fill-opacity="0.5" stroke="#333" />
        <path d="M${300},${300} ${300 + 100 * rValue},${300} A${100 * rValue},${100 * rValue} 0 0,1 ${300},${300 + 100 * rValue} Z" fill="#333" fill-opacity="0.5" stroke="#333" />
    `;
    dynamicLayer.innerHTML = dynamicContent; // Обновляем динамический слой
}

// Инициализация графика
initializeStaticLayer(); // Добавляем статические элементы

// Обработчик изменения значения R
radioButtons.forEach(button => {
    button.addEventListener('change', () => {
        const rValue = parseFloat(button.value);
        rValueElement.textContent = rValue; // Устанавливаем значение R
        updateDynamicLayer(rValue); // Обновляем динамический слой
    });
});

// Обработка клика по графику
svgGraph.addEventListener('click', function (event) {
    const rect = svgGraph.getBoundingClientRect(); // Получаем размеры графика
    const offsetX = event.clientX - rect.left; // Вычисляем X в координатах SVG
    const offsetY = event.clientY - rect.top; // Вычисляем Y в координатах SVG

    const centerX = 300; // Координата центра графика по X
    const centerY = 300; // Координата центра графика по Y
    const rValue = parseFloat(rValueElement.textContent); // Получаем значение R

    if (isNaN(rValue)) {
        svgGraph.classList.add('error');
        setTimeout(() => svgGraph.classList.remove('error'), 2000);
        return;
    }

    const xValue = ((offsetX - centerX) / 100 ); // Масштабируем относительно R
    const yValue = ((centerY - offsetY) / 100); // Масштабируем относительно R

    if (xValue < -5 || xValue > 3 || yValue < -5 || yValue > 3) {
        svgGraph.classList.add('error');
        setTimeout(() => svgGraph.classList.remove('error'), 2000);
        return;
    }

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', centerX + xValue * 100);
    circle.setAttribute('cy', centerY - yValue * 100);
    circle.setAttribute('r', 5);
    circle.setAttribute('fill', 'red');
    svgGraph.appendChild(circle);

    // Обновление формы с X и Y значениями
    document.getElementById('form_x').textContent = xValue.toFixed(2);
    document.getElementById('form_y').textContent = yValue.toFixed(2);
});
