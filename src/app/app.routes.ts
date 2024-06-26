import { Routes } from '@angular/router';
import { authGuard } from './core/Guards/auth.guard';
import { adminauthGuard } from './core/Guards/adminauth.guard';

export const routes: Routes = [
    {
        path:'',
        loadComponent:()=>import('../app/Components/UserConponents/home/home.component').then((c)=>c.HomeComponent)
    },
    {
        path:'signup',
        loadComponent:()=>import('./Shared-Module/Authentication/signup/signup.component').then((c)=>c.SignupComponent)
    },
    {
        path:'login',
        loadComponent:()=>import('./Shared-Module/Authentication/login/login.component').then((c)=>c.LoginComponent)
    },
    {
        path:'profile',
        loadComponent:()=>import('./Components/UserConponents/userprofile/userprofile.component').then((c)=>c.UserprofileComponent),
        canActivate:[authGuard]
    },
    {
        path:'editprofile',
        loadComponent:()=>import('./Components/UserConponents/userprofile/editprofile/editprofile.component').then((c)=>c.EditprofileComponent),
        canActivate:[authGuard],

    },
    {
        path:'changepassword',
        loadComponent:()=>import('./Components/UserConponents/passchange/passchange.component').then((c)=>c.PasschangeComponent),
        canActivate:[authGuard],

    },
    {
        path:'dashboard',
        loadComponent:()=>import('./Components/UserConponents/dashboard/dashboard.component').then((c)=>c.DashboardComponent),
        canActivate:[authGuard]
    },
    {
        path:'edittask/:id',
        loadComponent:()=>import('./Components/UserConponents/taskview/taskedit/taskedit.component').then((c)=>c.TaskeditComponent),
        canActivate:[authGuard],
    },
    {
        path:'viewtask/:id',
        loadComponent:()=>import('./Components/UserConponents/taskview/taskview.component').then((c)=>c.TaskviewComponent),
        canActivate:[authGuard]
    },
    {
        path:'createtask',
        loadComponent:()=>import('./Components/UserConponents/creattask/creattask.component').then((c)=>c.CreattaskComponent),
        canActivate:[authGuard],
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
