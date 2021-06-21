const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const attendanceSchema=new Schema({
    PlayerID:{
        type:Schema.Types.ObjectId,
        ref:'Player'
    }
},{ timestamps: { createdAt: 'created_at' } });

module.exports=mongoose.model('Attendance',attendanceSchema);