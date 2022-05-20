import { TextField, Button, Tabs, Tab } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../Pagination/Pagination";
import axios from "axios";

export default function Search() {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState();

  async function fetchSearch() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${
        type ? "tv" : "movie"
      }?api_key=bbe796e21f6cbd517395b33b17cd7e2f&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );

    setContent(data.results);
    setNumberOfPages(data.pages);
  }

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page]);

  return (
    <div>
      <div style={{ margin: "20px 0 20px 0", display: "flex" }}>
        <TextField
          variant="filled"
          label="Search"
          sx={{ flex: "1" }}
          size="medium"
          color="secondary"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          sx={{
            color: "white",
            border: "2px solid #4d4d4d",
            margin: "2px",
            backgroundColor: "white",
            marginLeft: "5px",
          }}
          onClick={fetchSearch}
        >
          <SearchIcon sx={{ color: "black" }} />
        </Button>
      </div>
      <div style={{ width: "100%", marginBottom: "20px" }}>
        <Tabs
          value={type}
          indicatorColor="secondary"
          textColor="info"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab label="Movies" sx={{ width: "50%" }} />
          <Tab label="TV Series" sx={{ width: "50%" }} />
        </Tabs>
      </div>
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
        {searchText &&
          content.length === 0 &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numberOfPages > 1 && (
        <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
      )}
    </div>
  );
}
