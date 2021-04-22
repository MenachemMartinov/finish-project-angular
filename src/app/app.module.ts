import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/dashboard/nav-bar/nav-bar.component';
import { FooterComponent } from './components/dashboard/footer/footer.component';
import { DashConnectedComponent } from './components/dashboard/dash-connected/dash-connected.component';
import { NewCardComponent } from './components/cards/new-card/new-card.component';
import { EditCardComponent } from './components/cards/edit-card/edit-card.component';
import { EditCardImgComponent } from './components/cards/edit-card-img/edit-card-img.component';
import { CardIdComponent } from './components/cards/card-id/card-id.component';
import { NewCategoryComponent } from './components/categories/new-category/new-category.component';
import { EditCategoryComponent } from './components/categories/edit-category/edit-category.component';
import { DeleteCategoryComponent } from './components/categories/delete-category/delete-category.component';
import { CategoryIdComponent } from './components/categories/category-id/category-id.component';
import { DeleteCardComponent } from './components/cards/delete-card/delete-card.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LogOutComponent } from './components/auth/log-out/log-out.component';
import { SginUpManagerComponent } from './components/auth/sgin-up-manager/sgin-up-manager.component';
import { SginUpbusinessComponent } from './components/auth/sgin-upbusiness/sgin-upbusiness.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CardDetailsComponent } from './components/cards/card-details/card-details.component';
import { UploadFileComponent } from './components/files/upload-file/upload-file.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    DashConnectedComponent,
    NewCardComponent,
    EditCardComponent,
    EditCardImgComponent,
    CardIdComponent,
    NewCategoryComponent,
    EditCategoryComponent,
    DeleteCategoryComponent,
    CategoryIdComponent,
    DeleteCardComponent,
    LoginComponent,
    LogOutComponent,
    SginUpManagerComponent,
    SginUpbusinessComponent,
    HomeComponent,
    AboutComponent,
    CardDetailsComponent,
    UploadFileComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
