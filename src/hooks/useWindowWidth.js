import { useState, useEffect } from "react";

// Function to get the current window width
function getWindowWidth() {
  const { innerWidth: width } = window;
  return width;
}

// Custom hook to track and return the current window width
export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}
