import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupComponent } from 'src/app/commen/popup/popup';
import { Category } from 'src/app/interface/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss'],
})
export class DeleteCategoryComponent implements OnInit {
  constructor(
    private categoryService: CategoriesService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) =>
      this.categoryService.getCategories().subscribe((category) =>
        this.categoryService
          .deleteCategory(
            category.find((item) => item.categoryName === params?.id)?._id
          )
          .subscribe((res) => {
            if (res?._id) {
              let pup = this.dialog.open(PopupComponent);
              pup.componentInstance.popupMessage = `${res?.categoryName} נמחק בהצלחה`;

              this.router.navigate(['']);
            }
          })
      )
    );
  }
}
