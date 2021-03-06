import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import Spinner from "../../components/Spinner";
import CustomPagination from "../../Pagination/Pagination";
import "./Trending.css";

export default function Trending() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, isLoading] = React.useState(true);

  async function fetchData() {
    isLoading(true);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=bbe796e21f6cbd517395b33b17cd7e2f&page=${page}`
    );
    setContent(data.results);
    isLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [page]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <span className="pageTitle">Trending</span>
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
      <CustomPagination setPage={setPage} />
    </div>
  );
}
