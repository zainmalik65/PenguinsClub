const attendanceModel=require('../models/attendance');

exports.addAttendance=(req,res) =>{ 
  const attendance=new attendanceModel({
         PlayerID:req.body.id,
  });
 
   attendance.save().then(() =>{
         res.send(true);
      }).catch(err =>{
         console.log(err);
         res.send(false);
      })
}

exports.getAttendance=(req,res) =>{
   const playerID=JSON.parse(req.query.id);
   attendanceModel.findOne({PlayerID:playerID}).sort( { 'created_at' : -1 } ).then((result) =>{
      console.log(result);
      if(result==null){
         res.send(true);
      }
      else{
         const d=result.created_at.toISOString();
         const saveYear=d.slice(0,4);
         const saveMonth=d.slice(5,7);
         const saveDay=d.slice(8,10);
  
         console.log("Database latest ",saveYear,saveMonth,saveDay);
  
         var currdate = new Date();
  
         var currYear=currdate.getFullYear().toString();
         var temp=currdate.getMonth()+1;
         var currMonth=temp.toString();
         var currDay=currdate.getDate().toString();
  
         if(currMonth.length==1){
           const temp='0';
           currMonth=temp+currMonth;
         }
         if(currDay.length==1){
           const temp='0';
           currDay=temp+currDay;
         }
         console.log("Current ",currYear,currMonth,currDay);
         if(saveYear<=currYear && saveMonth<=currMonth && saveDay<=currDay){
            res.send(false);
         }
         else if(saveYear<=currYear && saveMonth<=currMonth && saveDay<currDay ){
            res.send(true);
         }else{
            res.send(false);
         }
      }
   }).catch((err) =>{
         console.log(err);
         res.send(err);
   })
}
