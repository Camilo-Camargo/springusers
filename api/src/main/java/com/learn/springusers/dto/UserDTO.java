package com.learn.springusers.dto;

import java.io.Serializable;

import org.springframework.web.multipart.MultipartFile;

import com.learn.springusers.model.User;

public class UserDTO implements Serializable {
    private Long id;
    private String username;
    private String password;
    private MultipartFile profileImage;
}
