package app;

import lombok.Data;

import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;

public class RequestExample {

    private static final String RANDOM_QUOTE = "http://quotes.stormconsultancy.co.uk/random.json";
    private static final String ALL_QUOTES = "http://quotes.stormconsultancy.co.uk/quotes.json";

    public static void main(String[] args) {
        WebTarget target = ClientBuilder.newClient().target(RANDOM_QUOTE);

        String quote = target
                .request()
                .get()
                .readEntity(String.class);

        Quote quoteObj = target
                .request()
                .get()
                .readEntity(Quote.class);

        System.out.println(quote);
    }


    @Data
    private static class Quote {
        private int id;
        private String author;
        private String quote;
        private String permalink;
    }
}
