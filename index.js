const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const {handleLogin} =require ('./endpoints/signin.js');
const {handleRegister} =require ('./endpoints/register.js');
const {uploadResume} =require ('./endpoints/uploadResume.js');
const { uploadProject} = require('./endpoints/uploadProject');
const { getProjects} = require('./endpoints/getProjects');
const {deleteProject} = require ('./endpoints/deleteProject');
const {getUsersDetails} = require('./endpoints/getUsersDetails');
const {getUsersProjects} = require('./endpoints/getUsersProjects');
const uniqid = require('uniqid');
const app = express();
const multer  = require('multer')
const path = require('path')
// const 
const DIR = './uploads';


let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//database configuration
var data = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'gaurang@1999',
      database : 'explorject'
    }
});
// port Defination
let PORT = 3000
  
//applying the middlewares
app.use(bodyparser.json());
app.use(cors());

// api endpoints
// users enpointe
app.post('/user/login',(req,res)=>{handleLogin(req,res,bcrypt,data,uniqid,jwt)});
app.post('/user/register',(req,res)=>{handleRegister(req,res,bcrypt,data,uniqid)});
app.get('/user/usersDetails',(req,res)=> getUsersDetails(req,res,bcrypt,data,uniqid,jwt))

// project endpoints
// app.post('/user/uploadresume',upload.single('u_resume'),(req,res) => uploadResume(req,res,bcrypt,data,uniqid,jwt))
app.post('/projects/upload',(req,res)=> uploadProject(req,res,bcrypt,data,uniqid,jwt))
app.post('/projects/delete',(req,res)=> deleteProject(req,res,bcrypt,data,uniqid,jwt))
app.get('/projects/get_all_projects',(req,res)=> getProjects(req,res,bcrypt,data,uniqid,jwt))
app.get('/projects/get_users_projects',(req,res)=> getUsersProjects(req,res,bcrypt,data,uniqid,jwt))

// listing to the client on following
app.listen(PORT,()=> console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Node server is working on port := "+PORT))
