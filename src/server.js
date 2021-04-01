const express = require("express");
const routes = require('./router')

const server = express()

server.set("view engine", "ejs")

//allow us to use req.body
server.use(express.urlencoded({ extended: true }))

server.use(express.static("public"))
server.use(routes)


server.listen(3333, () => console.log("Server is running"))
