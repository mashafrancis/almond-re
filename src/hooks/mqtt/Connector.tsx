import { useCallback, useEffect, useRef, useState } from 'react';
import { connect, MqttClient } from 'mqtt';
import { Error, IMessage } from '@hooks/mqtt/types';
import useDeepCompareEffect from '@hooks/useDeepEffect';
import useEffectAsync from '@hooks/useEffectAsync';
import MqttContext from './Context';
import { ConnectorProps } from './interfaces';

const Connector = ({
	brokerUrl,
	children,
	options = { keepalive: 0 },
	parserMethod,
}: ConnectorProps) => {
	const mountedRef = useRef<boolean>(true);
	const [connectionStatus, setStatus] = useState<string | Error>('Offline');
	const [client, setClient] = useState<MqttClient | null>(null);
	const [message, setMessage] = useState<IMessage>();

	const mqttConnect = useCallback(async () => {
		try {
			setStatus('Connecting');
			const mqtt = connect(brokerUrl, options);
			mqtt.setMaxListeners(0);
			mqtt.on('connect', () => {
				if (mountedRef.current) {
					setClient(mqtt);
					setStatus('Connected');
				}
			});
			mqtt.on('reconnect', () => {
				if (mountedRef.current) {
					setStatus('Reconnecting');
				}
			});
			mqtt.on('error', (error) => {
				if (mountedRef.current) {
					setStatus(error?.message);
				}
			});
			mqtt.on('offline', () => {
				if (mountedRef.current) {
					setStatus('Offline');
				}
			});
			mqtt.on('end', () => {
				if (mountedRef.current) {
					setStatus('Offline');
				}
			});
		} catch (error) {
			setStatus(error);
		}
	}, [brokerUrl, options, client]);

	useDeepCompareEffect(() => {
		if (client) {
			client?.on('message', (topic, msg) => {
				const payload = {
					topic,
					message: parserMethod?.(msg) || msg.toString(),
				};
				setMessage(payload);
			});
		} else {
			mqttConnect();
		}

		// return () => {
		// 	mountedRef.current = false;
		// 	client?.end();
		// };
	}, [client, mqttConnect, parserMethod]);

	return (
		<MqttContext.Provider value={{ connectionStatus, client, message }}>
			{children}
		</MqttContext.Provider>
	);
};

export default Connector;
