import { useSearchParams } from "react-router-dom";
import { useGetCurrentUser } from "../../hooks";
import { Text } from "../common";
import { DateRangeToggle } from "./index";
const currentMonth = new Date().getMonth() + 1;

const monthLabels = {
  [currentMonth]: "thisMonth",
  [currentMonth - 1]: "lastMonth",
  [currentMonth - 2]: "monthBeforeLast",
};

const Heading = () => {
  const { data } = useGetCurrentUser();
  const [searchParams] = useSearchParams();

  const selectedMonth = Number(searchParams.get("month")) || currentMonth;
  return (
    <div className="border-bottom m-0">
      <Text
        tagElement="h1"
        className="text-primary text-lg font-bold md:text-2xl"
        i18nKey="dashboard.welcome"
        values={{ name: data.first_name }}
      />
      <div className="flex m-0 flex-col space-y-2 md:flex-row">
        <Text
          tagElement="p"
          i18nKey="dashboard.subtitle"
          className="text-secondary flex-start"
        >
          <Text
            i18nKey={`dates.${monthLabels[selectedMonth]}`}
            className="text-accent px-1 font-semibold"
          />
        </Text>
        <DateRangeToggle />
      </div>
    </div>
  );
};

export default Heading;
