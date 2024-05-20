package com.learn.springusers.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.learn.springusers.model.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query("SELECT r FROM Room r JOIN r.users u WHERE u.id = :userId")
    List<Room> findRoomsByUserId(@Param("userId") Long userId);
}
