import { Route, Routes } from "react-router";
import App from "./App";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

function Router() {
  return (
    <Routes>
      <Route path="*" element={<App />}>
        <Route index element={<Landing />} />
        <Route path="@:name" element={<Profile />} />
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Router;
