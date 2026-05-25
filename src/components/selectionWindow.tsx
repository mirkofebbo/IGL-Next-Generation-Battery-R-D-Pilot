import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import type { Project, ProjectMetaData } from "../types";
import GetMetaData from "./getMetaData";

export default function SelectionWindow({ data, setPortfolio1, setPortfolio2 }: { data: Project[], setPortfolio1: (portfolio: Project[] | null) => void, setPortfolio2: (portfolio: Project[] | null) => void }) {
    const metaData: ProjectMetaData = GetMetaData(data);
    const [hostInstitutions, setHostInstitutions] = useState<string[]>([]);
    const [subtopics, setSubtopics] = useState<string[]>([]);
    const [riskScoreRange, setRiskScoreRange] = useState<number[]>([]);
    
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Typography variant="h2" sx={{ width: "100%" }}>
                    Selection Window
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Total Projects: {metaData.total_projects} | Unique Subtopics: {metaData.unique_subtopics} | Unique Host Institutions: {metaData.unique_host_institutions}
                </Typography>
            </Box>
        </>

    );
}
