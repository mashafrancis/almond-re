import clsx from 'clsx';
import Typed from 'react-typed';
import { Typography } from '@material-ui/core';
import { TypedTextProps } from '@components/molecules/TypedText/interfaces';

/**
 * Component to display the typed animated texts
 *
 * @param {Object} props
 */
const TypedText = ({
	className,
	typedProps,
	...rest
}: TypedTextProps): JSX.Element => (
	<Typography className={clsx('typed-text', className)} {...rest}>
		<Typed className="typed-text__item" {...typedProps} />
	</Typography>
);

export default TypedText;
