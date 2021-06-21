const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const practiseSessionSchema=new Schema({
    PlayerID:{
        type:Schema.Types.ObjectId,
        ref:'Player'
    },
    OpponentPlayerId:{
        type:Schema.Types.ObjectId,
        ref:'Player'
    },
    GameID:{
        type:Schema.Types.ObjectId,
        ref:'Game'
    },
    dateOfSession:{
        type:Date
    },
    startTime:{
        type:String
    },
    endTime:{
        type:String
    },
    ranking:{
        type:String
    },
    secondPlayerRanking:{
        type:String
    }
});

module.exports=mongoose.model('PractiseSession',practiseSessionSchema);