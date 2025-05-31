import React from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useDispatch } from 'react-redux';
import { showLoaderAction } from "../store/loaderSlice";
import { registerService } from "../services/loginServices";
export default function RegisterForm() {
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch()
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(showLoaderAction(true))
    const res = await registerService(form)
    if(res.data.status === 'success'){
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }else{
      console.log('ovde pravi gresku');
      
    }
    dispatch(showLoaderAction(false))
    console.log("Register:", form);
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
          Register
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
            name="password"
            type="password"
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
            Sign Up
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
