import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EditEmployeeDialog = ({ open, onClose, userData, onSave }) => {
  const [formData, setFormData] = useState({
    firs_name: '',
    last_name: '',
    position: '',
    salary: ''
  });

  // Kada userData stigne, popuni formu
  useEffect(() => {
    if (userData) {
      setFormData({
        id: userData.id,
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        position: userData.position || '',
        salary: userData.salary || ''
      });
    }
  }, [userData]);

  // Funkcija za promenu input polja
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Klik na Save
  const handleSubmit = () => {
    onSave(formData); // ovo prosleđuje podatke parent komponenti
    onClose(); // zatvara modal
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Employee</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="first_name"
          label="First Name"
          fullWidth
          value={formData.first_name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="last_name"
          label="Last Name"
          fullWidth
          value={formData.last_name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="position"
          label="Position"
          fullWidth
          value={formData.position}
          onChange={handleChange}
        />
          <TextField
          margin="dense"
          name="salary"
          label="Salary"
          fullWidth
          value={formData.salary}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployeeDialog;
