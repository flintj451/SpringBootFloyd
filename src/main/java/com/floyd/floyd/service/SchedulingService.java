package com.floyd.floyd.service;

import com.floyd.floyd.domain.User;
import com.floyd.floyd.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SchedulingService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private MailSender mailSender;


    private final static String TEST_EMAIL_RECEPIENT = "flintc4p@yandex.ru";

    @Scheduled(fixedRate = 10 * 60 * 1000)
    public void changesSender() {
        String added = (" За прошлые 24 часа были обавлены " + userService.addedMessages() + "\n");
        mailSender.send(TEST_EMAIL_RECEPIENT, " test", added);
        List<User> users = userRepo.findAllByGetNews(true);

        for (User user : users) {
            mailSender.send(user.getEmail(), " test", added);
        }
    }
}
