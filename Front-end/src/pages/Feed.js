import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Button,
} from "@mui/material";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Feed = () => {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`http://localhost:8080/posts/${query}`);
      setPosts(response.data);
    };
    const fetchInitialPosts = async () => {
      const response = await axios.get(`http://localhost:8080/allPosts`);
      setPosts(response.data);
    };
    if (query.length === 0) fetchInitialPosts();
    if (query.length > 2) fetchPosts();
  }, [query]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:8080/delete/${postId}`);
      // Refresh the posts after deletion
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (post) => {
    setEditMode(true);
    setEditedPost({ ...post });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8080/update/${editedPost.id}`,
        editedPost
      );
      setEditMode(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <Grid container spacing={2} sx={{ margin: "2%" }}>
      <Grid item xs={12} sx={12} md={12} lg={12}>
        <Button sx={{ margin: "1% 2%" }} variant="outlined">
          <Link to="/">Home</Link>
        </Button>
        <Box>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search..."
            sx={{ width: "75%", padding: "2% auto" }}
            fullWidth
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
      </Grid>

      {posts.map((post) => (
        <Grid key={post.id} item xs={12} md={6} lg={4}>
          <Card sx={{ padding: "3%", overflow: "hidden", width: "84%" }}>
            <Typography
              variant="h5"
              sx={{ fontSize: "2rem", fontWeight: "600" }}
            >
              {post.title}
            </Typography>
            <Typography
              sx={{ color: "#585858", marginTop: "2%" }}
              variant="body"
            >
              Book-ID : {post.id}
            </Typography>
            <br />
            <Typography
              sx={{ color: "#585858", marginTop: "2%" }}
              variant="body"
            >
              ISBN: {post.isbn}
            </Typography>
            <br />

            <Typography
              sx={{ color: "#585858", marginTop: "2%" }}
              variant="body"
            >
              Page Count : {post.pageCount}
            </Typography>
            <br />
            <Typography
              sx={{ color: "#585858", marginTop: "2%" }}
              variant="body"
            >
              Status : {post.status}
            </Typography>
            <br />
            <Typography
              sx={{ color: "#585858", marginTop: "2%" }}
              variant="body"
            >
              Published Date: {post.publishedDate}
            </Typography>
            <br />

            <Typography
              sx={{ color: "#585858", marginTop: "2%" }}
              variant="body"
            >
              Authors : {post.authors.join(", ")}
            </Typography>

            <br />
            <Typography gutterBottom variant="body">
              Categories :{" "}
            </Typography>
            {post.categories.map((s, i) => {
              return (
                <Typography variant="body" gutterBottom key={i}>
                  {s} ,{` `}
                </Typography>
              );
            })}
            <br />
            {/* ... (other post details) */}
            <Button
              variant="outlined"
              onClick={() => handleEdit(post)}
              sx={{ marginTop: "2%" }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleDelete(post.id)}
              sx={{ marginTop: "2%" }}
            >
              Delete
            </Button>
            <br />
            {editMode && editedPost.id === post.id && (
              <div>
                <TextField
                  label="Title"
                  fullWidth
                  value={editedPost.title}
                  onChange={(e) =>
                    setEditedPost({ ...editedPost, title: e.target.value })
                  }
                />
                <br />
                <TextField
                  label="ISBN"
                  fullWidth
                  value={editedPost.isbn}
                  onChange={(e) =>
                    setEditedPost({ ...editedPost, isbn: e.target.value })
                  }
                />
                <br />
                <TextField
                  label="Page Count"
                  fullWidth
                  value={editedPost.pageCount}
                  onChange={(e) =>
                    setEditedPost({ ...editedPost, pageCount: e.target.value })
                  }
                />
                <br />
                <TextField
                  label="Status"
                  fullWidth
                  value={editedPost.status}
                  onChange={(e) =>
                    setEditedPost({ ...editedPost, status: e.target.value })
                  }
                />
                <br />
                <TextField
                  label="Published Date"
                  fullWidth
                  value={editedPost.publishedDate}
                  onChange={(e) =>
                    setEditedPost({
                      ...editedPost,
                      publishedDate: e.target.value,
                    })
                  }
                />

                <TextField
                  label="Authors"
                  fullWidth
                  value={editedPost.authors.join(", ")} // Join the authors array into a comma-separated string
                  onChange={
                    (e) =>
                      setEditedPost({
                        ...editedPost,
                        authors: e.target.value.split(", "),
                      }) // Split the input string into an array
                  }
                />
                <TextField
                  label="Categories"
                  fullWidth
                  value={editedPost.categories.join(", ")} // Join the categories array into a comma-separated string
                  onChange={
                    (e) =>
                      setEditedPost({
                        ...editedPost,
                        categories: e.target.value.split(", "),
                      }) // Split the input string into an array
                  }
                />
                <br />

                {/* Add input fields for other post properties you want to edit */}
                <Button variant="outlined" onClick={handleUpdate}>
                  Update
                </Button>
              </div>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Feed;
