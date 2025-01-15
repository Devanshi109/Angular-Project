import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DirectoryUsersComponent } from './components/directory-users/directory-users.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
  { path: '', redirectTo: '/directory', pathMatch: 'full' },
  { path: 'directory', component: DirectoryUsersComponent },
  { path: 'contactus', component: ContactUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }