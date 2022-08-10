require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const apiRoutes = require('./src/routes');

mongoose.connect(process.env.DATABASE, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    

});

mongoose.Promise = global.Promise;

mongoose.connection.on('error', (error)=> {
    console.log("Erro", error.message)
})

const server = express();

server.use(cors()); // configurar o cor ex: {origin: 'http://localhost:3000'}
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(fileUpload());
server.use(express.static(__dirname+'/public'));

server.use('/', apiRoutes);


server.listen(process.env.PORT, ()=> {
    console.log("Server is running on adress", process.env.BASE);
});