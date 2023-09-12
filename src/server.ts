import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

/* create server */
const server = express();

/* Setup cors */
import cors from 'cors';
server.use(cors())

/* Setup body-parser */
import bodyParser from 'body-parser';
server.use(bodyParser.json());

/* Setup api config */
import apiConfig from './route';
import guard from './middlewares/guard';
server.use('/api', guard.ipAuthen, apiConfig);

/* Setup authencation google */
import axios from 'axios';
server.use("/authen-google", async (req, res) => {
    try {
        let result = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FB_API_KEY}`, {
            idToken: req.body.token
        })
        console.log("result", result.data)
        res.json(result.data)
    } catch (err) {
        console.log("err", err)
    }
})

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on link: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);
})