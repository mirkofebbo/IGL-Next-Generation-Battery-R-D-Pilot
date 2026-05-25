import { useState } from "react";
import { Box, Typography } from "@mui/material";
import type { Project } from "./types.tsx";

import useLoadData from "./components/loadData.tsx";
import PortfolioWindow from "./components/portfolioWindow.tsx";
import SelectionWindow from "./components/selectionWindow.tsx";

const LEFT_PANE_WIDTH = "40%";
const CENTER_PANE_WIDTH = "30%";
const RIGHT_PANE_WIDTH = "30%";

export default function App() {
  const { data, error, loading } = useLoadData();  // Loading the project.json fil;e

  const [portfolio1, setPortfolio1] = useState<Project[] | null>(null);
  const [portfolio2, setPortfolio2] = useState<Project[] | null>(null);


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
