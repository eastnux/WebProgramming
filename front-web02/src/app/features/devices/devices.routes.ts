import { Routes } from "@angular/router";
import { DevicesComponent } from "./device-base-page/devices.component";
import { AddDeviceComponent } from "./add-device/add-device.component";

export const routes: Routes = [
    {path: '', component: DevicesComponent, pathMatch: 'full'},
    {path: 'add-device', component: AddDeviceComponent},
  ];