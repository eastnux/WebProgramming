import {WidgetComponentSelection} from './dashboard-widget.model';
// Dashboard Home
import {ChartDataset, ChartOptions, ChartType} from 'chart.js';
import {Color} from 'chart.js' // 'ng2-charts'; label-->string //// to do
import {GridsterItem} from 'angular-gridster2';

export interface DashboardResponse {
  status: string;
  message: string;
  data: Dashboard[];
}

export interface Dashboard {
  read?: any[];
  _id?: string;
  dashboardName: string;
  widgets: Widget[];
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Widget {
  data: WidgetData;
  settings: Settings;
  _id: string;
  label: string;
  component: string;
  id: string;
  rows?: number;
  cols?: number;
  lib?: WidgetComponentSelection;
  widgetConfig?: GridsterItem;
}

export interface WidgetData {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  attributes: string[] | string;
  dataUnit: string;
  min?: null;
  max?: null;
  lastDataTime?: string;
}

export interface Settings {
  color: string;
}

export interface MyItem {
  id: number;
  datasets: ChartDataset[];
  labels: string[]; //Label[] //// to do
  options: ChartOptions;
  colors: Color[];
  chartType: ChartType;
  legend: boolean;
  uiConfig: GridsterItem;
  lib: string;
}

export interface CustomChartConfig {
  label: string;
  widget: ChartType | 'gauge';
  deviceType: string;
  DeviceName: string;
  attribute: string;
  unit: string;
}

export interface CustomLineChart extends CustomChartConfig {
  dataSince: number;
}

export interface CustomGauge extends CustomChartConfig {
  min: number;
  max: number;
}
