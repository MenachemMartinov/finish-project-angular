import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interface/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  category: Category = {
    categoryName: '',
    image: '',
  };
  paramsId: string = '';
  constructor(
    private categoryService: CategoriesService,
    private router: Router,
    activateRoute: ActivatedRoute
  ) {
    activateRoute.params.subscribe((params) => (this.paramsId = params?.id));
  }

  onSubmit({ valid, value }: NgForm) {

    this.categoryService
      .updateCategory(this.category?._id, valid, value)
      .subscribe((data) => {

        if (data?._id) {
          alert(`${data?.categoryName} עודכן בהצלחה`);

          this.router.navigate(['']);
        }
      });
  }
  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe(
        (category) =>
          (this.category = category.find(
            (item) => item.categoryName === this.paramsId
          ))
      );
  }
}
