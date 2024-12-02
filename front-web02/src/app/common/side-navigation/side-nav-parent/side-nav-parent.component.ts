import { Component } from '@angular/core';
import { GroupedNavItem, NavItem } from '../models/side-nav.models';
import { SideNavigationService } from '../../../core/services/side-navigation.service';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-side-nav-parent',
  standalone: true,
  imports: [SideNavComponent],
  templateUrl: './side-nav-parent.component.html',
  styleUrl: './side-nav-parent.component.scss'
})
export class SideNavParentComponent {
  heading: string = "IoT board";
  showLogoutBtn: boolean = true;
  navItems: (NavItem & GroupedNavItem)[] = [];

  constructor(private sideNavService: SideNavigationService) {}

  ngOnInit() {
    this.sideNavService.getNavItems().subscribe(data => this.navItems = data);
  }

}
