export interface NavItem {
    icon: string;
    name: string;
    routerLink: string;
    isDisabled: boolean;
    isVisible: boolean;
    // children?: NavItem[];
    // isGrouped?: boolean;
}

export interface GroupedNavItem {
    isGrouped: boolean;
    name: string;
    icon: string;
    children: NavItem[];
    // isVisible?: boolean;
    // routerLink?: string;
}