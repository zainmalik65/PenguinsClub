
const playerModel=require('../models/player');
const coachModel=require('../models/coach');

exports.islogin=(req,res) =>{
    const obj={
       email:req.body.email,
       password:req.body.password,
       Account:req.body.Account
    }
    if(obj.Account=="1"){
      playerModel.find({email:obj.email,password:obj.password}).populate('registerGames.gameID').then((user)=>{
         if(!user.length){
            req.session.user=null;
            res.send(false);
         }else if(user){
             req.session.user=user;
             req.session.save(() =>{
                res.send(user[0]);
             })
         }
        })
    }
    else if(obj.Account=="2"){
      console.log("123");
      coachModel.find({email:obj.email,password:obj.password}).then((user)=>{
         console.log(user);
         if(!user.length){
            req.session.user=null;
            res.send(false);
         }else if(user){
             req.session.user=user;
             req.session.save(() =>{
                res.send(user[0]);
             })
         }
        })
    }
    
 }

 exports.logout=((req,res) =>{
       req.session.destroy();
 })