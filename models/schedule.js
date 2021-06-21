const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const scheduleSchema=new Schema({

    //Practise Date,Start Time,End Time,Game No,Court No
    practiseDate:{
        type:Date,
        required:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
    gameID:{
        type:Schema.Types.ObjectId,
        ref:'Game',
        required:true
    },
    courtID:{
        type:Schema.Types.ObjectId,
        ref:'Court',
        required:true
    }
});

module.exports=mongoose.model('Schedule',scheduleSchema);
