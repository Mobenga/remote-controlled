package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UpdateController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @GetMapping("/update/{message}")
    public String update(@PathVariable String message) {
        messagingTemplate.convertAndSend("/topic/update", message);
        return "ok";
    }
}
