import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  get data() { return this.registerForm.controls; }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    } else if (this.data.password.value !=  this.data.confirmPassword.value) {
      this._snackBar.open('Password not matched', 'info', {
        duration: 2000,
      });
    }
    else {
      {
        sessionStorage.setItem("userName", this.data.userName.value);
        sessionStorage.setItem("email", this.data.email.value);
        sessionStorage.setItem("password", this.data.password.value);
        this._snackBar.open('Register Successfully', 'Success', {
          duration: 2000,
        });
        this.router.navigate(['/login']);
      }
    }
  }
}
