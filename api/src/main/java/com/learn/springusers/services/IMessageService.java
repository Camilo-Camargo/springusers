package com.learn.springusers.services;

import com.learn.springusers.dto.CreateMessageReqDTO;
import com.learn.springusers.model.Message;

public interface IMessageService{
	public Message create(CreateMessageReqDTO messageDTO);
	public Message getById(Long id);
}
