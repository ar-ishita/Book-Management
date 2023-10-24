package com.bookmanagement.BookManagement.repository;

import com.bookmanagement.BookManagement.model.Post;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class SearchRepositoryImpl implements  SearchRepository{

    @Autowired
    MongoClient mongoClient;

    @Autowired
    MongoConverter mongoConverter;

    @Override
    public List<Post> findByText(String text) {

        final List<Post> posts =new ArrayList<>();

        MongoDatabase database = mongoClient.getDatabase("Ishita_Book_Management");
        MongoCollection<Document> collection = database.getCollection("BookManagement");
        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(new Document("$search",
                        new Document("text",
                                new Document("query", text)
                                        .append("path", Arrays.asList("categories", "title", "authors")))),
                new Document("$sort",
                        new Document("pageCount", 1L)),
                new Document("$limit", 5L)));

        //this will convert docs into posts and this will add this to the posts list
        result.forEach(doc -> posts.add(mongoConverter.read(Post.class, doc)));
        return posts;
    }

    @Autowired
    MongoTemplate mongoTemplate;



    public List<Post> findByTitle(String title) {
        Query query = new Query(Criteria.where("title").is(title));
        return mongoTemplate.find(query, Post.class);
    }
}
