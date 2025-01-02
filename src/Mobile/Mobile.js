import "./Mobile.scss";

import AtharaxLogo from "../images/atharax-final-logo.svg";
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
import { SplitText } from "gsap/SplitText";

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

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  const handleToggled = () => {
    setIsToggled((prevState) => !prevState); // Toggle the state between true and false
  };

  gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin,
    ScrollSmoother,
    ScrambleTextPlugin,
    SplitText
  );

  useEffect(() => {
    let smootherMobile = ScrollSmoother.create({
      smooth: 0.5,
      speed: 0.25,
      normalizeScroll: false,
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

    const tl = gsap.timeline({ defaults: { duration: 2, ease: "none" } });
    tl.to("#title-mobile", {
      scrambleText: {
        text: "ATHARAX",
        chars: "13579",
        revealDelay: 0.2,
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
      .fromTo(".solid-color-layer-mobile", { opacity: 0 }, { opacity: 1 }, 0);

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
      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-content-mobile",
          start: "top top +.5vh",
          scrub: 1,
          pin: true,
          pinSpacing: false,
          toggleActions: "play none none reverse",
        },
      });
      t1.to(new SplitText(".about-description-mobile", { type: "words" }).words, {
        color: "rgb(222, 176, 252)",
        duration: 0.1,
        stagger: 0.1,
      });
    }, aboutContainer);

    return () => ctx.revert();
  }, []);

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
          ".atharax-big-mobile",
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
    <div id="smooth-wrapper">
      <div className="nav">
        <a href="#home" onClick={() => setIsToggled(false)}>
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
        </div>

        <main>
          <div id="about" className="about-content-mobile" ref={aboutContainer}>
            <h3 className="about-atharax-mobile">ABOUT US</h3>
            <div className="about-div-row-mobile"></div>
            <div className="about-description-mobile">
              <p>
                We are a company
                dedicated to
                transforming
                imagination into reality.
                Anything that
                relates to
                design and digital,
                from bold,
                unconventional ideas
                to sleek,
                minimalist visions.
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
