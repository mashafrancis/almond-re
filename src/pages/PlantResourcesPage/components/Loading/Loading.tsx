import { List, ListItem, Skeleton } from '@material-ui/core';

interface Props {
	/**
	 * External classes
	 */
	className?: string;
	/**
	 * All other props
	 */
	[x: string]: any;
}

const Loading = ({ className, ...rest }: Props): JSX.Element => (
	<List className={className} {...rest}>
		<ListItem>
			<Skeleton variant="text" width={250} />
		</ListItem>
		<ListItem>
			<Skeleton variant="rectangular" width={200} height={25} />
		</ListItem>
		<ListItem>
			<Skeleton variant="text" width={250} />
		</ListItem>
		<ListItem>
			<Skeleton variant="rectangular" width={350} height={20} />
		</ListItem>
		<ListItem>
			<Skeleton variant="text" width={250} />
		</ListItem>
		<ListItem>
			<Skeleton variant="rectangular" width="100%" height={300} />
		</ListItem>
		<ListItem>
			<Skeleton variant="text" width={250} />
		</ListItem>
		<ListItem>
			<Skeleton variant="rectangular" width="100%" height={350} />
		</ListItem>
	</List>
);

export default Loading;
