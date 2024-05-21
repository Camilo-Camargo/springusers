package com.learn.springusers.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.learn.springusers.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResDTO implements Serializable {
    private Long id;
    private String username;
    private String role;
    private String profileImage;

    public static UserResDTO fromEntity(User user) {
        return new UserResDTO(user.getId(), user.getUsername(), user.getRole(), user.getProfileImage());
    }

    public static List<UserResDTO> fromEntities(List<User> users) {
        List<UserResDTO> usersRes = new ArrayList<>();
        for (User user : users) {
            usersRes.add(fromEntity(user));
        }
        return usersRes;
    }
}
