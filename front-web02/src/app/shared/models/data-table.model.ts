export interface Res {
    '_id': string;
    'type': string;
    'name': string;
    'createdAt': string;
    'updatedAt': string;
    '__v': number;
    disable: boolean;
  }
  
  
  export interface DataTableConfig {
    checkbox: boolean;
    pageSize: number;
    pageSizeOptions: number[];
    searchBox: boolean;
    totalCount?: number;
  }
  
  export interface DataTableActions {
    actions: Action[];
    bulkActions: BulkAction[];
  }
  
  export interface Action {
    name: string;
    icon: string;
    iconOpp?: string;
    color?: 'primary' | 'accent' | 'warn';
    showOnHover?: boolean;
    showOnDisabled?: boolean;
  }
  
  export interface BulkAction {
    name: string;
    icon: string;
    color?: 'primary' | 'accent' | 'warn';
  }
  
  export interface ActionChange {
    selected: any;
    type: 'action' | 'bulk-action';
    name: string;
  }
  
  
  export interface GCP301 {
    _id: string;
    clientCertificate: string;
    privateKey: string;
  }
  
  export interface Cloud {
    GCP301: GCP301;
  }
  
  export interface Certificates {
    cloud?: Cloud[];
  }
  
  export interface Credentials {
    certificates: Certificates;
    accessToken: string;
  }
  
  export interface Operations {
    deviceStatus: boolean;
    deviceRules: any[];
  }
  
  export interface Type {
    deviceType: string;
  }
  
  export interface Device {
    _id: string;
    owner: string;
    createdAt: string;
    credentials: Credentials;
    operations: Operations;
    name: string;
    type: Type;
  }
  
  export interface Data {
    devices: Device[];
    count: number;
  }
  
  export interface DeviceResponse {
    status: string;
    message: string;
    data: Data;
  }
  