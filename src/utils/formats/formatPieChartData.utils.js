const LIGHT_COLORS = [
  "#2563EB",
  "#16A34A",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#EC4899",
  "#84CC16",
  "#F97316",
  "#14B8A6",
];

const DARK_COLORS = [
  "#60A5FA",
  "#4ADE80",
  "#FBBF24",
  "#F87171",
  "#C084FC",
  "#22D3EE",
  "#F472B6",
  "#A3E635",
  "#FB923C",
  "#2DD4BF",
];

export const formatPieChartData = (
  data,
  isDarkMode,
  t,
  i18n
) => {
  const COLORS = isDarkMode
    ? DARK_COLORS
    : LIGHT_COLORS;

  return data?.map((item, index) => {
    const key = `categories.${item.categoryName}`;

    return {
      ...item,
      total: Number(item.totalExpenses),
      categoryName: i18n.exists(key)
        ? t(key)
        : item.categoryName.charAt(0).toUpperCase() +
          item.categoryName.slice(1),

      fill: COLORS[index % COLORS.length],
    };
  });
};
