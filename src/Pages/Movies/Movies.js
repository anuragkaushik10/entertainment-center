import React from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../Pagination/Pagination";
import "./Movies.css";
import Genres from "../../components/Genres/Genres";
import useGenre from "../../hooks/useGenre";
import Spinner from "../../components/Spinner";
export default function Movies() {
  const [page, setPage] = React.useState(1);
  const [content, setContent] = React.useState([]);
  const [numberOfPages, setNumberOfPages] = React.useState();
  const [genres, setGenres] = React.useState([]);
  const [selectedGenres, setSelectedGenres] = React.useState([]);
  const genreforURL = useGenre(selectedGenres);
  const [loading, isLoading] = React.useState(true);

  async function fetchData() {
    isLoading(true);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=bbe796e21f6cbd517395b33b17cd7e2f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setNumberOfPages(data.total_pages);
    isLoading(false);
  }

  React.useEffect(() => {
    fetchData();
  }, [page, genreforURL]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1 className="pageTitle">Movies</h1>
      <Genres
        type="movie"
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            title={c.title || c.name}
            poster={c.poster_path}
            date={c.release_date || c.first_air_date}
            media_type={c.media_type}
            vote_average={c.vote_average}
          />
        ))}
      </div>
      {numberOfPages > 1 && (
        <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
      )}
    </div>
  );
}
