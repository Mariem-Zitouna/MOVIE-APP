import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {inject} from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/movie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  imports: [FontAwesomeModule],
  selector: 'app-movie-detail',
  styleUrl: './movie-detail.css',
  templateUrl: './movie-detail.html',
})
export class MovieDetail implements OnInit {

  private router = inject(Router);
  private route=inject(ActivatedRoute);
  public movieService = inject(MovieService);
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.movieService.getMovieById(id);
      })
    ).subscribe(movie=>this.movieService.selectedMovie.set(movie));
  
  }

  backToMovieList() {
    this.router.navigate(['/']);
  }

  addToWish(movie: Movie){
    this.movieService.addToWishlist(movie);

  }

  goTo(step: number) {
    const list = this.movieService.movieList();
    const index = list.findIndex(m => m.id === this.movieService.selectedMovie()?.id);
    const movie = list[index + step];
    if (movie) {
      this.router.navigate(['/', movie.id]);
    }
  }


}
