import express from 'express';
import { client, genPassword } from '../index.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { auth } from '../middleware/auth.js';

// dotenv.config();
const router = express.Router();

// Add new user ✅✅
router.post('/signup', async function (req, res) {
    const { username, password, email } = req.body;
    const hashedPassword = await genPassword(password);
    const findUsername = await client.db('todo-app').collection('users').findOne({ username: username });
    const findEmail = await client.db('todo-app').collection('users').findOne({ email: email });
    const newUser = { username: username, password: hashedPassword.hashedPassword, email: email };
    const data = await client.db('todo-app').collection('users').insertOne(newUser);
    if (findUsername || findEmail) {
        res.status(400).send({ "error": "user already exists with given credentials" })
    } else {
        res.send(data);
    }
})
// Login
router.post('/login', async function (req, res) {
    const { username, password, email } = req.body;
    const checkUsername = await client.db('todo-app').collection('users').findOne({ username: username });
    if (!checkUsername) {
        res.send({ "error": "invalid credentials" });
    } else {
        const storedPassword = checkUsername.password;
        const isPasswordMatch = await bcrypt.compare(password, storedPassword);

        if (isPasswordMatch) {
            const token = jwt.sign({ id: checkUsername._id }, process.env.SECRET_KEY);
            res.send({ "msg": "successfull login", token });
        } else {
            res.send({ "error": "invalid credentials" });
        }
    }
})
// Get all users ✅
router.get('/', async function (req, res) {
    const data = await client.db('todo-app').collection('users').find({}).toArray();
    res.send(data);
})
//  Get user by id ✅
// router.get('/:id', async function (req, res) {
//     const q = req.params;
//     const data = await client.db('todo-app').collection('users').findOne({ _id: ObjectId(q.id) });
//     data ? res.send(data) : res.send({ "error": "user not found" })
// })

// // Get user by username ✅
router.get('/:username', async function (req, res) {
    const { username, email } = req.params;
    const findUser = await client.db('todo-app').collection('users').find({ $or: [{ username: username }, { email: email }] }).toArray();
    res.send(findUser);
})

// Delete user by id ✅
// router.delete('/:id', async function (req, res) {
//     const q = req.params;
//     const data = await client.db('todo-app').collection('users').deleteOne({ _id: ObjectId(q.id) });
//     res.send(data);
// })
// Delete user by username ✅
router.delete('/:username', async function (req, res) {
    const { username } = req.params;
    const data = await client.db('todo-app').collection('users').deleteOne({ username: username });
    res.send(data);
})

export const usersRouter = router;