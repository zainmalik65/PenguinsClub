const mongoose=require('mongoose');//MOONGO DB FRAMEWORK
const express=require('express');//NODE FRAMEWORK
const app=express();//CREATING EXPRESS APPLICATION
const bodyParser=require('body-parser');//CONVERT INCOMING DATA INTO JSON AND STORE IT IN REQ.BODY
const cors = require('cors');//CROSS-ORIGIN
//const csrf=require('csurf');//CSRF TOKENS
const session=require('express-session');//SESSIONS


const authRoutes=require('./routes/auth');//Routes Related to Authorization
const playerRoutes=require('./routes/player');//Routes related to Player
const gameRoutes=require('./routes/game');//Routes related to Game
const practiceSession=require('./routes/practiseSession');
const matchSession=require('./routes/match');
const coachRoutes=require('./routes/coach');
const courtRoutes=require('./routes/court');
const attendanceRoutes=require('./routes/attendance');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));//ENABLING BODY PARSER
app.use(session({secret:'cutting edge',resave:false,saveUninitialized:false}))//ENABLING SESSIONS


//const csrfProtection=csrf();//STARTING CSRF PROTECTION
//app.use(csrfProtection);//ENABLING TOKENS


//Using Routes

app.use(authRoutes);
app.use(gameRoutes);
app.use(playerRoutes);
app.use(practiceSession);
app.use(matchSession);
app.use(coachRoutes);
app.use(courtRoutes);
app.use(attendanceRoutes);

mongoose.connect('mongodb+srv://admin:admin@cluster0-jomgs.mongodb.net/test?retryWrites=true&w=majority') //Connecting to MONGODB ATLAS
        .then(()=>{
            app.listen(3001);
            console.log("Connected to Database");
        })
        .catch((err) =>{
            console.log(err);
        })   
