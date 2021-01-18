import { getBackendSrv } from '@grafana/runtime';
import { QueryParams } from '../shared.interfaces';

const grafanaRequest = async (query: QueryParams, url: string) => {
	return getBackendSrv().datasourceRequest({
		method: 'GET',
		url: `${process.env.GRAFANA_API}${url}`,
		params: query,
	});
};

export default grafanaRequest;
