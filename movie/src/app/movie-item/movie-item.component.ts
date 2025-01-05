import { Component, Input } from '@angular/core';
import { Movie } from '../services/interfaces/movie';

@Component({
  selector: 'app-movie-item',
  standalone: false,
  
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css'
})
export class MovieItemComponent {
  
  @Input() movie!: Movie; 
 
}

