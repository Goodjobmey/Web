package db;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.mindrot.jbcrypt.BCrypt;

import java.util.Objects;

@Data
@Table(name = "users")
@NoArgsConstructor
@Entity
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    public UserEntity(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public boolean checkPassword(String password) {
        return Objects.equals(password, this.password);
    }

}

