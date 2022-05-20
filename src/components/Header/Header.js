import React from "react";
import { Typography } from "@mui/material";
import "./Header.css";
export default function Header() {
  function scrollUp() {
    window.scroll(0, 0);
  }
  return (
    <span onClick={scrollUp} className="header">
      🎬 Entertainment Point 📽️
    </span>
  );
}
