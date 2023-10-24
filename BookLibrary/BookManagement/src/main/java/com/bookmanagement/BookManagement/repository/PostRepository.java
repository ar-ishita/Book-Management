package com.bookmanagement.BookManagement.repository;

import com.bookmanagement.BookManagement.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface PostRepository extends MongoRepository<Post, Integer> {



}
