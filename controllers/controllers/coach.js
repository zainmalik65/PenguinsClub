const coachModel=require('../models/coach');
const gameModel=require('../models/game');

exports.showCoach=((req,res,next) =>{
   coachModel.findById(JSON.parse(req.query.id)).then((result) =>{
        res.send(result);
   }).catch((err)=>{
         res.send(err);
   })

})

exports.getCoachGames=(req,res,next) =>{
   gameModel.find({coachID:JSON.parse(req.query.id)})
   .then((result) =>
     {
       console.log(result);
       res.send(result);
     })
    .catch((err) =>
    {
       console.log(err);
       res.send(err);
    })
}


