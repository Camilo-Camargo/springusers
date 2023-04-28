package com.learn.springusers.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table
@Data
public class User {
  public User() {
  }

  public User(
      String username,
      String password,
      String profileImage) {
    this.username = username;
    this.password = password;
    this.profileImage = profileImage;
  }

  @Id
  @GeneratedValue()
  public Long id;

  @Column
  private String username;

  @Column
  private String password;

  @Column
  private String profileImage;
}
