const courtModel=require('../models/court');

exports.showCourt=((req,res,next) =>{
   courtModel.findById(JSON.parse(req.query.id)).then((result) =>{
        res.send(result);
   }).catch((err)=>{
         res.send(err);
   })

})


