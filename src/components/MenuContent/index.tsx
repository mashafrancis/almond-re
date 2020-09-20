import React from 'react';

// third-party libraries
import Drawer, { DrawerContent, DrawerHeader } from '@material/react-drawer';
import List, {
	ListDivider,
	ListGroup,
	ListGroupSubheader,
	ListItem,
	ListItemGraphic,
	ListItemText,
} from '@material/react-list';

// components
import { AdminMenus, UserMenus } from '@components/MenuRoutes';
import { UserContext } from '@context/UserContext';
import { ComponentContext } from '@context/ComponentContext';
import { useViewport } from '../../hooks';

// interfaces
import { MenuContentProps } from './interfaces';

// styles
import '@pages/DashboardContainer/DashboardNavBar.scss';

const avatar =
	'https://res.cloudinary.com/mashafrancis/image/upload/v1552641620/kari4me/nan.jpg';

const mobileHeader = (name, photo) => (
	<div className="header-image">
		<span className="mini-menu__image">
			<img className="mini-menu__image" src={photo || avatar} alt="avatar" />
			<h5>{name || 'Anonymous'}</h5>
		</span>
	</div>
);
const mobileDrawerHeader = (setOpen, name, photo, viewWidth) => (
	<>
		<DrawerHeader>
			<div className="drawer-logo">
				<div
					role="tablist"
					className="mdc-tab-bar"
					onClick={setOpen.bind(null, false)}
				>
					{viewWidth && mobileHeader(name, photo)}
				</div>
			</div>
		</DrawerHeader>
	</>
);
const drawerContent = (
	selectedIndex,
	setSelectedIndex,
	setOpen,
	checkIsAdmin,
	viewWidth,
) => (
	<>
		<ListGroup>
			{viewWidth && <ListDivider tag="div" />}
			<List
singleSelection selectedIndex={selectedIndex.item}>
				{checkIsAdmin().map((group, groupIndex) => (
					<React.Fragment key={groupIndex}>
						{group.map((item, itemIndex) => (
							<ListItem
								key={`${groupIndex}.${itemIndex}`}
								className={
									selectedIndex.group === groupIndex &&
									selectedIndex.item === itemIndex
										? 'mdc-list-item--selected'
										: ''
								}
								onClick={setSelectedIndex.bind(null, {
									group: groupIndex,
									item: itemIndex,
								})}
							>
								<ListItemGraphic className="drawer-icon" graphic={item.icon} />
								<ListItemText tabIndex={0} primaryText={item.primaryText} />
							</ListItem>
						))}
						<ListDivider tag="div" />
						{groupIndex === 0 ? (
							<ListGroupSubheader tag="h3">
								Do more with your account
							</ListGroupSubheader>
						) : null}
					</React.Fragment>
				))}
			</List>
		</ListGroup>
		<footer className="drawer-footer">
			<a
				className="footer-text"
				href="https://www.almond.com/privacy"
				target="_blank"
				rel="noopener"
			>
				Privacy
			</a>{' '}
			·{' '}
			<a
				className="footer-text"
				href="https://www.almond.com/tos"
				target="_blank"
				rel="noopener"
			>
				Terms
			</a>{' '}
			·{' '}
			<a
				className="footer-text"
				href="https://www.almond.com/about"
				target="_blank"
				rel="noopener"
			>
				About
			</a>
		</footer>
	</>
);
const MenuContent = (props: MenuContentProps): JSX.Element => {
	const menu = React.useContext(ComponentContext);
	const user = React.useContext(UserContext);

	const { width } = useViewport();
	const breakpoint = 539;
	const viewWidth = width < breakpoint;

	const { isMenuOpen, setOpen, selectedIndex, setSelectedIndex } = menu;
	const { isAdmin } = user;

	const checkIsAdmin = () => (isAdmin ? AdminMenus : UserMenus);
	const { name, photo } = props;

	return (
		<Drawer
modal={viewWidth} open={isMenuOpen} onClose={() => setOpen(false)}>
			{mobileDrawerHeader(setOpen, name, photo, viewWidth)}
			<DrawerContent>
				{drawerContent(
					selectedIndex,
					setSelectedIndex,
					setOpen,
					checkIsAdmin,
					viewWidth,
				)}
			</DrawerContent>
		</Drawer>
	);
};

export default MenuContent;
