export interface Card {
    Title: any;
    Content: any;
    Footer: any;
  }
  
  export interface Setting {
    Elements_Number: number;
    color: string;
    icon: string;
    design: string;
    apipaginator: boolean;
    column?:number;
  }