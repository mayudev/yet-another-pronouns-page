import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Outlet />
      <span style={{ flex: 1 }} />
      <Footer />
    </div>
  );
}

export default App;
