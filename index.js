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
    console.log("Mongo is connected ✅")
    return client;
}
const client = await createConnection();

app.use(express.json());    // converts data to json

// third party package - middleware
app.use(cors());   //anybody can access this data from API

app.get('/', function (req, res) {
    res.send('To-do app data is available, access the data and create the world class web apps. Happy Coding 😊')
})


// Add new user ✅
app.post('/users', async function (req, res) {
    const data = req.body;
    const oneTodo = await client.db("todo-app").collection("users").insertOne(data);
    console.log(oneTodo);
    oneTodo ? res.send(oneTodo) : res.status(404).send({ "error": "request not fullfilled" });
})
// Get all users data
app.get('/users', async function (req, res) {
    const data = await client.db("todo-app").collection("users").find({}).toArray();
    console.log(data);
    res.send(data);
})
// Get user by username
app.get('/users/:username', async function (req, res) {
    const user = req.params;
    const data = await client.db("todo-app").collection("users").findOne({ "username": user.username });
    console.log(user.username);
    data ? res.send(data) : res.send({ "error": "user not found" })
})


// Add new to-do to a list ✅
app.post('/todo', async function (req, res) {
    const data = req.body;
    const oneTodo = await client.db("todo-app").collection("to-do").insertOne(data);
    console.log(oneTodo);
    oneTodo ? res.send(oneTodo) : res.status(404).send({ "error": "request not fullfilled" });
})
// Get all to-do data
app.get('/todo', async function (req, res) {
    const data = await client.db("todo-app").collection("to-do").find({}).toArray();
    console.log(data);
    res.send(data);
})
// Get user by username
app.get('/todo/:username', async function (req, res) {
    const user = req.params;
    const data = await client.db("todo-app").collection("to-do").findMany({ "username": user.username });
    console.log(user.username);
    data ? res.send(data) : res.send({ "error": "user not found" })
})







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
