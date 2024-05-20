package com.learn.springusers.dto;

import java.io.Serializable;


public class CreateRoomReqDTO implements Serializable {
	public Long userId;
	public String title;
	public String description;
}
