// const express = require('express')
import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
import cors from "cors";
import { ObjectId } from "mongodb";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
// const MONGO_URL = 'mongodb://localhost';
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
    const client = new MongoClient(MONGO_URL)
    await client.connect();
    console.log("MongoDB is connected ✅")
    return client;
}
const client = await createConnection();

app.use(express.json());    // converts data to json

// third party package - middleware
app.use(cors());   //anybody can access this data from API

app.get('/', function (req, res) {
    res.send('To-do app data is available, access the data and create the world class web apps. Happy Coding 😊')
})




// user -> 
// POST new user ✅
// GET all users ✅
// GET users by id ✅
// GET users by username ❌
// DELETE user by id ✅
// DELETE user by username ❌

// todo -> 
// POST new todo ✅
// GET all todo ✅
// GET todo by username ✅ 
// GET todo by _id  ✅
// DELETE todo by id  ✅
// PUT todo by _id  ✅

// Add new user ✅
app.post('/users', async function (req, res) {
    const newUser = req.body;
    const data = await client.db('todo-app').collection('users').insertOne(newUser);
    res.send(data);
})
// Get all users ✅
app.get('/users', async function (req, res) {
    const data = await client.db('todo-app').collection('users').find({}).toArray();
    res.send(data);
})
//  Get user by id ✅
// app.get('/users/:id', async function (req, res) {
//     const q = req.params;
//     const data = await client.db('todo-app').collection('users').findOne({ _id: ObjectId(q.id) });
//     data ? res.send(data) : res.send({ "error": "user not found" })
// })

// // Get user by username ✅
app.get('/users/:username', async function (req, res) {
    const { username } = req.params;
    const data = await client.db('todo-app').collection('users').find({ username: username }).toArray();
    res.send(data);
})

// Delete user by id ✅
// app.delete('/users/:id', async function (req, res) {
//     const q = req.params;
//     const data = await client.db('todo-app').collection('users').deleteOne({ _id: ObjectId(q.id) });
//     res.send(data);
// })
// Delete user by username ✅
app.delete('/users/:username', async function (req, res) {
    const { username } = req.params;
    const data = await client.db('todo-app').collection('users').deleteOne({ username: username });
    res.send(data);
})


// ****************************************************************

// POST new todo ✅
app.post('/todo', async function (req, res) {
    const data = req.body;
    const result = await client.db('todo-app').collection('to-do').insertOne(data);
    res.send(result);
})
// GET todo list ✅
app.get('/todo', async function (req, res) {
    const q = req.query;
    const data = await client.db('todo-app').collection('to-do').find({}).toArray();
    q.id ? res.send(await client.db('todo-app').collection('to-do').findOne({ _id: ObjectId(q.id) })) : res.send(data);
})

// GET todo by username ✅
app.get('/todo/:username', async function (req, res) {
    const { username } = req.params;
    const data = await client.db('todo-app').collection('to-do').find({ username: username }).toArray();
    res.send(data);
})
// EDIT ✅
app.get('/todo/edit/:id', async function (req, res) {
    const q = req.params;
    res.send(await client.db('todo-app').collection('to-do').findOne({ _id: ObjectId(q.id) }));
})
// DELETE ✅
app.delete('/todo/edit/:id', async function (req, res) {
    const q = req.params;
    const data = await client.db('todo-app').collection('to-do').deleteOne({ _id: ObjectId(q.id) });
    res.send(data);
})
// PUT ✅
app.put('/todo/edit/:id', async function (req, res) {
    const q = req.params;
    const updateData = req.body;
    const data = await client.db('todo-app').collection('to-do').updateOne({ _id: ObjectId(q.id) }, { $set: updateData });
    res.send(updateData);
})



// **************************************************************

app.listen(PORT, () => console.log(`Started server at ${PORT} 😎`));
