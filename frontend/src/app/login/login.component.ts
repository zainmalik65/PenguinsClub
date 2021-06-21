import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IsAuthService}  from '../../services/is-auth.service';
import {CoachService}  from '../../services/coach.service';
import {Router} from "@angular/router"
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
   

  constructor(private http:HttpClient,private CoachService:CoachService ,private servicelogin:IsAuthService,private router: Router) {
   }

   onSubmitHandler(form:NgForm){
    const userAttempt:{email:String,password:String,Account:Number}={
          email:form.value.email,
          password:form.value.password,
          Account:form.value.Account
      }
       this.http.post("http://localhost:3001/login",userAttempt)
        .subscribe((response:{}) =>{
            if(response){
              if(userAttempt.Account==1){
                this.router.navigate(['/playerdashboard']);
                this.servicelogin.user=response;
                this.servicelogin.check=true;
              }else if(userAttempt.Account==2){
                this.router.navigate(['/coachdashboard']);
                this.CoachService.user=response;
                this.CoachService.check=true;
              }
             
            }else{
               alert("Wrong Details");
            }
        
        })
   }

}
