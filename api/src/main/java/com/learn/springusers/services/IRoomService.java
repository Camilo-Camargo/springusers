package com.learn.springusers.services;


import java.util.List;

import com.learn.springusers.model.Message;
import com.learn.springusers.model.Room;
import com.learn.springusers.model.User;

public interface IRoomService{
	public Room createRoom(Room room);
	public Room findById(Long id);
	public List<Room> findByUserId(Long userId);
	public List<Message> findMessagesById(Long id);
	public Room joinUserById(User user, long id);

}
