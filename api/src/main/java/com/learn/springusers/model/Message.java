package com.learn.springusers.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table
public class Message {
  public Message() {
  }

  public Message(
      String message,
      String type,
      User user,
      Room room) {
    this.message = message;
    this.type = type;
    this.user = user;
    this.room = room;
  }

  @Id
  @GeneratedValue
  private Long id;

  @Column
  private String message;

  @Column
  private String type;

  @OneToOne()
  @JoinColumn(name = "userId", referencedColumnName = "id")
  private User user;

  @ManyToOne(optional = false)
  @JoinColumn(name = "room_id", referencedColumnName = "id")
  private Room room;
}
