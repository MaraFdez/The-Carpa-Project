package com.ironhack.finalProject.userService.service.interfaces;

import com.ironhack.finalProject.userService.controller.dto.UserDTO;
import com.ironhack.finalProject.userService.dao.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IUserService {

    User createUser(UserDTO userDTO);
    void editAboutMe(String username, String aboutMe);

}
