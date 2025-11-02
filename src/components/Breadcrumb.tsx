import * as React from "react";
import { Link } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  path?: string; // optional if last item (current page)
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav style={{ marginBottom: "1rem" }}>
      <ol
        style={{
          listStyle: "none",
          display: "flex",
          gap: "0.5rem",
          padding: 0,
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} style={{ display: "flex", alignItems: "center" }}>
              {item.path && !isLast ? (
                <Link to={item.path}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
              {!isLast && <span style={{ margin: "0 0.25rem" }}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};