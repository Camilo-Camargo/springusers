package com.learn.springusers.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.springusers.dto.CreateMessageReqDTO;
import com.learn.springusers.model.Message;
import com.learn.springusers.model.Room;
import com.learn.springusers.model.User;
import com.learn.springusers.repositories.MessageRepository;

@Service
public class MessageService implements IMessageService {
	@Autowired
	private MessageRepository messageRepository;

	@Override
	public Message create(CreateMessageReqDTO messageDTO, User user) {
		Room room = new Room();
		room.setId(messageDTO.roomId);

		Message message = new Message(messageDTO.message, messageDTO.type, user, room);
		return messageRepository.save(message);
	}

	@Override
	public Message getById(Long id) {
		Optional<Message> message = messageRepository.findById(id);
		if (message.isEmpty())
			return null;

		return message.get();
	}
}
