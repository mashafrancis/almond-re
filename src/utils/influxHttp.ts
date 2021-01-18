// third-party libraries
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import authService from '@utils/auth';

const cacheAdapter = setupCache({
	maxAge: 15 * 60 * 1000,
});

// const token = process.env.GRAFANA_TOKEN;
const token = authService.getToken();

const influxHttp = axios.create({
	baseURL: process.env.DATA_API,
	headers: {
		Authorization: `Bearer ${token}`,
	},
	adapter: cacheAdapter.adapter,
});

export default influxHttp;
