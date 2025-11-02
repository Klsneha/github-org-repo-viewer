import * as React from "react";
import type { Commit } from "../types/gitHubTypes";
import { formatDate } from "../utils";
interface CommitCardProps {
  commit: Commit;

}
export const CommitCard: React.FC<CommitCardProps> = ({ commit }: CommitCardProps) => {
  return (
    <>
      <div key={commit.sha} style={{ marginBottom: '1rem', padding: '0.5rem', border: '1px solid #eee' }}>
        <a href={commit.html_url} target="_blank" rel="noreferrer" style={{ fontWeight: 'bold' }}>
          {commit.commit.message}
        </a>
        <div style={{ fontSize: '0.85rem', color: '#555' }}>
          {commit.commit.author.name} committed {formatDate(commit.commit.author.date)}
        </div>
      </div>

    </>
  );
};