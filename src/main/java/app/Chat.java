package app;

import app.util.HerokuUtil;
import io.javalin.Javalin;
import io.javalin.websocket.WsContext;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import org.json.JSONObject;

import static io.javalin.apibuilder.ApiBuilder.*;
import static j2html.TagCreator.article;
import static j2html.TagCreator.attrs;
import static j2html.TagCreator.b;
import static j2html.TagCreator.p;
import static j2html.TagCreator.span;

public class Chat {

    private static Map<WsContext, String> userUsernameMap = new ConcurrentHashMap<>();
    private static List<String> messageList = Collections.synchronizedList(new ArrayList<>());

    public static void main(String[] args) {
        Javalin app = Javalin.create(config -> {
            config.addStaticFiles("/public");
        }).start(HerokuUtil.getHerokuAssignedPort());

        app.ws("/chat", ws -> {
            ws.onConnect(ctx -> {
                String username = user(ctx);
                userUsernameMap.put(ctx, username);
                broadcastMessage("Server", (username + " joined the chat"));
            });
            ws.onClose(ctx -> {
                String username = userUsernameMap.get(ctx);
                userUsernameMap.remove(ctx);
                broadcastMessage("Server", (username + " left the chat"));
            });
            ws.onMessage(ctx -> {
                broadcastMessage(userUsernameMap.get(ctx), ctx.message());
            });
        });

        path("history", () -> {
        });

    }

    private static String user(WsContext ctx) {
        return ctx.queryParam("user");
    }

    // Sends a message from one user to all users, along with a list of current usernames
    private static void broadcastMessage(String sender, String message) {
        String messageJson = new JSONObject()
                .put("userMessage", createHtmlMessageFromSender(sender, message))
                .put("userList", userUsernameMap.values()).toString();
        messageList.add(messageJson);
        userUsernameMap.keySet().stream().filter(ctx -> ctx.session.isOpen()).forEach(session -> {
            session.send(messageJson);
        });
    }

    // Builds a HTML element with a sender-name, a message, and a timestamp
    private static String createHtmlMessageFromSender(String sender, String message) {
        return article(
            b(sender + " says:"),
            span(attrs(".timestamp"), new SimpleDateFormat("HH:mm:ss").format(new Date())),
            p(message)
        ).render();
    }

}
