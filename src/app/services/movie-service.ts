import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, map, shareReplay } from 'rxjs';
import { Movie } from '../interfaces/movie';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly http = inject(HttpClient);
  private readonly url = environment.url_api;
  private readonly key = environment.apikey;

  public movieList = signal<Movie[]>([]);
  public selectedMovie = signal<Movie | null>(null);
  public wishList = signal<Movie[]>([]);

  getMovieList(): Observable<Movie[]> {
    return this.http.get<MovieResponse>(
      `${this.url}now_playing?api_key=${this.key}`
    ).pipe(
      map(response => response.results),
      shareReplay({bufferSize: 1, refCount: false})
    );
  }

  getMovieById(id:number){
    return this.http.get<Movie>(
      `${this.url}${id}?api_key=${this.key}`
    ).pipe (
      map(response => response)
    )
  }

  addToWishlist(movie: Movie) {
    if (!localStorage.getItem('wishlist')?.includes(JSON.stringify(movie))) {
      this.wishList.update(wishList => [...wishList, movie]);
      localStorage.setItem('wishlist', JSON.stringify(this.wishList()));
    }
  }

}