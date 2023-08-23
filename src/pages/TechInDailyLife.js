import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";
import TechInDailyLifeIntro from "../Layouts/Main/TechInDailyLife/TechInDailyLifeintro";
import YouTubeVideoSection from "../Layouts/Main/TechInDailyLife/YouTubeVideoSection";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

const TechInDailyLife = () => {
  const [osvalue, setosValue] = useState([]);
  const [dataFromFirebase, setDatafromFirebase] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "youtube-videos"), (querySnapshot) => {
      const videos = querySnapshot.docs.map((doc) => doc.data());
      setDatafromFirebase(Object.values(videos));
    });

    return unsubscribe;
  }, []);

  const dataFromDailyLifeIntro = (osvalue) => {
    setosValue(osvalue);
  };

  return (
    <div>
      <Navbar />
      {dataFromFirebase ? (
        <TechInDailyLifeIntro dataFromDailyLifeIntro={dataFromDailyLifeIntro} dataFromFirebase={dataFromFirebase} />
      ) : (
        <div>Loading...</div>
      )}
      {osvalue.length > 0 ? (
        <YouTubeVideoSection osvalue={osvalue} />
      ) : (
        <div>Loading...</div>
      )}
      <Footer />
    </div>
  );
};

export default TechInDailyLife;

