"use client";
import React, { Suspense, lazy, useEffect, useState, useWindowSize } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivacyPolicy from "./Policy/PrivacyPolicy";
import LoadingScreen from "./Loading/LoadingScreen";
import Mobile from "./Mobile/Mobile";
import "./App.css";

const Home = lazy(() => import("./Home/Home"));

const ResponsiveHome = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth < 768 ? <Mobile /> : <Home />;
};

function App() {

  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<LoadingScreen />} />
          <Route path="/home" element={<ResponsiveHome />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
