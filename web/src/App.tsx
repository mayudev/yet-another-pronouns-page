import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import { ILoginContext, LoginContext } from "./lib/loginContext";

function App() {
  const [loginState, setLoginState] = useState<ILoginContext>({
    loggedIn: false,
    username: "",
  });

  useEffect(() => {
    fetch("/api/discord/me", { credentials: "include" }).then((resp) => {
      if (resp.ok) {
        setLoginState({ ...loginState, loggedIn: true });
      }
    });
  }, []);

  return (
    <div className="App">
      <LoginContext.Provider value={loginState}>
        <Navigation />
        <Outlet />
        <span style={{ flex: 1 }} />
        <Footer />
      </LoginContext.Provider>
    </div>
  );
}

export default App;
