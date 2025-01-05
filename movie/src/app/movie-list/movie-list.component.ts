import { Component, Input } from '@angular/core';
import { Movie } from '../services/interfaces/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: false,

  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.fetchMovies().subscribe((data: Movie[]) => {
      this.movies = data;
    });

  }
}
