import * as React from "react";
import type { Commit } from "../types/gitHubTypes";
import { formatDate } from "../utils";
interface CommitCardProps {
  commit: Commit;
}
export const CommitCard: React.FC<CommitCardProps> = ({ commit }: CommitCardProps) => {
  const shortMessage = commit.commit.message?.split('\n')?.[0] ?? commit.commit.message;
  return (
    <>
      <div key={commit.sha} className="commit-card-container">
        <a href={commit.html_url} target="_blank" className="commit-card-link">
          {shortMessage}
        </a>
        <div className="commit-card-div"style={{ fontSize: '0.85rem', color: '#555' }}>
          {commit.commit.author.name} committed on {formatDate(commit.commit.author.date)}
        </div>
      </div>
    </>
  );
};