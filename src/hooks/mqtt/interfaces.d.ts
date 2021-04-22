import { ReactNode } from 'react';
import { IClientOptions } from 'mqtt';

export interface ConnectorProps {
	// eslint-disable-next-line @typescript-eslint/ban-types
	brokerUrl?: string | object;
	children: ReactNode;
	options?: IClientOptions;
	parserMethod?: (message) => string;
}
