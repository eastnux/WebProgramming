import { Routes } from "@angular/router";
import { DevicesComponent } from "./device-base-page/devices.component";
export const routes: Routes = [
{path: '', component: DevicesComponent, }, //나중에 pathMatch = 'full' 추가
// {path: 'add-device', component: AddDeviceComponent},
];