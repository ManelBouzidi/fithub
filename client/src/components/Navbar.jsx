import React, { useState, useEffect } from 'react';
import { ListItemText, Button, Menu, MenuItem, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Search, AccountCircle } from "@mui/icons-material";
import { MyList, NavbarContainer, NavbarHeader } from "../styles/NavStyle";
import Action from "./Action";
import { useNavigate } from "react-router-dom";
import { signOut, getUserId, getAuthHeader, isAdmin } from "../auth";
import axios from 'axios';

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        const userId = getUserId();
        const response = await axios.get(`http://localhost:3000/user/getOne/${userId}`, {
          headers: getAuthHeader()
        });
        setUserName(`${response.data.name} ${response.data.lastName}`);
        setUserImage(response.data.image); // Assuming the image URL is stored in 'profileImage' field
      }
    };
    fetchUserData();
  }, [isAuthenticated]);

  const handleSignOut = () => {
    signOut();
    setIsAuthenticated(false);
    setUserName('');
    setUserImage(null);
    setAnchorEl(null);
    navigate("/signin");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <NavbarContainer>
      <NavbarHeader>FitHub</NavbarHeader>
      <MyList type="row">
        <ListItemText primary="Home" onClick={() => navigate("/")} />
        <ListItemText primary="Products" onClick={() => navigate("/products")} />
        <ListItemText primary="Contact Us" onClick={() => navigate("/contact")} />
        {isAdmin() && <ListItemText primary="Admin" onClick={() => navigate("/admin")} />}

      </MyList>
      {isAuthenticated ? (
        <div>
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
          <Action />

        </div>
      ) : (
        <>
          <Button color="inherit" onClick={() => navigate("/signin")} style={{ marginRight: '10px' }}>
            Sign In
          </Button>
          <Button color="inherit" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </>
      )}
    </NavbarContainer>
  );
}
