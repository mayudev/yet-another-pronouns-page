import { Route, Routes } from "react-router";
import App from "./App";
import Editor from "./pages/Editor";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

function Router() {
  return (
    <Routes>
      <Route path="*" element={<App />}>
        <Route index element={<Landing />} />
        <Route path="@:name" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="editor" element={<Editor />} />
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Router;
