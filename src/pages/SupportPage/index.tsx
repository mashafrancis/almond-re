// react libraries
import SpaIcon from '@material-ui/icons/Spa';
import Grid from '@material-ui/core/Grid';
// components
import { GeneralCardInfo } from '@components/molecules';

export const SupportPage = (): JSX.Element => (
	<Grid container item xs={12}>
		<Grid
			item
			container
			direction="column"
			justifyContent="flex-start"
			alignItems="stretch"
			spacing={1}
			xs
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
