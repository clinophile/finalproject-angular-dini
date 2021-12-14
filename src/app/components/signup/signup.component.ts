import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  signupForm = new FormGroup ({
    username: new FormControl('',
      [
        Validators.required,
        Validators.minLength(5)
      ]),
      password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(5)
      ]),
      email: new FormControl('',
      [
        Validators.required,
        Validators.email
      ])
  })

  get username() {
    return this.signupForm.get('username')
  }

  get password() {
    return this.signupForm.get('password')
  }

  get email() {
    return this.signupForm.get('email')
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res.result) {
        this.signupForm.reset()
        this.router.navigate(['login']);
        alert('Register Succesfully');
      }
    })
  }
}
