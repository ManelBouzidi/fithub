import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserId, getAuthHeader } from '../auth';
import { TextField, Button, Typography, Container, Box, Avatar, Alert, Snackbar, Grid } from '@mui/material';

const EditProfile = () => {
  const [user, setUser] = useState({
    name: '',
    lastName: '',
    email: '',
    image: '',
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = getUserId();
      if (!userId) {
        console.error("No user ID found");
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/user/getOne/${userId}`, {
          headers: getAuthHeader()
        });
        setUser(response.data);
        setPreviewUrl(response.data.image);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };
    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const userId = getUserId();
    if (!userId) {
      console.error("No user ID found");
      navigate('/login');
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const updatedUserData = {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      };

      if (password) {
        updatedUserData.password = password;
      }

      if (selectedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async () => {
          updatedUserData.image = reader.result;
          await sendUpdateRequest(userId, updatedUserData);
        };
      } else {
        await sendUpdateRequest(userId, updatedUserData);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        setToast({ open: true, message: 'Failed to update profile. Please try again.', severity: 'error' });
      }
    }
  };

  const sendUpdateRequest = async (userId, data) => {
    try {
      await axios.put(`http://localhost:3000/user/update/${userId}`, data, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json'
        }
      });
      setToast({ open: true, message: 'Profile updated successfully', severity: 'success' });
    } catch (error) {
      console.error("Error sending update request:", error);
      setToast({ open: true, message: 'Failed to update profile. Please try again.', severity: 'error' });
    }
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast({ ...toast, open: false });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Profile
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        <Avatar
          src={previewUrl || 'https://via.placeholder.com/150'}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              name="name"
              label="First Name"
              placeholder="First Name"
              InputLabelProps={{ shrink: true, sx: { color: 'white' } }}
              inputProps={{
                sx: {
                  "&::placeholder": {
                    color: "white"
                  }
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                    '&.Mui-focused': {
                      color: 'white',
                    },
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  '&::placeholder': {
                    color: 'white',
                  },
                },
              }}
              value={user.name || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              InputLabelProps={{ shrink: true, sx: { color: 'white' } }}
              inputProps={{
                sx: {
                  "&::placeholder": {
                    color: "white"
                  }
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                    '&.Mui-focused': {
                      color: 'white',
                    },
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  '&::placeholder': {
                    color: 'white',
                  },
                },
              }}
              value={user.lastName || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email"
              placeholder="Email"
              InputLabelProps={{ shrink: true, sx: { color: 'white' } }}
              inputProps={{
                sx: {
                  "&::placeholder": {
                    color: "white"
                  }
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                    '&.Mui-focused': {
                      color: 'white',
                    },
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  '&::placeholder': {
                    color: 'white',
                  },
                },
              }}
              type="email"
              value={user.email || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              name="password"
              label="New Password"
              placeholder="New Password"
              InputLabelProps={{ shrink: true, sx: { color: 'white' } }}
              inputProps={{
                sx: {
                  "&::placeholder": {
                    color: "white"
                  }
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                    '&.Mui-focused': {
                      color: 'white',
                    },
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  '&::placeholder': {
                    color: 'white',
                  },
                },
              }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              name="confirmPassword"
              label="Confirm New Password"
              placeholder="Confirm New Password"
              InputLabelProps={{ shrink: true, sx: { color: 'white' } }}
              inputProps={{
                sx: {
                  "&::placeholder": {
                    color: "white"
                  }
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                    '&.Mui-focused': {
                      color: 'white',
                    },
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  '&::placeholder': {
                    color: 'white',
                  },
                },
              }}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              type="file"
              label="Profile Image"
              placeholder="Profile Image"
              InputLabelProps={{ shrink: true, sx: { color: 'white' } }}
              inputProps={{
                accept: "image/*",
                sx: {
                  "&::placeholder": {
                    color: "white"
                  }
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                    '&.Mui-focused': {
                      color: 'white',
                    },
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  '&::placeholder': {
                    color: 'white',
                  },
                },
              }}
              onChange={handleFileChange}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Button variant="contained" color="secondary" onClick={() => navigate('/profile')}>
            Cancel
          </Button>
          <Button sx={{ ml: 1 }} variant="contained" color="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        message={toast.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditProfile;
