import React, { useEffect } from "react";
import "./Cursor.css";

function CursorFollower() {
  useEffect(() => {
    const cursor = document.querySelector(".cursor");
    const hoverTargets = document.querySelectorAll(".hover-target");

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const speed = 0.05; // Adjust this value for more or less lag

    const animateCursor = () => {
      // Calculate the distance to move
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;

      // Gradually move the cursor closer to the mouse position
      cursorX += dx * speed;
      cursorY += dy * speed;

      // Apply the movement to the cursor
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      requestAnimationFrame(animateCursor);
    };

    const moveMouse = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener("mousemove", moveMouse);

    animateCursor(); // Start the animation loop

    const enlargeCursor = () => {
      cursor.classList.add("cursor--large");
    };

    const shrinkCursor = () => {
      cursor.classList.remove("cursor--large");
    };

    hoverTargets.forEach((target) => {
      target.addEventListener("mouseover", enlargeCursor);
      target.addEventListener("mouseleave", shrinkCursor);
    });

    return () => {
      document.removeEventListener("mousemove", moveMouse);
      hoverTargets.forEach((target) => {
        target.removeEventListener("mouseover", enlargeCursor);
        target.removeEventListener("mouseleave", shrinkCursor);
      });
    };
  }, []);

  return <div className="cursor"></div>;
}

export default CursorFollower;
