import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DbService } from '../services/db.service';
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  constructor(private db: DbService) { }
  name: string = '';
  idNumber: string = '';
  phoneNumber: string = '';
  address: { city: string; gu: string; roName: string; roNumber: string } = {
    city: "", gu: "",
    roName: "", roNumber: ""
  };

  onSave() {
    let theObj = {
      name: this.name,
      idNumber: this.idNumber,
      phoneNumber: this.phoneNumber,
      address: this.address
    }
    console.log(`theObj in onSave: ${JSON.stringify(theObj)}`);
    this.db.setItem('person', theObj);
  }
  onRead() {
    this.db.getItem('person').subscribe((theObj: any) => {
      console.log(`onRead:${JSON.stringify(theObj)}`)
      this.name = theObj.value.name;
      this.idNumber = theObj.value.idNumber;
      this.phoneNumber = theObj.value.phoneNumber;
      this.address = theObj.value.address;
    });
  }
  onClear() {
    this.name = '';
    this.idNumber = '';
    this.phoneNumber = '';
    this.address = { city: "", gu: "", roName: "", roNumber: "" };
  }

}