import { useEffect, useState } from "react";
import { searchMovies } from "../../movies-api";

import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {

  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("title");

  const handleSearch = (value) => {
    setSearchParams({ title: value });
  };


  useEffect(() => {
    if ( searchValue) {
      fetchMovies(searchValue);
    }
  }, [searchValue]);

  async function fetchMovies(title) {
    setMovies([]);
    try {
      setLoading(true);
      const data = await searchMovies(title);
      setMovies(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <p>Movies page</p>
      <SearchBar onSubmit={handleSearch}></SearchBar>

      <MovieList movies={movies && movies} ></MovieList>
    </div>
  );
}
