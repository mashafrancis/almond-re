import GeneralCardInfo from '@components/molecules/GeneralCardInfo';
import MemoryTwoToneIcon from '@material-ui/icons/MemoryTwoTone';
// interfaces
import Grid from '@material-ui/core/Grid';

export const EnergyMonitoringPage = (): JSX.Element => (
	<Grid container item xs={12} style={{ margin: 0, padding: 0 }}>
		<Grid
			item
			container
			direction="column"
			justifyContent="flex-start"
			alignItems="stretch"
			spacing={1}
			xs
			style={{ margin: 0, padding: 0 }}
		>
			<GeneralCardInfo
				mainHeader="Energy Monitoring"
				subHeader="Power readings from the system and daily usage"
				icon={<MemoryTwoToneIcon className="content-icon general-info-icon" />}
			/>
		</Grid>
	</Grid>
);

export default EnergyMonitoringPage;
