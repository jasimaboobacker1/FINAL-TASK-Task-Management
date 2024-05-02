import { Routes } from '@angular/router';
import { SignupComponent } from './Components/UserConponents/signup/signup.component';
import { authGuard } from './core/Guards/auth.guard';
import { adminauthGuard } from './core/Guards/adminauth.guard';
import { UserprofileeditComponent } from './Components/UserConponents/userprofile/userprofileedit/userprofileedit.component';
import { EdittaskComponent } from './Components/UserConponents/taskview/edittask/edittask.component';

export const routes: Routes = [
    {
        path:'',
        loadComponent:()=>import('../app/Components/UserConponents/home/home.component').then((c)=>c.HomeComponent)
    },
    {
        path:'signup',
        component:SignupComponent
    },
    {
        path:'login',
        loadComponent:()=>import('./Components/UserConponents/login/login.component').then((c)=>c.LoginComponent)
    },
    {
        path:'profile',
        loadComponent:()=>import('./Components/UserConponents/userprofile/userprofile.component').then((c)=>c.UserprofileComponent),
        canActivate:[authGuard]
    },
    {
        path:'editprofile',
        component:UserprofileeditComponent
        // loadComponent:()=>import('./Components/UserConponents/userprofile/userprofileedit/userprofileedit.component').then((c)=>c.UserprofileeditComponent)
    },
    {
        path:'changepassword',
        loadComponent:()=>import('./Components/UserConponents/passchange/passchange.component').then((c)=>c.PasschangeComponent)
        // canDeactivate:[(Component:CreattaskComponent) => Component.canExit()]

    },
    {
        path:'dashboard',
        loadComponent:()=>import('./Components/UserConponents/dashboard/dashboard.component').then((c)=>c.DashboardComponent),
        canActivate:[authGuard]
    },
    {
        path:'edittask/:id',
        loadComponent:()=>import('./Components/UserConponents/taskview/edittask/edittask.component').then((c)=>c.EdittaskComponent),

       
    },
    {
        path:'viewtask/:id',
        loadComponent:()=>import('./Components/UserConponents/taskview/taskview.component').then((c)=>c.TaskviewComponent)
    },
    {
        path:'createtask',
        loadComponent:()=>import('./Components/UserConponents/creattask/creattask.component').then((c)=>c.CreattaskComponent)
        // canDeactivate:[(Component:CreattaskComponent) => Component.canExit()]
    },
    {
        path:'admindashboard',
        loadComponent:()=>import('./Components/AdminComponents/admindashboard/admindashboard.component').then((c)=>c.AdmindashboardComponent),
        canActivate:[adminauthGuard]
    },
    {
        path:'adminusermanage',
        loadComponent:()=>import('./Components/AdminComponents/usermanage/usermanage.component').then((c)=>c.UsermanageComponent),
        canActivate:[adminauthGuard]

    }
];
