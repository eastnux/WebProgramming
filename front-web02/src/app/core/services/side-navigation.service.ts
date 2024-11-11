import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupedNavItem, NavItem } from '../../common/side-navigation/models/side-nav-models';
@Injectable({
  providedIn: 'root'
})
export class SideNavigationService {
  private __url: string = 'http://localhost:4200/assets/side-nav.json';
  constructor(private http: HttpClient) { }
  getNavItems(): Observable<(NavItem | GroupedNavItem)[]> {
    return this.http.get<(NavItem | GroupedNavItem)[]>(this.__url);
  }
}
