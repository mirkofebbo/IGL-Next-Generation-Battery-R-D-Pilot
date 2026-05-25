import type { Project, ProjectMetaData, PortfolioMetaData } from "../types.tsx";

export function getPortfolioMetaData(project: Project[]): PortfolioMetaData {

    const average_risk_score = Math.round(project.reduce((sum, p) => sum + p.risk_score, 0) / project.length * 100) / 100;
    const average_peer_review_score = Math.round(project.reduce((sum, p) => sum + p.peer_review_score, 0) / project.length * 100) / 100;
    const total_budget_eur = project.reduce((sum, p) => sum + p.budget_eur, 0);
    const average_duration_months = Math.round(project.reduce((sum, p) => sum + p.duration_months, 0) / project.length * 100) / 100;

    const distribution_of_subtopics: { [subtopic: string]: number } = {};
    const distribution_of_host_institutions: { [institution: string]: number } = {};

    project.forEach(p => {
        distribution_of_subtopics[p.subtopic] = (distribution_of_subtopics[p.subtopic] || 0) + 1;
        distribution_of_host_institutions[p.host_institution] = (distribution_of_host_institutions[p.host_institution] || 0) + 1;
    });

    return {
        average_risk_score,
        average_peer_review_score,
        total_budget_eur,
        average_duration_months,
        distribution_of_subtopics,
        distribution_of_host_institutions
    };
}

export function getMetaData(project: Project[]): ProjectMetaData {
    const total_projects = project.length;
    const unique_subtopics = new Set(project.flatMap(p => p.subtopic)).size;
    const unique_host_institutions = new Set(project.flatMap(p => p.host_institution)).size;

    const list_of_unique_subtopics = Array.from(new Set(project.flatMap(p => p.subtopic)));
    const list_of_unique_host_institutions = Array.from(new Set(project.flatMap(p => p.host_institution)));

    return {
        total_projects,
        unique_subtopics,
        unique_host_institutions,
        list_of_unique_subtopics,
        list_of_unique_host_institutions
    };
}

export function filterProjectsByCriteria(projects: Project[], selectedHostInstitution: string, selectedSubtopic: string, riskScoreRange: number[]): Project[] {
    return projects.filter(project => {
        const matchesHostInstitution = selectedHostInstitution ? project.host_institution === selectedHostInstitution : true;
        const matchesSubtopic = selectedSubtopic ? project.subtopic === selectedSubtopic : true;
        const matchesRiskScore = project.risk_score >= riskScoreRange[0] && project.risk_score <= riskScoreRange[1];
        return matchesHostInstitution && matchesSubtopic && matchesRiskScore;
    });
}

export function getRiskColor(score: number) {
    if (score <= 4) return 'success.main';
    if (score > 4 && score <= 7) return 'warning.main';
    if (score > 7) return 'error.main';
    return 'error.main';
};