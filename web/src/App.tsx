import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { CSSTransition } from "react-transition-group";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Navigation from "./components/Navigation";
import { ILoginContext, LoginContext } from "./lib/context/login";
import "./styles/App.scss";

function App() {
  const [ready, setReady] = useState(false);

  const [loginState, setLoginState] = useState<ILoginContext>({
    loggedIn: false,
    username: "",
  });

  useEffect(() => {
    fetch("/api/me", { credentials: "include" }).then((resp) => {
      if (resp.ok) {
        setLoginState((loginState) => ({ ...loginState, loggedIn: true }));
        setReady(true);
      } else {
        setReady(true);
      }
    });
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
