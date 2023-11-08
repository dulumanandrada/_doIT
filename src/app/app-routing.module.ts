import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthentificationComponent } from './components/auth/authentification/authentification.component';
import { AuthComponent } from './components/auth/auth.component';
import { BoardComponent } from './components/board/board.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { EmployeesComponent } from './components/employees/employees.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/auth/login",
    pathMatch: "full"
  },
  {
    path: "auth",
    redirectTo: "/auth/login",
    pathMatch: "full"
  },
  {
    path: "auth/login",
    component: LoginComponent
  },
  {
    path: "auth/authentification",
    component: AuthentificationComponent
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
    ]
  },
  {
    path: "employees",
    component: EmployeesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
