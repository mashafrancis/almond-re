import { Typography } from '@material-ui/core';

interface Props {
	/**
	 * External classes
	 */
	className?: string;
	/**
	 * Description
	 */
	description: string;
	/**
	 * Title
	 */
	title: string;
	/**
	 * All other props
	 */
	[x: string]: any;
}

const Headline = ({
	title,
	description,
	className,
	...rest
}: Props): JSX.Element => (
	<div className={className} {...rest}>
		<Typography variant="h4" gutterBottom>
			{title}
		</Typography>
		<Typography variant="h6">{description}</Typography>
	</div>
);

export default Headline;
