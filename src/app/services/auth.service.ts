import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {

  }
  logOut() :void {
    sessionStorage.clear();
    sessionStorage.setItem('isLoggedIn','false');
    this.router.navigate(['/login']);

    }
}
