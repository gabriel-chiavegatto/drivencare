import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import routes from "./routes/index.js";

const server = express();
server.use(cors());
server.use(express.json());

server.use(routes)      

const port = process.env.PORT || 5000;
server.listen(port, ()=>{console.log(`Server run in ${port}`)});
