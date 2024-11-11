import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { DrawSVGPlugin } from "gsap/all";

import CursorFollower from "../Cursor/Cursor";
import WeatherWidget from "../Temperature/Temperature";

import AtharaxLogo from "../images/atharax-final-logo.svg";
import Instagram from "../images/instagram.svg";
import Gmail from "../images/google.svg";
import Linkedin from "../images/linkedin.svg";
import { ReactComponent as AssetsOne } from "../images/Asset 1.svg";

import "./Home.css";

function Home() {
  const [currentTime, setCurrentTime] = useState("");
  const aboutContainer = useRef(null);
  const briefingContainer = useRef(null);
  const wireframeContainer = useRef(null);
  const designContainer = useRef(null);
  const developContainer = useRef(null);
  const testContainer = useRef(null);
  const footerContainer = useRef(null);
  const carouselRef = useRef(null);
  const svgRef = useRef(null);
  const words = "TURNING YOUR IDEAS INTO REALITY ";

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toTimeString().slice(0, 8); // "HH:MM:SS"
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    carousel.innerHTML = `${words.repeat(10)}`; // Repeat text to fill space
    const totalWidth = carousel.scrollWidth / 2; // Get half the total width

    gsap.to(carousel, {
      x: -totalWidth, // Move to offscreen left
      duration: 80, // Duration of the animation (adjust as needed)
      ease: "linear", // Linear easing for constant speed
      repeat: -1, // Infinite repeat
      modifiers: {
        x: gsap.utils.unitize((x) => {
          // Reset x position when reaching the end
          return parseFloat(x) % totalWidth;
        }),
      },
    });

    return () => {
      gsap.killTweensOf(carousel); // Cleanup on unmount
    };
  }, [words]);

  gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin,
    ScrollSmoother,
    ScrambleTextPlugin,
    DrawSVGPlugin
  );

  useEffect(() => {
    let smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
      smoothTouch: 0.1,
      speed: 0.75,
    });

    gsap.utils.toArray("a").forEach(function (button, i) {
      button.addEventListener("click", (e) => {
        const anchor = e.target.closest("a"); // Get the closest anchor element
        const href = anchor.getAttribute("href"); // Get the href value
    
        if (href && href.startsWith("#")) {
          e.preventDefault(); // Prevent default action only for internal hash links
          console.log(href);
          const targetElement = document.querySelector(href); // Get the target element
          if (targetElement) {
            smoother.scrollTo(targetElement, true, "top top");
          }
        }
      });
    });
    
    window.onload = () => {
      let urlHash = window.location.href.split("#")[1];
      if (urlHash) {
        let scrollElem = document.querySelector("#" + urlHash);
        console.log(scrollElem, urlHash);
        if (scrollElem) {
          smoother.scrollTo(scrollElem, true, "top top");
        }
      }
    };    

    const elementsToAnimate =
      ".inner, .instagram-icon, .linkedin-icon, .gmail-icon, .atharax-icon";

    const fadeInAnimation = gsap.to(elementsToAnimate, {
      scrollTrigger: {
        trigger: ".about-content",
        start: "top top",
        toggleActions: "play none none reverse",
      },
      autoAlpha: 1,
      duration: 1,
    });

    const fadeOutAnimation = gsap.to(elementsToAnimate, {
      scrollTrigger: {
        trigger: ".carousel",
        start: "bottom+=90% bottom",
        toggleActions: "play none none reverse", // Add toggle actions for smooth reversing
      },
      autoAlpha: 0,
      duration: 1,
    });

    const tl = gsap.timeline({ defaults: { duration: 2, ease: "none" } });
    tl.to("#title", {
      duration: 2,
      scrambleText: {
        text: "ATHARAX",
        chars: "13579",
        revealDelay: 0.3,
        tweenLength: true,
      },
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".header",
          start: "top top",
          scrub: 1,
        },
      })
      .fromTo(
        ".header",
        { scale: 1, filter: "blur(0px)" },
        { scale: 2, filter: "blur(50px)", duration: 3 }
      )
      .fromTo(
        ".solid-color-layer",
        { opacity: 0 },
        { opacity: 1, duration: 10 }
      );

    return () => {
      fadeInAnimation.kill();
      fadeOutAnimation.kill();
      tl.kill();
    };
  }, []);

  useLayoutEffect(() => {
    const svgElement = svgRef.current;

    gsap.fromTo(
      svgElement.querySelectorAll("line"), // Select all line elements
      { drawSVG: "0%" }, // Start from 0% drawn
      { drawSVG: "100%", duration: 1, stagger: 0.1 } // Draw to 100% over time
    );
  }, []);

  useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        const imgInit = ".img-init";
        const elementsToFade =
          ".work-briefing, .work-briefing-text, .briefing-temp, .img-asset-one, .briefing-extra, .mini-nav";

        // First timeline with initial animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".sticky",
            pin: true,
            scrub: 1,
            pinSpacing: false,
            start: "top top",
            toggleActions: "play none none reverse",
          },
        });

        // Combined transforms into a single fromTo call
        tl.fromTo(
          imgInit,
          { scale: 1, xPercent: -50, yPercent: -50 },
          { scale: 0.75, xPercent: -30, yPercent: -60 }
        )
          .fromTo(
            elementsToFade,
            { visibility: "hidden", opacity: 0 },
            { visibility: "visible", opacity: 1 }
          )
          .addPause(1.5)
          .fromTo(elementsToFade, { opacity: 1 }, { opacity: 0 })
          .fromTo(
            imgInit,
            { scale: 0.75, xPercent: -30, yPercent: -60 },
            {
              scale: 1,
              xPercent: -50,
              yPercent: -50,
              immediateRender: false, // Ensures it waits for the animation to start
            }
          )
          .fromTo(imgInit, { opacity: 1 }, { opacity: 0 });
      }, briefingContainer);

      return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const imgInitTwo = ".img-init-two";
      const elementsToFade =
        ".work-wire, .work-wire-text, .wire-temp, .img-asset-two, .wire-extra, .mini-nav-two";

      // First timeline with initial animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-two",
          start: "top top",
          pin: true,
          pinSpacing: false,
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      });

      // Combined transforms into a single fromTo call
      tl.fromTo(
        imgInitTwo,
        { scale: 1, xPercent: -50, yPercent: -50 },
        { scale: 0.75, xPercent: -82.25, yPercent: -60 }
      )
        .fromTo(
          elementsToFade,
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1 }
        )
        .addPause(1.5)
        .fromTo(elementsToFade, { opacity: 1 }, { opacity: 0 })
        .fromTo(
          imgInitTwo,
          { scale: 0.75, xPercent: -82.25, yPercent: -60 },
          {
            scale: 1,
            xPercent: -50,
            yPercent: -50,
            immediateRender: false,
          }
        )
        .fromTo(imgInitTwo, { opacity: 1 }, { opacity: 0 });
    }, wireframeContainer);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const imgInitThree = ".img-init-three";
      const elementsToFade =
        ".work-design, .work-design-text, .design-temp, .img-asset-three, .design-extra, .mini-nav-three";

      // First timeline with initial animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-three", // Adjust this to the element where the pinning should occur
          start: "top top",
          pin: true,
          pinSpacing: false,
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      });

      // Combined transforms into a single fromTo call
      tl.fromTo(
        imgInitThree,
        { scale: 1, xPercent: -50, yPercent: -50 },
        { scale: 0.75, xPercent: 84, yPercent: -60 }
      )
        .fromTo(
          elementsToFade,
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1 }
        )
        .addPause(1.5)
        .fromTo(elementsToFade, { opacity: 1 }, { opacity: 0 })
        .fromTo(
          imgInitThree,
          { scale: 0.75, xPercent: 84, yPercent: -60 },
          {
            scale: 1,
            xPercent: -50,
            yPercent: -50,
            immediateRender: false, // Ensures it waits for the animation to start
          }
        )
        .fromTo(imgInitThree, { opacity: 1 }, { opacity: 0 });
    }, designContainer);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const imgInitFour = ".img-init-four";
      const elementsToFade =
        ".work-develop, .work-develop-text, .develop-temp, .img-asset-four, .develop-extra, .mini-nav-four";

      // First timeline with initial animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-four", // Adjust this to the element where the pinning should occur
          start: "top top",
          pin: true,
          pinSpacing: false,
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      });

      // Combined transforms into a single fromTo call
      tl.fromTo(
        imgInitFour,
        { scale: 1, xPercent: -50, yPercent: -50 },
        { scale: 0.75, xPercent: -82.25, yPercent: -24.25 }
      )
        .fromTo(
          elementsToFade,
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1 }
        )
        .addPause(1.5)
        .fromTo(elementsToFade, { opacity: 1 }, { opacity: 0 })
        .fromTo(
          imgInitFour,
          { scale: 0.75, xPercent: -82.25, yPercent: -24.25 },
          {
            scale: 1,
            xPercent: -50,
            yPercent: -50,
            immediateRender: false, // Ensures it waits for the animation to start
          }
        )
        .fromTo(imgInitFour, { opacity: 1 }, { opacity: 0 });
    }, developContainer);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const imgInitFive = ".img-init-five";
      const elementsToFade =
        ".work-test, .work-test-text, .test-temp, .img-asset-five, .test-extra, .mini-nav-five";

      // First timeline with initial animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-five", // Adjust this to the element where the pinning should occur
          start: "top top",
          pin: true,
          pinSpacing: false,
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      });

      // Combined transforms into a single fromTo call
      tl.fromTo(
        imgInitFive,
        { scale: 1, xPercent: -50, yPercent: -50 },
        { scale: 0.75, xPercent: -30, yPercent: -24.25 }
      )
        .fromTo(
          elementsToFade,
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1 }
        )
        .addPause(1.5)
        .fromTo(elementsToFade, { opacity: 1 }, { opacity: 0 })
        .fromTo(
          imgInitFive,
          { scale: 0.75, xPercent: -30, yPercent: -24.25 },
          {
            scale: 1,
            xPercent: -50,
            yPercent: -50,
            immediateRender: false, // Ensures it waits for the animation to start
          }
        )
        .fromTo(imgInitFive, { opacity: 1 }, { opacity: 0 });
    }, testContainer);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-footer",
          start: "top top",
          pin: true,
          pinSpacing: false,
          scrub: 2, // Increase scrub for smoother transition
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".sticky-footer",
        { background: "#000" },
        { background: "#E6E6FA", duration: 3, ease: "power2.inOut" } // Use easing
      )
        .fromTo(
          ".footer-p",
          { background: "#000", scale: 1 },
          {
            background: "#E6E6FA",
            scale: 20,
            duration: 3,
            ease: "power2.inOut",
          },
          "<" // Start at the same time
        )
        .fromTo(
          ".atharax-big",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 2, ease: "power2.inOut" } // Add easing
        );
    }, footerContainer);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.to(".sticky-two, .img-init-two", {
      scrollTrigger: {
        trigger: ".sticky-two", // Element to trigger on scroll
        start: "top top", // When the bottom of the landing page reaches the bottom of the viewport
        toggleActions: "play none none reverse", // Play animation when scrolling down, reverse when scrolling up
      },
      autoAlpha: 1, // Fade in the element
      duration: 1, // Animation duration
    });

    gsap.to(".sticky-three, .img-init-three", {
      scrollTrigger: {
        trigger: ".sticky-three", // Element to trigger on scroll
        start: "top top", // When the bottom of the landing page reaches the bottom of the viewport
        toggleActions: "play none none reverse", // Play animation when scrolling down, reverse when scrolling up
      },
      autoAlpha: 1, // Fade in the element
      duration: 1, // Animation duration
    });

    gsap.to(".sticky-four, .img-init-four", {
      scrollTrigger: {
        trigger: ".sticky-four", // Element to trigger on scroll
        start: "top top", // When the bottom of the landing page reaches the bottom of the viewport
        toggleActions: "play none none reverse", // Play animation when scrolling down, reverse when scrolling up
      },
      autoAlpha: 1, // Fade in the element
      duration: 1, // Animation duration
    });

    gsap.to(".sticky-five, .img-init-five", {
      scrollTrigger: {
        trigger: ".sticky-five", // Element to trigger on scroll
        start: "top top", // When the bottom of the landing page reaches the bottom of the viewport
        toggleActions: "play none none reverse", // Play animation when scrolling down, reverse when scrolling up
      },
      autoAlpha: 1, // Fade in the element
      duration: 1, // Animation duration
    });

    gsap.to(".sticky-footer", {
      scrollTrigger: {
        trigger: ".sticky-footer", // Element to trigger on scroll
        start: "top top",
        toggleActions: "play none none reverse", // When the bottom of the landing page reaches the bottom of the viewport // Play animation when scrolling down, reverse when scrolling up
      },
      autoAlpha: 1, // Fade in the element
      duration: 0, // Animation duration
    });
  }, []);

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
    <>
      <div className="App" id="smooth-wrapper">
        <nav className="inner">
          <ul className="verticalMenu">
            {["About", "Workflow", "Contact"].map((item) => (
              <li className="glitch" data-text={item} key={item.toLowerCase()}>
                <a
                  className="menuAnchors hover-target"
                  href={`#${item.toLowerCase()}`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="atharax-icon hover-target">
          <a href="#home" onClick={() => window.location.reload()}>
            <img
              src={AtharaxLogo}
              className="spin"
              alt="Atharax Company Logo"
            />
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
              alt="Instagram Icon for Atharax"
            />
          </a>
        </div>
        <div className="icon-wrapper gmail-icon">
          <a
            href="mailto:atharax.co@gmail.com"
            className="hover-target magnetic-icon"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={Gmail}
              className="magnetic-icon"
              alt="Gmail Icon for Atharax"
            />
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
              alt="Linkedin Icon for Atharax"
            />
          </a>
        </div>

        <div id="smooth-content">
          <header className="header" id="home">
            <div className="solid-color-layer"></div>
            <div className="asian-cyb"></div>
            <p className="title" id="title"></p>
            <div className="draw-svg">
              <AssetsOne ref={svgRef} />
            </div>
            <div className="time-div">
              <h3 className="glitch" data-text={currentTime}>
                {currentTime}
              </h3>
            </div>
          </header>

          <main>
            <div id="about" className="about-content" ref={aboutContainer}>
              <div className="glassmorphism">
                <h3 className="about-atharax">ABOUT US</h3>
                <div className="about-div-row"></div>
                <div className="carousel">
                  <div className="carousel-content" ref={carouselRef}></div>
                </div>
              </div>
            </div>
            <div id="workflow" className="workflow-section">
              <div ref={briefingContainer}>
                <div className="sticky">
                  <div className="img-init">
                    <div className="img-init-glass"></div>
                  </div>
                  <div className="mini-nav">
                    <h3>
                      <a
                        href="#home"
                        onClick={() => window.location.reload()}
                        className="hover-target"
                      >
                        Atharax<span>Company</span>
                      </a>
                    </h3>
                    <ul>
                      <a href="#about" className="hover-target">
                        <li>About</li>
                      </a>
                      <a href="#workflow" className="hover-target">
                        <li>Workflow</li>
                      </a>
                      <a href="#contact" className="hover-target">
                        <li>Contact</li>
                      </a>
                    </ul>
                  </div>
                  <div className="work-briefing">
                    <h2 id="briefing">BRIEFING</h2>
                  </div>
                  <div className="work-briefing-text">
                    <p>
                      First, we kick things off with a meeting to{" "}
                      <span>get on the same page</span>, &lt;making sure&gt; we
                      fully get your <strong>needs</strong> and{" "}
                      <strong>goals</strong>.
                    </p>
                  </div>
                  <div className="briefing-temp">
                    <WeatherWidget />
                  </div>
                  <div className="img-asset-one"></div>
                  <div className="briefing-extra">
                    <div className="briefing-home">
                      <h3 data-text={currentTime}>{currentTime}</h3>
                    </div>
                    <div className="briefing-next">
                      <img src={AtharaxLogo}></img>
                    </div>
                  </div>
                </div>
              </div>

              <div ref={wireframeContainer}>
                <div className="sticky-two">
                  <div className="img-init-two">
                    <div className="img-init-glass-two"></div>
                  </div>
                  <div className="mini-nav-two">
                    <h3>
                      <a
                        href="#home"
                        onClick={() => window.location.reload()}
                        className="hover-target"
                      >
                        Atharax<span>Company</span>
                      </a>
                    </h3>
                    <ul>
                      <a href="#about" className="hover-target">
                        <li>About</li>
                      </a>
                      <a href="#workflow" className="hover-target">
                        <li>Workflow</li>
                      </a>
                      <a href="#contact" className="hover-target">
                        <li>Contact</li>
                      </a>
                    </ul>
                  </div>
                  <div className="work-wire">
                    <h2>Wireframe</h2>
                  </div>
                  <div className="work-wire-text">
                    <p>
                      Next, we whip up a <span>quick prototype</span>, mapping
                      out the &lt;structure and layout&gt; of your website in
                      its <strong>simplest form</strong>.
                    </p>
                  </div>
                  <div className="wire-temp">
                    <WeatherWidget />
                  </div>
                  <div className="img-asset-two"></div>
                  <div className="wire-extra">
                    <div className="wire-home">
                      <h3 data-text={currentTime}>{currentTime}</h3>
                    </div>
                    <div className="wire-next">
                      <img src={AtharaxLogo}></img>
                    </div>
                  </div>
                </div>
              </div>

              <div ref={designContainer}>
                <div className="sticky-three">
                  <div className="img-init-three">
                    <div className="img-init-glass-three"></div>
                  </div>
                  <div className="mini-nav-three">
                    <h3>
                      <a
                        href="#home"
                        onClick={() => window.location.reload()}
                        className="hover-target"
                      >
                        Atharax<span>Company</span>
                      </a>
                    </h3>
                    <ul>
                      <a href="#about" className="hover-target">
                        <li>About</li>
                      </a>
                      <a href="#workflow" className="hover-target">
                        <li>Workflow</li>
                      </a>
                      <a href="#contact" className="hover-target">
                        <li>Contact</li>
                      </a>
                    </ul>
                  </div>
                  <div className="work-design">
                    <h2>Design</h2>
                  </div>
                  <div className="work-design-text">
                    <p>
                      It’s all about visuals! We refine <span>UX</span> and{" "}
                      <span>design</span> for a smooth,
                      <strong> user-friendly experience</strong>.
                    </p>
                  </div>
                  <div className="design-temp">
                    <WeatherWidget />
                  </div>
                  <div className="img-asset-three"></div>
                  <div className="design-extra">
                    <div className="design-home">
                      <h3 data-text={currentTime}>{currentTime}</h3>
                    </div>
                    <div className="design-next">
                      <img src={AtharaxLogo}></img>
                    </div>
                  </div>
                </div>
              </div>

              <div ref={developContainer}>
                <div className="sticky-four">
                  <div className="img-init-four">
                    <div className="img-init-glass-four"></div>
                  </div>
                  <div className="mini-nav-four">
                    <h3>
                      <a
                        href="#home"
                        onClick={() => window.location.reload()}
                        className="hover-target"
                      >
                        Atharax<span>Company</span>
                      </a>
                    </h3>
                    <ul>
                      <a href="#about" className="hover-target">
                        <li>About</li>
                      </a>
                      <a href="#workflow" className="hover-target">
                        <li>Workflow</li>
                      </a>
                      <a href="#contact" className="hover-target">
                        <li>Contact</li>
                      </a>
                    </ul>
                  </div>
                  <div className="work-develop">
                    <h2>Develop</h2>
                  </div>
                  <div className="work-develop-text">
                    <p>
                      We &lt;bring it all to life&gt; with some{" "}
                      <span>coding magic</span>, making sure everything{" "}
                      <strong>functions</strong> just the way it should.
                    </p>
                  </div>
                  <div className="develop-temp">
                    <WeatherWidget />
                  </div>
                  <div className="img-asset-four"></div>
                  <div className="develop-extra">
                    <div className="develop-home">
                      <h3 data-text={currentTime}>{currentTime}</h3>
                    </div>
                    <div className="develop-next">
                      <img src={AtharaxLogo}></img>
                    </div>
                  </div>
                </div>
              </div>

              <div ref={testContainer}>
                <div className="sticky-five">
                  <div className="img-init-five">
                    <div className="img-init-glass-five"></div>
                  </div>
                  <div className="mini-nav-five">
                    <h3>
                      <a
                        href="#home"
                        onClick={() => window.location.reload()}
                        className="hover-target"
                      >
                        Atharax<span>Company</span>
                      </a>
                    </h3>
                    <ul>
                      <a href="#about" className="hover-target">
                        <li>About</li>
                      </a>
                      <a href="#workflow" className="hover-target">
                        <li>Workflow</li>
                      </a>
                      <a href="#contact" className="hover-target">
                        <li>Contact</li>
                      </a>
                    </ul>
                  </div>
                  <div className="work-test">
                    <h2>Testing</h2>
                  </div>
                  <div className="work-test-text">
                    <p>
                      Finally, we <span>test everything</span>—thoroughly
                      checking every detail to ensure it's{" "}
                      <strong>fully functional</strong>, including usability.
                    </p>
                  </div>
                  <div className="test-temp">
                    <WeatherWidget />
                  </div>
                  <div className="img-asset-five"></div>
                  <div className="test-extra">
                    <div className="test-home">
                      <h3 data-text={currentTime}>{currentTime}</h3>
                    </div>
                    <div className="test-next">
                      <img src={AtharaxLogo}></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer>
            <div className="contact" id="contact" ref={footerContainer}>
              <div className="sticky-footer">
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
                  <a href="#home" className="hover-target">
                    <img src={AtharaxLogo} alt="Atharax Logo"></img>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <CursorFollower />
      </div>
    </>
  );
}

export default Home;
