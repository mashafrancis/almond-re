import { MqttClient } from 'mqtt';

export interface Error {
	name: string;
	message: string;
	stack?: string;
}

export interface IMqttContext {
	connectionStatus: string | Error;
	client: MqttClient | null;
	message?: IMessage;
}

export interface IUseSubscription {
	message?: IMessage;
	topic: string | string[];
	client?: MqttClient | null;
	connectionStatus: string | Error;
}

export interface IMessageStructure {
	[key: string]: string | number;
}

export interface IMessage {
	topic: string;
	message?: any | IMessageStructure | string;
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
