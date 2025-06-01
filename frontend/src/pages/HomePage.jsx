import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { Box, Button } from '@mui/material';
function HomePage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div >
        <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="50vh"
      sx={{ pt: 28 }} 
    >
      {showLogin ? <LoginForm /> : <RegisterForm />}
      <Button
        onClick={() => setShowLogin(!showLogin)}
        sx={{ mt: 2, mb: 2 }}
      >
        {showLogin
          ? 'Need an account? Register'
          : 'Already have an account? Login'}
      </Button>
    </Box>
  </div>
  )
}


export default HomePage;