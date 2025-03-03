package managers;

import db.ResultEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.PersistenceContext;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.util.List;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class ResultManager {

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public void saveResult(ResultEntity result) {
        em.persist(result);
    }

    public List<ResultEntity> findResultsByUserId(Long userId) {
        return em.createQuery("SELECT r FROM ResultEntity r WHERE r.user.id = :userId", ResultEntity.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    @Transactional
    public void deleteResults(Long userId) {
        em.createQuery("DELETE FROM ResultEntity r WHERE r.user.id = :userId")
                .setParameter("userId", userId)
                .executeUpdate();
    }
}
