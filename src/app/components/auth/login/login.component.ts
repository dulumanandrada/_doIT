import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService) {}

  title = "Login"
  invalidLogin: boolean = false

  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(3)])
  })

  onSubmit() {
    console.log(this.loginForm?.value);
    let user: IUser = this.loginForm.value as unknown as IUser
    user.id = user.username
    this.authService.getUserById(user.id).then((res) => {
      console.log(res);
      if(res.id){
        if(res.password === user.password)
          { 
            this.navigateTo('/board')
            sessionStorage.setItem('user', user.username)
          }
        else this.invalidLogin = true
      }
      else this.invalidLogin = true
    }).catch(
      (err) => {
        console.log(err);
      }
    )
  }

  navigateTo(route: string) {
    this.router.navigate([route])
  }
}
