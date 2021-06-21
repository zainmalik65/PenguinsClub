const match=require('../models/match.js');

exports.registerMatch=(req,res) =>{
    const newSession=new match({
        PlayerID:req.body.id,
        OpponentPlayerId:req.body.opponentId,
        GameID:req.body.gameID,
        startTime:req.body.startTime,
        endTime:req.body.endTime
    })
    newSession.save().then((result)=>{
            res.send(true);
        })
        .catch(() =>{
            res.send(false);
        })
 }

 exports.showMatchesUser=(req,res)=>{
    match.find(
        {  $or:[ {PlayerID:JSON.parse(req.query.id)},{OpponentPlayerId:JSON.parse(req.query.id)}]})
       .populate({
           path: 'GameID',
           model: 'Game',
           populate:[ {
               path: 'courtID',
               model: 'Court'           
           },{
               path:'coachID',
               model:'Coach'
           }
       ]
       })
        .populate('OpponentPlayerId','name')
        .then((result) =>{
            res.send(result);
        }).catch(err => console.log(err))
     
 }