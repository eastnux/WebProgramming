import { Injectable } from '@angular/core';
import { CanActivateFn,  Route, Router } from '@angular/router';
import { SideNavigationService } from '../services/side-navigation.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavigationGuard {
  constructor(private __sideNavService: SideNavigationService, private __router: Router) {

  }

  canLoad(route: Route): Observable<boolean> | boolean {
    var url = route['path']
    return this.__sideNavService.getNavItems().pipe(map(data => {
      var isDisabled = data.filter((ele: any) => {
        if (ele['isGrouped']) {
          var isAnyChildDisabled = 0;
          ele['children'].forEach((item: any) => {
            if (item['routerLink'] === url && item['isDisabled']) {
              isAnyChildDisabled++;
            }
          });
          if (isAnyChildDisabled > 0) {
            return true;
          }
        }
        else {
          return ele['routerLink'] === url && ele['isDisabled']
        }
      });

      if (isDisabled.length != 0) {
        alert("You can't access this url");
        this.__router.navigateByUrl("/");
        return false;
      }
      return true;
    }));
  }
}