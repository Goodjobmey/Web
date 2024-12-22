<%@ page import="utils.Result" %>
<%@ page import="servlets.AreaCheckServlet" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>


<!DOCTYPE html>
<html lang="ru-Ru">

<head>
    <!-- ========== Meta Tags ========== -->
    <meta charset="UTF-8">

    <!-- ========== Page Title ========== -->
    <title>MainPage</title>

    <!-- ========== Start Stylesheet ========== -->
    <link rel="stylesheet" href="page/css/table-page.css">
    <link rel="stylesheet" href="page/css/common.css">
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

        <!-- Table -->
        <div class="table">

            <table id="resultsTable">
                <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                    <th>Время Запроса</th>
                </tr>

                <tr>
                        <%
        try {
            List<Result> sessionResults = (List<Result>) request.getSession().getAttribute("results");
            if (sessionResults != null && !sessionResults.isEmpty()) {
                for (Result point : sessionResults) {
    %>
                <tr>
                    <td><%= point.getX() %></td>
                    <td><%= point.getY() %></td>
                    <td><%= point.getR() %></td>
                    <td><%= point.getStatus() %></td>
                    <td><%= point.getNow() %></td>
                </tr>
                    <%
        }
    } else {
    %>
                <tr>
                    <td colspan="4">Нет результатов для отображения.</td>
                </tr>
                    <%
        }
    } catch (Exception e) {
    %>
                <tr>
                    <td colspan="4">Ошибка: <%= e.getMessage() %></td>
                </tr>
                    <%
            e.printStackTrace();
        }
    %>
            </table>

        </div>
    </div>

<!-- Change location -->
<div class="loc-button">
    <a href="index.jsp">Вернуться</a>
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

</body>

</html>