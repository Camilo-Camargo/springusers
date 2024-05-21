package com.learn.springusers.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.learn.springusers.dto.CreateRoomReqDTO;
import com.learn.springusers.dto.MessageResDTO;
import com.learn.springusers.dto.RoomResDTO;
import com.learn.springusers.model.Message;
import com.learn.springusers.model.Room;
import com.learn.springusers.model.User;
import com.learn.springusers.services.RoomService;
import com.learn.springusers.services.UserService;

@RestController
public class RoomController {
    @Autowired
    private RoomService roomService;

    @Autowired
    private UserService userService;

    @GetMapping("api/rooms/{id}")
    public ResponseEntity<RoomResDTO> getById(@PathVariable Long id) {
        Room room = roomService.findById(id);
        if (room == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(RoomResDTO.fromEntity(room));
    }

    @PostMapping("api/rooms")
    public ResponseEntity<RoomResDTO> create(
            @RequestBody CreateRoomReqDTO req) {

        User user = userService.findById(req.userId);
      
        if (user == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        Room room = new Room(req.title, req.description, user);
        room = roomService.createRoom(room);

        return ResponseEntity.status(HttpStatus.CREATED).body(RoomResDTO.fromEntity(room));
    }

    @GetMapping("api/rooms/{id}/messages")
    public ResponseEntity<List<MessageResDTO>> getMessagesById(@PathVariable Long id) {
        List<Message> messages = roomService.findMessagesById(id);
        return ResponseEntity.status(HttpStatus.FOUND).body(MessageResDTO.fromEntities(messages));
    }
}
