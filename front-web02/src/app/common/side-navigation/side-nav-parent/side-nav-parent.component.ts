import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavigationService } from '../../../core/services/side-navigation.service';
import { NavItem, GroupedNavItem } from '../models/side-nav-models';

@Component({
  selector: 'app-side-nav-parent',
  standalone: true,
  imports: [RouterOutlet], //RouterOutlet 추가했음
  templateUrl: './side-nav-parent.component.html',
  styleUrls: ['./side-nav-parent.component.scss']
})
export class SideNavParentComponent implements OnInit {

  constructor(private sideNavService: SideNavigationService) { }
  navItems: (NavItem | GroupedNavItem)[] = []; // navItems 선언
  ngOnInit() {
    this.sideNavService.getNavItems().subscribe(
      items => this.navItems = items,
      error => console.error('Error loading nav items', error)
    );
  }
}