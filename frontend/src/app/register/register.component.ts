import { Component,OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { NgForm, Form } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  gameSelected:any[]=[];
  gamelist:[{}];

  constructor(private http:HttpClient,private router: Router) { }

  ngOnInit(){
    this.http.get('http://localhost:3001/register')
    .subscribe((response:any)=>{
            this.gamelist=response;
    })
  }

  addNewGame(id,level){
    const newGame:{gameID:String,ranking:String}={
      gameID:id,
      ranking:level.viewModel
    };
    this.gameSelected.push(newGame);
    alert("Game Added");
  }

  onSubmitHandler(form:NgForm){
    const regData={
      name:form.value.name,
      email:form.value.email,
      password:form.value.password,
      timings:form.value.timings,
      registerGame:this.gameSelected
    }
    this.http.post("http://localhost:3001/register",regData).subscribe((result) =>{
         if(result){
           alert("Registered for Club");
           this.router.navigate(['/login']);
         }else{
           alert("Registrations Failed");
         }
    })  
  }

}
