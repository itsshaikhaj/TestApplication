import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isTab1: boolean = false;
  isTab2: boolean = false;
  isUpdate: boolean = false;
  listArray: any = [];
  name: any;
  email: any;
  phone: any;
  city: any;
  oldEmail: any;

  constructor(private router: Router, private _snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit() {
    this.isTab1 = true;
  }

  changeTab(type: any) {
    if (type == 'register') {
      this.name = '';
      this.email = '';
      this.phone = '';
      this.city = '';
      this.isUpdate = false;
      this.isTab1 = true;
      this.isTab2 = false;
    }
    if (type == 'list') {
      this.listArray = JSON.parse(sessionStorage.getItem('list'))
      this.isTab1 = false;
      this.isTab2 = true;
    }

  }


  onSubmit() {
    if (!this.email || this.email == '') {

      this._snackBar.open('Email is required', '', {
        duration: 2000,
      });
      return;
    }
    this.listArray = JSON.parse(sessionStorage.getItem('list')) || [];
    let check = this.listArray.findIndex(e => e.email == this.oldEmail);

    if (check >= 0) {
      {
        let user = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          city: this.city,
        }
        this.listArray = JSON.parse(sessionStorage.getItem('list'))
        this.listArray.splice(check, 1, user);
        sessionStorage.setItem("list", JSON.stringify(this.listArray));
        this._snackBar.open('Updated Successfully', 'Success', {
          duration: 2000,
        });
      }

    }

    else {
      let user = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        city: this.city,
      }
      this.listArray = JSON.parse(sessionStorage.getItem('list')) || []
      this.listArray.push(user);
      sessionStorage.setItem("list", JSON.stringify(this.listArray));
      this._snackBar.open('Register Successfully', 'Success', {
        duration: 2000,
      });
    }

  }


  edit( item) {
    this.isUpdate = true;
    this.isTab1 = true;
    this.isTab2 = false;

    this.name = item?.name;
    this.email = item?.email;
    this.phone = item?.phone;
    this.city = item?.city;

    this.oldEmail = item?.email
  }

  delete(index: any) {
  this.listArray = JSON.parse(sessionStorage.getItem('list'))
    this.listArray.splice(index, 1);
    sessionStorage.setItem("list", JSON.stringify(this.listArray));
  }

  logOut() {
    this.authService.logOut();
  }
}
