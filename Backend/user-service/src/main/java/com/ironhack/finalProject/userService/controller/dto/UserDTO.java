package com.ironhack.finalProject.userService.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class UserDTO {

    private String uid;
    private String username;
    private String profileImage;
    private String aboutMe;

}
