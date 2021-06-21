import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  user:{};
  check:boolean;

  constructor() { }

  setUser(obj:{}){
     this.user=obj;
     this.check=true;
  }

}
