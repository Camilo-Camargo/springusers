package com.learn.springusers.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.learn.springusers.dto.JoinRoomReqDTO;
import com.learn.springusers.dto.RoomResDTO;
import com.learn.springusers.dto.UserLoginDTO;
import com.learn.springusers.dto.UserResDTO;
import com.learn.springusers.model.Room;
import com.learn.springusers.model.User;
import com.learn.springusers.services.FileService;
import com.learn.springusers.services.UserService;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private FileService fileService;

    @PutMapping("api/users/join")
    public ResponseEntity<RoomResDTO> join(
            @RequestBody JoinRoomReqDTO req) {
        Room room = userService.joinRoomById(req.userId, req.roomId);

        if (room == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        return ResponseEntity.status(HttpStatus.OK).body(RoomResDTO.fromEntity(room));
    }

    @GetMapping(value = "api/users/{id}/rooms")
    public ResponseEntity<List<RoomResDTO>> findRooms(@PathVariable Long id) {
        List<Room> rooms = userService.findRoomsById(id);
        if (rooms == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.status(HttpStatus.FOUND).body(RoomResDTO.fromEntities(rooms));
    }

    @RequestMapping(value = "api/sign-up", method = RequestMethod.POST, consumes = {
            MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<UserResDTO> create(
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
        return ResponseEntity.status(HttpStatus.CREATED).body(UserResDTO.fromEntity(user));
    }

    @PostMapping
    @RequestMapping(value = "api/login", consumes = { MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<UserResDTO> login(
            @RequestBody UserLoginDTO userLogin) {
        User user2 = userService.loginUser(userLogin.username, userLogin.password);
        return ResponseEntity.status(HttpStatus.CREATED).body(UserResDTO.fromEntity(user2));
    }

    @GetMapping("api/users")
    public ResponseEntity<List<UserResDTO>> findAll() {
        return ResponseEntity.status(HttpStatus.FOUND).body(UserResDTO.fromEntities(userService.findAll()));
    }

}
