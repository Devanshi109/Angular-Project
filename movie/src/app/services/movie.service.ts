import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from './interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'https://api.themoviedb.org/3/discover/movie';
  private apiKey = '42a33cbd3ae95139204f710a18c86853';  

  constructor(private http: HttpClient) {}

  fetchMovies(): Observable<Movie[]> {
    const url = `${this.apiUrl}?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&page=1`;
  
    return this.http.get<{ results: Movie[] }>(url).pipe(
      map((response) => response.results)
    );
  }

}

 