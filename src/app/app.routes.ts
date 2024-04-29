import { Routes } from '@angular/router';
import { SignupComponent } from './Components/signup/signup.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CreattaskComponent } from './Components/creattask/creattask.component';
import { authGuard } from './Guards/auth.guard';
import { UserprofileComponent } from './Components/userprofile/userprofile.component';
import { TaskviewComponent } from './Components/taskview/taskview.component';
import { UserprofileeditComponent } from './Components/userprofile/userprofileedit/userprofileedit.component';
import { PasschangeComponent } from './Components/passchange/passchange.component';
import { EdittaskComponent } from './Components/taskview/edittask/edittask.component';

export const routes: Routes = [
    {
        path:'',
        loadComponent:()=>import('./Components/home/home.component').then((c)=>c.HomeComponent)
    },
    {
        path:'signup',
        component:SignupComponent
    },
    {
        path:'login',
        loadComponent:()=>import('./Components/login/login.component').then((c)=>c.LoginComponent)
    },
    {
        path:'profile',
        component:UserprofileComponent,
        canActivate:[authGuard]
    },
    {
        path:'editprofile',
        component:UserprofileeditComponent,
    },
    {
        path:'changepassword',
        component:PasschangeComponent,
        // canDeactivate:[(Component:CreattaskComponent) => Component.canExit()]

    },
    {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[authGuard]
    },
    {
        path:'edittask/:id',
        component:EdittaskComponent
    },
    {
        path:'viewtask/:id',
        component:TaskviewComponent
    },
    {
        path:'createtask',
        component:CreattaskComponent,
        // canDeactivate:[(Component:CreattaskComponent) => Component.canExit()]
    }
];
