import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CoachService}  from '../../services/coach.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-coach-dashboard',
  templateUrl: './coach-dashboard.component.html',
  styleUrls: ['./coach-dashboard.component.css']
})
export class CoachDashboardComponent implements OnInit {

 // user:{"_id":"5ed29b4f1faf891e25b73fef","email":"saqib123@gmail.com","name":"saqib","password":"1234saqib","__v":0};
  user:any;
  coachGames:any;
  practiseSession:any;

  constructor(private http:HttpClient,private servicelogin:CoachService,private router: Router) {
      this.user=this.servicelogin.user;
   }

  ngOnInit(): void {
    const id=this.user._id;
    const httpOptions={
      params:{ id: JSON.stringify(id)}
    }
    this.http.get<any>('http://localhost:3001/coachdashboard',httpOptions)
    .subscribe(result =>{
       this.coachGames=result;
       console.log(this.coachGames);
    })
  
  }
  logoutHandler(){
    this.servicelogin.user=null;
    this.servicelogin.check=false;
    this.router.navigate(['/logout']);
}

}
