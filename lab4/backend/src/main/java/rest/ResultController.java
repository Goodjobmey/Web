package rest;

import db.ResultEntity;
import db.UserEntity;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.ValidationException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import managers.ResultManager;
import managers.UserManager;
import utility.Validate;
import utility.AreaChecker;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Path("/results")
public class ResultController {

    @Inject
    private ResultManager resultManager;

    @Inject
    private UserManager userManager;

    @POST
    @Path("/{userId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response createResult(@PathParam("userId") Long userId, ResultEntity data) {
        UserEntity user = userManager.findById(userId);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\": \"User not found\"}").build();
        }

        try{
            if (!Validate.validateAll(data.getX(), data.getY(), data.getR())) {
                throw new ValidationException("Validation mistake");}
        } catch (ValidationException e) {
            throw new RuntimeException(e);
        }

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        boolean status = AreaChecker.hit(data.getX(), data.getY(), data.getR());
        String statusMessage = status ? "Попал" : "Не попал";

        ResultEntity result = new ResultEntity();
        result.setX(Validate.truncate(data.getX()));
        result.setY(Validate.truncate(data.getY()));
        result.setR(data.getR());
        result.setStatus(statusMessage);
        result.setNow(now.format(formatter));
        result.setUser(user);

        resultManager.saveResult(result);
        return Response.status(Response.Status.CREATED).entity(result).build();
    }

    @GET
    @Path("/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response getResultsByUser(@PathParam("userId") Long userId) {
        UserEntity user = userManager.findById(userId);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("{\"error\": \"User not found\"}").build();
        }

        List<ResultEntity> results = resultManager.findResultsByUserId(userId);
        return Response.ok(results).build();
    }


    @DELETE
    @Path("/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response deleteResults(@PathParam("userId") Long userId) {
        resultManager.deleteResults(userId);
        return Response.status(Response.Status.NO_CONTENT).build();
    }


}

