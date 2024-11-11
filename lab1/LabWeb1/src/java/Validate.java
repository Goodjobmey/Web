package src.java;

public class Validate {
    public static boolean validateAll(double x, double y, double r){
        return validateX(x) && validateY(y) && validateR(r);
    }

    public static boolean validateX(double x) {
        return x >= -2 && x <= 2 && x % 0.5 == 0;
    }

    public static boolean validateY(double y) {
        return y >= -3 && y <= 5;
    }

    public static boolean validateR(double r) {
        return r >= 1 && r <= 4;
    }
}
