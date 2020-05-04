import * as moment from 'moment';

export const validateOneHourTime = (schedules: string[], newTime: string) => {
  const oneHour = 60 * 60 * 1000;

  for (let i = 0; i < schedules.length; i += 1) {
    const current = moment(newTime).format('hh:mm:ss');
    const availableSchedule = moment(schedules[i]).format('hh:mm:ss');
    const diff = moment(current, 'H:mm:ss').diff(moment(availableSchedule, 'H:mm:ss'));
    if (Math.abs(diff) < oneHour) {
      return true;
    }
  }
};
