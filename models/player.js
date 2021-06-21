const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const playerSchema=new Schema({
    //Every Player has its email and password for login.
    //Ranking(initally set by user then can be updated by coach).
    //Games in which he is registered. 
    //Timings when he will join the club
    //Opponent Ranking
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
    timings:{
        type:String,
    },
    opponentRanking:{
        type:String
    },
    registerGames:[
                                   {
                                        gameID:{type:Schema.Types.ObjectId,ref:'Game'},
                                        ranking:{type:String}
                                    }
                ]
});

module.exports=mongoose.model('Player',playerSchema);