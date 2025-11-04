# GitHub Organization Repository Viewer

## Description
A React + TypeScript web app that allows users to:
- View List of Organization public repositories. 
- View all repositories with pagination, sort them by stars, forks and recent updates. 
- Select a repository to see its recent commits. 


## Setup

***Prerequisites***
- Make sure you have the following installed on your system:
- Node.js (version 18 or later recommended)
- npm (comes with Node) or yarn / pnpm if you prefer another package manager

You can check your versions using:  
`node -v`  
`npm -v`

***Install required packaged***  
`npm install`

***Run in Development mode***  
`npm run dev`

***Build the project ***  
`npm run build`
- Minified React app will be created in the dist/ folder, for production deployment.

***Run in Preview Mode***
`npm run preview`
- Opens a local preview of the production bundle.
- Open the local URL printed in the terminal (usually http://localhost:4173/).

## GitHub API Token (optional)
- The app can run without a token but may hit rate limits(60 per hour).
- For extended use, create a GitHub personal access token and add it to .env file
- Steps to create a perosnla access token: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token
- Create a .env file in the project root and add below line  
`VITE_GITHUB_TOKEN=your_personal_access_token`

## Approach and Rationale

### Architecture
- Built with React (component-based UI) for modular and reusable code.
- Organized Code as
  - `src/pages` -> Main route level containers (Listing, details Page)
  - `src/apiHooks` -> Custom hooks to fetch the GitHub data. 
  - `src/components ` -> Reusable child components within the pages.
  - `src/type` -> TypeScript interfaces for consistent and type-safe data handling.
  

### Listing Page
- Breadcrumb and Search Bar for navigation and organization lookup.
- Displays a table of 10 repositories per page when a valid organization name is entered.
- Default sorting by “Updated At” (descending) to show most recently active repositories.
- Pagination controls allow navigation through subsequent pages.
- Users can click on column headers (Name, Stars, Forks, Updated At, Created At) to sort repositories.

***Pagination***
- Used GitHub REST API parameters `page` and `per_page=10` to fetch one page at a time.
- Initial fetch is server-side sorted by the updated column (desc).
- Clicking Next/Previous triggers a new API request for the corresponding page.
- This prevents ***over-fetching*** large organizations repositories and ***avoids exceeding GitHub’s rate limits***.

***Sorting***
- Since only 10 repositories are retrieved per page, sorting is performed client-side within that page.
- Client-side sorting is used for Stars and Forks, as the API does not support server-side sorting for these fields.
- A ***custom comparator*** function defines sorting logic for each column.

### Details Page
- Clicking a repository routes to Repository Details Page displaying repository metadata.
- Fetches the list of branches to determine which branch’s commits to show.
- The default branch is chosen in order: main, master, or the first branch returned by the API.
- Displays 10 recent commits per page in Commit Cards, with Next/Previous pagination to navigate additional commits.

### State Management
- Used React hooks (useState, useEffect, useCallback) for state control.
- Keeps it simple — no heavy state library needed.
- Could scale to React Query(TanStack Query) if caching or complex data flows were needed later.

### Technology Choices
- ***Vite***: Fast dev server and build tool, easy to set up for small projects.
- ***React***: Modern JS framework for building reusable, modular, component-based UIs.
- ***TypeScript***: Adds type safety and improves maintainability.
- ***Fetch API***: Simple and native, sufficient for GET requests and basic data fetching.

### Improvements
- Global sorting: Fetch all repository data and sort on the client to provide accurate sorting across all pages.
- Data caching: Use React Query to cache API responses, reduce redundant calls, and improve performance.
- Reusable Table component: Develop a generic table component that accepts columns, data, and a custom comparator for sorting, making it reusable for other lists.
- Reusable Pagination Component: Extract pagination logic (Next/Previous buttons, page state) into a shared component for consistent usage across pages.
- Dedicated Loading Component: Create a simple reusable spinner or loading indicator component for uniform loading states throughout the app.
- Centralized Error Component: Build a standard error display component that handles API errors gracefully with retry options.
- Responsive design: Enhanced layout suitable for desktop and tablet views.