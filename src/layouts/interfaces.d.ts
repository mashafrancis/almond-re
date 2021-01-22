export interface MenuItemProps {
	groupTitle: string;
	pages: Array<{ href: string; title: string }>;
}

export interface MenuGroupProps {
	item: MenuItemProps;
}

export interface PagesProps {
	discover: {
		title: string;
		id: string;
		children: {
			about: MenuItemProps;
		};
	};
	learn: {
		title: string;
		id: string;
		children: {
			resources: MenuItemProps;
		};
	};
	support: {
		title: string;
		id: string;
		children: {
			services: MenuItemProps;
		};
	};
}
