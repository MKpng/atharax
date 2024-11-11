import "./Mobile.scss";

import AtharaxLogo from "../images/atharax-final-logo.svg";
import Arrow from "../images/Mobile/arrow-down-circle.svg";
import Instagram from "../images/instagram.svg";
import Gmail from "../images/google.svg";
import Linkedin from "../images/linkedin.svg";
import Menu from "../images/Mobile/menu_icon.svg";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { DrawSVGPlugin } from "gsap/all";

function Mobile() {
  const [isToggled, setIsToggled] = useState(false);
  const carouselRef = useRef(null);
  const aboutContainer = useRef(null);
  const briefingContainer = useRef(null);
  const wireframeContainer = useRef(null);
  const designContainer = useRef(null);
  const developContainer = useRef(null);
  const testingContainer = useRef(null);
  const footerContainer = useRef(null);
  const words = "TURNING YOUR IDEAS INTO REALITY ";

  const handleToggled = () => {
    setIsToggled((prevState) => !prevState); // Toggle the state between true and false
  };

  gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin,
    ScrollSmoother,
    ScrambleTextPlugin,
    DrawSVGPlugin
  );

  useEffect(() => {
    let smoother = ScrollSmoother.create({
      smooth: .5,
      effects: true,
      smoothTouch: 0.1,
      speed: 0.25,
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

    const tl = gsap.timeline({ defaults: { duration: 2, ease: "none" } });
    tl.to("#title-mobile", {
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
          trigger: ".home-screen",
          start: "top top",
          scrub: 1,
        },
      })
      .fromTo(
        ".home-screen",
        { scale: 1, filter: "blur(0px)" },
        { scale: 1.5, filter: "blur(30px)", duration: 3 }
      )
      .fromTo(
        ".solid-color-layer-mobile",
        { opacity: 0 },
        { opacity: 1, duration: 10 }
      );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    carousel.innerHTML = `${words.repeat(10)}`; // Repeat text to fill space
    const totalWidth = carousel.scrollWidth / 2; // Get half the total width

    gsap.to(carousel, {
      x: -totalWidth, // Move to offscreen left
      duration: 50, // Duration of the animation (adjust as needed)
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const imgInit = ".briefing-asset";
      const elementsToFade = ".briefing-h2, .briefing-p";

      // First timeline with initial animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-one-mobile",
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
        { scale: 0.85 },
        {
          scale: 1,
          immediateRender: false, // Ensures it waits for the animation to start
        }
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
          { scale: 1 },
          {
            scale: 0.85,
            immediateRender: false, // Ensures it waits for the animation to start
          }
        )
        .fromTo(imgInit, { opacity: 1 }, { opacity: 0 });
    }, briefingContainer);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const imgInit = ".wireframe-asset";
      const elementsToFade = ".wireframe-h2, .wireframe-p";

      // First timeline with initial animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-two-mobile",
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
        { scale: 0.85 },
        {
          scale: 1,
          immediateRender: false, // Ensures it waits for the animation to start
        }
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
          { scale: 1 },
          {
            scale: 0.85,
            immediateRender: false, // Ensures it waits for the animation to start
          }
        )
        .fromTo(imgInit, { opacity: 1 }, { opacity: 0 });
    }, wireframeContainer);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const imgInit = ".design-asset";
      const elementsToFade = ".design-h2, .design-p";

      // First timeline with initial animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-three-mobile",
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
        { scale: 0.85 },
        {
          scale: 1,
          immediateRender: false, // Ensures it waits for the animation to start
        }
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
          { scale: 1 },
          {
            scale: 0.85,
            immediateRender: false, // Ensures it waits for the animation to start
          }
        )
        .fromTo(imgInit, { opacity: 1 }, { opacity: 0 });
    }, designContainer);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const imgInit = ".develop-asset";
      const elementsToFade = ".develop-h2, .develop-p";

      // First timeline with initial animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-four-mobile",
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
        { scale: 0.85 },
        {
          scale: 1,
          immediateRender: false, // Ensures it waits for the animation to start
        }
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
          { scale: 1 },
          {
            scale: 0.85,
            immediateRender: false, // Ensures it waits for the animation to start
          }
        )
        .fromTo(imgInit, { opacity: 1 }, { opacity: 0 });
    }, developContainer);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const imgInit = ".testing-asset";
      const elementsToFade = ".testing-h2, .testing-p";

      // First timeline with initial animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-five-mobile",
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
        { scale: 0.85 },
        {
          scale: 1,
          immediateRender: false, // Ensures it waits for the animation to start
        }
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
          { scale: 1 },
          {
            scale: 0.85,
            immediateRender: false, // Ensures it waits for the animation to start
          }
        )
        .fromTo(imgInit, { opacity: 1 }, { opacity: 0 });
    }, testingContainer);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".footer-sticky-mobile",
          start: "top top",
          pin: true,
          pinSpacing: false,
          scrub: 2, // Increase scrub for smoother transition
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".footer-sticky-mobile",
        { background: "#000" },
        { background: "#E6E6FA", duration: 3, ease: "power2.inOut" } // Use easing
      )
        .fromTo(
          ".footer-p-mobile",
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
          ".atharax-big-mobile",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 2, ease: "power2.inOut" } // Add easing
        );
    }, footerContainer);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.to(".sticky-two-mobile, .wireframe-asset", {
      scrollTrigger: {
        trigger: ".sticky-two-mobile", // Element to trigger on scroll
        start: "top top", // When the bottom of the landing page reaches the bottom of the viewport
        toggleActions: "play none none reverse", // Play animation when scrolling down, reverse when scrolling up
      },
      autoAlpha: 1, // Fade in the element
      duration: 1, // Animation duration
    });
    gsap.to(".sticky-three-mobile, .design-asset", {
      scrollTrigger: {
        trigger: ".sticky-three-mobile", // Element to trigger on scroll
        start: "top top", // When the bottom of the landing page reaches the bottom of the viewport
        toggleActions: "play none none reverse", // Play animation when scrolling down, reverse when scrolling up
      },
      autoAlpha: 1, // Fade in the element
      duration: 1, // Animation duration
    });
    gsap.to(".sticky-four-mobile, .develop-asset", {
      scrollTrigger: {
        trigger: ".sticky-four-mobile", // Element to trigger on scroll
        start: "top top", // When the bottom of the landing page reaches the bottom of the viewport
        toggleActions: "play none none reverse", // Play animation when scrolling down, reverse when scrolling up
      },
      autoAlpha: 1, // Fade in the element
      duration: 1, // Animation duration
    });
    gsap.to(".sticky-five-mobile, .testing-asset", {
      scrollTrigger: {
        trigger: ".sticky-five-mobile", // Element to trigger on scroll
        start: "top top", // When the bottom of the landing page reaches the bottom of the viewport
        toggleActions: "play none none reverse", // Play animation when scrolling down, reverse when scrolling up
      },
      autoAlpha: 1, // Fade in the element
      duration: 1, // Animation duration
    });
    gsap.to(".footer-sticky-mobile", {
      scrollTrigger: {
        trigger: ".footer-sticky-mobile", // Element to trigger on scroll
        start: "top top",
        toggleActions: "play none none reverse", // When the bottom of the landing page reaches the bottom of the viewport // Play animation when scrolling down, reverse when scrolling up
      },
      autoAlpha: 1, // Fade in the element
      duration: 0, // Animation duration
    });
  }, []);

  return (
    <div id="smooth-wrapper">
      <div className="nav">
        <a href="#home">
          <img src={AtharaxLogo} alt="Logo"></img>
        </a>
        <button
          className={`menu-button ${isToggled ? "toggled" : ""}`}
          onClick={handleToggled}
        >
          <img src={Menu} alt="Menu" />
        </button>
      </div>
      <div className={`side-menu ${isToggled ? "show" : ""}`}>
        <div className="side-menu-list">
          <a href="#home" onClick={() => setIsToggled(false)}>
            HOME
          </a>
          <a href="#about" onClick={() => setIsToggled(false)}>
            ABOUT
          </a>
          <a href="#workflow" onClick={() => setIsToggled(false)}>
            WORKFLOW
          </a>
          <a href="#contact" onClick={() => setIsToggled(false)}>
            CONTACT
          </a>
        </div>
      </div>
      <div id="smooth-content">
        <div className="home-screen" id="home">
          <div className="solid-color-layer-mobile"></div>
          <div className="asian-cyb-mobile"></div>
          <div className="title-mobile" id="title-mobile"></div>
          <div className="arrow-down">
            <a href="#about">
              <img src={Arrow} alt="arrow down"></img>
            </a>
          </div>
        </div>

        <main>
          <div id="about" className="about-content-mobile" ref={aboutContainer}>
            <div className="glassmorphism">
              <h3 className="about-atharax-mobile">ABOUT US</h3>
              <div className="about-div-row-mobile"></div>
              <div className="carousel-mobile">
                <div
                  className="carousel-content-mobile"
                  ref={carouselRef}
                ></div>
              </div>
            </div>
          </div>
        </main>

        <div className="workflow-mobile" id="workflow" ref={briefingContainer}>
          <div className="briefing" id="briefing">
            <div className="sticky-one-mobile" >
              <div className="briefing-asset">
                <div className="briefing-asset-glass"></div>
              </div>
              <div className="briefing-h2">
                <h2>BRIEFING</h2>
              </div>
              <div className="briefing-p">
                <p>
                  First, we kick things off with a meeting to{" "}
                  <span>get on the same page</span>, &lt;making sure&gt; we
                  fully get your <strong>needs</strong> and{" "}
                  <strong>goals</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="wireframe" id="wireframe" ref={wireframeContainer}>
            <div className="sticky-two-mobile" >
              <div className="wireframe-asset">
                <div className="wireframe-asset-glass"></div>
              </div>
              <div className="wireframe-h2">
                <h2>WIREFRAME</h2>
              </div>
              <div className="wireframe-p">
                <p>
                  Next, we whip up a <span>quick prototype</span>, mapping out
                  the &lt;structure and layout&gt; of your website in its{" "}
                  <strong>simplest form</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="design" id="design" ref={designContainer}>
            <div className="sticky-three-mobile" >
              <div className="design-asset">
                <div className="design-asset-glass"></div>
              </div>
              <div className="design-h2">
                <h2>DESIGN</h2>
              </div>
              <div className="design-p">
                <p>
                  It’s all about visuals! We refine <span>UX</span> and{" "}
                  <span>design</span> for a smooth,
                  <strong> user-friendly experience</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="develop" id="develop" ref={developContainer}>
            <div className="sticky-four-mobile" >
              <div className="develop-asset">
                <div className="develop-asset-glass"></div>
              </div>
              <div className="develop-h2">
                <h2>DEVELOP</h2>
              </div>
              <div className="develop-p">
                <p>
                  We &lt;bring it all to life&gt; with some{" "}
                  <span>coding magic</span>, making sure everything{" "}
                  <strong>functions</strong> just the way it should.
                </p>
              </div>
            </div>
          </div>

          <div className="testing" id="testing" ref={testingContainer}>
            <div className="sticky-five-mobile" >
              <div className="testing-asset">
                <div className="testing-asset-glass"></div>
              </div>
              <div className="testing-h2">
                <h2>TESTING</h2>
              </div>
              <div className="testing-p">
                <p>
                  Finally, we <span>test everything</span>—thoroughly checking
                  every detail to ensure it's <strong>fully functional</strong>,
                  including usability.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer" id="contact" ref={footerContainer}>
          <div className="footer-sticky-mobile">
            <p className="footer-p-mobile">Ready to Start?</p>
            <p className="atharax-big-mobile">ATHARAX</p>
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
        </div>
      </div>
    </div>
  );
}

export default Mobile;
