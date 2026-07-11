import { Section } from "../components/common";
import {
  SummaryCards,
  Heading,
  RecentTransactions,
  Charts,
} from "../components/dashboard";

const Dashboard = () => {
  return (
    <Section>
      <Heading />
      <SummaryCards />
      <Charts />
      <RecentTransactions />
    </Section>
  );
};

export default Dashboard;
