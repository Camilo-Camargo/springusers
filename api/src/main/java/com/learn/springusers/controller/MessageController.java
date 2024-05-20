package com.learn.springusers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.learn.springusers.dto.CreateMessageReqDTO;
import com.learn.springusers.dto.MessageResDTO;
import com.learn.springusers.model.Message;
import com.learn.springusers.services.MessageService;

@RestController
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping("api/messages")
    public ResponseEntity<MessageResDTO> create(@RequestBody CreateMessageReqDTO createMessageReqDTO) {
        Message message = messageService.create(createMessageReqDTO);
        return ResponseEntity.status(HttpStatus.FOUND).body(MessageResDTO.fromEntity(message));
    }

    @GetMapping("api/messages/{id}")
    public ResponseEntity<MessageResDTO> get(@PathVariable Long id) {
        Message message = messageService.getById(id);
        if (message == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        return ResponseEntity.status(HttpStatus.FOUND).body(MessageResDTO.fromEntity(message));
    }
}
