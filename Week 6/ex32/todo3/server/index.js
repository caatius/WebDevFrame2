const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const config = require('./config');
const { request } = require('http');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

const port = 3001

app.get("/",async function (req, res) {
    try {
        const connection = await mysql.createConnection(config.db)
        const [result,] = await connection.execute('select * from task')

        if (!result) result=[] //If there is no data, return empty array.
        //Result is an array and the first one contains actual values
        // second one contains metadata
        res.status(200).json(result)
    } catch(err) {
        // Return status code 500 and error message to the client.
        res.status(500).json({error: err.message})
    }
})

app.listen(port)