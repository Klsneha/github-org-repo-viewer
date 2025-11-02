import * as React from "react";

interface SearchBarProps {
  query?: string;
  onSearch: (value: string) => void;
}
export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, query } : SearchBarProps) => {

  const [search, setSearch] = React.useState<string>(query ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload
    if (search.trim() !== "") {
     onSearch(search.trim());
    }
  };

  console.log("search", search);

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "8px", marginBottom: "16px" }}
    >
      <input
        type="text"
        placeholder="Enter GitHub Organization name"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        style={{ flex: 1, padding: "8px" }}
      />
      <button type="submit" style={{ padding: "8px 16px" }}>
        Search
      </button>
    </form>
  );
}