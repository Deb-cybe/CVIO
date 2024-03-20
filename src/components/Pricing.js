import { useEffect, useState } from "react";
import Error from "../../pages/error";
import Loading from "../../pages/loading";

const Pricing = () => {
  const [pricing, setPricing] = useState([]);
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
        setPricing(data?.pricing); // Corrected typo 
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
      {error && <Error/>}
      {!isLoading && !error && pricing && (<div className="section pricing" id="section-pricing">
      <div className="content">
        {/* title */}
        <div className="title">
          <div className="title_inner">Pricing Table</div>
        </div>
        {/* pricing items */}
        <div className="pricing-items">
          <div className="pricing-col">
            <div className="pricing-item content-box">
              <div className="icon">
                <span className="fas fa-star" />
              </div>
              <div className="name">Basic</div>
              <div className="amount">
                <span className="number">
                  <span className="dollar">$</span>
                  <span>39</span>
                  <span className="period">hour</span>
                </span>
              </div>
              <div className="feature-list">
                <ul>
                  <li>Web Development</li>
                  <li>Advetising</li>
                  <li>Game Development</li>
                  <li className="disable">Music Writing</li>
                  <li className="disable">Photography</li>
                </ul>
              </div>
              <div className="bts">
                <a href="#" className="btn hover-animated">
                  <span className="circle" />
                  <span className="lnk">Buy Now</span>
                </a>
              </div>
            </div>
          </div>
          <div className="pricing-col">
            <div className="pricing-item content-box">
              <div className="icon">
                <span className="fas fa-rocket" />
              </div>
              <div className="name">Premium</div>
              <div className="amount">
                <span className="number">
                  <span className="dollar">$</span>
                  <span>59</span>
                  <span className="period">hour</span>
                </span>
              </div>
              <div className="feature-list">
                <ul>
                  <li>Web Development</li>
                  <li>Advetising</li>
                  <li>Game Development</li>
                  <li>Music Writing</li>
                  <li>
                    Photography <strong>new</strong>
                  </li>
                </ul>
              </div>
              <div className="bts">
                <a href="#" className="btn hover-animated">
                  <span className="circle" />
                  <span className="lnk">Buy Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)}
    </>
  );
};
export default Pricing;
