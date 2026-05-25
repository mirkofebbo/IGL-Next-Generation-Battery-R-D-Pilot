export type Project = {
    id: number;
    title: string;
    subtopic: string;
    risk_score: number;
    peer_review_score: number;
    budget_eur: number;
    duration_months: number;
    host_institution: string;
    description: string;
};

export type Projects = {
    programme: string;
    currency: string;
    total_budget_eur: number;
    projects: Project[];
}