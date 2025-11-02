import * as React from "react";
import { useListRepositoryBranches } from "../hooks/useListRepositoryBranches";
import { useListCommits } from "../hooks/useListCommits";
import { CommitCard } from "./CommitCard";
interface CommitsListingTabelProps {
  owner: string | undefined;
  repo: string | undefined;
}

export const defaultBranch: string = "master";

export const CommitsListingTable: React.FC<CommitsListingTabelProps> = ({ owner, repo }: CommitsListingTabelProps) => {
  const [selectedBranch, setSelectedBranch] = React.useState<string>(defaultBranch);
  const [page, setPage] = React.useState<number>(1)

  const { branches } = useListRepositoryBranches({ owner, repo });
  const { commits } = useListCommits({ owner, repo, branch: selectedBranch, page });

  React.useEffect(() => {
    setPage(1);
  }, [selectedBranch]);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <label>
          Branch
          <select
            style={{ marginLeft: "1rem" }}
            id="branch-select"
            value={selectedBranch}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedBranch(e.target.value)}
          >
            {branches.map((branch) => (
              <option key={branch.name} value={branch.name}>
                {branch.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      {commits.length > 0 &&
      <>
        
        {commits.map((commit) => <CommitCard commit={commit} />)}
        
        <div style={{ marginTop: "1rem" }}>
          <button 
            onClick={() => setPage((p) => Math.max(1, p-1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span style={{ margin: "0 1rem" }}>Page {page}</span>
          <button 
            onClick={() => setPage((p) => p+1)}
            disabled={(commits ?? [])?.length < 10}>
            Next
          </button>
        </div> 
      </>
      }
    </>
  );
}