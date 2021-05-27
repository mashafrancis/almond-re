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
import validate from 'validate.js';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
	AlternateEmailTwoTone,
	CameraAlt,
	FaceTwoTone,
} from '@material-ui/icons';
import useFormState from '@hooks/useFormState';
import { editUserDetails } from '@modules/user';
import { ChangeEvent, useState } from 'react';
import { ViewComponentProps } from '../../../../types/ViewComponentProps';
import { IRootState } from '../../../../store/rootReducer';

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
};

const General = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
	const { _id, firstName, lastName, email, photo } = useSelector(
		(globalState: IRootState) => globalState.user.userDetails,
		shallowEqual,
	);

	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	const dispatch = useDispatch();

	const [allowedFields, useAllowedFields] = useState<string[]>([]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		useAllowedFields((prevState) => [...prevState, event.target.name]);
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

	const { values, isValid, errors, hasError, handleFormChange, handleSubmit } =
		useFormState({
			onSubmit: (userDetails) => dispatch(editUserDetails(_id, userDetails)),
			formErrors: (formValues) => validate(formValues, filteredSchema),
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
				onChange={handleFormChange}
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
			<form method="post" onSubmit={handleSubmit} noValidate>
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
						>
							Save
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default General;
