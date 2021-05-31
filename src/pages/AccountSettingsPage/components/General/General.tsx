import { useState } from 'react';
import {
	useTheme,
	experimentalStyled as styled,
	makeStyles,
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
import validate from 'validate.js';
import Axios from 'axios';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
	AlternateEmailTwoTone,
	CameraAlt,
	FaceTwoTone,
} from '@material-ui/icons';
import useFormState from '@hooks/useFormState';
import { editUserDetails } from '@modules/user';
import CircularProgress from '@material-ui/core/CircularProgress';
import authService from '@utils/auth';
import { ViewComponentProps } from '../../../../types/ViewComponentProps';
import { IRootState } from '../../../../store/rootReducer';

const useStyles = makeStyles((theme) => ({
	progressIcon: {
		color: theme.palette.primary.contrastText,
	},
}));

const Input = styled('input')({
	display: 'none',
});

const schema = {
	email: {
		presence: { allowEmpty: false, message: 'is required' },
		email: true,
		length: {
			maximum: 300,
		},
	},
	firstName: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 120,
		},
	},
	lastName: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 120,
		},
	},
	photo: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 120,
		},
	},
};

const General = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [allowedFields, useAllowedFields] = useState<string[]>([]);
	const [selectedPhoto, setSelectedPhoto] = useState<any>();
	const [isPhotoPicked, setIsPhotoPicked] = useState<boolean>(false);

	const {
		userDetails: { _id, firstName, lastName, email, photo },
		isLoading,
	} = useSelector((globalState: IRootState) => globalState.user, shallowEqual);

	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	const handleChange = (event) => {
		useAllowedFields((prevState) => [...prevState, event.target.name]);
		if (event.target.name === 'photo') {
			setSelectedPhoto(() => event.target.files[0]);
			setIsPhotoPicked(() => true);
		}
		handleFormChange(event);
	};

	const filteredSchema = Object.keys(schema)
		.filter((key) => allowedFields.includes(key))
		.reduce(
			(obj, key) => ({
				...obj,
				[key]: schema[key],
			}),
			{},
		);

	const getUserProfilePhotoUrl = async (): Promise<string> => {
		const formData = new FormData();
		formData.append('file', selectedPhoto);

		try {
			const response = await Axios.post(
				`${process.env.ALMOND_API}/upload_photo`,
				formData,
				{
					headers: {
						Authorization: `Basic ${authService.getToken()}`,
					},
				},
			);
			return response.data.data as string;
		} catch (e) {
			return e.response ? e.response : e;
		}
	};

	const { values, isValid, errors, hasError, handleFormChange, handleSubmit } =
		useFormState({
			onSubmit: async (userDetails) =>
				dispatch(
					editUserDetails(_id, {
						...userDetails,
						...(values.photo && { photo: await getUserProfilePhotoUrl() }),
					}),
				),
			formErrors: (formValues) => validate(formValues, filteredSchema),
		});

	const renderUploadPhotoButton = () => (
		// <Button
		// 	fullWidth
		// 	name="photo"
		// 	variant="text"
		// 	type="button"
		// 	color="primary"
		// 	size="medium"
		// 	endIcon={
		// 		<IconButton aria-label="change profile photo" edge="end">
		// 			<Badge
		// 				overlap="circular"
		// 				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		// 				badgeContent={
		// 					<label htmlFor="upload-photo">
		// 						<Input
		// 							name="photo"
		// 							accept="image/*"
		// 							id="upload-photo"
		// 							type="file"
		// 							onChange={handleChange}
		// 							value={values.photo ?? ''}
		// 						/>
		// 						<IconButton
		// 							color="primary"
		// 							aria-label="upload picture"
		// 							component="span"
		// 						>
		// 							<CameraAlt />
		// 						</IconButton>
		// 					</label>
		// 				}
		// 			>
		// 				<Avatar alt={firstName} src={photo} />
		// 			</Badge>
		// 		</IconButton>
		// 	}
		// >
		// 	{isPhotoPicked ? selectedPhoto.name : 'Change profile photo'}
		// </Button>
		<FormControl fullWidth variant="outlined">
			<InputLabel htmlFor="outlined-adornment-password">
				Change profile photo
			</InputLabel>
			<OutlinedInput
				name="photo"
				id="change-profile-photo"
				type="text"
				value={isPhotoPicked ? selectedPhoto.name : 'Change profile photo'}
				onChange={handleChange}
				endAdornment={
					<InputAdornment position="end">
						<IconButton aria-label="change profile photo" edge="end">
							<Badge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={
									<label htmlFor="upload-photo">
										<Input
											name="photo"
											accept="image/*"
											id="upload-photo"
											type="file"
											onChange={handleChange}
											value={values.profilePhoto ?? ''}
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
			<form method="post" onSubmit={handleSubmit}>
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
							helperText={hasError('firstName') ? errors.firstName[0] : null}
							error={hasError('firstName')}
							onChange={handleChange}
							value={values.firstName ?? firstName ?? ''}
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
							helperText={hasError('lastName') ? errors.lastName[0] : null}
							error={hasError('lastName')}
							onChange={handleChange}
							value={values.lastName ?? lastName ?? ''}
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
							helperText={hasError('email') ? errors.email[0] : null}
							error={hasError('email')}
							onChange={handleChange}
							value={values.email ?? email ?? ''}
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
					<Grid item xs={isMd ? 6 : 12}>
						<Button
							fullWidth
							variant="contained"
							type="submit"
							color="primary"
							size="large"
							disabled={!isValid}
						>
							{isLoading ? (
								<CircularProgress
									className={classes.progressIcon}
									size="2em"
								/>
							) : (
								'Send'
							)}
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default General;
