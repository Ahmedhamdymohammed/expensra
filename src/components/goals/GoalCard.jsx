import { formatPrice } from "../../utils";
import { Text } from "../common";

const GoalCard = ({ amount, title, children }) => {
  return (
    <div className="flex-start my-3 min-w-fit">
      <span className="bg-muted rounded-md p-3 text-3xl">
        <span className="text-accent">{children}</span>
      </span>
      <span className="flex flex-col px-3">
        <Text i18nKey={`transactions.${title}`} className="text-secondary" />
        <span className="font-semibold">{formatPrice(amount || 0)}</span>
      </span>
    </div>
  );
};

export default GoalCard;
