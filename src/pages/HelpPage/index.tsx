// react libraries

// icons
import { Help } from '@material-ui/icons';
// interfaces
import Grid from '@material-ui/core/Grid';

import GeneralCardInfo from '@components/molecules/GeneralCardInfo';

export const HelpPage = (): JSX.Element => (
	<Grid container item xs={12} spacing={2}>
		<GeneralCardInfo
			mainHeader="Help"
			subHeader="Get more information more about the system"
			icon={<Help className="content-icon general-info-icon" />}
		/>
	</Grid>
);

export default HelpPage;
