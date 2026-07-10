import {
  AnalyticsBarChart,
  AverageStatistics,
  FinancialInsights,
  SavingsLineChart,
} from "../components/analytics";
import { Loading, PageHeader, Section } from "../components/common";
import { useGetSummaryAnalytics, useSummaryStatistics } from "../hooks";

const Analytics = () => {
  const { data, isPending } = useGetSummaryAnalytics();
  const {
    data: { average, highest, comparison, insights },
  } = useSummaryStatistics();

  if (isPending) return <Loading />;
  return (
    <Section>
      <PageHeader variant="analysis" />
      <div className="flex-between m-0 mt-4 flex-col flex-wrap items-stretch gap-3 lg:flex-row">
        <AnalyticsBarChart data={data} />
        <SavingsLineChart data={data} />
      </div>
      <div className="flex-start m-0 mt-4 flex-col flex-wrap items-stretch gap-3 md:justify-between lg:flex-row">
        <AverageStatistics average={average} highest={highest} />
        <FinancialInsights comparison={comparison} insights={insights} />
      </div>
    </Section>
  );
};

export default Analytics;
