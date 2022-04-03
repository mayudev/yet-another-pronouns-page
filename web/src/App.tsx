import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { CSSTransition } from "react-transition-group";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Navigation from "./components/Navigation";
import { ILoginContext, LoginContext } from "./lib/context/login";
import { CurrentUser } from "./lib/interfaces";
import "./styles/App.scss";

function App() {
  const [ready, setReady] = useState(false);

  const [loginState, setLoginState] = useState<ILoginContext>({
    loggedIn: false,
    username: "",
    id: "",
  });

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const resp = await fetch("/api/v1/me");

        if (!resp.ok) {
          throw new Error(resp.statusText);
        }

        const data = (await resp.json()) as CurrentUser;

        setLoginState((loginState) => ({
          ...loginState,
          loggedIn: true,
          id: data.id,
          username: data.username,
        }));
        setReady(true);
      } catch (e) {
        setReady(true);
      }
    }

    fetchCurrentUser();
  }, []);

  return (
    <div className={`App ${ready ? "" : "covert"}`}>
      <LoginContext.Provider value={loginState}>
        <Navigation />
        <Outlet />
        <span style={{ flex: 1 }} />
        <Footer />
      </LoginContext.Provider>
      <CSSTransition unmountOnExit in={!ready} timeout={200} classNames="modal">
        <Modal message={"Loading ....."} />
      </CSSTransition>
    </div>
  );
}

export default App;
