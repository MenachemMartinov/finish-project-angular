import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interface/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
})
export class NewCategoryComponent implements OnInit {
  category: Category = {
    categoryName: '',
    image: '',
  };
  constructor(
    private categoryService: CategoriesService,
    private router: Router
  ) {}

  onSubmit({ valid, value }: NgForm) {
    console.log(value);

    this.categoryService.newCategory(valid, value).subscribe((data) => {
      if (data?._id) {
        this.router.navigate(['']);
      }
    });
  }
  ngOnInit(): void {}
}
