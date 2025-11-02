import * as React from "react";
import { useParams } from 'react-router-dom';
import { useListCommits } from "../hooks/useListCommits";
import { useGetRepository } from "../hooks/useGetRepository";
import { Breadcrumb } from "../components/Breadcrumb";
import { GitHubRepoMetaData } from "../components/GitHubRepoMetaData";
import { CommitsListingTable } from "../components/CommitsListingTable";
export const GitHubRepoDetailsPage: React.FC = () => {
  const { owner, repoName: repo } = useParams();

  const {repository, loading, error } = useGetRepository({ owner, repo });

  const commitDetails = useListCommits({ owner, repo });
  console.log(commitDetails.commits);

  const breadcrumb = [
    { label: `${owner}`, path: `/${owner}`},
    { label: `${repository?.name}`} 
  ];

  return (
    <>
      <Breadcrumb items={breadcrumb}/>
      <h1>{repository?.name}</h1>
      <GitHubRepoMetaData repository={repository}/>
      <CommitsListingTable owner={owner} repo={repo} />

    </>
  );
};