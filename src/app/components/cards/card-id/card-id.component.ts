import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/interface/card';
import { AuthService } from 'src/app/services/auth.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-card-id',
  templateUrl: './card-id.component.html',
  styleUrls: ['./card-id.component.scss'],
})
export class CardIdComponent implements OnInit {
  @Input() card: Card = null;
  @Input() userId: any = '';
  isTheSameUser: boolean = false;
  isLogged: boolean = false;
  isFavorites: boolean = false;
  constructor(
    private authService: AuthService,
    private favoritesServices: FavoritesService
  ) {}
  fn() {
    if (this.card?.user_id === this.userId) {
      this.isTheSameUser = true;
    }
  }

  addFavorites() {
    this.favoritesServices
      .newFavorites(this.card._id)
      .subscribe((data) =>
        data?.massage === 'the card add to favorites successfully'
          ? (this.isFavorites = true)
          : (this.isFavorites = false)
      );
  }
  deleteFavorites() {
    this.favoritesServices
      .deleteFavorites(this.card._id)
      .subscribe((data) =>
        data?.massage === 'the favorite card is deleted successfully'
          ? (this.isFavorites = false)
          : (this.isFavorites = true)
      );
  }

  ngOnInit(): void {
    this.fn();
    this.authService.getCurrentUser$.subscribe(
      (data) => (this.isLogged = data?._id ? true : false)
    );
    this.favoritesServices
      .getOneFavorites(this.card._id)
      .subscribe((data) =>
        data?.massage === true
          ? (this.isFavorites = true)
          : (this.isFavorites = false)
      );
  }
}

//

//
