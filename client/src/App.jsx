import { BrowserRouter, Route, useLocation, Routes } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import "./App.css";
import AddStory from "./pages/story/addStory/AddStory";
import Layout from "./layout/Layout";
import StoryManagement from "./pages/story/storyManagement/StoryManagement";
import AddChapter from "./pages/chapter/addChapter/addChapter";
import EditChapter from "./pages/chapter/editChapter/EditChapter";
import EditStory from "./pages/story/editStory/EditStory";
import StoryDetail from "./pages/dashboard/partials/StoryDetail/StoryDetail";
import ChapterDetail from "./pages/dashboard/partials/storyDetail/partials/ChapterDetail";

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
            <Route path="/stories/edit/:story_id" element={<EditStory />} />
            <Route
              path="/dashboard/detail/:story_id"
              element={<StoryDetail />}
            />
            <Route path="/stories" element={<StoryManagement />} />
            <Route path="/chapter/add/" element={<AddChapter />} />
            <Route path="/chapter/edit/:chapter_id" element={<EditChapter />} />
            <Route
              path="/dashboard/chapter/detail/:chapter_id"
              element={<ChapterDetail />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
