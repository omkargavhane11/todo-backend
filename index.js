// const express = require('express')
import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
import cors from "cors";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { usersRouter } from './routes/users.js';
import { todoRouter } from './routes/todo.js';


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

export const client = await createConnection();


app.use(express.json());    // converts data to json

// third party package - middleware
app.use(cors());   //anybody can access this data from API

app.get('/', function (req, res) {
    res.send('To-do app data is available, access the data and create the world class web apps. Happy Coding 😊')
})

app.use('/todo', todoRouter);
app.use('/users', usersRouter);




app.listen(PORT, () => console.log(`Started server at ${PORT} 😎`));



// async function genPassword(password) {
//     const NO_OF_ROUNDS = 10;
//     const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     return { hashedPassword };
// }

// console.log(await genPassword("welcome"));