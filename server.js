const express = require('express');
const app = express();
const mongoose = require("mongoose");


    //-[EN] use Express instead of Body-Parser //[PF]- Use Express au lieu de BodyParser
app.use(express.urlencoded({extended: true}));
//app.use(express.json()); //-[EN] I don't know what it's for //[PF]- Nao sei para o que serve

    //-[EN] Connect you mongodb Compass
mongoose.connect( 
    "mongodb://localhost:27017/html-mongo",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if(!err) console.log("Mongodb connected");
        else console.log("Connection error :" + err);
    });

    //-[EN] Create a data schema
    const notesSchema = {
        title: String,
        content: String
    }
    
        //-[EN] PostModel   //-[FR] html-mongo is you dataBase, NoteSchema is you data schema, posts is you table where you save the data
    const Note = mongoose.model('html-mongo', notesSchema, 'posts');

    //-[EN] Communicate with the file index.html
app.get('/', function(req,res)  {
    res.sendFile('/Users/pompeu/project/html-mongo/index.html');
});

    //-[EN] Send data to Mongo and recup the input data (name = title, content)
app.post("/", function(req,res)  {
    console.log(req.body)
  
     let newNote = new Note ({
     title: req.  body.title,
      content: req.body.content
    });

    //- Save the data on MongoDb
 newNote.save().then(() => {

    console.log('save with sucess' + newNote)
    
    }).catch((err) => {
        console.log('No save because' + err)
    });


        //-[EN] This make it possible not to crash the website //-[PF] Permet de ne pas faire crash le site 
        res.redirect('/');
});

    //-[EN] index.html reading Port  //-[PF] Port de lecture du index.html
app.listen(3000, function() {
        console.log("server is running on 3000");
});