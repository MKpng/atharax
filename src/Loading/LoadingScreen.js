import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoadingScreen.scss";

// Preload Home component

const languages = ["Welcome", "ようこそ", "欢迎"];

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const [currentLangIndex, setCurrentLangIndex] = useState(0);
  const [typing, setTyping] = useState(true); // Tracks whether typing or erasing
  const navigate = useNavigate();
  const preloadHome = () => {
    import("../Home/Home.js");
  };
  useEffect(() => {
    preloadHome();

    const handleTypingEffect = () => {
      const currentLanguage = languages[currentLangIndex];

      if (typing) {
        // Type the text character by character
        if (displayText.length < currentLanguage.length) {
          setDisplayText(currentLanguage.slice(0, displayText.length + 1));
        } else {
          // Pause for a moment after typing the whole word
          setTimeout(() => setTyping(false), 1000);
        }
      } else {
        // Erase the text character by character
        if (displayText.length > 0) {
          setDisplayText(currentLanguage.slice(0, displayText.length - 1));
        } else {
          // Move to the next language or finish loading
          if (currentLangIndex < languages.length - 1) {
            setCurrentLangIndex(currentLangIndex + 1);
            setTyping(true); // Start typing the next language
          } else {
            // All languages typed, end the loading screen
            setTimeout(() => {
              setLoading(false);
              navigate("/home");
            }, 500); // Adjust time for smooth transition
          }
        }
      }
    };

    // Create an interval for the typing effect
    const typingInterval = setInterval(handleTypingEffect, 100);

    return () => clearInterval(typingInterval); // Cleanup interval on component unmount
  }, [displayText, typing, currentLangIndex, navigate]);

  return (
    <div className="loading-screen">
      <div className="loading-glass">
        <div className="loading-content">
          {loading ? <h1 className="typewriter">{displayText}</h1> : null}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
