import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'src/app/interface/card';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  paramsId: string = null;
  card: Card = null;
  isTheSameUser: boolean = false;
  constructor(
    private activateRoute: ActivatedRoute,
    private cardService: CardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) =>
      this.cardService.getCard(params?.id).subscribe((card) => {
        this.card = card;
        console.log(
          this.card?.bizImageDefault[this.card?.bizImageDefault.length - 1]
        );
        this.authService.getCurrentUser$.subscribe((user) => {
          if (user?._id === card?.user_id) {
            this.isTheSameUser = true;
          }
        });
      })
    );
  }
}
