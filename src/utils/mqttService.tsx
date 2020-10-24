import { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const clientId = `almond_${Math.random().toString(16).substr(2, 8)}`;

const brokerUrl = `mqtts://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`;
const options = {
	username: process.env.MQTT_USER,
	password: process.env.MQTT_PASSWORD,
	keepalive: 30,
	clientId,
	protocolId: 'MQTT',
	protocolVersion: 4,
	clean: false,
	reconnectPeriod: 1000,
	connectTimeout: 30 * 1000,
	// will: {
	// 	topic: 'almond/lastWill',
	// 	payload: 'Connection Closed abnormally..!',
	// 	qos: 0,
	// 	retain: false,
	// },
	// key: bufferKey,
	// cert: bufferCert,
	// ca: bufferCA,
	rejectUnauthorized: false,
};

const mqttService = () => {
	const [connectionStatus, setConnectionStatus] = useState<boolean>(false);
	const [messages, setMessages] = useState<string[]>([]);

	useEffect(() => {
		const client = mqtt.connect(brokerUrl, options);
		client.on('connect', () => setConnectionStatus(true));
		client.subscribe('almond/data');
		client.on('message', (topic, payload, packet) => {
			setMessages(messages.concat(payload.toString()));
		});
	}, []);

	console.log(
		'Class: , Function: mqttService, Line 41 connectionStatus():',
		connectionStatus,
	);

	return (
		<>
			{messages.map((message) => (
				<h2 key={clientId}>{message}</h2>
			))}
		</>
	);
};

export default mqttService;
