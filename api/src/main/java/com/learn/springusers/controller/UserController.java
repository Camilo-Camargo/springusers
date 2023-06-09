package com.learn.springusers.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.learn.springusers.dto.UserLoginDTO;
import com.learn.springusers.model.User;
import com.learn.springusers.services.FileService;
import com.learn.springusers.services.UserService;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private FileService fileService;

    @GetMapping
    @RequestMapping(value = "api/create", method = RequestMethod.POST, consumes = {
            MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<String> create(
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            @RequestParam("role") String role,
            @RequestParam("profileImage") MultipartFile image) {

        String imageFilename = image.getOriginalFilename();
        try {
            imageFilename = "/" + fileService.saveFile(image, username + "/" + imageFilename);
        } catch (IOException e) {
            System.out.println(e);
        }
        User user = new User(username, password, role, imageFilename);
        userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User Created");
    }

    @GetMapping
    @RequestMapping(value = "api/login", method = RequestMethod.POST, consumes = { MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<User> login(
            @RequestBody UserLoginDTO userLogin) {
        User user2 = userService.loginUser(userLogin.username, userLogin.password);
        return ResponseEntity.status(HttpStatus.CREATED).body(user2);
    }
}
