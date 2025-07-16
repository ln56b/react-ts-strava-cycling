import PageContainer from '@/components/ui/pageContainer';
import StatsSection from '@/components/ui/statsSection';
import { useAuth } from '@/providers/authProvider';
import { useActivitiesStore } from '@/stores/activitiesStore';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

export default function Dashboard() {
	const { loginToStravaAction } = useAuth();
	const { loading } = useActivitiesStore();

	const [searchParams] = useSearchParams();

	useEffect(() => {
		const code = searchParams.get('code');
		if (code) loginToStravaAction(code);
	}, [searchParams, loginToStravaAction]);

	return (
		<div className="flex justify-center items-center my-[100px] lg:px-2">
			<PageContainer title="Dashboard" userId={0} loading={loading}>
				<StatsSection>
					<p>Hikes component</p>
				</StatsSection>
			</PageContainer>
		</div>
	);
}
