import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/interface/card';
import { Category } from 'src/app/interface/category';
import { CardService } from 'src/app/services/card.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss'],
})
export class EditCardComponent implements OnInit {
  card: Card = {
    bizName: '',
    bizCategory: '',
    bizAddress: '',
    bizPhone: '',
    bizDescription: '',
  };
  categories: Category[] = null;
  paramsId: string = '';

  constructor(
    private cardService: CardService,
    private categoriesService: CategoriesService,
    private router: Router,
    activateRoute: ActivatedRoute
  ) {
    activateRoute.params.subscribe((params) => (this.paramsId = params?.id));
  }

  onSubmit({ valid, value }: NgForm) {
    console.log(value);

    this.cardService
      .updateCard(this.paramsId, valid, value)
      .subscribe((data) => {
        if (data?._id) {
          alert(
            `כרטיס של העסק "${data.bizName}" בקטגורית "${data.bizCategory}" עודכן בהצלחה`
          );
          this.router.navigate(['']);
        }
      });
  }
  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
    this.cardService
      .getCard(this.paramsId)
      .subscribe((card) => (this.card = card));
  }
}
