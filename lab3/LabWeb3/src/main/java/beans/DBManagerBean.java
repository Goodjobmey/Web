package beans;

import db.ResultEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import java.util.List;

/**
 * Бин, предоставляющий базовые методы, для взаимодействия с базой данных
 */
@Named
@ApplicationScoped
public class DBManagerBean {
    @PersistenceContext
    private EntityManager em;

    @Transactional
    public void save(ResultEntity result) {
        em.persist(result);
    }

    @Transactional
    public void clear() {
        em.createQuery("DELETE FROM ResultEntity").executeUpdate();
    }

    public List<ResultEntity> getAll() {
        return em.createQuery("SELECT r FROM ResultEntity r", ResultEntity.class).getResultList();
    }
}

