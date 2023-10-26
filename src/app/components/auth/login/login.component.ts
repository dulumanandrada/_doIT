import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private route: ActivatedRoute) {}

  title = "Login"

  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(3)])
  })

  onSubmit() {
    console.log(this.loginForm?.value);
    
  }

  navigateToAuthentification() {
    console.log("go to authentification!");
    this.router.navigate(['auth/authentification'])
  }
}
