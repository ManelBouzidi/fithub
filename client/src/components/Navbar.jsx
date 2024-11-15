import React, { useState, useEffect } from 'react';
import { ListItemText, Button, Menu, MenuItem, Avatar, Badge } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Search, AccountCircle, ShoppingCart } from "@mui/icons-material";
import { MyList, NavbarContainer, NavbarHeader } from "../styles/NavStyle";
import Action from "./Action";
import { useNavigate } from "react-router-dom";
import { signOut, getUserId, getAuthHeader, isAdmin } from "../auth";
import axios from 'axios';
import fithubLogo from '/BannerImage/fithublogo.png';

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        const userId = getUserId();
        const response = await axios.get(`http://localhost:3000/user/getOne/${userId}`, {
          headers: getAuthHeader()
        });
        setUserName(`${response.data.name} ${response.data.lastName}`);
        setUserImage(response.data.image);
      }
    };
    fetchUserData();

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItemsCount(cart.length);
    };

    updateCartCount();

    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
    };
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
      <NavbarHeader onClick={() => navigate("/")}>
        <img src={fithubLogo} alt="FitHub Logo" style={{ width: '100px', marginLeft: '50px' }} />
      </NavbarHeader>
      <MyList type="row" style={{ alignItems: 'center', height: '100%', textAlign: 'center' }}>
        <ListItemText sx={{
          '&:hover': {
            backgroundColor: '#a71414',
            color: 'white',
            borderRadius: '20px'

          }
        }} primary="Home" onClick={() => navigate("/")} style={{ padding: '16px 0', '&:hover': { backgroundColor: '#a71414', color: 'white' } }} />
        <ListItemText sx={{
          '&:hover': {
            backgroundColor: '#a71414',
            color: 'white',
            borderRadius: '20px'

          }
        }} primary="Products" onClick={() => navigate("/products")} style={{ padding: '16px 0', '&:hover': { backgroundColor: '#a71414', color: 'white' } }} />
        <ListItemText sx={{
          '&:hover': {
            backgroundColor: '#a71414',
            color: 'white',
            borderRadius: '20px'
          }
        }} primary="Contact Us" onClick={() => navigate("/contact")} style={{ marginRight: '4px', padding: '16px 0', '&:hover': { backgroundColor: '#a71414', color: 'white' } }} />
        {isAdmin() && <ListItemText primaryTypographyProps={{ sx: { color: '#a71414', background: "white", borderRadius: '16px', fontWeight: 'bold' } }} primary="Admin" onClick={() => navigate("/admin")} style={{ padding: '16px 0', '&:hover': { backgroundColor: '#a71414', color: 'white' } }} />}
      </MyList>
      <Badge slotProps={{ badge: { style: { backgroundColor: '#a71414' } } }} sx={{ backgroundColor: '#a71414' }} badgeContent={cartItemsCount} style={{ color: 'white', backgroundColor: '#a71414', marginLeft: '30px', marginRight: '30px', cursor: 'pointer' }} onClick={() => navigate("/cart")}>
        <ShoppingCart sx={{ backgroundColor: 'black' }} />
      </Badge>
      {isAuthenticated ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button sx={{ color: 'white' }} onClick={handleMenu} startIcon={<Avatar src={userImage} sx={{ width: 32, height: 32 }}
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

        </div>
      ) : (
        <>
          <Button sx={{
            '&:hover': {
              backgroundColor: '#a71414',
              color: 'white',
              borderRadius: '20px'
            }
          }} onClick={() => navigate("/signin")} style={{ marginRight: '10px' }}>
            Sign In
          </Button>
          <Button sx={{
            '&:hover': {
              backgroundColor: '#a71414',
              color: 'white',
              borderRadius: '20px'
            }
          }} onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </>
      )}
    </NavbarContainer>
  );
}
