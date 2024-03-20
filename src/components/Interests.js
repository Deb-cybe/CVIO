import { useEffect, useState } from "react";
import Loading from "../../pages/loading";

const Interests = () => {
  const [interests, setInterests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_DB_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setInterests(data?.interests); // Corrected typo 
      } catch (error) {
        setError(error.message); // Store the error message
      } finally {
        setIsLoading(false); // Always set loading to false after fetching
      }
    };

    fetchData();
  }, []);
  return (
    <>
    {isLoading && <Loading/>}
    {!isLoading && interests && (<div className="section service" id="section-interests">
    <div className="content">
      {/* title */}
      <div className="title">
        <div className="title_inner">Interests</div>
      </div>
      {/* interests items */}
      <div className="service-items">
        <div className="service-col">
          <div className="service-item content-box">
            <div className="icon">
              <span className="fas fa-baseball-ball" />
            </div>
            <div className="name">Basketball</div>
            <div className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>
        </div>
        <div className="service-col">
          <div className="service-item content-box">
            <div className="icon">
              <span className="fas fa-campground" />
            </div>
            <div className="name">Camping</div>
            <div className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>
        </div>
        <div className="service-col">
          <div className="service-item content-box">
            <div className="icon">
              <span className="fas fa-chess-knight" />
            </div>
            <div className="name">Chess</div>
            <div className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>
        </div>
        <div className="service-col">
          <div className="service-item content-box">
            <div className="icon">
              <span className="fas fa-headphones" />
            </div>
            <div className="name">Music</div>
            <div className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>
        </div>
      </div>
      <div className="clear" />
    </div>
  </div>)}
    </>
  );
};
export default Interests;
