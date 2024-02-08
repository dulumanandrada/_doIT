import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  username: string | null

  constructor(private router: Router) {
    this.username = sessionStorage.getItem('user')
  }

  items: MenuItem[] = [
    {
      label: "Home",
      url: "/home"
    },
    {
      label: "Board",
      url: "/board"
    },
    {
      label: "Employees",
      url: "/employees"
    },
    {
      label: "Log Out",
      url: 'logout'
    }
  ]

  navigateTo(route: string | undefined) {
    if(route === 'logout') {
      sessionStorage.clear()
      this.router.navigate(['/login'])
    }
    else this.router.navigate([route])
  }
}
