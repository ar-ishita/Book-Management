package com.bookmanagement.BookManagement.controller;

import com.bookmanagement.BookManagement.model.Post;
import com.bookmanagement.BookManagement.repository.PostRepository;
import com.bookmanagement.BookManagement.repository.SearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {


    //this is a repo and we will map this as Autowired.
    @Autowired
    PostRepository repo;

    @Autowired
    SearchRepository searchRepo;


    //doing mapping for home page
    //enable the swagger
    @ApiIgnore
    @RequestMapping(value="/")
    @CrossOrigin
    public void redirect(HttpServletResponse response) throws IOException
    {
        response.sendRedirect("/swagger-ui.html");
    }

    @GetMapping("/allPosts")
    @CrossOrigin
    public List<Post> getAllPosts()
    {
        return repo.findAll();
    }

    //method for posting data
    @PostMapping("/post")
    @CrossOrigin
    public Post addPost(@RequestBody Post post)
    {
        return repo.save(post);

    }

    // posts/internet
    @GetMapping("/posts/{text}")
    @CrossOrigin
    public List<Post> search(@PathVariable String text)
    {
        return searchRepo.findByText(text);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteBook(@PathVariable int id){
        repo.deleteById(id);

        return "Deleted Successfully";
    }

    // Add an update endpoint
    @PutMapping("/update/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable int id, @RequestBody Post updatedPost) {
        try {
            Post existingPost = repo.findById(id).orElse(null);

            if (existingPost == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            // Update the fields of the existing post with the values from updatedPost
            existingPost.setTitle(updatedPost.getTitle());
            existingPost.setIsbn(updatedPost.getIsbn());
            existingPost.setPageCount(updatedPost.getPageCount());
            existingPost.setPublishedDate(updatedPost.getPublishedDate());
            existingPost.setStatus(updatedPost.getStatus());
            existingPost.setAuthors(updatedPost.getAuthors());
            existingPost.setCategories(updatedPost.getCategories());

            // Save the updated post
            Post savedPost = repo.save(existingPost);
            return new ResponseEntity<>(savedPost, HttpStatus.OK);
        } catch (Exception e) {
            // Handle any exceptions and return an error response
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
