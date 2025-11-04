import * as React from "react";
import { useListRepositories } from "../apiHooks/useListRepositories";
import type { Repository } from "../types/gitHubTypes";
import { Link } from "react-router-dom";
import type { RepoListComparator, SortConfig } from "./GitHubRepoList";
import { formatDate } from "../utils";

interface GitHubRepoListingDataProps{
  orgName: string;
  page: number;
  setRepositories: (data: Repository[]) => void;
  sortConfig?: SortConfig;
  customComparator?: RepoListComparator;
}
export const GitHubRepoListingData: React.FC<GitHubRepoListingDataProps> = ({ 
  orgName,
  page,
  setRepositories,
  sortConfig,
  customComparator
}: GitHubRepoListingDataProps) => {

  const { repos: repositories, loading, error } = useListRepositories({ orgName, page } );
  React.useEffect(() => {
    setRepositories(repositories);
  }, [repositories, page, orgName]);

  const sortedRepos = React.useMemo(() => {
    if (!sortConfig || !customComparator) return repositories;

    const sorted = [...repositories].sort((a, b) => {
      const {key, direction} = sortConfig;
      const compare = customComparator[key];
      return compare(a, b, direction);
    });
    return sorted;
  }, [repositories, sortConfig]);

  return (
    <>
      { error ? (
        <tr>
          <td colSpan={5} className="error">
            {error}
          </td>
        </tr>
      ) : loading ? (
          <tr>
            <td colSpan={5} className="text-msg">
              Loading repositories...
            </td>
          </tr>
        ) : sortedRepos?.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-msg">
              No repositories found.
            </td>
          </tr>
        ) : (sortedRepos?.map((repo: Repository) => (
          <tr key={repo.id}>
            <td className="table-row">
              <Link 
                to={`/${repo.owner.login}/${repo.name}`}
                className="link"
              >
                {repo.name}
              </Link>
            </td>
            <td className="table-row">{repo.stargazers_count}</td>
            <td className="table-row">{repo.forks_count}</td>
            <td className="table-row">{formatDate(repo.updated_at)}</td>
            <td className="table-row">{formatDate(repo.created_at)}</td>
          </tr>
        )))}
    </>
  );
}