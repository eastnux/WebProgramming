import { Injectable } from "@angular/core";
import { Route, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {

  public isLoggedIn: boolean = true;
  constructor(private router: Router) { }
  canLoad(route: Route): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (this.isLoggedIn) {
      return true;
  //   }
  //   else {
  //     alert("you are not logged in");
  //     this.router.navigateByUrl('/login');
  //     return false;
  //   }
  }
}
