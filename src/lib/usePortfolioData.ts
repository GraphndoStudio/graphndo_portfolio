
import { useState, useEffect } from "react";
import { getPortfolioData } from "./db-service";

export function usePortfolioData() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const result = await getPortfolioData();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch portfolio data", err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  return { data, loading };
}
