import type { Project, ProjectMetaData } from "../types.tsx";

export default function GetMetaData(project: Project[]): ProjectMetaData {
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