package com.learn.springusers.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.springusers.model.Room;
import com.learn.springusers.model.User;
import com.learn.springusers.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoomService roomService;

	@Override
	public User createUser(User user) {
		return this.userRepository.save(user);
	}

	@Override
	public void deleteUser(User user) {
		this.userRepository.delete(user);
	}

	@Override
	public User loginUser(String username, String password) {
		return (User) this.userRepository.findUserByUsernameAndPassword(username, password);
	}

	@Override
	public User findById(Long id) {
		Optional<User> user = this.userRepository.findById(id);

		if (user.isEmpty())
			return null;

		return user.get();
	}

	@Override
	public List<Room> findRoomsById(Long id) {
		if (findById(id) == null)
			return null;
		return roomService.findByUserId(id);
	}

	@Override
	public Room joinRoomById(Long id, Long roomId) {
		User user = findById(id);
		if (user == null)
			return null;

		return roomService.joinUserById(user, roomId);
	}

	@Override
	public List<User> findAll() {
		return userRepository.findAll();
	}

}
