package utils;

public class Validate {
    public static boolean validateAll(double x, double y, double r){
        return validateX(x) && validateY(y) && validateR(r);
    }

    public static boolean validateX(double x) {
        return x >= -3 && x <= 5;
    }

    public static boolean validateY(double y) {

        return y >= -5 && y <= 3;
    }

    public static boolean validateR(double r) {
        return r >= 1 && r <= 3 && r % 0.5 == 0;
    }
}