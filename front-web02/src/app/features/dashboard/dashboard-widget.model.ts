export interface WidgetSelection {
    label: string;
    value: string;
    componentPath: string;
    lib?: WidgetComponentSelection[];
  }
  
  
  export interface WidgetComponentSelection {
    lib: string;
    componentPath: string;
  }
  