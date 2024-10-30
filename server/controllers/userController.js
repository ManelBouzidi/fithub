const db = require('../orm/indexorm.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;

// JWT secret key (in a real application, this should be in an environment variable)
const JWT_SECRET = 'secret';

cloudinary.config({
  cloud_name: 'dqjkaqycr',
  api_key: '752356833528756',
  api_secret: 'eNnONf3pCuzS2EFDlnHpTr7AO0s'
});

// Getting all users
const getAllUsers = async (req, res) => {
    try {
        const result = await db.user.findAll({})
        res.status(200).send(result);
    } 
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const getOneUser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.user.findOne({where: {id}})
        if (!result) {
            res.status(404).send({"message": `User with id ${id} not found!!`})
        } else {
            res.status(200).send(result)
        }
    } catch (error) {
        console.error('Error finding user', error);
        res.status(500).send({error: 'Internal Server Error'})
    }
}

const signup = async (req, res) => {
    try {
        const { name, lastName, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await db.user.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await db.user.create({
            name,
            lastName,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).send({ user: newUser, token, message: 'User created successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).send({ message: 'Error in signup', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.user.findOne({ where: { email } });
        
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ message: 'Login successful', token, user: user.id });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ message: 'Error in login', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const dUser = await db.user.destroy({where: {id}})
        res.status(200).send({message: 'User deleted!!'})
    } catch (error) {
        res.status(500).send(error)
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, lastName, email, password, image } = req.body;
        const id = req.params.id;

        let updateData = { name, lastName, email };
        
        // Only update password if a new one is provided
        if (password && password.trim() !== '') {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateData.password = hashedPassword;
        }

        // cloudinary
        if (image) {
            try {
                const result = await cloudinary.uploader.upload(image);
                updateData.image = result.secure_url;
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
                return res.status(500).send({ message: 'Error uploading image', error: error.message });
            }
        }

        await db.user.update(updateData, { where: {id} });
        const updatedUser = await db.user.findOne({where: {id}});
        
        // kan ma femech password
        const { password: _, ...userWithoutPassword } = updatedUser.toJSON();
        
        res.status(200).send({user: userWithoutPassword, message: 'User updated'});
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).send({ message: 'Error updating user', error: error.message });
    }
};

module.exports = { getAllUsers, getOneUser, signup, login, deleteUser, updateUser }
