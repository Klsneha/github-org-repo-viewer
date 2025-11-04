import * as React from "react";
import type { Commit } from "../types/gitHubTypes";
interface UseFetchReposProps {
  owner: string | undefined;
  repo: string | undefined;
  branch: string;
  page?: number;
}

export const perPage: number = 10;

export const useListCommits = ({
  owner,
  repo,
  branch,
  page = 1,
}: UseFetchReposProps) => {
  const [commits, setCommits] = React.useState<Commit[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {

    let isCancelled = false;
    const fetchCommits = async () => {
      setLoading(true);
      setError(null);
      setCommits([]);

      if (!branch || !owner || !repo) return;

      try {
        const headers: Record<string, string> = {};

        if (import.meta.env.VITE_GITHUB_TOKEN) {
          headers.Authorization = `token ${import.meta.env.VITE_GITHUB_TOKEN}`;
        }

        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/commits?sha=${branch}&per_page=${perPage}&page=${page}`, {
            headers
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || `Error fetching repos: ${response.statusText}`);
        }

        if (!isCancelled) {
          setCommits(data);
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

  }, [owner, repo, branch, page]);

  return { commits, loading, error };

}