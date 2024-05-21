package com.learn.springusers.dto;

import java.util.ArrayList;
import java.util.List;

import com.learn.springusers.model.Message;
import com.learn.springusers.model.Room;
import com.learn.springusers.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageResDTO {
    private Long id;
    private String message;
    private String type;
    private UserResDTO user;
    private RoomResDTO room;

    public static MessageResDTO fromEntity(Message from) {
        RoomResDTO roomRes = new RoomResDTO();
        Room room = from.getRoom();
        roomRes.setId(room.getId());
        roomRes.setDescription(room.getDescription());
        roomRes.setTitle(room.getTitle());

        UserResDTO user = UserResDTO.fromEntity(from.getUser());

        return new MessageResDTO(
                from.getId(),
                from.getMessage(),
                from.getType(),
                user,
                roomRes);
    }

    public static List<MessageResDTO> fromEntities(List<Message> messages) {
        List<MessageResDTO> messagesRes = new ArrayList<>();
        for (Message msg : messages) {
            messagesRes.add(fromEntity(msg));
        }
        return messagesRes;
    }
}
