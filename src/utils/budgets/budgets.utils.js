export const checkBudgetWarning = (budgets, transaction) => {
  const budget = budgets?.Budgets?.find(
    (b) => b.category.name === transaction.category,
  );

  if (!budget) {
    return false;
  }

  const newTotalSpent = Number(budget.total_spent) + Number(transaction.amount);

  const limit = Number(budget.limit_amount);

  return newTotalSpent >= limit * 0.8;
};
