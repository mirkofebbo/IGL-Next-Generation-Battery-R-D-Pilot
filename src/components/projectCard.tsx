import { Box, Card, CardContent, Typography } from '@mui/material';
import type { Project } from '../types';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      variant="elevation"
      sx={{
        width: "100%",
        flexShrink: 0,
        minHeight: 100, 
        cursor: 'pointer',
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
        <Typography variant="h6" sx={{ color: 'secondary.main', lineHeight: 1.3 }}>
          {project.title}
        </Typography>
        <Typography className="project-description" variant="body2" color="text.secondary" sx={{ mt: 1.25 }}>
          {project.description}
        </Typography>
      </CardContent>
    </Card>

  );
}
