import * as React from "react";
import { useParams } from 'react-router-dom';
import { useGetRepository } from "../apiHooks/useGetRepository";
import { Breadcrumb, type BreadcrumbItem } from "../components/Breadcrumb";
import { GitHubRepoMetaData } from "../components/GitHubRepoMetaData";
import { CommitsListingTable } from "../components/CommitsListingData";
export const GitHubRepoDetailsPage: React.FC = () => {
  const { owner, repoName: repo } = useParams();

  const {repository, loading, error } = useGetRepository({ owner, repo });

  const breadcrumb: BreadcrumbItem[] = [
    { label: `${owner}`, path: `/${owner}`},
  ];

  if (repository) {
    breadcrumb.push({ label: `${repository?.name}`, path: `${repository.html_url}`} );
  }

  if (loading) {
    return (
      <div className="text-msg">
        Loading Repository....
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        ${error} <a href={`/${owner}`}>Click here</a> to return to Repository Listing Page
      </div>
    );
  }

  return (
    <>
      <Breadcrumb items={breadcrumb}/>
      <h1 className="page-title">{repository?.name}</h1>
      <GitHubRepoMetaData repository={repository}/>
      <CommitsListingTable owner={repository?.owner?.login} repo={repository?.name} />
    </>
  );
};