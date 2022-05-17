// const express = require('express')
import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";

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

app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/todo', async function (req, res) {
    const data = await client.db("todo").collection("todo").find({}).toArray();
    console.log(data);
    res.send(data);
})

app.post('/todo', async function (req, res) {
    const data = req.body;
    const oneTodo = await client.db("todo").collection("todo").insertMany(data);
    console.log(oneTodo);
    oneTodo ? res.send(oneTodo) : res.status(404).send({ "error": "request not fullfilled" });
})

app.delete('/todo', async function (req, res) {
    // const { id } = req.params;
    const oneTodo = await client.db("todo").collection("todo").deleteMany({});
    // console.log(oneTodo);
    oneTodo ? res.send(oneTodo) : res.status(404).send({ "error": "request not found" });
})

// app.get('/todo/:id', async function (req, res) {
//     const { id } = req.params;
//     const oneTodo = await client.db("todo").collection("todo").findOne({ id: "101" });
//     console.log(oneTodo);
//     oneTodo ? res.send(oneTodo) : res.status(404).send({ "error": "request not found" });
// })



app.listen(PORT, () => console.log(`Started server at ${PORT} 😎`));
