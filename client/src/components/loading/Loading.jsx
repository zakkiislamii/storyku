import FadeLoader from "react-spinners/FadeLoader";
import { useState, useEffect } from "react";

const ContentLoading = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
    
  return (
    <div className=" h-screen flex items-center justify-center">
      <FadeLoader
        color="#e58b13"
        loading={loading}
        size={100}
        speedMultiplier={1}
      />
    </div>
  );
};

export default ContentLoading;
