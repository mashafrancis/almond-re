import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { SectionHeader } from '@components/molecules';
import { ViewComponentProps } from '../../../../types/ViewComponentProps';

const Story = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<div className={className} {...rest}>
			<SectionHeader
				title="Our story"
				subtitle="We believe it is urgent we rediscover what food should be about: fresh, tasty, nutritious, easily accessible — and grown in a sustainable manner, every day. At Almond, we are reimagining the future of food for the better, for everyone."
				align={isMd ? 'center' : 'left'}
				disableGutter
				subtitleProps={{
					color: 'textPrimary',
					variant: 'body1',
				}}
			/>
		</div>
	);
};

export default Story;
