import { Box, Card, CardContent, Typography } from '@mui/material';
import type { Project } from '../types';

export default function ProjectCard({ project }: { project: Project }) {
    const getRiskColor = (score: number) => {
        if (score <= 4) return 'success.main';
        if (score > 4 && score <= 7) return 'warning.main';
        if (score > 7) return 'error.main';
        return 'error.main';
    };

    const riskColor = getRiskColor(project.risk_score);

    return (
        <Card
            variant="elevation"
            sx={{
                width: "100%",
                flexShrink: 0,
                minHeight: 50,
                cursor: 'pointer',
                position: 'relative',
                border: '2px solid',
                borderColor: riskColor,
                '&:hover': {
                    borderColor: riskColor,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 26px rgba(15, 41, 74, 0.14)',
                },
                '& .project-description': {
                    maxHeight: 0,
                    opacity: 0,
                    transform: 'translateY(-8px)',
                    transition: 'max-height 220ms ease, opacity 180ms ease, transform 180ms ease',
                    overflow: 'hidden',
                },
                '&:hover .project-description': {
                    maxHeight: 200,
                    opacity: 1,
                    transform: 'translateY(0)',
                },
            }}
        >
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: riskColor,
                        color: 'white',
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                    }}
                >
                    Risk: {project.risk_score}
                </Box>
                <Typography variant="h6" sx={{ color: 'secondary.main', lineHeight: 1.3 }}>
                    {project.title}
                </Typography>
                <Typography variant="body1" sx={{ display: 'block', mt: 0.75, color: 'text.secondary', lineHeight: 1.4 }}>
                    <strong>Institution:</strong> {project.host_institution}
                    <br />
                    <strong>Subtopic:</strong> {project.subtopic}
                </Typography>
                <Typography className="project-description" variant="body2" color="text.secondary" sx={{ mt: 1.25 }}>
                    {project.description}
                </Typography>
                <Typography className="project-description" variant="body2" color="text.secondary" sx={{ mt: 1.25 }}>
                    <strong>Budget:</strong> {project.budget_eur} EUR
                    <br />
                    <strong>Duration:</strong> {project.duration_months} months
                    <br />
                    <strong>Peer Review Score:</strong> {project.peer_review_score} /10
                </Typography>
            </CardContent>
        </Card>

    );
}
