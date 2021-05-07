// third-party libraries
import { Grid } from '@material-ui/core';
import { SecurityTwoTone } from '@material-ui/icons';
// components
import { GeneralCardInfo } from '@components/molecules';

export const QualityCheckPage = (): JSX.Element => (
	<Grid container item xs={12} spacing={2}>
		<GeneralCardInfo
			mainHeader="Quality Check"
			subHeader="Tests for water quality, salts and ph level"
			icon={<SecurityTwoTone className="content-icon general-info-icon" />}
		/>
	</Grid>
);

export default QualityCheckPage;
