const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const gameSchema=new Schema({
    //Every Game has a name and a coach associated to it.
     name:{
         type:String,
         required:true
     },
     coachID:{
         type:Schema.Types.ObjectId,
         ref:'Coach'
     },
     courtID:{
         type:Schema.Types.ObjectId,
         ref:'Court'
     }
});

module.exports=mongoose.model('Game',gameSchema);
