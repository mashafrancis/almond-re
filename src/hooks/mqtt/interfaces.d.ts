import { ReactNode } from 'react';
import { IClientOptions } from 'mqtt';

export interface ConnectorProps {
	brokerUrl?: string;
	children: ReactNode;
	opts?: IClientOptions;
}
