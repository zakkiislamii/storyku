import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { fetchStoriesAPI } from "../../services/story";

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
      const { stories, totalPages } = await fetchStoriesAPI(
        currentPage,
        searchQuery,
        filters
      );
      setStories(stories);
      setTotalPages(totalPages);
    } catch (err) {
      setError("Failed to fetch stories");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, filters]);

  const handleFilter = (newFilters) => {
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
