import dayjs from '@utils/dayjsTime';
import { Schedule } from '@modules/timeSchedules/interfaces';

/**
 * This function validates the new time schedules to be one hour apart
 * @returns boolean
 */
export const validateNewOneHourTime = (
	schedules: string[],
	newTime: string,
): boolean => {
	if (schedules.length === 0) return true;
	const diff = getDiff(newTime, schedules[schedules.length - 1]);
	return diff <= -3600000;
};

/**
 * This function validates the edited time schedules to be one hour apart
 * @returns boolean
 */
export const validateEditOneHourTime = (
	schedules: Schedule[],
	scheduleId: string,
	editTime: string,
): boolean => {
	const editScheduleIndex = schedules.findIndex(
		(item) => item._id === scheduleId,
	);
	const timeBefore =
		editScheduleIndex === 0 ? null : schedules[editScheduleIndex - 1].schedule;
	const timeAfter =
		editScheduleIndex === schedules.length - 1
			? null
			: schedules[editScheduleIndex + 1].schedule;

	if (timeBefore) {
		const diffBefore = getDiff(editTime, timeBefore);
		if (diffBefore > -3600000) return false;
	}
	if (timeAfter) {
		const diffAfter = getDiff(editTime, timeAfter);
		if (diffAfter < 3600000) return false;
	}
	return true;
};

/**
 * This function gets the time difference between the times passed in milliseconds
 * @returns number
 */
export const getDiff = (newTime: any, scheduleTime: string) => {
	const newTimeToSet = dayjs(newTime).second(0).millisecond(0);
	const [h, m] = scheduleTime.split(':');
	const scheduleTimeToCompare = dayjs()
		.hour(Number(h))
		.minute(Number(m))
		.second(0)
		.millisecond(0);
	return scheduleTimeToCompare.diff(newTimeToSet);
};
