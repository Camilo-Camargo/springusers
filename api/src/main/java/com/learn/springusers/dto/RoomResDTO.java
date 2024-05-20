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
public class RoomResDTO {
    private Long id;
    private String title;
    private String description;
    private List<User> users;
    private List<MessageResDTO> messages;

    public static RoomResDTO fromEntity(Room room) {
        List<MessageResDTO> messages = new ArrayList<>();
        for (Message msg: room.getMessages()){
            messages.add(MessageResDTO.fromEntity(msg));
        }

        return new RoomResDTO(
                room.getId(),
                room.getTitle(),
                room.getDescription(),
                room.getUsers(),
                messages);
    }

    public static List<RoomResDTO> fromEntities(List<Room> rooms) {
        List<RoomResDTO> roomsRes = new ArrayList<>();
        for (Room room : rooms) {
            roomsRes.add(fromEntity(room));
        }
        return roomsRes;
    }
}
