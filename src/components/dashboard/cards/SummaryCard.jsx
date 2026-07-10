import { Spinner, Text } from "../../common";
import { FaArrowUp, IoArrowRedoSharp } from "../../../assets/icons/icons";
import { formatPrice } from "../../../utils";
import { useTranslation } from "react-i18next";

const SummaryCards = ({
  variant,
  i18nKey,
  amount,
  percentageChange,
  children,
  isPending,
}) => {
  const { i18n } = useTranslation();
  const cardStyle = variant === "expense" ? "text-red-500" : variant === "income" ? "text-green-500" : "text-accent"
  return (
    <div className="card">
      <div className="flex-between">
        <Text i18nKey={i18nKey} className="text-muted font-semibold" />
        <span className={`text-accent text-2xl ${cardStyle}`}>{children}</span>
      </div>
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <h3
            className={`text-3xl font-semibold ${cardStyle}`}
          >
            {formatPrice(Number(amount) || 0, i18n.language)}
          </h3>
          <span
            className={`${percentageChange >= 0 ? "text-green-400" : "text-red-500"} flex-start gap-2`}
          >
            <span className="rtl:rotate-y-180">
              <IoArrowRedoSharp />
            </span>
            <span dir="ltr">{percentageChange || 0}%</span>
          </span>
        </>
      )}
    </div>
  );
};

export default SummaryCards;
