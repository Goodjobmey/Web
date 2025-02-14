package db;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import java.io.Serializable;


/**
 * Сущность для базы данных в виде параметров точки, которую настроит пользователь
 */
@Getter
@Setter
@Entity
@Table(name = "coordinates")
@NoArgsConstructor
public class ResultEntity implements Serializable {
    private double x;
    private double y;
    private double r;

    private String status;
    private String now;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}