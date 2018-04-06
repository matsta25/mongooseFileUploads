const express = require('express');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const app = express();

//middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine','ejs');

//mongo URI
const mongoURI = 'mongodb://mateusz:mateusz@ds137019.mlab.com:37019/mongouploads';

//create mongo connection
const conn = mongoose.createConnection(mongoURI);

//init gfs
let gfs;

conn.once('open', () => {
    //init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})


app.get('/', (req, res) => {
    res.render('index');
});

const port = 5000;

app.listen(port, () => {
    console.log("Server started on port 5000");
})
