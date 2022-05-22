import express from 'express';
import { client } from '../index.js';

const router = express.Router();

// Add new user ✅
router.post('/', async function (req, res) {
    const newUser = req.body;
    const data = await client.db('todo-app').collection('users').insertOne(newUser);
    res.send(data);
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
    const { username } = req.params;
    const data = await client.db('todo-app').collection('users').find({ username: username }).toArray();
    res.send(data);
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