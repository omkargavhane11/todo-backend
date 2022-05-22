import express from 'express';
import { client } from '../index.js';

const router = express.Router();

// POST new todo ✅
router.post('/', async function (req, res) {
    const data = req.body;
    const result = await client.db('todo-app').collection('to-do').insertOne(data);
    res.send(result);
})
// GET todo list ✅
router.get('/', async function (req, res) {
    const q = req.query;
    const data = await client.db('todo-app').collection('to-do').find({}).toArray();
    q.id ? res.send(await client.db('todo-app').collection('to-do').findOne({ _id: ObjectId(q.id) })) : res.send(data);
})

// GET todo by username ✅
router.get('/:username', async function (req, res) {
    const { username } = req.params;
    const data = await client.db('todo-app').collection('to-do').find({ username: username }).toArray();
    res.send(data);
})
// EDIT ✅
router.get('/edit/:id', async function (req, res) {
    const q = req.params;
    res.send(await client.db('todo-app').collection('to-do').findOne({ _id: ObjectId(q.id) }));
})
// DELETE ✅
router.delete('/edit/:id', async function (req, res) {
    const q = req.params;
    const data = await client.db('todo-app').collection('to-do').deleteOne({ _id: ObjectId(q.id) });
    res.send(data);
})
// PUT ✅
router.put('/edit/:id', async function (req, res) {
    const q = req.params;
    const updateData = req.body;
    const data = await client.db('todo-app').collection('to-do').updateOne({ _id: ObjectId(q.id) }, { $set: updateData });
    res.send(updateData);
})

export const todoRouter = router;