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
public class RCoordinateBean implements Serializable {
    private double r = 1.0;
}