import { useCallback, useState } from 'react';

type TStatus = 'IDLE' | 'PROCESSING' | 'ERROR' | 'SUCCESS';

const useAsyncTask = <T extends any[], R = any>(
	task: (...args: T) => Promise<R>,
) => {
	const [status, setStatus] = useState<TStatus>('IDLE');
	const [message, setMessage] = useState<string>('');

	const run = useCallback(async (...arg: T) => {
		setStatus('PROCESSING');
		try {
			const response: R = await task(...arg);
			setStatus('SUCCESS');
			return response;
		} catch (error) {
			const errorMessage =
				error?.response?.data?.error?.message || error.message;
			setMessage(errorMessage);
			setStatus('ERROR');
			throw error;
		}
	}, []);

	const reset = useCallback(() => {
		setMessage('');
		setStatus('IDLE');
	}, []);

	return {
		run,
		status,
		message,
		reset,
	};
};

export default useAsyncTask;

// Usage
// const task = useAsyncTask(async (data: any) => await myApiRequest(data));
// task.run(data);
// useEffect(() => {
//   console.log(task.status); // 'IDLE' | 'PROCESSING' | 'ERROR' | 'SUCCESS';
// }, task.status);
