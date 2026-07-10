import {
  FaChartBar,
  FaHome,
  GoGoal,
  IoWalletOutline,
  PiHandCoinsFill,
} from "../../assets/icons/icons";

export const useSidebarLinks = () => {
  const links = [
    { i18nKey: "sidebar.dashboard", path: "/dashboard", icon: FaHome },
    {
      i18nKey: "sidebar.transactions",
      path: "/transactions",
      icon: PiHandCoinsFill,
    },
    { i18nKey: "sidebar.budget", path: "/budget", icon: IoWalletOutline },
    { i18nKey: "sidebar.goals", path: "/goals", icon: GoGoal },
    { i18nKey: "sidebar.analytics", path: "/analytics", icon: FaChartBar },
  ];

  return links;
};
