package playtech;

import com.lambdaworks.redis.RedisClient;
import com.lambdaworks.redis.pubsub.RedisPubSubAdapter;
import com.lambdaworks.redis.pubsub.api.sync.RedisPubSubCommands;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.PreDestroy;

import static org.springframework.messaging.simp.stomp.StompCommand.SEND;
import static org.springframework.messaging.simp.stomp.StompHeaderAccessor.create;


@Component
@Scope(value = "websocket", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class RemoteControlSession {

    private RedisPubSubCommands<String, String> redisSubscriber;
    private RedisPubSubCommands<String, String> redisPublisher;
    private final SimpMessagingTemplate messagingTemplate;
    private String sessionId;

    @Autowired
    public RemoteControlSession(RedisClient client, SimpMessagingTemplate messagingTemplate) {
        redisSubscriber = client.connectPubSub().sync();
        redisPublisher = client.connectPubSub().sync();
        this.messagingTemplate = messagingTemplate;
    }

    public void connectToRcServer(SimpMessageHeaderAccessor header) {
        this.sessionId = header.getSessionId();
        redisPublisher.publish("rc_from_client_" + sessionId, "CLIENT_CONNECT");
        subscribeToMessagesFromRcServer(header);
    }

    private void subscribeToMessagesFromRcServer(SimpMessageHeaderAccessor header) {
        header.copyHeaders(create(SEND).getMessageHeaders());
        redisSubscriber.addListener(new RedisPubSubAdapter<String, String>() {
            @Override
            public void message(String channel, String message) {
                messagingTemplate.convertAndSendToUser(header.getSessionId(), "/register", message, header.getMessageHeaders());
            }
        });
        redisSubscriber.subscribe("rc_from_server_" + sessionId);
    }

    public void sendToRcServer(String body) {
        redisPublisher.publish("rc_from_client_" + sessionId, body);
    }

    @PreDestroy
    public void closeExistingSession() {
        redisPublisher.publish("rc_from_client_" + sessionId, "CLIENT_DISCONNECT");
        redisPublisher.close();
        redisSubscriber.close();
    }

}
