import { Route, Routes } from 'react-router-dom';
import { GitHubRepoListPage } from './pages/RepositoriesListingPage';
import { GitHubRepoDetailsPage } from './pages/RepositoryDetailsPage';

function App() {

  return (
    <Routes>
      <Route path="/" element={<GitHubRepoListPage />} />
      <Route path="/:owner" element={<GitHubRepoListPage />} />
      <Route path="/:owner/:repoName" element={<GitHubRepoDetailsPage />} />
    </Routes>

  );
}

export default App
