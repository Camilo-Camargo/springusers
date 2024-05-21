package com.learn.springusers.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table
public class User {
  public User() {
  }

  public User(
      String username,
      String password,
      String role,
      String profileImage) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.profileImage = profileImage;
  }

  @Id
  @GeneratedValue
  private Long id;

  @Column(unique = true)
  private String username;

  @Column
  private String password;

  @Column
  private String profileImage;

  @Column
  private String role;
}
