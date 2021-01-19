import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./Pages/Home/home.component";
import { LoginComponent } from "./Pages/Login/login.component";
import { SignupComponent } from "./Pages/Signup/signup.component";
import { AdminComponent } from "./Pages/Admin/admin.component"

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path:"",
    component:HomeComponent,
    pathMatch:"full"
  },
  {
    path:"admin",
    component:AdminComponent,
    pathMatch:"full"
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
//export const routing = RouterModule.forRoot(routes)
export class AppRoutingModule { }
