package src.java;
import com.fastcgi.FCGIInterface;
import src.java.exeption.ValidationException;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


public class Main {

    private static final List<Result> results = new ArrayList<>();
    private static final int MAX_RESULTS = 8; // Максимальное количество хранимых результатов

    public static void main(String[] args) throws IOException {
        FCGIInterface fcgiInterface = new FCGIInterface();

        while (fcgiInterface.FCGIaccept() >= 0) {
            LocalDateTime now = LocalDateTime.now();
            long startTime = System.nanoTime();

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            FCGIInterface.request.inStream.fill();

            String content = (String) FCGIInterface.request.params.get("QUERY_STRING");
            double x = 0.0;
            double y = 0.0;
            double r = 0.0;

            try {
                String[] coors = content.split("&");
                if (coors.length != 3) {
                    throw new IllegalArgumentException("Invalid request format: should be 3 parameters");
                }

                for (String coor : coors) {
                    String[] pair = coor.split("=");
                    if (pair.length != 2) {
                        throw new IllegalArgumentException("Invalid request : " + coor);
                    }

                    String regex = "^-?\\d+(\\.\\d{1,5})?$";

                    switch (pair[0]) {
                        case "x":
                            if (!pair[1].matches(regex)) {
                                throw new IllegalArgumentException("Invalid value for x: " + pair[1]);
                            }
                            x = Double.parseDouble(pair[1]);
                            break;
                        case "y":
                            if (!pair[1].matches(regex)) {
                                throw new IllegalArgumentException("Invalid value for y: " + pair[1]);
                            }
                            y = Double.parseDouble(pair[1]);
                            break;
                        case "r":
                            if (!pair[1].matches(regex)) {
                                throw new IllegalArgumentException("Invalid value for r: " + pair[1]);
                            }
                            r = Double.parseDouble(pair[1]);
                            break;
                        default:
                            throw new IllegalArgumentException("Invalid parameter: " + pair[0]);
                    }
                }

                if(!Validate.validateAll(x, y, r)) {throw new ValidationException("Validation mistake");}

                boolean status = getStatus(x, y, r);
                    String statusMessage = status ? "Попал" : "Не попал";

                    // Добавляем результат в список и очищаем, если превышено максимальное количество
                    long elapsedTime = (System.nanoTime() - startTime);
                    results.add(new Result(x, y, r, statusMessage, now.format(formatter), elapsedTime));
                    if (results.size() > MAX_RESULTS) {
                        results.remove(0); // Удаляем самый старый результат
                    }

                    // Формируем HTML-таблицу
                    StringBuilder tableBuilder = new StringBuilder();
                    tableBuilder.append("<table border='1' id='resultTable123'><tr><th>№</th><th>x</th><th>y</th><th>r</th><th>Результат</th><th>Текущее время</th><th>Время работы (нс)</th></tr>");
                    for (int i = 0; i < results.size(); i++) {
                        Result result = results.get(i);
                        String statusClass = result.getStatus().equals("Попал") ? "green" : "red";
                        tableBuilder.append("<tr>")
                                .append("<td>").append(i + 1).append("</td>")
                                .append("<td>").append(result.getX()).append("</td>")
                                .append("<td>").append(result.getY()).append("</td>")
                                .append("<td>").append(result.getR()).append("</td>")
                                .append("<td id='resultStatus' class='").append(statusClass).append("'>").append(result.getStatus()).append("</td>")
                                .append("<td>").append(result.getNow()).append("</td>")
                                .append("<td>").append(result.getTime()).append("</td>")
                                .append("</tr>");
                    }
                    tableBuilder.append("</table>");

                    content = tableBuilder.toString();

                    String httpResponse = "Status: 200 OK\n" +
                            "Content-Type: text/html\n" +
                            "Content-Length: %d\n\n%s"
                                    .formatted(content.getBytes(StandardCharsets.UTF_8).length, content);
                    System.out.println(httpResponse);


            } catch (IllegalArgumentException | ValidationException e) {
                sendErrorResponse(e.getMessage());
            } catch (ArrayIndexOutOfBoundsException e) {
                sendErrorResponse("Invalid request format");
            }
        }
    }

    public static boolean getStatus(double x, double y, double r) {
        return Checker.hit(x, y, r);
    }

    private static void sendErrorResponse(String message) {
        message = URLDecoder.decode(message, StandardCharsets.UTF_8);

        String httpResponse = "Status: 400 Bad Request\n" +
                "Content-Type: text/html\n" +
                "Content-Length: %d\n\n%s".formatted(message.getBytes(StandardCharsets.UTF_8).length, message);
        System.out.println(httpResponse);
    }
}