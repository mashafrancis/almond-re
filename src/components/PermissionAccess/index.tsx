// react libraries
import React, { useEffect, useState } from 'react';

// components
import Checkbox from '@material/react-checkbox';

// interfaces

// helpers
import capitalize from '@utils/capitalize';
import { Permission, Resource } from '@modules/userRoles/interfaces';
import { PermissionAccessProps, PermissionAccessState } from './interfaces';
import { useEffectAsync } from '../../hooks';

const PermissionAccess = (props: PermissionAccessProps): JSX.Element => {
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
		resources: [],
		permissions: [],
	});

	useEffectAsync(async () => {
		await setState((prevState) => ({
			...prevState,
			resources: props.resources,
			permissions: props.permissions,
		}));
		if (state.resources.length && state.permissions.length) {
			/*
			 * Force the order of the permissions to start with full access
			 * and end with delete
			 */
			Object.keys(mappedPermissions).forEach((permissionString: string) => {
				// @ts-expect-error
				mappedPermissions[permissionString] = state.permissions.find(
					(permissionObject: Permission) =>
						permissionObject.type.toLowerCase() === permissionString,
				)._id;
			});
		}
	}, []);

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			resources: props.resources,
			permissions: props.permissions,
		}));

		Object.keys(mappedPermissions).forEach((permissionString: string) => {
			const permissionKey = state.permissions.find(
				(permissionObject: Permission) =>
					permissionObject.type.toLowerCase() === permissionString,
			);

			if (permissionKey) {
				mappedPermissions[permissionString] = permissionKey._id;
			}
		});
	}, [props.resources]);

	useEffect(() => {
		props.getResources(state.resources);
	}, []);

	/**
	 * Toggle a permission on or off for each of the resources
	 * @param {string} resourceId
	 * @param {string} permissionType
	 * @returns {void}
	 */
	const togglePermission = (resourceId, permissionType) => () => {
		const permissionId = mappedPermissions[permissionType];
		// this takes the current permission Ids for the given resource and toggles the value within that array
		let getNewPermissionIds;
		// if this is the full access permission
		if (mappedPermissions['full access'] === permissionId) {
			getNewPermissionIds = (currentPermissionIds) =>
				// switch off all permissions if the user toggles off 'full access' otherwise make it the only one
				currentPermissionIds.includes(permissionId) ? [] : [permissionId];
		} else {
			getNewPermissionIds = (currentPermissionIds) => {
				/*
				 * if current permissions contain 'full access', it should be removed and every other permission
				 * asides the one that was clicked, should be added
				 */
				if (currentPermissionIds.includes(mappedPermissions['full access'])) {
					return Object.values(mappedPermissions).filter(
						(currentPermissionId) =>
							currentPermissionId !== permissionId &&
							currentPermissionId !== mappedPermissions['full access'],
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
			resources: prevState.resources.map((resource: Resource) =>
				resource._id === resourceId
					? {
							...resource,
							// @ts-expect-error
							permissionIds: getNewPermissionIds(resource.permissionIds || []),
					  }
					: resource,
			),
		}));
	};

	/**
	 * Checks if a particular permission for
	 * a given resource has been toggled on or off
	 * @param {string} resourceId
	 * @param {string} permissionId
	 * @returns {boolean}
	 */
	const isResourcePermissionActive = (resourceId, permissionId) => {
		// let isActive = false;
		// get the resource in question
		const resource: any = state.resources.filter(
			(resource: Resource) => resource._id === resourceId,
		)[0];
		/*
		 * it's active if it has the 'full access' toggled on or
		 * if the permission for this checkbox has been toggled on
		 */
		return (
			resource.permissionIds &&
			(resource.permissionIds.includes(mappedPermissions['full access']) ||
				resource.permissionIds.includes(permissionId))
		);
	};
	return (
		<div className="add-role-form__content__row">
			<p className="row-label">Permission access</p>
			<div className="permissions">
				<div className="permissions__tbl-header">
					<div className="permissions__tbl-header__column access-levels">
						Access levels
					</div>
					{Object.keys(mappedPermissions).map((permissionString) => (
						<div
							key={permissionString}
							className="permissions__tbl-header__column"
						>
							{`${capitalize(permissionString)}`}
						</div>
					))}
				</div>
				<div className="permissions__tbl-body">
					{state.resources &&
						state.resources.map((resource: Resource) => (
							<div key={resource._id} className="permissions__tbl-row">
								<div className="permissions__tbl-row__item header">
									{resource.name}
								</div>
								{Object.keys(mappedPermissions).map((permission) => (
									<div
										key={`${resource.name}-${permission}}`}
										className="permissions__tbl-row__item"
									>
										<Checkbox
											checked={
												props.resources &&
												isResourcePermissionActive(
													resource._id,
													mappedPermissions[permission],
												)
											}
											name={`${resource.name}-${permission}`}
											onChange={togglePermission(resource._id, permission)}
										/>
									</div>
								))}
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default PermissionAccess;
