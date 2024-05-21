package com.learn.springusers.dto;

import java.io.Serializable;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserReqDTO implements Serializable {
    private Long id;
    private String username;
    private String password;
    private MultipartFile profileImage;
}
