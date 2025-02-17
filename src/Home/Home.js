import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";

import CursorFollower from "../Cursor/Cursor";
import AtharaxLogo from "../images/atharax-final-logo.svg";
import AsianCyborg from "../images/asian-cyborg.webp";

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
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state
  const [counter, setCounter] = useState(0);
  const words = "TURNING YOUR IDEAS INTO REALITY ";

  useLayoutEffect(() => {
    const target = 100;
    let countInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev < target) {
          const increment = Math.floor(Math.random() * 10) + 1; // Random increment between 1 and 10
          return Math.min(prev + increment, target); // Ensure it doesn't exceed 100
        }
        clearInterval(countInterval);
        return target;
      });
    }, 120); // Adjust this interval for speed

    return () => clearInterval(countInterval);
  }, []);

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
    SplitText
  );

  useEffect(() => {
    let smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
      smoothTouch: 0.1,
      speed: 0.5,
    });

    gsap.utils.toArray("a").forEach(function (button) {
      button.addEventListener("click", (e) => {
        const anchor = e.target.closest("a"); // Get the closest anchor element
        const href = anchor.getAttribute("href"); // Get the href value

        if (href && href.startsWith("#")) {
          e.preventDefault(); // Prevent default browser action for hash links
          console.log(href);
          const targetElement = document.querySelector(href); // Get the target element
          if (targetElement) {
            // Smooth scroll to the target element
            smoother.scrollTo(targetElement, true, "top top");

            // Properly construct the relative URL, ensuring no stacking
            const relativePath = `${window.location.pathname
              .split("/")
              .slice(0, -1)
              .join("/")}${href.replace("#", "/")}`;
            window.history.pushState(null, "", relativePath);
          }
        }
      });
    });

    window.onload = () => {
      // Check if the URL ends with a section path
      const sectionPath = window.location.pathname.split("/").pop();
      if (sectionPath && sectionPath !== "") {
        const rootPath =
          window.location.pathname.split("/").slice(0, -1).join("/") || "/";
        window.history.replaceState(null, "", rootPath); // Update URL to the root
      }
      const sectionElement = document.querySelector(`#${sectionPath}`);
      if (sectionElement) {
        smoother.scrollTo(sectionElement, true, "top top");
      }
    };

    return () => {};
  }, []);

  useLayoutEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.paused(true); // Pause ScrollSmoother

    // Prevent scrolling on body
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";

    if (counter === 100) {
      let ctx = gsap.context(() => {
        const t1 = gsap.timeline({
          onComplete: () => {
            setIsLoading(false);
            document.body.style.overflow = ""; // Restore scrolling
            document.body.style.position = ""; // Reset position
            if (smoother) smoother.paused(false);
          },
          defaults: { duration: 2, ease: "none" },
        });

        t1.to(".preloader1", { yPercent: -100, delay: 1, duration: 1.5 }, 0)
          .to(".preloader2", { yPercent: -100, delay: 1.2, duration: 1.5 }, 0)
          .to(".preloader3", { yPercent: -100, delay: 1.1, duration: 1.5 }, 0)
          .to(".preloader4", { yPercent: -100, delay: 0.6, duration: 1.5 }, 0)
          .to(".preloader5", { yPercent: -100, delay: 1, duration: 1.5 }, 0)
          .to(".preloader6", { yPercent: -100, delay: 1.3, duration: 1.5 }, 0)
          .to(".preloader7", { yPercent: -100, delay: 0.9, duration: 1.5 }, 0)
          .to(".preloader8", { yPercent: -100, delay: 0.5, duration: 1.5 }, 0)
          .to(".preloader9", { yPercent: -100, delay: 1.1, duration: 1.5 }, 0)
          .to(".preloader10", { yPercent: -100, delay: 0.7, duration: 1.5 }, 0)
          .to(
            ".preloader1-down",
            { yPercent: 100, delay: 1.2, duration: 1.5 },
            0
          )
          .to(
            ".preloader2-down",
            { yPercent: 100, delay: 0.7, duration: 1.5 },
            0
          )
          .to(".preloader3-down", { yPercent: 100, delay: 1, duration: 1.5 }, 0)
          .to(
            ".preloader4-down",
            { yPercent: 100, delay: 0.6, duration: 1.5 },
            0
          )
          .to(
            ".preloader5-down",
            { yPercent: 100, delay: 0.8, duration: 1.5 },
            0
          )
          .to(
            ".preloader6-down",
            { yPercent: 100, delay: 1.3, duration: 1.5, onComplete: () => {
              setIsLoading(false);
              document.body.style.overflow = ""; // Restore scrolling
              document.body.style.position = ""; // Reset position
              if (smoother) smoother.paused(false);
            }, },
            0
          )
          .to(
            ".preloader7-down",
            { yPercent: 100, delay: 0.78, duration: 1.5 },
            0
          )
          .to(".preloader8-down", { yPercent: 100, delay: 1, duration: 1.5 }, 0)
          .to(
            ".preloader9-down",
            { yPercent: 100, delay: 0.67, duration: 1.5 },
            0
          )
          .to(
            ".preloader10-down",
            { yPercent: 100, delay: 0.87, duration: 1.5 },
            0
          )
          .fromTo(".asian-cyb", { scale: 1.5 }, { scale: 1, duration: 1.5 })
          .to(
            "#title",
            {
              scrambleText: {
                text: "ATHARAX",
                chars: "13579",
                revealDelay: 0.5,
                tweenLength: true,
              },
            },
            "-=3"
          )
          .fromTo(
            ".header-logo",
            { left: "-20%" },
            { left: "5%", duration: 4, ease: "in-out" },
            0
          )
          .fromTo(
            ".time-div",
            { opacity: 0, top: "-10%" },
            { opacity: 1, top: "85%", duration: 4, ease: "in-out" },
            0
          );

        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".header",
              start: "top top",
              scrub: 1,
            },
          })
          .fromTo(".header", { scale: 1 }, { scale: 1.55 })
          .fromTo(".solid-color-layer", { opacity: 0 }, { opacity: 1 }, 0);
      });

      return () => {
        ctx.revert();
        document.body.style.overflow = ""; // Reset body styles
        document.body.style.position = "";
        if (smoother) smoother.paused(false);
      };
    }
  }, [counter]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-content",
          start: "top top",
          scrub: 1,
          pin: true,
          pinSpacing: false,
          toggleActions: "play none none reverse",
        },
      });
      t1.to(new SplitText(".about-description", { type: "words" }).words, {
        color: "rgb(222, 176, 252)",
        duration: 0.1,
        stagger: 0.005,
      });
    }, aboutContainer);

    return () => ctx.revert();
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

      tl.fromTo(
        imgInit,
        { scale: 1, xPercent: -50, yPercent: -50 },
        { scale: 0.75, xPercent: -24, yPercent: -60.8, duration: 3 }
      )
        .fromTo(
          elementsToFade,
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1, duration: 3 }
        )
        .addPause(10)
        .fromTo(elementsToFade, { opacity: 1 }, { opacity: 0, duration: 3 })
        .fromTo(
          imgInit,
          { scale: 0.75, xPercent: -24, yPercent: -60.8 },
          {
            scale: 1,
            xPercent: -50,
            yPercent: -50,
            duration: 3,
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
        { scale: 0.75, xPercent: -76, yPercent: -60.8, duration: 3 }
      )
        .fromTo(
          elementsToFade,
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1, duration: 3 }
        )
        .addPause(10)
        .fromTo(elementsToFade, { opacity: 1 }, { opacity: 0, duration: 3 })
        .fromTo(
          imgInitTwo,
          { scale: 0.75, xPercent: -76, yPercent: -60.8 },
          {
            scale: 1,
            xPercent: -50,
            yPercent: -50,
            duration: 3,
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
        { scale: 0.75, xPercent: 90.25, yPercent: -60.8, duration: 3 }
      )
        .fromTo(
          elementsToFade,
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1, duration: 3 }
        )
        .addPause(10)
        .fromTo(elementsToFade, { opacity: 1 }, { opacity: 0, duration: 3 })
        .fromTo(
          imgInitThree,
          { scale: 0.75, xPercent: 90.25, yPercent: -60.8 },
          {
            scale: 1,
            xPercent: -50,
            yPercent: -50,
            duration: 3,
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
        { scale: 0.75, xPercent: -76, yPercent: -24.55, duration: 3 }
      )
        .fromTo(
          elementsToFade,
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1, duration: 3 }
        )
        .addPause(10)
        .fromTo(elementsToFade, { opacity: 1 }, { opacity: 0, duration: 3 })
        .fromTo(
          imgInitFour,
          { scale: 0.75, xPercent: -76, yPercent: -24.55 },
          {
            scale: 1,
            xPercent: -50,
            yPercent: -50,
            duration: 3,
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
        { scale: 0.75, xPercent: -23.75, yPercent: -24.55, duration: 3 }
      )
        .fromTo(
          elementsToFade,
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1, duration: 3 }
        )
        .addPause(10)
        .fromTo(elementsToFade, { opacity: 1 }, { opacity: 0, duration: 3 })
        .fromTo(
          imgInitFive,
          { scale: 0.75, xPercent: -23.75, yPercent: -24.55 },
          {
            scale: 1,
            xPercent: -50,
            yPercent: -50,
            duration: 3,
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
        { background: "#f4f3f2", duration: 3, ease: "power2.inOut" } // Use easing
      )
        .fromTo(
          ".footer-p",
          { background: "#000", scale: 1 },
          {
            background: "#f4f3f2",
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
    const elements = [
      { trigger: ".sticky-two", targets: ".sticky-two, .img-init-two" },
      { trigger: ".sticky-three", targets: ".sticky-three, .img-init-three" },
      { trigger: ".sticky-four", targets: ".sticky-four, .img-init-four" },
      { trigger: ".sticky-five", targets: ".sticky-five, .img-init-five" },
      { trigger: ".sticky-footer", targets: ".sticky-footer", duration: 0 },
    ];

    elements.forEach(({ trigger, targets, duration = 1 }) => {
      gsap.to(targets, {
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          toggleActions: "play none none reverse",
        },
        autoAlpha: 1,
        duration: duration,
      });
    });
  }, []);

  return (
    <div id="smooth-wrapper" className="all">
      <div id="smooth-content">
        <div className="preloader-container">
          <div className="counter">
            <div className={`counter ${counter === 100 ? "invisible" : ""}`}>
              {counter}
            </div>
          </div>
          <div>
            <div className="preloader1"></div>
            <div className="preloader2"></div>
            <div className="preloader3"></div>
            <div className="preloader4"></div>
            <div className="preloader5"></div>
            <div className="preloader6"></div>
            <div className="preloader7"></div>
            <div className="preloader8"></div>
            <div className="preloader9"></div>
            <div className="preloader10"></div>
            <div className="preloader1-down"></div>
            <div className="preloader2-down"></div>
            <div className="preloader3-down"></div>
            <div className="preloader4-down"></div>
            <div className="preloader5-down"></div>
            <div className="preloader6-down"></div>
            <div className="preloader7-down"></div>
            <div className="preloader8-down"></div>
            <div className="preloader9-down"></div>
            <div className="preloader10-down"></div>
          </div>
        </div>
        <header className="header" id="home">
          <div className="solid-color-layer"></div>
          <div className="asian-cyb">
            <img src={AsianCyborg} alt="Asian cyborg"></img>
          </div>
          <p className="title" id="title"></p>
          <div className="header-logo">
            <img src={AtharaxLogo} alt="Our company logo"></img>
          </div>
          <div className="time-div">
            <h3 className="glitch">{currentTime}</h3>
          </div>
          <div id="scroll-message">Scroll</div>
        </header>

        <main>
          <div id="about" className="about-content" ref={aboutContainer}>
            <div className="about-atharax">
              <h3>ABOUT US</h3>
            </div>
            <div className="about-nav">
              <ul>
                <a href="#home" className="hover-target">
                  <li>Home</li>
                </a>
                <a href="#workflow" className="hover-target">
                  <li>Workflow</li>
                </a>
                <a href="#contact" className="hover-target">
                  <li>Contact</li>
                </a>
              </ul>
            </div>
            <div className="jp-div">
              <p>ウェブデザインの未来は、無限の創造力が広がる次元の扉だ。</p>
            </div>
            <div className="about-description" id="about-description">
              <p>
                We are a company
                <br /> dedicated to
                <br /> transforming
                <br /> imagination into reality.
                <br /> Anything that
                <br /> relates to
                <br /> design and digital,
                <br /> from bold,
                <br /> unconventional ideas
                <br /> to sleek,
                <br /> minimalist visions.
              </p>
            </div>
            <div className="about-div-row"></div>
            <div className="carousel">
              <div className="carousel-content" ref={carouselRef}></div>
            </div>
          </div>
          <div id="workflow" className="workflow-section">
            <div ref={briefingContainer}>
              <div className="sticky">
                <div className="img-init"></div>
                <div className="mini-nav">
                  <h3>
                    <a href="#home" className="hover-target">
                      AtharaxCompany
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
                  <p>
                    <strong>SCROLL</strong>
                  </p>
                </div>
                <div className="img-asset-one"></div>
                <div className="briefing-extra">
                  <div className="briefing-home">
                    <h3>{currentTime}</h3>
                  </div>
                  <div className="briefing-next">
                    <img src={AtharaxLogo} alt="Our company logo"></img>
                  </div>
                </div>
              </div>
            </div>

            <div ref={wireframeContainer}>
              <div className="sticky-two">
                <div className="img-init-two"></div>
                <div className="mini-nav-two">
                  <h3>
                    <a href="#home" className="hover-target">
                      AtharaxCompany
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
                    Next, we whip up a <span>quick prototype</span>, mapping out
                    the &lt;structure and layout&gt; of your website in its{" "}
                    <strong>simplest form</strong>.
                  </p>
                </div>
                <div className="wire-temp">
                  <p>
                    <strong>SCROLL</strong>
                  </p>
                </div>
                <div className="img-asset-two"></div>
                <div className="wire-extra">
                  <div className="wire-home">
                    <h3>{currentTime}</h3>
                  </div>
                  <div className="wire-next">
                    <img src={AtharaxLogo} alt="Our company logo"></img>
                  </div>
                </div>
              </div>
            </div>

            <div ref={designContainer}>
              <div className="sticky-three">
                <div className="img-init-three"></div>
                <div className="mini-nav-three">
                  <h3>
                    <a href="#home" className="hover-target">
                      AtharaxCompany
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
                  <p>
                    <strong>SCROLL</strong>
                  </p>
                </div>
                <div className="img-asset-three"></div>
                <div className="design-extra">
                  <div className="design-home">
                    <h3>{currentTime}</h3>
                  </div>
                  <div className="design-next">
                    <img src={AtharaxLogo} alt="Our company logo"></img>
                  </div>
                </div>
              </div>
            </div>

            <div ref={developContainer}>
              <div className="sticky-four">
                <div className="img-init-four"></div>
                <div className="mini-nav-four">
                  <h3>
                    <a href="#home" className="hover-target">
                      AtharaxCompany
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
                  <p>
                    <strong>SCROLL</strong>
                  </p>
                </div>
                <div className="img-asset-four"></div>
                <div className="develop-extra">
                  <div className="develop-home">
                    <h3>{currentTime}</h3>
                  </div>
                  <div className="develop-next">
                    <img src={AtharaxLogo} alt="Our company logo"></img>
                  </div>
                </div>
              </div>
            </div>

            <div ref={testContainer}>
              <div className="sticky-five">
                <div className="img-init-five"></div>
                <div className="mini-nav-five">
                  <h3>
                    <a href="#home" className="hover-target">
                      AtharaxCompany
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
                    Finally, we <span>test everything</span>—thoroughly checking
                    every detail to ensure it's{" "}
                    <strong>fully functional</strong>, including usability.
                  </p>
                </div>
                <div className="test-temp">
                  <p>
                    <strong>SCROLL</strong>
                  </p>
                </div>
                <div className="img-asset-five"></div>
                <div className="test-extra">
                  <div className="test-home">
                    <h3>{currentTime}</h3>
                  </div>
                  <div className="test-next">
                    <img src={AtharaxLogo} alt="Our company logo"></img>
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
  );
}

export default Home;
