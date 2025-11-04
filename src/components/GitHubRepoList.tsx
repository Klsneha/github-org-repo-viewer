import * as React from "react";
import type { Repository } from "../types/gitHubTypes";
import { GitHubRepoListingData } from "./GitHubRepoListingData";
import { compareDates, compareNumbers, compareStrings } from "../utils";
interface GitHubRepoListProps{
  orgName: string;
}

export const Columns = {
  name: "Repository",
  stars: "Stars",
  forks: "Fork Count",
  updatedDate: "Updated At",
  createdDate: "Created At"
};

// extract the value type
export type ColumnKey = typeof Columns[keyof typeof Columns];

export enum SortDirectionEnum {
  ASC = "asc",
  DESC = "desc"
}

export interface SortConfig {
  key: ColumnKey;
  direction: SortDirectionEnum;
}

export type RepoListComparator = {
  [key in ColumnKey]: (a: Repository, b: Repository, direction: SortDirectionEnum) => number;
}

export const GitHubRepoList: React.FC<GitHubRepoListProps> = ({ orgName }: GitHubRepoListProps) => {

  const defaultSortconfig: SortConfig = {key: Columns.updatedDate, direction: SortDirectionEnum.DESC};

  const [page, setPage] = React.useState(1);
  const [repositories, setRepositories] = React.useState<Repository[]>();
  const [sortConfig, setSortConfig] = React.useState<SortConfig>(defaultSortconfig);

  const onSort = (key: ColumnKey) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { 
          key,
          direction: prev.direction === SortDirectionEnum.ASC ?
          SortDirectionEnum.DESC : SortDirectionEnum.ASC };
      }
      return { key, direction: SortDirectionEnum.ASC };
    });
  };

  React.useEffect(() => {
    setPage(1);
  }, [orgName]);

  const customComparator = React.useCallback((): RepoListComparator => {

    const comparator = {
      [Columns.name]: (repoA: Repository,repoB: Repository, direction: SortDirectionEnum) =>
        compareStrings(repoA.name, repoB.name, direction),
      [Columns.stars]: (repoA: Repository,repoB: Repository, direction: SortDirectionEnum) => 
        compareNumbers(repoA.stargazers_count, repoB.stargazers_count, direction),
      [Columns.forks]: (repoA: Repository,repoB: Repository, direction: SortDirectionEnum) => 
        compareNumbers(repoA.forks_count, repoB.forks_count, direction),
      [Columns.createdDate]: (repoA: Repository,repoB: Repository, direction: SortDirectionEnum) => {
        const dateA = new Date(repoA.created_at);
        const dateB = new Date(repoB.created_at);
        return compareDates(dateA, dateB, direction);
      },  
      [Columns.updatedDate]: (repoA: Repository,repoB: Repository, direction: SortDirectionEnum) => {
        const dateA = new Date(repoA.updated_at);
        const dateB = new Date(repoB.updated_at);
        return compareDates(dateA, dateB, direction);
      }   
    }
    return comparator;
  },[]);

  const getTableHeaders = (): React.JSX.Element => {
    const columns = Object.entries(Columns) as [string, ColumnKey][];
    return (
      <thead>
        <tr>
          {columns.map(([key, value]) => {
            const isSorted = sortConfig?.key === value;
            const direction = isSorted ? sortConfig.direction : undefined;

            return (
              <th
                key={key}
                onClick={() => onSort(value)}
                className="table-heading"
              >
                {value}
                {isSorted && (direction === SortDirectionEnum.ASC ? " ▲" : " ▼")}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };

  return (
    <>
      {!!orgName ?
        <div className="table-container">
          <table className="table">
            {getTableHeaders()}
            <tbody>
              {
                <GitHubRepoListingData 
                  orgName={orgName}
                  page={page}
                  setRepositories={setRepositories}
                  sortConfig={sortConfig}
                  customComparator={customComparator()}
                />
              }
            </tbody>
          </table>
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
              disabled={(repositories ?? [])?.length < 10}
              className="button"
            >
              Next
            </button>
          </div>
        </div> : null
      }
    </>
  );
}