package servlets;

import jakarta.servlet.http.HttpSession;
import utils.AreaChecker;
import utils.Result;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/areaCheck")
public class AreaCheckServlet extends HttpServlet {

//    private static final List<Result> results = new ArrayList<>();
    private static final int MAX_RESULTS = 8;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        double x = (double) request.getAttribute("x");
        double y = (double) request.getAttribute("y");
        double r = (double) request.getAttribute("r");

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        boolean status = AreaChecker.hit(x, y, r);
        String statusMessage = status ? "Попал" : "Не попал";

        HttpSession session = request.getSession();
        List<Result> sessionResults = (List<Result>) session.getAttribute("results");

        if (sessionResults == null) {
            sessionResults = new ArrayList<>();
            session.setAttribute("results", sessionResults);
        }

        synchronized (sessionResults) {
            // Добавляем новый результат
            sessionResults.add(new Result(x, y, r, statusMessage, now.format(formatter)));

            // Ограничиваем размер списка
            if (sessionResults.size() > MAX_RESULTS) {
                sessionResults.remove(0);
            }
        }

        // Генерация HTML-ответа
        StringBuilder tableBuilder = new StringBuilder();
        tableBuilder.append("<table border='1'><tr>")
                .append("<th>№</th><th>x</th><th>y</th><th>r</th><th>Результат</th><th>Текущее время</th></tr>");

        synchronized (sessionResults) {
            for (int i = 0; i < sessionResults.size(); i++) {
                Result result = sessionResults.get(i);
                String statusClass = result.getStatus().equals("Попал") ? "green" : "red";
                tableBuilder.append("<tr>")
                        .append("<td>").append(i + 1).append("</td>")
                        .append("<td>").append(result.getX()).append("</td>")
                        .append("<td>").append(result.getY()).append("</td>")
                        .append("<td>").append(result.getR()).append("</td>")
                        .append("<td class='").append(statusClass).append("'>").append(result.getStatus()).append("</td>")
                        .append("<td>").append(result.getNow()).append("</td>")
                        .append("</tr>");
            }
        }

        tableBuilder.append("</table>");


        // Возвращаем HTML
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().write(tableBuilder.toString());
    }

}
