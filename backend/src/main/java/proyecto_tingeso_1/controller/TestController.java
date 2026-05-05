package proyecto_tingeso_1.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController


public class TestController {

    @GetMapping("/hello")
    @PreAuthorize("hasRole ('admin_client_role')")

    public String helloAdmin(){
        return "hello bro admin";
    }


    @GetMapping("/hello1")
    @PreAuthorize("hasRole ('user_client_role') or hasRole('admin_client_role')")
    public String helloUser(){
        return "hello bro user";
    }
}
