package com.learn.springusers.services;

import com.learn.springusers.dto.CreateMessageReqDTO;
import com.learn.springusers.model.Message;
import com.learn.springusers.model.User;

public interface IMessageService{
	public Message create(CreateMessageReqDTO messageDTO, User user);
	public Message getById(Long id);
}
