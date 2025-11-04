import * as React from "react";

interface SearchBarProps {
  query?: string;
  onSearch: (value: string) => void;
}
export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, query } : SearchBarProps) => {

  const [search, setSearch] = React.useState<string>(query ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() !== "") {
     onSearch(search.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="search-container"
    >
      <input
        type="text"
        placeholder="Enter GitHub Organization name"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="button">
        Search
      </button>
    </form>
  );
}