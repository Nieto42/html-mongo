const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(express.urlencoded());

    //- Connect you mongodb Compass
mongoose.connect( 
    "mongodb://localhost:27017/node-api-mvp",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if(!err) console.log("Mongodb connected");
        else console.log("Connection error :" + err);
    });

    //-Create a data schema
    const notesSchema = {
        title: String,
        content: String
    }
    
    const Note = mongoose.model("node-api-mvp", notesSchema,"posts");

    //- Communicate with the file index.html
app.get('/', function(req,res) {
    res.sendFile('/Users/pompeu/project/html-mongo/index.html');
})

    //- Send data to Mongo 
app.post("/", function(req,res) {
    let newNote = new Note ({
        title: req.body.title,
        content: req.body.content
    });
    newNote.save();
    res.redirect('/');

});

app.listen(3000, function() {
        console.log("server is running on 3000");
});