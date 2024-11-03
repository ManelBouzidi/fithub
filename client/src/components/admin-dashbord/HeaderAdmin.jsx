import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Avatar, Button, Menu, MenuItem } from '@mui/material';
import { Notifications as NotificationsIcon, Mail as MailIcon, AccountCircle } from '@mui/icons-material';
import axios from 'axios';
import { getUserId, getAuthHeader, signOut } from '../../auth';
import { useNavigate, Link } from 'react-router-dom';

const drawerWidth = 240;

function HeaderAdmin({ setIsAuthenticated }) {
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = getUserId();
      try {
        const response = await axios.get(`http://localhost:3000/user/getOne/${userId}`, {
          headers: getAuthHeader()
        });
        setUserName(`${response.data.name} ${response.data.lastName}`);
        setUserImage(response.data.image);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut();
    setIsAuthenticated(false);
    navigate("/signin");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
      }}
    >
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button color="inherit">Visit Shop</Button>
        </Link>
        <div style={{ flexGrow: 1 }} />
        <Button color="inherit" onClick={handleMenu} startIcon={
          <Avatar
            src={userImage}
            alt={userName}
            sx={{ width: 32, height: 32 }}
          >
            {!userImage && <AccountCircle />}
          </Avatar>
        }>
          {userName}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => { handleClose(); navigate("/profile"); }}>Profile</MenuItem>
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderAdmin;
