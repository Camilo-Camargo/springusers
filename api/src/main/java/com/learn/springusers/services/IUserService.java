package com.learn.springusers.services;
import java.util.List;

import com.learn.springusers.model.Room;
import com.learn.springusers.model.User;

public interface IUserService{
	public User loginUser(String username, String password);
	public User createUser(User user);
	public void deleteUser(User user);
	public User findById(Long id);
	public List<Room> findRoomsById(Long id);
	public Room joinRoomById(Long id, Long roomId);
	public List<User> findAll();
}
