import { useEffect, useState } from "react";
import TypingAnimation from "../src/components/TypingAnimation";
import Layout from "../src/layout/Layout";
import Loading from "./loading";
const Index = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading,setIsLoading]=useState(true);
  const [typingData,setTypingData]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_DB_URL); 
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        console.log(data.user.about.name);
        setUserData(data.user.about);
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
    const remainingSkills = splitArray.map(skill => `I develop <strong>${skill.trim()}</<strong>`);
  
    // Combine the first skill and modified skills
    return [firstSkill, ...remainingSkills];
  }
  return (
    <>
    {isLoading && <Loading/>}
    {!isLoading && <>
      <Layout>
      <div className="section started" id="section-started">
        {/* background */}
        <div className="video-bg">
          <div className="video-bg-mask" />
          <div className="video-bg-texture" id="grained_container" />
        </div>
        {/* started content */}
        <div className="centrize full-width">
          <div className="vertical-center">
            <div className="started-content">
              <h1 className="h-title">
                Hello, {`I’m`} <strong>{userData?.name}</strong>, {userData?.title} Based in {userData?.address}.
              </h1>
              <TypingAnimation extraClassName={"h-subtitle"} typingData={typingData}/>
              <span className="typed-subtitle" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
      </>}
      </>
  );
};
export default Index;
