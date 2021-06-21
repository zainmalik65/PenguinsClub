import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes,RouterModule } from '@angular/router';
import {IsAuthService} from '../services/is-auth.service';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PlayerDashboardComponent } from './player-dashboard/player-dashboard.component';
import {AuthGuard} from './auth-guard-service';
import { LogoutComponent } from './logout/logout.component';
import { GamePageComponent } from './game-page/game-page.component';
import { CoachDashboardComponent } from './coach-dashboard/coach-dashboard.component';



const appRoutes:Routes=[
  { path:'login',component:LoginComponent },
  { path:'register',component:RegisterComponent },
  { path:'playerdashboard',canActivate:[AuthGuard],component:PlayerDashboardComponent},
  { path:'play-game',canActivate:[AuthGuard],component:GamePageComponent},
  { path:'coachdashboard',component:CoachDashboardComponent},
  { path:'logout',component:LogoutComponent },
  { path:'',component:HomeComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    PlayerDashboardComponent,
    LogoutComponent,
    GamePageComponent,
    CoachDashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [IsAuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
