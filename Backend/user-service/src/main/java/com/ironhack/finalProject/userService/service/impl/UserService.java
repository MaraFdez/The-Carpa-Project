package com.ironhack.finalProject.userService.service.impl;

import com.ironhack.finalProject.userService.controller.dto.UserDTO;
import com.ironhack.finalProject.userService.dao.User;
import com.ironhack.finalProject.userService.proxy.DetailsProxy;
import com.ironhack.finalProject.userService.repository.UserRepository;
import com.ironhack.finalProject.userService.service.interfaces.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final DetailsProxy detailsProxy;

    public UserService(UserRepository userRepository, DetailsProxy detailsProxy) {
        this.userRepository = userRepository;
        this.detailsProxy = detailsProxy;
    }

    public User getUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()) {
            user.get().setUploadedProjects(detailsProxy.getAmountOfUploadedProjects(user.get().getUsername()));
            return user.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no user associated with this username.");
        }
    }

    public User getUserByUid(String uid) {
        Optional<User> user = userRepository.findByUid(uid);
        if(user.isPresent()) {
            user.get().setUploadedProjects(detailsProxy.getAmountOfUploadedProjects(user.get().getUsername()));
            return user.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no user associated with this uid.");
        }
    }

    public void editAboutMe(String uid, String aboutMe) {
        Optional<User> existsUser = userRepository.findByUid(uid);
        if(existsUser.isPresent()){
            User user = existsUser.get();
            user.setAboutMe(aboutMe);
            userRepository.save(user);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no user associated with this uid.");
        }
    }

    public void editProfilePicture(String uid, String profilePicture) {
        Optional<User> existsUser = userRepository.findByUid(uid);
        if(existsUser.isPresent()){
            User user = existsUser.get();
            user.setProfileImage(profilePicture);
            userRepository.save(user);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no user associated with this uid.");
        }
    }

    public User createUser(UserDTO userDTO) {
        User user = new User(userDTO.getUid(), userDTO.getUsername(), userDTO.getProfileImage(), userDTO.getAboutMe());
        return userRepository.save(user);
    }

}
