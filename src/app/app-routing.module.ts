import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule , Routes} from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

import {AuthGuard} from './guards/auth/auth.guard';
const routes: Routes=[
  { path: '' , redirectTo: '/login', pathMatch: 'full'},
  {path: 'login' , component: LoginComponent},
  {path: 'signup' , component: SignupComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'profile/:userId/edit', component: EditProfileComponent, canActivate: [AuthGuard]},
  {path: 'chat' , canActivate: [AuthGuard],
  children: [
    {path: '', component: ChatComponent},
    {path: ':chatroomId', component: ChatComponent}
  ]},

  {path: '**' , redirectTo: '/login'},

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
