// react libraries
import * as React from 'react';

// styles
import '../Loader.scss';
import './UserRolesSkeleton.scss';

const TableRow = () => {
  return (
    <div className="tbl-row loading">
      <span className="loading"/>
    </div>
  );
};

const TableHeader = () => {
  return (
    <div className="tbl-header">
      <div className="tbl-header__column--20">Role</div>
      <div className="tbl-header__column--40">Description</div>
      <div className="tbl-header__column--15">Users</div>
      <div className="tbl-header__column--5">Actions</div>
    </div>
  );
};

const UserRolesPageLoader = () => {
  return (
    <div className="user-roles-page-loader">
      {TableHeader()}
      {TableRow()}
      {TableRow()}
      {TableRow()}
      {TableRow()}
      {TableRow()}
      {TableRow()}
      {TableRow()}
    </div>
  );
};

export default UserRolesPageLoader;
