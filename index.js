const  fs = require("node:fs");
const express = require('express');
const app = express()

// logging function to show request method, url and date-time
function logger(req){
    console.log(`${req.method}  ${req.url}  ${new Date()}`);
}

//hello
const HomePage = fs.readFileSync("./index.html", "utf-8"); //Home page as a variable string

// routing using express
app.get("/", (req, res) => {
    logger(req);
    res.send(HomePage);
});
app.get("/about", (req, res) => {
    logger(req);
    res.send("about page");
});

// the port to run the project
app.listen('3001', () => {
    console.log("server is listening on port 3000");
});
