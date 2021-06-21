import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IsAuthService}  from '../../services/is-auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-player-dashboard',
  templateUrl: './player-dashboard.component.html',
  styleUrls: ['./player-dashboard.component.css'],
})
export class PlayerDashboardComponent implements OnInit {

  //user:any={"_id":"5ed2dda5d253460e082fb130","name":"test","email":"test","password":"test","timings":"12","opponentRanking":null,"registerGames":[{"_id":"5ed2dda5d253460e082fb131","gameID":{"_id":"5ecc1a0cc363403728fc4d08","name":"Squash","courtID":"5ecfbf40706f3857c8930f57","coachID":"5ecc18c796446526c865d2bf","__v":0},"ranking":"Advance"},{"_id":"5ed2dda5d253460e082fb132","gameID":{"_id":"5ed29db21faf891e25b73ff6","name":"Badminton","courtID":"5ed29c051faf891e25b73ff2","coachID":"5ed299e01faf891e25b73fe9","__v":0},"ranking":"Beginner"}],"__v":0};
  //user:any={"_id":"5ed4414506602c47dc7c4bc3","name":"test3","email":"test3","password":"test3","timings":"16:45","opponentRanking":null,"registerGames":[{"_id":"5ed4414506602c47dc7c4bc4","gameID":{"_id":"5ed29fa01faf891e25b73ff9","name":"FootBall","courtID":"5ed29d7c1faf891e25b73ff5","coachID":"5ed29aad1faf891e25b73fec","__v":0},"ranking":"Advance"}],"__v":0};
  user:any;
  userGameNames:any[]=[];//Extracted from user
  opponentData:any[]=[];//Opponnent Games
  showScedule:[{}];

  shouldShowAttendance:Boolean;


  constructor(private http:HttpClient,private servicelogin:IsAuthService,private router: Router) {
              this.user=this.servicelogin.user;
  }

  ngOnInit(): void {
          const obj={
            id:this.user._id,
          };
          const httpOptions3={
            params:{ id: JSON.stringify(obj.id )}
          }
          this.http.get<any>('http://localhost:3001/attendance',httpOptions3)
          .subscribe(result =>{
              this.shouldShowAttendance=result;
              console.log(this.shouldShowAttendance);
          })
  
      let userGamesIdsOnly:String[]=[];
      this.user.registerGames.forEach(element => {
         this.userGameNames.push({
           id:element.gameID._id,
           name:element.gameID.name
         });
         userGamesIdsOnly.push(element.gameID._id);
      });
      const httpOptions={
        params:{'ids': JSON.stringify(userGamesIdsOnly ) }
      }
      this.http.get<any>('http://localhost:3001/playerdashboard',httpOptions)
      .subscribe((result:any) =>{
          result.forEach((element) =>{
               if(element._id!=this.user._id){
                 this.opponentData.push(element);
               }
          })
      }) 
      const httpOptions2={
        params:{'id': JSON.stringify(this.user._id) }
      }
      this.http.get("http://localhost:3001/practisesession",httpOptions2).subscribe((result:[{}])=>{
              this.showScedule=result;
      })
    }

  addSession(form:NgForm){
   if(this.checkGameOpponent(form.value.id,form.value.opponent) ){
        const data={
          id:this.user._id,
          opponentId:form.value.opponent,
          gameID:form.value.game,
          startTime:form.value.startTime,
          endTime:form.value.endTime
        }
        console.log(data);
        this.http.post("http://localhost:3001/practisesession",data).subscribe((result:boolean)=>{
          if(result){
            //alert("Practise Session Added Sucesfully");
            //window.location.href="http://localhost:4200/playerdashboard";
            console.log("Practise Session Added Sucesfully");
          }else{
            // alert("Failed Adding Session");
            console.log("Fail Adding Session");
          }
        })
   }else{
     alert("Opponent not Registered for this game");
   }
   
  }

  setOpponentHandler(form:NgForm){
   const data={
      id:this.user._id,
      opponentranking:form.value.ranking
  };
  this.http.post('http://localhost:3001/playerdashboard/setopponentranking',data).subscribe((response:boolean) =>{
       if(response){
         this.user.opponentRanking=form.value.ranking;
         alert("Update Sucessfully");
       }else{
         alert("Update Failed");
       }
  })
}
 checkGameOpponent(gameID,opponentID){
     const opponentFound=this.opponentData.map((element)=>{
       if(element._id==opponentID){
         return element.registerGames;
       }
     })
     opponentFound.forEach((element) =>{
           if(element.gameID==gameID){
             return true;
           }else{
             return false;
           }
     })
     return true;
 }

 checkExist(){
   if(this.user.opponentRanking!=null)
        if(this.user.opponentRanking.length>0){
     return true;
   }
   else{
     return false;
   }
 }
  
 addAttendance(){
    const obj={
      id:this.user._id,
    };
    if(this.shouldShowAttendance){
      this.http.post("http://localhost:3001/attendance",obj).subscribe((result:boolean)=>{
        if(result){
          alert("Attendance Marked");
          this.shouldShowAttendance=false;
        }else{
          alert("Attendance Marked Failed ");
        }
     })
      }
 }

  logoutHandler(){
        this.servicelogin.user=null;
        this.servicelogin.check=false;
        this.router.navigate(['/logout']);
  }

}
