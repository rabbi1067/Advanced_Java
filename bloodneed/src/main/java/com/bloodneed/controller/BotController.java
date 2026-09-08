package com.bloodneed.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@CrossOrigin
@RequestMapping("/api/bot")
public class BotController {

    @PostMapping("/respond")
    public Map<String, Object> chat(@RequestBody Map<String, String> message) {
        Map<String, Object> response = new HashMap<>();
        String text = message.get("text").toLowerCase();

        if (text.contains("donor") || text.contains("help") || text.contains("find") || text.contains("needed")) {
            response.put("response", "I'm checking available donors near you. Please check your dashboard for matches!");
        } else if (text.contains("request") || text.contains("submit")) {
            response.put("response", "You can fill the request form from the dashboard.");
        } else if (text.contains("blood group") || text.contains("bg") || text.contains("type")) {
            response.put("response", "Please share your blood group (A+, B+, O-, AB+, etc.) for faster matching!");
        } else if (text.contains("emergency") || text.contains("urgent") || text.contains("now")) {
            response.put("response", "EMERGENCY! Please call the nearest blood bank immediately.");
        } else {
            response.put("response", "Thank you! I'll help you find the nearest blood donor.");
        }
        return response;
    }
}