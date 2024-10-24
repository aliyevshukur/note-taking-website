import { useEffect, useState } from "react";

// hook to get window size dynamically
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    test: "test",
  });

  useEffect(() => {
    // only execute all the code below in client side
    // if (typeof window !== "undefined") {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
    // }
  }, []); // Empty array ensures that effect is only run on mount
  // console.log(`Windows size ${JSON.stringify(windowSize)}`);
  return windowSize;
};

export default useWindowSize;
