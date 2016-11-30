package playtech;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

@Controller
public class RemoteController {

    @Autowired
    private RemoteControlSession session;

    @SubscribeMapping("/user/register")
    public void register(SimpMessageHeaderAccessor header) {
        session.connectToRcServer(header);
    }

    @MessageMapping("/send")
    public void sendRemote(String body) {
        session.sendToRcServer(body);
    }
}
