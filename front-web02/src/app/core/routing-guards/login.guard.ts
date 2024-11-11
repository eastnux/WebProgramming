import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard{
  public isLoggedIn: boolean = true;
  constructor(private router: Router) { }
  canLoad(route: Route): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLoggedIn) {
      return true; // 로그인 상태일 때 모듈 로드 허용
    } else {
      alert("You are not authorized to access this module.");
      return this.router.createUrlTree(['/login']); // 로그인 페이지로 리다이렉트
    }
  }
}
