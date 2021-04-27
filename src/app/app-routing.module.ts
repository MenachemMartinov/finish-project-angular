import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogOutComponent } from './components/auth/log-out/log-out.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SginUpManagerComponent } from './components/auth/sgin-up-manager/sgin-up-manager.component';
import { SginUpbusinessComponent } from './components/auth/sgin-upbusiness/sgin-upbusiness.component';
import { CardDetailsComponent } from './components/cards/card-details/card-details.component';
import { DeleteCardComponent } from './components/cards/delete-card/delete-card.component';
import { EditCardImgComponent } from './components/cards/edit-card-img/edit-card-img.component';
import { EditCardComponent } from './components/cards/edit-card/edit-card.component';
import { NewCardComponent } from './components/cards/new-card/new-card.component';
import { CategoryIdComponent } from './components/categories/category-id/category-id.component';
import { DeleteCategoryComponent } from './components/categories/delete-category/delete-category.component';
import { EditCategoryComponent } from './components/categories/edit-category/edit-category.component';
import { NewCategoryComponent } from './components/categories/new-category/new-category.component';
import { AuthGuard } from './guard/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFundComponent } from './pages/page-not-fund/page-not-fund.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'category/:id', component: CategoryIdComponent },
  { path: 'card/:id', component: CardDetailsComponent },
  {
    path: 'sign-up-business',
    component: SginUpbusinessComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-up-manager',
    component: SginUpManagerComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogOutComponent, canActivate: [AuthGuard] },
  {
    path: 'new-category',
    component: NewCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-category/:id',
    component: EditCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'delete-category/:id',
    component: DeleteCategoryComponent,
    canActivate: [AuthGuard],
  },
  { path: 'new-card', component: NewCardComponent, canActivate: [AuthGuard] },
  {
    path: 'edit-card/:id',
    component: EditCardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'delete-card/:id',
    component: DeleteCardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-card/:id/img',
    component: EditCardImgComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pageNotFund',
    component: PageNotFundComponent,
  },
  { path: '**', redirectTo: 'pageNotFund', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
