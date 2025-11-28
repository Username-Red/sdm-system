"use client";
import React from "react";

interface FilterProps {
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  categories: string[];
}

const Filter: React.FC<FilterProps> = ({ categoryFilter, setCategoryFilter, categories }) => {
  return (
    <select
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
      className="border rounded px-2 py-1"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};

export default Filter;
