import './App.css'
import { Route, Routes } from 'react-router-dom';
import { GitHubRepoListPage } from './pages/GitHubRepoListingPage';
import { GitHubRepoDetailsPage } from './pages/GitHubRepoDetailsPage';

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
