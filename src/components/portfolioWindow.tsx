import React, { useMemo, useState } from "react";
import { Box, Typography, Stack, Menu, MenuItem } from "@mui/material";
import type { Project } from "../types";
import ProjectCard from "./projectCard";
import { getPortfolioMetaData, getProjectMetaData } from "./utils";
import PortfolioMetrics from "./portfolioMetrics";

export default function PortfolioWindow({ 
    id, currency, total_budget_eur, portfolio, setPortfolio,
    selectedHostInstitution, selectedSubtopic, riskScoreRange, groupBy 
}: { 
    id: string, currency: string, total_budget_eur: number, 
    portfolio: Project[] | null, setPortfolio: React.Dispatch<React.SetStateAction<Project[] | null>>,
    selectedHostInstitution: string, selectedSubtopic: string, riskScoreRange: number[],
    groupBy: "none" | "institution" | "subtopic" | "risk"
}) {

    if (!portfolio || portfolio.length === 0) {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%", p: 2 }}>
                <Box>
                    <Typography variant="h2" sx={{ width: "100%" }}>
                        {id}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Total Budget: {total_budget_eur} {currency}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
                    <Typography variant="h6" color="text.secondary">
                        No project selected
                    </Typography>
                </Box>
            </Box>
        );
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const portfolioMetaData = getPortfolioMetaData(portfolio);
    const projectMetaData = getProjectMetaData(portfolio); // Not used in current implementation, but can be calculated similarly to portfolioMetaData if needed
    const handleCardClick = (event: React.MouseEvent<HTMLElement>, project: Project) => {
        setAnchorEl(event.currentTarget);
        setActiveProject(project);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveProject(null);
    };

    const handleRemove = () => {
        if (activeProject) {
            setPortfolio(prev => {
                if (!prev) return null;
                return prev.filter(p => p.id !== activeProject.id);
            });
        }
        handleMenuClose();
    };

    const filteredPortfolio = useMemo(() => {
        return portfolio.filter((project) => {
            const matchesHostInstitution =
                selectedHostInstitution === "all" || project.host_institution === selectedHostInstitution;
            const matchesSubtopic = selectedSubtopic === "all" || project.subtopic === selectedSubtopic;
            const matchesRiskScore =
                project.risk_score >= riskScoreRange[0] && project.risk_score <= riskScoreRange[1];

            return matchesHostInstitution && matchesSubtopic && matchesRiskScore;
        });
    }, [portfolio, riskScoreRange, selectedHostInstitution, selectedSubtopic]);

    const renderProjectList = () => {
        if (groupBy === "none" || groupBy === "risk") {
            const projectsToRender = [...filteredPortfolio];
            if (groupBy === "risk") {
                projectsToRender.sort((a, b) => b.risk_score - a.risk_score);
            }
            return projectsToRender.map((project) => (
                <Box key={project.id} onClick={(e) => handleCardClick(e, project)} sx={{ cursor: 'pointer' }}>
                    <ProjectCard project={project} />
                </Box>
            ));
        }

        const groups: Record<string, Project[]> = {};
        for (const project of filteredPortfolio) {
            const key = groupBy === "institution" ? project.host_institution : project.subtopic;
            if (!groups[key]) groups[key] = [];
            groups[key].push(project);
        }

        return Object.keys(groups).sort().map((groupKey) => (
            <Box key={groupKey} sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ mb: 1, color: "text.primary", fontWeight: 'bold' }}>
                    {groupKey} ({groups[groupKey].length})
                </Typography>
                <Stack spacing={2}>
                    {groups[groupKey].map((project) => (
                        <Box key={project.id} onClick={(e) => handleCardClick(e, project)} sx={{ cursor: 'pointer' }}>
                            <ProjectCard project={project} />
                        </Box>
                    ))}
                </Stack>
            </Box>
        ));
    };

    return (

        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Box >
                <PortfolioMetrics id={id} total_budget_eur={total_budget_eur} currency={currency} portfolioMetaData={portfolioMetaData} projectMetaData={projectMetaData} />
            </Box>
            <Stack spacing={2} sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider", overflowY: "auto", flex: 1 }}>
                {renderProjectList()}
            </Stack>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleRemove} sx={{ color: 'error.main' }}>Remove from Portfolio</MenuItem>
            </Menu>
        </Box>
    );
}
