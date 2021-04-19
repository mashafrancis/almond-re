// react libraries
import { useEffect, useState } from 'react';
// components
import { Checkbox } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import { CustomLoadingOverlay } from '@pages/WaterCyclesPage';
import { DashboardCard } from '@components/molecules';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// helpers
import capitalize from '@utils/capitalize';
// interfaces
import { Permission, Resource } from '@modules/userRoles/interfaces';
// styles
import './PermissionAccess.scss';
import { PermissionAccessProps, PermissionAccessState } from './interfaces';

function customCheckbox(theme: Theme) {
	return {
		'& .MuiCheckbox-root svg': {
			width: 16,
			height: 16,
			backgroundColor: 'transparent',
			border: `1px solid ${
				theme.palette.type === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
			}`,
			borderRadius: 2,
		},
		'& .MuiCheckbox-root svg path': {
			display: 'none',
		},
		'& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
			backgroundColor: theme.palette.primary.main,
			borderColor: theme.palette.primary.main,
		},
		'& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
			position: 'absolute',
			display: 'table',
			border: '2px solid #fff',
			borderTop: 0,
			borderLeft: 0,
			transform: 'rotate(45deg) translate(-50%,-50%)',
			opacity: 1,
			transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
			content: '""',
			top: '50%',
			left: '39%',
			width: 5.71428571,
			height: 9.14285714,
		},
		'& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
			width: 8,
			height: 8,
			backgroundColor: theme.palette.primary.main,
			transform: 'none',
			top: '39%',
			border: 0,
		},
	};
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			border: 0,
			WebkitFontSmoothing: 'auto',
			'& .MuiDataGrid-iconSeparator': {
				display: 'none',
			},
			'& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
				paddingLeft: 2,
				paddingRight: 2,
			},
			'& .MuiPaginationItem-root': {
				borderRadius: 0,
			},
			'& .table-header': {
				color: theme.palette.primary.main,
				fontWeight: 400,
				fontSize: 12,
			},
			'& .table-cell': {
				fontWeight: 400,
				fontSize: 12,
			},
			...customCheckbox(theme),
		},
	}),
);

