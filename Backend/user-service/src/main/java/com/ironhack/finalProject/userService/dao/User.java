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

    private String uid;

    private String username;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "about_me")
    private String aboutMe;

    @Column(name = "uploaded_projects")
    private int uploadedProjects;

    //private int designsAmount;

    public User(String uid, String username, String profileImage, String aboutMe) {
        this.uid = uid;
        this.username = username;
        this.profileImage = profileImage;
        this.aboutMe = aboutMe;
    }

}
