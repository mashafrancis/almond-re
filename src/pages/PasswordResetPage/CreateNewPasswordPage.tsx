import { Image } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import { HeroShaped } from '@components/organisms';
import { ChangePasswordForm } from '@pages/PasswordResetPage/components/Form';
import { useStyles } from '@pages/PasswordResetPage/PasswordResetPage';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store/rootReducer';

const CreateNewPasswordPage = (): JSX.Element => {
	const classes = useStyles();

	const { isLoading } = useSelector(
		(globalState: IRootState) => globalState.authentication,
	);

	return (
		<div className={classes.root}>
			<HeroShaped
				leftSide={
					<div className={classes.formContainer}>
						<SectionHeader
							title="Create password"
							subtitle="Enter your new password."
							titleProps={{
								variant: 'h3',
							}}
						/>
						<ChangePasswordForm isLoading={isLoading} />
					</div>
				}
				rightSide={
					<Image
						src="https://assets.maccarianagency.com/the-front/photos/account/cover-4.jpg"
						className={classes.image}
						lazy={false}
					/>
				}
			/>
		</div>
	);
};

export default CreateNewPasswordPage;
