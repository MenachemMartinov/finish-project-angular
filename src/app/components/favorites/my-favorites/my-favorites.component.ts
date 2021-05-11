import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/interface/card';
import { CardService } from 'src/app/services/card.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.scss'],
})
export class MyFavoritesComponent implements OnInit {
  cards: Card[] = [];

  constructor(
    private favoritesServices: FavoritesService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.favoritesServices.getFavorites().subscribe((data) => {
      console.log(data);

      for (const item of data) {
        this.cardService
          .getCard(item)
          .subscribe((cardData) => this.cards.push(cardData));
      }
    });
  }
}
