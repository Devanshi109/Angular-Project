import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WishlistPageComponent } from './wishlist-page/wishlist-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },      
  { path: 'wishlist', component: WishlistPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
