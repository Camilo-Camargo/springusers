package com.learn.springusers.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "message")
public class Message {
  public Message() {
  }

  public Message(
      String message,
      String type,
      User user
) {
    this.message = message;
    this.type = type;
    this.user = user;
  }

  @Id
  @GeneratedValue()
  public Long message_id;

  @Column
  private String message;

  @Column
  private String type;

  @OneToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "room_id")
  private Room room;
}
