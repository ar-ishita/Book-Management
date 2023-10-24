import React, { useState } from "react";
import { Typography, TextField, Button, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
//const initial = { profile: "", exp: 0, techs: [], desc:"" };
const initial = {
  id: 0,
  title: "",
  isbn: "",
  pageCount: 0,
  publishedDate: "",
  status: "",
  authors: [],
  categories: [],
};

const Create = () => {
  const skillSet = [
    {
      name: "Internet",
    },
    {
      name: "Java",
    },
    {
      name: "Web Development",
    },
    {
      name: "Miscellaneous",
    },
    {
      name: "Microsoft",
    },
    {
      name: "DataBase",
    },
    {
      name: "PowerBuilder",
    },
    {
      name: "Computer Graphics",
    },
    {
      name: "Object-Oriented Programming",
    },
    {
      name: "Networking",
    },
    {
      name: "Programming",
    },
    {
      name: "Python, Data Analytics, ML",
    },
  ];
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/post", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => console.log(response))
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    navigate("/employee/feed");
  };

  //const { profile, exp, desc } = form;

  const { id, title, isbn, status, pageCount, publishedDate, authors } = form;

  const handleChange = (e) => {
    setForm({ ...form, categories: [...form.categories, e.target.value] });
  };

  return (
    <Paper className="paper-container" sx={{ padding: "2%" }} elevation={3}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Add New Book
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            className="form-label"
            required
            onChange={(e) => setForm({ ...form, id: e.target.value })}
            label="Book-Id"
            variant="outlined"
            value={id}
          />

          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            className="form-label"
            required
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            label="Book-Title"
            variant="outlined"
            value={title}
          />
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            className="form-label"
            required
            onChange={(e) => setForm({ ...form, isbn: e.target.value })}
            label="ISBN"
            variant="outlined"
            value={isbn}
          />
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            className="form-label"
            required
            rows={4}
            onChange={(e) => setForm({ ...form, pageCount: e.target.value })}
            label="Page Count"
            variant="outlined"
            value={pageCount}
          />

          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            className="form-label"
            required
            rows={4}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            label="Status"
            variant="outlined"
            value={status}
          />

          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            className="form-label"
            required
            rows={4}
            onChange={(e) =>
              setForm({ ...form, publishedDate: e.target.value })
            }
            label="Published Date"
            variant="outlined"
            value={publishedDate}
          />

          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            className="form-label"
            required
            multiline
            rows={4}
            onChange={(e) => setForm({ ...form, authors: [e.target.value] })}
            label="Authors"
            variant="outlined"
            value={authors[0]} // Assuming you want to display the first author in the input field
          />
          <Box sx={{ margin: "1% auto" }}>
            <h3>Please add required categories</h3>
            <ul>
              {skillSet.map(({ name }, index) => {
                return (
                  <li key={index}>
                    <div>
                      <div>
                        <input
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name={name}
                          value={name}
                          onChange={handleChange}
                        />
                        <label htmlFor={`custom-checkbox-${index}`}>
                          {name}
                        </label>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Box>
          <Button
            sx={{ width: "50%", margin: "2% auto" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Create;
