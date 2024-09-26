import React, { useState, useEffect } from "react";
import CursorFollower from "../Cursor/Cursor";
import Spline from "@splinetool/react-spline";
import Typewriter from "typewriter-effect";
import AtharaxLogo from "../images/atharax-final-logo.svg";
import Instagram from "../images/instagram.svg";
import Gmail from "../images/google.svg";
import Linkedin from "../images/linkedin.svg";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [isTop, setIsTop] = useState(false); // Default to false

  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.querySelector(".contact");

      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();

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

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const icons = document.querySelectorAll(".magnetic-icon");

    icons.forEach((icon) => {
      const wrapper = icon.closest(".icon-wrapper");

      if (wrapper) {
        const handleMouseMove = (e) => {
          const iconRect = wrapper.getBoundingClientRect();
          const xPos = e.clientX - iconRect.left - iconRect.width / 2;
          const yPos = e.clientY - iconRect.top - iconRect.height / 2;

          icon.style.transform = `translate(${xPos * 0.4}px, ${yPos * 0.4}px)`;
        };

        const handleMouseLeave = () => {
          icon.style.transform = "translate(0, 0)";
        };

        wrapper.addEventListener("mousemove", handleMouseMove);
        wrapper.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          wrapper.removeEventListener("mousemove", handleMouseMove);
          wrapper.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".glitch");
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (
          rect.top >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight)
        ) {
          element.classList.add("in-view");
        } else {
          element.classList.remove("in-view");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <div className="inner">
        <ul className="verticalMenu">
          <a className="menuAnchors hover-target" href="#about">
            <li className="glitch" data-text="About" key="about">
              About
            </li>
          </a>
          <a className="menuAnchors hover-target" href="#workflow">
            <li className="glitch" data-text="Workflow" key="workflow">
              Workflow
            </li>
          </a>
          <a className="menuAnchors hover-target" href="#contact">
            <li className="glitch" data-text="Contact" key="contact">
              Contact
            </li>
          </a>
        </ul>
      </div>
      <header className="header">
        <h1 className="title">ATHARAX</h1>
        <div className="robot">
          <Spline scene="https://prod.spline.design/mSL3GsHqE6uknFTZ/scene.splinecode"></Spline>
        </div>
      </header>

      <main>
        <div className="main-content">
          <div className="ghost-icon hover-target">
            <a href="#">
              <img src={AtharaxLogo} className="spin" alt="Company Logo"></img>
            </a>
          </div>
          <div className="icon-wrapper instagram-icon hover-target">
            <a
              href="https://www.instagram.com/atharax.co/"
              className="magnetic-icon"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={Instagram}
                className="magnetic-icon"
                alt="Instagram Icon"
              ></img>
            </a>
          </div>
          <div className="icon-wrapper gmail-icon">
            <a
              href="mailto:atharax.co@gmail.com"
              className="hover-target magnetic-icon"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Gmail} className="magnetic-icon" alt="Gmail Icon"></img>
            </a>
          </div>
          <div className="icon-wrapper linkedin-icon">
            <a
              href="https://www.linkedin.com/company/atharax"
              className="hover-target magnetic-icon"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={Linkedin}
                className="magnetic-icon"
                alt="Linkedin Icon"
              ></img>
            </a>
          </div>
          <div id="about" className="about-content">
            <div className="glassmorphism">
              <h3 className="about-atharax">ABOUT US</h3>
              <p className="about-text">
                <span className="about-type">
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

          <div id="workflow" className="workflow-section">
            <div className="workflow-glass">
              <div className="workflow-content">
                <div className="glass-two">
                  <div className="briefing-div">
                    <h2>BRIEFING</h2>
                    <p className="briefing-text">
                      We start by holding meetings with the client to understand
                      their needs and project goals.
                    </p>
                  </div>
                  <div className="wireframe-div">
                    <h2>WIREFRAME</h2>
                    <p className="wireframe-text">
                      We create a rough prototype of the website, outlining its
                      structure and layout in a basic form.
                    </p>
                  </div>
                  <div className="design-div">
                    <h2>DESIGN</h2>
                    <p className="designing-text">
                      We focus on UX and visual design, applying the visual
                      elements and ensuring a user-friendly experience.
                    </p>
                  </div>
                  <div className="development-div">
                    <h2>DEVELOPMENT</h2>
                    <p className="development-text">
                      We handle all programming tasks, bringing the design to
                      life and implementing the necessary functionalities.
                    </p>
                  </div>
                  <div className="testing-div">
                    <h2>TESTING</h2>
                    <p className="testing-text">
                      Before delivery, we conduct thorough testing to ensure
                      everything is working as expected, including usability
                      testing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className={`contact ${isTop ? "top" : ""}`} id="contact">
          <p className="footer-p">Ready to Start?</p>
          <p className="atharax-big">ATHARAX</p>
          <div className="socials-div">
            <a
              href="https://www.instagram.com/atharax.co/"
              target="_blank"
              rel="noreferrer"
              className="hover-target"
            >
              Instagram
            </a>
            <a
              href="mailto:atharax.co@gmail.com"
              target="_blank"
              className="hover-target"
              rel="noreferrer"
            >
              E-mail
            </a>
            <a
              href="https://www.linkedin.com/company/atharax"
              target="_blank"
              rel="noreferrer"
              className="hover-target"
            >
              Linkedin
            </a>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <a href="#" className="hover-target">
              <img src={AtharaxLogo} alt="Atharax Logo"></img>
            </a>
          </div>
        </div>
      </footer>
      <CursorFollower />
    </div>
  );
}

export default Home;
