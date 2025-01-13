import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: ':id', component: MovieDetailsComponent },
];

@NgModule({
  declarations: [MovieDetailsComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class MovieListModule { }
