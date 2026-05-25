import { Box, Typography } from "@mui/material";
import useLoadData from "./components/loadData.tsx";
import PortfolioWindow from "./components/portfolioWindow.tsx";
import SelectionWindow from "./components/selectionWindow.tsx";

const LEFT_PANE_WIDTH = "40%";
const CENTER_PANE_WIDTH = "30%";
const RIGHT_PANE_WIDTH = "30%";

export default function App() {
  const { data, error, loading } = useLoadData();

  if (loading) return <Box sx={{ p: 2 }}>Loading projects...</Box>;
  if (error) return <Box sx={{ p: 2, color: "error.main" }}>{error}</Box>;

  return (
    <>
      <Typography variant="h4" sx={{ width: "100%" }}>
        {data?.programme}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", height: "100vh", width: "100vw" }}>

        <Box sx={{ width: LEFT_PANE_WIDTH, height: "100%", border: "1px solid", borderColor: "primary.light", margin: 1, borderRadius: 2 }}>
          <SelectionWindow />
        </Box>

        <Box sx={{ width: CENTER_PANE_WIDTH, height: "100%", border: "1px solid", borderColor: "primary.light", margin: 1, borderRadius: 2 }}>
          <PortfolioWindow />

        </Box>

        <Box sx={{ width: RIGHT_PANE_WIDTH, height: "100%", border: "1px solid", borderColor: "primary.light", margin: 1, borderRadius: 2 }}>
          <PortfolioWindow />

        </Box>
      </Box>
    </>

  );
}
