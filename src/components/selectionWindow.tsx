import React, { useMemo, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Slider, Stack, Typography, Menu } from "@mui/material";
import type { Project, ProjectMetaData } from "../types";
import GetMetaData from "./getMetaData";
import ProjectCard from "./projectCard";

export default function SelectionWindow({ data, setPortfolio1, setPortfolio2 }: { data: Project[], setPortfolio1: React.Dispatch<React.SetStateAction<Project[] | null>>, setPortfolio2: React.Dispatch<React.SetStateAction<Project[] | null>> }) {
    const metaData: ProjectMetaData = GetMetaData(data);
    const [selectedHostInstitution, setSelectedHostInstitution] = useState<string>("all");
    const [selectedSubtopic, setSelectedSubtopic] = useState<string>("all");
    const [riskScoreRange, setRiskScoreRange] = useState<number[]>([0, 10]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [activeProject, setActiveProject] = useState<Project | null>(null);

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

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>

            <Stack spacing={2} sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                    {/* title */}
                    <Typography variant="h5">Selection Window</Typography>
                    {/* Optional metadata display */}
                    {/* <Typography variant="body2" color="text.secondary">
                        Total Projects: {metaData.total_projects} | Unique Subtopics: {metaData.unique_subtopics} | Unique Host Institutions: {metaData.unique_host_institutions}
                    </Typography> */}
                    {/* Showing slection counter */}
                    <Typography variant="h6" color="text.secondary">
                        Matching Projects: {filteredProjects.length} / {metaData.total_projects}
                    </Typography>
                </Box>

                <FormControl fullWidth size="small">
                    <InputLabel id="host-institution-select-label">Host Institution</InputLabel>
                    <Select<string>
                        labelId="host-institution-select-label"
                        value={selectedHostInstitution}
                        label="Host Institution"
                        onChange={(event) => setSelectedHostInstitution(event.target.value)}
                    >
                        <MenuItem value="all">All Host Institutions</MenuItem>
                        {metaData.list_of_unique_host_institutions
                            .slice()
                            .sort((a, b) => a.localeCompare(b))
                            .map((institution) => (
                                <MenuItem key={institution} value={institution}>
                                    {institution}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                    <InputLabel id="subtopic-select-label">Subtopic</InputLabel>
                    <Select<string>
                        labelId="subtopic-select-label"
                        value={selectedSubtopic}
                        label="Subtopic"
                        onChange={(event) => setSelectedSubtopic(event.target.value)}
                    >
                        <MenuItem value="all">All Subtopics</MenuItem>
                        {metaData.list_of_unique_subtopics
                            .slice()
                            .sort((a, b) => a.localeCompare(b))
                            .map((subtopic) => (
                                <MenuItem key={subtopic} value={subtopic}>
                                    {subtopic}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>

                <Box>
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
            </Stack >

            <Stack spacing={2} sx={{ p: 1, width: "100%", overflowY: "auto" }}>
                {filteredProjects.map((project) => (
                    <Box key={project.id} onClick={(e) => handleCardClick(e, project)}>
                        <ProjectCard project={project} />
                    </Box>
                ))}
            </Stack>

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
