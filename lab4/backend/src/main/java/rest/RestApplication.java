package rest;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

@ApplicationPath("/api")  // Это базовый путь для вашего API
public class RestApplication extends Application {
}
