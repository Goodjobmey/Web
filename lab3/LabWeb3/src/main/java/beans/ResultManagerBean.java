package beans;

import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import lombok.Getter;
import lombok.Setter;
import utility.AreaChecker;
import db.ResultEntity;
import utility.Validate;


import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import jakarta.validation.ValidationException;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Named
@SessionScoped
public class ResultManagerBean implements Serializable {
    @Inject
    private DBManagerBean dbManager;

    private List<ResultEntity> results = new ArrayList<>();

    public void createResult(double x, double y, double r) {

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        try {
            if (!Validate.validateAll(x, y, r)) {
                throw new ValidationException("Validation mistake");
            }
        } catch (ValidationException e) {
            FacesContext.getCurrentInstance().addMessage(null,
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, "Ошибка валидации", e.getMessage()));
            return;
        }

        boolean status = AreaChecker.hit(x, y, r);
        String statusMessage = status ? "Попал" : "Не попал";

        ResultEntity result = new ResultEntity();
        result.setX(Validate.truncate(x));
        result.setY(Validate.truncate(y));
        result.setR(r);
        result.setStatus(statusMessage);
        result.setNow(now.format(formatter));

        dbManager.save(result);

        refreshResults();
    }

    public void clearResults(){
        dbManager.clear();
        refreshResults();
    }

    public void refreshResults() {
        results = dbManager.getAll();
    }

    public List<ResultEntity> getResults() {
        if (results.isEmpty()) {
            refreshResults();
        }
        return results;
    }

}
