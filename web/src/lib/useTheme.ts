import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("dark");

  const toggle = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    if (localTheme === "light") {
      toggle();
    }
  }, []);

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light");
      window.localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light");
      window.localStorage.setItem("theme", "dark");
    }
  }, [theme]);

  return { toggle };
};
