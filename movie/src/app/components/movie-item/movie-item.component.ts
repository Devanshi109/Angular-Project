import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../core/interfaces/movie';

@Component({
  selector: 'app-movie-item',
  standalone: false,
  
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css'
})
export class MovieItemComponent {
  
  @Input() movie!: Movie;
  
  constructor(private router: Router) {}

  goToDetails(movieId: number): void {
    this.router.navigate([`/movies/${movieId}`]);
  }
 
}

