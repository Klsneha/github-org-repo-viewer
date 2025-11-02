import * as React from "react";
import { useListRepositories } from "../hooks/useListRepositories";
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
        <td colSpan={5} style={{ textAlign: "center", padding: "1rem" }}>
          {error}
        </td>  
      ) : loading ? (
          <tr>
            <td colSpan={5} style={{ textAlign: "center", padding: "1rem" }}>
              Loading repositories...
            </td>
          </tr>
        ) : sortedRepos?.length === 0 ? (
          <tr>
            <td colSpan={5} style={{ textAlign: "center", padding: "1rem" }}>
              No repositories found.
            </td>
          </tr>
        ) : (sortedRepos?.map((repo: Repository) => (
          <tr key={repo.id}>
            <td style={tdStyle}>
              <Link to={`/${repo.owner.login}/${repo.name}`} style={{ color: "#007bff", textDecoration: "none" }}>
                {repo.name}
              </Link>
            </td>
            <td style={tdStyle}>{repo.owner.login}</td>
            <td style={tdStyle}>{repo.stargazers_count}</td>
            <td style={tdStyle}>{repo.forks_count}</td>
            <td style={tdStyle}>{formatDate(repo.updated_at)}</td>
            <td style={tdStyle}>{formatDate(repo.created_at)}</td>
          </tr>
        )))}
    </>
  );
}

const tdStyle: React.CSSProperties = {
  borderBottom: "1px solid #ddd",
  padding: "8px",
};