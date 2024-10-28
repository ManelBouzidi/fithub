const db = require('../orm/indexorm.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// JWT secret key (in a real application, this should be in an environment variable)
const JWT_SECRET = 'your_jwt_secret';

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

// Getting just one user by id
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

// Signup new user
const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        
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
            email,
            password: hashedPassword
        });

        res.status(201).send({ user: newUser, message: 'User created successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).send({ message: 'Error in signup', error: error.message });
    }
};

// Login user
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

        // Create and assign a token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ message: 'Error in login', error: error.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const dUser = await db.user.destroy({where: {id}})
        res.status(200).send({message: 'User deleted!!'})
    } catch (error) {
        res.status(500).send(error)
    }
};

// Updating user
const updateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const id = req.params.id;

        // If password is being updated, hash it
        let updateData = { email };
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateData.password = hashedPassword;
        }

        await db.user.update(updateData, { where: {id} });
        const updatedUser = await db.user.findOne({where: {id}});
        res.status(200).send({user: updatedUser, message: 'User updated'});
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).send({ message: 'Error updating user', error: error.message });
    }
}

module.exports = { getAllUsers, getOneUser, signup, login, deleteUser, updateUser }
