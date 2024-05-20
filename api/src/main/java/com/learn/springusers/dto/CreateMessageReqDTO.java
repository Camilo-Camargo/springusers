package com.learn.springusers.dto;

import java.io.Serializable;

public class CreateMessageReqDTO implements Serializable {
    public String message;
    public String type;
    public Long userId;
    public Long roomId;
}