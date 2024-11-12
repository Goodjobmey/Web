package src.java;

import src.java.exeption.ValidationException;

public class Checker {
    public static boolean hit(double x, double y, double r) {
        return inRect(x, y, r) || inTriangle(x, y, r) || inCircle(x, y, r);
    }

    private static boolean inRect(double x, double y, double r) {
        return x <= 0 && y <= 0 && y >= -r/2;
    }

    private static boolean inTriangle(double x, double y, double r) {
        return x >= 0 && y >= 0 && x <= r && y <= r/2 && x <= (float) r /2 && y - x + r >= 0;
    }

    private static boolean inCircle(double x, double y, double r) {
        return x >= 0 && y <= 0 && x <= (float) r /2 && y >= -r/2 && ((Math.pow(x, 2) + Math.pow(y, 2) - Math.pow((double) r /2, 2)) <= 0);
    }
}