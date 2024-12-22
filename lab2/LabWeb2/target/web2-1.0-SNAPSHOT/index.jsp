<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="ru-Ru">

<head>
    <!-- ========== Meta Tags ========== -->
    <meta charset="UTF-8">

    <!-- ========== Page Title ========== -->
    <title>MainPage</title>

    <!-- ========== Start Stylesheet ========== -->
    <link rel="stylesheet" href="page/css/area.css">
    <link rel="stylesheet" href="page/css/common.css">
    <link rel="stylesheet" href="page/css/error.css">
    <!-- ========== End Stylesheet ========== -->
</head>

<body>

<!--Header ============================================= -->
<header>
    <!-- Start Navigation -->
    <nav class="navigation">
        <div class="container">
            <img class="Logo" src="page/img/logoITMO.png" alt="../img/itmo_logo" width="10%px">
            <h1>Веб-программирование: Лабораторная работа №2</h1>
            <p>Кузьмина Ольга Игоревна 412986 вариант: ###</p>
            <noscript>Включите JS пожалуйста :)</noscript>
        </div>
    </nav>
    <!-- End Navigation -->
</header>
<!-- End Header -->

<!--Area ============================================= -->
<div class="area">

    <!-- Graph -->
    <div class="graph">
        <svg id="graph" width="800" height="600" xmlns="http://www.w3.org/2000/svg">
            <g id="static-layer">
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
            </g>

            <g id="dynamic-layer">
                 Фигуры
                <polygon points="300,300 300,350 200,300" fill="#333" fill-opacity="0.5" stroke="#333" />
                <polygon points="300,300 300,250 400,250 400,300" fill="#333" fill-opacity="0.5" stroke="#333" />
                <path d="M300,300 400,300 A100,100 0,0,1 300,400 Z" fill="#333" fill-opacity="0.5" stroke="#333" />
            </g>

        </svg>
    </div>

    <!-- Container -->
    <div class="container">
        <!-- X input -->
        <div class="input-group">
            <label for="x">Выберите X: </label>
            <div class="input-part" id="x">
                <input class="buttonX" type="radio"  name="x" value="-3"> -3
                <input class="buttonX" type="radio" name="x" value="-2"> -2
                <input class="buttonX" type="radio" name="x" value="-1"> -1
                <input class="buttonX" type="radio" name="x" value="0"> 0
                <input class="buttonX" type="radio" name="x" value="1"> 1
                <input class="buttonX" type="radio" name="x" value="2"> 2
                <input class="buttonX" type="radio" name="x" value="3"> 3
                <input class="buttonX" type="radio" name="x" value="4"> 4
                <input class="buttonX" type="radio" name="x" value="5"> 5
            </div>
        </div>

        <!-- Y input -->
        <div class="input-group">
            <label for="y">Выберите Y: </label>
            <input class="inputY" type="text" id="y" name="y" placeholder="(-5 ... 3)">
        </div>

        <!-- R input -->
        <div class="input-group">
            <label for="r">Выберите R: </label>
            <div class="input-part" id="r">
                <input class="buttonR" type="radio"  name="r" value="1"> 1
                <input class="buttonR" type="radio" name="r" value="1.5"> 1.5
                <input class="buttonR" type="radio" name="r" value="2"> 2
                <input class="buttonR" type="radio" name="r" value="2.5"> 2.5
                <input class="buttonR" type="radio" name="r" value="3"> 3
            </div>
        </div>

        <!-- Submit -->
        <button class="button" type="submit" id="main_button">Проверить</button>
        <div id="message"></div>

        <!-- Table -->
        <div class="table">

            <table id="resultsTable">
                <thead>
                <tr>
                    <th>№</th>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                    <th>Время Запроса</th>
                </tr>
                <tr>
                    <th>№</th>
                    <td id="form_x">X</td>
                    <td id="form_y">Y</td>
                    <td id="form_r">R</td>
                    <td>Результат</td>
                    <td>Время Запроса</td>
                </tr>
                </thead>
                <tbody id="resultTable">
                <!-- Данные будут добавляться сюда -->
                </tbody>
            </table>

        </div>

        <!-- Change location -->
        <div class="loc-button">
            <a href="table.jsp">Показать только табличку</a>
        </div>
    </div>


</div>
<!-- End Area -->

<!--Footer ============================================= -->
<footer>
    <p>Разработано в рамках курса "Веб-программирование"</p>
    <p>Университет ИТМО, осень 2024</p>
</footer>
<!-- End Footer -->

<!-- ========== Start Script ========== -->
<script src="page/js/script.js"></script>
<script src="page/js/pointer.js"></script>

</body>

</html>
