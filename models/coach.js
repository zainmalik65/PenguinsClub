const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const coachSchema=new Schema({
    //Coach has its email and password for login.
    //Games in which he is appointed as coach 
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gameID:{
        type:Schema.Types.ObjectId,
        ref:'Game'
    }
});

module.exports=mongoose.model('Coach',coachSchema);