package com.learn.springusers.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Lob;
import lombok.Data;

@Entity
@Table
@Data
public class User {
  public User(){}

  public User(
      String username,
      String password,
      byte[] profileImage) {
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

  @Lob
  @Column(length = 52428800)
  private byte[] profileImage;
}
