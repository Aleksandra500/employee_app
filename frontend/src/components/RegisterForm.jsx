import React from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useDispatch } from 'react-redux';
import { showLoaderAction } from "../store/loaderSlice";
import { registerService } from "../services/loginServices";
import { useNavigate } from 'react-router-dom';
export default function RegisterForm() {
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate()
 
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // OVDE SAM STALA SA CUVANJEM TOKENA U LOCALSTORAGE

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(showLoaderAction(true))
    const res = await registerService(form)
    dispatch(showLoaderAction(false))
    console.log('Raw response:', res);
    console.log('Status type:', typeof res.status);
    console.log('Status trimmed:', res.status?.trim());
    console.log('Check condition:', res.status?.trim().toLowerCase() === 'success');
    
    if (res.status === 'success') {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      console.log('🎉 Uspešno sačuvano u localStorage');
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
