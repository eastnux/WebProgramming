import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonLoaderService } from '../../../core/services/common-loader.service';
import { deviceTypes } from '../../../shared/datagenerator/datagenerator.dev';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { DbService } from '../../../core/services/db.service';
import { projName } from '../../../environments/project-env';
import { Device } from '../../../shared/models/data-table.model';
import Chance from 'chance';

@Component({
  selector: 'app-add-device',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule,
    MatLabel,MatFormFieldModule,MatSelectModule, MatOptionModule, MatButtonToggleModule,MatInputModule ],
  templateUrl: './add-device.component.html',
  styleUrl: './add-device.component.scss'
})
export class AddDeviceComponent {

  @ViewChild('myForm') myForm!: NgForm;
  title = "Devices";
  deviceTypes:string[];
  showError:boolean=false;
  loader:boolean=false;
  action!:string[];
  addDeviceForm: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private __loader: CommonLoaderService,
    private db:DbService
  ) {
    this.deviceTypes = deviceTypes;
    this.addDeviceForm = this.fb.group({
      deviceName:  ['', Validators.required ],
      deviceType:   ['', Validators.required ],
      certificate: ['', Validators.required ],
      staticD: ['', Validators.required ],
      dynamicD: '',
      });
      this.db.getItem('action').subscribe(rslt=>this.action=rslt)
  }



  ngOnInit(): void {

  }
  createForm() {

  }

  onSubmit() {

    const chance = new Chance() as Chance.Chance;
    const datePipe = new DatePipe('en-US');
    console.log(`onSubmit start`);

    if(this.addDeviceForm.invalid){
      this.showError=true;
      return;
    }
    console.log(`onSubmit vaild`)
    const {deviceName,deviceType,certificate,staticD,dynamicD} = this.addDeviceForm.value;
// let _id='abcdefg';
// let theDevice: Device={
//   _id:'abcdefg',
//   owner:projName,
//   createdAt:"Sep 2, 2097, 10:19:23 AM",
//   credentials:{"accessToken": "", "certificates": {} },
//   operations: { "deviceRules": [], "deviceStatus": true }, 
//   name: deviceName,
//   type: { deviceType: deviceType } 
// }

let theDevice: Device= {
  _id: chance.string({alpha: true, numeric: true, length: 25}),
  owner:projName,
    createdAt:"Sep 2, 2097, 10:19:23 AM",
  credentials:{"accessToken": "", "certificates": {} },
  operations: { "deviceRules": [], "deviceStatus": true }, 
  name: deviceName,
  type: { deviceType: deviceType } 
};
this.db.addCompo('deviceResponse',theDevice).subscribe()


    }
    showHide(element: HTMLInputElement){
      const textarea = document.getElementById('textarea');
      if(textarea){
        if(element.checked ==true){
          textarea.style.display ="block";
        }
        else{
          textarea.style.display="none"
        }
      }
    }
}
