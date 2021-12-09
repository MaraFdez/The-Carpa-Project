package com.ironhack.finalProject.userService.service.impl;

import com.ironhack.finalProject.userService.controller.dto.UserDTO;
import com.ironhack.finalProject.userService.dao.User;
import com.ironhack.finalProject.userService.repository.UserRepository;
import com.ironhack.finalProject.userService.service.interfaces.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void editAboutMe(String username, String aboutMe) {
        Optional<User> existsUser = userRepository.findByUsername(username);
        if(existsUser.isPresent()){
            User user = existsUser.get();
            user.setAboutMe(aboutMe);
            userRepository.save(user);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no user associated with this username.");
        }
    }

    public User createUser(UserDTO userDTO) {
        User user = new User(userDTO.getUsername(), userDTO.getPassword(), userDTO.getProfileImage(), userDTO.getAboutMe());
        return userRepository.save(user);
    }

}
