import {Card} from '../../cards/models/card.model';

export interface ViewDetailsPopup {
  title: {
    name: string;
    icon: string;
  };
  tabs: {
    attributes: Card[],
    actions: TabActionsData[],
  };
  config: {
    dismissbtn: boolean
  };
}

export interface TabActionsData {
  icon: string;
  value: string;
  toggle: boolean;
}