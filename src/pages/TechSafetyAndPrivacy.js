import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";
import TechSafetyAndPrivacyIntro from "../Layouts/Main/TechSafetyAndPrivacy/TechSafetyAndPrivacyIntro";
import YouTubeVideoSection from "../Layouts/Main/TechInDailyLife/YouTubeVideoSection";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

const TechSafetyAndPrivacy = () => {
  const navigate = useNavigate();
  const [osvalue, setosValue] = useState("");
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

  const dataFromSafetyAndPrivacyIntro = (osvalue) => {
    setosValue(osvalue);
  };

  useEffect(() => {
    navigate("/techSafetyAndPrivacy");
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <TechSafetyAndPrivacyIntro
        dataFromSafetyAndPrivacyIntro={dataFromSafetyAndPrivacyIntro}
        dataFromFirebase={dataFromFirebase}
      />
      <YouTubeVideoSection osvalue={osvalue} />
      <Footer />
    </div>
  );
};

export default TechSafetyAndPrivacy;
