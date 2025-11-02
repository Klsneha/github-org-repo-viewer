import * as React from "react";
import { SearchBar } from "../components/SearchBar";
import { GitHubRepoList } from "../components/GitHubRepoList";
import { useParams } from "react-router-dom";
import { Breadcrumb, type BreadcrumbItem } from "../components/Breadcrumb";

export const GitHubRepoListPage: React.FC = () => {

  const { owner } = useParams();
  const [orgName, setOrgName] = React.useState<string>(owner ?? "");

  const onOrgSearch = (org: string) => {
    setOrgName(org);
  }

  const breadcrumb: BreadcrumbItem[] = [
    {
      label: orgName,
      path: `/${orgName}`
    }
  ]
  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <h1>GitHub Organization Repositories </h1>
      <SearchBar query={orgName} onSearch={onOrgSearch} />
      <GitHubRepoList 
        orgName={orgName}
      />
    </>
  );

};