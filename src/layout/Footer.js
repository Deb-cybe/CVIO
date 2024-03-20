import { useEffect, useState } from "react";

const Footer = () => {
  const [userData, setUserData] = useState(null);
  const [personalData,setPersonalData]=useState(null);
  const [socialhandles,setSocialHandles]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching
        const response = await fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data.user.about);
        setPersonalData(data.user);
        setSocialHandles(data.user.social_handles);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false); // Set loading to false after fetching (regardless of success or error)
      }
    };

    fetchData();
  }, []);
  return (
    <footer className="footer">
      {isLoading && (
        <div className="loading-message">Loading Footer Data...</div>
      )}
      {error && (
        <div className="error-message">Error: {error}</div>
      )}
      {!isLoading && !error && ( // Only render content if data is loaded and no errors
        <>
          <div className="copy">
            <p>E: {personalData?.email}</p>
            <p>T: {userData?.phoneNumber}</p>
          </div>
          <div className="soc-box">
            <div className="follow-label">Follow Me</div>
            <div className="soc">
              {socialhandles?.map((handle) => (
                <a
                  key={handle._id}
                  target="_blank"
                  rel="noreferrer"
                  href={handle.url}
                >
                  <img src={handle.image.url} width={20}/>
                  {/* <span className={`icon fab fa-${handle.platform.toLowerCase()}`} /> */}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
      <div className="clear" />
    </footer>

  );
};
export default Footer;
