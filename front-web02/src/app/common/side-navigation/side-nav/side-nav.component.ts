
import {
  Component,
  ElementRef,
  Input,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GroupedNavItem, NavItem } from '../models/side-nav.models';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'side-navigation-side-nav',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatListModule,
    CommonModule,
    MatExpansionModule,
    RouterModule,
    MatSidenavModule
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  showHeading: boolean = true;
  showLoadingIndicator: boolean = true;
  groupedNavItems: number[] = [];
  isSideNavOpened:boolean=true;
  @Input('heading') public heading: string = '';
  @Input('showLogoutBtn') public showLogoutBtn: boolean = true;
  @Input('navItems') public navItems: (NavItem & GroupedNavItem)[] = [];

  @ViewChildren('expansionPanel') expansionPanels!: QueryList<any>;
  @ViewChild('side_nav') sideNav!: ElementRef;

  constructor(private route: Router, private renderer: Renderer2) {

  }

  ngOnInit(): void {
    if (this.heading != null) {
      this.showHeading = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.navItems != undefined) {
      this.navItems.forEach((item: any, index) => {
        if (item['isGrouped']) {
          this.groupedNavItems.push(index);
        }
      });
    }
  }

  ngAfterViewInit() {
  }

  closeAllExpansionPanelsExcept(i: any) {
    let matIndex = this.groupedNavItems.indexOf(i);
    if (this.expansionPanels) {
      this.expansionPanels.forEach((ep, index) => {
        if (index != matIndex) {
          ep.close();
        }
      });
    }

    let childrenInGroup: any = [];
    if (this.navItems) {
      childrenInGroup = this.navItems[i]['children'];
    }

    for (let j = 0; j < childrenInGroup.length; j++) {
      if (!childrenInGroup[j].isDisabled && childrenInGroup[j].isVisible) {
        this.route.navigate([childrenInGroup[j].routerLink]);
        break;
      }
    }
  }

  closeAllExpansionPanels() {
    if (this.expansionPanels) {
      this.expansionPanels.forEach((ep) => ep.close());
    }
  }

  toggleSideNav() {
    this.isSideNavOpened = !this.isSideNavOpened
  }
}
