const gameModel=require('../models/game');

exports.showGames=((req,res,next) =>{
   gameModel.find().then((result) =>{
        res.send(result);
   }).catch((err)=>{
         res.send(err);
   })

})


