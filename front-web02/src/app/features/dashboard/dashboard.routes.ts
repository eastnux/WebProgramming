import { Routes } from "@angular/router";
import { DashboardHomeComponent } from "./dashboard-home/dashboard-home.component";
import { DashboardAddWidgetComponent } from "./dashboard-add-widget/dashboard-add-widget.component";

export const routes: Routes = [
    {path: '', component: DashboardHomeComponent},
    {path: 'add-widget', component: DashboardAddWidgetComponent},
  ];