export interface NavItem {
    icon: string;
    name: string; routerLink: string; isDisabled: boolean; isVisible: boolean;
}
export interface GroupedNavItem {
    isGrouped: boolean;
    name: string;
    icon: string; children: NavItem[];
}