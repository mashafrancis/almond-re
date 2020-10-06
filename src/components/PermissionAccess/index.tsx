// react libraries
import React, { useEffect, useState } from 'react';
// components
import CheckBox from '@components/CheckBox';
// helpers
import capitalize from '@utils/capitalize';
// interfaces
import { Permission, Resource } from '@modules/userRoles/interfaces';
import { PermissionAccessProps, PermissionAccessState } from './interfaces';

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
	});

	// const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
	// const [allResources, setAllResources] = useState<Resource[]>([...resources]);

	const updateState = async () => {
		await setState((prevState) => ({
			...prevState,
			resources,
			permissions,
		}));
		// await setAllPermissions(permissions);
		// await setAllResources(resources);
	};

	useEffect(() => {
		updateState();
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
		// setState((prevState) => ({
		// 	...prevState,
		// 	resources,
		// 	permissions,
		// }));
		updateState();

		Object.keys(mappedPermissions).forEach((permissionString: string) => {
			const permissionKey = permissions.find(
				(permissionObject: Permission) =>
					permissionObject.type.toLowerCase() === permissionString,
			);

			if (permissionKey) {
				mappedPermissions[permissionString] = permissionKey._id;
			}
		});
	}, [resources]);

	useEffect(() => {
		getResources(state.resources);
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
							_id: getNewPermissionIds(resource?._id || []),
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
		let isActive = false;
		// get the resource in question
		const resource = state.resources.filter(
			(res: Resource) => res._id === resourceId,
		)[0];
		/*
		 * it's active if it has the 'full access' toggled on or
		 * if the permission for this checkbox has been toggled on
		 */
		if (
			resource._id &&
			(resource?._id.includes(mappedPermissions['full access']) ||
				resource?._id.includes(permissionId))
		) {
			isActive = true;
		}
		return isActive;
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
					{state.resources.map((resource: Resource) => (
						<div key={resource.name} className="permissions__tbl-row">
							<div className="permissions__tbl-row__item header">
								{resource.name}
							</div>
							{Object.keys(mappedPermissions).map((permission) => (
								<div
									key={`${resource.name}-${permission}}`}
									className="permissions__tbl-row__item"
								>
									<CheckBox
										checked={
											resources.length > 0 &&
											isResourcePermissionActive(
												resource?._id,
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
