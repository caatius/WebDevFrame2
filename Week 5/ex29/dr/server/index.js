// npm run devStart
// Define and create express app.
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

// Use of these libraries are used to parse incoming JSON.
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = 3002

const names = [
    {name: 'Henkka'},
    {name: 'Grabber'},
    {name: 'Valtteri'}
]

// Define routes which are handled by the server.
app.get("/", (req, res) => {
    // Return 200 status (ok) and JSON.
    res.status(200).json(names)
})

app.post("/new", (req, res) => {
    names.push(req.body)
    res.status(200).json(req.body)
})

app.delete("/delete/:name", (req,res) => {
    names.splice(names.findIndex(e => e.name===req.params.name),1)
    console.log(names) // This is just to show that value is removed
    res.status(200).json(req.params.name)
})

// Start server and print out message to the console.
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})