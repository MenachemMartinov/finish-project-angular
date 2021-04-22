import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Card } from 'src/app/interface/card';
import { Category } from 'src/app/interface/category';
import { CardService } from 'src/app/services/card.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss'],
})
export class NewCardComponent implements OnInit {
  card: Card = {
    bizName: '',
    bizCategory: '',
    bizAddress: '',
    bizPhone: '',
    bizDescription: '',
  };
  categories: Category[] = null;
  constructor(
    private cardService: CardService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  onSubmit({ valid, value }: NgForm) {
    console.log(value);

    this.cardService.newCard(valid, value).subscribe((data) => {
      if (data?._id) {
        alert(
          `כרטיס של העסק "${data.bizName}" בקטגורית "${data.bizCategory}" נוצר בהצלחה`
        );
        this.router.navigate(['']);
      }
    });
  }
  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }
}
