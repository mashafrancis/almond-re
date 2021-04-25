import { makeStyles } from '@material-ui/core/styles';
import { useGridSlotComponentProps } from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles({
	root: {
		display: 'flex',
	},
});

const CustomPagination = () => {
	const { state, apiRef } = useGridSlotComponentProps();
	const classes = useStyles();

	return (
		<Pagination
			className={classes.root}
			color="primary"
			shape="round"
			size="small"
			variant="outlined"
			count={state.pagination.pageCount}
			page={state.pagination.page + 1}
			onChange={(event, value) => apiRef.current.setPage(value - 1)}
		/>
	);
};

export default CustomPagination;
