// export interface Rule {
//   name: string;
//   condition: string;
//   action: { name: string, icon: string };
//   createdDate: string;
// }
//
//
// export interface RuleDevice {
//   id: string;
//   name: string;
//   rules: Rule[];
// }
export interface RuleCard {
    deviceType: string;
    rules: Rule[]
  }
  
  export interface Rule {
    _id: string;
    actions: string[];
    groupIds: string[];
    deviceIds: any[];
    condition: string;
    createdAt: string;
    createdBy: string;
    ruleName: string;
    updatedAt: string;
    type: Type;
  }
  
  export interface Type {
    deviceType: string;
  }
  
  interface Data {
    rules: Rule[];
    total: number;
  }
  
  export interface RulesResponse {
    status: string;
    message: string;
    data: Data;
  }
  
  