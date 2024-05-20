package com.learn.springusers.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.springusers.model.Message;
import com.learn.springusers.model.Room;
import com.learn.springusers.model.User;
import com.learn.springusers.repositories.MessageRepository;
import com.learn.springusers.repositories.RoomRepository;

@Service
public class RoomService implements IRoomService {
	@Autowired
	private RoomRepository roomRepository;

	@Autowired
	private MessageRepository messageRepository;

	@Override
	public Room createRoom(Room room) {
		return roomRepository.save(room);
	}

	@Override
	public Room findById(Long id) {
		Optional<Room> room = roomRepository.findById(id);
		if (room.isEmpty())
			return null;

		return room.get();
	}

	@Override
	public List<Room> findByUserId(Long userId) {
		return roomRepository.findRoomsByUserId(userId);
	}

	@Override
	public List<Message> findMessagesById(Long id) {
		return messageRepository.findByRoomId(id);
	}

	@Override
	public Room joinUserById(User user, long id) {
		Room room = findById(id);
		if (room == null)
			return null;

		List<User> users = room.getUsers();
		for (User u : users) {
			if (u.getId() == user.getId()) {
				return null;
			}
		}

		room.addUser(user);
		roomRepository.save(room);

		return room;
	}
}
