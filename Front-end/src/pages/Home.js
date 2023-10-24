import React from "react";
import { Typography, Button, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "../App.css";

const Home = () => {
  return (
    <Container>
      <Typography sx={{ margin: "5% 0" }} variant="h3" align="center">
        Welcome to Our Book Management System
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button variant="contained" color="primary">
            <Link to="/employer/dashboard" className="link-button">
              Add Books
            </Link>
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary">
            <Link to="/employee/feed" className="link-button">
              Search Books
            </Link>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
