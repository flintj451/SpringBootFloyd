package com.floyd.floyd.service;


import com.floyd.floyd.domain.User;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Component
public class ActivationUsers {
    private HashMap<String, User> map =new HashMap<String, User>() ;
    public User getUser(String code) {
        User user =map.get(code);
        map.remove(code);
        return user ;
    }

    public void addUser(String code, User user) {

        map.put(code,user);
    }


}