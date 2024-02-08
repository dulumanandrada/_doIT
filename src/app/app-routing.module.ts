import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthentificationComponent } from './components/auth/authentification/authentification.component';
import { AuthComponent } from './components/auth/auth.component';
import { BoardComponent } from './components/board/board.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "authentification",
    component: AuthentificationComponent
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "board",
    children: [
      {
        path: "",
        component: BoardComponent
      },
      {
        path: ":id",
        component: TaskDetailsComponent
      }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: "employees",
    component: EmployeesComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
