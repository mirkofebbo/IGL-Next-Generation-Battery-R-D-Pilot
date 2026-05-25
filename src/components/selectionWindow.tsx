import { Box, Typography } from "@mui/material";
import type { Project } from "../types";

export default function SelectionWindow( { setPortfolio1, setPortfolio2 }: { setPortfolio1: (portfolio: Project[] | null) => void, setPortfolio2: (portfolio: Project[] | null) => void }) {


    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Typography variant="h2" sx={{ width: "100%" }}>
                    Selection Window
                </Typography>
            </Box>
        </>

    );
}
