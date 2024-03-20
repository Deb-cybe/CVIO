import { useEffect, useState } from "react";
import Loading from "../../pages/loading";

const Clients = () => {
  const [clients, setClients] = useState([]);
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
        setClients(data?.clients); // Corrected typo 
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
      {!isLoading && clients && (
        <div className="section clients" id="section-clients">
        <div className="content">
          {/* title */}
          <div className="title">
            <div className="title_inner">Clients</div>
          </div>
          {/* clients items */}
          <div className="content-box">
            <div className="clients-items">
              <div className="clients-col">
                <div className="clients-item">
                  <a target="_blank" rel="noreferrer" href="#">
                    <img src="images/client1.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="clients-col">
                <div className="clients-item">
                  <a target="_blank" rel="noreferrer" href="#">
                    <img src="images/client3.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="clients-col">
                <div className="clients-item">
                  <a target="_blank" rel="noreferrer" href="#">
                    <img src="images/client2.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="clients-col">
                <div className="clients-item">
                  <a target="_blank" rel="noreferrer" href="#">
                    <img src="images/client4.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="clear" />
        </div>
      </div>
      )}
    </>
  );
};
export default Clients;
