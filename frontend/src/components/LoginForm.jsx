import React from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useDispatch } from 'react-redux';
import { showLoaderAction } from "../store/loaderSlice";
import { loginService } from "../services/loginServices";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch()
   const navigate = useNavigate()
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
      dispatch(showLoaderAction(true))
        const res = await loginService(form)
        dispatch(showLoaderAction(false))
        if (res.status === 'success') {
          localStorage.setItem('user', JSON.stringify(res.user));
          navigate('statistic');
         
        } else {
          console.log('⚠️ Došlo je do greške:', res.message);
        }
    
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
