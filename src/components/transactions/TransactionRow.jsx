import { useTranslation } from "react-i18next";
import { formatPrice, formatTranslatedText } from "../../utils";

const TransactionRow = ({ item, children }) => {
  const { t, i18n } = useTranslation();
  const isDepositToGoal = item.description?.includes("إيداع في الهدف");
  const target = isDepositToGoal
    ? item.description?.split(":")?.[1]?.trim()
    : null;

  return (
    <div className="border-bottom flex items-center px-3 py-5">
      <p
        className={`flex-1 ${item.type === "expense" ? "text-red-500" : "text-green-500"}`}
      >
        {formatTranslatedText(item.category, "categories", t, i18n)}
      </p>
      <p
        className={`flex-1 ${item.type === "expense" ? "text-red-500" : "text-green-500"}`}
      >
        {item.type === "expense" ? "-" : "+"}{" "}
        {formatPrice(Number(item.amount), i18n.language)}
      </p>
      <p className="flex-1">{item.date}</p>
      <p className="flex-1 truncate rtl:text-end">
        {isDepositToGoal
          ? t("goals.depositToGoal", { target })
          : item.description}
      </p>
      {children}
    </div>
  );
};

export default TransactionRow;
