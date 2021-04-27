import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Card } from 'src/app/interface/card';
import { Category } from 'src/app/interface/category';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  categories: Category[] = null;
  cards: Card[] = null;
  token: User = null;
  userSearchCard: string = '';
  userSearchCardResult: Card[] = null;
  constructor(
    private categoryService: CategoriesService,
    private authService: AuthService,
    private cardService: CardService,
    private location: Location,
    private router: Router
  ) {}

  // check if user is logged by token
  ifUserLogged = async () => {
    await this.authService.getCurrentUser$.subscribe(
      (user) => (this.token = user)
    );
  };

  onClickResult() {
    this.userSearchCardResult = null;
    this.userSearchCard = '';
  }

  searchCard(e) {

    if (e?.length > 0) {
      let search = e?.split(' ');
      this.userSearchCardResult = this.cards.filter((card) =>
        search.some((item) =>
          card.bizName.toLowerCase().includes(item.toLowerCase())
        )
      );
    } else {
      this.userSearchCardResult = null;
    }
  }

  ngOnInit(): void {
    this.location.onUrlChange((res) => {

      if (res) {
        this.ifUserLogged();
        this.categoryService
          .getCategories()
          .subscribe((data) => (this.categories = data));
        this.cardService.getCards().subscribe((cards) => (this.cards = cards));
      }
    });
  }
}
