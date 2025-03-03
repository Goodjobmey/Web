package rest;

import db.UserEntity;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import managers.UserManager;

@Path("/users")
public class UserController {

    @Inject
    private UserManager userManager;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response createUser(UserEntity user) {
        if (userManager.findByUsername(user.getUsername()) != null) {
            return Response.status(Response.Status.CONFLICT)
                    .entity("{\"error\": \"User already exists\"}").build();
        }
        userManager.createUser(user);
        return Response.status(Response.Status.CREATED).entity(user).build();
    }

    @GET
    @Path("/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(@PathParam("username") String username) {
        UserEntity user = userManager.findByUsername(username);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(user).build();
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response login(UserEntity loginDetails) {
        try {
            System.out.println("Login attempt for user: " + loginDetails.getUsername());

            UserEntity user = userManager.findByUsername(loginDetails.getUsername());

            if (user != null) {
                System.out.println("User found in database: " + user.getUsername());
                System.out.println("writed password: " + loginDetails.getPassword());

                if (user.checkPassword(loginDetails.getPassword())) {
                    System.out.println("Password is correct");
                    return Response.ok(user).build();
                } else {
                    System.out.println("Invalid password for user: " + loginDetails.getUsername());
                    System.out.println(loginDetails.getPassword() + " isnt eq to " + user.getPassword());
                    return Response.status(Response.Status.UNAUTHORIZED)
                            .entity("{\"error\": \"Invalid credentials\"}").build();
                }
            }

            System.out.println("User not found, creating new user...");
            UserEntity newUser = new UserEntity(loginDetails.getUsername(), loginDetails.getPassword());
            userManager.createUser(newUser);

            return Response.status(Response.Status.CREATED).entity(newUser).build();

        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\": \"Internal server error\"}").build();
        }
    }

}

