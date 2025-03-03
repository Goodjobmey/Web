package managers;

import db.UserEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.PersistenceContext;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.persistence.NoResultException;

@ApplicationScoped
public class UserManager {

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public UserEntity findByUsername(String username) {
        try {
            return em.createQuery("SELECT u FROM UserEntity u WHERE u.username = :username", UserEntity.class)
                    .setParameter("username", username)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Transactional
    public void createUser(UserEntity user) {
        em.persist(user);
    }

    public UserEntity findById(Long userId) {
        return em.find(UserEntity.class, userId);
    }
}
