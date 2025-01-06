import { useState, useRef } from "react";

export const useSearch = (onSearch) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimeout = useRef(null);

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      onSearch(searchQuery.trim());
      setIsLoading(false);
    }, 100);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      if (value.trim()) handleSearch();
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      handleSearch();
    }
  };

  return { searchQuery, isLoading, handleInputChange, handleKeyDown };
};
