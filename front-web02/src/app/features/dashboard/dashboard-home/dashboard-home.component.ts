import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Dashboard, MyItem } from '../dashboard-types.model';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GridsterComponent } from 'angular-gridster2';
import { PopUpAddDashboardComponent } from '../pop-up-add-dashboard/pop-up-add-dashboard.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatLabel,MatIcon,FormsModule,
    MatFormField,MatSelectModule,MatOptionModule, DashboardComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
  dashboardForm!: FormGroup;
  subs: Subscription[] = [];
  dashboards: Dashboard[] = [];
  selectedDashboard!: Dashboard;

  @ViewChild(GridsterComponent) grid!: GridsterComponent;
  @Input() dashboard: MyItem[] = [];


  constructor(
    private dialog: MatDialog,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.dashboardForm = this.fb.group({
      dashboardName: new FormControl(null)
    });
  }


  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {

    this.subs.push(this.dashboardForm.valueChanges.subscribe(change => {
      console.log(change);
    }));
    const _localDash = localStorage.getItem('dashboard');
    if (_localDash) {
      const localDash = JSON.parse(_localDash);
      console.log({localDash});
    }
  }

  addDashboard() {
    this.dialog.open(PopUpAddDashboardComponent).afterClosed().subscribe(val => {
      // Dashboard name logged
      // console.log(val);
      if (val) {
        this.router.navigate(['add-widget'], {
          relativeTo: this.activateRoute,
          queryParams: {
            name: val
          }
        });
      }
    });
  }

  addWidget() {
    this.router.navigate(['add-widget'], {
      relativeTo: this.activateRoute,
      queryParams: {
        name: this.selectedDashboard.dashboardName
      }
    });
  }

  saveDashboard() {
    localStorage.setItem('dashboard', JSON.stringify(this.selectedDashboard));
  }
}