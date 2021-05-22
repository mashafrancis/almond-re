import { useContext, useCallback } from 'react';
import { IClientSubscribeOptions } from 'mqtt';
import useEffectAsync from '@hooks/useEffectAsync';
import MqttContext from './Context';
import { IMqttContext as Context, IUseSubscription } from './types';

const useSubscription = (
	topic: string,
	options: IClientSubscribeOptions = {} as IClientSubscribeOptions,
): IUseSubscription => {
	const { client, connectionStatus, message } =
		useContext<Context>(MqttContext);

	const subscribe = useCallback(async () => {
		client?.subscribe(topic, options);
	}, [client, options, topic]);

	useEffectAsync(async () => {
		if (client?.connected) {
			await subscribe();
		}

		return () => {
			client?.unsubscribe(topic);
		};
	}, [client, subscribe]);

	return {
		client,
		topic,
		message,
		connectionStatus,
	};
};

export default useSubscription;
