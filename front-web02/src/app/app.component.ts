import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GroupedNavItem, NavItem } from './common/side-navigation/models/side-nav-models';
import { SideNavigationService } from './core/services/side-navigation.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], templateUrl: './app.component.html', styleUrl: './app.component.scss'
})
export class AppComponent {
  public heading: string = "Cognisense";
  public showLogoutBtn: boolean = true;
  public navItems: (NavItem | GroupedNavItem)[] = [];
  public isLoggedIn: boolean = true;
  constructor(private __sideNavService: SideNavigationService) { } ngOnInit() {
    this.__sideNavService.getNavItems().subscribe(data => this.navItems = data);
  }
  onLogin() {
    this.isLoggedIn = true;
  }
}