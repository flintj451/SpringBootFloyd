package com.floyd.floyd.service;

import com.floyd.floyd.domain.Message;
import com.floyd.floyd.domain.Role;
import com.floyd.floyd.domain.User;
import com.floyd.floyd.repos.MessageRepo;
import com.floyd.floyd.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class UserService implements UserDetailsService {

    @Autowired
    NotActivatedUsers notActivatedUsers;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private MailSender mailSender;
    @Autowired
    private MessageRepo messageRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not Found");
        }
        return user;
    }

    public boolean addUser(User user) {
        User userFromDb = userRepo.findByUsername(user.getUsername());

        if (userFromDb != null) {
            return false;
        }

        String code = UUID.randomUUID().toString();
        user.setActive(false);
        user.setRoles(Collections.singleton(Role.USER));
        user.setActivationCode(code);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        notActivatedUsers.addUser(code, user);
        sendActivationMessage(user);
        return true;
    }

    public void sendActivationMessage(User user) {
        String message = String.format(
                "Hello, %s! \n" +
                        "Welcome to Floyd. Please, visit next link: http://floyd-app.herokuapp.com/activate/%s",
                user.getUsername(),
                user.getActivationCode()
        );
        mailSender.send(user.getEmail(), "Activation code", message);
    }

    public int addedMessages() {
        List<Message> messages = messageRepo.findByAdded(true);

        for (Message message : messages) {
            message.setAdded(false);
            messageRepo.save(message);
        }
        return messages.size();
    }

    public boolean activateUser(String code) {
        User user = notActivatedUsers.getUser(code);

        if (user == null) {
            return false;
        }
        user.setActive(true);
        user.setActivationCode(null);
        userRepo.save(user);
        return true;
    }

    public List<User> findAll() {
        return userRepo.findAll();
    }

    public void saveUser(User user, String username, Map<String, String> form) {
        user.setUsername(username);
        Set<String> roles = Arrays.stream(Role.values()).map(Role::name).collect(Collectors.toSet());
        user.getRoles().clear();

        for (String key : form.keySet()) {
            if (roles.contains(key)) {
                user.getRoles().add(Role.valueOf(key));
            }
        }
    }

    public void updateProfile(User user, String password, String email) {
        String userEmail = user.getEmail();
        boolean isEmailChanged = email != null && !email.equals(userEmail);
        if (isEmailChanged) {
            user.setEmail(email);
        }
        if (!StringUtils.isEmpty(email)) {
            user.setActivationCode(UUID.randomUUID().toString());
        }
        if (!StringUtils.isEmpty(password)) {
            user.setPassword(password);
        }
        userRepo.save(user);
        if (isEmailChanged) {
            sendActivationMessage(user);
        }
    }
}