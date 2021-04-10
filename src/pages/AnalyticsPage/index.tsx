import { useContext } from 'react';
import { UserContext } from '@context/UserContext';
// interfaces
import AdminAnalytics from '@pages/AnalyticsPage/AdminAnalytics';
import RegularUserAnalytics from '@pages/AnalyticsPage/RegularUserAnalytics';

export const AnalyticsPage = (): JSX.Element => {
	const { isAdmin } = useContext(UserContext);

	return isAdmin ? <AdminAnalytics /> : <RegularUserAnalytics />;
};

export default AnalyticsPage;
