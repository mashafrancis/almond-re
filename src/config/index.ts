import dotenv from 'dotenv';

interface Config {
	mqtt: {
		user: string;
		password: string;
		host: string;
		port: number | null | undefined;
		protocol: string;
		server: string;
	};
}

export const config: Config = {
	mqtt: {
		user: process.env.MQTT_USER,
		password: process.env.MQTT_PASSWORD,
		host: process.env.MQTT_HOST,
		port: parseInt(process.env.MQTT_PORT, 10),
		protocol: process.env.MQTT_PROTOCOL,
		server: process.env.MQTT_SERVER,
	},
};

// 5.9.248.150
