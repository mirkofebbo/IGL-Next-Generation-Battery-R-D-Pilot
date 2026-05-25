import { useMemo, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Slider, Stack, Typography } from "@mui/material";
import type { Project, ProjectMetaData } from "../types";
import GetMetaData from "./getMetaData";

type FilteredProjectsProps = {
	data: Project[];
};

export default function FilteredProjects({ data }: FilteredProjectsProps) {
	const metaData: ProjectMetaData = GetMetaData(data);

	const [selectedHostInstitution, setSelectedHostInstitution] = useState<string>("all");
	const [selectedSubtopic, setSelectedSubtopic] = useState<string>("all");
	const [riskScoreRange, setRiskScoreRange] = useState<number[]>([0, 10]);

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
		<Stack spacing={2} sx={{ px: 2, pb: 2 }}>
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

			<Typography variant="body2" color="text.secondary">
				Matching Projects: {filteredProjects.length} / {metaData.total_projects}
			</Typography>
		</Stack>
	);
}
