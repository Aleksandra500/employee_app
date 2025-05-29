import React from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

export default function HomePage() {
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ovde ide tvoj login request
    console.log("Login:", form);
  };

  return (
    <Box
      sx={{
        width: 300,
        margin: "auto",
        marginTop: 8,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
