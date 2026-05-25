import { Box } from "@mui/material";
import useLoadData from "./components/loadData.tsx";

const LEFT_PANE_WIDTH = "20%";
const CENTER_PANE_WIDTH = "40%";
const RIGHT_PANE_WIDTH = "40%";

export default function App() {
  const { data, error, loading } = useLoadData();

  if (loading) return <Box sx={{ p: 2 }}>Loading projects...</Box>;
  if (error) return <Box sx={{ p: 2, color: "error.main" }}>{error}</Box>;

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", height: "100vh", width: "100vw" }}>

        <Box sx={{ width: LEFT_PANE_WIDTH, height: "100%", border: "1px solid", borderColor: "primary.light", margin: 1, borderRadius: 2 }}>
          <Box sx={{ p: 2 }}>
            {data?.programme}
          </Box>
        </Box>

        <Box sx={{ width: CENTER_PANE_WIDTH, height: "100%", border: "1px solid", borderColor: "primary.light", margin: 1, borderRadius: 2 }}>


        </Box>

        <Box sx={{ width: RIGHT_PANE_WIDTH, height: "100%", border: "1px solid", borderColor: "primary.light", margin: 1, borderRadius: 2 }}>

        </Box>
      </Box>
    </>

  );
}
