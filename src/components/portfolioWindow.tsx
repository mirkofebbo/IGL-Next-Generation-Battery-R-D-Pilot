import { Box, Typography } from "@mui/material";
import type { Project } from "../types";

export default function PortfolioWindow({ id, currency, total_budget_eur, portfolio }: { id: string, currency: string, total_budget_eur: number, portfolio: Project[] | null }) {

    if (!portfolio) {
        return (
            <>
                <Box sx={{ display: "flex" }}>
                    <Typography variant="h2" sx={{ width: "100%" }}>
                        {id}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Total Budget: {total_budget_eur} {currency}
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
                {portfolio.map((project) => (
                    <Box key={project.id} sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                        <Typography variant="h3">{project.id}</Typography>
                        <Typography variant="body1" color="text.secondary">
                            {project.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {project.description}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </>

    );
}
