const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const courtSchema=new Schema({
    //Court Name,Court Location
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Court',courtSchema);
