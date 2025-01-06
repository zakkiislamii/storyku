import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetchStories = () => {
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});

  const fetchStories = useCallback(async () => {
    try {
      setLoading(true);
      let endpoint = `${import.meta.env.VITE_URL}/stories`;
      if (searchQuery) {
        endpoint = `${endpoint}/search?query=${searchQuery}`;
      } else if (filters.category || filters.status) {
        const params = new URLSearchParams();
        if (filters.category) params.append("category", filters.category);
        if (filters.status) params.append("status", filters.status);
        endpoint = `${endpoint}/filter?${params.toString()}`;
      } else {
        endpoint = `${endpoint}?page=${currentPage}`;
      }
      const response = await axios.get(endpoint, {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      });

    

      setStories(response.data.data.stories || response.data.data);
      setTotalPages(response.data.data.totalPages || 1);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch stories");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, filters]);

  const handleFilter = (newFilters) => {
    console.log("New filters received:", newFilters);
    setFilters(newFilters);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setFilters({});
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  return {
    stories,
    currentPage,
    totalPages,
    handlePageChange,
    loading,
    error,
    handleSearch,
    handleFilter,
  };
};

export default useFetchStories;
