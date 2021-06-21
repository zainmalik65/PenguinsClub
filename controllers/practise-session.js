const practiseSession=require('../models/practise-session');

exports.registerSession=(req,res) =>{
    const newSession=new practiseSession({
        PlayerID:req.body.id,
        OpponentPlayerId:req.body.opponentId,
        GameID:req.body.gameID,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        ranking:null,
        secondPlayerRanking:null
    })
    newSession.save()
        .then(() =>{
            res.send(true);
        })
        .catch((err) =>{
            console.log(err);
            res.send(false);
        })
 }

 exports.showSessionUser=(req,res)=>{
      practiseSession.find(
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