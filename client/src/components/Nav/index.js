import React from "react";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Google Books App
      </a>
      <a className="search" href="/search">Search</a>
      <a className="saved" href="/saved">Saved</a>
    </nav>
  );
}

export default Nav;
