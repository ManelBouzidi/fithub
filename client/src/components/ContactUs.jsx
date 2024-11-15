import React from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Box
} from '@mui/material';

const ContactUs = () => {
    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, mb: 4, backgroundColor: '#000000', color: '#ffffff', padding: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Contact Us
                </Typography>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="First Name"
                                variant="outlined"
                                required
                                sx={{
                                    color: '#ffffff',
                                    '& .MuiOutlinedInput-root': {
                                        color: '#ffffff',
                                        '& fieldset': {
                                            borderColor: '#ffffff'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#ffffff'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#ffffff'
                                        }
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ffffff'
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                variant="outlined"
                                required
                                sx={{
                                    color: '#ffffff',
                                    '& .MuiOutlinedInput-root': {
                                        color: '#ffffff',
                                        '& fieldset': {
                                            borderColor: '#ffffff'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#ffffff'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#ffffff'
                                        }
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ffffff'
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                type="email"
                                required
                                sx={{
                                    color: '#ffffff',
                                    '& .MuiOutlinedInput-root': {
                                        color: '#ffffff',
                                        '& fieldset': {
                                            borderColor: '#ffffff'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#ffffff'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#ffffff'
                                        }
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ffffff'
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Message"
                                variant="outlined"
                                multiline
                                rows={4}
                                required
                                sx={{
                                    color: '#ffffff',
                                    '& .MuiOutlinedInput-root': {
                                        color: '#ffffff',
                                        '& fieldset': {
                                            borderColor: '#ffffff'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#ffffff'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#ffffff'
                                        }
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ffffff'
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ backgroundColor: '#ffffff', color: '#000000' }}
                            >
                                Send Message
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default ContactUs;
