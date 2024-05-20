package com.learn.springusers.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table
public class Room {
  public Room() {
  }

  public Room(
      String title,
      String description,
      User user) {
    this.title = title;
    this.description = description;
    this.users.add(user);
  }

  @Id
  @GeneratedValue
  private Long id;

  @Column
  private String title;

  @Column
  private String description;

	@ManyToMany(cascade = CascadeType.ALL)
	private List<User> users = new ArrayList<>();

  @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
  private List<Message> messages = new ArrayList<>();

  public void addUser(User user){
    for (User u: users){
      if(u.getId() == user.getId()){
        return;
      }
    }

    users.add(user);
  }
}
