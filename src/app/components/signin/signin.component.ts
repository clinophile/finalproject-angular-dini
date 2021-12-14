import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  signinForm = new FormGroup ({
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

  get password() {
    return this.signinForm.get('password')
  }

  get email() {
    return this.signinForm.get('email')
  }

  signIn() {
    this.authService.signIn(this.signinForm.value).subscribe((res: any) => {
      const {result} = res ;
      this.authService.setAuthorizationToken(result.token);
      this.signinForm.reset();
      this.router.navigate(['payment']);
      },
      (err) => {
        this.toastr.warning('Email or Password is Wrong.', 'Failed to Login.');
        
    });
  }

}
