import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SignupComponent } from './Components/signup/signup.component';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CreattaskComponent } from './Components/creattask/creattask.component';
import { authGuard } from './Guards/auth.guard';
import { UserprofileComponent } from './Components/userprofile/userprofile.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'signup',
        component:SignupComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'profile',
        component:UserprofileComponent,
        canActivate:[authGuard]
    },
    {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[authGuard]
    },
    {
        path:'createtask',
        component:CreattaskComponent,
        canDeactivate:[(Component:CreattaskComponent) => Component.canExit()]
    }
];
