import { useEffect, useState } from "react";
import Loading from "../../pages/loading";

const About = () => {
  const [userData, setUserData] = useState(null);
  const [personalData,setPersonalData]=useState(null);
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
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
    {isLoading && <Loading/>}
    {!isLoading && <div className="section about" id="next_section">
    <div className="content content-box">
    
      {/* image */}
      <div className="image">
        <img src={userData.avatar.url} alt="" />
      </div>
      {/* desc */}
      <div className="desc">

      
            <p>
              Hello, {`I’m`} <strong>{userData?.name}</strong>, {userData?.title} <br/>Based in {userData?.address}.<br/>{userData.subTitle}.<br/><br/>{userData.description}
            </p>
        <div className="info-list">
          <ul>
            <li>
              <strong>Age:</strong> 24
            </li>
            <li>
              <strong>Residence:</strong> {userData?.address}
            </li>
            <li>
              <strong>Freelance:</strong> Available
            </li>
            <li>
              <strong>Address:</strong> {userData?.address}
            </li>
            <li>
              <strong>Phone:</strong> {userData?.phoneNumber}
            </li>
            <li>
              <strong>E-mail:</strong> {personalData?.email}
            </li>
          </ul>
        </div>
        <div className="bts">
          <a href="#" className="btn hover-animated">
            <span className="circle" />
            <span className="lnk">Download CV</span>
          </a>
        </div>
      </div>
      <div className="clear" />
    </div>
  </div>}
  </>
  );
};
export default About;
