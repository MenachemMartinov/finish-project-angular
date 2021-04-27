import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupComponent } from 'src/app/commen/popup/popup';
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
    activateRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    activateRoute.params.subscribe((params) => (this.paramsId = params?.id));
  }

  onSubmit({ valid, value }: NgForm) {
    this.categoryService
      .updateCategory(this.category?._id, valid, value)
      .subscribe((data) => {
        if (data?._id) {
          let pup = this.dialog.open(PopupComponent);
          pup.componentInstance.popupMessage = `${data?.categoryName} עודכן בהצלחה`;

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
