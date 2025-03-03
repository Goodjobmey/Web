package db;

import jakarta.enterprise.context.ApplicationScoped;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.io.Serializable;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Data
@Entity
@Table(name = "results")
@NoArgsConstructor
public class ResultEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resultId;

    private double x;
    private double y;
    private double r;

    private String status;

    private String now;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    public ResultEntity(double x, double y, double r, String status, String now, UserEntity user) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.status = status;
        this.now = now;
        this.user = user;
    }
}
