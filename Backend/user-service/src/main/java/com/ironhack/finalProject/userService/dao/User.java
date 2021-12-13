package com.ironhack.finalProject.userService.dao;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class User {

    @Id
    private String UID;

    private String username;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "about_me")
    private String aboutMe;

    //private int designsAmount;

    public User(String username, String aboutMe) {
        setUsername(username);
        setAboutMe(aboutMe);
    }

}