const PermissionAccess = ({
	resources,
	permissions,
	getResources,
}: PermissionAccessProps): JSX.Element => {
	/*
	 * This stores a permission to permissionId mapping e.g { 'Full Access': 5e439f32fd05da507ca0161e, ... }
	 */
	const mappedPermissions = {
		'full access': '',
		view: '',
		add: '',
		edit: '',
		delete: '',
	};

	const [state, setState] = useState<PermissionAccessState>({
		permissions: [],
		resources: [],
		mappedPermissions: {
			'full access': '',
			view: '',
			add: '',
			edit: '',
			delete: '',
		},
		isResourcesUpdates: false,
	});

	const classes = useStyles();

	// const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
	// const [allResources, setAllResources] = useState<Resource[]>([...resources]);

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			resources,
			permissions,
		}));

		if (state.resources.length && state.permissions.length) {
			/*
			 * Force the order of the permissions to start with full access
			 * and end with delete
			 */
			Object.keys(mappedPermissions).forEach((permissionString: string) => {
				mappedPermissions[permissionString] = state.permissions.find(
					(permissionObject: Permission) =>
						permissionObject.type.toLowerCase() === permissionString,
				)?._id;
			});
		}
	}, []);

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			resources,
			permissions,
		}));

		Object.keys(mappedPermissions).forEach((permissionString: string) => {
			const permissionKey = permissions.find(
				(permissionObject: Permission) =>
					permissionObject.type.toLowerCase() === permissionString,
			);

			if (permissionKey) {
				setState((prevState) => ({
					...prevState,
					mappedPermissions: {
						...mappedPermissions,
						permissionString: permissionKey._id,
					},
				}));
				mappedPermissions[permissionString] = permissionKey._id;
			}
		});
	}, [resources]);

	/**
	 * Toggle a permission on or off for each of the resources
	 * @param {string} resourceId
	 * @param {string} permissionType
	 * @returns {void}
	 */
	const togglePermission = (resourceId, permissionType) => () => {
		const permissionId = state.mappedPermissions[permissionType];
		// this takes the current permission Ids for the given resource and toggles the value within that array
		let getNewPermissionIds;
		// if this is the full access permission
		if (state.mappedPermissions['full access'] === permissionId) {
			getNewPermissionIds = (currentPermissionIds) => {
				// switch off all permissions if the user toggles off 'full access' otherwise make it the only one
				return currentPermissionIds.includes(permissionId)
					? []
					: [permissionId];
			};
		} else {
			getNewPermissionIds = (currentPermissionIds) => {
				/*
				 * if current permissions contain 'full access', it should be removed and every other permission
				 * asides the one that was clicked, should be added
				 */
				if (
					currentPermissionIds.includes(state.mappedPermissions['full access'])
				) {
					return Object.values(state.mappedPermissions).filter(
						(currentPermissionId) =>
							currentPermissionId !== permissionId &&
							currentPermissionId !== state.mappedPermissions['full access'],
					);
				}

				return currentPermissionIds.includes(permissionId)
					? currentPermissionIds.filter(
							(currentPermissionId) => currentPermissionId !== permissionId,
					  )
					: [...currentPermissionIds, permissionId];
			};
		}

		setState((prevState) => ({
			...prevState,
			resources: state.resources.map((resource) =>
				resource._id === resourceId
					? {
							...resource,
							permissionIds: getNewPermissionIds(resource.permissionIds || []),
					  }
					: resource,
			),
			isResourcesUpdates: true,
		}));
	};

	useEffect(() => {
		if (state.isResourcesUpdates) {
			getResources(state.resources);
		}
	}, [state.isResourcesUpdates]);

	/**
	 * Checks if a particular permission for
	 * a given resource has been toggled on or off
	 * @param {string} resourceId
	 * @param {string} permissionId
	 * @returns {boolean}
	 */
	const isResourcePermissionActive = (resourceId, permissionId) => {
		let isActive = false;
		// get the resource in question
		const resource = state.resources.filter((res) => res._id === resourceId)[0];

		/*
		 * it's active if it has the 'full access' toggled on or
		 * if the permission for this checkbox has been toggled on
		 */
		if (
			resource.permissionIds &&
			(resource.permissionIds.includes(
				state.mappedPermissions['full access'],
			) ||
				resource.permissionIds.includes(permissionId))
		) {
			isActive = true;
		}
		return isActive;
	};

	const headerPermissions = Object.keys(mappedPermissions).map((permission) => {
		return {
			field: permission,
			headerName: capitalize(permission),
			flex: 0.2,
			headerClassName: 'table-header',
			renderCell: ({ value }: GridCellParams) => (
				<Checkbox
					key={`${value}-${permission}}`}
					color="primary"
					size="small"
					icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
					checkedIcon={<CheckBoxIcon fontSize="small" />}
					checked={
						resources &&
						isResourcePermissionActive(
							value,
							state.mappedPermissions[permission],
						)
					}
					name={`${value}-${permission}`}
					onChange={togglePermission(value, permission)}
				/>
			),
		};
	});

	const columns: GridColDef[] = [
		{
			field: 'access_levels',
			headerName: 'Access levels',
			flex: 0.4,
			headerClassName: 'table-header',
		},
		...headerPermissions,
	];

	const rows = state.resources.map((resource: Resource) => ({
		id: resource.name,
		access_levels: resource.name,
		'full access': resource._id,
		view: resource._id,
		add: resource._id,
		edit: resource._id,
		delete: resource._id,
	}));

	return (
		<>
			<Typography
				variant="body2"
				color="textSecondary"
				style={{ paddingLeft: 6 }}
			>
				Permission access
			</Typography>
			<DashboardCard
				body={
					<div style={{ height: 400, width: '100%' }}>
						<div style={{ display: 'flex', height: '100%' }}>
							<div style={{ flexGrow: 1 }}>
								<DataGrid
									disableColumnMenu
									className={classes.root}
									rows={rows}
									pageSize={5}
									columns={columns.map((column) => ({
										...column,
										disableClickEventBubbling: true,
										sortable: false,
									}))}
									components={{
										LoadingOverlay: CustomLoadingOverlay,
									}}
								/>
							</div>
						</div>
					</div>
				}
			/>
		</>
		// <>
		// 	<Typography variant="body1" color="textPrimary">
		// 		Permission access
		// 	</Typography>
		//
		// 	<div className="permissions">
		// 		<div className="permissions__tbl-header">
		// 			<div className="permissions__tbl-header__column access-levels">
		// 				Access levels
		// 			</div>
		// 			{Object.keys(mappedPermissions).map((permissionString) => (
		// 				<div
		// 					key={permissionString}
		// 					className="permissions__tbl-header__column"
		// 				>
		// 					{`${capitalize(permissionString)}`}
		// 				</div>
		// 			))}
		// 		</div>
		//
		// 		<div className="permissions__tbl-body">
		// 			{state.resources.map((resource: Resource) => (
		// 				<div key={resource.name} className="permissions__tbl-row">
		// 					<div className="permissions__tbl-row__item header">
		// 						{resource.name}
		// 					</div>
		// 					{Object.keys(mappedPermissions).map((permission) => (
		// 						<div
		// 							key={`${resource.name}-${permission}}`}
		// 							className="permissions__tbl-row__item"
		// 						>
		// 							<Checkbox
		// 								color="primary"
		// 								icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
		// 								checkedIcon={<CheckBoxIcon fontSize="small" />}
		// 								checked={
		// 									resources.length > 0 &&
		// 									isResourcePermissionActive(
		// 										resource?._id,
		// 										mappedPermissions[permission],
		// 									)
		// 								}
		// 								name={`${resource.name}-${permission}`}
		// 								onChange={togglePermission(resource._id, permission)}
		// 							/>
		// 						</div>
		// 					))}
		// 				</div>
		// 			))}
		// 		</div>
		// 	</div>
		// </>
	);
};

export default PermissionAccess;
