import { useContext } from 'react';
import MqttContext from './Context';
import { IMqttContext as Context } from './types';

const useMqttState = () => {
	const { connectionStatus, client, message } =
		useContext<Context>(MqttContext);

	return { connectionStatus, client, message };
};

export default useMqttState;
