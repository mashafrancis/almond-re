// react libraries
import SpaIcon from '@material-ui/icons/Spa';
import Grid from '@material-ui/core/Grid';
// components
import { GeneralCardInfo } from '@components/molecules';

export const SupportPage = (): JSX.Element => (
	<Grid container item xs={12} style={{ margin: 0, padding: 0 }}>
		<Grid
			item
			container
			direction="column"
			justify="flex-start"
			alignItems="stretch"
			spacing={1}
			xs
			style={{ margin: 0, padding: 0 }}
		>
			<GeneralCardInfo
				mainHeader="Support"
				subHeader="Need help? Ask for support from our maintenance team"
				icon={<SpaIcon className="content-icon general-info-icon" />}
			/>
		</Grid>
	</Grid>
);

export default SupportPage;
