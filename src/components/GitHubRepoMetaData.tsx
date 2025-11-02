import * as React from "react";
import type { Repository } from "../types/gitHubTypes";
import { formatDate } from "../utils";

interface GitHubRepoMetaDataProps {
  repository: Repository | undefined;
}
export const GitHubRepoMetaData: React.FC<GitHubRepoMetaDataProps> = ({ repository }: GitHubRepoMetaDataProps) => {
  return (
    <>
      <div style={{ marginTop: "1rem", display: "flex", gap: "2rem" }}>
        {repository?.stargazers_count && <div>⭐ Stars: {repository?.stargazers_count}</div>}
        {repository?.forks_count && <div>🍴 Forks: {repository?.forks_count}</div>}
        {repository?.created_at && <div>🗓 Created: {formatDate(repository?.created_at)}</div>}
        {repository?.updated_at && <div>⏱ Updated: {formatDate(repository?.updated_at)}</div>}
      </div>
    </>
  );
};