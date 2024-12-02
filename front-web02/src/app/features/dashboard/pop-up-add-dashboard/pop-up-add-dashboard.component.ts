import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-pop-up-add-dashboard',
  standalone: true,
  imports: [MatFormField, MatDialogModule],
  templateUrl: './pop-up-add-dashboard.component.html',
  styleUrl: './pop-up-add-dashboard.component.scss'
})
export class PopUpAddDashboardComponent {

}
