module.exports=(req,res,next) =>{
     if(!req.session.islogin){
         /*console.log(req.session);
         console.log("Wrong login Details");
         res.end();*/
     }
     next();
}