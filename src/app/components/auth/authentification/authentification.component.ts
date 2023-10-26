import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Guid } from 'guid-typescript';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent {

  constructor(private router: Router, private authService: AuthService) {}

  title = "Sign up"

  authForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(3)])
  })

  onSubmit() {
    let newUser: IUser = this.authForm.value as unknown as IUser
    newUser.guid = Guid.create().toString()
    newUser.id = newUser.username
    this.authService.addUser(newUser).then().finally(() => this.navigateToLogin())
  }

  navigateToLogin(){
    this.router.navigate(['/auth/login'])
  }
}
