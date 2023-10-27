import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private router: Router) {}

  items: MenuItem[] = [
    {
      label: "Home",
      url: "/home"
    },
    {
      label: "Profile",
      url: "/profile"
    },
    {
      label: "Employees",
      url: "/employees"
    },
    {
      label: "Board",
      url: "/board"
    }
  ]

  navigateTo(route: string | undefined) {
    this.router.navigate([route])
  }
}