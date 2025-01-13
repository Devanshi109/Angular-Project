import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpPage1Component } from './components/sign-up/sign-up-page-1/sign-up-page-1.component';
import { SignUpPage2Component } from './components/sign-up/sign-up-page-2/sign-up-page-2.component';
import { SignUpPage3Component } from './components/sign-up/sign-up-page-3/sign-up-page-3.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'signup-step1', component: SignUpPage1Component },
  { path: 'signup-step2', component: SignUpPage2Component },
  { path: 'signup-step3', component: SignUpPage3Component },
  { path: 'movies', loadChildren: () => import('./components/movie-list/movie-list.module').then(m => m.MovieListModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
