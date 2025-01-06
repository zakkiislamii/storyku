import { BrowserRouter, Route, useLocation, Routes } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import "./App.css";
import AddStory from "./pages/story/addStory/AddStory";
import ManagementStory from "./pages/story/managementStory/ManagementStory";
import Layout from "./layout/Layout";

export default function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  return (
    <div className="bg-white">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stories/add" element={<AddStory />} />
            <Route path="/stories" element={<ManagementStory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
