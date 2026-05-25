import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import type { Project } from "./types.tsx";

import useLoadData from "./components/loadData";
import PortfolioWindow from "./components/portfolioWindow";
import SelectionWindow from "./components/selectionWindow";

const LEFT_PANE_WIDTH = "40%";
const CENTER_PANE_WIDTH = "30%";
const RIGHT_PANE_WIDTH = "30%";
const PORTFOLIO_1_STORAGE_KEY = "portfolio-1-project-ids";
const PORTFOLIO_2_STORAGE_KEY = "portfolio-2-project-ids";

export default function App() {
  const { data, error, loading } = useLoadData();  // Loading the project.json fil;e

  const [portfolio1, setPortfolio1] = useState<Project[] | null>(null);
  const [portfolio2, setPortfolio2] = useState<Project[] | null>(null);

  useEffect(() => {
    if (!data) return;

    const restorePortfolio = (storageKey: string): Project[] | null => {
      const storedValue = localStorage.getItem(storageKey);
      if (!storedValue) return null;

      try {
        const ids = JSON.parse(storedValue) as number[];
        if (!Array.isArray(ids)) return null;

        const restoredProjects = ids
          .map((id) => data.projects.find((project) => project.id === id))
          .filter((project): project is Project => Boolean(project));

        return restoredProjects.length > 0 ? restoredProjects : null;
      } catch {
        return null;
      }
    };

    setPortfolio1(restorePortfolio(PORTFOLIO_1_STORAGE_KEY));
    setPortfolio2(restorePortfolio(PORTFOLIO_2_STORAGE_KEY));
  }, [data]);

  useEffect(() => {
    if (portfolio1) {
      localStorage.setItem(
        PORTFOLIO_1_STORAGE_KEY,
        JSON.stringify(portfolio1.map((project) => project.id)),
      );
      return;
    }

    localStorage.removeItem(PORTFOLIO_1_STORAGE_KEY);
  }, [portfolio1]);

  useEffect(() => {
    if (portfolio2) {
      localStorage.setItem(
        PORTFOLIO_2_STORAGE_KEY,
        JSON.stringify(portfolio2.map((project) => project.id)),
      );
      return;
    }

    localStorage.removeItem(PORTFOLIO_2_STORAGE_KEY);
  }, [portfolio2]);
  // Handle loading and error states
  if (loading) return <Box sx={{ p: 2 }}>Loading projects...</Box>;
  if (error) return <Box sx={{ p: 2, color: "error.main" }}>{error}</Box>;
  if (!data) return <Box sx={{ p: 2, color: "error.main" }}>No project data available.</Box>;

  return (
    <>
      <Typography variant="h4" sx={{ width: "100%" }}>
        {data.programme}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", height: "100vh", width: "100vw" }}>

        <Box sx={{ width: LEFT_PANE_WIDTH, height: "100%", border: "1px solid", borderColor: "primary.light", margin: 1, borderRadius: 2 }}>
          <SelectionWindow data={data.projects} setPortfolio1={setPortfolio1} setPortfolio2={setPortfolio2} />
        </Box>

        <Box sx={{ width: CENTER_PANE_WIDTH, height: "100%", border: "1px solid", borderColor: "primary.light", margin: 1, borderRadius: 2 }}>
          <PortfolioWindow id="Portfolio A" currency={data.currency} total_budget_eur={data.total_budget_eur} portfolio={portfolio1} />
        </Box>

        <Box sx={{ width: RIGHT_PANE_WIDTH, height: "100%", border: "1px solid", borderColor: "primary.light", margin: 1, borderRadius: 2 }}>
          <PortfolioWindow id="Portfolio B" currency={data.currency} total_budget_eur={data.total_budget_eur} portfolio={portfolio2} />
        </Box>
        
      </Box>
    </>

  );
}
