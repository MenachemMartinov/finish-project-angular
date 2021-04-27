import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'src/app/interface/card';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-category-id',
  templateUrl: './category-id.component.html',
  styleUrls: ['./category-id.component.scss'],
})
export class CategoryIdComponent implements OnInit {
  cards: Card[] = null;
  paramsId: string = '';
  user: User = null;
  constructor(
    private activateRoute: ActivatedRoute,
    private cardService: CardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.paramsId = params?.id;
      this.authService.getCurrentUser$.subscribe((user) => (this.user = user));

      this.cardService
        .getCards()
        .subscribe(
          (cards) =>
            (this.cards = cards.filter(
              (card) => card.bizCategory === params?.id
            ))
        );
    });
  }
}
