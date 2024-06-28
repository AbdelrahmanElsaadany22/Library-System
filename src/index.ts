import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();
import myConnection from './db/connection';
import bootstrab from './bootstrab';
const app=express()
app.use(express.json())
app.use(bodyParser.json());
myConnection()
bootstrab(app)
const port = process.env.PORT 
console.log(port)
app.listen(port ,()=>{console.log(`app listen on port ${port}`)})



