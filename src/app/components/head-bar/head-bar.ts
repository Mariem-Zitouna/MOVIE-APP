import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShieldHeart, faHouse } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-head-bar',
  styleUrl: './head-bar.css',
  templateUrl: './head-bar.html',
})
export class HeadBar {
  faShieldHeart = faShieldHeart;
  faHouse = faHouse;
  router = inject(Router);

  navigateToWishList() :void {
    this.router.navigate(['wishlist']);

  }

  navigateToMovieList() :void {
    this.router.navigate(['/']);

  }
}