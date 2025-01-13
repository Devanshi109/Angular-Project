import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { YoutubePlayerComponent } from '../youtube-player/youtube-player.component';
import { MovieService } from '../../core/services/movie.service';

@Component({
  selector: 'app-movie-details',
  standalone: false,

  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {

  movieDetails: any;
  additionalPosters: any[] = [];
  cast: any[] = [];
  genreList: string = ''; 

  trailers: any[] = []; 
  currentTrailerIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
    
      this.movieService.fetchMovieDetails(+movieId).subscribe(details => {
        this.movieDetails = details;

        if (details.genres && details.genres.length > 0) {
          this.genreList = details.genres.map((genre: { name: any; }) => genre.name).join(', ');
        }
      });

      this.movieService.fetchMovieImages(+movieId).subscribe(images => {
        this.additionalPosters = images.posters || [];
      });

      this.movieService.fetchMovieCast(+movieId).subscribe(credits => {
        this.cast = credits.cast || [];
      });
    }
  }

  openTrailerDialog(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {

      this.movieService.fetchMovieTrailers(+movieId).subscribe(trailers => {
        if (trailers.results && trailers.results.length > 0) {
          this.dialog.open(YoutubePlayerComponent, {
            width: '5000px',
            data: { trailers: trailers.results } 
          });
        } else {
          alert('No trailers available for this movie.');
        }
      });
    }
  }


}




// movieDetails: any;

// constructor(
//   private route: ActivatedRoute,
//   private movieService: MovieService
// ) {}

// ngOnInit(): void {
//   const movieId = this.route.snapshot.paramMap.get('id');
//   if (movieId) {
//     this.movieService.fetchMovieDetails(+movieId).subscribe(details => {
//       this.movieDetails = details;
//     });
//   }
// }

