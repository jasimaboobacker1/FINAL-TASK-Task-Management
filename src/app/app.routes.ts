import { Routes } from '@angular/router';
import { HomeComponent } from './Components/UserConponents/home/home.component';
import { LoginComponent } from './Components/UserConponents/login/login.component';
import { SignupComponent } from './Components/UserConponents/signup/signup.component';
import { UserprofileComponent } from './Components/UserConponents/userprofile/userprofile.component';
import { UserprofileeditComponent } from './Components/UserConponents/userprofile/userprofileedit/userprofileedit.component';
import { PasschangeComponent } from './Components/UserConponents/passchange/passchange.component';
import { DashboardComponent } from './Components/UserConponents/dashboard/dashboard.component';
import { EdittaskComponent } from './Components/UserConponents/taskview/edittask/edittask.component';
import { TaskviewComponent } from './Components/UserConponents/taskview/taskview.component';
import { CreattaskComponent } from './Components/UserConponents/creattask/creattask.component';
import { authGuard } from './core/Guards/auth.guard';
import { AdmindashboardComponent } from './Components/AdminComponents/admindashboard/admindashboard.component';
import { UsermanageComponent } from './Components/AdminComponents/usermanage/usermanage.component';
import { adminauthGuard } from './core/Guards/adminauth.guard';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
        // loadComponent:()=>import('./Components/UserConponents/home').then((c)=>c.HomeComponent)
    },
    {
        path:'signup',
        component:SignupComponent
    },
    {
        path:'login',
        component:LoginComponent
        // loadComponent:()=>import('./Components/UserConponents/login').then((c)=>c.LoginComponent)
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
    },
    {
        path:'admindashboard',
        component:AdmindashboardComponent,
        canActivate:[adminauthGuard]
    },
    {
        path:'adminusermanage',
        component:UsermanageComponent,
        canActivate:[adminauthGuard]

    },
];
