import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./Pages/Home/home.component";
import { LoginComponent } from "./Pages/Login/login.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path:"",
    component:HomeComponent,
    pathMatch:"full"
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
//export const routing = RouterModule.forRoot(routes)
export class AppRoutingModule { }
