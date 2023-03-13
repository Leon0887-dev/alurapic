import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../core/auth/login.guard';
import { HomeComponent } from './home.component';
import { SigninComponent } from './signin/signin.component';
import { SingupComponent } from './singup/singup/singup.component';






const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [LoginGuard],
        children: [
            {
                path: '',
                component: SigninComponent,
            },
            {
                path: 'singup',
                component: SingupComponent
            },
        ]
    },
     
];




@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [ RouterModule ]
})
export class HomeRoutingModule {

}