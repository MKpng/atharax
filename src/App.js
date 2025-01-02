"use client";

import React, { useEffect, useState } from "react";

import Home from "./Home/Home";
import Mobile from "./Mobile/Mobile";

const ResponsiveHome = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth <= 768 ? <Mobile /> : <Home />;
};

function App() {

  return (
    <ResponsiveHome />
  );
}

export default App;
