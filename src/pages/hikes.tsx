import PageContainer from '@/components/ui/pageContainer';
import StatsSection from '@/components/ui/statsSection';

export default function Hikes() {
	return (
		<PageContainer title="Hikes" userId={0}>
			<StatsSection
				firstYear={undefined}
				selectedDate={''}
				setSelectedDate={() => {}}
				options={[]}
				title="Past four weeks"
			>
				<p>Hikes component</p>
			</StatsSection>
		</PageContainer>
	);
}
