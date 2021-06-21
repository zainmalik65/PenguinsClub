const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const matchSchema=new Schema({
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
    dateOfMatch:{
        type:Date
    },
    startTime:{
        type:String
    },
    endTime:{
        type:String
    },
    status:{
        type:Boolean
    }
});

module.exports=mongoose.model('Match',matchSchema);