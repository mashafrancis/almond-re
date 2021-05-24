import {
	useTheme,
	experimentalStyled as styled,
} from '@material-ui/core/styles';
import {
	useMediaQuery,
	Grid,
	Typography,
	TextField,
	OutlinedInput,
	Button,
	Divider,
	Avatar,
	Badge,
	IconButton,
	InputLabel,
	FormControl,
	InputAdornment,
} from '@material-ui/core';
import { shallowEqual, useSelector } from 'react-redux';
import {
	AlternateEmailTwoTone,
	CameraAlt,
	EmailTwoTone,
	FaceTwoTone,
} from '@material-ui/icons';
import { ViewComponentProps } from '../../../../types/ViewComponentProps';
import { IRootState } from '../../../../store/rootReducer';

const Input = styled('input')({
	display: 'none',
});

const General = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
	const { firstName, lastName, email, photo } = useSelector(
		(globalState: IRootState) => globalState.user.userDetails,
		shallowEqual,
	);

	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	const renderUploadPhotoButton = () => (
		<FormControl fullWidth variant="outlined">
			<InputLabel htmlFor="outlined-adornment-password">
				Change profile photo
			</InputLabel>
			<OutlinedInput
				id="change-profile-photo"
				type="text"
				value="Change profile photo"
				onChange={() => {}}
				endAdornment={
					<InputAdornment position="end">
						<IconButton aria-label="change profile photo" edge="end">
							<Badge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={
									<label htmlFor="icon-button-file">
										<Input
											accept="image/*"
											id="icon-button-file"
											type="file"
										/>
										<IconButton
											color="primary"
											aria-label="upload picture"
											component="span"
										>
											<CameraAlt />
										</IconButton>
									</label>
								}
							>
								<Avatar alt={firstName} src={photo} />
							</Badge>
						</IconButton>
					</InputAdornment>
				}
				label="Change profile photo"
			/>
		</FormControl>
	);

	return (
		<div className={className} {...rest}>
			<Grid container spacing={isMd ? 4 : 2}>
				<Grid item xs={12}>
					<Typography variant="h6" color="textPrimary">
						Basic Information
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Divider />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						label="First Name"
						variant="outlined"
						size="medium"
						name="firstName"
						fullWidth
						type="text"
						defaultValue={firstName ?? ''}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton aria-label="firstName" edge="end">
										<FaceTwoTone color="primary" />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						label="Last Name"
						variant="outlined"
						size="medium"
						name="lastName"
						fullWidth
						type="text"
						defaultValue={lastName ?? ''}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton aria-label="lastName" edge="end">
										<FaceTwoTone color="primary" />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						label="Email Address"
						variant="outlined"
						size="medium"
						name="email"
						fullWidth
						type="email"
						defaultValue={email ?? ''}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton aria-label="email" edge="end">
										<AlternateEmailTwoTone color="primary" />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					{renderUploadPhotoButton()}
				</Grid>
				<Grid item xs={12}>
					<Divider />
				</Grid>
				<Grid item container justifyContent="flex-start" xs={12}>
					<Button
						fullWidth={!isMd}
						variant="contained"
						type="submit"
						color="primary"
						size="large"
					>
						Save
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default General;
