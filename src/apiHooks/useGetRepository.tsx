import * as React from "react";
import type { Repository } from "../types/gitHubTypes";
interface UseFetchReposProps {
  owner: string | undefined;
  repo: string | undefined;
}

export const perPage: number = 10;

export const useGetRepository = ({
  owner,
  repo,
}: UseFetchReposProps) => {
  const [repository, setRepository] = React.useState<Repository>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {

    let isCancelled = false;

    const fetchCommits = async () => {
      setLoading(true);
      setError(null);
      setRepository(undefined);

      if (!owner && !repo) return;

      try {
        const headers: Record<string, string> = {};

        if (import.meta.env.VITE_GITHUB_TOKEN) {
          headers.Authorization = `token ${import.meta.env.VITE_GITHUB_TOKEN}`;
        }
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`, {
            headers
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || `Error fetching repos: ${response.statusText}`);
        }
       
        if (!isCancelled) {
          setRepository(data);
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchCommits();

    return () => {
      isCancelled = true;
    };

  }, [owner, repo]);

  return { repository, loading, error };

}