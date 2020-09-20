import React, { useState, useEffect, createContext } from 'react';
import { ViewportContextProps } from '@context/ViewportContext/interfaces';

const ViewportContext = createContext({
	width: 0,
	height: 0,
});

const ViewportProvider = ({ children }: ViewportContextProps) => {
	const [width, setWidth] = useState<number>(window.innerWidth);
	const [height, setHeight] = useState<number>(window.innerHeight);

	const handleWindowResize = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	};

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize);
		return () => window.removeEventListener('resize', handleWindowResize);
	}, []);

	return (
		<ViewportContext.Provider
			value={{
				width,
				height,
			}}
		>
			{children}
		</ViewportContext.Provider>
	);
};

const ViewportConsumer = ViewportContext.Consumer;
export { ViewportContext, ViewportProvider, ViewportConsumer };
