const playerModel=require('../models/player');

exports.addNewPlayer=(req,res) =>{ 
  const newPlayer=new playerModel({
         name:req.body.name,
         email:req.body.email,
         password:req.body.password,
         timings:req.body.timings,
         opponentRanking:null
  });
 
  const obj=req.body.registerGame;
  for(var i=0;i<obj.length;i++){
     newPlayer.registerGames.push({
           gameID:req.body.registerGame[i].gameID,
           ranking:req.body.registerGame[i].ranking
     });
  }

   newPlayer.save().then(() =>{
         res.send(true);
      }).catch(err =>{
         console.log(err);
         res.send(false);
      })
}

exports.setOpponentRanking=(req,res) =>{
    playerModel.findByIdAndUpdate({_id:req.body.id},{opponentRanking:req.body.opponentranking},{
       new:true
    }).then((response)=>{
        res.send(true);
    }).catch((err) =>{
      res.send(false);
    })
}

exports.showOpponentGames=(req,res) =>{
   const ids=JSON.parse(req.query.ids);
   playerModel.find( {  "registerGames.gameID":{ $in: ids } }   ).then((response)=>{
       res.send(response);
   }).catch((err) =>{
       console.log(err);
       res.send(err);
   })
}

