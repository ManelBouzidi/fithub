
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const EditProfile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    image: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = 1; // Change this to dynamic ID as needed
      const response = await axios.get(`http:/localhost:8080/user/getOne/${userId}`);
      setUser(response.data);
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const userId = 1; // Change this to dynamic ID as needed
    await axios.put(`http:/localhost:8080/user/update/${userId}`, user);
    navigate('/Profil');
  };

// CSS styling
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px 15px',
    margin: '10px 5px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '16px',
  },
  cancelButton: {
    padding: '10px 15px',
    margin: '10px 5px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#6c757d',
    color: '#fff',
    fontSize: '16px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
};

return (
  <div style={styles.container}>
    <h1 style={styles.heading}>Edit Profile</h1>
    <input
      type="text"
      name="username"
      value={user.username}
      onChange={handleChange}
      placeholder="Username"
      style={styles.input}
    />
    <input
      type="email"
      name="email"
      value={user.email}
      onChange={handleChange}
      placeholder="Email"
      style={styles.input}
    />
    <input
      type="password"
      name="password"
      value={user.password}
      onChange={handleChange}
      placeholder="Password"
      style={styles.input}
    />
    <input
      type="text"
      name="image"
      value={user.image}
      onChange={handleChange}
      placeholder="Profile Image URL"
      style={styles.input}
    />
    <div>
      <button onClick={handleSave} style={styles.button}>Save Changes</button>
      <button onClick={() => navigate('/Profil')} style={styles.cancelButton}>Cancel</button>
    </div>
  </div>
  );
};

export default EditProfile;
