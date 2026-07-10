import { useQuery } from "@tanstack/react-query";
import { analytics } from "../../services/analytics.service";

export const useAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: analytics,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};
