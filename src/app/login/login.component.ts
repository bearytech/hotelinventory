import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'hinv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private route: Router, private loginService: LoginService) { }

  email: string = '';
  password: string = '';

  Login() {
    // if (this.email === "admin@gmail.com" && this.password === "Admin") {
    //   // this.route.navigate(['/rooms', 'add'])
    //   this.route.navigateByUrl('/rooms/add')
    // }
    if (this.loginService.Login(this.email, this.password)) {
      this.route.navigate(['/rooms'])
    }
  }
}
