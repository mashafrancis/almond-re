export const props = {
	getEnvironmentData: jest.fn(() => Promise.resolve()),
	// displaySnackMessage: jest.fn(() => Promise.resolve()),
	environmentData: {
		currentTemperature: 10,
		currentHumidity: 10,
		humidity: 10,
		temperature: 10,
	},
};
