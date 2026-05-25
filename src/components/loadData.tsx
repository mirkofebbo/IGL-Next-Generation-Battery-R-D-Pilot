import { useEffect, useState } from "react";
import type { Projects } from "../types.tsx";

export default function useLoadData() {
    const [data, setData] = useState<Projects | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/projects.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load projects.json");
                return res.json();
            })
            .then((json: Projects) => setData(json))
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { data, error, loading };
}