import { useEffect } from "react";

function useLightTheme() {
  useEffect(() => {
    document.body.classList.add("light");

    return () => {
      document.body.classList.remove("light");
    };
  }, []);
}

export default useLightTheme;
