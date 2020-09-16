// react libraries
import React from 'react';

// styles
import './Table.scss';

// interfaces
import { TableProps } from './interfaces';

/**
 * Returns Table components for assets
 *
 * @param {TableProps} props
 * @returns {JSX} JSX
 */
const Table = (props: TableProps): JSX.Element => {
  const { keys, values } = props;
  const tableHeaders = Object.keys(keys);
  return (
    <>
      <div className="tbl-header" data-testid="tbl-header">
        {
          tableHeaders.map((header, index) => 
            <div key={index} className={keys[header].colWidth
              ? `tbl-header__column--${keys[header].colWidth}`
              : 'tbl-header__column'}>
              <span data-testid="header-text" className="header-text">{keys[header].value || header}</span>
            </div>
          )
        }
      </div>
      {
        values.map(value => 
          <div key={value.id} className={`tbl-row ${props.statusClass}`}>
            {
              tableHeaders.map((header, index) => 
                <div key={index} className={keys[header].colWidth
                  ? `tbl-row__column--${keys[header].colWidth}`
                  : 'tbl-row__column'}>
                  <span data-testid="content-text" className="content-text">{value[keys[header].valueKey]}</span>
                </div>
              )
            }
          </div>
        )
      }
    </>
  );
};

export default Table;
