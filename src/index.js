const express = require("express")
const users = require("./usersController")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Mozart:Eugen15325@cluster0.76xxdno.mongodb.net/')
	.then(() => console.log('Connected!'));

// для виловлювання всіх помилок бека.
process.on("unhandledRejection", (reason, promise) => {
	console.warn("reason", reason);
	console.warn("promise", promise);
});

const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/users', users)

app.use((req, res) => {
	res.send(404);
})

app.listen(4000)
