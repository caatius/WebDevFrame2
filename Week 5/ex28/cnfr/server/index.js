// npm run devStart
// Define and create express app.
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

// Define constant for the port where server is responding.
const port = 3001

// Define routes which are handled by the server.
app.get("/", (req, res) => {
    // REturn 200 status (ok) and JSON.
    res.status(200).json({message: "Node server is responding"})
})

// Start server and print out message to the console.
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})