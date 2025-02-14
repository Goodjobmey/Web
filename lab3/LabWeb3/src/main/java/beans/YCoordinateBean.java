package beans;

import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Named
@SessionScoped
public class YCoordinateBean implements Serializable {
    private double y = 0.0;
}