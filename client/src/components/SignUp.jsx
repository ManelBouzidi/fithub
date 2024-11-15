import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Alert, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../auth';
import fithubLogo from '/BannerImage/fithublogo.png';

const SignUp = ({ setIsAuthenticated }) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');//default as user
    const [secretWord, setsecretWord] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!name || !lastName || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (role === 'admin' && secretWord !== "fithubadminsecret") {
            setError('Incorrect secret Word you are not an admin')
        }

        const result = await signUp(name, lastName, email, password);
        if (result.success) {
            setIsAuthenticated(true);
            if (role === 'admin') { alert("Welcome,Admin"); navigate('/admin') } else { navigate('/'); }

        } else {
            setError(result.error || 'An error occurred during sign up. Please try again.');
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ backgroundColor: 'black', color: 'white', padding: '2rem' }}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <img src={fithubLogo} alt="FitHub Logo" style={{ width: '400px', margin: 'auto', background: 'white', 'borderRadius': '90px' }} />

                <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
                    Sign up
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mt: 2, width: '100%', backgroundColor: 'black', color: 'white' }}>
                        {error}
                    </Alert>
                )}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
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
                        name="name"
                        autoComplete="given-name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        id="lastName"
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
                        name="lastName"
                        autoComplete="family-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                        InputLabelProps={{ shrink: true, sx: { color: 'white' } }}
                        inputProps={{
                            sx: {
                                "&::placeholder": {
                                    color: "white"
                                }
                            }
                        }}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        placeholder="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    <TextField
                        placeholder="Confirm password"
                        InputLabelProps={{ shrink: true, sx: { color: 'white' } }}
                        inputProps={{
                            sx: {
                                "&::placeholder": {
                                    color: "white"
                                }
                            }
                        }}
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                    <FormControl component="fieldset" sx={{ mt: 2, color: 'white' }}>
                        <FormLabel component="legend" sx={{ color: 'white' }}>Role</FormLabel>
                        <RadioGroup
                            row
                            aria-label="role"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <FormControlLabel value="user" control={<Radio sx={{ color: 'white' }} />} label="User" sx={{ color: 'white' }} />
                            <FormControlLabel value="admin" control={<Radio sx={{ color: 'white' }} />} label="Admin" sx={{ color: 'white' }} />
                        </RadioGroup>
                    </FormControl>
                    {/* Display Secret Word field only if role is admin */}
                    {role === 'admin' && (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="secretWord"
                            label="Admin Secret Word"
                            type="text"
                            id="secretWord"
                            value={secretWord}
                            onChange={(e) => setsecretWord(e.target.value)}
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
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: 'white', color: 'black' }}
                    >
                        Sign Up
                    </Button>
                    <Button
                        fullWidth
                        variant="text"
                        onClick={() => navigate('/signin')}
                        sx={{ color: 'white' }}
                    >
                        Already have an account? Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUp;
