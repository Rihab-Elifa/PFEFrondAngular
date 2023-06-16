import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LivreurComponent } from './livreur/livreur.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserServiceService } from './_services/user-service.service';
import { ListVendorComponent } from './list-vendor/list-vendor.component';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import{MatSidenavModule} from '@angular/material/sidenav'
import { CategoryListComponent } from './category-list/category-list.component';
import { AddCatComponent } from './add-cat/add-cat.component';
import { CategorieDetailsComponent } from './categorie-details/categorie-details.component';
import { ProfileComponent } from './profile/profile.component';
import { VendreComponent } from './vendre/vendre.component';
import { SocialComponent } from './social/social.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider} from '@abacritt/angularx-social-login';
import { HomeComponent } from './home/home.component';
import { StorageModule } from '@ngx-pwa/local-storage';
import { TokenInterceptor } from './_helpers/token.interceptor';
import { MyPagesComponent } from './my-pages/my-pages.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { UpdatePageComponent } from './update-page/update-page.component';
import { MapsComponent } from './maps/maps.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ProfileVendorComponent } from './profile-vendor/profile-vendor.component';
import { UpdateArticleComponent } from './update-article/update-article.component';

import { AllArticleComponent } from './all-article/all-article.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { CartComponent } from './cart/cart.component';
import { CommanderComponent } from './commander/commander.component';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireMessagingModule } from "@angular/fire/compat/messaging";
import { environment } from 'src/environment';
import { DetailCommandeComponent } from './detail-commande/detail-commande.component';
import { MessagingService } from './_services/messaging.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ComponentsModule } from './components/components.module';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartComponent } from './chart/chart.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import {MatSelectModule} from '@angular/material/select';
import { DialogOverviewExampleDialogComponent } from './dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { MatDialogModule} from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { SideBarDComponent } from './side-bar-d/side-bar-d.component';
import { AllVendeurComponent } from './all-vendeur/all-vendeur.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { OrderComponent } from './order/order.component';
import { RidersComponent } from './riders/riders.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { MatMenuModule } from '@angular/material/menu';
import { DialogComponent } from './dialog/dialog.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ChartvendeurComponent } from './chartvendeur/chartvendeur.component';
import { FooterComponent } from './footer/footer.component';
import { OrderClComponent } from './order-cl/order-cl.component';
import { OrderClientComponent } from './order-client/order-client.component';
@NgModule({
  declarations: [
    DialogOverviewExampleDialogComponent,
    ChartComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UpdateUserComponent,
    ListVendorComponent,
    CategoryListComponent,
    AddCatComponent,
    CategorieDetailsComponent,
    ProfileComponent,
    VendreComponent,
    HomeComponent,
    MyPagesComponent,
    DetailsPageComponent,
    AddProduitComponent,
    UpdatePageComponent,
    MapsComponent,
    ProfileVendorComponent,
    UpdateArticleComponent,
    AllArticleComponent,
    ArticleDetailComponent,
    CartComponent,
    CommanderComponent,
    DetailCommandeComponent,
   
    LivreurComponent,
        AllVendeurComponent,
        SideBarDComponent,
        AllUsersComponent,
        OrderComponent,
        RidersComponent,
        AdminUserComponent,
        DialogComponent,
        ChartvendeurComponent,
        FooterComponent,
        OrderClComponent,
        OrderClientComponent ,
  
  
   
  ],
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
     MatDialogModule,
     MatMenuModule,
    MatSnackBarModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule ,
    MatInputModule ,
    HttpClientModule,
    MatListModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSidenavModule,
    GoogleMapsModule,
    SocialLoginModule,
    StorageModule.forRoot({}),
    AngularFireModule.initializeApp(environment.FirebaseConfig,'notification'),
   AngularFireMessagingModule,
   ComponentsModule,
   CommonModule,
   BrowserAnimationsModule
   
  ],
  providers: [MessagingService ,UserServiceService,TokenInterceptor,{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            'clientId'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('clientId')
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
