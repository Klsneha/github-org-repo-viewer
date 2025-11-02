import * as React from "react";
import type { Repository } from "../types/gitHubTypes";
interface UseFetchReposProps {
  orgName: string;
  page?: number;
  // sort?: "stars" | "forks" | "updated";
}

export const perPage: number = 10;

export const useListRepositories = ({
  orgName,
  page = 1,
}: UseFetchReposProps) => {
  const [repos, setRepos] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {

    let isCancelled = false;
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      setRepos([]);

      try {
        const response = await fetch(
          `https://api.github.com/orgs/${orgName}/repos?per_page=${perPage}&page=${page}`,{
            headers: {
              Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || `Request failed with ${response.status}`);
        }
        
        if (!isCancelled) {
          setRepos(data);
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();

    return () => {
      isCancelled = true;
    };

  }, [orgName, page]);

  return { repos, loading, error };

}