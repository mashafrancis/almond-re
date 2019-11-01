// react libraries
import * as React from 'react';

// styles
import './Table.scss';

// interfaces
import { TableProps } from './interfaces';

/**
 * Returns Table components for assets
 *
 * @param {TableProps} props
 *
 * @returns {JSX} JSX
 */
const Table = (props: TableProps) => {
  const { keys, values } = props;
  const tableHeaders = Object.keys(keys);
  return (
    <React.Fragment>
      <div className="tbl-header">
        {
          tableHeaders.map((header, index) => {
            return (
              <div key={index} className={keys[header].colWidth
                ? `tbl-header__column--${keys[header].colWidth}`
                : 'tbl-header__column'}
              >
                {
                  keys[header].value || header
                }
              </div>
            );
          })
        }
      </div>
      {
        values.map((value) => {
          return (
            <div key={value.id} className={`tbl-row ${props.statusClass}`}>
              {
                tableHeaders.map((header, index) => {
                  return (
                    <div key={index} className={keys[header].colWidth
                      ? `tbl-row__column--${keys[header].colWidth}`
                      : 'tbl-row__column'}
                    >
                      {value[keys[header].valueKey]}
                    </div>
                  );
                })
              }
            </div>
          );
        })
      }
    </React.Fragment>
  );
};

export default Table;
