import * as React from "react";
import { Link } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="breadcrumb-container">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index}>
            <Link className="breadcrumb-link" to={item.path!}>{item.label}</Link>
            {!isLast && <span className="breadcrumb-slash" >/</span>}
          </div>
        );
      })}
    </nav>
  );
};