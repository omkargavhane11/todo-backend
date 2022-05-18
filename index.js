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
// GET users by username ✅
// DELETE user by username ✅

// todo -> 
// POST new todo ✅
// GET all todo ✅
// GET todo by username ✅ 
// GET todo by _id  ✅
// DELETE todo by id 
// PUT todo by _id


app.post('/users', async function (req, res) {
    const newUser = req.body;
    const data = await client.db('todo-app').collection('users').insertOne(newUser);
    res.send(data);
})
app.get('/users', async function (req, res) {
    const data = await client.db('todo-app').collection('users').find({}).toArray();
    res.send(data);
})
app.get('/users/:username', async function (req, res) {
    const { username } = req.params;
    const data = await client.db('todo-app').collection('users').find({ username: username }).toArray();
    res.send(data);
})
app.delete('/users/:username', async function (req, res) {
    const { username } = req.params;
    const data = await client.db('todo-app').collection('users').deleteOne({ username: username });
    res.send(data);
})


// ****************************************************************


app.post('/todo', async function (req, res) {
    const data = req.body;
    const result = await client.db('todo-app').collection('to-do').insertOne(data);
    res.send(result);
})
app.get('/todo', async function (req, res) {
    const q = req.query;
    const data = await client.db('todo-app').collection('to-do').find({}).toArray();
    q.id ? res.send(await client.db('todo-app').collection('to-do').findOne({ _id: ObjectId(q.id) })) : res.send(data);
})

app.get('/todo/:username', async function (req, res) {
    const { username } = req.params;
    const data = await client.db('todo-app').collection('to-do').find({ username: username }).toArray();
    console.log(username);
    res.send(data);
})
// EDIT
app.get('/todo/edit/:id', async function (req, res) {
    const q = req.params;
    res.send(await client.db('todo-app').collection('to-do').findOne({ _id: ObjectId(q.id) }));
})
// DELETE
app.delete('/todo', async function (req, res) {
    const q = req.query;
    const data = await client.db('todo-app').collection('to-do').deleteOne({ _id: ObjectId(q.id) });
    res.send(data);
})


























// // Add new user ✅
// app.post('/users', async function (req, res) {
//     const data = req.body;
//     const oneTodo = await client.db("todo-app").collection("users").insertOne(data);
//     console.log(oneTodo);
//     oneTodo ? res.send(oneTodo) : res.status(404).send({ "error": "request not fullfilled" });
// })
// // Get all users data
// app.get('/users', async function (req, res) {
//     const data = await client.db("todo-app").collection("users").find({}).toArray();
//     console.log(data);
//     res.send(data);
// })
// // Get user by username
// app.get('/users/:username', async function (req, res) {
//     const user = req.params;
//     const data = await client.db("todo-app").collection("users").findOne({ "username": user.username });
//     console.log(user.username);
//     data ? res.send(data) : res.send({ "error": "user not found" })
// })


// // Add new to-do to a list ✅
// app.post('/todo', async function (req, res) {
//     const data = req.body;
//     const oneTodo = await client.db("todo-app").collection("to-do").insertOne(data);
//     console.log(oneTodo);
//     oneTodo ? res.send(oneTodo) : res.status(404).send({ "error": "request not fullfilled" });
// })




// // Get todo by username❌
// // app.get('/todo/:username', async function (req, res) {
// //     const user = req.query;
// //     const data = await client.db("todo-app").collection("to-do").find({ "username": user.username }).toArray();
// //     console.log(user.username);
// //     data ? res.send(data) : res.send({ "error": "user not found" })
// // })

// // Get todo by username copy for adding todo
// app.get('/todo/addtodo/:username', async function (req, res) {
//     const user = req.params;
//     const data = await client.db("todo-app").collection("to-do").find({ "username": user.username }).toArray();
//     console.log(user.username);
//     data ? res.send(data) : res.send({ "error": "user not found" })
// })

// // Get todo by username ✅
// app.post('/todo/:username', async function (req, res) {
//     const user = req.body;
//     const data = await client.db("todo-app").collection("to-do").insertOne({ "username": user.username });
//     console.log(user.username);
//     data ? res.send(data) : res.send({ "error": "user not found" })
// })

// // delete todo by ID ❓
// app.delete('/todo', async function (req, res) {
//     const { username, _id } = req.query;
//     // const data = await client.db("todo-app").collection("to-do").find({ "username": user.username, "_id": username._id }).toArray();
//     console.log(_id,username);
//     // username ? res.send(data.filter((m) => m._id == id)) : res.send(data);
// })

// // Get all to-do data  ✅
// app.get('/todo', async function (req, res) {
//     const { username } = req.query;
//     const data = await client.db("todo-app").collection("to-do").find({}).toArray();
//     console.log(username);
//     username ? res.send(data.filter((m) => m.username == username)) : res.send(data);
// })





// // delete all todos
// app.delete('/users', async function (req, res) {
//     const oneTodo = await client.db("users").collection("todo").deleteMany({});
//     oneTodo ? res.send(oneTodo) : res.status(404).send({ "error": "request not found" });
// })

// // delete todos
// app.delete('/users', async function (req, res) {
//     const data = req.query;
//     const oneTodo = await client.db("users").collection("todo").findMany(req.query);
//     // console.log(oneTodo);
//     oneTodo ? res.send(oneTodo) : res.status(404).send({ "error": "request not found" });
// })

// // delete todo by id
// app.get('/users/:id', async function (req, res) {
//     const { id } = req.params;
//     const oneTodo = await client.db("users").collection("todo").deleteOne({ _id: ObjectId(id) });
//     // console.log(oneTodo);
//     oneTodo ? res.send(oneTodo) : res.status(404).send({ "error": "request not found" });
// })



app.listen(PORT, () => console.log(`Started server at ${PORT} 😎`));
