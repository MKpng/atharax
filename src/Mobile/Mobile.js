import "./Mobile.scss";
import Double from "../images/Mobile/double_esphere.svg";
import Esphere from "../images/Mobile/esphere.svg";
import Star from "../images/Mobile/star.svg";
import Square from "../images/Mobile/square.svg";
import Dots from "../images/Mobile/dots.svg";
import Typewriter from "typewriter-effect";
import AtharaxLogo from "../images/atharax-final-logo.svg";
import Arrow from "../images/Mobile/arrow-down-circle.svg";
import Instagram from "../images/instagram.svg";
import Gmail from "../images/google.svg";
import Linkedin from "../images/linkedin.svg";
import Menu from "../images/Mobile/menu_icon.svg";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

function Mobile() {
  const [isTop, setIsTop] = useState(false); 
  const [isToggled, setIsToggled] = useState(false);
  // Default to false
  const handleToggled = () => {
    setIsToggled(prevState => !prevState); // Toggle the state between true and false
  };

  useEffect(() => {
    const handleScroll = () => {
      const footerSection = document.querySelector(".footer");

      if (footerSection) {
        const rect = footerSection.getBoundingClientRect();

        // Check if the top of the contact section is at the top of the viewport
        if (rect.top <= 0 && rect.bottom >= 0) {
          setIsTop(true); // In view
        } else {
          setIsTop(false); // Out of view
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="nav">
        <a href="#">
          <img src={AtharaxLogo} alt="Logo"></img>
        </a>
        <button className={`menu-button ${isToggled ? "toggled" : ""}`} onClick={handleToggled}>
          <img src={Menu} alt="Menu" />
        </button>
      </div>
      <div className="home-screen" id="home">
        <div className="title-mobile">ATHARAX</div>
        <div className="arrow-down">
          <a href="#about">
            <img src={Arrow} alt="arrow down"></img>
          </a>
        </div>
      </div>

      <div className={`side-menu ${isToggled ? "show" : ""}`}>
        <div className="side-menu-list">
          <a href="#home" onClick={() => setIsToggled(false)}>HOME</a>
          <a href="#about" onClick={() => setIsToggled(false)}>ABOUT</a>
          <a href="#workflow" onClick={() => setIsToggled(false)}>WORKFLOW</a>
          <a href="#contact" onClick={() => setIsToggled(false)}>CONTACT</a>
        </div>
      </div>

      <div className="about" id="about">
        <div className="glass-about">
          <p className="about-text-mobile">
            <span className="about-type-mobile">
              <Typewriter
                options={{
                  strings: ["DEVELOPING", "DESIGNING"],
                  autoStart: true,
                  loop: true,
                  delay: 70,
                  deleteSpeed: 50,
                }}
              />
            </span>
            <br />
            <span className="your-span">YOUR</span>
            <span className="ideas-span">IDEAS</span>
            <span className="into-span">INTO</span>
            <span className="reality-span">REALITY</span>
          </p>
        </div>
      </div>

      <div className="workflow-mobile" id="workflow">
        <div className="glass-workflow">
          <div className="workflow-column">
            <a href="#briefing">
              <div className="div-one-five">
                <div className="div-numbers">
                  <p>1</p>
                </div>
                <div className="div-numbers-text">
                  <h2>BRIEFING</h2>
                </div>
              </div>
            </a>
            <a href="#wireframe">
              <div className="div-one-five">
                <div className="div-numbers">
                  <p>2</p>
                </div>
                <div className="div-numbers-text">
                  <h2>WIREFRAME</h2>
                </div>
              </div>
            </a>
            <a href="#design">
              <div className="div-one-five">
                <div className="div-numbers">
                  <p>3</p>
                </div>
                <div className="div-numbers-text">
                  <h2>DESIGN</h2>
                </div>
              </div>
            </a>
            <a href="#develop">
              <div className="div-one-five">
                <div className="div-numbers">
                  <p>4</p>
                </div>
                <div className="div-numbers-text">
                  <h2>DEVELOP</h2>
                </div>
              </div>
            </a>
            <a href="#testing">
              <div className="div-one-five">
                <div className="div-numbers">
                  <p>5</p>
                </div>
                <div className="div-numbers-text">
                  <h2>TESTING</h2>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="briefing" id="briefing">
        <div className="briefing-asset">
          <img src={Star}></img>
        </div>
        <div className="briefing-h2">
          <h2>BRIEFING</h2>
        </div>
        <div className="briefing-p">
          <p>
            We start by holding meetings with the client to understand their
            needs and project goals.
          </p>
        </div>
      </div>
      <div className="wireframe" id="wireframe">
        <div className="wireframe-asset">
          <img src={Double}></img>
        </div>
        <div className="wireframe-h2">
          <h2>WIREFRAME</h2>
        </div>
        <div className="wireframe-p">
          <p>
            We create a rough prototype of the website, outlining its structure
            and layout in a basic form.
          </p>
        </div>
      </div>
      <div className="design" id="design">
        <div className="design-asset">
          <img src={Square}></img>
        </div>
        <div className="design-h2">
          <h2>DESIGN</h2>
        </div>
        <div className="design-p">
          <p>
            We focus on UX and visual design, applying the visual elements and
            ensuring a user-friendly experience.
          </p>
        </div>
      </div>
      <div className="develop" id="develop">
        <div className="develop-asset">
          <img src={Dots}></img>
        </div>
        <div className="develop-h2">
          <h2>DEVELOP</h2>
        </div>
        <div className="develop-p">
          <p>
            We handle all programming tasks, bringing the design to life and
            implementing the necessary functionalities.
          </p>
        </div>
      </div>
      <div className="testing" id="testing">
        <div className="testing-asset">
          <img src={Esphere}></img>
        </div>
        <div className="testing-h2">
          <h2>TESTING</h2>
        </div>
        <div className="testing-p">
          <p>
            Before delivery, we conduct thorough testing to ensure everything is
            working as expected.
          </p>
        </div>
      </div>

      <div className={`footer ${isTop ? "top" : ""}`} id="contact">
        <div className="footer-p-div">
          <p>
            READY {<br />}
            TO{<br />}
            START?
          </p>
        </div>
        <div className="socials-row">
          <a
            href="https://www.instagram.com/atharax.co/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Instagram}></img>
          </a>
          <a
            href="mailto:atharax.co@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Gmail}></img>
          </a>
          <a
            href="https://www.linkedin.com/company/atharax"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Linkedin}></img>
          </a>
        </div>
      </div>
    </>
  );
}

export default Mobile;
