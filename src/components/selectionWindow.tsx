import React, { useMemo, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Slider, Stack, Typography, Menu } from "@mui/material";
import type { Project, ProjectMetaData } from "../types";
import { getProjectMetaData } from "./utils";
import ProjectCard from "./projectCard";

export default function SelectionWindow({ 
    data, setPortfolio1, setPortfolio2,
    selectedHostInstitution, setSelectedHostInstitution,
    selectedSubtopic, setSelectedSubtopic,
    riskScoreRange, setRiskScoreRange,
    groupBy, setGroupBy
}: { 
    data: Project[], 
    setPortfolio1: React.Dispatch<React.SetStateAction<Project[] | null>>, 
    setPortfolio2: React.Dispatch<React.SetStateAction<Project[] | null>>,
    selectedHostInstitution: string,
    setSelectedHostInstitution: React.Dispatch<React.SetStateAction<string>>,
    selectedSubtopic: string,
    setSelectedSubtopic: React.Dispatch<React.SetStateAction<string>>,
    riskScoreRange: number[],
    setRiskScoreRange: React.Dispatch<React.SetStateAction<number[]>>,
    groupBy: "none" | "institution" | "subtopic" | "risk",
    setGroupBy: React.Dispatch<React.SetStateAction<"none" | "institution" | "subtopic" | "risk">>
}) {
    const metaData: ProjectMetaData = getProjectMetaData(data);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [activeProject, setActiveProject] = useState<Project | null>(null);

    // Handler to set the project ot the portfolio
    const handleCardClick = (event: React.MouseEvent<HTMLElement>, project: Project) => {
        setAnchorEl(event.currentTarget);
        setActiveProject(project);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveProject(null);
    };

    const handleAddToPortfolio = (portfolioSetter: React.Dispatch<React.SetStateAction<Project[] | null>>) => {
        if (activeProject) {
            portfolioSetter(prev => {
                if (!prev) return [activeProject];
                if (prev.find(p => p.id === activeProject.id)) return prev;
                return [...prev, activeProject];
            });
        }
        handleMenuClose();
    };

    const handleResetFilters = () => {
        setSelectedHostInstitution("all");
        setSelectedSubtopic("all");
        setRiskScoreRange([0, 10]);
        setGroupBy("none");
    };

    // Filter projects based on selected criteria
    const filteredProjects = useMemo(() => {
        return data.filter((project) => {
            const matchesHostInstitution =
                selectedHostInstitution === "all" || project.host_institution === selectedHostInstitution;
            const matchesSubtopic = selectedSubtopic === "all" || project.subtopic === selectedSubtopic;
            const matchesRiskScore =
                project.risk_score >= riskScoreRange[0] && project.risk_score <= riskScoreRange[1];

            return matchesHostInstitution && matchesSubtopic && matchesRiskScore;
        });
    }, [data, riskScoreRange, selectedHostInstitution, selectedSubtopic]);

    // Dynamic options for dropdowns based on current filters
    const availableInstitutions = useMemo(() => {
        const filtered = data.filter(p =>
            (selectedSubtopic === "all" || p.subtopic === selectedSubtopic) &&
            (p.risk_score >= riskScoreRange[0] && p.risk_score <= riskScoreRange[1])
        );
        return Array.from(new Set(filtered.map(p => p.host_institution))).sort((a, b) => a.localeCompare(b));
    }, [data, selectedSubtopic, riskScoreRange]);

    const availableSubtopics = useMemo(() => {
        const filtered = data.filter(p =>
            (selectedHostInstitution === "all" || p.host_institution === selectedHostInstitution) &&
            (p.risk_score >= riskScoreRange[0] && p.risk_score <= riskScoreRange[1])
        );
        return Array.from(new Set(filtered.map(p => p.subtopic))).sort((a, b) => a.localeCompare(b));
    }, [data, selectedHostInstitution, riskScoreRange]);

    const renderProjectList = () => {
        if (groupBy === "none" || groupBy === "risk") {
            const projectsToRender = [...filteredProjects];
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
        for (const project of filteredProjects) {
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

    // Render the selection window with filters and project cards
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>

            <Stack spacing={2} sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", ml: 1, mr: 1 }}>
                    <Box component="img" src="/nesta-logo.png" alt="Nesta" sx={{ height: 40, ml: 1, mr: 2, p: 0 }} />
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", mt: 1 }}>
                        {/* title */}
                        <Typography variant="h5">Selection Window</Typography>
                        {/* Showing slection counter */}
                        <Typography variant="h6" color="text.secondary">
                            Matching Projects: {filteredProjects.length} / {metaData.total_projects}
                        </Typography>
                    </Box>
                </Box>

                {/* Host Institution Dropdown */}
                <FormControl fullWidth size="small">
                    <InputLabel id="host-institution-select-label">Host Institution</InputLabel>
                    <Select<string>
                        labelId="host-institution-select-label"
                        value={selectedHostInstitution}
                        label="Host Institution"
                        onChange={(event) => setSelectedHostInstitution(event.target.value)}
                    >
                        <MenuItem value="all">All Host Institutions</MenuItem>
                        {availableInstitutions.map((institution) => (
                            <MenuItem key={institution} value={institution}>
                                {institution}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Subtopic Dropdown */}
                <FormControl fullWidth size="small">
                    <InputLabel id="subtopic-select-label">Subtopic</InputLabel>
                    <Select<string>
                        labelId="subtopic-select-label"
                        value={selectedSubtopic}
                        label="Subtopic"
                        onChange={(event) => setSelectedSubtopic(event.target.value)}
                    >
                        <MenuItem value="all">All Subtopics</MenuItem>
                        {availableSubtopics.map((subtopic) => (
                            <MenuItem key={subtopic} value={subtopic}>
                                {subtopic}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Group / Sort By Dropdown */}
                <FormControl fullWidth size="small">
                    <InputLabel id="group-by-select-label">Group / Sort By</InputLabel>
                    <Select<string>
                        labelId="group-by-select-label"
                        value={groupBy}
                        label="Group / Sort By"
                        onChange={(event) => setGroupBy(event.target.value as any)}
                    >
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value="institution">Group by Institution</MenuItem>
                        <MenuItem value="subtopic">Group by Subtopic</MenuItem>
                        <MenuItem value="risk">Order by Risk (High to Low)</MenuItem>
                    </Select>
                </FormControl>

                {/* Risk Score Slider and Reset */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography gutterBottom>
                            Risk Score Range: {riskScoreRange[0]} - {riskScoreRange[1]}
                        </Typography>
                        <Box sx={{ px: 1 }}>
                            <Slider
                                value={riskScoreRange}
                                min={0}
                                max={10}
                                step={1}
                                valueLabelDisplay="auto"
                                onChange={(_, newValue) => {
                                    if (Array.isArray(newValue)) {
                                        setRiskScoreRange(newValue as number[]);
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                    <Button variant="outlined" color="primary" onClick={handleResetFilters}>
                        Reset Filters
                    </Button>
                </Box>
            </Stack >
            {/* Project List */}
            <Stack spacing={2} sx={{ p: 1, width: "100%", overflowY: "auto" }}>
                {renderProjectList()}
            </Stack>

            {/* Context Menu for Adding to Portfolio */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleAddToPortfolio(setPortfolio1)}>Add to Portfolio A</MenuItem>
                <MenuItem onClick={() => handleAddToPortfolio(setPortfolio2)}>Add to Portfolio B</MenuItem>
            </Menu>
        </Box >);
}
