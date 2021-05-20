import { GeneralCardInfo } from '@components/molecules';
import MemoryTwoToneIcon from '@material-ui/icons/MemoryTwoTone';
// interfaces
import Grid from '@material-ui/core/Grid';

export const EnergyMonitoringPage = (): JSX.Element => (
	<Grid container item xs={12} spacing={2}>
		<GeneralCardInfo
			mainHeader="Energy Monitoring"
			subHeader="Power readings from the system and daily usage"
			icon={<MemoryTwoToneIcon className="content-icon general-info-icon" />}
		/>
	</Grid>
);

export default EnergyMonitoringPage;
