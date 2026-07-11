import { LeftoverDecisionCard, SavingsProgressCard } from "../components/goals";
import {
  Loading,
  PageHeader,
  Section,
  TransactionsTable,
} from "../components/common";
import { useGetGoals } from "../hooks";
import { normalizeData } from "../utils";

const Goals = () => {
  const { data, isPending } = useGetGoals();
  const goalsData = normalizeData(data?.goals);
  if (isPending) return <Loading />;
  return (
    <Section>
      <PageHeader variant="goals" />
      <LeftoverDecisionCard />
      <SavingsProgressCard />
      <TransactionsTable data={goalsData} variant="goals" />
    </Section>
  );
};

export default Goals;
