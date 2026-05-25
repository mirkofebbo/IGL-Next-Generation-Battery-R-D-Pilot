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

  const [selectedHostInstitution, setSelectedHostInstitution] = useState<string>("all");
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("all");
  const [riskScoreRange, setRiskScoreRange] = useState<number[]>([0, 10]);

  useEffect(() => {
    if (!data) return;

    const restorePortfolio = (storageKey: string): Project[] => {
      const storedValue = localStorage.getItem(storageKey);
      if (!storedValue) return [];

      try {
        const ids = JSON.parse(storedValue) as string[];
        if (!Array.isArray(ids)) return [];

        const restoredProjects = ids
          .map((id) => data.projects.find((project) => project.id === id))
          .filter((project): project is Project => Boolean(project));

        return restoredProjects;
      } catch {
        return [];
      }
    };

    setPortfolio1(prev => prev === null ? restorePortfolio(PORTFOLIO_1_STORAGE_KEY) : prev);
    setPortfolio2(prev => prev === null ? restorePortfolio(PORTFOLIO_2_STORAGE_KEY) : prev);
  }, [data]);

  useEffect(() => {
    if (portfolio1 !== null) {
      localStorage.setItem(
        PORTFOLIO_1_STORAGE_KEY,
        JSON.stringify(portfolio1.map((project) => project.id)),
      );
    }
  }, [portfolio1]);

  useEffect(() => {
    if (portfolio2 !== null) {
      localStorage.setItem(
        PORTFOLIO_2_STORAGE_KEY,
        JSON.stringify(portfolio2.map((project) => project.id)),
      );
    }
  }, [portfolio2]);
  // Handle loading and error states
  if (loading) return <Box sx={{ p: 2 }}>Loading projects...</Box>;
  if (error) return <Box sx={{ p: 2, color: "error.main" }}>{error}</Box>;
  if (!data) return <Box sx={{ p: 2, color: "error.main" }}>No project data available.</Box>;

  return (
    <>
      {/* <Typography variant="h4" sx={{ width: "100%" }}>
        {data.programme}
      </Typography> */}
      <Box sx={{ display: "flex", flexDirection: "row", height: "100vh", width: "100vw", overflow: "hidden", p: 1, gap: 1, boxSizing: "border-box" }}>

        <Box sx={{ width: LEFT_PANE_WIDTH, height: "100%", border: "1px solid", borderColor: "primary.light", borderRadius: 2, overflow: "hidden" }}>
          <SelectionWindow 
            data={data.projects} 
            setPortfolio1={setPortfolio1} 
            setPortfolio2={setPortfolio2} 
            selectedHostInstitution={selectedHostInstitution}
            setSelectedHostInstitution={setSelectedHostInstitution}
            selectedSubtopic={selectedSubtopic}
            setSelectedSubtopic={setSelectedSubtopic}
            riskScoreRange={riskScoreRange}
            setRiskScoreRange={setRiskScoreRange}
          />
        </Box>

        <Box sx={{ width: CENTER_PANE_WIDTH, height: "100%", border: "1px solid", borderColor: "primary.light", borderRadius: 2, overflow: "hidden" }}>
          <PortfolioWindow 
            id="Portfolio A" 
            currency={data.currency} 
            total_budget_eur={data.total_budget_eur} 
            portfolio={portfolio1} 
            setPortfolio={setPortfolio1} 
            selectedHostInstitution={selectedHostInstitution}
            selectedSubtopic={selectedSubtopic}
            riskScoreRange={riskScoreRange}
          />
        </Box>

        <Box sx={{ width: RIGHT_PANE_WIDTH, height: "100%", border: "1px solid", borderColor: "primary.light", borderRadius: 2, overflow: "hidden" }}>
          <PortfolioWindow 
            id="Portfolio B" 
            currency={data.currency} 
            total_budget_eur={data.total_budget_eur} 
            portfolio={portfolio2} 
            setPortfolio={setPortfolio2} 
            selectedHostInstitution={selectedHostInstitution}
            selectedSubtopic={selectedSubtopic}
            riskScoreRange={riskScoreRange}
          />
        </Box>
        
      </Box>
    </>

  );
}
