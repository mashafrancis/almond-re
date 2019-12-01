// react libraries
import * as React from 'react';

// styles
import '../Loader.scss';
import './WaterCyclesSkeleton.scss';

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
      <div className="tbl-header__column--40">Time</div>
      <div className="tbl-header__column--50">Actions</div>
      <div className="tbl-header__column">Status</div>
    </div>
  );
};

const WaterCyclesPageLoader = () => {
  return (
    <div className="schedule-table-loader">
      {TableHeader()}
      {TableRow()}
      {TableRow()}
      {TableRow()}
      {TableRow()}
      {TableRow()}
    </div>
  );
};

export default WaterCyclesPageLoader;
