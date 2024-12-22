package servlets;

import exeptions.ValidationException;
import utils.Validate;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            double x = Double.parseDouble(request.getParameter("x"));
            double y = Double.parseDouble(request.getParameter("y"));
            double r = Double.parseDouble(request.getParameter("r"));

            if (!Validate.validateAll(x, y, r)) {
                throw new ValidationException("Validation mistake");
            }

            request.setAttribute("x", x);
            request.setAttribute("y", y);
            request.setAttribute("r", r);
            getServletContext().getRequestDispatcher("/areaCheck").forward(request, response);

        } catch (NumberFormatException | ValidationException e) {
            sendErrorResponse(response, "Invalid input: " + e.getMessage());
        }
    }

    private void sendErrorResponse(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().write("<html><body><h3>" + message + "</h3></body></html>");
    }
}
