import * as React from "react";
import type { Branch } from "../types/gitHubTypes";
interface UseFetchReposProps {
  owner: string | undefined;
  repo: string | undefined;
}

export const perPage: number = 10;

export const useListRepositoryBranches = ({
  owner,
  repo,
}: UseFetchReposProps) => {
  const [branches, setBranches] = React.useState<Branch[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {

    let isCancelled = false;
    const fetchBranches = async () => {
      setLoading(true);
      setError(null);
      setBranches([]);

      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/branches`, {
            headers: {
              Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            }
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || `Error fetching repos: ${response.statusText}`);
        }

        if (!isCancelled) {
          setBranches(data);
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();

    return () => {
      isCancelled = true;
    };

  }, [owner, repo]);

  return { branches, loading, error };

}