import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { CoreModule } from '../../core/core.module';

const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: ':id', component: MovieDetailsComponent },
];

@NgModule({
  declarations: [MovieDetailsComponent],
  imports: [RouterModule.forChild(routes), CommonModule, CoreModule],
  exports: [RouterModule]
})
export class MovieListModule { }
