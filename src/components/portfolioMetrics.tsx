import { useState } from "react";
import { Box, Typography, Collapse } from "@mui/material";
import type { PortfolioMetaData, ProjectMetaData } from "../types";
import { getRiskColor } from "./utils";

export default function PortfolioMetrics({ id, total_budget_eur, currency, portfolioMetaData, projectMetaData }: { id: string, total_budget_eur: number, currency: string, portfolioMetaData: PortfolioMetaData, projectMetaData: ProjectMetaData }) {
    const riskColor = getRiskColor(portfolioMetaData.average_risk_score);
    const [isExpanded, setIsExpanded] = useState(false);

    return (

        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Portfolio Major Metrics */}
            <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h2">
                    {id}
                </Typography>
                <Box>
                    <Box
                        sx={{
                            bgcolor: riskColor,
                            color: 'white',
                            px: 1,
                            borderRadius: 1,
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                        }}
                    >
                        <Typography variant="body1">
                            Risk avg: {portfolioMetaData.average_risk_score}
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ px: 1, mt: 0.5 }}>
                        Budget Left: {(total_budget_eur - portfolioMetaData.total_budget_eur) / 1000000}M {currency}
                    </Typography>
                </Box>
            </Box>
            {/* ON CLICK INTERACTION */}
            <Box 
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{ 
                    p: 1, 
                    textAlign: "center", 
                    cursor: "pointer", 
                    bgcolor: "action.hover",
                    borderBottom: "1px solid", 
                    borderColor: "divider",
                    '&:hover': { bgcolor: 'action.selected' }
                }}
            >
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                    {isExpanded ? "▲ HIDE METRICS" : "▼ SHOW METRICS"}
                </Typography>
            </Box>

            <Collapse in={isExpanded}>
                {/* Portfolio MetaData */}
                <Box sx={{ display: "flex", gap: 2, p: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Total Projects: {projectMetaData.total_projects}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Unique Subtopics: {projectMetaData.unique_subtopics}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Unique Host Institutions: {projectMetaData.unique_host_institutions}
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Avg. Peer Review Score: {portfolioMetaData.average_peer_review_score}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Avg. Duration: {portfolioMetaData.average_duration_months} months
                        </Typography>
                    </Box>
                </Box>
                {/* Portfolio Distributions */}
                <Box sx={{ display: "flex", gap: 2, p: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                            Distribution of Subtopics
                        </Typography>
                        {Object.entries(portfolioMetaData.distribution_of_subtopics).map(([subtopic, count]) => (
                            <Typography key={subtopic} variant="body2" color="text.secondary">
                                • {subtopic}: {count}
                            </Typography>
                        ))}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                            Distribution of Host Institutions
                        </Typography>
                        {Object.entries(portfolioMetaData.distribution_of_host_institutions).map(([institution, count]) => (
                            <Typography key={institution} variant="body2" color="text.secondary">
                                • {institution}: {count}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Collapse>
        </Box>
    );
}
