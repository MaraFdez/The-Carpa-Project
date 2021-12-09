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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String password;

    private String profileImage;

    private String aboutMe;

    //private int designsAmount;

    public User(String username, String password, String aboutMe) {
        setUsername(username);
        setPassword(password);
        setAboutMe(aboutMe);
    }

    public User(String username, String password, String profileImage, String aboutMe) {
        setUsername(username);
        setPassword(password);
        setProfileImage(profileImage);
        setAboutMe(aboutMe);
    }
}
