package com.ironhack.finalProject.userService.controller.impl;

import com.ironhack.finalProject.userService.controller.dto.UserDTO;
import com.ironhack.finalProject.userService.dao.User;
import com.ironhack.finalProject.userService.repository.UserRepository;
import com.ironhack.finalProject.userService.service.interfaces.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/user")
public class UserController {

    private final UserRepository userRepository;
    private final IUserService userService;

    public UserController(UserRepository userRepository, IUserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public User getUserById(@PathVariable("id") Long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()) {
            return user.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no user associated with this id.");
        }
    }

    @GetMapping("/username/{username}")
    @ResponseStatus(HttpStatus.OK)
    public User getUserByUsername(@PathVariable("username") String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()) {
            return user.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no user associated with this username.");
        }
    }

    @GetMapping("/uid/{uid}")
    @ResponseStatus(HttpStatus.OK)
    public User getUserByUid(@PathVariable("uid") String uid) {
        Optional<User> user = userRepository.findByUid(uid);
        if(user.isPresent()) {
            return user.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no user associated with this uid.");
        }
    }

    @PatchMapping("/{uid}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateAboutMe(@PathVariable("uid") String uid, @RequestBody UserDTO userDTO) {
        if(userDTO.getProfileImage() != null && userDTO.getProfileImage() != ""){
            userService.editProfilePicture(uid, userDTO.getProfileImage());
        }
        if(userDTO.getAboutMe() != null && userDTO.getAboutMe() != ""){
            userService.editAboutMe(uid, userDTO.getAboutMe());
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody UserDTO userDTO) {
        return userService.createUser(userDTO);
    }

}
