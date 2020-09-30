import dayjs from '@utils/dayjsTime';

/**
 * This function validates the time schedules to be one hour apart
 * @returns boolean
 */
const validateOneHourTime = (schedules: string[], newTime: string): boolean => {
	let diff: number | undefined = 0;
	const oneHour = 60 * 60 * 1000;

	schedules.map((schedule) => {
		const current = dayjs.utc(newTime).format('hh:mm:ss');
		const availableSchedule = dayjs.utc(schedule).format('hh:mm:ss');
		diff = dayjs(current, 'H:mm:ss').diff(dayjs(availableSchedule, 'H:mm:ss'));
		return diff;
	});

	return Math.abs(diff) < oneHour;
};

export default validateOneHourTime;
