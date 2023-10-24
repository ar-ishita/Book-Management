package com.bookmanagement.BookManagement.repository;

import com.bookmanagement.BookManagement.model.Post;

import java.util.List;

public interface SearchRepository {

    List<Post> findByText(String text);
    List<Post> findByTitle(String title);

}
