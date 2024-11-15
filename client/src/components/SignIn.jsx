import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../auth';
import fithubLogo from '/BannerImage/fithublogo.png';

const SignIn = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear any previous errors
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        const result = await signIn(email, password);
        if (result.success) {
            setIsAuthenticated(true);
            navigate('/');
        } else {
            setError(result.error || 'An error occurred during sign in. Please try again.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <img src={fithubLogo} alt="FitHub Logo" style={{ width: '400px', margin: 'auto', background: 'white', 'borderRadius': '90px' }} />

                <Typography sx={{ color: 'white', marginTop: 3 }} component="h1" variant="h5">
                    Sign in to FitHub
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                        {error}
                    </Alert>
                )}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        placeholder="Email Address"
                        InputLabelProps={{ shrink: true, sx: { color: 'white' } }}
                        inputProps={{
                            sx: {
                                "&::placeholder": {
                                    color: "white"
                                }
                            }
                        }}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        placeholder="Password"
                        InputLabelProps={{ shrink: true, sx: { color: 'white' } }}
                        inputProps={{
                            sx: {
                                "&::placeholder": {
                                    color: "white"
                                }
                            }
                        }}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: 'white',
                                '&::placeholder': {
                                    color: 'white',
                                },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Button
                        fullWidth
                        variant="text"
                        onClick={() => navigate('/signup')}
                    >
                        Don't have an account? Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default SignIn;
