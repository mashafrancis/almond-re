import { MqttClient } from 'mqtt';

export interface IMqttContext {
	status: string;
	mqtt: MqttClient | undefined;
}

export interface IUseSubscription {
	lastMessage?: IMessage;
	topic: string;
	mqtt?: MqttClient;
}

export interface IMessageStructure {
	[key: string]: string;
}

export interface IMessage {
	topic: string;
	message?: any | IMessageStructure | SensorData;
}

type SensorData = {
	[key: string]: Sensor;
};

type Sensor = {
	temp: number;
	humid: number;
	// eslint-disable-next-line camelcase
	water_level: number;
};

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
