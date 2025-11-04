import * as React from "react";
import { useListRepositoryBranches } from "../apiHooks/useListRepositoryBranches";
import { useListCommits } from "../apiHooks/useListCommits";
import { CommitCard } from "./CommitCard";
import type { Branch } from "../types/gitHubTypes";
interface CommitsListingTabelProps {
  owner: string | undefined;
  repo: string | undefined;
}

const master: string = "master";
const main: string = "main";

export const CommitsListingTable: React.FC<CommitsListingTabelProps> = ({ owner, repo }: CommitsListingTabelProps) => {
  const [selectedBranch, setSelectedBranch] = React.useState<string>();
  const [page, setPage] = React.useState<number>(1)

  const { branches, loading, error } = useListRepositoryBranches({ owner, repo });
  const { commits, loading: commitLoading, error: commitError } = useListCommits({ owner, repo, branch: selectedBranch!, page });

  React.useEffect(() => {
    let branch: string;
    if (branches.find((branch: Branch) => branch.name === master)) {
      branch = master;
    } else if (branches.find((branch: Branch) => branch.name === main)){
      branch = main;
    } else {
      branch = branches?.[0]?.name;
    }
    if (branch && branch !== selectedBranch) {
      setSelectedBranch(branch);
    }
  }, [branches]);

  React.useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [selectedBranch]);

  const getPagination = (): React.JSX.Element => {
    return (
      <div className="table-pagination">
        <button 
          onClick={() => setPage((p) => Math.max(1, p-1))}
          disabled={page === 1}
          className="button"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button 
          onClick={() => setPage((p) => p+1)}
          disabled={(commits ?? [])?.length < 10}
          className="button"
        >
          Next
        </button>
      </div> 
    );
  };

  return (
    <>
      <div className="branch-container">
        <label>
          Branch
          {loading ? 
            <span className="branch-loading">"Loading"</span>
          : error ? 
            <span className="branch-error">{error}</span>
          :
            <select
              className="select-container"
              value={selectedBranch}
              defaultValue={branches?.[0]?.name}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedBranch(e.target.value)}
            >
              {branches.map((branch) => (
                <option key={branch.name} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          }
        </label>
      </div>
      {(branches.length > 0) &&
      <div className="commits-container">
        {commitLoading ? 
          <div className="text-msg">Loading...</div> 
        : commitError ? 
          <div className="error">Commits Error: {commitError}</div> 
        : commits.length === 0 ? 
          <>
            <div className="text-msg"> No commits found.</div> 
            {getPagination()}
          </>
        :
          <>
            {commits.map((commit) => <CommitCard key={commit.sha}commit={commit} />)}
            {getPagination()}
          </>
        }
      </div>
      }
    </>
  );
};