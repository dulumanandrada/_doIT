import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthentificationComponent } from './components/auth/authentification/authentification.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/auth",
    pathMatch: "full"
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "authentification",
        component: AuthentificationComponent
      }
    ],
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
