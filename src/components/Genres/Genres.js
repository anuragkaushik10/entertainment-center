import React, { useState } from "react";
import axios from "axios";
import { Chip } from "@mui/material";
import Spinner from "../Spinner";
export default function Genres({
  type,
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  setPage,
}) {
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=bbe796e21f6cbd517395b33b17cd7e2f&language=en-US`
    );
    setGenres(data.genres);
  };
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genre, genre]);
    setPage(1);
  };
  React.useEffect(() => {
    fetchGenres();
    return () => {
      setGenres({});
    };
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres.length > 0 &&
        selectedGenres.map((genre) => (
          <Chip
            label={genre.name}
            clickable
            size="small"
            key={genre.id}
            style={{ margin: "2px" }}
            color="secondary"
            onDelete={() => handleRemove(genre)}
          />
        ))}
      {genres.length > 0 &&
        genres.map((genre) => (
          <Chip
            label={genre.name}
            clickable
            size="small"
            key={genre.id}
            style={{ margin: "2px" }}
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
}
