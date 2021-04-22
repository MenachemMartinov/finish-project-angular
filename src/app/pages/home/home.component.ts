import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interface/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: Category[] = null;
  constructor(private categoriesServices: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesServices
      .getCategories()
      .subscribe((data) => (this.categories = data));
  }
}
