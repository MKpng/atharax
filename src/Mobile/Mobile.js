import "./Mobile.scss";

import AtharaxLogo from "../images/Mobile/logo512.png.webp";
import Instagram from "../images/instagram.svg";
import Gmail from "../images/google.svg";
import Linkedin from "../images/linkedin.svg";
import Menu from "../images/Mobile/menu_icon.svg";
import Arrow from "../images/Mobile/chevron-double-down_7482911.svg";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";

function Mobile() {
  const [isToggled, setIsToggled] = useState(false);
  const carouselRef = useRef(null);
  const briefingContainer = useRef(null);
  const wireframeContainer = useRef(null);
  const designContainer = useRef(null);
  const developContainer = useRef(null);
  const testingContainer = useRef(null);
  const footerContainer = useRef(null);
  const aboutContainer = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const words = "TURNING YOUR IDEAS INTO REALITY ";

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  const toggleMenu = () => {
    setIsToggled((prevState) => !prevState); // Toggle the state
  };

  gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin,
    ScrollSmoother,
    ScrambleTextPlugin,
    SplitText
  );

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

  useLayoutEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.paused(true);
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";

    if (counter === 100) {
      let ctx = gsap.context(() => {
        const t1 = gsap.timeline({
          onComplete: () => {
            setIsLoading(false);
            document.body.style.overflow = "";
            document.body.style.position = "";
            if (smoother) smoother.paused(false);
          },
          defaults: { duration: 2, ease: "none" },
        });

        t1.to(".preloader1", { yPercent: -100, delay: 1, duration: .8 }, 0)
          .to(".preloader2", { yPercent: -100, delay: 1.2, duration: .8 }, 0)
          .to(".preloader3", { yPercent: -100, delay: 1.1, duration: .8 }, 0)
          .to(".preloader4", { yPercent: -100, delay: 0.6, duration: .8 }, 0)
          .to(".preloader5", { yPercent: -100, delay: 1, duration: .8 }, 0)
          .to(".preloader1-down",{ yPercent: 101, delay: 1.2, duration: .8 }, 0)
          .to(".preloader2-down",{ yPercent: 101, delay: 0.7, duration: .8 }, 0)
          .to(".preloader3-down", { yPercent: 101, delay: 1, duration: .8 }, 0)
          .to(".preloader4-down",{ yPercent: 101, delay: 0.6, duration: .8 }, 0)
          .to(".preloader5-down",{ yPercent: 101, delay: 0.8, duration: .8, onComplete: () => {
            document.body.style.overflow = "";
            document.body.style.position = "";
            if (smoother) smoother.paused(false);
          } }, 0)
          .fromTo(".nav", { opacity: 0 }, { opacity: 1, duration: .5 })
          .to(
            "#title-mobile",
            {
              scrambleText: {
                text: "ATHARAX",
                chars: "13579",
                revealDelay: 0.3,
                tweenLength: true,
              },
            },
            "-=1"
          )
          .fromTo(
            ".arrow-down",
            { visibility: "hidden", opacity: 0 },
            { visibility: "visible", opacity: 1, delay: .5 }, 0
          );
        gsap
          .timeline(
            {
              scrollTrigger: {
                trigger: ".home-screen",
                start: "top top",
                scrub: 1,
              },
            },
            0
          )
          .fromTo(
            ".solid-color-layer-mobile",
            { opacity: 0 },
            { opacity: 1 },
            0
          );
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
          trigger: ".about-content-mobile",
          start: "top top",
          scrub: 1,
          pin: true,
          pinSpacing: false,
          toggleActions: "play none none reverse",
        },
      });
      t1.to(
        new SplitText(".about-description-mobile", { type: "words" }).words,
        {
          color: "rgb(222, 176, 252)",
          duration: 0.1,
          stagger: 0.05,
        }
      );
    }, aboutContainer);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let smootherMobile = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
      speed: 0.5,
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
            smootherMobile.scrollTo(targetElement, true, "top top");
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
          smootherMobile.scrollTo(scrollElem, true, "top top");
        }
      }
    };
    return () => {};
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
          ".briefing-asset-glass",
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1 },
          0
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
        .fromTo(".briefing-asset-glass", { opacity: 1 }, { opacity: 0 })
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
          ".wireframe-asset-glass",
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1 },
          0
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
        .fromTo(".wireframe-asset-glass", { opacity: 1 }, { opacity: 0 })
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
          ".design-asset-glass",
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1 },
          0
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
        .fromTo(".design-asset-glass", { opacity: 1 }, { opacity: 0 })
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
          ".develop-asset-glass",
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1 },
          0
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
        .fromTo(".develop-asset-glass", { opacity: 1 }, { opacity: 0 })
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
          ".testing-asset-glass",
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1 },
          0
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
        .fromTo(".testing-asset-glass", { opacity: 1 }, { opacity: 0 })
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
        { background: "#f4f3f2", duration: 3, ease: "power2.inOut" } // Use easing
      )
        .fromTo(
          ".footer-p-mobile",
          { background: "#000" },
          {
            background: "#f4f3f2",
            duration: 3,
            ease: "power2.inOut",
          },
          "<" // Start at the same time
        )
        .fromTo(
          ".atharax-big-mobile, .socials-row",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 2, ease: "power2.inOut" } // Add easing
        );
    }, footerContainer);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const elements = [
      {
        trigger: ".sticky-two-mobile",
        targets: [".sticky-two-mobile", ".wireframe-asset"],
      },
      {
        trigger: ".sticky-three-mobile",
        targets: [".sticky-three-mobile", ".design-asset"],
      },
      {
        trigger: ".sticky-four-mobile",
        targets: [".sticky-four-mobile", ".develop-asset"],
      },
      {
        trigger: ".sticky-five-mobile",
        targets: [".sticky-five-mobile", ".testing-asset"],
      },
      {
        trigger: ".footer-sticky-mobile",
        targets: [".footer-sticky-mobile"],
        duration: 0,
      },
    ];

    elements.forEach(({ trigger, targets, duration = 1 }) => {
      gsap.to(targets.join(", "), {
        scrollTrigger: {
          trigger,
          start: "top top",
          toggleActions: "play none none reverse",
        },
        autoAlpha: 1,
        duration,
      });
    });
  }, []);

  return (
    <div id="smooth-wrapper" className="all">
      <div className="nav">
        <a onClick={() => window.location.reload()} aria-label="Reload Page">
          <img src={AtharaxLogo} alt="Logo"></img>
        </a>
        <button
          className={`menu ${isToggled ? "opened" : ""}`}
          onClick={toggleMenu}
          aria-expanded={isToggled}
          aria-label="Main Menu"
        >
          <svg width="100" height="100" viewBox="0 0 100 100">
            <path
              className="line line1"
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
            />
            <path className="line line2" d="M 20,50 H 80" />
            <path
              className="line line3"
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            />
          </svg>
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
            <div className="preloader1-down"></div>
            <div className="preloader2-down"></div>
            <div className="preloader3-down"></div>
            <div className="preloader4-down"></div>
            <div className="preloader5-down"></div>
          </div>
        </div>
        <div className="home-screen" id="home">
          <div className="solid-color-layer-mobile"></div>
          <div className="asian-cyb-mobile"></div>
          <div className="title-mobile" id="title-mobile"></div>
          <div className="arrow-down">
            <img src={Arrow}></img>
          </div>
        </div>

        <main>
          <div id="about" className="about-content-mobile" ref={aboutContainer}>
            <h3 className="about-atharax-mobile">ABOUT US</h3>
            <div className="about-description-mobile">
              <p>
                We are a company dedicated to transforming imagination into
                reality. Anything that relates to design and digital, from bold,
                unconventional ideas to sleek, minimalist visions.
              </p>
            </div>
            <div className="carousel-mobile">
              <div className="carousel-content-mobile" ref={carouselRef}></div>
            </div>
          </div>
        </main>

        <div className="workflow-mobile" id="workflow">
          <div className="briefing" id="briefing" ref={briefingContainer}>
            <div className="sticky-one-mobile">
              <div className="briefing-asset">
                <div className="briefing-asset-glass">
                  <h2 className="briefing-h2">BRIEFING</h2>
                  <p className="briefing-p">
                    First, we kick things off with a meeting to{" "}
                    <span>get on the same page</span>, &lt;making sure&gt; we
                    fully get your <strong>needs</strong> and{" "}
                    <strong>goals</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="wireframe" id="wireframe" ref={wireframeContainer}>
            <div className="sticky-two-mobile">
              <div className="wireframe-asset">
                <div className="wireframe-asset-glass">
                  <h2 className="wireframe-h2">WIREFRAME</h2>
                  <p className="wireframe-p">
                    Next, we whip up a <span>quick prototype</span>, mapping out
                    the &lt;structure and layout&gt; of your website in its{" "}
                    <strong>simplest form</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="design" id="design" ref={designContainer}>
            <div className="sticky-three-mobile">
              <div className="design-asset">
                <div className="design-asset-glass">
                  <h2 className="design-h2">DESIGN</h2>
                  <p className="design-p">
                    It’s all about visuals! We refine <span>UX</span> and{" "}
                    <span>design</span> for a smooth,
                    <strong> user-friendly experience</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="develop" id="develop" ref={developContainer}>
            <div className="sticky-four-mobile">
              <div className="develop-asset">
                <div className="develop-asset-glass">
                  <h2 className="develop-h2">DEVELOP</h2>
                  <p className="develop-p">
                    We &lt;bring it all to life&gt; with some{" "}
                    <span>coding magic</span>, making sure everything{" "}
                    <strong>functions</strong> just the way it should.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="testing" id="testing" ref={testingContainer}>
            <div className="sticky-five-mobile">
              <div className="testing-asset">
                <div className="testing-asset-glass">
                  <h2 className="testing-h2">TESTING</h2>
                  <p className="testing-p">
                    Finally, we <span>test everything</span>—thoroughly checking
                    every detail to ensure it's{" "}
                    <strong>fully functional</strong>, including usability.
                  </p>
                </div>
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
                <img src={Instagram} alt="Instagram Icon"></img>
              </a>
              <a
                href="mailto:atharax.co@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <img src={Gmail} alt="Gmail Icon"></img>
              </a>
              <a
                href="https://www.linkedin.com/company/atharax"
                target="_blank"
                rel="noreferrer"
              >
                <img src={Linkedin} alt="Linkedin icon"></img>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mobile;
