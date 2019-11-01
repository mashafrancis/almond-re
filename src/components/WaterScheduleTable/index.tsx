import * as moment from 'moment';
import * as React from 'react';

// components
import { ScheduleTableContext } from '@components/Context';
import Switch from '@components/SwitchButton';
import Table from '@components/Table';

export const WaterScheduleTable = () => (
  <ScheduleTableContext.Consumer>
    {({ schedules, ActionButtons, handleToggleStatusChange, statusClass }) => {
      const tableHeaders = {
        Time: { valueKey: 'time', colWidth: '40' },
        Actions: { valueKey: 'actions', colWidth: '50' },
        Status: { valueKey: 'status' },
      };

      const tableValues = Object.entries(schedules).map(schedule => ({
        id: schedule,
        time: `${moment(schedule[1].schedule).format('LT')}`,
        actions: ActionButtons(schedule[1]._id),
        status: <Switch
          checked={schedule[1].enabled}
          onClick={e => handleToggleStatusChange(e, schedule[1])}
        />,
      }));

      return (
        <Table
          keys={tableHeaders}
          values={tableValues}
          statusClass={statusClass}
        />
      );
    }}
  </ScheduleTableContext.Consumer>
);

export default WaterScheduleTable;
