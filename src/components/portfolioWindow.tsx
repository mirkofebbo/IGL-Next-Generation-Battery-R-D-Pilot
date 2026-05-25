import { Box, Typography } from "@mui/material";
import type { Project } from "../types";

export default function PortfolioWindow({ portfolio, id }: { portfolio: Project[] | null, id: string }) {

    if (!portfolio) {
        return (
            <>
                <Box sx={{ display: "flex" }}>
                    <Typography variant="h2" sx={{ width: "100%" }}>
                        {id}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <Typography variant="h6" color="text.secondary">
                        No project selected
                    </Typography>
                </Box>
            </>
        );
    }
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Typography variant="h2" sx={{ width: "100%" }}>
                    {id}
                </Typography>
            </Box>
        </>

    );
}
