import React, { useEffect } from "react";
import { useAuth } from "../firebase/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";
import YouTubeVideo from "../Layouts/Main/YouTubeVideo/YouTubeVideo";

const AddYoutubeVideos = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.uid === "h9IvP69YaPfmcNFiqx78VUnwJ0v2") {
      navigate("/addYoutubeVideos");
    } else {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <Navbar />
      <YouTubeVideo />
      <Footer />
    </div>
    
  );
};

export default AddYoutubeVideos;
