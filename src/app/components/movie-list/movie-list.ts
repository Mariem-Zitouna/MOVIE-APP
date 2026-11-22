import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/movie';
import { Router } from '@angular/router';

@Component({
  imports: [FontAwesomeModule, DecimalPipe],
  selector: 'app-movie-list',
  styleUrl: './movie-list.css',
  templateUrl: './movie-list.html',
})
export class MovieList implements OnInit, OnDestroy {

  router = inject(Router);
  movieService = inject(MovieService);
  faStar = faStar;
  faCircleInfo = faCircleInfo;

  current = signal(0);
  timer: any;

  topMovies = computed(() =>
    [...this.movieService.movieList()]
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, 3)
  );

  ngOnInit(): void {
    this.movieService.getMovieList().subscribe(
      response => {
        this.movieService.movieList.set(response);
      }
    );
    this.timer = setInterval(() => this.nextSlide(), 6000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  nextSlide() {
    const count = this.topMovies().length;
    if (count) {
      this.current.update(i => (i + 1) % count);
    }
  }

  goToSlide(index: number) {
    this.current.set(index);
    clearInterval(this.timer);
    this.timer = setInterval(() => this.nextSlide(), 6000);
  }

  navigateTo(movie: Movie) {
    this.router.navigate(['/', movie.id]);
  }

  sortByDate() {
    this.movieService.movieList.update(list =>
      [...list].sort((a, b) => b.release_date.localeCompare(a.release_date))
    );
  }

  sortByVote() {
    this.movieService.movieList.update(list =>
      [...list].sort((a, b) => b.vote_average - a.vote_average)
    );
  }

}
