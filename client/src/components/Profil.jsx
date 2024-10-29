import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider"; // Your Auth context for user data
import axios from "axios";
import './Profile.css'; // Adjust the path as needed
import { IoPersonCircleOutline } from "react-icons/io5";
import UploadAvatar from "./UploadAvatar"; // Assuming you have this component for uploading avatar
import { useNavigate } from "react-router-dom"; // For navigation

const Profile = () => {
    const { user } = useAuth(); // Retrieve user from context
    const [favBooks, setFavBooks] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchFavBooks = async () => {
            if (!user || !user.id) {
                console.error("User data or ID is not available.");
                return; // Prevent fetching if user data or ID is not available
            }

            console.log("Fetching favorite books for user ID:", user.id); // Debugging log

            try {
                const booksResponse = await axios.get(`http://localhost:8080/user/${user.id}/favList`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Fetched favorite books response:", booksResponse.data); // Debugging log
                setFavBooks(booksResponse.data);
            } catch (error) {
                console.error("Failed to fetch favorite books:", error);
            }
        };

        fetchFavBooks();
    }, [user, token, refresh]);

    const handleDeleteBook = async (bookId) => {
        try {
            await axios.delete(`http://localhost:8080/user/${user.id}/favList/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRefresh(!refresh); // Refresh the list
        } catch (error) {
            console.error("Failed to delete book:", error);
        }
    };

    const handleEditProfile = () => {
        navigate('/EditProfile');
    };

    console.log("Current user in Profile:", user); // Debugging log

    return (
      <div className="profile-container">
          {user ? (
              <>
                  <h1>{user.username}'s Profile</h1>
                  <div className="avatar">
                      <div className="avatar-wrapper">
                          {user.image ? (
                              <img src={user.image} alt={`${user.username} avatar`} />
                          ) : (
                              <IoPersonCircleOutline className="icon" />
                          )}
                          <UploadAvatar
                              token={token}
                              userId={user.id}
                              username={user.username}
                              avatarUrl={user.image}
                              setRefresh={setRefresh}
                          />
                      </div>
                  </div>
                  <div className="profile-info">
                      <p>Email: {user.email}</p>
                  </div>
                  <h2>My Favorite Books</h2>
                  {Array.isArray(favBooks) && favBooks.length > 0 ? (
                      <ul>
                          {favBooks.map((book) => (
                              <li key={book.id}>
                                  {book.title}
                                  <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                              </li>
                          ))}
                      </ul>
                  ) : (
                      <p>No favorite books found.</p>
                  )}
                  <button onClick={handleEditProfile}>Edit Profile</button>
                  <button onClick={() => navigate('/')}>Home</button>
              </>
          ) : (
              <div className="loading">Loading...</div>
          )}
      </div>
    );
};

export default Profile;
