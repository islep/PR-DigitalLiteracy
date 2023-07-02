import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";
import TechInDailyLifeIntro from "../Layouts/Main/TechInDailyLife/TechInDailyLifeintro";
import YouTubeVideoSection from "../Layouts/Main/TechInDailyLife/YouTubeVideoSection";
import { collection, onSnapshot} from "firebase/firestore";
import { db } from "../firebase/firebase";

const TechInDailyLife = () => {
  const navigate = useNavigate();
  const [osvalue, setosValue] = useState("");
  //let [value, setValue] = useState("");
  const [dataFromFirebase, setDatafromFirebase] = useState([]);
  const docRef = collection(db, "youtube-videos");


  useEffect(() => {
    console.log("useEffect 1");
    const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
      const videos = querySnapshot.docs.map((doc) => doc.data());
      setDatafromFirebase(Object.values(videos));
    });
  
    return unsubscribe;
    // eslint-disable-next-line
  }, []);

  const dataFromDailyLifeIntro = (osvalue) => {
    setosValue(osvalue);
  };

  useEffect(() => {
    navigate("/techInDailyLife");
  }, [navigate]);

  const memoizedIntroComponent = useMemo(() => {
    return dataFromFirebase ? (
      <TechInDailyLifeIntro dataFromDailyLifeIntro={dataFromDailyLifeIntro} dataFromFirebase={dataFromFirebase} />
    ) : (
      <div>Loading...</div>
    );
  }, [dataFromFirebase]);

  const memoizedYouTubeComponent = useMemo(() => {
    return osvalue ? (
      <YouTubeVideoSection osvalue={osvalue} />
    ) : (
      <div>Loading...</div>
    );
  }, [osvalue]);

  return (
    <div>
      <Navbar />
      {memoizedIntroComponent}
      {memoizedYouTubeComponent}
      <Footer />
    </div>
  );
};

export default TechInDailyLife;
