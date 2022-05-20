import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
  Badge,
} from "@mui/material";
import { img_300, unavailable } from "../../config/config";
import ContentModal from "../Modal/ContentModal";
export default function SingleContent({
  id,
  title,
  poster,
  date,
  media_type,
  vote_average,
}) {
  return (
    <>
      {/* <ContentModal media_type={media_type} id={id}></ContentModal> */}
      <Card
        sx={{
          maxWidth: 300,
          cursor: "pointer",
          margin: "20px",
          padding: "px",
          borderRadius: "6px",
          border: "1px solid black",
          boxShadow: "10px",
        }}
      >
        <CardActionArea>
          <Badge
            badgeContent={vote_average}
            color={vote_average > 6 ? "primary" : "error"}
            sx={{ position: "absolute", margin: "20px" }}
          />
          <CardMedia
            component="img"
            image={poster ? `${img_300}/${poster}` : unavailable}
            alt={title}
          />
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Typography variant="subtitle2" component="div">
              {title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {media_type === "tv" ? "TV Series" : "Movie"}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {date}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
