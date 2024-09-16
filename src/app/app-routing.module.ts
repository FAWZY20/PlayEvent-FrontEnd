import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './models/connexion/connexion.component';
import { HomeComponent } from './models/home/home.component';

const routes: Routes = [
  { path: "", component: ConnexionComponent},
  { path: "home", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
