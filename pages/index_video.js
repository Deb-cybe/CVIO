import { useEffect, useState } from "react";
import TypingAnimation from "../src/components/TypingAnimation";
import Layout from "../src/layout/Layout";
import Loading from "./loading";
const IndexVideo = () => {
  useEffect(() => {
    let { jarallax, jarallaxVideo } = require("jarallax");
    jarallaxVideo();
    jarallax(document.querySelectorAll(".jarallax-video"), {
      speed: 0.5,
      keepImg: true,
      automaticResize: true,
      videoVolume: 0,
    });
  }, []);

  const [userData, setUserData] = useState(null);
  const [personalData,setPersonalData]=useState(null);
  const [typingData,setTypingData]=useState([]);
  const [isLoading,setIsLoading]=useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_DB_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json(); 
        setUserData(data.user.about);
        setPersonalData(data.user); 
        setTypingData(splitStringToArray(data.user.about.subTitle));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  function splitStringToArray(str) {
    // Split the string using commas and spaces as delimiters (", ")
    const splitArray = str.split(", ");
  
    // Extract the first element (without modification)
    const firstSkill = splitArray.shift();
  
    // Prepend "I develop" to remaining elements and trim leading/trailing spaces
    const remainingSkills = splitArray.map(skill => `I develop ${skill.trim()}`);
  
    // Combine the first skill and modified skills
    return [firstSkill, ...remainingSkills];
  }
  return (
    <>
      {isLoading && <Loading/>}
    {!isLoading && (
      <Layout>
      <div className="section started" id="section-started">
        {/* background */}
        <div
          id="started-video-bg"
          className="video-bg media-bg jarallax-video video-mobile-bg"
          data-jarallax-video="https://youtu.be/S4L8T2kFFck"
          data-mobile-preview="images/started_image_p.jpg"
          data-volume={100}
        >
          <div className="video-bg-mask" />
          <div className="video-bg-texture" id="grained_container" />
        </div>
        {/* started content */}
        <div className="centrize full-width">
          <div className="vertical-center">
            <div className="started-content">
              <h1 className="h-title">
                
                Hello, {`I’m`} <strong>{userData?.name}</strong>, {userData?.title} <br/>Based in {userData?.address}.<br/>{userData?.subTitle}.

              </h1>
              <TypingAnimation extraClassName={"typed-subtitle"} typingData={typingData}/>
              <span className="typed-subtitle" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
    )}
    </>
  );
};
export default IndexVideo;
