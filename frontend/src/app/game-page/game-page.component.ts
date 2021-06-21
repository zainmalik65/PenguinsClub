import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IsAuthService}  from '../../services/is-auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  //user:any={"_id":"5ed2dda5d253460e082fb130","name":"test","email":"test","password":"test","timings":"12","opponentRanking":null,"registerGames":[{"_id":"5ed2dda5d253460e082fb131","gameID":{"_id":"5ecc1a0cc363403728fc4d08","name":"Squash","courtID":"5ecfbf40706f3857c8930f57","coachID":"5ecc18c796446526c865d2bf","__v":0},"ranking":"Advance"},{"_id":"5ed2dda5d253460e082fb132","gameID":{"_id":"5ed29db21faf891e25b73ff6","name":"Badminton","courtID":"5ed29c051faf891e25b73ff2","coachID":"5ed299e01faf891e25b73fe9","__v":0},"ranking":"Beginner"}],"__v":0};
  user:any;
  userGameNames:any[]=[];//Extracted from user
  opponentData:any[]=[];//Opponnent Games
  showMatch:any[]=[];

  constructor(private http:HttpClient,private servicelogin:IsAuthService,private router: Router) {
    this.user=this.servicelogin.user;
  }

 ngOnInit(): void {
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
     this.http.get("http://localhost:3001/registermatch",httpOptions2).subscribe((result:[{}])=>{
             this.showMatch=result;
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
      this.http.post("http://localhost:3001/registermatch",data).subscribe((result:boolean)=>{
        if(result){
          /*alert("Game Added Sucesfully");
          window.location.href="http://localhost:4200/play-game";*/
          console.log("Game Added Sucesfully");
        }else{
          /*alert("Match Registration Fails.Opponent Doesnot have registered this game");*/
          console.log("Match Registration Fails.Opponent Doesnot have registered this game");
        }
      })
     }
    else{
      alert("Match Registration Fails");
    }
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

   logoutHandler(){
    this.servicelogin.user=null;
    this.servicelogin.check=false;
    this.router.navigate(['/logout']);
}

}
